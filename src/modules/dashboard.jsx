import React from 'react';
import initialData from '../initial-data';
import Column from '../column'
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import CenterView from '../components/center-view'

const Container = styled.div`
  display: flex;
  `

const Board = styled.div`
  display: flex;
  `

export default class Dashboard extends React.Component {
    state = initialData;

    onDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    }

    onDragUpdate = update => {
        const { destination, } = update;
        const opacity = destination
            ? destination.index / Object.keys(this.state.tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
    }

    onDragEnd = res => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';
        const { destination, source, draggableId, type } = res;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder,

            };
            this.setState(newState);
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...finish,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <CenterView>
                    <DragDropContext
                        onDragStart={this.onDragStart}
                        onDragEnd={this.onDragEnd}
                        onDragUpdate={this.onDragUpdate}>
                        <Droppable
                            droppableId="all-columns"
                            direction="horizontal"
                            type="column"
                        >

                            {provided => (
                                <Container
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >

                                    {this.state.columnOrder.map((columnId, index) => {
                                        const column = this.state.columns[columnId];
                                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                                        return <Column key={column.id} column={column} tasks={tasks} index={index} />;
                                    })}
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    </DragDropContext>
                </CenterView>
            </div>
        );
    }
}