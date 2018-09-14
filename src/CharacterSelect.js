import React, { Component } from 'react'
import World from './features/world'
import store from "./config/store";
import Ripley from './features/ripley'
import { connect } from 'react-redux'


class CharacterSelect extends Component {
dispatchAbedState(){
    store.dispatch({
        type:'UPDATE_ABED',
        payload: true
    })
    window.location = "/play"
}
play(){
    window.location = "/play"
}
   
  render() {
    return (
      <div>
          <div>
       <button onClick= {this.dispatchAbedState}><img
            style={{ width: "100px" }}
            src="/characters/singleabed.png"
            alt="Abed"
          /></button>
      </div>
      <div><button onClick={this.play}><img
            style={{ width: "100px" }}
            src="/characters/singleripley.png"
            alt="Ripley"
          />
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

