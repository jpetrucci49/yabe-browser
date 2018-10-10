import React, { Component, Fragment } from 'react'
import './Auth.scss'
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import Header from '../header/Header'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import ChangePassword from './components/ChangePassword'
import ItemIndex from '../auctions/components/ItemIndex'
import ItemShow from '../auctions/components/ItemShow'
import ItemNew from '../auctions/components/ItemNew'
import ItemEdit from '../auctions/components/ItemEdit'

class Auth extends Component {
  constructor (props) {
    super(props)

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
      <BrowserRouter>
        <Fragment>
          <Header user={user} />
          {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

          <Route exact path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items' render={() => (
            <ItemIndex flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id/show' render={() => (
            <ItemShow flash={this.flash} user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/items/new' render={() => (
            <ItemNew flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id/edit' render={() => (
            <ItemEdit flash={this.flash} user={user} />
          )} />
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default withRouter(Auth)
