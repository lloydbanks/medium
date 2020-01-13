import { useEffect, useState } from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage'

export default url => {
  const BASE_URL = 'https://conduit.productionready.io/api'

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [params, setParams] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = (params = {}) => {
    const options = {
      ...params,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }
    setParams(options)
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) return

    axios(BASE_URL + url, params)
      .then(({ data }) => {
        setData(data)
      })
      .catch(error => {
        setError(error.response.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [loading, params, url])

  return [{ loading, data, error }, doFetch]
}
