const initialState = {
  position: [],
  // direction: "",
  // interaction: "",
  shouldBeMoving: false,
  energyball:[]
};

const ripleyAmmoReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "MOVE_RIPLEY_AMMO":
      return {
        ...action.payload
      };
    case "RIPLEY_AMMO_ACTION":
      console.log("I've been shot");
      
      return { ...state, energyball: [], type };

    default:
      return state;
  }
};

export default ripleyAmmoReducer;
