"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoneGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class StoneGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Stone,
            hp: props.hp ?? 5,
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
        return this.assembleCommonHitResult({ gem, hpDecremented });
    }
    blocksBooster(gem, boosterType) {
        return false;
    }
    blocksMatch(gem) {
        return true;
    }
    blocksMove(gem) {
        return true;
    }
    blocksSwap(gem) {
        return true;
    }
    isClickable(gem) {
        return false;
    }
    isCombo(gem) {
        return false;
    }
    clone() {
        return new StoneGemHandler();
    }
}
exports.StoneGemHandler = StoneGemHandler;
//# sourceMappingURL=StoneGemHandler.js.map