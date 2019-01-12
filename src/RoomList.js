import React, { Component } from 'react';
import App from './App';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }



  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      console.log(snapshot);
    });
  }

  // render() {
  //   return(
  //
  //   );
  // }
}

export default RoomList;
