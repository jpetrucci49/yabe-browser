import React, { Fragment } from 'react'

const ItemForm = (props) => {
  const { action, item, handleChange, handleSubmit } = props
  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1) // or use CSS

  return (
    <Fragment>
      <h1>{formattedAction} Item</h1>

      <p><input type="text" name="name" value={item.name} onChange={handleChange} placeholder="name" /></p>
      <p><input type="text" name="desc" value={item.desc} onChange={handleChange} placeholder="description" /></p>
      <p><input type="text" name="price" value={item.price} onChange={handleChange} placeholder="price" /></p>

      <p><input type="submit" value="Submit" onClick={handleSubmit} /></p>
    </Fragment>
  )
}

export default ItemForm
