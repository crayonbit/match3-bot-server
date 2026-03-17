"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackLayerItemParser = exports.rawBackNamePropsMap = void 0;
const LevelParserTypes_1 = require("../LevelParserTypes");
exports.rawBackNamePropsMap = {
    [LevelParserTypes_1.RawBackName.Regular]: {
        boot: false,
        dropGoal: false,
        tunnel: false,
    },
    [LevelParserTypes_1.RawBackName.Boot]: {
        boot: true,
        dropGoal: false,
        tunnel: false,
    },
    [LevelParserTypes_1.RawBackName.DropGoal]: {
        boot: false,
        dropGoal: true,
        tunnel: false,
    },
    [LevelParserTypes_1.RawBackName.Tunnel]: {
        boot: false,
        dropGoal: false,
        tunnel: true,
    },
};
class BackLayerItemParser {
    constructor() {
        this.idCounter = 0;
    }
    init(props) {
        this.createItem = props.createItem;
    }
    parse(rawItem) {
        if (!rawItem)
            return null;
        return this.createItem(exports.rawBackNamePropsMap[rawItem], this.generateCustomId());
    }
    generateCustomId() {
        return `back_${this.idCounter++}`;
    }
}
exports.BackLayerItemParser = BackLayerItemParser;
//# sourceMappingURL=BackLayerItemParser.js.map