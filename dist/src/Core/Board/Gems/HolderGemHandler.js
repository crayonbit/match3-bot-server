"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolderGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
class HolderGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Holder,
            hp: 2,
        };
    }
    kick(gem) {
        return this.handleAttack(gem) ? { result: 'kickedBreak' } : { result: 'break' };
    }
    hit(gem) {
        return this.handleAttack(gem) ? { result: true } : { result: false };
    }
    handleAttack(gem) {
        const goalsLeft = this.board.progressManager.getGoalCount({ item: gem, layerKey: BoardTypes_1.LevelGridItemKey.Gem });
        if (goalsLeft === 1 && gem.core.hp === 2) {
            const holderGems = this.board.gemsLayer.getGemsByCoreName(BoardTypes_1.GemCoreName.Holder);
            holderGems.forEach((holderGem) => {
                this.board.gemsLayer.modifyItem(holderGem, { core: { ...holderGem.core, hp: 1 } });
            });
        }
        else {
            this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core } });
        }
        return goalsLeft > 0;
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
        return new HolderGemHandler();
    }
}
exports.HolderGemHandler = HolderGemHandler;
//# sourceMappingURL=HolderGemHandler.js.map