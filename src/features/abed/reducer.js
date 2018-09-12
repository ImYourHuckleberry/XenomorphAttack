const initialState = {
  position: [1152, 0],
    spriteLocation: "0px 0px",
    direction: "EAST",
    walkIndex: 0,
    interaction: ""
  };
  
  const abedReducer = (state = initialState, action) => {
      const{type}=action
    switch (type) {
      case "MOVE_ABED":
        return {
          ...action.payload
        };
      
    
  
      default:
        return state;
    }
  };
  
  export default abedReducer;