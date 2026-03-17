import { BoosterType, Gem, GemCoreName, RocketGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type RocketGem = Gem<GemCoreName.Rocket>;
export declare class RocketGemHandler extends GemHandler<GemCoreName.Rocket> {
    create(props: Partial<RocketGemProps>): RocketGemProps;
    kick(gem: RocketGem): KickResultWithLockTicks;
    hit(gem: RocketGem): HitResultWithLockTicks;
    blocksBooster(gem: RocketGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: RocketGem): boolean;
    blocksMove(gem: RocketGem): boolean;
    blocksSwap(gem: RocketGem): boolean;
    isClickable(gem: RocketGem): boolean;
    isCombo(gem: RocketGem): boolean;
    clone(): RocketGemHandler;
}
export {};
