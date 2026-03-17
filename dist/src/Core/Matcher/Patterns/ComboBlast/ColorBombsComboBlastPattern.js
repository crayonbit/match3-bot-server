"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombsComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
class ColorBombsComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'colorBombsComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        if (swapGemsFiltered.length !== 2)
            return null;
        if (!(0, GemsHelpers_1.isAllGemsOfKind)(swapGemsFiltered, BoardTypes_1.GemCoreName.ColorBomb, justUsedCells)) {
            return null;
        }
        const blastGem = swapGemsFiltered[1];
        const targetCells = this.findTargetCells(this.board, swapGemsFiltered, justUsedCells);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: swapGemsFiltered,
            blastGem,
            targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    findTargetCells(board, swapCells, justUsedCells) {
        const targetCells = [];
        board.gemsLayer.loopExistingLayerItems((gem) => {
            if ((0, CellsHelpers_1.isCellsEqual)(swapCells[0], gem) ||
                (0, CellsHelpers_1.isCellsEqual)(swapCells[1], gem) ||
                justUsedCells.has(gem) ||
                board.locker.hasSomeLockReason(gem, ['Blast', 'DistantTarget', 'ClearCell'])) {
                return;
            }
            const targetCell = { kind: 'distant', col: gem.col, row: gem.row };
            targetCells.push(targetCell);
        });
        return targetCells;
    }
    clone() {
        return new ColorBombsComboBlastPattern();
    }
}
exports.ColorBombsComboBlastPattern = ColorBombsComboBlastPattern;
//# sourceMappingURL=ColorBombsComboBlastPattern.js.map