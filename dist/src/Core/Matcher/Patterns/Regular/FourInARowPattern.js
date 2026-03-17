"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FourInARowPattern = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
class FourInARowPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'fourInARowPattern';
    }
    tryCreateMatch(params) {
        const { patternData, swapGems } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        for (const straightGems of [patternData.horizontal, patternData.vertical]) {
            if (straightGems.length !== 4)
                continue;
            return {
                id: this.generateMatchId(),
                patternName: this.name,
                gems: straightGems,
                changingGem: this.determineBlastGem(straightGems, swapGemsFiltered),
                orientation: this.getOrientation(straightGems),
                hash: (0, CellsHelpers_1.cellsToHashString)(straightGems),
            };
        }
        return null;
    }
    getOrientation(gems) {
        return gems[0].col === gems[1].col ? 'horizontal' : 'vertical';
    }
    determineBlastGem(gems, swapGems) {
        const bombGem = gems.find((gem) => swapGems.some((swapGem) => swapGem.id === gem.id));
        return bombGem || gems[0];
    }
    clone() {
        return new FourInARowPattern();
    }
}
exports.FourInARowPattern = FourInARowPattern;
//# sourceMappingURL=FourInARowPattern.js.map