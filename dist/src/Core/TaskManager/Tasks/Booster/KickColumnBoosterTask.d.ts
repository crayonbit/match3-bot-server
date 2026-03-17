import { Task } from '../Task';
export declare class KickColumnBoosterTask extends Task<'kickColumnBooster'> {
    readonly name = "kickColumnBooster";
    handleTask(): IterableIterator<void>;
    private getMinPlayableRow;
    private getMaxPlayableRow;
}
