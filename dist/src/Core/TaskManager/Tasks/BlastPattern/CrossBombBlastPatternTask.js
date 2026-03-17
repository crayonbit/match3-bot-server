"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossBombBlastPatternTask = void 0;
const Task_1 = require("../Task");
class CrossBombBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'crossBombBlastPattern';
    }
    *handleTask() {
        let i = 0;
        const { targetCells, targetCellsGroupsData } = this.taskData;
        const { targetCellsGroups, maxIndex } = targetCellsGroupsData;
        const lockCells = [...targetCells];
        const blastUnlock = this.lockCells(lockCells, 'Blast');
        const suspenseTicksToWait = this.config.lineBombBlastSuspenseTicks;
        const suspenseDuration = suspenseTicksToWait * this.config.tickDurationMs;
        const ticksToWait = this.config.lineBombBlastCellTicks;
        const duration = ticksToWait * this.config.tickDurationMs;
        this.blastGem({ ...this.taskData, suspenseDuration, duration });
        yield* this.waitTicks(suspenseTicksToWait);
        while (i < maxIndex) {
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            const currentCells = targetCellsGroups.map((cells) => cells[i]).filter(Boolean);
            currentCells.forEach((cell) => {
                this.kickCell(cell);
            });
            yield* this.waitTicks(ticksToWait);
            i++;
        }
        blastUnlock.unlock();
    }
}
exports.CrossBombBlastPatternTask = CrossBombBlastPatternTask;
//# sourceMappingURL=CrossBombBlastPatternTask.js.map