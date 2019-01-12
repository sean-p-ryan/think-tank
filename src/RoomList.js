import React, { Component } from "react";
import App from "./App";

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRooms(newRoomName) {
    this.roomsRef.push({
      name: newRoomName,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.rooms.map((room, i) => (
            <p key={i}>Room name: {room.name}</p>
          ))}
        </div>

        <div className="new-room-form">
          <h1>Add a new chatroom!</h1>
          <form>
            <label for="roomName">Room Name: </label>
            <input type="text" id="roomName" value="New Room Name"/>
            <input type="submit" value="Submit"
              onClick={this.createRooms('test')}
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RoomList;
