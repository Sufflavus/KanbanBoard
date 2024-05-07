import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from '../../actions';
import { TaskState } from '../../reducers/state';
import { EntityStatus, TaskStatus, TaskStatusNameKeyMap } from '../../models';
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

    console.log(tasks);

    return (
        <table className="board">
            <thead>
                <tr>
                    <th>
                        <div className="board__header-content">
                            {t(TaskStatusNameKeyMap[TaskStatus.ToDo])}
                        </div>
                    </th>
                    <th>
                        <div className="board__header-content">
                            {t(TaskStatusNameKeyMap[TaskStatus.ToDo])}
                        </div>
                    </th>
                    <th>
                        <div className="board__header-content">
                            {t(TaskStatusNameKeyMap[TaskStatus.ToDo])}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className="board__column-content">
                            <Task/>
                        </div>
                    </td>
                    <td>
                        <div className="board__column-content">
                            Vestibulum a tellus
                        </div>      
                    </td>
                    <td>
                        <div className="board__column-content">
                            Etiam lobortis
                        </div>      
                    </td>  
                </tr>
            </tbody>
        </table>
    );
};

export default Board;