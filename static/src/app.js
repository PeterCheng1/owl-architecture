import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader";

let AppContainer;
if (process.env.NODE_ENV === "development") {
  AppContainer = hot(module)(App);
} else {
  AppContainer = App;
}

ReactDOM.render(
  <Router basename="/">
    <AppContainer />
  </Router>,
  document.getElementById("owl-app-root")
);
