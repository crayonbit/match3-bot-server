import { Signal } from 'signals';
import { SignalsHandlerBase } from '../SignalsHandlerBase';
type TickGeneratorsManagerSignalsMap = {
    onTickStarted: Signal<{
        tick: number;
        idleTick: number;
    }>;
    onIdleStateChanged: Signal<boolean>;
};
export declare class TickGeneratorsManagerSignals extends SignalsHandlerBase<TickGeneratorsManagerSignalsMap> {
    constructor();
}
export {};
