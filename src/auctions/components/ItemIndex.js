import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class ItemIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/items`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    this.setState({items: response.data.items})
  }

  render() {
    const itemCells = this.state.items.map(item => {
      return (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <ul>
            <li>id - <Link to={`/items/${item._id}/show`}>{item._id}</Link></li>
            <li>name - {item.name}</li>
            <li>desc - {item.desc}</li>
            <li>price - {item.price}</li>
            <li>exp - {item.expiration_date}</li>
            <li>owner - {item.owner}</li>
          </ul>
        </div>
      )
    })

    return (
      <section className='container'>
        {itemCells}
      </section>
    )
  }

}

export default ItemIndex
