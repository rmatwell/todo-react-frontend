import React, { Component } from 'react'
import TaskService from '../services/TaskService'
import Task from '../Task'
import Column from '../column'
import Container from '../column'
import CenterView from './center-view'
import Card from 'react-bootstrap/Card'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';

class Board extends React.Component {

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

                <div>
                    <CenterView>
                        <DragDropContext onDragEnd={this.onDragEnd} >
                            <Droppable droppableId="Droppable" direction="horizontal" type="task">
                                {provided => (
                                    <Task {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            this.state.tasks.map(
                                                task =>

                                                    <Card>
                                                        <Card.Body>{task.name}</Card.Body>
                                                    </Card>
                                            )
                                        }
                                        {provided.placeholder}
                                    </Task>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </CenterView>
                </div>

            </CenterView>

        )
    }
}

export default Board