"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileBotCompleteResult = exports.buildBotTasks = exports.serializeCoreConfig = exports.validateRange = exports.sortRange = exports.getConfigId = void 0;
const TruncateToTwoDecimals_1 = require("../Utils/Math/TruncateToTwoDecimals");
const getConfigId = () => crypto.randomUUID();
exports.getConfigId = getConfigId;
const sortRange = (range) => [...range].sort((a, b) => a - b);
exports.sortRange = sortRange;
const validateRange = (range) => {
    if (range.some((value) => value < 0)) {
        throw new Error('Range values must be positive');
    }
    return range;
};
exports.validateRange = validateRange;
/**
 * Serializes a CoreConfig instance (which may have getters) into a plain object.
 * Required for JSON serialization when sending config over HTTP.
 */
const serializeCoreConfig = (coreConfig) => ({
    maxDesignCols: coreConfig.maxDesignCols,
    maxDesignRows: coreConfig.maxDesignRows,
    seed: coreConfig.seed,
    tickDurationMs: coreConfig.tickDurationMs,
    maxAwaitingMatchTicks: coreConfig.maxAwaitingMatchTicks,
    gravityTicksInterval: coreConfig.gravityTicksInterval,
    gravityMaxColDelay: coreConfig.gravityMaxColDelay,
    gravityAcceleration: coreConfig.gravityAcceleration,
    bounceAmplitude: coreConfig.bounceAmplitude,
    bounceDuration: coreConfig.bounceDuration,
    bounceLoops: coreConfig.bounceLoops,
    gravityCellSettleTicks: coreConfig.gravityCellSettleTicks,
    swapTicks: coreConfig.swapTicks,
    swapComboTicks: coreConfig.swapComboTicks,
    swapWrongTicks: coreConfig.swapWrongTicks,
    bigBombBlastSuspenseTicks: coreConfig.bigBombBlastSuspenseTicks,
    bigBombBlastTicks: coreConfig.bigBombBlastTicks,
    bigBombBlastRippleTicks: coreConfig.bigBombBlastRippleTicks,
    colorBombBlastTicks: coreConfig.colorBombBlastTicks,
    lineBombBlastSuspenseTicks: coreConfig.lineBombBlastSuspenseTicks,
    lineBombBlastCellTicks: coreConfig.lineBombBlastCellTicks,
    rocketBlastCellTicks: coreConfig.rocketBlastCellTicks,
    minRocketBlastTicks: coreConfig.minRocketBlastTicks,
    rocketBlastCrossCellsTicks: coreConfig.rocketBlastCrossCellsTicks,
    bigBombsComboBlastSuspenseTicks: coreConfig.bigBombsComboBlastSuspenseTicks,
    bigBombsComboBlastTicks: coreConfig.bigBombsComboBlastTicks,
    rocketLineBombComboBlastCellTicks: coreConfig.rocketLineBombComboBlastCellTicks,
    colorBombComboBlastTicks: coreConfig.colorBombComboBlastTicks,
    colorBombActivationTicks: coreConfig.colorBombActivationTicks,
    colorBombRayTicks: coreConfig.colorBombRayTicks,
    colorBombRayDelayTicks: coreConfig.colorBombRayDelayTicks,
    doorGoalCollectTicks: coreConfig.doorGoalCollectTicks,
    mergeCellsTicks: coreConfig.mergeCellsTicks,
    commonGemClearCellsTicks: coreConfig.commonGemClearCellsTicks,
    shuffleTicks: coreConfig.shuffleTicks,
    kickRowBoosterDelayTicks: coreConfig.kickRowBoosterDelayTicks,
    kickRowBoosterDirection: coreConfig.kickRowBoosterDirection,
    kickRowBoosterIntervalTicks: coreConfig.kickRowBoosterIntervalTicks,
    kickRowBoosterIncludeMaxCols: coreConfig.kickRowBoosterIncludeMaxCols,
    kickCellBoosterDelayTicks: coreConfig.kickCellBoosterDelayTicks,
    kickColumnBoosterDelayTicks: coreConfig.kickColumnBoosterDelayTicks,
    kickColumnBoosterDirection: coreConfig.kickColumnBoosterDirection,
    kickColumnBoosterIntervalTicks: coreConfig.kickColumnBoosterIntervalTicks,
    kickColumnBoosterIncludeMaxRows: coreConfig.kickColumnBoosterIncludeMaxRows,
    kickColumnBoosterFinalDelayTicks: coreConfig.kickColumnBoosterFinalDelayTicks,
    shuffleBoosterDelayTicks: coreConfig.shuffleBoosterDelayTicks,
    beamClearCellTicks: coreConfig.beamClearCellTicks,
    logGenerator: coreConfig.logGenerator,
    logGeneratorStep: coreConfig.logGeneratorStep,
    logBoard: coreConfig.logBoard,
    logMatchesFound: coreConfig.logMatchesFound,
    logTasksCreated: coreConfig.logTasksCreated,
    logBot: coreConfig.logBot,
});
exports.serializeCoreConfig = serializeCoreConfig;
const buildBotTasks = (config) => {
    const [minLevelSeed, maxLevelSeed] = (0, exports.validateRange)((0, exports.sortRange)(config.levelSeedsRange));
    const [minDecisionSeed, maxDecisionSeed] = (0, exports.validateRange)((0, exports.sortRange)(config.decisionSeedsRange));
    const tasks = [];
    for (let levelSeed = minLevelSeed; levelSeed <= maxLevelSeed; levelSeed++) {
        for (let decisionSeed = minDecisionSeed; decisionSeed <= maxDecisionSeed; decisionSeed++) {
            tasks.push({ levelSeed, decisionSeed, testGridData: config.testGridData });
        }
    }
    return tasks;
};
exports.buildBotTasks = buildBotTasks;
const compileBotCompleteResult = (resultsPerSeed, botStartedAt, replayActions) => {
    const levelSeedResults = [];
    let minWinRate = 1;
    let maxWinRate = 0;
    let totalAttempts = 0;
    let totalWins = 0;
    let totalMovesMade = 0;
    Object.entries(resultsPerSeed).forEach(([seed, results]) => {
        const attempts = results.length;
        const succeededResults = results.filter((result) => result.kind === 'success');
        totalWins += succeededResults.length;
        totalAttempts += attempts;
        const totalMovesMadePerSeed = results.reduce((acc, result) => acc + result.movesMade, 0);
        const averageMovesMadePerSeed = Math.round(totalMovesMadePerSeed / attempts);
        totalMovesMade += totalMovesMadePerSeed;
        const winRate = (0, TruncateToTwoDecimals_1.truncateToTwoDecimals)(succeededResults.length / attempts);
        levelSeedResults.push({ levelSeed: Number(seed), winRate, movesMade: averageMovesMadePerSeed });
        minWinRate = Math.min(minWinRate, winRate);
        maxWinRate = Math.max(maxWinRate, winRate);
    });
    const averageWinRate = (0, TruncateToTwoDecimals_1.truncateToTwoDecimals)(totalWins / totalAttempts);
    const averageMovesMade = Math.round(totalMovesMade / totalAttempts);
    return {
        levelSeedResults,
        resultsPerSeed,
        winRatesRange: { min: minWinRate, max: maxWinRate },
        replayActions,
        processingTimeMs: performance.now() - botStartedAt,
        averageWinRate,
        averageMovesMade,
    };
};
exports.compileBotCompleteResult = compileBotCompleteResult;
//# sourceMappingURL=BotManagerUtils.js.map