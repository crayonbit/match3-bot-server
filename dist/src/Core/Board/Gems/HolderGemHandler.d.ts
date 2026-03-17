import { BoosterType, Gem, GemCoreName, HolderGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type HolderGem = Gem<GemCoreName.Holder>;
export declare class HolderGemHandler extends GemHandler<GemCoreName.Holder> {
    create(props: Partial<HolderGemProps>): HolderGemProps;
    kick(gem: HolderGem): KickResultWithLockTicks;
    hit(gem: HolderGem): HitResultWithLockTicks;
    private handleAttack;
    blocksBooster(gem: HolderGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: HolderGem): boolean;
    blocksMove(gem: HolderGem): boolean;
    blocksSwap(gem: HolderGem): boolean;
    isClickable(gem: HolderGem): boolean;
    isCombo(gem: HolderGem): boolean;
    clone(): HolderGemHandler;
}
export {};
