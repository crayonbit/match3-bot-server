"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBackLayerItem = isBackLayerItem;
exports.isCarpetLayerItem = isCarpetLayerItem;
exports.isGemLayerItem = isGemLayerItem;
exports.isDoorLayerItem = isDoorLayerItem;
exports.isDoorItem = isDoorItem;
exports.isCoverLayerItem = isCoverLayerItem;
exports.gemToLayerItem = gemToLayerItem;
const BoardTypes_1 = require("./BoardTypes");
function isBackLayerItem(item) {
    return item.layerKey === BoardTypes_1.LevelGridItemKey.Back;
}
function isCarpetLayerItem(item) {
    return item.layerKey === BoardTypes_1.LevelGridItemKey.Carpet;
}
function isGemLayerItem(item) {
    return item.layerKey === BoardTypes_1.LevelGridItemKey.Gem;
}
function isDoorLayerItem(item) {
    return item.layerKey === BoardTypes_1.LevelGridItemKey.Door;
}
function isDoorItem(item) {
    return item && 'hp' in item && 'width' in item && 'height' in item && 'type' in item;
}
function isCoverLayerItem(item) {
    return item.layerKey === BoardTypes_1.LevelGridItemKey.Cover;
}
function gemToLayerItem(gem) {
    return { layerKey: BoardTypes_1.LevelGridItemKey.Gem, item: gem };
}
//# sourceMappingURL=BoardTypeUtils.js.map