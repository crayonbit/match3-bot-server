"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreBoostersTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class PreBoostersTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'preBoosters';
    }
    *handleTask() {
        const { preBoosters } = this.taskData;
        const preBoosterActionsMap = {
            [BoardTypes_1.PreBoosterType.PreBoosterA]: (gem) => {
                const horizontalBombChance = 0.6;
                this.replaceCore({
                    cell: { col: gem.col, row: gem.row },
                    className: BoardTypes_1.GemCoreName.LineBomb,
                    orientation: this.getRandomFraction() < horizontalBombChance ? 'horizontal' : 'vertical',
                    reason: 'PreBooster',
                });
                this.onPreBoosterUsed(BoardTypes_1.PreBoosterType.PreBoosterA);
            },
            [BoardTypes_1.PreBoosterType.PreBoosterB]: (gem) => {
                this.replaceCore({
                    cell: { col: gem.col, row: gem.row },
                    className: BoardTypes_1.GemCoreName.BigBomb,
                    reason: 'PreBooster',
                });
                this.onPreBoosterUsed(BoardTypes_1.PreBoosterType.PreBoosterB);
            },
            [BoardTypes_1.PreBoosterType.PreBoosterC]: (gem) => {
                this.replaceCore({
                    cell: { col: gem.col, row: gem.row },
                    className: BoardTypes_1.GemCoreName.ColorBomb,
                    reason: 'PreBooster',
                });
                this.onPreBoosterUsed(BoardTypes_1.PreBoosterType.PreBoosterC);
            },
        };
        const preBoostersQueue = [...preBoosters];
        while (preBoostersQueue.length > 0) {
            const regularUnlockedGems = this.getGemsByCoreName(BoardTypes_1.GemCoreName.Regular).filter((gem) => !this.hasLockReasons(gem) && !this.isGemCovered(gem));
            if (regularUnlockedGems.length === 0) {
                this.onPreBoostersWaiting();
                yield* this.waitTicks(1);
                continue;
            }
            for (let i = preBoostersQueue.length - 1; i >= 0; i--) {
                const gem = this.pickRandomItem(regularUnlockedGems);
                if (!gem)
                    break;
                const preBooster = preBoostersQueue[i];
                preBoosterActionsMap[preBooster]?.(gem);
                regularUnlockedGems.splice(regularUnlockedGems.indexOf(gem), 1);
                preBoostersQueue.splice(i, 1);
            }
            yield* this.waitTicks(1);
        }
    }
}
exports.PreBoostersTask = PreBoostersTask;
//# sourceMappingURL=PreBoostersTask.js.map