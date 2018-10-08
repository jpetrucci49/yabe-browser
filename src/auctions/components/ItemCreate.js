import React, { Component } from 'react'

class ItemNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {
        name: '',
        desc: '',
        price: '',
        expiration_date: ''
      }
    }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }

}

export default ItemNew
