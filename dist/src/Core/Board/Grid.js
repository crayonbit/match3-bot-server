"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
/**
 * Keeps board data and provides methods to work with it.
 */
class Grid {
    constructor() {
        this.maxCols = 0;
        this.maxRows = 0;
        this.cols = 0;
        this.rows = 0;
        this.data = [];
    }
    create(maxCols, maxRows, getCellValue) {
        this.data.length = 0;
        this.maxCols = maxCols;
        this.maxRows = maxRows;
        let cols = 0;
        let rows = 0;
        for (let col = 0; col < maxCols; col++) {
            this.data.push([]);
            for (let row = 0; row < maxRows; row++) {
                const cell = { col, row };
                const cellValue = getCellValue(cell);
                this.data[col].push(cellValue);
                for (const cellLayerValue of Object.values(cellValue)) {
                    if (cellLayerValue !== null) {
                        cols = Math.max(cols, col + 1);
                        rows = Math.max(rows, row + 1);
                    }
                }
            }
        }
        this.cols = cols;
        this.rows = rows;
    }
    get(cell) {
        if (this.isInGrid(cell)) {
            return this.data[cell.col][cell.row];
        }
        return null;
    }
    getAll() {
        return this.filter(() => true, true);
    }
    set(cell, value) {
        cell = { ...cell };
        if (this.isInGrid(cell)) {
            this.data[cell.col][cell.row] = value;
        }
    }
    swap(cellA, cellB) {
        const valueA = this.get(cellA);
        const valueB = this.get(cellB);
        this.set(cellA, valueB);
        this.set(cellB, valueA);
    }
    isInGrid(cell) {
        if (Array.isArray(cell)) {
            return cell.length > 0 && cell.every((c) => this.isCellInGrid(c));
        }
        return this.isCellInGrid(cell);
    }
    isCellInGrid(cell) {
        return cell.col >= 0 && cell.col < this.cols && cell.row >= 0 && cell.row < this.rows;
    }
    loop(callback, skipEmpty = false) {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                const value = this.data[col][row];
                const cell = { col, row };
                if (skipEmpty && value === null)
                    continue;
                const completed = callback(value, cell);
                if (completed)
                    return;
            }
        }
    }
    find(test) {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                const value = this.data[col][row];
                const cell = { col, row };
                if (test(value, cell))
                    return value;
            }
        }
        return null;
    }
    filter(callback, skipEmpty = false) {
        const result = [];
        this.loop((value, cell) => {
            if (callback(value, cell))
                result.push(value);
            return false;
        }, skipEmpty);
        return result;
    }
    fillGrid(value) {
        this.loop((v, cell) => {
            this.data[cell.col][cell.row] = value;
            return false;
        });
    }
    export(exporter) {
        const result = [];
        for (let col = 0; col < this.maxCols; col++) {
            result.push([]);
            for (let row = 0; row < this.maxRows; row++) {
                result[col].push(exporter(this.data[col][row], { col, row }));
            }
        }
        return result;
    }
    getDataClone() {
        return structuredClone(this.data);
    }
    getDataOnCells() {
        const result = [];
        this.loop((value, cell) => {
            if (value !== null) {
                result.push({ cell, data: structuredClone(value) });
            }
            return false;
        });
        return result;
    }
    clone() {
        const grid = new Grid();
        grid.data = this.getDataClone();
        grid.maxCols = this.maxCols;
        grid.maxRows = this.maxRows;
        grid.cols = this.cols;
        grid.rows = this.rows;
        return grid;
    }
    reset() {
        this.data.length = 0;
        this.maxCols = 0;
        this.maxRows = 0;
        this.cols = 0;
        this.rows = 0;
    }
    getCols() {
        return this.cols;
    }
    getRows() {
        return this.rows;
    }
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map