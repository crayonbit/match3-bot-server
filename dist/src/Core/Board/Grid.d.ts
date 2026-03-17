import type { Cell } from '../Types';
import type { IGrid } from './BoardTypes';
/**
 * Keeps board data and provides methods to work with it.
 */
export declare class Grid<T extends object> implements IGrid<T> {
    private maxCols;
    private maxRows;
    private cols;
    private rows;
    private data;
    create(maxCols: number, maxRows: number, getCellValue: (cell: Cell) => T): void;
    get(cell: Cell): T | null;
    getAll(): T[];
    set(cell: Cell, value: T): void;
    swap(cellA: Cell, cellB: Cell): void;
    isInGrid(cell: Cell | Cell[]): boolean;
    private isCellInGrid;
    loop(callback: (value: T, cell: Cell) => boolean, skipEmpty?: boolean): void;
    find(test: (value: T, cell: Cell) => boolean): T | null;
    filter(callback: (value: T, cell: Cell) => boolean, skipEmpty?: boolean): T[];
    fillGrid(value: T): void;
    export<J>(exporter: (value: T, cell: Cell) => J): J[][];
    getDataClone(): T[][];
    getDataOnCells(): {
        cell: Cell;
        data: T;
    }[];
    clone(): IGrid<T>;
    reset(): void;
    getCols(): number;
    getRows(): number;
}
