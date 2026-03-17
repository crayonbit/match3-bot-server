import { Size } from '../../Utils/Geom/GeomTypes';
import { ColorTrayGemProps, BoosterType, Gem, GemCoreName } from '../BoardTypes';
import { HitLayerParams, HitResultWithLockTicks, KickLayerParams, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type ColorTrayGem = Gem<GemCoreName.ColorTray>;
export declare const ColorTrayMaxHp = 4;
export declare class ColorTrayGemHandler extends GemHandler<GemCoreName.ColorTray> {
    create(props: Partial<ColorTrayGemProps>): ColorTrayGemProps;
    kick(gem: ColorTrayGem, params: KickLayerParams): KickResultWithLockTicks;
    hit(gem: ColorTrayGem, params: HitLayerParams): HitResultWithLockTicks;
    blocksBooster(gem: ColorTrayGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: ColorTrayGem): boolean;
    blocksMove(gem: ColorTrayGem): boolean;
    blocksSwap(gem: ColorTrayGem): boolean;
    isClickable(gem: ColorTrayGem): boolean;
    isCombo(gem: ColorTrayGem): boolean;
    getSize(gem: ColorTrayGem): Size;
    clone(): ColorTrayGemHandler;
}
export {};
