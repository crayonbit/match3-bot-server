"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellsKeeper = void 0;
const CellsHelpers_1 = require("./CellsHelpers");
class CellsKeeper {
    constructor() {
        this.cellsHash = new Set();
    }
    add(cells) {
        cells = Array.isArray(cells) ? cells : [cells];
        cells.forEach((cell) => {
            const cellHash = (0, CellsHelpers_1.cellToHash)(cell);
            if (this.cellsHash.has(cellHash)) {
                return;
            }
            this.cellsHash.add(cellHash);
        });
    }
    delete(cells) {
        if (!Array.isArray(cells)) {
            if (typeof cells === 'string') {
                this.cellsHash.delete(cells);
            }
            else {
                this.cellsHash.delete((0, CellsHelpers_1.cellToHash)(cells));
            }
        }
        else {
            cells.forEach((cell) => this.delete(cell));
        }
    }
    has(cell) {
        if (typeof cell === 'string') {
            return this.cellsHash.has(cell);
        }
        return this.cellsHash.has((0, CellsHelpers_1.cellToHash)(cell));
    }
    getCells() {
        return Array.from(this.cellsHash).map((hash) => (0, CellsHelpers_1.hashToCell)(hash));
    }
    clear() {
        this.cellsHash.clear();
    }
    getCount() {
        return this.cellsHash.size;
    }
}
exports.CellsKeeper = CellsKeeper;
//# sourceMappingURL=CellsKeeper.js.map