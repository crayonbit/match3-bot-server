"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaseGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class VaseGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Vase,
            hp: props.hp ?? 2,
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
        return new VaseGemHandler();
    }
}
exports.VaseGemHandler = VaseGemHandler;
//# sourceMappingURL=VaseGemHandler.js.map