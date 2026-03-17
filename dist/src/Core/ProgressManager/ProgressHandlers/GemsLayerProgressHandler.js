"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemsLayerProgressHandler = void 0;
const BoardTypes_1 = require("../../Board/BoardTypes");
const GemsConstants_1 = require("../../Board/Gems/Constants/GemsConstants");
const LevelParserTypes_1 = require("../../LevelParser/LevelParserTypes");
const ProgressHandler_1 = require("./ProgressHandler");
class GemsLayerProgressHandler extends ProgressHandler_1.ProgressHandler {
    constructor() {
        super(...arguments);
        this.regularColorToGoalMap = {
            [BoardTypes_1.GemColor.a]: LevelParserTypes_1.RawGoalName.A,
            [BoardTypes_1.GemColor.b]: LevelParserTypes_1.RawGoalName.B,
            [BoardTypes_1.GemColor.c]: LevelParserTypes_1.RawGoalName.C,
            [BoardTypes_1.GemColor.d]: LevelParserTypes_1.RawGoalName.D,
            [BoardTypes_1.GemColor.e]: LevelParserTypes_1.RawGoalName.E,
            [BoardTypes_1.GemColor.f]: LevelParserTypes_1.RawGoalName.F,
        };
        this.gemNameToGetGoal = {
            [BoardTypes_1.GemCoreName.Regular]: (gem) => {
                return gem.core.className === BoardTypes_1.GemCoreName.Regular ? this.regularColorToGoalMap[gem.core.color] : null;
            },
            [BoardTypes_1.GemCoreName.LineBomb]: (gem) => {
                return LevelParserTypes_1.RawGoalName.LineBomb;
            },
            [BoardTypes_1.GemCoreName.CrossBomb]: (gem) => {
                return LevelParserTypes_1.RawGoalName.CrossBomb;
            },
            [BoardTypes_1.GemCoreName.Rocket]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Rocket;
            },
            [BoardTypes_1.GemCoreName.Stone]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Stone;
            },
            [BoardTypes_1.GemCoreName.ColorBomb]: (gem) => {
                return LevelParserTypes_1.RawGoalName.ColorBomb;
            },
            [BoardTypes_1.GemCoreName.BigBomb]: (gem) => {
                return LevelParserTypes_1.RawGoalName.BigBomb;
            },
            [BoardTypes_1.GemCoreName.Holder]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Holder;
            },
            [BoardTypes_1.GemCoreName.Acorn]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Acorn;
            },
            [BoardTypes_1.GemCoreName.Drop]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Drop;
            },
            [BoardTypes_1.GemCoreName.Cabinet]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Cabinet;
            },
            [BoardTypes_1.GemCoreName.Solid]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Solid;
            },
            [BoardTypes_1.GemCoreName.ColorTray]: (gem) => {
                return LevelParserTypes_1.RawGoalName.ColorTray;
            },
            [BoardTypes_1.GemCoreName.Vase]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Vase;
            },
            [BoardTypes_1.GemCoreName.Beam]: (gem) => {
                return LevelParserTypes_1.RawGoalName.Beam;
            },
            [BoardTypes_1.GemCoreName.ColorStone]: (gem) => {
                return LevelParserTypes_1.RawGoalName.ColorStone;
            },
        };
    }
    getGoalName(item) {
        return this.gemNameToGetGoal[item.core.className](item) ?? null;
    }
    canCollectGoal(item) {
        if (item.core.className === BoardTypes_1.GemCoreName.Holder) {
            return item.core.hp > 0;
        }
        if (item.core.className === BoardTypes_1.GemCoreName.Cabinet) {
            return item.core.hp < GemsConstants_1.CabinetMaxHp - 1;
        }
        if (item.core.className === BoardTypes_1.GemCoreName.ColorTray) {
            return item.core.hp >= 0;
        }
        return item.core.hp === 0;
    }
    getCountOnBoard(goalName) {
        const coreNameData = this.getCoreNameByGoalName(goalName);
        if (coreNameData === null)
            return null;
        if (typeof coreNameData === 'object') {
            return this.board
                .getLayer(BoardTypes_1.LevelGridItemKey.Gem)
                .getCountOnBoard(`${coreNameData.coreName}_${coreNameData.color}`);
        }
        return this.board.getLayer(BoardTypes_1.LevelGridItemKey.Gem).getCountOnBoard(coreNameData);
    }
    getCoreNameByGoalName(goalName) {
        switch (goalName) {
            case LevelParserTypes_1.RawGoalName.A:
                return { coreName: BoardTypes_1.GemCoreName.Regular, color: BoardTypes_1.GemColor.a };
            case LevelParserTypes_1.RawGoalName.B:
                return { coreName: BoardTypes_1.GemCoreName.Regular, color: BoardTypes_1.GemColor.b };
            case LevelParserTypes_1.RawGoalName.C:
                return { coreName: BoardTypes_1.GemCoreName.Regular, color: BoardTypes_1.GemColor.c };
            case LevelParserTypes_1.RawGoalName.D:
                return { coreName: BoardTypes_1.GemCoreName.Regular, color: BoardTypes_1.GemColor.d };
            case LevelParserTypes_1.RawGoalName.E:
                return { coreName: BoardTypes_1.GemCoreName.Regular, color: BoardTypes_1.GemColor.e };
            case LevelParserTypes_1.RawGoalName.F:
                return { coreName: BoardTypes_1.GemCoreName.Regular, color: BoardTypes_1.GemColor.f };
            case LevelParserTypes_1.RawGoalName.LineBomb:
                return BoardTypes_1.GemCoreName.LineBomb;
            case LevelParserTypes_1.RawGoalName.CrossBomb:
                return BoardTypes_1.GemCoreName.CrossBomb;
            case LevelParserTypes_1.RawGoalName.Rocket:
                return BoardTypes_1.GemCoreName.Rocket;
            case LevelParserTypes_1.RawGoalName.Stone:
                return BoardTypes_1.GemCoreName.Stone;
            case LevelParserTypes_1.RawGoalName.ColorBomb:
                return BoardTypes_1.GemCoreName.ColorBomb;
            case LevelParserTypes_1.RawGoalName.BigBomb:
                return BoardTypes_1.GemCoreName.BigBomb;
            case LevelParserTypes_1.RawGoalName.Holder:
                return BoardTypes_1.GemCoreName.Holder;
            case LevelParserTypes_1.RawGoalName.Acorn:
                return BoardTypes_1.GemCoreName.Acorn;
            case LevelParserTypes_1.RawGoalName.Drop:
                return BoardTypes_1.GemCoreName.Drop;
            case LevelParserTypes_1.RawGoalName.Cabinet:
                return BoardTypes_1.GemCoreName.Cabinet;
            case LevelParserTypes_1.RawGoalName.Vase:
                return BoardTypes_1.GemCoreName.Vase;
            default:
                return null;
        }
    }
    clone() {
        return new GemsLayerProgressHandler();
    }
}
exports.GemsLayerProgressHandler = GemsLayerProgressHandler;
//# sourceMappingURL=GemsLayerProgressHandler.js.map