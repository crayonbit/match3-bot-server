import { IBoard } from '../Board/BoardTypes';
import { ITaskManager, TasksMap } from '../TaskManager/TaskManagerTypes';
import { StepsModel } from './StepsModel';
import { TickGenerator } from './TickGenerator';
import { TickGeneratorConfig } from './TickGeneratorTypes';
import { TickStepsSignals } from './TickStepsSignals';
type TickGeneratorProps = {
    board: IBoard;
    config: TickGeneratorConfig;
    stepsModel: StepsModel;
    stepsSignals: TickStepsSignals;
    generatorId: number;
    isOtherGeneratorsRunning: (excludedGeneratorId: number) => boolean;
    customTaskManager?: ITaskManager;
    customTasksMap?: TasksMap;
};
export declare class TickGeneratorShell extends TickGenerator {
    constructor(props: TickGeneratorProps);
}
export {};
