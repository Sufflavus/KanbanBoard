import { LoadAllUsersAction, LOAD_ALL_USERS } from '../actions';
import { userInitialState } from './state';

const userReducer = (state = userInitialState, action: LoadAllUsersAction) => {
    switch (action.type) {
        case LOAD_ALL_USERS:
            return {
                ...state,
                status: action.status,
                entities: (action as LoadAllUsersAction).result || state.entities
            };
    }

    return state;
};

export default userReducer;