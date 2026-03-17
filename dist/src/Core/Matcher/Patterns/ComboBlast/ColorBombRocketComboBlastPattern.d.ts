import type { ColorBombRocketComboBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class ColorBombRocketComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "colorBombRocketComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): ColorBombRocketComboBlastMatch | null;
    clone(): ColorBombRocketComboBlastPattern;
}
