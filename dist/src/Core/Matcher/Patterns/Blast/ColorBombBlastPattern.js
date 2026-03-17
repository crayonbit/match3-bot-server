"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBombBlastPattern = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const CellsHelpers_1 = require("../../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../../Utils/GemsHelpers");
const MatcherUtils_1 = require("../../MatcherUtils");
const Pattern_1 = require("../../Pattern");
class ColorBombBlastPattern extends Pattern_1.Pattern {
    constructor() {
        super(...arguments);
        this.name = 'colorBombBlastPattern';
    }
    tryCreateMatch(params) {
        const { matchCheckGems, swapGems, justUsedCells } = params;
        const swapGemsFiltered = swapGems.filter(Boolean);
        const matchGems = [...matchCheckGems, ...swapGemsFiltered].filter((gem) => !justUsedCells.has(gem));
        const colorBomb = this.findColorBomb(matchGems);
        if (!colorBomb)
            return null;
        const swapTargetGem = swapGemsFiltered.find((swapGem) => (0, GemsHelpers_1.isGemOfKind)(swapGem, BoardTypes_1.GemCoreName.Regular));
        let targetCells = this.findTargetCells(swapTargetGem?.core.color || null);
        if (swapTargetGem?.core.color) {
            const regularTargetGems = targetCells.map((cell) => this.board.getGem(cell)).filter(Boolean);
            const regularMatches = this.board.regularMatcher.findMatches(regularTargetGems, []);
            const bombCreationMatches = regularMatches.filter(MatcherUtils_1.isBombCreationMatch);
            const bombMatchesHasSwapGem = bombCreationMatches.some((match) => match.gems.some((gem) => gem.id === swapTargetGem?.id));
            if (bombMatchesHasSwapGem) {
                targetCells = targetCells.filter((cell) => !(0, CellsHelpers_1.isCellsEqual)(cell, swapTargetGem));
            }
        }
        return {
            id: this.generateMatchId(),
            patternName: this.name,
            gems: targetCells.map((cell) => this.board.getGem(cell)).filter(Boolean),
            blastGem: colorBomb,
            targetCells,
            hash: (0, CellsHelpers_1.cellsToHashString)(targetCells),
        };
    }
    findColorBomb(matchGems) {
        return matchGems.find((swapGem) => (0, GemsHelpers_1.isGemOfKind)(swapGem, BoardTypes_1.GemCoreName.ColorBomb)) ?? null;
    }
    findTargetCells(swapColor) {
        const gemsByColor = new Map();
        const targetCells = [];
        this.board.gemsLayer.loopExistingLayerItems((gem) => {
            if (!(0, GemsHelpers_1.isGemOfKind)(gem, BoardTypes_1.GemCoreName.Regular) ||
                this.board.locker.hasSomeLockReason(gem, ['Blast', 'ClearCell']) ||
                this.board.gemsLayer.isCovered(gem)) {
                return;
            }
            gemsByColor.set(gem.core.color, [...(gemsByColor.get(gem.core.color) || []), gem]);
            if (swapColor && gem.core.color === swapColor) {
                targetCells.push({ kind: 'distant', col: gem.col, row: gem.row });
            }
        });
        if (!swapColor) {
            const gemsByColorSorted = Array.from(gemsByColor.values()).sort((a, b) => b.length - a.length);
            const mostGemsByColor = gemsByColorSorted?.[0] ?? [];
            targetCells.push(...mostGemsByColor.map((gem) => ({ kind: 'distant', col: gem.col, row: gem.row })));
        }
        return targetCells;
    }
    clone() {
        return new ColorBombBlastPattern();
    }
}
exports.ColorBombBlastPattern = ColorBombBlastPattern;
//# sourceMappingURL=ColorBombBlastPattern.js.map