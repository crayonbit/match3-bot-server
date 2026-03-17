import { Gem, SwapGems } from '../Board/BoardTypes';
import { BaseMatcher } from './BaseMatcher';
import { CreateBlastMatchParams, IMatcher, Match } from './MatcherTypes';
export declare class BlastMatcher extends BaseMatcher<CreateBlastMatchParams> implements IMatcher {
    findMatches(matchCheckGems: Gem[], swapGems: SwapGems): Match[];
    clone(): IMatcher;
}
