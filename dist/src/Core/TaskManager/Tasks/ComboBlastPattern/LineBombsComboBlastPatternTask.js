"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBombsComboBlastPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class LineBombsComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'lineBombsComboBlastPattern';
    }
    *handleTask() {
        const { blastGem, targetCells, gems: swapGems } = this.taskData;
        const [sourceGem] = swapGems;
        this.removeGem(sourceGem);
        const blastUnlock = this.lockCells(targetCells, 'Blast');
        this.replaceCore({ cell: blastGem, className: BoardTypes_1.GemCoreName.CrossBomb, reason: 'Replace' });
        this.kickCell(blastGem);
        const suspenseTicksToWait = this.config.lineBombBlastSuspenseTicks;
        const suspenseDuration = suspenseTicksToWait * this.config.tickDurationMs;
        const ticksToWait = this.config.lineBombBlastCellTicks;
        const duration = ticksToWait * this.config.tickDurationMs;
        this.triggerBlastGemAnimation({ ...this.taskData, suspenseDuration, duration });
        yield* this.waitTicks(1);
        blastUnlock.unlock();
    }
}
exports.LineBombsComboBlastPatternTask = LineBombsComboBlastPatternTask;
//# sourceMappingURL=LineBombsComboBlastPatternTask.js.map