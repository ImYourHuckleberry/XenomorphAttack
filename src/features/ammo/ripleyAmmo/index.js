import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './energyball.png'
import handleMovement from './movement'

function RipleyAmmo(props) {
    
  return (<div>
    {props.energyball.map(ball=> <div
      style={{
        position: 'absolute',
        top: ball.position[1],
        left: ball.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '65px',
        height: '65px',
      }}
    />)}
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
    </div>
  )
}

function mapStateToProps(state) {
  
  return {
    ...state.ripleyAmmo,
  }
}

export default connect(mapStateToProps)(handleMovement(RipleyAmmo))