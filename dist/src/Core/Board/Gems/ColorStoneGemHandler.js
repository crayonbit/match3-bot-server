"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorStoneGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
const GemsHelpers_1 = require("../../Utils/GemsHelpers");
class ColorStoneGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.ColorStone,
            hp: props.hp ?? 5,
            color: props.color,
            usedMatchIds: [],
        };
    }
    kick(gem, params) {
        const { matchId } = params;
        if (gem.core.usedMatchIds.includes(matchId))
            return { result: 'break' };
        const usedMatchIds = [...gem.core.usedMatchIds, matchId];
        this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core, usedMatchIds } });
        const hpDecremented = this.decrementHp(gem);
        return this.assembleCommonKickResult({
            gem,
            hpDecremented,
            kickResultOnDecrementedHp: 'kickedBreak',
        });
    }
    hit(gem, params) {
        const { matchId, sourceGem } = params;
        if (gem.core.usedMatchIds.includes(matchId))
            return { result: false };
        if (!(0, GemsHelpers_1.isGemOfKind)(sourceGem, BoardTypes_1.GemCoreName.Regular))
            return { result: false };
        if (gem.core.color !== sourceGem.core.color)
            return { result: false };
        const usedMatchIds = [...gem.core.usedMatchIds, matchId];
        this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core, usedMatchIds } });
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
        return new ColorStoneGemHandler();
    }
}
exports.ColorStoneGemHandler = ColorStoneGemHandler;
//# sourceMappingURL=ColorStoneGemHandler.js.map