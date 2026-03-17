"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketsComboBlastPatternTask = void 0;
const RocketBlastPattern_1 = require("../../../Matcher/Patterns/Blast/RocketBlastPattern");
const CellsKeeper_1 = require("../../../Utils/CellsKeeper");
const Task_1 = require("../Task");
const BlastRocket_1 = require("../TaskHelpers/BlastRocket");
class RocketsComboBlastPatternTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'rocketsComboBlastPattern';
    }
    *handleTask() {
        const { targetCellItems, blastGem, gems: swapGems, canChangeTargetCell } = this.taskData;
        const sourceGem = swapGems[0];
        this.removeGem(sourceGem);
        const iterators = [];
        const distantCells = targetCellItems.filter((cell) => cell.kind === 'distant');
        const nearbyCells = targetCellItems.filter((cell) => cell.kind === 'nearby');
        const usedTargetCellsKeeper = new CellsKeeper_1.CellsKeeper();
        usedTargetCellsKeeper.add(distantCells);
        const durations = [];
        let animationId = '';
        for (let i = 0; i < distantCells.length; i++) {
            const currentTargetCells = [distantCells[i]];
            if (i === distantCells.length - 1) {
                currentTargetCells.push(...nearbyCells);
            }
            const blastRocket = new BlastRocket_1.BlastRocket({
                config: this.config,
                targetCellItems: currentTargetCells,
                canChangeTargetCell,
                sourceCell: this.taskData.blastGem,
                lockCells: this.lockCells.bind(this),
                waitTicks: this.waitTicks.bind(this),
                waitIterators: this.waitIterators.bind(this),
                kickCell: (cell) => this.kickCell(cell, true),
                // eslint-disable-next-line @typescript-eslint/no-loop-func
                blastGem: (props) => {
                    durations.push(props.duration);
                    if (i < distantCells.length - 1) {
                        return '';
                    }
                    animationId = this.blastGem({
                        ...this.taskData,
                        durations,
                    });
                    return animationId;
                },
                // eslint-disable-next-line @typescript-eslint/no-loop-func
                triggerBlastGemAnimation: (props) => {
                    this.triggerBlastGemAnimation({
                        ...this.taskData,
                        targetCellItems: [],
                        // Looking at the current target cell we will determine which animation to update
                        targetCells: [...currentTargetCells.filter((cell) => cell.kind === 'distant'), ...props.targetCells],
                        durations: [props.duration],
                    }, animationId);
                    return animationId;
                },
                onCulminateKickDistanceCell: () => { },
                hasEntityOnCell: this.hasEntityOnCell.bind(this),
                findNewTargetCellItem: () => {
                    const rocketBlastPattern = new RocketBlastPattern_1.RocketBlastPattern();
                    rocketBlastPattern.init({
                        board: this.board,
                        generateMatchId: () => '',
                    });
                    const newTargetCell = rocketBlastPattern.findDistantCell({
                        blastCell: blastGem,
                        kickCells: [],
                        usedTargetCells: usedTargetCellsKeeper,
                        randomizeArray: this.randomizeArray.bind(this),
                    });
                    usedTargetCellsKeeper.add(newTargetCell);
                    return newTargetCell;
                },
            });
            iterators.push(blastRocket.handleTask());
        }
        yield* this.waitIterators(iterators);
    }
}
exports.RocketsComboBlastPatternTask = RocketsComboBlastPatternTask;
//# sourceMappingURL=RocketsComboBlastPatternTask.js.map