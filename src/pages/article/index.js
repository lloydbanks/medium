import React, { useEffect, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import { Loading, Error } from '../../components/status'
import { Link } from 'react-router-dom'
import TagList from '../../components/tags/list'
import { UserContext } from '../../contexts/user'

const Article = ({ match }) => {
  const { slug } = match.params
  const apiUrl = `/articles/${slug}`
  const [{ loading, data, error }, doFetch] = useFetch(apiUrl)
  const [user] = useContext(UserContext)

  const isAuthor = () => {
    if (!data || !user.logged) return

    return data.article.author.username === user.user.username
  }

  const deleteArticle = () => {
    console.log('delete Article')
  }

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="article-page">
      <div className="banner">
        {!loading && data && (
          <div className="container">
            <h1>{data.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${data.article.author.username}`}>
                <img src={data.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${data.article.author.username}`}>
                  {data.article.author.username}
                </Link>
                <span className="date">{data.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${data.article.slug}/edit`}
                  >
                    <i className="ion-edit"></i> Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a"></i> Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {loading && <Loading />}
        {error && <Error />}
        {!loading && data && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{data.article.body}</p>
              </div>
              <TagList tags={data.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
