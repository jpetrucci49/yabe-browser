import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

axios.defaults.headers['Content-Type'] = 'application/json'
const appJsx = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
