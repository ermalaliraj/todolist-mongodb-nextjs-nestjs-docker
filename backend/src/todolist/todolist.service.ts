import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {todolist, TodoListModel} from './todolist.schema';
import {BaseService} from '../common/services/baseService';
import {Model} from 'mongoose';
import {TodolistDto} from './dto/todolist.dto';
import {FilterParams} from '../common/types';
import {SearchTodolistDto} from './dto/search-todolist.dto';
import {GetTodoListsResponse} from './dto/todolist.response';
import logger from '../utils/logger';

@Injectable()
export class TodolistService extends BaseService<todolist> {
  constructor(
    @InjectModel(TodoListModel.modelName) private readonly todoListModel: Model<todolist>,
  ) {
    super(todoListModel);
  }

  async getAllTodoList(filter: SearchTodolistDto): Promise<GetTodoListsResponse> {
    logger.info(`Get All todoLists with filters: ${JSON.stringify(filter)}`);
    const {_id, title, description, isCompleted, createdAt, updatedAt} = filter;
    const page = parseInt(filter.page as any) || 1;
    const pageSize = parseInt(filter.pageSize as any) || 10;
    const startFrom = pageSize * (page - 1);
    let params: FilterParams = {};
    if (_id || title || description || isCompleted || createdAt || updatedAt) {
      params.$and = [];
    }
    if (_id) {
      params.$and.push({_id});
    }
    if (title) {
      params.$and.push({title});
    }
    if (description) {
      params.$and.push({description});
    }
    if (isCompleted) {
      params.$and.push({isCompleted});
    }
    if (createdAt) {
      params.$and.push({startDate: {'$gt': createdAt}})
    }
    if (updatedAt) {
      params.$and.push({endDate: {'$lt': updatedAt}})
    }
    let todoLists = await this.getList(
      params,
      undefined,
      pageSize,
      startFrom,
      filter.orderBy ?? '-createdAt',
      false,
    );
    let response: GetTodoListsResponse = {
      page: page,
      pageSize: pageSize,
      totalRows: todoLists.length,
      rows: todoLists,
    };
    logger.info(`Get All todoLists-returning : ${JSON.stringify(response)}`);
    return response;
  }

  async getById(todoListId: string): Promise<todolist> {
    logger.info(`Get todo itemById :${todoListId}`);
    return await this.getOne({_id: todoListId});
  }

  async createTodoList(body: TodolistDto): Promise<todolist> {
    let newObject = {
      title: body.title,
      description: body.description,
      isCompleted: body.isCompleted,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    };
    logger.info(`Create new todo item: ${JSON.stringify(newObject)}`);
    return await this.create(newObject);
  }

  async updateTodoList(body: TodolistDto, todoListId: string): Promise<todolist> {
    let todolist = await this.getOne({_id: todoListId});
    if (body.title) {
      todolist.title = body.title;
    }
    if (body.description) {
      todolist.description = body.description;
    }
    if (body.isCompleted) {
      todolist.isCompleted = body.isCompleted;
    }
    if (body.createdAt) {
      todolist.createdAt = body.createdAt;
    }
    if (body.updatedAt) {
      todolist.updatedAt = body.updatedAt;
    }
    logger.info(`Updating todo item ${todoListId} to: ${JSON.stringify(body)}`);
    return await todolist.save();
  }

  async deleteTodoList(todoListId: string): Promise<void> {
    logger.info(`Deleting todo item ${todoListId}`);
    let filter = {_id: todoListId};
    return await this.delete(filter);
  }

}
