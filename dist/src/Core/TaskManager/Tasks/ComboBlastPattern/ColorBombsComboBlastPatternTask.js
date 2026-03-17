"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombsComboBlastPatternTask = void 0;
const Task_1 = require("../Task");
class ColorBombsComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'colorBombsComboBlastPattern';
    }
    *handleTask() {
        const { blastGem, gems: swapGems, targetCells, id: matchId } = this.taskData;
        const [sourceGem] = swapGems;
        this.removeGem(sourceGem);
        const lockCells = [{ col: blastGem.col, row: blastGem.row }, ...targetCells];
        const blastUnlock = this.lockCells(lockCells, 'Blast');
        const ticksToWait = this.config.colorBombComboBlastTicks;
        const duration = ticksToWait * this.config.tickDurationMs;
        this.blastGem({ ...this.taskData, duration });
        yield* this.waitTicks(ticksToWait);
        targetCells.forEach((targetCell) => {
            this.kickCell(targetCell);
        });
        yield* this.waitTicks(1);
        blastUnlock.unlock();
    }
}
exports.ColorBombsComboBlastPatternTask = ColorBombsComboBlastPatternTask;
//# sourceMappingURL=ColorBombsComboBlastPatternTask.js.map