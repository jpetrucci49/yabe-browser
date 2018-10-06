import React, { Component, Fragment } from 'react'
import Auth from './auth/Auth'
import Counter from './counter/Counter'

class App extends Component {

  render () {

    return (
      <Fragment>
        <Auth/>
        <Counter/>
      </Fragment>
    )
  }
}

export default App
