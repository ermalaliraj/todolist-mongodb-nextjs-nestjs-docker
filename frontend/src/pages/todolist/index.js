import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TodoListTable from 'src/views/todolist/TodoListTable'
import TodoListSearch from 'src/views/todolist/TodoListSearch'
import TodoListDetails from 'src/views/todolist/TodoListDetails'
import { FAILED, SUCCEEDED } from 'src/store/storeStates'
import { openDialog, closeDialog } from 'src/store/todolist/todolistDetailsSlice'
import toast from 'react-hot-toast'
import { resetAddStatus } from 'src/store/todolist/todolistAddSlice'
import { resetUpdateStatus } from 'src/store/todolist/todolistUpdateSlice'
import { resetDeleteStatus } from 'src/store/todolist/todolistDeleteSlice'
import { setRowAdded, setRowDeleted, setRowUpdated } from 'src/store/rowsRequestedFromServer/rowsRequestedFromServerSearchSlice'
import { Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const TodoListPage = () => {
  const dispatch = useDispatch()
  const addStatus = useSelector(state => state.todolist.add.addStatus)
  const updateStatus = useSelector(state => state.todolist.update.updateStatus)
  const deleteStatus = useSelector(state => state.todolist.delete.deleteStatus)

  useEffect(() => {
    if (addStatus === SUCCEEDED) {
      toast.success('Todo item added successfully')
      dispatch(resetAddStatus())
      dispatch(setRowAdded(true))
    } else if (addStatus === FAILED) {
      toast.error('Failed to add todo item')
      dispatch(resetAddStatus())
    }
  }, [addStatus])

  useEffect(() => {
    if (updateStatus === SUCCEEDED) {
      toast.success('Todo item updated successfully')
      dispatch(resetUpdateStatus())
      dispatch(setRowUpdated(true))
    } else if (updateStatus === FAILED) {
      toast.error('Failed to update todo item')
      dispatch(resetUpdateStatus())
    }
  }, [updateStatus])

  useEffect(() => {
    if (deleteStatus === SUCCEEDED) {
      toast.success('Todo item deleted successfully')
      dispatch(resetDeleteStatus())
      dispatch(setRowDeleted(true))
    } else if (deleteStatus === FAILED) {
      toast.error('Failed to delete todo item')
      dispatch(resetDeleteStatus())
    }
  }, [deleteStatus])

  const onClickAdd = e => {
    let todolist = {
      id: '',
      title: '',
      description: '',
      isCompleted: false,
      createdAt: '',
      updatedAt: ''
    }
    dispatch(openDialog({ editMode: true, todolist }))
  }

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems='flex-start' justifyContent='space-between'>
        <Grid item xs={12} md={10}>
          <TodoListSearch />
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container direction='column' spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='flex-end'>
              <Button startIcon={<AddIcon />} variant='contained' onClick={onClickAdd}>
                New
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TodoListTable />
      <TodoListDetails />
    </Card>
  )
}

export default TodoListPage 