"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarpetLayerItemParser = exports.rawCarpetNamePropsMap = void 0;
const LevelParserTypes_1 = require("../LevelParserTypes");
exports.rawCarpetNamePropsMap = {
    [LevelParserTypes_1.RawCarpetName.Carpet_1]: {
        hp: 1,
    },
    [LevelParserTypes_1.RawCarpetName.Carpet_2]: {
        hp: 2,
    },
};
class CarpetLayerItemParser {
    constructor() {
        this.idCounter = 0;
    }
    init(props) {
        this.createItem = props.createItem;
    }
    parse(rawItem) {
        if (!rawItem)
            return null;
        return this.createItem(exports.rawCarpetNamePropsMap[rawItem], this.generateCustomId());
    }
    generateCustomId() {
        return `carpet_${this.idCounter++}`;
    }
}
exports.CarpetLayerItemParser = CarpetLayerItemParser;
//# sourceMappingURL=CarpetLayerItemParser.js.map