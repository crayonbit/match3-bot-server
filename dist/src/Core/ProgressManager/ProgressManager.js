"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressManager = void 0;
const ProgressManagerSignals_1 = require("./ProgressManagerSignals");
class ProgressManager {
    constructor(props) {
        this.moves = 0;
        this.goals = [];
        this.initialGoalsCounts = [];
        this.initialGoalsTotalCount = 0;
        this.pendingOutcome = false;
        this.connectedToIdleStateObservable = false;
        this.isIdle = false;
        this.increaseMovesBy = (value) => {
            const newValue = Math.max(this.moves + value, 0);
            if (newValue > this.moves) {
                this.pendingOutcome = false;
            }
            this.updateMoves(newValue);
        };
        this.signals = props.signals;
        this.handlers = props.handlers;
        this.goalsPriorizer = props.goalsPriorizer;
        this.signals.get('increaseMovesBy').add(this.increaseMovesBy);
    }
    init(board) {
        Object.values(this.handlers).forEach((handler) => handler.init({ board }));
    }
    loadLevel(level) {
        this.moves = level.moves;
        this.goals = level.goals.map((goal) => ({ ...goal }));
        this.initialGoalsTotalCount = this.getTotalGoalsCount();
        this.initialGoalsCounts = this.goals.map((goal) => ({ name: goal.rawName, count: goal.count }));
    }
    decrementMoves() {
        if (this.pendingOutcome)
            return;
        this.updateMoves(this.moves - 1);
    }
    tryCollectGoal(item, meta) {
        this.ensureConnectedToIdleStateObservable();
        const goal = this.findGoalByItem(item);
        if (!goal || !this.canCollectGoal(item) || goal.count <= 0)
            return;
        const countDelta = -1;
        goal.count += countDelta;
        this.dispatchGoalChanged({ item, goal, countDelta, meta });
        this.tryHandleOutcome();
    }
    canCollectGoal(item) {
        return this.handlers[item.layerKey]?.canCollectGoal(item.item) ?? false;
    }
    isActiveGoal(item) {
        const goal = this.findGoalByItem(item);
        return !!goal && goal.count > 0;
    }
    getGoalPriority(item) {
        if (!this.isActiveGoal(item)) {
            return 0;
        }
        return this.goalsPriorizer.getGoalPriority(item);
    }
    dispatchGoalChanged(props) {
        this.signals.get('onGoalChanged').dispatch(props);
    }
    updateMoves(moves) {
        this.ensureConnectedToIdleStateObservable();
        if (moves < 0 || moves === this.moves)
            return;
        const oldMoves = this.moves;
        this.moves = Math.max(moves, 0);
        this.signals.get('onMovesChanged').dispatch({ moves: this.moves, oldMoves });
        this.tryHandleOutcome();
    }
    tryHandleOutcome() {
        if (this.pendingOutcome)
            return;
        const gamePlayCompleted = this.isGoalsCompleted() || this.isOutOfMoves();
        if (!gamePlayCompleted)
            return;
        this.pendingOutcome = true;
        this.signals.get('onPendingOutcome').dispatch();
        this.tryDispatchCompletion();
    }
    tryDispatchCompletion() {
        if (!this.pendingOutcome || !this.isIdle)
            return;
        if (this.isGoalsCompleted()) {
            this.signals.get('onProgressSucceeded').dispatch();
        }
        else if (this.isOutOfMoves()) {
            this.signals.get('onProgressFailed').dispatch();
        }
    }
    onConnectedToIdleStateObservable(isIdle) {
        if (this.connectedToIdleStateObservable)
            return;
        this.connectedToIdleStateObservable = true;
        this.onGameIdleStateChanged(isIdle);
    }
    onGameIdleStateChanged(isIdle) {
        this.isIdle = isIdle;
        this.tryDispatchCompletion();
    }
    ensureConnectedToIdleStateObservable() {
        if (!this.connectedToIdleStateObservable) {
            throw new Error('ProgressManager is not connected to the IdleStateObservable');
        }
    }
    isGoalsCompleted() {
        return this.goals.every((goal) => goal.count <= 0);
    }
    isOutOfMoves() {
        return this.moves <= 0;
    }
    /**
     * @param {string} condition - String which will be parsed and evaluated.
     * "moves" and goal names will be replaced with their amount.
     * E.g. "moves < 10 && c > 0" might be evaluated as "5 < 10 && 3 > 0" if moves = 5 and row goal with a name c = 3.
     * @returns {boolean} - Result of the evaluation.
     */
    evalProgressCondition(condition) {
        const goalNames = this.goals.map((goal) => goal.rawName).sort((a, b) => b.length - a.length);
        try {
            const patternsToReplace = ['moves', 'countOnBoard\\((.+)\\)', 'goalsPercent', ...goalNames].join('|');
            const conditionParsed = condition.replace(new RegExp(patternsToReplace, 'g'), (match) => {
                if (match.startsWith('countOnBoard')) {
                    const goalName = match.replace('countOnBoard(', '').replace(')', '');
                    return `${this.getCountOnBoard(goalName)}`;
                }
                if (match === 'goalsPercent') {
                    return `${(this.getTotalGoalsCount() / this.initialGoalsTotalCount) * 100}`;
                }
                return match === 'moves' ? `${this.moves}` : `${this.getGoalCountByName(match)}`;
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, no-eval
            return eval(conditionParsed);
        }
        catch (e) {
            return false;
        }
    }
    getCountOnBoard(name) {
        for (const handler of Object.values(this.handlers)) {
            const count = handler.getCountOnBoard(name);
            if (count === null)
                continue;
            return count;
        }
        return 0;
    }
    getGoals() {
        return this.goals.map((goal) => ({ ...goal }));
    }
    getInitialGoalsCounts() {
        return this.initialGoalsCounts.map((goal) => ({ ...goal }));
    }
    getGoalCountByName(name) {
        const goal = this.goals.find((g) => g.rawName === name);
        return goal ? goal.count : 0;
    }
    getGoalCount(item) {
        const goal = this.findGoalByItem(item);
        return goal ? goal.count : 0;
    }
    getTotalGoalsCount() {
        return this.goals.reduce((acc, goal) => acc + goal.count, 0);
    }
    getMovesCount() {
        return this.moves;
    }
    findGoalByItem(item) {
        const goalName = this.handlers[item.layerKey]?.getGoalName(item.item) ?? null;
        if (!goalName)
            return null;
        return this.goals.find((levelGoal) => levelGoal.rawName === goalName) ?? null;
    }
    clone() {
        const clone = new ProgressManager({
            signals: new ProgressManagerSignals_1.ProgressManagerSignals(),
            handlers: Object.entries(this.handlers).reduce((acc, [layerKey, handler]) => {
                acc[layerKey] = handler.clone();
                return acc;
            }, {}),
            goalsPriorizer: this.goalsPriorizer.clone(),
        });
        clone.moves = this.moves;
        clone.goals = this.goals.map((goal) => ({ ...goal }));
        clone.pendingOutcome = this.pendingOutcome;
        clone.isIdle = this.isIdle;
        return clone;
    }
}
exports.ProgressManager = ProgressManager;
//# sourceMappingURL=ProgressManager.js.map