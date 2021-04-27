import './home.css';
import '../../dashboard.css'
import profilePic from '../../assests/pic.png';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ReactComponent as Editlogo } from "../../assests/pen-solid.svg";
import { ReactComponent as DeleteLogo } from "../../assests/trash-solid.svg";
import { Pie } from 'react-chartjs-2';
import { devURL, dashBoard, task } from "../../environments/environment";
function Home() {
    const [pieData, setPieData] = useState();
    const { name, token } = JSON.parse(sessionStorage.getItem("token"));
    const history = useHistory();
    const [dialog, setDialog] = useState(false);
    const [edit, setEditTask] = useState();
    const [addTask, setTask] = useState();
    const [taskDetails, setTaskDetails] = useState([]);
    const [dashboardDetails, setDashboardDetails] = useState([]);
    const [reLoadComponent, setComponentReload] = useState(0);
    const [currentTaskID, setCurrentTaskID] = useState();
    const [currentTaskComplete, setCurrentTaskComplete] = useState();
    const [taskFilter, setTaskFilter] = useState([]);
    let headers = {
        'Authorization': "Bearer " + token,
        'Content-Type': "application/json"
    }
    // API Call function starts here
    function addTaskAPICall(){
        let payload = {
            name: addTask
        }
        axios.post(devURL + task, payload, { headers })
            .then(data => {
                let response = data.data;
                setDialog(false);
                setComponentReload(reLoadComponent + 1)
            })
            .catch(error => {
                console.log(error.message);
            })

    }
    function updateTaskAPICall(data) {
        let payload = {
            name: addTask,
            completed: currentTaskComplete
        }
        axios.put(devURL + task + "/" + currentTaskID, payload, { headers })
            .then(response => {
                console.log(response);
                setEditTask(false);
                setComponentReload(reLoadComponent + 1)
                setDialog(false);
            })
            .catch(error => {
                console.log(error)
            })

    }
    function logout() {
        sessionStorage.removeItem("token");
        history.push("/login");
    }
    function deleteTaskAPICall(data) {
        axios.delete(devURL + task + "/" + data._id, { headers })
            .then(data => {
                console.log(data);
                setComponentReload(reLoadComponent + 1)
            })
            .catch(error => {
                console.log(error);
            })
    }
    function editTaskAPICall(data) {
        setTask(data.name);
        setCurrentTaskID(data._id);
        setCurrentTaskComplete(data.completed);
        setDialog(true);
        setEditTask(true);
    }
    function completionTask(data, checked) {
        let payload = {
            name: data.name,
            completed: checked
        }
        axios.put(devURL + task + "/" + data._id, payload, { headers })
            .then(response => {
                console.log(response);
                setComponentReload(reLoadComponent + 1)

            })
            .catch(error => {
                console.log(error)
            })
    }
    // API Call functions ends here

    function filterTask(data) {
        let list = taskDetails.filter((i) => {
            if (i.name.toLowerCase().includes(data.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        if (data === "")
            setTaskFilter(taskDetails);
        else
            setTaskFilter(list);
    }
    // React Hook
    useEffect(() => {
        axios.get(devURL + dashBoard, { headers })
            .then(data => {
                let dashboardData = data.data;
                setDashboardDetails(dashboardData);
                if (dashboardData?.totalTasks !== 0) {
                    axios.get(devURL + task, { headers })
                        .then(data => {
                            let taskList = data.data;
                            setTaskDetails(taskList);
                            setTaskFilter(taskList);
                            let pie = {
                                lables: ["Completed", "Not Completed"],
                                datasets: [{
                                    backgroundColor: ["#5285EC", "#E8ECEC"],
                                    data: [dashboardData.taskCompleted, dashboardData.totalTasks - dashboardData.taskCompleted]
                                }]
                            };
                            setPieData(pie);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            })

    }, [reLoadComponent])
    return (
        <div className="home-container">
            <header>
                <div className="headerRegion">
                    <div className="profile-container">
                        <img src={profilePic} alt="profile-pic" className="profile-img" />
                        <span className="profile-name">{name}</span>
                    </div>
                    <div className="logout">
                        <button className="logout-button" onClick={() => logout()}>LogOut</button>
                    </div>
                </div>
            </header>
            <div className="body">
                <Modal show={dialog}
                    onHide={() => setDialog(false)}
                    centered dialogClassName="modal-container">
                    <Modal.Title className="modal-title">{edit ? "Update Task" : "+ New Task"}</Modal.Title>
                    <Modal.Body style={{ padding: "0px 0px 30px 0px" }}>
                        {edit ?
                            <form className="modal-form" onSubmit={updateTaskAPICall}>
                                <input type="text" id="taskname" className="modal-input" placeholder="Task Name" value={addTask} onChange={e => setTask(e.target.value)} />
                                <input className="modal-button" type="submit" value="Update Task" />
                            </form>
                            :
                            <form className="modal-form" onSubmit={addTaskAPICall}>
                                <input type="text" id="taskname" className="modal-input" placeholder="Task Name" onChange={e => setTask(e.target.value)} />
                                <input className="modal-button" type="submit" value="+ New Task" />
                            </form>
                        }
                    </Modal.Body>
                </Modal>
                {dashboardDetails && dashboardDetails.totalTasks ?
                    <div className="dashboardRegion">
                        <div className="topCards">
                            <div className="cardStructure">
                                <div className="taskCompletion-header">Tasks Completed</div>
                                <div className="taskCount">
                                    <div className="taskCountNumber">{dashboardDetails.taskCompleted}</div>
                                    <div>/{dashboardDetails.totalTasks}</div>
                                </div>
                            </div>
                            <div className="latestTaskCardStructure">
                                <div className="taskCompletion-header">Latest Created Tasks</div>
                                {dashboardDetails.latestTasks.map((i) => {
                                    return (
                                        <li className={i.completed ? "latestListsCompleted" : "latestLists"} key={i._id}>{i.name}</li>
                                    )
                                })}
                            </div>
                            <div className="pieCardStructure">
                                <Pie data={pieData} width={"50%"} height={"50%"}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        animation: false
                                    }} />
                            </div>
                        </div>
                        <div className="lowerCards">
                            <div className="lowerCards-topRegion">
                                <div className="lowerCard-task-heading">Tasks</div>
                                <div className="lowerCard-search-region">
                                    <input type="text" className="searchbox-region" placeholder="Search by task name" onChange={(e) => filterTask(e.target.value)} />
                                    <button className="taskSearchButton" onClick={() => setDialog(true)}>+ New Task</button>
                                </div>
                            </div>
                            <div className="lowerCards-ListRegion">
                                {taskFilter.map((i) => {
                                    return (
                                        <div className="lowerCards-row" key={i._id}>
                                            <div className="lowerCards-leftRegion">
                                                <input type="checkbox" checked={i.completed} className="lowerCards-checkbox" onChange={(e) => completionTask(i, !i.completed)} />
                                                <div className={i.completed ? "lowerCards-complete-text" : "lowerCards-text"}>{i.name}</div>
                                            </div>
                                            <div className="lowerCards-rightRegion">
                                                <Editlogo onClick={() => editTaskAPICall(i)} />
                                                <DeleteLogo onClick={() => deleteTaskAPICall(i)} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    : <div className="addTask">
                        <div className="task-container">
                            <div className="taskHeader">You have no task.</div>
                            <button className="taskButton" onClick={() => setDialog(true)}> +New Task</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );

}

export default Home;