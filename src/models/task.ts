import { TaskStatus } from './taskStatus';
import { getUuidv4 } from '../utils/utils';

export interface Task {
    id: string;
    statusId: TaskStatus;
    index: number;
    title: string;
    userId?: string;
    teamId?: string;
    createDate: Date;
    dueDate?: Date;
}

export const DefaultTask: Task = {
    id: getUuidv4(),
    statusId: TaskStatus.ToDo,
    index: 0,
    title: '',
    createDate: new Date()
};