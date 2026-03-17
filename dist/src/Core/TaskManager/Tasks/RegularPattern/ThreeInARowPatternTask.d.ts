import { Task } from '../Task';
export declare class ThreeInARowPatternTask extends Task<'threeInARowPattern'> {
    readonly name = "threeInARowPattern";
    handleTask(): IterableIterator<void>;
}
