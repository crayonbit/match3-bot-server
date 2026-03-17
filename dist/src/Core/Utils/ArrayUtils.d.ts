/**
 * Shallow array value comparison. Returns TRUE if the array values are identical, FALSE if array values are different.
 * @param array1
 * @param array2
 * @param sort Optionally sort the arrays to ignore index of each element.
 */
export declare function compare<T>(array1: T[], array2: T[], sort?: boolean): boolean;
export declare function includes<T>(array: T[], valueToFind: T): boolean;
export declare function excludes<T>(array: T[], valueToFind: T): boolean;
export declare function intersection<T>(array1: T[], array2: T[]): T[];
export declare function difference<T>(array1: T[], array2: T[]): T[];
export declare function symmetricDifference<T>(array1: T[], array2: T[]): T[];
export declare function range(start: number, end: number, step?: number): number[];
export declare function remove<T>(array: T[], value: T): void;
export declare function last<T>(array: T[]): T | null;
export declare function pickRandom<T>(array: T[]): T | null;
export declare function flatten<T>(arr: T[][][]): T[];
export declare function flatten<T>(arr: T[][]): T[];
export declare function flatten<T>(arr: T[]): T[];
export declare function spreadKeysWithWeights<T>(entries: [T, number][]): T[];
