import { GravityStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class GravityStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    private readonly config;
    private readonly getGravityCellsSwapsCollector;
    private readonly gravitySettleLocksRemovalQueue;
    constructor(props: GravityStepGeneratorProps);
    tick(): TickIterator;
    private setGravityMovingCell;
    private resetGravityMovingCellsByThisGenerator;
    private removeGravitySettleLocks;
    private getGravityMovingCellsByThisGenerator;
    private createCellLock;
    private getPotentialGravityCellsAboveEmpty;
    isSettled(): boolean;
}
