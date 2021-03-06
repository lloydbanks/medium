import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../contexts/user'

const Topbar = () => {
  const [userState] = useContext(UserContext)
  const { user } = userState

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand ">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          {!userState.logged && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
          {userState.logged && (
            <>
              <li className="nav-item">
                <NavLink to="/articles/create" className="nav-link">
                  <i className="ion-compose"></i>
                  &nbsp; New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className="ion-gear-a"></i>
                  &nbsp; Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/profile/${user.username}`} className="nav-link">
                  {user.image && (
                    <img src={user.image} alt="" className="user-pic" />
                  )}
                  {user.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Topbar
