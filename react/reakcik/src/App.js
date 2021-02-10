import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends React.Component {
  componentDidMount() {
    document.title = "dfsdfsdaaaafsd"
  }

  constructor(props) {
    super(props);
    this.state = { value: logo };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //alert("!");

    this.setState({ value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgsl5tFVM3bwZDBCUo_tGF70oli7ejLNGmw&usqp=CAU" });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    //event.preventDefault();
  }

  render() {
    return <div className="App" onClick={this.handleChange}>
      <header className="App-header">
        <img src={this.state.value} className="App-logo" alt="logo" />
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
    </div>;
  }
}

export default App;
