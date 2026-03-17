import { BoosterType, Gem, GemCoreName, RegularGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type RegularGem = Gem<GemCoreName.Regular>;
export declare class RegularGemHandler extends GemHandler<GemCoreName.Regular> {
    create(props: Pick<RegularGemProps, 'color'>): RegularGemProps;
    kick(gem: RegularGem): KickResultWithLockTicks;
    hit(gem: RegularGem): HitResultWithLockTicks;
    blocksBooster(gem: RegularGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: RegularGem): boolean;
    blocksMove(gem: RegularGem): boolean;
    blocksSwap(gem: RegularGem): boolean;
    isClickable(gem: RegularGem): boolean;
    isCombo(gem: RegularGem): boolean;
    clone(): RegularGemHandler;
}
export {};
