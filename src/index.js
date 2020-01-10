import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <h1>Routes</h1>
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
