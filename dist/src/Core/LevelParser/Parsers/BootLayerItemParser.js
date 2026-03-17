"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootLayerItemParser = void 0;
const LevelParserTypes_1 = require("../LevelParserTypes");
class BootLayerItemParser {
    parse(rawItem) {
        if (!rawItem)
            return null;
        if (rawItem.back === LevelParserTypes_1.RawBackName.Boot && (rawItem.spawns?.length || rawItem.predefined?.length)) {
            return {
                id: '0',
                predefined: (rawItem.predefined ?? []).map((it) => {
                    return typeof it === 'string' ? { gem: it } : it;
                }),
                spawns: [...(rawItem.spawns ?? [])],
                spawnMarker: rawItem.spawnMarker ?? false,
                spawnMarkerItems: [...(rawItem.spawnMarkerItems ?? [])],
            };
        }
        return null;
    }
}
exports.BootLayerItemParser = BootLayerItemParser;
//# sourceMappingURL=BootLayerItemParser.js.map