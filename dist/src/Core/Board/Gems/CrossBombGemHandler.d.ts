import { BoosterType, CrossBombGemProps, Gem, GemCoreName } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type CrossBombGem = Gem<GemCoreName.CrossBomb>;
export declare class CrossBombGemHandler extends GemHandler<GemCoreName.CrossBomb> {
    create(props: Partial<CrossBombGemProps>): CrossBombGemProps;
    kick(gem: CrossBombGem): KickResultWithLockTicks;
    hit(gem: CrossBombGem): HitResultWithLockTicks;
    blocksBooster(gem: CrossBombGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: CrossBombGem): boolean;
    blocksMove(gem: CrossBombGem): boolean;
    blocksSwap(gem: CrossBombGem): boolean;
    isClickable(gem: CrossBombGem): boolean;
    isCombo(gem: CrossBombGem): boolean;
    clone(): CrossBombGemHandler;
}
export {};
