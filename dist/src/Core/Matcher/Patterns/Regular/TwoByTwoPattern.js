"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoByTwoPattern = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
class TwoByTwoPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'twoByTwoPattern';
    }
    tryCreateMatch(params) {
        const { patternData, swapGems } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const twoByTwoPattern = this.findTwoByTwoPattern(patternData);
        if (!twoByTwoPattern)
            return null;
        const doubleGems = this.findDoubleGems(twoByTwoPattern);
        const changingGem = this.findBlastGem(doubleGems, swapGemsFiltered);
        if (!changingGem)
            return null;
        const gems = (0, CellsHelpers_1.sortCellsByColsAndRows)(this.filterUniqueGems(doubleGems));
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            changingGem,
            gems,
            hash: (0, CellsHelpers_1.cellsToHashString)(gems),
        };
    }
    findDoubleGems(patternData) {
        return Object.entries(patternData)
            .filter(([direction, gems]) => {
            if (direction === 'horizontal' ||
                direction === 'vertical' ||
                direction === 'diagonalUp' ||
                direction === 'diagonalDown') {
                return false;
            }
            return gems.length >= 2;
        })
            .map(([, gems]) => gems)
            .flat()
            .filter((gem, i, gems) => {
            const inLineWithAtLeastOneGem = gems.some((otherGem, j) => {
                if (otherGem.id === gem.id)
                    return false;
                return (0, CellsHelpers_1.isCellsInLine)(otherGem, gem);
            });
            return inLineWithAtLeastOneGem;
        });
    }
    findBlastGem(gems, swapGems) {
        if (swapGems.length > 0) {
            return this.findBlastGemFromSwapGems(gems, swapGems);
        }
        return this.findBlastGemInGems(gems);
    }
    findBlastGemFromSwapGems(gems, swapGems) {
        return (gems.find((gem) => {
            return swapGems.some((swapGem) => gem.id === swapGem.id);
        }) ?? null);
    }
    findBlastGemInGems(gems) {
        const gemsByHash = {};
        gems.forEach((gem) => {
            const hash = (0, CellsHelpers_1.cellToHash)(gem);
            gemsByHash[hash] = gemsByHash[hash] ?? [];
            gemsByHash[hash].push(gem);
        });
        return Object.values(gemsByHash).find((gemsArray) => gemsArray.length > 1)?.[0] ?? null;
    }
    filterUniqueGems(gems) {
        const uniqueGemsHashes = {};
        gems.forEach((gem) => {
            uniqueGemsHashes[(0, CellsHelpers_1.cellToHash)(gem)] = gem;
        });
        return Object.values(uniqueGemsHashes);
    }
    findTwoByTwoPattern(patternData) {
        const twoByTwoPatternFiltered = this.filterTwoByTwoPattern(patternData, ['right', 'bottomRight', 'bottom']) ||
            this.filterTwoByTwoPattern(patternData, ['top', 'topRight', 'right']) ||
            this.filterTwoByTwoPattern(patternData, ['left', 'bottomLeft', 'bottom']) ||
            this.filterTwoByTwoPattern(patternData, ['top', 'topLeft', 'left']);
        return twoByTwoPatternFiltered ? patternData : null;
    }
    filterTwoByTwoPattern(patternData, keys) {
        const filteredPattern = {
            top: [],
            right: [],
            bottom: [],
            left: [],
            topLeft: [],
            topRight: [],
            bottomRight: [],
            bottomLeft: [],
            horizontal: [],
            vertical: [],
            diagonalUp: [],
            diagonalDown: [],
        };
        let foundDoubles = 0;
        keys.forEach((key) => {
            if (patternData[key].length >= 2) {
                filteredPattern[key] = patternData[key].slice();
                foundDoubles++;
            }
        });
        return foundDoubles === 3 ? filteredPattern : null;
    }
    clone() {
        return new TwoByTwoPattern();
    }
}
exports.TwoByTwoPattern = TwoByTwoPattern;
//# sourceMappingURL=TwoByTwoPattern.js.map