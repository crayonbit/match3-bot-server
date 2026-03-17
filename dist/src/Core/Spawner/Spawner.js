"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spawner = void 0;
const RawGemNamePropsMap_1 = require("../LevelParser/Parsers/RawGemNamePropsMap");
const BoardTypes_1 = require("../Board/BoardTypes");
const ArrayUtils_1 = require("../Utils/ArrayUtils");
class Spawner {
    constructor() {
        this.commonSpawns = [];
        this.initialGemColors = [];
    }
    init(props) {
        this.board = props.board;
    }
    loadLevel(level) {
        this.commonSpawns = [...level.commonSpawns];
        this.initialGemColors = this.getInitialGemColors(this.board);
    }
    getInitialGemColors(board) {
        const colors = new Set();
        for (const gem of board.gemsLayer.getAll()) {
            if (gem.core.className === BoardTypes_1.GemCoreName.Regular) {
                colors.add(gem.core.color);
            }
        }
        return Array.from(colors);
    }
    spawn(cell) {
        return (this.trySpawnFromPredefined(cell) ||
            this.trySpawnFromBoot(cell) ||
            this.trySpawnFromCommonSpawns(cell) ||
            this.trySpawnFromInitialGemColors(cell) ||
            this.trySpawnFromFallbackGemColors(cell));
    }
    trySpawnFromPredefined(cell) {
        const bootItem = this.getBootItem(cell);
        if (!bootItem)
            return null;
        const predefinedItem = bootItem.predefined.shift();
        if (!predefinedItem)
            return null;
        const partialCore = predefinedItem.gem ? RawGemNamePropsMap_1.rawGemNamePropsMap[predefinedItem.gem] : null;
        if (!partialCore)
            return null;
        return this.board.gemsLayer.createGemOnGrid(cell, partialCore);
    }
    getBootItem(cell) {
        const layerData = this.board.grid.get(cell);
        if (!layerData)
            return null;
        return layerData[BoardTypes_1.LevelGridItemKey.Boot] ?? null;
    }
    trySpawnFromBoot(cell) {
        const bootItem = this.getBootItem(cell);
        if (!bootItem || !bootItem.spawns.length)
            return null;
        return this.trySpawn(cell, this.findActiveSpawn(bootItem.spawns));
    }
    trySpawnFromCommonSpawns(cell) {
        return this.trySpawn(cell, this.findActiveSpawn(this.commonSpawns));
    }
    trySpawnFromInitialGemColors(cell) {
        // if there are less than 3 initial gem colors it will produce a lot of auto-matches.
        if (this.initialGemColors.length < 3)
            return null;
        const color = this.board.randomGenerator.pick(this.initialGemColors);
        if (!color)
            return null;
        this.board.logger.warn('Spawns have not been set in the editor! Spawning a random gem from the initial gem colors.');
        return this.board.gemsLayer.createGemOnGrid(cell, {
            className: BoardTypes_1.GemCoreName.Regular,
            color,
        });
    }
    trySpawnFromFallbackGemColors(cell) {
        const color = this.board.randomGenerator.pick(Object.values(BoardTypes_1.GemColor));
        this.board.logger.warn('Spawns have not been set in the editor! Spawning a random gem from some gem colors.');
        return this.board.gemsLayer.createGemOnGrid(cell, {
            className: BoardTypes_1.GemCoreName.Regular,
            color,
        });
    }
    findActiveSpawn(spawns) {
        for (let i = spawns.length - 1; i >= 0; i--) {
            if (this.isSpawnConditionValid(spawns[i])) {
                return spawns[i];
            }
        }
        return null;
    }
    isSpawnConditionValid(spawn) {
        if (spawn.condition === 'default')
            return true;
        return this.board.progressManager.evalProgressCondition(spawn.condition);
    }
    trySpawn(cell, spawn) {
        if (!spawn)
            return null;
        const variant = this.tryPickSpawnVariant(spawn);
        if (!variant)
            return null;
        const partialCore = RawGemNamePropsMap_1.rawGemNamePropsMap[variant];
        if (!partialCore) {
            this.board.logger.error(`Failed to find partial core for gem variant: ${variant}.`);
            return null;
        }
        return this.board.gemsLayer.createGemOnGrid(cell, partialCore);
    }
    tryPickSpawnVariant(spawn) {
        const entries = Object.entries(spawn.counts);
        return this.pickRandomVariant(entries);
    }
    pickRandomVariant(entries) {
        const variants = (0, ArrayUtils_1.spreadKeysWithWeights)(entries);
        return this.board.randomGenerator.pick(variants) ?? null;
    }
    cloneCommonSpawns() {
        return structuredClone(this.commonSpawns);
    }
    clone() {
        const spawner = new Spawner();
        spawner.commonSpawns = structuredClone(this.commonSpawns);
        spawner.initialGemColors = structuredClone(this.initialGemColors);
        return spawner;
    }
}
exports.Spawner = Spawner;
//# sourceMappingURL=Spawner.js.map