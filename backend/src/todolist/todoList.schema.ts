import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document, Model, model} from 'mongoose'

@Schema({timestamps: true})
export class TodoList extends Document {
  @Prop({required: true}) title: string
  @Prop({required: false}) description: string
  @Prop({required: false}) isCompleted: boolean
  @Prop({required: false}) createdAt: Date
  @Prop({required: false}) updatedAt: Date
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList)
export const TodoListModel: Model<TodoList> = model<TodoList>('TodoList', TodoListSchema)
