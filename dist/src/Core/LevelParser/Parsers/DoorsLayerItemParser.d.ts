import { IDoorItemProps } from '../../Board/BoardTypes';
import { DoorsLayerItemParserProps, IDoorsLayerItemParser, RawDoorItemProps } from '../LevelParserTypes';
export declare class DoorsLayerItemParser implements IDoorsLayerItemParser {
    private createItem;
    private readonly rawTypeMap;
    private idCounter;
    init(props: DoorsLayerItemParserProps): void;
    parse(rawItem: RawDoorItemProps | undefined): IDoorItemProps | null;
    private generateCustomId;
}
