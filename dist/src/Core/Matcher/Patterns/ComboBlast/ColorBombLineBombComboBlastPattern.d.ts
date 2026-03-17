import type { ColorBombLineBombComboBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class ColorBombLineBombComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "colorBombLineBombComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): ColorBombLineBombComboBlastMatch | null;
    clone(): ColorBombLineBombComboBlastPattern;
}
