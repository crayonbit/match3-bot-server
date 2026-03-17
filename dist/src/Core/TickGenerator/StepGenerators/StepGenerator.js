"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepGenerator = void 0;
class StepGenerator {
    constructor(props) {
        this.executionTicksInterval = props.executionTicksInterval;
    }
    init(props) {
        const { generatorId, isPreviousStepsSettled, isOtherGeneratorsRunning } = props;
        this.generatorId = generatorId;
        this.isPreviousStepsSettled = isPreviousStepsSettled;
        this.isOtherGeneratorsRunning = isOtherGeneratorsRunning;
    }
    isTimeToTick(tick) {
        return tick % this.executionTicksInterval === 0;
    }
    createStepIterator(generator) {
        return {
            name: this.name,
            iterator: generator(),
            isTimeToTick: (tick) => this.isTimeToTick(tick),
            isSettled: () => this.isSettled(),
        };
    }
    getStepIterator() {
        return this.createStepIterator(this.tick.bind(this));
    }
}
exports.StepGenerator = StepGenerator;
//# sourceMappingURL=StepGenerator.js.map