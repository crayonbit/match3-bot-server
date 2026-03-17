import { Gem, SwapGems } from '../Board/BoardTypes';
import { BaseMatcher } from './BaseMatcher';
import { CreateRegularMatchParams, IMatcher, Match } from './MatcherTypes';
export declare class RegularMatcher extends BaseMatcher<CreateRegularMatchParams> implements IMatcher {
    findMatches(matchCheckGems: Gem[], swapGems: SwapGems): Match[];
    private filterUsedGemsFromPatternData;
    private collectRegularPatternData;
    private collectMatchableGems;
    clone(): IMatcher;
}
