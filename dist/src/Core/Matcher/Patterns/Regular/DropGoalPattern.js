"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropGoalPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const Pattern_1 = require("../../Pattern");
class DropGoalPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'dropGoalPattern';
    }
    tryCreateMatch(params) {
        const { patternData, swapGems } = params;
        if (!this.board.hasDropGoals() || swapGems.length > 0)
            return null;
        const dropGoalGems = this.getDropGoalGems(patternData);
        if (dropGoalGems.length === 0) {
            return null;
        }
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: dropGoalGems,
            hash: (0, CellsHelpers_1.cellsToHashString)(dropGoalGems),
        };
    }
    getDropGoalGems(patternData) {
        const uniqueIDs = new Set();
        return Object.values(patternData)
            .flat()
            .filter((gem) => {
            if (!gem || gem.core.className !== BoardTypes_1.GemCoreName.Drop || uniqueIDs.has(gem.id))
                return false;
            uniqueIDs.add(gem.id);
            return this.board.hasDropGoal(gem);
        });
    }
    tryCreateAfterMatch(params, matches) {
        const { swapGems } = params;
        if (!this.board.hasDropGoals() || swapGems.length === 0)
            return null;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const dropGem = swapGemsFiltered.find((swapGem) => swapGem.core.className === BoardTypes_1.GemCoreName.Drop);
        if (!dropGem)
            return null;
        const matchedAboveDrop = matches.find((match) => {
            return match.gems.some((gem) => dropGem.col === gem.col && dropGem.row - 1 === gem.row);
        });
        if (!matchedAboveDrop)
            return null;
        const dropGoalGems = [dropGem];
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: dropGoalGems,
            hash: (0, CellsHelpers_1.cellsToHashString)(dropGoalGems),
        };
    }
    clone() {
        return new DropGoalPattern();
    }
}
exports.DropGoalPattern = DropGoalPattern;
//# sourceMappingURL=DropGoalPattern.js.map