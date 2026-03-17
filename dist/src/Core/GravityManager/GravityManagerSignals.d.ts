import { Signal } from 'signals';
import { SignalsHandlerBase } from '../SignalsHandlerBase';
import { PointLike } from '../Utils/Geom/GeomTypes';
import { OnBounceGemProps } from './GravityManagerTypes';
type GravityManagerSignalsMap = {
    onGravityStart: Signal<void>;
    onGravityMove: Signal<{
        gemId: string;
        cellPosition: PointLike;
    }>;
    onGravityFinish: Signal<void>;
    onBounceGem: Signal<OnBounceGemProps>;
};
export declare class GravityManagerSignals extends SignalsHandlerBase<GravityManagerSignalsMap> {
    constructor();
}
export {};
