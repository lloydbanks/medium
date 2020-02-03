import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { Loading } from '../../components/status'
import { NavLink } from 'react-router-dom'

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
                    to={`/profiles/${profile.username}`}
                    className="nav-link"
                    exact
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
