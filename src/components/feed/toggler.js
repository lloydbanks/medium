import React from 'react'
import { NavLink } from 'react-router-dom'

const FeedToggler = ({ tag }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink to="/feed" className="nav-link">
            Your feed
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Global feed
          </NavLink>
        </li>
        {tag && (
          <li className="nav-item">
            <NavLink to={`/tags/${tag}`} className="nav-link" exact>
              <i className="ion-pound" /> {tag}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FeedToggler
