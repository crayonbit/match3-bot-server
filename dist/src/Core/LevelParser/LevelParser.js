"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelParser = void 0;
const BoardTypes_1 = require("../Board/BoardTypes");
class LevelParser {
    constructor(props) {
        const { board } = props;
        this.testBoard = board.clone();
        this.bootLayerItemParser = props.bootLayerItemParser;
        this.backLayerItemParser = props.backLayerItemParser;
        this.carpetLayerItemParser = props.carpetLayerItemParser;
        this.gemsLayerItemParser = props.gemsLayerItemParser;
        this.coverLayerItemParser = props.coverLayerItemParser;
        this.doorsLayerItemParser = props.doorsLayerItemParser;
        this.goalsParser = props.goalsParser;
        this.backLayerItemParser.init({
            createItem: this.testBoard
                .getLayer(BoardTypes_1.LevelGridItemKey.Back)
                .createItem.bind(this.testBoard.getLayer(BoardTypes_1.LevelGridItemKey.Back)),
            logger: this.testBoard.logger,
        });
        this.carpetLayerItemParser.init({
            createItem: this.testBoard
                .getLayer(BoardTypes_1.LevelGridItemKey.Carpet)
                .createItem.bind(this.testBoard.getLayer(BoardTypes_1.LevelGridItemKey.Carpet)),
            logger: this.testBoard.logger,
        });
        this.gemsLayerItemParser.init({
            createGem: this.testBoard
                .getLayer(BoardTypes_1.LevelGridItemKey.Gem)
                .createGem.bind(this.testBoard.getLayer(BoardTypes_1.LevelGridItemKey.Gem)),
            randomGenerator: this.testBoard.randomGenerator,
            logger: this.testBoard.logger,
        });
        this.coverLayerItemParser.init({
            createItem: this.testBoard
                .getLayer(BoardTypes_1.LevelGridItemKey.Cover)
                .createItem.bind(this.testBoard.getLayer(BoardTypes_1.LevelGridItemKey.Cover)),
            logger: this.testBoard.logger,
        });
        this.doorsLayerItemParser.init({
            createItem: this.testBoard
                .getLayer(BoardTypes_1.LevelGridItemKey.Door)
                .createItem.bind(this.testBoard.getLayer(BoardTypes_1.LevelGridItemKey.Door)),
            logger: this.testBoard.logger,
        });
    }
    parse(rawLevel) {
        this.gemsLayerItemParser.setCombos(rawLevel.combos);
        const grid = rawLevel.grid.map((colItems, col) => colItems.map((rawItem, row) => {
            const cell = { col, row };
            const item = {
                boot: this.bootLayerItemParser.parse(rawItem),
                back: this.backLayerItemParser.parse(rawItem.back),
                carpet: this.carpetLayerItemParser.parse(rawItem.carpet),
                gem: this.gemsLayerItemParser.parse(rawItem.gem, cell, rawLevel),
                cover: this.coverLayerItemParser.parse(rawItem.cover),
                door: this.doorsLayerItemParser.parse(rawItem.door),
                blast: null,
            };
            return item;
        }));
        const level = {
            grid,
            commonSpawns: rawLevel.spawns,
            moves: rawLevel.moves,
            goals: this.goalsParser.parse(rawLevel.goals),
        };
        this.testBoard.loadLevel(level);
        this.gemsLayerItemParser.replaceComboGemsTillNoMatch({
            board: this.testBoard,
            onReplaceGem: (cell, gem) => {
                grid[cell.col][cell.row].gem = gem;
            },
        });
        return level;
    }
}
exports.LevelParser = LevelParser;
//# sourceMappingURL=LevelParser.js.map