"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGemsOfOnlyKinds = isGemsOfOnlyKinds;
exports.isAllGemsOfKind = isAllGemsOfKind;
exports.getCellsByDistanceToTargeCell = getCellsByDistanceToTargeCell;
exports.isGemOfKind = isGemOfKind;
exports.assertGemOfKind = assertGemOfKind;
exports.getGemsFromCells = getGemsFromCells;
const CellsHelpers_1 = require("./CellsHelpers");
function isGemsOfOnlyKinds(gems, kinds, ignoredCells) {
    return kinds.every((kind) => gems.some((gem) => {
        if (!gem || ignoredCells?.has(gem))
            return false;
        return gem.core.className === kind;
    }));
}
function isAllGemsOfKind(gems, kind, ignoredCells) {
    return (gems.length > 0 &&
        gems.every((gem) => {
            if (!gem || ignoredCells?.has(gem))
                return false;
            return gem.core.className === kind;
        }));
}
function getCellsByDistanceToTargeCell(cells, targetCell) {
    const cellsByDistances = new Map();
    cells.forEach((cell) => {
        const distance = (0, CellsHelpers_1.getCellsDistance)(cell, targetCell);
        const cellsArray = cellsByDistances.get(distance) || [];
        cellsArray.push(cell);
        cellsByDistances.set(distance, cellsArray);
    });
    return cellsByDistances;
}
function isGemOfKind(gem, className) {
    return gem.core.className === className;
}
function assertGemOfKind(gem, className) {
    if (!isGemOfKind(gem, className)) {
        throw new Error(`Gem is not of kind ${className}`);
    }
}
function getGemsFromCells(board, cells) {
    const gems = [];
    for (const cell of cells) {
        const gem = board.getGem(cell);
        if (gem) {
            gems.push(gem);
        }
    }
    return gems;
}
//# sourceMappingURL=GemsHelpers.js.map