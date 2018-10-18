import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Clock from '../../countdown/components/Clock'

class ItemIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  async deleteItem(event, itemId) {
    event.preventDefault()

    const { user, flash } = this.props
    await axios.delete(`${apiUrl}/items/${itemId}`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
      .then(() => this.setState({items: this.state.items.filter(item => item._id !== itemId)}))
      .then(() => flash('Your auction item has been deleted!', 'flash-success'))
      .catch(() => flash('There was an error deleting this auction item.', 'flash-error'))
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/items`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    this.setState({items: response.data.items})
  }

  render() {
    const { user } = this.props
    const itemCells = this.state.items.map(item => {
      const isOwner = (user._id === item.owner)
      const dateFormat = require('dateformat')

      return (
        <div key={item._id} className="col-md-4">
          <h3>{item.name}</h3>
          <ul>
            <li>{item.desc}</li>
            <li>${item.price}</li>
            <li>{dateFormat(item.expiration_date, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</li>
            <li>
              <Clock
                expiration={item.expiration_date}
              />
            </li>
          </ul>
          <Link to={`/items/${item._id}/show`}>
            <div className="centered">
              <button> View this Auction </button>
            </div>
          </Link><br />
          {isOwner ? (
            <Fragment>
              <Link to={`/items/${item._id}/edit`}>
                <div className="centered">
                  <button className="centered"> Edit this Auction </button>
                </div>
              </Link><br/>
              <Link to={'/items/'}>
                <div className="centered">
                  <button className="centered" onClick={event => this.deleteItem(event, item._id)}> Delete this Auction </button>
                </div>
              </Link><br/>
            </Fragment>
          ) : (
            ''
          )}
        </div>
      )
    })

    return (
      <section className='container'>
        <div className='row'>
          {itemCells.length === 0 ? (
            <div className="col-md-4">
              <h3>Sorry, there is no list</h3>
            </div>
          ) : (
            <Fragment>
              {itemCells}
            </Fragment>
          )}
        </div>
      </section>
    )
  }

}

export default withRouter(ItemIndex)
