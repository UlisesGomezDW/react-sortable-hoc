import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./styles.css";
import Test from "./components/test";
export default function App() {
  if (document.location.pathname === "/") {
    console.log("Hola uwu");
  } else {
    console.log("No funciona");
  }
  return (
    <BrowserRouter>
      <div className="general-container">
        <Switch>
          <Route exact path="/" component={Test} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
