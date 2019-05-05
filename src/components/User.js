import React, { Component } from "react";
import App from "./../App";
import styles from "../styles/User.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allActiveUsers: []
    };
    this.userRef = this.props.firebase.database().ref("users");
    // this.messagesRef = this.props.firebase.database().ref("messages");
    // this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
    this.userRef.on("child_added", snapshot => {
      this.getUserData(snapshot);
    });
  };

  getUserData = snapshot => {
    var allUserData = [];
    snapshot.forEach((childSnapshot, i) => {
      var userId = snapshot.key;
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childData != true
        && childData != false
        && childData != "Guest") {
        allUserData.push(childData);
      }
      this.setState({ allActiveUsers: allUserData });

    });
  };

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
    this.userRef.push({
      isOnline: true,
      userId: this.props.user
    });
  };

  signOutWithPopup = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div className="user-info">
        <div className="current-user">Current User: {this.props.user}
          <button type="submit" onClick={this.signInWithPopup}>
            Sign In
        </button>
          <button type="submit" onClick={this.signOutWithPopup}>
            Sign Out
        </button>
        </div>
        <div className="active-users">
          Active users:{" "}
          {this.state.allActiveUsers.map(user => (
            <p>{user}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default User;
