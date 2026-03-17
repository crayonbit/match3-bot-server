import { Gem, GemCoreName } from '../../../Board/BoardTypes';
import { Cell } from '../../../Types';
import { ICellsKeeperReadOnly } from '../../../Utils/UtilsTypes';
import type { CreateBlastMatchParams, RocketLineBombComboBlastMatch, TargetCellItem } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class RocketLineBombComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "rocketLineBombComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): RocketLineBombComboBlastMatch | null;
    findDistantCell(props: {
        blastGem: Gem;
        lineBombGem: Gem<GemCoreName.LineBomb>;
        kickCells: Cell[];
        usedTargetCells: ICellsKeeperReadOnly;
        randomizeArray: <T>(array: T[]) => T[];
    }): TargetCellItem;
    clone(): RocketLineBombComboBlastPattern;
}
