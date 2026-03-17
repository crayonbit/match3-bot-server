import type { TickStepName, StepIterator, TickIterator } from './TickGeneratorTypes';
export declare function awaitStepIterators(params: {
    stepIterators: StepIterator[];
    /**
     * The number of ticks after which isAllSettled will be checked.
     */
    settledCheckTicksInterval: number;
    onTickStart: (tickNumber: number) => void;
    onStepEnter: (stepName: TickStepName) => void;
    onStepExit: (stepName: TickStepName, settled: boolean) => void;
    onTickEnd: (tickNumber: number) => void;
}): TickIterator;
