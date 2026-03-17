import type { Match } from '../Matcher/MatcherTypes';
import type { CreateTasksReturn, ITask, ITaskManager, TaskManagerProps, TaskName, TaskNameToTaskData } from './TaskManagerTypes';
export declare class TaskManager implements ITaskManager {
    private readonly tasksFactory;
    private taskIterators;
    constructor(props: TaskManagerProps);
    createTasksForMatches(matches: Match[]): CreateTasksReturn;
    createTask<T extends TaskName>(taskName: T, taskData: TaskNameToTaskData[T]): ITask<T>;
    private startTask;
    tickTasks(): void;
    getCurrentTasksCount(): number;
}
