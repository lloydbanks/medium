import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { Loading } from '../../components/status'
import { Link, NavLink } from 'react-router-dom'
import UserArticles from './components/articles'

const Profile = ({ location, match }) => {
  const slug = match.params.slug
  const isFavorites = location.pathname.includes('favorites')
  const apiUrl = `/profiles/${slug}`
  const [{ data }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (!data) return <Loading />

  const { profile } = data
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} alt="" className="user-img" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              <Link
                to="/settings"
                className="btn btn-sm btn-outline-secondary action-btn"
              >
                <i className="ion-gear-a"></i> Edit Profile Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profile/${profile.username}`}
                    className="nav-link"
                    exact
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profile/${profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorited Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={profile.username}
              location={location}
              isFavorites={isFavorites}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
