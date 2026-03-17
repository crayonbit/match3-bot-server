"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegularMatcher = void 0;
const BoardTypes_1 = require("../Board/BoardTypes");
const CellsHelpers_1 = require("../Utils/CellsHelpers");
const GemsHelpers_1 = require("../Utils/GemsHelpers");
const BaseMatcher_1 = require("./BaseMatcher");
class RegularMatcher extends BaseMatcher_1.BaseMatcher {
    findMatches(matchCheckGems, swapGems) {
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matchGems = [...matchCheckGems, ...swapGemsFiltered];
        const regularPatternDataList = this.collectRegularPatternData(matchGems);
        const usedGems = new Set();
        const matches = [];
        this.patterns.forEach((pattern) => {
            regularPatternDataList.forEach((patternData) => {
                this.filterUsedGemsFromPatternData(patternData, usedGems);
                const match = pattern.tryCreateMatch({ patternData, swapGems: swapGemsFiltered });
                if (!match)
                    return;
                matches.push(match);
                match.gems.forEach((gem) => usedGems.add(gem));
            });
        });
        this.patterns.forEach((pattern) => {
            regularPatternDataList.forEach((patternData) => {
                this.filterUsedGemsFromPatternData(patternData, usedGems);
                const match = pattern.tryCreateAfterMatch({ patternData, swapGems: swapGemsFiltered }, matches);
                if (!match)
                    return;
                matches.push(match);
                match.gems.forEach((gem) => usedGems.add(gem));
            });
        });
        return matches;
    }
    filterUsedGemsFromPatternData(patternData, usedGems) {
        patternData.top = patternData.top.filter((gem) => !usedGems.has(gem));
        patternData.right = patternData.right.filter((gem) => !usedGems.has(gem));
        patternData.bottom = patternData.bottom.filter((gem) => !usedGems.has(gem));
        patternData.left = patternData.left.filter((gem) => !usedGems.has(gem));
        patternData.topLeft = patternData.topLeft.filter((gem) => !usedGems.has(gem));
        patternData.topRight = patternData.topRight.filter((gem) => !usedGems.has(gem));
        patternData.bottomLeft = patternData.bottomLeft.filter((gem) => !usedGems.has(gem));
        patternData.bottomRight = patternData.bottomRight.filter((gem) => !usedGems.has(gem));
        patternData.horizontal = patternData.horizontal.filter((gem) => !usedGems.has(gem));
        patternData.vertical = patternData.vertical.filter((gem) => !usedGems.has(gem));
        patternData.diagonalUp = patternData.diagonalUp.filter((gem) => !usedGems.has(gem));
        patternData.diagonalDown = patternData.diagonalDown.filter((gem) => !usedGems.has(gem));
    }
    collectRegularPatternData(gems) {
        const dataList = [];
        for (const gem of gems) {
            if (!gem)
                continue;
            let top = this.collectMatchableGems(gem.col, gem.row, 0, -1);
            const right = this.collectMatchableGems(gem.col, gem.row, 1, 0);
            const bottom = this.collectMatchableGems(gem.col, gem.row, 0, 1);
            let left = this.collectMatchableGems(gem.col, gem.row, -1, 0);
            let topLeft = this.collectMatchableGems(gem.col, gem.row, -1, -1);
            let topRight = this.collectMatchableGems(gem.col, gem.row, 1, -1);
            let bottomLeft = this.collectMatchableGems(gem.col, gem.row, -1, 1);
            const bottomRight = this.collectMatchableGems(gem.col, gem.row, 1, 1);
            const horizontal = [...(0, CellsHelpers_1.sortCellsByColsAndRows)(left.slice(1, Infinity)), ...right];
            const vertical = [...(0, CellsHelpers_1.sortCellsByColsAndRows)(top.slice(1, Infinity)), ...bottom];
            const diagonalUp = [...(0, CellsHelpers_1.sortCellsByColsAndRows)(bottomLeft.slice(1, Infinity)), ...topRight];
            const diagonalDown = [...(0, CellsHelpers_1.sortCellsByColsAndRows)(topLeft.slice(1, Infinity)), ...bottomRight];
            top = (0, CellsHelpers_1.sortCellsByColsAndRows)(top, true);
            left = (0, CellsHelpers_1.sortCellsByColsAndRows)(left, false, true);
            topLeft = (0, CellsHelpers_1.sortCellsByColsAndRows)(topLeft, true, true);
            topRight = (0, CellsHelpers_1.sortCellsByColsAndRows)(topRight, true);
            bottomLeft = (0, CellsHelpers_1.sortCellsByColsAndRows)(bottomLeft, false, true);
            dataList.push({
                top,
                right,
                bottom,
                left,
                topLeft,
                topRight,
                bottomRight,
                bottomLeft,
                horizontal,
                vertical,
                diagonalUp,
                diagonalDown,
            });
        }
        return dataList;
    }
    collectMatchableGems(col, row, colStep, rowStep) {
        if (!this.board)
            return [];
        const gem = this.board.getGem({ col, row });
        if (!gem) {
            this.board.logger.error('Gem not found');
            return [];
        }
        const result = [];
        result.push(gem);
        let c = col;
        let r = row;
        while (true) {
            c += colStep;
            r += rowStep;
            const nextCell = { col: c, row: r };
            // we cannot create matches with gravity falling cells
            if (this.board.isGravityMovingCell(nextCell)) {
                break;
            }
            const next = this.board.getGem(nextCell);
            if (next &&
                !this.board.isMatchBlocked(nextCell) &&
                (0, GemsHelpers_1.isGemOfKind)(gem, BoardTypes_1.GemCoreName.Regular) &&
                (0, GemsHelpers_1.isGemOfKind)(next, BoardTypes_1.GemCoreName.Regular) &&
                !this.board.gemsLayer.isCovered(next) &&
                gem.core.color === next.core.color) {
                result.push(next);
            }
            else {
                break;
            }
        }
        return result;
    }
    clone() {
        return new RegularMatcher({ patterns: this.patterns.map((pattern) => pattern.clone()) });
    }
}
exports.RegularMatcher = RegularMatcher;
//# sourceMappingURL=RegularMatcher.js.map