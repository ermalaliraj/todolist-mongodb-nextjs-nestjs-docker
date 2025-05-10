import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack, Tooltip } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import { alpha } from '@mui/material/styles'
import { COLORS } from 'src/utils/consts'
import { useServerTable } from 'src/hooks/useServerTable'
import CustomDataGrid from 'src/@core/components/custom-datagrid'
import { openDialog } from 'src/store/merchants/merchantDetailsSlice'
import { asyncDeleteMerchant, resetDeleteStatus } from 'src/store/merchants/merchantDeleteSlice'
import { asyncSearchMerchants, setQueryData } from 'src/store/merchants/merchantSearchSlice'

export default function MerchantsTable() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const state = useSelector(rootState => rootState.merchants.search)
  const {loading, localData, totalRowCount} = useServerTable(page, pageSize, asyncSearchMerchants, state.queryData, setQueryData, setPage, setPageSize)

  const onClickUpdate = merchant => {
    dispatch(openDialog({editMode: true, merchant}))
  }
  const onClickDelete = id => {
    if (window.confirm('Are you sure you want to delete this merchant?')) {
      dispatch(asyncDeleteMerchant(id))
      dispatch(resetDeleteStatus())
    }
  }
  const onClickView = merchant => {
    dispatch(openDialog({editMode: false, merchant}))
  }
  let columns = [
    {field: 'id', headerName: 'ID', renderCell: params => <span>{params.row?.id || '-'}</span>, width: 5},
    {field: 'name', headerName: 'Name', renderCell: params => <span>{params.row?.name || '-'}</span>, width: 20},
    {field: 'address', headerName: 'Address', renderCell: params => <span>{params.row?.address || '-'}</span>, width: 20},
    {field: 'phone', headerName: 'Phone', renderCell: params => <span>{params.row?.phone || '-'}</span>, width: 15},
      {
      field: 'paymentMethods',
      headerName: 'Payment Method*',
      renderCell: params => {
        const paymentMethods = params.row?.productSites?.flatMap(ps => ps.mids.flatMap(mid => mid.gateway?.paymentMethod))
        const uniquePaymentMethods = [...new Set(paymentMethods.filter(Boolean))]

        if (uniquePaymentMethods.length === 0) {
          return <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '11px'}}>-</Box>
        }

        return (
          <Stack direction='row' spacing={1} sx={{alignItems: 'center', height: '100%'}}>
            {uniquePaymentMethods.map(method => (
              <Box
                key={method}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  background: method.toUpperCase() === 'DD' ? 'rgb(22, 177, 255,0.16)' : 'rgb(86, 202, 0, 0.16)',
                  padding: '5px',
                  width: '34px',
                  height: '21px',
                  borderRadius: '5px'
                }}
              >
                <Tooltip title={method.toUpperCase() === 'CC' ? 'credit card' : 'direct debit'} arrow>
                  <img src={`/images/paymentMethods/${method.toUpperCase()}.png`} alt={method} style={{objectFit: 'contain', width: '100%', height: '100%'}}/>
                </Tooltip>
              </Box>
            ))}
          </Stack>
        )
      }
      , width: 14
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <>
          <IconButton color='primary' size='small' onClick={() => onClickView(params.row)}>
            <VisibilityIcon/>
          </IconButton>
          <IconButton color='info' size='small' onClick={() => onClickUpdate(params.row)}>
            <EditIcon/>
          </IconButton>
          <IconButton color='error' size='small' onClick={() => onClickDelete(params.id)}>
            <DeleteIcon/>
          </IconButton>
        </>
      )
      , width: 12
    },
  ]

  const tableWidth = 1200;
  const totalWidth = columns.reduce((sum, col) => sum + col.width, 0); // Sum of the "width" values
  columns = columns.map(col => {
    const ratio = col.width / totalWidth; // Calculate the ratio for each column
    return {...col, width: Math.floor(tableWidth * ratio)}; // Apply dynamic width based on ratio
  });

  const handlePageChange = newPage => setPage(newPage)
  const handlePageSizeChange = newSize => {
    const maxPage = Math.floor((totalRowCount - 1) / newSize)
    setPage(prev => Math.min(prev, maxPage))
    setPageSize(newSize)
  }

  return (
    <Box sx={{width: '100%', overflowX: 'auto'}}>
      <CustomDataGrid rows={localData}
                      rowCount={totalRowCount}
                      columns={columns}
                      loading={loading}
                      page={page}
                      pageSize={pageSize}
                      onPageChange={handlePageChange}
                      onPageSizeChange={handlePageSizeChange}
                      getRowId={row => row.id}
      />
    </Box>
  )
}
