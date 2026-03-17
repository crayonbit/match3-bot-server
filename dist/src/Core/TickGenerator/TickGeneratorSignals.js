"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickGeneratorSignals = void 0;
const signals_1 = require("signals");
const SignalsHandlerBase_1 = require("../SignalsHandlerBase");
class TickGeneratorSignals extends SignalsHandlerBase_1.SignalsHandlerBase {
    constructor() {
        super({
            onGeneratorStart: new signals_1.Signal(),
            onTickStart: new signals_1.Signal(),
            onStepEnter: new signals_1.Signal(),
            onStepExit: new signals_1.Signal(),
            onTickEnd: new signals_1.Signal(),
            onGeneratorComplete: new signals_1.Signal(),
        });
    }
}
exports.TickGeneratorSignals = TickGeneratorSignals;
//# sourceMappingURL=TickGeneratorSignals.js.map