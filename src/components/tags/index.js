import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { Loading, Error } from '../../components/status'
import { Link } from 'react-router-dom'

const Tags = () => {
  const [{ data, loading, error }, doFetch] = useFetch('/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (loading || !data) return <Loading />
  if (error) return <Error />

  return (
    <div className="sidebar">
      <p>popular tags</p>
      <div className="tag-list">
        {data.tags.map(tag => (
          <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tags
