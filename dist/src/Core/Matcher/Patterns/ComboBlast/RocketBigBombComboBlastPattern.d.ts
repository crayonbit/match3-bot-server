import { Gem, GemCoreName } from '../../../Board/BoardTypes';
import { Cell } from '../../../Types';
import { ICellsKeeperReadOnly } from '../../../Utils/UtilsTypes';
import type { CreateBlastMatchParams, RocketBigBombComboBlastMatch, TargetCellItem } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class RocketBigBombComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "rocketBigBombComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): RocketBigBombComboBlastMatch | null;
    findDistantCell(props: {
        blastGem: Gem;
        bigBombGem: Gem<GemCoreName.BigBomb>;
        kickCells: Cell[];
        usedTargetCells: ICellsKeeperReadOnly;
        randomizeArray: <T>(array: T[]) => T[];
    }): TargetCellItem;
    clone(): RocketBigBombComboBlastPattern;
}
