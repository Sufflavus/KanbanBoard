import { LoadAllTeamsAction, LOAD_ALL_TEAMS } from '../actions';
import { TeamState, teamInitialState } from './state';

const teamReducer = (state: TeamState = teamInitialState, action: LoadAllTeamsAction) => {
    switch (action.type) {
        case LOAD_ALL_TEAMS:
            return {
                ...state,
                status: action.status,
                entities: (action as LoadAllTeamsAction).result || state.entities
            };
    }

    return state;
};

export default teamReducer;