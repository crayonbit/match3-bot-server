import { ShuffleStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class ShuffleStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly board;
    private readonly config;
    private shuffling;
    private shuffleFailed;
    constructor(props: ShuffleStepGeneratorProps);
    tick(): TickIterator;
    private shuffleWithProxy;
    isSettled(): boolean;
}
