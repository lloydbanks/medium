import React, { useState, useEffect, useContext } from 'react'
import ArticleForm from '../../components/article/form'
import useFetch from '../../hooks/useFetch'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../contexts/user'

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [{ data, error }, doFetch] = useFetch(apiUrl)
  const [user] = useContext(UserContext)
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
  const [success, setSuccess] = useState(false)
  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    if (!data) return

    setSuccess(true)
  }, [data])

  if (user.logged === false) return <Redirect to="/" />

  if (success) {
    return <Redirect to={`/articles/${data.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle
