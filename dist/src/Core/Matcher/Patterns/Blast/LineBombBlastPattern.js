"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBombBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
const PatternsHelpers_1 = require("../PatternsHelpers");
class LineBombBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'lineBombBlastPattern';
    }
    tryCreateMatch(params) {
        const { matchCheckGems, swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matchGems = [...matchCheckGems, ...swapGemsFiltered].filter((gem) => !justUsedCells.has(gem));
        const lineBomb = matchGems.find((swapGem) => swapGem.core.className === BoardTypes_1.GemCoreName.LineBomb);
        if (!lineBomb)
            return null;
        const { orientation } = lineBomb.core;
        const targetCells = this.collectTargetCells(orientation, lineBomb);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: [],
            blastGem: lineBomb,
            targetCells,
            targetCellsGroupsData: this.prepareTargetCellsForAnimation(lineBomb, targetCells),
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    collectTargetCells(orientation, startCell) {
        const top = orientation === 'vertical'
            ? (0, PatternsHelpers_1.collectTargetCellsForLine)({
                board: this.board,
                startCell,
                cellOffset: { col: 0, row: -1 },
                targetCellKind: 'nearby',
            })
            : [];
        const right = orientation === 'horizontal'
            ? (0, PatternsHelpers_1.collectTargetCellsForLine)({
                board: this.board,
                startCell,
                cellOffset: { col: 1, row: 0 },
                targetCellKind: 'nearby',
            })
            : [];
        const bottom = orientation === 'vertical'
            ? (0, PatternsHelpers_1.collectTargetCellsForLine)({
                board: this.board,
                startCell,
                cellOffset: { col: 0, row: 1 },
                targetCellKind: 'nearby',
            })
            : [];
        const left = orientation === 'horizontal'
            ? (0, PatternsHelpers_1.collectTargetCellsForLine)({
                board: this.board,
                startCell,
                cellOffset: { col: -1, row: 0 },
                targetCellKind: 'nearby',
            })
            : [];
        return [...left, ...right, ...top, ...bottom];
    }
    prepareTargetCellsForAnimation(blastGem, targetCells) {
        const { orientation } = blastGem.core;
        const targetCellsA = [];
        const targetCellsB = [];
        for (const cell of targetCells) {
            if (orientation === 'horizontal') {
                if (cell.col < blastGem.col) {
                    targetCellsA.push(cell);
                }
                else {
                    targetCellsB.push(cell);
                }
            }
            else if (orientation === 'vertical') {
                if (cell.row < blastGem.row) {
                    targetCellsA.push(cell);
                }
                else {
                    targetCellsB.push(cell);
                }
            }
        }
        const targetCellsGroups = [targetCellsA, targetCellsB];
        const maxIndex = Math.max(...targetCellsGroups.map((cells) => cells.length));
        return { targetCellsGroups, maxIndex };
    }
    clone() {
        return new LineBombBlastPattern();
    }
}
exports.LineBombBlastPattern = LineBombBlastPattern;
//# sourceMappingURL=LineBombBlastPattern.js.map