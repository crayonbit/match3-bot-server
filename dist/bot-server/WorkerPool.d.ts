import type { LevelResult } from '../src/Core/Bot/BotTypes';
type WorkerMessage = Record<string, unknown>;
export declare class WorkerPool {
    private readonly workers;
    private readonly free;
    private readonly waitQueue;
    constructor(workerPath: string, size?: number);
    get size(): number;
    /**
     * Broadcasts the init config to every worker so each BotCore instance is ready.
     */
    broadcastInit(config: WorkerMessage): Promise<void[]>;
    playLevel(payload: WorkerMessage): Promise<LevelResult>;
    getReplayActionsFromAll(): Promise<unknown[]>;
    terminate(): Promise<number[]>;
    private runPlay;
}
export {};
