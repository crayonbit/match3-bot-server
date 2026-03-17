"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCellsByRows = sortCellsByRows;
exports.sortCellsByColsAndRows = sortCellsByColsAndRows;
exports.cellToHash = cellToHash;
exports.hashToCell = hashToCell;
exports.cellsToDoubleHash = cellsToDoubleHash;
exports.doubleHashToCells = doubleHashToCells;
exports.cellsToHashString = cellsToHashString;
exports.hashStringToCells = hashStringToCells;
exports.isCellsEqual = isCellsEqual;
exports.getCellsDistance = getCellsDistance;
exports.isCellsInLine = isCellsInLine;
exports.getCellsAround = getCellsAround;
exports.get2DArrayValueByCell = get2DArrayValueByCell;
exports.set2DArrayValueByCell = set2DArrayValueByCell;
exports.forEachCell = forEachCell;
exports.getDirectionByCells = getDirectionByCells;
exports.getOrientationByCells = getOrientationByCells;
exports.getOffsetsByOrientation = getOffsetsByOrientation;
exports.getCellIndex = getCellIndex;
exports.getCellByIndex = getCellByIndex;
exports.getCellsByRawGemNames = getCellsByRawGemNames;
exports.levelGridItemDataToLayerItems = levelGridItemDataToLayerItems;
exports.getCellsWithinCellSize = getCellsWithinCellSize;
exports.unwrapBigSizeCell = unwrapBigSizeCell;
const RawGemNamePropsMap_1 = require("../LevelParser/Parsers/RawGemNamePropsMap");
// TODO: Add tests
function sortCellsByRows(cells) {
    const cellsByRowsMap = cells.reduce((acc, cell) => {
        acc[cell.row] = acc[cell.row] || [];
        acc[cell.row].push(cell);
        return acc;
    }, {});
    // making structure convenient to iterate by rows from top to bottom
    return Object.values(cellsByRowsMap);
}
function sortCellsByColsAndRows(cells, descendingRows, descendingCols) {
    return [...cells].sort((a, b) => {
        if (a.col === b.col) {
            return descendingRows ? b.row - a.row : a.row - b.row;
        }
        return descendingCols ? b.col - a.col : a.col - b.col;
    });
}
function cellToHash(cell) {
    return `${cell.col}|${cell.row}`;
}
function hashToCell(hash) {
    const separatorIndex = hash.indexOf('|');
    const col = Number(hash.substring(0, separatorIndex));
    const row = Number(hash.substring(separatorIndex + 1));
    return { col, row };
}
function cellsToDoubleHash(cells) {
    return `${cellToHash(cells[0])},${cellToHash(cells[1])}`;
}
function doubleHashToCells(hash) {
    return hash.split(',').map((cellHash) => hashToCell(cellHash));
}
function cellsToHashString(cells) {
    return cells.map(cellToHash).join(',');
}
function hashStringToCells(hashes) {
    return hashes.split(',').map((cellHash) => hashToCell(cellHash));
}
function isCellsEqual(cellA, cellB) {
    return cellA.col === cellB.col && cellA.row === cellB.row;
}
function getCellsDistance(cellA, cellB) {
    return Math.max(Math.abs(cellA.col - cellB.col), Math.abs(cellA.row - cellB.row));
}
function isCellsInLine(cellA, cellB) {
    return cellA.col === cellB.col || cellA.row === cellB.row;
}
function getCellsAround(centralCell, maxDistance, test) {
    const cells = [];
    for (let dx = -maxDistance; dx <= maxDistance; dx++) {
        for (let dy = -maxDistance; dy <= maxDistance; dy++) {
            const cell = { col: centralCell.col + dx, row: centralCell.row + dy };
            if (!test(cell))
                continue;
            cells.push(cell);
        }
    }
    return cells;
}
function get2DArrayValueByCell(array, cell) {
    return array[cell.col]?.[cell.row] ?? null;
}
function set2DArrayValueByCell(array, cell, value) {
    array[cell.col] = array[cell.col] || [];
    array[cell.col][cell.row] = value;
}
function forEachCell(data, callback) {
    for (let col = 0; col < data.length; col++) {
        for (let row = 0; row < data[col].length; row++) {
            callback(data[col][row], { col, row });
        }
    }
}
function getDirectionByCells(cellA, cellB) {
    if (cellA.col === cellB.col) {
        return cellA.row < cellB.row ? 'bottom' : 'top';
    }
    return cellA.col < cellB.col ? 'right' : 'left';
}
function getOrientationByCells(cellA, cellB) {
    if (cellA.col === cellB.col) {
        return 'vertical';
    }
    if (cellA.row === cellB.row) {
        return 'horizontal';
    }
    return null;
}
function getOffsetsByOrientation(orientation) {
    const horizontalOffsets = [
        { col: -1, row: 0 },
        { col: 1, row: 0 },
    ];
    const verticalOffsets = [
        { col: 0, row: -1 },
        { col: 0, row: 1 },
    ];
    return orientation === 'horizontal' ? horizontalOffsets : verticalOffsets;
}
function getCellIndex(cell, cols) {
    return cell.row * cols + cell.col;
}
function getCellByIndex(index, cols) {
    return { col: index % cols, row: Math.floor(index / cols) };
}
function getCellsByRawGemNames(board, rawGemNames) {
    const cells = [];
    const gemsProps = rawGemNames.map((rawGemName) => {
        return RawGemNamePropsMap_1.rawGemNamePropsMap[rawGemName];
    });
    board.gemsLayer.loopGrid((item, cell) => {
        if (!item)
            return;
        for (const props of gemsProps) {
            if (props.className !== item.core.className)
                continue;
            if (rawPropsEqualWithCore(props, item.core)) {
                cells.push(cell);
            }
        }
    });
    return cells;
}
function rawPropsEqualWithCore(propsA, propsB) {
    for (const key of Object.keys(propsA)) {
        // @ts-ignore
        if (propsA[key] !== propsB[key]) {
            return false;
        }
    }
    return true;
}
function levelGridItemDataToLayerItems(levelGridItemData) {
    return Object.entries(levelGridItemData)
        .map(([key, item]) => ({
        item,
        layerKey: key,
    }))
        .filter((layerItem) => layerItem.item)
        .reverse();
}
function getCellsWithinCellSize(cell, size) {
    const result = [];
    for (let x = 0; x < Math.abs(size.width); x++) {
        for (let y = 0; y < Math.abs(size.height); y++) {
            result.push({ col: cell.col + x * Math.sign(size.width), row: cell.row + y * Math.sign(size.height) });
        }
    }
    return result;
}
function unwrapBigSizeCell(cell, size) {
    const result = [];
    for (let x = 0; x < Math.abs(size.width); x++) {
        for (let y = 0; y < Math.abs(size.height); y++) {
            result.push({ ...cell, col: cell.col + x * Math.sign(size.width), row: cell.row + y * Math.sign(size.height) });
        }
    }
    return result;
}
//# sourceMappingURL=CellsHelpers.js.map