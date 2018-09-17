import React from 'react';
import { connect } from 'react-redux';
import Store from '../../config/store';
import abedSprite from './abed.png';
import ripleySprite from './mechsuit.png';
import handleMovement from './movement';

function Ripley(props) {

  if (Store.store.getState().ripley.isAbed === false){
   
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