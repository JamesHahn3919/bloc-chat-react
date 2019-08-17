import React from "react";
import "./App.css";
import RoomList from "./components/RoomList";
import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCxp4t4ljHRHg7RqTSOWyVtghJgqdJ7Sts",
  authDomain: "bloc-chat-d3e97.firebaseapp.com",
  databaseURL: "https://bloc-chat-d3e97.firebaseio.com",
  projectId: "bloc-chat-d3e97",
  storageBucket: "",
  messagingSenderId: "598283045534",
  appId: "1:598283045534:web:2e462abf3492ebe7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <div className="RoomList">
        <RoomList firebase={firebase.app()} />
      </div>
    </div>
  );
}

export default App;
