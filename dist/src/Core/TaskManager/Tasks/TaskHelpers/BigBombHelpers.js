"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetCellsGroupedByDelays = getTargetCellsGroupedByDelays;
exports.getMinColAndRow = getMinColAndRow;
exports.processCellsGroupedByDelays = processCellsGroupedByDelays;
function getTargetCellsGroupedByDelays(cells, rippleDelays, minCol, minRow) {
    const targetCellsByDelays = new Map();
    cells.forEach((cell) => {
        const relativeCol = cell.col - minCol;
        const relativeRow = cell.row - minRow;
        const delay = rippleDelays[relativeRow][relativeCol];
        if (delay === undefined)
            return;
        targetCellsByDelays.set(delay, [...(targetCellsByDelays.get(delay) || []), { ...cell }]);
    });
    return targetCellsByDelays;
}
function getMinColAndRow(cells) {
    if (!cells.length) {
        return { minCol: 0, minRow: 0 };
    }
    let minCol = Infinity;
    let minRow = Infinity;
    for (const cell of cells) {
        if (cell.col < minCol) {
            minCol = cell.col;
        }
        if (cell.row < minRow) {
            minRow = cell.row;
        }
    }
    return { minCol, minRow };
}
function* processCellsGroupedByDelays(cellsGroupedByDelays, rippleTicksToWait, kickCell, waitTicks) {
    const delays = Array.from(cellsGroupedByDelays.keys())
        .map(Number)
        .sort((a, b) => a - b);
    for (const delay of delays) {
        // We don't want to kick the blast gem again
        if (delay === 0)
            continue;
        const currentCells = cellsGroupedByDelays.get(delay);
        currentCells.forEach((cell) => {
            kickCell(cell);
        });
        if (rippleTicksToWait > 0) {
            yield* waitTicks(rippleTicksToWait);
        }
    }
}
//# sourceMappingURL=BigBombHelpers.js.map