"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigBombsComboBlastPatternTask = void 0;
const Task_1 = require("../Task");
const BigBombHelpers_1 = require("../TaskHelpers/BigBombHelpers");
class BigBombsComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'bigBombsComboBlastPattern';
    }
    *handleTask() {
        const { blastGem, targetCells, gems: swapGems } = this.taskData;
        const [sourceGem] = swapGems;
        this.removeGem(sourceGem);
        const lockCells = [{ col: blastGem.col, row: blastGem.row }, ...targetCells];
        const blastUnlock = this.lockCells(lockCells, 'Blast');
        const rippleDelaysMap = [
            [8, 7, 6, 5, 4, 5, 6, 7, 8],
            [7, 6, 5, 4, 3, 4, 5, 6, 7],
            [6, 5, 4, 3, 2, 3, 4, 5, 6],
            [5, 4, 3, 2, 1, 2, 3, 4, 5],
            [4, 3, 2, 1, 0, 1, 2, 3, 4],
            [5, 4, 3, 2, 1, 2, 3, 4, 5],
            [6, 5, 4, 3, 2, 3, 4, 5, 6],
            [7, 6, 5, 4, 3, 4, 5, 6, 7],
            [8, 7, 6, 5, 4, 5, 6, 7, 8],
        ];
        const suspenseTicksToWait = this.config.bigBombsComboBlastSuspenseTicks;
        const suspenseDuration = suspenseTicksToWait * this.config.tickDurationMs;
        const ticksToWait = this.config.bigBombBlastTicks;
        const rippleTicksToWait = this.config.bigBombBlastRippleTicks;
        const maxDelay = rippleDelaysMap[0][0];
        const rippleTicksDuration = rippleTicksToWait * maxDelay * this.config.tickDurationMs;
        const duration = ticksToWait * this.config.tickDurationMs;
        const explosionDuration = duration + rippleTicksDuration;
        this.blastGem({ ...this.taskData, suspenseDuration, duration: explosionDuration });
        yield* this.waitTicks(suspenseTicksToWait);
        const { minCol, minRow } = (0, BigBombHelpers_1.getMinColAndRow)(targetCells);
        const targetCellsGroupedByDelays = (0, BigBombHelpers_1.getTargetCellsGroupedByDelays)(targetCells, rippleDelaysMap, minCol, minRow);
        yield* (0, BigBombHelpers_1.processCellsGroupedByDelays)(targetCellsGroupedByDelays, rippleTicksToWait, this.kickCell.bind(this), this.waitTicks.bind(this));
        yield* this.waitTicks(ticksToWait);
        blastUnlock.unlock();
    }
}
exports.BigBombsComboBlastPatternTask = BigBombsComboBlastPatternTask;
//# sourceMappingURL=BigBombsComboBlastPatternTask.js.map