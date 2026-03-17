"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemsLayerItemParser = void 0;
exports.getRawGemNameByPartialCore = getRawGemNameByPartialCore;
const BoardTypes_1 = require("../../Board/BoardTypes");
const EqualByValues_1 = require("../../Utils/Object/EqualByValues");
const LevelParserTypes_1 = require("../LevelParserTypes");
const RawGemNamePropsMap_1 = require("./RawGemNamePropsMap");
class GemsLayerItemParser {
    constructor() {
        this.maxComboGemReplacementAttempts = 10;
        this.combos = {};
        this.comboCellsMap = {};
        this.idCounter = 0;
    }
    init(props) {
        this.createGem = props.createGem;
        this.randomGenerator = props.randomGenerator;
        this.logger = props.logger;
    }
    setCombos(combos) {
        combos.forEach((combo) => {
            this.combos[combo.name] = combo.variants;
        });
    }
    parse(rawItem, cell, rawLevel) {
        if (!rawItem)
            return null;
        if (this.isRawComboGem(rawItem)) {
            return this.createComboGem(cell, rawItem);
        }
        this.handleGemSpecificSpawnConditions(rawItem, rawLevel);
        return this.createGem(cell, this.getGemProps(rawItem), this.generateCustomId());
    }
    handleGemSpecificSpawnConditions(rawItem, rawLevel) {
        if (this.getRawGemName(rawItem) === LevelParserTypes_1.RawGemName.Acorn) {
            this.handleAcornSpecificSpawnConditions(rawLevel);
        }
    }
    /**
     * By design Acorn gems should spawn only if Acorn goals left > Acorn gems on the board,
     * and if designer missed to put this condition from the editor, we should add default condition here.
     */
    handleAcornSpecificSpawnConditions(rawLevel) {
        const isAcornGoal = rawLevel.goals.some((goal) => {
            return goal.name === LevelParserTypes_1.RawGemName.Acorn;
        });
        if (!isAcornGoal)
            return;
        const isAcornSpawnConditionAlreadySet = rawLevel.spawns.some((spawn) => {
            return spawn.condition.includes(`countOnBoard(${LevelParserTypes_1.RawGemName.Acorn})`);
        });
        if (isAcornSpawnConditionAlreadySet)
            return;
        const defaultSpawnConditionFallback = {
            condition: 'default',
            counts: {
                [LevelParserTypes_1.RawGemName.A]: 1,
                [LevelParserTypes_1.RawGemName.B]: 1,
                [LevelParserTypes_1.RawGemName.C]: 1,
                [LevelParserTypes_1.RawGemName.D]: 1,
            },
        };
        const defaultSpawnCondition = rawLevel.spawns.find((spawn) => spawn.condition === 'default') ?? defaultSpawnConditionFallback;
        const acornSpecificSpawnCondition = 'ac>countOnBoard(ac)';
        const acornSpecificSpawnConditionCounts = {
            ...defaultSpawnCondition.counts,
            [LevelParserTypes_1.RawGemName.Acorn]: 1,
        };
        rawLevel.spawns.push({
            condition: acornSpecificSpawnCondition,
            counts: acornSpecificSpawnConditionCounts,
        });
    }
    createComboGem(cell, comboName) {
        if (!this.combos[comboName] || !this.combos[comboName].length) {
            this.logger.error('Combo is not found', comboName);
            return this.createGem(cell, {
                className: BoardTypes_1.GemCoreName.Regular,
                color: BoardTypes_1.GemColor.a,
            }, this.generateCustomId());
        }
        this.comboCellsMap[comboName] = this.comboCellsMap[comboName] || [];
        this.comboCellsMap[comboName].push(cell);
        return this.createGem(cell, this.getComboGemProps(comboName), this.generateCustomId());
    }
    getComboGemProps(comboName) {
        const rawGemName = this.randomGenerator.pick(this.combos[comboName]);
        return RawGemNamePropsMap_1.rawGemNamePropsMap[rawGemName];
    }
    getGemProps(rawGem) {
        if (typeof rawGem === 'object') {
            return { ...RawGemNamePropsMap_1.rawGemNamePropsMap[rawGem.name], ...rawGem };
        }
        const rawGemName = rawGem;
        return RawGemNamePropsMap_1.rawGemNamePropsMap[rawGemName];
    }
    isRawComboGem(rawGem) {
        return typeof rawGem !== 'object' && !Object.values(LevelParserTypes_1.RawGemName).includes(rawGem);
    }
    getCombos() {
        return this.combos;
    }
    getComboCellsMap() {
        return this.comboCellsMap;
    }
    replaceComboGemsTillNoMatch(params) {
        const { board, onReplaceGem } = params;
        Object.entries(this.comboCellsMap).forEach(([rawComboGem, cells]) => {
            cells.forEach((cell) => {
                this.replaceComboGemTillNoMatch({
                    board,
                    onReplaceGem,
                    cell,
                    variants: [...this.getCombos()[rawComboGem]],
                });
            });
        });
    }
    replaceComboGemTillNoMatch(params, attempts = 0) {
        const { board, onReplaceGem, cell, variants } = params;
        const gem = board.getGem(cell);
        if (!gem)
            return;
        const matches = board.regularMatcher.findMatches([gem], []);
        if (!matches.length)
            return; // Replaced successfully
        if (attempts >= this.maxComboGemReplacementAttempts) {
            this.logger.error('Max combo gem replacement attempts reached', cell, gem, matches);
            return;
        }
        const currentRawGemName = getRawGemNameByPartialCore(gem.core, this.logger);
        let variantsFiltered = variants.filter((rawGemName) => {
            return rawGemName !== currentRawGemName;
        });
        if (!variantsFiltered.length) {
            this.logger.error('No variants to replace', cell, gem);
            return;
        }
        const pickedVariant = this.randomGenerator.pick(variantsFiltered);
        variantsFiltered = variantsFiltered.filter((rawGemName) => rawGemName !== pickedVariant);
        const createdGem = board.gemsLayer.createGemOnGrid(cell, RawGemNamePropsMap_1.rawGemNamePropsMap[pickedVariant], this.generateCustomId());
        onReplaceGem(cell, createdGem);
        this.replaceComboGemTillNoMatch({ ...params, variants: variantsFiltered }, attempts + 1);
    }
    getRawGemName(rawItem) {
        return typeof rawItem === 'object' ? rawItem.name : rawItem;
    }
    generateCustomId() {
        return `gem_${this.idCounter++}`;
    }
}
exports.GemsLayerItemParser = GemsLayerItemParser;
function getRawGemNameByPartialCore(partialCore, logger) {
    for (const [rawGemName, props] of Object.entries(RawGemNamePropsMap_1.rawGemNamePropsMap)) {
        if ((0, EqualByValues_1.equalByValues)(props, partialCore)) {
            return rawGemName;
        }
    }
    logger.error('RawGemName is not found', partialCore.className);
    return LevelParserTypes_1.RawGemName.A;
}
//# sourceMappingURL=GemsLayerItemParser.js.map