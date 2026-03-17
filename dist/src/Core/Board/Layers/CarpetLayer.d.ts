import { Cell } from '../../Types';
import { ICarpetItemProps, LevelGridItemKey } from '../BoardTypes';
import { Layer } from './Layer';
import { ICarpetLayer, KickLayerParams, KickResult } from './LayersTypes';
export declare class CarpetLayer extends Layer<LevelGridItemKey.Carpet> implements ICarpetLayer {
    private readonly sidesMapToTilePosition;
    private readonly tilePositionUpdateDirections;
    constructor();
    createItem(props: Partial<ICarpetItemProps>, customId?: string): ICarpetItemProps;
    postLevelLoad(): void;
    private getUpdatedTilePosition;
    kick(cell: Cell, params: KickLayerParams): KickResult;
    private updateTilesAround;
    isKilled(item: ICarpetItemProps): boolean;
    clone(): ICarpetLayer;
}
