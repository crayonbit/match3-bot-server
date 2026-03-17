"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalByValues = equalByValues;
function equalByValues(a, b) {
    return Object.entries(a).every(([key, value]) => b[key] === value);
}
//# sourceMappingURL=EqualByValues.js.map