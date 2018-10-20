import React from 'react'

const Home = ({ user }) => {
  return (
    <section className='col-md-12'>
      <div className='home-para'>
        {user ? (
          <h3>Welcome back, {user.email.substr(0, user.email.indexOf('@'))}</h3>
        ) : (
          <h3 className='homeNoUser'>This application is Not a  live auction site. No money or credit information is accepted.</h3>
        )}
      </div>
    </section>
  )
}

export default Home
