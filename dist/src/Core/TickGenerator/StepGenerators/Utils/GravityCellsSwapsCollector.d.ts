import { Cell } from '../../../Types';
import { GravityCellsSwapsCollectorBoard, IGravityCellsSwapsCollector } from '../../TickGeneratorTypes';
export declare class GravityCellsSwapsCollector implements IGravityCellsSwapsCollector {
    private readonly board;
    private readonly flaggedByGravityCells;
    private readonly cellsSwapsHashes;
    private readonly nextRowCellsKeeper;
    private readonly reservedCells;
    constructor(board: GravityCellsSwapsCollectorBoard);
    collect(board: GravityCellsSwapsCollectorBoard, cells: Cell[]): Cell[][];
    private tryAddVerticalCellAndQueueTopCells;
    private canFallThroughTunnel;
    private tryAddDiagonalGravityCell;
    private isColumnAboveGravityMoving;
}
