"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorsLayer = void 0;
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const BoardTypes_1 = require("../BoardTypes");
const BoardTypeUtils_1 = require("../BoardTypeUtils");
const Layer_1 = require("./Layer");
class DoorsLayer extends Layer_1.Layer {
    constructor() {
        super(BoardTypes_1.LevelGridItemKey.Door);
        this.bigSizeMap = new Map();
        this.originCells = [];
        this.itemsPreDecrementedHp = {};
    }
    onLevelLoad() {
        this.bigSizeMap.clear();
        this.loopGrid((item, cell) => {
            if (!item)
                return;
            this.tryAddItemToBigSizeMap(cell, item);
            this.originCells.push(cell);
            this.itemsPreDecrementedHp[item.id] = item.hp;
        });
    }
    tryAddItemToBigSizeMap(cell, item) {
        this.getCellsWithinCellSize(cell, item).forEach((relatedCell) => this.bigSizeMap.set((0, CellsHelpers_1.cellToHash)(relatedCell), item));
    }
    /**
     * If item was triggered (e.g. by a kick or hit) it is becoming a potential goal item.
     * By default regular goal items are getting collected to the goals panel if no other targets found for them among the board layers.
     * If you want to change this behavior you can override this method and return an array of custom goal targets from the board.
     * All the collected goal items eventually will be consumed by those targets after they reach them.
     * See the `consumeGoalItem` method.
     */
    getQuestTargets(questItem) {
        if (!(0, BoardTypeUtils_1.isGemLayerItem)(questItem))
            return null;
        const { item: gem } = questItem;
        if (gem.core.className !== BoardTypes_1.GemCoreName.Regular && gem.core.className !== BoardTypes_1.GemCoreName.Acorn)
            return null;
        let firstAvailableDoor = null;
        for (const cell of this.originCells) {
            const doorItem = this.get(cell);
            if (!doorItem || !this.isNeededQuestItem(questItem, doorItem) || this.itemsPreDecrementedHp[doorItem.id] <= 0) {
                continue;
            }
            firstAvailableDoor = { item: doorItem, cell };
            break;
        }
        if (!firstAvailableDoor)
            return null;
        const cells = this.getItemCells(firstAvailableDoor.item).filter((c) => !(0, CellsHelpers_1.isCellsEqual)(c, firstAvailableDoor.cell));
        cells.unshift(firstAvailableDoor.cell);
        return [
            {
                layerKey: this.layerName,
                item: firstAvailableDoor.item,
                cells,
                durationTicks: this.config.doorGoalCollectTicks,
                skipGoalCollection: false,
            },
        ];
    }
    getItemCells(item) {
        const cells = [];
        for (const [hash, doorItem] of this.bigSizeMap.entries()) {
            if (doorItem.id === item.id) {
                cells.push((0, CellsHelpers_1.hashToCell)(hash));
            }
        }
        return cells;
    }
    prepareQuestTargets(questItem, targets) {
        if (!(0, BoardTypeUtils_1.isGemLayerItem)(questItem))
            return;
        targets.forEach((target) => {
            if (!(0, BoardTypeUtils_1.isDoorItem)(target.item))
                return;
            const doorItem = target.item;
            if (this.isNeededQuestItem(questItem, doorItem)) {
                this.itemsPreDecrementedHp[doorItem.id] -= 1;
            }
        });
    }
    consumeQuestItem(questItem, target, taskId) {
        if (!(0, BoardTypeUtils_1.isGemLayerItem)(questItem) || target.layerKey !== this.layerName || !(0, BoardTypeUtils_1.isDoorItem)(target.item))
            return;
        const doorItem = target.item;
        if (this.isNeededQuestItem(questItem, doorItem)) {
            const hp = doorItem.hp - 1;
            this.modifyItem(doorItem, { hp });
            if (hp === 0) {
                this.removeAndDispatchKill(target.cells[0], taskId);
            }
        }
    }
    isNeededQuestItem(questItem, doorItem) {
        if (!(0, BoardTypeUtils_1.isGemLayerItem)(questItem))
            return false;
        const { core } = questItem.item;
        const isNeededRegularGem = core.className === BoardTypes_1.GemCoreName.Regular && core.color === doorItem.type;
        const isNeededAcornGem = core.className === BoardTypes_1.GemCoreName.Acorn && core.className === doorItem.type;
        return isNeededRegularGem || isNeededAcornGem;
    }
    createItem(props, customId) {
        return {
            hp: 10,
            width: 2,
            height: 2,
            type: BoardTypes_1.GemColor.a,
            ...props,
            id: customId ?? this.board.getEntityId(),
        };
    }
    kick(cell, params) {
        return this.get(cell) ? { result: 'break' } : { result: 'none' };
    }
    hit(cell, params) {
        return this.get(cell) ? { result: 'break' } : { result: 'none' };
    }
    blocksSwap(cell) {
        return !!this.get(cell);
    }
    blocksClick(cell) {
        return !!this.get(cell);
    }
    isClickable(cell) {
        return false;
    }
    blocksMatch(cell) {
        return !!this.get(cell);
    }
    blocksMove(cell) {
        return !!this.get(cell);
    }
    get(cell) {
        return this.bigSizeMap.get((0, CellsHelpers_1.cellToHash)(cell)) || super.get(cell);
    }
    removeAndReturnItem(cell) {
        const removedGem = super.removeAndReturnItem(cell);
        if (removedGem) {
            this.clearGemInBigSizeMap(cell, removedGem);
            this.removeOriginCell(cell);
        }
        return removedGem;
    }
    clearGemInBigSizeMap(cell, door) {
        this.getCellsWithinCellSize(cell, door).forEach((relatedCell) => {
            this.bigSizeMap.delete((0, CellsHelpers_1.cellToHash)(relatedCell));
        });
    }
    removeOriginCell(cell) {
        const index = this.originCells.findIndex((originCell) => {
            return (0, CellsHelpers_1.isCellsEqual)(originCell, cell);
        });
        if (index !== -1) {
            this.originCells.splice(index, 1);
        }
    }
    isKilled(item) {
        return item.hp <= 0;
    }
    destroy() {
        super.destroy();
        this.bigSizeMap.clear();
        this.originCells.length = 0;
    }
    clone() {
        const layerClone = new DoorsLayer();
        for (const [key, value] of this.bigSizeMap) {
            layerClone.bigSizeMap.set(key, structuredClone(value));
        }
        this.originCells.forEach((cell) => {
            layerClone.originCells.push({ ...cell });
        });
        return layerClone;
    }
}
exports.DoorsLayer = DoorsLayer;
//# sourceMappingURL=DoorsLayer.js.map