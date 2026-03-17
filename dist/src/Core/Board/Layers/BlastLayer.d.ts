import { Cell } from '../../Types';
import { Gem, GemCoreName, LevelGridItemKey, PartialCore } from '../BoardTypes';
import { IGemHandler } from '../Gems/GemsTypes';
import { Layer } from './Layer';
import { IBlastLayer, KickLayerParams, KickResult, LayerProps } from './LayersTypes';
export declare class BlastLayer extends Layer<LevelGridItemKey.Blast> implements IBlastLayer {
    private handlersMap;
    constructor(gemsHandlers: Record<GemCoreName, IGemHandler>);
    init(props: LayerProps): void;
    private getCoreHandler;
    /**
     * Creates and sets a gem on the specified grid cell by the partial core data.
     */
    createGemOnGrid(cell: Cell, partialCore: PartialCore): Gem;
    /**
     * Performs direct kick on the cell.
     * If the cell can receive any kick damage it might be killed or its HP will be decreased, or some other modification can happen
     * @param cell The cell to kick.
     * @returns {boolean} - if cell was kicked
     */
    kick(cell: Cell, params: KickLayerParams): KickResult;
    createGem(cell: Cell, partialCore: PartialCore, customId?: string): Gem;
    set(gem: Gem, cell: Cell): void;
    remove(cell: Cell): boolean;
    isKilled(item: Gem): boolean;
    clone(): IBlastLayer;
}
