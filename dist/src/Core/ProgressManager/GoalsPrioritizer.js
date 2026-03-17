"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsPriorizer = void 0;
const BoardTypes_1 = require("../Board/BoardTypes");
const BoardTypeUtils_1 = require("../Board/BoardTypeUtils");
class GoalsPriorizer {
    constructor() {
        this.goalPriorityMap = {
            [BoardTypes_1.LevelGridItemKey.Carpet]: 1,
            [BoardTypes_1.LevelGridItemKey.Gem]: {
                [BoardTypes_1.GemCoreName.ColorTray]: 13,
                [BoardTypes_1.GemCoreName.Cabinet]: 11,
                [BoardTypes_1.GemCoreName.Solid]: 9,
                [BoardTypes_1.GemCoreName.Stone]: 7,
                [BoardTypes_1.GemCoreName.Vase]: 6,
                [BoardTypes_1.GemCoreName.Acorn]: 5,
                [BoardTypes_1.GemCoreName.Drop]: 4,
                [BoardTypes_1.GemCoreName.Holder]: 2,
                [BoardTypes_1.GemCoreName.Beam]: 12,
                [BoardTypes_1.GemCoreName.ColorStone]: 8,
                // Not goals
                [BoardTypes_1.GemCoreName.Regular]: 0,
                [BoardTypes_1.GemCoreName.LineBomb]: 0,
                [BoardTypes_1.GemCoreName.CrossBomb]: 0,
                [BoardTypes_1.GemCoreName.Rocket]: 0,
                [BoardTypes_1.GemCoreName.ColorBomb]: 0,
                [BoardTypes_1.GemCoreName.BigBomb]: 0,
            },
            [BoardTypes_1.LevelGridItemKey.Door]: 10,
            [BoardTypes_1.LevelGridItemKey.Cover]: 3,
            [BoardTypes_1.LevelGridItemKey.Back]: 0,
            [BoardTypes_1.LevelGridItemKey.Boot]: 0,
            [BoardTypes_1.LevelGridItemKey.Blast]: 0,
        };
    }
    getGoalPriority(layer) {
        if ((0, BoardTypeUtils_1.isGemLayerItem)(layer)) {
            return this.goalPriorityMap[BoardTypes_1.LevelGridItemKey.Gem][layer.item.core.className];
        }
        if ((0, BoardTypeUtils_1.isCarpetLayerItem)(layer)) {
            return this.goalPriorityMap[BoardTypes_1.LevelGridItemKey.Carpet];
        }
        if ((0, BoardTypeUtils_1.isDoorLayerItem)(layer)) {
            return this.goalPriorityMap[BoardTypes_1.LevelGridItemKey.Door];
        }
        if ((0, BoardTypeUtils_1.isCoverLayerItem)(layer)) {
            return this.goalPriorityMap[BoardTypes_1.LevelGridItemKey.Cover];
        }
        return 0;
    }
    clone() {
        return new GoalsPriorizer();
    }
}
exports.GoalsPriorizer = GoalsPriorizer;
//# sourceMappingURL=GoalsPrioritizer.js.map