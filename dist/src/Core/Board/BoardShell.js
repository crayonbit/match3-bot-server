"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardShell = void 0;
const BlastMatcher_1 = require("../Matcher/BlastMatcher");
const BigBombBlastPattern_1 = require("../Matcher/Patterns/Blast/BigBombBlastPattern");
const ColorBombBlastPattern_1 = require("../Matcher/Patterns/Blast/ColorBombBlastPattern");
const CrossBombBlastPattern_1 = require("../Matcher/Patterns/Blast/CrossBombBlastPattern");
const LineBombBlastPattern_1 = require("../Matcher/Patterns/Blast/LineBombBlastPattern");
const LineBombsComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/LineBombsComboBlastPattern");
const RocketBlastPattern_1 = require("../Matcher/Patterns/Blast/RocketBlastPattern");
const CrossRowsPattern_1 = require("../Matcher/Patterns/Regular/CrossRowsPattern");
const FiveInARowPattern_1 = require("../Matcher/Patterns/Regular/FiveInARowPattern");
const FourInARowPattern_1 = require("../Matcher/Patterns/Regular/FourInARowPattern");
const ThreeInARowPattern_1 = require("../Matcher/Patterns/Regular/ThreeInARowPattern");
const TwoByTwoPattern_1 = require("../Matcher/Patterns/Regular/TwoByTwoPattern");
const RegularMatcher_1 = require("../Matcher/RegularMatcher");
const ProgressManager_1 = require("../ProgressManager/ProgressManager");
const ProgressManagerSignals_1 = require("../ProgressManager/ProgressManagerSignals");
const Spawner_1 = require("../Spawner/Spawner");
const CellsKeeper_1 = require("../Utils/CellsKeeper");
const Board_1 = require("./Board");
const BoardSignals_1 = require("./BoardSignals");
const BoardTypes_1 = require("./BoardTypes");
const CellsLocker_1 = require("./CellsLocker");
const BigBombGemHandler_1 = require("./Gems/BigBombGemHandler");
const ColorBombGemHandler_1 = require("./Gems/ColorBombGemHandler");
const CrossBombGemHandler_1 = require("./Gems/CrossBombGemHandler");
const LineBombGemHandler_1 = require("./Gems/LineBombGemHandler");
const RegularGemHandler_1 = require("./Gems/RegularGemHandler");
const RocketGemHandler_1 = require("./Gems/RocketGemHandler");
const StoneGemHandler_1 = require("./Gems/StoneGemHandler");
const ColorStoneGemHandler_1 = require("./Gems/ColorStoneGemHandler");
const Grid_1 = require("./Grid");
const BackLayer_1 = require("./Layers/BackLayer");
const GemsLayer_1 = require("./Layers/GemsLayer");
const LineBombBigBombComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/LineBombBigBombComboBlastPattern");
const BigBombsComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/BigBombsComboBlastPattern");
const RocketLineBombComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/RocketLineBombComboBlastPattern");
const RocketBigBombComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/RocketBigBombComboBlastPattern");
const RocketsComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/RocketsComboBlastPattern");
const ColorBombLineBombComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/ColorBombLineBombComboBlastPattern");
const ColorBombBigBombComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/ColorBombBigBombComboBlastPattern");
const ColorBombRocketComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/ColorBombRocketComboBlastPattern");
const ColorBombsComboBlastPattern_1 = require("../Matcher/Patterns/ComboBlast/ColorBombsComboBlastPattern");
const CarpetLayer_1 = require("./Layers/CarpetLayer");
const BlastLayer_1 = require("./Layers/BlastLayer");
const HolderGemHandler_1 = require("./Gems/HolderGemHandler");
const GemsLayerProgressHandler_1 = require("../ProgressManager/ProgressHandlers/GemsLayerProgressHandler");
const CarpetLayerProgressHandler_1 = require("../ProgressManager/ProgressHandlers/CarpetLayerProgressHandler");
const AcornGemHandler_1 = require("./Gems/AcornGemHandler");
const CabinetGemHandler_1 = require("./Gems/CabinetGemHandler");
const SolidGemHandler_1 = require("./Gems/SolidGemHandler");
const DoorsLayer_1 = require("./Layers/DoorsLayer");
const ColorTrayGemHandler_1 = require("./Gems/ColorTrayGemHandler");
const VaseGemHandler_1 = require("./Gems/VaseGemHandler");
const DropGemHandler_1 = require("./Gems/DropGemHandler");
const DropGoalPattern_1 = require("../Matcher/Patterns/Regular/DropGoalPattern");
const GoalsPrioritizer_1 = require("../ProgressManager/GoalsPrioritizer");
const BeamGemHandler_1 = require("./Gems/BeamGemHandler");
const CoverLayer_1 = require("./Layers/CoverLayer");
const CoverLayerProgressHandler_1 = require("../ProgressManager/ProgressHandlers/CoverLayerProgressHandler");
class BoardShell extends Board_1.Board {
    constructor(props) {
        const { randomGenerator, progressManager, grid, locker, regularMatcher, blastMatcher, signals, layers, spawner, logger, config, customGemsHandlers, } = props;
        const gemsHandlers = customGemsHandlers || {
            [BoardTypes_1.GemCoreName.Regular]: new RegularGemHandler_1.RegularGemHandler(),
            [BoardTypes_1.GemCoreName.LineBomb]: new LineBombGemHandler_1.LineBombGemHandler(),
            [BoardTypes_1.GemCoreName.CrossBomb]: new CrossBombGemHandler_1.CrossBombGemHandler(),
            [BoardTypes_1.GemCoreName.Rocket]: new RocketGemHandler_1.RocketGemHandler(),
            [BoardTypes_1.GemCoreName.Stone]: new StoneGemHandler_1.StoneGemHandler(),
            [BoardTypes_1.GemCoreName.ColorBomb]: new ColorBombGemHandler_1.ColorBombGemHandler(),
            [BoardTypes_1.GemCoreName.BigBomb]: new BigBombGemHandler_1.BigBombGemHandler(),
            [BoardTypes_1.GemCoreName.Holder]: new HolderGemHandler_1.HolderGemHandler(),
            [BoardTypes_1.GemCoreName.Acorn]: new AcornGemHandler_1.AcornGemHandler(),
            [BoardTypes_1.GemCoreName.Drop]: new DropGemHandler_1.DropGemHandler(),
            [BoardTypes_1.GemCoreName.Cabinet]: new CabinetGemHandler_1.CabinetGemHandler(),
            [BoardTypes_1.GemCoreName.Solid]: new SolidGemHandler_1.SolidGemHandler(),
            [BoardTypes_1.GemCoreName.ColorTray]: new ColorTrayGemHandler_1.ColorTrayGemHandler(),
            [BoardTypes_1.GemCoreName.Vase]: new VaseGemHandler_1.VaseGemHandler(),
            [BoardTypes_1.GemCoreName.Beam]: new BeamGemHandler_1.BeamGemHandler(),
            [BoardTypes_1.GemCoreName.ColorStone]: new ColorStoneGemHandler_1.ColorStoneGemHandler(),
        };
        const goalsPriorizer = props.customGoalsPriorizer ?? new GoalsPrioritizer_1.GoalsPriorizer();
        super({
            grid: grid ?? new Grid_1.Grid(),
            locker: locker ?? new CellsLocker_1.CellsLocker(),
            regularMatcher: regularMatcher ??
                new RegularMatcher_1.RegularMatcher({
                    patterns: [
                        // order matters!
                        new DropGoalPattern_1.DropGoalPattern(),
                        new FiveInARowPattern_1.FiveInARowPattern(),
                        new CrossRowsPattern_1.CrossRowsPattern(),
                        new TwoByTwoPattern_1.TwoByTwoPattern(),
                        new FourInARowPattern_1.FourInARowPattern(),
                        new ThreeInARowPattern_1.ThreeInARowPattern(),
                    ],
                }),
            blastMatcher: blastMatcher ??
                new BlastMatcher_1.BlastMatcher({
                    patterns: [
                        // order matters!
                        new LineBombBigBombComboBlastPattern_1.LineBombBigBombComboBlastPattern(),
                        new LineBombsComboBlastPattern_1.LineBombsComboBlastPattern(),
                        new BigBombsComboBlastPattern_1.BigBombsComboBlastPattern(),
                        new RocketLineBombComboBlastPattern_1.RocketLineBombComboBlastPattern(),
                        new RocketBigBombComboBlastPattern_1.RocketBigBombComboBlastPattern(),
                        new RocketsComboBlastPattern_1.RocketsComboBlastPattern(),
                        new ColorBombLineBombComboBlastPattern_1.ColorBombLineBombComboBlastPattern(),
                        new ColorBombBigBombComboBlastPattern_1.ColorBombBigBombComboBlastPattern(),
                        new ColorBombRocketComboBlastPattern_1.ColorBombRocketComboBlastPattern(),
                        new ColorBombsComboBlastPattern_1.ColorBombsComboBlastPattern(),
                        new RocketBlastPattern_1.RocketBlastPattern(),
                        new LineBombBlastPattern_1.LineBombBlastPattern(),
                        new CrossBombBlastPattern_1.CrossBombBlastPattern(),
                        new ColorBombBlastPattern_1.ColorBombBlastPattern(),
                        new BigBombBlastPattern_1.BigBombBlastPattern(),
                    ],
                }),
            spawner: spawner ?? new Spawner_1.Spawner(),
            logger,
            randomGenerator,
            progressManager: progressManager ??
                new ProgressManager_1.ProgressManager({
                    signals: new ProgressManagerSignals_1.ProgressManagerSignals(),
                    handlers: {
                        [BoardTypes_1.LevelGridItemKey.Gem]: new GemsLayerProgressHandler_1.GemsLayerProgressHandler(),
                        [BoardTypes_1.LevelGridItemKey.Carpet]: new CarpetLayerProgressHandler_1.CarpetLayerProgressHandler(),
                        [BoardTypes_1.LevelGridItemKey.Cover]: new CoverLayerProgressHandler_1.CoverLayerProgressHandler(),
                    },
                    goalsPriorizer,
                }),
            signals: signals ?? new BoardSignals_1.BoardSignals(),
            layers: layers ?? [
                new BackLayer_1.BackLayer(),
                new CarpetLayer_1.CarpetLayer(),
                new GemsLayer_1.GemsLayer(gemsHandlers),
                new CoverLayer_1.CoverLayer(),
                new DoorsLayer_1.DoorsLayer(),
                new BlastLayer_1.BlastLayer(gemsHandlers),
            ],
            createCellsKeeper: () => new CellsKeeper_1.CellsKeeper(),
            config,
        });
    }
}
exports.BoardShell = BoardShell;
//# sourceMappingURL=BoardShell.js.map