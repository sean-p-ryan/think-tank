import React, { Component } from "react";
import styles from "./../styles/RoomList.css";

const uuidv1 = require("uuid/v1");

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      newRoomTopic: "",
      roomId: "",
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", (snapshot) => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
      if (this.state.rooms.length === 1) {
        this.props.setActiveRoom(room);
      }
    });
    this.roomsRef.on("child_removed", (snapshot) => {
      this.setState({
        rooms: this.state.rooms.filter((room) => room.key !== snapshot.key),
      });
      this.props.setDeletedRoomId(snapshot.key);
      console.log("HERE'S THE SNAPSHOT KEY" + snapshot.key);
    });
  }

  createRooms(newRoomName, newRoomTopic) {
    this.roomsRef.push({
      name: newRoomName,
      topic: newRoomTopic,
    });
    this.setState({
      newRoomTopic: "",
      newRoomName: "",
    });
  }

  deleteRoom = (room) => {
    const newRoomsArray = [];
    this.state.rooms.map((room, i) => {
      if (room.key != room.key) {
        newRoomsArray.push(room);
      }
    });
    this.setState({ rooms: newRoomsArray });
    this.roomsRef.child(room.key).remove();
  };

  handleRoomNameChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  handleRoomTopicChange(e) {
    this.setState({ newRoomTopic: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <nav className="level header">
            <div className="level-item has-text-left">
              <div>
                <p className="title level-left">Available Rooms</p>
              </div>
            </div>
          </nav>
          {this.state.rooms.map((room, i) => (
            <div
              className="room-container"
              onClick={() => this.props.setActiveRoom(room)}
            >
              <div className="room-info">
                <a className="room-info-container">
                  <div>
                    <h1 key={room.key}>{room.name}</h1>
                    <p key={uuidv1()}>{room.topic}</p>
                  </div>
                  <button
                    className="button is-small"
                    onClick={(e) => this.deleteRoom(room)}
                  >
                    Delete
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="new-room-form">
          <h1>Add New Room</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.createRooms(this.state.newRoomName, this.state.newRoomTopic);
            }}
          >
            <div>
              <label htmlFor="room-name" />
              <input
                class="input is-small"
                type="text"
                placeholder="Room Name"
                id="room-name"
                value={this.state.newRoomName}
                onChange={(e) => this.handleRoomNameChange(e)}
              />
            </div>
            <div>
              <label htmlFor="room-topic" />
              <input
                class="input is-small"
                placeholder="Room Topic"
                type="text"
                id="roomTopic"
                value={this.state.newRoomTopic}
                onChange={(e) => this.handleRoomTopicChange(e)}
              />
              <div>
                <button className="button is-primary is-small" type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RoomList;
