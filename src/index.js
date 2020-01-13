import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import TopBar from './components/topbar'
import { UserProvider } from './contexts/user'
import UserChecker from './components/userChecker'

const App = () => {
  return (
    <UserProvider>
      <UserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </UserChecker>
    </UserProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
