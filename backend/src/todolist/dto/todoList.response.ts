import {TodoList} from "../todolist.schema";

export type GetTodoListsResponse = {
  count: number
  todoLists: TodoList[]
  page: number
  pageSize: number
}