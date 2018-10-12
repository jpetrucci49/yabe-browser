import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Link } from 'react-router-dom'
import ItemBid from './ItemBid'

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
    return (
      <section className='container'>
        <div key={item._id}>
          <h1>{item.name}</h1>
          <ul>
            <li>desc - {item.desc}</li>
            <li>price - {item.price}</li>
            <li>exp - {item.expiration_date}</li>
          </ul>
          {isNotOwner ? (
            <ItemBid flash={flash} item={item} user={user} sendBid={this.handleBid}/>
          ) : (
            <Fragment>
              <Link to={`/items/${item._id}/edit`}>
                <button> Edit this Auction </button>
              </Link>
              <Link to={'/items/'}>
                <button onClick={event => this.deleteItem(event, item._id)}> Delete this Auction </button>
              </Link><br/>
            </Fragment>
          )}
        </div>
      </section>
    )
  }
}

export default withRouter(ItemShow)
