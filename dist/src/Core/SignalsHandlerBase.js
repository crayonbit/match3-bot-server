"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalsHandlerBase = void 0;
class SignalsHandlerBase {
    constructor(signals) {
        this.signals = signals;
    }
    get(key) {
        return this.signals[key];
    }
    /**
     * Piping signals to another signals handler
     */
    pipe(signalsHandler) {
        Object.entries(this.signals).forEach(([key, signal]) => {
            signal.add(signalsHandler.get(key).dispatch);
        });
    }
    unPipe(signalsHandler) {
        Object.entries(this.signals).forEach(([key, signal]) => {
            signal.remove(signalsHandler.get(key).dispatch);
        });
    }
    clear() {
        Object.values(this.signals).forEach((signal) => signal.removeAll());
    }
}
exports.SignalsHandlerBase = SignalsHandlerBase;
//# sourceMappingURL=SignalsHandlerBase.js.map