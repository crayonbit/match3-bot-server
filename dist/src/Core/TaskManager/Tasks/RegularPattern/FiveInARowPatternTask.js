"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiveInARowPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const Task_1 = require("../Task");
class FiveInARowPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'fiveInARowPattern';
    }
    *handleTask() {
        const { gems, changingGem } = this.taskData;
        const sourceCells = [];
        for (const gem of gems) {
            if (gem.id === changingGem.id)
                continue;
            sourceCells.push({ col: gem.col, row: gem.row });
        }
        this.mergeCells(sourceCells, { col: changingGem.col, row: changingGem.row });
        gems.forEach((gem) => {
            (0, CellsOffsets_1.getAdjacentCells)(gem, ['top', 'right', 'bottom', 'left']).forEach((cell) => {
                this.hitCell(cell, { ...gem });
            });
        });
        this.changeGem({
            cell: { col: changingGem.col, row: changingGem.row },
            className: BoardTypes_1.GemCoreName.ColorBomb,
            reason: 'MergingCells',
        });
        const mergeLock = this.lockCells(gems, 'Merge');
        yield* this.waitTicks(this.config.mergeCellsTicks);
        mergeLock.unlock();
        yield* this.yieldGemBirthInvincibility(changingGem);
    }
}
exports.FiveInARowPatternTask = FiveInARowPatternTask;
//# sourceMappingURL=FiveInARowPatternTask.js.map