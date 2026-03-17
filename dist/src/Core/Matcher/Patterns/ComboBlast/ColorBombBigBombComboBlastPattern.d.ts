import type { ColorBombBigBombComboBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class ColorBombBigBombComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "colorBombBigBombComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): ColorBombBigBombComboBlastMatch | null;
    clone(): ColorBombBigBombComboBlastPattern;
}
