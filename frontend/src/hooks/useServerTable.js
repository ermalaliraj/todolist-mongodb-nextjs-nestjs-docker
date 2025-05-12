// src/hooks/useServerTable.js
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRowAdded, setRowDeleted, setRowUpdated, setRowSearched } from 'src/store/rowsRequestedFromServer/rowsRequestedFromServerSearchSlice'

export function useServerTable(
  page,
  pageSize,
  asyncSearchTableData,
  extraQuery = '',
  resetDeps = [] // caller may omit or pass undefined/null
) {
  const dispatch = useDispatch()
  const state = useSelector(r => r.rowsRequestedFromServer.search)

  const [loading, setLoading] = useState(false)
  const [cache, setCache] = useState({})
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)

  const reset = () => {
    setCache({})
    setRows([])
    setTotal(0)
  }

  useEffect(() => {
    if (state.rowAdded) {
      dispatch(setRowAdded(false))
      reset()
    }
  }, [state.rowAdded])
  useEffect(() => {
    if (state.rowDeleted) {
      dispatch(setRowDeleted(false))
      reset()
    }
  }, [state.rowDeleted])
  useEffect(() => {
    if (state.rowUpdated) {
      dispatch(setRowUpdated(false))
      reset()
    }
  }, [state.rowUpdated])
  useEffect(() => {
    if (state.rowSearched) {
      dispatch(setRowSearched(false))
      reset()
    }
  }, [state.rowSearched])

  const cacheKey = `${page}-${pageSize}-${extraQuery}`

  useEffect(
    () => {
      if (cache[cacheKey]) {
        setRows(cache[cacheKey].rows)
        setTotal(cache[cacheKey].total)
        return
      }

      setLoading(true)
      const query = `?page=${page}&size=${pageSize}${extraQuery ? `&${extraQuery}` : ''}`

      dispatch(asyncSearchTableData(query))
        .then(res => {
          const { rows: fetched, totalRows } = res.payload
          setCache(prev => ({ ...prev, [cacheKey]: { rows: fetched, total: totalRows } }))
          setRows(fetched)
          setTotal(totalRows)
        })
        .finally(() => setLoading(false))
    },
    // ⬇︎ safe spread – fallback to []
    [cacheKey, ...(Array.isArray(resetDeps) ? resetDeps : [])]
  )

  return { loading, rows, total }
}
