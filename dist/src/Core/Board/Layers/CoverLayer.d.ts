import { Cell } from '../../Types';
import { ICoverItemProps, LevelGridItemKey } from '../BoardTypes';
import { Layer } from './Layer';
import { HitLayerParams, HitResult, ICoverLayer, KickLayerParams, KickResult } from './LayersTypes';
export declare class CoverLayer extends Layer<LevelGridItemKey.Cover> implements ICoverLayer {
    private readonly tileConnectionDirections;
    private readonly directionToMask;
    constructor();
    createItem(props: Partial<ICoverItemProps>, customId?: string): ICoverItemProps;
    postLevelLoad(): void;
    private getConnectionMask;
    kick(cell: Cell, params: KickLayerParams): KickResult;
    hit(cell: Cell, params: HitLayerParams): HitResult;
    private updateTilesAround;
    isKilled(item: ICoverItemProps): boolean;
    blocksSwap(cell: Cell): boolean;
    blocksMatch(cell: Cell): boolean;
    clone(): ICoverLayer;
}
