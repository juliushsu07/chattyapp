
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


console.log("Rendering <App/>");
class App extends Component {
  constructor(props) {
    super(props);

    this.state =
    {
      currentUser: "Anonymous",
      messages: [],
      userCounter: 0
    }

    // this.onUserChangeName = this.onUserChangeName.bind(this);

    this.onUserEnterName = this.onUserEnterName.bind(this);
    this.onEnterMessage = this.onEnterMessage.bind(this);
  }

  componentDidMount() {
    const initializeUser = {
        type: "initializeUser",
        oldUsername: this.state.currentUser,
        userCounter: this.state.counter
    }
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (e) => {
      console.log('connected to server');
      this.socket.send(JSON.stringify(initializeUser));
    }

    this.socket.onmessage = (e) => {
      const data = JSON.parse(event.data);

      switch(data.type) {
      case "incomingUserCounter":
        this.setState({userCounter: data.userCounter});

        break;
      case "incomingMessage":
        // handle incoming message
        const newMessages = this.state.messages.concat(data);
        this.setState({messages: newMessages});
        break;
      case "incomingNotification":
        // handle incoming notification
        const notificationMsg = this.state.messages.concat(data);
        this.setState({messages: notificationMsg});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }

    }
  }

  onUserEnterName(e){
     if(e.key === 'Enter'){
      const changeNameMsg = {
        type: "postNotification",
        newUsername: e.target.value,
        content: "changed his or her name to"
      }
      this.socket.send(JSON.stringify(changeNameMsg));
      this.setState({currentUser: e.target.value});
    }
  }

  onEnterMessage(e) {
    if(e.key === 'Enter'){
      const newMessages = {
        type: "postMessage",
        username: this.state.currentUser ,
        content: e.target.value
      }
      this.socket.send(JSON.stringify(newMessages));
      e.target.value = "";
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-counter">{this.state.userCounter} users online</span>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser} onUserEnterName = {this.onUserEnterName} onEnterMessage = {this.onEnterMessage}/>
      </div>
    );
  }
}

export default App;
