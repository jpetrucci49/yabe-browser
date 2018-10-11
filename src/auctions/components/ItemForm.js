import React, { Fragment } from 'react'

const ItemForm = (props) => {
  const { action, item, handleChange, handleSubmit } = props
  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1) // or use CSS

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h1>{formattedAction} Item</h1>

        <p><input type="text" name="name" value={item.name} onChange={handleChange} placeholder="name" /></p>
        <p><input type="text" name="desc" value={item.desc} onChange={handleChange} placeholder="description" /></p>
        <p><input type="number" step="0.01" name="price" value={item.price || 0} onChange={handleChange} placeholder="price" /></p>

        <p><input type="submit" value="Submit" /></p>
      </form>
    </Fragment>
  )
}

export default ItemForm
