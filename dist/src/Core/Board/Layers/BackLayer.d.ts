import { Cell } from '../../Types';
import { IBackItemProps, LevelGridItemKey } from '../BoardTypes';
import { Layer } from './Layer';
import { IBackLayer } from './LayersTypes';
export declare class BackLayer extends Layer<LevelGridItemKey.Back> implements IBackLayer {
    private dropGoalsPresent;
    constructor();
    onLevelLoad(): void;
    createItem(props: Partial<IBackItemProps>, customId?: string): IBackItemProps;
    isKilled(item: IBackItemProps): boolean;
    hasGameElement(cell: Cell): boolean;
    hasDropGoal(cell: Cell): boolean;
    hasDropGoals(): boolean;
    isTunnel(cell: Cell): boolean;
    clone(): IBackLayer;
}
