import React, { Component } from "react";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
import * as firebase from "firebase";
import "./App.css";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: null
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <div className="RoomList">
          <aside id="sidebar">
            <h1 className="AppLogo">Bloc Chat</h1>
            <User
              firebase={firebase}
              setUser={this.setUser.bind(this)}
              user={this.state.user}
            />
            <RoomList
              firebase={firebase.app()}
              activeRoom={this.state.activeRoom}
              setActiveRoom={this.setActiveRoom.bind(this)}
            />
          </aside>
        </div>
        <div className="MessageList">
          <MessageList
            firebase={firebase.app()}
            activeRoom={this.state.activeRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
