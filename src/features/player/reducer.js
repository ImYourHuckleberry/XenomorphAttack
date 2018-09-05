const initialState = {
  position: [0, 0],
  spriteLocation: "0px 0px",
  direction: "EAST",
  walkIndex: 0,
  interaction: ""
};

const playerReducer = (state = initialState, action) => {
    const{type}=action
  switch (type) {
    case "MOVE_PLAYER":
      return {
        ...action.payload
      };
    case "ACTION":
      alert('fuck you alien ')
      console.log(action.payload);
      return{...state, type,
        
    }
  

    default:
      return state;
  }
};

export default playerReducer;
