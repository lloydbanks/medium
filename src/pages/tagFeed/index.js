import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Feed from '../../components/feed'
import Pagination from '../../components/pagination'
import { getPaginator } from '../../helpers'
import { stringify } from 'query-string'
import { LIMIT } from '../../helpers'
import Tags from '../../components/tags'
import { Loading, Error } from '../../components/status'
import FeedToggler from '../../components/feed/toggler'

const TagFeed = ({ location, match }) => {
  const tag = match.params.slug
  const { offset, current } = getPaginator(location.search)
  const { url } = match
  const params = stringify({ limit: LIMIT, offset, tag })
  const apiUrl = `/articles?${params}`
  const [{ loading, data, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [current, tag, doFetch])

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
            <FeedToggler tag={tag} />

            {loading && <Loading />}
            {error && <Error />}
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
            <Tags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
