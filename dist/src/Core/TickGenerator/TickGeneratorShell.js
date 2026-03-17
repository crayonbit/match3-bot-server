"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickGeneratorShell = void 0;
const TaskManager_1 = require("../TaskManager/TaskManager");
const TasksFactory_1 = require("../TaskManager/TasksFactory");
const TasksMap_1 = require("../TaskManager/TasksMap");
const BlastMatchStepGenerator_1 = require("./StepGenerators/BlastMatchStepGenerator");
const UltimateCellsCheckStepGenerator_1 = require("./StepGenerators/UltimateCellsCheckStepGenerator");
const ClickCulminateStepGenerator_1 = require("./StepGenerators/ClickCulminateStepGenerator");
const ClickStepGenerator_1 = require("./StepGenerators/ClickStepGenerator");
const GravityStepGenerator_1 = require("./StepGenerators/GravityStepGenerator");
const RegularMatchStepGenerator_1 = require("./StepGenerators/RegularMatchStepGenerator");
const ShuffleStepGenerator_1 = require("./StepGenerators/ShuffleStepGenerator");
const SpawnStepGenerator_1 = require("./StepGenerators/SpawnStepGenerator");
const SwapCulminateStepGenerator_1 = require("./StepGenerators/SwapCulminateStepGenerator");
const SwapStepGenerator_1 = require("./StepGenerators/SwapStepGenerator");
const TaskStepGenerator_1 = require("./StepGenerators/TaskStepGenerator");
const GravityCellsSwapsCollector_1 = require("./StepGenerators/Utils/GravityCellsSwapsCollector");
const TickGenerator_1 = require("./TickGenerator");
class TickGeneratorShell extends TickGenerator_1.TickGenerator {
    constructor(props) {
        const { board, config, stepsModel, stepsSignals, customTaskManager, customTasksMap, generatorId, isOtherGeneratorsRunning, } = props;
        const createTasksManager = () => {
            return new TaskManager_1.TaskManager({
                tasksFactory: new TasksFactory_1.TasksFactory({
                    board,
                    stepsModel,
                    config,
                    generatorId,
                    tasksMap: customTasksMap ?? (0, TasksMap_1.getDefaultTasksMap)(),
                }),
            });
        };
        const taskManager = customTaskManager ?? createTasksManager();
        const stepGeneratorsDependencies = {
            board,
            taskIdGenerator: board,
            taskManager,
            stepsModel,
            config,
            signals: stepsSignals,
            getGravityCellsSwapsCollector: (collectorBoard) => {
                return new GravityCellsSwapsCollector_1.GravityCellsSwapsCollector(collectorBoard);
            },
        };
        const gravityStepInterval = config.gravityTicksInterval;
        super({
            stepGenerators: [
                // order matters!
                new ClickStepGenerator_1.ClickStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new SwapStepGenerator_1.SwapStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new RegularMatchStepGenerator_1.RegularMatchStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new BlastMatchStepGenerator_1.BlastMatchStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: 1 }),
                new ClickCulminateStepGenerator_1.ClickCulminateStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new SwapCulminateStepGenerator_1.SwapCulminateStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new TaskStepGenerator_1.TaskStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: 1 }),
                new GravityStepGenerator_1.GravityStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new SpawnStepGenerator_1.SpawnStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new ShuffleStepGenerator_1.ShuffleStepGenerator({ ...stepGeneratorsDependencies, executionTicksInterval: gravityStepInterval }),
                new UltimateCellsCheckStepGenerator_1.UltimateCellsCheckStepGenerator({
                    ...stepGeneratorsDependencies,
                    executionTicksInterval: gravityStepInterval,
                }),
            ],
            config,
            generatorId,
            isOtherGeneratorsRunning,
        });
    }
}
exports.TickGeneratorShell = TickGeneratorShell;
//# sourceMappingURL=TickGeneratorShell.js.map