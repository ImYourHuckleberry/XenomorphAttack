import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import Main from './routes'

import store from './config/store'

ReactDOM.render(<Provider store={store}>
  <Main />
</Provider>, document.getElementById('root'))