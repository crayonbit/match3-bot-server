"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemsLayer = void 0;
const BoardTypes_1 = require("../BoardTypes");
const TickGeneratorUtils_1 = require("../../TickGenerator/TickGeneratorUtils");
const CellsHelpers_1 = require("../../Utils/CellsHelpers");
const GemsHelpers_1 = require("../../Utils/GemsHelpers");
const BoardTypeUtils_1 = require("../BoardTypeUtils");
const Layer_1 = require("./Layer");
class GemsLayer extends Layer_1.Layer {
    constructor(gemsHandlers) {
        super(BoardTypes_1.LevelGridItemKey.Gem);
        this.bigSizeMap = new Map();
        this.countsOnBoard = {};
        this.handlersMap = gemsHandlers;
    }
    init(props) {
        super.init(props);
        Object.values(this.handlersMap).forEach((handler) => handler.init(props.board));
    }
    onLevelLoad() {
        this.bigSizeMap.clear();
        this.getAll().forEach((gem) => {
            this.tryAddGemToBigSizeMap(gem);
            this.updateCountOnBoard(gem, 1);
        });
    }
    tryAddGemToBigSizeMap(gem) {
        const handler = this.getCoreHandler(gem.core.className);
        const size = handler.getSize(gem);
        if (Math.abs(size.width) > 1 || Math.abs(size.height) > 1) {
            this.getCellsWithinCellSize(gem, size).forEach((cell) => this.bigSizeMap.set((0, CellsHelpers_1.cellToHash)(cell), gem));
        }
    }
    clearGemInBigSizeMap(gem) {
        const handler = this.getCoreHandler(gem.core.className);
        const size = handler.getSize(gem);
        if (Math.abs(size.width) > 1 || Math.abs(size.height) > 1) {
            this.getCellsWithinCellSize(gem, size).forEach((cell) => this.bigSizeMap.delete((0, CellsHelpers_1.cellToHash)(cell)));
        }
    }
    tryUpdateBigSizeMap(oldGem, newGem) {
        const gemHandler = this.getCoreHandler(newGem.core.className);
        if (this.isSizeEqual(gemHandler.getSize(oldGem), gemHandler.getSize(newGem))) {
            return false;
        }
        this.clearGemInBigSizeMap(oldGem);
        this.tryAddGemToBigSizeMap(newGem);
        return true;
    }
    isSizeEqual(sizeA, sizeB) {
        return sizeA.width === sizeB.width && sizeA.height === sizeB.height;
    }
    getCoreHandler(className) {
        return this.handlersMap[className];
    }
    /**
     * Creates and sets a gem in the specified grid cell by the partial core data.
     */
    createGemOnGrid(cell, partialCore, customId) {
        const gem = this.createGem(cell, partialCore, customId);
        this.set(gem, cell);
        return gem;
    }
    isClickable(cell) {
        const gem = this.get(cell);
        return gem && !this.isKilled(gem) ? this.getCoreHandler(gem.core.className).isClickable(gem) : false;
    }
    blocksSwap(cell) {
        const gem = this.get(cell);
        return gem ? this.getCoreHandler(gem.core.className).blocksSwap(gem) : true;
    }
    blocksMatch(cell) {
        const gem = this.get(cell);
        return !gem || this.isKilled(gem) || this.getCoreHandler(gem.core.className).blocksMatch(gem);
    }
    blocksMove(cell) {
        const gem = this.get(cell);
        return (gem && this.getCoreHandler(gem.core.className).blocksMove(gem)) || false;
    }
    blocksBooster(cell, boosterType) {
        const gem = this.get(cell);
        return gem ? this.getCoreHandler(gem.core.className).blocksBooster(gem, boosterType) : false;
    }
    /**
     * Performs direct kick on the cell.
     * If the cell can receive any kick damage it might be killed or its HP will be decreased, or some other modification can happen
     * @param cell The cell to kick.
     * @returns {boolean} - if cell was kicked
     */
    kick(cell, params) {
        const gem = this.get(cell);
        if (!gem || this.isKilled(gem) || this.board.locker.hasLockReason(cell, 'Merge') || gem.core.invincible) {
            return { result: 'none' };
        }
        const oldGem = structuredClone(gem);
        const gemHandler = this.getCoreHandler(gem.core.className);
        const kickedResult = gemHandler.kick(gem, params);
        if (kickedResult.result === 'none')
            return { result: 'none' };
        const sizeUpdated = this.tryUpdateBigSizeMap(oldGem, gem);
        this.board.signals.get('onKick').dispatch({ item: gem, layerKey: this.layerName });
        const killed = this.isKilled(gem);
        if (killed) {
            this.removeAndDispatchKill(gem, params.matchId);
        }
        return {
            result: kickedResult.result,
            layerItem: (0, BoardTypeUtils_1.gemToLayerItem)(gem),
            killed,
            sizeCells: this.getSizeCells(oldGem),
            sizeUpdated,
            lockReasonsWithTicks: kickedResult.lockReasonsWithTicks,
        };
    }
    decrementHp(cell) {
        const gem = this.get(cell);
        if (!gem || this.isKilled(gem)) {
            return false;
        }
        return this.getCoreHandler(gem.core.className).decrementHp(gem);
    }
    /**
     * Hit is the damage that can receive a cell from a "blast wave" of a powerful kick
     * E.g. On three in a row match three gems got kicked and adjacent cells receive a hit damage
     * @param cell The cell to hit.
     * @returns {boolean} - if cell was kicked
     */
    hit(cell, params) {
        const gem = this.get(cell);
        if (!gem || this.isKilled(gem)) {
            return { result: 'none' };
        }
        const oldGem = structuredClone(gem);
        const hitResult = this.getCoreHandler(gem.core.className).hit(gem, params);
        if (!hitResult.result)
            return { result: 'none' };
        const sizeUpdated = this.tryUpdateBigSizeMap(oldGem, gem);
        this.board.signals.get('onHit').dispatch({ item: gem, layerKey: this.layerName });
        const killed = this.isKilled(gem);
        if (killed) {
            this.removeAndDispatchKill(gem, params.matchId);
        }
        return {
            result: 'hit',
            layerItem: (0, BoardTypeUtils_1.gemToLayerItem)(gem),
            killed,
            sizeCells: this.getSizeCells(oldGem),
            sizeUpdated,
            lockReasonsWithTicks: hitResult.lockReasonsWithTicks,
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
    get(cell) {
        return this.bigSizeMap.get((0, CellsHelpers_1.cellToHash)(cell)) || super.get(cell);
    }
    swap(cellA, cellB) {
        cellA = { ...cellA };
        cellB = { ...cellB };
        const gemA = this.get(cellA);
        const gemB = this.get(cellB);
        if (gemA) {
            this.set(gemA, cellB);
        }
        else {
            this.remove(cellB);
        }
        if (gemB) {
            this.set(gemB, cellA);
        }
        else {
            this.remove(cellA);
        }
    }
    getWithType(cell, coreName) {
        const gem = this.get(cell);
        return gem?.core?.className === coreName ? gem : null;
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
        if (prev) {
            this.clearGemInBigSizeMap(prev);
            this.updateCountOnBoard(prev, -1);
        }
        if (gem) {
            this.tryAddGemToBigSizeMap(gem);
            this.updateCountOnBoard(gem, 1);
        }
    }
    removeAndReturnItem(cell) {
        const removedGem = super.removeAndReturnItem(cell);
        if (removedGem) {
            this.clearGemInBigSizeMap(removedGem);
            this.updateCountOnBoard(removedGem, -1);
        }
        return removedGem;
    }
    isKilled(item) {
        return this.getCoreHandler(item.core.className).isKilled(item);
    }
    replaceGemCore(taskData) {
        const { cell, className, reason } = taskData;
        const gem = this.get(taskData.cell);
        if (!gem) {
            this.board.logger.error('Gem not found!');
            return;
        }
        const oldGem = structuredClone(gem);
        gem.core = this.getCoreHandler(taskData.className).create(taskData);
        this.updateCountOnBoard(oldGem, -1);
        this.updateCountOnBoard(gem, 1);
        this.board.signals.get('onGemCoreReplaced').dispatch({ gem, oldGem, reason });
    }
    getGemById(id) {
        return this.find((item) => (item ? item.id === id : false));
    }
    *shuffle(maxAttemptsPerChunk, maxTotalAttempts, maxNoAutoMatchesAttempts, onComplete) {
        maxNoAutoMatchesAttempts = Math.min(maxNoAutoMatchesAttempts, maxTotalAttempts);
        const gemsToShuffle = this.getAll((gem) => {
            return !this.board.isMoveBlocked(gem) && (0, GemsHelpers_1.isGemOfKind)(gem, BoardTypes_1.GemCoreName.Regular) && !this.isCovered(gem);
        });
        const result = gemsToShuffle.map((gem) => ({
            gem,
            originalCell: { col: gem.col, row: gem.row },
        }));
        const availableCells = gemsToShuffle.map(({ col, row }) => ({ col, row }));
        let regularMatchesLength = 0;
        let i = 0;
        do {
            if (i > 0 && i % maxAttemptsPerChunk === 0) {
                yield* (0, TickGeneratorUtils_1.waitTicks)(1);
            }
            else if (i >= maxTotalAttempts) {
                this.board.logger.error(`Shuffle failed! Max attempts ${maxTotalAttempts} reached!`);
                yield { kind: 'shuffleFailed' };
                return;
            }
            i++;
            this.board.randomGenerator.shuffle(availableCells);
            gemsToShuffle.forEach((gem, index) => {
                const newCell = availableCells[index];
                this.swap(gem, newCell);
            });
            const regularMatches = this.board.regularMatcher.findMatches(this.getGemsByCoreName(BoardTypes_1.GemCoreName.Regular), []);
            regularMatchesLength = regularMatches.length;
        } while ((regularMatchesLength > 0 && i < maxNoAutoMatchesAttempts) || !this.board.hasSomeMove());
        onComplete(result);
    }
    getGemsByCoreName(coreName) {
        return this.getAll((gem) => gem.core.className === coreName);
    }
    areGemsNeighbors(gemA, gemB) {
        const { col: colA, row: rowA } = gemA;
        const { col: colB, row: rowB } = gemB;
        const sizeA = this.getCoreHandler(gemA.core.className).getSize(gemA);
        const sizeB = this.getCoreHandler(gemB.core.className).getSize(gemB);
        if (Math.abs(sizeA.width) === 1 &&
            Math.abs(sizeA.height) === 1 &&
            Math.abs(sizeB.width) === 1 &&
            Math.abs(sizeB.height) === 1) {
            return Math.abs(rowA - rowB) + Math.abs(colA - colB) === 1;
        }
        const cellsA = this.getCellsWithinCellSize(gemA, sizeA);
        const cellsB = this.getCellsWithinCellSize(gemB, sizeB);
        return cellsA.some((cellA) => cellsB.some((cellB) => this.getCellsDistance(cellA, cellB) === 1));
    }
    getCellsDistance(cellA, cellB) {
        return Math.abs(cellA.col - cellB.col) + Math.abs(cellA.row - cellB.row);
    }
    isCombo(gem) {
        return this.getCoreHandler(gem.core.className).isCombo(gem);
    }
    isCovered(gem) {
        return this.getCoreHandler(gem.core.className).isCovered(gem);
    }
    getSize(gem) {
        const handler = this.handlersMap[gem.core.className];
        return handler.getSize(gem);
    }
    getSizeCells(gem) {
        const size = this.getSize(gem);
        if (Math.abs(size.width) === 1 && Math.abs(size.height) === 1) {
            return [{ col: gem.col, row: gem.row }];
        }
        return this.getCellsWithinCellSize(gem, this.getSize(gem));
    }
    getCountOnBoard(itemNameHash) {
        return this.countsOnBoard[itemNameHash] ?? 0;
    }
    updateCountOnBoard(gem, addend) {
        if (gem.core.className === BoardTypes_1.GemCoreName.Regular) {
            const key = `${BoardTypes_1.GemCoreName.Regular}_${gem.core.color}`;
            this.countsOnBoard[key] = (this.countsOnBoard[key] ?? 0) + addend;
        }
        else {
            this.countsOnBoard[gem.core.className] = (this.countsOnBoard[gem.core.className] ?? 0) + addend;
        }
    }
    destroy() {
        super.destroy();
        this.bigSizeMap.clear();
        this.countsOnBoard = {};
    }
    clone() {
        const handlerMapClone = Object.entries(this.handlersMap).reduce((acc, [key, handler]) => {
            acc[key] = handler.clone();
            return acc;
        }, {});
        const gemsLayerClone = new GemsLayer(handlerMapClone);
        this.bigSizeMap.forEach((gem) => {
            gemsLayerClone.tryAddGemToBigSizeMap(structuredClone(gem));
        });
        gemsLayerClone.countsOnBoard = structuredClone(this.countsOnBoard);
        return gemsLayerClone;
    }
}
exports.GemsLayer = GemsLayer;
//# sourceMappingURL=GemsLayer.js.map