import React from 'react'
import { connect } from 'react-redux'
import pierce from './player_walk.png'
import handleMovement from './movement'

function Pierce(props) {
    
  return (<div>
    {props.pierceArray.map(ball=> <div
      style={{
        position: 'absolute',
        top: ball.position[1],
        left: ball.position[0],
        backgroundImage: `url('${pierce}')`,
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
        backgroundImage: `url('${pierce}')`,
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
    ...state.pierce,
  }
}

export default connect(mapStateToProps)(handleMovement(Pierce))