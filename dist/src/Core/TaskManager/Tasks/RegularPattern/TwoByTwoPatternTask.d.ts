import { Task } from '../Task';
export declare class TwoByTwoPatternTask extends Task<'twoByTwoPattern'> {
    readonly name = "twoByTwoPattern";
    handleTask(): IterableIterator<void>;
}
