"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotCore = void 0;
const lodash_1 = require("lodash");
const BoardTypes_1 = require("../Board/BoardTypes");
const ParseLevel_1 = require("../LevelParser/ParseLevel");
const ArrayUtils_1 = require("../Utils/ArrayUtils");
const RandomGeneratorPhaser_1 = require("../Utils/Math/RandomGeneratorPhaser");
const BotHelpers_1 = require("./BotHelpers");
const decisionChoiceGetters = {
    goals10plus: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected >= 10)),
    goals9: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 9)),
    goals8: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 8)),
    goals7: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 7)),
    goals6: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 6)),
    goals5: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 5)),
    goals4: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 4)),
    goals3: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 3)),
    goals2: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 2)),
    goals1: (sequenceData) => sequenceData.filter((data) => data.cascadingData.some((cascadingData) => cascadingData.goalsCollected === 1)),
    goals0: (sequenceData) => sequenceData.filter((data) => {
        return data.cascadingData.some((cascadingData) => {
            return cascadingData.goalsCollected === 0 && cascadingData.matchesFound.length > 0;
        });
    }),
};
class BotCore {
    constructor() {
        this.replayActions = {};
        this.levelSeedToLevel = {};
    }
    init(props) {
        this.rawLevel = props.rawLevel;
        this.defaultCoreConfig = props.defaultCoreConfig;
        this.decisionWeights = props.decisionWeights;
        this.bombStrategyPercent = props.bombStrategyPercent;
        this.usePreBoosters = props.usePreBoosters;
        this.cascadingTasksLimit = props.cascadingTasksLimit;
        this.logger = props.logger ?? this.getNoopLogger();
        this.replayActions = {};
        this.levelSeedToLevel = {};
    }
    getNoopLogger() {
        return {
            logFeature: (feature, ...message) => { },
            log: (...message) => { },
            error: (...message) => { },
            warn: (...message) => { },
        };
    }
    /**
     * @param {boolean} [testGridData] - After each test move on the board will be taken grid snapshot which will be compared with the grid data after the real move.
     */
    playLevel(props) {
        const { levelSeed, decisionSeed, testGridData } = props;
        const levelRandomGenerator = new RandomGeneratorPhaser_1.RandomGeneratorPhaser();
        const decisionRandomGenerator = new RandomGeneratorPhaser_1.RandomGeneratorPhaser();
        levelRandomGenerator.init([levelSeed.toString()]);
        decisionRandomGenerator.init([decisionSeed.toString()]);
        const coreConfig = { ...this.defaultCoreConfig, seed: levelSeed };
        const board = (0, BotHelpers_1.createBoard)({ randomGenerator: levelRandomGenerator, logger: this.logger, config: coreConfig });
        const level = this.parseLevelOrGetFromCache(board, this.rawLevel, levelSeed);
        board.loadLevel(level);
        const ticksManager = (0, BotHelpers_1.createTicksGeneratorsManager)({
            board,
            config: coreConfig,
        });
        let initialMovesCount = board.progressManager.getMovesCount();
        let failed = false;
        let completed = 0;
        let levelResult = null;
        board.progressManager.signals.get('onProgressSucceeded').add(() => {
            if (failed) {
                completed = 2;
                const result = {
                    kind: 'fail',
                    levelSeed,
                    decisionSeed,
                    movesMade: initialMovesCount - board.progressManager.getMovesCount(),
                };
                levelResult = result;
            }
            else {
                completed = 1;
                const result = {
                    kind: 'success',
                    levelSeed,
                    decisionSeed,
                    movesMade: initialMovesCount - board.progressManager.getMovesCount(),
                };
                levelResult = result;
            }
        });
        board.progressManager.signals.get('onProgressFailed').add(() => {
            failed = true;
            const extraMoves = 5;
            initialMovesCount += extraMoves;
            board.progressManager.increaseMovesBy(extraMoves);
        });
        if (this.usePreBoosters) {
            this.playPreBoosters({ ticksManager, levelSeed, decisionSeed });
        }
        while (completed === 0) {
            const boardDataForTest = this.getBoardDataForTestBeforeDecisionPick(board, testGridData);
            // eslint-disable-next-line no-await-in-loop
            const decisionMoves = this.playPossibleMovesAndPickByDecision({
                board,
                decisionRandomGenerator,
                cloneGridData: testGridData,
                generatorsIdCounter: ticksManager.getCurrentGeneratorsIdCounter(),
                coreConfig,
                decisionSeed,
                tasksLimit: this.cascadingTasksLimit > 0 ? this.cascadingTasksLimit : undefined,
            });
            this.testBoardDataAfterDecisionPick(board, boardDataForTest);
            for (const decisionMove of decisionMoves) {
                this.onMoveStarted({
                    ...decisionMove,
                    levelSeed,
                    decisionSeed,
                    tick: ticksManager.getCurrentTick(),
                }, testGridData ? board.grid.getDataClone() : undefined);
                const tickGenerator = ticksManager.play(decisionMove.cellA, decisionMove.cellB);
                (0, BotHelpers_1.tickTillCompleted)({ ticksManager, tickGenerator });
                if (testGridData) {
                    this.validateGridData(board, decisionMove.gridSnapshot);
                }
            }
        }
        board.signals.clear();
        if (!levelResult) {
            throw new Error('Something is wrong! Level result was not set!');
        }
        return levelResult;
    }
    parseLevelOrGetFromCache(board, raw, levelSeed) {
        if (this.levelSeedToLevel[levelSeed]) {
            return this.levelSeedToLevel[levelSeed];
        }
        const level = (0, ParseLevel_1.parseLevel)(board, raw);
        this.levelSeedToLevel[levelSeed] = level;
        return level;
    }
    getBoardDataForTestBeforeDecisionPick(board, testGridData) {
        if (!testGridData)
            return null;
        return {
            gridData: board.grid.getDataClone(),
            randomGeneratorState: board.randomGenerator.state(),
        };
    }
    testBoardDataAfterDecisionPick(board, boardDataForTest) {
        if (!boardDataForTest)
            return;
        if (!(0, lodash_1.isEqual)(board.grid.getDataClone(), boardDataForTest.gridData)) {
            this.logger.error('Grid data is not equal! Bot corrupted!');
        }
        if (board.randomGenerator.state() !== boardDataForTest.randomGeneratorState) {
            this.logger.error('Random generator state is not equal! Bot corrupted!');
        }
    }
    validateGridData(board, gridSnapshot) {
        if (!gridSnapshot) {
            this.logger.error('Grid snapshot was not provided for validation!');
            return;
        }
        if (!(0, lodash_1.isEqual)(board.grid.getDataClone(), gridSnapshot)) {
            this.logger.error('Grid data is not equal! Bot corrupted!');
        }
    }
    playPossibleMovesAndPickByDecision(props) {
        const { board, decisionRandomGenerator, cloneGridData, generatorsIdCounter, coreConfig, decisionSeed, tasksLimit } = props;
        const directions = [
            { col: 1, row: 0 },
            { col: 0, row: 1 },
        ];
        const cascadingResults = [];
        const useBombStrategy = this.bombStrategyPercent > 0 && decisionRandomGenerator.clone().realInRange(0, 100) < this.bombStrategyPercent;
        this.loopInDirections(board, directions, (cellA, cellB, direction, iteration) => {
            let swapBoard = null;
            let swapCascadingData = null;
            if (board.hasSwapMove(cellA, cellB)) {
                swapBoard = board.clone();
                const cascadingData = (0, BotHelpers_1.playMoveForSuccessfulCascades)({
                    cellA,
                    cellB,
                    board: swapBoard,
                    coreConfig,
                    generatorsIdCounter,
                    cloneGridData,
                    tasksLimit,
                });
                if (cascadingData) {
                    swapCascadingData = cascadingData;
                    cascadingResults.push({ cascadingData: [cascadingData] });
                }
            }
            if (board.isClickable(cellA) && direction.col === 0) {
                const cascadingData = (0, BotHelpers_1.playMoveForSuccessfulCascades)({
                    cellA,
                    board: board.clone(),
                    coreConfig,
                    generatorsIdCounter,
                    cloneGridData,
                    tasksLimit,
                });
                if (cascadingData) {
                    cascadingResults.push({ cascadingData: [cascadingData] });
                }
            }
            if (useBombStrategy && swapBoard && swapCascadingData) {
                cascadingResults.push(...this.performStrategicMove({
                    board: swapBoard,
                    cascadingData: swapCascadingData,
                    coreConfig,
                    generatorsIdCounter,
                    cloneGridData,
                    tasksLimit,
                }));
            }
        });
        return this.pickDecisionMove(cascadingResults, decisionRandomGenerator, coreConfig.seed, decisionSeed);
    }
    loopInDirections(board, directions, callback) {
        let i = 0;
        board.grid.loop((value, cell) => {
            directions.forEach((direction) => {
                callback(cell, { col: cell.col + direction.col, row: cell.row + direction.row }, direction, ++i);
            });
            return false;
        }, true);
    }
    /**
     * Strategy move is a sequence of moves that creates a bomb then triggers it
     */
    performStrategicMove(props) {
        const { board, cascadingData, coreConfig, generatorsIdCounter, cloneGridData, tasksLimit } = props;
        const cascadingResults = [];
        const bombCreationMatches = this.extractBombCreationMatches(cascadingData);
        if (bombCreationMatches.length === 0) {
            return [];
        }
        const bombCellA = {
            col: bombCreationMatches[0].changingGem.col,
            row: bombCreationMatches[0].changingGem.row,
        };
        const bombSwapDirections = [
            { col: 1, row: 0 },
            { col: -1, row: 0 },
            { col: 0, row: 1 },
            { col: 0, row: -1 },
        ];
        bombSwapDirections.forEach((bombSwapDirection) => {
            const bombCellB = {
                col: bombCellA.col + bombSwapDirection.col,
                row: bombCellA.row + bombSwapDirection.row,
            };
            if (board.hasSwapMove(bombCellA, bombCellB)) {
                const bombSwapCascadingData = (0, BotHelpers_1.playMoveForSuccessfulCascades)({
                    cellA: bombCellA,
                    cellB: bombCellB,
                    board: board.clone(),
                    coreConfig,
                    generatorsIdCounter: generatorsIdCounter + 100,
                    cloneGridData,
                    tasksLimit,
                });
                if (bombSwapCascadingData) {
                    cascadingResults.push({ cascadingData: [cascadingData, bombSwapCascadingData] });
                }
            }
        });
        if (board.isClickable(bombCellA)) {
            const bombClickCascadingData = (0, BotHelpers_1.playMoveForSuccessfulCascades)({
                cellA: bombCellA,
                board: board.clone(),
                coreConfig,
                generatorsIdCounter: generatorsIdCounter + 100,
                cloneGridData,
                tasksLimit,
            });
            if (bombClickCascadingData) {
                cascadingResults.push({ cascadingData: [cascadingData, bombClickCascadingData] });
            }
        }
        return cascadingResults;
    }
    pickDecisionMove(cascadingResults, decisionRandomGenerator, levelSeed, decisionSeed) {
        const decisionCascadesOptions = new Map();
        const decisionWeightsEntries = [];
        for (const [decision, weight] of Object.entries(this.decisionWeights)) {
            const decisionCascades = decisionChoiceGetters[decision](cascadingResults);
            if (decisionCascades.length > 0) {
                decisionCascadesOptions.set(decision, decisionCascades);
                decisionWeightsEntries.push([decision, weight]);
            }
        }
        const decisions = (0, ArrayUtils_1.spreadKeysWithWeights)(decisionWeightsEntries);
        if (decisions.length === 0) {
            this.logger.error(`No decisions available! levelSeed: ${levelSeed}, decisionSeed: ${decisionSeed}`);
            return [{ cellA: { col: 0, row: 0 } }];
        }
        const currentDecision = decisionRandomGenerator.pick(decisions);
        if (!decisionCascadesOptions.has(currentDecision)) {
            this.logger.error(`Decision has no options! levelSeed: ${levelSeed}, decisionSeed: ${decisionSeed}`);
            return [{ cellA: { col: 0, row: 0 } }];
        }
        const currentDecisionCascadesOptions = decisionCascadesOptions.get(currentDecision);
        const currentDecisionCascades = decisionRandomGenerator.pick(currentDecisionCascadesOptions);
        return currentDecisionCascades.cascadingData.map((cascadingData) => ({
            cellA: cascadingData.cellA,
            cellB: cascadingData.cellB,
            gridSnapshot: cascadingData.gridSnapshot,
        }));
    }
    extractBombCreationMatches(cascadingData) {
        return cascadingData.matchesFound[0].filter((match) => {
            return (match.patternName === 'fiveInARowPattern' ||
                match.patternName === 'fourInARowPattern' ||
                match.patternName === 'twoByTwoPattern' ||
                match.patternName === 'crossRowsPattern');
        });
    }
    playPreBoosters(props) {
        const { ticksManager, levelSeed, decisionSeed } = props;
        const preBoosters = [
            BoardTypes_1.PreBoosterType.PreBoosterA,
            BoardTypes_1.PreBoosterType.PreBoosterB,
            BoardTypes_1.PreBoosterType.PreBoosterC,
        ];
        this.replayActions[levelSeed] = this.replayActions[levelSeed] || {};
        this.replayActions[levelSeed][decisionSeed] = this.replayActions[levelSeed][decisionSeed] || [];
        this.replayActions[levelSeed][decisionSeed].push({
            tick: ticksManager.getCurrentTick(),
            playedCells: [],
            preBoosters,
        });
        const tickGenerator = ticksManager.playPreBoosters(preBoosters);
        (0, BotHelpers_1.tickTillCompleted)({ ticksManager, tickGenerator });
    }
    onMoveStarted(moveData, gridSnapshot) {
        const { levelSeed, decisionSeed, cellA, cellB, tick } = moveData;
        this.replayActions[levelSeed] = this.replayActions[levelSeed] || {};
        this.replayActions[levelSeed][decisionSeed] = this.replayActions[levelSeed][decisionSeed] || [];
        const playedCells = cellB ? [cellA, cellB] : [cellA];
        this.replayActions[levelSeed][decisionSeed].push({ tick, playedCells, gridSnapshot });
    }
    getReplayActions() {
        return this.replayActions;
    }
}
exports.BotCore = BotCore;
//# sourceMappingURL=BotCore.js.map