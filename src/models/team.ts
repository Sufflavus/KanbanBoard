import { getUuidv4 } from '../utils/utils';

export class Team {
    id: string;
    name: string;
   
    constructor(name?: string) {
        this.id = getUuidv4();
        this.name = name || '';
    }
}