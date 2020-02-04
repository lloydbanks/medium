import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserContext } from '../../contexts/user'
import { Error } from '../../components/status'

const Settings = () => {
  const [userState, dispatch] = useContext(UserContext)
  const apiUrl = '/user'
  const [{ data, error }, doFetch] = useFetch(apiUrl)
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useLocalStorage('token')
  const [successLogout, setSuccessLogout] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    doFetch({
      method: 'put',
      data: {
        user: {
          ...userState.user,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  }
  const logout = e => {
    e.preventDefault()
    setToken('')
    dispatch({ type: 'LOGOUT' })
    setSuccessLogout(true)
  }

  useEffect(() => {
    if (!userState.user) return

    const { user } = userState
    if (user.image !== null) setImage(user.image)
    setUsername(user.username)
    if (user.bio !== null) setBio(user.bio)
    setEmail(user.email)
  }, [userState])

  useEffect(() => {
    if (!data) return

    dispatch({ type: 'LOGIN', payload: data.user })
  }, [data, dispatch])

  if (successLogout) return <Redirect to="/" />

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <Error text={error.errors} />}

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    rows="8"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
