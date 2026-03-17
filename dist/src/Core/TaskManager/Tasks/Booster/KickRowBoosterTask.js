"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickRowBoosterTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class KickRowBoosterTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'kickRowBooster';
    }
    *handleTask() {
        this.onBoosterUsed(BoardTypes_1.BoosterType.KickRow);
        const { cell } = this.taskData;
        const { kickRowBoosterDelayTicks, kickRowBoosterDirection, kickRowBoosterIntervalTicks, kickRowBoosterIncludeMaxCols, } = this.config;
        const rowCells = new Array(this.getGridSize().cols).fill(0).map((value, col) => {
            return { col, row: cell.row };
        });
        const lock = this.lockCells(rowCells, 'Blast');
        if (kickRowBoosterDelayTicks > 0) {
            yield* this.waitTicks(kickRowBoosterDelayTicks);
        }
        const { maxDesignCols } = this.config;
        const maxCols = kickRowBoosterIncludeMaxCols ? maxDesignCols : this.getGridSize().cols;
        if (kickRowBoosterDirection === 0) {
            for (let i = cell.col, j = cell.col; i >= 0 || j < maxCols; i--, j++) {
                if (i >= 0) {
                    this.kickCell({ col: i, row: cell.row });
                }
                if (j < this.getGridSize().cols && j !== cell.col) {
                    this.kickCell({ col: j, row: cell.row });
                }
                if (kickRowBoosterIntervalTicks > 0) {
                    yield* this.waitTicks(kickRowBoosterIntervalTicks);
                }
            }
        }
        else if (kickRowBoosterDirection < 0) {
            for (let i = maxCols - 1; i >= 0; i--) {
                const cellToKick = rowCells[i];
                if (cellToKick) {
                    this.kickCell(cellToKick);
                }
                if (kickRowBoosterIntervalTicks > 0) {
                    yield* this.waitTicks(kickRowBoosterIntervalTicks);
                }
            }
        }
        else {
            for (let i = 0; i < maxCols; i++) {
                const cellToKick = rowCells[i];
                if (cellToKick) {
                    this.kickCell(cellToKick);
                }
                if (kickRowBoosterIntervalTicks > 0) {
                    yield* this.waitTicks(kickRowBoosterIntervalTicks);
                }
            }
        }
        lock.unlock();
    }
}
exports.KickRowBoosterTask = KickRowBoosterTask;
//# sourceMappingURL=KickRowBoosterTask.js.map