import type { Size } from '../../Utils/Geom/GeomTypes';
import { type Gem, type IBoard, type BoosterType, type GemCoreName, type CoreNameToCore } from '../BoardTypes';
import type { HitLayerParams, HitResultWithLockTicks, KickLayerParams, KickResultKind, KickResultWithLockTicks } from '../Layers/LayersTypes';
import type { IGemHandler } from './GemsTypes';
export declare abstract class GemHandler<T extends GemCoreName> implements IGemHandler<T> {
    board: IBoard;
    init(board: IBoard): void;
    abstract create(props: Partial<CoreNameToCore[T]>): CoreNameToCore[T];
    abstract blocksBooster(gem: Gem<T>, boosterType: BoosterType): boolean;
    abstract blocksMatch(gem: Gem<T>): boolean;
    abstract blocksMove(gem: Gem<T>): boolean;
    abstract blocksSwap(gem: Gem<T>): boolean;
    abstract isClickable(gem: Gem<T>): boolean;
    abstract kick(gem: Gem<T>, params: KickLayerParams): KickResultWithLockTicks;
    abstract hit(gem: Gem<T>, params: HitLayerParams): HitResultWithLockTicks;
    abstract isCombo(gem: Gem<T>): boolean;
    isKilled(gem: Gem<T>): boolean;
    isCovered(gem: Gem<T>): boolean;
    protected assembleCommonKickResult(props: {
        gem: Gem<T>;
        hpDecremented: boolean;
        kickResultOnDecrementedHp: KickResultKind;
    }): KickResultWithLockTicks;
    protected assembleCommonHitResult(props: {
        gem: Gem<T>;
        hpDecremented: boolean;
    }): HitResultWithLockTicks;
    getSize(gem: Gem<T>): Size;
    decrementHp(gem: Gem<T>, extraProps?: Partial<CoreNameToCore[T]>): boolean;
    abstract clone(): IGemHandler<T>;
}
