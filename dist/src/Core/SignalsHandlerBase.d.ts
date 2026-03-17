import { Signal } from 'signals';
import { ISignalsHandler } from './Types';
export declare abstract class SignalsHandlerBase<T extends Record<string, Signal>> implements ISignalsHandler<T> {
    private readonly signals;
    constructor(signals: T);
    get<K extends keyof T>(key: K): T[K];
    /**
     * Piping signals to another signals handler
     */
    pipe(signalsHandler: SignalsHandlerBase<T>): void;
    unPipe(signalsHandler: SignalsHandlerBase<T>): void;
    clear(): void;
}
