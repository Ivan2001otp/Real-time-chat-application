import './App.css';
import React,{Component} from 'react';
import {connect,sendMsg} from "./api";
import Header from './components/Header/Header.jsx';
import ChatHistory from './components/ChatHistory/ChatHistory.jsx';
import ChatInput from './components/ChatInput/ChatInput.jsx';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      chatHistory:[]
    }
    connect();//when the app loads the websocket should be connected
  }

  componentDidMount(){
    connect((msg)=>{
      console.log("New message");
      this.setState(prevState=>({
        chatHistory:[...this.state.chatHistory,msg]
      }))
      console.log(this.state);
    });
  }

  send(event){
    console.log("hello")
    console.log(event);
    if(event.keyCode===13){
      //if enter key is hit,then send message to socket
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  render(){
    return (
      <div className='App'>
        <Header/>
        <ChatHistory chatHistory={this.state.chatHistory}/>
        {/* <button onClick={this.send}>Hit me</button> */}
        <ChatInput send={this.send}/>
      </div>
    );
  }
}

export default App;
