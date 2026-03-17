"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GravityStepGenerator = void 0;
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../Utils/CellsOffsets");
const StepGenerator_1 = require("./StepGenerator");
class GravityStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'GravityStep';
        this.gravitySettleLocksRemovalQueue = [];
        this.stepsModel = props.stepsModel;
        this.board = props.board;
        this.config = props.config;
        this.getGravityCellsSwapsCollector = props.getGravityCellsSwapsCollector;
    }
    *tick() {
        while (true) {
            const unlockedCells = this.removeGravitySettleLocks();
            if (unlockedCells && unlockedCells.length > 0) {
                this.stepsModel.addRegularMatchCheckCells(unlockedCells);
            }
            const previousMovingCells = this.getGravityMovingCellsByThisGenerator();
            this.resetGravityMovingCellsByThisGenerator();
            const gravityCheckCells = this.stepsModel.getGravityCheckCells();
            const potentialGravityCells = this.getPotentialGravityCellsAboveEmpty(gravityCheckCells);
            this.stepsModel.addGravityCheckCells(potentialGravityCells);
            const gravityCheckCellsCombined = [...gravityCheckCells, ...potentialGravityCells];
            const blastMatchCheckCells = this.stepsModel.getBlastMatchCheckCells();
            const gravityCheckCellsFiltered = gravityCheckCellsCombined.filter((cell) => {
                const temporarilyLocked = this.board.locker.hasSomeLockReason(cell, ['Blast', 'Swap', 'Merge', 'ClearCell']);
                if (temporarilyLocked) {
                    this.board.abruptMoveGemToCellByGravity(cell);
                }
                return !temporarilyLocked;
            });
            this.stepsModel.removeGravityCheckCells(gravityCheckCellsFiltered);
            const gravityCellsSwapsCollector = this.getGravityCellsSwapsCollector(this.board);
            const gravityCellsSwaps = gravityCellsSwapsCollector.collect(this.board, gravityCheckCellsFiltered);
            const currentMovingCells = [];
            gravityCellsSwaps.forEach((cellsSwaps) => {
                const [cellA, cellB] = cellsSwaps;
                if (this.board.isGravityMovingCell(cellA) ||
                    this.board.isGravityMovingCellByOtherGenerators(cellB, this.generatorId) ||
                    // just kicked cell can be potentially a blast gem, which will not be exploded in place if we move it by gravity
                    // so we skip one gravity step for such cells
                    blastMatchCheckCells.some((blastCell) => (0, CellsHelpers_1.isCellsEqual)(cellA, blastCell))) {
                    return;
                }
                const moved = this.board.moveGemToCellByGravity(cellA, cellB);
                if (!moved)
                    return;
                this.setGravityMovingCell(cellA);
                this.setGravityMovingCell(cellB);
                currentMovingCells.push(cellA);
                currentMovingCells.push(cellB);
                this.stepsModel.addGravityCheckCells(cellB);
                this.stepsModel.addSpawnerCheckCells(cellA); // if cell became empty, we queuing it for the spawn step check
            });
            previousMovingCells.forEach((previousCell) => {
                const settled = !currentMovingCells.some((currentCell) => {
                    return (0, CellsHelpers_1.isCellsEqual)(previousCell, currentCell);
                });
                if (settled) {
                    this.board.locker.addLock(previousCell, this.createCellLock('GravitySettle'));
                    this.gravitySettleLocksRemovalQueue.push({ counter: 0, cell: previousCell });
                }
            });
            yield { kind: 'stepEnd' };
        }
    }
    setGravityMovingCell(cell) {
        this.board.locker.addLock(cell, this.createCellLock('GravityMove'));
    }
    resetGravityMovingCellsByThisGenerator() {
        this.getGravityMovingCellsByThisGenerator().forEach((cell) => {
            this.board.locker.removeLock(cell, this.createCellLock('GravityMove'));
        });
    }
    removeGravitySettleLocks() {
        if (!this.gravitySettleLocksRemovalQueue.length)
            return null;
        const unlockedCells = [];
        for (let i = this.gravitySettleLocksRemovalQueue.length - 1; i >= 0; i--) {
            const data = this.gravitySettleLocksRemovalQueue[i];
            data.counter++;
            if (data.counter >= this.config.gravityCellSettleTicks) {
                this.board.locker.removeLock(data.cell, this.createCellLock('GravitySettle'));
                this.gravitySettleLocksRemovalQueue.splice(i, 1);
                unlockedCells.push(data.cell);
            }
        }
        return unlockedCells;
    }
    getGravityMovingCellsByThisGenerator() {
        return this.board.locker.getCellsWithLock(this.createCellLock('GravityMove'));
    }
    createCellLock(reason) {
        return { generatorId: this.generatorId, reason };
    }
    getPotentialGravityCellsAboveEmpty(gravityCells) {
        const potentialGravityCells = this.board.createCellsKeeper();
        gravityCells.forEach((cell) => {
            if (!(this.board.isEmptyCell(cell) || this.board.isTunnel(cell)))
                return;
            (0, CellsOffsets_1.getAdjacentCells)(cell, ['topLeft', 'top', 'topRight']).forEach((offsetCell) => {
                if (this.board.getGem(offsetCell)) {
                    potentialGravityCells.add(offsetCell);
                }
            });
        });
        return potentialGravityCells.getCells();
    }
    isSettled() {
        return this.stepsModel.getGravityCheckCellsCount() === 0 && this.gravitySettleLocksRemovalQueue.length === 0;
    }
}
exports.GravityStepGenerator = GravityStepGenerator;
//# sourceMappingURL=GravityStepGenerator.js.map