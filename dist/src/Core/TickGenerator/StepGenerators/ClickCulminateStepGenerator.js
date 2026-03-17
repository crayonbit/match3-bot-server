"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickCulminateStepGenerator = void 0;
const MatcherUtils_1 = require("../../Matcher/MatcherUtils");
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const StepGenerator_1 = require("./StepGenerator");
class ClickCulminateStepGenerator extends StepGenerator_1.StepGenerator {
    constructor(props) {
        super(props);
        this.name = 'ClickCulminateStep';
        this.stepsModel = props.stepsModel;
        this.board = props.board;
    }
    *tick() {
        const clickCell = this.stepsModel.getClickCell();
        const matches = this.stepsModel.getMatches();
        if (!clickCell) {
            return;
        }
        if (this.isClickCellMatched(clickCell, matches)) {
            this.board.dispatchClickGem(clickCell);
        }
        this.stepsModel.clearClickCell();
    }
    isClickCellMatched(clickCell, matches) {
        return matches.some((match) => {
            const hasGem = match.gems.some((gem) => (0, CellsHelpers_1.isCellsEqual)({ col: gem.col, row: gem.row }, clickCell));
            let hasBlastGem = false;
            if ((0, MatcherUtils_1.isBaseBlastMatch)(match)) {
                hasBlastGem = (0, CellsHelpers_1.isCellsEqual)({ col: match.blastGem.col, row: match.blastGem.row }, clickCell);
            }
            return hasGem || hasBlastGem;
        });
    }
    isSettled() {
        return true;
    }
}
exports.ClickCulminateStepGenerator = ClickCulminateStepGenerator;
//# sourceMappingURL=ClickCulminateStepGenerator.js.map