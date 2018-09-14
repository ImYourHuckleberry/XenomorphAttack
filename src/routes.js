import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BattleScreen from './BattleScreen'
import App from "./App";
import { render } from "react-dom";
import WinScreen from './WinScreen'

const Main = () => {
  return(
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/battlescreen" component={BattleScreen} />
        <Route exact path="/winscreen" component={WinScreen}/>
      </Switch>
    </BrowserRouter>
    
)};
export default Main;
