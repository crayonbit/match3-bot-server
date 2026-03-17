import type { CreateBlastMatchParams, LineBombBlastMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class LineBombBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "lineBombBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): LineBombBlastMatch | null;
    private collectTargetCells;
    private prepareTargetCellsForAnimation;
    clone(): LineBombBlastPattern;
}
