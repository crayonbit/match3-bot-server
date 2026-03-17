"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UltimateCellsCheckStepGenerator = void 0;
const StepGenerator_1 = require("./StepGenerator");
/**
 * Performs one time cells to check addition, as soon as all previous steps and other generators are settled.
 */
class UltimateCellsCheckStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'UltimateCellsCheckStep';
        this.checkPerformed = false;
        this.stepsModel = props.stepsModel;
        this.board = props.board;
    }
    *tick() {
        while (true) {
            if (!this.checkPerformed && this.isPreviousStepsSettled()) {
                if (!this.isOtherGeneratorsRunning(this.generatorId)) {
                    const notEmptyBoardCells = [];
                    this.board.grid.loop((value, cell) => {
                        notEmptyBoardCells.push(cell);
                        return false;
                    }, true);
                    this.stepsModel.addRegularMatchCheckCells(notEmptyBoardCells);
                    this.stepsModel.addGravityCheckCells(notEmptyBoardCells);
                    this.stepsModel.addSpawnerCheckCells(notEmptyBoardCells);
                }
                this.checkPerformed = true;
            }
            yield { kind: 'stepEnd' };
        }
    }
    isSettled() {
        return this.checkPerformed;
    }
}
exports.UltimateCellsCheckStepGenerator = UltimateCellsCheckStepGenerator;
//# sourceMappingURL=UltimateCellsCheckStepGenerator.js.map