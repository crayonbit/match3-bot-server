"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GravityManagerSignals = void 0;
const signals_1 = require("signals");
const SignalsHandlerBase_1 = require("../SignalsHandlerBase");
class GravityManagerSignals extends SignalsHandlerBase_1.SignalsHandlerBase {
    constructor() {
        super({
            onGravityStart: new signals_1.Signal(),
            onGravityMove: new signals_1.Signal(),
            onGravityFinish: new signals_1.Signal(),
            onBounceGem: new signals_1.Signal(),
        });
    }
}
exports.GravityManagerSignals = GravityManagerSignals;
//# sourceMappingURL=GravityManagerSignals.js.map