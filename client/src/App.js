import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    status: '',
    data: ''
  };
  
componentDidMount(){
  //const msg = {name: "Ricardo"};
  axios.post('http://localhost:4000/users', {name: "Ricardo", password: "123"})
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
        <form>
          <p>
            <strong>Send to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <button> Submit </button>
        </form>
        <p>
            <strong>Users list:</strong>
        </p>
       {this.state.data.data && this.state.data.data.map(user => {return(<p>{user.name}</p>)} )}
      </div>
    );
  }
}

export default App;
