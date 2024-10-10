import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';
import {connect,sendMsg} from "./api";

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
    super(props)
    connect();//when the app loads the websocket should be connected
  }

  send(){
    console.log("hello")
    sendMsg("hi immanuel ,what's up !!!");
  }

  render(){
    return (
      <div className='App'>
        <button onClick={this.send}>Hit me</button>
      </div>
    )
  }
}

export default App;
