import React from 'react'
import { Box, Select, MenuItem, Pagination } from '@mui/material'

export default function CustomPagination({ from, to, totalRowCount, page, pageSize, onPageChange, onPageSizeChange, pageSizeOptions = [5, 10, 20, 50] }) {
  return (
    <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between' sx={{ width: '100%', p: 2 }}>
      <Box display='flex' alignItems='center' gap={1}>
        <span>Rows per page:</span>
        <Select size='small' value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))}>
          {pageSizeOptions.map(size => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display='flex' alignItems='center' gap={2} sx={{ mt: { xs: 2, sm: 0 } }}>
        <div>{`Showing ${from} to ${to} of ${totalRowCount} entries`}</div>
        <Pagination color='primary' shape='rounded' siblingCount={1} boundaryCount={1} page={page + 1} count={Math.ceil(totalRowCount / pageSize)} onChange={(_, newPage) => onPageChange(newPage - 1)} />
      </Box>
    </Box>
  )
}
