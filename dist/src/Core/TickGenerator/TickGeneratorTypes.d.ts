import type { CoreConfig, Cell, ICloneable, IIdleStateObserver } from '../Types';
import type { QuestTarget, IBoard, LayerItemWithKey, ITaskIdGenerator, BoosterPlayData, PreBoostersPlayData, PreBoosterType } from '../Board/BoardTypes';
import type { Match } from '../Matcher/MatcherTypes';
import type { TickGeneratorSignals } from './TickGeneratorSignals';
import type { TickStepsSignals } from './TickStepsSignals';
import type { ITaskManager } from '../TaskManager/TaskManagerTypes';
import { TickGeneratorsManagerSignals } from './TickGeneratorsManagerSignals';
export type TickIteratorResult = {
    kind: 'stepDebug';
} | {
    kind: 'stepEnd';
} | {
    kind: 'tickWait';
    ticks: number;
} | {
    kind: 'tickEnd';
} | {
    kind: 'shuffleFailed';
};
export type TickIterator = Generator<TickIteratorResult>;
export interface IStepGenerator {
    readonly name: TickStepName;
    init(props: {
        generatorId: number;
        isPreviousStepsSettled: () => boolean;
        isOtherGeneratorsRunning: (excludedGeneratorId: number) => boolean;
    }): void;
    getStepIterator(): StepIterator;
    isSettled(): boolean;
}
type AddCells = (cells: Cell | Cell[]) => void;
type GetCells = () => Cell[];
type AddMatches = (matches: Match[]) => void;
type GetMatches = () => Match[];
type WriteSwapCells = {
    addSwapCells: AddCells;
};
type ReadSwapCells = {
    getSwapCells: GetCells;
    getSwapCellsCount(): number;
};
type ClearSwapCells = {
    clearSwapCells(): void;
};
type WriteClickCell = {
    addClickCell(cell: Cell): void;
};
type ReadClickCell = {
    getClickCell(): Cell | null;
};
type ClearClickCell = {
    clearClickCell(): void;
};
type WriteBoosterPlayData = {
    addBoosterPlayData(data: BoosterPlayData): void;
};
type ReadClearBoosterPlayData = {
    withdrawBoosterPlayData(): BoosterPlayData | null;
};
type WritePreBoostersPlayData = {
    addPreBoostersPlayData(data: PreBoostersPlayData): void;
};
type ReadClearPreBoostersPlayData = {
    withdrawPreBoostersPlayData(): PreBoostersPlayData | null;
};
type WriteGravityBlockedMatchesIds = {
    addGravityBlockedMatchesIds(ids: string[]): void;
};
type ReadGravityBlockedMatchesIds = {
    getGravityBlockedMatchesIds(): string[];
};
type ClearGravityBlockedMatchesIds = {
    clearGravityBlockedMatchesIds(): void;
};
type WriteRegularMatchCheckCells = {
    addRegularMatchCheckCells: AddCells;
};
type ReadRegularMatchCheckCells = {
    getRegularMatchCheckCells: GetCells;
    getRegularMatchCheckCellsCount(): number;
};
type ClearRegularMatchCheckCells = {
    removeRegularMatchCheckCells: (cells: Cell | Cell[]) => void;
    clearRegularMatchCheckCells(): void;
};
type WriteBlastMatchCheckCells = {
    addBlastMatchCheckCells: AddCells;
};
type ReadBlastMatchCheckCells = {
    getBlastMatchCheckCells: GetCells;
    getBlastMatchCheckCellsCount(): number;
};
type ClearBlastMatchCheckCells = {
    removeBlastMatchCheckCells(cells: Cell | Cell[]): void;
    clearBlastMatchCheckCells(): void;
};
type WriteGravityCheckCells = {
    addGravityCheckCells: AddCells;
};
type ReadGravityCheckCells = {
    getGravityCheckCells: GetCells;
    getGravityCheckCellsCount(): number;
    hasGravityCheckCell(cell: Cell): boolean;
};
type ClearGravityCheckCells = {
    clearGravityCheckCells(): void;
    removeGravityCheckCells(cells: Cell | Cell[]): void;
};
type WriteSpawnerCheckCells = {
    addSpawnerCheckCells: AddCells;
};
type ReadSpawnerCheckCells = {
    getSpawnerCheckCells: GetCells;
    hasSpawnerCheckCell(cell: Cell): boolean;
};
type ClearSpawnerCheckCells = {
    clearSpawnerCheckCells(): void;
    removeSpawnerCheckCells(cells: Cell | Cell[]): void;
};
type WriteMatches = {
    addMatches: AddMatches;
};
type ReadMatches = {
    getMatches: GetMatches;
    getMatchesCount(): number;
};
type ClearMatches = {
    clearMatches(): void;
    removeMatches(matchesIds: string[]): void;
};
type CellsDamageMatchIds = {
    setCellDamageMatchId(cell: Cell, matchId: string): void;
    hasCellDamageMatchId(cell: Cell, matchId: string): boolean;
};
export type QuestItemWithTargets = {
    questItem: LayerItemWithKey;
    targets: QuestTarget[];
};
export type QuestItemWithTarget = {
    questItem: LayerItemWithKey;
    target: QuestTarget;
};
type WriteGoalTargets = {
    addQuestItemWithTargets(questItem: QuestItemWithTargets): void;
};
type ReadGoalTargets = {
    withdrawQuestItemsWithTargets(): QuestItemWithTargets[];
};
type WriteTickGeneratorStarter = {
    setTickGeneratorStarter(starter: TickGeneratorStarter): void;
};
type ReadTickGeneratorStarter = {
    getTickGeneratorStarter(): TickGeneratorStarter | null;
};
export type StepsModelBoard = Pick<IBoard, 'locker'>;
export type IStepsModel = WriteSwapCells & ReadSwapCells & ClearSwapCells & WriteGravityBlockedMatchesIds & ReadGravityBlockedMatchesIds & ClearGravityBlockedMatchesIds & WriteClickCell & ReadClickCell & ClearClickCell & WriteBoosterPlayData & ReadClearBoosterPlayData & WritePreBoostersPlayData & ReadClearPreBoostersPlayData & WriteRegularMatchCheckCells & ClearRegularMatchCheckCells & ReadRegularMatchCheckCells & WriteBlastMatchCheckCells & ReadBlastMatchCheckCells & ClearBlastMatchCheckCells & WriteGravityCheckCells & ReadGravityCheckCells & ClearGravityCheckCells & WriteSpawnerCheckCells & ReadSpawnerCheckCells & ClearSpawnerCheckCells & WriteMatches & ReadMatches & ClearMatches & CellsDamageMatchIds & WriteGoalTargets & ReadGoalTargets & WriteTickGeneratorStarter & ReadTickGeneratorStarter & ICloneable<IStepsModel>;
export type SwapStepModel = ReadSwapCells & WriteSwapCells & ClearSwapCells;
export type ClickStepModel = ReadClickCell & WriteClickCell & ClearClickCell;
export type RegularMatchStepModel = ReadSwapCells & WriteRegularMatchCheckCells & ReadRegularMatchCheckCells & ClearRegularMatchCheckCells & ReadMatches & WriteMatches & WriteGravityBlockedMatchesIds & ReadGravityBlockedMatchesIds & ClearGravityBlockedMatchesIds & ClearMatches;
export type BlastMatchStepModel = ReadSwapCells & ReadClickCell & ReadBlastMatchCheckCells & ClearBlastMatchCheckCells & ReadMatches & WriteMatches & ClearMatches;
export type ClickCulminateStepModel = ReadClickCell & ClearClickCell & ReadMatches;
export type SwapCulminateStepModel = ReadSwapCells & WriteSwapCells & ReadMatches & ClearSwapCells & ReadGravityBlockedMatchesIds & WriteGravityCheckCells & WriteSpawnerCheckCells;
export type TaskStepModel = ReadMatches & WriteBlastMatchCheckCells & ClearBlastMatchCheckCells & ReadGoalTargets & ReadClearBoosterPlayData & ReadClearPreBoostersPlayData;
export type TaskFactoryStepModel = ClearGravityCheckCells & ReadGravityCheckCells & WriteGravityCheckCells & ClearSpawnerCheckCells & ReadSpawnerCheckCells & WriteSpawnerCheckCells & WriteBlastMatchCheckCells & CellsDamageMatchIds & WriteRegularMatchCheckCells & WriteGoalTargets & ReadTickGeneratorStarter;
export type GravityStepModel = WriteRegularMatchCheckCells & WriteGravityCheckCells & ReadGravityCheckCells & ClearGravityCheckCells & ReadBlastMatchCheckCells & WriteSpawnerCheckCells;
export type SpawnStepModel = ReadSpawnerCheckCells & WriteRegularMatchCheckCells & ClearSpawnerCheckCells & WriteGravityCheckCells;
export type UltimateCellsCheckStepModel = WriteRegularMatchCheckCells & WriteSpawnerCheckCells & WriteGravityCheckCells;
export type GravityCellsSwapsCollectorBoard = Pick<IBoard, 'isEmptyCell' | 'isTunnel' | 'isInGrid' | 'hasBack' | 'isMoveBlocked' | 'locker' | 'isGravityMovableCell' | 'isGravityMovingCell' | 'isGravityLandingCell' | 'isSpawnerCell' | 'createCellsKeeper' | 'hasGem' | 'grid'>;
export interface IGravityCellsSwapsCollector {
    collect(board: GravityCellsSwapsCollectorBoard, cells: Cell[]): Cell[][];
}
export type TickGeneratorProps = {
    config: TickGeneratorConfig;
};
export interface ITickGenerator {
    readonly id: number;
    readonly signals: TickGeneratorSignals;
    readonly done: boolean;
    start(): void;
    tick(): TickResult;
    tickStep(): TickResult;
    destroy(): void;
}
export interface ITickGeneratorPlayer extends Omit<ITickGenerator, 'start' | 'done'> {
    play(cellA: Cell, cellB?: Cell): void;
    playBooster(cell: Cell, boosterType: string): void;
    playPreBoosters(preBoosters: PreBoosterType[]): void;
    readonly tickStepsSignals: TickStepsSignals;
}
export interface ITickGeneratorsManager {
    readonly generatorSignals: TickGeneratorSignals;
    readonly tickStepsSignals: TickStepsSignals;
    readonly signals: TickGeneratorsManagerSignals;
    play(cellA: Cell, cellB?: Cell): ITickGeneratorPlayer;
    playBooster(cell: Cell, boosterType: string): ITickGeneratorPlayer;
    playPreBoosters(preBoosters: PreBoosterType[]): ITickGeneratorPlayer;
    setStepsMode(value: boolean): void;
    getStepsMode(): boolean;
    update(deltaTime: number): void;
    tick(): void;
    tickStep(): void;
    getCurrentTick(): number;
    isIdle(): boolean;
    getCurrentGeneratorsIdCounter(): number;
    setRewindIdleMode(value: boolean): void;
    addIdleStateObserver(observer: IIdleStateObserver): void;
    removeIdleStateObserver(observer: IIdleStateObserver): void;
    destroy(): void;
}
export type TickResult = {
    value: TickIteratorResult;
    done: boolean;
} | null;
export type StepIterator = {
    readonly name: TickStepName;
    iterator: TickIterator;
    isTimeToTick: (tick: number) => boolean;
    isSettled: () => boolean;
};
export type TickStepName = 'ClickStep' | 'SwapStep' | 'BlastMatchStep' | 'RegularMatchStep' | 'SwapCulminateStep' | 'TaskStep' | 'GravityStep' | 'ClickCulminateStep' | 'SpawnStep' | 'ShuffleStep' | 'UltimateCellsCheckStep';
export type GetGravityCellsSwapsCollector = (board: GravityCellsSwapsCollectorBoard) => IGravityCellsSwapsCollector;
export type ClickGeneratorProps = {
    stepsModel: ClickStepModel;
    board: Pick<IBoard, 'swapGems' | 'isClickCellValid'>;
    executionTicksInterval: number;
};
export type SwapStepGeneratorProps = {
    stepsModel: SwapStepModel;
    board: Pick<IBoard, 'swapGems' | 'isSwapCellsValid' | 'locker'>;
    executionTicksInterval: number;
    config: TickGeneratorConfig;
};
export type RegularMatchStepGeneratorProps = {
    stepsModel: RegularMatchStepModel;
    board: Pick<IBoard, 'regularMatcher' | 'getGem' | 'isGravityMovingCell' | 'locker' | 'isMatchBlocked'>;
    signals: TickStepsSignals;
    executionTicksInterval: number;
    config: TickGeneratorConfig;
};
export type BlastMatchStepGeneratorProps = {
    stepsModel: BlastMatchStepModel;
    board: Pick<IBoard, 'blastMatcher' | 'getGem' | 'getBlastLayerGem' | 'locker'>;
    signals: TickStepsSignals;
    executionTicksInterval: number;
};
export type ClickCulminateStepGeneratorProps = {
    stepsModel: ClickCulminateStepModel;
    board: Pick<IBoard, 'dispatchClickGem'>;
    executionTicksInterval: number;
};
export type TaskStepGeneratorProps = {
    stepsModel: TaskStepModel;
    taskManager: ITaskManager;
    signals: TickStepsSignals;
    executionTicksInterval: number;
    taskIdGenerator: ITaskIdGenerator;
};
export type UltimateCellsCheckStepGeneratorProps = {
    stepsModel: UltimateCellsCheckStepModel;
    board: Pick<IBoard, 'grid'>;
    executionTicksInterval: number;
};
export type SwapCulminateStepGeneratorProps = {
    stepsModel: SwapCulminateStepModel;
    board: Pick<IBoard, 'getGem' | 'swapGems' | 'locker' | 'dispatchSwapGems' | 'dispatchSwapGemsCombo' | 'dispatchSwapGemsWrong' | 'isComboGem'>;
    executionTicksInterval: number;
    config: TickGeneratorConfig;
};
export type GravityStepGeneratorProps = {
    board: GravityCellsSwapsCollectorBoard & Pick<IBoard, 'moveGemToCellByGravity' | 'abruptMoveGemToCellByGravity' | 'getGem' | 'hasBack' | 'isGravityMovingCell' | 'isGravityMovingCellByOtherGenerators' | 'isGravityMovableCell' | 'locker'>;
    stepsModel: GravityStepModel;
    getGravityCellsSwapsCollector: GetGravityCellsSwapsCollector;
    executionTicksInterval: number;
    config: TickGeneratorConfig;
};
export type SpawnStepGeneratorProps = {
    stepsModel: SpawnStepModel;
    board: Pick<IBoard, 'spawnGem' | 'swapGems' | 'isSpawnerCell' | 'isEmptyCell' | 'getGem' | 'moveGemToCellByGravity' | 'locker'>;
    executionTicksInterval: number;
};
export type ShuffleStepGeneratorProps = {
    board: Pick<IBoard, 'hasSomeMove' | 'shuffleGems'>;
    executionTicksInterval: number;
    config: TickGeneratorConfig;
};
export type StepGeneratorsDependencies = ClickGeneratorProps & SwapStepGeneratorProps & RegularMatchStepGeneratorProps & BlastMatchStepGeneratorProps & ClickCulminateStepGeneratorProps & TaskStepGeneratorProps & SwapCulminateStepGeneratorProps & GravityStepGeneratorProps & SpawnStepGeneratorProps & ShuffleStepGeneratorProps;
export type CommonStepGeneratorsDependencies = Omit<StepGeneratorsDependencies, 'executionTicksInterval'>;
export type TickGeneratorConfig = CoreConfig;
export type TickGeneratorStarter = 'swap' | 'click' | 'booster' | 'preBooster';
export {};
