import type { Signal } from 'signals';
import type { IRawSpawn, RawGemName, RawGoalName } from '../LevelParser/LevelParserTypes';
import type { IMatcher, Match } from '../Matcher/MatcherTypes';
import type { IProgressManager } from '../ProgressManager/ProgressManagerTypes';
import type { SignalsHandlerBase } from '../SignalsHandlerBase';
import type { ISpawner } from '../Spawner/SpawnerTypes';
import type { BlastData } from '../TaskManager/TaskManagerTypes';
import type { TickIterator } from '../TickGenerator/TickGeneratorTypes';
import type { Cell, CoreConfig, Logger, Orientation, ReplayAction, StraightDirection, TilePosition } from '../Types';
import type { ICellsKeeper, IRandomGenerator } from '../Utils/UtilsTypes';
import type { BoardSignals } from './BoardSignals';
import type { BoardLayersMap, HitLayerParams, IGemsLayer } from './Layers/LayersTypes';
import type { Size } from '../Utils/Geom/GeomTypes';
import type { OnTaskFinishedProps, OnTaskStartedProps } from '../../Signals/SignalsTypes';
export declare enum LevelGridItemKey {
    Boot = "boot",
    Back = "back",
    Carpet = "carpet",
    Gem = "gem",
    Cover = "cover",
    Door = "door",
    Blast = "blast"
}
export type LayerItemKey = Exclude<LevelGridItemKey, LevelGridItemKey.Boot>;
export type GridDataOnCell<T> = {
    cell: Cell;
    data: T;
};
export type LevelGridDataOnCell = GridDataOnCell<ILevelGridItemData>;
export interface IGrid<T extends object> {
    getRows(): number;
    getCols(): number;
    create(maxCols: number, maxRows: number, getCellValue: (cell: Cell) => T): void;
    get(cell: Cell): T | null;
    getAll(): T[];
    set(cell: Cell, value: T): void;
    isInGrid(cell: Cell | Cell[]): boolean;
    loop(callback: (value: T, cell: Cell) => boolean, skipEmpty?: boolean): void;
    find(test: (value: T, cell: Cell) => boolean): T | null;
    filter(callback: (value: T, cell: Cell) => boolean, skipEmpty?: boolean): T[];
    fillGrid(value: T): void;
    export<J>(exporter: (value: T, cell: Cell) => J): J[][];
    getDataClone(): T[][];
    getDataOnCells(): GridDataOnCell<T>[];
    clone(): IGrid<T>;
    reset(): void;
}
export type KickParams = {
    matchId: string;
    startLayerKey?: LayerItemKey;
};
export type MergeGems = {
    sourceGems: Gem[];
    targetGem: Gem;
};
export interface ITaskIdGenerator {
    generateTaskId(): string;
}
export type ReplaceGemCoreReason = 'Replace' | 'MergingCells' | 'PreBooster';
export type ReplaceGemCoreProps<T extends GemCoreName = GemCoreName> = {
    cell: Cell;
    reason: ReplaceGemCoreReason;
} & PartialCore<T>;
export type MergeCellsProps = {
    sourceCells: Cell[];
    targetCell: Cell;
    matchId: string;
};
export type MergeCellsReturn = {
    mergedGems: MergeGems;
    kickedItems: LayerItemWithKey[];
};
export type KickCellResult = {
    layerItem: LayerItemWithKey;
    killed: boolean;
    sizeCells: Cell[];
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
    sizeUpdated?: boolean;
};
export type HitCellResult = {
    layerItem: LayerItemWithKey;
    killed: boolean;
    sizeCells: Cell[];
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
    sizeUpdated?: boolean;
};
export interface IBoard extends ITaskIdGenerator {
    readonly grid: IGrid<ILevelGridItemData>;
    readonly locker: ICellsLocker;
    readonly regularMatcher: IMatcher;
    readonly blastMatcher: IMatcher;
    readonly randomGenerator: IRandomGenerator;
    readonly progressManager: IProgressManager;
    readonly signals: BoardSignals;
    readonly spawner: ISpawner;
    readonly logger: Logger;
    readonly config: CoreConfig;
    readonly gemsLayer: IGemsLayer;
    getLayer<Key extends LayerItemKey>(layerKey: Key): BoardLayersMap[Key];
    isAnythingAbove(layerKey: LevelGridItemKey, cell: Cell, exceptLayerKeys?: LevelGridItemKey[]): boolean;
    isGemCovered(gem: Gem): boolean;
    getEntityId(): string;
    loadLevel(level: ILevel): void;
    swapGems(cellA: Cell, cellB: Cell): boolean;
    dispatchSwapGems(gemA: Gem, gemB?: Gem): void;
    dispatchSwapGemsCombo(gemA: Gem, gemB: Gem): void;
    dispatchSwapGemsWrong(gemA: Gem, cellB: Cell, gemB?: Gem): void;
    dispatchClickGem(cell: Cell): void;
    moveGemToCellByGravity(sourceCell: Cell, targetCell: Cell): boolean;
    abruptMoveGemToCellByGravity(cell: Cell): boolean;
    spawnGem(cell: Cell): Gem;
    kick(cell: Cell, params: KickParams): KickCellResult[];
    hit(cell: Cell, params: HitLayerParams): HitCellResult[];
    getGem(cell: Cell): Gem | null;
    getBlastLayerGem(cell: Cell): Gem | null;
    isMatchBlocked(cell: Cell): boolean;
    replaceGemCore(taskData: ReplaceGemCoreProps): void;
    createBlastLayerGem(taskData: ReplaceGemCoreProps): Gem;
    isSpawnerCell(cell: Cell): boolean;
    isEmptyCell(cell: Cell): boolean;
    isTunnel(cell: Cell): boolean;
    isInGrid(cell: Cell | Cell[]): boolean;
    isMoveBlocked(cell: Cell): boolean;
    hasBack(cell: Cell): boolean;
    hasDropGoal(cell: Cell): boolean;
    hasDropGoals(): boolean;
    hasGem(cell: Cell): boolean;
    hasEntityOnCell(cell: Cell, entityId: string): boolean;
    isBoosterPlayable(cell: Cell, boosterType: BoosterType): boolean;
    hasGameElement(cell: Cell): boolean;
    hasBlastLayerGem(cell: Cell): boolean;
    isGravityMovingCell(cell: Cell): boolean;
    isGravityMovingCellByOtherGenerators(cell: Cell, currentGeneratorId: number): boolean;
    isGravityMovableCell(cell: Cell): boolean;
    isGravityLandingCell(cell: Cell): boolean;
    mergeCells(props: MergeCellsProps): MergeCellsReturn | null;
    /** returns animation id */
    blastGem(blastData: BlastData): string;
    /** pass animation id if you want to refresh already running animation */
    /** returns animation id */
    triggerBlastGemAnimation(blastData: BlastData, animationId?: string): string;
    hasSomeMove(moveKind?: 'swap' | 'click' | 'all'): boolean;
    getMoves(): Move[];
    hasSwapMove(cellA: Cell, cellB: Cell): boolean;
    findSwapMove(cellA: Cell, cellB: Cell): Move | null;
    hasClickMove(cell: Cell): boolean;
    findBlastMove(cell: Cell): Move | null;
    getGoalCells(): Cell[];
    getQuestTargets(questItem: LayerItemWithKey): QuestTarget[];
    getLayerItemSize(layerItem: LayerItemWithKey): Size;
    prepareQuestTargets(questItem: LayerItemWithKey, targets: QuestTarget[]): void;
    consumeQuestItem(questItem: LayerItemWithKey, target: QuestTarget, taskId: string): void;
    dispatchStartQuestItem(props: OnStartQuestItemProps): void;
    dispatchBoosterUsed(boosterType: BoosterType): void;
    dispatchPreBoostersWaiting(): void;
    dispatchPreBoosterUsed(preBoosterType: PreBoosterType): void;
    dispatchTaskStarted(props: OnTaskStartedProps): void;
    dispatchTaskFinished(props: OnTaskFinishedProps): void;
    shuffleGems(maxAttemptsPerChunk: number, maxTotalAttempts: number, maxNoAutoMatchesAttempts: number): TickIterator;
    isSwappable(cell: Cell, isActiveCell: boolean): boolean;
    isClickable(cell: Cell): boolean;
    isSwapCellsValid(cells: Cell[]): boolean;
    isClickCellValid(cell: Cell): boolean;
    isComboGem(gem: Gem): boolean;
    isKilled(layerItem: LayerItemWithKey): boolean;
    createCellsKeeper(): ICellsKeeper;
    randomizeArray<T>(array: T[]): T[];
    clone(): IBoard;
    destroy(): void;
}
export type BoardGetters = Pick<IBoard, 'isGemCovered' | 'isAnythingAbove' | 'hasGem' | 'isMatchBlocked' | 'isEmptyCell' | 'isSpawnerCell'> & {
    locker: CellsLockerGetters;
};
export interface IBoardEntity {
    id: string;
}
export interface IBackItemProps extends IBoardEntity {
    boot: boolean;
    dropGoal: boolean;
    tunnel: boolean;
}
export interface ICarpetItemProps extends IBoardEntity {
    hp: number;
    tilePosition: TilePosition;
}
export interface ICoverItemProps extends IBoardEntity {
    hp: number;
    /** 8 bits mask of the tile connections to the neighbor cells */
    connectionMask: number;
}
export interface IDoorItemProps extends IBoardEntity {
    width: number;
    height: number;
    type: GemColor | GemCoreName.Acorn;
    hp: number;
}
export type PredefinedItem = {
    gem?: RawGemName;
};
export interface IBootItemProps extends IBoardEntity {
    spawns: IRawSpawn[];
    predefined: (PredefinedItem | null)[];
    spawnMarker: boolean;
    spawnMarkerItems: RawGemName[];
}
export interface ILevelGridItemData {
    [LevelGridItemKey.Boot]: IBootItemProps | null;
    [LevelGridItemKey.Back]: IBackItemProps | null;
    [LevelGridItemKey.Carpet]: ICarpetItemProps | null;
    [LevelGridItemKey.Gem]: Gem | null;
    [LevelGridItemKey.Cover]: ICoverItemProps | null;
    [LevelGridItemKey.Door]: IDoorItemProps | null;
    [LevelGridItemKey.Blast]: Gem | null;
}
export type LayerItemWithKey<Key extends LayerItemKey = LayerItemKey> = {
    layerKey: Key;
    item: NonNullable<ILevelGridItemData[Key]>;
};
export type QuestTarget<Key extends LayerItemKey = LayerItemKey> = LayerItemWithKey<Key> & {
    cells: Cell[];
    durationTicks: number;
    /** If true, the goal will not be collected to the goals panel until all the specific quest targets gets collected */
    skipGoalCollection: boolean;
};
export declare enum GemCoreName {
    Regular = "Regular",
    LineBomb = "LineBomb",
    CrossBomb = "CrossBomb",
    Rocket = "Rocket",
    Stone = "Stone",
    ColorBomb = "ColorBomb",
    BigBomb = "BigBomb",
    Holder = "Holder",
    Acorn = "Acorn",
    Drop = "Drop",
    Cabinet = "Cabinet",
    Solid = "Solid",
    ColorTray = "ColorTray",
    Vase = "Vase",
    Beam = "Beam",
    ColorStone = "ColorStone"
}
export interface CoreNameToCore {
    [GemCoreName.Regular]: RegularGemProps;
    [GemCoreName.LineBomb]: LineBombGemProps;
    [GemCoreName.CrossBomb]: CrossBombGemProps;
    [GemCoreName.Rocket]: RocketGemProps;
    [GemCoreName.Stone]: StoneGemProps;
    [GemCoreName.ColorBomb]: ColorBombGemProps;
    [GemCoreName.BigBomb]: BigBombGemProps;
    [GemCoreName.Holder]: HolderGemProps;
    [GemCoreName.Acorn]: AcornGemProps;
    [GemCoreName.Drop]: DropGemProps;
    [GemCoreName.Cabinet]: CabinetGemProps;
    [GemCoreName.Solid]: SolidGemProps;
    [GemCoreName.ColorTray]: ColorTrayGemProps;
    [GemCoreName.Vase]: VaseGemProps;
    [GemCoreName.Beam]: BeamGemProps;
    [GemCoreName.ColorStone]: ColorStoneGemProps;
}
export interface CoreProps {
    hp: number;
    invincible?: boolean;
}
export interface IGem {
    id: string;
    core: GemProps;
    col: number;
    row: number;
}
export declare enum GemColor {
    a = "a",
    b = "b",
    c = "c",
    d = "d",
    e = "e",
    f = "f"
}
export interface RegularGemProps extends CoreProps {
    className: GemCoreName.Regular;
    color: GemColor;
}
export interface LineBombGemProps extends CoreProps {
    className: GemCoreName.LineBomb;
    orientation: Orientation;
}
export interface RocketGemProps extends CoreProps {
    className: GemCoreName.Rocket;
    shouldKickCrossCells: boolean;
}
export interface StoneGemProps extends CoreProps {
    className: GemCoreName.Stone;
}
export interface ColorBombGemProps extends CoreProps {
    className: GemCoreName.ColorBomb;
}
export interface BigBombGemProps extends CoreProps {
    className: GemCoreName.BigBomb;
}
export interface CrossBombGemProps extends CoreProps {
    className: GemCoreName.CrossBomb;
}
export interface HolderGemProps extends CoreProps {
    className: GemCoreName.Holder;
}
export interface AcornGemProps extends CoreProps {
    className: GemCoreName.Acorn;
}
export interface DropGemProps extends CoreProps {
    className: GemCoreName.Drop;
}
export interface CabinetGemProps extends CoreProps {
    className: GemCoreName.Cabinet;
    unlockMatchId: string | null;
}
export interface SolidGemProps extends CoreProps {
    className: GemCoreName.Solid;
}
export interface ColorStoneGemProps extends CoreProps {
    className: GemCoreName.ColorStone;
    color: GemColor;
    usedMatchIds: string[];
}
export declare enum ColorTrayItemPosition {
    topLeft = "topLeft",
    topRight = "topRight",
    bottomLeft = "bottomLeft",
    bottomRight = "bottomRight"
}
export interface VaseGemProps extends CoreProps {
    className: GemCoreName.Vase;
}
export interface BeamGemProps extends CoreProps {
    className: GemCoreName.Beam;
    direction: StraightDirection;
    hp: number;
    usedMatchIds: string[];
}
export interface ColorTrayGemProps extends CoreProps {
    className: GemCoreName.ColorTray;
    [ColorTrayItemPosition.topLeft]: GemColor | null;
    [ColorTrayItemPosition.topRight]: GemColor | null;
    [ColorTrayItemPosition.bottomLeft]: GemColor | null;
    [ColorTrayItemPosition.bottomRight]: GemColor | null;
    usedMatchIds: string[];
}
export type RegularGem = Gem & {
    core: RegularGemProps;
};
export type GemProps = CoreNameToCore[keyof CoreNameToCore];
export type GemCore<T extends GemCoreName = GemCoreName> = CoreNameToCore[T];
export type Gem<T extends GemCoreName = GemCoreName> = IGem & {
    core: GemCore<T>;
};
export type PartialCore<T extends GemCoreName = GemCoreName> = Partial<GemCore<T>> & {
    className: T;
};
export interface ILevelGoal {
    id: number;
    rawName: RawGoalName;
    count: number;
    maxCount: number | null;
}
export interface ILevel {
    grid: ILevelGridItemData[][];
    commonSpawns: IRawSpawn[];
    moves: number;
    goals: ILevelGoal[];
}
export type LockerSignals = SignalsHandlerBase<CellsLockerSignals>;
export interface ICellsLocker {
    init(props: {
        signals: SignalsHandlerBase<CellsLockerSignals>;
        cols: number;
        rows: number;
    }): void;
    addLock(cell: Cell, lock: CellLock): void;
    getLocks(): {
        cell: Cell;
        locks: CellLock[];
    }[];
    getCellsWithLock(lock: CellLock): Cell[];
    getLockedCells(): Cell[];
    hasLock(cell: Cell, lock: CellLock, checkMeta?: boolean): boolean;
    hasLockByOtherGenerators(cell: Cell, lock: CellLock, checkMeta?: boolean): boolean;
    hasLockReasonsByOtherGenerators(cell: Cell, currentGeneratorId: number): boolean;
    hasLockReasonByOtherGenerators(cell: Cell, currentGeneratorId: number, reason: CellLockReason): boolean;
    hasLockReason(cell: Cell, reason: CellLockReason, meta?: string): boolean;
    hasLockReasons(cell: Cell): boolean;
    hasSomeLockReason(cell: Cell, reasons: CellLockReason[], meta?: string): boolean;
    removeLock(cell: Cell, lock: CellLock): void;
    isLocksEqual(a: CellLock, b: CellLock, checkMeta?: boolean): boolean;
    clone(signals: LockerSignals): ICellsLocker;
    reset(): void;
}
export type CellsLockerGetters = Pick<ICellsLocker, 'hasLock' | 'hasLockByOtherGenerators' | 'hasLockReasonsByOtherGenerators' | 'hasLockReasonByOtherGenerators' | 'hasLockReason' | 'hasLockReasons' | 'hasSomeLockReason'>;
/**
 * Swap - locking cells while swap animation is in progress. Also applicable for Merge cells case.
 * GravityMove - locking cells while gravity move is in progress. None of the auto matches, or gravity moves by other generators can happen.
 * ClearCell - locking cells while cell is cleared.
 */
