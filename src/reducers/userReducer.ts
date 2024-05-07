import { BaseAction, LOAD_ALL_USERS } from '../actions';
import { userInitialState } from './state';

const userReducer = (state = userInitialState, action: BaseAction) => {
    switch (action.type) {
        case LOAD_ALL_USERS:
            return {
                ...state,
                users: [] // TODO
            };
    }

    return state;
};

export default userReducer;