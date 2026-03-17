"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLockId = generateLockId;
let lockIdCounter = 0;
function generateLockId() {
    return --lockIdCounter;
}
//# sourceMappingURL=GenerateLockId.js.map