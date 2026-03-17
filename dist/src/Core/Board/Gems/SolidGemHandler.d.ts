import { BoosterType, Gem, GemCoreName, SolidGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type SolidGem = Gem<GemCoreName.Solid>;
export declare class SolidGemHandler extends GemHandler<GemCoreName.Solid> {
    create(props: Partial<SolidGemProps>): SolidGemProps;
    kick(gem: SolidGem): KickResultWithLockTicks;
    hit(gem: SolidGem): HitResultWithLockTicks;
    blocksBooster(gem: SolidGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: SolidGem): boolean;
    blocksMove(gem: SolidGem): boolean;
    blocksSwap(gem: SolidGem): boolean;
    isClickable(gem: SolidGem): boolean;
    isCombo(gem: SolidGem): boolean;
    clone(): SolidGemHandler;
}
export {};
