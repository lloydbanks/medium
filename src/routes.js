import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './pages/globalFeed'
import TagFeed from './pages/tagFeed'
import YourFeed from './pages/yourFeed'
import Article from './pages/article'
import CreateArticle from './pages/article/create'
import Auth from './pages/auth'

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/articles/create" component={CreateArticle} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  )
}
