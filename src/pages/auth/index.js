import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserContext } from '../../contexts/user'
import Error from './components/error'

const Auth = props => {
  const isLogin = props.match.path === '/login'
  const title = isLogin ? 'Sign in' : 'Sign up'
  const link = isLogin ? '/register' : '/login'
  const linkText = isLogin ? 'Need an account?' : 'Have an account?'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  const apiUrl = isLogin ? '/users/login' : '/users'
  const [{ loading, data, error }, doFetch] = useFetch(apiUrl)
  const [, setToken] = useLocalStorage('token')
  const [, dispatch] = useContext(UserContext)

  const handleSubmit = e => {
    e.preventDefault()

    const user = isLogin ? { email, password } : { email, password, username }
    doFetch({
      method: 'post',
      data: { user }
    })
  }

  useEffect(() => {
    if (!data) return

    const { user } = data
    dispatch({ type: 'LOGIN', payload: user })

    setToken(user.token)
    setIsSubmit(true)
  }, [data, setToken, dispatch])

  if (isSubmit) return <Redirect to="/" />

  return (
    <div>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{title}</h1>
              <p className="text-xs-center">
                <Link to={link}>{linkText}</Link>
              </p>
              <form onSubmit={handleSubmit}>
                {error && <Error text={error.errors} />}

                <fieldset>
                  {!isLogin && (
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Login"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </fieldset>
                  )}
                  <fieldset className="form-group">
                    <input
                      type="email"
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
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={loading}
                  >
                    {title}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
