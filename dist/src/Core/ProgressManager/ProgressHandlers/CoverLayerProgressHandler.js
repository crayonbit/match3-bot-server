"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverLayerProgressHandler = void 0;
const BoardTypes_1 = require("../../Board/BoardTypes");
const LevelParserTypes_1 = require("../../LevelParser/LevelParserTypes");
const ProgressHandler_1 = require("./ProgressHandler");
class CoverLayerProgressHandler extends ProgressHandler_1.ProgressHandler {
    getGoalName(item) {
        return LevelParserTypes_1.RawGoalName.Cover;
    }
    canCollectGoal(item) {
        return item.hp === 0;
    }
    getCountOnBoard(goalName) {
        if (goalName === LevelParserTypes_1.RawGoalName.Cover) {
            return this.board.getLayer(BoardTypes_1.LevelGridItemKey.Cover).getAll((item) => !!item).length;
        }
        return null;
    }
    clone() {
        return new CoverLayerProgressHandler();
    }
}
exports.CoverLayerProgressHandler = CoverLayerProgressHandler;
//# sourceMappingURL=CoverLayerProgressHandler.js.map