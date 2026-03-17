"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShuffleBoosterTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class ShuffleBoosterTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'shuffleBooster';
    }
    *handleTask() {
        this.onBoosterUsed(BoardTypes_1.BoosterType.Shuffle);
        const { shuffleBoosterDelayTicks } = this.config;
        if (shuffleBoosterDelayTicks > 0) {
            yield* this.waitTicks(shuffleBoosterDelayTicks);
        }
        yield* this.shuffleGems(10, 1000, 0);
        yield* this.waitTicks(this.config.shuffleTicks);
        const regularGemCells = this.getGemsByCoreName(BoardTypes_1.GemCoreName.Regular).map((gem) => {
            return { col: gem.col, row: gem.row };
        });
        this.stepsModel.addRegularMatchCheckCells(regularGemCells);
    }
}
exports.ShuffleBoosterTask = ShuffleBoosterTask;
//# sourceMappingURL=ShuffleBoosterTask.js.map