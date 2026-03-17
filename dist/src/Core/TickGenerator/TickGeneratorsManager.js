"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickGeneratorsManager = void 0;
const TickGeneratorSignals_1 = require("./TickGeneratorSignals");
const TickGeneratorsManagerSignals_1 = require("./TickGeneratorsManagerSignals");
const TickStepsSignals_1 = require("./TickStepsSignals");
class TickGeneratorsManager {
    constructor(props) {
        this.tickTime = 0;
        this.currentTick = 0;
        this.currentIdleTick = -1;
        this.generators = [];
        this.stepsMode = false;
        this.generatorsIdCounter = 0;
        this.prevDispatchedDebugTick = 0;
        this.idleStateObservers = [];
        this.rewindIdleMode = false;
        this.maxIdleRewindTicks = 1000;
        this.onGeneratorTickStart = (props) => {
            if (!this.stepsMode)
                return;
            if (this.prevDispatchedDebugTick === this.currentTick)
                return;
            this.prevDispatchedDebugTick = this.currentTick;
            this.dispatchTickStarted();
            this.incrementTick();
        };
        this.config = props.config;
        this.createTickGeneratorPlayer = props.createTickGeneratorPlayer;
        this.generatorsIdCounter = props.generatorsIdCounter || 0;
        this.generatorSignals = new TickGeneratorSignals_1.TickGeneratorSignals();
        this.tickStepsSignals = new TickStepsSignals_1.TickStepsSignals();
        this.signals = new TickGeneratorsManagerSignals_1.TickGeneratorsManagerSignals();
    }
    play(cellA, cellB) {
        const tickGenerator = this.launchNewGenerator();
        tickGenerator.play(cellA, cellB);
        return tickGenerator;
    }
    playBooster(cell, boosterType) {
        const tickGenerator = this.launchNewGenerator();
        tickGenerator.playBooster(cell, boosterType);
        return tickGenerator;
    }
    playPreBoosters(preBoosters) {
        const tickGenerator = this.launchNewGenerator();
        tickGenerator.playPreBoosters(preBoosters);
        return tickGenerator;
    }
    launchNewGenerator() {
        const tickGenerator = this.createTickGeneratorPlayer({
            generatorId: ++this.generatorsIdCounter,
            isOtherGeneratorsRunning: (excludedGeneratorId) => {
                return this.generators.some((generator) => generator.id !== excludedGeneratorId);
            },
        });
        tickGenerator.signals.pipe(this.generatorSignals);
        tickGenerator.tickStepsSignals.pipe(this.tickStepsSignals);
        tickGenerator.signals.get('onTickStart').add(this.onGeneratorTickStart);
        this.generators.push(tickGenerator);
        this.notifyIdleStateChanged(false);
        return tickGenerator;
    }
    addIdleStateObserver(observer) {
        this.idleStateObservers.push(observer);
        observer.onConnectedToIdleStateObservable(this.isIdle());
    }
    removeIdleStateObserver(observer) {
        const index = this.idleStateObservers.indexOf(observer);
        if (index !== -1) {
            this.idleStateObservers.splice(index, 1);
        }
    }
    setStepsMode(value) {
        this.stepsMode = value;
    }
    getStepsMode() {
        return this.stepsMode;
    }
    update(deltaTime) {
        if (this.stepsMode)
            return;
        this.tickTime += deltaTime;
        if (this.tickTime < this.config.tickDurationMs) {
            return;
        }
        const maxIterationsPerFrame = 5;
        const tickIterations = Math.min(Math.floor(this.tickTime / this.config.tickDurationMs), maxIterationsPerFrame);
        for (let i = 0; i < tickIterations; i++) {
            this.tick();
            this.tickTime -= this.config.tickDurationMs;
        }
    }
    handleRewindIdle() {
        let idleRewindTicks = 0;
        while (this.rewindIdleMode && this.isIdle() && !this.stepsMode && idleRewindTicks < this.maxIdleRewindTicks) {
            this.dispatchTickStarted();
            this.incrementTick();
            idleRewindTicks++;
        }
    }
    tick() {
        this.dispatchTickStarted();
        this.incrementTick();
        this.handleRewindIdle();
        for (let i = 0; i < this.generators.length; i++) {
            const generator = this.generators[i];
            const result = generator.tick();
            if (!result || result.done) {
                this.clearGenerator(i);
                this.tryDispatchIdleStarted();
                i--;
            }
        }
    }
    tickStep() {
        let tickFinished = false;
        for (let i = 0; i < this.generators.length; i++) {
            const generator = this.generators[i];
            const result = generator.tickStep();
            if (!result || result.done) {
                this.clearGenerator(i);
                this.tryDispatchIdleStarted();
                i--;
                tickFinished = true;
                continue;
            }
            const { value } = result;
            if (value?.kind === 'tickEnd') {
                tickFinished = true;
            }
        }
    }
    dispatchTickStarted() {
        this.signals.get('onTickStarted').dispatch({
            tick: this.currentTick,
            idleTick: this.currentIdleTick,
        });
    }
    incrementTick() {
        this.currentTick++;
        if (this.isIdle()) {
            this.currentIdleTick++;
        }
        else {
            this.currentIdleTick = -1;
        }
    }
    clearGenerator(index) {
        const tickGenerator = this.generators[index];
        tickGenerator.signals.unPipe(this.generatorSignals);
        tickGenerator.tickStepsSignals.unPipe(this.tickStepsSignals);
        tickGenerator.signals.get('onTickStart').remove(this.onGeneratorTickStart);
        tickGenerator.destroy();
        this.generators.splice(index, 1);
    }
    tryDispatchIdleStarted() {
        if (this.generators.length === 0) {
            this.notifyIdleStateChanged(true);
        }
    }
    notifyIdleStateChanged(isIdle) {
        this.signals.get('onIdleStateChanged').dispatch(isIdle);
        this.idleStateObservers.forEach((observer) => observer.onGameIdleStateChanged(isIdle));
    }
    isIdle() {
        return this.generators.length === 0;
    }
    /**
     * This mode is for rewinding the game when it's idle during the replay, so we don't wait for the replay action input.
     */
    setRewindIdleMode(value) {
        this.rewindIdleMode = value;
    }
    getCurrentTick() {
        return this.currentTick;
    }
    getCurrentGeneratorsIdCounter() {
        return this.generatorsIdCounter;
    }
    destroy() {
        this.generatorSignals.clear();
        this.tickStepsSignals.clear();
        this.signals.clear();
        this.generators.forEach((generator) => generator.destroy());
        this.generators.length = 0;
        this.idleStateObservers.length = 0;
    }
}
exports.TickGeneratorsManager = TickGeneratorsManager;
//# sourceMappingURL=TickGeneratorsManager.js.map