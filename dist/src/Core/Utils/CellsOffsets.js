"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cellOffsetsMap = void 0;
exports.getCellOffsets = getCellOffsets;
exports.getAdjacentCells = getAdjacentCells;
exports.getAdjacentCell = getAdjacentCell;
exports.cellOffsetsMap = {
    top: { col: 0, row: -1 },
    topRight: { col: 1, row: -1 },
    right: { col: 1, row: 0 },
    bottomRight: { col: 1, row: 1 },
    bottom: { col: 0, row: 1 },
    bottomLeft: { col: -1, row: 1 },
    left: { col: -1, row: 0 },
    topLeft: { col: -1, row: -1 },
};
function getCellOffsets(directions) {
    return directions.map((direction) => exports.cellOffsetsMap[direction]);
}
function getAdjacentCells(cell, directions) {
    return directions.map((direction) => getAdjacentCell(cell, direction));
}
function getAdjacentCell(cell, direction) {
    const offset = exports.cellOffsetsMap[direction];
    return { col: cell.col + offset.col, row: cell.row + offset.row };
}
//# sourceMappingURL=CellsOffsets.js.map