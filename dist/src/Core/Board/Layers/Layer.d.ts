import { Cell, CoreConfig } from '../../Types';
import { Size } from '../../Utils/Geom/GeomTypes';
import type { BoosterType, QuestTarget, LayerItemKey, LayerItemWithKey } from '../BoardTypes';
import { IBoard } from '../BoardTypes';
import { HitLayerParams, HitResult, ILayer, KickLayerParams, KickResult, LayerItem, LayerProps } from './LayersTypes';
export declare abstract class Layer<T extends LayerItemKey> implements ILayer<T> {
    readonly layerName: T;
    board: IBoard;
    protected config: CoreConfig;
    constructor(layerName: T);
    init(props: LayerProps): void;
    onLevelLoad(): void;
    postLevelLoad(): void;
    blocksSwap(cell: Cell): boolean;
    blocksClick(cell: Cell): boolean;
    isClickable(cell: Cell): boolean;
    blocksMatch(cell: Cell): boolean;
    blocksMove(cell: Cell): boolean;
    hasGameElement(cell: Cell): boolean;
    kick(cell: Cell, params: KickLayerParams): KickResult;
    hit(cell: Cell, params: HitLayerParams): HitResult;
    blocksBooster(cell: Cell, boosterType: BoosterType): boolean;
    remove(cell: Cell): boolean;
    removeAndDispatchKill(cell: Cell, taskId: string): boolean;
    protected removeAndReturnItem(cell: Cell): LayerItem<T> | null;
    modifyItem(item: LayerItem<T>, change: Partial<LayerItem<T>>): void;
    abstract isKilled(item: LayerItem): boolean;
    get(cell: Cell): LayerItem<T> | null;
    set(item: NonNullable<LayerItem<T>>, cell: Cell): void;
    loopGrid(callback: (item: LayerItem<T> | null, cell: Cell) => void): void;
    loopExistingLayerItems(callback: (item: NonNullable<LayerItem<T>>, cell: Cell) => void): void;
    find(test: (item: LayerItem<T>, cell: Cell) => boolean): LayerItem<T> | null;
    getAll(filter?: (item: NonNullable<LayerItem<T>>) => boolean): Array<NonNullable<LayerItem<T>>>;
    getCellsWithinCellSize(cell: Cell, size: Size): Cell[];
    getQuestTargets(questItem: LayerItemWithKey): QuestTarget[] | null;
    prepareQuestTargets(questItem: LayerItemWithKey, targets: QuestTarget[]): void;
    consumeQuestItem(questItem: LayerItemWithKey, target: QuestTarget, taskId: string): void;
    /**
     * Override this method with your custom implementation to avoid scanning the entire grid
     */
    getCountOnBoard(props: unknown): number;
    getSize(item: LayerItem<T>): Size;
    destroy(): void;
}
