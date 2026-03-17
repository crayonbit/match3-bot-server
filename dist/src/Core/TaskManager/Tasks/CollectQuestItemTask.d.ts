import { Task } from './Task';
export declare class CollectQuestItemTask extends Task<'collectQuestItem'> {
    readonly name = "collectQuestItem";
    handleTask(): IterableIterator<void>;
    private collectQuestItem;
}
