import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Feed from '../../components/feed'

const GlobalFeed = () => {
  const [{ loading, data, error }, doFetch] = useFetch(
    '/articles?limit=10&offset=0'
  )

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {loading && <p>Loading...</p>}
            {error && <p>An error occurred...</p>}
            {!loading && data && <Feed articles={data.articles} />}
          </div>
          <div className="col-md-3">
            <h3>Popular tags</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed
