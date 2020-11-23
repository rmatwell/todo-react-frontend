import React, { Component } from 'react'
import TaskService from '../services/TaskService'
import Task from '../Task'
import Column from '../column'
import CenterView from './center-view'
import Card from 'react-bootstrap/Card'

class TaskList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask(id) {
        TaskService.deleteTask(id).then(res => {
            this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) });
        });
    }
    viewTask(id) {
        this.props.history.push(`/task/${id}`);
    }
    editTask(id) {
        this.props.history.push(`/task/${id}`);
    }

    componentDidMount() {
        TaskService.getTasks().then((res) => {
            this.setState({ tasks: res.data });
        });
    }

    addTask() {
        this.props.history.push('/task');
    }

    render() {
        return (
            <CenterView>
                <div>
                    <h2 className="text-center">tasks List</h2>
                    <div className="row">
                        <button className="btn btn-primary" onClick={this.addtask}> Add task</button>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> Name</th>
                                    <th> Description </th>
                                    <th> Complete </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(
                                        task =>
                                            <tr key={task.id}>
                                                <td> {task.id} </td>
                                                <td> {task.name}</td>
                                                <td> {task.description}</td>
                                                <td> {task.complete.toString()}</td>
                                                <td>
                                                    <button onClick={() =>
                                                        this.editTask(task.id)} className="btn btn-info">Update </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() =>
                                                        this.deleteTask(task.id)} className="btn btn-danger">Delete </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() =>
                                                        this.viewTask(task.id)} className="btn btn-info">View </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>

                    <Card>

                    </Card>

                    {/* <div>

                    {
                        this.state.tasks.map(
                            task =>
                                <Task>
                                    <tr key={task.id}>
                                        <td> {task.id} </td>
                                        <td> {task.name}</td>
                                        <td> {task.description}</td>
                                        <td> {task.complete}</td>
                                        <td>
                                            <button onClick={() =>
                                                this.editTask(task.id)} className="btn btn-info">Update </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() =>
                                                this.deleteTask(task.id)} className="btn btn-danger">Delete </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() =>
                                                this.viewTask(task.id)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                                </Task>
                        )
                    }

                   
                </div> */}


                    <Card>
                        {
                            this.state.tasks.map(
                                task =>

                                    <Card>
                                        <Card.Body>{task.name}</Card.Body>
                                    </Card>
                            )
                        }
                    </Card>

                </div>
            </CenterView>

        )
    }
}

export default TaskList