import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import Letters from "./components/LetterCreate/Letter";
import ListLetter from "./components/ListLetter/index";
import reducer from "./store/index";

const store = createStore(reducer);

const Routers = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <ListLetter />
      </React.StrictMode>
    </Provider>
  );
};

render(<Routers />, document.getElementById("component"));

// require("./components/juru_pungut/index");
