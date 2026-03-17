"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlastMatcher = void 0;
const BaseMatcher_1 = require("./BaseMatcher");
class BlastMatcher extends BaseMatcher_1.BaseMatcher {
    findMatches(matchCheckGems, swapGems) {
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matches = [];
        const justUsedCells = this.board.createCellsKeeper();
        const addMatch = (match) => {
            match.targetCells.forEach((cell) => {
                justUsedCells.add(cell);
            });
            justUsedCells.add({ col: match.blastGem.col, row: match.blastGem.row });
            justUsedCells.add(match.gems.map((gem) => ({ col: gem.col, row: gem.row })));
            matches.push(match);
        };
        this.patterns.forEach((pattern) => {
            // We are checking gems individually, because we can have multiple matches created
            matchCheckGems.forEach((matchCheckGem) => {
                const match = pattern.tryCreateMatch({
                    matchCheckGems: [matchCheckGem],
                    swapGems: swapGemsFiltered,
                    justUsedCells,
                });
                if (!match)
                    return;
                addMatch(match);
            });
            if (matchCheckGems.length > 0 || swapGems.length === 0)
                return;
            // And we are making sure swap gems can create a match if there are no match check gems
            const match = pattern.tryCreateMatch({
                matchCheckGems: [],
                swapGems: swapGemsFiltered,
                justUsedCells,
            });
            if (!match)
                return;
            addMatch(match);
        });
        return matches;
    }
    clone() {
        return new BlastMatcher({ patterns: this.patterns.map((pattern) => pattern.clone()) });
    }
}
exports.BlastMatcher = BlastMatcher;
//# sourceMappingURL=BlastMatcher.js.map