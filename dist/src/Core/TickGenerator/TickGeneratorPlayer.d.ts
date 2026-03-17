import { BoosterType, PreBoosterType } from '../Board/BoardTypes';
import { Cell } from '../Types';
import { StepsModel } from './StepsModel';
import { TickGeneratorSignals } from './TickGeneratorSignals';
import { ITickGenerator, ITickGeneratorPlayer, TickResult } from './TickGeneratorTypes';
import { TickStepsSignals } from './TickStepsSignals';
export type TickGeneratorPlayerProps = {
    tickGenerator: ITickGenerator;
    stepsModel: StepsModel;
    stepsSignals: TickStepsSignals;
};
export declare class TickGeneratorPlayer implements ITickGeneratorPlayer {
    private tickGenerator;
    private stepsModel;
    private stepsSignals;
    constructor(props: TickGeneratorPlayerProps);
    play(cellA: Cell, cellB?: Cell): void;
    playBooster(cell: Cell, boosterType: BoosterType): void;
    playPreBoosters(preBoosters: PreBoosterType[]): void;
    private addSwapCellsToModel;
    private addClickCellToModel;
    tick(): TickResult;
    tickStep(): TickResult;
    destroy(): void;
    get signals(): TickGeneratorSignals;
    get tickStepsSignals(): TickStepsSignals;
    get id(): number;
}
