import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList'

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
  render() {
    return (
      <div className="App">
      <RoomList
        firebase={firebase}
      />
      </div>
    );
  }
}

export default App;
