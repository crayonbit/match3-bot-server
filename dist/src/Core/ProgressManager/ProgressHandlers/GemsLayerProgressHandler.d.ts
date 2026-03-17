import { ILevelGridItemData, LevelGridItemKey } from '../../Board/BoardTypes';
import { RawGoalName } from '../../LevelParser/LevelParserTypes';
import { ProgressHandler } from './ProgressHandler';
type GemLayerItem = NonNullable<ILevelGridItemData[LevelGridItemKey.Gem]>;
export declare class GemsLayerProgressHandler extends ProgressHandler<LevelGridItemKey.Gem> {
    private readonly regularColorToGoalMap;
    private gemNameToGetGoal;
    getGoalName(item: GemLayerItem): RawGoalName | null;
    canCollectGoal(item: GemLayerItem): boolean;
    getCountOnBoard(goalName: RawGoalName): number | null;
    private getCoreNameByGoalName;
    clone(): GemsLayerProgressHandler;
}
export {};
