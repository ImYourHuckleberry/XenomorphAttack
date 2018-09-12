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
      switch(action.payload){
        case "SPACE_BAR_ACTION":
        alert("spacebaraction")
        return{...state, type,
        
        }
      
      case "ENTER_ACTION":
      alert("enteraction")
        return{...state, type,
        
        
        }
      }
  
  
    default:
      return state;
  
}
};

export default playerReducer;
