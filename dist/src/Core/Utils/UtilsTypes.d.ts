import type { Cell, CellHash } from '../Types';
export interface IRandomGenerator {
    /**
     * Initialize the state of the random data generator with random seed
     */
    init(): void;
    /**
     * Initialize the state of the random data generator from previously saved state.
     * @param {string} state - Previous state returned from the state method.
     */
    init(state: string): void;
    /**
     * Reset the state of the random data generator with provided seeds.
     * @param {string[]} seeds - The seeds to initialize the random data generator with.
     */
    init(seeds: string[]): void;
    init(seeds?: string | string[]): void;
    /**
     * Returns a random integer between 0 and 2^32.
     * @return A random integer.
     */
    integer(): number;
    /**
     * Returns a random real number between 0 and 1.
     * @return A random real number.
     */
    frac(): number;
    /**
     * Returns a random real number between 0 and 2^32.
     * @return A random real number.
     */
    real(): number;
    /**
     * Returns a random integer between 0 and 2^32.
     *
     * @return {number} A random integer between 0 and 2^32.
     */
    integer(): number;
    /**
     * Returns a random integer between and including min and max.
     * @param min - The minimum value in the range.
     * @param max - The maximum value in the range.
     * @return A random number between min and max.
     */
    integerInRange(min: number, max: number): number;
    /**
     * Returns a random real number between min and max.
     * @param min - The minimum value in the range.
     * @param max - The maximum value in the range.
     * @return A random number between min and max.
     */
    realInRange(min: number, max: number): number;
    /**
     * Returns a random real number between -1 and 1.
     * @return A random real number.
     */
    normal(): number;
    /**
     * Returns a valid RFC4122 version4 ID hex string.
     * @return A valid RFC4122 version4 ID hex string.
     */
    uuid(): string;
    /**
     * Returns a random element from within the given array.
     * @param array - The array to pick a random element from.
     * @return A random member of the array.
     */
    pick<T>(array: T[]): T;
    /**
     * Returns a sign to be used with multiplication operator.
     * @return -1 or +1.
     */
    sign(): number;
    /**
     * Returns a random element from within the given array, favoring the earlier entries.
     * @param array - The array to pick a random element from.
     * @return A random member of the array.
     */
    weightedPick<T>(array: T[]): T;
    /**
     * Shuffles the input array, returning a same shuffled array.
     * @param array - The array to shuffle.
     * @return Mutated shuffled array.
     */
    shuffle<T>(array: T[]): T[];
    /**
     * Gets or Sets the state of the generator. This allows you to retain the values
     * that the generator is using between games, i.e. in a game save file.
     *
     * To seed this generator with a previously saved state you can pass it as the
     * `seed` value in your game config, or call this method directly after Phaser has booted.
     *
     * Call this method with no parameters to return the current state.
     *
     * If providing a state it should match the same format that this method
     * returns, which is a string with a header `!rnd` followed by the `c`,
     * `s0`, `s1` and `s2` values respectively, each comma-delimited.
     *
     * @param {string} [state] - Generator state to be set.
     *
     * @return {string} The current state of the generator.
     */
    state(state?: string): string;
    clone(): IRandomGenerator;
}
export interface ICellsKeeper extends ICellsKeeperReadOnly {
    add(cells: Cell | Cell[]): void;
    delete(cells: Cell | Cell[] | CellHash | CellHash[]): void;
    clear(): void;
}
export interface ICellsKeeperReadOnly {
    has(cell: Cell | CellHash): boolean;
    getCells(): Cell[];
    getCount(): number;
}
export type MaskAndTransforms = {
    m: number;
    r: number;
    s?: number;
};
