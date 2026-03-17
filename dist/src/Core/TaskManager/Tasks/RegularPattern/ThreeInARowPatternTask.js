"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeInARowPatternTask = void 0;
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const Task_1 = require("../Task");
class ThreeInARowPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'threeInARowPattern';
    }
    *handleTask() {
        const { gems } = this.taskData;
        gems.forEach((gem) => {
            this.kickCell({ col: gem.col, row: gem.row });
        });
        gems.forEach((gem) => {
            (0, CellsOffsets_1.getAdjacentCells)(gem, ['top', 'right', 'bottom', 'left']).forEach((offsetCell) => {
                this.hitCell(offsetCell, { ...gem });
            });
        });
    }
}
exports.ThreeInARowPatternTask = ThreeInARowPatternTask;
//# sourceMappingURL=ThreeInARowPatternTask.js.map