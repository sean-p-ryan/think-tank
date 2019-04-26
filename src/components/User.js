import React, { Component } from "react";
import App from "./../App";

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
      console.log(this.userRef.userId);
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
      this.setState({allActiveUsers: allUserData});

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
      <div>
        <div>Current User: {this.props.user}</div>
        <button type="submit" onClick={this.signInWithPopup}>
          Sign In
        </button>
        <button type="submit" onClick={this.signOutWithPopup}>
          Sign Out
        </button>
        <div>
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
