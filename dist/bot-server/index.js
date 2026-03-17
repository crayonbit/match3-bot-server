"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const WorkerPool_1 = require("./WorkerPool");
const BotManagerUtils_1 = require("../src/Core/Bot/BotManagerUtils");
const app = (0, express_1.default)();
// CORS — restrict origins via ALLOWED_ORIGINS env var (comma-separated).
// Defaults to all origins in development; lock this down in production.
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim());
app.use((0, cors_1.default)({
    origin: allowedOrigins ?? true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json({ limit: '10mb' }));
const PORT = parseInt(process.env.PORT ?? '3000', 10);
const WORKER_COUNT = parseInt(process.env.WORKER_COUNT ?? String(os.cpus().length), 10);
// BotNodeWorker.js lives next to this file after compilation
const WORKER_PATH = path.join(__dirname, 'BotNodeWorker.js');
const workerPool = new WorkerPool_1.WorkerPool(WORKER_PATH, WORKER_COUNT);
const jobs = new Map();
// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
/**
 * POST /bot/play
 *
 * Starts a bot run and returns a configId.
 * Server-side queue orchestration and worker scheduling run in the background.
 *
 * Body: BotManagerPlayConfig
 * Response: { configId: string }
 */
app.post('/bot/play', async (req, res, next) => {
    const config = req.body;
    const { rawLevel, coreConfig, decisionWeights } = config;
    if (!rawLevel || !coreConfig || !decisionWeights) {
        res.status(400).json({ error: 'Missing required fields: rawLevel, coreConfig, decisionWeights' });
        return;
    }
    try {
        const configId = (0, crypto_1.randomUUID)();
        jobs.set(configId, {
            done: false,
            result: null,
            resultsPerSeed: {},
            completedTasks: 0,
            totalTasks: 0,
        });
        void runBotJob(configId, config);
        res.json({ configId });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /bot/results/:configId
 *
 * Poll bot run completion status.
 * Returns partial results with progress while processing,
 * then the full BotCompletedResult once done, or null if not found.
 */
app.get('/bot/results/:configId', (req, res) => {
    const { configId } = req.params;
    const job = jobs.get(configId);
    if (!job) {
        res.json(null);
        return;
    }
    // Return partial results while processing
    if (!job.done) {
        const partialResult = {
            kind: 'partial',
            resultsPerSeed: job.resultsPerSeed,
            completedTasks: job.completedTasks,
            totalTasks: job.totalTasks,
        };
        res.json(partialResult);
        return;
    }
    jobs.delete(configId);
    if (job.error) {
        res.status(500).json({ error: job.error.message });
        return;
    }
    if (job.result) {
        const completedResult = {
            kind: 'completed',
            ...job.result,
        };
        res.json(completedResult);
    }
    else {
        res.json(null);
    }
});
/**
 * GET /health
 * Simple liveness probe for ALB / ECS health checks.
 */
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', workers: workerPool.size });
});
// ---------------------------------------------------------------------------
// Error handler
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});
// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
const server = app.listen(PORT, () => {
    console.log(`Bot server listening on port ${PORT} — ${workerPool.size} worker thread(s) ready`);
});
// Graceful shutdown (SIGTERM is sent by ECS/ALB during rolling deployments)
const shutdown = async () => {
    console.log('Shutting down — waiting for in-flight requests…');
    server.close(async () => {
        await workerPool.terminate();
        process.exit(0);
    });
};
process.on('SIGTERM', () => {
    void shutdown();
});
process.on('SIGINT', () => {
    void shutdown();
});
async function runBotJob(configId, config) {
    try {
        await workerPool.broadcastInit({
            rawLevel: config.rawLevel,
            coreConfig: config.coreConfig,
            decisionWeights: config.decisionWeights,
            bombStrategyPercent: config.bombStrategyPercent,
            usePreBoosters: config.usePreBoosters,
            tasksLimit: config.tasksLimit,
        });
        const botStartedAt = performance.now();
        const tasks = (0, BotManagerUtils_1.buildBotTasks)(config);
        const resultsPerSeed = {};
        let taskIndex = 0;
        // Initialize job tracking
        const job = jobs.get(configId);
        job.totalTasks = tasks.length;
        const getNextTask = () => {
            if (taskIndex >= tasks.length) {
                return undefined;
            }
            const task = tasks[taskIndex];
            taskIndex += 1;
            return task;
        };
        const runWorkerQueue = () => {
            const task = getNextTask();
            if (!task) {
                return Promise.resolve();
            }
            return workerPool.playLevel(task).then((result) => {
                resultsPerSeed[task.levelSeed] = resultsPerSeed[task.levelSeed] || [];
                resultsPerSeed[task.levelSeed].push(result);
                // Update job progress
                job.resultsPerSeed = resultsPerSeed;
                job.completedTasks++;
                return runWorkerQueue();
            });
        };
        await Promise.all(Array.from({ length: workerPool.size }, () => runWorkerQueue()));
        const replayActions = await getMergedReplayActions();
        const result = (0, BotManagerUtils_1.compileBotCompleteResult)(resultsPerSeed, botStartedAt, replayActions);
        jobs.set(configId, {
            done: true,
            result,
            resultsPerSeed,
            completedTasks: job.completedTasks,
            totalTasks: job.totalTasks,
        });
    }
    catch (error) {
        jobs.set(configId, {
            done: true,
            result: null,
            resultsPerSeed: {},
            completedTasks: 0,
            totalTasks: 0,
            error: error instanceof Error ? error : new Error(String(error)),
        });
    }
}
async function getMergedReplayActions() {
    const allActions = await workerPool.getReplayActionsFromAll();
    const merged = {};
    for (const workerActions of allActions) {
        const actions = workerActions;
        for (const [levelSeed, decisionMap] of Object.entries(actions)) {
            merged[Number(levelSeed)] = {
                ...merged[Number(levelSeed)],
                ...decisionMap,
            };
        }
    }
    return merged;
}
//# sourceMappingURL=index.js.map