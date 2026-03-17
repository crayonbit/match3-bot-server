"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressManagerSignals = void 0;
const signals_1 = require("signals");
const SignalsHandlerBase_1 = require("../SignalsHandlerBase");
class ProgressManagerSignals extends SignalsHandlerBase_1.SignalsHandlerBase {
    constructor() {
        super({
            onMovesChanged: new signals_1.Signal(),
            onGoalChanged: new signals_1.Signal(),
            onPendingOutcome: new signals_1.Signal(),
            onProgressSucceeded: new signals_1.Signal(),
            onProgressFailed: new signals_1.Signal(),
            increaseMovesBy: new signals_1.Signal(),
        });
    }
}
exports.ProgressManagerSignals = ProgressManagerSignals;
//# sourceMappingURL=ProgressManagerSignals.js.map