import { BlastMatchStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class BlastMatchStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    private readonly signals;
    /**
     * Map of match hashes and count of ticks since the match was found
     */
    private awaitingMatchesTicksMap;
    private foundMatchesCellLocks;
    private addedMatchesIds;
    constructor(props: BlastMatchStepGeneratorProps);
    tick(): TickIterator;
    private addMatches;
    private clearAddedMatches;
    private getValidMatchGems;
    private addFoundMatchesCellLocks;
    private clearFoundMatchesCellLocks;
    isSettled(): boolean;
}
