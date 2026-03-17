import { BoosterType, Gem, GemCoreName, VaseGemProps } from '../BoardTypes';
import { HitResultWithLockTicks, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type VaseGem = Gem<GemCoreName.Vase>;
export declare class VaseGemHandler extends GemHandler<GemCoreName.Vase> {
    create(props: Pick<VaseGemProps, 'hp'>): VaseGemProps;
    kick(gem: VaseGem): KickResultWithLockTicks;
    hit(gem: VaseGem): HitResultWithLockTicks;
    blocksBooster(gem: VaseGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: VaseGem): boolean;
    blocksMove(gem: VaseGem): boolean;
    blocksSwap(gem: VaseGem): boolean;
    isClickable(gem: VaseGem): boolean;
    isCombo(gem: VaseGem): boolean;
    clone(): VaseGemHandler;
}
export {};
