import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'

class ItemIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  async deleteItem(event, itemId) {
    event.preventDefault()

    const { user } = this.props
    await axios.delete(`${apiUrl}/items/${itemId}`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    this.setState({items: this.state.items.filter(item => item._id !== itemId)})
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/items`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    this.setState({items: response.data.items})
  }

  render() {
    const itemCells = this.state.items.map(item => {
      return (
        <div key={item._id} className="col-md-4">
          <h1>{item.name}</h1>
          <ul>
            <li>id - <Link id={item._id} to={`/items/${item._id}/show`}>{item._id}</Link></li>
            <li>name - {item.name}</li>
            <li>desc - {item.desc}</li>
            <li>price - {item.price}</li>
            <li>exp - {item.expiration_date}</li>
            <li>owner - {item.owner}</li>
          </ul>
          <Link to={`/items/${item._id}/show`}>
            <button> View this Auction </button>
          </Link>
          <Link to={`/items/${item._id}/edit`}>
            <button> Edit this Auction </button>
          </Link>
          <Link to={'/items/'}>
            <button onClick={event => this.deleteItem(event, item._id)}> Delete this Auction </button>
          </Link>
        </div>
      )
    })

    return (
      <section className='container'>
        <div className='row'>
          {itemCells}
        </div>
      </section>
    )
  }

}

export default withRouter(ItemIndex)
