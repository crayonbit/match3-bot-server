"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = createBoard;
exports.createTicksGeneratorsManager = createTicksGeneratorsManager;
exports.tickTillCompleted = tickTillCompleted;
exports.playMoveForSuccessfulCascades = playMoveForSuccessfulCascades;
exports.playCascades = playCascades;
const BoardShell_1 = require("../Board/BoardShell");
const StepsModel_1 = require("../TickGenerator/StepsModel");
const TickGeneratorPlayer_1 = require("../TickGenerator/TickGeneratorPlayer");
const TickGeneratorShell_1 = require("../TickGenerator/TickGeneratorShell");
const TickGeneratorsManager_1 = require("../TickGenerator/TickGeneratorsManager");
const TickStepsSignals_1 = require("../TickGenerator/TickStepsSignals");
function createBoard(props) {
    const { randomGenerator, logger, config } = props;
    return new BoardShell_1.BoardShell({
        randomGenerator,
        logger,
        config,
    });
}
function createTicksGeneratorsManager(params) {
    const { board, config, generatorsIdCounter } = params;
    const ticksManager = new TickGeneratorsManager_1.TickGeneratorsManager({
        config,
        createTickGeneratorPlayer: (props) => {
            const { generatorId, isOtherGeneratorsRunning } = props;
            const stepsModel = new StepsModel_1.StepsModel(generatorId);
            const stepsSignals = new TickStepsSignals_1.TickStepsSignals();
            return new TickGeneratorPlayer_1.TickGeneratorPlayer({
                tickGenerator: new TickGeneratorShell_1.TickGeneratorShell({
                    board,
                    config,
                    stepsModel,
                    stepsSignals,
                    generatorId,
                    isOtherGeneratorsRunning,
                }),
                stepsModel,
                stepsSignals,
            });
        },
        generatorsIdCounter,
    });
    ticksManager.addIdleStateObserver(board.progressManager);
    return ticksManager;
}
/**
 * @param props - The properties for the function.
 * @param props.ticksManager - The tick generators manager.
 * @param props.tickGenerator - The tick generator.
 * @param props.tasksLimiter - If tasks limit is set, the function will wait for the tasks to be finished until the limit is reached, instead of waiting for the generator to be fully completed.
 * @returns void.
 */
function tickTillCompleted(props) {
    const { ticksManager, tickGenerator, tasksLimiter } = props;
    let generatorComplete = false;
    let tasksFinished = 0;
    let onTaskFinished = () => { };
    if (tasksLimiter) {
        onTaskFinished = (data) => {
            tasksFinished++;
            if (tasksFinished >= tasksLimiter.limit) {
                tasksLimiter.onLimitReached();
                tasksLimiter.onTaskFinished.remove(onTaskFinished);
            }
        };
        tasksLimiter.onTaskFinished.add(onTaskFinished);
    }
    tickGenerator.signals.get('onGeneratorComplete').addOnce(() => {
        generatorComplete = true;
    });
    while (!generatorComplete) {
        ticksManager.tick();
    }
    if (tasksLimiter) {
        tasksLimiter.onTaskFinished.remove(onTaskFinished);
    }
}
function playMoveForSuccessfulCascades(props) {
    const { cellA, cellB, board, coreConfig, cloneGridData, generatorsIdCounter, tasksLimit } = props;
    const { goalsCollected, matchesFound } = playCascades({
        board,
        cellA,
        cellB,
        coreConfig,
        generatorsIdCounter,
        tasksLimit,
    });
    if (goalsCollected > 0 || matchesFound.length > 0) {
        return {
            cellA,
            cellB,
            goalsCollected,
            matchesFound,
            gridSnapshot: cloneGridData ? board.grid.getDataClone() : undefined,
        };
    }
    return null;
}
function playCascades(props) {
    const { board, cellA, cellB, coreConfig, generatorsIdCounter, tasksLimit } = props;
    const ticksManager = createTicksGeneratorsManager({
        board,
        config: coreConfig,
        generatorsIdCounter,
    });
    const tickGenerator = ticksManager.play(cellA, cellB);
    const goalsBefore = board.progressManager.getTotalGoalsCount();
    const matchesFound = [];
    let goalsCollectedOnLimitReached = 0;
    let tasksLimitReached = false;
    ticksManager.tickStepsSignals.get('onMatchesFound').add(({ matches }) => {
        if (tasksLimitReached)
            return;
        matchesFound.push(structuredClone(matches));
    });
    let tasksLimiter;
    if (tasksLimit) {
        tasksLimiter = {
            onTaskFinished: board.signals.get('onTaskFinished'),
            limit: tasksLimit,
            onLimitReached: () => {
                tasksLimitReached = true;
                goalsCollectedOnLimitReached = board.progressManager.getTotalGoalsCount();
            },
        };
    }
    tickTillCompleted({ ticksManager, tickGenerator, tasksLimiter });
    const goalsAfter = tasksLimitReached ? goalsCollectedOnLimitReached : board.progressManager.getTotalGoalsCount();
    const goalsCollected = goalsBefore - goalsAfter;
    ticksManager.destroy();
    return { goalsCollected, matchesFound };
}
//# sourceMappingURL=BotHelpers.js.map