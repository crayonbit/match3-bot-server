"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcornGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class AcornGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Acorn,
            hp: 1,
        };
    }
    kick(gem) {
        const hpDecremented = this.decrementHp(gem);
        return this.assembleCommonKickResult({
            gem,
            hpDecremented,
            kickResultOnDecrementedHp: 'kickedBreak',
        });
    }
    hit(gem) {
        const hpDecremented = this.decrementHp(gem);
        return this.assembleCommonHitResult({
            gem,
            hpDecremented,
        });
    }
    blocksBooster(gem, boosterType) {
        return false;
    }
    blocksMatch(gem) {
        return true;
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
        return new AcornGemHandler();
    }
}
exports.AcornGemHandler = AcornGemHandler;
//# sourceMappingURL=AcornGemHandler.js.map