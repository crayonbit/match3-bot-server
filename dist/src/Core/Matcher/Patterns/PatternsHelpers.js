"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRocketDistantCells = filterRocketDistantCells;
exports.isRocketLastBigSizeGoalCell = isRocketLastBigSizeGoalCell;
exports.collectTargetCellsForLine = collectTargetCellsForLine;
const BoardTypes_1 = require("../../Board/BoardTypes");
const BoardTypeUtils_1 = require("../../Board/BoardTypeUtils");
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const GetArea_1 = require("../../Utils/Math/GetArea");
function filterRocketDistantCells(props) {
    const { board, matchCells, kickCells, usedTargetCells, randomizeArray } = props;
    const goalCellsByPriority = [];
    let goalCells = [];
    const regularGemCells = [];
    const otherGemCells = [];
    const isCellLocked = (cell, reasons, layerKey) => {
        return board.locker.hasSomeLockReason(cell, reasons, layerKey);
    };
    const isCellValid = (cell) => {
        if (matchCells.some((matchCell) => (0, CellsHelpers_1.isCellsEqual)(matchCell, cell)) ||
            kickCells.some((kickCell) => (0, CellsHelpers_1.isCellsEqual)(kickCell, cell)) ||
            usedTargetCells.has(cell)) {
            return false;
        }
        return true;
    };
    let doorTargetGems = null;
    const getDoorTargetGem = (doorItem) => {
        if (!doorItem)
            return null;
        if (!doorTargetGems) {
            doorTargetGems = board.gemsLayer
                .getAll((gem) => [BoardTypes_1.GemCoreName.Regular, BoardTypes_1.GemCoreName.Acorn].includes(gem.core.className))
                .filter((gem) => {
                if (!isCellValid(gem) ||
                    isCellLocked(gem, ['Blast', 'ClearCell'], BoardTypes_1.LevelGridItemKey.Gem) ||
                    board.isAnythingAbove(BoardTypes_1.LevelGridItemKey.Gem, gem)) {
                    return false;
                }
                if (gem.core.className === BoardTypes_1.GemCoreName.Acorn && doorItem.type === BoardTypes_1.GemCoreName.Acorn) {
                    return true;
                }
                if (gem.core.className === BoardTypes_1.GemCoreName.Regular && doorItem.type !== BoardTypes_1.GemCoreName.Acorn) {
                    return gem.core.color === doorItem.type;
                }
                return false;
            });
        }
        const randomGemIndex = board.randomGenerator.clone().integerInRange(0, doorTargetGems.length - 1);
        const randomBoardGem = doorTargetGems[randomGemIndex];
        if (!randomBoardGem) {
            return null;
        }
        doorTargetGems.splice(randomGemIndex, 1);
        return randomBoardGem;
    };
    board.grid.loop((levelGridItemData, cell) => {
        if (!isCellValid(cell)) {
            return false;
        }
        const cellLayers = (0, CellsHelpers_1.levelGridItemDataToLayerItems)(levelGridItemData);
        for (const layerItem of cellLayers) {
            if (!layerItem.item || board.isAnythingAbove(layerItem.layerKey, cell, [BoardTypes_1.LevelGridItemKey.Gem]))
                continue;
            const goalPriority = board.progressManager.getGoalPriority(layerItem);
            if (goalPriority > 0) {
                const adjustedCell = getRocketGoalAdjustedCell(board, layerItem, cell, isCellValid, getDoorTargetGem);
                if (!adjustedCell) {
                    break;
                }
                const size = adjustedCell.size ?? board.getLayerItemSize(layerItem);
                const sizeCanUnwrap = adjustedCell.sizeCanUnwrap ?? isSizeCanUnwrap(size, layerItem);
                const priority = props.equalizeGoalPriorities ? 1 : goalPriority;
                goalCells.push({
                    priority,
                    ...adjustedCell.cell,
                    entityId: adjustedCell.entityId ?? layerItem.item.id,
                    layerKey: layerItem.layerKey,
                    size,
                    sizeCanUnwrap,
                });
                goalCellsByPriority[priority] ?? (goalCellsByPriority[priority] = []);
                goalCellsByPriority[priority].push({
                    priority,
                    ...adjustedCell.cell,
                    entityId: adjustedCell.entityId ?? layerItem.item.id,
                    layerKey: layerItem.layerKey,
                    size,
                    sizeCanUnwrap,
                });
                break;
            }
            else if ((0, BoardTypeUtils_1.isDoorLayerItem)(layerItem)) {
                const adjustedCell = getRocketGoalAdjustedCell(board, layerItem, cell, isCellValid, getDoorTargetGem);
                if (!adjustedCell) {
                    break;
                }
                const size = adjustedCell.size ?? board.getLayerItemSize(layerItem);
                const sizeCanUnwrap = adjustedCell.sizeCanUnwrap ?? isSizeCanUnwrap(size, layerItem);
                const priority = 1;
                goalCells.push({
                    priority,
                    ...adjustedCell.cell,
                    entityId: adjustedCell.entityId ?? layerItem.item.id,
                    layerKey: layerItem.layerKey,
                    size,
                    sizeCanUnwrap,
                });
                goalCellsByPriority[priority] ?? (goalCellsByPriority[priority] = []);
                goalCellsByPriority[priority].push({
                    priority,
                    ...adjustedCell.cell,
                    entityId: adjustedCell.entityId ?? layerItem.item.id,
                    layerKey: layerItem.layerKey,
                    size,
                    sizeCanUnwrap,
                });
            }
            else if ((0, BoardTypeUtils_1.isGemLayerItem)(layerItem)) {
                const gemItem = layerItem.item;
                const size = board.getLayerItemSize(layerItem);
                const sizeCanUnwrap = isSizeCanUnwrap(size, layerItem);
                if (gemItem.core.className === BoardTypes_1.GemCoreName.Regular) {
                    regularGemCells.push({
                        priority: 0,
                        ...cell,
                        entityId: gemItem.id,
                        layerKey: layerItem.layerKey,
                        size,
                        sizeCanUnwrap,
                    });
                }
                else {
                    otherGemCells.push({
                        priority: 0,
                        ...cell,
                        entityId: gemItem.id,
                        layerKey: layerItem.layerKey,
                        size,
                        sizeCanUnwrap,
                    });
                }
            }
        }
        return false;
    }, true);
    const maxGoalCellPrio = Math.max(...Object.keys(goalCellsByPriority).map(Number));
    let maxPrioGoalCells = goalCellsByPriority[maxGoalCellPrio] || [];
    randomizeArray(maxPrioGoalCells);
    randomizeArray(regularGemCells);
    randomizeArray(goalCells);
    let reasonsToFilter = [];
    // If there is only Big Size goal cell left, we ignore the locks
    if (isRocketLastBigSizeGoalCell(goalCells)) {
        reasonsToFilter = ['ClearCell'];
    }
    else {
        reasonsToFilter = ['Blast', 'ClearCell'];
    }
    maxPrioGoalCells = maxPrioGoalCells.filter((item) => !isCellLocked({ ...item }, reasonsToFilter, item.layerKey));
    goalCells = goalCells.filter((item) => !isCellLocked({ ...item }, reasonsToFilter, item.layerKey));
    return { maxPrioGoalCells, goalCells, regularGemCells, otherGemCells };
}
function isSizeCanUnwrap(size, layerItem) {
    if ((0, BoardTypeUtils_1.isGemLayerItem)(layerItem) && layerItem.item.core.className === BoardTypes_1.GemCoreName.Beam) {
        return false;
    }
    return (0, GetArea_1.getArea)(size) > 1;
}
function isRocketLastBigSizeGoalCell(goalCells) {
    return goalCells.length === 1 && (0, GetArea_1.getArea)(goalCells[0].size) > 1;
}
function getRocketGoalAdjustedCell(board, layerItem, cell, isCellValid, getDoorTargetGem) {
    if ((0, BoardTypeUtils_1.isGemLayerItem)(layerItem)) {
        if (layerItem.item.core.className === BoardTypes_1.GemCoreName.Drop) {
            for (let row = cell.row + 1; row < board.grid.getRows(); row++) {
                const adjustedCell = { col: cell.col, row };
                const adjustedCellData = board.grid.get(adjustedCell);
                if (!adjustedCellData || !isCellValid(adjustedCell)) {
                    continue;
                }
                if (adjustedCellData &&
                    adjustedCellData[BoardTypes_1.LevelGridItemKey.Gem] &&
                    adjustedCellData[BoardTypes_1.LevelGridItemKey.Gem].core.className !== BoardTypes_1.GemCoreName.Drop) {
                    return {
                        cell: adjustedCell,
                        entityId: adjustedCellData[BoardTypes_1.LevelGridItemKey.Gem].id,
                        size: { width: 1, height: 1 },
                        sizeCanUnwrap: false,
                    };
                }
            }
            return null;
        }
    }
    else if ((0, BoardTypeUtils_1.isDoorLayerItem)(layerItem)) {
        const doorItem = layerItem.item;
        const doorTargetGem = getDoorTargetGem(doorItem);
        if (!doorTargetGem) {
            return null;
        }
        return {
            cell: { col: doorTargetGem.col, row: doorTargetGem.row },
            entityId: doorTargetGem.id,
            size: { width: 1, height: 1 },
            sizeCanUnwrap: false,
        };
    }
    return { cell };
}
function collectTargetCellsForLine(props) {
    const { board, startCell, cellOffset, targetCellKind, includeStartCell } = props;
    const targetCells = [];
    if (includeStartCell) {
        targetCells.push({ kind: targetCellKind, ...startCell });
    }
    let col = startCell.col + cellOffset.col;
    let row = startCell.row + cellOffset.row;
    while (board.isInGrid({ col, row })) {
        targetCells.push({ kind: targetCellKind, col, row });
        col += cellOffset.col;
        row += cellOffset.row;
    }
    return targetCells;
}
//# sourceMappingURL=PatternsHelpers.js.map