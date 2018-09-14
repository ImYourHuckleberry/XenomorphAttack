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
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "EAST":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      default:
        return "why am i executing";
    }
  }

  function mapNewPosition(energyball) {
    const oldPos = energyball.position;
    const direction = energyball.direction;

    switch (direction) {
      case "WEST":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE)];
      case "EAST":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE)];
      case "NORTH":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE)];
      case "SOUTH":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE)];
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
    console.log(newPos);

    const piercePositions = store
      .getState()
      .pierce.pierceArray.filter(
        pierce =>
          (pierce.position[0] === newPos[0] &&
            pierce.position[1] === newPos[1]) ||
          (pierce.position[0] === newPos[0] &&
            pierce.position[1] === newPos[1] + 64)
      );
    console.log("been hit this turn");
    console.log(piercePositions);

    const ripleyPosition = store.getState().ripley.position;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (piercePositions && piercePositions.length) return true;
  }

  function observePierce(newPos) {
    const piercePosition = store.getState().pierce.position;

    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (piercePosition[0] === newPos[0] && piercePosition[1] === newPos[1])
      return true;
  }

  function dispatchNewEnergyballArray(energyballArray) {
    store.dispatch({
      type: "UPDATE_ENERGYBALL_ARRAY",
      payload: { energyballArray }
    });
  }

  function dispatchInteraction(thisEnergyball) {
    store.dispatch({
      type: "RIPLEY_AMMO_ACTION"
    });
  }
  function makeEnergyball() {
    const id = store.getState().ripleyAmmo.id;

    const hitSomething = store.getState().ripleyAmmo.hitSomething;
    const direction = store.getState().ripley.direction;
    const oldPos = store.getState().ripley.position;
    const newPos = getNewPosition(oldPos, direction);
    const upgrade = store.getState().ripleyAmmo.hitTotal

    if (observeBoundaries(newPos) && observeImpassable(newPos)) {
      const energyballs = store.getState().ripleyAmmo.energyball;

      const energyball = { id, direction, position: newPos, hitSomething };

      const updatedEnergyballs = energyballs.concat(energyball);
      console.log("these are my balls");
      console.log(updatedEnergyballs);
      if (upgrade<100){
      const noHit = updatedEnergyballs.filter(
        ball => ball.hitSomething === false
      );

      dispatchNewEnergyballArray(noHit)
      attemptMove();;}
      else(
        dispatchNewEnergyballArray(updatedEnergyballs),
      attemptMove())
    }
  }

  function dispatchNewHitTotal(updatedHitTotal) {
    store.dispatch({
      type: "UPDATED_HIT_TOTAL",
      payload: updatedHitTotal
    });
  }

  function newHitTotal() {
    const alreadyHit = store.getState().ripleyAmmo.hitTotal;
    console.log(alreadyHit);
    const updatedHitTotal = alreadyHit + 1;
    console.log(updatedHitTotal);
    dispatchNewHitTotal(updatedHitTotal);
  }

  function attemptMove() {
    const energyballs = store.getState().ripleyAmmo.energyball;

    const newPos = energyballs.map(energyball => mapNewPosition(energyball));

    let i;
    for (i = 0; i < newPos.length; i++)
     {
      
        observeBoundaries(newPos[i])
          ? (observeImpassable(newPos[i]))
            ? (!observeOtherCharacter(newPos[i]))
              ? true
              : (energyballs[i].hitSomething = true,
                dispatchNewEnergyballArray(energyballs),
                newHitTotal())
            : (energyballs[i].hitSomething = true,
              dispatchNewEnergyballArray(energyballs))
          : (energyballs[i].hitSomething = true,
        dispatchNewEnergyballArray(energyballs))
      ;
    }
    // {
    //   if (
    //     observeBoundaries(newPos[i]) &&
    //     observeImpassable(newPos[i]) &&
    //     !observeOtherCharacter(newPos[i])
    //   ) {
    //   } else {
    //     energyballs[i].hitSomething = true;
    //     console.log("HIT");
    //     newHitTotal()

    //     dispatchNewEnergyballArray(energyballs);
    //     if (observePierce(newPos[i])) {
    //       dispatchInteraction();
    //     }
    //   }
    // }
  }

  window.addEventListener("keydown", e => {
    const hits = store.getState().ripleyAmmo.hitTotal
    if(hits>150){window.location ="/winscreen"}
    else(
    makeEnergyball())
    })

  
  

  return ripleyAmmo;
}
