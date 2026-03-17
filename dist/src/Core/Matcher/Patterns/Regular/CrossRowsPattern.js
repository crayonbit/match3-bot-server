"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossRowsPattern = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
class CrossRowsPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'crossRowsPattern';
        this.maxGemsInRow = 5;
    }
    tryCreateMatch(params) {
        const { patternData } = params;
        const crossGem = this.determineCrossGem(patternData);
        if (!crossGem || !this.isCrossPattern(patternData.horizontal, patternData.vertical))
            return null;
        const gems = [...patternData.horizontal, ...patternData.vertical];
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems,
            changingGem: crossGem,
            hash: (0, CellsHelpers_1.cellsToHashString)(gems),
        };
    }
    isCrossPattern(horizontalGems, verticalGems) {
        if (horizontalGems.length >= this.maxGemsInRow || verticalGems.length >= this.maxGemsInRow)
            return false;
        return (horizontalGems.length > 2 &&
            verticalGems.length > 2 &&
            horizontalGems.length + verticalGems.length > this.maxGemsInRow);
    }
    determineCrossGem(patternData) {
        const { horizontal, vertical } = patternData;
        return (horizontal.find((horizontalGem) => vertical.some((verticalGem) => verticalGem.id === horizontalGem.id)) ?? null);
    }
    clone() {
        return new CrossRowsPattern();
    }
}
exports.CrossRowsPattern = CrossRowsPattern;
//# sourceMappingURL=CrossRowsPattern.js.map