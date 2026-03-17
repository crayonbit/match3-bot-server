import { Cell, CellHash } from '../Types';
import { ICellsKeeper } from './UtilsTypes';
export declare class CellsKeeper implements ICellsKeeper {
    private cellsHash;
    add(cells: Cell | Cell[]): void;
    delete(cells: Cell | Cell[] | CellHash | CellHash[]): void;
    has(cell: Cell | CellHash): boolean;
    getCells(): Cell[];
    clear(): void;
    getCount(): number;
}
