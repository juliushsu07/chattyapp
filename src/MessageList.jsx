
import React, {Component} from 'react';
import Message from './Message.jsx';


console.log("Rendering <MessageList/>");

class MessageList extends Component {

  render(){
    const message = this.props.messages.map( (message) =>
      <Message username = {message.username} content = {message.content} key = {message.id} />
    );

    return (
      <main className="messages">
        {message}
      </main>
    );
  }
}

export default MessageList;


