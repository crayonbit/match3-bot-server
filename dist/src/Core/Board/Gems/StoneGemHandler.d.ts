import { BoosterType, Gem, GemCoreName, StoneGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type StoneGem = Gem<GemCoreName.Stone>;
export declare class StoneGemHandler extends GemHandler<GemCoreName.Stone> {
    create(props: Pick<StoneGemProps, 'hp'>): StoneGemProps;
    kick(gem: StoneGem): KickResultWithLockTicks;
    hit(gem: StoneGem): HitResultWithLockTicks;
    blocksBooster(gem: StoneGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: StoneGem): boolean;
    blocksMove(gem: StoneGem): boolean;
    blocksSwap(gem: StoneGem): boolean;
    isClickable(gem: StoneGem): boolean;
    isCombo(gem: StoneGem): boolean;
    clone(): StoneGemHandler;
}
export {};
