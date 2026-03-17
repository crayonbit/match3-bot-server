"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesKeeper = void 0;
class MatchesKeeper {
    constructor() {
        this.matches = [];
    }
    add(matches) {
        this.matches = [...this.matches, ...matches];
    }
    remove(matchesIds) {
        this.matches = this.matches.filter((match) => !matchesIds.includes(match.id));
    }
    getAll() {
        return this.matches.map((match) => ({ ...match }));
    }
    getAllAndClear() {
        const matches = this.getAll();
        this.clear();
        return matches;
    }
    getLength() {
        return this.matches.length;
    }
    clear() {
        this.matches.length = 0;
    }
}
exports.MatchesKeeper = MatchesKeeper;
//# sourceMappingURL=MatchesKeeper.js.map