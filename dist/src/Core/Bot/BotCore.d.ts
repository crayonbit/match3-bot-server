import { BotDecisionSeed, BotLevelSeed } from '../Board/BoardTypes';
import { IRawLevel } from '../LevelParser/LevelParserTypes';
import { CoreConfig, ReplayAction, Logger } from '../Types';
import { LevelResult, BotDecision } from './BotTypes';
type BotCoreInitProps = {
    rawLevel: IRawLevel;
    decisionWeights: Record<BotDecision, number>;
    bombStrategyPercent: number;
    usePreBoosters: boolean;
    cascadingTasksLimit: number;
    defaultCoreConfig: CoreConfig;
    logger?: Logger;
};
type ReplayActionsMap = Record<BotLevelSeed, Record<BotDecisionSeed, ReplayAction[]>>;
export declare class BotCore {
    private replayActions;
    private decisionWeights;
    private bombStrategyPercent;
    private usePreBoosters;
    private cascadingTasksLimit;
    private defaultCoreConfig;
    private rawLevel;
    private logger;
    private levelSeedToLevel;
    init(props: BotCoreInitProps): void;
    private getNoopLogger;
    /**
     * @param {boolean} [testGridData] - After each test move on the board will be taken grid snapshot which will be compared with the grid data after the real move.
     */
    playLevel(props: {
        levelSeed: number;
        decisionSeed: number;
        testGridData?: boolean;
    }): LevelResult;
    private parseLevelOrGetFromCache;
    private getBoardDataForTestBeforeDecisionPick;
    private testBoardDataAfterDecisionPick;
    private validateGridData;
    private playPossibleMovesAndPickByDecision;
    private loopInDirections;
    /**
     * Strategy move is a sequence of moves that creates a bomb then triggers it
     */
    private performStrategicMove;
    private pickDecisionMove;
    private extractBombCreationMatches;
    private playPreBoosters;
    private onMoveStarted;
    getReplayActions(): ReplayActionsMap;
}
export {};
