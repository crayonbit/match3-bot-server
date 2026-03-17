import { TaskStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class TaskStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private stepsModel;
    private taskManager;
    private signals;
    private taskIdGenerator;
    private readonly usedMatchesIds;
    constructor(props: TaskStepGeneratorProps);
    tick(): TickIterator;
    private tryCreateMatchTasks;
    private tryCreateQuestItemTasks;
    private tryCreateBoosterTasks;
    private tryCreatePreBoosterTasks;
    isSettled(): boolean;
}
