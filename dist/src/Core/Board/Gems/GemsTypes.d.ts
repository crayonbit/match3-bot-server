import type { Size } from '../../Utils/Geom/GeomTypes';
import type { BoosterType, CoreNameToCore, Gem, GemCoreName, IBoard } from '../BoardTypes';
import { HitLayerParams, HitResultWithLockTicks, KickLayerParams, KickResultWithLockTicks } from '../Layers/LayersTypes';
export interface IGemHandler<T extends GemCoreName = GemCoreName> {
    readonly board: IBoard;
    init(board: IBoard): void;
    create(props: Partial<CoreNameToCore[T]>): CoreNameToCore[T];
    kick(gem: Gem<T>, params: KickLayerParams): KickResultWithLockTicks;
    hit(gem: Gem<T>, params: HitLayerParams): HitResultWithLockTicks;
    blocksBooster(gem: Gem<T>, boosterType: BoosterType): boolean;
    blocksMatch(gem: Gem<T>): boolean;
    blocksMove(gem: Gem<T>): boolean;
    blocksSwap(gem: Gem<T>): boolean;
    isClickable(gem: Gem<T>): boolean;
    isCovered(gem: Gem<T>): boolean;
    decrementHp(gem: Gem<T>): boolean;
    isKilled(gem: Gem<T>): boolean;
    /** Can be combined with another gem into more powerful version */
    isCombo(gem: Gem<T>): boolean;
    getSize(gem: Gem<T>): Size;
    clone(): IGemHandler<T>;
}
