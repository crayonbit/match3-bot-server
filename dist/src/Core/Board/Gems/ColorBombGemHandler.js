"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class ColorBombGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.ColorBomb,
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
        return new ColorBombGemHandler();
    }
}
exports.ColorBombGemHandler = ColorBombGemHandler;
//# sourceMappingURL=ColorBombGemHandler.js.map