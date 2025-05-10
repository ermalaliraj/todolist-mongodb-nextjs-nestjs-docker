import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {TodoList, TodoListModel} from './todolist.schema';
import {BaseService} from '../common/services/baseService';
import {Model} from 'mongoose';
import {TodoListDto} from './dto/todolist.dto';
import {FilterParams} from '../common/types';
import {SearchTodoListDto} from './dto/search-todolist.dto';
import {GetTodoListsResponse} from './dto/todoList.response';
import logger from '../utils/logger';

@Injectable()
export class TodoListService extends BaseService<TodoList> {
  constructor(
    @InjectModel(TodoListModel.modelName) private readonly todoListModel: Model<TodoList>,
  ) {
    super(todoListModel);
  }

  async getAll(filter: SearchTodoListDto): Promise<GetTodoListsResponse> {
    logger.debug(`Filter todoLists: ${JSON.stringify(filter)}`);
    const {_id, title, description, isCompleted, createdAt, updatedAt} = filter;
    let startFrom = filter.pageSize * (filter.page - 1);
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
      filter.pageSize,
      startFrom,
      filter.orderBy,
      false,
    );
    let response: GetTodoListsResponse = {
      count: todoLists.length,
      todoLists: todoLists,
      page: filter.page,
      pageSize: filter.pageSize,
    };
    return response;
  }

  async getById(todoListId: string): Promise<TodoList> {
    return await this.getOne({_id: todoListId});
  }

  async createTodoList(body: TodoListDto): Promise<TodoList> {
    let newObject = {
      title: body.title,
      description: body.description,
      isCompleted: body.isCompleted,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    };
    return await this.create(newObject);
  }

  async updateTodoList(body: TodoListDto, todoListId: string): Promise<TodoList> {
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
    return await todolist.save();
  }

  async deleteTodoList(todoListId: string): Promise<void> {
    let filter = {_id: todoListId};
    return await this.delete(filter);
  }

}
