import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from '../../actions';
import { TaskState } from '../../reducers/state';
import { EntityStatus, TaskStatusIds, TaskStatusNameKeyMap } from '../../models';
import { Task } from '../../components';
import './Board.less';

const Board = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("common");

    const tasks = useSelector(state => ((state as any).tasks as TaskState)).entities;
    const tasksStatus = useSelector(state => ((state as any).tasks as TaskState)).status;

    //useSelector(state => { console.log(state); })

    useEffect(() => {
        if(tasksStatus === EntityStatus.Init) {
            loadAllTasks(dispatch);
        }
    }, [tasksStatus]);

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
            <tbody>
                <tr>
                    {
                        TaskStatusIds.map(statusId => (
                            <td key={statusId}>
                                <div className="board__column-content">
                                    {
                                        tasks
                                            .filter(task => task.statusId === statusId)
                                            .map(task => <Task key={task.id} task={task}/>)
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