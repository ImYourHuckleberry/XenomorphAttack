import React, { Component } from 'react'
import World from './features/world'
import persistor from './config/store'
import Store from './config/store'
import store from './config/store'

class WinScreen extends Component {
  purge(){
    Store.persistor.purge(),
    window.location = "/"
  }
  render() {
    return (
      <div>
      <div>
        <img src="http://raymescallado.com/wp-content/uploads/2018/02/troyversusthezombies-shr.gif"/>
      </div>
      <div>
        <button onClick={this.purge}>Play Again</button>
      </div>
      </div>
      
    )
  }
}

export default WinScreen