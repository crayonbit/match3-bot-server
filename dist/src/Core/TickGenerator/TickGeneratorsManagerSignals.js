"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickGeneratorsManagerSignals = void 0;
const signals_1 = require("signals");
const SignalsHandlerBase_1 = require("../SignalsHandlerBase");
class TickGeneratorsManagerSignals extends SignalsHandlerBase_1.SignalsHandlerBase {
    constructor() {
        super({
            onTickStarted: new signals_1.Signal(),
            onIdleStateChanged: new signals_1.Signal(),
        });
    }
}
exports.TickGeneratorsManagerSignals = TickGeneratorsManagerSignals;
//# sourceMappingURL=TickGeneratorsManagerSignals.js.map