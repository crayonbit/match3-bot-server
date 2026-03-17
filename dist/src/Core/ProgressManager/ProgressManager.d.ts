import type { IBoard, ILevel, ILevelGoal, LayerItemWithKey } from '../Board/BoardTypes';
import { ProgressManagerSignals } from './ProgressManagerSignals';
import type { CollectGoalMeta, GoalWithCount, IGoalsPriorizer, IProgressManager, ProgressHandlersMap } from './ProgressManagerTypes';
type ProgressManagerProps = {
    signals: ProgressManagerSignals;
    handlers: ProgressHandlersMap;
    goalsPriorizer: IGoalsPriorizer;
};
export declare class ProgressManager implements IProgressManager {
    readonly signals: ProgressManagerSignals;
    private readonly handlers;
    private readonly goalsPriorizer;
    private moves;
    private goals;
    private initialGoalsCounts;
    private initialGoalsTotalCount;
    private pendingOutcome;
    private connectedToIdleStateObservable;
    private isIdle;
    constructor(props: ProgressManagerProps);
    init(board: IBoard): void;
    loadLevel(level: ILevel): void;
    decrementMoves(): void;
    increaseMovesBy: (value: number) => void;
    tryCollectGoal(item: LayerItemWithKey, meta?: CollectGoalMeta): void;
    private canCollectGoal;
    isActiveGoal(item: LayerItemWithKey): boolean;
    getGoalPriority(item: LayerItemWithKey): number;
    private dispatchGoalChanged;
    private updateMoves;
    private tryHandleOutcome;
    private tryDispatchCompletion;
    onConnectedToIdleStateObservable(isIdle: boolean): void;
    onGameIdleStateChanged(isIdle: boolean): void;
    private ensureConnectedToIdleStateObservable;
    private isGoalsCompleted;
    private isOutOfMoves;
    /**
     * @param {string} condition - String which will be parsed and evaluated.
     * "moves" and goal names will be replaced with their amount.
     * E.g. "moves < 10 && c > 0" might be evaluated as "5 < 10 && 3 > 0" if moves = 5 and row goal with a name c = 3.
     * @returns {boolean} - Result of the evaluation.
     */
    evalProgressCondition(condition: string): boolean;
    private getCountOnBoard;
    getGoals(): ILevelGoal[];
    getInitialGoalsCounts(): GoalWithCount[];
    private getGoalCountByName;
    getGoalCount(item: LayerItemWithKey): number;
    getTotalGoalsCount(): number;
    getMovesCount(): number;
    private findGoalByItem;
    clone(): IProgressManager;
}
export {};
