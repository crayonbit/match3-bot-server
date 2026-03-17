"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigBombsComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
class BigBombsComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'bigBombsComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        if (swapGemsFiltered.length !== 2)
            return null;
        if (!(0, GemsHelpers_1.isAllGemsOfKind)(swapGemsFiltered, BoardTypes_1.GemCoreName.BigBomb, justUsedCells)) {
            return null;
        }
        const blastGem = swapGemsFiltered[1];
        const targetCells = this.findTargetCells(blastGem);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: swapGemsFiltered,
            blastGem,
            targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    findTargetCells(bombGem) {
        return (0, CellsHelpers_1.getCellsAround)(bombGem, 4, (cell) => {
            if ((0, CellsHelpers_1.isCellsEqual)(cell, bombGem))
                return false;
            return this.board.isInGrid(cell) && this.board.hasBack(cell);
        }).map((cell) => ({ kind: 'nearby', ...cell }));
    }
    clone() {
        return new BigBombsComboBlastPattern();
    }
}
exports.BigBombsComboBlastPattern = BigBombsComboBlastPattern;
//# sourceMappingURL=BigBombsComboBlastPattern.js.map