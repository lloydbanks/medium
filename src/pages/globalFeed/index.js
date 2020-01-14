import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Feed from '../../components/feed'
import Pagination from '../../components/pagination'
import { getPaginator } from '../../helpers'
import { stringify } from 'query-string'
import { LIMIT } from '../../helpers'

const GlobalFeed = ({ location, match }) => {
  const { offset, current } = getPaginator(location.search)
  const { url } = match
  const params = stringify({ limit: LIMIT, offset })
  const apiUrl = `/articles?${params}`
  const [{ loading, data, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [current, doFetch])

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
            {!loading && data && (
              <>
                <Feed articles={data.articles} />
                <Pagination
                  total={data.articlesCount}
                  limit={LIMIT}
                  current={current}
                  url={url}
                />
              </>
            )}
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
