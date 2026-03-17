"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShuffleStepGenerator = void 0;
const TickGeneratorUtils_1 = require("../TickGeneratorUtils");
const StepGenerator_1 = require("./StepGenerator");
class ShuffleStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'ShuffleStep';
        this.shuffling = false;
        this.shuffleFailed = false;
        this.board = props.board;
        this.config = props.config;
    }
    *tick() {
        while (true) {
            if (this.isPreviousStepsSettled() && !this.isOtherGeneratorsRunning(this.generatorId)) {
                const hasMoves = this.board.hasSomeMove();
                if (!hasMoves) {
                    this.shuffling = true;
                    yield* this.shuffleWithProxy();
                    if (!this.shuffleFailed) {
                        yield* (0, TickGeneratorUtils_1.waitTicks)(this.config.shuffleTicks);
                    }
                    this.shuffling = false;
                    this.shuffleFailed = false;
                }
            }
            yield { kind: 'stepEnd' };
        }
    }
    *shuffleWithProxy() {
        const shuffleGenerator = this.board.shuffleGems(10, 1000, 100);
        for (const yieldResult of shuffleGenerator) {
            if (yieldResult.kind === 'shuffleFailed') {
                this.shuffleFailed = true;
                break;
            }
            yield yieldResult;
        }
    }
    isSettled() {
        return this.isPreviousStepsSettled() && !this.shuffling;
    }
}
exports.ShuffleStepGenerator = ShuffleStepGenerator;
//# sourceMappingURL=ShuffleStepGenerator.js.map