import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/MessageList.css";

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
    this.messagesRef.on("child_added", snapshot => {
      console.log(snapshot);
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
    return (
      <React.Fragment>
        <div>
          <div className="activeRoom">
            {this.props.activeRoom != null ? "You are currently in " + this.props.activeRoom : "No room has been selected"}
          </div>
          <div>
            {this.state.messages
              .filter(message => message.roomId === this.props.activeRoomId)
              .map((message, i) => (
                <div>
                  <p key={i}>Message {i + 1}</p>
                  <p key={i}>Message text: {message.text}</p>
                  {/* <p key={i}>Room Id: {message.roomId}</p>
                  <p key={i}>Username: {message.username}</p> */}

                  <input
                    className="delete-room"
                    type="button"
                    value="Delete message"
                    onClick={e => this.deleteMessage(message)}
                  />
                </div>
              ))}
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
              <label for="message-field" />
              <input
                type="submit"
                value="Post Message"/>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MessageList;
