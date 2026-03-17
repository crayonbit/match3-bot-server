"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossBombBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
const PatternsHelpers_1 = require("../PatternsHelpers");
class CrossBombBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'crossBombBlastPattern';
    }
    tryCreateMatch(params) {
        const { matchCheckGems, swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matchGems = [...matchCheckGems, ...swapGemsFiltered].filter((gem) => !justUsedCells.has(gem));
        const crossBomb = matchGems.find((swapGem) => swapGem.core.className === BoardTypes_1.GemCoreName.CrossBomb);
        if (!crossBomb)
            return null;
        const targetCells = this.collectTargetCells(crossBomb);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: [],
            blastGem: crossBomb,
            targetCells,
            targetCellsGroupsData: this.prepareTargetCellsForAnimation(crossBomb, targetCells),
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    collectTargetCells(startCell) {
        const top = (0, PatternsHelpers_1.collectTargetCellsForLine)({
            board: this.board,
            startCell,
            cellOffset: { col: 0, row: -1 },
            targetCellKind: 'nearby',
        });
        const right = (0, PatternsHelpers_1.collectTargetCellsForLine)({
            board: this.board,
            startCell,
            cellOffset: { col: 1, row: 0 },
            targetCellKind: 'nearby',
        });
        const bottom = (0, PatternsHelpers_1.collectTargetCellsForLine)({
            board: this.board,
            startCell,
            cellOffset: { col: 0, row: 1 },
            targetCellKind: 'nearby',
        });
        const left = (0, PatternsHelpers_1.collectTargetCellsForLine)({
            board: this.board,
            startCell,
            cellOffset: { col: -1, row: 0 },
            targetCellKind: 'nearby',
        });
        return [...left, ...right, ...top, ...bottom];
    }
    prepareTargetCellsForAnimation(blastGem, targetCells) {
        const targetCellsLeft = [];
        const targetCellsRight = [];
        const targetCellsTop = [];
        const targetCellsBottom = [];
        for (const cell of targetCells) {
            if (cell.row === blastGem.row) {
                if (cell.col < blastGem.col) {
                    targetCellsLeft.push(cell);
                }
                else {
                    targetCellsRight.push(cell);
                }
            }
            else if (cell.col === blastGem.col) {
                if (cell.row < blastGem.row) {
                    targetCellsTop.push(cell);
                }
                else {
                    targetCellsBottom.push(cell);
                }
            }
        }
        const targetCellsGroups = [targetCellsLeft, targetCellsRight, targetCellsTop, targetCellsBottom];
        const maxIndex = Math.max(...targetCellsGroups.map((cells) => cells.length));
        return { targetCellsGroups, maxIndex };
    }
    clone() {
        return new CrossBombBlastPattern();
    }
}
exports.CrossBombBlastPattern = CrossBombBlastPattern;
//# sourceMappingURL=CrossBombBlastPattern.js.map