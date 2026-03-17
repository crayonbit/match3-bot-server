"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketsComboBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
const PatternsHelpers_1 = require("../PatternsHelpers");
class RocketsComboBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'rocketsComboBlastPattern';
        this.distantTargetCellsToFind = 3; // For 3 rockets
        this.canChangeTargetCell = true;
    }
    tryCreateMatch(params) {
        const { swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        if (swapGemsFiltered.length !== 2)
            return null;
        if (!(0, GemsHelpers_1.isAllGemsOfKind)(swapGems, BoardTypes_1.GemCoreName.Rocket, justUsedCells)) {
            return null;
        }
        const blastGem = swapGems[1];
        const kickCells = [];
        (0, CellsOffsets_1.getAdjacentCells)(blastGem, ['top', 'right', 'bottom', 'left']).forEach((cell) => {
            if (this.board.isInGrid(cell)) {
                kickCells.push({
                    kind: 'nearby',
                    ...cell,
                });
            }
        });
        const distantCells = this.findDistantCells(blastGem, kickCells, justUsedCells, (array) => {
            return this.board.randomGenerator.clone().shuffle(array);
        });
        const targetCellItems = kickCells.concat(distantCells);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: swapGems,
            blastGem,
            targetCells: targetCellItems,
            targetCellItems,
            canChangeTargetCell: this.canChangeTargetCell,
            hash: (0, CellsHelpers_1.cellsToHashString)(kickCells),
        };
    }
    findDistantCells(blastGem, kickCells, usedTargetCells, randomizeArray) {
        const distantCellsResult = (0, PatternsHelpers_1.filterRocketDistantCells)({
            board: this.board,
            matchCells: [blastGem],
            kickCells,
            usedTargetCells,
            randomizeArray,
        });
        let { maxPrioGoalCells } = distantCellsResult;
        const { goalCells, regularGemCells, otherGemCells } = distantCellsResult;
        // If there is only one goal cell left which has area greater than 1,
        // then all 3 rockets should attack this same goal target
        if ((0, PatternsHelpers_1.isRocketLastBigSizeGoalCell)(goalCells)) {
            if (maxPrioGoalCells[0].sizeCanUnwrap) {
                maxPrioGoalCells = (0, CellsHelpers_1.unwrapBigSizeCell)(maxPrioGoalCells[0], maxPrioGoalCells[0].size);
            }
            while (maxPrioGoalCells.length < this.distantTargetCellsToFind) {
                maxPrioGoalCells.push(maxPrioGoalCells[0]);
            }
            this.canChangeTargetCell = false;
            randomizeArray(maxPrioGoalCells);
        }
        const targetCells = [];
        const goalCellsNoMaxPrio = goalCells.filter((cell) => {
            return !maxPrioGoalCells.some((maxPrioCell) => (0, CellsHelpers_1.isCellsEqual)(maxPrioCell, cell));
        });
        for (const cells of [maxPrioGoalCells, goalCellsNoMaxPrio, regularGemCells, otherGemCells]) {
            if (cells.length === 0)
                continue;
            const cellsByDistances = (0, GemsHelpers_1.getCellsByDistanceToTargeCell)(cells, blastGem);
            do {
                const targetDistance = this.getTargetDistance(cellsByDistances);
                const targetDistantCells = cellsByDistances.get(targetDistance);
                const targetDistantCell = this.board.randomGenerator.clone().pick(targetDistantCells);
                targetDistantCells.splice(targetDistantCells.indexOf(targetDistantCell), 1);
                if (targetDistantCells.length === 0) {
                    cellsByDistances.delete(targetDistance);
                }
                targetCells.push({
                    kind: 'distant',
                    col: targetDistantCell.col,
                    row: targetDistantCell.row,
                    entityId: targetDistantCell.entityId,
                    layerKey: targetDistantCell.layerKey,
                });
            } while (targetCells.length < this.distantTargetCellsToFind && cellsByDistances.size > 0);
            if (targetCells.length >= this.distantTargetCellsToFind)
                break;
        }
        if (targetCells.length > 0)
            return targetCells;
        this.board.logger.error('No target cells found for the rocket', blastGem);
        return new Array(this.distantTargetCellsToFind).fill({ kind: 'distant', col: 0, row: 0 });
    }
    getTargetDistance(cellsByDistance) {
        const distances = Array.from(cellsByDistance.keys());
        if (!distances.length)
            return 0;
        const minDistance = Math.min(...distances);
        const maxDistance = Math.max(...distances);
        const midDistance = (minDistance + maxDistance) / 2;
        const longDistances = [];
        for (const distance of distances) {
            if (distance >= midDistance) {
                longDistances.push(distance);
            }
        }
        return this.board.randomGenerator.clone().pick(longDistances);
    }
    clone() {
        return new RocketsComboBlastPattern();
    }
}
exports.RocketsComboBlastPattern = RocketsComboBlastPattern;
//# sourceMappingURL=RocketsComboBlastPattern.js.map