import { IBoard, ILevel } from '../Board/BoardTypes';
import { IBackLayerItemParser, IBootLayerItemParser, ICarpetLayerItemParser, ICoverLayerItemParser, IDoorsLayerItemParser, IGemsLayerItemParser, IGoalsParser, IRawLevel } from './LevelParserTypes';
type LevelParserProps = {
    board: IBoard;
    bootLayerItemParser: IBootLayerItemParser;
    backLayerItemParser: IBackLayerItemParser;
    carpetLayerItemParser: ICarpetLayerItemParser;
    gemsLayerItemParser: IGemsLayerItemParser;
    coverLayerItemParser: ICoverLayerItemParser;
    doorsLayerItemParser: IDoorsLayerItemParser;
    goalsParser: IGoalsParser;
};
export declare class LevelParser {
    /**
     * Board instance which is used exclusively for preparing a parsed level
     */
    private readonly testBoard;
    private readonly bootLayerItemParser;
    private readonly backLayerItemParser;
    private readonly carpetLayerItemParser;
    private readonly gemsLayerItemParser;
    private readonly coverLayerItemParser;
    private readonly doorsLayerItemParser;
    private readonly goalsParser;
    constructor(props: LevelParserProps);
    parse(rawLevel: IRawLevel): ILevel;
}
export {};
