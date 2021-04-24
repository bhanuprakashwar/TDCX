import React, { Component } from 'react';
import './home.css';
import profilePic from '../../assests/pic.png';
import { Modal } from "react-bootstrap";
import Dashboard from '../Dashboard/dashboard';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
        }
    }
    addTask() {
        this.setState({
            openModal: !this.state.openModal,
        });
    }
    render() {
        const name = "Ali";
        const logout = "Logout";
        return (
            <div className="home-container">
                <header>
                    <div className="headerRegion">
                        <div className="profile-container">
                            <img src={profilePic} alt="profile-pic" className="profile-img" />
                            <span className="profile-name">{name}</span>
                        </div>
                        <div className="logout">
                            <span>{logout}</span>
                        </div>
                    </div>
                </header>
                <div className="body">
                    <Modal show={this.state.openModal} centered dialogClassName="modal-container">
                        <Modal.Title className="modal-title">+ New Task</Modal.Title>
                        <Modal.Body style={{padding:"0px 0px 30px 0px"}}>
                            <form className="modal-form" onSubmit={this.handleSubmit}>
                                <input type="text" id="taskname" placeholder="Task Name" />
                                <input className="modal-button" type="submit" value="+ New Task" />
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* <div className="addTask">
                        <div className="task-container">
                            <div className="taskHeader">You have no task.</div>
                            <button className="taskButton" onClick={() => this.addTask()}> +New Task</button>
                        </div>
                    </div> */}
                    <Dashboard/>

                </div>
            </div>
        );
    }
}

export default Home;