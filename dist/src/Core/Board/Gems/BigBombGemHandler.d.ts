import { BigBombGemProps, BoosterType, Gem, GemCoreName } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type BombGem = Gem<GemCoreName.BigBomb>;
export declare class BigBombGemHandler extends GemHandler<GemCoreName.BigBomb> {
    create(props: Partial<BigBombGemProps>): BigBombGemProps;
    kick(gem: BombGem): KickResultWithLockTicks;
    hit(gem: BombGem): HitResultWithLockTicks;
    blocksBooster(gem: BombGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: BombGem): boolean;
    blocksMove(gem: BombGem): boolean;
    blocksSwap(gem: BombGem): boolean;
    isClickable(gem: BombGem): boolean;
    isCombo(gem: BombGem): boolean;
    clone(): BigBombGemHandler;
}
export {};
