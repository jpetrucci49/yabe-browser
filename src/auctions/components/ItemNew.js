import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import ItemForm from './ItemForm'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import messages from '../../auth/messages'

class ItemNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        name: '',
        desc: '',
        price: ''
      }
    }
  }

  handleChange = event => {
    const newItem = {...this.state.item, [event.target.name]: event.target.value}
    this.setState({item: newItem})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const itemParams = JSON.stringify({item: this.state.item})
    const { user, flash, history } = this.props
    const response = await axios.post(`${apiUrl}/items`, itemParams, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    history.push(`/items/${response.data.item._id}/show`)

    // newItem(this.state.item, user)
    //   .then(res => res.ok ? res : new Error())
    //   .then(res => res.json())
    //   .then(() => flash(messages.newItemSuccess, 'flash-success'))
    //   .catch(() => flash(messages.newItemFailure, 'flash-error'))
  }

  render() {
    const { item } = this.state

    return (
      <section className='container'>
        <ItemForm
          action="create"
          item={item}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </section>
    )
  }
}

export default withRouter(ItemNew)
