import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

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
  }
  
  function canIInteract(newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile > 100;
  }

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
        console.log(e.keyCode);
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });
  return player;
}
