import {todolist} from "../todolist.schema";

export type GetTodoListsResponse = {
  count: number
  todoLists: todolist[]
  page: number
  pageSize: number
}