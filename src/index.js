import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Main from "./routes";
import CharacterSelect from "./CharacterSelect"

import Store from "./config/store";


import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={Store.store}>
    <PersistGate loading={null} persistor={Store.persistor}>
      <Main />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
