import { IBoard, ILevelGridItemData, LayerItemKey } from '../../Board/BoardTypes';
import { RawGoalName } from '../../LevelParser/LevelParserTypes';
import { IProgressHandler } from '../ProgressManagerTypes';
export declare abstract class ProgressHandler<K extends LayerItemKey> implements IProgressHandler<K> {
    protected board: IBoard;
    init(props: {
        board: IBoard;
    }): void;
    abstract getGoalName(item: NonNullable<ILevelGridItemData[K]>): RawGoalName | null;
    abstract canCollectGoal(item: NonNullable<ILevelGridItemData[K]>): boolean;
    abstract getCountOnBoard(goalName: RawGoalName): number | null;
    abstract clone(): ProgressHandler<K>;
}
