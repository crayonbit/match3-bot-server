import { Gem, IBoard, PartialCore } from '../../Board/BoardTypes';
import { Cell, Logger } from '../../Types';
import { GemsParserProps, IGemsLayerItemParser, IRawCombo, IRawLevel, RawComboName, RawGem, RawGemName } from '../LevelParserTypes';
export declare class GemsLayerItemParser implements IGemsLayerItemParser {
    private createGem;
    private readonly maxComboGemReplacementAttempts;
    private randomGenerator;
    private logger;
    private combos;
    private comboCellsMap;
    private idCounter;
    init(props: GemsParserProps): void;
    setCombos(combos: IRawCombo[]): void;
    parse(rawItem: RawGem | undefined, cell: Cell, rawLevel: IRawLevel): Gem | null;
    private handleGemSpecificSpawnConditions;
    /**
     * By design Acorn gems should spawn only if Acorn goals left > Acorn gems on the board,
     * and if designer missed to put this condition from the editor, we should add default condition here.
     */
    private handleAcornSpecificSpawnConditions;
    private createComboGem;
    private getComboGemProps;
    private getGemProps;
    private isRawComboGem;
    getCombos(): Record<RawComboName, RawGemName[]>;
    getComboCellsMap(): Record<RawComboName, Cell[]>;
    replaceComboGemsTillNoMatch(params: {
        board: IBoard;
        onReplaceGem: (cell: Cell, gem: Gem) => void;
    }): void;
    private replaceComboGemTillNoMatch;
    private getRawGemName;
    private generateCustomId;
}
export declare function getRawGemNameByPartialCore(partialCore: PartialCore, logger: Logger): RawGemName;
