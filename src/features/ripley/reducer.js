const initialState = {
    position: [1152, 256],
    spriteLocation: "0px 0px",
    direction: "EAST",
    walkIndex: 0,
    interaction: "",
    
  };
  
  const ripleyReducer = (state = initialState, action) => {
      const{type}=action
    switch (type) {
      case "MOVE_RIPLEY":
        return {
          ...action.payload
        };
      
    
  
      default:
        return state;
    }
  };
  
  export default ripleyReducer;