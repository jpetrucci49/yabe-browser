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
        price: '0.00'
      }
    }
  }

  handleChange = event => {
    const newItem = {...this.state.item, [event.target.name]: event.target.value}
    newItem.price = Number(newItem.price)
    this.setState({item: newItem})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { user, flash, history } = this.props
    if ( this.state.item.price < 0 ) {
      flash('Surely, you don\'t really want to pay someone to take this item. Try again!', 'flash-error')
    } else {
      const dollars = Object.assign({}, this.state.item)
      dollars.price = this.state.item.price.toFixed(2)
      dollars.expiration_date = (this.state.item.expiration_date + '-0400')
      const itemParams = JSON.stringify({item: dollars})
      const response = await axios.post(`${apiUrl}/items`, itemParams, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
        .then(res => history.push(`/items/${res.data.item._id}/show`))
        .then(() => flash(messages.newItemSuccess, 'flash-success'))
        .catch(() => flash(messages.newItemFailure, 'flash-error'))
    }
  }

  render() {
    const { item } = this.state

    return (
      <section className='box'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 shell'>
              <ItemForm
                action='create'
                item={item}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(ItemNew)
