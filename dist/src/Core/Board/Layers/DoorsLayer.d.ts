import { Cell } from '../../Types';
import { IDoorItemProps, LayerItemWithKey, LevelGridItemKey, QuestTarget } from '../BoardTypes';
import { Layer } from './Layer';
import { HitLayerParams, HitResult, IDoorsLayer, KickLayerParams, KickResult } from './LayersTypes';
export declare class DoorsLayer extends Layer<LevelGridItemKey.Door> implements IDoorsLayer {
    private readonly bigSizeMap;
    private readonly originCells;
    private readonly itemsPreDecrementedHp;
    constructor();
    onLevelLoad(): void;
    private tryAddItemToBigSizeMap;
    /**
     * If item was triggered (e.g. by a kick or hit) it is becoming a potential goal item.
     * By default regular goal items are getting collected to the goals panel if no other targets found for them among the board layers.
     * If you want to change this behavior you can override this method and return an array of custom goal targets from the board.
     * All the collected goal items eventually will be consumed by those targets after they reach them.
     * See the `consumeGoalItem` method.
     */
    getQuestTargets(questItem: LayerItemWithKey): QuestTarget[] | null;
    private getItemCells;
    prepareQuestTargets(questItem: LayerItemWithKey, targets: QuestTarget[]): void;
    consumeQuestItem(questItem: LayerItemWithKey, target: QuestTarget, taskId: string): void;
    private isNeededQuestItem;
    createItem(props: Partial<IDoorItemProps>, customId?: string): IDoorItemProps;
    kick(cell: Cell, params: KickLayerParams): KickResult;
    hit(cell: Cell, params: HitLayerParams): HitResult;
    blocksSwap(cell: Cell): boolean;
    blocksClick(cell: Cell): boolean;
    isClickable(cell: Cell): boolean;
    blocksMatch(cell: Cell): boolean;
    blocksMove(cell: Cell): boolean;
    get(cell: Cell): IDoorItemProps | null;
    protected removeAndReturnItem(cell: Cell): IDoorItemProps | null;
    private clearGemInBigSizeMap;
    private removeOriginCell;
    isKilled(item: IDoorItemProps): boolean;
    destroy(): void;
    clone(): IDoorsLayer;
}
