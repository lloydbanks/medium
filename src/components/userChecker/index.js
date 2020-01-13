import { useEffect, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserContext } from '../../contexts/user'

const UserChecker = ({ children }) => {
  const [{ data }, doFetch] = useFetch('/user')
  const [, setUser] = useContext(UserContext)
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      setUser(state => ({
        ...state,
        logged: false
      }))

      return
    }

    doFetch()
    setUser(state => ({
      ...state,
      loading: true
    }))
  }, [token, setUser, doFetch])

  useEffect(() => {
    if (!data) return

    setUser(state => ({
      ...state,
      user: data.user,
      logged: true,
      loading: false
    }))
  }, [data, setUser])

  return children
}

export default UserChecker
