"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverLayerItemParser = void 0;
class CoverLayerItemParser {
    constructor() {
        this.idCounter = 0;
    }
    init(props) {
        this.createItem = props.createItem;
    }
    parse(rawItem) {
        if (!rawItem)
            return null;
        return this.createItem({ hp: 1 }, this.generateCustomId());
    }
    generateCustomId() {
        return `cover_${this.idCounter++}`;
    }
}
exports.CoverLayerItemParser = CoverLayerItemParser;
//# sourceMappingURL=CoverLayerItemParser.js.map