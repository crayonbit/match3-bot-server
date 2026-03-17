"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropGoalPatternTask = void 0;
const Task_1 = require("../Task");
class DropGoalPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'dropGoalPattern';
    }
    *handleTask() {
        const { gems } = this.taskData;
        gems.forEach((gem) => {
            this.kickCell(gem);
        });
    }
}
exports.DropGoalPatternTask = DropGoalPatternTask;
//# sourceMappingURL=DropGoalPatternTask.js.map