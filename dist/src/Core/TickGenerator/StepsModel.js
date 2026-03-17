"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepsModel = void 0;
const CellsHelpers_1 = require("../Utils/CellsHelpers");
const CellsKeeper_1 = require("../Utils/CellsKeeper");
const MatchesKeeper_1 = require("./StepGenerators/Utils/MatchesKeeper");
class StepsModel {
    constructor(generatorId) {
        this.swapCells = new CellsKeeper_1.CellsKeeper();
        this.clickCell = null;
        this.boosterPlayData = null;
        this.preBoostersPlayData = null;
        this.matchCheckCells = new CellsKeeper_1.CellsKeeper();
        this.blastMatchCheckCells = new CellsKeeper_1.CellsKeeper();
        this.gravityCheckCells = new CellsKeeper_1.CellsKeeper();
        this.spawnerCheckCells = new CellsKeeper_1.CellsKeeper();
        this.matches = new MatchesKeeper_1.MatchesKeeper();
        this.gravityBlockedIds = [];
        this.tickGeneratorStarter = null;
        /**
         * We don't want to have cell damage repeated (e.g. kick, hit) by the same match
         */
        this.cellsDamageMatchIds = new Map();
        this.questItemsWithTargets = [];
        this.generatorId = generatorId;
    }
    addSwapCells(cells) {
        this.swapCells.add(cells);
    }
    getSwapCells() {
        return this.swapCells.getCells();
    }
    getSwapCellsCount() {
        return this.swapCells.getCount();
    }
    clearSwapCells() {
        this.swapCells.clear();
    }
    addClickCell(cell) {
        this.clickCell = cell;
    }
    addBoosterPlayData(data) {
        this.boosterPlayData = data;
    }
    withdrawBoosterPlayData() {
        const data = this.boosterPlayData;
        this.boosterPlayData = null;
        return data;
    }
    addPreBoostersPlayData(data) {
        this.preBoostersPlayData = data;
    }
    withdrawPreBoostersPlayData() {
        const data = this.preBoostersPlayData;
        this.preBoostersPlayData = null;
        return data;
    }
    getClickCell() {
        return this.clickCell;
    }
    clearClickCell() {
        this.clickCell = null;
    }
    addRegularMatchCheckCells(cells) {
        this.matchCheckCells.add(cells);
    }
    removeRegularMatchCheckCells(cells) {
        this.matchCheckCells.delete(cells);
    }
    getRegularMatchCheckCells() {
        return this.matchCheckCells.getCells();
    }
    getRegularMatchCheckCellsCount() {
        return this.matchCheckCells.getCount();
    }
    clearRegularMatchCheckCells() {
        this.matchCheckCells.clear();
    }
    addBlastMatchCheckCells(cells) {
        this.blastMatchCheckCells.add(cells);
    }
    getBlastMatchCheckCells() {
        return this.blastMatchCheckCells.getCells();
    }
    getBlastMatchCheckCellsCount() {
        return this.blastMatchCheckCells.getCount();
    }
    removeBlastMatchCheckCells(cells) {
        this.blastMatchCheckCells.delete(cells);
    }
    clearBlastMatchCheckCells() {
        this.blastMatchCheckCells.clear();
    }
    addGravityCheckCells(cells) {
        this.gravityCheckCells.add(cells);
    }
    getGravityCheckCells() {
        return this.gravityCheckCells.getCells();
    }
    hasGravityCheckCell(cell) {
        return this.gravityCheckCells.has(cell);
    }
    getGravityCheckCellsCount() {
        return this.gravityCheckCells.getCount();
    }
    removeGravityCheckCells(cells) {
        this.gravityCheckCells.delete(cells);
    }
    clearGravityCheckCells() {
        this.gravityCheckCells.clear();
    }
    addSpawnerCheckCells(cells) {
        this.spawnerCheckCells.add(cells);
    }
    getSpawnerCheckCells() {
        return this.spawnerCheckCells.getCells();
    }
    hasSpawnerCheckCell(cell) {
        return this.spawnerCheckCells.has(cell);
    }
    clearSpawnerCheckCells() {
        this.spawnerCheckCells.clear();
    }
    removeSpawnerCheckCells(cells) {
        this.spawnerCheckCells.delete(cells);
    }
    addMatches(matches) {
        this.matches.add(matches);
    }
    getMatches() {
        return this.matches.getAll();
    }
    getMatchesCount() {
        return this.matches.getLength();
    }
    clearMatches() {
        this.matches.clear();
    }
    removeMatches(matchesIds) {
        this.matches.remove(matchesIds);
    }
    addGravityBlockedMatchesIds(ids) {
        this.gravityBlockedIds.push(...ids);
    }
    getGravityBlockedMatchesIds() {
        return this.gravityBlockedIds;
    }
    clearGravityBlockedMatchesIds() {
        this.gravityBlockedIds.length = 0;
    }
    /**
     * Set match id for the cell to prevent damage (e.g. kick, hit) from the same match
     */
    setCellDamageMatchId(cell, matchId) {
        const cellHash = (0, CellsHelpers_1.cellToHash)(cell);
        if (!this.cellsDamageMatchIds.has(cellHash)) {
            this.cellsDamageMatchIds.set(cellHash, new Set());
        }
        this.cellsDamageMatchIds.get(cellHash).add(matchId);
    }
    hasCellDamageMatchId(cell, matchId) {
        const cellHash = (0, CellsHelpers_1.cellToHash)(cell);
        return this.cellsDamageMatchIds.has(cellHash) && this.cellsDamageMatchIds.get(cellHash).has(matchId);
    }
    addQuestItemWithTargets(questItem) {
        this.questItemsWithTargets.push(questItem);
    }
    withdrawQuestItemsWithTargets() {
        const questItemsWithTargets = [...this.questItemsWithTargets];
        this.questItemsWithTargets.length = 0;
        return questItemsWithTargets;
    }
    setTickGeneratorStarter(starter) {
        this.tickGeneratorStarter = starter;
    }
    getTickGeneratorStarter() {
        return this.tickGeneratorStarter;
    }
    clone() {
        const stepsData = new StepsModel(this.generatorId);
        stepsData.addSwapCells(this.getSwapCells());
        stepsData.addRegularMatchCheckCells(this.getRegularMatchCheckCells());
        stepsData.addMatches(this.getMatches());
        stepsData.addBlastMatchCheckCells(this.getBlastMatchCheckCells());
        stepsData.addSpawnerCheckCells(this.getSpawnerCheckCells());
        stepsData.addGravityBlockedMatchesIds(this.getGravityBlockedMatchesIds());
        stepsData.tickGeneratorStarter = this.tickGeneratorStarter;
        // @ts-expect-error
        stepsData.cellsDamageMatchIds = new Map();
        Array.from(this.cellsDamageMatchIds.entries()).forEach(([cellHash, matchIds]) => {
            stepsData.cellsDamageMatchIds.set(cellHash, new Set(matchIds));
        });
        stepsData.questItemsWithTargets = structuredClone(this.questItemsWithTargets);
        return stepsData;
    }
}
exports.StepsModel = StepsModel;
//# sourceMappingURL=StepsModel.js.map