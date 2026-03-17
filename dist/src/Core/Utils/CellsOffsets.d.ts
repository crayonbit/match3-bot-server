import { Cell, Direction } from '../Types';
export declare const cellOffsetsMap: Record<Direction, Cell>;
export declare function getCellOffsets(directions: Direction[]): Cell[];
export declare function getAdjacentCells(cell: Cell, directions: Direction[]): Cell[];
export declare function getAdjacentCell(cell: Cell, direction: Direction): Cell;