export type CellLockReason = 'Swap' | 'Merge' | 'MatchFound' | 'GravityMove' | 'GravitySettle' | 'Blast' | 'DistantTarget' | 'ClearCell';
export type CellLock = {
    generatorId: number;
    reason: CellLockReason;
    /** uniqueId is needed if we want to have unique locks withing the same generator
     * for example lock with Blast reason can be created multiple times in the same generator
     * so we want to make sure that we can remove only the lock that was created by the same task
     */
    uniqueId?: number;
    /**
     * meta is needed if we want to have cell lock check not only by reason and generatorId, but also by meta
     * for example we can set cell layer key as payloadHash to check if the cell is locked by the same layer key
     */
    meta?: string;
};
export type LocksWithCellForSignal = {
    cell: Cell;
    lock: CellLock;
    allLocks: CellLock[] | null;
};
export type LocksWithCell = {
    cell: Cell;
    locks: CellLock[];
};
export type LockWithCell = {
    cell: Cell;
    lock: CellLock;
};
export type CellsLockerSignals = {
    onAddCellLock: Signal<LocksWithCellForSignal>;
    onRemoveCellLock: Signal<LocksWithCellForSignal>;
};
export type CellLockData = {
    cell: Cell;
    locks: CellLock[];
};
export type CellLockReasonWithTicks = {
    cell: Cell;
    reason: CellLockReason;
    ticks: number;
};
export interface Move {
    cellA: Cell;
    cellB?: Cell;
    matches: Match[];
}
export type BotLevelSeed = number;
export type BotDecisionSeed = number;
export type BotReplayActions = Record<BotLevelSeed, Record<BotDecisionSeed, ReplayAction[]>>;
export type ModifyItemProps<Key extends LayerItemKey = LayerItemKey> = LayerItemWithKey<Key> & {
    prevState: Partial<ILevelGridItemData[Key]>;
};
export type RemoveItemProps<Key extends LayerItemKey = LayerItemKey> = LayerItemWithKey<Key>;
export type SwapGems = (Gem | null)[];
export type OnStartQuestItemProps = {
    questItem: LayerItemWithKey;
    target: QuestTarget;
    durationTicks: number;
    taskId: string;
};
export type KillItemProps = {
    layerItem: LayerItemWithKey;
    isActiveGoal: boolean;
    questTargets: QuestTarget[];
    taskId: string;
};
export declare enum BoosterType {
    KickCell = "kickCell",
    KickRow = "kickRow",
    KickColumn = "kickColumn",
    Shuffle = "shuffle"
}
export declare enum PreBoosterType {
    PreBoosterA = "preBoosterA",
    PreBoosterB = "preBoosterB",
    PreBoosterC = "preBoosterC"
}
export type BoosterPlayData = {
    boosterType: BoosterType;
    cell: Cell;
};
export type PreBoostersPlayData = {
    preBoosters: PreBoosterType[];
};
export type OnGemCoreReplacedProps = {
    gem: Gem;
    oldGem: Gem;
    reason: ReplaceGemCoreReason;
};
export type OnMergeCellsProps = {
    sourceGems: Gem[];
    targetGem: Gem;
    taskId: string;
};
