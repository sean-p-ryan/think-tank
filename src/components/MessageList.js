import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/MessageList.css";
import Message from "./Message";
import { throws } from "assert";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageText: ""
    };
    // change to messages ref
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    const dataSnapshot = this.props.firebase.database().ref("rooms");
    this.props.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
    this.getActiveRoomMessages();
  }

  componentDidUpdate() {
    if (this.props.deletedRoom != null) {
      this.getDeletedRoomMessages(this.props.deletedRoom)
    }
  }

  handleChange(e) {
    this.setState({ newMessageText: e.target.value });
  }

  getActiveRoomMessages() {
    if (this.props.activeRoom != null) {
      return this.state.messages
        .filter(message => message.roomId === this.props.activeRoom.key)
        .map(message => (
          <li>
            <span key={message.key}>
              <p className="sent-by">
                {message.username} SAYS:
            </p>
              <p className="message-text">
                {message.text}
              </p>
            </span>
            <div className="timestamp-and-delete-button">
              <p className="date-and-time-text">
                Sent @ {message.sentTime} on {message.sentDate}
              </p>
              <button
                onClick={() => { this.deleteMessage(message) }
                }
                className="delete-button">
                DELETE MESSAGE
          </button>
            </div>
          </li>
        ))
    }
  }

  deleteMessage = (messageToDelete) => {
    console.log(this.props.deletedRoom);
    const newMessagesArray = [];
    this.state.messages.map((message, i) => {
      if (message.key != messageToDelete.key) {
        newMessagesArray.push(message);
      }
    });
    this.setState({ messages: newMessagesArray });
    this.props.messagesRef.child(messageToDelete.key).remove();
  }

  getDeletedRoomMessages = (roomId) => {
    if (this.props.deletedRoom != null) {
      this.state.messages.map(message => {
        if (message.roomId === roomId) {
          this.deleteMessage(message);
        }
      })
      this.props.resetDeletedRoomState();
    };
  }

  //adding key values to each new message to be sent to database
  createMessage(newMessage) {
    let dateAndTime = new Date()
    this.props.messagesRef.push({
      text: this.state.newMessageText,
      roomId: this.props.activeRoom.key,
      username: this.props.currentUser ? this.props.currentUser : "Guest",
      sentDate: dateAndTime.toLocaleDateString(),
      sentTime: this.getTimeSent(dateAndTime)
    });
    this.setState({ newMessageText: "" })
  }

  getTimeSent(date) {
    let hour;
    let minutes = date.getMinutes();
    let amPm;
    if (date.getHours() > 12) {
      hour = date.getHours() - 12;
      amPm = "PM"
    } else {
      hour = date.getHours();
      amPm = "AM"
    }
    return hour + ":" + minutes + " " + amPm;
  }

  render() {
    return (

      <React.Fragment>

        <div className="message-section-container">
          <div className="active-room">
            {this.props.activeRoom != null ? <h1 className="active-room-name">#{this.props.activeRoom.name} </h1>: "No room has been selected"}
          </div>
          <div className="list-of-messages">
            <ul>
              {this.getActiveRoomMessages()}
            </ul>
          </div>
          <div className="message-field">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.createMessage(this.state.newMessageText);
              }}
            >
              <div className="message-text-field">
                <textarea
                  type="text"
                  id="message-field"
                  placeholder="Write a message"
                  cols="50"
                  rows="6"
                  value={this.state.newMessageText}
                  onChange={e => this.handleChange(e)}
                />
                <label htmlFor="message-field" />
                  <button
                  type="submit"
                  className="message-submit-button">
                    SUBMIT!
                  </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default MessageList;
