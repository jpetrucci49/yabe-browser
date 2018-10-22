import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Link } from 'react-router-dom'
import ItemBid from './ItemBid'
import Clock from '../../countdown/components/Clock'
import SocketContext from '../../socket-context'
import * as io from 'socket.io-client'

class ItemShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {},
      expired: false
    }
  }

  handleBid = async (newPrice) => {
    const copy = Object.assign({}, this.state.item)
    copy.price = newPrice
    copy.winner = this.props.user._id
    this.setState({item: copy})
    this.props.socket.emit('bid-placed', this.state.item)
  }

  async deleteItem(event, itemId) {
    event.preventDefault()

    const { user, history, flash } = this.props
    await axios.delete(`${apiUrl}/items/${itemId}`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
      .then(() => history.push('/items'))
      .then(() => flash('Your auction item has been deleted!', 'flash-success'))
      .catch(() => flash('There was an error deleting this auction item.', 'flash-error'))
  }

  async componentDidMount() {
    const { user } = this.props
    const { id } = this.props.match.params
    this.props.socket.on('bid-placed', (res) => this.setState({item: res}))
    await axios.get(`${apiUrl}/items/${id}`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
      .then((res) => this.setState({item: res.data.item}))
  }

  updateExpired(newVal) {
    this.setState({expired: newVal})
  }

  render() {
    const { item } = this.state
    const { user, flash } = this.props
    const isNotOwner = (user._id != item.owner)
    const isNotExpired = (this.state.expired != true)
    const dateFormat = require('dateformat')
    return (
      <section className='col-md-12'>
        <div key={item._id}>
          <h3>{item.name}</h3>
          <ul>
            <li>{item.desc}</li>
            <li>${item.price}</li>
            {item.winner === user._id && isNotOwner && isNotExpired ? (
              <li>You are top bidder </li>
            ) : (
              isNotOwner ? (
                <li>Place a bid!</li>
              ) : (
                ''
              )
            )
            }
            <li>{dateFormat(item.expiration_date, 'ddd, mmm dS, yyyy, h:MM:ss TT')}</li>
            <li>
              <Clock
                expiration={item.expiration_date}
                expired={this.updateExpired.bind(this)}
              />
            </li>
          </ul>
          { isNotExpired ? (isNotOwner ? (
            <ItemBid flash={flash} item={item} user={user} sendBid={this.handleBid}/>
          ) : (
            <Fragment>
              <Link to={`/items/${item._id}/edit`}>
                <div className="centered">
                  <button> Edit this Auction </button>
                </div>
              </Link><br />
              <Link to={'/items/'}>
                <div className="centered">
                  <button onClick={event => this.deleteItem(event, item._id)}> Delete this Auction </button>
                </div>
              </Link><br/>
            </Fragment>
          )) : ''}
        </div>
      </section>
    )
  }
}

const ItemShowWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <ItemShow {...props} socket={socket} />}
  </SocketContext.Consumer>
)
export default withRouter(ItemShowWithSocket)
