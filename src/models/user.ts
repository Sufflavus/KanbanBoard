import { getUuidv4 } from '../utils/utils';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export const DefaultUser: User = {
    id: getUuidv4(),
    firstName: '',
    lastName: ''
};