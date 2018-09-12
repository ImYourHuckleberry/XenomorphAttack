const initialState = {
  position: [],
  // direction: "",
  // interaction: "",
  shouldBeMoving: false,
  energyball: [],
  id: 1,
  hitSomething: false,
};

const ripleyAmmoReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "MOVE_RIPLEY_AMMO":
      return {
        ...state,
        energyball: action.payload.updatedEnergyball,
        position: action.payload.updatedPosition,
        id: action.payload.id
      };
    case "RIPLEY_AMMO_ACTION":
      alert("I've been shot");

      return {
        ...state
      };
    case "UPDATE_ENERGYBALL_ARRAY":
    return{...state,
    energyball: action.payload.energyballArray}

    default:
      return state;
  }
};

export default ripleyAmmoReducer;
