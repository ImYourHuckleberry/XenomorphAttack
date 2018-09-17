const initialState = {
    position: [],
    // direction: "",
    // interaction: "",
    shouldBeMoving: false,
    potion: [],
    id: 1,
    hitSomething: false,
  };
  
  const abedAmmoReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
      case "MOVE_ABED_AMMO":
        return {
          ...state,
          potion: action.payload.updatedPotion,
          position: action.payload.updatedPosition,
          id: action.payload.id
        };
      case "ABED_AMMO_ACTION":
        
  
        return {
          ...state
        };
      case "UPDATE_POTION_ARRAY":
      return{...state,
      potion: action.payload.potionArray}

      
  
      default:
        return state;
    }
  };
  
  export default abedAmmoReducer;
  