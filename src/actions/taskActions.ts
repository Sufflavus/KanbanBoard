import { Dispatch, UnknownAction } from 'redux';
import { ADD_TASK, DELETE_TASK, LOAD_ALL_TASKS, UPDATE_TASK } from './taskActionTypes';
import { EntityStatus, ITask } from '../models';
import { BaseAction } from './commonActions';
import { FakeTasks } from './fakeData';

export interface TaskAction extends BaseAction {
    payload: {
        task: ITask;
    }
}

export interface LoadAllTasksAction extends BaseAction {
    result: ITask[];
}

export interface TaskActionsProps {
    dispatch: Dispatch<UnknownAction>,
    loadAllTasks: (dispatch: Dispatch<UnknownAction>) => void
}

export const loadAllTasks = (dispatch: Dispatch<UnknownAction>): void => {
    dispatch({
        type: LOAD_ALL_TASKS,
        status: EntityStatus.Succeeded,
        result: [...FakeTasks]
    } as LoadAllTasksAction);
};

export const addTask = (value: ITask) => {
    return {
        type: ADD_TASK,
        payload: {
            task: value
        }
    } as TaskAction;
};

export const updateTask = (value: ITask) => {
    return {
        type: UPDATE_TASK,
        payload: {
            task: value
        }
    } as TaskAction;
};

export const deleteTask = (value: ITask) => {
    return {
        type: DELETE_TASK,
        payload: {
            task: value
        }
    } as TaskAction;
};