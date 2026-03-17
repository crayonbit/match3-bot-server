import type { IBoard, ILevel, ILevelGoal, ILevelGridItemData, LayerItemKey, LayerItemWithKey } from '../Board/BoardTypes';
import { RawGoalName } from '../LevelParser/LevelParserTypes';
import { TickGeneratorStarter } from '../TickGenerator/TickGeneratorTypes';
import { IIdleStateObserver } from '../Types';
import type { ProgressManagerSignals } from './ProgressManagerSignals';
export interface IProgressManager extends IIdleStateObserver {
    readonly signals: ProgressManagerSignals;
    init(board: IBoard): void;
    loadLevel(level: ILevel): void;
    decrementMoves(): void;
    increaseMovesBy(value: number): void;
    tryCollectGoal(props: LayerItemWithKey, meta?: CollectGoalMeta): void;
    /**
     * @param {string} condition - String which will be parsed and evaluated.
     * "moves" and goal names will be replaced with their amount.
     * E.g. "moves < 10 && c > 0" might be evaluated as "5 < 10 && 3 > 0" if moves = 5 and row goal with a name c = 3.
     * @returns {boolean} - Result of the evaluation.
     */
    evalProgressCondition(condition: string): boolean;
    getGoals(): ILevelGoal[];
    isActiveGoal(item: LayerItemWithKey): boolean;
    /** Returns priority points starting from 1. If less than 1, then it is not an active goal */
    getGoalPriority(item: LayerItemWithKey): number;
    getGoalCount(item: LayerItemWithKey): number;
    getTotalGoalsCount(): number;
    getInitialGoalsCounts(): GoalWithCount[];
    getMovesCount(): number;
    clone(): IProgressManager;
}
export interface IProgressHandler<K extends LayerItemKey = LayerItemKey> {
    init(props: {
        board: IBoard;
    }): void;
    getGoalName(item: NonNullable<ILevelGridItemData[K]>): RawGoalName | null;
    canCollectGoal(item: NonNullable<ILevelGridItemData[K]>): boolean;
    getCountOnBoard(goalName: RawGoalName): number | null;
    clone(): IProgressHandler<K>;
}
export type ProgressHandlersMap = Partial<Record<LayerItemKey, IProgressHandler>>;
export type OnGoalChangedProps = {
    item: LayerItemWithKey;
    goal: ILevelGoal;
    countDelta: number;
    meta?: CollectGoalMeta;
};
export type OnMovesChangedProps = {
    moves: number;
    oldMoves: number;
};
export interface IGoalsPriorizer {
    getGoalPriority(item: LayerItemWithKey): number;
    clone(): IGoalsPriorizer;
}
export type CollectGoalMeta = {
    generatorId: number;
    generatorStarter: TickGeneratorStarter | null;
};
export type GoalWithCount = {
    name: RawGoalName;
    count: number;
};
