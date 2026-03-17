"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsParser = void 0;
const GemsConstants_1 = require("../../Board/Gems/Constants/GemsConstants");
const ColorTrayGemHandler_1 = require("../../Board/Gems/ColorTrayGemHandler");
const LevelParserTypes_1 = require("../LevelParserTypes");
class GoalsParser {
    parse(rawGoals) {
        return rawGoals.map((rawGoal, i) => {
            let { count } = rawGoal;
            if (rawGoal.name === LevelParserTypes_1.RawGoalName.Cabinet) {
                /**
                 * In the editor we set 1 Cabinet goal per 1 Cabinet gem,
                 * But as in the game we want to collect 7 Cabinet items, we multiply count of Cabinet goals per each Cabinet by CabinetMaxHp - 1.
                 */
                count *= GemsConstants_1.CabinetMaxHp - 1;
            }
            else if (rawGoal.name === LevelParserTypes_1.RawGoalName.ColorTray) {
                /**
                 * In the editor we set 1 ColorTray goal per 1 ColorTray gem,
                 * But as in the game we want to collect 4 ColorTray items, we multiply count of ColorTray goals per each ColorTray by ColorTrayMaxHp.
                 */
                count *= ColorTrayGemHandler_1.ColorTrayMaxHp;
            }
            return {
                id: i + 1,
                rawName: rawGoal.name,
                count,
                maxCount: null,
            };
        });
    }
    export(goals) {
        return goals.map((goal) => {
            let { count } = goal;
            if (goal.rawName === LevelParserTypes_1.RawGoalName.Cabinet) {
                count = 1;
            }
            else if (goal.rawName === LevelParserTypes_1.RawGoalName.ColorTray) {
                count = 1;
            }
            return { name: goal.rawName, count };
        });
    }
}
exports.GoalsParser = GoalsParser;
//# sourceMappingURL=GoalsParser.js.map