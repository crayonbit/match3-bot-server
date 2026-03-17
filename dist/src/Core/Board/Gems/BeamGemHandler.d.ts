import { Size } from '../../Utils/Geom/GeomTypes';
import { BeamGemProps, BoosterType, Gem, GemCoreName } from '../BoardTypes';
import { HitLayerParams, HitResultWithLockTicks, KickLayerParams, KickResultWithLockTicks } from '../Layers/LayersTypes';
import { GemHandler } from './GemHandler';
type BeamGem = Gem<GemCoreName.Beam>;
export declare class BeamGemHandler extends GemHandler<GemCoreName.Beam> {
    create(props: Pick<BeamGemProps, 'hp' | 'direction'>): BeamGemProps;
    kick(gem: BeamGem, params: KickLayerParams): KickResultWithLockTicks;
    hit(gem: BeamGem, params: HitLayerParams): HitResultWithLockTicks;
    private getLockReasonsWithTicks;
    private getDamageAffectedCell;
    blocksBooster(gem: BeamGem, boosterType: BoosterType): boolean;
    blocksMatch(gem: BeamGem): boolean;
    blocksMove(gem: BeamGem): boolean;
    blocksSwap(gem: BeamGem): boolean;
    isClickable(gem: BeamGem): boolean;
    isCombo(gem: BeamGem): boolean;
    getSize(gem: Gem<GemCoreName.Beam>): Size;
    private getDirectionVector;
    clone(): BeamGemHandler;
}
export {};
