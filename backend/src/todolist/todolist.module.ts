import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {TodolistController} from './todolist.controller'
import {TodolistSchema} from './todolist.schema'
import {TodolistService} from './todolist.service'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'todolist', schema: TodolistSchema}]),
  ],
  controllers: [TodolistController],
  providers: [TodolistService],
  exports: [TodolistService]
})

export class TodolistModule {
}
