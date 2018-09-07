import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import ripley from '../ripley'
import pierce from '../pierce'
import abed from '../abed'

export default function handleInteraction(player) {
  function isSurroundingInteractive(direction, pos, interaction) {
    console.log(direction);

    switch (direction) {
      case "WEST":
        return [pos[0] - SPRITE_SIZE, pos[1]];
      case "EAST":
        return [pos[0] + SPRITE_SIZE, pos[1]];
      case "NORTH":
        return [pos[0], pos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [pos[0], pos[1] + SPRITE_SIZE];
    }

    {
      switch (interaction) {
        case "SPACE_BAR_ACTION":
          console.log(interaction);
          if (pos) return true;
        case "ENTER_ACTION":
          console.log(interaction);
          if (pos) return true;
      }
    }
  }
  function dispatchInteraction(interaction) {
    store.dispatch({
      type: "ACTION",
      payload: interaction
    });
    //window.location="/battlescreen"
  }
  
  function canIInteract(newPos) {
    const ripleyPosition = store.getState().ripley.position;
    const piercePosition = store.getState().pierce.position;
    const abedPosition = store.getState().abed.position;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
        
    console.log(newPos)
    console.log(ripleyPosition)
    
    if( ripleyPosition[0] === newPos[0]&&ripleyPosition[1] === newPos[1]||piercePosition[0] === newPos[0]&&piercePosition[1] === newPos[1]||abedPosition[0] === newPos[0]&&abedPosition[1]===newPos[1]){
      return true;
  }else{return false}}
  

  function attemptInteract(interaction) {
    const pos = store.getState().player.position;
    const direction = store.getState().player.direction;
    const surrounding = isSurroundingInteractive(direction, pos, interaction);
    if (canIInteract(surrounding)) {
      console.log("i fired");
      dispatchInteraction(interaction);
    }
  }
  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 32:
        return attemptInteract("SPACE_BAR_ACTION");

      case 13:
        return attemptInteract("ENTER_ACTION");
      default:
            
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });
  return player;
}
