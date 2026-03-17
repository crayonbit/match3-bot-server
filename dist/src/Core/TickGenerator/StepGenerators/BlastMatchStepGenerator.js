"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlastMatchStepGenerator = void 0;
const StepGenerator_1 = require("./StepGenerator");
class BlastMatchStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'BlastMatchStep';
        /**
         * Map of match hashes and count of ticks since the match was found
         */
        this.awaitingMatchesTicksMap = new Map();
        this.foundMatchesCellLocks = [];
        this.addedMatchesIds = new Set();
        this.stepsModel = props.stepsModel;
        this.board = props.board;
        this.signals = props.signals;
    }
    *tick() {
        while (true) {
            this.clearFoundMatchesCellLocks();
            this.clearAddedMatches();
            const clickCell = this.stepsModel.getClickCell();
            const inputCells = this.stepsModel.getSwapCells();
            if (clickCell) {
                inputCells.push(clickCell);
            }
            const swapGems = this.getValidMatchGems(inputCells);
            const matchCheckGems = this.getValidMatchGems(this.stepsModel.getBlastMatchCheckCells());
            this.stepsModel.clearBlastMatchCheckCells();
            if (swapGems.length || matchCheckGems.length) {
                const blastMatches = this.board.blastMatcher.findMatches(matchCheckGems, swapGems);
                if (blastMatches.length) {
                    this.addMatches(blastMatches);
                    this.addFoundMatchesCellLocks(this.board, blastMatches);
                    this.signals.get('onMatchesFound').dispatch({ generatorId: this.generatorId, matches: blastMatches });
                }
            }
            yield { kind: 'stepEnd' };
        }
    }
    addMatches(matches) {
        if (!matches.length)
            return;
        this.stepsModel.addMatches(matches);
        matches.forEach((match) => this.addedMatchesIds.add(match.id));
    }
    clearAddedMatches() {
        const matchesIds = [...this.addedMatchesIds];
        this.stepsModel.removeMatches(matchesIds);
        this.addedMatchesIds.clear();
    }
    getValidMatchGems(cells) {
        return cells
            .map((cell) => {
            return this.board.getBlastLayerGem(cell) ?? this.board.getGem(cell);
        })
            .filter(Boolean);
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
            this.stepsModel.getBlastMatchCheckCellsCount() === 0 &&
            this.foundMatchesCellLocks.length === 0 &&
            this.awaitingMatchesTicksMap.size === 0);
    }
}
exports.BlastMatchStepGenerator = BlastMatchStepGenerator;
//# sourceMappingURL=BlastMatchStepGenerator.js.map