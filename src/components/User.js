import React, { Component } from "react";
import App from "./../App";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.userRef = this.props.firebase.database().ref("users");
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      this.props.addActiveUser(user);
    });
  }

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
    const newActiveUser = this.props.user;
    this.props.addActiveUser(newActiveUser)
  }

  signOutWithPopup = () => {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <div>Current User: {this.props.user}</div>
        <button type="submit" onClick={this.signInWithPopup}>
          Sign In
        </button>
        <button type="submit" onClick={this.signOutWithPopup}>
          Sign Out
        </button>
        <div>Active users: {this.props.activeUsers.map(user => (
            <p>{user}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default User;
