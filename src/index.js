import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

const appJsx = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
