import type { CreateRegularMatchParams, ThreeInARowMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class ThreeInARowPattern extends Pattern<CreateRegularMatchParams> {
    readonly name = "threeInARowPattern";
    tryCreateMatch(params: CreateRegularMatchParams): ThreeInARowMatch | null;
    clone(): ThreeInARowPattern;
}
