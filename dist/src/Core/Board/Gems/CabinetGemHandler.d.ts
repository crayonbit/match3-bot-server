import { Size } from '../../Utils/Geom/GeomTypes';
import { BoosterType, CabinetGemProps, Gem, GemCoreName } from '../BoardTypes';
import { HitLayerParams, HitResultWithLockTicks, KickLayerParams, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type CabinetGem = Gem<GemCoreName.Cabinet>;
export declare class CabinetGemHandler extends GemHandler<GemCoreName.Cabinet> {
    create(props: Partial<CabinetGemProps>): CabinetGemProps;
    kick(gem: CabinetGem, params: KickLayerParams): KickResultWithLockTicks;
    hit(gem: CabinetGem, params: HitLayerParams): HitResultWithLockTicks;
    private handleAttack;
    blocksBooster(gem: CabinetGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: CabinetGem): boolean;
    blocksMove(gem: CabinetGem): boolean;
    blocksSwap(gem: CabinetGem): boolean;
    isClickable(gem: CabinetGem): boolean;
    isCombo(gem: CabinetGem): boolean;
    getSize(gem: CabinetGem): Size;
    clone(): CabinetGemHandler;
}
export {};
