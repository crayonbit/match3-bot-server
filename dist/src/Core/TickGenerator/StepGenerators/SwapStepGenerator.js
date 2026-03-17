"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapStepGenerator = void 0;
const StepGenerator_1 = require("./StepGenerator");
class SwapStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'SwapStep';
        this.stepsModel = props.stepsModel;
        this.board = props.board;
    }
    *tick() {
        const swapCells = this.stepsModel.getSwapCells();
        if (!this.board.isSwapCellsValid(swapCells)) {
            this.stepsModel.clearSwapCells();
            return;
        }
        const [cellA, cellB] = swapCells;
        const swapped = this.board.swapGems(cellA, cellB);
        if (swapped) {
            this.addLocks(swapCells);
        }
        else {
            this.stepsModel.clearSwapCells();
        }
    }
    addLocks(cells) {
        const lock = { generatorId: this.generatorId, reason: 'Swap' };
        cells.forEach((cell) => {
            this.board.locker.addLock(cell, lock);
        });
    }
    isSettled() {
        return true;
    }
}
exports.SwapStepGenerator = SwapStepGenerator;
//# sourceMappingURL=SwapStepGenerator.js.map