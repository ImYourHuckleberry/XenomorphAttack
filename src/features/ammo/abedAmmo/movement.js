import store from "../../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../config/constants";
import pierce from "../../pierce";
import player from "../../player";
import abed from "../../abed";
import ripley from "../../ripley";

export default function handleMovement(abedAmmo) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
      default:
        return "why am i executing";
    }
  }

  function mapNewPosition(potion) {
    const oldPos = potion.position;
    const direction = potion.direction;

    switch (direction) {
      case "WEST":
        return [(oldPos[0] -= SPRITE_SIZE ), oldPos[1]];
      case "EAST":
        return [(oldPos[0] += SPRITE_SIZE ), oldPos[1]];
      case "NORTH":
        return [oldPos[0], (oldPos[1] -= SPRITE_SIZE )];
      case "SOUTH":
        return [oldPos[0], (oldPos[1] += SPRITE_SIZE )];
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
      (abedPosition[0] === newPos[0] && abedPosition[1] === newPos[1]) ||
      (ripleyPosition[0] === newPos[0] && ripleyPosition[1] === newPos[1])
    )
      return true;
  }
  function observePlayer(newPos) {
    
    const playerPosition = store.getState().player.position;
    
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (
      
      (playerPosition[0] === newPos[0] && playerPosition[1] === newPos[1]) 
      
    )
      return true;
  }
  // function occupySameSpace(newPos) {
  //   const piercePosition = store.getState().pierce.position;
  //   const playerPosition = store.getState().player.position;
  //   const abedPosition = store.getState().abed.position;
  //   const ripleyPosition = store.getState().ripley.position;
  //   const y = newPos[1] / SPRITE_SIZE;
  //   const x = newPos[0] / SPRITE_SIZE;

  //   const test = store.getState().abedAmmo.potion;
  //   console.log

  //   let i;

  //   for (i = 0; i < test.length; i++) {
  //     if (
  //       (piercePosition[0] === test[i].position[0] &&
  //         piercePosition[1] === test[i].position[1]) ||
  //       (playerPosition[0] === test[i].position[0] &&
  //         playerPosition[1] === test[i].position[1]) ||
  //       (abedPosition[0] === test[i].position[0] &&
  //         abedPosition[1] === test[i].position[1]) ||
  //       (ripleyPosition[0] === test[i].position[0] &&
  //         ripleyPosition[1] === test[i].position[1])
  //     )
  //       return true;
  //   }
  // }

  function dispatchNewPotionArray(potionArray) {
    console.log(potionArray);
    store.dispatch({
      type: "UPDATE_POTION_ARRAY",
      payload: { potionArray }
    });
  }

  // function dispatchMove(thisEnergyball) {
  //   const energyballs = store.getState().ripleyAmmo.energyball;
  //   const id = store.getState().ripleyAmmo.id;
  //   const updatedEnergyball = energyballs;
  //   const updatedId = id + 1;
  //   updatedEnergyball.push(thisEnergyball);
  //   const updatedPosition = energyballs.map(energyball =>
  //     mapNewPosition(energyball)
  //   );

  //   store.dispatch({
  //     type: "MOVE_RIPLEY_AMMO",
  //     payload: { updatedEnergyball, updatedPosition, updatedId }
  //   });
  // }

  function dispatchInteraction(thisPotion) {
    store.dispatch({
      type: "ABED_AMMO_ACTION"
    });
  }
  function makePotion() {
    const id = store.getState().abedAmmo.id;

    const hitSomething = store.getState().abedAmmo.hitSomething;
    const direction = store.getState().abed.direction;
    const oldPos = store.getState().abed.position;
    const newPos = getNewPosition(oldPos, direction);

    if (observeBoundaries(newPos) && observeImpassable(newPos)) {
      const potions = store.getState().abedAmmo.potion;

      const potion = { id, direction, position: newPos, hitSomething };

      const updatedPotions = potions.concat(potion);
      const noHit = updatedPotions.filter(ball => ball.hitSomething === false);
      console.log(noHit);

      dispatchNewPotionArray(noHit);
      attemptMove();
    }
  }
  //make energyball needs an observe stuff parameter too so you cant just spawn bullets into out of bounds or into objects

  function attemptMove() {
    const potions = store.getState().abedAmmo.potion;
    console.log("heres my potions");
    console.log(potions);

    const newPos = potions.map(potion => mapNewPosition(potion));
    console.log("these are my new positions");
    console.log(newPos);

    //THIS IS THE STARTING POINT FOR TOMORROW, YOU NEED TO GET EVERY ENERGYBALL IN THE ARRAY TO OBSERVE BOUNDRIES/IMPASSABLE/OTHER CHARACTERS

    //   console.log(energyballs.position)
    //   const oldPos = energyballs.position
    //   const newPos = mapNewPosition(energyballs);

    let i;
    for (i = 0; i < newPos.length; i++) {
      console.log(newPos);
      if (
        observeBoundaries(newPos[i]) &&
        observeImpassable(newPos[i]) &&
        !observeOtherCharacter(newPos[i])
      ) {
        console.log("!!!");
      } else {
        potions[i].hitSomething = true;

        dispatchNewPotionArray(potions);
        if (observePlayer(newPos[i])) {
          dispatchInteraction();
        }

        console.log("???");
      }
    }
    // // ) {

    //   //make newPos position

    //   dispatchMove(energyballs);
    //   }
    //   //dispatch createnewenergyball
    //   else {
    //     dispatchInteraction();
  }
  //}

  window.addEventListener("keydown", e => {
    makePotion();
  });

  return abedAmmo;
}
