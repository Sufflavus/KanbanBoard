import { BaseAction, LOAD_ALL_TEAMS } from '../actions';
import { teamInitialState } from './state';

const teamReducer = (state = teamInitialState, action: BaseAction) => {
    switch (action.type) {
        case LOAD_ALL_TEAMS:
            return {
                ...state,
                teams: [] // TODO
            };
    }

    return state;
};

export default teamReducer;