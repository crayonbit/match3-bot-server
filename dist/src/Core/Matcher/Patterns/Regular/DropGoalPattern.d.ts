import type { CreateRegularMatchParams, DropGoalMatch, Match } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class DropGoalPattern extends Pattern<CreateRegularMatchParams> {
    readonly name = "dropGoalPattern";
    tryCreateMatch(params: CreateRegularMatchParams): DropGoalMatch | null;
    private getDropGoalGems;
    tryCreateAfterMatch(params: CreateRegularMatchParams, matches: Match[]): DropGoalMatch | null;
    clone(): DropGoalPattern;
}
