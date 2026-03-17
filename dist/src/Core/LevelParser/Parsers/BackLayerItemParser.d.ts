import { IBackItemProps } from '../../Board/BoardTypes';
import { BackLayerItemParserProps, IBackLayerItemParser, RawBackName } from '../LevelParserTypes';
export declare const rawBackNamePropsMap: {
    [key in RawBackName]: Omit<IBackItemProps, 'id'>;
};
export declare class BackLayerItemParser implements IBackLayerItemParser {
    private createItem;
    private idCounter;
    init(props: BackLayerItemParserProps): void;
    parse(rawItem: RawBackName | undefined): IBackItemProps | null;
    private generateCustomId;
}
