"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegularGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class RegularGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Regular,
            color: props.color ?? BoardTypes_1.GemColor.a,
            hp: 1,
        };
    }
    kick(gem) {
        const hpDecremented = this.decrementHp(gem);
        return this.assembleCommonKickResult({
            gem,
            hpDecremented,
            kickResultOnDecrementedHp: 'kickedContinue',
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
    isClickable(gem) {
        return false;
    }
    isCombo(gem) {
        return false;
    }
    clone() {
        return new RegularGemHandler();
    }
}
exports.RegularGemHandler = RegularGemHandler;
//# sourceMappingURL=RegularGemHandler.js.map