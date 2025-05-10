import { useDispatch, useSelector } from 'react-redux'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Card, Grid, Tooltip, Typography } from '@mui/material'
import { resetSearch, setName, setAddress, setEmail, setId, setPhone, setRegistrationNumber, toggleSearch, setQueryData } from 'src/store/merchants/merchantSearchSlice'
import { setRowSearched } from 'src/store/rowsRequestedFromServer/rowsRequestedFromServerSearchSlice'
import { useSettings } from 'src/@core/hooks/useSettings'
import { buildQueryParams } from 'src/utils/pageUtils'

const MerchantSearch = () => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.merchants.search)
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
      { paramName: 'id', paramValue: form.id },
      { paramName: 'name', paramValue: form.name },
      { paramName: 'address', paramValue: form.address },
      { paramName: 'registrationNumber', paramValue: form.registrationNumber },
      { paramName: 'phone', paramValue: form.phone },
      { paramName: 'email', paramValue: form.email }
    ])
    doSearch(queryParams)
  }
  return (
    <form onSubmit={onSearchClick}>
      <Card sx={{ p: 1, border: `1px solid ${mode === 'light' ? '#F2F4F7' : '#282A42'}` }}>
        <Grid container alignItems='center' px={2} py={1}>
          <Grid item xs>
            <Typography variant='h6' sx={{ cursor: 'pointer' }} onClick={() => dispatch(toggleSearch())}>
              Merchant Search
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
                <Grid item xs={12} sm={6} md={3}>
                  <TextField size='small' fullWidth label='ID' value={form.id} onChange={e => dispatch(setId(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField size='small' fullWidth label='Name' value={form.name} onChange={e => dispatch(setName(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField size='small' fullWidth label='Address' value={form.address} onChange={e => dispatch(setAddress(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField size='small' fullWidth label='Registration Number' value={form.registrationNumber} onChange={e => dispatch(setRegistrationNumber(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField size='small' fullWidth label='Phone' value={form.phone} onChange={e => dispatch(setPhone(e.target.value))} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField size='small' fullWidth label='Email' value={form.email} onChange={e => dispatch(setEmail(e.target.value))} />
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

export default MerchantSearch
