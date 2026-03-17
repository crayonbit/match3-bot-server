"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapCulminateStepGenerator = void 0;
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const TickGeneratorUtils_1 = require("../TickGeneratorUtils");
const StepGenerator_1 = require("./StepGenerator");
class SwapCulminateStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'SwapCulminateStep';
        this.lockedCells = [];
        this.isComboGem = (gem) => {
            if (!gem)
                return false;
            return this.board.isComboGem(gem);
        };
        this.stepsModel = props.stepsModel;
        this.board = props.board;
        this.config = props.config;
        this.swapActionKindTicks = {
            normal: this.config.swapTicks,
            combo: this.config.swapComboTicks,
            wrong: this.config.swapWrongTicks,
        };
    }
    *tick() {
        const swapCells = this.stepsModel.getSwapCells();
        this.stepsModel.clearSwapCells();
        if (!swapCells.length) {
            return;
        }
        const gravityBlockedMatchesIds = this.stepsModel.getGravityBlockedMatchesIds();
        const matches = this.stepsModel.getMatches();
        const swapGems = this.getSwapGems(swapCells);
        if (!swapGems) {
            return;
        }
        const { gemA, gemB, swapped } = swapGems;
        const [cellA, cellB] = swapCells;
        let swapCulminationKind = 'normal';
        // gravityBlockedMatchesIds needed as there can be gravity falling column aside to the swap gems
        // and we need to wait until they settle to have the potentially better match
        if ((matches.length || gravityBlockedMatchesIds.length) && swapped) {
            const isComboSwap = [gemA, gemB].every(this.isComboGem);
            if (isComboSwap) {
                this.board.dispatchSwapGemsCombo(gemB, gemA);
                swapCulminationKind = 'combo';
            }
            else {
                this.board.dispatchSwapGems(gemA, gemB);
                swapCulminationKind = 'normal';
            }
            this.addLocks([
                ...swapCells,
                // Locking for now target cells for matches found by swap move
                ...matches.flatMap((match) => match.gems.map((gem) => ({ col: gem.col, row: gem.row }))),
            ]);
        }
        else {
            this.removeLocks(swapCells);
            this.board.swapGems(cellB, cellA);
            this.addLocks(swapCells);
            if (gemA) {
                this.board.dispatchSwapGemsWrong(gemA, cellB, gemB);
            }
            swapCulminationKind = 'wrong';
        }
        yield* (0, TickGeneratorUtils_1.waitTicks)(this.swapActionKindTicks[swapCulminationKind]);
        this.removeLocks(this.lockedCells);
        this.lockedCells.length = 0;
        this.stepsModel.addGravityCheckCells(swapCells);
        this.stepsModel.addSpawnerCheckCells(swapCells);
    }
    getSwapGems(swapCells) {
        let swapGemA = null;
        let swapGemB = null;
        let swapped = true;
        swapCells.forEach((cell, i) => {
            const gem = this.board.getGem(cell);
            if (!gem)
                return;
            if ((0, CellsHelpers_1.isCellsEqual)(gem, swapCells[1])) {
                swapGemA = gem;
            }
            else {
                swapGemB = gem;
                swapped = i === 0;
            }
        });
        if (!swapGemA && !swapGemB)
            return null;
        return { gemA: swapGemA, gemB: swapGemB ?? undefined, swapped };
    }
    addLocks(swapCells) {
        const lock = { generatorId: this.generatorId, reason: 'Swap' };
        swapCells.forEach((cell) => {
            this.lockedCells.push({ ...cell });
            this.board.locker.addLock({ ...cell }, lock);
        });
    }
    removeLocks(cells) {
        const lock = { generatorId: this.generatorId, reason: 'Swap' };
        cells.forEach((cell) => {
            this.board.locker.removeLock(cell, lock);
        });
    }
    isSettled() {
        return this.lockedCells.length === 0;
    }
}
exports.SwapCulminateStepGenerator = SwapCulminateStepGenerator;
//# sourceMappingURL=SwapCulminateStepGenerator.js.map