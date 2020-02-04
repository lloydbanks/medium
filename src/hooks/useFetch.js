import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage'

export default url => {
  const BASE_URL = 'https://conduit.productionready.io/api'

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [params, setParams] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((params = {}) => {
    setParams(params)
    setLoading(true)
  }, [])

  useEffect(() => {
    let skipResponseAfterDestroy = false

    if (!loading) return

    const options = {
      ...params,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }
    axios(BASE_URL + url, options)
      .then(({ data }) => {
        if (!skipResponseAfterDestroy) setData(data)
      })
      .catch(error => {
        if (!skipResponseAfterDestroy) setError(error.response.data)
      })
      .finally(() => {
        if (!skipResponseAfterDestroy) setLoading(false)
      })

    return () => (skipResponseAfterDestroy = true)
  }, [loading, params, url, token])

  return [{ loading, data, error }, doFetch]
}
