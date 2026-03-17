import { Cell } from '../../../Types';
export declare function getTargetCellsGroupedByDelays(cells: Cell[], rippleDelays: number[][], minCol: number, minRow: number): Map<number, Cell[]>;
export declare function getMinColAndRow(cells: Cell[]): {
    minCol: number;
    minRow: number;
};
export declare function processCellsGroupedByDelays(cellsGroupedByDelays: Map<number, Cell[]>, rippleTicksToWait: number, kickCell: (cell: Cell) => void, waitTicks: (ticks: number) => IterableIterator<void>): IterableIterator<void>;
