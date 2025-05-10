import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NUMBER_OF_ROWS_FROM_SERVER } from 'src/utils/consts'
import { setRowAdded, setRowDeleted, setRowUpdated, setRowSearched } from 'src/store/rowsRequestedFromServer/rowsRequestedFromServerSearchSlice'

export function useServerTable(page, pageSize, asyncSearchTableData, queryData, setQueryData, setPage, setPageSize) {
  const dispatch = useDispatch()
  const state = useSelector(rootState => rootState.rowsRequestedFromServer.search)
  const [loading, setLoading] = useState(false)
  const [loadedChunks, setLoadedChunks] = useState(new Set())
  const [localData, setLocalData] = useState([])
  const [totalRowCount, setTotalRowCount] = useState(0)
  const [allowMoreServerCalls, setAllowMoreServerCalls] = useState(true)
  useEffect(() => {
    if (state.rowAdded) {
      dispatch(setRowAdded(false))
      setPage(0)
      setLocalData([])
      setLoadedChunks(new Set())
      setAllowMoreServerCalls(true)
    }
    if (state.rowDeleted) {
      dispatch(setRowDeleted(false))
      setLocalData([])
      setLoadedChunks(new Set())
      setAllowMoreServerCalls(true)
    }
    if (state.rowUpdated) {
      dispatch(setRowUpdated(false))
      setLocalData([])
      setLoadedChunks(new Set())
      setAllowMoreServerCalls(true)
    }
  }, [state.rowAdded, state.rowDeleted, state.rowUpdated])

  useEffect(() => {
    if (state.rowSearched) {
      dispatch(setRowSearched(false))
      setPage(0)
      setLocalData([])
      setLoadedChunks(new Set())
      setAllowMoreServerCalls(true)
    }
  }, [state.rowSearched])

  useEffect(() => {
    if (!allowMoreServerCalls) return

    setLoading(true)
    const endRow = Math.min((page + 1) * pageSize - 1, totalRowCount ? totalRowCount - 1 : Infinity)
    const endChunk = Math.floor(endRow / NUMBER_OF_ROWS_FROM_SERVER)
    const chunksToFetch = []
    for (let chunk = 0; chunk <= endChunk; chunk++) {
      if (!loadedChunks.has(chunk)) {
        chunksToFetch.push(chunk)
      }
    }

    const promises = chunksToFetch.map(chunk => {
      const query = `?page=${chunk}&size=${NUMBER_OF_ROWS_FROM_SERVER}${queryData ? `&${queryData}` : ''}`
      dispatch(setQueryData(query))
      return dispatch(asyncSearchTableData(query)).then(response => {
        const { data: newData, total } = response.payload
        setTotalRowCount(total)

        if (newData.length === 0) {
          setAllowMoreServerCalls(false)
          return
        }

        setLocalData(prev => {
          const start = chunk * NUMBER_OF_ROWS_FROM_SERVER
          const merged = [...prev]
          newData.forEach((row, i) => {
            merged[start + i] = row
          })
          return merged.filter(Boolean)
        })

        setLoadedChunks(prev => new Set(prev).add(chunk))

        if (total <= (page + 1) * pageSize) {
          setAllowMoreServerCalls(false)
        }
      })
    })

    Promise.all(promises).finally(() => setLoading(false))
  }, [page, pageSize, loadedChunks, allowMoreServerCalls, setQueryData])

  return { loading, localData, totalRowCount }
}
