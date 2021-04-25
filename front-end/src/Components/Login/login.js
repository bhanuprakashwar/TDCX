import React, { useState } from 'react';
import axios from 'axios'
import './login.css';
import { useHistory } from "react-router-dom";
function Login() {
    const history = useHistory();
    const [id, setId] = useState();
    const [name, setName] = useState();

    const submitHandler = e => {
        e.preventDefault();
        let payload = {
            id: id,
            name: name
        }
        axios.post("http://localhost:3000/api/login", payload)
            .then(data => {
                let response = data.data;
                if (response.token) {
                    sessionStorage.setItem("token", JSON.stringify(response.token));
                    history.push('/dashboard');
                }
            })
            .catch(error => {
                console.log(error.message);
            })

    }
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-container-header">
                    Login
                    </div>
                <div className="login-container-body">
                    <form onSubmit={submitHandler}>
                        <input type="text" id="id" placeholder="Id" onChange={e => setId(e.target.value)} value={id} />
                        <input type="text" id="name" className="input-field-password" placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
                        <input className="login-button" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;