import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import pierce from "../pierce";
import player from "../player";
import abed from "../abed";
import ripleyAmmo from "../ammo/ripleyAmmo";

export default function handleMovement(pierce) {
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

  function mapNewPosition(pierceArray) {
    const oldPos = pierceArray.position;
    const direction = pierceArray.direction;

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
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE * 2)
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
    const energyballPositions = store
      .getState()
      .ripleyAmmo.energyball.filter(
        ball =>
          (ball.position[0] === newPos[0] && ball.position[1] === newPos[1]) ||
          (ball.position[0] === newPos[0] &&
            ball.position[1] === newPos[1] - 64)
      );
    const piercePosition = store.getState().pierce.position;
    const ripleyPosition = store.getState().ripley.position;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (energyballPositions && energyballPositions.length) return true;
  }

  function observePlayer(newPos) {
    const playerPosition = store.getState().player.position;

    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (playerPosition[0] === newPos[0] && playerPosition[1] === newPos[1])
      return true;
  }

  function dispatchNewPierceArrayArray(pierceArrayArray) {
    store.dispatch({
      type: "UPDATE_PIERCE_ARRAY",
      payload: { pierceArrayArray }
    });
  }

  function dispatchInteraction(thisPierceArray) {
    store.dispatch({
      type: "PIERCE_ACTION"
    });
  }

  function getRandomPos(max) {
    const int = Math.floor(Math.random() * Math.floor(max)) * 64;
    const randomPos = [int, -64];
    console.log(randomPos);
    return randomPos;
  }
  function makePierceArray() {
    const id = store.getState().pierce.id;

    const hitSomething = store.getState().pierce.hitSomething;
    const direction = store.getState().pierce.direction;
    const oldPos = store.getState().pierce.position;
    const thisNewThing = getRandomPos(19);
    const newPos = getNewPosition(thisNewThing, direction);

    console.log("I am the newPosition");
    console.log(newPos);

    if (observeBoundaries(newPos) && observeImpassable(newPos)) {
      const pierceArrays = store.getState().pierce.pierceArray;
      console.log("am the the array pre-update");
      console.log(pierceArrays);

      const pierceArray = { id, direction, position: newPos, hitSomething };
      console.log("I am the newly created pierce object");
      console.log(pierceArray);

      const updatedPierceArrays = pierceArrays.concat(pierceArray);
      console.log("I am the entire array after the addition");
      console.log(updatedPierceArrays);
      const noHit = updatedPierceArrays.filter(
        pierce => pierce.hitSomething === false
      );
      console.log("I am the array accounting for hitting things");
      console.log(noHit);

      dispatchNewPierceArrayArray(noHit);
      attemptMove();
    }
  }
  function dispatchNewHealthTotal(updatedHealthTotal) {
    store.dispatch({
      type: "UPDATED_HEALTH_TOTAL",
      payload: updatedHealthTotal
    });
  }

  function newHealthTotal() {
    const health = store.getState().pierce.healthTotal;

    const updatedHealthTotal = health - 1;
    console.log(updatedHealthTotal);
    dispatchNewHealthTotal(updatedHealthTotal);
  }

  function attemptMove() {
    const pierceArrays = store.getState().pierce.pierceArray;

    const newPos = pierceArrays.map(pierceArray => mapNewPosition(pierceArray));

    let i;
    for (i = 0; i < newPos.length; i++) {
      observeBoundaries(newPos[i])
        ? observeImpassable(newPos[i])
          ? !observeOtherCharacter(newPos[i])
            ? true
            : ((pierceArrays[i].hitSomething = true),
              dispatchNewPierceArrayArray(pierceArrays))
          : ((pierceArrays[i].hitSomething = true),
            dispatchNewPierceArrayArray(pierceArrays))
        : ((pierceArrays[i].hitSomething = true),
          dispatchNewPierceArrayArray(pierceArrays),
          newHealthTotal());
    }

    // {
    //   if (
    //     observeBoundaries(newPos[i]) &&
    //     observeImpassable(newPos[i]) &&
    //     !observeOtherCharacter(newPos[i])
    //   ) {
    //   } else {
    //     pierceArrays[i].hitSomething = true;

    //     dispatchNewPierceArrayArray(pierceArrays);
    //   }
    // }
  }
  function dispatchNewSpawnState(spawn) {
    store.dispatch({
      type: "UPDATE_DOISPAWN",
      payload: spawn
    });
  }
  function flipSpawnSwitch(spawnState) {
    const switchSpawn = !spawnState;
    dispatchNewSpawnState(switchSpawn);
  }
  function doISpawn() {
    const spawnState = store.getState().pierce.doISpawn;
    if (spawnState === true) {
      flipSpawnSwitch(spawnState);

      makePierceArray();
    } else console.log("false");
    flipSpawnSwitch(spawnState);
  }
  window.addEventListener("keydown", e => {
    const health = store.getState().pierce.healthTotal;
    const totalhit = store.getState().ripleyAmmo.hitTotal;
    totalhit > 150
      ? window.removeEventListener("keydown", e)
      : health >= 0
        ? doISpawn()
        : (window.location = "/battlescreen"),window.removeEventListener("keydown", e));

    // {
    // doISpawn();}
    // else (window.location="/battlescreen")
  });

  return pierce;
}
