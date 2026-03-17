"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombBigBombComboBlastPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class ColorBombBigBombComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'colorBombBigBombComboBlastPattern';
    }
    *handleTask() {
        const { blastGem, gems: swapGems, targetCells } = this.taskData;
        const [sourceGem] = swapGems;
        this.removeGem(sourceGem);
        const lockCells = [{ col: blastGem.col, row: blastGem.row }, ...targetCells];
        const blastUnlock = this.lockCells(lockCells, 'Blast');
        const durationTicks = this.config.colorBombActivationTicks +
            this.config.colorBombRayDelayTicks * targetCells.length +
            this.config.colorBombRayTicks;
        const duration = durationTicks * this.config.tickDurationMs;
        const activationDuration = this.config.colorBombActivationTicks * this.config.tickDurationMs;
        const rayDuration = this.config.colorBombRayTicks * this.config.tickDurationMs;
        const rayDelay = this.config.colorBombRayDelayTicks * this.config.tickDurationMs;
        const targetCellsShuffled = targetCells.sort(() => this.getRandomInt(-1, 1));
        this.blastGem({
            ...this.taskData,
            targetCells: targetCellsShuffled,
            duration,
            activationDuration,
            rayDuration,
            rayDelay,
        });
        yield* this.waitTicks(this.config.colorBombActivationTicks);
        const iterators = targetCellsShuffled.map((targetCell, index) => {
            return this.replaceCoreWithDelay(targetCell, this.config.colorBombRayTicks + this.config.colorBombRayDelayTicks * index);
        });
        yield* this.waitIterators(iterators);
        targetCellsShuffled.forEach((targetCell) => this.kickCell(targetCell));
        blastUnlock.unlock();
    }
    *replaceCoreWithDelay(targetCell, ticksToWait) {
        yield* this.waitTicks(ticksToWait);
        this.replaceCore({ cell: targetCell, className: BoardTypes_1.GemCoreName.BigBomb, reason: 'Replace' });
    }
}
exports.ColorBombBigBombComboBlastPatternTask = ColorBombBigBombComboBlastPatternTask;
//# sourceMappingURL=ColorBombBigBombComboBlastPatternTask.js.map