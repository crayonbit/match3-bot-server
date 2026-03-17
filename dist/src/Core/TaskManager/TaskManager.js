"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
class TaskManager {
    constructor(props) {
        this.taskIterators = [];
        this.tasksFactory = props.tasksFactory;
    }
    createTasksForMatches(matches) {
        const tasksReturn = [];
        matches.forEach((match) => {
            const task = this.tasksFactory.createTask(match.patternName, match);
            this.startTask(task);
            tasksReturn.push({ match, tasks: [task] });
        });
        return tasksReturn;
    }
    createTask(taskName, taskData) {
        const task = this.tasksFactory.createTask(taskName, taskData);
        this.startTask(task);
        return task;
    }
    startTask(task) {
        this.taskIterators.push(task.execute());
    }
    tickTasks() {
        if (!this.taskIterators.length)
            return;
        for (let i = 0; i < this.taskIterators.length; i++) {
            const taskIterator = this.taskIterators[i];
            const { value, done } = taskIterator.next();
            if (done) {
                this.taskIterators.splice(i, 1);
                i--;
            }
        }
    }
    getCurrentTasksCount() {
        return this.taskIterators.length;
    }
}
exports.TaskManager = TaskManager;
//# sourceMappingURL=TaskManager.js.map