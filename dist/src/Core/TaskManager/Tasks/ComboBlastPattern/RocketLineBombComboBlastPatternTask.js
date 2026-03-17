"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketLineBombComboBlastPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const RocketLineBombComboBlastPattern_1 = require("../../../Matcher/Patterns/ComboBlast/RocketLineBombComboBlastPattern");
const Task_1 = require("../Task");
const BlastRocket_1 = require("../TaskHelpers/BlastRocket");
class RocketLineBombComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'rocketLineBombComboBlastPattern';
    }
    *handleTask() {
        const { targetCellItems, blastGem, gems } = this.taskData;
        const lineBombGem = gems.find((gem) => gem.core.className === BoardTypes_1.GemCoreName.LineBomb);
        const [swapGem] = gems;
        this.removeGem(swapGem);
        const targetCell = targetCellItems.find((cell) => cell.kind === 'distant');
        if (!targetCell) {
            this.logError('targetCell not found!');
            return;
        }
        const blastRocket = new BlastRocket_1.BlastRocket({
            config: {
                rocketBlastCellTicks: this.config.rocketLineBombComboBlastCellTicks,
                minRocketBlastTicks: this.config.minRocketBlastTicks,
                rocketBlastCrossCellsTicks: this.config.rocketBlastCrossCellsTicks,
                tickDurationMs: this.config.tickDurationMs,
            },
            targetCellItems,
            canChangeTargetCell: true,
            sourceCell: this.taskData.blastGem,
            lockCells: this.lockCells.bind(this),
            waitTicks: this.waitTicks.bind(this),
            waitIterators: this.waitIterators.bind(this),
            kickCell: this.kickCell.bind(this),
            blastGem: (props) => {
                return this.blastGem({ ...this.taskData, targetCells: props.targetCells, duration: props.duration });
            },
            triggerBlastGemAnimation: (props) => {
                return this.triggerBlastGemAnimation({
                    ...this.taskData,
                    targetCells: props.targetCells,
                    duration: props.duration,
                }, props.animationId);
            },
            onCulminateKickDistanceCell: (cell) => {
                this.createBlastLayerGem({
                    cell,
                    className: lineBombGem.core.className,
                    orientation: lineBombGem.core.orientation,
                    reason: 'Replace',
                });
            },
            hasEntityOnCell: this.hasEntityOnCell.bind(this),
            findNewTargetCellItem: () => {
                const rocketBlastPattern = new RocketLineBombComboBlastPattern_1.RocketLineBombComboBlastPattern();
                rocketBlastPattern.init({
                    board: this.board,
                    generateMatchId: () => '',
                });
                return rocketBlastPattern.findDistantCell({
                    blastGem,
                    lineBombGem,
                    kickCells: [],
                    usedTargetCells: { has: () => false, getCells: () => [], getCount: () => 0 },
                    randomizeArray: this.randomizeArray.bind(this),
                });
            },
        });
        yield* blastRocket.handleTask();
    }
}
exports.RocketLineBombComboBlastPatternTask = RocketLineBombComboBlastPatternTask;
//# sourceMappingURL=RocketLineBombComboBlastPatternTask.js.map