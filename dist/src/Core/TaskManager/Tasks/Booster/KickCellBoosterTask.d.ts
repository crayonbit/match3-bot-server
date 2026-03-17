import { Task } from '../Task';
export declare class KickCellBoosterTask extends Task<'kickCellBooster'> {
    readonly name = "kickCellBooster";
    handleTask(): IterableIterator<void>;
}
