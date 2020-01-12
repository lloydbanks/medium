import React, { useContext } from 'react'
import { UserContext } from '../../contexts/user'

const GlobalFeed = () => {
  const [{ user }] = useContext(UserContext)

  return (
    <div className="container page">
      <div className="col-md-6 offset-md-3 col-xs-12 text-xs-center">
        <h3>GlobalFeed</h3>
        {user && <h4>hello, {user.username}</h4>}
      </div>
    </div>
  )
}

export default GlobalFeed
