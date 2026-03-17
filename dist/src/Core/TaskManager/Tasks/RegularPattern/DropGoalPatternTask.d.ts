import { Task } from '../Task';
export declare class DropGoalPatternTask extends Task<'dropGoalPattern'> {
    readonly name = "dropGoalPattern";
    handleTask(): IterableIterator<void>;
}
