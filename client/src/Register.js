import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Register extends Component {
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

    handleCreate = () => {
        console.log('handler: ', this.state)
        const msg = {name: this.state.name,
                     password: this.state.password};
        axios.post('http://localhost:4000/new_user', msg)
            .then(res => {
                console.log('res_new:',res)
                const status = res.data.status;
                this.setState({ status: status })
            });
    };


    render() {
        console.log('renderReg: ', this.state)
        return (
            <div className="App">
                <div className="App-header">
                    <form>
                        <h1><strong>Sign up</strong></h1>
                        <h3>Username:</h3>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                        <h3>Password:</h3>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </form>
                    <button onClick={this.handleCreate}> Submit </button>
                    <p>
                        <strong>Status:</strong>
                    </p>
                    {this.state.status}
                    <p>
                        <strong>Users list:</strong>
                    </p>
                    {this.state.users && this.state.users.map(user => {return(<p>{user.name}</p>)} )}
                </div>
            </div>
        );
    }
}

export default Register;
