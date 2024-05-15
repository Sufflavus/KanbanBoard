import { Dispatch, UnknownAction } from 'redux';
import { LOAD_ALL_TEAMS } from './teamActionTypes';
import { BaseAction } from './commonActions';
import { EntityStatus, Team } from '../models';
import { FakeTeams } from './fakeData';

export interface LoadAllTeamsAction extends BaseAction {
    result: Team[];
}

export const loadAllTeams = (dispatch: Dispatch<UnknownAction>) => {
    dispatch({
        type: LOAD_ALL_TEAMS,
        status: EntityStatus.Succeeded,
        result: [...FakeTeams]
    } as LoadAllTeamsAction);
};