import { Model } from 'mongoose'
import { todolist } from './todolist.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { TodolistService } from './todolist.service'
import {TodolistDto} from "./dto/todolist.dto";

describe('todolist Service', () => {
  let todoListService: TodolistService
  let todoListModel: Model<todolist>
  let mockedTodoListModel = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodolistService,
        {
          provide: getModelToken(todolist.name),
          useValue: mockedTodoListModel
        }
      ]
    }).compile()
    todoListModel = module.get<Model<todolist>>(getModelToken(todolist.name))
    todoListService = module.get<TodolistService>(TodolistService)
  })
  
  it('createTodoList', async () => {
    let mockedTodoListData = {
      _id: "todoListId",
      title: "Food todolist 1",
      description: "Test",
      isCompleted: false,
      createdAt: new Date(2024, 10, 15),
      updatedAt: new Date(2024, 10, 30) 
    }
    let todoListData = {
      title: "Food todolist 1d",
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
      title: "New todolist Name",
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

    const result = await todoListService.updateTodoList({ title: 'New todolist Name' } as TodolistDto, todoListId)
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









