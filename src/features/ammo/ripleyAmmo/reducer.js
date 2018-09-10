const initialState = {
  position: [],
  // direction: "",
  // interaction: "",
  shouldBeMoving: false,
  energyball:[],
  id: 1
};

const ripleyAmmoReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "MOVE_RIPLEY_AMMO":
      return {...state,
        energyball: action.payload.updatedEnergyball,
        position: action.payload.updatedPosition,
        id: action.payload.updatedId,
        
      };
    case "RIPLEY_AMMO_ACTION":
      console.log("I've been shot");
      
      return { ...state, 
      energyball:action.payload.updatedEnergyball};

    default:
      return state;
  }
};

export default ripleyAmmoReducer;
