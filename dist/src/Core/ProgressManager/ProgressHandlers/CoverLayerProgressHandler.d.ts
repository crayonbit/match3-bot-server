import { ILevelGridItemData, LevelGridItemKey } from '../../Board/BoardTypes';
import { RawGoalName } from '../../LevelParser/LevelParserTypes';
import { ProgressHandler } from './ProgressHandler';
type CoverLayerItem = NonNullable<ILevelGridItemData[LevelGridItemKey.Cover]>;
export declare class CoverLayerProgressHandler extends ProgressHandler<LevelGridItemKey.Cover> {
    getGoalName(item: CoverLayerItem): RawGoalName | null;
    canCollectGoal(item: CoverLayerItem): boolean;
    getCountOnBoard(goalName: RawGoalName): number | null;
    clone(): CoverLayerProgressHandler;
}
export {};
