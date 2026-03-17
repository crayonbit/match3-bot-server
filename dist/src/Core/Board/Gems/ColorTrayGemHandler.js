"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorTrayGemHandler = exports.ColorTrayMaxHp = void 0;
const GemsHelpers_1 = require("../../Utils/GemsHelpers");
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
exports.ColorTrayMaxHp = 4;
class ColorTrayGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.ColorTray,
            topLeft: BoardTypes_1.GemColor.a,
            topRight: BoardTypes_1.GemColor.b,
            bottomLeft: BoardTypes_1.GemColor.c,
            bottomRight: BoardTypes_1.GemColor.d,
            ...props,
            hp: exports.ColorTrayMaxHp,
            usedMatchIds: [],
        };
    }
    kick(gem, params) {
        const { matchId } = params;
        if (gem.core.usedMatchIds.includes(matchId))
            return { result: 'break' };
        let removedColor = null;
        for (const itemPosition of Object.values(BoardTypes_1.ColorTrayItemPosition)) {
            if (gem.core[itemPosition] !== null) {
                const usedMatchIds = [...gem.core.usedMatchIds, matchId];
                removedColor = gem.core[itemPosition];
                this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core, [itemPosition]: null, usedMatchIds } });
                break;
            }
        }
        if (!removedColor)
            return { result: 'break' };
        const hpDecremented = this.decrementHp(gem);
        return this.assembleCommonKickResult({
            gem,
            hpDecremented,
            kickResultOnDecrementedHp: 'kickedBreak',
        });
    }
    hit(gem, params) {
        const { matchId } = params;
        if (gem.core.usedMatchIds.includes(matchId))
            return { result: false };
        const { sourceGem } = params;
        if (!(0, GemsHelpers_1.isGemOfKind)(sourceGem, BoardTypes_1.GemCoreName.Regular))
            return { result: false };
        let removedColor = null;
        for (const itemPosition of Object.values(BoardTypes_1.ColorTrayItemPosition)) {
            if (gem.core[itemPosition] === sourceGem.core.color && sourceGem.core.color !== removedColor) {
                const usedMatchIds = [...gem.core.usedMatchIds, matchId];
                removedColor = gem.core[itemPosition];
                this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core, [itemPosition]: null, usedMatchIds } });
            }
        }
        if (!removedColor)
            return { result: false };
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
    getSize(gem) {
        return { width: 2, height: 2 };
    }
    clone() {
        return new ColorTrayGemHandler();
    }
}
exports.ColorTrayGemHandler = ColorTrayGemHandler;
//# sourceMappingURL=ColorTrayGemHandler.js.map