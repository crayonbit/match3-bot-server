import { IBoard } from '../../../Board/BoardTypes';
import { TargetCell, TargetCellItem } from '../../../Matcher/MatcherTypes';
import { Cell, CoreConfig } from '../../../Types';
import { Task } from '../Task';
type BlastRocketProps = {
    config: Pick<CoreConfig, 'rocketBlastCellTicks' | 'minRocketBlastTicks' | 'rocketBlastCrossCellsTicks' | 'tickDurationMs'>;
    targetCellItems: TargetCellItem[];
    canChangeTargetCell: boolean;
    sourceCell: Cell;
    lockCells: Task<'rocketBlastPattern'>['lockCells'];
    waitTicks: Task<'rocketBlastPattern'>['waitTicks'];
    kickCell: Task<'rocketBlastPattern'>['kickCell'];
    waitIterators: Task<'rocketBlastPattern'>['waitIterators'];
    hasEntityOnCell: IBoard['hasEntityOnCell'];
    blastGem: (props: {
        duration: number;
        targetCells: TargetCell[];
        animationId?: string;
    }) => string;
    triggerBlastGemAnimation: (props: {
        duration: number;
        targetCells: TargetCell[];
        animationId?: string;
    }) => string;
    onCulminateKickDistanceCell: (targetCell: TargetCell) => void;
    findNewTargetCellItem: () => TargetCellItem | null;
};
export declare class BlastRocket {
    private readonly config;
    private readonly lockCells;
    private readonly kickCell;
    private readonly waitTicks;
    private readonly waitIterators;
    private readonly blastGem;
    private readonly triggerBlastGemAnimation;
    private readonly onCulminateKickDistanceCell;
    private readonly hasEntityOnCell;
    private readonly findNewTargetCellItem;
    private readonly sourceCell;
    private readonly targetCells;
    private canChangeTargetCell;
    private targetCellItem;
    private nearbyTargetCells;
    private crossKickUnlock;
    private blastUnlock;
    private ticksToWait;
    private distantCellKicked;
    private blastAnimationId;
    constructor(props: BlastRocketProps);
    private separateTargetCells;
    private tryKickNearbyCells;
    private tryCulminateKickNearbyCells;
    private beginDistantCellKick;
    private calculateTicksToWait;
    private culminateDistantCellKick;
    handleTask(): IterableIterator<void>;
    isDistantCellKicked(): boolean;
}
export {};
