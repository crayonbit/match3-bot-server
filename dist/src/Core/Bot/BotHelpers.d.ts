import { IBoard } from '../Board/BoardTypes';
import { Match } from '../Matcher/MatcherTypes';
import { ITickGeneratorPlayer, ITickGeneratorsManager, TickGeneratorConfig } from '../TickGenerator/TickGeneratorTypes';
import { Cell, CoreConfig, Logger } from '../Types';
import { IRandomGenerator } from '../Utils/UtilsTypes';
import { CascadingData, MoveCells } from './BotTypes';
import { TaskLimiterProps } from '../TaskManager/TaskManagerTypes';
export declare function createBoard(props: {
    randomGenerator: IRandomGenerator;
    logger: Logger;
    config: CoreConfig;
}): IBoard;
export declare function createTicksGeneratorsManager(params: {
    board: IBoard;
    config: TickGeneratorConfig;
    generatorsIdCounter?: number;
}): ITickGeneratorsManager;
/**
 * @param props - The properties for the function.
 * @param props.ticksManager - The tick generators manager.
 * @param props.tickGenerator - The tick generator.
 * @param props.tasksLimiter - If tasks limit is set, the function will wait for the tasks to be finished until the limit is reached, instead of waiting for the generator to be fully completed.
 * @returns void.
 */
export declare function tickTillCompleted(props: {
    ticksManager: ITickGeneratorsManager;
    tickGenerator: ITickGeneratorPlayer;
    tasksLimiter?: TaskLimiterProps;
}): void;
export declare function playMoveForSuccessfulCascades(props: {
    cellA: Cell;
    cellB?: Cell;
    board: IBoard;
    coreConfig: CoreConfig;
    generatorsIdCounter: number;
    cloneGridData?: boolean;
    tasksLimit?: number;
}): CascadingData | null;
export declare function playCascades(props: MoveCells & {
    board: IBoard;
    coreConfig: CoreConfig;
    generatorsIdCounter: number;
    tasksLimit?: number;
}): {
    goalsCollected: number;
    matchesFound: Match[][];
};
