import { TickGeneratorConfig, IStepGenerator, ITickGenerator, TickResult } from './TickGeneratorTypes';
import { TickGeneratorSignals } from './TickGeneratorSignals';
type TickGeneratorParams = {
    stepGenerators: IStepGenerator[];
    config: TickGeneratorConfig;
    generatorId: number;
    isOtherGeneratorsRunning: (excludedGeneratorId: number) => boolean;
};
export declare class TickGenerator implements ITickGenerator {
    readonly id: number;
    readonly signals: TickGeneratorSignals;
    private readonly config;
    private stepGenerators;
    private generator;
    constructor(params: TickGeneratorParams);
    start(): void;
    private startGenerator;
    tick(): TickResult;
    tickStep(): TickResult;
    get done(): boolean;
    destroy(): void;
}
export {};
