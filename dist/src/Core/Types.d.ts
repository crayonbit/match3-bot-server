import type { BoardProps } from './Board/Board';
import type { BoosterType, GemCoreName, IBoard, ILevelGridItemData, PreBoosterType } from './Board/BoardTypes';
import { IGemHandler } from './Board/Gems/GemsTypes';
import type { IGravityManager } from './GravityManager/GravityManagerTypes';
import type { IGoalsPriorizer } from './ProgressManager/ProgressManagerTypes';
import type { ITaskManager, TasksMap } from './TaskManager/TaskManagerTypes';
import type { ITickGeneratorsManager } from './TickGenerator/TickGeneratorTypes';
import type { IRandomGenerator } from './Utils/UtilsTypes';
export type Cell = {
    readonly col: number;
    readonly row: number;
};
export type CellHash = `${number}|${number}`;
export type DoubleCellHash = `${CellHash},${CellHash}`;
export type Direction = 'top' | 'topRight' | 'right' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'left' | 'topLeft';
export type StraightDirection = Extract<Direction, 'left' | 'right' | 'top' | 'bottom'>;
export type TilePosition = 'left' | 'top' | 'right' | 'bottom' | 'center' | 'topBottom' | 'leftRight' | 'topLeft' | 'topCenter' | 'topRight' | 'middleLeft' | 'middleCenter' | 'middleRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
export type Range = {
    readonly min: number;
    readonly max: number;
};
export interface ICloneable<T> {
    clone(): T;
}
export type Orientation = 'horizontal' | 'vertical';
export type ReplayAction = {
    tick: number;
    playedCells: Cell[];
    boosterType?: BoosterType;
    preBoosters?: PreBoosterType[];
    gridSnapshot?: ILevelGridItemData[][];
};
export type ReplayActionsData = {
    seed: number;
    maxAwaitingMatchTicks: number;
    actions: ReplayAction[];
};
type LoggerFeatureString = `log${LoggerFeature}`;
type LogsConfig = Record<LoggerFeatureString, boolean>;
export type CoreConfig = {
    /** Maximum amount of columns possible in any level */
    maxDesignCols: number;
    /** Maximum amount of rows possible in any level */
    maxDesignRows: number;
    tickDurationMs: number;
    gravityTicksInterval: number;
    /** If a match is found, but gems around have not settled yet (e.g. moving by gravity), we wait a maximum amount of ticks." */
    maxAwaitingMatchTicks: number;
    /** Random Generator seed */
    seed: number;
    gravityMaxColDelay: number;
    gravityAcceleration: number;
    bounceAmplitude: number;
    bounceLoops: number;
    bounceDuration: number;
    gravityCellSettleTicks: number;
    /** reserved ticks to play swap animation */
    swapTicks: number;
    /** reserved ticks to play swap combo animation */
    swapComboTicks: number;
    /** reserved ticks to play swap wrong animation */
    swapWrongTicks: number;
    /** reserved ticks to play a suspense animation before the explosion starts */
    bigBombBlastSuspenseTicks: number;
    /** for how long exploded cells should be blast locked */
    bigBombBlastTicks: number;
    /** for time gap between blast radius cell kills. Also used by combo. */
    bigBombBlastRippleTicks: number;
    /** for how long exploded cells should be blast locked */
    colorBombBlastTicks: number;
    /** reserved ticks to play a suspense animation before the explosion starts */
    lineBombBlastSuspenseTicks: number;
    /** line bomb duration for one cell traveling */
    lineBombBlastCellTicks: number;
    /** rocket duration for one cell traveling */
    rocketBlastCellTicks: number;
    /** minimum rocket blast animation duration */
    minRocketBlastTicks: number;
    /** reserved ticks to lock cross kicked cells during the animation */
    rocketBlastCrossCellsTicks: number;
    /** reserved ticks to play a suspense animation before the explosion starts */
    bigBombsComboBlastSuspenseTicks: number;
    /** for how long exploded cells should be blast locked */
    bigBombsComboBlastTicks: number;
    /** rocket duration for one cell traveling */
    rocketLineBombComboBlastCellTicks: number;
    /** for how long exploded cells should be blast locked */
    colorBombComboBlastTicks: number;
    /** how long rays wait before they start blasting */
    colorBombActivationTicks: number;
    /** for how long total rays animation should take */
    colorBombRayTicks: number;
    /** Ratio of single ray duration vs total rays duration */
    colorBombRayDelayTicks: number;
    /** goal item travel duration  */
    doorGoalCollectTicks: number;
    /** reserved ticks to play cells merge animation */
    mergeCellsTicks: number;
    /** reserved ticks to play common clear cells animation */
    commonGemClearCellsTicks: number;
    /** reserved ticks to play board shuffle animation */
    shuffleTicks: number;
    /** reserved delay before the booster starts kicking cells */
    kickRowBoosterDelayTicks: number;
    /** (-1 | 0 | 1) in which direction the booster is played, 0 means from the clicked cell in both directions */
    kickRowBoosterDirection: number;
    /** with interval 0 all the cells will be kicked at the same time, otherwise one by one  */
    kickRowBoosterIntervalTicks: number;
    /** in this mode we are also adding interval to the cells which are not present on the board  */
    kickRowBoosterIncludeMaxCols: boolean;
    /** reserved delay before the booster starts kicking cells */
    kickCellBoosterDelayTicks: number;
    /** reserved delay before the booster starts kicking cells */
    kickColumnBoosterDelayTicks: number;
    /** (-1 | 0 | 1) in which direction the booster is played, 0 means from the clicked cell in both directions */
    kickColumnBoosterDirection: number;
    /** with interval 0 all the cells will be kicked at the same time, otherwise one by one  */
    kickColumnBoosterIntervalTicks: number;
    /** in this mode we are also adding interval to the cells which are not present on the board  */
    kickColumnBoosterIncludeMaxRows: boolean;
    /** reserved delay after the booster kicked cells and those before cells unlocked */
    kickColumnBoosterFinalDelayTicks: number;
    /** reserved delay before the booster starts shuffling cells */
    shuffleBoosterDelayTicks: number;
    /** for how long exploded cells should be gravity locked */
    beamClearCellTicks: number;
} & LogsConfig;
export interface ISignalsHandler<SignalsMap> {
    get<K extends keyof SignalsMap>(key: K): SignalsMap[K];
    pipe(signalsHandler: ISignalsHandler<SignalsMap>): void;
    unPipe(signalsHandler: ISignalsHandler<SignalsMap>): void;
    clear(): void;
}
export type Props<T extends object, K extends keyof T> = T[K] extends (...params: any[]) => any ? Parameters<T[K]>[0] : T[K];
export type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};
export type Constructor<T> = new (...args: any[]) => T;
export type MakePropsRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type LoggerFeature = 'Generator' | 'GeneratorStep' | 'MatchesFound' | 'TasksCreated' | 'Board' | 'Bot';
export type Logger = {
    logFeature(feature: LoggerFeature, ...message: unknown[]): void;
    log(...message: unknown[]): void;
    error(...message: unknown[]): void;
    warn(...message: unknown[]): void;
};
export type PlainObject = object;
export interface IIdleStateObserver {
    onConnectedToIdleStateObservable(isIdle: boolean): void;
    onGameIdleStateChanged: (isIdle: boolean) => void;
}
export type CoreFacadeProps = {
    config: CoreConfig;
    logger: Logger;
    customBoard?: IBoard;
    customBoardProps?: BoardShellProps;
    customRandomGenerator?: IRandomGenerator;
    customTickGeneratorsManager?: ITickGeneratorsManager;
    customTaskManager?: ITaskManager;
    customTasksMap?: TasksMap;
    ignoreGravityManager?: boolean;
    customGravityManager?: IGravityManager;
};
export type BoardShellProps = {
    randomGenerator: IRandomGenerator;
    logger: Logger;
    config: CoreConfig;
    customGemsHandlers?: Record<GemCoreName, IGemHandler>;
    customGoalsPriorizer?: IGoalsPriorizer;
} & Partial<BoardProps>;
export {};
