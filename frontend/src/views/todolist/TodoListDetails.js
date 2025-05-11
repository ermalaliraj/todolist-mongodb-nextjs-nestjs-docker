import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setDescription, setIsCompleted, validateForm, resetForm, closeDialog } from 'src/store/todolist/todolistDetailsSlice'
import { asyncAddTodoList } from 'src/store/todolist/todolistAddSlice'
import { asyncUpdateTodoList } from 'src/store/todolist/todolistUpdateSlice'
import { DETAILS_PAGE_WIDTH } from 'src/utils/consts'
import { FormControlLabel, Checkbox } from '@mui/material'

function getTodoListFromState(state) {
  return {
    title: state.title,
    description: state.description,
    isCompleted: state.isCompleted
  }
}

const TodoListDetails = () => {
  const dispatch = useDispatch()
  const state = useSelector(rootState => rootState.todolist.details)
  const [addRequested, setAddRequested] = useState(false)
  const [updateRequested, setUpdateRequested] = useState(false)

  useEffect(() => {
    if (addRequested) {
      if (!state.titleError && !state.descriptionError) {
        const todolist = getTodoListFromState(state)
        dispatch(asyncAddTodoList(todolist))
        dispatch(closeDialog())
      }
      setAddRequested(false)
    }
  }, [addRequested])

  useEffect(() => {
    if (updateRequested) {
      if (!state.titleError && !state.descriptionError) {
        const todolist = getTodoListFromState(state)
        dispatch(asyncUpdateTodoList({ id: state.id, data: todolist }))
        dispatch(closeDialog())
      }
      setUpdateRequested(false)
    }
  }, [updateRequested])

  const onAdd = e => {
    e.preventDefault()
    setAddRequested(true)
    dispatch(validateForm())
  }

  const onUpdate = e => {
    e.preventDefault()
    setUpdateRequested(true)
    dispatch(validateForm())
  }

  const onCancel = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    dispatch(closeDialog())
    dispatch(resetForm())
  }

  return (
    <Drawer
      anchor='right'
      open={state.isOpened}
      onClose={onCancel}
      PaperProps={{
        sx: {
          width: ['100%', `${DETAILS_PAGE_WIDTH}px`]
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {!state.editMode ? `Todo Details: ${state.id}` : state.editMode && state.id !== '' ? `Todo Details: ${state.id}` : 'Todo Details'}
        </Typography>

        <TextField
          fullWidth
          label='Title'
          value={state.title}
          onChange={e => dispatch(setTitle(e.target.value))}
          error={state.titleError}
          helperText={state.titleError ? 'Title is required' : ''}
          disabled={!state.editMode}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label='Description'
          value={state.description}
          onChange={e => dispatch(setDescription(e.target.value))}
          error={state.descriptionError}
          helperText={state.descriptionError ? 'Description is required' : ''}
          disabled={!state.editMode}
          multiline
          rows={4}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={state.isCompleted}
              onChange={e => dispatch(setIsCompleted(e.target.checked))}
              disabled={!state.editMode}
            />
          }
          label='Completed'
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          {state.editMode ? (
            state.id === '' ? (
              <Button variant='contained' color='primary' onClick={onAdd}>
                Add New
              </Button>
            ) : (
              <Button variant='contained' color='primary' onClick={onUpdate}>
                Update
              </Button>
            )
          ) : null}
          <Button variant='outlined' color='secondary' onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default TodoListDetails 