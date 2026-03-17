import type { BoosterPlayData, BoosterType, BoardGetters, ILevelGridItemData, LevelGridDataOnCell, Move, Gem } from '../Core/Board/BoardTypes';
import type { TaskDataWithName } from '../Core/TaskManager/TaskManagerTypes';
import type { Cell } from '../Core/Types';
export type IsClickableProps = {
    cell: Cell;
    callback: (response: boolean) => void;
};
export type IsSwappableProps = {
    cell: Cell;
    isActiveCell: boolean;
    callback: (response: boolean) => void;
};
export type IsBoosterPlayableProps = BoosterPlayData & {
    callback: (response: boolean) => void;
};
export type OnStartSwapProps = {
    cellA: Cell;
    cellB: Cell;
};
export type OnBoosterToggleProps = {
    boosterType: BoosterType;
    selected: boolean;
};
export type OnBoostersEnableChangedProps = {
    enabled: boolean;
};
export type OnGetLevelGridItemDataProps = {
    cell: Cell;
    callback: (response: ILevelGridItemData | null) => void;
};
export type OnGetBoardMovesProps = {
    callback: (response: Move[]) => void;
};
export type OnTaskStartedProps = TaskDataWithName;
export type OnTaskFinishedProps = TaskDataWithName;
export type OnGetLevelGridDataOnCellsProps = {
    callback: (response: LevelGridDataOnCell[]) => void;
    filter?: OnGetLevelGridDataOnCellsFilter;
};
export type OnGetLevelGridDataOnCellsFilter = (data: LevelGridDataOnCell, boardGetters: BoardGetters) => boolean;
export type OnGetGemOnCellProps = {
    cell: Cell;
    callback: (response: Gem | null) => void;
};
