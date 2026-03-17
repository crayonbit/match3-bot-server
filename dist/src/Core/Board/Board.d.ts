import { IMatcher } from '../Matcher/MatcherTypes';
import { IProgressManager } from '../ProgressManager/ProgressManagerTypes';
import { ISpawner } from '../Spawner/SpawnerTypes';
import { BlastData } from '../TaskManager/TaskManagerTypes';
import { ReplaceGemCoreProps, Gem, IBoard, ICellsLocker, IGrid, ILevel, ILevelGridItemData, KickParams, LayerItemKey, LayerItemWithKey, LevelGridItemKey, Move, OnStartQuestItemProps, QuestTarget, MergeCellsProps, MergeCellsReturn, BoosterType, KickCellResult, HitCellResult, PreBoosterType } from './BoardTypes';
import { TickIterator } from '../TickGenerator/TickGeneratorTypes';
import { Cell, CoreConfig, Logger } from '../Types';
import { ICellsKeeper, IRandomGenerator } from '../Utils/UtilsTypes';
import { BoardSignals } from './BoardSignals';
import type { BoardLayers, BoardLayersMap, HitLayerParams, IGemsLayer } from './Layers/LayersTypes';
import type { Size } from '../Utils/Geom/GeomTypes';
import type { OnTaskStartedProps, OnTaskFinishedProps } from '../../Signals/SignalsTypes';
export type BoardProps = {
    config: CoreConfig;
    grid: IGrid<ILevelGridItemData>;
    locker: ICellsLocker;
    regularMatcher: IMatcher;
    blastMatcher: IMatcher;
    spawner: ISpawner;
    randomGenerator: IRandomGenerator;
    progressManager: IProgressManager;
    signals: BoardSignals;
    layers: BoardLayers;
    createCellsKeeper: () => ICellsKeeper;
    logger: Logger;
};
export declare class Board implements IBoard {
    readonly grid: IGrid<ILevelGridItemData>;
    readonly locker: ICellsLocker;
    readonly regularMatcher: IMatcher;
    readonly blastMatcher: IMatcher;
    readonly randomGenerator: IRandomGenerator;
    readonly progressManager: IProgressManager;
    readonly signals: BoardSignals;
    readonly createCellsKeeper: () => ICellsKeeper;
    readonly spawner: ISpawner;
    readonly logger: Logger;
    readonly config: CoreConfig;
    private readonly layers;
    private readonly layersMap;
    private entityIdCounter;
    private taskIdCounter;
    private animationIdCounter;
    constructor(props: BoardProps);
    get gemsLayer(): IGemsLayer;
    getLayer<Key extends LayerItemKey>(layerKey: Key): BoardLayersMap[Key];
    private connectProgressManagerToBoardSignals;
    loadLevel(level: ILevel): void;
    /**
     * Swaps two gems on the board not considering their position and distance
     */
    swapGems(cellA: Cell, cellB: Cell): boolean;
    dispatchTaskStarted(props: OnTaskStartedProps): void;
    dispatchTaskFinished(props: OnTaskFinishedProps): void;
    /**
     * Called by SwapCulminateStepGenerator on successful swap
     */
    dispatchSwapGems(gemA: Gem, gemB?: Gem): void;
    /**
     * Called by SwapCulminateStepGenerator on successful combo swap
     */
    dispatchSwapGemsCombo(gemA: Gem, gemB: Gem): void;
    /**
     * Called by SwapCulminateStepGenerator when swap was not possible
     */
    dispatchSwapGemsWrong(gemA: Gem, cellB: Cell, gemB?: Gem): void;
    /**
     * Called by ClickCulminateStepGenerator on successful click
     */
    dispatchClickGem(cell: Cell): void;
    /**
     * Used by gravity to move gem from one cell to another
     */
    moveGemToCellByGravity(sourceCell: Cell, targetCell: Cell): boolean;
    abruptMoveGemToCellByGravity(cell: Cell): boolean;
    /**
     * Spawns a new gem on a cell
     */
    spawnGem(cell: Cell): Gem;
    /**
     * Checks if click operation is possible on the cell
     */
    isClickable(cell: Cell): boolean;
    /**
     * Checks if swap operation is possible on the cell
     * isActiveCell is the one that we clicked first
     */
    isSwappable(cell: Cell, isActiveCell: boolean): boolean;
    /**
     * Performs direct kick on the cell.
     * If the cell can receive any kick damage it might be killed or its HP will be decreased
     * @param cell The cell to kick.
     * @param startLayerKey - if provided, all the kick actions will happen below this layer
     */
    kick(cell: Cell, params: KickParams): KickCellResult[];
    /**
     * Hit is the damage that can receive a cell from a "blast wave" of a powerful kick
     * E.g. On three in a row match three gems got kicked and adjacent cells receive a hit damage
     * @param cell The cell to hit.
     * @returns {boolean} - if cell was kicked
     */
    hit(cell: Cell, params: HitLayerParams): HitCellResult[];
    /**
     * Turn gem into another kind.
     * E.g. regular gem can turn into a line bomb
     */
    replaceGemCore(taskData: ReplaceGemCoreProps): void;
    /**
     * Create gem on the Blast layer
     */
    createBlastLayerGem(taskData: ReplaceGemCoreProps): Gem;
    /**
     * Match with the cell is not possible if some layer blocks it
     */
    isMatchBlocked(cell: Cell): boolean;
    /**
     * If move is blocked by some layer
     */
    isMoveBlocked(cell: Cell): boolean;
    /**
     * If new gem can be spawned on this cell
     */
    isSpawnerCell(cell: Cell): boolean;
    /**
     * Empty Cell means that cell is part of the grid, but has no gem on it at the moment
     */
    isEmptyCell(cell: Cell): boolean;
    isTunnel(cell: Cell): boolean;
    /**
     * If the cell has back item it also means that it is a functional part of the level
     * otherwise it is just a hole in the grid
     */
    hasBack(cell: Cell): boolean;
    /**
     * If the cell contains drop goal, where drop gems can be collected
     */
    hasDropGoal(cell: Cell): boolean;
    /**
     * If board contains at least one drop goal
     */
    hasDropGoals(): boolean;
    /**
     * If cell is in the range of the board grid rectangle.
     * Even if the call is in range it still be can be just a hole in the grid
     */
    isInGrid(cell: Cell | Cell[]): boolean;
    /**
     * If the cell has a gem on it
     */
    hasGem(cell: Cell): boolean;
    hasEntityOnCell(cell: Cell, entityId: string): boolean;
    isBoosterPlayable(cell: Cell, boosterType: BoosterType): boolean;
    /**
     * Boosters can interact only on game elements
     * If you apply booster on an empty background cell it will not trigger it
     */
    hasGameElement(cell: Cell): boolean;
    /**
     * If the cell has a blast layer gem on it
     */
    hasBlastLayerGem(cell: Cell): boolean;
    /**
     * If the cell is currently moving by gravity
     */
    isGravityMovingCell(cell: Cell): boolean;
    /**
     * If the cell is currently moving by gravity by other generators
     */
    isGravityMovingCellByOtherGenerators(cell: Cell, currentGeneratorId: number): boolean;
    /**
     * Whether this cell can be moved by gravity
     */
    isGravityMovableCell(cell: Cell): boolean;
    /**
     * Whether gravity can move gem to this cell
     */
    isGravityLandingCell(cell: Cell): boolean;
    getGem(cell: Cell): Gem | null;
    getBlastLayerGem(cell: Cell): Gem | null;
    /**
     * Gem is removed from the data, but view moved to the target cell
     * Used for cases like when you need to merge four gems into the line bomb
     */
    mergeCells(props: MergeCellsProps): MergeCellsReturn | null;
    /**
     * Applied for the blast kind gems (e.g. line bomb, rocket)
     * Removes a blast gem from the grid data and signals to view to animate the blast with the provided data
     */
    blastGem(blastData: BlastData): string;
    triggerBlastGemAnimation(blastData: BlastData, animationId?: string): string;
    isAnythingAbove(layerKey: LevelGridItemKey, cell: Cell, exceptLayerKeys?: LevelGridItemKey[]): boolean;
    isGemCovered(gem: Gem): boolean;
    /**
     * If swap move can be performed on the provided cells
     */
    isSwapCellsValid(swapCells: Cell[]): boolean;
    /**
     * If tap move can be performed on the provided cell
     */
    isClickCellValid(cell: Cell): boolean;
    isComboGem(gem: Gem): boolean;
    isKilled(layerItem: LayerItemWithKey): boolean;
    hasSomeMove(moveKind?: 'swap' | 'click' | 'all'): boolean;
    /**
     * @returns {Move[]} - all possible moves on the board
     */
    getMoves(): Move[];
    private getMovesInDirections;
    hasSwapMove(cellA: Cell, cellB: Cell): boolean;
    hasClickMove(cell: Cell): boolean;
    /**
     * Move is found when swapping of two cells results in a match
     */
    findSwapMove(cellA: Cell, cellB: Cell): Move | null;
    findBlastMove(cell: Cell): Move | null;
    /**
     * Returns all the cells which contain the goal items
     */
    getGoalCells(): Cell[];
    getLayerItemSize<T extends LayerItemKey>(layerItem: LayerItemWithKey<T>): Size;
    getQuestTargets(item: LayerItemWithKey): QuestTarget[];
    prepareQuestTargets(questItem: LayerItemWithKey, targets: QuestTarget[]): void;
    consumeQuestItem(questItem: LayerItemWithKey, target: QuestTarget, taskId: string): void;
    dispatchStartQuestItem(props: OnStartQuestItemProps): void;
    dispatchBoosterUsed(boosterType: BoosterType): void;
    dispatchPreBoostersWaiting(): void;
    dispatchPreBoosterUsed(preBoosterType: PreBoosterType): void;
    /**
     * Shuffles gems on the board
     * Can be useful for the booster or in case of no possible moves on the board
     */
    shuffleGems(maxAttemptsPerChunk: number, maxTotalAttempts: number, maxNoAutoMatchesAttempts: number): TickIterator;
    /**
     * Generated unique entity id for a spawned grid layer entity
     */
    getEntityId(): string;
    generateTaskId: () => string;
    private generateAnimationId;
    randomizeArray<T>(array: T[]): T[];
    clone(): IBoard;
    destroy(): void;
}
