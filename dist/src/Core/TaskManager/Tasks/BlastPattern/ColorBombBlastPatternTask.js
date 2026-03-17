"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombBlastPatternTask = void 0;
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const Task_1 = require("../Task");
class ColorBombBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'colorBombBlastPattern';
    }
    *handleTask() {
        const { blastGem, targetCells } = this.taskData;
        const sourceHitGem = structuredClone(blastGem);
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
        yield* this.waitTicks(durationTicks);
        targetCellsShuffled.forEach((targetCell) => {
            const kickedGem = this.getGem(targetCell);
            this.kickCell(targetCell);
            (0, CellsOffsets_1.getAdjacentCells)(targetCell, ['top', 'bottom', 'left', 'right']).forEach((cell) => {
                this.hitCell(cell, kickedGem || sourceHitGem);
            });
        });
        blastUnlock.unlock();
    }
}
exports.ColorBombBlastPatternTask = ColorBombBlastPatternTask;
//# sourceMappingURL=ColorBombBlastPatternTask.js.map