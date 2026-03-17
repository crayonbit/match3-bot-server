"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickStepsSignals = void 0;
const signals_1 = require("signals");
const SignalsHandlerBase_1 = require("../SignalsHandlerBase");
class TickStepsSignals extends SignalsHandlerBase_1.SignalsHandlerBase {
    constructor() {
        super({
            onMatchesFound: new signals_1.Signal(),
            onTasksCreated: new signals_1.Signal(),
        });
    }
}
exports.TickStepsSignals = TickStepsSignals;
//# sourceMappingURL=TickStepsSignals.js.map