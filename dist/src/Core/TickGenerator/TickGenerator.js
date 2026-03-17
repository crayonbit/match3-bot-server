"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickGenerator = void 0;
const AwaitStepIterators_1 = require("./AwaitStepIterators");
const TickGeneratorSignals_1 = require("./TickGeneratorSignals");
class TickGenerator {
    constructor(params) {
        this.generator = null;
        this.signals = new TickGeneratorSignals_1.TickGeneratorSignals();
        this.stepGenerators = params.stepGenerators;
        this.config = params.config;
        this.id = params.generatorId;
        this.stepGenerators.forEach((stepGenerator, i) => {
            const isPreviousStepsSettled = () => {
                return this.stepGenerators.slice(0, i).every((generator) => {
                    return generator.name === stepGenerator.name || generator.isSettled();
                });
            };
            stepGenerator.init({
                generatorId: this.id,
                isPreviousStepsSettled,
                isOtherGeneratorsRunning: params.isOtherGeneratorsRunning,
            });
        });
    }
    start() {
        this.generator = this.startGenerator();
    }
    *startGenerator() {
        this.signals.get('onGeneratorStart').dispatch(this.id);
        yield* (0, AwaitStepIterators_1.awaitStepIterators)({
            stepIterators: this.stepGenerators.map((stepGenerator) => stepGenerator.getStepIterator()),
            onTickStart: (tick) => this.signals.get('onTickStart').dispatch({ generatorId: this.id, tick }),
            onStepEnter: (stepName) => this.signals.get('onStepEnter').dispatch({ generatorId: this.id, stepName }),
            onStepExit: (stepName, settled) => {
                this.signals.get('onStepExit').dispatch({ generatorId: this.id, stepName, settled });
            },
            onTickEnd: (tick) => this.signals.get('onTickEnd').dispatch({ generatorId: this.id, tick }),
            settledCheckTicksInterval: this.config.gravityTicksInterval,
        });
        this.signals.get('onGeneratorComplete').dispatch(this.id);
    }
    tick() {
        if (!this.generator)
            return null;
        while (true) {
            const result = this.tickStep();
            if (!result)
                return null;
            const { value, done = false } = result;
            if (value?.kind === 'tickEnd' || done) {
                return { value, done };
            }
        }
    }
    tickStep() {
        if (!this.generator)
            return null;
        const { value, done = false } = this.generator.next();
        if (done) {
            this.generator = null;
        }
        return { value, done };
    }
    get done() {
        return !this.generator;
    }
    destroy() {
        this.signals.clear();
        this.generator = null;
    }
}
exports.TickGenerator = TickGenerator;
//# sourceMappingURL=TickGenerator.js.map