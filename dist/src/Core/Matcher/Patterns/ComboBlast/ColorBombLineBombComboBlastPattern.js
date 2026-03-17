"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombLineBombComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
const FindColorBombOtherBombTargets_1 = require("./Helpers/FindColorBombOtherBombTargets");
class ColorBombLineBombComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'colorBombLineBombComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        if (!(0, GemsHelpers_1.isGemsOfOnlyKinds)(swapGems, [BoardTypes_1.GemCoreName.ColorBomb, BoardTypes_1.GemCoreName.LineBomb], justUsedCells)) {
            return null;
        }
        const blastGem = swapGems[1];
        const targetCells = (0, FindColorBombOtherBombTargets_1.findColorBombOtherBombTargets)(this.board, swapGems, justUsedCells);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: swapGems,
            blastGem,
            targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    clone() {
        return new ColorBombLineBombComboBlastPattern();
    }
}
exports.ColorBombLineBombComboBlastPattern = ColorBombLineBombComboBlastPattern;
//# sourceMappingURL=ColorBombLineBombComboBlastPattern.js.map