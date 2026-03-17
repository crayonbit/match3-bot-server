"use strict";
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-exponentiation-operator */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-destructuring */
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomGeneratorPhaser = void 0;
class RandomGeneratorPhaser {
    constructor() {
        this.c = 1;
        this.s0 = 0;
        this.s1 = 0;
        this.s2 = 0;
        this.n = 0;
        this.signs = [-1, 1];
    }
    init(seeds) {
        if (seeds === undefined) {
            seeds = [(Date.now() * Math.random()).toString()];
        }
        if (typeof seeds === 'string') {
            this.state(seeds);
        }
        else {
            this.sow(seeds);
        }
    }
    /**
     * Private random helper.
     */
    rnd() {
        const t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
        this.c = t | 0;
        this.s0 = this.s1;
        this.s1 = this.s2;
        this.s2 = t - this.c;
        return this.s2;
    }
    /**
     * Internal method that creates a seed hash.
     *
     * @param {string} data - The value to hash.
     *
     * @return {number} The hashed value.
     */
    hash(data) {
        let h;
        let n = this.n;
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        this.n = n;
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    }
    /**
     * Reset the seed of the random data generator.
     *
     * _Note_: the seed array is only processed up to the first `undefined` (or `null`) value, should such be present.
     *
     * @param {string[]} seeds - The array of seeds: the `toString()` of each value is used.
     */
    sow(seeds) {
        // Always reset to default seed
        this.n = 0xefc8249d;
        this.s0 = this.hash(' ');
        this.s1 = this.hash(' ');
        this.s2 = this.hash(' ');
        this.c = 1;
        if (!seeds) {
            return;
        }
        // Apply any seeds
        for (let i = 0; i < seeds.length && seeds[i] != null; i++) {
            const seed = seeds[i];
            this.s0 -= this.hash(seed);
            this.s0 += ~~(this.s0 < 0);
            this.s1 -= this.hash(seed);
            this.s1 += ~~(this.s1 < 0);
            this.s2 -= this.hash(seed);
            this.s2 += ~~(this.s2 < 0);
        }
    }
    /**
     * Returns a random integer between 0 and 2^32.
     *
     * @return {number} A random integer between 0 and 2^32.
     */
    integer() {
        // 2^32
        return this.rnd() * 0x100000000;
    }
    /**
     * Returns a random real number between 0 and 1.
     *
     * @return {number} A random real number between 0 and 1.
     */
    frac() {
        // 2^-53
        return this.rnd() + ((this.rnd() * 0x200000) | 0) * 1.1102230246251565e-16;
    }
    /**
     * Returns a random real number between 0 and 2^32.
     *
     * @return {number} A random real number between 0 and 2^32.
     */
    real() {
        return this.integer() + this.frac();
    }
    /**
     * Returns a random integer between and including min and max.
     *
     * @param {number} min - The minimum value in the range.
     * @param {number} max - The maximum value in the range.
     *
     * @return {number} A random number between min and max.
     */
    integerInRange(min, max) {
        return Math.floor(this.realInRange(0, max - min + 1) + min);
    }
    /**
     * Returns a random real number between min and max.
     *
     * @param {number} min - The minimum value in the range.
     * @param {number} max - The maximum value in the range.
     *
     * @return {number} A random number between min and max.
     */
    realInRange(min, max) {
        return this.frac() * (max - min) + min;
    }
    /**
     * Returns a random real number between -1 and 1.
     *
     * @return {number} A random real number between -1 and 1.
     */
    normal() {
        return 1 - 2 * this.frac();
    }
    /**
     * Returns a valid RFC4122 version4 ID hex string from https://gist.github.com/1308368
     *
     * @return {string} A valid RFC4122 version4 ID hex string
     */
    uuid() {
        let a = '';
        let b = '';
        for (b = a = ''; 
        // @ts-ignore
        a++ < 36; 
        // @ts-ignore
        b += ~a % 5 | ((a * 3) & 4) ? (a ^ 15 ? 8 ^ (this.frac() * (a ^ 20 ? 16 : 4)) : 4).toString(16) : '-') {
            // eslint-disable-next-line no-empty
        }
        return b;
    }
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
    pick(array) {
        return array[this.integerInRange(0, array.length - 1)];
    }
    /**
     * Returns a sign to be used with multiplication operator.
     *
     * @return {number} -1 or +1.
     */
    sign() {
        return this.pick(this.signs);
    }
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
    weightedPick(array) {
        return array[~~(Math.pow(this.frac(), 2) * array.length + 0.5)];
    }
    /**
     * Returns a random angle between -180 and 180.
     *
     * @return {number} A random number between -180 and 180.
     */
    angle() {
        return this.integerInRange(-180, 180);
    }
    /**
     * Returns a random rotation in radians, between -3.141 and 3.141
     *
     * @return {number} A random number between -3.141 and 3.141
     */
    rotation() {
        return this.realInRange(-3.1415926, 3.1415926);
    }
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
    state(state) {
        if (typeof state === 'string' && state.match(/^!rnd/)) {
            const stateSplit = state.split(',');
            this.c = parseFloat(stateSplit[1]);
            this.s0 = parseFloat(stateSplit[2]);
            this.s1 = parseFloat(stateSplit[3]);
            this.s2 = parseFloat(stateSplit[4]);
        }
        return ['!rnd', this.c, this.s0, this.s1, this.s2].join(',');
    }
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
    shuffle(array) {
        const len = array.length - 1;
        for (let i = len; i > 0; i--) {
            const randomIndex = Math.floor(this.frac() * (i + 1));
            const itemAtIndex = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = itemAtIndex;
        }
        return array;
    }
    clone() {
        const randomGenerator = new RandomGeneratorPhaser();
        randomGenerator.init(this.state());
        return randomGenerator;
    }
}
exports.RandomGeneratorPhaser = RandomGeneratorPhaser;
//# sourceMappingURL=RandomGeneratorPhaser.js.map