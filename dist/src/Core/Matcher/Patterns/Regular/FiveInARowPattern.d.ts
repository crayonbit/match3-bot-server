import type { CreateRegularMatchParams, FiveInARowMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class FiveInARowPattern extends Pattern<CreateRegularMatchParams> {
    readonly name = "fiveInARowPattern";
    private readonly minGemsInRow;
    tryCreateMatch(params: CreateRegularMatchParams): FiveInARowMatch | null;
    private determineCrossGem;
    private isCrossPattern;
    private determineBlastGem;
    clone(): FiveInARowPattern;
}
