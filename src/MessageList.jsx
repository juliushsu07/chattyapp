
import React, {Component} from 'react';
import Message from './Message.jsx';


console.log("Rendering <MessageList/>");

class MessageList extends Component {

  render(){

    return (
      <main className="messages">
         {this.props.messages.map((message) => {
          if (message.type === "incomingMessage") {
            return (
              <Message username = {message.username} content = {message.content} key = {message.id}/>
            );
          } else {
            return (
              <div key={message.id} className="message system">{message.content}</div>
            );
          }
        })}
      </main>
    );
  }
}

export default MessageList;


