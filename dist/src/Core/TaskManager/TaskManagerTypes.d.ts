import { Signal } from 'signals';
import type { QuestItemWithTargets, TaskFactoryStepModel, TickGeneratorConfig } from '../TickGenerator/TickGeneratorTypes';
import type { Cell } from '../Types';
import type { IBoard, PreBoosterType } from '../Board/BoardTypes';
import type { BigBombBlastMatch, BigBombsComboBlastMatch, ColorBombBigBombComboBlastMatch, ColorBombBlastMatch, ColorBombLineBombComboBlastMatch, ColorBombRocketComboBlastMatch, ColorBombsComboBlastMatch, CrossBombBlastMatch, LineBombBigBombComboBlastMatch, LineBombBlastMatch, LineBombsComboBlastMatch, Match, PatternNameToMatch, RocketBigBombComboBlastMatch, RocketBlastMatch, RocketLineBombComboBlastMatch, RocketsComboBlastMatch } from '../Matcher/MatcherTypes';
import type { BlastPatternName, PatternName } from '../Matcher/Patterns/PatternsTypes';
import type { OnTaskFinishedProps } from '../../Signals/SignalsTypes';
export interface ITaskManager {
    createTasksForMatches(matches: Match[]): CreateTasksReturn;
    createTask<T extends TaskName>(taskName: T, taskData: TaskNameToTaskData[T]): ITask<T>;
    tickTasks(): void;
    getCurrentTasksCount(): number;
}
export type TaskManagerCallbacks = {
    onCellKicked: (cell: Cell) => void;
};
export type CreateTasksReturn = Array<{
    match: Match;
    tasks: ITask[];
}>;
export type LineBombBlastTaskData = LineBombBlastMatch;
export type CrossBombBlastTaskData = CrossBombBlastMatch;
export type ColorBombBlastTaskData = ColorBombBlastMatch;
export type RocketBlastTaskData = RocketBlastMatch;
export type BigBombBlastTaskData = BigBombBlastMatch;
export type LineBombsComboBlastTaskData = LineBombsComboBlastMatch;
export type LineBombBigBombComboBlastTaskData = LineBombBigBombComboBlastMatch;
export type BigBombsComboBlastTaskData = BigBombsComboBlastMatch;
export type RocketLineBombComboBlastTaskData = RocketLineBombComboBlastMatch;
export type RocketBigBombComboBlastTaskData = RocketBigBombComboBlastMatch;
export type RocketsComboBlastTaskData = RocketsComboBlastMatch;
export type ColorBombLineBombComboBlastTaskData = ColorBombLineBombComboBlastMatch;
export type ColorBombBigBombComboBlastTaskData = ColorBombBigBombComboBlastMatch;
export type ColorBombRocketComboBlastTaskData = ColorBombRocketComboBlastMatch;
export type ColorBombsComboBlastTaskData = ColorBombsComboBlastMatch;
export type CollectQuestItemTaskData = {
    id: string;
} & QuestItemWithTargets;
export type LineBombBlastData = LineBombBlastTaskData & {
    suspenseDuration: number;
    duration: number;
};
export type CrossBombBlastData = CrossBombBlastTaskData & {
    suspenseDuration: number;
    duration: number;
};
export type RocketBlastData = RocketBlastTaskData & {
    duration: number;
};
type ColorBombBlastDurations = {
    duration: number;
    activationDuration: number;
    rayDuration: number;
    rayDelay: number;
};
export type ColorBombBlastData = ColorBombBlastTaskData & ColorBombBlastDurations;
export type BigBombBlastData = BigBombBlastTaskData & {
    suspenseDuration: number;
    duration: number;
};
export type LineBombsComboBlastData = LineBombsComboBlastTaskData & {
    suspenseDuration: number;
    duration: number;
};
export type LineBombBigBombComboBlastData = LineBombBigBombComboBlastTaskData & {
    suspenseDuration: number;
    duration: number;
};
export type BigBombsComboBlastData = BigBombsComboBlastTaskData & {
    suspenseDuration: number;
    duration: number;
};
export type RocketLineBombComboBlastData = RocketLineBombComboBlastTaskData & {
    duration: number;
};
export type RocketBigBombComboBlastData = RocketBigBombComboBlastTaskData & {
    duration: number;
};
export type RocketsComboBlastData = RocketsComboBlastTaskData & {
    durations: number[];
};
export type ColorBombLineBombComboBlastData = ColorBombLineBombComboBlastTaskData & ColorBombBlastDurations;
export type ColorBombBigBombComboBlastData = ColorBombBigBombComboBlastTaskData & ColorBombBlastDurations;
export type ColorBombRocketComboBlastData = ColorBombRocketComboBlastTaskData & ColorBombBlastDurations;
export type ColorBombsComboBlastData = ColorBombsComboBlastTaskData & {
    duration: number;
};
export type BlastData = LineBombBlastData | CrossBombBlastData | RocketBlastData | ColorBombBlastData | BigBombBlastData | LineBombsComboBlastData | LineBombBigBombComboBlastData | BigBombsComboBlastData | RocketLineBombComboBlastData | RocketBigBombComboBlastData | RocketsComboBlastData | ColorBombLineBombComboBlastData | ColorBombBigBombComboBlastData | ColorBombRocketComboBlastData | ColorBombsComboBlastData;
export type BlastDataForAnimation = BlastData & {
    animationId?: string;
};
export type BlastDataByPattern<P extends BlastPatternName> = P extends 'lineBombBlastPattern' ? LineBombBlastData : P extends 'crossBombBlastPattern' ? CrossBombBlastData : P extends 'rocketBlastPattern' ? RocketBlastData : P extends 'colorBombBlastPattern' ? ColorBombBlastData : P extends 'bigBombBlastPattern' ? BigBombBlastData : P extends 'lineBombsComboBlastPattern' ? LineBombsComboBlastData : P extends 'lineBombBigBombComboBlastPattern' ? LineBombBigBombComboBlastData : P extends 'bigBombsComboBlastPattern' ? BigBombsComboBlastData : P extends 'rocketLineBombComboBlastPattern' ? RocketLineBombComboBlastData : P extends 'rocketBigBombComboBlastPattern' ? RocketBigBombComboBlastData : P extends 'rocketsComboBlastPattern' ? RocketsComboBlastData : P extends 'colorBombLineBombComboBlastPattern' ? ColorBombLineBombComboBlastData : P extends 'colorBombBigBombComboBlastPattern' ? ColorBombBigBombComboBlastData : P extends 'colorBombRocketComboBlastPattern' ? ColorBombRocketComboBlastData : P extends 'colorBombsComboBlastPattern' ? ColorBombsComboBlastData : never;
export type TaskParams<T extends TaskNameToTaskData[TaskName]> = {
    stepsModel: TaskFactoryStepModel;
    board: IBoard;
    taskData: T;
    config: TickGeneratorConfig;
    generatorId: number;
};
export type TaskManagerProps = {
    tasksFactory: ITasksFactory;
};
export type TaskName = PatternName | 'collectQuestItem' | 'kickCellBooster' | 'kickRowBooster' | 'kickColumnBooster' | 'shuffleBooster' | 'preBoosters';
export type TaskNameToTaskData = {
    threeInARowPattern: PatternNameToMatch['threeInARowPattern'];
    fourInARowPattern: PatternNameToMatch['fourInARowPattern'];
    fiveInARowPattern: PatternNameToMatch['fiveInARowPattern'];
    twoByTwoPattern: PatternNameToMatch['twoByTwoPattern'];
    crossRowsPattern: PatternNameToMatch['crossRowsPattern'];
    dropGoalPattern: PatternNameToMatch['dropGoalPatter'];
    lineBombBlastPattern: PatternNameToMatch['lineBombBlastPattern'];
    crossBombBlastPattern: PatternNameToMatch['crossBombBlastPattern'];
    rocketBlastPattern: PatternNameToMatch['rocketBlastPattern'];
    colorBombBlastPattern: PatternNameToMatch['colorBombBlastPattern'];
    bigBombBlastPattern: PatternNameToMatch['bigBombBlastPattern'];
    lineBombsComboBlastPattern: PatternNameToMatch['lineBombsComboBlastPattern'];
    lineBombBigBombComboBlastPattern: PatternNameToMatch['lineBombBigBombComboBlastPattern'];
    bigBombsComboBlastPattern: PatternNameToMatch['bigBombsComboBlastPattern'];
    rocketLineBombComboBlastPattern: PatternNameToMatch['rocketLineBombComboBlastPattern'];
    rocketBigBombComboBlastPattern: PatternNameToMatch['rocketBigBombComboBlastPattern'];
    rocketsComboBlastPattern: PatternNameToMatch['rocketsComboBlastPattern'];
    colorBombLineBombComboBlastPattern: PatternNameToMatch['colorBombLineBombComboBlastPattern'];
    colorBombBigBombComboBlastPattern: PatternNameToMatch['colorBombBigBombComboBlastPattern'];
    colorBombRocketComboBlastPattern: PatternNameToMatch['colorBombRocketComboBlastPattern'];
    colorBombsComboBlastPattern: PatternNameToMatch['colorBombsComboBlastPattern'];
    collectQuestItem: CollectQuestItemTaskData;
    kickCellBooster: {
        id: string;
        cell: Cell;
    };
    kickRowBooster: {
        id: string;
        cell: Cell;
    };
    kickColumnBooster: {
        id: string;
        cell: Cell;
    };
    shuffleBooster: {
        id: string;
        cell: Cell;
    };
    preBoosters: {
        id: string;
        preBoosters: PreBoosterType[];
    };
};
export interface ITasksFactory {
    createTask<T extends TaskName>(taskName: T, taskData: TaskNameToTaskData[T]): ITask<T>;
}
export interface ITask<T extends TaskName = TaskName> {
    name: T;
    init(taskParams: TaskParams<TaskNameToTaskData[T]>): ITask<T>;
    execute(): IterableIterator<void>;
    getTaskData(): TaskNameToTaskData[T];
}
export type TaskFactoryProps = {
    tasksMap: Record<TaskName, new () => ITask>;
    stepsModel: TaskFactoryStepModel;
    board: IBoard;
    config: TickGeneratorConfig;
    generatorId: number;
};
export type TasksMap = Record<TaskName, new () => ITask>;
export type TaskDataWithName<T extends TaskName = TaskName> = {
    taskName: T;
    taskData: TaskNameToTaskData[T];
};
export type TaskLimiterProps = {
    onTaskFinished: Signal<OnTaskFinishedProps>;
    limit: number;
    onLimitReached: () => void;
};
export {};
