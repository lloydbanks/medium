import React from 'react'
import classNames from 'classnames'
import useFetch from '../../hooks/useFetch'

const AddToFavorites = ({ favorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`
  const [{ data }, doFetch] = useFetch(apiUrl)
  const favoritesCountData = data ? data.article.favoritesCount : favoritesCount
  const favoritedData = data ? data.article.favorited : favorited

  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': favoritedData,
    'btn-outline-primary': !favoritedData
  })

  const handleLike = e => {
    e.preventDefault()

    doFetch(
      {
        method: favoritedData ? 'delete' : 'post'
      },
      [data]
    )
  }

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountData}</span>
    </button>
  )
}

export default AddToFavorites
