import type { Cell } from '../../../Types';
import { ICellsKeeperReadOnly } from '../../../Utils/UtilsTypes';
import type { CreateBlastMatchParams, RocketBlastMatch, TargetCellItem } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class RocketBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "rocketBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): RocketBlastMatch | null;
    findDistantCell(props: {
        blastCell: Cell;
        kickCells: Cell[];
        usedTargetCells: ICellsKeeperReadOnly;
        randomizeArray: <T>(array: T[]) => T[];
    }): TargetCellItem;
    private getTargetDistance;
    clone(): RocketBlastPattern;
}
