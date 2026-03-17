import type { Cell } from '../Types';
import type { PointLike } from '../Utils/Geom/GeomTypes';
import type { GravityManagerSignals } from './GravityManagerSignals';
export type GravityManagerMoveGemToCellParams = {
    gemId: string;
    sourceCell: Cell;
    targetCell: Cell;
    justSpawned?: boolean;
};
export type GravityManagerAbruptMoveGemToCellParams = {
    gemId: string;
    cell: Cell;
};
export interface IGravityManager {
    readonly signals: GravityManagerSignals;
    moveGemToCell(params: GravityManagerMoveGemToCellParams): void;
    abruptMoveGemToCell(params: GravityManagerAbruptMoveGemToCellParams): void;
    removeFromGravity(gemId: string): void;
    update(deltaTime: number): void;
    isIdle(): boolean;
}
export type OnGravityMoveProps = {
    gemId: string;
    cellPosition: PointLike;
};
export type OnBounceGemProps = {
    gemId: string;
    cellPosition: PointLike;
};
