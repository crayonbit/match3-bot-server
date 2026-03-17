import { Task } from '../Task';
export declare class ShuffleBoosterTask extends Task<'shuffleBooster'> {
    readonly name = "shuffleBooster";
    handleTask(): IterableIterator<void>;
}
