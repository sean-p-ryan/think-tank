import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/MessageList.css";
import Message from "./Message";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageText: "",
      activeRoomMessages: []
    };
    // change to messages ref
    this.messagesRef = this.props.firebase.database().ref("messages");
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    const dataSnapshot = this.props.firebase.database().ref("rooms");
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
    this.getActiveRoomMessages();
    console.log(this.state.messages)
  }

  handleChange(e) {
    this.setState({ newMessageText: e.target.value });
  }

  getActiveRoomMessages() {
    let activeRoomMessages = [];
    console.log(this.state.messages)
    this.state.messages.map(message => {
      // if (message.roomId === this.props.activeRoomId) {
      //   activeRoomMessages.push(message);
      // }
      
    })
    // console.log("KABLAM" + message)
    this.setState({activeRoomMessages: activeRoomMessages})
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

  //adding key values to each new message to be sent to database
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
        <div className="message-section-container">
          <div className="active-room">
            {this.props.activeRoom != null ? "You are currently in " + this.props.activeRoom : "No room has been selected"}
          </div>
          <div className="list-of-messages">
            <ul>
              {
                this.state.activeRoomMessages.map(message => {
                  return <li key={message.key}>{message.text}</li>
                })
              }
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
