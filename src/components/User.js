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
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
    this.userRef.on("child_added", snapshot => {
      this.getActiveUsers(snapshot);
    });
  };

  getActiveUsers = snapshot => {
    let activeUserNames = [];
    let userData = [];
    userData.push(snapshot.val());
    userData.map(user => {
      if (user.isOnline === true) {
        activeUserNames.push(user.userId);
      }
    })
    this.setState({ allActiveUsers: activeUserNames });
  };

  displayActiveUsers() {
    return this.state.allActiveUsers.map(user => (
      <p>{user}</p>
    ))
  }

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
    this.userRef.push({
      isOnline: true,
      userName: this.props.user
    });
  };

  signOutWithPopup = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div className="user-info">
        <div className="current-user">
          <h1 className="current-user-name">Current User:{" "}</h1> &nbsp; {this.props.user}
          {/* <button className="sign-out-button" type="submit" onClick={this.signOutWithPopup}>
            Sign Out
        </button> */}
        </div>
        <div className="active-users">
          <h1>Active Users: 1 {this.displayActiveUsers()}</h1>
        </div>
      </div>
    );
  }
}

export default User;
