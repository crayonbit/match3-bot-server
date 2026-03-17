import { Signal } from 'signals';
import { TickStepName } from './TickGeneratorTypes';
import { SignalsHandlerBase } from '../SignalsHandlerBase';
type TickGeneratorSignalsMap = {
    /** parameter is generator id */
    onGeneratorStart: Signal<number>;
    onTickStart: Signal<{
        generatorId: number;
        tick: number;
    }>;
    onStepEnter: Signal<{
        generatorId: number;
        stepName: TickStepName;
    }>;
    onStepExit: Signal<{
        generatorId: number;
        stepName: TickStepName;
        settled: boolean;
    }>;
    onTickEnd: Signal<{
        generatorId: number;
        tick: number;
    }>;
    onGeneratorComplete: Signal<number>;
};
export declare class TickGeneratorSignals extends SignalsHandlerBase<TickGeneratorSignalsMap> {
    constructor();
}
export {};
