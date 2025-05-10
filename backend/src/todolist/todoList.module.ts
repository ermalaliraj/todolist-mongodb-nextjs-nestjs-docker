import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {TodoListController} from './todolist.controller'
import {TodoListSchema} from './todolist.schema'
import {TodoListService} from './todolist.service'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'TodoList', schema: TodoListSchema}]),
  ],
  controllers: [TodoListController],
  providers: [TodoListService],
  exports: [TodoListService]
})

export class TodoListModule {
}
