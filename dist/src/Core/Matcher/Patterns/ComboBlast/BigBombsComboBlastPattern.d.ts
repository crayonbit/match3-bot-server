import type { BigBombsComboBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class BigBombsComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "bigBombsComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): BigBombsComboBlastMatch | null;
    private findTargetCells;
    clone(): BigBombsComboBlastPattern;
}
