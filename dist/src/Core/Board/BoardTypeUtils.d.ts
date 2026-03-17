import { Gem, IDoorItemProps, ILevelGridItemData, LayerItemWithKey, LevelGridItemKey } from './BoardTypes';
export declare function isBackLayerItem(item: LayerItemWithKey): item is LayerItemWithKey<LevelGridItemKey.Back>;
export declare function isCarpetLayerItem(item: LayerItemWithKey): item is LayerItemWithKey<LevelGridItemKey.Carpet>;
export declare function isGemLayerItem(item: LayerItemWithKey): item is LayerItemWithKey<LevelGridItemKey.Gem>;
export declare function isDoorLayerItem(item: LayerItemWithKey): item is LayerItemWithKey<LevelGridItemKey.Door>;
export declare function isDoorItem(item: NonNullable<ILevelGridItemData[LevelGridItemKey]>): item is IDoorItemProps;
export declare function isCoverLayerItem(item: LayerItemWithKey): item is LayerItemWithKey<LevelGridItemKey.Cover>;
export declare function gemToLayerItem(gem: Gem): LayerItemWithKey<LevelGridItemKey.Gem>;
