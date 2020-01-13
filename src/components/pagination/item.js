import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const PaginationItem = ({ page, current = 1, url = '/' }) => {
  const liClasses = classNames({
    'page-item': true,
    active: current === page
  })

  return (
    <li key={page} className={liClasses}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  )
}

export default PaginationItem
