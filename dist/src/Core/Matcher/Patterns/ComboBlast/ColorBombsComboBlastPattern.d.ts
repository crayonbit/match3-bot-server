import type { ColorBombsComboBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class ColorBombsComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "colorBombsComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): ColorBombsComboBlastMatch | null;
    private findTargetCells;
    clone(): ColorBombsComboBlastPattern;
}
