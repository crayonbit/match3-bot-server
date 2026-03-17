import { BoosterPlayData, PreBoostersPlayData } from '../Board/BoardTypes';
import { Match } from '../Matcher/MatcherTypes';
import { Cell } from '../Types';
import { IStepsModel, QuestItemWithTargets, TickGeneratorStarter } from './TickGeneratorTypes';
export declare class StepsModel implements IStepsModel {
    private readonly generatorId;
    private readonly swapCells;
    private clickCell;
    private boosterPlayData;
    private preBoostersPlayData;
    private readonly matchCheckCells;
    private readonly blastMatchCheckCells;
    private readonly gravityCheckCells;
    private readonly spawnerCheckCells;
    private readonly matches;
    private readonly gravityBlockedIds;
    private tickGeneratorStarter;
    /**
     * We don't want to have cell damage repeated (e.g. kick, hit) by the same match
     */
    private readonly cellsDamageMatchIds;
    private questItemsWithTargets;
    constructor(generatorId: number);
    addSwapCells(cells: Cell | Cell[]): void;
    getSwapCells(): Cell[];
    getSwapCellsCount(): number;
    clearSwapCells(): void;
    addClickCell(cell: Cell): void;
    addBoosterPlayData(data: BoosterPlayData): void;
    withdrawBoosterPlayData(): BoosterPlayData | null;
    addPreBoostersPlayData(data: PreBoostersPlayData): void;
    withdrawPreBoostersPlayData(): PreBoostersPlayData | null;
    getClickCell(): Cell | null;
    clearClickCell(): void;
    addRegularMatchCheckCells(cells: Cell | Cell[]): void;
    removeRegularMatchCheckCells(cells: Cell | Cell[]): void;
    getRegularMatchCheckCells(): Cell[];
    getRegularMatchCheckCellsCount(): number;
    clearRegularMatchCheckCells(): void;
    addBlastMatchCheckCells(cells: Cell | Cell[]): void;
    getBlastMatchCheckCells(): Cell[];
    getBlastMatchCheckCellsCount(): number;
    removeBlastMatchCheckCells(cells: Cell | Cell[]): void;
    clearBlastMatchCheckCells(): void;
    addGravityCheckCells(cells: Cell | Cell[]): void;
    getGravityCheckCells(): Cell[];
    hasGravityCheckCell(cell: Cell): boolean;
    getGravityCheckCellsCount(): number;
    removeGravityCheckCells(cells: Cell | Cell[]): void;
    clearGravityCheckCells(): void;
    addSpawnerCheckCells(cells: Cell | Cell[]): void;
    getSpawnerCheckCells(): Cell[];
    hasSpawnerCheckCell(cell: Cell): boolean;
    clearSpawnerCheckCells(): void;
    removeSpawnerCheckCells(cells: Cell | Cell[]): void;
    addMatches(matches: Match[]): void;
    getMatches(): Match[];
    getMatchesCount(): number;
    clearMatches(): void;
    removeMatches(matchesIds: string[]): void;
    addGravityBlockedMatchesIds(ids: string[]): void;
    getGravityBlockedMatchesIds(): string[];
    clearGravityBlockedMatchesIds(): void;
    /**
     * Set match id for the cell to prevent damage (e.g. kick, hit) from the same match
     */
    setCellDamageMatchId(cell: Cell, matchId: string): void;
    hasCellDamageMatchId(cell: Cell, matchId: string): boolean;
    addQuestItemWithTargets(questItem: QuestItemWithTargets): void;
    withdrawQuestItemsWithTargets(): QuestItemWithTargets[];
    setTickGeneratorStarter(starter: TickGeneratorStarter): void;
    getTickGeneratorStarter(): TickGeneratorStarter | null;
    clone(): IStepsModel;
}
