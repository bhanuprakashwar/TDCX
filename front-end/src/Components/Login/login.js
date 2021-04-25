import React, { Component } from 'react';
import './login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleSubmit() {
    }
    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-container-header">
                        Login
                    </div>
                    <div className="login-container-body">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="username" placeholder="Id" />
                            <input type="password" id="password" className="input-field-password"placeholder="Name" />
                            <input className="login-button"type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;