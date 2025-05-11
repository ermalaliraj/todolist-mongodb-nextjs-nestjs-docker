import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { TodolistService } from './todolist.service'
import { TodolistDto } from './dto/todolist.dto'
import { SearchTodolistDto } from "./dto/search-todolist.dto";
import { GetTodoListsResponse } from "./dto/todolist.response";

@Controller('/todolist')
export class TodolistController {

  constructor(private todoListService: TodolistService) {
  }

  @Get('')
  async getAll(@Query() query: SearchTodolistDto): Promise<GetTodoListsResponse> {
    return await this.todoListService.getAll(query);
  }

  @Get('/:todoListId([0-9a-fA-F]+)')
  async getById(@Param('todoListId') todoListId: string) {
    return await this.todoListService.getById(todoListId)
  }

  @Post('')
  async create(@Body() body: TodolistDto) {
    return await this.todoListService.createTodoList(body)
  }

  @Put('/:todoListId([0-9a-fA-F]+)')
  async update(@Body() body: TodolistDto, @Param('todoListId') todoListId: string) {
    return await this.todoListService.updateTodoList(body, todoListId)
  }

  @Delete('/:todoListId')
  async delete(@Param('todoListId') todoListId: string) {
    return await this.todoListService.deleteTodoList(todoListId)
  }
  
}