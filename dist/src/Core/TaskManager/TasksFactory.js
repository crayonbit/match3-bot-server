"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksFactory = void 0;
class TasksFactory {
    constructor(props) {
        this.props = props;
        this.tasksMap = props.tasksMap;
    }
    createTask(taskName, taskData) {
        return new this.tasksMap[taskName]().init({ taskData, ...this.props });
    }
}
exports.TasksFactory = TasksFactory;
//# sourceMappingURL=TasksFactory.js.map