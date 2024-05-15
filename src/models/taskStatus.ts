export enum TaskStatus {
    ToDo = 1,
    InProgress = 2,
    Done = 3
}

export const TaskStatusNameKeyMap: {[key in TaskStatus]: string} = {
    [TaskStatus.ToDo]: 'task.status.to-do',
    [TaskStatus.InProgress]: 'task.status.in-progress',
    [TaskStatus.Done]: 'task.status.done'
};

export const TaskStatusIds: TaskStatus[] = Object.keys(TaskStatus)
    .map(key => +key)
    .filter(key => !!key)
    .map(key => key as TaskStatus);