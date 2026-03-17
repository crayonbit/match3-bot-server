import { Task } from '../Task';
/**
 * Swap animation is moving source gem view to the target cell
 * then the task is replacing source gem core with the LineBomb core and moves the source gem view to the original position
 */
export declare class LineBombBigBombComboBlastPatternTask extends Task<'lineBombBigBombComboBlastPattern'> {
    readonly name = "lineBombBigBombComboBlastPattern";
    handleTask(): IterableIterator<void>;
}
