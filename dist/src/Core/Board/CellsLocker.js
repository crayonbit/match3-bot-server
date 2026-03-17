"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellsLocker = void 0;
const CellsHelpers_1 = require("../Utils/CellsHelpers");
/**
 * CellsLocker allows you to lock cells with a specific reason.
 * Used by concurrent step generators to prevent actions on already processed cells.
 */
class CellsLocker {
    constructor() {
        this.cols = 0;
        this.rows = 0;
    }
    init(props) {
        const { signals, cols, rows } = props;
        this.signals = signals;
        this.cols = cols;
        this.rows = rows;
        this.cellsLocks = new Array(cols * rows);
    }
    addLock(cell, lock) {
        if (this.hasLock(cell, lock, true))
            return;
        const index = this.getIndex(cell);
        this.cellsLocks[index] = this.cellsLocks[index] || [];
        this.cellsLocks[index].push(lock);
        this.signals.get('onAddCellLock').dispatch({ cell, lock, allLocks: this.getLocksForCell(cell) });
    }
    getLocks() {
        const locks = [];
        this.cellsLocks.forEach((cellLocks, index) => {
            if (!cellLocks?.length)
                return;
            const cell = (0, CellsHelpers_1.getCellByIndex)(index, this.cols);
            locks.push({ cell, locks: [...cellLocks] });
        });
        return locks;
    }
    getIndex(cell) {
        return (0, CellsHelpers_1.getCellIndex)(cell, this.cols);
    }
    getCellByIndex(index) {
        return (0, CellsHelpers_1.getCellByIndex)(index, this.cols);
    }
    getCellsWithLock(lock) {
        return this.getLockedCells().filter((cell) => this.hasLock(cell, lock));
    }
    getLockedCells() {
        const cells = [];
        this.cellsLocks.forEach((cellsLocks, index) => {
            if (!cellsLocks?.length)
                return;
            cells.push(this.getCellByIndex(index));
        });
        return cells;
    }
    hasLock(cell, lock, checkMeta) {
        const cellLocks = this.getLocksForCell(cell);
        if (!cellLocks?.length)
            return false;
        return cellLocks.some((cellLock) => this.isLocksEqual(cellLock, lock, checkMeta));
    }
    hasLockByOtherGenerators(cell, lock) {
        const cellLocks = this.getLocksForCell(cell);
        if (!cellLocks?.length)
            return false;
        return cellLocks.some((cellLock) => {
            return cellLock.generatorId !== lock.generatorId && lock.reason === cellLock.reason;
        });
    }
    hasLockReasonsByOtherGenerators(cell, currentGeneratorId) {
        const cellLocks = this.getLocksForCell(cell);
        if (!cellLocks?.length)
            return false;
        return cellLocks.some((cellLock) => {
            return cellLock.generatorId !== currentGeneratorId;
        });
    }
    hasLockReasonByOtherGenerators(cell, currentGeneratorId, reason) {
        const cellLocks = this.getLocksForCell(cell);
        if (!cellLocks?.length)
            return false;
        return cellLocks.some((cellLock) => {
            return cellLock.generatorId !== currentGeneratorId && cellLock.reason === reason;
        });
    }
    hasLockReason(cell, reason, meta) {
        if (Array.isArray(reason)) {
            return reason.some((r) => this.hasLockReason(cell, r, meta));
        }
        const cellLocks = this.getLocksForCell(cell);
        if (!cellLocks?.length)
            return false;
        return cellLocks.some((cellLock) => {
            if (meta && cellLock.meta !== meta)
                return false;
            return cellLock.reason === reason;
        });
    }
    hasSomeLockReason(cell, reasons, meta) {
        return reasons.some((reason) => this.hasLockReason(cell, reason, meta));
    }
    hasLockReasons(cell) {
        const cellLocks = this.getLocksForCell(cell);
        return cellLocks ? cellLocks.length > 0 : false;
    }
    removeLock(cell, lock) {
        const cellLocks = this.getLocksForCell(cell);
        if (!cellLocks?.length)
            return;
        const index = this.getIndex(cell);
        this.cellsLocks[index] = this.cellsLocks[index].filter((cellLock) => {
            return !this.isLocksEqual(cellLock, lock, !!lock.meta);
        });
        this.signals.get('onRemoveCellLock').dispatch({ cell, lock, allLocks: this.getLocksForCell(cell) });
    }
    getLocksForCell(cell) {
        return this.cellsLocks[this.getIndex(cell)] ?? null;
    }
    isLocksEqual(a, b, checkMeta) {
        if (checkMeta && a.meta !== b.meta)
            return false;
        return a.generatorId === b.generatorId && a.reason === b.reason && a.uniqueId === b.uniqueId;
    }
    clone(signals) {
        const cellsLocker = new CellsLocker();
        cellsLocker.cols = this.cols;
        cellsLocker.rows = this.rows;
        cellsLocker.cellsLocks = structuredClone(this.cellsLocks);
        cellsLocker.signals = signals;
        return cellsLocker;
    }
    reset() {
        this.cellsLocks = new Array(this.cols * this.rows);
    }
}
exports.CellsLocker = CellsLocker;
//# sourceMappingURL=CellsLocker.js.map