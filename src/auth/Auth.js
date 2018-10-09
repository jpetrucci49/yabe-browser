import React, { Component, Fragment } from 'react'
import './Auth.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import Header from '../header/Header'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import ChangePassword from './components/ChangePassword'
import ItemIndex from '../auctions/components/ItemIndex'
import ItemShow from '../auctions/components/ItemShow'
import ItemNew from '../auctions/components/ItemNew'

class Auth extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <Route path='/sign-up' render={() => (
          <SignUp flash={this.flash} setUser={this.setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn flash={this.flash} setUser={this.setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword flash={this.flash} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/items' render={() => (
          <ItemIndex flash={this.flash} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/items/:id/show' render={() => (
          <ItemShow flash={this.flash} user={user} />
        )}/>
        <AuthenticatedRoute user={user} path='/items/new' render={() => (
          <ItemNew flash={this.flash} user={user} />
        )}/>
      </Fragment>
    )
  }
}

export default Auth
