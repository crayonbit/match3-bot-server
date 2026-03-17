import { BoosterType, GemCoreName, KickCellResult, PreBoosterType, ReplaceGemCoreProps, CellLockReason, Gem, IBoard, LayerItemKey, LayerItemWithKey, LevelGridItemKey, OnStartQuestItemProps, QuestTarget } from '../../Board/BoardTypes';
import { PatternName } from '../../Matcher/Patterns/PatternsTypes';
import { TaskFactoryStepModel, TickGeneratorConfig, TickIterator } from '../../TickGenerator/TickGeneratorTypes';
import { Cell } from '../../Types';
import { BlastData, ITask, TaskName, TaskNameToTaskData, TaskParams } from '../TaskManagerTypes';
export declare abstract class Task<T extends TaskName | PatternName> implements ITask {
    abstract readonly name: T;
    protected taskData: TaskNameToTaskData[T];
    protected board: IBoard;
    protected stepsModel: TaskFactoryStepModel;
    protected config: TickGeneratorConfig;
    private generatorId;
    private randomGeneratorClone;
    private aggregatedLockReasonsWithTicks;
    init(taskParams: TaskParams<TaskNameToTaskData[T]>): Task<T>;
    execute(): IterableIterator<void>;
    abstract handleTask(): IterableIterator<void>;
    private postHandleTask;
    private handleLockReasonWithTicks;
    protected replaceCore(props: ReplaceGemCoreProps): void;
    protected createBlastLayerGem(props: ReplaceGemCoreProps): void;
    protected blastGem(blastData: BlastData): string;
    protected triggerBlastGemAnimation(blastData: BlastData, animationId?: string): string;
    protected mergeCells(sourceCells: Cell[], targetCell: Cell): void;
    protected removeGem(cell: Cell): boolean;
    protected getGem(cell: Cell): Gem | null;
    protected hasEntityOnCell(cell: Cell, entityId: string): boolean;
    protected getGemsByCoreName<CoreName extends GemCoreName>(coreName: CoreName): Gem<CoreName>[];
    protected kickCell(cell: Cell, allowSameMatchDamage?: boolean): KickCellResult[] | null;
    protected kickCellBelowLayer(cell: Cell, belowLayer: LayerItemKey): void;
    protected hitCell(cell: Cell, sourceGem: Gem): void;
    private extractDamagedCellData;
    protected changeGem(props: ReplaceGemCoreProps): void;
    /**
     * Once gem is created, it is invincible for a few ticks.
     */
    protected yieldGemBirthInvincibility(gem: Gem): IterableIterator<void>;
    protected modifyGem(gem: Gem, change: Partial<Gem>): void;
    private handleProgressItems;
    protected consumeQuestItem(questItem: LayerItemWithKey, target: QuestTarget): void;
    protected triggerBlast(cell: Cell): void;
    protected isKilled(layerItem: LayerItemWithKey): boolean;
    protected dispatchStartQuestItem(props: OnStartQuestItemProps): void;
    protected lockCells(cells: Cell[], reason: CellLockReason, meta?: string): {
        unlock: () => void;
    };
    protected unlockCells(cells: Cell[], reason: CellLockReason, lockId: number, meta?: string): void;
    protected hasLockReasons(cell: Cell): boolean;
    protected isAnythingAbove(layerKey: LevelGridItemKey, cell: Cell, exceptLayerKeys?: LevelGridItemKey[]): boolean;
    protected isGemCovered(gem: Gem): boolean;
    protected pickRandomItem<Item>(items: Item[]): Item;
    /** Returns a random real number between 0 and 1 */
    protected getRandomFraction(): number;
    protected getRandomInt(min: number, max: number): number;
    protected getGridSize(): {
        cols: number;
        rows: number;
    };
    protected getBoardPlayableCells(): Cell[];
    protected hasBack(cell: Cell): boolean;
    protected shuffleGems(maxAttemptsPerChunk: number, maxTotalAttempts: number, maxNoAutoMatchesAttempts: number): TickIterator;
    waitTicks(yields: number): IterableIterator<void>;
    waitIterators(iterators: IterableIterator<void>[]): IterableIterator<void>;
    protected randomizeArray<ArrayType>(array: ArrayType[]): ArrayType[];
    protected onBoosterUsed(boosterType: BoosterType): void;
    protected onPreBoostersWaiting(): void;
    protected onPreBoosterUsed(preBoosterType: PreBoosterType): void;
    protected logError(...message: unknown[]): void;
    getTaskData(): TaskNameToTaskData[T];
}
