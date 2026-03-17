import { SwapCulminateStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class SwapCulminateStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    private readonly config;
    private lockedCells;
    private swapActionKindTicks;
    constructor(props: SwapCulminateStepGeneratorProps);
    tick(): TickIterator;
    private getSwapGems;
    private addLocks;
    private removeLocks;
    private isComboGem;
    isSettled(): boolean;
}
