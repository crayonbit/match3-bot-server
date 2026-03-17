import type { Match, MatcherBoard } from './MatcherTypes';
import type { PatternName, IPattern, PatternProps } from './Patterns/PatternsTypes';
export declare abstract class Pattern<T extends Record<string, unknown>> implements IPattern<T> {
    readonly name: PatternName;
    protected board: MatcherBoard;
    protected generateMatchId: () => string;
    init(props: PatternProps): void;
    abstract tryCreateMatch(params: T): Match | null;
    tryCreateAfterMatch(params: T, matches: Match[]): Match | null;
    abstract clone(): IPattern<T>;
}
