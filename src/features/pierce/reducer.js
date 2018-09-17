const initialState = {
  position: [10000,10000],
  spriteLocation: "0px 0px",
  direction: "SOUTH",
  walkIndex: 0,
  interaction: "",
  pierceArray: [],
  hitSomething: false,
  id: 1,
  doISpawn:true,
  healthTotal:50
  ,
};

const pierceReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    
    case "UPDATE_PIERCE_ARRAY":
      return {
        ...state,
        pierceArray: action.payload.pierceArrayArray
      };

      case"UPDATE_PIERCE_DIRECTION":
      return{
        ...state, direction: action.payload.direction
      }
      case"UPDATE_DOISPAWN":
      return{
        ...state, doISpawn: action.payload
      }
      case"UPDATED_HEALTH_TOTAL":
      return{
        ...state, healthTotal: action.payload
      }

    default:
      return state;
  }
};

export default pierceReducer;
