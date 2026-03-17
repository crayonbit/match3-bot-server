"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class RocketGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Rocket,
            hp: 1,
            shouldKickCrossCells: true,
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
        return true;
    }
    clone() {
        return new RocketGemHandler();
    }
}
exports.RocketGemHandler = RocketGemHandler;
//# sourceMappingURL=RocketGemHandler.js.map