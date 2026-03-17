import { BoosterType, ColorBombGemProps, Gem, GemCoreName } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type ColorBombGem = Gem<GemCoreName.ColorBomb>;
export declare class ColorBombGemHandler extends GemHandler<GemCoreName.ColorBomb> {
    create(props: unknown): ColorBombGemProps;
    kick(gem: ColorBombGem): KickResultWithLockTicks;
    hit(gem: ColorBombGem): HitResultWithLockTicks;
    blocksBooster(gem: ColorBombGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: ColorBombGem): boolean;
    blocksMove(gem: ColorBombGem): boolean;
    blocksSwap(gem: ColorBombGem): boolean;
    isClickable(gem: ColorBombGem): boolean;
    isCombo(gem: ColorBombGem): boolean;
    clone(): ColorBombGemHandler;
}
export {};
