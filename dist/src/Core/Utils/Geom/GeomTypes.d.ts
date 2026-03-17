import { CreateMutable } from '../../Types';
export interface IPoint extends CreateMutable<PointLike> {
    copyFrom(p: PointLike): this;
    copyTo<T extends IPoint>(p: T): T;
    equals(p: PointLike): boolean;
    set(x?: number, y?: number): void;
    clone(): IPoint;
}
export interface IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    clone(): IRectangle;
    copyFrom(rectangle: IRectangle): IRectangle;
    copyTo(rectangle: IRectangle): IRectangle;
    contains(x: number, y: number): boolean;
}
export type PointLike = {
    readonly x: number;
    readonly y: number;
};
export type Size = {
    readonly width: number;
    readonly height: number;
};
