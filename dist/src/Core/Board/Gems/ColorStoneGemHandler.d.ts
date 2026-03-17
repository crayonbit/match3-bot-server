import { BoosterType, ColorStoneGemProps, Gem, GemCoreName } from '../BoardTypes';
import { HitLayerParams, HitResultWithLockTicks, KickLayerParams, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type ColorStoneGem = Gem<GemCoreName.ColorStone>;
export declare class ColorStoneGemHandler extends GemHandler<GemCoreName.ColorStone> {
    create(props: Pick<ColorStoneGemProps, 'hp' | 'color'>): ColorStoneGemProps;
    kick(gem: ColorStoneGem, params: KickLayerParams): KickResultWithLockTicks;
    hit(gem: ColorStoneGem, params: HitLayerParams): HitResultWithLockTicks;
    blocksBooster(gem: ColorStoneGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: ColorStoneGem): boolean;
    blocksMove(gem: ColorStoneGem): boolean;
    blocksSwap(gem: ColorStoneGem): boolean;
    isClickable(gem: ColorStoneGem): boolean;
    isCombo(gem: ColorStoneGem): boolean;
    clone(): ColorStoneGemHandler;
}
export {};
