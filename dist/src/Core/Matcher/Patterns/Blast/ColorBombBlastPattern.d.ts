import type { ColorBombBlastMatch, CreateBlastMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class ColorBombBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "colorBombBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): ColorBombBlastMatch | null;
    private findColorBomb;
    private findTargetCells;
    clone(): ColorBombBlastPattern;
}
