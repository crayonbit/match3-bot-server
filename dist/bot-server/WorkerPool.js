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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerPool = void 0;
const worker_threads_1 = require("worker_threads");
const os = __importStar(require("os"));
class WorkerWrapper {
    constructor(workerPath) {
        this.initResolvers = [];
        this.pendingPlay = null;
        this.replayResolvers = [];
        this.worker = new worker_threads_1.Worker(workerPath);
        this.worker.on('message', (msg) => {
            if (msg.type === 'initialized') {
                this.initResolvers.splice(0).forEach((r) => r());
            }
            else if (msg.type === 'levelResult') {
                const p = this.pendingPlay;
                this.pendingPlay = null;
                if (p)
                    p.resolve(msg.result);
            }
            else if (msg.type === 'replayActions') {
                this.replayResolvers.splice(0).forEach((r) => r(msg.data));
            }
        });
        this.worker.on('error', (err) => {
            const p = this.pendingPlay;
            this.pendingPlay = null;
            if (p)
                p.reject(err);
        });
    }
    sendInit(config) {
        return new Promise((resolve) => {
            this.initResolvers.push(resolve);
            this.worker.postMessage(config);
        });
    }
    play(payload) {
        return new Promise((resolve, reject) => {
            this.pendingPlay = { resolve, reject };
            this.worker.postMessage(payload);
        });
    }
    getReplayActions() {
        return new Promise((resolve) => {
            this.replayResolvers.push(resolve);
            this.worker.postMessage({ message: 'getReplayActions' });
        });
    }
    terminate() {
        return this.worker.terminate();
    }
}
class WorkerPool {
    constructor(workerPath, size = os.cpus().length) {
        this.waitQueue = [];
        this.workers = Array.from({ length: size }, () => new WorkerWrapper(workerPath));
        this.free = [...this.workers];
    }
    get size() {
        return this.workers.length;
    }
    /**
     * Broadcasts the init config to every worker so each BotCore instance is ready.
     */
    broadcastInit(config) {
        return Promise.all(this.workers.map((w) => w.sendInit(config)));
    }
    playLevel(payload) {
        return new Promise((resolve, reject) => {
            const worker = this.free.pop();
            if (!worker) {
                this.waitQueue.push({ payload, resolve, reject });
                return;
            }
            this.runPlay(worker, payload, resolve, reject);
        });
    }
    getReplayActionsFromAll() {
        return Promise.all(this.workers.map((w) => w.getReplayActions()));
    }
    terminate() {
        return Promise.all(this.workers.map((w) => w.terminate()));
    }
    runPlay(worker, payload, resolve, reject) {
        worker
            .play(payload)
            .then((result) => {
            resolve(result);
        })
            .catch((error) => {
            reject(error);
        })
            .finally(() => {
            const queuedTask = this.waitQueue.shift();
            if (!queuedTask) {
                this.free.push(worker);
                return;
            }
            this.runPlay(worker, queuedTask.payload, queuedTask.resolve, queuedTask.reject);
        });
    }
}
exports.WorkerPool = WorkerPool;
//# sourceMappingURL=WorkerPool.js.map