
import React, {Component} from 'react';



console.log("Rendering <Message/>");

class Message extends Component {

  render(){
    const username = this.props.username;
    const content = this.props.content;

    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}

export default Message;