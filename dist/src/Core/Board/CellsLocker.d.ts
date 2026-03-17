import type { Cell, Props } from '../Types';
import type { CellLock, CellLockReason, ICellsLocker, LockerSignals, LocksWithCell } from './BoardTypes';
/**
 * CellsLocker allows you to lock cells with a specific reason.
 * Used by concurrent step generators to prevent actions on already processed cells.
 */
export declare class CellsLocker implements ICellsLocker {
    private signals;
    private cellsLocks;
    private cols;
    private rows;
    init(props: Props<ICellsLocker, 'init'>): void;
    addLock(cell: Cell, lock: CellLock): void;
    getLocks(): LocksWithCell[];
    private getIndex;
    private getCellByIndex;
    getCellsWithLock(lock: CellLock): Cell[];
    getLockedCells(): Cell[];
    hasLock(cell: Cell, lock: CellLock, checkMeta?: boolean): boolean;
    hasLockByOtherGenerators(cell: Cell, lock: CellLock): boolean;
    hasLockReasonsByOtherGenerators(cell: Cell, currentGeneratorId: number): boolean;
    hasLockReasonByOtherGenerators(cell: Cell, currentGeneratorId: number, reason: CellLockReason): boolean;
    hasLockReason(cell: Cell, reason: CellLockReason | CellLockReason[], meta?: string): boolean;
    hasSomeLockReason(cell: Cell, reasons: CellLockReason[], meta?: string): boolean;
    hasLockReasons(cell: Cell): boolean;
    removeLock(cell: Cell, lock: CellLock): void;
    private getLocksForCell;
    isLocksEqual(a: CellLock, b: CellLock, checkMeta?: boolean): boolean;
    clone(signals: LockerSignals): ICellsLocker;
    reset(): void;
}
