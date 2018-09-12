import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import ripley from "../ripley";
import player from "../player";
import pierce from "../pierce";

export default function handleMovement(abed) {
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
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case "NORTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().abed.walkIndex;
    return walkIndex >= 3 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function observeOtherCharacter(oldPos, newPos) {
    const ripleyPosition = store.getState().ripley.position;
    const playerPosition = store.getState().player.position;
    const piercePosition = store.getState().pierce.position;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (
      (ripleyPosition[0] === newPos[0] && ripleyPosition[1] === newPos[1]) ||
      (playerPosition[0] === newPos[0] && playerPosition[1] === newPos[1]) ||
      (piercePosition[0] === newPos[0] && piercePosition[1] === newPos[1])
    )
      return true;
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_ABED",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }
  function dispatchMoveDirection(direction, oldPos){
    const walkIndex = getWalkIndex();
    store.dispatch({
      type:"MOVE_ABED",
      payload:{position: oldPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex)
    }
  })}

  function attemptMove(direction) {
    const oldPos = store.getState().abed.position;
    const newPos = getNewPosition(oldPos, direction);
    console.log(oldPos)
    console.log(direction)
    console.log(newPos)

    if (
      observeBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      !observeOtherCharacter(oldPos, newPos)
    )
      dispatchMove(direction, newPos);
      else(
        dispatchMoveDirection(direction, oldPos)
      )
  }

 
  function handleKeyDown(e) {
    e.preventDefault();
    const int = Math.floor(Math.random() * Math.floor(4))

    switch (int) {
      case 0:
        return attemptMove("WEST");

      case 1:
        return attemptMove("NORTH");

      case 2:
        return attemptMove("EAST");

      case 3:
        return attemptMove("SOUTH");

      default:
    }
  }
  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  return abed;
}
