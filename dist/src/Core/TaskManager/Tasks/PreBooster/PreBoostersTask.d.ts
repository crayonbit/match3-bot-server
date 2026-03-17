import { Task } from '../Task';
export declare class PreBoostersTask extends Task<'preBoosters'> {
    readonly name = "preBoosters";
    handleTask(): IterableIterator<void>;
}
