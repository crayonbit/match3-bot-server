import { MaskAndTransforms } from './UtilsTypes';
export declare const SIDE_BIT: {
    NONE: number;
    L: number;
    TL: number;
    T: number;
    TR: number;
    R: number;
    BR: number;
    B: number;
    BL: number;
    FULL: number;
};
/**
 * Performs an 8-bit right rotation (circular shift) on the given value.
 *
 * - byte: the 8-bit number (only the lowest 8 bits are considered).
 * - shift: how many bits to rotate to the right (default is 1). Only the lowest 3 bits of shift are used (modulo 8).
 *
 * For example:
 *   ror8(0b10000000, 1)  => 0b01000000
 *   ror8(0b00000001, 1)  => 0b10000000
 */
export declare function ror8(byte: number, shift?: number): number;
/**
 * Combines multiple 8-bit masks into a single 8-bit number (bitwise OR).
 * Only the least significant 8 bits of each mask and the result are considered.
 *
 * @param masks - One or more numbers (masks) to combine.
 * @returns A number representing the bitwise OR of all provided masks, masked to 8 bits.
 *
 * Example:
 *   combineBits8(0b00000001, 0b00000010) // => 0b00000011
 */
export declare function combineBits8(...masks: number[]): number;
export declare function getMasks360Rotated(...maskBits: number[]): MaskAndTransforms[];
/**
 * Generate all 8 mask variations: 4 rotations + 4 mirrored rotations
 * This properly handles textures that need both rotation and mirroring
 *
 * Horizontal mirror swaps: L<->R, TL<->TR, BL<->BR (T and B stay the same)
 */
export declare function getSideBitMasks360(...maskBits: number[]): MaskAndTransforms[];
export declare function getSideBitMasks360Mirrored(...maskBits: number[]): MaskAndTransforms[];
export declare function getSideBitMasksTransformVariations(...maskBits: number[]): MaskAndTransforms[];
/**
 * Converts a byte number (which in range from 0 to 255) to a string.
 * @param value - The byte number to convert to a string.
 * @returns The byte number as a string.
 */
export declare function getByteString(value: number): string;
/**
 * Checks if the given value contains all the specified bits.
 * @param value - The value to check.
 * @param bits - The bits to check for.
 * @returns True if the value contains all the specified bits, false otherwise.
 */
export declare function containsBits(value: number, bits: number): boolean;
export declare function noBits(value: number, bits: number): boolean;
