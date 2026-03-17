import type { CreateRegularMatchParams, TwoByTwoMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class TwoByTwoPattern extends Pattern<CreateRegularMatchParams> {
    readonly name = "twoByTwoPattern";
    tryCreateMatch(params: CreateRegularMatchParams): TwoByTwoMatch | null;
    private findDoubleGems;
    private findBlastGem;
    private findBlastGemFromSwapGems;
    private findBlastGemInGems;
    private filterUniqueGems;
    private findTwoByTwoPattern;
    private filterTwoByTwoPattern;
    clone(): TwoByTwoPattern;
}
