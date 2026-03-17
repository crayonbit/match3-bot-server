import { RegularMatchStepGeneratorProps, TickIterator, TickStepName } from '../TickGeneratorTypes';
import { StepGenerator } from './StepGenerator';
export declare class RegularMatchStepGenerator extends StepGenerator {
    readonly name: TickStepName;
    private readonly stepsModel;
    private readonly board;
    private readonly signals;
    private readonly config;
    /**
     * Map of match hashes and count of ticks since the match was found
     */
    private awaitingMatchesTicksMap;
    private foundMatchesCellLocks;
    private addedMatchesIds;
    constructor(props: RegularMatchStepGeneratorProps);
    tick(): TickIterator;
    private getMatchesCellsHashes;
    private addMatches;
    private resetCheckCells;
    private removeMatchCheckCell;
    private clearAddedMatches;
    private getMatchGems;
    private findValidMatches;
    private filterUniqueMatches;
    private incrementBlockedMatchTicks;
    private getBlockedMatchTicks;
    private isAdjacentCellsGravityMoving;
    private addFoundMatchesCellLocks;
    private clearFoundMatchesCellLocks;
    isSettled(): boolean;
}
