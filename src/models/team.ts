import { getUuidv4 } from '../utils/utils';

export interface Team {
    id: string;
    name: string;
}

export const DefaultTeam: Team = {
    id: getUuidv4(),
    name: ''
};