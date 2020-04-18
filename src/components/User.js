import React from "react";
import styles from "../styles/User.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allActiveUsers: [],
    };
    this.userRef = this.props.firebase.database().ref("users");
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      this.props.setUser(user);
    });
    this.userRef.on("child_added", (snapshot) => {
      this.getActiveUsers(snapshot);
    });
  };

  getActiveUsers = (snapshot) => {
    let activeUserNames = [];
    let userData = [];
    userData.push(snapshot.val());
    userData.map((user) => {
      if (user.isOnline === true) {
        activeUserNames.push(user.userId);
      }
    });
    this.setState({ allActiveUsers: activeUserNames });
  };

  displayActiveUsers() {
    return this.state.allActiveUsers.map((user) => <p>{user}</p>);
  }

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
    this.userRef.push({
      isOnline: true,
      userName: this.props.user,
    });
  };

  signOutWithPopup = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div class="user-info">
        <nav class="level user-info-container">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Active Users:</p>
              <p class="title">1</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Current User</p>
              <p class="title">{this.props.user}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <button
              className="button is-warning is-small"
              type="submit"
              onClick={this.signOutWithPopup}
            >
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default User;
