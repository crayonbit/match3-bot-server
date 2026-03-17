"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blastPatternNames = void 0;
exports.isBaseBlastMatch = isBaseBlastMatch;
exports.isBaseChangingGemMatch = isBaseChangingGemMatch;
exports.isBombCreationMatch = isBombCreationMatch;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isBaseBlastMatch(match) {
    return 'blastGem' in match;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isBaseChangingGemMatch(match) {
    return 'changingGem' in match;
}
function isBombCreationMatch(match) {
    return (match.patternName === 'fourInARowPattern' ||
        match.patternName === 'fiveInARowPattern' ||
        match.patternName === 'twoByTwoPattern' ||
        match.patternName === 'crossRowsPattern');
}
const blastPatternRecord = {
    lineBombBlastPattern: true,
    crossBombBlastPattern: true,
    rocketBlastPattern: true,
    colorBombBlastPattern: true,
    bigBombBlastPattern: true,
    lineBombsComboBlastPattern: true,
    lineBombBigBombComboBlastPattern: true,
    bigBombsComboBlastPattern: true,
    rocketLineBombComboBlastPattern: true,
    rocketBigBombComboBlastPattern: true,
    rocketsComboBlastPattern: true,
    colorBombLineBombComboBlastPattern: true,
    colorBombBigBombComboBlastPattern: true,
    colorBombRocketComboBlastPattern: true,
    colorBombsComboBlastPattern: true,
};
exports.blastPatternNames = Object.keys(blastPatternRecord);
//# sourceMappingURL=MatcherUtils.js.map