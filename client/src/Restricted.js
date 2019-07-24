import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const base_url = process.env.BASE_URL || 'http://localhost:4000'

class Register extends Component {
    state = {
        users: []
    };

    componentDidMount() {
      axios.get(base_url + '/users')
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
