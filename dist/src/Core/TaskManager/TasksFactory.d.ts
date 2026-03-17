import type { ITask, ITasksFactory, TaskFactoryProps, TaskName, TaskNameToTaskData } from './TaskManagerTypes';
export declare class TasksFactory implements ITasksFactory {
    private props;
    private readonly tasksMap;
    constructor(props: TaskFactoryProps);
    createTask<T extends TaskName>(taskName: T, taskData: TaskNameToTaskData[T]): ITask<T>;
}
