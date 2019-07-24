import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'


class App extends Component {
  state = {
    name: '',
    password: '',
    status:'',
    users: [],
    token: '',
    valid_user: false
  };

handleLogin = () => {
  console.log("handleLogin: ", this.state)
  const payload = {name: this.state.name,
                   password: this.state.password};
  axios.post('http://localhost:4000/login', payload)
    .then(res => {
      console.log('resLogin: ', res)
      this.setState({ token: res.data.token, status: res.data.status})
    })
}

handleClick = () => {
  console.log("handleClick: ", this.state)
  const userName = {name: this.state.name}
  const axiosConfig = {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        "token": this.state.token
                    }};
  axios.post('http://localhost:4000/verify_user', userName, axiosConfig)
      .then(res => {
        console.log('resClick: ', res)
        this.setState({ valid_user: res.data.status })
      })
}

render() {
  console.log('render: ', this.state)
  if (this.state.valid_user === true) {
      return <Redirect to='/restricted' />
  }
    return (
      <div className="App">
          <div className="App-header">
        <form>
            <h1><strong>Login</strong></h1>
            <h3>Username:</h3>
          <input
              type="text"
              value={this.state.text}
              onChange={e => this.setState({ name: e.target.value })}
          />
            <h3>Password:</h3>
            <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
             />
        </form>
            <button onClick={this.handleLogin}> Login </button>        
        <p>
          <strong> Status: </strong>
        </p>
        {this.state.status}
        <Link to="/register"> Sign up here </Link>
        {this.renderRedirect}
        <button onClick={this.handleClick}> Verify </button>
       </div>
      </div>
    );
  }
}

export default App;
