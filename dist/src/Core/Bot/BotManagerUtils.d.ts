import type { BotReplayActions } from '../Board/BoardTypes';
import type { BotCompletedResultBase, BotManagerPlayConfig, LevelResult, WorkerProps } from './BotTypes';
import type { CoreConfig } from '../Types';
export type BotTask = WorkerProps;
export declare const getConfigId: () => string;
export declare const sortRange: (range: [number, number]) => [number, number];
export declare const validateRange: (range: [number, number]) => [number, number];
/**
 * Serializes a CoreConfig instance (which may have getters) into a plain object.
 * Required for JSON serialization when sending config over HTTP.
 */
export declare const serializeCoreConfig: (coreConfig: CoreConfig) => CoreConfig;
export declare const buildBotTasks: (config: BotManagerPlayConfig) => BotTask[];
export declare const compileBotCompleteResult: (resultsPerSeed: Record<number, LevelResult[]>, botStartedAt: number, replayActions: BotReplayActions) => BotCompletedResultBase;
