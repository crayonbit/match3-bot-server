"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawGemNamePropsMap = void 0;
const GemsConstants_1 = require("../../Board/Gems/Constants/GemsConstants");
const BoardTypes_1 = require("../../Board/BoardTypes");
const LevelParserTypes_1 = require("../LevelParserTypes");
exports.rawGemNamePropsMap = {
    [LevelParserTypes_1.RawGemName.A]: {
        className: BoardTypes_1.GemCoreName.Regular,
        color: BoardTypes_1.GemColor.a,
    },
    [LevelParserTypes_1.RawGemName.B]: {
        className: BoardTypes_1.GemCoreName.Regular,
        color: BoardTypes_1.GemColor.b,
    },
    [LevelParserTypes_1.RawGemName.C]: {
        className: BoardTypes_1.GemCoreName.Regular,
        color: BoardTypes_1.GemColor.c,
    },
    [LevelParserTypes_1.RawGemName.D]: {
        className: BoardTypes_1.GemCoreName.Regular,
        color: BoardTypes_1.GemColor.d,
    },
    [LevelParserTypes_1.RawGemName.E]: {
        className: BoardTypes_1.GemCoreName.Regular,
        color: BoardTypes_1.GemColor.e,
    },
    [LevelParserTypes_1.RawGemName.F]: {
        className: BoardTypes_1.GemCoreName.Regular,
        color: BoardTypes_1.GemColor.f,
    },
    [LevelParserTypes_1.RawGemName.LineBombH]: {
        className: BoardTypes_1.GemCoreName.LineBomb,
        orientation: 'horizontal',
    },
    [LevelParserTypes_1.RawGemName.LineBombV]: {
        className: BoardTypes_1.GemCoreName.LineBomb,
        orientation: 'vertical',
    },
    [LevelParserTypes_1.RawGemName.Rocket]: {
        className: BoardTypes_1.GemCoreName.Rocket,
    },
    [LevelParserTypes_1.RawGemName.Stone_1]: {
        className: BoardTypes_1.GemCoreName.Stone,
        hp: 1,
    },
    [LevelParserTypes_1.RawGemName.Stone_2]: {
        className: BoardTypes_1.GemCoreName.Stone,
        hp: 2,
    },
    [LevelParserTypes_1.RawGemName.Stone_3]: {
        className: BoardTypes_1.GemCoreName.Stone,
        hp: 3,
    },
    [LevelParserTypes_1.RawGemName.Stone_4]: {
        className: BoardTypes_1.GemCoreName.Stone,
        hp: 4,
    },
    [LevelParserTypes_1.RawGemName.Stone_5]: {
        className: BoardTypes_1.GemCoreName.Stone,
        hp: 5,
    },
    [LevelParserTypes_1.RawGemName.ColorBomb]: {
        className: BoardTypes_1.GemCoreName.ColorBomb,
    },
    [LevelParserTypes_1.RawGemName.BigBomb]: {
        className: BoardTypes_1.GemCoreName.BigBomb,
    },
    [LevelParserTypes_1.RawGemName.Holder]: {
        className: BoardTypes_1.GemCoreName.Holder,
    },
    [LevelParserTypes_1.RawGemName.Acorn]: {
        className: BoardTypes_1.GemCoreName.Acorn,
    },
    [LevelParserTypes_1.RawGemName.Drop]: {
        className: BoardTypes_1.GemCoreName.Drop,
    },
    [LevelParserTypes_1.RawGemName.Cabinet]: {
        className: BoardTypes_1.GemCoreName.Cabinet,
        hp: GemsConstants_1.CabinetMaxHp,
    },
    [LevelParserTypes_1.RawGemName.Solid_1]: {
        className: BoardTypes_1.GemCoreName.Solid,
        hp: 1,
    },
    [LevelParserTypes_1.RawGemName.Solid_2]: {
        className: BoardTypes_1.GemCoreName.Solid,
        hp: 2,
    },
    [LevelParserTypes_1.RawGemName.Solid_3]: {
        className: BoardTypes_1.GemCoreName.Solid,
        hp: 3,
    },
    [LevelParserTypes_1.RawGemName.CrossBomb]: {
        className: BoardTypes_1.GemCoreName.CrossBomb,
    },
    [LevelParserTypes_1.RawGemName.ColorTray]: {
        className: BoardTypes_1.GemCoreName.ColorTray,
        topLeft: BoardTypes_1.GemColor.a,
        topRight: BoardTypes_1.GemColor.b,
        bottomLeft: BoardTypes_1.GemColor.c,
        bottomRight: BoardTypes_1.GemColor.d,
    },
    [LevelParserTypes_1.RawGemName.Vase_1]: {
        className: BoardTypes_1.GemCoreName.Vase,
        hp: 1,
    },
    [LevelParserTypes_1.RawGemName.Vase_2]: {
        className: BoardTypes_1.GemCoreName.Vase,
        hp: 2,
    },
    [LevelParserTypes_1.RawGemName.Beam]: {
        className: BoardTypes_1.GemCoreName.Beam,
    },
    [LevelParserTypes_1.RawGemName.Color_Stone_1]: {
        className: BoardTypes_1.GemCoreName.ColorStone,
        hp: 1,
    },
    [LevelParserTypes_1.RawGemName.Color_Stone_2]: {
        className: BoardTypes_1.GemCoreName.ColorStone,
        hp: 2,
    },
    [LevelParserTypes_1.RawGemName.Color_Stone_3]: {
        className: BoardTypes_1.GemCoreName.ColorStone,
        hp: 3,
    },
    [LevelParserTypes_1.RawGemName.Color_Stone_4]: {
        className: BoardTypes_1.GemCoreName.ColorStone,
        hp: 4,
    },
    [LevelParserTypes_1.RawGemName.Color_Stone_5]: {
        className: BoardTypes_1.GemCoreName.ColorStone,
        hp: 5,
    },
};
//# sourceMappingURL=RawGemNamePropsMap.js.map