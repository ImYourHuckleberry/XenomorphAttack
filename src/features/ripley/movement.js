import Store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import pierce from "../pierce";
import player from "../player";
import abed from "../abed";
import ripleyAmmo from "../ammo/ripleyAmmo";

export default function handleMovement(ripley) {
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
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "NORTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = Store.store.getState().ripley.walkIndex;
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
    const tiles = Store.store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function observeOtherCharacter(oldPos, newPos) {
    const piercePosition = Store.store.getState().pierce.position;
    // const playerPosition = store.getState().player.position;
    // const abedPosition = store.getState().abed.position;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    if (
      piercePosition[0] === newPos[0] &&
      piercePosition[1] === newPos[1] //||
      //(playerPosition[0] === newPos[0] && playerPosition[1] === newPos[1]) ||
      //(abedPosition[0] === newPos[0] && abedPosition[1] === newPos[1])
    )
      return true;
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();
    const isAbed = Store.store.getState().ripley.isAbed;
    Store.store.dispatch({
      type: "MOVE_RIPLEY",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        isAbed
      }
    });
  }
  function dispatchMoveDirection(direction, oldPos) {
    const walkIndex = getWalkIndex();
    const isAbed = Store.store.getState().ripley.isAbed;
    Store.store.dispatch({
      type: "MOVE_RIPLEY",
      payload: {
        position: oldPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        isAbed
      }
    });
  }

  function attemptMove(direction) {
    const oldPos = Store.store.getState().ripley.position;
    const newPos = getNewPosition(oldPos, direction);

    if (
      observeBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos) &&
      !observeOtherCharacter(oldPos, newPos)
    )
      dispatchMove(direction, newPos);
    else dispatchMoveDirection(direction, oldPos);
  }

  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        return attemptMove("WEST");

      case 39:
        return attemptMove("EAST");

      default:
    }
  }
  function dispatchIsAbed(isAbed) {
    Store.store.dispatch({
      type: "UPDATE_ABED",
      payload: isAbed
    });
  }

  window.addEventListener("keydown", e => {
    const totalHits = Store.store.getState().ripleyAmmo.hitTotal;
    const health = Store.store.getState().pierce.healthTotal;
    const isAbed = Store.store.getState().ripley.isAbed;

    dispatchIsAbed(isAbed);

    if (health <= 0 || totalHits >= 150) {
      window.removeEventListener("keydown", e);
    } else {
      handleKeyDown(e);
    }
  });

  return ripley;
}
