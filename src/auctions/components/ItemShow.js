import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Link } from 'react-router-dom'
import ItemBid from './ItemBid'
import Clock from '../../countdown/components/Clock'

class ItemShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {}
    }
  }

  handleBid = async (newPrice) => {
    const copy = Object.assign({}, this.state.item)
    copy.price = newPrice
    this.setState({item: copy})
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
    const response = await axios.get(`${apiUrl}/items/${id}`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    this.setState({item: response.data.item})
  }

  render() {
    const { item } = this.state
    const { user, flash } = this.props
    const isNotOwner = (user._id != item.owner)
    const dateFormat = require('dateformat')
    return (
      <section className='col-md-12'>
        <div key={item._id}>
          <h3>{item.name}</h3>
          <ul>
            <li>{item.desc}</li>
            <li>${item.price}</li>
            <li>{dateFormat(item.expiration_date, 'ddd, mmm dS, yyyy, h:MM:ss TT')}</li>
            <li>
              <Clock
                expiration={item.expiration_date}
              />
            </li>
          </ul>
          {isNotOwner ? (
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
          )}
        </div>
      </section>
    )
  }
}

export default withRouter(ItemShow)
