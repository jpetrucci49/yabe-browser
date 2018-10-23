import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Clock from '../../countdown/components/Clock'
import SocketContext from '../../socket-context'
import * as io from 'socket.io-client'

class ItemIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      expired: false
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
    await axios.get(`${apiUrl}/items`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
      .then((res) => this.setState({items: res.data.items}))
      .then(() => {
        this.state.items.forEach((item, index) => {
          this.props.socket.on('bid-placed', bidValue => {
            if(item._id === bidValue._id) {
              const itemsCopy = this.state.items
              itemsCopy[index] = bidValue
              this.setState({items: itemsCopy})
            }
          })
        })
      })
  }

  updateExpired(newVal) {
    this.setState({expired: newVal})
  }

  render() {
    const { user } = this.props
    const itemCells = this.state.items.map(item => {
      const isOwner = (user._id === item.owner)
      const dateFormat = require('dateformat')

      return (
        <div key={item._id} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="box-part text-center">
            <div className="title">{item.name}</div>
            <div className="text">{item.desc}</div>
            <div className="text">${item.price}</div>
            <div className="text">{dateFormat(item.expiration_date, 'ddd, mmm dS, yyyy, h:MM:ss TT')}</div>
            <div className="text">
              <Clock
                expiration={item.expiration_date}
                expired={this.updateExpired.bind(this)}
              />
            </div>
            <Link to={`/items/${item._id}/show`}>
              <div className="centered">
                <button className='centered btn btn-info'> View this Auction </button>
              </div>
            </Link><br />
            {isOwner ? (
              <Fragment>
                <Link to={`/items/${item._id}/edit`}>
                  <div className="centered">
                    <button className='centered btn btn-info'> Edit this Auction </button>
                  </div>
                </Link><br/>
                <Link to={'/items/'}>
                  <div className="centered">
                    <button className='centered btn btn-info' onClick={event => this.deleteItem(event, item._id)}> Delete this Auction </button>
                  </div>
                </Link><br/>
              </Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      )
    })

    return (
      <section className='box'>
        <div className="container">
          <div className="row">
            {itemCells.length === 0 ? (
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <h3>Sorry, there is no list</h3>
              </div>
            ) : (
              <Fragment>
                {itemCells}
              </Fragment>
            )}
          </div>
        </div>
      </section>
    )
  }
}

const ItemIndexWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <ItemIndex {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default withRouter(ItemIndexWithSocket)
