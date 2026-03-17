"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombBigBombComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
const FindColorBombOtherBombTargets_1 = require("./Helpers/FindColorBombOtherBombTargets");
class ColorBombBigBombComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'colorBombBigBombComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        if (!(0, GemsHelpers_1.isGemsOfOnlyKinds)(swapGemsFiltered, [BoardTypes_1.GemCoreName.ColorBomb, BoardTypes_1.GemCoreName.BigBomb], justUsedCells)) {
            return null;
        }
        const blastGem = swapGemsFiltered[1];
        const targetCells = (0, FindColorBombOtherBombTargets_1.findColorBombOtherBombTargets)(this.board, swapGemsFiltered, justUsedCells);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: swapGemsFiltered,
            blastGem,
            targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    clone() {
        return new ColorBombBigBombComboBlastPattern();
    }
}
exports.ColorBombBigBombComboBlastPattern = ColorBombBigBombComboBlastPattern;
//# sourceMappingURL=ColorBombBigBombComboBlastPattern.js.map