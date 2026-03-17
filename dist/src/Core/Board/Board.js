"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const BoardTypes_1 = require("./BoardTypes");
const CellsHelpers_1 = require("../Utils/CellsHelpers");
const BoardSignals_1 = require("./BoardSignals");
class Board {
    constructor(props) {
        this.entityIdCounter = 0;
        this.taskIdCounter = 0;
        this.animationIdCounter = 0;
        this.generateTaskId = () => {
            return (this.taskIdCounter++).toString();
        };
        this.generateAnimationId = () => {
            return (this.animationIdCounter++).toString();
        };
        this.grid = props.grid;
        this.locker = props.locker;
        this.regularMatcher = props.regularMatcher;
        this.blastMatcher = props.blastMatcher;
        this.spawner = props.spawner;
        this.randomGenerator = props.randomGenerator;
        this.progressManager = props.progressManager;
        this.signals = props.signals;
        this.createCellsKeeper = props.createCellsKeeper;
        this.logger = props.logger;
        this.layers = props.layers;
        this.config = props.config;
        this.layersMap = this.layers.reduce((acc, layer) => {
            acc[layer.layerName] = layer;
            return acc;
        }, {});
        this.regularMatcher.init({ board: this, generateMatchId: this.generateTaskId });
        this.blastMatcher.init({ board: this, generateMatchId: this.generateTaskId });
        this.spawner.init({ board: this });
        this.layers.forEach((layer) => layer.init({ board: this, config: this.config }));
        this.progressManager.init(this);
        this.connectProgressManagerToBoardSignals(this.progressManager, this);
    }
    get gemsLayer() {
        return this.getLayer(BoardTypes_1.LevelGridItemKey.Gem);
    }
    getLayer(layerKey) {
        return this.layersMap[layerKey];
    }
    connectProgressManagerToBoardSignals(progressManager, board) {
        board.signals.get('onSwapGems').add((params) => progressManager.decrementMoves());
        board.signals.get('onSwapGemsCombo').add((params) => progressManager.decrementMoves());
        board.signals.get('onClickGem').add((gem) => progressManager.decrementMoves());
    }
    loadLevel(level) {
        const maxCols = level.grid.length;
        const maxRows = level.grid[0].length;
        this.grid.create(maxCols, maxRows, (cell) => structuredClone(level.grid[cell.col][cell.row]));
        this.locker.init({ signals: this.signals, cols: this.grid.getCols(), rows: this.grid.getRows() });
        this.spawner.loadLevel(level);
        this.progressManager.loadLevel(level);
        this.layers.forEach((layer) => layer.onLevelLoad());
        this.signals.get('onLevelLoaded').dispatch(level);
        this.layers.forEach((layer) => layer.postLevelLoad());
    }
    /**
     * Swaps two gems on the board not considering their position and distance
     */
    swapGems(cellA, cellB) {
        const cellsSwappable = this.isSwappable(cellA, true) && this.isSwappable(cellB, false);
        if (!cellsSwappable) {
            this.logger?.error('Cells are not swappable', cellA, cellB);
            return false;
        }
        const gemA = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).get(cellA);
        if (!gemA) {
            this.logger.error('gemA not found!');
            return false;
        }
        this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).swap(cellA, cellB);
        return true;
    }
    dispatchTaskStarted(props) {
        this.signals.get('onTaskStarted').dispatch(props);
    }
    dispatchTaskFinished(props) {
        this.signals.get('onTaskFinished').dispatch(props);
    }
    /**
     * Called by SwapCulminateStepGenerator on successful swap
     */
    dispatchSwapGems(gemA, gemB) {
        this.signals.get('onSwapGems').dispatch({ gemA, gemB });
    }
    /**
     * Called by SwapCulminateStepGenerator on successful combo swap
     */
    dispatchSwapGemsCombo(gemA, gemB) {
        this.signals.get('onSwapGemsCombo').dispatch({ gemA, gemB });
    }
    /**
     * Called by SwapCulminateStepGenerator when swap was not possible
     */
    dispatchSwapGemsWrong(gemA, cellB, gemB) {
        this.signals.get('onSwapGemsWrong').dispatch({ gemA, cellB, gemB });
    }
    /**
     * Called by ClickCulminateStepGenerator on successful click
     */
    dispatchClickGem(cell) {
        const gem = this.getGem(cell);
        if (!gem) {
            this.logger.error('Click gem not found!');
            return;
        }
        this.signals.get('onClickGem').dispatch(gem);
    }
    /**
     * Used by gravity to move gem from one cell to another
     */
    moveGemToCellByGravity(sourceCell, targetCell) {
        const sourceGem = this.getGem(sourceCell);
        if (!sourceGem || !(this.isEmptyCell(targetCell) || this.isTunnel(targetCell))) {
            return false;
        }
        this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).swap(sourceCell, targetCell);
        this.signals.get('onMoveGemToCellByGravity').dispatch({ sourceCell, targetCell, gem: sourceGem });
        return true;
    }
    abruptMoveGemToCellByGravity(cell) {
        const gem = this.getGem(cell);
        if (!gem) {
            return false;
        }
        this.signals.get('onAbruptMoveGemToCellByGravity').dispatch({ gem, cell });
        return true;
    }
    /**
     * Spawns a new gem on a cell
     */
    spawnGem(cell) {
        const gem = this.spawner.spawn(cell);
        this.signals.get('onSpawnGem').dispatch(gem);
        return gem;
    }
    /**
     * Checks if click operation is possible on the cell
     */
    isClickable(cell) {
        if (!this.hasGem(cell) || this.locker.hasLockReasons(cell) || this.isTunnel(cell)) {
            return false;
        }
        for (let i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].blocksClick(cell)) {
                return false;
            }
            if (this.layers[i].isClickable(cell)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if swap operation is possible on the cell
     * isActiveCell is the one that we clicked first
     */
    isSwappable(cell, isActiveCell) {
        if (this.isTunnel(cell)) {
            return false;
        }
        if (!isActiveCell && this.isEmptyCell(cell) && !this.locker.hasLockReasons(cell)) {
            return true;
        }
        if (!this.hasGem(cell) || this.locker.hasLockReasons(cell)) {
            return false;
        }
        for (let i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].blocksSwap(cell)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Performs direct kick on the cell.
     * If the cell can receive any kick damage it might be killed or its HP will be decreased
     * @param cell The cell to kick.
     * @param startLayerKey - if provided, all the kick actions will happen below this layer
     */
    kick(cell, params) {
        if (!this.hasBack(cell) || this.isTunnel(cell))
            return [];
        const results = [];
        const { startLayerKey, matchId } = params ?? {};
        const startLayerIndex = startLayerKey
            ? this.layers.findIndex((layer) => layer.layerName === startLayerKey) - 1
            : this.layers.length - 1;
        for (let i = startLayerIndex; i >= 0; i--) {
            const kickResult = this.layers[i].kick(cell, { matchId });
            if (kickResult.result === 'kickedContinue') {
                results.push(kickResult);
            }
            else if (kickResult.result === 'kickedBreak') {
                results.push(kickResult);
                break;
            }
            else if (kickResult.result === 'break') {
                break;
            }
        }
        return results;
    }
    /**
     * Hit is the damage that can receive a cell from a "blast wave" of a powerful kick
     * E.g. On three in a row match three gems got kicked and adjacent cells receive a hit damage
     * @param cell The cell to hit.
     * @returns {boolean} - if cell was kicked
     */
    hit(cell, params) {
        if (this.isTunnel(cell)) {
            return [];
        }
        const results = [];
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const hitResult = this.layers[i].hit(cell, params);
            if (hitResult.result === 'hit') {
                results.push(hitResult);
                break;
            }
            else if (hitResult.result === 'break') {
                break;
            }
        }
        return results;
    }
    /**
     * Turn gem into another kind.
     * E.g. regular gem can turn into a line bomb
     */
    replaceGemCore(taskData) {
        this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).replaceGemCore(taskData);
    }
    /**
     * Create gem on the Blast layer
     */
    createBlastLayerGem(taskData) {
        const blastGem = this.getLayer(BoardTypes_1.LevelGridItemKey.Blast).createGemOnGrid(taskData.cell, taskData);
        this.signals.get('onCreateBlastLayerGem').dispatch(blastGem);
        return blastGem;
    }
    /**
     * Match with the cell is not possible if some layer blocks it
     */
    isMatchBlocked(cell) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].blocksMatch(cell)) {
                return true;
            }
        }
        return false;
    }
    /**
     * If move is blocked by some layer
     */
    isMoveBlocked(cell) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].blocksMove(cell)) {
                return true;
            }
        }
        return false;
    }
    /**
     * If new gem can be spawned on this cell
     */
    isSpawnerCell(cell) {
        const backItem = this.getLayer(BoardTypes_1.LevelGridItemKey.Back).get(cell);
        return !!backItem && backItem.boot;
    }
    /**
     * Empty Cell means that cell is part of the grid, but has no gem on it at the moment
     */
    isEmptyCell(cell) {
        return this.isInGrid(cell) && !this.getGem(cell) && this.hasBack(cell);
    }
    isTunnel(cell) {
        return this.getLayer(BoardTypes_1.LevelGridItemKey.Back).isTunnel(cell);
    }
    /**
     * If the cell has back item it also means that it is a functional part of the level
     * otherwise it is just a hole in the grid
     */
    hasBack(cell) {
        return !!this.getLayer(BoardTypes_1.LevelGridItemKey.Back).get(cell);
    }
    /**
     * If the cell contains drop goal, where drop gems can be collected
     */
    hasDropGoal(cell) {
        return !!this.getLayer(BoardTypes_1.LevelGridItemKey.Back).hasDropGoal(cell);
    }
    /**
     * If board contains at least one drop goal
     */
    hasDropGoals() {
        return !!this.getLayer(BoardTypes_1.LevelGridItemKey.Back).hasDropGoals();
    }
    /**
     * If cell is in the range of the board grid rectangle.
     * Even if the call is in range it still be can be just a hole in the grid
     */
    isInGrid(cell) {
        return this.grid.isInGrid(cell);
    }
    /**
     * If the cell has a gem on it
     */
    hasGem(cell) {
        return this.getGem(cell) != null;
    }
    hasEntityOnCell(cell, entityId) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const entity = this.layers[i].get(cell);
            if (entity?.id === entityId) {
                return true;
            }
        }
        return false;
    }
    isBoosterPlayable(cell, boosterType) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].blocksBooster(cell, boosterType)) {
                return false;
            }
        }
        return this.hasGameElement(cell);
    }
    /**
     * Boosters can interact only on game elements
     * If you apply booster on an empty background cell it will not trigger it
     */
    hasGameElement(cell) {
        return this.layers.some((layer) => layer.hasGameElement(cell));
    }
    /**
     * If the cell has a blast layer gem on it
     */
    hasBlastLayerGem(cell) {
        return this.getBlastLayerGem(cell) != null;
    }
    /**
     * If the cell is currently moving by gravity
     */
    isGravityMovingCell(cell) {
        return this.locker.hasLockReason(cell, 'GravityMove');
    }
    /**
     * If the cell is currently moving by gravity by other generators
     */
    isGravityMovingCellByOtherGenerators(cell, currentGeneratorId) {
        return this.locker.hasLockReasonByOtherGenerators(cell, currentGeneratorId, 'GravityMove');
    }
    /**
     * Whether this cell can be moved by gravity
     */
    isGravityMovableCell(cell) {
        return (this.hasBack(cell) &&
            !this.isMoveBlocked(cell) &&
            !this.locker.hasLockReason(cell, 'Blast') &&
            !this.locker.hasLockReason(cell, 'Swap') &&
            !this.locker.hasLockReason(cell, 'Merge') &&
            !this.locker.hasLockReason(cell, 'ClearCell'));
    }
    /**
     * Whether gravity can move gem to this cell
     */
    isGravityLandingCell(cell) {
        return this.isEmptyCell(cell) && this.isGravityMovableCell(cell);
    }
    getGem(cell) {
        return this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).get(cell);
    }
    getBlastLayerGem(cell) {
        return this.getLayer(BoardTypes_1.LevelGridItemKey.Blast).get(cell);
    }
    /**
     * Gem is removed from the data, but view moved to the target cell
     * Used for cases like when you need to merge four gems into the line bomb
     */
    mergeCells(props) {
        const { sourceCells, targetCell, matchId } = props;
        const targetGem = this.getGem(targetCell);
        if (!targetGem) {
            this.logger.error('Not able to merge! Target gem not found!');
            return null;
        }
        const sourceGems = [];
        const kickedItems = [];
        for (const sourceCell of sourceCells) {
            const sourceGem = this.getGem(sourceCell);
            if (!sourceGem) {
                this.logger.error('Not able to merge! Source gem not found!');
                return null;
            }
            const decremented = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).decrementHp(sourceCell);
            if (!decremented || !this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).isKilled(sourceGem)) {
                this.logger.error('Not able to merge! Source gem HP not decremented!');
                return null;
            }
            const removed = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).remove(sourceCell);
            if (!removed) {
                this.logger.error('Not able to merge! Source gem not removed!');
                return null;
            }
            sourceGems.push(structuredClone(sourceGem));
            // continue to kick further
            const kicked = this.kick(sourceCell, { matchId, startLayerKey: BoardTypes_1.LevelGridItemKey.Gem });
            kickedItems.push(...kicked.map((item) => item.layerItem));
        }
        const targetHpDecremented = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).decrementHp(targetCell);
        if (!targetHpDecremented) {
            this.logger.error('Not able to merge! Target gem HP not decremented!');
            return null;
        }
        const targetGemClone = structuredClone(targetGem);
        this.signals.get('onMergeCells').dispatch({ sourceGems, targetGem: targetGemClone, taskId: matchId });
        return { mergedGems: { sourceGems, targetGem: targetGemClone }, kickedItems };
    }
    /**
     * Applied for the blast kind gems (e.g. line bomb, rocket)
     * Removes a blast gem from the grid data and signals to view to animate the blast with the provided data
     */
    blastGem(blastData) {
        const blastLayerGemRemoved = this.getLayer(BoardTypes_1.LevelGridItemKey.Blast).remove(blastData.blastGem);
        if (blastLayerGemRemoved) {
            this.signals.get('onBlastLayerGem').dispatch(blastData);
            return '';
        }
        const blastGemRemoved = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).remove(blastData.blastGem);
        if (blastGemRemoved) {
            return this.triggerBlastGemAnimation(blastData);
        }
        return '';
    }
    triggerBlastGemAnimation(blastData, animationId) {
        const id = animationId || this.generateAnimationId();
        this.signals.get('onBlastGem').dispatch({ ...blastData, animationId: id });
        return id;
    }
    isAnythingAbove(layerKey, cell, exceptLayerKeys) {
        const indexFrom = this.layers.findIndex((layer) => layer.layerName === layerKey) + 1;
        return this.layers.slice(indexFrom).some((coverLayer) => {
            if (exceptLayerKeys?.includes(coverLayer.layerName))
                return false;
            return coverLayer.get(cell);
        });
    }
    isGemCovered(gem) {
        return this.gemsLayer.isCovered(gem);
    }
    /**
     * If swap move can be performed on the provided cells
     */
    isSwapCellsValid(swapCells) {
        if (swapCells.length !== 2)
            return false;
        const [cellA, cellB] = swapCells;
        return ((0, CellsHelpers_1.getCellsDistance)(cellA, cellB) === 1 &&
            (0, CellsHelpers_1.isCellsInLine)(cellA, cellB) &&
            this.isSwappable(cellA, true) &&
            this.isSwappable(cellB, false));
    }
    /**
     * If tap move can be performed on the provided cell
     */
    isClickCellValid(cell) {
        return this.isClickable(cell);
    }
    isComboGem(gem) {
        return this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).isCombo(gem);
    }
    isKilled(layerItem) {
        // @ts-expect-error
        return this.getLayer(layerItem.layerKey).isKilled(layerItem.item);
    }
    hasSomeMove(moveKind = 'all') {
        let moveFound = false;
        const directions = [
            { col: 1, row: 0 },
            { col: 0, row: 1 },
        ];
        this.grid.loop((value, cell) => {
            if (moveKind === 'swap' || moveKind === 'all') {
                moveFound = directions.some((direction) => {
                    const cellB = { col: cell.col + direction.col, row: cell.row + direction.row };
                    return this.hasSwapMove(cell, cellB);
                });
            }
            if (moveFound)
                return true;
            if (moveKind === 'click' || moveKind === 'all') {
                moveFound = this.hasClickMove(cell);
            }
            return moveFound;
        }, true);
        return moveFound;
    }
    /**
     * @returns {Move[]} - all possible moves on the board
     */
    getMoves() {
        const moves = [];
        const directions = [
            { col: 1, row: 0 },
            { col: 0, row: 1 },
        ];
        moves.push(...this.getMovesInDirections(directions));
        return moves;
    }
    getMovesInDirections(directions) {
        const moves = [];
        this.grid.loop((value, cell) => {
            directions.forEach((direction) => {
                const cellB = { col: cell.col + direction.col, row: cell.row + direction.row };
                const swapMove = this.findSwapMove(cell, cellB);
                if (swapMove) {
                    moves.push(swapMove);
                }
                if (direction.col === 1) {
                    const blastMove = this.findBlastMove(cell);
                    if (blastMove) {
                        moves.push(blastMove);
                    }
                }
            });
            return false;
        }, true);
        return moves;
    }
    hasSwapMove(cellA, cellB) {
        const matchIdCounterBefore = this.taskIdCounter;
        const move = this.findSwapMove(cellA, cellB);
        this.taskIdCounter = matchIdCounterBefore;
        return !!move;
    }
    hasClickMove(cell) {
        const matchIdCounterBefore = this.taskIdCounter;
        const move = this.findBlastMove(cell);
        this.taskIdCounter = matchIdCounterBefore;
        return !!move;
    }
    /**
     * Move is found when swapping of two cells results in a match
     */
    findSwapMove(cellA, cellB) {
        if (!this.isSwappable(cellA, true) || !this.isSwappable(cellB, false)) {
            return null;
        }
        let move = null;
        const gemA = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).get(cellA);
        const gemB = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).get(cellB);
        if (!gemA)
            return null;
        this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).swap(cellA, cellB);
        const matchFinders = [this.regularMatcher, this.blastMatcher];
        const swapGems = [gemA, gemB];
        for (const matchFinder of matchFinders) {
            const matches = matchFinder.findMatches([], swapGems);
            if (matches.length) {
                move = { cellA, cellB, matches };
                break;
            }
        }
        this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).swap(cellA, cellB);
        return move;
    }
    findBlastMove(cell) {
        if (!this.isClickable(cell))
            return null;
        const gem = this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).get(cell);
        if (!gem)
            return null;
        const matches = this.blastMatcher.findMatches([gem], []);
        return matches.length ? { cellA: cell, matches } : null;
    }
    /**
     * Returns all the cells which contain the goal items
     */
    getGoalCells() {
        const goalCells = [];
        this.grid.loop((levelGridItem, cell) => {
            Object.entries(levelGridItem).forEach(([layerKey, item]) => {
                const layerItem = this.layersMap[layerKey];
                if (!layerItem)
                    return;
                if (this.progressManager.isActiveGoal({ layerKey: layerKey, item })) {
                    goalCells.push(cell);
                }
            });
            return false;
        }, true);
        return goalCells;
    }
    getLayerItemSize(layerItem) {
        // @ts-expect-error
        return this.layersMap[layerItem.layerKey].getSize(layerItem.item);
    }
    getQuestTargets(item) {
        const targets = [];
        this.layers.forEach((layer) => {
            const questTargets = layer.getQuestTargets(item);
            if (!questTargets)
                return;
            targets.push(...questTargets);
        });
        return targets;
    }
    prepareQuestTargets(questItem, targets) {
        this.layers.forEach((layer) => {
            layer.prepareQuestTargets(questItem, targets);
        });
    }
    consumeQuestItem(questItem, target, taskId) {
        this.layers.forEach((layer) => {
            layer.consumeQuestItem(questItem, target, taskId);
        });
    }
    dispatchStartQuestItem(props) {
        this.signals.get('onStartQuestItem').dispatch(props);
    }
    dispatchBoosterUsed(boosterType) {
        this.signals.get('onBoosterUsed').dispatch(boosterType);
    }
    dispatchPreBoostersWaiting() {
        this.signals.get('onPreBoostersWaiting').dispatch();
    }
    dispatchPreBoosterUsed(preBoosterType) {
        this.signals.get('onPreBoosterUsed').dispatch(preBoosterType);
    }
    /**
     * Shuffles gems on the board
     * Can be useful for the booster or in case of no possible moves on the board
     */
    *shuffleGems(maxAttemptsPerChunk, maxTotalAttempts, maxNoAutoMatchesAttempts) {
        const shuffleData = [];
        yield* this.getLayer(BoardTypes_1.LevelGridItemKey.Gem).shuffle(maxAttemptsPerChunk, maxTotalAttempts, maxNoAutoMatchesAttempts, (data) => {
            shuffleData.push(...data);
        });
        this.signals.get('onShuffleGems').dispatch(shuffleData);
    }
    /**
     * Generated unique entity id for a spawned grid layer entity
     */
    getEntityId() {
        return (this.entityIdCounter++).toString();
    }
    randomizeArray(array) {
        return this.randomGenerator.clone().shuffle(array);
    }
    clone() {
        const signals = new BoardSignals_1.BoardSignals();
        const board = new Board({
            grid: this.grid.clone(),
            config: this.config,
            locker: this.locker.clone(signals),
            spawner: this.spawner.clone(),
            regularMatcher: this.regularMatcher.clone(),
            blastMatcher: this.blastMatcher.clone(),
            randomGenerator: this.randomGenerator.clone(),
            progressManager: this.progressManager.clone(),
            signals,
            layers: this.layers.map((layer) => layer.clone()),
            createCellsKeeper: this.createCellsKeeper,
            logger: this.logger,
        });
        board.entityIdCounter = this.entityIdCounter;
        board.taskIdCounter = this.taskIdCounter;
        board.animationIdCounter = this.animationIdCounter;
        return board;
    }
    destroy() {
        this.signals.clear();
        this.layers.forEach((layer) => layer.destroy());
        this.locker.reset();
        this.grid.reset();
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map