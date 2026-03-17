import type { Gem, LevelGridItemKey } from '../../Board/BoardTypes';
import { Cell } from '../../Types';
import { Size } from '../../Utils/Geom/GeomTypes';
import type { Match, MatcherBoard } from '../MatcherTypes';
export type PatternProps = {
    board: MatcherBoard;
    generateMatchId: () => string;
};
export interface IPattern<T extends Record<string, unknown>> {
    readonly name: PatternName;
    tryCreateMatch(params: T): Match | null;
    tryCreateAfterMatch(params: T, matches: Match[]): Match | null;
    init(props: PatternProps): void;
    clone(): IPattern<T>;
}
export interface PatternData<T = Gem> {
    top: T[];
    topLeft: T[];
    right: T[];
    topRight: T[];
    bottom: T[];
    bottomRight: T[];
    left: T[];
    bottomLeft: T[];
    horizontal: T[];
    vertical: T[];
    diagonalUp: T[];
    diagonalDown: T[];
}
export type RegularPatternName = 'threeInARowPattern' | 'fourInARowPattern' | 'fiveInARowPattern' | 'twoByTwoPattern' | 'crossRowsPattern' | 'dropGoalPattern';
export type BlastPatternName = 'lineBombBlastPattern' | 'crossBombBlastPattern' | 'rocketBlastPattern' | 'colorBombBlastPattern' | 'bigBombBlastPattern' | 'lineBombsComboBlastPattern' | 'lineBombBigBombComboBlastPattern' | 'bigBombsComboBlastPattern' | 'rocketLineBombComboBlastPattern' | 'rocketBigBombComboBlastPattern' | 'rocketsComboBlastPattern' | 'colorBombLineBombComboBlastPattern' | 'colorBombBigBombComboBlastPattern' | 'colorBombRocketComboBlastPattern' | 'colorBombsComboBlastPattern';
export type PatternName = RegularPatternName | BlastPatternName;
export type CellWithPrio = Cell & {
    priority: number;
};
export type CellItemWithPrio = CellWithPrio & {
    entityId?: string;
    layerKey?: LevelGridItemKey;
};
export type CellItemWithPrioAndSize = CellItemWithPrio & {
    size: Size;
    sizeCanUnwrap: boolean;
};
export type CellItem = Omit<CellItemWithPrio, 'priority'>;
