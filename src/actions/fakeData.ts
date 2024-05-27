import { DefaultTask, Task, TaskStatus, Team, User } from '../models';
import { getUuidv4 } from '../utils/utils';

const team1 = new Team('Design');
const team2 = new Team('Development');
const team3 = new Team('Test');

const user1 = new User('John', 'Albaugh');
const user2 = new User('Lori', 'Towne');
const user3 = new User('Tatum', 'Reichel');
const user4 = new User('Robert', 'Becker');

const date1: Date = new Date();
date1.setDate(date1.getDate() - 3);

const date2: Date = new Date();
date2.setDate(date2.getDate() + 3);

const date3: Date = new Date();
date3.setDate(date3.getDate() + 7);

const date4: Date = new Date();
date4.setDate(date4.getDate() + 12);

const task1: Task = {
    ...DefaultTask,
    id: getUuidv4(),
    statusId: TaskStatus.Done,
    index: 0,
    title: 'Nulla vestibulum mauris at laoreet interdum',
    //userId: user1.id,
    //teamId: team1.id,
    //dueDate: date1
};

const task2: Task = {
    ...DefaultTask,
    id: getUuidv4(),
    statusId: TaskStatus.InProgress,
    index: 0,
    title: 'Vestibulum lacinia augue eget nisi convallis mattis',
    userId: user2.id,
    teamId: team2.id,
    dueDate: date2
};

const task3: Task = {
    ...DefaultTask,
    id: getUuidv4(),
    statusId: TaskStatus.InProgress,
    index: 1,
    title: 'Vivamus gravida purus vel cursus maximus',
    userId: user3.id,
    teamId: team2.id,
    dueDate: date3
};

const task4: Task = {
    ...DefaultTask,
    id: getUuidv4(),
    statusId: TaskStatus.ToDo,
    index: 0,
    title: 'Aenean varius quam vel mattis iaculis',
    userId: user4.id,
    teamId: team3.id,
    dueDate: date4
};

export const FakeTeams: Team[] = [team1, team2, team3];
export const FakeUsers: User[] = [user1, user2, user3, user4];
export const FakeTasks: Task[] = [task1, task2, task3, task4];