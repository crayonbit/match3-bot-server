"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class DropGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Drop,
            hp: 1,
        };
    }
    kick(gem) {
        const hpDecremented = this.board.hasDropGoal(gem) && this.decrementHp(gem);
        return this.assembleCommonKickResult({
            gem,
            hpDecremented,
            kickResultOnDecrementedHp: 'kickedBreak',
        });
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
    isCombo(gem) {
        return false;
    }
    isClickable(gem) {
        return false;
    }
    clone() {
        return new DropGemHandler();
    }
}
exports.DropGemHandler = DropGemHandler;
//# sourceMappingURL=DropGemHandler.js.map