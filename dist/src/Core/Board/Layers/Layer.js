"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const lodash_1 = require("lodash");
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
class Layer {
    constructor(layerName) {
        this.layerName = layerName;
    }
    init(props) {
        this.board = props.board;
        this.config = props.config;
    }
    onLevelLoad() { }
    postLevelLoad() { }
    blocksSwap(cell) {
        return false;
    }
    blocksClick(cell) {
        return false;
    }
    isClickable(cell) {
        return false;
    }
    blocksMatch(cell) {
        return false;
    }
    blocksMove(cell) {
        return false;
    }
    hasGameElement(cell) {
        return !!this.get(cell);
    }
    kick(cell, params) {
        return { result: 'none' };
    }
    hit(cell, params) {
        return { result: 'none' };
    }
    blocksBooster(cell, boosterType) {
        return false;
    }
    remove(cell) {
        const removedItem = this.removeAndReturnItem(cell);
        return !!removedItem;
    }
    removeAndDispatchKill(cell, taskId) {
        const removedItem = this.removeAndReturnItem(cell);
        if (removedItem) {
            const isActiveGoal = this.board.progressManager.isActiveGoal({ layerKey: this.layerName, item: removedItem });
            const questTargets = this.board.getQuestTargets({ layerKey: this.layerName, item: removedItem });
            this.board.signals.get('onKill').dispatch({
                layerItem: { layerKey: this.layerName, item: removedItem },
                isActiveGoal,
                questTargets,
                taskId,
            });
        }
        return !!removedItem;
    }
    removeAndReturnItem(cell) {
        const gridItem = this.board.grid.get(cell);
        const item = gridItem && gridItem[this.layerName];
        if (item) {
            delete gridItem[this.layerName];
        }
        return item ?? null;
    }
    modifyItem(item, change) {
        if (!item)
            return;
        let prevState = {};
        Object.keys(change).forEach((key) => {
            // @ts-expect-error
            if (item[key] !== change[key]) {
                // @ts-expect-error
                prevState[key] = item[key];
            }
        });
        prevState = structuredClone(prevState);
        (0, lodash_1.merge)(item, change);
        this.board.signals.get('onItemModified').dispatch({ layerKey: this.layerName, item, prevState });
    }
    get(cell) {
        const item = this.board.grid.get(cell);
        return item ? item[this.layerName] : null;
    }
    set(item, cell) {
        cell = { ...cell };
        const gridItem = this.board.grid.get(cell);
        if (!gridItem) {
            // eslint-disable-next-line no-console
            this.board.logger.warn(`Cannot insert ${this.layerName}. No item in Col: ${cell.col}; Row: ${cell.row}`);
            return;
        }
        gridItem[this.layerName] = item;
        this.board.grid.set(cell, gridItem);
    }
    loopGrid(callback) {
        this.board.grid.loop((item, cell) => {
            if (item) {
                callback(item[this.layerName] ?? null, cell);
            }
            else {
                callback(null, cell);
            }
            return false;
        });
    }
    loopExistingLayerItems(callback) {
        this.board.grid.loop((item, cell) => {
            if (item && item[this.layerName] != null) {
                callback(item[this.layerName], cell);
            }
            return false;
        }, true);
    }
    find(test) {
        const result = this.board.grid.find((gridItem, cell) => {
            if (gridItem[this.layerName]) {
                if (test(gridItem[this.layerName], cell))
                    return true;
            }
            return false;
        });
        return result ? result[this.layerName] : null;
    }
    getAll(filter) {
        const result = [];
        this.loopExistingLayerItems((item) => {
            if (filter && !filter(item))
                return;
            result.push(item);
        });
        return result;
    }
    getCellsWithinCellSize(cell, size) {
        return (0, CellsHelpers_1.getCellsWithinCellSize)(cell, size);
    }
    getQuestTargets(questItem) {
        return null;
    }
    prepareQuestTargets(questItem, targets) {
        // Override this method with your prepare implementation
    }
    consumeQuestItem(questItem, target, taskId) {
        // Override this method with your custom implementation
    }
    /**
     * Override this method with your custom implementation to avoid scanning the entire grid
     */
    getCountOnBoard(props) {
        let count = 0;
        this.board.grid.loop((item) => {
            if (item && item[this.layerName]) {
                count++;
            }
            return false;
        }, true);
        return count;
    }
    getSize(item) {
        return { width: 1, height: 1 };
    }
    destroy() { }
}
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map