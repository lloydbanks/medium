import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './pages/globalFeed'
import TagFeed from './pages/tagFeed'
import YourFeed from './pages/yourFeed'
import Article from './pages/article'
import CreateArticle from './pages/article/create'
import EditArticle from './pages/article/edit'
import Auth from './pages/auth'
import Settings from './pages/settings'
import Profile from './pages/profile'

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/profile/:slug" component={Profile} />
      <Route path="/profile/:slug/favorites" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/articles/create" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  )
}
