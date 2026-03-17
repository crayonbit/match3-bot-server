import { Signal } from 'signals';
import { Match } from '../Matcher/MatcherTypes';
import { CreateTasksReturn } from '../TaskManager/TaskManagerTypes';
import { SignalsHandlerBase } from '../SignalsHandlerBase';
type TickStepSignalsMap = {
    onMatchesFound: Signal<{
        generatorId: number;
        matches: Match[];
    }>;
    onTasksCreated: Signal<{
        generatorId: number;
        tasks: CreateTasksReturn;
    }>;
};
export declare class TickStepsSignals extends SignalsHandlerBase<TickStepSignalsMap> {
    constructor();
}
export {};
