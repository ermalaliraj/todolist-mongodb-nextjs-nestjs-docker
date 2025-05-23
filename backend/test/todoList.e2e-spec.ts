import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {getModelToken} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {todolist} from '../src/todolist/todolist.schema'
import {AppModule} from '../src/app.module'
import {TodolistModule} from '../src/todolist/todolist.module'

describe('TODO List Controller (e2e)', () => {
  let app: INestApplication
  let todoListModel: Model<todolist>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TodolistModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    todoListModel = moduleFixture.get(getModelToken('todolist'))
    await app.init()
  })

  afterAll(async () => {
    await todoListModel.deleteMany({})
    await app.close()
  })

  it('POST /todolist - should create a new todolist', async () => {
    let todolist = {
      title: "New todolist Name",
      description: "Test",
      isCompleted: false,
      createdAt: new Date(2024, 10, 15),
      updatedAt: new Date(2024, 10, 30)
    } as todolist

    const createResponse = await request(app.getHttpServer())
      .post('/todolist')
      .send(todolist)
      .expect(201)
    console.log("createResponse: ", createResponse.body)
    expect(createResponse.body._id).toBeDefined()
    expect(createResponse.body.title).toBe(todolist.title)
    expect(createResponse.body.description).toBe(todolist.description)
    expect(createResponse.body.isCompleted).toBe(todolist.isCompleted)
    expect(new Date(createResponse.body.createdAt).toISOString()).toBe(todolist.createdAt.toISOString())
    expect(new Date(createResponse.body.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(createResponse.body.createdAt).getTime())

    let todoListId = createResponse.body._id
    let getResponse = await request(app.getHttpServer())
      .get('/todolist/' + todoListId)
    console.log("getResponse: ", getResponse.body)
    expect(getResponse.status).toBe(200)
    expect(getResponse.body._id).toBe(todoListId.toString())
    expect(getResponse.body.title).toBe(todolist.title)
    expect(getResponse.body.description).toBe(todolist.description)
    expect(getResponse.body.isCompleted).toBe(todolist.isCompleted)
    expect(new Date(getResponse.body.createdAt).toISOString()).toBe(todolist.createdAt.toISOString())
    expect(new Date(getResponse.body.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(getResponse.body.createdAt).getTime())
    
    let updateTodoList = {
      title: "Food Fair 2"
    }
    const updateResponse = await request(app.getHttpServer())
      .put('/todolist/' + todoListId)
      .send(updateTodoList)
    console.log("updateResponse: ", updateResponse.body)
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body._id).toBeDefined()
    expect(updateResponse.body.title).toBe(updateTodoList.title)

    const deleteResponse = await request(app.getHttpServer())
      .delete('/todolist/' + todoListId)
    console.log("deleteResponse: ", deleteResponse.body)
    expect(deleteResponse.status).toBe(200)
    expect(deleteResponse.body).toEqual({})

    let getResponse2 = await request(app.getHttpServer())
      .get('/todolist/' + todoListId)
    console.log("getResponse2: ", getResponse2.body)
    expect(getResponse2.status).toBe(200)
    expect(getResponse2.body._id).toBe(todoListId.toString())
  })

})
