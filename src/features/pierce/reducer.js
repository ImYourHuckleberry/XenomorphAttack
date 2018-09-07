const initialState = {
    position: [0, 192],
    spriteLocation: "0px 0px",
    direction: "EAST",
    walkIndex: 0,
    interaction: ""
  };
  
  const pierceReducer = (state = initialState, action) => {
      const{type}=action
    switch (type) {
      case "MOVE_PIERCE":
        return {
          ...action.payload
        };
      
    
  
      default:
        return state;
    }
  };
  
  export default pierceReducer;