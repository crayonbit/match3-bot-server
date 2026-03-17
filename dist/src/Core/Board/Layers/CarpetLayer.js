"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarpetLayer = void 0;
const CellsOffsets_1 = require("../../Utils/CellsOffsets");
const BoardTypes_1 = require("../BoardTypes");
const Layer_1 = require("./Layer");
class CarpetLayer extends Layer_1.Layer {
    constructor() {
        super(BoardTypes_1.LevelGridItemKey.Carpet);
        this.sidesMapToTilePosition = {
            '0000': 'center',
            '0001': 'top',
            '0010': 'left',
            '0011': 'topLeft',
            '0100': 'bottom',
            '0101': 'leftRight',
            '0110': 'bottomLeft',
            '0111': 'middleLeft',
            '1000': 'right',
            '1001': 'topRight',
            '1010': 'topBottom',
            '1011': 'topCenter',
            '1100': 'bottomRight',
            '1101': 'middleRight',
            '1110': 'bottomCenter',
            '1111': 'middleCenter',
        };
        this.tilePositionUpdateDirections = ['left', 'top', 'right', 'bottom'];
    }
    createItem(props, customId) {
        return {
            hp: 2,
            ...props,
            id: customId ?? this.board.getEntityId(),
            tilePosition: 'middleCenter',
        };
    }
    postLevelLoad() {
        super.postLevelLoad();
        this.loopGrid((item, cell) => {
            if (!item)
                return;
            this.modifyItem(item, { tilePosition: this.getUpdatedTilePosition(cell) });
        });
    }
    getUpdatedTilePosition(cell) {
        const sidesMap = (0, CellsOffsets_1.getAdjacentCells)(cell, this.tilePositionUpdateDirections)
            .map((adjacentCell) => (this.board.hasBack(adjacentCell) ? 1 : 0))
            .join('');
        return this.sidesMapToTilePosition[sidesMap];
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
            // Uncomment when dynamic tile position update is needed
            // this.updateTilesAround(cell);
            return {
                result: 'kickedContinue',
                layerItem: { item, layerKey: this.layerName },
                killed,
                sizeCells: [cell],
            };
        }
        return { result: 'kickedBreak', layerItem: { item, layerKey: this.layerName }, killed, sizeCells: [cell] };
    }
    updateTilesAround(cell) {
        (0, CellsOffsets_1.getAdjacentCells)(cell, [
            'left',
            'topLeft',
            'top',
            'topRight',
            'right',
            'bottomRight',
            'bottom',
            'bottomLeft',
        ]).forEach((adjacentCell) => {
            const adjacentItem = this.get(adjacentCell);
            if (!adjacentItem)
                return;
            this.modifyItem(adjacentItem, { tilePosition: this.getUpdatedTilePosition(adjacentCell) });
        });
    }
    isKilled(item) {
        return item.hp <= 0;
    }
    clone() {
        const layerClone = new CarpetLayer();
        return layerClone;
    }
}
exports.CarpetLayer = CarpetLayer;
//# sourceMappingURL=CarpetLayer.js.map