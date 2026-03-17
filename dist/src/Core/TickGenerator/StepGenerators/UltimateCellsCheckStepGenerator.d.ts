import { UltimateCellsCheckStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
/**
 * Performs one time cells to check addition, as soon as all previous steps and other generators are settled.
 */
export declare class UltimateCellsCheckStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    private checkPerformed;
    constructor(props: UltimateCellsCheckStepGeneratorProps);
    tick(): TickIterator;
    isSettled(): boolean;
}
