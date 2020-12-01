import React from 'react'
import ListService from '../services/ListService'
import Column from '../column'
import CenterView from './center-view'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
 `

export default class Board extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Lists: [],
            columnOrder: []
        }
        this.addList = this.addList.bind(this);
        this.editList = this.editList.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    deleteList(id) {
        ListService.deleteList(id).then(res => {
            this.setState({
                Lists: this.stateLists.filter(List => List.id !== id)
            });
        });
    }
    viewList(id) {
        this.props.history.push(`list/${id}`);
    }
    editList(id) {
        this.props.history.push(`list/${id}`);
    }

    componentDidMount() {
        ListService.getLists().then((res) => {
            this.setState({ Lists: res.data })
        });

        ListService.getLists().then((res) => {
            const data = res.data
            const columns = []
            console.log(data)

            data.map(col =>
                columns.push(col.id)
            )

            console.log(columns)

            this.setState({ columnOrder: columns })

            console.log(this.state.columnOrder)
        });
    }

    addList() {
        this.props.history.push('List');
    }

    onDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    }

    onDragUpdate = update => {
        const { destination, } = update;
        const opacity = destination
            ? destination.index / Object.keys(this.stateLists).length
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

        const start = this.state.Lists.tasks;
        const finish = this.state.Lists.tasks;
        console.log(res);
        console.log({ finish });

        if (start === finish) {
            const newListIds = Array.from(start.id);
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...finish,
                tasks: newListIds,
            };

            const newState = {
                ...this.state,
                Lists: {
                    ...this.state.Lists,
                    [newColumn.list]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        const startListIds = Array.from(start.tasks);
        startListIds.splice(source.index, 1);
        const newStart = {
            ...start,
            tasks: startListIds,
        };

        const finishListIds = Array.from(finish.tasks);
        finishListIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            tasks: finishListIds,
        };

        const newState = {
            ...this.state,
            Lists: {
                ...this.state.Lists,
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
                    <DragDropContext onDragEnd={this.onDragEnd} >
                        <Droppable droppableId="all-columns" direction="horizontal" type="column">
                            {provided => (
                                <Container {...provided.droppableProps} ref={provided.innerRef}>

                                    {this.state.columnOrder.map((columnId, index) => {
                                        const column = this.state.Lists[columnId];
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