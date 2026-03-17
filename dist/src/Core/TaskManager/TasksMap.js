"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTasksMap = getDefaultTasksMap;
const BigBombBlastPatternTask_1 = require("./Tasks/BlastPattern/BigBombBlastPatternTask");
const ColorBombBlastPatternTask_1 = require("./Tasks/BlastPattern/ColorBombBlastPatternTask");
const CrossBombBlastPatternTask_1 = require("./Tasks/BlastPattern/CrossBombBlastPatternTask");
const LineBombBlastPatternTask_1 = require("./Tasks/BlastPattern/LineBombBlastPatternTask");
const RocketBlastPatternTask_1 = require("./Tasks/BlastPattern/RocketBlastPatternTask");
const KickCellBoosterTask_1 = require("./Tasks/Booster/KickCellBoosterTask");
const KickColumnBoosterTask_1 = require("./Tasks/Booster/KickColumnBoosterTask");
const KickRowBoosterTask_1 = require("./Tasks/Booster/KickRowBoosterTask");
const ShuffleBoosterTask_1 = require("./Tasks/Booster/ShuffleBoosterTask");
const CollectQuestItemTask_1 = require("./Tasks/CollectQuestItemTask");
const BigBombsComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/BigBombsComboBlastPatternTask");
const ColorBombBigBombComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/ColorBombBigBombComboBlastPatternTask");
const ColorBombLineBombComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/ColorBombLineBombComboBlastPatternTask");
const ColorBombRocketComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/ColorBombRocketComboBlastPatternTask");
const ColorBombsComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/ColorBombsComboBlastPatternTask");
const LineBombBigBombComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/LineBombBigBombComboBlastPatternTask");
const LineBombsComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/LineBombsComboBlastPatternTask");
const RocketBigBombComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/RocketBigBombComboBlastPatternTask");
const RocketLineBombComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/RocketLineBombComboBlastPatternTask");
const RocketsComboBlastPatternTask_1 = require("./Tasks/ComboBlastPattern/RocketsComboBlastPatternTask");
const PreBoostersTask_1 = require("./Tasks/PreBooster/PreBoostersTask");
const CrossRowsPatternTask_1 = require("./Tasks/RegularPattern/CrossRowsPatternTask");
const DropGoalPatternTask_1 = require("./Tasks/RegularPattern/DropGoalPatternTask");
const FiveInARowPatternTask_1 = require("./Tasks/RegularPattern/FiveInARowPatternTask");
const FourInARowPatternTask_1 = require("./Tasks/RegularPattern/FourInARowPatternTask");
const ThreeInARowPatternTask_1 = require("./Tasks/RegularPattern/ThreeInARowPatternTask");
const TwoByTwoPatternTask_1 = require("./Tasks/RegularPattern/TwoByTwoPatternTask");
function getDefaultTasksMap(customTasks) {
    return {
        threeInARowPattern: ThreeInARowPatternTask_1.ThreeInARowPatternTask,
        fourInARowPattern: FourInARowPatternTask_1.FourInARowPatternTask,
        fiveInARowPattern: FiveInARowPatternTask_1.FiveInARowPatternTask,
        twoByTwoPattern: TwoByTwoPatternTask_1.TwoByTwoPatternTask,
        crossRowsPattern: CrossRowsPatternTask_1.CrossRowsPatternTask,
        dropGoalPattern: DropGoalPatternTask_1.DropGoalPatternTask,
        lineBombBlastPattern: LineBombBlastPatternTask_1.LineBombBlastPatternTask,
        crossBombBlastPattern: CrossBombBlastPatternTask_1.CrossBombBlastPatternTask,
        rocketBlastPattern: RocketBlastPatternTask_1.RocketBlastPatternTask,
        colorBombBlastPattern: ColorBombBlastPatternTask_1.ColorBombBlastPatternTask,
        bigBombBlastPattern: BigBombBlastPatternTask_1.BigBombBlastPatternTask,
        lineBombsComboBlastPattern: LineBombsComboBlastPatternTask_1.LineBombsComboBlastPatternTask,
        lineBombBigBombComboBlastPattern: LineBombBigBombComboBlastPatternTask_1.LineBombBigBombComboBlastPatternTask,
        bigBombsComboBlastPattern: BigBombsComboBlastPatternTask_1.BigBombsComboBlastPatternTask,
        rocketLineBombComboBlastPattern: RocketLineBombComboBlastPatternTask_1.RocketLineBombComboBlastPatternTask,
        rocketBigBombComboBlastPattern: RocketBigBombComboBlastPatternTask_1.RocketBigBombComboBlastPatternTask,
        rocketsComboBlastPattern: RocketsComboBlastPatternTask_1.RocketsComboBlastPatternTask,
        colorBombLineBombComboBlastPattern: ColorBombLineBombComboBlastPatternTask_1.ColorBombLineBombComboBlastPatternTask,
        colorBombBigBombComboBlastPattern: ColorBombBigBombComboBlastPatternTask_1.ColorBombBigBombComboBlastPatternTask,
        colorBombRocketComboBlastPattern: ColorBombRocketComboBlastPatternTask_1.ColorBombRocketComboBlastPatternTask,
        colorBombsComboBlastPattern: ColorBombsComboBlastPatternTask_1.ColorBombsComboBlastPatternTask,
        collectQuestItem: CollectQuestItemTask_1.CollectQuestItemTask,
        kickCellBooster: KickCellBoosterTask_1.KickCellBoosterTask,
        kickRowBooster: KickRowBoosterTask_1.KickRowBoosterTask,
        kickColumnBooster: KickColumnBoosterTask_1.KickColumnBoosterTask,
        shuffleBooster: ShuffleBoosterTask_1.ShuffleBoosterTask,
        preBoosters: PreBoostersTask_1.PreBoostersTask,
        ...customTasks,
    };
}
//# sourceMappingURL=TasksMap.js.map