"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardSignals = void 0;
const signals_1 = require("signals");
const SignalsHandlerBase_1 = require("../SignalsHandlerBase");
class BoardSignals extends SignalsHandlerBase_1.SignalsHandlerBase {
    constructor() {
        super({
            onLevelLoaded: new signals_1.Signal(),
            onSwapGems: new signals_1.Signal(),
            onSwapGemsCombo: new signals_1.Signal(),
            onSwapGemsWrong: new signals_1.Signal(),
            onClickGem: new signals_1.Signal(),
            onMoveGemToCellByGravity: new signals_1.Signal(),
            onAbruptMoveGemToCellByGravity: new signals_1.Signal(),
            onShuffleGems: new signals_1.Signal(),
            onKill: new signals_1.Signal(),
            onSpawnGem: new signals_1.Signal(),
            onCreateBlastLayerGem: new signals_1.Signal(),
            onGemCoreReplaced: new signals_1.Signal(),
            onMergeCells: new signals_1.Signal(),
            onBlastGem: new signals_1.Signal(),
            onBlastLayerGem: new signals_1.Signal(),
            onAddCellLock: new signals_1.Signal(),
            onRemoveCellLock: new signals_1.Signal(),
            onItemModified: new signals_1.Signal(),
            onItemRemoved: new signals_1.Signal(),
            onKick: new signals_1.Signal(),
            onHit: new signals_1.Signal(),
            onStartQuestItem: new signals_1.Signal(),
            onBoosterUsed: new signals_1.Signal(),
            onGetLevelGridItemData: new signals_1.Signal(),
            onGetBoardMoves: new signals_1.Signal(),
            onGetLevelGridDataOnCells: new signals_1.Signal(),
            onGetGemOnCell: new signals_1.Signal(),
            onReplaceGemCore: new signals_1.Signal(),
            onPreBoostersWaiting: new signals_1.Signal(),
            onPreBoosterUsed: new signals_1.Signal(),
            onTaskStarted: new signals_1.Signal(),
            onTaskFinished: new signals_1.Signal(),
        });
    }
}
exports.BoardSignals = BoardSignals;
//# sourceMappingURL=BoardSignals.js.map