import store from "../../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../config/constants";
import pierce from "../../pierce";
import player from "../../player";
import abed from "../../abed";
import ripley from "../../ripley";

export default function handleMovement(ripleyAmmo) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [(oldPos[0] -= SPRITE_SIZE), oldPos[1]];
      case "EAST":
        return [(oldPos[0] += SPRITE_SIZE), oldPos[1]];
      case "NORTH":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE)];
      case "SOUTH":
        return [oldPos[0], (oldPos[1] += SPRITE_SIZE)];
      default:
        return "why am i executing";
    }
  }

  function mapNewPosition(energyball) {
    console.log("start");
    console.log(energyball);
    console.log(energyball[0]);

    const oldPos = energyball.position;
    const direction = energyball.direction;

    switch (direction) {
      case "WEST":
        return [(oldPos[0] -= SPRITE_SIZE), oldPos[1]];
      case "EAST":
        return [(oldPos[0] += SPRITE_SIZE), oldPos[1]];
      case "NORTH":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE)];
      case "SOUTH":
        return [oldPos[0], (oldPos[1] += SPRITE_SIZE)];
      default:
        return "nothing here";
    }
  }

  function observeBoundaries(newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    );
  }

  function observeImpassable(newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function observeOtherCharacter(newPos) {
    const piercePosition = store.getState().pierce.position;
    const playerPosition = store.getState().player.position;
    const abedPosition = store.getState().abed.position;
    const ripleyPosition = store.getState().ripley.position;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (
      (piercePosition[0] === newPos[0] && piercePosition[1] === newPos[1]) ||
      (playerPosition[0] === newPos[0] && playerPosition[1] === newPos[1]) ||
      (abedPosition[0] === newPos[0] && abedPosition[1] === newPos[1])
      //||(ripleyPosition[0]===newPos[0]&& ripleyPosition[1]===newPos[1])
    )
      return true;
  }

  function dispatchMove(thisEnergyball) {
    const energyballs = store.getState().ripleyAmmo.energyball;
    const id = store.getState().ripleyAmmo.id;
    const updatedEnergyball = energyballs;
    const updatedId = id + 1;
    updatedEnergyball.push(thisEnergyball);
    const updatedPosition = energyballs.map(energyball =>
      mapNewPosition(energyball)
    );

    store.dispatch({
      type: "MOVE_RIPLEY_AMMO",
      payload: { updatedEnergyball, updatedPosition, updatedId }
    });
  }

  function dispatchInteraction(thisEnergyball) {

      const updatedEnergyball=

      store.dispatch({
        type: "RIPLEY_AMMO_ACTION",

        payload: {updatedEnergyball}
      });
    
  }

  function makeNewEnergyball() {
    const id = store.getState().ripleyAmmo.id;
    const direction = store.getState().ripley.direction;
    const oldPos = store.getState().ripley.position;
    const newPos = getNewPosition(oldPos, store.getState().ripley.direction);
    const energyball = { id, direction, position: newPos };
    if (
      observeBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      !observeOtherCharacter(oldPos, newPos)
    ) {
      
      //make newPos position

      dispatchMove(energyball);
    }
    //dispatch createnewenergyball
    else {
      dispatchInteraction(energyball);
    }
  }

  window.addEventListener("keydown", e => {
    setTimeout(makeNewEnergyball, 30);
  });

  return ripleyAmmo;
}
