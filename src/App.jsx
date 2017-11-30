
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';





console.log("Rendering <App/>");
class App extends Component {
  constructor(props) {
    super(props);

    this.state =
    {
      currentUser: {name: "Bob"},
      messages: []
    }

    this.addMessage = this.addMessage.bind(this)

  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = function(e){
       console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      const dataFromServer = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(dataFromServer);
      this.setState({messages: newMessages});
    }
  }

  addMessage(e) {
    if(e.key === 'Enter'){
      const newMessage = {
        id: this.state.messages.length + 1,
        username: this.state.currentUser.name ,
        content: e.target.value
      }
      const message = JSON.stringify(newMessage);
      this.socket.send(message);
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUserName = {this.state.currentUser.name} addMessage = {this.addMessage}/>
      </div>
    );
  }
}

export default App;
