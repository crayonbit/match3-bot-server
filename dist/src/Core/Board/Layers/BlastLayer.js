"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlastLayer = void 0;
const BoardTypes_1 = require("../BoardTypes");
const BoardTypeUtils_1 = require("../BoardTypeUtils");
const Layer_1 = require("./Layer");
class BlastLayer extends Layer_1.Layer {
    constructor(gemsHandlers) {
        super(BoardTypes_1.LevelGridItemKey.Blast);
        this.handlersMap = gemsHandlers;
    }
    init(props) {
        super.init(props);
        Object.values(this.handlersMap).forEach((handler) => handler.init(props.board));
    }
    getCoreHandler(className) {
        return this.handlersMap[className];
    }
    /**
     * Creates and sets a gem on the specified grid cell by the partial core data.
     */
    createGemOnGrid(cell, partialCore) {
        const gem = this.createGem(cell, partialCore);
        this.set(gem, cell);
        return gem;
    }
    /**
     * Performs direct kick on the cell.
     * If the cell can receive any kick damage it might be killed or its HP will be decreased, or some other modification can happen
     * @param cell The cell to kick.
     * @returns {boolean} - if cell was kicked
     */
    kick(cell, params) {
        const gem = this.get(cell);
        if (!gem) {
            return { result: 'none' };
        }
        const kicked = this.getCoreHandler(gem.core.className).kick(gem, params);
        if (!kicked)
            return { result: 'none' };
        return {
            result: 'kickedBreak',
            layerItem: (0, BoardTypeUtils_1.gemToLayerItem)(gem),
            killed: false,
            sizeCells: [{ col: gem.col, row: gem.row }],
        };
    }
    createGem(cell, partialCore, customId) {
        const handler = this.getCoreHandler(partialCore.className);
        return {
            id: customId ?? this.board.getEntityId(),
            core: handler.create(partialCore),
            col: cell.col,
            row: cell.row,
        };
    }
    set(gem, cell) {
        cell = { ...cell };
        const prev = this.get(cell);
        if (!gem && !prev)
            return;
        if (gem) {
            gem.col = cell.col;
            gem.row = cell.row;
        }
        super.set(gem, cell);
    }
    remove(cell) {
        const gem = this.get(cell);
        if (!gem)
            return false;
        super.remove(cell);
        return true;
    }
    isKilled(item) {
        return this.getCoreHandler(item.core.className).isKilled(item);
    }
    clone() {
        const handlerMapClone = Object.entries(this.handlersMap).reduce((acc, [key, handler]) => {
            acc[key] = handler.clone();
            return acc;
        }, {});
        return new BlastLayer(handlerMapClone);
    }
}
exports.BlastLayer = BlastLayer;
//# sourceMappingURL=BlastLayer.js.map