import { EntityStatus, ITask, Team, User } from '../models';

export interface TaskState {
    status: EntityStatus;
    entities: ITask[];
}

export interface UserState {
    status: EntityStatus;
    entities: User[];
}

export interface TeamState {
    status: EntityStatus;
    entities: Team[];
}

export interface BoardState {
    tasks: TaskState;
    users: UserState;
    teams: TeamState;
}

export const taskInitialState: TaskState = {
    status: EntityStatus.Init,
    entities: []
};

export const userInitialState: UserState = {
    status: EntityStatus.Init,
    entities: []
};

export const teamInitialState: TeamState = {
    status: EntityStatus.Init,
    entities: []
};

/*export const boardInitialState: BoardState = {
    tasks: {
        status: EntityStatus.Init,
        entities: []
    },
    users: {
        status: EntityStatus.Init,
        entities: []
    },
    teams: {
        status: EntityStatus.Init,
        entities: []
    }
}*/