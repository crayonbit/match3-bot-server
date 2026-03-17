"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = compare;
exports.includes = includes;
exports.excludes = excludes;
exports.intersection = intersection;
exports.difference = difference;
exports.symmetricDifference = symmetricDifference;
exports.range = range;
exports.remove = remove;
exports.last = last;
exports.pickRandom = pickRandom;
exports.flatten = flatten;
exports.spreadKeysWithWeights = spreadKeysWithWeights;
/**
 * Shallow array value comparison. Returns TRUE if the array values are identical, FALSE if array values are different.
 * @param array1
 * @param array2
 * @param sort Optionally sort the arrays to ignore index of each element.
 */
function compare(array1, array2, sort = false) {
    if (array1 === array2)
        return true;
    if (array1 == null || array2 == null)
        return false;
    if (array1.length !== array2.length)
        return false;
    if (sort) {
        array1 = array1.concat().sort();
        array2 = array2.concat().sort();
    }
    for (let i = 0; i < array2.length; ++i) {
        if (array1[i] !== array2[i])
            return false;
    }
    return true;
}
function includes(array, valueToFind) {
    return array.indexOf(valueToFind) !== -1;
}
function excludes(array, valueToFind) {
    return !includes(array, valueToFind);
}
function intersection(array1, array2) {
    return array1.filter((x) => includes(array2, x));
}
function difference(array1, array2) {
    return array1.filter((x) => excludes(array2, x));
}
function symmetricDifference(array1, array2) {
    return difference(array1, array2).concat(difference(array2, array1));
}
function range(start, end, step = 1) {
    if (start > end)
        step *= -1;
    const length = Math.floor(Math.abs((end - start) / step)) + 1;
    return Array.from(Array(length), (x, index) => start + index * step);
}
function remove(array, value) {
    array.splice(array.indexOf(value), 1);
}
function last(array) {
    return array.length ? array[array.length - 1] : null;
}
function pickRandom(array) {
    if (!array.length) {
        return null;
    }
    const index = Math.round(Math.random() * (array.length - 1));
    return array[index];
}
function flatten(arr) {
    // @ts-expect-error
    return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)), []);
}
function spreadKeysWithWeights(entries) {
    return entries.reduce((acc, v) => {
        for (let i = 0; i < v[1]; i++) {
            acc.push(v[0]);
        }
        return acc;
    }, []);
}
//# sourceMappingURL=ArrayUtils.js.map