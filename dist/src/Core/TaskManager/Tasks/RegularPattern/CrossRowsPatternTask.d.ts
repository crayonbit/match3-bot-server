import { Task } from '../Task';
export declare class CrossRowsPatternTask extends Task<'crossRowsPattern'> {
    readonly name = "crossRowsPattern";
    handleTask(): IterableIterator<void>;
}
