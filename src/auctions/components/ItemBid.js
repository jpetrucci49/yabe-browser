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
        bid: 0.00,
        price: 0.00
      }
    }
  }

  handleChange = (event) => {
    event.preventDefault()

    const enteredBid = {...this.state.item, [event.target.name]: Number(event.target.value)}
    this.setState({item: enteredBid})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, flash, history, match } = this.props

    if (this.props.item.winner === user._id) {
      flash('You\'re already the top Bidder', 'flash-error')
    } else {
      if ( this.state.item.bid <= 0 ) {
        flash('Nice try, you cheeky devil. This isn\'t that kind of auction.', 'flash-error' )
      } else {
        const newPrice = (Number(this.state.item.bid.toFixed(2)) + Number(Number(this.props.item.price).toFixed(2))).toFixed(2)
        const placeBid = JSON.stringify({item: {
          price: newPrice,
          winner: user._id
        }})
        const response = await axios.patch(`${apiUrl}/items/${match.params.id}`, placeBid, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
          .then(() => this.props.sendBid(newPrice))
          .then(() => flash('You have successfully placed a bid!', 'flash-success'))
          .catch(() => flash('There was an problem with your bid.', 'flash-error'))
      }
    }
  }

  render() {
    const { item } = this.state

    return (
      <section className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <BidForm
              action="bid on this"
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

export default withRouter(ItemBid)
