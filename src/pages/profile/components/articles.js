import React, { useEffect } from 'react'
import { getPaginator, LIMIT } from '../../../helpers'
import { stringify } from 'query-string'
import useFetch from '../../../hooks/useFetch'
import { Error, Loading } from '../../../components/status'
import Feed from '../../../components/feed'
import Pagination from '../../../components/pagination'

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit: LIMIT, offset, favorited: username }
    : { limit: LIMIT, offset, author: username }

  return `/articles?${stringify(params)}`
}

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { current, offset } = getPaginator(location.search)
  const apiUrl = getApiUrl({ username, offset, isFavorites })
  const [{ data, loading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites])

  return (
    <div>
      {loading && <Loading />}
      {error && <Error />}

      {!loading && data && (
        <>
          <Feed articles={data.articles} />
          <Pagination
            total={data.articlesCount}
            limit={LIMIT}
            url={url}
            current={current}
          />
        </>
      )}
    </div>
  )
}

export default UserArticles
