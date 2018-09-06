import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import { render } from "react-dom";

const Main = () => {
  return(
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </BrowserRouter>
    
)};
export default Main;
