import { ILevelGoal } from '../../Board/BoardTypes';
import { IGoalsParser, IRawGoal } from '../LevelParserTypes';
export declare class GoalsParser implements IGoalsParser {
    parse(rawGoals: IRawGoal[]): ILevelGoal[];
    export(goals: ILevelGoal[]): IRawGoal[];
}
