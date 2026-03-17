"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickStepGenerator = void 0;
const StepGenerator_1 = require("./StepGenerator");
class ClickStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'ClickStep';
        this.stepsModel = props.stepsModel;
        this.board = props.board;
    }
    *tick() {
        const clickCell = this.stepsModel.getClickCell();
        if (!clickCell) {
            return;
        }
        if (!this.board.isClickCellValid(clickCell)) {
            this.stepsModel.clearClickCell();
        }
    }
    isSettled() {
        return true;
    }
}
exports.ClickStepGenerator = ClickStepGenerator;
//# sourceMappingURL=ClickStepGenerator.js.map