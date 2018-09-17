import React, { Component } from 'react'
import World from './features/world'
import Store from './config/store'

class BattleScreen extends Component {
  purge(){
    Store.persistor.purge(),
    window.location = "/"
  }
  render() {
    return (<div>
      <div>
        <img src="https://78.media.tumblr.com/59275b5a8ad93aef23be16fb506a77ea/tumblr_nvka7e6AmH1uxpv1ro1_r1_400.gif"/>
      </div>
      <button onClick={this.purge}>Play Again</button>
      </div>
    )
  }
}

export default BattleScreen