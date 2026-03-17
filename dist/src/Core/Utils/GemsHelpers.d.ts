import type { Gem, GemCoreName, IBoard } from '../Board/BoardTypes';
import { Cell } from '../Types';
import { ICellsKeeperReadOnly } from './UtilsTypes';
export declare function isGemsOfOnlyKinds<Kind extends GemCoreName>(gems: (Gem | null)[], kinds: Kind[], ignoredCells?: ICellsKeeperReadOnly): gems is Gem<Kind>[];
export declare function isAllGemsOfKind<Kind extends GemCoreName>(gems: (Gem | null)[], kind: Kind, ignoredCells?: ICellsKeeperReadOnly): gems is Gem<Kind>[];
export declare function getCellsByDistanceToTargeCell<C extends Cell>(cells: C[], targetCell: Cell): Map<number, C[]>;
export declare function isGemOfKind<T extends GemCoreName>(gem: Gem, className: T): gem is Gem<T>;
export declare function assertGemOfKind<T extends GemCoreName>(gem: Gem, className: T): asserts gem is Gem<T>;
export declare function getGemsFromCells(board: {
    getGem: IBoard['getGem'];
}, cells: Cell[]): Gem[];
