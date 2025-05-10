import React, { useState, useEffect, useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import CustomPagination from '../custom-pagination'
import { useSettings } from 'src/@core/hooks/useSettings'

export default function CustomDataGrid({ rows, rowCount, columns, loading, page, pageSize, onPageChange, onPageSizeChange, rowSelectionModel, onRowSelectionModelChange, getRowId }) {
  const { settings } = useSettings()
  const [showSpinner, setShowSpinner] = useState(false)
  const timeoutRef = useRef()

  useEffect(() => {
    if (rows) {
      setShowSpinner(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        if (!loading) setShowSpinner(false)
      }, 500)
    } else if (!timeoutRef.current) {
      setShowSpinner(false)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [rows, loading])

  const from = rowCount === 0 ? 0 : page * pageSize + 1
  const to = Math.min((page + 1) * pageSize, rowCount)
  const displayedRows = rows.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <DataGrid
      rows={displayedRows}
      rowCount={rowCount}
      columns={columns}
      getRowId={getRowId}
      loading={showSpinner}
      paginationMode='server'
      page={page}
      pageSize={pageSize}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      onPageSizeChange={(_, newSize) => onPageSizeChange(newSize)}
      slots={{ pagination: CustomPagination }}
      slotProps={{
        pagination: {
          from,
          to,
          totalRowCount: rowCount,
          page,
          pageSize,
          onPageChange,
          onPageSizeChange
        }
      }}
      autoHeight
      // checkboxSelection
      // rowSelectionModel={rowSelectionModel}
      // onRowSelectionModelChange={newModel => onRowSelectionModelChange(newModel)}
      disableSelectionOnClick
      hideFooterSelectedRowCount
      sx={
        settings.mode !== 'light' && {
          '& .MuiDataGrid-scrollbar--horizontal': { display: 'none' },
          '& .MuiDataGrid-filler': { display: 'none' },
          '& .MuiDataGrid-virtualScroller': {
            scrollbarWidth: 'auto',
            scrollbarColor: '#30334E #282A42'
          },
          '& .MuiDataGrid-scroller::-webkit-scrollbar-track:horizontal': {
            backgroundColor: '#282A42 !important',
            borderRadius: '3px'
          },
          '& .MuiDataGrid-scroller::-webkit-scrollbar-thumb:horizontal': {
            backgroundColor: '#30334E !important',
            borderRadius: '3px'
          }
        }
      }
    />
  )
}
