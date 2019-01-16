import React, { Component } from "react";
import App from "./../App";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signInWithPopup() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOutWithPopup() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.signInWithPopup}>
          Sign In
        </button>
        <button type="submit" onClick={this.signOutWithPopup}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default User;
