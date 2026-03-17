"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnStepGenerator = void 0;
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const StepGenerator_1 = require("./StepGenerator");
class SpawnStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'SpawnStep';
        this.stepSpawnedCells = [];
        this.stepsModel = props.stepsModel;
        this.board = props.board;
    }
    *tick() {
        while (true) {
            let spawnerCells = this.stepsModel.getSpawnerCheckCells();
            spawnerCells = (0, CellsHelpers_1.sortCellsByColsAndRows)(spawnerCells);
            const invalidCells = [];
            this.stepSpawnedCells = [];
            spawnerCells.forEach((cell) => {
                if (!this.board.isSpawnerCell(cell) || !this.board.isEmptyCell(cell)) {
                    invalidCells.push(cell);
                    return;
                }
                if (this.board.locker.hasSomeLockReason(cell, ['Blast', 'Swap', 'Merge', 'ClearCell'])) {
                    // These cells will be checked again in the next tick
                    return;
                }
                const spawned = this.board.spawnGem(cell);
                if (!spawned)
                    return;
                this.stepSpawnedCells.push(cell);
                this.setGravityMovingCell(cell);
            });
            this.stepsModel.addGravityCheckCells(this.stepSpawnedCells);
            this.stepsModel.addRegularMatchCheckCells(this.stepSpawnedCells);
            this.stepsModel.removeSpawnerCheckCells([...invalidCells, ...this.stepSpawnedCells]);
            yield { kind: 'stepEnd' };
        }
    }
    setGravityMovingCell(cell) {
        this.board.locker.addLock(cell, { generatorId: this.generatorId, reason: 'GravityMove' });
    }
    isSettled() {
        return this.stepSpawnedCells.length === 0;
    }
}
exports.SpawnStepGenerator = SpawnStepGenerator;
//# sourceMappingURL=SpawnStepGenerator.js.map