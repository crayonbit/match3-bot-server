import { SwapStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class SwapStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    constructor(props: SwapStepGeneratorProps);
    tick(): TickIterator;
    private addLocks;
    isSettled(): boolean;
}
