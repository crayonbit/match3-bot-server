"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const BoardTypes_1 = require("../../Board/BoardTypes");
const BoardTypeUtils_1 = require("../../Board/BoardTypeUtils");
const GenerateLockId_1 = require("../../Utils/GenerateLockId");
class Task {
    constructor() {
        this.randomGeneratorClone = null;
        this.aggregatedLockReasonsWithTicks = [];
    }
    init(taskParams) {
        const { taskData, board, stepsModel, config } = taskParams;
        this.taskData = taskData;
        this.board = board;
        this.stepsModel = stepsModel;
        this.config = config;
        this.generatorId = taskParams.generatorId;
        return this;
    }
    *execute() {
        this.board.dispatchTaskStarted({ taskName: this.name, taskData: structuredClone(this.taskData) });
        yield* this.handleTask();
        yield* this.postHandleTask();
        this.board.dispatchTaskFinished({ taskName: this.name, taskData: structuredClone(this.taskData) });
    }
    *postHandleTask() {
        const lockIterators = this.aggregatedLockReasonsWithTicks.map((lockReasonWithTicks) => {
            return this.handleLockReasonWithTicks(lockReasonWithTicks);
        });
        yield* this.waitIterators(lockIterators);
    }
    *handleLockReasonWithTicks(lockReasonWithTicks) {
        const hasGravityCheckCell = this.stepsModel.hasGravityCheckCell(lockReasonWithTicks.cell);
        const hasSpawnerCheckCell = this.stepsModel.hasSpawnerCheckCell(lockReasonWithTicks.cell);
        if (hasGravityCheckCell) {
            this.stepsModel.removeGravityCheckCells(lockReasonWithTicks.cell);
        }
        if (hasSpawnerCheckCell) {
            this.stepsModel.removeSpawnerCheckCells(lockReasonWithTicks.cell);
        }
        const lock = this.lockCells([lockReasonWithTicks.cell], lockReasonWithTicks.reason);
        yield* this.waitTicks(lockReasonWithTicks.ticks);
        lock.unlock();
        this.stepsModel.addGravityCheckCells(lockReasonWithTicks.cell);
        this.stepsModel.addSpawnerCheckCells(lockReasonWithTicks.cell);
    }
    replaceCore(props) {
        this.board.replaceGemCore(props);
    }
    createBlastLayerGem(props) {
        this.board.createBlastLayerGem(props);
    }
    blastGem(blastData) {
        const { blastGem } = blastData;
        const animationId = this.board.blastGem(blastData);
        this.kickCell(blastGem);
        this.stepsModel.addGravityCheckCells({ col: blastGem.col, row: blastGem.row });
        this.stepsModel.addSpawnerCheckCells({ col: blastGem.col, row: blastGem.row });
        return animationId;
    }
    triggerBlastGemAnimation(blastData, animationId) {
        return this.board.triggerBlastGemAnimation(blastData, animationId);
    }
    mergeCells(sourceCells, targetCell) {
        const mergeCellsReturn = this.board.mergeCells({ sourceCells, targetCell, matchId: this.taskData.id });
        if (!mergeCellsReturn)
            return;
        const { mergedGems, kickedItems } = mergeCellsReturn;
        this.stepsModel.addGravityCheckCells(sourceCells);
        this.stepsModel.addGravityCheckCells(targetCell);
        this.stepsModel.addSpawnerCheckCells(sourceCells);
        const sourceLayerItems = mergedGems.sourceGems.map((gem) => (0, BoardTypeUtils_1.gemToLayerItem)(gem));
        const targetLayerItem = (0, BoardTypeUtils_1.gemToLayerItem)(mergedGems.targetGem);
        const mergedLayerItems = [...sourceLayerItems, targetLayerItem];
        this.handleProgressItems([...mergedLayerItems, ...kickedItems]);
    }
    removeGem(cell) {
        const removed = this.board.gemsLayer.remove(cell);
        this.stepsModel.addGravityCheckCells(cell);
        this.stepsModel.addSpawnerCheckCells(cell);
        return removed;
    }
    getGem(cell) {
        return this.board.getGem(cell);
    }
    hasEntityOnCell(cell, entityId) {
        return this.board.hasEntityOnCell(cell, entityId);
    }
    getGemsByCoreName(coreName) {
        return this.board.gemsLayer.getGemsByCoreName(coreName);
    }
    kickCell(cell, allowSameMatchDamage = false) {
        const { id } = this.taskData;
        if (!allowSameMatchDamage && this.stepsModel.hasCellDamageMatchId(cell, id))
            return null;
        const kickedItems = this.board.kick(cell, { matchId: id });
        if (!kickedItems.length)
            return null;
        this.stepsModel.setCellDamageMatchId(cell, id);
        const { someKilled, sizeCells, layerItems, sizeUpdated, lockReasonsWithTicks } = this.extractDamagedCellData(kickedItems);
        if (someKilled || sizeUpdated) {
            this.stepsModel.addGravityCheckCells(sizeCells);
            this.stepsModel.addSpawnerCheckCells(sizeCells);
            this.aggregatedLockReasonsWithTicks.push(...lockReasonsWithTicks);
        }
        else {
            this.stepsModel.addBlastMatchCheckCells(cell);
        }
        this.handleProgressItems(layerItems);
        return kickedItems;
    }
    kickCellBelowLayer(cell, belowLayer) {
        const kickedItems = this.board.kick(cell, { startLayerKey: belowLayer, matchId: this.taskData.id });
        if (!kickedItems.length)
            return;
        this.handleProgressItems(kickedItems.map((kickedItem) => kickedItem.layerItem));
    }
    hitCell(cell, sourceGem) {
        const { id } = this.taskData;
        if (this.stepsModel.hasCellDamageMatchId(cell, id))
            return;
        const hitItems = this.board.hit(cell, { matchId: id, sourceGem });
        if (!hitItems.length)
            return;
        this.stepsModel.setCellDamageMatchId(cell, id);
        const { someKilled, sizeCells, layerItems, sizeUpdated, lockReasonsWithTicks } = this.extractDamagedCellData(hitItems);
        if (someKilled || sizeUpdated) {
            this.stepsModel.addGravityCheckCells(sizeCells);
            this.stepsModel.addSpawnerCheckCells(sizeCells);
            this.aggregatedLockReasonsWithTicks.push(...lockReasonsWithTicks);
        }
        this.handleProgressItems(layerItems);
    }
    extractDamagedCellData(items) {
        let someKilled = false;
        const sizeCells = [];
        const hitLayerItems = [];
        const lockReasonsWithTicks = [];
        let sizeUpdated = false;
        items.forEach((item) => {
            if (item.killed) {
                someKilled = true;
            }
            sizeCells.push(...item.sizeCells);
            hitLayerItems.push(item.layerItem);
            if (item.sizeUpdated) {
                sizeUpdated = true;
            }
            if (item.lockReasonsWithTicks) {
                lockReasonsWithTicks.push(...item.lockReasonsWithTicks);
            }
        });
        return { someKilled, sizeCells, layerItems: hitLayerItems, sizeUpdated, lockReasonsWithTicks };
    }
    changeGem(props) {
        this.replaceCore(props);
        this.kickCellBelowLayer(props.cell, BoardTypes_1.LevelGridItemKey.Gem);
    }
    /**
     * Once gem is created, it is invincible for a few ticks.
     */
    *yieldGemBirthInvincibility(gem) {
        this.modifyGem(gem, { core: { ...gem.core, invincible: true } });
        yield* this.waitTicks(10);
        this.modifyGem(gem, { core: { ...gem.core, invincible: false } });
    }
    modifyGem(gem, change) {
        this.board.gemsLayer.modifyItem(gem, change);
    }
    handleProgressItems(layerItems) {
        layerItems.forEach((layerItem) => {
            const questTargets = this.board.getQuestTargets(layerItem);
            if (questTargets?.length > 0) {
                this.board.prepareQuestTargets(layerItem, questTargets);
                this.stepsModel.addQuestItemWithTargets({ questItem: layerItem, targets: questTargets });
                if (questTargets.some((target) => target.skipGoalCollection)) {
                    return;
                }
            }
            this.board.progressManager.tryCollectGoal(layerItem, {
                generatorId: this.generatorId,
                generatorStarter: this.stepsModel.getTickGeneratorStarter(),
            });
        });
    }
    consumeQuestItem(questItem, target) {
        this.board.consumeQuestItem(questItem, target, this.taskData.id);
    }
    triggerBlast(cell) {
        this.stepsModel.addBlastMatchCheckCells(cell);
    }
    isKilled(layerItem) {
        return this.board.isKilled(layerItem);
    }
    dispatchStartQuestItem(props) {
        this.board.signals.get('onStartQuestItem').dispatch(props);
    }
    lockCells(cells, reason, meta) {
        const lockId = (0, GenerateLockId_1.generateLockId)();
        cells.forEach((cell) => {
            this.board.locker.addLock(cell, { generatorId: this.generatorId, reason, uniqueId: lockId, meta });
        });
        return {
            unlock: () => {
                this.unlockCells(cells, reason, lockId, meta);
            },
        };
    }
    unlockCells(cells, reason, lockId, meta) {
        cells.forEach((cell) => {
            this.board.locker.removeLock(cell, { generatorId: this.generatorId, reason, uniqueId: lockId, meta });
        });
    }
    hasLockReasons(cell) {
        return this.board.locker.hasLockReasons(cell);
    }
    isAnythingAbove(layerKey, cell, exceptLayerKeys) {
        return this.board.isAnythingAbove(layerKey, cell, exceptLayerKeys);
    }
    isGemCovered(gem) {
        return this.board.gemsLayer.isCovered(gem);
    }
    pickRandomItem(items) {
        this.randomGeneratorClone = this.randomGeneratorClone || this.board.randomGenerator.clone();
        return this.randomGeneratorClone.pick(items);
    }
    /** Returns a random real number between 0 and 1 */
    getRandomFraction() {
        this.randomGeneratorClone = this.randomGeneratorClone || this.board.randomGenerator.clone();
        return this.randomGeneratorClone.frac();
    }
    getRandomInt(min, max) {
        this.randomGeneratorClone = this.randomGeneratorClone || this.board.randomGenerator.clone();
        return this.randomGeneratorClone.integerInRange(min, max);
    }
    getGridSize() {
        return { cols: this.board.grid.getCols(), rows: this.board.grid.getRows() };
    }
    getBoardPlayableCells() {
        const cells = [];
        this.board.grid.loop((item, cell) => {
            const cellWithBack = this.board.hasBack(cell);
            if (cellWithBack) {
                cells.push(cell);
            }
            return false;
        });
        return cells;
    }
    hasBack(cell) {
        return this.board.hasBack(cell);
    }
    *shuffleGems(maxAttemptsPerChunk, maxTotalAttempts, maxNoAutoMatchesAttempts) {
        yield* this.board.shuffleGems(maxAttemptsPerChunk, maxTotalAttempts, maxNoAutoMatchesAttempts);
    }
    *waitTicks(yields) {
        for (let i = 0; i < yields; i++) {
            yield;
        }
    }
    *waitIterators(iterators) {
        while (iterators.length > 0) {
            let i = 0;
            while (i < iterators.length) {
                const iterator = iterators[i];
                if (iterator.next().done) {
                    iterators.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            yield;
        }
    }
    randomizeArray(array) {
        return this.board.randomizeArray(array);
    }
    onBoosterUsed(boosterType) {
        this.board.dispatchBoosterUsed(boosterType);
    }
    onPreBoostersWaiting() {
        this.board.dispatchPreBoostersWaiting();
    }
    onPreBoosterUsed(preBoosterType) {
        this.board.dispatchPreBoosterUsed(preBoosterType);
    }
    logError(...message) {
        this.board.logger.error(...message);
    }
    getTaskData() {
        return this.taskData;
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map