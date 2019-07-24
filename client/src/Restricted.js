import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Register extends Component {
    state = {
        users: []
    };

    componentDidMount() {
      axios.get('https://node-base-security.herokuapp.com/users')
        .then(res => {
          const users = res.data.data;
          this.setState({ users: users })
      });
    }

    render() {
        console.log('renderRestrict: ', this.state)
        return (
            <div className="App">
                <div className="App-header">
                    <form>
                        <h1><strong>Restricted</strong></h1>
                    </form>
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
