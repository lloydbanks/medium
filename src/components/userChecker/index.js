import { useEffect, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserContext } from '../../contexts/user'

const UserChecker = ({ children }) => {
  const [{ data }, doFetch] = useFetch('/user')
  const [, dispatch] = useContext(UserContext)
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'LOGOUT' })
      return
    }

    doFetch()
    dispatch({ type: 'LOADING' })
  }, [token, dispatch, doFetch])

  useEffect(() => {
    if (!data) return

    dispatch({ type: 'LOGIN', payload: data.user })
  }, [data, dispatch])

  return children
}

export default UserChecker
