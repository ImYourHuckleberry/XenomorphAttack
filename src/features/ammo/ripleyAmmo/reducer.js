const initialState = {
  position: [10000, 10000],
  // direction: "",
  // interaction: "",
  shouldBeMoving: false,
  energyball: [],
  id: 1,
  hitSomething: false,
  hitTotal:140
};

const ripleyAmmoReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "RIPLEY_AMMO_ACTION":
      return {
        ...state
      };
    case "UPDATE_ENERGYBALL_ARRAY":
      return {
        ...state,
        energyball: action.payload.energyballArray
      };
      case"UPDATED_HIT_TOTAL":
      return{
        ...state, hitTotal: action.payload
      }


    default:
      return state;
  }
};

export default ripleyAmmoReducer;
