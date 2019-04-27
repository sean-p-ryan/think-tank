import React, { Component } from "react";

const Message = (props) => {
    
    return (
        <div>
        <p>Message </p>
        <p>Message text: {props.text}}</p>
        <input
          className="delete-room"
          type="button"
          value="Delete message"
          onClick={e => props.deleteMessage(props.message)}
        />
      </div>
    )
}

export default Message;

