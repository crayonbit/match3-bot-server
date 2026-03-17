import type { BoosterType, Gem, IBackItemProps, IBoard, IBootItemProps, ICarpetItemProps, ICoverItemProps, IDoorItemProps, ILevelGoal, LevelGridItemKey } from '../Board/BoardTypes';
import type { IBackLayer, ICarpetLayer, ICoverLayer, IDoorsLayer, IGemsLayer } from '../Board/Layers/LayersTypes';
import type { Cell, Logger } from '../Types';
import { PointLike } from '../Utils/Geom/GeomTypes';
import type { IRandomGenerator } from '../Utils/UtilsTypes';
export type RawGem = RawGemName | ({
    name: RawGemName;
} & unknown);
export type RawComboName = string;
export declare enum RawGemName {
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    F = "f",
    LineBombH = "g2",
    LineBombV = "g4",
    CrossBomb = "g3",
    Rocket = "j",
    Stone_1 = "s1",
    Stone_2 = "s2",
    Stone_3 = "s3",
    Stone_4 = "s4",
    Stone_5 = "s5",
    ColorBomb = "h",
    BigBomb = "g",
    Holder = "ho",
    Acorn = "ac",
    Drop = "dr",
    Cabinet = "cab8",
    Solid_1 = "sol",
    Solid_2 = "sol2",
    Solid_3 = "sol3",
    ColorTray = "ct",
    Vase_1 = "vas1",
    Vase_2 = "vas2",
    Beam = "be",
    Color_Stone_1 = "cs1",
    Color_Stone_2 = "cs2",
    Color_Stone_3 = "cs3",
    Color_Stone_4 = "cs4",
    Color_Stone_5 = "cs5"
}
export declare enum RawGoalName {
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    F = "f",
    LineBomb = "g2",
    Rocket = "j",
    Stone = "s1",
    ColorBomb = "h",
    BigBomb = "g",
    CrossBomb = "g3",
    Carpet = "c1",
    Holder = "ho",
    Acorn = "ac",
    Drop = "dr",
    Cabinet = "cab8",
    Solid = "sol",
    ColorTray = "ct",
    Vase = "vas1",
    Beam = "be",
    ColorStone = "cs1",
    Cover = "cov"
}
export interface IRawGoal {
    name: RawGoalName;
    count: number;
}
export type RawSpawnCounts = Partial<{
    [key in RawGemName]: number;
}>;
export interface IRawSpawn {
    condition: string;
    counts: RawSpawnCounts;
}
export declare enum RawBackName {
    Regular = "z1",
    Boot = "z2",
    DropGoal = "z3",
    Tunnel = "z4"
}
export declare enum RawCarpetName {
    Carpet_1 = "c1",
    Carpet_2 = "c2"
}
export declare enum RawCoverName {
    Cover = "cov"
}
export type RawDoorName = 'dor';
export type RawDoorItemProps = {
    name: RawDoorName;
    hp: number;
    width: number;
    height: number;
    type: RawGemName.A | RawGemName.B | RawGemName.C | RawGemName.D | RawGemName.E | RawGemName.F | RawGemName.Acorn;
};
export interface IRawItem {
    [LevelGridItemKey.Boot]?: IBootItemProps;
    [LevelGridItemKey.Back]?: RawBackName;
    [LevelGridItemKey.Carpet]?: RawCarpetName;
    [LevelGridItemKey.Gem]?: RawGem;
    [LevelGridItemKey.Cover]?: RawCoverName;
    [LevelGridItemKey.Door]?: RawDoorItemProps;
    spawns?: IRawSpawn[];
    predefined?: RawGemName[];
    spawnMarker?: boolean;
    spawnMarkerItems?: RawGemName[];
}
export interface IRawLevel {
    v: number;
    moves: number;
    difficulty: Difficulty;
    goals: IRawGoal[];
    spawns: IRawSpawn[];
    combos: IRawCombo[];
    grid: IRawItem[][];
    tutorialCommands?: TutorialCommand[];
}
export declare enum Difficulty {
    Normal = "normal",
    Hard = "hard",
    SuperHard = "superHard"
}
export type TutorialHighlightElementsSelectArgs = {
    topViews: string[];
    topGoals: RawGoalName[];
};
export type TutorialHighlightElementsDeselectArgs = {
    topViews: string[];
    topGoals: RawGoalName[];
};
export type TutorialBoardOverlayShowArgs = {
    topCells: Cell[];
    topGems: RawGemName[];
};
export type TutorialHandShowArgs = {
    handType: HandType;
    cells: [Cell, Cell];
};
export type TutorialArrowShowArgs = {
    arrowType: ArrowType;
    position: TutorialPosition;
    targetView: string;
    offset: PointLike;
    direction: ArrowDirection;
};
export declare enum MoveType {
    Any = "Any",
    Swap = "Swap",
    Click = "Click"
}
export type TutorialWaitingHandlerMoveArgs = {
    topCells: Cell[];
    moveType: MoveType;
};
export declare enum ArrowDirection {
    Up = "Up",
    Right = "Right",
    Down = "Down",
    Left = "Left"
}
export declare enum HandType {
    ClickCell = "ClickCell",
    SwapCells = "SwapCells"
}
export declare enum ArrowType {
    TargetView = "TargetView",
    Position = "Position"
}
export declare enum ScreenAnchor {
    TopLeft = "TopLeft",
    TopMiddle = "TopMiddle",
    TopRight = "TopRight",
    RightMiddle = "RightMiddle",
    BottomRight = "BottomRight",
    BottomMiddle = "BottomMiddle",
    BottomLeft = "BottomLeft",
    LeftMiddle = "LeftMiddle",
    Center = "Center"
}
export type TutorialPosition = {
    x: number;
    y: number;
    screenAnchor: ScreenAnchor;
};
export type TutorialDialogShowArgs = {
    dialogName: DialogName;
    position: TutorialPosition;
    text: string;
};
export declare enum DialogName {
    DialogA = "DialogA",
    DialogB = "DialogB",
    DialogC = "DialogC",
    DialogD = "DialogD",
    DialogE = "DialogE",
    DialogF = "DialogF"
}
export type TutorialDialogChangeTextArgs = {
    text: string;
};
export type TutorialDialogMoveToArgs = {
    position: TutorialPosition;
};
export type TutorialWaitingHandleBoosterUsedArgs = {
    type: BoosterType;
    cells: Cell[];
};
export type TutorialWaitingHandlerClickArgs = {
    viewName: string;
};
export type TutorialWaitingHandlerTimeArgs = {
    time: number;
};
export type TutorialCommandArgs = TutorialHighlightElementsSelectArgs | TutorialHighlightElementsDeselectArgs | TutorialBoardOverlayShowArgs | TutorialHandShowArgs | TutorialWaitingHandlerTimeArgs | TutorialWaitingHandleBoosterUsedArgs | TutorialWaitingHandlerClickArgs | TutorialWaitingHandlerMoveArgs | TutorialDialogShowArgs | TutorialDialogChangeTextArgs | TutorialDialogMoveToArgs;
type TutorialCommandMap<ObjectName extends string, MethodName extends string, Args extends TutorialCommandArgs | null> = {
    id: number;
    objectName: ObjectName;
    methodName: MethodName;
    args: Args;
    note: string;
};
export type TutorialCommand = TutorialCommandMap<'screenOverlay', 'show', null> | TutorialCommandMap<'screenOverlay', 'hide', null> | TutorialCommandMap<'highlightElements', 'select', TutorialHighlightElementsSelectArgs> | TutorialCommandMap<'highlightElements', 'deselect', TutorialHighlightElementsDeselectArgs> | TutorialCommandMap<'boardOverlay', 'show', TutorialBoardOverlayShowArgs> | TutorialCommandMap<'boardOverlay', 'hide', null> | TutorialCommandMap<'hand', 'show', TutorialHandShowArgs> | TutorialCommandMap<'hand', 'hide', null> | TutorialCommandMap<'arrow', 'show', TutorialArrowShowArgs> | TutorialCommandMap<'arrow', 'hide', null> | TutorialCommandMap<'waitingHandler', 'time', TutorialWaitingHandlerTimeArgs> | TutorialCommandMap<'waitingHandler', 'interaction', null> | TutorialCommandMap<'waitingHandler', 'move', null> | TutorialCommandMap<'waitingHandler', 'boosterUsed', TutorialWaitingHandleBoosterUsedArgs> | TutorialCommandMap<'waitingHandler', 'click', TutorialWaitingHandlerClickArgs> | TutorialCommandMap<'dialog', 'show', TutorialDialogShowArgs> | TutorialCommandMap<'dialog', 'hide', null> | TutorialCommandMap<'dialog', 'changeText', TutorialDialogChangeTextArgs> | TutorialCommandMap<'dialog', 'moveTo', TutorialDialogMoveToArgs>;
export interface IRawCombo {
    name: string;
    variants: RawGemName[];
}
export type BackLayerItemParserProps = {
    createItem: IBackLayer['createItem'];
    logger: Logger;
};
export interface IBackLayerItemParser {
    init(props: BackLayerItemParserProps): void;
    parse(rawItem: RawBackName | undefined): IBackItemProps | null;
}
export type CarpetLayerItemParserProps = {
    createItem: ICarpetLayer['createItem'];
    logger: Logger;
};
export interface ICarpetLayerItemParser {
    init(props: CarpetLayerItemParserProps): void;
    parse(rawItem: RawCarpetName | undefined): ICarpetItemProps | null;
}
export type CoverLayerItemParserProps = {
    createItem: ICoverLayer['createItem'];
    logger: Logger;
};
export interface ICoverLayerItemParser {
    init(props: CoverLayerItemParserProps): void;
    parse(rawItem: RawCoverName | undefined): ICoverItemProps | null;
}
export type DoorsLayerItemParserProps = {
    createItem: IDoorsLayer['createItem'];
    logger: Logger;
};
export interface IDoorsLayerItemParser {
    init(props: DoorsLayerItemParserProps): void;
    parse(rawItem: RawDoorItemProps | undefined): IDoorItemProps | null;
}
export type GemsParserProps = {
    createGem: IGemsLayer['createGem'];
    randomGenerator: IRandomGenerator;
    logger: Logger;
};
export interface IBootLayerItemParser {
    parse(rawItem: IRawItem | undefined): IBootItemProps | null;
}
export interface IGemsLayerItemParser {
    init(props: GemsParserProps): void;
    setCombos(combos: IRawCombo[]): void;
    parse(rawItem: RawGem | undefined, cell: Cell, rawLevel: IRawLevel): Gem | null;
    getCombos(): Record<RawComboName, RawGemName[]>;
    getComboCellsMap(): Record<RawComboName, Cell[]>;
    replaceComboGemsTillNoMatch(params: {
        board: IBoard;
        onReplaceGem: (cell: Cell, gem: Gem) => void;
    }): void;
}
export interface IGoalsParser {
    parse(rawGoals: IRawGoal[]): ILevelGoal[];
    export(goals: ILevelGoal[]): IRawGoal[];
}
export interface IRawTreasureBox {
    name: string;
    variants: RawGemName[];
}
export {};
