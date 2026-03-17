import { Match } from '../../../Matcher/MatcherTypes';
export declare class MatchesKeeper {
    private matches;
    add(matches: Match[]): void;
    remove(matchesIds: string[]): void;
    getAll(): Match[];
    getAllAndClear(): Match[];
    getLength(): number;
    clear(): void;
}
