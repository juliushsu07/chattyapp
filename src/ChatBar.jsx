
import React, {Component} from 'react';



console.log("Rendering <ChatBar/>");

class ChatBar extends Component {

  render(){
    const defaultName = this.props.currentUser;

    return (
      <footer className="chatbar">
        <input defaultValue = {defaultName} className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress= {this.props.onUserEnterName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.onEnterMessage} />
      </footer>
    );
  }
}

export default ChatBar;