import { BoosterType, PreBoosterType } from '../Board/BoardTypes';
import type { Cell, IIdleStateObserver } from '../Types';
import { TickGeneratorSignals } from './TickGeneratorSignals';
import { TickGeneratorsManagerSignals } from './TickGeneratorsManagerSignals';
import type { ITickGeneratorPlayer, ITickGeneratorsManager, TickGeneratorProps } from './TickGeneratorTypes';
import { TickStepsSignals } from './TickStepsSignals';
type TicksManagerProps = TickGeneratorProps & {
    createTickGeneratorPlayer: (props: {
        generatorId: number;
        isOtherGeneratorsRunning: (excludedGeneratorId: number) => boolean;
    }) => ITickGeneratorPlayer;
    generatorsIdCounter?: number;
};
export declare class TickGeneratorsManager implements ITickGeneratorsManager {
    private config;
    readonly generatorSignals: TickGeneratorSignals;
    readonly tickStepsSignals: TickStepsSignals;
    readonly signals: TickGeneratorsManagerSignals;
    private createTickGeneratorPlayer;
    private tickTime;
    private currentTick;
    private currentIdleTick;
    private generators;
    private stepsMode;
    private generatorsIdCounter;
    private prevDispatchedDebugTick;
    private idleStateObservers;
    private rewindIdleMode;
    private readonly maxIdleRewindTicks;
    constructor(props: TicksManagerProps);
    play(cellA: Cell, cellB?: Cell): ITickGeneratorPlayer;
    playBooster(cell: Cell, boosterType: BoosterType): ITickGeneratorPlayer;
    playPreBoosters(preBoosters: PreBoosterType[]): ITickGeneratorPlayer;
    private launchNewGenerator;
    addIdleStateObserver(observer: IIdleStateObserver): void;
    removeIdleStateObserver(observer: IIdleStateObserver): void;
    setStepsMode(value: boolean): void;
    getStepsMode(): boolean;
    update(deltaTime: number): void;
    private handleRewindIdle;
    tick(): void;
    tickStep(): void;
    private dispatchTickStarted;
    private incrementTick;
    private onGeneratorTickStart;
    private clearGenerator;
    private tryDispatchIdleStarted;
    private notifyIdleStateChanged;
    isIdle(): boolean;
    /**
     * This mode is for rewinding the game when it's idle during the replay, so we don't wait for the replay action input.
     */
    setRewindIdleMode(value: boolean): void;
    getCurrentTick(): number;
    getCurrentGeneratorsIdCounter(): number;
    destroy(): void;
}
export {};
