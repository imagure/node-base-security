import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    name: '',
    password: '',
    status:'',
    users: []
  };

componentDidMount() {
  axios.get('http://localhost:4000/users')
    .then(res => {
      const users = res.data.data;
      this.setState({ users: users })
  });
}

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
            <h3><strong>Send to Server:</strong></h3>
          <input
              type="text"
              value={this.state.text}
              onChange={e => this.setState({ name: e.target.value })}
          />
            <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
             />
        </form>
            <button onClick={this.handleClick}> Send </button>        
        <p>
          <strong> Status: </strong>
        </p>
        {this.state.status}
        
        <p>
          <strong>Users list:</strong>
        </p>
        {this.state.users && this.state.users.map(user => {return( <p> {user.name} </p> )} )}
       
       </div>
      </div>
    );
  }
}

export default App;
