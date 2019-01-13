import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/ActiveRoomMessages.css"


class ActiveRoomMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoomMessages: [],
    };
    // change to messages ref
    this.messagesRef = this.props.firebase.database().ref("messages");
  }


  render() {
    return (

    )
  }
}

export default MessageList;
