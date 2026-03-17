"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarpetLayerProgressHandler = void 0;
const BoardTypes_1 = require("../../Board/BoardTypes");
const LevelParserTypes_1 = require("../../LevelParser/LevelParserTypes");
const ProgressHandler_1 = require("./ProgressHandler");
class CarpetLayerProgressHandler extends ProgressHandler_1.ProgressHandler {
    getGoalName(item) {
        return LevelParserTypes_1.RawGoalName.Carpet;
    }
    canCollectGoal(item) {
        return item.hp === 0;
    }
    getCountOnBoard(goalName) {
        if (goalName === LevelParserTypes_1.RawGoalName.Carpet) {
            return this.board.getLayer(BoardTypes_1.LevelGridItemKey.Carpet).getAll((item) => !!item).length;
        }
        return null;
    }
    clone() {
        return new CarpetLayerProgressHandler();
    }
}
exports.CarpetLayerProgressHandler = CarpetLayerProgressHandler;
//# sourceMappingURL=CarpetLayerProgressHandler.js.map