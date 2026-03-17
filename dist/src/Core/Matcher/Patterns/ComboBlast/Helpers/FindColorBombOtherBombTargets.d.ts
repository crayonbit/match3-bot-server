import { Cell } from '../../../../Types';
import { ICellsKeeperReadOnly } from '../../../../Utils/UtilsTypes';
import { MatcherBoard, TargetCell } from '../../../MatcherTypes';
export declare function findColorBombOtherBombTargets(board: MatcherBoard, swapCells: Cell[], justUsedCells: ICellsKeeperReadOnly): TargetCell[];
