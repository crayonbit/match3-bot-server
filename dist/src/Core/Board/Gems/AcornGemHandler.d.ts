import { AcornGemProps, BoosterType, Gem, GemCoreName } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type AcornGem = Gem<GemCoreName.Acorn>;
export declare class AcornGemHandler extends GemHandler<GemCoreName.Acorn> {
    create(props: Partial<AcornGemProps>): AcornGemProps;
    kick(gem: AcornGem): KickResultWithLockTicks;
    hit(gem: AcornGem): HitResultWithLockTicks;
    blocksBooster(gem: AcornGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: AcornGem): boolean;
    blocksMove(gem: AcornGem): boolean;
    blocksSwap(gem: AcornGem): boolean;
    isCombo(gem: AcornGem): boolean;
    isClickable(gem: AcornGem): boolean;
    clone(): AcornGemHandler;
}
export {};
