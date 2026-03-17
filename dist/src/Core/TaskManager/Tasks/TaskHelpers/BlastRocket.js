"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlastRocket = void 0;
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
class BlastRocket {
    constructor(props) {
        this.targetCellItem = { kind: 'distant', col: 0, row: 0 };
        this.nearbyTargetCells = [];
        this.crossKickUnlock = () => { };
        this.blastUnlock = () => { };
        this.ticksToWait = 0;
        this.distantCellKicked = false;
        this.blastAnimationId = '';
        this.config = props.config;
        this.sourceCell = props.sourceCell;
        this.targetCells = props.targetCellItems;
        this.canChangeTargetCell = props.canChangeTargetCell;
        this.lockCells = props.lockCells;
        this.kickCell = props.kickCell;
        this.waitTicks = props.waitTicks;
        this.waitIterators = props.waitIterators;
        this.blastGem = props.blastGem;
        this.triggerBlastGemAnimation = props.triggerBlastGemAnimation;
        this.onCulminateKickDistanceCell = props.onCulminateKickDistanceCell;
        this.hasEntityOnCell = props.hasEntityOnCell;
        this.findNewTargetCellItem = props.findNewTargetCellItem;
        this.separateTargetCells(props.targetCellItems);
    }
    separateTargetCells(targetCells) {
        for (const targetCell of targetCells) {
            if (targetCell.kind === 'distant') {
                this.targetCellItem = targetCell;
            }
            else if (targetCell.kind === 'nearby') {
                this.nearbyTargetCells.push(targetCell);
            }
        }
    }
    tryKickNearbyCells() {
        if (!this.nearbyTargetCells.length)
            return;
        this.nearbyTargetCells.forEach((cell) => {
            this.kickCell(cell);
        });
        this.crossKickUnlock = this.lockCells(this.nearbyTargetCells, 'Blast').unlock;
    }
    *tryCulminateKickNearbyCells() {
        if (!this.nearbyTargetCells.length)
            return;
        yield* this.waitTicks(this.config.rocketBlastCrossCellsTicks);
        this.crossKickUnlock();
    }
    beginDistantCellKick(sourceCell, targetCellItem) {
        const blastUnlock = this.lockCells([targetCellItem], 'Blast', targetCellItem.layerKey);
        this.blastUnlock = blastUnlock.unlock;
        this.ticksToWait = this.calculateTicksToWait(sourceCell, targetCellItem);
    }
    calculateTicksToWait(sourceCell, targetCell) {
        const distanceToTarget = (0, CellsHelpers_1.getCellsDistance)(sourceCell, targetCell);
        const { rocketBlastCellTicks, minRocketBlastTicks } = this.config;
        return Math.max(minRocketBlastTicks, distanceToTarget * rocketBlastCellTicks);
    }
    *culminateDistantCellKick() {
        for (let i = 0; i < this.ticksToWait; i++) {
            yield* this.waitTicks(1);
            const { entityId } = this.targetCellItem;
            // check can change target
            if (this.canChangeTargetCell && entityId && !this.hasEntityOnCell(this.targetCellItem, entityId)) {
                const previousTargetCellItem = this.targetCellItem;
                const newTargetCellItem = this.findNewTargetCellItem();
                if (!newTargetCellItem || (0, CellsHelpers_1.isCellsEqual)(previousTargetCellItem, newTargetCellItem)) {
                    // just continue flying to the missed target cell or if the target cell is the same as the previous one
                    continue;
                }
                this.blastUnlock();
                this.targetCellItem = newTargetCellItem;
                this.beginDistantCellKick(previousTargetCellItem, newTargetCellItem);
                this.triggerBlastGemAnimation({
                    duration: this.ticksToWait * this.config.tickDurationMs,
                    targetCells: [this.targetCellItem],
                    animationId: this.blastAnimationId,
                });
                i = -1;
                continue;
            }
        }
        this.onCulminateKickDistanceCell(this.targetCellItem);
        this.kickCell(this.targetCellItem);
        this.distantCellKicked = true;
        this.blastUnlock();
    }
    *handleTask() {
        this.tryKickNearbyCells();
        this.beginDistantCellKick(this.sourceCell, this.targetCellItem);
        this.blastAnimationId = this.blastGem({
            duration: this.ticksToWait * this.config.tickDurationMs,
            targetCells: this.targetCells,
        });
        yield* this.waitIterators([this.tryCulminateKickNearbyCells(), this.culminateDistantCellKick()]);
    }
    isDistantCellKicked() {
        return this.distantCellKicked;
    }
}
exports.BlastRocket = BlastRocket;
//# sourceMappingURL=BlastRocket.js.map