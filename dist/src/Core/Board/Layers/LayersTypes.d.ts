import { ReplaceGemCoreProps } from '../BoardTypes';
import type { TickIterator } from '../../TickGenerator/TickGeneratorTypes';
import type { Cell, CoreConfig } from '../../Types';
import type { Size } from '../../Utils/Geom/GeomTypes';
import type { BoosterType, CellLockReasonWithTicks, Gem, GemColor, GemCoreName, IBackItemProps, IBoard, ICarpetItemProps, ICoverItemProps, IDoorItemProps, ILevelGridItemData, KickParams, LayerItemKey, LayerItemWithKey, LevelGridItemKey, PartialCore, QuestTarget } from '../BoardTypes';
import type { IGemHandler } from '../Gems/GemsTypes';
export type KickResult = {
    result: 'none';
} | {
    result: 'break';
} | {
    result: 'kickedBreak';
    layerItem: LayerItemWithKey;
    killed: boolean;
    sizeCells: Cell[];
    sizeUpdated?: boolean;
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
} | {
    result: 'kickedContinue';
    layerItem: LayerItemWithKey;
    killed: boolean;
    sizeCells: Cell[];
    sizeUpdated?: boolean;
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
};
export type KickResultKind = KickResult['result'];
export type KickResultWithLockTicks = {
    result: KickResultKind;
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
};
export type HitResultWithLockTicks = {
    result: boolean;
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
};
export type HitResult = {
    result: 'none';
} | {
    result: 'break';
} | {
    result: 'hit';
    layerItem: LayerItemWithKey;
    killed: boolean;
    sizeCells: Cell[];
    sizeUpdated?: boolean;
    lockReasonsWithTicks?: CellLockReasonWithTicks[];
};
export type KickLayerParams = Omit<KickParams, 'startLayerKey'>;
export type HitLayerParams = {
    matchId: string;
    sourceGem: Gem;
};
export interface ILayer<T extends LayerItemKey> {
    readonly layerName: T;
    init(props: LayerProps): void;
    onLevelLoad(): void;
    postLevelLoad(): void;
    blocksSwap(cell: Cell): boolean;
    blocksClick(cell: Cell): boolean;
    isClickable(cell: Cell): boolean;
    blocksMatch(cell: Cell): boolean;
    blocksMove(cell: Cell): boolean;
    blocksBooster(cell: Cell, boosterType: BoosterType): boolean;
    /** Gems and blockers are game elements, background tile is not */
    hasGameElement(cell: Cell): boolean;
    kick(cell: Cell, params: KickLayerParams): KickResult;
    hit(cell: Cell, params: HitLayerParams): HitResult;
    /** removing the item from board */
    remove(cell: Cell): boolean;
    /** removing the item from board plus dispatching onKill signal  */
    removeAndDispatchKill(cell: Cell, taskId: string): boolean;
    modifyItem(item: LayerItem<T>, change: Partial<LayerItem<T>>): void;
    get(cell: Cell): LayerItem<T> | null;
    set(item: NonNullable<LayerItem<T>>, cell: Cell, newItem?: boolean): void;
    loopGrid(callback: (item: LayerItem<T> | null, cell: Cell) => void): void;
    loopExistingLayerItems(callback: (item: NonNullable<LayerItem<T>>, cell: Cell) => void): void;
    find(test: (item: LayerItem<T>, cell: Cell) => boolean): LayerItem<T> | null;
    isKilled(item: LayerItem<T>): boolean;
    getAll(filter?: (item: NonNullable<LayerItem<T>>) => boolean): Array<NonNullable<LayerItem<T>>>;
    getCellsWithinCellSize(cell: Cell, size: Size): Cell[];
    getSize(item: LayerItem<T>): Size;
    getCountOnBoard(props: unknown): number;
    getQuestTargets(questItem: LayerItemWithKey): QuestTarget[] | null;
    prepareQuestTargets(questItem: LayerItemWithKey, targets: QuestTarget[]): void;
    consumeQuestItem(questItem: LayerItemWithKey, target: QuestTarget, taskId: string): void;
    destroy(): void;
}
export interface IBackLayer extends ILayer<LevelGridItemKey.Back> {
    createItem(props: Partial<IBackItemProps>, customId?: string): IBackItemProps;
    hasDropGoal(cell: Cell): boolean;
    hasDropGoals(): boolean;
    isTunnel(cell: Cell): boolean;
    clone(): IBackLayer;
}
export interface ICarpetLayer extends ILayer<LevelGridItemKey.Carpet> {
    createItem(props: Partial<ICarpetItemProps>, customId?: string): ICarpetItemProps;
    clone(): ICarpetLayer;
}
export interface ICoverLayer extends ILayer<LevelGridItemKey.Cover> {
    createItem(props: Partial<ICoverItemProps>, customId?: string): ICoverItemProps;
    clone(): ICoverLayer;
}
export interface IDoorsLayer extends ILayer<LevelGridItemKey.Door> {
    createItem(props: Partial<IDoorItemProps>, customId?: string): IDoorItemProps;
    clone(): IDoorsLayer;
}
export type GemNameHash = GemCoreName | `${GemCoreName.Regular}_${GemColor}`;
export interface IGemsLayer extends ILayer<LevelGridItemKey.Gem> {
    createGem(cell: Cell, partialCore: PartialCore, customId?: string): Gem;
    createGemOnGrid(cell: Cell, partialCore: PartialCore, customId?: string): Gem;
    swap(cellA: Cell, cellB: Cell): void;
    replaceGemCore(taskData: ReplaceGemCoreProps): void;
    shuffle(maxAttemptsPerChunk: number, maxTotalAttempts: number, maxNoAutoMatchesAttempts: number, onComplete: (data: ShuffleData[]) => void): TickIterator;
    getGemsByCoreName<T extends GemCoreName>(coreName: T): Gem<T>[];
    getWithType<T extends GemCoreName>(cell: Cell, coreName: T): Gem<T> | null;
    decrementHp(cell: Cell): boolean;
    getCountOnBoard(gemNameHash: GemNameHash): number;
    /** Can be combined with another gem into more powerful version */
    isCombo(gem: Gem): boolean;
    isCovered(gem: Gem): boolean;
    /** Return the list of all cells occupied by this gem */
    getSizeCells(gem: Gem): Cell[];
    clone(): IGemsLayer;
}
export interface IBlastLayer extends ILayer<LevelGridItemKey.Blast> {
    createGem(cell: Cell, partialCore: PartialCore, customId?: string): Gem;
    createGemOnGrid(cell: Cell, partialCore: PartialCore): Gem;
    clone(): IBlastLayer;
}
export type LayerItem<T extends LevelGridItemKey = LevelGridItemKey> = ILevelGridItemData[T];
export type LayerProps = {
    board: IBoard;
    config: CoreConfig;
};
export type GemsLayerProps = LayerProps & {
    gemHandlers: Record<GemCoreName, IGemHandler>;
};
export type LayerItemKeyToLayer = {
    [LevelGridItemKey.Back]: IBackLayer;
    [LevelGridItemKey.Carpet]: ICarpetLayer;
    [LevelGridItemKey.Gem]: IGemsLayer;
    [LevelGridItemKey.Cover]: ICoverLayer;
    [LevelGridItemKey.Door]: IDoorsLayer;
    [LevelGridItemKey.Blast]: IBlastLayer;
};
export type BoardLayersMap<T extends LayerItemKey = LayerItemKey> = {
    [K in T]: LayerItemKeyToLayer[K];
};
export type BoardLayer = BoardLayersMap[keyof BoardLayersMap];
export type BoardLayers = [IBackLayer, ICarpetLayer, IGemsLayer, ICoverLayer, IDoorsLayer, IBlastLayer];
export interface ShuffleData {
    gem: Gem;
    originalCell: Cell;
}
