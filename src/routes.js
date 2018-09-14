import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BattleScreen from './BattleScreen'
import App from "./App";
import { render } from "react-dom";
import WinScreen from './WinScreen'
import CharacterSelect from'./CharacterSelect'

const Main = () => {
  return(
    
    <Router>
      <Switch>
        <Route exact path ="/" component = {CharacterSelect}/>
        <Route exact path="/play" component={App} />
        <Route exact path="/battlescreen" component={BattleScreen} />
        <Route exact path="/winscreen" component={WinScreen}/>
      </Switch>
    </Router>
    
)};
export default Main;
