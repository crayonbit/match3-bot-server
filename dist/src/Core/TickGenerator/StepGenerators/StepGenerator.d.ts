import { TickStepName, StepIterator, IStepGenerator, TickIterator } from '../TickGeneratorTypes';
export declare abstract class StepGenerator implements IStepGenerator {
    abstract name: TickStepName;
    protected generatorId: number;
    private readonly executionTicksInterval;
    protected isPreviousStepsSettled: () => boolean;
    protected isOtherGeneratorsRunning: (excludedGeneratorId: number) => boolean;
    constructor(props: {
        executionTicksInterval: number;
    });
    init(props: {
        generatorId: number;
        isPreviousStepsSettled: () => boolean;
        isOtherGeneratorsRunning: (excludedGeneratorId: number) => boolean;
    }): void;
    protected abstract tick(): TickIterator;
    isTimeToTick(tick: number): boolean;
    abstract isSettled(): boolean;
    protected createStepIterator(generator: () => TickIterator): StepIterator;
    getStepIterator(): StepIterator;
}
