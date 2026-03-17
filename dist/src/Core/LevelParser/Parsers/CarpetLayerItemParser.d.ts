import { ICarpetItemProps } from '../../Board/BoardTypes';
import { CarpetLayerItemParserProps, ICarpetLayerItemParser, RawCarpetName } from '../LevelParserTypes';
export declare const rawCarpetNamePropsMap: {
    [key in RawCarpetName]: Omit<ICarpetItemProps, 'id' | 'tilePosition'>;
};
export declare class CarpetLayerItemParser implements ICarpetLayerItemParser {
    private createItem;
    private idCounter;
    init(props: CarpetLayerItemParserProps): void;
    parse(rawItem: RawCarpetName | undefined): ICarpetItemProps | null;
    private generateCustomId;
}
