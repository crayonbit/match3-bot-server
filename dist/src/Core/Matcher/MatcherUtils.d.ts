import { BaseChangingGemMatch, BlastMatch, Match, RegularMatch } from './MatcherTypes';
import { BlastPatternName } from './Patterns/PatternsTypes';
export declare function isBaseBlastMatch(match: Match): match is BlastMatch;
export declare function isBaseChangingGemMatch(match: Partial<Match>): match is BaseChangingGemMatch;
export declare function isBombCreationMatch(match: Match): match is RegularMatch;
export declare const blastPatternNames: BlastPatternName[];
