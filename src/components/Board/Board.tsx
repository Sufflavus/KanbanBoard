import React, { createRef } from 'react';
import { withTranslation, WithTranslation } from "react-i18next";
import { connect, ConnectedProps } from 'react-redux';
import { loadAllTasks, TaskActionsProps } from '../../actions';
import { TaskState } from '../../reducers/state';
import { AppDispatch, RootState } from '../../store';
import { EntityStatus, TaskStatus, TaskStatusIds, TaskStatusNameKeyMap } from '../../models';
import { Task } from '../../components';
import './Board.less';

interface IDragProps {
    dragging: boolean;
    draggableTaskId: string;
    draggableElement: HTMLElement | null;
    dragOffsetInsideTaskElementTop: number;
    dragOffsetInsideTaskElementLeft: number;
    minTaskElementRelativeTop: number;
    minTaskElementRelativeLeft: number;
    maxTaskElementRelativeTop: number;
    maxTaskElementRelativeLeft: number;
}

const defaultDragProps: IDragProps = {
    dragging: false,
    draggableTaskId: '',
    draggableElement: null,
    dragOffsetInsideTaskElementTop: 0,
    dragOffsetInsideTaskElementLeft: 0,
    minTaskElementRelativeTop: 0,
    minTaskElementRelativeLeft: 0,
    maxTaskElementRelativeTop: 0,
    maxTaskElementRelativeLeft: 0
};

interface TasksProps {
    tasks: TaskState
};

interface OwnProps {};

type Props = PropsFromRedux & WithTranslation & OwnProps;

interface State {
    dragProps: IDragProps;
}

class Board extends React.Component<Props, State> {
    _boardElementRef: React.RefObject<HTMLTableSectionElement> | null = null;

    constructor(props: Props) {
        super(props);
        this._boardElementRef = createRef<HTMLTableSectionElement>();
        this.state = { dragProps: { ...defaultDragProps } };
     }

    componentDidMount() {
        if(this.props.tasks.status === EntityStatus.Init) {
            this.props.loadAllTasks(this.props.dispatch);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this._updateTaskPosition);
    }

    _onTaskMouseDown = (event: React.MouseEvent<HTMLElement>, taskId: string, element: HTMLElement) => {
        if(!this._boardElementRef) {
            return;
        }

        const parentElement = this._boardElementRef.current! as HTMLElement;
        const parentRect = parentElement.getBoundingClientRect();

        const taskElement = event.target as HTMLElement;
        const taskRect = taskElement.getBoundingClientRect();

        this.setState({
            dragProps: { 
                ...this.state.dragProps,
                dragging: true,
                draggableTaskId: taskId,
                draggableElement: element,
                dragOffsetInsideTaskElementTop: event.clientY - taskRect.top,
                dragOffsetInsideTaskElementLeft: event.clientX - taskRect.left,
                minTaskElementRelativeTop: 0,
                minTaskElementRelativeLeft: 20,
                maxTaskElementRelativeTop: parentRect.height - element.clientHeight - 20,
                maxTaskElementRelativeLeft: parentRect.width - element.clientWidth - 20
            }
        });

        element.style.width = `${element.clientWidth}px`;
        document.addEventListener("mousemove", this._updateTaskPosition);
    }

    _updateTaskPosition = (event: MouseEvent) => {
        if(!this.state.dragProps.dragging || !this.state.dragProps.draggableElement) {
            this._stopTaskDragging();
            return;
        }

        if(!this._boardElementRef) {
            return;
        }

        const parentElement = this._boardElementRef.current! as HTMLElement;
        const parentRect = parentElement.getBoundingClientRect();
        const element = this.state.dragProps.draggableElement!;

        element.style.left = this._getNewElementX(event.x, parentRect) +'px';
        element.style.top = this._getNewElementY(event.y, parentRect) +'px';
    }

    _getNewElementX = (mouseX: number, parentRect: DOMRect) : number => {
        const newElementLeft = mouseX - parentRect.left - this.state.dragProps.dragOffsetInsideTaskElementLeft;
    
        if(newElementLeft < this.state.dragProps.minTaskElementRelativeLeft) {
          return this.state.dragProps.minTaskElementRelativeLeft;
        }
        
        if(newElementLeft > this.state.dragProps.maxTaskElementRelativeLeft) {
          return this.state.dragProps.maxTaskElementRelativeLeft;
        }
        
        return newElementLeft;
    }
      
    _getNewElementY = (mouseY: number, parentRect: DOMRect): number => {
        const newElementTop = mouseY - parentRect.top - this.state.dragProps.dragOffsetInsideTaskElementTop;
        
        if(newElementTop < this.state.dragProps.minTaskElementRelativeTop) {
          return this.state.dragProps.minTaskElementRelativeTop;
        }
        
        if(newElementTop > this.state.dragProps.maxTaskElementRelativeTop) {
          return this.state.dragProps.maxTaskElementRelativeTop;
        }
        
        return newElementTop;
    }

    _stopTaskDragging = () => {
        const element = this.state.dragProps.draggableElement;

        if(element) {
            element.style.width = '';
            element.style.left = '';
            element.style.top = '';
        }

        this.setState({ dragProps: { ...defaultDragProps } });
        document.removeEventListener("mousemove", this._updateTaskPosition);
    }

    _onTaskMouseUp = () => {
        this._stopTaskDragging();
    }

    _isTaskDragging = (taskId: string): boolean => {
        const { dragProps } = this.state;
        return dragProps.dragging && dragProps.draggableTaskId === taskId;
    }

    _renderTasks = (statusId: TaskStatus) => {
        const tasks = this.props.tasks.entities;

        return tasks
            .filter(task => task.statusId === statusId)
            .map((task, _, __, dragging = this._isTaskDragging(task.id)) => 
                [
                    <Task 
                        key={task.id} 
                        task={task} 
                        dragging={dragging}
                        onMouseDown={this._onTaskMouseDown} 
                        onMouseUp={this._onTaskMouseUp}
                    />,
                    dragging ? 
                        this._renderTaskPlaceholder() : 
                        null
                ]
            );
    }

    _renderTaskPlaceholder = () => {
        return (
            <div
                key="task-placeholder" 
                className="task-placeholder"
                style={{
                    height: `${this.state.dragProps.draggableElement?.clientHeight}px`
                }}
            />
        );
    }

    render() {
        const { t } = this.props;

        return (
            <table className="board">
                <thead>
                    <tr>
                        {
                            TaskStatusIds.map(statusId => (
                                <th key={statusId}>
                                    <div className="board__header-content">
                                        {t(TaskStatusNameKeyMap[statusId])}
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody ref={this._boardElementRef}>
                    <tr>
                        {
                            TaskStatusIds.map(statusId => (
                                <td key={statusId}>
                                    <div className="board__column-content">
                                        { this._renderTasks(statusId) }
                                    </div>
                                </td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state: RootState): TasksProps => ({
    tasks: state.tasks
});

const mapDispatchToProps = (dispatch: AppDispatch): TaskActionsProps => ({ 
    loadAllTasks,
    dispatch
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withTranslation('common')(connector(Board));