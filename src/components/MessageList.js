import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/MessageList.css"


class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    // change to messages ref
    this.messagesRef = this.props.firebase.database().ref("messages");
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  //update for messages

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      console.log(snapshot);
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="activeRoom">The active room is: {this.props.activeRoom}</div>
        {this.state.messages.map((message, i) => (
        if (message.key === this.props.activeRoomId) {
            <p key={i}>Message {i + 1}</p>
            <p key={i}>Message text: {message.content}</p>
            <p key={i}>Room Id: {message.roomId}</p>
        }
        ))};
     </React.Fragment>
    )
  }
}

export default MessageList;
