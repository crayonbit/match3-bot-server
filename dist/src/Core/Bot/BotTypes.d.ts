import type { BotReplayActions, ILevelGridItemData } from '../Board/BoardTypes';
import type { IRawLevel } from '../LevelParser/LevelParserTypes';
import type { Match } from '../Matcher/MatcherTypes';
import type { Cell, CoreConfig, Range } from '../Types';
export type BotDecision = 'goals10plus' | 'goals9' | 'goals8' | 'goals7' | 'goals6' | 'goals5' | 'goals4' | 'goals3' | 'goals2' | 'goals1' | 'goals0';
export type BotDecisionWeights = Record<BotDecision, number>;
export type LevelSeedResult = {
    levelSeed: number;
    winRate: number;
    movesMade: number;
};
/**
 * Partial results returned during polling
 */
export type BotPartialResult = {
    kind: 'partial';
    resultsPerSeed: Record<number, LevelResult[]>;
    completedTasks: number;
    totalTasks: number;
    replayActions: BotReplayActions;
};
/**
 * @property {Range} winRatesRange - Min/Max average win rate among all level seeds
 */
export type BotCompletedResultBase = {
    levelSeedResults: LevelSeedResult[];
    resultsPerSeed: Record<number, LevelResult[]>;
    winRatesRange: Range;
    replayActions: BotReplayActions;
    processingTimeMs: number;
    averageWinRate: number;
    averageMovesMade: number;
};
export type BotCompletedResult = {
    kind: 'completed';
} & BotCompletedResultBase;
export type BotResult = BotPartialResult | BotCompletedResult;
export type BotSessionStartData = {
    sessions: BotManagerSession[];
    totalTasks: number;
};
export type BotManagerWithConfig = {
    manager: IBotManager;
    config: BotManagerPlayConfig;
};
export type BotManagerWithActiveConfig = BotManagerWithConfig & {
    configId: string;
};
export type BotManagerWithConfigId = Omit<BotManagerWithActiveConfig, 'config'>;
export type BotManagerSession = {
    configId: string;
    managerId: string;
    playConfig: BotManagerPlayConfig;
};
export type BotManagerPlayConfig = {
    coreConfig: CoreConfig;
    decisionWeights: BotDecisionWeights;
    bombStrategyPercent: number;
    usePreBoosters: boolean;
} & BotPlayProps;
export interface IBotManager {
    readonly id: string;
    play(config: BotManagerPlayConfig): Promise<{
        configId: string;
    }>;
    /** Use to poll for results - returns partial results during processing, completed result when done, or null if not found */
    getResults(configId: string): Promise<BotResult | null>;
    terminateSession(configId: string): Promise<void>;
    terminateAllSessions(): Promise<void>;
    resumeSession(sessionData: BotManagerSession, partialResult: BotPartialResult): Promise<void>;
}
export type ManagerWithLoad = {
    manager: IBotManager;
    /** Load percentage (0-1). E.g., 0.4 means this manager processes 40% of the total levels */
    getLoad: () => number;
};
export type BotProps = {
    coreConfig: CoreConfig;
    managers: ManagerWithLoad[];
    getDecisionWeights: () => BotDecisionWeights;
    getBombStrategyPercent: () => number;
    getUsePreBoosters: () => boolean;
    onLevelSucceeded?: (result: BaseLevelResult) => void;
    onLevelFailed?: (result: BaseLevelResult) => void;
    onBotCompleted?: (result: BotCompletedResult) => void;
    onBotProgress?: (result: BotPartialResult) => void;
    onSessionStarted?: (sessions: BotManagerSession[], totalTasks: number) => void;
    onSessionResultsUpdated?: (result: BotPartialResult) => void;
};
export type CascadingData = MoveCells & {
    goalsCollected: number;
    matchesFound: Match[][];
    gridSnapshot?: ILevelGridItemData[][];
};
export type SequentialCascadingData = {
    cascadingData: CascadingData[];
};
export type MoveCells = {
    cellA: Cell;
    cellB?: Cell;
};
export type DecisionMove = MoveCells & {
    gridSnapshot?: ILevelGridItemData[][];
};
export type MoveOptionsGetter = (cascadingData: SequentialCascadingData[]) => SequentialCascadingData[];
export type MoveData = MoveCells & {
    levelSeed: number;
    decisionSeed: number;
    tick: number;
};
export type BaseLevelResult = {
    levelSeed: number;
    decisionSeed: number;
    movesMade: number;
};
export type LevelSucceededResult = BaseLevelResult & {
    kind: 'success';
};
export type LevelFailedResult = BaseLevelResult & {
    kind: 'fail';
};
export type LevelResult = LevelSucceededResult | LevelFailedResult;
export type WorkerProps = {
    levelSeed: number;
    decisionSeed: number;
    testGridData: boolean;
};
export type BotPlayProps = {
    rawLevel: IRawLevel;
    levelSeedsRange: [number, number];
    decisionSeedsRange: [number, number];
    testGridData: boolean;
    tasksLimit: number;
};
export type WorkerConfig = {
    rawLevel: IRawLevel;
    coreConfig: CoreConfig;
    decisionWeights: BotDecisionWeights;
    bombStrategyPercent: number;
    usePreBoosters: boolean;
    tasksLimit: number;
};
export interface IBotWorkerBridge {
    uploadWorkerConfig(props: WorkerConfig): Promise<void>;
    playLevel(props: WorkerProps): Promise<LevelResult>;
    getReplayActions(): Promise<BotReplayActions>;
}
