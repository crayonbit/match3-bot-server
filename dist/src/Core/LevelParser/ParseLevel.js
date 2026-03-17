"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLevel = parseLevel;
const BackLayerItemParser_1 = require("./Parsers/BackLayerItemParser");
const CarpetLayerItemParser_1 = require("./Parsers/CarpetLayerItemParser");
const GemsLayerItemParser_1 = require("./Parsers/GemsLayerItemParser");
const CoverLayerItemParser_1 = require("./Parsers/CoverLayerItemParser");
const DoorsLayerItemParser_1 = require("./Parsers/DoorsLayerItemParser");
const BootLayerItemParser_1 = require("./Parsers/BootLayerItemParser");
const GoalsParser_1 = require("./Parsers/GoalsParser");
const LevelParser_1 = require("./LevelParser");
function parseLevel(board, rawLevel) {
    const levelParser = new LevelParser_1.LevelParser({
        board,
        backLayerItemParser: new BackLayerItemParser_1.BackLayerItemParser(),
        carpetLayerItemParser: new CarpetLayerItemParser_1.CarpetLayerItemParser(),
        gemsLayerItemParser: new GemsLayerItemParser_1.GemsLayerItemParser(),
        coverLayerItemParser: new CoverLayerItemParser_1.CoverLayerItemParser(),
        doorsLayerItemParser: new DoorsLayerItemParser_1.DoorsLayerItemParser(),
        bootLayerItemParser: new BootLayerItemParser_1.BootLayerItemParser(),
        goalsParser: new GoalsParser_1.GoalsParser(),
    });
    return levelParser.parse(rawLevel);
}
//# sourceMappingURL=ParseLevel.js.map