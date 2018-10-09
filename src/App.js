import React, { Component, Fragment } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'
import Auth from './auth/Auth'

class App extends Component {

  render () {

    return (
      <Fragment>
        <main className="container">
          <Auth/>
        </main>
      </Fragment>
    )
  }
}
export default App
