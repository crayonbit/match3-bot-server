"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickColumnBoosterTask = void 0;
const BoardTypes_1 = require("../../../Board/BoardTypes");
const Task_1 = require("../Task");
class KickColumnBoosterTask extends Task_1.Task {
    constructor() {
        super(...arguments);
        this.name = 'kickColumnBooster';
    }
    *handleTask() {
        this.onBoosterUsed(BoardTypes_1.BoosterType.KickColumn);
        const { cell } = this.taskData;
        const { kickColumnBoosterDelayTicks, kickColumnBoosterDirection, kickColumnBoosterIntervalTicks, kickColumnBoosterIncludeMaxRows, kickColumnBoosterFinalDelayTicks, } = this.config;
        const columnCells = new Array(this.getGridSize().rows).fill(0).map((value, row) => {
            return { col: cell.col, row };
        });
        const lock = this.lockCells(columnCells, 'Blast');
        if (kickColumnBoosterDelayTicks > 0) {
            yield* this.waitTicks(kickColumnBoosterDelayTicks);
        }
        const { maxDesignRows } = this.config;
        const minPlayableRow = this.getMinPlayableRow(cell);
        const maxPlayableRow = this.getMaxPlayableRow(cell);
        const maxRows = kickColumnBoosterIncludeMaxRows ? maxDesignRows + minPlayableRow : maxPlayableRow;
        if (kickColumnBoosterDirection === 0) {
            for (let i = cell.row, j = cell.row; i >= minPlayableRow || j <= maxPlayableRow; i--, j++) {
                if (i >= minPlayableRow) {
                    this.kickCell({ col: cell.col, row: i });
                }
                if (j <= maxPlayableRow && j !== cell.row) {
                    this.kickCell({ col: cell.col, row: j });
                }
                if (kickColumnBoosterIntervalTicks > 0) {
                    yield* this.waitTicks(kickColumnBoosterIntervalTicks);
                }
            }
        }
        else if (kickColumnBoosterDirection < 0) {
            for (let i = maxRows; i >= minPlayableRow; i--) {
                const cellToKick = { col: cell.col, row: i };
                if (this.hasBack(cellToKick)) {
                    this.kickCell(cellToKick);
                }
                if (kickColumnBoosterIntervalTicks > 0) {
                    yield* this.waitTicks(kickColumnBoosterIntervalTicks);
                }
            }
        }
        else {
            for (let i = minPlayableRow; i <= maxRows; i++) {
                const cellToKick = { col: cell.col, row: i };
                if (this.hasBack(cellToKick)) {
                    this.kickCell(cellToKick);
                }
                if (kickColumnBoosterIntervalTicks > 0) {
                    yield* this.waitTicks(kickColumnBoosterIntervalTicks);
                }
            }
        }
        if (kickColumnBoosterFinalDelayTicks > 0) {
            yield* this.waitTicks(kickColumnBoosterFinalDelayTicks);
        }
        lock.unlock();
    }
    getMinPlayableRow(cell) {
        return this.getBoardPlayableCells()
            .filter((c) => c.col === cell.col)
            .map((c) => c.row)
            .reduce((a, b) => Math.min(a, b));
    }
    getMaxPlayableRow(cell) {
        return this.getBoardPlayableCells()
            .filter((c) => c.col === cell.col)
            .map((c) => c.row)
            .reduce((a, b) => Math.max(a, b));
    }
}
exports.KickColumnBoosterTask = KickColumnBoosterTask;
//# sourceMappingURL=KickColumnBoosterTask.js.map