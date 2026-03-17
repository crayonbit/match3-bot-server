"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketLineBombComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
const PatternsHelpers_1 = require("../PatternsHelpers");
class RocketLineBombComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'rocketLineBombComboBlastPattern';
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        if (!(0, GemsHelpers_1.isGemsOfOnlyKinds)(swapGems, [BoardTypes_1.GemCoreName.Rocket, BoardTypes_1.GemCoreName.LineBomb], justUsedCells)) {
            return null;
        }
        const blastGem = swapGems[1];
        const lineBombGem = swapGems.find((gem) => gem.core.className === BoardTypes_1.GemCoreName.LineBomb);
        const kickCells = [];
        (0, CellsOffsets_1.getAdjacentCells)(blastGem, ['top', 'right', 'bottom', 'left']).forEach((cell) => {
            if (this.board.isInGrid(cell)) {
                kickCells.push({
                    kind: 'nearby',
                    ...cell,
                });
            }
        });
        const distantCell = this.findDistantCell({
            blastGem,
            lineBombGem,
            kickCells,
            usedTargetCells: justUsedCells,
            randomizeArray: (array) => {
                return this.board.randomGenerator.clone().shuffle(array);
            },
        });
        const targetCellItems = kickCells.concat(distantCell);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: swapGems,
            blastGem,
            targetCells: targetCellItems,
            targetCellItems,
            hash: (0, CellsHelpers_1.cellsToHashString)(kickCells),
        };
    }
    findDistantCell(props) {
        const { blastGem, lineBombGem, kickCells, usedTargetCells, randomizeArray } = props;
        const distantCellsResult = (0, PatternsHelpers_1.filterRocketDistantCells)({
            board: this.board,
            matchCells: [blastGem],
            kickCells,
            usedTargetCells,
            randomizeArray,
            equalizeGoalPriorities: true,
        });
        const { goalCells } = distantCellsResult;
        const { regularGemCells } = distantCellsResult;
        const { orientation } = lineBombGem.core;
        const priorityScoreToDistantCells = {};
        priorityScoreToDistantCells[0] = [];
        let maxGoalsPriorityScore = 0;
        [...goalCells, ...regularGemCells].forEach((distantCell) => {
            let goalsPriorityScore = distantCell.priority;
            goalCells.forEach((goalCell) => {
                if ((0, CellsHelpers_1.isCellsEqual)(distantCell, goalCell) || (0, CellsHelpers_1.getOrientationByCells)(distantCell, goalCell) !== orientation)
                    return;
                goalsPriorityScore += goalCell.priority;
            });
            priorityScoreToDistantCells[goalsPriorityScore] ?? (priorityScoreToDistantCells[goalsPriorityScore] = []);
            priorityScoreToDistantCells[goalsPriorityScore].push(distantCell);
            maxGoalsPriorityScore = Math.max(maxGoalsPriorityScore, goalsPriorityScore);
        });
        const maxScoreDistantCells = [...priorityScoreToDistantCells[maxGoalsPriorityScore]];
        if (maxScoreDistantCells.length > 0) {
            const targetCell = this.board.randomGenerator.clone().pick(maxScoreDistantCells);
            return { kind: 'distant', ...targetCell };
        }
        this.board.logger.error('No target cell found for the combo rocket', blastGem);
        return { kind: 'distant', col: 0, row: 0 };
    }
    clone() {
        return new RocketLineBombComboBlastPattern();
    }
}
exports.RocketLineBombComboBlastPattern = RocketLineBombComboBlastPattern;
//# sourceMappingURL=RocketLineBombComboBlastPattern.js.map