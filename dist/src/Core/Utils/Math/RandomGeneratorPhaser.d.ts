/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import type { IRandomGenerator } from '../UtilsTypes';
export declare class RandomGeneratorPhaser implements IRandomGenerator {
    private c;
    private s0;
    private s1;
    private s2;
    private n;
    private signs;
    constructor();
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
    init(seeds: string | string[]): void;
    /**
     * Private random helper.
     */
    private rnd;
    /**
     * Internal method that creates a seed hash.
     *
     * @param {string} data - The value to hash.
     *
     * @return {number} The hashed value.
     */
    private hash;
    /**
     * Reset the seed of the random data generator.
     *
     * _Note_: the seed array is only processed up to the first `undefined` (or `null`) value, should such be present.
     *
     * @param {string[]} seeds - The array of seeds: the `toString()` of each value is used.
     */
    private sow;
    /**
     * Returns a random integer between 0 and 2^32.
     *
     * @return {number} A random integer between 0 and 2^32.
     */
    integer(): number;
    /**
     * Returns a random real number between 0 and 1.
     *
     * @return {number} A random real number between 0 and 1.
     */
    frac(): number;
    /**
     * Returns a random real number between 0 and 2^32.
     *
     * @return {number} A random real number between 0 and 2^32.
     */
    real(): number;
    /**
     * Returns a random integer between and including min and max.
     *
     * @param {number} min - The minimum value in the range.
     * @param {number} max - The maximum value in the range.
     *
     * @return {number} A random number between min and max.
     */
    integerInRange(min: number, max: number): number;
    /**
     * Returns a random real number between min and max.
     *
     * @param {number} min - The minimum value in the range.
     * @param {number} max - The maximum value in the range.
     *
     * @return {number} A random number between min and max.
     */
    realInRange(min: number, max: number): number;
    /**
     * Returns a random real number between -1 and 1.
     *
     * @return {number} A random real number between -1 and 1.
     */
    normal(): number;
    /**
     * Returns a valid RFC4122 version4 ID hex string from https://gist.github.com/1308368
     *
     * @return {string} A valid RFC4122 version4 ID hex string
     */
    uuid(): string;
    /**
     * Returns a random element from within the given array.
     *
     * @generic T
     * @genericUse {T[]} - [array]
     * @genericUse {T} - [$return]
     *
     * @param {T[]} array - The array to pick a random element from.
     *
     * @return {T} A random member of the array.
     */
    pick<T>(array: T[]): T;
    /**
     * Returns a sign to be used with multiplication operator.
     *
     * @return {number} -1 or +1.
     */
    sign(): number;
    /**
     * Returns a random element from within the given array, favoring the earlier entries.
     *
     * @generic T
     * @genericUse {T[]} - [array]
     * @genericUse {T} - [$return]
     *
     * @param {T[]} array - The array to pick a random element from.
     *
     * @return {T} A random member of the array.
     */
    weightedPick<T>(array: T[]): T;
    /**
     * Returns a random angle between -180 and 180.
     *
     * @return {number} A random number between -180 and 180.
     */
    angle(): number;
    /**
     * Returns a random rotation in radians, between -3.141 and 3.141
     *
     * @return {number} A random number between -3.141 and 3.141
     */
    rotation(): number;
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
    /**
     * Shuffles the given array, using the current seed.
     *
     * @generic T
     * @genericUse {T[]} - [array,$return]
     *
     * @param {T[]} [array] - The array to be shuffled.
     *
     * @return {T[]} The shuffled array.
     */
    shuffle<T>(array: T[]): T[];
    clone(): IRandomGenerator;
}
