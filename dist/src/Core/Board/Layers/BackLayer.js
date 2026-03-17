"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackLayer = void 0;
const BoardTypes_1 = require("../BoardTypes");
const Layer_1 = require("./Layer");
class BackLayer extends Layer_1.Layer {
    constructor() {
        super(BoardTypes_1.LevelGridItemKey.Back);
        this.dropGoalsPresent = false;
    }
    onLevelLoad() {
        super.onLevelLoad();
        this.dropGoalsPresent = this.getAll().some((backItem) => backItem.dropGoal);
    }
    createItem(props, customId) {
        return {
            boot: false,
            dropGoal: false,
            tunnel: false,
            ...props,
            id: customId ?? this.board.getEntityId(),
        };
    }
    isKilled(item) {
        return false;
    }
    hasGameElement(cell) {
        return false;
    }
    hasDropGoal(cell) {
        return !!this.get(cell)?.dropGoal;
    }
    hasDropGoals() {
        return this.dropGoalsPresent;
    }
    isTunnel(cell) {
        return !!this.get(cell)?.tunnel;
    }
    clone() {
        const backLayerClone = new BackLayer();
        backLayerClone.dropGoalsPresent = this.dropGoalsPresent;
        return backLayerClone;
    }
}
exports.BackLayer = BackLayer;
//# sourceMappingURL=BackLayer.js.map