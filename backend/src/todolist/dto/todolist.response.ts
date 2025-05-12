import {todolist} from "../todolist.schema";

export type GetTodoListsResponse = {
  page: number
  pageSize: number
  totalRows: number
  rows: todolist[]
}