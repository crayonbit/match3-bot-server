import type { CreateBlastMatchParams, CrossBombBlastMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class CrossBombBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "crossBombBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): CrossBombBlastMatch | null;
    private collectTargetCells;
    private prepareTargetCellsForAnimation;
    clone(): CrossBombBlastPattern;
}
