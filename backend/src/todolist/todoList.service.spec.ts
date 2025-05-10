import { Model } from 'mongoose'
import { TodoList } from './todolist.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { TodoListService } from './todolist.service'
import {TodoListDto} from "./dto/todoList.dto";

describe('TodoList Service', () => {
  let todoListService: TodoListService
  let todoListModel: Model<TodoList>
  let mockedTodoListModel = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoListService,
        {
          provide: getModelToken(TodoList.name),
          useValue: mockedTodoListModel
        }
      ]
    }).compile()
    todoListModel = module.get<Model<TodoList>>(getModelToken(TodoList.name))
    todoListService = module.get<TodoListService>(TodoListService)
  })
  
  it('createTodoList', async () => {
    let mockedTodoListData = {
      _id: "todoListId",
      title: "Food TodoList 1",
      description: "Test",
      isCompleted: false,
      createdAt: new Date(2024, 10, 15),
      updatedAt: new Date(2024, 10, 30) 
    }
    let todoListData = {
      title: "Food TodoList 1d",
      description: "Test",
      isCompleted: false,
      createdAt: new Date(2024, 10, 15),
      updatedAt: new Date(2024, 10, 30)
    }
    jest.spyOn(todoListService, 'create').mockResolvedValue(mockedTodoListData as any)
    let result = await todoListService.createTodoList(todoListData)
    expect(result._id).toBeDefined()
    expect(result._id).toBe(mockedTodoListData._id)
    expect(result).toEqual(mockedTodoListData)
  })

  it('updateTodoList', async () => {
    const todoListId = 'todoListId123'
    const savedTodoListData = {
      _id: "todoListId1234",
      title: "New TodoList Name",
      description: "Test",
      isCompleted: false,
      createdAt: new Date(2024, 10, 15),
      updatedAt: new Date(2024, 10, 30)
    }
    const mockedTodoList = {
      _id: "todoListId",
      title: "old name",
      description: "Test",
      isCompleted: false,
      createdAt: new Date(2024, 10, 15),
      updatedAt: new Date(2024, 10, 30),
      save: jest.fn()
    }
    jest.spyOn(todoListService, 'getOne').mockReturnValue(mockedTodoList as any)
    jest.spyOn(mockedTodoList, 'save').mockReturnValue(savedTodoListData as any)

    const result = await todoListService.updateTodoList({ title: 'New TodoList Name' } as TodoListDto, todoListId)
    expect(result).toEqual(savedTodoListData)
  })
  
  it('deleteTodoList', async () => {
    const todoListId = 'todoListId123'
    const mockedDeleteResult = {}
    jest.spyOn(todoListService, 'delete').mockResolvedValueOnce(mockedDeleteResult as any)
    let result = await todoListService.deleteTodoList(todoListId)

    expect(result).toEqual(mockedDeleteResult)
    expect(todoListService.delete).toHaveBeenCalledWith({ _id: todoListId })
  })

})









