import React from "react";
import Map from "../map";
import Player from "../player";
import Ripley from "../ripley";
import Pierce from "../pierce";
import Abed from "../abed";
import RipleyAmmo from "../ammo/ripleyAmmo";
import AbedAmmo from "../ammo/abedAmmo";

import { tiles } from "../../data/maps/1";


import Store from "../../config/store";

function World(props) {
  Store.store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles
    }
  });
  return (
    <div
      style={{
        position: "relative",
        width: "1300px",
        height: "650px",
        margin: "20px auto"
      }}
    >
      <Map />
      <Pierce />
      <Ripley />

      <RipleyAmmo />
    </div>
  );
}

export default World;
