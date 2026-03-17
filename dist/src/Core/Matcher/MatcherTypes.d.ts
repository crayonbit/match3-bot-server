import type { Gem, GemCoreName, IBoard, SwapGems } from '../Board/BoardTypes';
import type { Orientation, Cell } from '../Types';
import { ICellsKeeperReadOnly } from '../Utils/UtilsTypes';
import type { CellItem, CellItemWithPrio, PatternData, PatternName } from './Patterns/PatternsTypes';
export interface BaseMatch {
    readonly patternName: PatternName;
    readonly id: string;
    readonly gems: Gem[];
    readonly hash: string;
}
export type TargetCellKind = 'nearby' | 'distant';
export type TargetCell = {
    kind: TargetCellKind;
} & Cell;
export type TargetCellsGroupsData = {
    targetCellsGroups: TargetCell[][];
    maxIndex: number;
};
export type TargetCellItem = CellItem & {
    kind: TargetCellKind;
};
export type TargetCellItemWithPrio = CellItemWithPrio & {
    kind: TargetCellKind;
};
export interface BaseBlastMatch<T extends GemCoreName> extends BaseMatch {
    blastGem: Gem<T>;
    targetCells: TargetCell[];
}
export interface BaseChangingGemMatch extends BaseMatch {
    changingGem: Gem;
}
export interface ThreeInARowMatch extends BaseMatch {
    patternName: 'threeInARowPattern';
}
export interface FourInARowMatch extends BaseChangingGemMatch {
    patternName: 'fourInARowPattern';
    orientation: Orientation;
}
export interface FiveInARowMatch extends BaseChangingGemMatch {
    patternName: 'fiveInARowPattern';
}
export interface TwoByTwoMatch extends BaseChangingGemMatch {
    patternName: 'twoByTwoPattern';
}
export interface CrossRowsMatch extends BaseChangingGemMatch {
    patternName: 'crossRowsPattern';
}
export interface DropGoalMatch extends BaseMatch {
    patternName: 'dropGoalPattern';
}
export interface LineBombBlastMatch extends BaseBlastMatch<GemCoreName.LineBomb> {
    patternName: 'lineBombBlastPattern';
    targetCellsGroupsData: TargetCellsGroupsData;
}
export interface CrossBombBlastMatch extends BaseBlastMatch<GemCoreName.CrossBomb> {
    patternName: 'crossBombBlastPattern';
    targetCellsGroupsData: TargetCellsGroupsData;
}
export interface RocketBlastMatch extends BaseBlastMatch<GemCoreName.Rocket> {
    patternName: 'rocketBlastPattern';
    targetCellItems: TargetCellItem[];
}
export interface ColorBombBlastMatch extends BaseBlastMatch<GemCoreName.ColorBomb> {
    patternName: 'colorBombBlastPattern';
}
export interface BigBombBlastMatch extends BaseBlastMatch<GemCoreName.BigBomb> {
    patternName: 'bigBombBlastPattern';
}
export interface LineBombsComboBlastMatch extends BaseBlastMatch<GemCoreName.LineBomb> {
    patternName: 'lineBombsComboBlastPattern';
}
export interface LineBombBigBombComboBlastMatch extends BaseBlastMatch<GemCoreName.LineBomb | GemCoreName.BigBomb> {
    patternName: 'lineBombBigBombComboBlastPattern';
}
export interface BigBombsComboBlastMatch extends BaseBlastMatch<GemCoreName.BigBomb> {
    patternName: 'bigBombsComboBlastPattern';
}
export interface RocketLineBombComboBlastMatch extends BaseBlastMatch<GemCoreName.Rocket | GemCoreName.LineBomb> {
    patternName: 'rocketLineBombComboBlastPattern';
    targetCellItems: TargetCellItem[];
}
export interface RocketBigBombComboBlastMatch extends BaseBlastMatch<GemCoreName.Rocket | GemCoreName.BigBomb> {
    patternName: 'rocketBigBombComboBlastPattern';
    targetCellItems: TargetCellItem[];
}
export interface RocketsComboBlastMatch extends BaseBlastMatch<GemCoreName.Rocket> {
    patternName: 'rocketsComboBlastPattern';
    targetCellItems: TargetCellItem[];
    canChangeTargetCell: boolean;
}
export interface ColorBombLineBombComboBlastMatch extends BaseBlastMatch<GemCoreName.ColorBomb | GemCoreName.LineBomb> {
    patternName: 'colorBombLineBombComboBlastPattern';
}
export interface ColorBombBigBombComboBlastMatch extends BaseBlastMatch<GemCoreName.ColorBomb | GemCoreName.BigBomb> {
    patternName: 'colorBombBigBombComboBlastPattern';
}
export interface ColorBombRocketComboBlastMatch extends BaseBlastMatch<GemCoreName.ColorBomb | GemCoreName.Rocket> {
    patternName: 'colorBombRocketComboBlastPattern';
}
export interface ColorBombsComboBlastMatch extends BaseBlastMatch<GemCoreName.ColorBomb> {
    patternName: 'colorBombsComboBlastPattern';
}
export type RegularMatch = ThreeInARowMatch | FourInARowMatch | FiveInARowMatch | TwoByTwoMatch | CrossRowsMatch | DropGoalMatch;
export type BlastMatch = LineBombBlastMatch | CrossBombBlastMatch | RocketBlastMatch | ColorBombBlastMatch | BigBombBlastMatch | LineBombsComboBlastMatch | LineBombBigBombComboBlastMatch | BigBombsComboBlastMatch | RocketLineBombComboBlastMatch | RocketBigBombComboBlastMatch | RocketsComboBlastMatch | ColorBombLineBombComboBlastMatch | ColorBombBigBombComboBlastMatch | ColorBombRocketComboBlastMatch | ColorBombsComboBlastMatch;
export type Match = RegularMatch | BlastMatch;
export type PatternNameToMatch = {
    threeInARowPattern: ThreeInARowMatch;
    fourInARowPattern: FourInARowMatch;
    fiveInARowPattern: FiveInARowMatch;
    twoByTwoPattern: TwoByTwoMatch;
    crossRowsPattern: CrossRowsMatch;
    dropGoalPatter: DropGoalMatch;
    lineBombBlastPattern: LineBombBlastMatch;
    crossBombBlastPattern: CrossBombBlastMatch;
    rocketBlastPattern: RocketBlastMatch;
    colorBombBlastPattern: ColorBombBlastMatch;
    bigBombBlastPattern: BigBombBlastMatch;
    lineBombsComboBlastPattern: LineBombsComboBlastMatch;
    lineBombBigBombComboBlastPattern: LineBombBigBombComboBlastMatch;
    bigBombsComboBlastPattern: BigBombsComboBlastMatch;
    rocketLineBombComboBlastPattern: RocketLineBombComboBlastMatch;
    rocketBigBombComboBlastPattern: RocketBigBombComboBlastMatch;
    rocketsComboBlastPattern: RocketsComboBlastMatch;
    colorBombLineBombComboBlastPattern: ColorBombLineBombComboBlastMatch;
    colorBombBigBombComboBlastPattern: ColorBombBigBombComboBlastMatch;
    colorBombRocketComboBlastPattern: ColorBombRocketComboBlastMatch;
    colorBombsComboBlastPattern: ColorBombsComboBlastMatch;
};
export type CreateRegularMatchParams = {
    patternData: PatternData;
    swapGems: SwapGems;
};
export type CreateBlastMatchParams = {
    matchCheckGems: Gem[];
    swapGems: SwapGems;
    justUsedCells: ICellsKeeperReadOnly;
};
export type MatcherBoard = Pick<IBoard, 'getGem' | 'isGravityMovingCell' | 'isMatchBlocked' | 'grid' | 'hasGem' | 'isInGrid' | 'randomGenerator' | 'gemsLayer' | 'hasBack' | 'hasDropGoal' | 'hasDropGoals' | 'progressManager' | 'locker' | 'createCellsKeeper' | 'isAnythingAbove' | 'logger' | 'getGoalCells' | 'getLayer' | 'getLayerItemSize' | 'regularMatcher'>;
export interface IMatcher {
    init(props: {
        board: MatcherBoard;
        generateMatchId: () => string;
    }): void;
    findMatches(matchCheckGems: Gem[], swapGems: SwapGems): Match[];
    clone(): IMatcher;
}
