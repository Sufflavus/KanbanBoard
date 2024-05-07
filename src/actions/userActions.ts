import { UnknownAction } from 'redux';
import { LOAD_ALL_USERS } from './userActionTypes';

export const loadAllUsers = () => {
    return {
        type: LOAD_ALL_USERS
    } as UnknownAction;
};