import { UnknownAction } from 'redux';
import { LOAD_ALL_TEAMS } from './teamActionTypes';

export const loadAllTeams = () => {
    return {
        type: LOAD_ALL_TEAMS
    } as UnknownAction;
};