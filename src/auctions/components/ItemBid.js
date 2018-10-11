import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import BidForm from './BidForm'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class ItemBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        bid: '',
        price: ''
      }
    }
  }

  handleChange = (event) => {
    console.log(this.state.item.bid)
    const enteredBid = {...this.state.item, [event.target.name]: event.target.value}
    this.setState({item: enteredBid})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    console.log(this.props)
    const newPrice = ('$'+ (Number(Number(this.state.item.bid).toFixed(2)) + Number(Number(this.props.item.price.replace(/[^0-9.-]+/g,'')).toFixed(2))).toFixed(2))
    const placeBid = JSON.stringify({item: {price: newPrice}})
    const { user, flash, history, match } = this.props
    const response = await axios.patch(`${apiUrl}/items/${match.params.id}`, placeBid, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    this.props.sendBid(newPrice)
  }

  render() {
    const { item } = this.state

    return (
      <section className='container'>
        <BidForm
          action="bid on this"
          item={item}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </section>
    )
  }
}

export default withRouter(ItemBid)
