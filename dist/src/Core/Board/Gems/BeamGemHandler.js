"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeamGemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const GemHandler_1 = require("./GemHandler");
const directionVectorMap = {
    top: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
};
class BeamGemHandler extends GemHandler_1.GemHandler {
    create(props) {
        return {
            className: BoardTypes_1.GemCoreName.Beam,
            direction: props.direction ?? 'right',
            hp: props.hp ?? 1,
            usedMatchIds: [],
        };
    }
    kick(gem, params) {
        const { matchId } = params;
        if (gem.core.usedMatchIds.includes(matchId))
            return { result: 'break' };
        const usedMatchIds = [...gem.core.usedMatchIds, matchId];
        const sizeBeforeDecrement = this.getSize(gem);
        const hpDecremented = this.decrementHp(gem, { usedMatchIds });
        if (hpDecremented) {
            return {
                result: 'kickedBreak',
                lockReasonsWithTicks: this.getLockReasonsWithTicks(gem, sizeBeforeDecrement),
            };
        }
        return { result: 'none' };
    }
    hit(gem, params) {
        const { matchId } = params;
        if (gem.core.usedMatchIds.includes(matchId))
            return { result: false };
        const usedMatchIds = [...gem.core.usedMatchIds, matchId];
        const sizeBeforeDecrement = this.getSize(gem);
        const hpDecremented = this.decrementHp(gem, { usedMatchIds });
        if (hpDecremented) {
            return {
                result: true,
                lockReasonsWithTicks: this.getLockReasonsWithTicks(gem, sizeBeforeDecrement),
            };
        }
        return { result: false };
    }
    getLockReasonsWithTicks(gem, sizeBeforeDecrement) {
        const { beamClearCellTicks } = this.board.config;
        const damageAffectedCell = this.getDamageAffectedCell(gem, sizeBeforeDecrement);
        const lockReasonsWithTicks = [
            { cell: damageAffectedCell, reason: 'ClearCell', ticks: beamClearCellTicks },
        ];
        if (gem.core.hp === 0) {
            lockReasonsWithTicks.push({
                cell: { col: gem.col, row: gem.row },
                reason: 'ClearCell',
                ticks: beamClearCellTicks,
            });
        }
        return lockReasonsWithTicks;
    }
    getDamageAffectedCell(gem, sizeBeforeDecrement) {
        return {
            col: gem.col + sizeBeforeDecrement.width - 1 * Math.sign(sizeBeforeDecrement.width),
            row: gem.row + sizeBeforeDecrement.height - 1 * Math.sign(sizeBeforeDecrement.height),
        };
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
        const { hp } = gem.core;
        const directionVector = this.getDirectionVector(gem.core.direction);
        let width = (1 + hp) * directionVector.x;
        let height = (1 + hp) * directionVector.y;
        if (width === 0) {
            width = 1;
        }
        if (height === 0) {
            height = 1;
        }
        return { width, height };
    }
    getDirectionVector(direction) {
        return directionVectorMap[direction];
    }
    clone() {
        return new BeamGemHandler();
    }
}
exports.BeamGemHandler = BeamGemHandler;
//# sourceMappingURL=BeamGemHandler.js.map