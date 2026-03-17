"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTicks = waitTicks;
function* waitTicks(ticks) {
    yield { kind: 'tickWait', ticks };
}
//# sourceMappingURL=TickGeneratorUtils.js.map