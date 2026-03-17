"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketBlastPatternTask = void 0;
const RocketBlastPattern_1 = require("../../../Matcher/Patterns/Blast/RocketBlastPattern");
const Task_1 = require("../Task");
const BlastRocket_1 = require("../TaskHelpers/BlastRocket");
class RocketBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'rocketBlastPattern';
    }
    *handleTask() {
        const { targetCellItems, blastGem } = this.taskData;
        const blastRocket = new BlastRocket_1.BlastRocket({
            config: this.config,
            targetCellItems,
            canChangeTargetCell: true,
            sourceCell: blastGem,
            lockCells: this.lockCells.bind(this),
            waitTicks: this.waitTicks.bind(this),
            waitIterators: this.waitIterators.bind(this),
            kickCell: this.kickCell.bind(this),
            blastGem: (props) => {
                return this.blastGem({
                    ...this.taskData,
                    targetCells: props.targetCells,
                    duration: props.duration,
                });
            },
            triggerBlastGemAnimation: (props) => {
                return this.triggerBlastGemAnimation({
                    ...this.taskData,
                    targetCells: props.targetCells,
                    duration: props.duration,
                }, props.animationId);
            },
            onCulminateKickDistanceCell: () => { },
            hasEntityOnCell: this.hasEntityOnCell.bind(this),
            findNewTargetCellItem: () => {
                const rocketBlastPattern = new RocketBlastPattern_1.RocketBlastPattern();
                rocketBlastPattern.init({
                    board: this.board,
                    generateMatchId: () => '',
                });
                return rocketBlastPattern.findDistantCell({
                    blastCell: blastGem,
                    kickCells: [],
                    usedTargetCells: { has: () => false, getCells: () => [], getCount: () => 0 },
                    randomizeArray: this.randomizeArray.bind(this),
                });
            },
        });
        yield* blastRocket.handleTask();
    }
}
exports.RocketBlastPatternTask = RocketBlastPatternTask;
//# sourceMappingURL=RocketBlastPatternTask.js.map