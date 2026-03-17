"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * BotNodeWorker — Node.js worker_threads equivalent of BotWorker.ts.
 * Runs inside a worker thread; communicates with the parent via parentPort.
 */
const worker_threads_1 = require("worker_threads");
const BotCore_1 = require("../src/Core/Bot/BotCore");
if (!worker_threads_1.parentPort) {
    throw new Error('BotNodeWorker must be run inside a worker thread');
}
const logger = {
    logFeature: console.log,
    log: console.log,
    warn: console.warn,
    error: console.error,
};
const botCore = new BotCore_1.BotCore();
worker_threads_1.parentPort.on('message', (data) => {
    const msg = data;
    if ('coreConfig' in msg &&
        'rawLevel' in msg &&
        'decisionWeights' in msg &&
        'bombStrategyPercent' in msg &&
        'usePreBoosters' in msg &&
        'tasksLimit' in msg) {
        botCore.init({
            rawLevel: msg.rawLevel,
            defaultCoreConfig: msg.coreConfig,
            decisionWeights: msg.decisionWeights,
            bombStrategyPercent: msg.bombStrategyPercent,
            usePreBoosters: msg.usePreBoosters,
            cascadingTasksLimit: msg.tasksLimit,
            logger,
        });
        worker_threads_1.parentPort.postMessage({ type: 'initialized' });
    }
    else if ('levelSeed' in msg && 'decisionSeed' in msg) {
        const result = botCore.playLevel(msg);
        worker_threads_1.parentPort.postMessage({ type: 'levelResult', result });
    }
    else if (msg.message === 'getReplayActions') {
        worker_threads_1.parentPort.postMessage({ type: 'replayActions', data: botCore.getReplayActions() });
    }
});
//# sourceMappingURL=BotNodeWorker.js.map