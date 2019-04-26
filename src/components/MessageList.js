import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/MessageList.css";
import Message from "./Message";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageText: ""
    };
    // change to messages ref
    this.messagesRef = this.props.firebase.database().ref("messages");
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  //update for messages

  componentDidMount() {
    const dataSnapshot = this.props.firebase.database().ref("rooms");
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange(e) {
    this.setState({ newMessageText: e.target.value });
  }

  deleteMessage = (messageToDelete) => {
    console.log("Delete Message Triggered");
    const newMessagesArray = [];
    this.state.messages.map((message, i) => {
      if (message.key != messageToDelete.key) {
        newMessagesArray.push(message);
      }
    });
    this.setState({ messages: newMessagesArray });
    console.log(this.state.rooms);
  }

  createMessage(newMessage) {
    this.messagesRef.push({
      text: this.state.newMessageText,
      roomId: this.props.activeRoomId,
      username: this.props.currentUser ? this.props.currentUser : "Guest",
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessageText: "" })
  }

  render() {
    let listOfMessages;

    if (this.state.messages) {
      listOfMessages = this.state.messages
        .filter(message => message.roomId === this.props.activeRoomId)
        .map((message, i) => {
          return (
            <Message key={message.key}
              onClick={this.deleteMessage}
              text={message.text}
              message={message}
            />
          );
        })
    };

    return (

      <React.Fragment>
        <div>
          <div className="activeRoom">
            {this.props.activeRoom != null ? "You are currently in " + this.props.activeRoom : "No room has been selected"}
          </div>
          <div>
            {/* {listOfMessages} */}
          </div>
        </div>
        <div className="message-field">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.createMessage(this.state.newMessageText);
            }}
          >
            <div>
              <input
                type="text"
                id="message-field"
                value={this.state.newMessageText}
                onChange={e => this.handleChange(e)} />
              <label htmlFor="message-field" />
              <input
                type="submit"
                value="Post Message" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MessageList;
