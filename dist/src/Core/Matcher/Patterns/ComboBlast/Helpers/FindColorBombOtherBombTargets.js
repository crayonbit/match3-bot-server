"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findColorBombOtherBombTargets = findColorBombOtherBombTargets;
const BoardTypes_1 = require("../../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../../Utils/GemsHelpers");
function findColorBombOtherBombTargets(board, swapCells, justUsedCells) {
    const targetCellsByColor = {};
    board.gemsLayer.loopExistingLayerItems((gem) => {
        if ((0, CellsHelpers_1.isCellsEqual)(swapCells[0], gem) ||
            (0, CellsHelpers_1.isCellsEqual)(swapCells[1], gem) ||
            justUsedCells.has(gem) ||
            board.gemsLayer.isCovered(gem) ||
            !(0, GemsHelpers_1.isGemOfKind)(gem, BoardTypes_1.GemCoreName.Regular) ||
            board.locker.hasSomeLockReason(gem, ['Blast', 'DistantTarget', 'ClearCell'])) {
            return;
        }
        const targetCells = targetCellsByColor[gem.core.color] || [];
        const targetCell = { kind: 'distant', col: gem.col, row: gem.row };
        targetCells.push(targetCell);
        targetCellsByColor[gem.core.color] = targetCells;
    });
    const targetCellsByColorSorted = Object.entries(targetCellsByColor).sort((a, b) => {
        return b[1].length - a[1].length;
    });
    const mostCellsByColor = targetCellsByColorSorted?.[0]?.[1] ?? [];
    const sameCountCellsByColor = targetCellsByColorSorted.filter(([, cells]) => {
        return cells.length === mostCellsByColor.length;
    });
    return board.randomGenerator.clone().pick(sameCountCellsByColor)?.[1] ?? [];
}
//# sourceMappingURL=FindColorBombOtherBombTargets.js.map