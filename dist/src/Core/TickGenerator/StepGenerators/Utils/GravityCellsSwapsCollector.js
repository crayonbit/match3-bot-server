"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GravityCellsSwapsCollector = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
class GravityCellsSwapsCollector {
    constructor(board) {
        this.cellsSwapsHashes = new Set();
        this.board = board;
        this.flaggedByGravityCells = this.board.createCellsKeeper();
        this.nextRowCellsKeeper = this.board.createCellsKeeper();
        this.reservedCells = this.board.createCellsKeeper();
    }
    collect(board, cells) {
        const cellsByRows = (0, CellsHelpers_1.sortCellsByRows)(cells).reverse();
        cellsByRows.forEach((rowCells) => {
            rowCells.forEach((cell) => {
                this.tryAddVerticalCellAndQueueTopCells(cell);
            });
            rowCells.forEach((cell) => {
                this.tryAddDiagonalGravityCell(cell);
            });
        });
        const nextRowCells = this.nextRowCellsKeeper.getCells();
        if (nextRowCells.length) {
            this.nextRowCellsKeeper.clear();
            this.collect(board, nextRowCells);
        }
        return Array.from(this.cellsSwapsHashes).map(CellsHelpers_1.doubleHashToCells);
    }
    tryAddVerticalCellAndQueueTopCells(cell) {
        if (!this.board.isGravityMovableCell(cell))
            return false;
        (0, CellsOffsets_1.getAdjacentCells)(cell, ['topLeft', 'top', 'topRight']).forEach((adjacentCell) => {
            this.nextRowCellsKeeper.add(adjacentCell);
        });
        const bottomCell = (0, CellsOffsets_1.getAdjacentCell)(cell, 'bottom');
        if (this.board.isGravityLandingCell(bottomCell) || this.flaggedByGravityCells.has(bottomCell)) {
            if (!this.board.isTunnel(cell) && this.board.isTunnel(bottomCell) && !this.canFallThroughTunnel(bottomCell)) {
                // avoid tunnel traffic congestion
                return false;
            }
            if (this.board.hasGem(cell) && !this.reservedCells.has(bottomCell)) {
                this.cellsSwapsHashes.add((0, CellsHelpers_1.cellsToDoubleHash)([cell, bottomCell]));
                this.flaggedByGravityCells.delete(bottomCell);
                this.flaggedByGravityCells.add(cell);
                this.reservedCells.add(bottomCell);
            }
            return true;
        }
        return false;
    }
    canFallThroughTunnel(tunnelEntryCell) {
        let tunnelsGemsCount = 0;
        let emptyCellsAfterTunnel = 0;
        for (let { row } = tunnelEntryCell; row < this.board.grid.getRows(); row++) {
            const cell = { col: tunnelEntryCell.col, row };
            if (this.board.isTunnel(cell)) {
                if (this.board.hasGem(cell)) {
                    tunnelsGemsCount++;
                }
                continue;
            }
            if (!(this.board.isGravityLandingCell(cell) || this.flaggedByGravityCells.has(cell))) {
                break;
            }
            else if (this.board.isEmptyCell(cell)) {
                emptyCellsAfterTunnel++;
            }
        }
        return emptyCellsAfterTunnel > tunnelsGemsCount;
    }
    tryAddDiagonalGravityCell(cell) {
        if (!this.board.isGravityMovableCell(cell))
            return false;
        (0, CellsOffsets_1.getAdjacentCells)(cell, ['topLeft', 'top', 'topRight']).forEach((adjacentCell) => {
            this.nextRowCellsKeeper.add(adjacentCell);
        });
        let added = false;
        (0, CellsOffsets_1.getAdjacentCells)(cell, ['left', 'right']).forEach((adjacentCell) => {
            const topDiagonalCellMoving = this.board.isGravityLandingCell(adjacentCell) &&
                this.board.isGravityMovingCell((0, CellsOffsets_1.getAdjacentCell)(adjacentCell, 'top'));
            if (topDiagonalCellMoving ||
                this.flaggedByGravityCells.has(cell) ||
                this.board.isGravityMovingCell(adjacentCell) ||
                this.flaggedByGravityCells.has(adjacentCell) ||
                this.board.isSpawnerCell((0, CellsOffsets_1.getAdjacentCell)(adjacentCell, 'bottom')) ||
                added) {
                return;
            }
            const diagonalCell = (0, CellsOffsets_1.getAdjacentCell)(adjacentCell, 'bottom');
            if (!(this.board.isGravityLandingCell(diagonalCell) || this.flaggedByGravityCells.has(diagonalCell)))
                return;
            if (this.board.hasGem(cell) &&
                !this.reservedCells.has(diagonalCell) &&
                !this.isColumnAboveGravityMoving(diagonalCell) &&
                !this.board.isTunnel(diagonalCell)) {
                this.cellsSwapsHashes.add((0, CellsHelpers_1.cellsToDoubleHash)([cell, diagonalCell]));
                this.flaggedByGravityCells.delete(diagonalCell);
                this.flaggedByGravityCells.add(cell);
                this.reservedCells.add(diagonalCell);
                added = true;
            }
        });
        return added;
    }
    isColumnAboveGravityMoving(cell) {
        let checkCell = cell;
        let gravityMoving = false;
        while (true) {
            checkCell = (0, CellsOffsets_1.getAdjacentCell)(checkCell, 'top');
            if (!this.board.hasBack(checkCell) || this.board.isMoveBlocked(checkCell)) {
                break;
            }
            if (this.board.hasGem(checkCell) || this.board.isSpawnerCell(checkCell)) {
                gravityMoving = true;
                break;
            }
        }
        return gravityMoving;
    }
}
exports.GravityCellsSwapsCollector = GravityCellsSwapsCollector;
//# sourceMappingURL=GravityCellsSwapsCollector.js.map