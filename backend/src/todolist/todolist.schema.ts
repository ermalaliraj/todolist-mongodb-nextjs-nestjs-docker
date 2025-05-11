import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document, Model, model} from 'mongoose'

@Schema({timestamps: true})
export class todolist extends Document {
  @Prop({required: true}) title: string
  @Prop({required: false}) description: string
  @Prop({required: false}) isCompleted: boolean
  @Prop({required: false}) createdAt: Date
  @Prop({required: false}) updatedAt: Date
}

export const TodolistSchema = SchemaFactory.createForClass(todolist)
export const TodoListModel: Model<todolist> = model<todolist>('todolist', TodolistSchema)
