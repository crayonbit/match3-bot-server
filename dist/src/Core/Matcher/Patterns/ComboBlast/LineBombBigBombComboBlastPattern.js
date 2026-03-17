"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBombBigBombComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
class LineBombBigBombComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'lineBombBigBombComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        if (!(0, GemsHelpers_1.isGemsOfOnlyKinds)(swapGems, [BoardTypes_1.GemCoreName.LineBomb, BoardTypes_1.GemCoreName.BigBomb], justUsedCells)) {
            return null;
        }
        const blastGem = swapGems[1];
        const targetCells = [];
        (0, CellsOffsets_1.getAdjacentCells)(blastGem, ['top', 'right', 'bottom', 'left']).forEach((cell) => {
            if (this.board.isInGrid(cell)) {
                targetCells.push({
                    kind: 'nearby',
                    ...cell,
                });
            }
        });
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
        return new LineBombBigBombComboBlastPattern();
    }
}
exports.LineBombBigBombComboBlastPattern = LineBombBigBombComboBlastPattern;
//# sourceMappingURL=LineBombBigBombComboBlastPattern.js.map