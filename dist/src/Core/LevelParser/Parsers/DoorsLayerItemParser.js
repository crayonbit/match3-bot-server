"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorsLayerItemParser = void 0;
const BoardTypes_1 = require("../../Board/BoardTypes");
const LevelParserTypes_1 = require("../LevelParserTypes");
class DoorsLayerItemParser {
    constructor() {
        this.rawTypeMap = {
            [LevelParserTypes_1.RawGemName.A]: BoardTypes_1.GemColor.a,
            [LevelParserTypes_1.RawGemName.B]: BoardTypes_1.GemColor.b,
            [LevelParserTypes_1.RawGemName.C]: BoardTypes_1.GemColor.c,
            [LevelParserTypes_1.RawGemName.D]: BoardTypes_1.GemColor.d,
            [LevelParserTypes_1.RawGemName.E]: BoardTypes_1.GemColor.e,
            [LevelParserTypes_1.RawGemName.F]: BoardTypes_1.GemColor.f,
            [LevelParserTypes_1.RawGemName.Acorn]: BoardTypes_1.GemCoreName.Acorn,
        };
        this.idCounter = 0;
    }
    init(props) {
        this.createItem = props.createItem;
    }
    parse(rawItem) {
        if (!rawItem)
            return null;
        return this.createItem({
            ...rawItem,
            type: this.rawTypeMap[rawItem.type],
        }, this.generateCustomId());
    }
    generateCustomId() {
        return `door_${this.idCounter++}`;
    }
}
exports.DoorsLayerItemParser = DoorsLayerItemParser;
//# sourceMappingURL=DoorsLayerItemParser.js.map