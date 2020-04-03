import "./index.css";
import React, { Component } from "react";
import { Board } from "./components/board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">React Trello App</div>
        <Board />
      </div>
    );
  }
}

export default App;
