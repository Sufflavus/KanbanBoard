import { Dispatch, UnknownAction } from 'redux';
import { ADD_TASK, DELETE_TASK, LOAD_ALL_TASKS, UPDATE_TASK } from './taskActionTypes';
import { DefaultTask, EntityStatus, Task } from '../models';
import { BaseAction } from './commonActions';

export interface TaskAction extends BaseAction {
    payload: {
        task: Task;
    }
}

export interface LoadAllTasksAction extends BaseAction {
    result: Task[];
}

export const loadAllTasks = (dispatch: Dispatch<UnknownAction>) => {
    dispatch({
        type: LOAD_ALL_TASKS,
        status: EntityStatus.Succeeded,
        result: [{
            ...DefaultTask,
            title: 'Donec fermentum velit vel lectus lobortis condimentum.'
        }]
    } as LoadAllTasksAction);
};

export const addTask = (value: Task) => {
    return {
        type: ADD_TASK,
        payload: {
            task: value
        }
    } as TaskAction;
};

export const updateTask = (value: Task) => {
    return {
        type: UPDATE_TASK,
        payload: {
            task: value
        }
    } as TaskAction;
};

export const deleteTask = (value: Task) => {
    return {
        type: DELETE_TASK,
        payload: {
            task: value
        }
    } as TaskAction;
};