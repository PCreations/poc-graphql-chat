import React, { Component } from 'react';

import ChatBox from './ChatBox'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <div style={{ width: '500px', margin: 'auto' }}>
            <ChatBox/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
