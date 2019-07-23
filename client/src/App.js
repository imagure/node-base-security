import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom'


class App extends Component {
  state = {
    name: '',
    password: '',
    status:'',
    users: []
  };

handleClick = () => {
  console.log("handler: ", this.state)
  const payload = {name: this.state.name,
                   password: this.state.password};
  //const msg = jwt.sign(payload, privateKEY, signOptions)
  axios.post('http://localhost:4000/validate_user', payload)
    .then(res => {
      console.log('res1: ', res)
      axios.post('http://localhost:4000/login', res.data)
      .then(res => {
        console.log('res: ', res)
        const status = res.data.status;
        this.setState({ status: status })
      })
  });
};


render() {
  console.log('render: ', this.state)
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
            <button onClick={this.handleClick}> Login </button>        
        <p>
          <strong> Status: </strong>
        </p>
        {this.state.status}
        <Link to="/register"> Sign up here </Link>
       </div>
       </div>
    );
  }
}

export default App;
