import React, { Component } from 'react'
import World from './features/world'
import Store from "./config/store";
import Ripley from './features/ripley'
import { connect } from 'react-redux'


class CharacterSelect extends Component {
dispatchAbedState(){
    Store.store.dispatch({
        type:'UPDATE_ABED',
        payload: false
    })
    Store.persistor.persist(),
    window.location = "/play"
}
play(){
    window.location = "/play"
}
   
  render() {
    return (
        
      <div><div>Select A Character</div>
          <div>
       <button onClick= {this.play}><img
            style={{ width: "100px", height: "150px"}}
            src="/characters/singleabed.png"
            alt="Abed"
          /><div>ABED</div></button>
      </div>
      <div><button onClick={this.dispatchAbedState}><img
            style={{ width: "100px", height:"150px"}}
            src="/characters/singleripley.png"
            alt="Ripley"
          /><div>RIPLEY</div>
          </button></div></div>
    )
  }
}
function mapStateToProps(state){
    return{
        ...state.ripley,
    }
}

export default connect(mapStateToProps)(CharacterSelect)

