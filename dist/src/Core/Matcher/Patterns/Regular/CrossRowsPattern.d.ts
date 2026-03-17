import type { CrossRowsMatch, CreateRegularMatchParams } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class CrossRowsPattern extends Pattern<CreateRegularMatchParams> {
    readonly name = "crossRowsPattern";
    private readonly maxGemsInRow;
    tryCreateMatch(params: CreateRegularMatchParams): CrossRowsMatch | null;
    private isCrossPattern;
    private determineCrossGem;
    clone(): CrossRowsPattern;
}
