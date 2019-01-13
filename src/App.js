import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

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
      activeRoom: "not selected"
    };
  }

  setActiveRoom = (selectedRoom) => {
    this.setState({ activeRoom: selectedRoom });
  }

  render() {
    return (
      <div className="App">
      <div className="available-rooms">Available Rooms</div>
        <div className="room-list">
          <RoomList
            setActiveRoom={this.setActiveRoom}
            activeRoom={this.state.activeRoom}
            firebase={firebase} />
        </div>
        <div className="message-list">
          <MessageList
            activeRoom={this.state.activeRoom}
            firebase={firebase} />
        </div>
      </div>
    );
  }
}

export default App;
