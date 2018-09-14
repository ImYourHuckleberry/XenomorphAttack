import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './abed.png'
import handleMovement from './movement'

function Abed(props) {
    
  return (
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '65px',
        height: '65px',
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    ...state.abed,
  }
}

//export default connect(mapStateToProps)(handleMovement(Abed))