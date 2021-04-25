import './dashboard.css'
import { ReactComponent as Editlogo } from "../../assests/pen-solid.svg";
import { ReactComponent as DeleteLogo } from "../../assests/trash-solid.svg";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from 'react';
/* function Dashboard2(props) {
    let data = [
        { name: "Completed", value: props.dashBoardData.taskCompleted, fill: "#5285EC" },
        { name: "Incomplete", value: props.dashBoardData.totalTasks, fill: "#E8ECEC" }
    ];
    let renderLabel = function (entry) {
        if (entry.name === "Completed") {
            return "Completed Tasks";
        }
    }
    const [tasklists,setTaskList] = useState(props.taskLists);
    function callParentDialog() {
        props.onChange(true);
    }
    function editTask(data) {
        props.editParentTask(data);
    }
    function deleteTask(data) {
        props.deleteParentTask(data);
    }
    function checkboxUpdate(data,checked){
        props.updateCompletionTask(data,checked);
    }
    function filterTask(data){
        let list = props.taskLists.filter((i)=>{
            if(i.name.toLowerCase().includes(data.toLowerCase())){
                return i;
            }
        });
        setTaskList(list);
    }
    return (
        <div className="dashboardRegion">
            <div className="topCards">
                <div className="cardStructure">
                    <div className="taskCompletion-header">Tasks Completed</div>
                    <div className="taskCount">
                        <div style={{ fontSize: "64px" }}>{props.dashBoardData.taskCompleted}</div>
                        <div>/{props.dashBoardData.totalTasks}</div>
                    </div>
                </div>
                <div className="cardStructure">
                    <div className="taskCompletion-header">Latest Created Tasks</div>
                    {props.dashBoardData.latestTasks.map((i) => {
                        return (
                            <li key={i._id}>{i.name}</li>
                        )
                    })}
                </div>
                <div className="cardStructure2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                label={renderLabel}
                                outerRadius={50}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="lowerCards">
                <div className="lowerCards-topRegion">
                    <div>Tasks</div>
                    <div>
                        <form>
                            <input type="search" placeholder="Search by task name" onChange={(e)=>filterTask(e.target.value)}/>
                        </form>
                        <button className="taskSearchButton" onClick={callParentDialog}>+ New Task</button>
                    </div>
                </div>
                <div className="lowerCards-ListRegion">
                    {tasklists.map((i) => {
                        return (
                            <div className="lowerCards-row" key={i._id}>
                                <div className="lowerCards-leftRegion">
                                    <input type="checkbox" checked={i.completed} className="lowerCards-checkbox" onChange={(e) => checkboxUpdate(i,!i.completed)} />
                                    <div className="lowerCards-text">{i.name}</div>
                                </div>
                                <div className="lowerCards-rightRegion">
                                    <Editlogo onClick={() => editTask(i)} />
                                    <DeleteLogo onClick={() => deleteTask(i)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
} */

/* export default Dashboard; */