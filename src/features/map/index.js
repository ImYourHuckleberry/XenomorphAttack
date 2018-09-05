import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'

import './styles.css'

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "floor";
    case 5:
      return "plant";
    case 6:
      return "table";
    case 7:
      return "spaceman";
    case 8:
      return "locker";
      case 107:
      return "spaceman"
  }
}

function MapTile(props) {
    return <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
    />
  }
  
  function MapRow(props) {
    return <div
      className="row"
      style={{
        height: SPRITE_SIZE,
      }}
    >
    {
      props.tiles.map( tile => <MapTile tile={tile} /> )
    }
    </div>
  }
  
  function Map(props) {
    return (
      <div
        style={{
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '1300px',
          height: '625px',
          border: '4px solid white',
        }}
      >
        {
          props.tiles.map( row => <MapRow tiles={row} /> )
        }
      </div>
    )
  }
  
  function mapStateToProps(state) {
    return {
      tiles: state.map.tiles,
    }
  }
  
  export default connect(mapStateToProps)(Map)