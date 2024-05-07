import {combineReducers} from 'redux';
import taskReducer from './taskReducer';
import userReducer from './userReducer';
import teamReducer from './teamReducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    users: userReducer,
    teams: teamReducer
});

export default rootReducer;