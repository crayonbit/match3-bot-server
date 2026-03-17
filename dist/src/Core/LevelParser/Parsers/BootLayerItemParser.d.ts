import { IBootItemProps } from '../../Board/BoardTypes';
import { IBootLayerItemParser, IRawItem } from '../LevelParserTypes';
export declare class BootLayerItemParser implements IBootLayerItemParser {
    parse(rawItem: IRawItem | undefined): IBootItemProps | null;
}
