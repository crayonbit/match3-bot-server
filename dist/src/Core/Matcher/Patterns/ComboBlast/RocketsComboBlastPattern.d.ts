import type { CreateBlastMatchParams, RocketsComboBlastMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class RocketsComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "rocketsComboBlastPattern";
    private readonly distantTargetCellsToFind;
    private canChangeTargetCell;
    tryCreateMatch(params: CreateBlastMatchParams): RocketsComboBlastMatch | null;
    private findDistantCells;
    private getTargetDistance;
    clone(): RocketsComboBlastPattern;
}
