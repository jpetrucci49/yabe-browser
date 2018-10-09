import React from 'react'
import apiUrl from '../../apiConfig'
import ItemForm from './ItemForm'
import ItemIndex from './ItemIndex'
import messages from '../../auth/messages'
import { newItem } from '../../auth/api'

class ItemNew extends React.Component {
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

  handleSubmit = event => {
    event.preventDefault()

    const itemParams = JSON.stringify({item: this.state.item})
    const { user, flash } = this.props
    newItem(this.state.item, user)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(() => flash(messages.newItemSuccess, 'flash-success'))
      .catch(() => flash(messages.newItemFailure, 'flash-error'))
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

export default ItemNew
