import { BoosterType, DropGemProps, Gem, GemCoreName } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type DropGem = Gem<GemCoreName.Drop>;
export declare class DropGemHandler extends GemHandler<GemCoreName.Drop> {
    create(props: Partial<DropGemProps>): DropGemProps;
    kick(gem: DropGem): KickResultWithLockTicks;
    hit(gem: DropGem): HitResultWithLockTicks;
    blocksBooster(gem: DropGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: DropGem): boolean;
    blocksMove(gem: DropGem): boolean;
    blocksSwap(gem: DropGem): boolean;
    isCombo(gem: DropGem): boolean;
    isClickable(gem: DropGem): boolean;
    clone(): DropGemHandler;
}
export {};
