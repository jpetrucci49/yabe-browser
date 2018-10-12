import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import ItemForm from './ItemForm'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class ItemEdit extends Component {
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

  handleChange = (event) => {
    const editedItem = {...this.state.item, [event.target.name]: event.target.value}
    this.setState({item: editedItem})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const itemParams = JSON.stringify({item: this.state.item})
    const { user, flash, history, match } = this.props
    const response = await axios.patch(`${apiUrl}/items/${match.params.id}`, itemParams, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
      .then(() => history.push(`/items/${match.params.id}/show`))
      .then(() => flash('Your auction item has been successfully edited!', 'flash-success'))
      .catch(() => flash('There was an error editing this auction item.', 'flash-error'))
  }

  render() {
    const { item } = this.state

    return (
      <section className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <ItemForm
              action="edit"
              item={item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(ItemEdit)
