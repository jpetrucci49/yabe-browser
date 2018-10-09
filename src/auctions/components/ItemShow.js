import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class ItemShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {}
    }
  }

  async componentDidMount() {
    const { user } = this.props
    console.log(this)
    // const response = await axios.get(`${apiUrl}/items/${this.props.match.params._id}`, { 'headers': { 'Authorization': `Bearer ${user.token}` }})
    // this.setState({item: response.data.item})
    // console.log(response)
  }

  render() {
    const { item } = this.state
    return (
      <section className='container'>
        <div key={item._id}>
          <h1>{item.name}</h1>
          <ul>
            <li>id - {item._id}</li>
            <li>name - {item.name}</li>
            <li>desc - {item.desc}</li>
            <li>price - {item.price}</li>
            <li>exp - {item.expiration_date}</li>
            <li>owner - {item.owner}</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default ItemShow
