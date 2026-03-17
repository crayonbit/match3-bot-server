"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossBombGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class CrossBombGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.CrossBomb,
            hp: 1,
            ...props,
        };
    }
    kick(gem) {
        return { result: 'kickedBreak' };
    }
    hit(gem) {
        return { result: false };
    }
    blocksBooster(gem, boosterType) {
        return false;
    }
    blocksMatch(gem) {
        return false;
    }
    blocksMove(gem) {
        return false;
    }
    blocksSwap(gem) {
        return false;
    }
    isClickable(gem) {
        return true;
    }
    isCombo(gem) {
        return false;
    }
    clone() {
        return new CrossBombGemHandler();
    }
}
exports.CrossBombGemHandler = CrossBombGemHandler;
//# sourceMappingURL=CrossBombGemHandler.js.map