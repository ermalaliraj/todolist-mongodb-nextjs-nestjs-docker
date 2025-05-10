import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { TodoListService } from './todolist.service'
import { TodoListDto } from './dto/todolist.dto'
import { SearchTodoListDto } from "./dto/search-todolist.dto";
import { GetTodoListsResponse } from "./dto/todoList.response";

@Controller('/todolist')
export class TodoListController {

  constructor(private todoListService: TodoListService) {
  }

  @Get('')
  async getAll(@Query() query: SearchTodoListDto): Promise<GetTodoListsResponse> {
    return await this.todoListService.getAll(query);
  }

  @Get('/:todoListId([0-9a-fA-F]+)')
  async getById(@Param('todoListId') todoListId: string) {
    return await this.todoListService.getById(todoListId)
  }

  @Post('')
  async create(@Body() body: TodoListDto) {
    return await this.todoListService.createTodoList(body)
  }

  @Put('/:todoListId([0-9a-fA-F]+)')
  async update(@Body() body: TodoListDto, @Param('todoListId') todoListId: string) {
    return await this.todoListService.updateTodoList(body, todoListId)
  }

  @Delete('/:todoListId')
  async delete(@Param('todoListId') todoListId: string) {
    return await this.todoListService.deleteTodoList(todoListId)
  }
  
}