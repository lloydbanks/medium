import React from 'react'
import { LIMIT, range } from '../../helpers'
import PaginationItem from './item'

const Pagination = ({ total, limit = LIMIT, url, current }) => {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)

  if (pagesCount < 2) return null

  return (
    <div>
      <ul className="pagination">
        {pages.map(page => (
          <PaginationItem key={page} current={current} url={url} page={page} />
        ))}
      </ul>
    </div>
  )
}

export default Pagination
