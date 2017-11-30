
import React, {Component} from 'react';



console.log("Rendering <ChatBar/>");

class ChatBar extends Component {

  render(){
    const name = this.props.currentUserName;
    return (

      <footer className="chatbar">
        <input defaultValue = {name} className="chatbar-username" placeholder="Your Name (Optional)"  />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.addMessage} />
      </footer>
    );
  }
}

export default ChatBar;