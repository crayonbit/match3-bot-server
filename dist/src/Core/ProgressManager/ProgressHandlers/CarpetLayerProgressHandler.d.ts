import { ILevelGridItemData, LevelGridItemKey } from '../../Board/BoardTypes';
import { RawGoalName } from '../../LevelParser/LevelParserTypes';
import { ProgressHandler } from './ProgressHandler';
type CarpetLayerItem = NonNullable<ILevelGridItemData[LevelGridItemKey.Carpet]>;
export declare class CarpetLayerProgressHandler extends ProgressHandler<LevelGridItemKey.Carpet> {
    getGoalName(item: CarpetLayerItem): RawGoalName | null;
    canCollectGoal(item: CarpetLayerItem): boolean;
    getCountOnBoard(goalName: RawGoalName): number | null;
    clone(): CarpetLayerProgressHandler;
}
export {};
