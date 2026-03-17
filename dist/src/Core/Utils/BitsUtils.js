"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIDE_BIT = void 0;
exports.ror8 = ror8;
exports.combineBits8 = combineBits8;
exports.getMasks360Rotated = getMasks360Rotated;
exports.getSideBitMasks360 = getSideBitMasks360;
exports.getSideBitMasks360Mirrored = getSideBitMasks360Mirrored;
exports.getSideBitMasksTransformVariations = getSideBitMasksTransformVariations;
exports.getByteString = getByteString;
exports.containsBits = containsBits;
exports.noBits = noBits;
exports.SIDE_BIT = {
    NONE: 0b00000000,
    L: 0b10000000,
    TL: 0b01000000,
    T: 0b00100000,
    TR: 0b00010000,
    R: 0b00001000,
    BR: 0b00000100,
    B: 0b00000010,
    BL: 0b00000001,
    FULL: 0b11111111,
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
function ror8(byte, shift = 1) {
    return (((byte & 0xff) >>> (shift & 7)) | ((byte << (8 - (shift & 7))) & 0xff)) & 0xff;
}
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
function combineBits8(...masks) {
    return masks.reduce((acc, m) => acc | m, 0) & 0xff; // keep to 8 bits
}
function getMasks360Rotated(...maskBits) {
    const byte = combineBits8(...maskBits);
    return Array(4)
        .fill(byte)
        .map((v, i) => ({ m: ror8(v, i * 2), r: i * 90 }));
}
/**
 * Generate all 8 mask variations: 4 rotations + 4 mirrored rotations
 * This properly handles textures that need both rotation and mirroring
 *
 * Horizontal mirror swaps: L<->R, TL<->TR, BL<->BR (T and B stay the same)
 */
function getSideBitMasks360(...maskBits) {
    const byte = combineBits8(...maskBits);
    const variations = [];
    // Add 4 rotations
    for (let i = 0; i < 4; i++) {
        variations.push({ m: ror8(byte, i * 2), r: i * 90 });
    }
    return variations;
}
function getSideBitMasks360Mirrored(...maskBits) {
    const byte = combineBits8(...maskBits);
    const variations = [];
    // Calculate horizontal mirror
    // L (bit 7) <-> R (bit 3), TL (bit 6) <-> TR (bit 4), BL (bit 0) <-> BR (bit 2)
    const mirroredByte = ((byte & 0b10000000) >> 4) | // L (bit 7) -> R (bit 3)
        ((byte & 0b01000000) >> 2) | // TL (bit 6) -> TR (bit 4)
        ((byte & 0b00100000) >> 0) | // T (bit 5) stays
        ((byte & 0b00010000) << 2) | // TR (bit 4) -> TL (bit 6)
        ((byte & 0b00001000) << 4) | // R (bit 3) -> L (bit 7)
        ((byte & 0b00000100) >> 2) | // BR (bit 2) -> BL (bit 0)
        ((byte & 0b00000010) >> 0) | // B (bit 1) stays
        ((byte & 0b00000001) << 2); // BL (bit 0) -> BR (bit 2)
    // Add 4 mirrored rotations
    for (let i = 0; i < 4; i++) {
        variations.push({ m: ror8(mirroredByte, i * 2), r: i * 90, s: -1 });
    }
    return variations;
}
function getSideBitMasksTransformVariations(...maskBits) {
    return [...getSideBitMasks360(...maskBits), ...getSideBitMasks360Mirrored(...maskBits)];
}
/**
 * Converts a byte number (which in range from 0 to 255) to a string.
 * @param value - The byte number to convert to a string.
 * @returns The byte number as a string.
 */
function getByteString(value) {
    return value.toString(2).padStart(8, '0');
}
/**
 * Checks if the given value contains all the specified bits.
 * @param value - The value to check.
 * @param bits - The bits to check for.
 * @returns True if the value contains all the specified bits, false otherwise.
 */
function containsBits(value, bits) {
    return (value & bits) === bits;
}
function noBits(value, bits) {
    return (value & bits) === 0;
}
//# sourceMappingURL=BitsUtils.js.map