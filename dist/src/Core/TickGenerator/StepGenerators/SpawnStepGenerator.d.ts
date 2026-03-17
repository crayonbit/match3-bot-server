import { SpawnStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class SpawnStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    private stepSpawnedCells;
    constructor(props: SpawnStepGeneratorProps);
    tick(): TickIterator;
    private setGravityMovingCell;
    isSettled(): boolean;
}
