import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {
  state = {
    status: '',
    data: ''
  };
  
handleSubmit(){
  //const msg = {name: "Ricardo"};
  axios.post('http://localhost:4000/users', {name: ["Ricardo"], password: "123"})
    .then(res => {
      console.log(res)
      const users = res.data;
      this.setState({ data: users })
  });
};


render() {
  console.log(this.state)
    return (
      <div className="App">
          <div className="App-header">
        <form>
            <h1><strong>Login</strong></h1>
            <h3>Username:</h3>
          <input
              type="text"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
          />
            <h3>Password:</h3>
            <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
             />
          <button type="submit" onClick={this.handleSubmit}> Submit </button>
        </form>
        <p>
            <strong>Users list:</strong>
        </p>
       {this.state.data.data && this.state.data.data.map(user => {return(<p>{user.name}</p>)} )}
              <Link to="/Register">Sign up here</Link>
          </div>
      </div>
    );
  }
}

export default App;
