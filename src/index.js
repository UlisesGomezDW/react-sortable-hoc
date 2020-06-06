import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import App from "./App";
const firebaseConfig = {
  apiKey: "AIzaSyDk6vp22tgyVqgJmPDB_vhxV1JaKw4fvqY",
  authDomain: "appprestamos-3d915.firebaseapp.com",
  databaseURL: "https://appprestamos-3d915.firebaseio.com",
  projectId: "appprestamos-3d915",
  storageBucket: "appprestamos-3d915.appspot.com",
  messagingSenderId: "963326054228",
  appId: "1:963326054228:web:771d7d662322b1b66bc2c1"
};
firebase.initializeApp(firebaseConfig);
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
