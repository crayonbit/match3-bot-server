"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigBombBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
class BigBombBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'bigBombBlastPattern';
    }
    tryCreateMatch(params) {
        const { matchCheckGems, swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matchGems = [...matchCheckGems, ...swapGemsFiltered];
        const bigBomb = this.findBigBomb(matchGems, justUsedCells);
        if (!bigBomb)
            return null;
        const targetCells = this.findTargetCells(bigBomb);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: [],
            blastGem: bigBomb,
            targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    findBigBomb(matchGems, justUsedCells) {
        return (matchGems.find((swapGem) => {
            return !justUsedCells.has(swapGem) && (0, GemsHelpers_1.isGemOfKind)(swapGem, BoardTypes_1.GemCoreName.BigBomb);
        }) ?? null);
    }
    findTargetCells(bombGem) {
        return (0, CellsHelpers_1.getCellsAround)(bombGem, 2, (cell) => {
            if ((0, CellsHelpers_1.isCellsEqual)(cell, bombGem))
                return false;
            return this.board.isInGrid(cell) && this.board.hasBack(cell);
        }).map((cell) => ({ kind: 'nearby', ...cell }));
    }
    clone() {
        return new BigBombBlastPattern();
    }
}
exports.BigBombBlastPattern = BigBombBlastPattern;
//# sourceMappingURL=BigBombBlastPattern.js.map