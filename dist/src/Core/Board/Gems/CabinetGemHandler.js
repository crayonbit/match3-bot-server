"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CabinetGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemsConstants_1 = require("./Constants/GemsConstants");
const GemHandler_1 = require("./GemHandler");
class CabinetGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Cabinet,
            hp: props.hp ?? GemsConstants_1.CabinetMaxHp,
            unlockMatchId: null,
        };
    }
    kick(gem, params) {
        return this.handleAttack(gem, params.matchId) ? { result: 'kickedBreak' } : { result: 'break' };
    }
    hit(gem, params) {
        return this.handleAttack(gem, params.matchId) ? { result: true } : { result: false };
    }
    handleAttack(gem, matchId) {
        const { unlockMatchId } = gem.core;
        if (matchId === unlockMatchId)
            return false;
        if (gem.core.hp === GemsConstants_1.CabinetMaxHp && unlockMatchId === null) {
            this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core, unlockMatchId: matchId } });
        }
        return this.decrementHp(gem);
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
        return new CabinetGemHandler();
    }
}
exports.CabinetGemHandler = CabinetGemHandler;
//# sourceMappingURL=CabinetGemHandler.js.map