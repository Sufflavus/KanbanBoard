import { getUuidv4 } from '../utils/utils';

export class User {
    id: string;
    firstName: string;
    lastName: string;
   
    constructor(firstName?: string, lastName?: string) {
        this.id = getUuidv4();
        this.firstName = firstName || '';
        this.lastName = lastName || '';
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    getInitials(): string {
        const letter1 = this.firstName.length > 0 ? this.firstName[0] : '';
        const letter2 = this.lastName.length > 0 ? this.lastName[0] : '';
        return `${letter1}${letter2}`;
    }
}