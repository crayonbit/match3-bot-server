import type { CreateBlastMatchParams, LineBombBigBombComboBlastMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class LineBombBigBombComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "lineBombBigBombComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): LineBombBigBombComboBlastMatch | null;
    clone(): LineBombBigBombComboBlastPattern;
}
