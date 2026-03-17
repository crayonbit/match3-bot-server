"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketBigBombComboBlastPatternTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const RocketBigBombComboBlastPattern_1 = require("../../../Matcher/Patterns/ComboBlast/RocketBigBombComboBlastPattern");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Task_1 = require("../Task");
const BlastRocket_1 = require("../TaskHelpers/BlastRocket");
class RocketBigBombComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'rocketBigBombComboBlastPattern';
    }
    *handleTask() {
        const { targetCellItems, blastGem, gems } = this.taskData;
        const bigBombGem = gems.find((gem) => gem.core.className === BoardTypes_1.GemCoreName.BigBomb);
        const [swapGem] = gems;
        this.removeGem(swapGem);
        const targetCell = targetCellItems.find((cell) => cell.kind === 'distant');
        if (!targetCell) {
            this.logError('targetCell not found!');
            return;
        }
        const bigBombsComboRadius = 4;
        const distantLockCells = (0, CellsHelpers_1.getCellsAround)(targetCell, bigBombsComboRadius, (cell) => {
            return true;
        });
        const distantUnlock = this.lockCells(distantLockCells, 'DistantTarget');
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
            onCulminateKickDistanceCell: (cell) => {
                this.createBlastLayerGem({
                    cell,
                    className: bigBombGem.core.className,
                    reason: 'Replace',
                });
            },
            hasEntityOnCell: this.hasEntityOnCell.bind(this),
            findNewTargetCellItem: () => {
                const rocketBlastPattern = new RocketBigBombComboBlastPattern_1.RocketBigBombComboBlastPattern();
                rocketBlastPattern.init({
                    board: this.board,
                    generateMatchId: () => '',
                });
                return rocketBlastPattern.findDistantCell({
                    blastGem,
                    bigBombGem,
                    kickCells: [],
                    usedTargetCells: { has: () => false, getCells: () => [], getCount: () => 0 },
                    randomizeArray: this.randomizeArray.bind(this),
                });
            },
        });
        yield* blastRocket.handleTask();
        distantUnlock.unlock();
    }
}
exports.RocketBigBombComboBlastPatternTask = RocketBigBombComboBlastPatternTask;
//# sourceMappingURL=RocketBigBombComboBlastPatternTask.js.map