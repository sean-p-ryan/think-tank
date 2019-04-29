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
    this.roomsRef.on("child_removed", () => {
      this.getDeletedRoomMessages(this.props.deletedRoom);
    })
    this.getActiveRoomMessages();
  }

  handleChange(e) {
    this.setState({ newMessageText: e.target.value });
  }

  getActiveRoomMessages() {
    if (this.props.activeRoom != null) {
      return this.state.messages
        .filter(message => message.roomId === this.props.activeRoom.key)
        .map(message => (<li>{message.text}</li>))
    }
  }

  deleteMessage = (messageToDelete) => {
    const newMessagesArray = [];
    this.state.messages.map((message, i) => {
      if (message.key != messageToDelete.key) {
        newMessagesArray.push(message);
      }
    });
    this.setState({ messages: newMessagesArray });
  }

  getDeletedRoomMessages = (roomId) => {
    // console.log("yaas");
    console.log("HERE ARE ALL THE MESSAGES" + this.state.messages);


    console.log("SHOULD BE DELETED ROOM ID" + roomId);
    

    this.state.messages.map(message => {
      console.log("should be message roomId" + message.roomId);
      if (message.roomId === roomId) {
        this.deleteMessage(message);
        console.log("Messages array should be shorter" + this.state.messages)
        // console.log(this.state.messages)
        //take deleted message out of DB
      }
    })
  }

  //adding key values to each new message to be sent to database
  createMessage(newMessage) {
    this.props.messagesRef.push({
      text: this.state.newMessageText,
      roomId: this.props.activeRoom.key,
      username: this.props.currentUser ? this.props.currentUser : "Guest",
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessageText: "" })
  }

  render() {
    return (

      <React.Fragment>

        <div className="message-section-container">
          <div className="active-room">
            {this.props.activeRoom != null ? "You are currently in " + this.props.activeRoom.name : "No room has been selected"}
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
        </div>
      </React.Fragment>
    );
  }
};

export default MessageList;
