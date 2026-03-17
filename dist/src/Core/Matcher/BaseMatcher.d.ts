import { Gem, SwapGems } from '../Board/BoardTypes';
import { IMatcher, Match, MatcherBoard } from './MatcherTypes';
import { IPattern } from './Patterns/PatternsTypes';
type MatcherProps<Params extends Record<string, unknown>> = {
    patterns: IPattern<Params>[];
};
export declare abstract class BaseMatcher<Params extends Record<string, unknown>> implements IMatcher {
    protected readonly patterns: IPattern<Params>[];
    protected board: MatcherBoard;
    constructor(props: MatcherProps<Params>);
    init(props: {
        board: MatcherBoard;
        generateMatchId: () => string;
    }): void;
    abstract findMatches(matchCheckGems: Gem[], swapGems: SwapGems): Match[];
    abstract clone(): IMatcher;
}
export {};
