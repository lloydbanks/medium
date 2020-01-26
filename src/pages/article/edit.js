import React, { useEffect, useState, useContext } from 'react'
import ArticleForm from '../../components/article/form'
import useFetch from '../../hooks/useFetch'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../contexts/user'

const CreateArticle = ({ match }) => {
  const { slug } = match.params
  const apiUrl = '/articles/' + slug
  const [{ data }, getData] = useFetch(apiUrl)
  const [{ data: savedData, error }, saveArticle] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [success, setSuccess] = useState(false)
  const [user] = useContext(UserContext)

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (!data) return

    const { title, description, body, tagList } = data.article
    setInitialValues({ title, description, body, tagList })
  }, [data])

  const handleSubmit = article => {
    saveArticle({
      method: 'put',
      data: article
    })
  }

  useEffect(() => {
    if (!savedData) return

    setSuccess(true)
  }, [savedData])

  if (success) {
    return <Redirect to={`/articles/${slug}`} />
  } else if (user.logged === false) {
    return <Redirect to={`/articles`} />
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={error && error.errors}
      initialValues={initialValues}
    />
  )
}

export default CreateArticle
