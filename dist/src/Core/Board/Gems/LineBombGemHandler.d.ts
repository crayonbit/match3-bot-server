import { BoosterType, Gem, GemCoreName, LineBombGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type LineBombGem = Gem<GemCoreName.LineBomb>;
export declare class LineBombGemHandler extends GemHandler<GemCoreName.LineBomb> {
    create(props: Pick<LineBombGemProps, 'orientation'>): LineBombGemProps;
    kick(gem: LineBombGem): KickResultWithLockTicks;
    hit(gem: LineBombGem): HitResultWithLockTicks;
    blocksBooster(gem: LineBombGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: LineBombGem): boolean;
    blocksMove(gem: LineBombGem): boolean;
    blocksSwap(gem: LineBombGem): boolean;
    isClickable(gem: LineBombGem): boolean;
    isCombo(gem: LineBombGem): boolean;
    clone(): LineBombGemHandler;
}
export {};
