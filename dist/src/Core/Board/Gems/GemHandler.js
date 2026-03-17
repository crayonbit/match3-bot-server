"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemHandler = void 0;
const BoardTypes_1 = require("../BoardTypes");
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
class GemHandler {
    init(board) {
        this.board = board;
    }
    isKilled(gem) {
        return gem.core.hp <= 0;
    }
    isCovered(gem) {
        const size = this.getSize(gem);
        for (let i = 0; i < size.width; i++) {
            for (let j = 0; j < size.height; j++) {
                if (this.board.isAnythingAbove(BoardTypes_1.LevelGridItemKey.Gem, { col: gem.col + i, row: gem.row + j })) {
                    return true;
                }
            }
        }
        return false;
    }
    assembleCommonKickResult(props) {
        const { gem, hpDecremented, kickResultOnDecrementedHp } = props;
        if (!hpDecremented) {
            return { result: 'none' };
        }
        const { commonGemClearCellsTicks } = this.board.config;
        const result = { result: kickResultOnDecrementedHp };
        if (gem.core.hp === 0 && commonGemClearCellsTicks > 0) {
            const cellsWithinSize = (0, CellsHelpers_1.getCellsWithinCellSize)(gem, this.getSize(gem));
            result.lockReasonsWithTicks = cellsWithinSize.map((cell) => {
                return { cell, reason: 'ClearCell', ticks: this.board.config.commonGemClearCellsTicks };
            });
        }
        return result;
    }
    assembleCommonHitResult(props) {
        const { gem, hpDecremented } = props;
        const { commonGemClearCellsTicks } = this.board.config;
        const hitResult = { result: hpDecremented };
        if (gem.core.hp === 0 && commonGemClearCellsTicks > 0) {
            const cellsWithinSize = (0, CellsHelpers_1.getCellsWithinCellSize)(gem, this.getSize(gem));
            hitResult.lockReasonsWithTicks = cellsWithinSize.map((cell) => {
                return { cell, reason: 'ClearCell', ticks: this.board.config.commonGemClearCellsTicks };
            });
        }
        return { result: hpDecremented };
    }
    /* Can have negative numbers depending on the direction */
    getSize(gem) {
        return { width: 1, height: 1 };
    }
    decrementHp(gem, extraProps = {}) {
        if (gem.core.hp <= 0)
            return false;
        this.board.gemsLayer.modifyItem(gem, { core: { ...gem.core, hp: gem.core.hp - 1, ...extraProps } });
        return true;
    }
}
exports.GemHandler = GemHandler;
//# sourceMappingURL=GemHandler.js.map