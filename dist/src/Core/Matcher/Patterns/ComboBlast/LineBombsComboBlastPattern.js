"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBombsComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
class LineBombsComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'lineBombsComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        if (swapGems.length !== 2)
            return null;
        if (!(0, GemsHelpers_1.isAllGemsOfKind)(swapGemsFiltered, BoardTypes_1.GemCoreName.LineBomb, justUsedCells)) {
            return null;
        }
        const blastGem = swapGemsFiltered[1];
        const targetCells = swapGemsFiltered.map((gem) => {
            return {
                kind: 'nearby',
                col: gem.col,
                row: gem.row,
            };
        });
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
        return new LineBombsComboBlastPattern();
    }
}
exports.LineBombsComboBlastPattern = LineBombsComboBlastPattern;
//# sourceMappingURL=LineBombsComboBlastPattern.js.map