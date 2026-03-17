import type { CreateBlastMatchParams, LineBombsComboBlastMatch } from '../../MatcherTypes';
import { Pattern } from '../../Pattern';
export declare class LineBombsComboBlastPattern extends Pattern<CreateBlastMatchParams> {
    readonly name = "lineBombsComboBlastPattern";
    tryCreateMatch(params: CreateBlastMatchParams): LineBombsComboBlastMatch | null;
    clone(): LineBombsComboBlastPattern;
}
