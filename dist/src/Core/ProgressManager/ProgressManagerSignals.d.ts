import { Signal } from 'signals';
import { SignalsHandlerBase } from '../SignalsHandlerBase';
import { OnGoalChangedProps, OnMovesChangedProps } from './ProgressManagerTypes';
type ProgressManagerSignalsMap = {
    onMovesChanged: Signal<OnMovesChangedProps>;
    onGoalChanged: Signal<OnGoalChangedProps>;
    onPendingOutcome: Signal<void>;
    onProgressSucceeded: Signal<void>;
    onProgressFailed: Signal<void>;
    increaseMovesBy: Signal<number>;
};
export declare class ProgressManagerSignals extends SignalsHandlerBase<ProgressManagerSignalsMap> {
    constructor();
}
export {};
