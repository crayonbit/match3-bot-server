import { Signal } from 'signals';
import { SignalsHandlerBase } from '../SignalsHandlerBase';
import { BlastDataForAnimation, BlastData } from '../TaskManager/TaskManagerTypes';
import { Cell } from '../Types';
import type { BoosterType, CellsLockerSignals, Gem, ILevel, LayerItemWithKey, ModifyItemProps, OnGemCoreReplacedProps, KillItemProps, OnStartQuestItemProps, RemoveItemProps, ReplaceGemCoreProps, PreBoosterType, OnMergeCellsProps } from './BoardTypes';
import type { ShuffleData } from './Layers/LayersTypes';
import type { OnGetBoardMovesProps, OnGetLevelGridDataOnCellsProps, OnGetLevelGridItemDataProps, OnTaskStartedProps, OnTaskFinishedProps, OnGetGemOnCellProps } from '../../Signals/SignalsTypes';
type BoardSignalsMap = {
    onLevelLoaded: Signal<ILevel>;
    onSwapGems: Signal<{
        gemA: Gem;
        gemB?: Gem;
    }>;
    onSwapGemsCombo: Signal<{
        gemA: Gem;
        gemB: Gem;
    }>;
    onSwapGemsWrong: Signal<{
        gemA: Gem;
        cellB: Cell;
        gemB?: Gem;
    }>;
    onClickGem: Signal<Gem>;
    onMoveGemToCellByGravity: Signal<{
        gem: Gem;
        sourceCell: Cell;
        targetCell: Cell;
    }>;
    onAbruptMoveGemToCellByGravity: Signal<{
        gem: Gem;
        cell: Cell;
    }>;
    onShuffleGems: Signal<ShuffleData[]>;
    onKill: Signal<KillItemProps>;
    onSpawnGem: Signal<Gem>;
    onCreateBlastLayerGem: Signal<Gem>;
    onGemCoreReplaced: Signal<OnGemCoreReplacedProps>;
    onMergeCells: Signal<OnMergeCellsProps>;
    onBlastGem: Signal<BlastDataForAnimation>;
    onBlastLayerGem: Signal<BlastData>;
    onItemModified: Signal<ModifyItemProps>;
    onItemRemoved: Signal<RemoveItemProps>;
    onKick: Signal<LayerItemWithKey>;
    onHit: Signal<LayerItemWithKey>;
    onStartQuestItem: Signal<OnStartQuestItemProps>;
    onBoosterUsed: Signal<BoosterType>;
    onGetLevelGridItemData: Signal<OnGetLevelGridItemDataProps>;
    onGetBoardMoves: Signal<OnGetBoardMovesProps>;
    onGetLevelGridDataOnCells: Signal<OnGetLevelGridDataOnCellsProps>;
    onGetGemOnCell: Signal<OnGetGemOnCellProps>;
    onReplaceGemCore: Signal<ReplaceGemCoreProps>;
    onPreBoostersWaiting: Signal<void>;
    onPreBoosterUsed: Signal<PreBoosterType>;
    onTaskStarted: Signal<OnTaskStartedProps>;
    onTaskFinished: Signal<OnTaskFinishedProps>;
} & CellsLockerSignals;
export declare class BoardSignals extends SignalsHandlerBase<BoardSignalsMap> {
    constructor();
}
export {};
