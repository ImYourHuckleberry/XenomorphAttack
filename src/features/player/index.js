import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './player_walk.png'
import handleMovement from './movement'
import handleInteraction from './interaction'

function Player(props) {
    console.log(props.position[1])
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
    ...state.player,
  }
}

export default connect(mapStateToProps)(handleInteraction(Player),handleMovement(Player))