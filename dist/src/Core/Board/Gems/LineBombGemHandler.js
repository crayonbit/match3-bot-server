"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBombGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class LineBombGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.LineBomb,
            orientation: props.orientation ?? 'horizontal',
            hp: 1,
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
        return true;
    }
    clone() {
        return new LineBombGemHandler();
    }
}
exports.LineBombGemHandler = LineBombGemHandler;
//# sourceMappingURL=LineBombGemHandler.js.map