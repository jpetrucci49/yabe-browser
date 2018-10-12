import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const BidForm = (props) => {
  const { action, item, handleChange, handleSubmit } = props
  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1) // or use CSS

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h4>{formattedAction} Item</h4>

        <p><input type="number" step="0.01" name="bid" value={item.bid} onChange={handleChange} placeholder="Amount" /></p>

        <p><input type="submit" value="Submit" /></p>
      </form>
    </Fragment>
  )
}

export default withRouter(BidForm)
