import { Cell } from '../../Types';
import { ICellsKeeperReadOnly } from '../../Utils/UtilsTypes';
import { MatcherBoard, TargetCell, TargetCellKind } from '../MatcherTypes';
import { CellItemWithPrioAndSize } from './PatternsTypes';
type FilterRocketDistantCellsResult = {
    maxPrioGoalCells: CellItemWithPrioAndSize[];
    goalCells: CellItemWithPrioAndSize[];
    regularGemCells: CellItemWithPrioAndSize[];
    otherGemCells: CellItemWithPrioAndSize[];
};
export declare function filterRocketDistantCells(props: {
    board: MatcherBoard;
    matchCells: Cell[];
    kickCells: Cell[];
    usedTargetCells: ICellsKeeperReadOnly;
    randomizeArray: <T>(array: T[]) => T[];
    equalizeGoalPriorities?: boolean;
}): FilterRocketDistantCellsResult;
export declare function isRocketLastBigSizeGoalCell(goalCells: CellItemWithPrioAndSize[]): boolean;
export declare function collectTargetCellsForLine(props: {
    board: MatcherBoard;
    startCell: Cell;
    cellOffset: Cell;
    targetCellKind: TargetCellKind;
    includeStartCell?: boolean;
}): TargetCell[];
export {};
