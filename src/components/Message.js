import React, { Component } from "react";

const Message = (props) => {
    
    return (
        <div>
        <p>Message </p>
        <p>Message text: {props.text}}</p>
        <button
          className="input-form button is-primary"
          type="button"
          value="Delete message"
          onClick={e => props.deleteMessage(props.message)}
        />
      </div>
    )
}

export default Message;

