import { LayerItemWithKey } from '../Board/BoardTypes';
import { IGoalsPriorizer } from './ProgressManagerTypes';
export declare class GoalsPriorizer implements IGoalsPriorizer {
    private readonly goalPriorityMap;
    getGoalPriority(layer: LayerItemWithKey): number;
    clone(): IGoalsPriorizer;
}
