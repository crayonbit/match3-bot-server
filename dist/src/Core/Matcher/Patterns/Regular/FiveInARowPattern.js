"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiveInARowPattern = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
class FiveInARowPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'fiveInARowPattern';
        this.minGemsInRow = 5;
    }
    tryCreateMatch(params) {
        const { patternData, swapGems } = params;
        const crossGem = this.determineCrossGem(patternData);
        if (crossGem && this.isCrossPattern(patternData.horizontal, patternData.vertical)) {
            const gems = [...patternData.horizontal, ...patternData.vertical];
            return {
                id: this.generateMatchId(),
                patternName: this.name,
                gems,
                changingGem: crossGem,
                hash: (0, CellsHelpers_1.cellsToHashString)(gems),
            };
        }
        const swapGemsFiltered = swapGems.filter(Boolean);
        for (const straightGems of [patternData.horizontal, patternData.vertical]) {
            if (straightGems.length < this.minGemsInRow)
                continue;
            return {
                id: this.generateMatchId(),
                patternName: this.name,
                gems: straightGems,
                changingGem: this.determineBlastGem(straightGems, swapGemsFiltered),
                hash: (0, CellsHelpers_1.cellsToHashString)(straightGems),
            };
        }
        return null;
    }
    determineCrossGem(patternData) {
        const { horizontal, vertical } = patternData;
        return (horizontal.find((horizontalGem) => vertical.some((verticalGem) => verticalGem.id === horizontalGem.id)) ?? null);
    }
    isCrossPattern(horizontalGems, verticalGems) {
        return ((horizontalGems.length >= this.minGemsInRow && verticalGems.length > 2) ||
            (verticalGems.length >= this.minGemsInRow && horizontalGems.length > 2));
    }
    determineBlastGem(gems, swapGems) {
        const blastGem = gems.find((gem) => swapGems.some((swapGem) => swapGem.id === gem.id));
        return blastGem || gems[0];
    }
    clone() {
        return new FiveInARowPattern();
    }
}
exports.FiveInARowPattern = FiveInARowPattern;
//# sourceMappingURL=FiveInARowPattern.js.map