"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBombBigBombComboBlastPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Task_1 = require("../Task");
/**
 * Swap animation is moving source gem view to the target cell
 * then the task is replacing source gem core with the LineBomb core and moves the source gem view to the original position
 */
class LineBombBigBombComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'lineBombBigBombComboBlastPattern';
    }
    *handleTask() {
        const { blastGem, gems: swapGems, targetCells } = this.taskData;
        const [sourceGem] = swapGems;
        this.removeGem(sourceGem);
        const lockCells = [blastGem, ...targetCells];
        const blastUnlock = this.lockCells(lockCells, 'Blast');
        targetCells.forEach((cell) => {
            const orientation = (0, CellsHelpers_1.getOrientationByCells)(blastGem, cell) ?? 'horizontal';
            const orientationFlipped = orientation === 'horizontal' ? 'vertical' : 'horizontal';
            this.createBlastLayerGem({
                cell,
                className: BoardTypes_1.GemCoreName.LineBomb,
                orientation: orientationFlipped,
                reason: 'Replace',
            });
            this.triggerBlast(cell);
        });
        const suspenseTicksToWait = this.config.lineBombBlastSuspenseTicks;
        const suspenseDuration = suspenseTicksToWait * this.config.tickDurationMs;
        const ticksToWait = this.config.lineBombBlastCellTicks;
        const duration = ticksToWait * this.config.tickDurationMs;
        // CrossBomb gem will kick just created LineBombs around
        this.replaceCore({ cell: blastGem, className: BoardTypes_1.GemCoreName.CrossBomb, reason: 'Replace' });
        this.triggerBlastGemAnimation({ ...this.taskData, suspenseDuration, duration });
        this.triggerBlast(blastGem);
        yield* this.waitTicks(1);
        blastUnlock.unlock();
    }
}
exports.LineBombBigBombComboBlastPatternTask = LineBombBigBombComboBlastPatternTask;
//# sourceMappingURL=LineBombBigBombComboBlastPatternTask.js.map