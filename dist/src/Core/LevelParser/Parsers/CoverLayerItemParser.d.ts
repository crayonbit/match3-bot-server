import { ICoverItemProps } from '../../Board/BoardTypes';
import { CoverLayerItemParserProps, ICoverLayerItemParser, RawCoverName } from '../LevelParserTypes';
export declare class CoverLayerItemParser implements ICoverLayerItemParser {
    private createItem;
    private idCounter;
    init(props: CoverLayerItemParserProps): void;
    parse(rawItem: RawCoverName | undefined): ICoverItemProps | null;
    private generateCustomId;
}
