import React, { Fragment } from 'react'

const ItemForm = (props) => {
  const { action, item, handleChange, handleSubmit } = props
  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1) // or use CSS
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h1>{formattedAction} Item</h1>

        <p><input type='text' name='name' value={item.name} onChange={handleChange} placeholder={ item.name === '' ? 'Name' : item.name } /></p>
        <p><input type='text' name='desc' value={item.desc} onChange={handleChange} placeholder={ item.desc === '' ? 'Description' : item.desc } /></p>
        {action !== 'edit' ? (
          <Fragment>
            <p><input type='datetime-local' name='expiration_date' value={item.expiration_date === '' ? new Date().toISOString().substr(0, 19) : item.exporation_date} onChange={handleChange} /></p>
            <p><input type='number' step='0.01' name='price' value={item.price || 0.00} onChange={handleChange} placeholder='price' /></p>
          </Fragment>
        ) : ''
        }



        <p><input type='submit' value='Submit' /></p>
      </form>
    </Fragment>
  )
}

export default ItemForm
