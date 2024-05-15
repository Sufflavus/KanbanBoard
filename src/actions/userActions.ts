import { Dispatch, UnknownAction } from 'redux';
import { LOAD_ALL_USERS } from './userActionTypes';
import { BaseAction } from './commonActions';
import { EntityStatus, User } from '../models';
import { FakeUsers } from './fakeData';

export interface LoadAllUsersAction extends BaseAction {
    result: User[];
}

export const loadAllUsers = (dispatch: Dispatch<UnknownAction>) => {
    dispatch({
        type: LOAD_ALL_USERS,
        status: EntityStatus.Succeeded,
        result: [...FakeUsers]
    } as LoadAllUsersAction);
};