import React from 'react'
import { connect } from 'react-redux'
import ripleySprite from './mechsuit.png'
import handleMovement from './movement'
import abedSprite from './abed.png'
import store from '../../config/store';

function Ripley(props) {

  if (store.getState().ripley.isAbed === false){
   
  return (
    
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${ripleySprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '65px',
        height: '65px',
      }}
    />
  )
}
else{return ( <div
  style={{
    position: 'absolute',
    top: props.position[1],
    left: props.position[0],
    backgroundImage: `url('${abedSprite}')`,
    backgroundPosition: props.spriteLocation,
    width: '65px',
    height: '65px',
  }}
/>)}
}
function mapStateToProps(state) {
  return {
    ...state.ripley,
  }
}

export default connect(mapStateToProps)(handleMovement(Ripley))