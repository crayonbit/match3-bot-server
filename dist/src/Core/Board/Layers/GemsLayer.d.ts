import { ReplaceGemCoreProps, BoosterType, Gem, GemCoreName, LevelGridItemKey, PartialCore } from '../BoardTypes';
import { TickIterator } from '../../TickGenerator/TickGeneratorTypes';
import { Cell } from '../../Types';
import { Size } from '../../Utils/Geom/GeomTypes';
import { IGemHandler } from '../Gems/GemsTypes';
import { Layer } from './Layer';
import { GemNameHash, HitLayerParams, HitResult, IGemsLayer, KickLayerParams, KickResult, LayerProps, ShuffleData } from './LayersTypes';
export declare class GemsLayer extends Layer<LevelGridItemKey.Gem> implements IGemsLayer {
    private readonly bigSizeMap;
    private handlersMap;
    private countsOnBoard;
    constructor(gemsHandlers: Record<GemCoreName, IGemHandler>);
    init(props: LayerProps): void;
    onLevelLoad(): void;
    private tryAddGemToBigSizeMap;
    private clearGemInBigSizeMap;
    private tryUpdateBigSizeMap;
    private isSizeEqual;
    private getCoreHandler;
    /**
     * Creates and sets a gem in the specified grid cell by the partial core data.
     */
    createGemOnGrid(cell: Cell, partialCore: PartialCore, customId?: string): Gem;
    isClickable(cell: Cell): boolean;
    blocksSwap(cell: Cell): boolean;
    blocksMatch(cell: Cell): boolean;
    blocksMove(cell: Cell): boolean;
    blocksBooster(cell: Cell, boosterType: BoosterType): boolean;
    /**
     * Performs direct kick on the cell.
     * If the cell can receive any kick damage it might be killed or its HP will be decreased, or some other modification can happen
     * @param cell The cell to kick.
     * @returns {boolean} - if cell was kicked
     */
    kick(cell: Cell, params: KickLayerParams): KickResult;
    decrementHp(cell: Cell): boolean;
    /**
     * Hit is the damage that can receive a cell from a "blast wave" of a powerful kick
     * E.g. On three in a row match three gems got kicked and adjacent cells receive a hit damage
     * @param cell The cell to hit.
     * @returns {boolean} - if cell was kicked
     */
    hit(cell: Cell, params: HitLayerParams): HitResult;
    createGem(cell: Cell, partialCore: PartialCore, customId?: string): Gem;
    get(cell: Cell): Gem | null;
    swap(cellA: Cell, cellB: Cell): void;
    getWithType<T extends GemCoreName>(cell: Cell, coreName: T): Gem<T> | null;
    set(gem: Gem, cell: Cell): void;
    protected removeAndReturnItem(cell: Cell): Gem | null;
    isKilled(item: Gem): boolean;
    replaceGemCore(taskData: ReplaceGemCoreProps): void;
    getGemById(id: string): Gem | null;
    shuffle(maxAttemptsPerChunk: number, maxTotalAttempts: number, maxNoAutoMatchesAttempts: number, onComplete: (data: ShuffleData[]) => void): TickIterator;
    getGemsByCoreName<T extends GemCoreName>(coreName: T): Gem<T>[];
    areGemsNeighbors(gemA: Gem, gemB: Gem): boolean;
    private getCellsDistance;
    isCombo(gem: Gem): boolean;
    isCovered(gem: Gem): boolean;
    getSize(gem: Gem): Size;
    getSizeCells(gem: Gem): Cell[];
    getCountOnBoard(itemNameHash: GemNameHash): number;
    private updateCountOnBoard;
    destroy(): void;
    clone(): IGemsLayer;
}
