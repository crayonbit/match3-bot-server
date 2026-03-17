"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickGeneratorPlayer = void 0;
class TickGeneratorPlayer {
    constructor(props) {
        const { tickGenerator, stepsModel, stepsSignals } = props;
        this.tickGenerator = tickGenerator;
        this.stepsModel = stepsModel;
        this.stepsSignals = stepsSignals;
    }
    play(cellA, cellB) {
        if (cellB) {
            this.addSwapCellsToModel(cellA, cellB);
            this.stepsModel.setTickGeneratorStarter('swap');
        }
        else {
            this.addClickCellToModel(cellA);
            this.stepsModel.setTickGeneratorStarter('click');
        }
        this.tickGenerator.start();
    }
    playBooster(cell, boosterType) {
        this.stepsModel.addBoosterPlayData({ cell, boosterType });
        this.stepsModel.setTickGeneratorStarter('booster');
        this.tickGenerator.start();
    }
    playPreBoosters(preBoosters) {
        this.stepsModel.addPreBoostersPlayData({ preBoosters });
        this.stepsModel.setTickGeneratorStarter('preBooster');
        this.tickGenerator.start();
    }
    addSwapCellsToModel(cellA, cellB) {
        this.stepsModel.addSwapCells([cellA, cellB]);
    }
    addClickCellToModel(cell) {
        this.stepsModel.addClickCell(cell);
    }
    tick() {
        return this.tickGenerator.tick();
    }
    tickStep() {
        return this.tickGenerator.tickStep();
    }
    destroy() {
        this.tickGenerator.destroy();
    }
    get signals() {
        return this.tickGenerator.signals;
    }
    get tickStepsSignals() {
        return this.stepsSignals;
    }
    get id() {
        return this.tickGenerator.id;
    }
}
exports.TickGeneratorPlayer = TickGeneratorPlayer;
//# sourceMappingURL=TickGeneratorPlayer.js.map