import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import TopBar from './components/topbar'
import { UserProvider } from './contexts/user'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </UserProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
