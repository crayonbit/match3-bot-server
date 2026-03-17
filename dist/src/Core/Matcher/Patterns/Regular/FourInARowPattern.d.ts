import type { CreateRegularMatchParams, FourInARowMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class FourInARowPattern extends Pattern<CreateRegularMatchParams> {
    readonly name = "fourInARowPattern";
    tryCreateMatch(params: CreateRegularMatchParams): FourInARowMatch | null;
    private getOrientation;
    private determineBlastGem;
    clone(): FourInARowPattern;
}
