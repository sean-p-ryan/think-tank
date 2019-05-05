import React, { Component } from "react";
import "./styles/App.css";
// import styles from "./styles/Auth.css";
import firebase from "firebase";
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
      isSignedIn: false,
      activeUsers: [],
      deletedRoomId: null
    };
    this.messagesRef = firebase.database().ref("messages");
  }

  uiConfig = {
    signInFLow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };


  setActiveRoom = selectedRoom => {
    this.setState({ activeRoom: selectedRoom });
  };

  setUser = user => {
    this.setState({ currentUser: user.displayName });
  };

  addActiveUser = newUser => {
    this.state.activeUsers.push(newUser.displayName);
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  setDeletedRoomId = (roomId) => {
    this.setState({ deletedRoomId: roomId});
    console.log("VALUE BEING PASSED INTO SET DELETED ROOM ID" + roomId)
    this.logDeletedRoom()
  }

  resetDeletedRoomState = () => {
    this.setState({deletedRoomId: null})
  }

  logDeletedRoom = () => {
    setTimeout(() => {
      console.log('Alligator!!!!' + this.state.deletedRoomId);
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ?
          <div className="user-view">
            <div className="room-view">
              <div className="room-list">
                <RoomList
                  setActiveRoom={this.setActiveRoom}
                  activeRoom={this.state.activeRoom}
                  firebase={firebase}
                  messagesRef={this.messagesRef}          
                  setDeletedRoomId={this.setDeletedRoomId}        
                />
              </div>
            </div>
            <div className="user-info-and-messages">
                <User
                  firebase={firebase}
                  setUser={this.setUser}
                  user={this.state.currentUser}
                  activeUsers={this.state.activeUsers}
                  addActiveUser={this.addActiveUser}
                />
              <div className="message-list">
                <MessageList
                  className="message-list"
                  activeRoom={this.state.activeRoom}
                  activeRoomId={this.state.activeRoomId}
                  currentUser={this.state.currentUser}
                  firebase={firebase}
                  messagesRef={this.messagesRef}     
                  deletedRoom={this.state.deletedRoomId}   
                  resetDeletedRoomState={this.resetDeletedRoomState}          
                />
              </div>
            </div>
          </div>
          :
          <div className="auth-screen" >
            <div className="auth-text-and-buttons">
              <div className="welcome-text">
              <p>Welcome to Think Tank, the discussion plaform
              dedicated to tackling only the headiest and loftiest of questions.

              Please sign in to continue.</p> 
            </div>
              <div>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                  className="firebase-auth"
                />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
