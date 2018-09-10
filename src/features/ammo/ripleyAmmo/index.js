import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './energyball.png'
import handleMovement from './movement'

function RipleyAmmo(props) {
    
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
    ...state.ripleyAmmo,
  }
}

export default connect(mapStateToProps)(handleMovement(RipleyAmmo))