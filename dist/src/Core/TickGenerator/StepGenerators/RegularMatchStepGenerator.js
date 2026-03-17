"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegularMatchStepGenerator = void 0;
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../Utils/CellsOffsets");
const StepGenerator_1 = require("./StepGenerator");
class RegularMatchStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'RegularMatchStep';
        /**
         * Map of match hashes and count of ticks since the match was found
         */
        this.awaitingMatchesTicksMap = new Map();
        this.foundMatchesCellLocks = [];
        this.addedMatchesIds = new Set();
        this.stepsModel = props.stepsModel;
        this.board = props.board;
        this.signals = props.signals;
        this.config = props.config;
    }
    *tick() {
        while (true) {
            this.clearFoundMatchesCellLocks();
            this.clearAddedMatches();
            const swapGemsSearch = this.getMatchGems(this.stepsModel.getSwapCells());
            const regularMatchCheckCells = this.stepsModel.getRegularMatchCheckCells();
            const matchCheckGemsSearch = this.getMatchGems(this.stepsModel.getRegularMatchCheckCells());
            if (swapGemsSearch.matchCheckGems.length || matchCheckGemsSearch.matchCheckGems.length) {
                const { validMatches, gravityBlockedMatches, swapBlockedMatches, invalidCells, reCheckCells } = this.findValidMatches(matchCheckGemsSearch.matchCheckGems, swapGemsSearch.matchCheckGems);
                invalidCells.forEach((cell) => this.removeMatchCheckCell(cell));
                if (validMatches.length > 0) {
                    this.addMatches(validMatches);
                    this.signals.get('onMatchesFound').dispatch({ generatorId: this.generatorId, matches: validMatches });
                }
                gravityBlockedMatches.forEach((gravityBlockedMatch) => {
                    gravityBlockedMatch.gems.forEach((gem) => {
                        this.stepsModel.addRegularMatchCheckCells({ col: gem.col, row: gem.row });
                    });
                    this.incrementBlockedMatchTicks(gravityBlockedMatch.hash);
                    this.stepsModel.addGravityBlockedMatchesIds([gravityBlockedMatch.id]);
                });
                const foundMatches = [...validMatches, ...gravityBlockedMatches, ...swapBlockedMatches];
                this.addFoundMatchesCellLocks(this.board, foundMatches);
                const foundMatchesCells = this.getMatchesCellsHashes(foundMatches);
                regularMatchCheckCells.forEach((cell) => {
                    const cellHash = (0, CellsHelpers_1.cellToHash)(cell);
                    if (foundMatchesCells.has(cellHash))
                        return;
                    this.removeMatchCheckCell(cell);
                });
                reCheckCells.forEach((cell) => {
                    this.stepsModel.addRegularMatchCheckCells(cell);
                });
            }
            else {
                this.resetCheckCells();
            }
            [...swapGemsSearch.notFoundGemCells, ...matchCheckGemsSearch.notFoundGemCells].forEach((cell) => {
                this.removeMatchCheckCell(cell);
            });
            yield { kind: 'stepEnd' };
        }
    }
    getMatchesCellsHashes(matches) {
        return new Set(matches.flatMap((match) => match.gems.map((gem) => (0, CellsHelpers_1.cellToHash)(gem))));
    }
    addMatches(matches) {
        if (!matches.length)
            return;
        this.stepsModel.addMatches(matches);
        matches.forEach((match) => this.addedMatchesIds.add(match.id));
    }
    resetCheckCells() {
        this.awaitingMatchesTicksMap.clear();
        this.stepsModel.clearGravityBlockedMatchesIds();
    }
    removeMatchCheckCell(cell) {
        this.board.locker.removeLock(cell, { generatorId: this.generatorId, reason: 'MatchFound' });
        this.stepsModel.removeRegularMatchCheckCells(cell);
    }
    clearAddedMatches() {
        const matchesIds = [...this.addedMatchesIds];
        this.stepsModel.removeMatches(matchesIds);
        this.addedMatchesIds.clear();
    }
    getMatchGems(cells) {
        const matchCheckGems = [];
        const notFoundGemCells = [];
        cells.forEach((cell) => {
            const gem = this.board.getGem(cell);
            if (!gem) {
                notFoundGemCells.push(cell);
                return;
            }
            matchCheckGems.push(gem);
        });
        return { matchCheckGems, notFoundGemCells };
    }
    findValidMatches(matchCheckGems, swapGems) {
        const matches = this.board.regularMatcher.findMatches(matchCheckGems, swapGems);
        const uniqueMatches = this.filterUniqueMatches(matches);
        const gravityBlockedMatches = [];
        const swapBlockedMatches = [];
        const invalidCells = [];
        const reCheckCells = [];
        const validMatches = uniqueMatches.filter((match) => {
            let isMatchValid = true;
            let isGravityBlocked = false;
            let isSwapBlocked = false;
            match.gems.forEach((gem) => {
                if (this.board.locker.hasLockByOtherGenerators(gem, { generatorId: this.generatorId, reason: 'Swap' })) {
                    isMatchValid = false;
                    isSwapBlocked = true;
                }
                if (this.board.locker.hasLockByOtherGenerators(gem, { generatorId: this.generatorId, reason: 'Merge' })) {
                    isMatchValid = false;
                    isSwapBlocked = true;
                }
                if (this.board.isMatchBlocked(gem) ||
                    this.board.isGravityMovingCell(gem) ||
                    this.board.locker.hasLockByOtherGenerators(gem, { generatorId: this.generatorId, reason: 'MatchFound' }) ||
                    this.board.locker.hasSomeLockReason(gem, ['Blast', 'GravitySettle', 'ClearCell'])) {
                    isMatchValid = false;
                    invalidCells.push({ col: gem.col, row: gem.row });
                }
                else if (this.isAdjacentCellsGravityMoving(this.board, gem)) {
                    const blockedMatchTicks = this.getBlockedMatchTicks(match.hash);
                    if (blockedMatchTicks < this.config.maxAwaitingMatchTicks) {
                        isMatchValid = false;
                        isGravityBlocked = true;
                    }
                }
                else {
                    reCheckCells.push({ col: gem.col, row: gem.row });
                }
            });
            if (isSwapBlocked) {
                swapBlockedMatches.push(match);
            }
            if (isGravityBlocked) {
                gravityBlockedMatches.push(match);
            }
            return isMatchValid;
        });
        return { validMatches, gravityBlockedMatches, swapBlockedMatches, invalidCells, reCheckCells };
    }
    filterUniqueMatches(matches) {
        const uniqueMatchesMap = new Map();
        matches.forEach((match) => {
            uniqueMatchesMap.set(match.hash, match);
        });
        return Array.from(uniqueMatchesMap.values());
    }
    incrementBlockedMatchTicks(hash) {
        const blockedMatchCount = this.getBlockedMatchTicks(hash) + 1;
        this.awaitingMatchesTicksMap.set(hash, blockedMatchCount);
        return blockedMatchCount;
    }
    getBlockedMatchTicks(hash) {
        return this.awaitingMatchesTicksMap.get(hash) || 0;
    }
    isAdjacentCellsGravityMoving(board, cell) {
        return (0, CellsOffsets_1.getAdjacentCells)(cell, ['left', 'top', 'right']).some((adjacentCell) => {
            // TODO: Check also for empty cells which can be filled by gravity ???
            return board.isGravityMovingCell(adjacentCell);
        });
    }
    addFoundMatchesCellLocks(board, matches) {
        matches.forEach((match) => {
            match.gems.forEach((gem) => {
                const cell = { col: gem.col, row: gem.row };
                const cellLock = { generatorId: this.generatorId, reason: 'MatchFound' };
                if (board.locker.hasLockByOtherGenerators(cell, cellLock))
                    return;
                board.locker.addLock(cell, cellLock);
                this.foundMatchesCellLocks.push([cell, cellLock]);
            });
        });
    }
    clearFoundMatchesCellLocks() {
        this.foundMatchesCellLocks.forEach(([cell, lock]) => this.board.locker.removeLock(cell, lock));
        this.foundMatchesCellLocks = [];
    }
    isSettled() {
        return (this.stepsModel.getMatchesCount() === 0 &&
            this.stepsModel.getRegularMatchCheckCellsCount() === 0 &&
            this.stepsModel.getGravityBlockedMatchesIds().length === 0 &&
            this.foundMatchesCellLocks.length === 0 &&
            this.awaitingMatchesTicksMap.size === 0);
    }
}
exports.RegularMatchStepGenerator = RegularMatchStepGenerator;
//# sourceMappingURL=RegularMatchStepGenerator.js.map