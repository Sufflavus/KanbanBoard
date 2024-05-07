import { LoadAllTasksAction, TaskAction, LOAD_ALL_TASKS } from '../actions';
import { TaskState, taskInitialState } from './state';

const taskReducer = (state: TaskState = taskInitialState, action: TaskAction | LoadAllTasksAction) => {
    switch (action.type) {
        case LOAD_ALL_TASKS:
            return {
                ...state,
                status: action.status,
                entities: (action as LoadAllTasksAction).result || state.entities
            };
    }

    return state;
};

export default taskReducer;