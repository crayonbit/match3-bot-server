"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverLayer = void 0;
const BitsUtils_1 = require("../../Utils/BitsUtils");
const CellsOffsets_1 = require("../../Utils/CellsOffsets");
const BoardTypes_1 = require("../BoardTypes");
const Layer_1 = require("./Layer");
class CoverLayer extends Layer_1.Layer {
    constructor() {
        super(BoardTypes_1.LevelGridItemKey.Cover);
        this.tileConnectionDirections = [
            'left',
            'topLeft',
            'top',
            'topRight',
            'right',
            'bottomRight',
            'bottom',
            'bottomLeft',
        ];
        this.directionToMask = {
            left: BitsUtils_1.SIDE_BIT.L,
            topLeft: BitsUtils_1.SIDE_BIT.TL,
            top: BitsUtils_1.SIDE_BIT.T,
            topRight: BitsUtils_1.SIDE_BIT.TR,
            right: BitsUtils_1.SIDE_BIT.R,
            bottomRight: BitsUtils_1.SIDE_BIT.BR,
            bottom: BitsUtils_1.SIDE_BIT.B,
            bottomLeft: BitsUtils_1.SIDE_BIT.BL,
        };
    }
    createItem(props, customId) {
        return {
            hp: 1,
            ...props,
            id: customId ?? this.board.getEntityId(),
            connectionMask: 0,
        };
    }
    postLevelLoad() {
        super.postLevelLoad();
        this.loopGrid((item, cell) => {
            if (!item)
                return;
            this.modifyItem(item, { connectionMask: this.getConnectionMask(cell) });
        });
    }
    getConnectionMask(cell) {
        const adjacentCells = (0, CellsOffsets_1.getAdjacentCells)(cell, this.tileConnectionDirections);
        let mask = 0b00000000;
        for (let i = 0; i < adjacentCells.length; i++) {
            const direction = this.tileConnectionDirections[i];
            const maskBit = this.directionToMask[direction];
            if (this.get(adjacentCells[i])) {
                mask |= maskBit;
            }
        }
        return mask;
    }
    kick(cell, params) {
        const item = this.get(cell);
        if (!item)
            return { result: 'none' };
        this.modifyItem(item, { hp: item.hp - 1 });
        this.board.signals.get('onKick').dispatch({ item, layerKey: this.layerName });
        const killed = this.isKilled(item);
        if (killed) {
            this.removeAndDispatchKill(cell, params.matchId);
            this.updateTilesAround(cell);
        }
        return { result: 'kickedBreak', layerItem: { item, layerKey: this.layerName }, killed, sizeCells: [cell] };
    }
    hit(cell, params) {
        const item = this.get(cell);
        if (!item)
            return { result: 'none' };
        this.modifyItem(item, { hp: item.hp - 1 });
        this.board.signals.get('onHit').dispatch({ item, layerKey: this.layerName });
        const killed = this.isKilled(item);
        if (killed) {
            this.removeAndDispatchKill(cell, params.matchId);
            this.updateTilesAround(cell);
        }
        return { result: 'hit', layerItem: { item, layerKey: this.layerName }, killed, sizeCells: [cell] };
    }
    updateTilesAround(cell) {
        (0, CellsOffsets_1.getAdjacentCells)(cell, this.tileConnectionDirections).forEach((adjacentCell) => {
            const adjacentItem = this.get(adjacentCell);
            if (!adjacentItem)
                return;
            this.modifyItem(adjacentItem, { connectionMask: this.getConnectionMask(adjacentCell) });
        });
    }
    isKilled(item) {
        return item.hp <= 0;
    }
    blocksSwap(cell) {
        return !!this.get(cell);
    }
    blocksMatch(cell) {
        return !!this.get(cell);
    }
    clone() {
        const layerClone = new CoverLayer();
        return layerClone;
    }
}
exports.CoverLayer = CoverLayer;
//# sourceMappingURL=CoverLayer.js.map