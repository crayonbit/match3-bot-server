"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeInARowPattern = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
class ThreeInARowPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'threeInARowPattern';
    }
    tryCreateMatch(params) {
        const { patternData } = params;
        for (const straightGems of [patternData.horizontal, patternData.vertical]) {
            if (straightGems.length !== 3)
                continue;
            return {
                id: this.generateMatchId(),
                patternName: this.name,
                gems: straightGems,
                hash: (0, CellsHelpers_1.cellsToHashString)(straightGems),
            };
        }
        return null;
    }
    clone() {
        return new ThreeInARowPattern();
    }
}
exports.ThreeInARowPattern = ThreeInARowPattern;
//# sourceMappingURL=ThreeInARowPattern.js.map