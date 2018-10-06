import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Auth from './Auth'
import { BrowserRouter } from 'react-router-dom'

const appJsx = (
  <BrowserRouter>
    <Auth />
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
