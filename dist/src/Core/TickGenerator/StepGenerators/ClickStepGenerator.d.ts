import { ClickGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class ClickStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    constructor(props: ClickGeneratorProps);
    tick(): TickIterator;
    isSettled(): boolean;
}
