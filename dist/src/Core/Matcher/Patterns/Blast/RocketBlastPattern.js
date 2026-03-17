"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const CellsOffsets_1 = require("../../../Utils/CellsOffsets");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const Pattern_1 = require("../../Pattern");
const PatternsHelpers_1 = require("../PatternsHelpers");
class RocketBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'rocketBlastPattern';
    }
    tryCreateMatch(params) {
        const { matchCheckGems, swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matchGems = [...matchCheckGems, ...swapGemsFiltered];
        const rocket = matchGems.find((swapGem) => !justUsedCells.has(swapGem) && swapGem.core.className === BoardTypes_1.GemCoreName.Rocket);
        if (!rocket)
            return null;
        const kickCells = [];
        if (rocket.core.shouldKickCrossCells) {
            (0, CellsOffsets_1.getAdjacentCells)(rocket, ['top', 'right', 'bottom', 'left']).forEach((cell) => {
                if (this.board.isInGrid(cell)) {
                    kickCells.push({
                        kind: 'nearby',
                        ...cell,
                    });
                }
            });
        }
        const distantCell = this.findDistantCell({
            blastCell: rocket,
            kickCells,
            usedTargetCells: justUsedCells,
            randomizeArray: (array) => {
                return this.board.randomGenerator.clone().shuffle(array);
            },
        });
        const targetCells = kickCells.concat(distantCell);
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: [],
            blastGem: rocket,
            targetCells,
            targetCellItems: targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    findDistantCell(props) {
        const { blastCell, kickCells, usedTargetCells, randomizeArray } = props;
        const distantCellsResult = (0, PatternsHelpers_1.filterRocketDistantCells)({
            board: this.board,
            matchCells: [blastCell],
            kickCells,
            usedTargetCells,
            randomizeArray,
        });
        const { maxPrioGoalCells, goalCells } = distantCellsResult;
        const { regularGemCells, otherGemCells } = distantCellsResult;
        for (const cells of [maxPrioGoalCells, goalCells, regularGemCells, otherGemCells]) {
            if (cells.length === 0)
                continue;
            const cellsByDistances = (0, GemsHelpers_1.getCellsByDistanceToTargeCell)(cells, blastCell);
            const targetDistance = this.getTargetDistance(cellsByDistances);
            const targetCells = cellsByDistances.get(targetDistance);
            const targetCell = this.board.randomGenerator.clone().pick(targetCells);
            return {
                kind: 'distant',
                col: targetCell.col,
                row: targetCell.row,
                entityId: targetCell.entityId,
                layerKey: targetCell.layerKey,
            };
        }
        this.board.logger.error('No target cell found for the rocket', blastCell);
        return { kind: 'distant', col: 0, row: 0 };
    }
    getTargetDistance(gemsByDistance) {
        const distances = Array.from(gemsByDistance.keys());
        if (!distances.length)
            return 0;
        const minDistance = Math.min(...distances);
        const maxDistance = Math.max(...distances);
        const midDistance = (minDistance + maxDistance) / 2;
        let targetDistance = 0;
        for (const distance of distances) {
            if (distance >= midDistance) {
                targetDistance = distance;
            }
        }
        return targetDistance;
    }
    clone() {
        return new RocketBlastPattern();
    }
}
exports.RocketBlastPattern = RocketBlastPattern;
//# sourceMappingURL=RocketBlastPattern.js.map