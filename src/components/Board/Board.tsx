import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from '../../actions';
import { TaskState } from '../../reducers/state';
import { EntityStatus, TaskStatusIds, TaskStatusNameKeyMap } from '../../models';
import { Task } from '../../components';
import './Board.less';

interface IDragProps {
    dragging: boolean;
    draggableTaskId: string;
    draggableTaskWidth: number;
    dragOffsetInsideTaskElementTop: number;
    dragOffsetInsideTaskElementLeft: number;
    draggableTaskElementRelativeTop: number;
    draggableTaskElementRelativeLeft: number;
    minTaskElementRelativeTop: number;
    minTaskElementRelativeLeft: number;
    maxTaskElementRelativeTop: number;
    maxTaskElementRelativeLeft: number;
}

const defaultDragProps: IDragProps = {
    dragging: false,
    draggableTaskId: '',
    draggableTaskWidth: 0,
    dragOffsetInsideTaskElementTop: 0,
    dragOffsetInsideTaskElementLeft: 0,
    draggableTaskElementRelativeTop: 0,
    draggableTaskElementRelativeLeft: 0,
    minTaskElementRelativeTop: 0,
    minTaskElementRelativeLeft: 0,
    maxTaskElementRelativeTop: 0,
    maxTaskElementRelativeLeft: 0
};

const Board = () => {
    const boardElementRef = useRef(null);

    const dispatch = useDispatch();
    const {t} = useTranslation("common");

    const tasks = useSelector(state => ((state as any).tasks as TaskState)).entities;
    const tasksStatus = useSelector(state => ((state as any).tasks as TaskState)).status;

    const [dragProps, setDragProps] = useState<IDragProps>(defaultDragProps);

    //useSelector(state => { console.log(state); })

    useEffect(() => {
        if(tasksStatus === EntityStatus.Init) {
            loadAllTasks(dispatch);
        }
    }, [tasksStatus]);

    const onTaskMouseDown = (event: React.MouseEvent<HTMLElement>, taskId: string, taskWidth: number, taskHeight: number) => {
        if(!boardElementRef) {
            return;
        }

        const parentElement = boardElementRef.current! as HTMLElement;
        const parentRect = parentElement.getBoundingClientRect();

        const taskElement = event.target as HTMLElement;
        const taskRect = taskElement.getBoundingClientRect();

        setDragProps({
            ...dragProps,
            dragging: true,
            draggableTaskId: taskId,
            draggableTaskWidth: taskWidth,
            dragOffsetInsideTaskElementTop: event.clientY - taskRect.top,
            dragOffsetInsideTaskElementLeft: event.clientX - taskRect.left,
            draggableTaskElementRelativeTop: taskRect.top - parentRect.top,
            draggableTaskElementRelativeLeft: taskRect.left - parentRect.left,
            minTaskElementRelativeTop: 0,
            minTaskElementRelativeLeft: 20,
            maxTaskElementRelativeTop: parentRect.height - taskHeight - 20,
            maxTaskElementRelativeLeft: parentRect.width - taskWidth - 20
        });

        document.addEventListener("mousemove", updateTaskPosition);
    }

    const updateTaskPosition = (event: MouseEvent) => {
        if(!dragProps.dragging) {
            stopTaskDragging();
            return;
        }

        if(!boardElementRef) {
            return;
        }

        const parentElement = boardElementRef.current! as HTMLElement;
        const parentRect = parentElement.getBoundingClientRect();
    
        setDragProps({
            ...dragProps,
            draggableTaskElementRelativeLeft: getNewElementX(event.x, parentRect),
            draggableTaskElementRelativeTop: getNewElementY(event.y, parentRect)
        });
    }

    const getNewElementX = (mouseX: number, parentRect: DOMRect) : number => {
        const newElementLeft = mouseX - parentRect.left - dragProps.dragOffsetInsideTaskElementLeft;
    
        if(newElementLeft < dragProps.minTaskElementRelativeLeft) {
          return dragProps.minTaskElementRelativeLeft;
        }
        
        if(newElementLeft > dragProps.maxTaskElementRelativeLeft) {
          return dragProps.maxTaskElementRelativeLeft;
        }
        
        return newElementLeft;
    }
      
    const getNewElementY = (mouseY: number, parentRect: DOMRect): number => {
        const newElementTop = mouseY - parentRect.top - dragProps.dragOffsetInsideTaskElementTop;
        
        if(newElementTop < dragProps.minTaskElementRelativeTop) {
          return dragProps.minTaskElementRelativeTop;
        }
        
        if(newElementTop > dragProps.maxTaskElementRelativeTop) {
          return dragProps.maxTaskElementRelativeTop;
        }
        
        return newElementTop;
    }

    const stopTaskDragging = () => {
        setDragProps(defaultDragProps);
        document.removeEventListener("mousemove", updateTaskPosition);
    }

    const onTaskMouseUp = () => {
        console.log("onTaskMouseUp")
        stopTaskDragging();
    }
    
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
            <tbody ref={boardElementRef}>
                <tr>
                    {
                        TaskStatusIds.map(statusId => (
                            <td key={statusId}>
                                <div className="board__column-content">
                                    {
                                        tasks
                                            .filter(task => task.statusId === statusId)
                                            .map((task, _, __, dragging = dragProps.dragging && dragProps.draggableTaskId === task.id) => 
                                                <Task 
                                                    key={task.id} 
                                                    task={task} 
                                                    dragging={dragging}
                                                    top={dragging ? dragProps.draggableTaskElementRelativeTop : undefined}
                                                    left={dragging ? dragProps.draggableTaskElementRelativeLeft : undefined}
                                                    width={dragging ? dragProps.draggableTaskWidth : undefined}
                                                    onMouseDown={onTaskMouseDown} 
                                                    onMouseUp={onTaskMouseUp}
                                                />
                                            )
                                    }
                                </div>
                            </td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
};

export default Board;