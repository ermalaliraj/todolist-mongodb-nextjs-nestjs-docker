import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack, Tooltip, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import { alpha } from '@mui/material/styles'
import { COLORS } from 'src/utils/consts'
import { useServerTable } from 'src/hooks/useServerTable'
import CustomDataGrid from 'src/@core/components/custom-datagrid'
import { openDialog } from 'src/store/todolist/todolistDetailsSlice'
import { asyncDeleteTodoList, resetDeleteStatus } from 'src/store/todolist/todolistDeleteSlice'
import { asyncSearchTodoList, setQueryData } from 'src/store/todolist/todolistSearchSlice'

const TodoListTable = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const state = useSelector(rootState => rootState.todolist.search)
  const { loading, localData, totalRowCount } = useServerTable(page, pageSize, asyncSearchTodoList, state.queryData, setQueryData, setPage, setPageSize)

  const onClickUpdate = todo => {
    dispatch(openDialog({ editMode: true, todolist: todo }))
  }

  const onClickDelete = id => {
    if (window.confirm('Are you sure you want to delete this todo item?')) {
      dispatch(asyncDeleteTodoList(id))
      dispatch(resetDeleteStatus())
    }
  }

  const onClickView = todo => {
    dispatch(openDialog({ editMode: false, todolist: todo }))
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      renderCell: params => <span>{params.row?._id || '-'}</span>,
      width: 1
    },
    {
      field: 'title',
      headerName: 'Title',
      renderCell: params => <span>{params.row?.title || '-'}</span>,
      width: 19
    },
    {
      field: 'description',
      headerName: 'Description',
      renderCell: params => <span>{params.row?.description || '-'}</span>,
      width: 32
    },
    {
      field: 'isCompleted',
      headerName: 'Status',
      renderCell: params => (
        <CustomChip
          label={params.row?.isCompleted ? 'Completed' : 'Pending'}
          color={params.row?.isCompleted ? 'success' : 'warning'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ),
      width: 10
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      renderCell: params => <span>{new Date(params.row?.createdAt).toLocaleString() || '-'}</span>,
      width: 14
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      renderCell: params => <span>{new Date(params.row?.updatedAt).toLocaleString() || '-'}</span>,
      width: 14
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <>
          <IconButton color='primary' size='small' onClick={() => onClickView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color='info' size='small' onClick={() => onClickUpdate(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color='error' size='small' onClick={() => onClickDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
      width: 10
    }
  ]

  const tableWidth = 1350
  const totalWidth = columns.reduce((sum, col) => sum + col.width, 0)
  const adjustedColumns = columns.map(col => {
    const ratio = col.width / totalWidth
    return { ...col, width: Math.floor(tableWidth * ratio) }
  })

  const handlePageChange = newPage => setPage(newPage)
  const handlePageSizeChange = newSize => {
    const maxPage = Math.floor((totalRowCount - 1) / newSize)
    setPage(prev => Math.min(prev, maxPage))
    setPageSize(newSize)
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <CustomDataGrid rows={localData} rowCount={totalRowCount} columns={adjustedColumns} loading={loading} page={page} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} getRowId={row => row._id} />
    </Box>
  )
}

export default TodoListTable
