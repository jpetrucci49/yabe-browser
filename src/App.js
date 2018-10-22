import React, { Fragment } from 'react'
import './App.scss'
import Auth from './auth/Auth'
import SocketContext from './socket-context'
import * as io from 'socket.io-client'
import apiUrl from './apiConfig'

const socket = io(apiUrl)
console.log(socket)

const App = (props) => (
  <Fragment>
    <main className="container">
      <SocketContext.Provider value={socket}>
        <Auth/>
      </SocketContext.Provider>
    </main>
  </Fragment>
)

export default App
