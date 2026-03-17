import { ClickCulminateStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class ClickCulminateStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    constructor(props: ClickCulminateStepGeneratorProps);
    tick(): TickIterator;
    private isClickCellMatched;
    isSettled(): boolean;
}
