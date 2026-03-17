"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickCellBoosterTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class KickCellBoosterTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'kickCellBooster';
    }
    *handleTask() {
        this.onBoosterUsed(BoardTypes_1.BoosterType.KickCell);
        const { cell } = this.taskData;
        const { kickCellBoosterDelayTicks } = this.config;
        if (kickCellBoosterDelayTicks > 0) {
            yield* this.waitTicks(kickCellBoosterDelayTicks);
        }
        this.kickCell(cell);
    }
}
exports.KickCellBoosterTask = KickCellBoosterTask;
//# sourceMappingURL=KickCellBoosterTask.js.map