import React, { Component } from 'react';
import './dashboard.css'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let data = [
            { name: "Completed", value: 50, fill: "#5285EC" },
            { name: "Incomplete", value: 100, fill: "#E8ECEC" }
        ];
        let renderLabel = function (entry) {
            if (entry.name === "Completed") {
                return "Completed Tasks";
            }
        }
        return (
            <div>
                <div className="topCards">
                    <div className="cardStructure">
                        <div className="taskCompletion-header">Tasks Completed</div>
                        <div className="taskCount">
                            <div style={{ fontSize: "64px" }}>5</div>
                            <div>/20</div>
                        </div>
                    </div>
                    <div className="cardStructure">
                        <div className="taskCompletion-header">Latest Created Tasks</div>
                        <li>Clean the room</li>
                        <li>Clean the room</li>
                        <li>Clean the room</li>
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
                                <input type="search" placeholder="Search by task name" />
                                <input type="submit" className="taskSearchButton" value="+ New Task" />
                            </form>
                        </div>
                    </div>
                    <div className="lowerCards-ListRegion">

                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;