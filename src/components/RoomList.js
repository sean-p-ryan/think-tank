import React, { Component } from "react";
import App from "./../App";
import styles from "./../styles/RoomList.css";

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      newRoomTopic: "",
      roomId: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
      if (this.state.rooms.length === 1) {
        this.props.setActiveRoom(room);
      }
    });
    this.roomsRef.on("child_removed", snapshot => {
      this.setState({
        rooms: this.state.rooms.filter(room => room.key !== snapshot.key)
      });
    });
    console.log(this.roomsRef);
  }

  createRooms(newRoomName, newRoomTopic) {
    this.roomsRef.push({
      name: newRoomName,
      topic: newRoomTopic
    });
    this.setState({
      newRoomTopic: "",
      newRoomName: ""
    })
  }

  deleteRoom = roomName => {
    console.log("Delete Room Triggered");
    const newRoomsArray = [];
    this.state.rooms.map((room, i) => {
      if (room.key != roomName.key) {
        newRoomsArray.push(room);
      }
    });
    this.setState({ rooms: newRoomsArray });
    console.log(this.state.rooms);
    delete this.roomsRef[roomName.key]
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
        <div className="available-rooms">
          <div className="rooms-header">Available Rooms</div>
          <div className="room-container">
          {this.state.rooms.map((room, i) => (
            <a>
              <p key={i} onClick={() => this.props.setActiveRoom(room)}>
                Room name: {room.name}
              </p>
              <p key={i}>
                Room topic: {room.topic}
              </p>
              <input
                className="delete-room"
                type="button"
                value="Delete this room"
                onClick={e => this.deleteRoom(room)}
              />
            </a>
          ))}
        </div>
        </div>

        <div className="new-room-form">
          <h1>Add a new chatroom!</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.createRooms(this.state.newRoomName, this.state.newRoomTopic);
            }}
          >
          <div>
            <label for="roomName">Room Name: </label>
            <input
              type="text"
              id="roomName"
              value={this.state.newRoomName}
              onChange={e => this.handleRoomNameChange(e)}
            />
          </div>
          <div>
            <label for="roomTopic">Room Topic: </label>
            <input
              type="text"
              id="roomTopic"
              value={this.state.newRoomTopic}
              onChange={e => this.handleRoomTopicChange(e)}
            />
            <input
              type="submit"
              value="Create room!"/>
          </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RoomList;
