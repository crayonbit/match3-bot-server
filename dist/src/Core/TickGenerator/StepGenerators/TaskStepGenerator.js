"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStepGenerator = void 0;
const BoardTypes_1 = require("../../Board/BoardTypes");
const StepGenerator_1 = require("./StepGenerator");
const boosterTypeToTaskName = {
    [BoardTypes_1.BoosterType.KickCell]: 'kickCellBooster',
    [BoardTypes_1.BoosterType.KickRow]: 'kickRowBooster',
    [BoardTypes_1.BoosterType.KickColumn]: 'kickColumnBooster',
    [BoardTypes_1.BoosterType.Shuffle]: 'shuffleBooster',
};
class TaskStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'TaskStep';
        this.usedMatchesIds = new Set();
        this.stepsModel = props.stepsModel;
        this.taskManager = props.taskManager;
        this.signals = props.signals;
        this.taskIdGenerator = props.taskIdGenerator;
    }
    *tick() {
        while (true) {
            this.tryCreateMatchTasks();
            this.tryCreateQuestItemTasks();
            this.tryCreateBoosterTasks();
            this.tryCreatePreBoosterTasks();
            this.taskManager.tickTasks();
            yield { kind: 'stepEnd' };
        }
    }
    tryCreateMatchTasks() {
        const matches = this.stepsModel.getMatches().filter((match) => !this.usedMatchesIds.has(match.id));
        if (!matches.length)
            return;
        const tasks = this.taskManager.createTasksForMatches(matches);
        matches.forEach((match) => this.usedMatchesIds.add(match.id));
        if (tasks.length > 0) {
            this.signals.get('onTasksCreated').dispatch({ generatorId: this.generatorId, tasks });
        }
    }
    tryCreateQuestItemTasks() {
        const questItemsWithTargets = this.stepsModel.withdrawQuestItemsWithTargets();
        questItemsWithTargets.forEach((questItemWithTargets) => {
            this.taskManager.createTask('collectQuestItem', {
                ...questItemWithTargets,
                id: this.taskIdGenerator.generateTaskId(),
            });
        });
    }
    tryCreateBoosterTasks() {
        const boosterPlayData = this.stepsModel.withdrawBoosterPlayData();
        if (!boosterPlayData)
            return;
        this.taskManager.createTask(boosterTypeToTaskName[boosterPlayData.boosterType], {
            id: this.taskIdGenerator.generateTaskId(),
            cell: boosterPlayData.cell,
        });
    }
    tryCreatePreBoosterTasks() {
        const preBoostersPlayData = this.stepsModel.withdrawPreBoostersPlayData();
        if (!preBoostersPlayData)
            return;
        this.taskManager.createTask('preBoosters', {
            id: this.taskIdGenerator.generateTaskId(),
            preBoosters: preBoostersPlayData.preBoosters,
        });
    }
    isSettled() {
        return this.taskManager.getCurrentTasksCount() === 0;
    }
}
exports.TaskStepGenerator = TaskStepGenerator;
//# sourceMappingURL=TaskStepGenerator.js.map