"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogName = exports.ScreenAnchor = exports.ArrowType = exports.HandType = exports.ArrowDirection = exports.MoveType = exports.Difficulty = exports.RawCoverName = exports.RawCarpetName = exports.RawBackName = exports.RawGoalName = exports.RawGemName = void 0;
var RawGemName;
(function (RawGemName) {
    RawGemName["A"] = "a";
    RawGemName["B"] = "b";
    RawGemName["C"] = "c";
    RawGemName["D"] = "d";
    RawGemName["E"] = "e";
    RawGemName["F"] = "f";
    RawGemName["LineBombH"] = "g2";
    RawGemName["LineBombV"] = "g4";
    RawGemName["CrossBomb"] = "g3";
    RawGemName["Rocket"] = "j";
    RawGemName["Stone_1"] = "s1";
    RawGemName["Stone_2"] = "s2";
    RawGemName["Stone_3"] = "s3";
    RawGemName["Stone_4"] = "s4";
    RawGemName["Stone_5"] = "s5";
    RawGemName["ColorBomb"] = "h";
    RawGemName["BigBomb"] = "g";
    RawGemName["Holder"] = "ho";
    RawGemName["Acorn"] = "ac";
    RawGemName["Drop"] = "dr";
    RawGemName["Cabinet"] = "cab8";
    RawGemName["Solid_1"] = "sol";
    RawGemName["Solid_2"] = "sol2";
    RawGemName["Solid_3"] = "sol3";
    RawGemName["ColorTray"] = "ct";
    RawGemName["Vase_1"] = "vas1";
    RawGemName["Vase_2"] = "vas2";
    RawGemName["Beam"] = "be";
    RawGemName["Color_Stone_1"] = "cs1";
    RawGemName["Color_Stone_2"] = "cs2";
    RawGemName["Color_Stone_3"] = "cs3";
    RawGemName["Color_Stone_4"] = "cs4";
    RawGemName["Color_Stone_5"] = "cs5";
})(RawGemName || (exports.RawGemName = RawGemName = {}));
var RawGoalName;
(function (RawGoalName) {
    RawGoalName["A"] = "a";
    RawGoalName["B"] = "b";
    RawGoalName["C"] = "c";
    RawGoalName["D"] = "d";
    RawGoalName["E"] = "e";
    RawGoalName["F"] = "f";
    RawGoalName["LineBomb"] = "g2";
    RawGoalName["Rocket"] = "j";
    RawGoalName["Stone"] = "s1";
    RawGoalName["ColorBomb"] = "h";
    RawGoalName["BigBomb"] = "g";
    RawGoalName["CrossBomb"] = "g3";
    RawGoalName["Carpet"] = "c1";
    RawGoalName["Holder"] = "ho";
    RawGoalName["Acorn"] = "ac";
    RawGoalName["Drop"] = "dr";
    RawGoalName["Cabinet"] = "cab8";
    RawGoalName["Solid"] = "sol";
    RawGoalName["ColorTray"] = "ct";
    RawGoalName["Vase"] = "vas1";
    RawGoalName["Beam"] = "be";
    RawGoalName["ColorStone"] = "cs1";
    RawGoalName["Cover"] = "cov";
})(RawGoalName || (exports.RawGoalName = RawGoalName = {}));
var RawBackName;
(function (RawBackName) {
    RawBackName["Regular"] = "z1";
    RawBackName["Boot"] = "z2";
    RawBackName["DropGoal"] = "z3";
    RawBackName["Tunnel"] = "z4";
})(RawBackName || (exports.RawBackName = RawBackName = {}));
var RawCarpetName;
(function (RawCarpetName) {
    RawCarpetName["Carpet_1"] = "c1";
    RawCarpetName["Carpet_2"] = "c2";
})(RawCarpetName || (exports.RawCarpetName = RawCarpetName = {}));
var RawCoverName;
(function (RawCoverName) {
    RawCoverName["Cover"] = "cov";
})(RawCoverName || (exports.RawCoverName = RawCoverName = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty["Normal"] = "normal";
    Difficulty["Hard"] = "hard";
    Difficulty["SuperHard"] = "superHard";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
var MoveType;
(function (MoveType) {
    MoveType["Any"] = "Any";
    MoveType["Swap"] = "Swap";
    MoveType["Click"] = "Click";
})(MoveType || (exports.MoveType = MoveType = {}));
var ArrowDirection;
(function (ArrowDirection) {
    ArrowDirection["Up"] = "Up";
    ArrowDirection["Right"] = "Right";
    ArrowDirection["Down"] = "Down";
    ArrowDirection["Left"] = "Left";
})(ArrowDirection || (exports.ArrowDirection = ArrowDirection = {}));
var HandType;
(function (HandType) {
    HandType["ClickCell"] = "ClickCell";
    HandType["SwapCells"] = "SwapCells";
})(HandType || (exports.HandType = HandType = {}));
var ArrowType;
(function (ArrowType) {
    ArrowType["TargetView"] = "TargetView";
    ArrowType["Position"] = "Position";
})(ArrowType || (exports.ArrowType = ArrowType = {}));
var ScreenAnchor;
(function (ScreenAnchor) {
    ScreenAnchor["TopLeft"] = "TopLeft";
    ScreenAnchor["TopMiddle"] = "TopMiddle";
    ScreenAnchor["TopRight"] = "TopRight";
    ScreenAnchor["RightMiddle"] = "RightMiddle";
    ScreenAnchor["BottomRight"] = "BottomRight";
    ScreenAnchor["BottomMiddle"] = "BottomMiddle";
    ScreenAnchor["BottomLeft"] = "BottomLeft";
    ScreenAnchor["LeftMiddle"] = "LeftMiddle";
    ScreenAnchor["Center"] = "Center";
})(ScreenAnchor || (exports.ScreenAnchor = ScreenAnchor = {}));
var DialogName;
(function (DialogName) {
    DialogName["DialogA"] = "DialogA";
    DialogName["DialogB"] = "DialogB";
    DialogName["DialogC"] = "DialogC";
    DialogName["DialogD"] = "DialogD";
    DialogName["DialogE"] = "DialogE";
    DialogName["DialogF"] = "DialogF";
})(DialogName || (exports.DialogName = DialogName = {}));
//# sourceMappingURL=LevelParserTypes.js.map