"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectQuestItemTask = void 0;
const Task_1 = require("./Task");
class CollectQuestItemTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'collectQuestItem';
    }
    *handleTask() {
        const { questItem, targets } = this.taskData;
        const iterators = targets.map((target) => this.collectQuestItem({ questItem, target, taskId: this.taskData.id }));
        yield* this.waitIterators(iterators);
    }
    *collectQuestItem(props) {
        const { questItem, target, taskId } = props;
        this.dispatchStartQuestItem({ questItem, target, durationTicks: target.durationTicks, taskId });
        yield* this.waitTicks(target.durationTicks);
        this.consumeQuestItem(questItem, target);
        if (this.isKilled(target)) {
            this.stepsModel.addGravityCheckCells(target.cells);
        }
    }
}
exports.CollectQuestItemTask = CollectQuestItemTask;
//# sourceMappingURL=CollectQuestItemTask.js.map