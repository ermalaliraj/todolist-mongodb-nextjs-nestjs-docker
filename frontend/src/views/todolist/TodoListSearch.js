import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, TextField, Typography, IconButton, Tooltip, Collapse, MenuItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useSettings } from 'src/@core/hooks/useSettings'
import { buildQueryParams } from 'src/utils/pageUtils'
import {
  resetSearch,
  setId,
  setTitle,
  setDescription,
  setIsCompleted,
  setFromDate,
  setToDate,
  toggleSearch,
  setQueryData
} from 'src/store/todolist/todolistSearchSlice'
import { setRowSearched } from 'src/store/rowsRequestedFromServer/rowsRequestedFromServerSearchSlice'

const TodoListSearch = () => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.todolist.search)
  const { settings } = useSettings()
  const mode = settings.mode

  const onResetClick = () => {
    dispatch(resetSearch())
    doSearch('')
  }

  const doSearch = queryParams => {
    dispatch(setQueryData(queryParams))
    dispatch(setRowSearched(true))
  }

  const onSearchClick = e => {
    e.preventDefault()
    const queryParams = buildQueryParams([
      ...(form.id ? [{ paramName: 'id', paramValue: form.id }] : []),
      ...(form.title ? [{ paramName: 'title', paramValue: form.title }] : []),
      ...(form.description ? [{ paramName: 'description', paramValue: form.description }] : []),
      ...(form.isCompleted && form.isCompleted !== 'all' ? [{ paramName: 'isCompleted', paramValue: form.isCompleted }] : []),
      { paramName: 'fromDate', paramValue: form.fromDate },
      { paramName: 'toDate', paramValue: form.toDate }
    ])
    doSearch(queryParams)
  }

  return (
    <form onSubmit={onSearchClick}>
      <Card sx={{ p: 1, border: `1px solid ${mode === 'light' ? '#F2F4F7' : '#282A42'}` }}>
        <Grid container alignItems='center' px={2} py={1}>
          <Grid item xs>
            <Typography variant='h6' sx={{ cursor: 'pointer' }} onClick={() => dispatch(toggleSearch())}>
              TodoList Search
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => dispatch(toggleSearch())}>
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Collapse in={form.isSearchExpanded}>
          <Grid container spacing={2} px={3} py={2}>
            <Grid item xs={12} md={11}>
              <Grid container spacing={2}>
                {/* First Row */}
                <Grid item xs={12} sm={6} md={4}>
                  <TextField size='small' fullWidth label='ID' value={form.id} onChange={e => dispatch(setId(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField size='small' fullWidth label='Title' value={form.title} onChange={e => dispatch(setTitle(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField size='small' fullWidth label='Description' value={form.description} onChange={e => dispatch(setDescription(e.target.value))} />
                </Grid>

                {/* Second Row */}
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    size='small'
                    fullWidth
                    select
                    label='Status'
                    value={form.isCompleted}
                    onChange={e => dispatch(setIsCompleted(e.target.value))}
                  >
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value='true'>Completed</MenuItem>
                    <MenuItem value='false'>Pending</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    size='small'
                    fullWidth
                    type='date'
                    label='From Date'
                    value={form.fromDate}
                    onChange={e => dispatch(setFromDate(e.target.value))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    size='small'
                    fullWidth
                    type='date'
                    label='To Date'
                    value={form.toDate}
                    onChange={e => dispatch(setToDate(e.target.value))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={1}>
              <Grid container spacing={2}>
                <Grid item>
                  <Tooltip title='Search' placement='top' arrow>
                    <IconButton size='small' type='submit'>
                      <SearchIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title='Reset' placement='top' arrow>
                    <IconButton size='small' onClick={onResetClick}>
                      <RestartAltIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Card>
    </form>
  )
}

export default TodoListSearch
