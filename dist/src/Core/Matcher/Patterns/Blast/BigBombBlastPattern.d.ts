import type { BigBombBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class BigBombBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "bigBombBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): BigBombBlastMatch | null;
    private findBigBomb;
    private findTargetCells;
    clone(): BigBombBlastPattern;
}
