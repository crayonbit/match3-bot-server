"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FourInARowPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const Task_1 = require("../Task");
class FourInARowPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'fourInARowPattern';
    }
    *handleTask() {
        const { gems, changingGem, orientation } = this.taskData;
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
            className: BoardTypes_1.GemCoreName.LineBomb,
            orientation,
            reason: 'MergingCells',
        });
        const mergeLock = this.lockCells(gems, 'Merge');
        yield* this.waitTicks(this.config.mergeCellsTicks);
        mergeLock.unlock();
        yield* this.yieldGemBirthInvincibility(changingGem);
    }
}
exports.FourInARowPatternTask = FourInARowPatternTask;
//# sourceMappingURL=FourInARowPatternTask.js.map