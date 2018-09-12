import React from 'react'
import { connect } from 'react-redux'
import abedAmmo from './abedAmmo.png'
import handleMovement from './movement'

function AbedAmmo(props) {
    
  return (<div>
    {props.potion.map(ball=> <div
      style={{
        position: 'absolute',
        top: ball.position[1],
        left: ball.position[0],
        backgroundImage: `url('${abedAmmo}')`,
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
        backgroundImage: `url('${abedAmmo}')`,
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
    ...state.abedAmmo,
  }
}

export default connect(mapStateToProps)(handleMovement(AbedAmmo))