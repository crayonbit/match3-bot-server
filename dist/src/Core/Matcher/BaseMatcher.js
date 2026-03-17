"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMatcher = void 0;
class BaseMatcher {
    constructor(props) {
        this.patterns = props.patterns;
    }
    init(props) {
        const { board } = props;
        this.board = board;
        this.patterns.forEach((pattern) => pattern.init(props));
    }
}
exports.BaseMatcher = BaseMatcher;
//# sourceMappingURL=BaseMatcher.js.map