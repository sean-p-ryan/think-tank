import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


var config = {
  apiKey: "AIzaSyBdrQEg21qF0an-VLNHwhs7qhQ4sDWQKpU",
  authDomain: "bloc-chat-react-3edc1.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-3edc1.firebaseio.com",
  projectId: "bloc-chat-react-3edc1",
  storageBucket: "bloc-chat-react-3edc1.appspot.com",
  messagingSenderId: "314608865092"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      activeRoomId: "No room selected",
      currentUser: "Guest",
      activeUsers: []
    };
  }

  setActiveRoom = selectedRoom => {
    this.setState({ activeRoom: selectedRoom.name });
    this.setState({ activeRoomId: selectedRoom.key });
  };

  setUser = user => {
    this.setState({ currentUser: user.displayName });
  };

  addActiveUser = newUser => {
    this.state.activeUsers.push(newUser.displayName);
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="room-list">
            <RoomList
              setActiveRoom={this.setActiveRoom}
              activeRoom={this.state.activeRoom}
              firebase={firebase}
            />
          </div>
          <div>
            <User
              firebase={firebase}
              setUser={this.setUser}
              user={this.state.currentUser}
              activeUsers={this.state.activeUsers}
              addActiveUser={this.addActiveUser}
            />
            <MessageList
              className="message-list"
              activeRoom={this.state.activeRoom}
              activeRoomId={this.state.activeRoomId}
              currentUser={this.state.currentUser}
              firebase={firebase}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
