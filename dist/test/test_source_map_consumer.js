/*!
 * function run_test() {
 *   for (var k in SOURCE_MAP_TEST_MODULE) {
 *     if (/^test/.test(k)) {
 *       SOURCE_MAP_TEST_MODULE[k](assert);
 *     }
 *   }
 * }
 * 
 * 
 */
var SOURCE_MAP_TEST_MODULE =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test-source-map-consumer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/array-set.js":
/*!**************************!*\
  !*** ./lib/array-set.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./lib/util.js");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap
    ? this._set.size
    : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
      return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error("No element indexed by " + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),

/***/ "./lib/base64-vlq.js":
/*!***************************!*\
  !*** ./lib/base64-vlq.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ "./lib/base64.js");

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative ? -shifted : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ "./lib/base64.js":
/*!***********************!*\
  !*** ./lib/base64.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
  ""
);

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function(number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function(charCode) {
  var bigA = 65; // 'A'
  var bigZ = 90; // 'Z'

  var littleA = 97; // 'a'
  var littleZ = 122; // 'z'

  var zero = 48; // '0'
  var nine = 57; // '9'

  var plus = 43; // '+'
  var slash = 47; // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return charCode - bigA;
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return charCode - littleA + littleOffset;
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return charCode - zero + numberOffset;
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ "./lib/binary-search.js":
/*!******************************!*\
  !*** ./lib/binary-search.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  } else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  } else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(
    -1,
    aHaystack.length,
    aNeedle,
    aHaystack,
    aCompare,
    aBias || exports.GREATEST_LOWER_BOUND
  );
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),

/***/ "./lib/mapping-list.js":
/*!*****************************!*\
  !*** ./lib/mapping-list.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./lib/util.js");

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return (
    lineB > lineA ||
    (lineB == lineA && columnB >= columnA) ||
    util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0
  );
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a negligible overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = { generatedLine: -1, generatedColumn: 0 };
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach = function MappingList_forEach(
  aCallback,
  aThisArg
) {
  this._array.forEach(aCallback, aThisArg);
};

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),

/***/ "./lib/quick-sort.js":
/*!***************************!*\
  !*** ./lib/quick-sort.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

// Capture Math.random() now, to avoid problems in case a test mocks it later.
// If Math.random() is mocked to return a constant value, quickSort may become
// O(n^2) when invoked on already-sorted data.
var random = Math.random;

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + random() * (high - low));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n log n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function(ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),

/***/ "./lib/source-map-consumer.js":
/*!************************************!*\
  !*** ./lib/source-map-consumer.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./lib/util.js");
var binarySearch = __webpack_require__(/*! ./binary-search */ "./lib/binary-search.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "./lib/array-set.js").ArraySet;
var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "./lib/base64-vlq.js");
var quickSort = __webpack_require__(/*! ./quick-sort */ "./lib/quick-sort.js").quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === "string") {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
  configurable: true,
  enumerable: true,
  get: function() {
    if (!this.__generatedMappings) {
      this._sortGeneratedMappings();
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
  configurable: true,
  enumerable: true,
  get: function() {
    if (!this.__originalMappings) {
      this._sortOriginalMappings();
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype.__generatedMappingsUnsorted = null;
Object.defineProperty(
  SourceMapConsumer.prototype,
  "_generatedMappingsUnsorted",
  {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this.__generatedMappingsUnsorted) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappingsUnsorted;
    }
  }
);

SourceMapConsumer.prototype.__originalMappingsUnsorted = null;
Object.defineProperty(
  SourceMapConsumer.prototype,
  "_originalMappingsUnsorted",
  {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this.__originalMappingsUnsorted) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappingsUnsorted;
    }
  }
);

SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(
  aStr,
  index
) {
  var c = aStr.charAt(index);
  return c === ";" || c === ",";
};

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(
  aStr,
  aSourceRoot
) {
  throw new Error("Subclasses must implement _parseMappings");
};

SourceMapConsumer.prototype._sortGeneratedMappings = function SourceMapConsumer_sortGeneratedMappings() {
  const mappings = this._generatedMappingsUnsorted;
  quickSort(mappings, util.compareByGeneratedPositionsDeflated);
  this.__generatedMappings = mappings;
};

SourceMapConsumer.prototype._sortOriginalMappings = function SourceMapConsumer_sortOriginalMappings() {
  const mappings = this._originalMappingsUnsorted;
  quickSort(mappings, util.compareByOriginalPositions);
  this.__originalMappings = mappings;
};

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(
  aCallback,
  aContext,
  aOrder
) {
  var context = aContext || null;
  var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

  var mappings;
  switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
  }

  var sourceRoot = this.sourceRoot;
  mappings
    .map(function(mapping) {
      var source = null;
      if (mapping.source != null) {
        source = this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name == null ? null : this._names.at(mapping.name)
      };
    }, this)
    .forEach(aCallback, context);
};

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(
  aArgs
) {
  var line = util.getArg(aArgs, "line");

  // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
  // returns the index of the closest mapping less than the needle. By
  // setting needle.originalColumn to 0, we thus find the last mapping for
  // the given line, provided such a mapping exists.
  var needle = {
    source: util.getArg(aArgs, "source"),
    originalLine: line,
    originalColumn: util.getArg(aArgs, "column", 0)
  };

  needle.source = this._findSourceIndex(needle.source);
  if (needle.source < 0) {
    return [];
  }

  var mappings = [];

  var index = this._findMapping(
    needle,
    this._originalMappings,
    "originalLine",
    "originalColumn",
    util.compareByOriginalPositions,
    binarySearch.LEAST_UPPER_BOUND
  );
  if (index >= 0) {
    var mapping = this._originalMappings[index];

    if (aArgs.column === undefined) {
      var originalLine = mapping.originalLine;

      // Iterate until either we run out of mappings, or we run into
      // a mapping for a different line than the one we found. Since
      // mappings are sorted, this is guaranteed to find all mappings for
      // the line we found.
      while (mapping && mapping.originalLine === originalLine) {
        mappings.push({
          line: util.getArg(mapping, "generatedLine", null),
          column: util.getArg(mapping, "generatedColumn", null),
          lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
        });

        mapping = this._originalMappings[++index];
      }
    } else {
      var originalColumn = mapping.originalColumn;

      // Iterate until either we run out of mappings, or we run into
      // a mapping for a different line than the one we were searching for.
      // Since mappings are sorted, this is guaranteed to find all mappings for
      // the line we are searching for.
      while (
        mapping &&
        mapping.originalLine === line &&
        mapping.originalColumn == originalColumn
      ) {
        mappings.push({
          line: util.getArg(mapping, "generatedLine", null),
          column: util.getArg(mapping, "generatedColumn", null),
          lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
        });

        mapping = this._originalMappings[++index];
      }
    }
  }

  return mappings;
};

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === "string") {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, "version");
  var sources = util.getArg(sourceMap, "sources");
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, "names", []);
  var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
  var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
  var mappings = util.getArg(sourceMap, "mappings");
  var file = util.getArg(sourceMap, "file", null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error("Unsupported version: " + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function(source) {
      return sourceRoot &&
        util.isAbsolute(sourceRoot) &&
        util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function(s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(
  aSourceMap,
  aSourceMapURL
) {
  var smc = Object.create(BasicSourceMapConsumer.prototype);

  var names = (smc._names = ArraySet.fromArray(
    aSourceMap._names.toArray(),
    true
  ));
  var sources = (smc._sources = ArraySet.fromArray(
    aSourceMap._sources.toArray(),
    true
  ));
  smc.sourceRoot = aSourceMap._sourceRoot;
  smc.sourcesContent = aSourceMap._generateSourcesContent(
    smc._sources.toArray(),
    smc.sourceRoot
  );
  smc.file = aSourceMap._file;
  smc._sourceMapURL = aSourceMapURL;
  smc._absoluteSources = smc._sources.toArray().map(function(s) {
    return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
  });

  // Because we are modifying the entries (by converting string sources and
  // names to indices into the sources and names ArraySets), we have to make
  // a copy of the entry or else bad things happen. Shared mutable state
  // strikes again! See github issue #191.

  var generatedMappings = aSourceMap._mappings.toArray().slice();
  var destGeneratedMappings = (smc.__generatedMappings = []);
  var destOriginalMappings = (smc.__originalMappings = []);

  for (var i = 0, length = generatedMappings.length; i < length; i++) {
    var srcMapping = generatedMappings[i];
    var destMapping = new Mapping();
    destMapping.generatedLine = srcMapping.generatedLine;
    destMapping.generatedColumn = srcMapping.generatedColumn;

    if (srcMapping.source) {
      destMapping.source = sources.indexOf(srcMapping.source);
      destMapping.originalLine = srcMapping.originalLine;
      destMapping.originalColumn = srcMapping.originalColumn;

      if (srcMapping.name) {
        destMapping.name = names.indexOf(srcMapping.name);
      }

      destOriginalMappings.push(destMapping);
    }

    destGeneratedMappings.push(destMapping);
  }

  quickSort(smc.__originalMappings, util.compareByOriginalPositions);

  return smc;
};

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
  get: function() {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(
  aStr,
  aSourceRoot
) {
  var generatedLine = 1;
  var previousGeneratedColumn = 0;
  var previousOriginalLine = 0;
  var previousOriginalColumn = 0;
  var previousSource = 0;
  var previousName = 0;
  var length = aStr.length;
  var index = 0;
  var cachedSegments = {};
  var temp = {};
  var originalMappings = [];
  var generatedMappings = [];
  var mapping, str, segment, end, value;

  while (index < length) {
    if (aStr.charAt(index) === ";") {
      generatedLine++;
      index++;
      previousGeneratedColumn = 0;
    } else if (aStr.charAt(index) === ",") {
      index++;
    } else {
      mapping = new Mapping();
      mapping.generatedLine = generatedLine;

      // Because each offset is encoded relative to the previous one,
      // many segments often have the same encoding. We can exploit this
      // fact by caching the parsed variable length fields of each segment,
      // allowing us to avoid a second parse if we encounter the same
      // segment again.
      for (end = index; end < length; end++) {
        if (this._charIsMappingSeparator(aStr, end)) {
          break;
        }
      }
      str = aStr.slice(index, end);

      segment = cachedSegments[str];
      if (segment) {
        index += str.length;
      } else {
        segment = [];
        while (index < end) {
          base64VLQ.decode(aStr, index, temp);
          value = temp.value;
          index = temp.rest;
          segment.push(value);
        }

        if (segment.length === 2) {
          throw new Error("Found a source, but no line and column");
        }

        if (segment.length === 3) {
          throw new Error("Found a source and line, but no column");
        }

        cachedSegments[str] = segment;
      }

      // Generated column.
      mapping.generatedColumn = previousGeneratedColumn + segment[0];
      previousGeneratedColumn = mapping.generatedColumn;

      if (segment.length > 1) {
        // Original source.
        mapping.source = previousSource + segment[1];
        previousSource += segment[1];

        // Original line.
        mapping.originalLine = previousOriginalLine + segment[2];
        previousOriginalLine = mapping.originalLine;
        // Lines are stored 0-based
        mapping.originalLine += 1;

        // Original column.
        mapping.originalColumn = previousOriginalColumn + segment[3];
        previousOriginalColumn = mapping.originalColumn;

        if (segment.length > 4) {
          // Original name.
          mapping.name = previousName + segment[4];
          previousName += segment[4];
        }
      }

      generatedMappings.push(mapping);
      if (typeof mapping.originalLine === "number") {
        originalMappings.push(mapping);
      }
    }
  }

  this.__generatedMappingsUnsorted = generatedMappings;

  this.__originalMappingsUnsorted = originalMappings;
};

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(
  aNeedle,
  aMappings,
  aLineName,
  aColumnName,
  aComparator,
  aBias
) {
  // To return the position we are searching for, we must first find the
  // mapping for the given position and then return the opposite position it
  // points to. Because the mappings are sorted, we can use binary search to
  // find the best mapping.

  if (aNeedle[aLineName] <= 0) {
    throw new TypeError(
      "Line must be greater than or equal to 1, got " + aNeedle[aLineName]
    );
  }
  if (aNeedle[aColumnName] < 0) {
    throw new TypeError(
      "Column must be greater than or equal to 0, got " + aNeedle[aColumnName]
    );
  }

  return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
};

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
  for (var index = 0; index < this._generatedMappings.length; ++index) {
    var mapping = this._generatedMappings[index];

    // Mappings do not contain a field for the last generated columnt. We
    // can come up with an optimistic estimate, however, by assuming that
    // mappings are contiguous (i.e. given two consecutive mappings, the
    // first mapping ends where the second one starts).
    if (index + 1 < this._generatedMappings.length) {
      var nextMapping = this._generatedMappings[index + 1];

      if (mapping.generatedLine === nextMapping.generatedLine) {
        mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
        continue;
      }
    }

    // The last mapping for each line spans the entire line.
    mapping.lastGeneratedColumn = Infinity;
  }
};

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(
  aArgs
) {
  var needle = {
    generatedLine: util.getArg(aArgs, "line"),
    generatedColumn: util.getArg(aArgs, "column")
  };

  var index = this._findMapping(
    needle,
    this._generatedMappings,
    "generatedLine",
    "generatedColumn",
    util.compareByGeneratedPositionsDeflated,
    util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
  );

  if (index >= 0) {
    var mapping = this._generatedMappings[index];

    if (mapping.generatedLine === needle.generatedLine) {
      var source = util.getArg(mapping, "source", null);
      if (source != null) {
        source = this._sources.at(source);
        source = util.computeSourceURL(
          this.sourceRoot,
          source,
          this._sourceMapURL
        );
      }
      var name = util.getArg(mapping, "name", null);
      if (name != null) {
        name = this._names.at(name);
      }
      return {
        source: source,
        line: util.getArg(mapping, "originalLine", null),
        column: util.getArg(mapping, "originalColumn", null),
        name: name
      };
    }
  }

  return {
    source: null,
    line: null,
    column: null,
    name: null
  };
};

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
  if (!this.sourcesContent) {
    return false;
  }
  return (
    this.sourcesContent.length >= this._sources.size() &&
    !this.sourcesContent.some(function(sc) {
      return sc == null;
    })
  );
};

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(
  aSource,
  nullOnMissing
) {
  if (!this.sourcesContent) {
    return null;
  }

  var index = this._findSourceIndex(aSource);
  if (index >= 0) {
    return this.sourcesContent[index];
  }

  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  var url;
  if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
    // XXX: file:// URIs and absolute paths lead to unexpected behavior for
    // many users. We can help them out when they expect file:// URIs to
    // behave like it would if they were running a local HTTP server. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
    var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
    if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
      return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
    }

    if (
      (!url.path || url.path == "/") &&
      this._sources.has("/" + relativeSource)
    ) {
      return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    }
  }

  // This function is used recursively from
  // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
  // don't want to throw if we can't find the source - we just want to
  // return null, so we provide a flag to exit gracefully.
  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + relativeSource + '" is not in the SourceMap.');
  }
};

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(
  aArgs
) {
  var source = util.getArg(aArgs, "source");
  source = this._findSourceIndex(source);
  if (source < 0) {
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }

  var needle = {
    source: source,
    originalLine: util.getArg(aArgs, "line"),
    originalColumn: util.getArg(aArgs, "column")
  };

  var index = this._findMapping(
    needle,
    this._originalMappings,
    "originalLine",
    "originalColumn",
    util.compareByOriginalPositions,
    util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
  );

  if (index >= 0) {
    var mapping = this._originalMappings[index];

    if (mapping.source === needle.source) {
      return {
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      };
    }
  }

  return {
    line: null,
    column: null,
    lastColumn: null
  };
};

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === "string") {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, "version");
  var sections = util.getArg(sourceMap, "sections");

  if (version != this._version) {
    throw new Error("Unsupported version: " + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function(s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error("Support for url field in sections not implemented.");
    }
    var offset = util.getArg(s, "offset");
    var offsetLine = util.getArg(offset, "line");
    var offsetColumn = util.getArg(offset, "column");

    if (
      offsetLine < lastOffset.line ||
      (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)
    ) {
      throw new Error("Section offsets must be ordered and non-overlapping.");
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
    };
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
  get: function() {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(
  aArgs
) {
  var needle = {
    generatedLine: util.getArg(aArgs, "line"),
    generatedColumn: util.getArg(aArgs, "column")
  };

  // Find the section containing the generated position we're trying to map
  // to an original position.
  var sectionIndex = binarySearch.search(needle, this._sections, function(
    needle,
    section
  ) {
    var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
    if (cmp) {
      return cmp;
    }

    return needle.generatedColumn + 1 - section.generatedOffset.generatedColumn;
  });
  var section = this._sections[sectionIndex];

  if (!section) {
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }

  return section.consumer.originalPositionFor({
    line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
    column:
      needle.generatedColumn -
      (section.generatedOffset.generatedLine === needle.generatedLine
        ? section.generatedOffset.generatedColumn - 1
        : 0),
    bias: aArgs.bias
  });
};

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
  return this._sections.every(function(s) {
    return s.consumer.hasContentsOfAllSources();
  });
};

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(
  aSource,
  nullOnMissing
) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];

    var content = section.consumer.sourceContentFor(aSource, true);
    if (content) {
      return content;
    }
  }
  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }
};

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(
  aArgs
) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];

    // Only consider this section if the requested source is in the list of
    // sources of the consumer.
    if (
      section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1
    ) {
      continue;
    }
    var generatedPosition = section.consumer.generatedPositionFor(aArgs);
    if (generatedPosition) {
      var ret = {
        line:
          generatedPosition.line + (section.generatedOffset.generatedLine - 1),
        column:
          generatedPosition.column +
          (section.generatedOffset.generatedLine === generatedPosition.line
            ? section.generatedOffset.generatedColumn - 1
            : 0)
      };
      return ret;
    }
  }

  return {
    line: null,
    column: null
  };
};

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(
  aStr,
  aSourceRoot
) {
  const generatedMappings = (this.__generatedMappingsUnsorted = []);
  const originalMappings = (this.__originalMappingsUnsorted = []);
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    var sectionMappings = section.consumer._generatedMappings;
    for (var j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j];

      var source = null;
      if (mapping.source != null) {
        source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(
          section.consumer.sourceRoot,
          source,
          this._sourceMapURL
        );
        this._sources.add(source);
        source = this._sources.indexOf(source);
      }

      var name = null;
      if (mapping.name != null) {
        name = section.consumer._names.at(mapping.name);
        this._names.add(name);
        name = this._names.indexOf(name);
      }

      // The mappings coming from the consumer for the section have
      // generated positions relative to the start of the section, so we
      // need to offset them to be relative to the start of the concatenated
      // generated file.
      var adjustedMapping = {
        source: source,
        generatedLine:
          mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
        generatedColumn:
          mapping.generatedColumn +
          (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: name
      };

      generatedMappings.push(adjustedMapping);
      if (typeof adjustedMapping.originalLine === "number") {
        originalMappings.push(adjustedMapping);
      }
    }
  }
};

IndexedSourceMapConsumer.prototype.computeColumnSpans = function IndexedSourceMapConsumer_computeColumnSpans() {
  for (var i = 0; i < this._sections.length; i++) {
    this._sections[i].consumer.computeColumnSpans();
  }
};

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),

/***/ "./lib/source-map-generator.js":
/*!*************************************!*\
  !*** ./lib/source-map-generator.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "./lib/base64-vlq.js");
var util = __webpack_require__(/*! ./util */ "./lib/util.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "./lib/array-set.js").ArraySet;
var MappingList = __webpack_require__(/*! ./mapping-list */ "./lib/mapping-list.js").MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, "file", null);
  this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
  this._skipValidation = util.getArg(aArgs, "skipValidation", false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(
  aSourceMapConsumer
) {
  var sourceRoot = aSourceMapConsumer.sourceRoot;
  var generator = new SourceMapGenerator({
    file: aSourceMapConsumer.file,
    sourceRoot: sourceRoot
  });
  aSourceMapConsumer.eachMapping(function(mapping) {
    var newMapping = {
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn
      }
    };

    if (mapping.source != null) {
      newMapping.source = mapping.source;
      if (sourceRoot != null) {
        newMapping.source = util.relative(sourceRoot, newMapping.source);
      }

      newMapping.original = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      };

      if (mapping.name != null) {
        newMapping.name = mapping.name;
      }
    }

    generator.addMapping(newMapping);
  });
  aSourceMapConsumer.sources.forEach(function(sourceFile) {
    var sourceRelative = sourceFile;
    if (sourceRoot !== null) {
      sourceRelative = util.relative(sourceRoot, sourceFile);
    }

    if (!generator._sources.has(sourceRelative)) {
      generator._sources.add(sourceRelative);
    }

    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      generator.setSourceContent(sourceFile, content);
    }
  });
  return generator;
};

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(
  aArgs
) {
  var generated = util.getArg(aArgs, "generated");
  var original = util.getArg(aArgs, "original", null);
  var source = util.getArg(aArgs, "source", null);
  var name = util.getArg(aArgs, "name", null);

  if (!this._skipValidation) {
    this._validateMapping(generated, original, source, name);
  }

  if (source != null) {
    source = String(source);
    if (!this._sources.has(source)) {
      this._sources.add(source);
    }
  }

  if (name != null) {
    name = String(name);
    if (!this._names.has(name)) {
      this._names.add(name);
    }
  }

  this._mappings.add({
    generatedLine: generated.line,
    generatedColumn: generated.column,
    originalLine: original != null && original.line,
    originalColumn: original != null && original.column,
    source: source,
    name: name
  });
};

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(
  aSourceFile,
  aSourceContent
) {
  var source = aSourceFile;
  if (this._sourceRoot != null) {
    source = util.relative(this._sourceRoot, source);
  }

  if (aSourceContent != null) {
    // Add the source content to the _sourcesContents map.
    // Create a new _sourcesContents map if the property is null.
    if (!this._sourcesContents) {
      this._sourcesContents = Object.create(null);
    }
    this._sourcesContents[util.toSetString(source)] = aSourceContent;
  } else if (this._sourcesContents) {
    // Remove the source file from the _sourcesContents map.
    // If the _sourcesContents map is empty, set the property to null.
    delete this._sourcesContents[util.toSetString(source)];
    if (Object.keys(this._sourcesContents).length === 0) {
      this._sourcesContents = null;
    }
  }
};

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(
  aSourceMapConsumer,
  aSourceFile,
  aSourceMapPath
) {
  var sourceFile = aSourceFile;
  // If aSourceFile is omitted, we will use the file property of the SourceMap
  if (aSourceFile == null) {
    if (aSourceMapConsumer.file == null) {
      throw new Error(
        "SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, " +
          'or the source map\'s "file" property. Both were omitted.'
      );
    }
    sourceFile = aSourceMapConsumer.file;
  }
  var sourceRoot = this._sourceRoot;
  // Make "sourceFile" relative if an absolute Url is passed.
  if (sourceRoot != null) {
    sourceFile = util.relative(sourceRoot, sourceFile);
  }
  // Applying the SourceMap can add and remove items from the sources and
  // the names array.
  var newSources =
    this._mappings.toArray().length > 0 ? new ArraySet() : this._sources;
  var newNames = new ArraySet();

  // Find mappings for the "sourceFile"
  this._mappings.unsortedForEach(function(mapping) {
    if (mapping.source === sourceFile && mapping.originalLine != null) {
      // Check if it can be mapped by the source map, then update the mapping.
      var original = aSourceMapConsumer.originalPositionFor({
        line: mapping.originalLine,
        column: mapping.originalColumn
      });
      if (original.source != null) {
        // Copy mapping
        mapping.source = original.source;
        if (aSourceMapPath != null) {
          mapping.source = util.join(aSourceMapPath, mapping.source);
        }
        if (sourceRoot != null) {
          mapping.source = util.relative(sourceRoot, mapping.source);
        }
        mapping.originalLine = original.line;
        mapping.originalColumn = original.column;
        if (original.name != null) {
          mapping.name = original.name;
        }
      }
    }

    var source = mapping.source;
    if (source != null && !newSources.has(source)) {
      newSources.add(source);
    }

    var name = mapping.name;
    if (name != null && !newNames.has(name)) {
      newNames.add(name);
    }
  }, this);
  this._sources = newSources;
  this._names = newNames;

  // Copy sourcesContents of applied map.
  aSourceMapConsumer.sources.forEach(function(sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      if (aSourceMapPath != null) {
        sourceFile = util.join(aSourceMapPath, sourceFile);
      }
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      this.setSourceContent(sourceFile, content);
    }
  }, this);
};

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(
  aGenerated,
  aOriginal,
  aSource,
  aName
) {
  // When aOriginal is truthy but has empty values for .line and .column,
  // it is most likely a programmer error. In this case we throw a very
  // specific error message to try to guide them the right way.
  // For example: https://github.com/Polymer/polymer-bundler/pull/519
  if (
    aOriginal &&
    typeof aOriginal.line !== "number" &&
    typeof aOriginal.column !== "number"
  ) {
    throw new Error(
      "original.line and original.column are not numbers -- you probably meant to omit " +
        "the original mapping entirely and only map the generated position. If so, pass " +
        "null for the original mapping instead of an object with empty or null values."
    );
  }

  if (
    aGenerated &&
    "line" in aGenerated &&
    "column" in aGenerated &&
    aGenerated.line > 0 &&
    aGenerated.column >= 0 &&
    !aOriginal &&
    !aSource &&
    !aName
  ) {
    // Case 1.
    return;
  } else if (
    aGenerated &&
    "line" in aGenerated &&
    "column" in aGenerated &&
    aOriginal &&
    "line" in aOriginal &&
    "column" in aOriginal &&
    aGenerated.line > 0 &&
    aGenerated.column >= 0 &&
    aOriginal.line > 0 &&
    aOriginal.column >= 0 &&
    aSource
  ) {
    // Cases 2 and 3.
    return;
  } else {
    throw new Error(
      "Invalid mapping: " +
        JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        })
    );
  }
};

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
  var previousGeneratedColumn = 0;
  var previousGeneratedLine = 1;
  var previousOriginalColumn = 0;
  var previousOriginalLine = 0;
  var previousName = 0;
  var previousSource = 0;
  var result = "";
  var next;
  var mapping;
  var nameIdx;
  var sourceIdx;

  var mappings = this._mappings.toArray();
  for (var i = 0, len = mappings.length; i < len; i++) {
    mapping = mappings[i];
    next = "";

    if (mapping.generatedLine !== previousGeneratedLine) {
      previousGeneratedColumn = 0;
      while (mapping.generatedLine !== previousGeneratedLine) {
        next += ";";
        previousGeneratedLine++;
      }
    } else {
      if (i > 0) {
        if (
          !util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])
        ) {
          continue;
        }
        next += ",";
      }
    }

    next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
    previousGeneratedColumn = mapping.generatedColumn;

    if (mapping.source != null) {
      sourceIdx = this._sources.indexOf(mapping.source);
      next += base64VLQ.encode(sourceIdx - previousSource);
      previousSource = sourceIdx;

      // lines are stored 0-based in SourceMap spec version 3
      next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
      previousOriginalLine = mapping.originalLine - 1;

      next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
      previousOriginalColumn = mapping.originalColumn;

      if (mapping.name != null) {
        nameIdx = this._names.indexOf(mapping.name);
        next += base64VLQ.encode(nameIdx - previousName);
        previousName = nameIdx;
      }
    }

    result += next;
  }

  return result;
};

SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(
  aSources,
  aSourceRoot
) {
  return aSources.map(function(source) {
    if (!this._sourcesContents) {
      return null;
    }
    if (aSourceRoot != null) {
      source = util.relative(aSourceRoot, source);
    }
    var key = util.toSetString(source);
    return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
      ? this._sourcesContents[key]
      : null;
  }, this);
};

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
  var map = {
    version: this._version,
    sources: this._sources.toArray(),
    names: this._names.toArray(),
    mappings: this._serializeMappings()
  };
  if (this._file != null) {
    map.file = this._file;
  }
  if (this._sourceRoot != null) {
    map.sourceRoot = this._sourceRoot;
  }
  if (this._sourcesContents) {
    map.sourcesContent = this._generateSourcesContent(
      map.sources,
      map.sourceRoot
    );
  }

  return map;
};

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
  return JSON.stringify(this.toJSON());
};

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = "";
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ":";
  }
  url += "//";
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + "@";
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

const MAX_CACHED_INPUTS = 32;

/**
 * Takes some function `f(input) -> result` and returns a memoized version of
 * `f`.
 *
 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
 * memoization is a dumb-simple, linear least-recently-used cache.
 */
function lruMemoize(f) {
  const cache = [];

  return function(input) {
    for (var i = 0; i < cache.length; i++) {
      if (cache[i].input === input) {
        var temp = cache[0];
        cache[0] = cache[i];
        cache[i] = temp;
        return cache[0].result;
      }
    }

    var result = f(input);

    cache.unshift({
      input,
      result
    });

    if (cache.length > MAX_CACHED_INPUTS) {
      cache.pop();
    }

    return result;
  };
}

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
var normalize = lruMemoize(function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  // Split the path into parts between `/` characters. This is much faster than
  // using `.split(/\/+/g)`.
  var parts = [];
  var start = 0;
  var i = 0;
  while (true) {
    start = i;
    i = path.indexOf("/", start);
    if (i === -1) {
      parts.push(path.slice(start));
      break;
    } else {
      parts.push(path.slice(start, i));
      while (i < path.length && path[i] === "/") {
        i++;
      }
    }
  }

  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === ".") {
      parts.splice(i, 1);
    } else if (part === "..") {
      up++;
    } else if (up > 0) {
      if (part === "") {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join("/");

  if (path === "") {
    path = isAbsolute ? "/" : ".";
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
});
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || "/";
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined =
    aPath.charAt(0) === "/"
      ? aPath
      : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function(aPath) {
  return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, "");

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + "/") !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function() {
  var obj = Object.create(null);
  return !("__proto__" in obj);
})();

function identity(s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return "$" + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (
    s.charCodeAt(length - 1) !== 95 /* '_' */ ||
    s.charCodeAt(length - 2) !== 95 /* '_' */ ||
    s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
    s.charCodeAt(length - 4) !== 116 /* 't' */ ||
    s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
    s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
    s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
    s.charCodeAt(length - 8) !== 95 /* '_' */ ||
    s.charCodeAt(length - 9) !== 95 /* '_' */
  ) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(
  mappingA,
  mappingB,
  onlyCompareGenerated
) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || "";

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
      sourceRoot += "/";
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf("/");
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),

/***/ "./test/test-source-map-consumer.js":
/*!******************************************!*\
  !*** ./test/test-source-map-consumer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./test/util.js");
var SourceMapConsumer = __webpack_require__(/*! ../lib/source-map-consumer */ "./lib/source-map-consumer.js").SourceMapConsumer;
var IndexedSourceMapConsumer = __webpack_require__(/*! ../lib/source-map-consumer */ "./lib/source-map-consumer.js")
  .IndexedSourceMapConsumer;
var BasicSourceMapConsumer = __webpack_require__(/*! ../lib/source-map-consumer */ "./lib/source-map-consumer.js")
  .BasicSourceMapConsumer;
var SourceMapGenerator = __webpack_require__(/*! ../lib/source-map-generator */ "./lib/source-map-generator.js")
  .SourceMapGenerator;

exports["test that we can instantiate with a string or an object"] = function(
  assert
) {
  assert.doesNotThrow(function() {
    var map = new SourceMapConsumer(util.testMap);
  });
  assert.doesNotThrow(function() {
    var map = new SourceMapConsumer(JSON.stringify(util.testMap));
  });
};

exports[
  "test that the object returned from new SourceMapConsumer inherits from SourceMapConsumer"
] = function(assert) {
  assert.ok(new SourceMapConsumer(util.testMap) instanceof SourceMapConsumer);
};

exports[
  "test that a BasicSourceMapConsumer is returned for sourcemaps without sections"
] = function(assert) {
  assert.ok(
    new SourceMapConsumer(util.testMap) instanceof BasicSourceMapConsumer
  );
};

exports[
  "test that an IndexedSourceMapConsumer is returned for sourcemaps with sections"
] = function(assert) {
  assert.ok(
    new SourceMapConsumer(util.indexedTestMap) instanceof
      IndexedSourceMapConsumer
  );
};

exports["test that the `sources` field has the original sources"] = function(
  assert
) {
  var map;
  var sources;

  map = new SourceMapConsumer(util.testMap);
  sources = map.sources;
  assert.equal(sources[0], "/the/root/one.js");
  assert.equal(sources[1], "/the/root/two.js");
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.indexedTestMap);
  sources = map.sources;
  assert.equal(sources[0], "/the/root/one.js");
  assert.equal(sources[1], "/the/root/two.js");
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.indexedTestMapDifferentSourceRoots);
  sources = map.sources;
  assert.equal(sources[0], "/the/root/one.js");
  assert.equal(sources[1], "/different/root/two.js");
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.testMapNoSourceRoot);
  sources = map.sources;
  assert.equal(sources[0], "one.js");
  assert.equal(sources[1], "two.js");
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.testMapEmptySourceRoot);
  sources = map.sources;
  assert.equal(sources[0], "one.js");
  assert.equal(sources[1], "two.js");
  assert.equal(sources.length, 2);
};

exports[
  "test that the source root is reflected in a mapping's source field"
] = function(assert) {
  var map;
  var mapping;

  map = new SourceMapConsumer(util.testMap);

  mapping = map.originalPositionFor({
    line: 2,
    column: 1
  });
  assert.equal(mapping.source, "/the/root/two.js");

  mapping = map.originalPositionFor({
    line: 1,
    column: 1
  });
  assert.equal(mapping.source, "/the/root/one.js");

  map = new SourceMapConsumer(util.testMapNoSourceRoot);

  mapping = map.originalPositionFor({
    line: 2,
    column: 1
  });
  assert.equal(mapping.source, "two.js");

  mapping = map.originalPositionFor({
    line: 1,
    column: 1
  });
  assert.equal(mapping.source, "one.js");

  map = new SourceMapConsumer(util.testMapEmptySourceRoot);

  mapping = map.originalPositionFor({
    line: 2,
    column: 1
  });
  assert.equal(mapping.source, "two.js");

  mapping = map.originalPositionFor({
    line: 1,
    column: 1
  });
  assert.equal(mapping.source, "one.js");
};

exports["test mapping tokens back exactly"] = function(assert) {
  var map = new SourceMapConsumer(util.testMap);

  util.assertMapping(1, 1, "/the/root/one.js", 1, 1, null, null, map, assert);
  util.assertMapping(1, 5, "/the/root/one.js", 1, 5, null, null, map, assert);
  util.assertMapping(1, 9, "/the/root/one.js", 1, 11, null, null, map, assert);
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    21,
    "bar",
    null,
    map,
    assert
  );
  util.assertMapping(1, 21, "/the/root/one.js", 2, 3, null, null, map, assert);
  util.assertMapping(
    1,
    28,
    "/the/root/one.js",
    2,
    10,
    "baz",
    null,
    map,
    assert
  );
  util.assertMapping(
    1,
    32,
    "/the/root/one.js",
    2,
    14,
    "bar",
    null,
    map,
    assert
  );

  util.assertMapping(2, 1, "/the/root/two.js", 1, 1, null, null, map, assert);
  util.assertMapping(2, 5, "/the/root/two.js", 1, 5, null, null, map, assert);
  util.assertMapping(2, 9, "/the/root/two.js", 1, 11, null, null, map, assert);
  util.assertMapping(2, 18, "/the/root/two.js", 1, 21, "n", null, map, assert);
  util.assertMapping(2, 21, "/the/root/two.js", 2, 3, null, null, map, assert);
  util.assertMapping(2, 28, "/the/root/two.js", 2, 10, "n", null, map, assert);
};

exports["test mapping tokens back exactly in indexed source map"] = function(
  assert
) {
  var map = new SourceMapConsumer(util.indexedTestMap);

  util.assertMapping(1, 1, "/the/root/one.js", 1, 1, null, null, map, assert);
  util.assertMapping(1, 5, "/the/root/one.js", 1, 5, null, null, map, assert);
  util.assertMapping(1, 9, "/the/root/one.js", 1, 11, null, null, map, assert);
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    21,
    "bar",
    null,
    map,
    assert
  );
  util.assertMapping(1, 21, "/the/root/one.js", 2, 3, null, null, map, assert);
  util.assertMapping(
    1,
    28,
    "/the/root/one.js",
    2,
    10,
    "baz",
    null,
    map,
    assert
  );
  util.assertMapping(
    1,
    32,
    "/the/root/one.js",
    2,
    14,
    "bar",
    null,
    map,
    assert
  );

  util.assertMapping(2, 1, "/the/root/two.js", 1, 1, null, null, map, assert);
  util.assertMapping(2, 5, "/the/root/two.js", 1, 5, null, null, map, assert);
  util.assertMapping(2, 9, "/the/root/two.js", 1, 11, null, null, map, assert);
  util.assertMapping(2, 18, "/the/root/two.js", 1, 21, "n", null, map, assert);
  util.assertMapping(2, 21, "/the/root/two.js", 2, 3, null, null, map, assert);
  util.assertMapping(2, 28, "/the/root/two.js", 2, 10, "n", null, map, assert);
};

exports["test mapping tokens fuzzy"] = function(assert) {
  var map = new SourceMapConsumer(util.testMap);

  // Finding original positions with default (glb) bias.
  util.assertMapping(
    1,
    20,
    "/the/root/one.js",
    1,
    21,
    "bar",
    null,
    map,
    assert,
    true
  );
  util.assertMapping(
    1,
    30,
    "/the/root/one.js",
    2,
    10,
    "baz",
    null,
    map,
    assert,
    true
  );
  util.assertMapping(
    2,
    12,
    "/the/root/two.js",
    1,
    11,
    null,
    null,
    map,
    assert,
    true
  );

  // Finding original positions with lub bias.
  util.assertMapping(
    1,
    16,
    "/the/root/one.js",
    1,
    21,
    "bar",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    true
  );
  util.assertMapping(
    1,
    26,
    "/the/root/one.js",
    2,
    10,
    "baz",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    true
  );
  util.assertMapping(
    2,
    6,
    "/the/root/two.js",
    1,
    11,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    true
  );

  // Finding generated positions with default (glb) bias.
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    22,
    "bar",
    null,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    1,
    28,
    "/the/root/one.js",
    2,
    13,
    "baz",
    null,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    2,
    9,
    "/the/root/two.js",
    1,
    16,
    null,
    null,
    map,
    assert,
    null,
    true
  );

  // Finding generated positions with lub bias.
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    20,
    "bar",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    1,
    28,
    "/the/root/one.js",
    2,
    7,
    "baz",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    2,
    9,
    "/the/root/two.js",
    1,
    6,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
};

exports["test mapping tokens fuzzy in indexed source map"] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);

  // Finding original positions with default (glb) bias.
  util.assertMapping(
    1,
    20,
    "/the/root/one.js",
    1,
    21,
    "bar",
    null,
    map,
    assert,
    true
  );
  util.assertMapping(
    1,
    30,
    "/the/root/one.js",
    2,
    10,
    "baz",
    null,
    map,
    assert,
    true
  );
  util.assertMapping(
    2,
    12,
    "/the/root/two.js",
    1,
    11,
    null,
    null,
    map,
    assert,
    true
  );

  // Finding original positions with lub bias.
  util.assertMapping(
    1,
    16,
    "/the/root/one.js",
    1,
    21,
    "bar",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    true
  );
  util.assertMapping(
    1,
    26,
    "/the/root/one.js",
    2,
    10,
    "baz",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    true
  );
  util.assertMapping(
    2,
    6,
    "/the/root/two.js",
    1,
    11,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    true
  );

  // Finding generated positions with default (glb) bias.
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    22,
    "bar",
    null,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    1,
    28,
    "/the/root/one.js",
    2,
    13,
    "baz",
    null,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    2,
    9,
    "/the/root/two.js",
    1,
    16,
    null,
    null,
    map,
    assert,
    null,
    true
  );

  // Finding generated positions with lub bias.
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    20,
    "bar",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    1,
    28,
    "/the/root/one.js",
    2,
    7,
    "baz",
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
  util.assertMapping(
    2,
    9,
    "/the/root/two.js",
    1,
    6,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
};

exports["test mappings and end of lines"] = function(assert) {
  var smg = new SourceMapGenerator({
    file: "foo.js"
  });
  smg.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 1 },
    source: "bar.js"
  });
  smg.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 2, column: 2 },
    source: "bar.js"
  });
  smg.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 1 },
    source: "baz.js"
  });

  var map = SourceMapConsumer.fromSourceMap(smg);

  // When finding original positions, mappings end at the end of the line.
  util.assertMapping(2, 1, null, null, null, null, null, map, assert, true);

  // When finding generated positions, mappings do not end at the end of the line.
  util.assertMapping(1, 1, "bar.js", 2, 1, null, null, map, assert, null, true);

  // When finding generated positions with, mappings end at the end of the source.
  util.assertMapping(
    null,
    null,
    "bar.js",
    3,
    1,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );
};

exports["test creating source map consumers with )]}' prefix"] = function(
  assert
) {
  assert.doesNotThrow(function() {
    var map = new SourceMapConsumer(")]}'\n" + JSON.stringify(util.testMap));
  });
};

exports["test eachMapping"] = function(assert) {
  var map;

  map = new SourceMapConsumer(util.testMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  map.eachMapping(function(mapping) {
    assert.ok(mapping.generatedLine >= previousLine);

    assert.ok(
      mapping.source === "/the/root/one.js" ||
        mapping.source === "/the/root/two.js"
    );

    if (mapping.generatedLine === previousLine) {
      assert.ok(mapping.generatedColumn >= previousColumn);
      previousColumn = mapping.generatedColumn;
    } else {
      previousLine = mapping.generatedLine;
      previousColumn = -Infinity;
    }
  });

  map = new SourceMapConsumer(util.testMapNoSourceRoot);
  map.eachMapping(function(mapping) {
    assert.ok(mapping.source === "one.js" || mapping.source === "two.js");
  });

  map = new SourceMapConsumer(util.testMapEmptySourceRoot);
  map.eachMapping(function(mapping) {
    assert.ok(mapping.source === "one.js" || mapping.source === "two.js");
  });

  map = new SourceMapConsumer(util.mapWithSourcelessMapping);
  map.eachMapping(function(mapping) {
    assert.ok(
      mapping.source === null ||
        (typeof mapping.originalColumn === "number" &&
          typeof mapping.originalLine === "number")
    );
  });
};

exports["test eachMapping for indexed source maps"] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  map.eachMapping(function(mapping) {
    assert.ok(mapping.generatedLine >= previousLine);

    if (mapping.source) {
      assert.equal(mapping.source.indexOf(util.testMap.sourceRoot), 0);
    }

    if (mapping.generatedLine === previousLine) {
      assert.ok(mapping.generatedColumn >= previousColumn);
      previousColumn = mapping.generatedColumn;
    } else {
      previousLine = mapping.generatedLine;
      previousColumn = -Infinity;
    }
  });
};

exports[
  "test eachMapping for indexed source maps with column offsets"
] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMapColumnOffset);
  map.computeColumnSpans();
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  var previousLastColumn = -Infinity;

  map.eachMapping(function(mapping) {
    assert.ok(mapping.generatedLine >= previousLine);

    if (mapping.source) {
      assert.equal(mapping.source.indexOf(util.testMap.sourceRoot), 0);
    }

    if (mapping.generatedLine === previousLine) {
      assert.ok(mapping.generatedColumn >= previousColumn);
      if (typeof previousLastColumn === "number") {
        assert.ok(mapping.generatedColumn > previousLastColumn);
      }
      previousColumn = mapping.generatedColumn;
      previousLastColumn = mapping.lastGeneratedColumn;
    } else {
      previousLine = mapping.generatedLine;
      previousColumn = -Infinity;
      previousLastColumn = -Infinity;
    }
  });
};

exports["test iterating over mappings in a different order"] = function(
  assert
) {
  var map = new SourceMapConsumer(util.testMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  var previousSource = "";
  map.eachMapping(
    function(mapping) {
      assert.ok(mapping.source >= previousSource);

      if (mapping.source === previousSource) {
        assert.ok(mapping.originalLine >= previousLine);

        if (mapping.originalLine === previousLine) {
          assert.ok(mapping.originalColumn >= previousColumn);
          previousColumn = mapping.originalColumn;
        } else {
          previousLine = mapping.originalLine;
          previousColumn = -Infinity;
        }
      } else {
        previousSource = mapping.source;
        previousLine = -Infinity;
        previousColumn = -Infinity;
      }
    },
    null,
    SourceMapConsumer.ORIGINAL_ORDER
  );
};

exports[
  "test iterating over mappings in a different order in indexed source maps"
] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  var previousSource = "";
  map.eachMapping(
    function(mapping) {
      assert.ok(mapping.source >= previousSource);

      if (mapping.source === previousSource) {
        assert.ok(mapping.originalLine >= previousLine);

        if (mapping.originalLine === previousLine) {
          assert.ok(mapping.originalColumn >= previousColumn);
          previousColumn = mapping.originalColumn;
        } else {
          previousLine = mapping.originalLine;
          previousColumn = -Infinity;
        }
      } else {
        previousSource = mapping.source;
        previousLine = -Infinity;
        previousColumn = -Infinity;
      }
    },
    null,
    SourceMapConsumer.ORIGINAL_ORDER
  );
};

exports[
  "test that we can set the context for `this` in eachMapping"
] = function(assert) {
  var map = new SourceMapConsumer(util.testMap);
  var context = {};
  map.eachMapping(function() {
    assert.equal(this, context);
  }, context);
};

exports[
  "test that we can set the context for `this` in eachMapping in indexed source maps"
] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var context = {};
  map.eachMapping(function() {
    assert.equal(this, context);
  }, context);
};

exports[
  "test that the `sourcesContent` field has the original sources"
] = function(assert) {
  var map = new SourceMapConsumer(util.testMapWithSourcesContent);
  var sourcesContent = map.sourcesContent;

  assert.equal(
    sourcesContent[0],
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    sourcesContent[1],
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.equal(sourcesContent.length, 2);
};

exports["test that we can get the original sources for the sources"] = function(
  assert
) {
  var map = new SourceMapConsumer(util.testMapWithSourcesContent);
  var sources = map.sources;

  assert.equal(
    map.sourceContentFor(sources[0]),
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    map.sourceContentFor(sources[1]),
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.equal(
    map.sourceContentFor("one.js"),
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    map.sourceContentFor("two.js"),
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.throws(function() {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("three.js");
  }, Error);
};

exports[
  "test that we can get the original source content with relative source paths"
] = function(assert) {
  var map = new SourceMapConsumer(util.testMapRelativeSources);
  var sources = map.sources;

  assert.equal(
    map.sourceContentFor(sources[0]),
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    map.sourceContentFor(sources[1]),
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.equal(
    map.sourceContentFor("one.js"),
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    map.sourceContentFor("two.js"),
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.throws(function() {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("three.js");
  }, Error);
};

exports[
  "test that we can get the original source content for the sources on an indexed source map"
] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var sources = map.sources;

  assert.equal(
    map.sourceContentFor(sources[0]),
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    map.sourceContentFor(sources[1]),
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.equal(
    map.sourceContentFor("one.js"),
    " ONE.foo = function (bar) {\n   return baz(bar);\n };"
  );
  assert.equal(
    map.sourceContentFor("two.js"),
    " TWO.inc = function (n) {\n   return n + 1;\n };"
  );
  assert.throws(function() {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("three.js");
  }, Error);
};

exports["test hasContentsOfAllSources, single source with contents"] = function(
  assert
) {
  // Has one source: foo.js (with contents).
  var mapWithContents = new SourceMapGenerator();
  mapWithContents.addMapping({
    source: "foo.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  mapWithContents.setSourceContent("foo.js", "content of foo.js");
  var consumer = new SourceMapConsumer(mapWithContents.toJSON());
  assert.ok(consumer.hasContentsOfAllSources());
};

exports[
  "test hasContentsOfAllSources, single source without contents"
] = function(assert) {
  // Has one source: foo.js (without contents).
  var mapWithoutContents = new SourceMapGenerator();
  mapWithoutContents.addMapping({
    source: "foo.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  var consumer = new SourceMapConsumer(mapWithoutContents.toJSON());
  assert.ok(!consumer.hasContentsOfAllSources());
};

exports["test hasContentsOfAllSources, two sources with contents"] = function(
  assert
) {
  // Has two sources: foo.js (with contents) and bar.js (with contents).
  var mapWithBothContents = new SourceMapGenerator();
  mapWithBothContents.addMapping({
    source: "foo.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  mapWithBothContents.addMapping({
    source: "bar.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  mapWithBothContents.setSourceContent("foo.js", "content of foo.js");
  mapWithBothContents.setSourceContent("bar.js", "content of bar.js");
  var consumer = new SourceMapConsumer(mapWithBothContents.toJSON());
  assert.ok(consumer.hasContentsOfAllSources());
};

exports[
  "test hasContentsOfAllSources, two sources one with and one without contents"
] = function(assert) {
  // Has two sources: foo.js (with contents) and bar.js (without contents).
  var mapWithoutSomeContents = new SourceMapGenerator();
  mapWithoutSomeContents.addMapping({
    source: "foo.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  mapWithoutSomeContents.addMapping({
    source: "bar.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  mapWithoutSomeContents.setSourceContent("foo.js", "content of foo.js");
  var consumer = new SourceMapConsumer(mapWithoutSomeContents.toJSON());
  assert.ok(!consumer.hasContentsOfAllSources());
};

exports["test sourceRoot + generatedPositionFor"] = function(assert) {
  var map = new SourceMapGenerator({
    sourceRoot: "foo/bar",
    file: "baz.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "bang.coffee"
  });
  map.addMapping({
    original: { line: 5, column: 5 },
    generated: { line: 6, column: 6 },
    source: "bang.coffee"
  });
  map = new SourceMapConsumer(map.toString(), "http://example.com/");

  // Should handle without sourceRoot.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  // Should handle with sourceRoot.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "foo/bar/bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  // Should handle absolute case.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "http://example.com/foo/bar/bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);
};

exports[
  "test sourceRoot + generatedPositionFor for path above the root"
] = function(assert) {
  var map = new SourceMapGenerator({
    sourceRoot: "foo/bar",
    file: "baz.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "../bang.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  // Should handle with sourceRoot.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "foo/bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);
};

exports["test index map + originalPositionFor"] = function(assert) {
  var map = new SourceMapConsumer(
    util.indexedTestMapWithMappingsAtSectionStart
  );

  var pos = map.originalPositionFor({
    line: 1,
    column: 0
  });

  assert.equal(pos.line, 1);
  assert.equal(pos.column, 0);
  assert.equal(pos.source, "foo.js");
  assert.equal(pos.name, "first");

  pos = map.originalPositionFor({
    line: 1,
    column: 1
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 1);
  assert.equal(pos.source, "bar.js");
  assert.equal(pos.name, "second");

  pos = map.originalPositionFor({
    line: 1,
    column: 2
  });

  assert.equal(pos.line, 1);
  assert.equal(pos.column, 0);
  assert.equal(pos.source, "baz.js");
  assert.equal(pos.name, "third");

  pos = map.originalPositionFor({
    line: 1,
    column: 3
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 1);
  assert.equal(pos.source, "quux.js");
  assert.equal(pos.name, "fourth");
};

exports["test allGeneratedPositionsFor for line"] = function(assert) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "bar.coffee"
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 3, column: 2 },
    source: "bar.coffee"
  });
  map.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 3, column: 3 },
    source: "bar.coffee"
  });
  map.addMapping({
    original: { line: 3, column: 1 },
    generated: { line: 4, column: 2 },
    source: "bar.coffee"
  });
  map = new SourceMapConsumer(map.toString(), "http://example.com/");

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "bar.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 3);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 3);
  assert.equal(mappings[1].column, 3);

  mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "http://example.com/bar.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 3);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 3);
  assert.equal(mappings[1].column, 3);
};

exports["test allGeneratedPositionsFor for line fuzzy"] = function(assert) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "bar.coffee"
  });
  map.addMapping({
    original: { line: 3, column: 1 },
    generated: { line: 4, column: 2 },
    source: "bar.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "bar.coffee"
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].line, 4);
  assert.equal(mappings[0].column, 2);
};

exports["test allGeneratedPositionsFor for empty source map"] = function(
  assert
) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "bar.coffee"
  });

  assert.equal(mappings.length, 0);
};

exports["test allGeneratedPositionsFor for column"] = function(assert) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 2 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 3 },
    source: "foo.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 1,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 1);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 1);
  assert.equal(mappings[1].column, 3);
};

exports["test allGeneratedPositionsFor for column fuzzy"] = function(assert) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 2 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 3 },
    source: "foo.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 0,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 1);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 1);
  assert.equal(mappings[1].column, 3);
};

exports[
  "test allGeneratedPositionsFor for column on different line fuzzy"
] = function(assert) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 2, column: 2 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 2, column: 3 },
    source: "foo.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 0,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 0);
};

exports["test computeColumnSpans"] = function(assert) {
  var map = new SourceMapGenerator({
    file: "generated.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 1 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 2, column: 1 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 2, column: 10 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 2, column: 3 },
    generated: { line: 2, column: 20 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 3, column: 1 },
    generated: { line: 3, column: 1 },
    source: "foo.coffee"
  });
  map.addMapping({
    original: { line: 3, column: 2 },
    generated: { line: 3, column: 2 },
    source: "foo.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  map.computeColumnSpans();

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].lastColumn, Infinity);

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 3);
  assert.equal(mappings[0].lastColumn, 9);
  assert.equal(mappings[1].lastColumn, 19);
  assert.equal(mappings[2].lastColumn, Infinity);

  var mappings = map.allGeneratedPositionsFor({
    line: 3,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].lastColumn, 1);
  assert.equal(mappings[1].lastColumn, Infinity);
};

exports["test sourceRoot + originalPositionFor"] = function(assert) {
  var map = new SourceMapGenerator({
    sourceRoot: "foo/bar",
    file: "baz.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "bang.coffee"
  });
  map = new SourceMapConsumer(map.toString());

  var pos = map.originalPositionFor({
    line: 2,
    column: 2
  });

  // Should always have the prepended source root
  assert.equal(pos.source, "foo/bar/bang.coffee");
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);
};

exports["test github issue #56"] = function(assert) {
  var map = new SourceMapGenerator({
    sourceRoot: "http://",
    file: "www.example.com/foo.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "www.example.com/original.js"
  });
  map = new SourceMapConsumer(map.toString());

  var sources = map.sources;
  assert.equal(sources.length, 1);
  assert.equal(sources[0], "http://www.example.com/original.js");
};

// Was github issue #43, but that's no longer valid.
exports["test source resolution with sourceMapURL"] = function(assert) {
  var map = new SourceMapGenerator({
    sourceRoot: "",
    file: "foo.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "original.js"
  });
  map = new SourceMapConsumer(map.toString(), "http://cdn.example.com");

  var sources = map.sources;
  assert.equal(sources.length, 1, "Should only be one source.");
  assert.equal(
    sources[0],
    "http://cdn.example.com/original.js",
    "Should be joined with the source map URL."
  );
};

exports["test sourceRoot prepending"] = function(assert) {
  var map = new SourceMapGenerator({
    sourceRoot: "http://example.com/foo/bar",
    file: "foo.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "/original.js"
  });
  map = new SourceMapConsumer(map.toString());

  var sources = map.sources;
  assert.equal(sources.length, 1, "Should only be one source.");
  assert.equal(
    sources[0],
    "http://example.com/foo/bar/original.js",
    "Source include the source root."
  );
};

exports[
  "test indexed source map errors when sections are out of order by line"
] = function(assert) {
  // Make a deep copy of the indexedTestMap
  var misorderedIndexedTestMap = JSON.parse(
    JSON.stringify(util.indexedTestMap)
  );

  misorderedIndexedTestMap.sections[0].offset = {
    line: 2,
    column: 0
  };

  assert.throws(function() {
    new SourceMapConsumer(misorderedIndexedTestMap);
  }, Error);
};

exports["test github issue #64"] = function(assert) {
  var map = new SourceMapConsumer({
    version: 3,
    file: "foo.js",
    sourceRoot: "http://example.com/",
    sources: ["/a"],
    names: [],
    mappings: "AACA",
    sourcesContent: ["foo"]
  });

  assert.equal(map.sourceContentFor("a"), "foo");
  assert.equal(map.sourceContentFor("/a"), "foo");
};

exports["test full source content with sourceMapURL"] = function(assert) {
  var map = new SourceMapConsumer(
    {
      version: 3,
      file: "foo.js",
      sourceRoot: "",
      sources: ["original.js"],
      names: [],
      mappings: "AACA",
      sourcesContent: ["yellow warbler"]
    },
    "http://cdn.example.com"
  );

  var sources = map.sources;
  assert.equal(
    map.sourceContentFor("http://cdn.example.com/original.js"),
    "yellow warbler",
    "Source content should be found using full URL"
  );
};

exports["test bug 885597"] = function(assert) {
  var map = new SourceMapConsumer({
    version: 3,
    file: "foo.js",
    sourceRoot: "file:///Users/AlGore/Invented/The/Internet/",
    sources: ["/a"],
    names: [],
    mappings: "AACA",
    sourcesContent: ["foo"]
  });

  var s = map.sources[0];
  assert.equal(map.sourceContentFor(s), "foo");
};

exports["test github issue #72, duplicate sources"] = function(assert) {
  var map = new SourceMapConsumer({
    version: 3,
    file: "foo.js",
    sources: ["source1.js", "source1.js", "source3.js"],
    names: [],
    mappings: ";EAAC;;IAEE;;MEEE",
    sourceRoot: "http://example.com"
  });

  var pos = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.source, "http://example.com/source1.js");
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  var pos = map.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.source, "http://example.com/source1.js");
  assert.equal(pos.line, 3);
  assert.equal(pos.column, 3);

  var pos = map.originalPositionFor({
    line: 6,
    column: 6
  });
  assert.equal(pos.source, "http://example.com/source3.js");
  assert.equal(pos.line, 5);
  assert.equal(pos.column, 5);
};

exports["test github issue #72, duplicate names"] = function(assert) {
  var map = new SourceMapConsumer({
    version: 3,
    file: "foo.js",
    sources: ["source.js"],
    names: ["name1", "name1", "name3"],
    mappings: ";EAACA;;IAEEA;;MAEEE",
    sourceRoot: "http://example.com"
  });

  var pos = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.name, "name1");
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  var pos = map.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.name, "name1");
  assert.equal(pos.line, 3);
  assert.equal(pos.column, 3);

  var pos = map.originalPositionFor({
    line: 6,
    column: 6
  });
  assert.equal(pos.name, "name3");
  assert.equal(pos.line, 5);
  assert.equal(pos.column, 5);
};

exports["test SourceMapConsumer.fromSourceMap"] = function(assert) {
  var smg = new SourceMapGenerator({
    sourceRoot: "http://example.com/",
    file: "foo.js"
  });
  smg.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "bar.js"
  });
  smg.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 4, column: 4 },
    source: "baz.js",
    name: "dirtMcGirt"
  });
  smg.setSourceContent("baz.js", "baz.js content");

  var smc = SourceMapConsumer.fromSourceMap(smg);
  assert.equal(smc.file, "foo.js");
  assert.equal(smc.sourceRoot, "http://example.com/");
  assert.equal(smc.sources.length, 2);
  assert.equal(smc.sources[0], "http://example.com/bar.js");
  assert.equal(smc.sources[1], "http://example.com/baz.js");
  assert.equal(smc.sourceContentFor("baz.js"), "baz.js content");

  var pos = smc.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);
  assert.equal(pos.source, "http://example.com/bar.js");
  assert.equal(pos.name, null);

  pos = smc.generatedPositionFor({
    line: 1,
    column: 1,
    source: "http://example.com/bar.js"
  });
  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  pos = smc.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);
  assert.equal(pos.source, "http://example.com/baz.js");
  assert.equal(pos.name, "dirtMcGirt");

  pos = smc.generatedPositionFor({
    line: 2,
    column: 2,
    source: "http://example.com/baz.js"
  });
  assert.equal(pos.line, 4);
  assert.equal(pos.column, 4);
};

exports["test issue #191"] = function(assert) {
  var generator = new SourceMapGenerator({ file: "a.css" });
  generator.addMapping({
    source: "b.css",
    original: {
      line: 1,
      column: 0
    },
    generated: {
      line: 1,
      column: 0
    }
  });

  // Create a SourceMapConsumer from the SourceMapGenerator, ...
  var consumer = SourceMapConsumer.fromSourceMap(generator);
  // ... and then try and use the SourceMapGenerator again. This should not
  // throw.
  generator.toJSON();

  assert.ok(
    true,
    "Using a SourceMapGenerator again after creating a " +
      "SourceMapConsumer from it should not throw"
  );
};

exports[
  "test sources where their prefix is the source root: issue #199"
] = function(assert) {
  var testSourceMap = {
    version: 3,
    sources: ["/source/app/app/app.js"],
    names: ["System"],
    mappings: "AAAAA",
    file: "app/app.js",
    sourcesContent: ["'use strict';"],
    sourceRoot: "/source/"
  };

  var consumer = new SourceMapConsumer(testSourceMap);

  function consumerHasSource(s) {
    assert.ok(consumer.sourceContentFor(s));
  }

  consumer.sources.forEach(consumerHasSource);
  testSourceMap.sources.forEach(consumerHasSource);
};

exports[
  "test sources where their prefix is the source root and the source root is a url: issue #199"
] = function(assert) {
  var testSourceMap = {
    version: 3,
    sources: ["http://example.com/source/app/app/app.js"],
    names: ["System"],
    mappings: "AAAAA",
    sourcesContent: ["'use strict';"],
    sourceRoot: "http://example.com/source/"
  };

  var consumer = new SourceMapConsumer(testSourceMap);

  function consumerHasSource(s) {
    assert.ok(consumer.sourceContentFor(s));
  }

  consumer.sources.forEach(consumerHasSource);
  testSourceMap.sources.forEach(consumerHasSource);
};

exports["test consuming names and sources that are numbers"] = function(
  assert
) {
  var testSourceMap = {
    version: 3,
    sources: [0],
    names: [1],
    mappings: "AAAAA"
  };

  var consumer = new SourceMapConsumer(testSourceMap);

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "0");

  var i = 0;
  consumer.eachMapping(function(m) {
    i++;
    assert.equal(m.name, "1");
  });
  assert.equal(i, 1);
};

exports["test non-normalized sourceRoot (from issue #227)"] = function(assert) {
  var consumer = new SourceMapConsumer({
    version: 3,
    sources: ["index.js"],
    names: [],
    mappings: ";;AAAA,IAAI,OAAO,MAAP",
    file: "index.js",
    sourceRoot: "./src/",
    sourcesContent: ['var name = "Mark"\n']
  });
  assert.equal(consumer.sourceRoot, "src/", "sourceRoot was normalized");
  // Before the fix, this threw an exception.
  consumer.sourceContentFor(consumer.sources[0]);
};

exports["test webpack URL resolution"] = function(assert) {
  var map = {
    version: 3,
    sources: ["webpack:///webpack/bootstrap 67e184f9679733298d44"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: ""
  };
  var consumer = new SourceMapConsumer(map);

  assert.equal(consumer.sources.length, 1);
  assert.equal(
    consumer.sources[0],
    "webpack:///webpack/bootstrap 67e184f9679733298d44"
  );
};

exports["test webpack URL resolution with sourceMapURL"] = function(assert) {
  var map = {
    version: 3,
    sources: ["webpack:///webpack/bootstrap 67e184f9679733298d44"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: ""
  };
  var consumer = new SourceMapConsumer(map, "http://www.example.com/q.js.map");

  assert.equal(consumer.sources.length, 1);
  assert.equal(
    consumer.sources[0],
    "webpack:///webpack/bootstrap 67e184f9679733298d44"
  );
};

exports["test relative webpack URL resolution with sourceMapURL"] = function(
  assert
) {
  var map = {
    version: 3,
    sources: ["webpack/bootstrap.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "webpack:///"
  };
  var consumer = new SourceMapConsumer(map, "http://www.example.com/q.js.map");

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap.js");
};

exports["test basic URL resolution with sourceMapURL"] = function(assert) {
  var map = {
    version: 3,
    sources: ["something.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "src"
  };
  var consumer = new SourceMapConsumer(
    map,
    "http://www.example.com/x/q.js.map"
  );

  assert.equal(consumer.sources.length, 1);
  assert.equal(
    consumer.sources[0],
    "http://www.example.com/x/src/something.js"
  );
};

exports["test absolute sourceURL resolution with sourceMapURL"] = function(
  assert
) {
  var map = {
    version: 3,
    sources: ["something.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "http://www.example.com/src"
  };
  var consumer = new SourceMapConsumer(
    map,
    "http://www.example.com/x/q.js.map"
  );

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "http://www.example.com/src/something.js");
};

exports["test mapping without section in an indexed map"] = function(assert) {
  var map = {
    version: 3,
    sections: [
      {
        offset: { line: 0, column: 0 },
        map: {
          version: 3,
          names: [],
          sources: [],
          mappings: "A"
        }
      }
    ]
  };
  var consumer = new SourceMapConsumer(map);
  var mappings = [];
  consumer.eachMapping(function(mapping) {
    mappings.push(mapping);
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].source, null);
  assert.equal(mappings[0].generatedLine, 1);
  assert.equal(mappings[0].generatedColumn, 0);
  assert.equal(mappings[0].originalLine, null);
  assert.equal(mappings[0].originalColumn, null);
  assert.equal(mappings[0].name, null);
};

exports["test mapping without name in an indexed map"] = function(assert) {
  var map = {
    version: 3,
    sections: [
      {
        offset: { line: 0, column: 0 },
        map: {
          version: 3,
          names: [],
          sources: ["foo.js"],
          mappings: "AAAA"
        }
      }
    ]
  };
  var consumer = new SourceMapConsumer(map);
  var mappings = [];
  consumer.eachMapping(function(mapping) {
    mappings.push(mapping);
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].generatedLine, 1);
  assert.equal(mappings[0].generatedColumn, 0);
  assert.equal(mappings[0].originalLine, 1);
  assert.equal(mappings[0].originalColumn, 0);
  assert.equal(mappings[0].name, null);
};

exports["test mapping with name=0 in an indexed map"] = function(assert) {
  var map = {
    version: 3,
    sections: [
      {
        offset: { line: 0, column: 0 },
        map: {
          version: 3,
          names: ["first"],
          sources: ["foo.js"],
          mappings: "AAAAA"
        }
      }
    ]
  };
  var consumer = new SourceMapConsumer(map);
  var mappings = [];
  consumer.eachMapping(function(mapping) {
    mappings.push(mapping);
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].generatedLine, 1);
  assert.equal(mappings[0].generatedColumn, 0);
  assert.equal(mappings[0].originalLine, 1);
  assert.equal(mappings[0].originalColumn, 0);
  assert.equal(mappings[0].name, "first");
};


/***/ }),

/***/ "./test/util.js":
/*!**********************!*\
  !*** ./test/util.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ../lib/util */ "./lib/util.js");

// This is a test mapping which maps functions from two different files
// (one.js and two.js) to a minified generated source.
//
// Here is one.js:
//
//   ONE.foo = function (bar) {
//     return baz(bar);
//   };
//
// Here is two.js:
//
//   TWO.inc = function (n) {
//     return n + 1;
//   };
//
// And here is the generated code (min.js):
//
//   ONE.foo=function(a){return baz(a);};
//   TWO.inc=function(a){return a+1;};
exports.testGeneratedCode =
  " ONE.foo=function(a){return baz(a);};\n" +
  " TWO.inc=function(a){return a+1;};";
exports.testMap = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["one.js", "two.js"],
  sourceRoot: "/the/root",
  mappings:
    "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
};
exports.testMapNoSourceRoot = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["one.js", "two.js"],
  mappings:
    "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
};
exports.testMapEmptySourceRoot = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["one.js", "two.js"],
  sourceRoot: "",
  mappings:
    "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
};
exports.testMapSingleSource = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz"],
  sources: ["one.js"],
  sourceRoot: "",
  mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID"
};
exports.testMapEmptyMappings = {
  version: 3,
  file: "min.js",
  names: [],
  sources: ["one.js", "two.js"],
  sourcesContent: [" ONE.foo = 1;", " TWO.inc = 2;"],
  sourceRoot: "",
  mappings: ""
};
exports.testMapEmptyMappingsRelativeSources = {
  version: 3,
  file: "min.js",
  names: [],
  sources: ["./one.js", "./two.js"],
  sourcesContent: [" ONE.foo = 1;", " TWO.inc = 2;"],
  sourceRoot: "/the/root",
  mappings: ""
};
exports.testMapEmptyMappingsRelativeSources_generatedExpected = {
  version: 3,
  file: "min.js",
  names: [],
  sources: ["one.js", "two.js"],
  sourcesContent: [" ONE.foo = 1;", " TWO.inc = 2;"],
  sourceRoot: "/the/root",
  mappings: ""
};
exports.testMapMultiSourcesMappingRefersSingleSourceOnly = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz"],
  sources: ["one.js", "withoutMappings.js"],
  sourceRoot: "",
  mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID"
};
// This mapping is identical to above, but uses the indexed format instead.
exports.indexedTestMap = {
  version: 3,
  file: "min.js",
  sections: [
    {
      offset: {
        line: 0,
        column: 0
      },
      map: {
        version: 3,
        sources: ["one.js"],
        sourcesContent: [
          " ONE.foo = function (bar) {\n" + "   return baz(bar);\n" + " };"
        ],
        names: ["bar", "baz"],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID",
        file: "min.js",
        sourceRoot: "/the/root"
      }
    },
    {
      offset: {
        line: 1,
        column: 0
      },
      map: {
        version: 3,
        sources: ["two.js"],
        sourcesContent: [
          " TWO.inc = function (n) {\n" + "   return n + 1;\n" + " };"
        ],
        names: ["n"],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOA",
        file: "min.js",
        sourceRoot: "/the/root"
      }
    }
  ]
};
exports.indexedTestMapDifferentSourceRoots = {
  version: 3,
  file: "min.js",
  sections: [
    {
      offset: {
        line: 0,
        column: 0
      },
      map: {
        version: 3,
        sources: ["one.js"],
        sourcesContent: [
          " ONE.foo = function (bar) {\n" + "   return baz(bar);\n" + " };"
        ],
        names: ["bar", "baz"],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID",
        file: "min.js",
        sourceRoot: "/the/root"
      }
    },
    {
      offset: {
        line: 1,
        column: 0
      },
      map: {
        version: 3,
        sources: ["two.js"],
        sourcesContent: [
          " TWO.inc = function (n) {\n" + "   return n + 1;\n" + " };"
        ],
        names: ["n"],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOA",
        file: "min.js",
        sourceRoot: "/different/root"
      }
    }
  ]
};
exports.indexedTestMapColumnOffset = {
  version: 3,
  file: "min.js",
  sections: [
    {
      offset: {
        line: 0,
        column: 0
      },
      map: {
        version: 3,
        sources: ["one.js"],
        sourcesContent: [
          " ONE.foo = function (bar) {\n" + "   return baz(bar);\n" + " };"
        ],
        names: ["bar", "baz"],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID",
        file: "min.js",
        sourceRoot: "/the/root"
      }
    },
    {
      offset: {
        line: 0,
        // Previous section's last generated mapping is [32, Infinity), so
        // we're placing this a bit after that.
        column: 50
      },
      map: {
        version: 3,
        sources: ["two.js"],
        sourcesContent: [
          " TWO.inc = function (n) {\n" + "   return n + 1;\n" + " };"
        ],
        names: ["n"],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOA",
        file: "min.js",
        sourceRoot: "/the/root"
      }
    }
  ]
};
exports.indexedTestMapWithMappingsAtSectionStart = {
  version: 3,
  sections: [
    {
      offset: { line: 0, column: 0 },
      map: {
        version: 3,
        names: ["first", "second"],
        sources: ["foo.js", "bar.js"],
        mappings: "AAAAA,CCCCC"
      }
    },
    {
      offset: { line: 0, column: 2 },
      map: {
        version: 3,
        names: ["third", "fourth"],
        sources: ["baz.js", "quux.js"],
        mappings: "AAAAA,CCCCC"
      }
    }
  ]
};
exports.testMapWithSourcesContent = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["one.js", "two.js"],
  sourcesContent: [
    " ONE.foo = function (bar) {\n" + "   return baz(bar);\n" + " };",
    " TWO.inc = function (n) {\n" + "   return n + 1;\n" + " };"
  ],
  sourceRoot: "/the/root",
  mappings:
    "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
};
exports.testMapRelativeSources = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["./one.js", "./two.js"],
  sourcesContent: [
    " ONE.foo = function (bar) {\n" + "   return baz(bar);\n" + " };",
    " TWO.inc = function (n) {\n" + "   return n + 1;\n" + " };"
  ],
  sourceRoot: "/the/root",
  mappings:
    "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
};
exports.emptyMap = {
  version: 3,
  file: "min.js",
  names: [],
  sources: [],
  mappings: ""
};
exports.mapWithSourcelessMapping = {
  version: 3,
  file: "example.js",
  names: [],
  sources: ["example.js"],
  mappings: "AAgCA,C"
};

function assertMapping(
  generatedLine,
  generatedColumn,
  originalSource,
  originalLine,
  originalColumn,
  name,
  bias,
  map,
  assert,
  dontTestGenerated,
  dontTestOriginal
) {
  if (!dontTestOriginal) {
    var origMapping = map.originalPositionFor({
      line: generatedLine,
      column: generatedColumn,
      bias: bias
    });
    assert.equal(
      origMapping.name,
      name,
      "Incorrect name, expected " +
        JSON.stringify(name) +
        ", got " +
        JSON.stringify(origMapping.name)
    );
    assert.equal(
      origMapping.line,
      originalLine,
      "Incorrect line, expected " +
        JSON.stringify(originalLine) +
        ", got " +
        JSON.stringify(origMapping.line)
    );
    assert.equal(
      origMapping.column,
      originalColumn,
      "Incorrect column, expected " +
        JSON.stringify(originalColumn) +
        ", got " +
        JSON.stringify(origMapping.column)
    );

    var expectedSource;

    if (
      originalSource &&
      map.sourceRoot &&
      originalSource.indexOf(map.sourceRoot) === 0
    ) {
      expectedSource = originalSource;
    } else if (originalSource) {
      expectedSource = map.sourceRoot
        ? util.join(map.sourceRoot, originalSource)
        : originalSource;
    } else {
      expectedSource = null;
    }

    assert.equal(
      origMapping.source,
      expectedSource,
      "Incorrect source, expected " +
        JSON.stringify(expectedSource) +
        ", got " +
        JSON.stringify(origMapping.source)
    );
  }

  if (!dontTestGenerated) {
    var genMapping = map.generatedPositionFor({
      source: originalSource,
      line: originalLine,
      column: originalColumn,
      bias: bias
    });
    assert.equal(
      genMapping.line,
      generatedLine,
      "Incorrect line, expected " +
        JSON.stringify(generatedLine) +
        ", got " +
        JSON.stringify(genMapping.line)
    );
    assert.equal(
      genMapping.column,
      generatedColumn,
      "Incorrect column, expected " +
        JSON.stringify(generatedColumn) +
        ", got " +
        JSON.stringify(genMapping.column)
    );
  }
}
exports.assertMapping = assertMapping;

function assertEqualMaps(assert, actualMap, expectedMap) {
  assert.equal(actualMap.version, expectedMap.version, "version mismatch");
  assert.equal(actualMap.file, expectedMap.file, "file mismatch");
  assert.equal(
    actualMap.names.length,
    expectedMap.names.length,
    "names length mismatch: " +
      actualMap.names.join(", ") +
      " != " +
      expectedMap.names.join(", ")
  );
  for (var i = 0; i < actualMap.names.length; i++) {
    assert.equal(
      actualMap.names[i],
      expectedMap.names[i],
      "names[" +
        i +
        "] mismatch: " +
        actualMap.names.join(", ") +
        " != " +
        expectedMap.names.join(", ")
    );
  }
  assert.equal(
    actualMap.sources.length,
    expectedMap.sources.length,
    "sources length mismatch: " +
      actualMap.sources.join(", ") +
      " != " +
      expectedMap.sources.join(", ")
  );
  for (var i = 0; i < actualMap.sources.length; i++) {
    assert.equal(
      actualMap.sources[i],
      expectedMap.sources[i],
      "sources[" +
        i +
        "] length mismatch: " +
        actualMap.sources.join(", ") +
        " != " +
        expectedMap.sources.join(", ")
    );
  }
  assert.equal(
    actualMap.sourceRoot,
    expectedMap.sourceRoot,
    "sourceRoot mismatch: " +
      actualMap.sourceRoot +
      " != " +
      expectedMap.sourceRoot
  );
  assert.equal(
    actualMap.mappings,
    expectedMap.mappings,
    "mappings mismatch:\nActual:   " +
      actualMap.mappings +
      "\nExpected: " +
      expectedMap.mappings
  );
  if (actualMap.sourcesContent) {
    assert.equal(
      actualMap.sourcesContent.length,
      expectedMap.sourcesContent.length,
      "sourcesContent length mismatch"
    );
    for (var i = 0; i < actualMap.sourcesContent.length; i++) {
      assert.equal(
        actualMap.sourcesContent[i],
        expectedMap.sourcesContent[i],
        "sourcesContent[" + i + "] mismatch"
      );
    }
  }
}
exports.assertEqualMaps = assertEqualMaps;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYXJyYXktc2V0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYmFzZTY0LXZscS5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2JpbmFyeS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9tYXBwaW5nLWxpc3QuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9xdWljay1zb3J0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvc291cmNlLW1hcC1jb25zdW1lci5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LXNvdXJjZS1tYXAtY29uc3VtZXIuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL3Rlc3QvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw2QkFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDMUhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLGlDQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZJQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGdCQUFnQjs7QUFFaEIsbUJBQW1CO0FBQ25CLG9CQUFvQjs7QUFFcEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQjs7QUFFaEIsZ0JBQWdCO0FBQ2hCLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BFQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsNkJBQVE7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNuRkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RIQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLDZCQUFRO0FBQzNCLG1CQUFtQixtQkFBTyxDQUFDLCtDQUFpQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsdUNBQWE7QUFDcEMsZ0JBQWdCLG1CQUFPLENBQUMseUNBQWM7QUFDdEMsZ0JBQWdCLG1CQUFPLENBQUMseUNBQWM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQ0FBa0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsWUFBWTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3Q0FBd0M7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixNQUFNO0FBQ25DO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDLHFCQUFxQiwrQ0FBK0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0EsbUJBQW1CLDRCQUE0QjtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3R1Q0EsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFjO0FBQ3RDLFdBQVcsbUJBQU8sQ0FBQyw2QkFBUTtBQUMzQixlQUFlLG1CQUFPLENBQUMsdUNBQWE7QUFDcEMsa0JBQWtCLG1CQUFPLENBQUMsNkNBQWdCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdGNBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JpQkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw4QkFBUTtBQUMzQix3QkFBd0IsbUJBQU8sQ0FBQyxnRUFBNEI7QUFDNUQsK0JBQStCLG1CQUFPLENBQUMsZ0VBQTRCO0FBQ25FO0FBQ0EsNkJBQTZCLG1CQUFPLENBQUMsZ0VBQTRCO0FBQ2pFO0FBQ0EseUJBQXlCLG1CQUFPLENBQUMsa0VBQTZCO0FBQzlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHFCQUFxQixLQUFLO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0IsS0FBSztBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHFCQUFxQixLQUFLO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0IsS0FBSztBQUNyRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUJBQXFCLEtBQUs7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQixLQUFLO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHFCQUFxQixLQUFLO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0IsS0FBSztBQUNyRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUJBQXFCLEtBQUs7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQixLQUFLO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHFCQUFxQixLQUFLO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0IsS0FBSztBQUNyRDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUJBQXFCLEtBQUs7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQixLQUFLO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxnQkFBZ0I7QUFDaEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckMsZ0JBQWdCO0FBQ2hCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxnQkFBZ0I7QUFDaEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxnQkFBZ0I7QUFDaEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxnQkFBZ0I7QUFDaEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxnQkFBZ0I7QUFDaEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU0sTUFBTTtBQUM1QjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTyxPQUFPO0FBQzlCO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLGdCQUFnQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIscUJBQXFCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIscUJBQXFCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2w0REEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyxrQ0FBYTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekI7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwQkFBMEIsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUJBQXVCLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwQkFBMEIsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUJBQXVCLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwQkFBMEIsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QixVQUFVO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDBCQUEwQixVQUFVO0FBQ3BFLDhCQUE4Qix1QkFBdUIsVUFBVTtBQUMvRDtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCLFVBQVU7QUFDcEUsOEJBQThCLHVCQUF1QixVQUFVO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFDQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdF9zb3VyY2VfbWFwX2NvbnN1bWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0L3Rlc3Qtc291cmNlLW1hcC1jb25zdW1lci5qc1wiKTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG52YXIgaGFzTmF0aXZlTWFwID0gdHlwZW9mIE1hcCAhPT0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGRhdGEgc3RydWN0dXJlIHdoaWNoIGlzIGEgY29tYmluYXRpb24gb2YgYW4gYXJyYXkgYW5kIGEgc2V0LiBBZGRpbmcgYSBuZXdcclxuICogbWVtYmVyIGlzIE8oMSksIHRlc3RpbmcgZm9yIG1lbWJlcnNoaXAgaXMgTygxKSwgYW5kIGZpbmRpbmcgdGhlIGluZGV4IG9mIGFuXHJcbiAqIGVsZW1lbnQgaXMgTygxKS4gUmVtb3ZpbmcgZWxlbWVudHMgZnJvbSB0aGUgc2V0IGlzIG5vdCBzdXBwb3J0ZWQuIE9ubHlcclxuICogc3RyaW5ncyBhcmUgc3VwcG9ydGVkIGZvciBtZW1iZXJzaGlwLlxyXG4gKi9cclxuZnVuY3Rpb24gQXJyYXlTZXQoKSB7XHJcbiAgdGhpcy5fYXJyYXkgPSBbXTtcclxuICB0aGlzLl9zZXQgPSBoYXNOYXRpdmVNYXAgPyBuZXcgTWFwKCkgOiBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG59XHJcblxyXG4vKipcclxuICogU3RhdGljIG1ldGhvZCBmb3IgY3JlYXRpbmcgQXJyYXlTZXQgaW5zdGFuY2VzIGZyb20gYW4gZXhpc3RpbmcgYXJyYXkuXHJcbiAqL1xyXG5BcnJheVNldC5mcm9tQXJyYXkgPSBmdW5jdGlvbiBBcnJheVNldF9mcm9tQXJyYXkoYUFycmF5LCBhQWxsb3dEdXBsaWNhdGVzKSB7XHJcbiAgdmFyIHNldCA9IG5ldyBBcnJheVNldCgpO1xyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhQXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHNldC5hZGQoYUFycmF5W2ldLCBhQWxsb3dEdXBsaWNhdGVzKTtcclxuICB9XHJcbiAgcmV0dXJuIHNldDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gaG93IG1hbnkgdW5pcXVlIGl0ZW1zIGFyZSBpbiB0aGlzIEFycmF5U2V0LiBJZiBkdXBsaWNhdGVzIGhhdmUgYmVlblxyXG4gKiBhZGRlZCwgdGhhbiB0aG9zZSBkbyBub3QgY291bnQgdG93YXJkcyB0aGUgc2l6ZS5cclxuICpcclxuICogQHJldHVybnMgTnVtYmVyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uIEFycmF5U2V0X3NpemUoKSB7XHJcbiAgcmV0dXJuIGhhc05hdGl2ZU1hcFxyXG4gICAgPyB0aGlzLl9zZXQuc2l6ZVxyXG4gICAgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLl9zZXQpLmxlbmd0aDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGdpdmVuIHN0cmluZyB0byB0aGlzIHNldC5cclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gQXJyYXlTZXRfYWRkKGFTdHIsIGFBbGxvd0R1cGxpY2F0ZXMpIHtcclxuICB2YXIgc1N0ciA9IGhhc05hdGl2ZU1hcCA/IGFTdHIgOiB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xyXG4gIHZhciBpc0R1cGxpY2F0ZSA9IGhhc05hdGl2ZU1hcCA/IHRoaXMuaGFzKGFTdHIpIDogaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKTtcclxuICB2YXIgaWR4ID0gdGhpcy5fYXJyYXkubGVuZ3RoO1xyXG4gIGlmICghaXNEdXBsaWNhdGUgfHwgYUFsbG93RHVwbGljYXRlcykge1xyXG4gICAgdGhpcy5fYXJyYXkucHVzaChhU3RyKTtcclxuICB9XHJcbiAgaWYgKCFpc0R1cGxpY2F0ZSkge1xyXG4gICAgaWYgKGhhc05hdGl2ZU1hcCkge1xyXG4gICAgICB0aGlzLl9zZXQuc2V0KGFTdHIsIGlkeCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zZXRbc1N0cl0gPSBpZHg7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIElzIHRoZSBnaXZlbiBzdHJpbmcgYSBtZW1iZXIgb2YgdGhpcyBzZXQ/XHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIEFycmF5U2V0X2hhcyhhU3RyKSB7XHJcbiAgaWYgKGhhc05hdGl2ZU1hcCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NldC5oYXMoYVN0cik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzU3RyID0gdXRpbC50b1NldFN0cmluZyhhU3RyKTtcclxuICAgIHJldHVybiBoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGF0IGlzIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gc3RyaW5nIGluIHRoZSBhcnJheT9cclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIEFycmF5U2V0X2luZGV4T2YoYVN0cikge1xyXG4gIGlmIChoYXNOYXRpdmVNYXApIHtcclxuICAgIHZhciBpZHggPSB0aGlzLl9zZXQuZ2V0KGFTdHIpO1xyXG4gICAgaWYgKGlkeCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBpZHg7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzU3RyID0gdXRpbC50b1NldFN0cmluZyhhU3RyKTtcclxuICAgIGlmIChoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zZXRbc1N0cl07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFTdHIgKyAnXCIgaXMgbm90IGluIHRoZSBzZXQuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogV2hhdCBpcyB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXg/XHJcbiAqXHJcbiAqIEBwYXJhbSBOdW1iZXIgYUlkeFxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLmF0ID0gZnVuY3Rpb24gQXJyYXlTZXRfYXQoYUlkeCkge1xyXG4gIGlmIChhSWR4ID49IDAgJiYgYUlkeCA8IHRoaXMuX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2FJZHhdO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBlbGVtZW50IGluZGV4ZWQgYnkgXCIgKyBhSWR4KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHNldCAod2hpY2ggaGFzIHRoZSBwcm9wZXIgaW5kaWNlc1xyXG4gKiBpbmRpY2F0ZWQgYnkgaW5kZXhPZikuIE5vdGUgdGhhdCB0aGlzIGlzIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgYXJyYXkgdXNlZFxyXG4gKiBmb3Igc3RvcmluZyB0aGUgbWVtYmVycyBzbyB0aGF0IG5vIG9uZSBjYW4gbWVzcyB3aXRoIGludGVybmFsIHN0YXRlLlxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiBBcnJheVNldF90b0FycmF5KCkge1xyXG4gIHJldHVybiB0aGlzLl9hcnJheS5zbGljZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5BcnJheVNldCA9IEFycmF5U2V0O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqXHJcbiAqIEJhc2VkIG9uIHRoZSBCYXNlIDY0IFZMUSBpbXBsZW1lbnRhdGlvbiBpbiBDbG9zdXJlIENvbXBpbGVyOlxyXG4gKiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nsb3N1cmUtY29tcGlsZXIvc291cmNlL2Jyb3dzZS90cnVuay9zcmMvY29tL2dvb2dsZS9kZWJ1Z2dpbmcvc291cmNlbWFwL0Jhc2U2NFZMUS5qYXZhXHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDExIFRoZSBDbG9zdXJlIENvbXBpbGVyIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxyXG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlXHJcbiAqIG1ldDpcclxuICpcclxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcclxuICogICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxyXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlXHJcbiAqICAgIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nXHJcbiAqICAgIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZFxyXG4gKiAgICB3aXRoIHRoZSBkaXN0cmlidXRpb24uXHJcbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgR29vZ2xlIEluYy4gbm9yIHRoZSBuYW1lcyBvZiBpdHNcclxuICogICAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkXHJcbiAqICAgIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cclxuICpcclxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SU1xyXG4gKiBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UXHJcbiAqIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUlxyXG4gKiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVFxyXG4gKiBPV05FUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCxcclxuICogU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVFxyXG4gKiBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSxcclxuICogREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZXHJcbiAqIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcclxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXHJcbiAqIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXHJcbiAqL1xyXG5cclxudmFyIGJhc2U2NCA9IHJlcXVpcmUoXCIuL2Jhc2U2NFwiKTtcclxuXHJcbi8vIEEgc2luZ2xlIGJhc2UgNjQgZGlnaXQgY2FuIGNvbnRhaW4gNiBiaXRzIG9mIGRhdGEuIEZvciB0aGUgYmFzZSA2NCB2YXJpYWJsZVxyXG4vLyBsZW5ndGggcXVhbnRpdGllcyB3ZSB1c2UgaW4gdGhlIHNvdXJjZSBtYXAgc3BlYywgdGhlIGZpcnN0IGJpdCBpcyB0aGUgc2lnbixcclxuLy8gdGhlIG5leHQgZm91ciBiaXRzIGFyZSB0aGUgYWN0dWFsIHZhbHVlLCBhbmQgdGhlIDZ0aCBiaXQgaXMgdGhlXHJcbi8vIGNvbnRpbnVhdGlvbiBiaXQuIFRoZSBjb250aW51YXRpb24gYml0IHRlbGxzIHVzIHdoZXRoZXIgdGhlcmUgYXJlIG1vcmVcclxuLy8gZGlnaXRzIGluIHRoaXMgdmFsdWUgZm9sbG93aW5nIHRoaXMgZGlnaXQuXHJcbi8vXHJcbi8vICAgQ29udGludWF0aW9uXHJcbi8vICAgfCAgICBTaWduXHJcbi8vICAgfCAgICB8XHJcbi8vICAgViAgICBWXHJcbi8vICAgMTAxMDExXHJcblxyXG52YXIgVkxRX0JBU0VfU0hJRlQgPSA1O1xyXG5cclxuLy8gYmluYXJ5OiAxMDAwMDBcclxudmFyIFZMUV9CQVNFID0gMSA8PCBWTFFfQkFTRV9TSElGVDtcclxuXHJcbi8vIGJpbmFyeTogMDExMTExXHJcbnZhciBWTFFfQkFTRV9NQVNLID0gVkxRX0JBU0UgLSAxO1xyXG5cclxuLy8gYmluYXJ5OiAxMDAwMDBcclxudmFyIFZMUV9DT05USU5VQVRJT05fQklUID0gVkxRX0JBU0U7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgZnJvbSBhIHR3by1jb21wbGVtZW50IHZhbHVlIHRvIGEgdmFsdWUgd2hlcmUgdGhlIHNpZ24gYml0IGlzXHJcbiAqIHBsYWNlZCBpbiB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0LiAgRm9yIGV4YW1wbGUsIGFzIGRlY2ltYWxzOlxyXG4gKiAgIDEgYmVjb21lcyAyICgxMCBiaW5hcnkpLCAtMSBiZWNvbWVzIDMgKDExIGJpbmFyeSlcclxuICogICAyIGJlY29tZXMgNCAoMTAwIGJpbmFyeSksIC0yIGJlY29tZXMgNSAoMTAxIGJpbmFyeSlcclxuICovXHJcbmZ1bmN0aW9uIHRvVkxRU2lnbmVkKGFWYWx1ZSkge1xyXG4gIHJldHVybiBhVmFsdWUgPCAwID8gKC1hVmFsdWUgPDwgMSkgKyAxIDogKGFWYWx1ZSA8PCAxKSArIDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0byBhIHR3by1jb21wbGVtZW50IHZhbHVlIGZyb20gYSB2YWx1ZSB3aGVyZSB0aGUgc2lnbiBiaXQgaXNcclxuICogcGxhY2VkIGluIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQuICBGb3IgZXhhbXBsZSwgYXMgZGVjaW1hbHM6XHJcbiAqICAgMiAoMTAgYmluYXJ5KSBiZWNvbWVzIDEsIDMgKDExIGJpbmFyeSkgYmVjb21lcyAtMVxyXG4gKiAgIDQgKDEwMCBiaW5hcnkpIGJlY29tZXMgMiwgNSAoMTAxIGJpbmFyeSkgYmVjb21lcyAtMlxyXG4gKi9cclxuZnVuY3Rpb24gZnJvbVZMUVNpZ25lZChhVmFsdWUpIHtcclxuICB2YXIgaXNOZWdhdGl2ZSA9IChhVmFsdWUgJiAxKSA9PT0gMTtcclxuICB2YXIgc2hpZnRlZCA9IGFWYWx1ZSA+PiAxO1xyXG4gIHJldHVybiBpc05lZ2F0aXZlID8gLXNoaWZ0ZWQgOiBzaGlmdGVkO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYmFzZSA2NCBWTFEgZW5jb2RlZCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gYmFzZTY0VkxRX2VuY29kZShhVmFsdWUpIHtcclxuICB2YXIgZW5jb2RlZCA9IFwiXCI7XHJcbiAgdmFyIGRpZ2l0O1xyXG5cclxuICB2YXIgdmxxID0gdG9WTFFTaWduZWQoYVZhbHVlKTtcclxuXHJcbiAgZG8ge1xyXG4gICAgZGlnaXQgPSB2bHEgJiBWTFFfQkFTRV9NQVNLO1xyXG4gICAgdmxxID4+Pj0gVkxRX0JBU0VfU0hJRlQ7XHJcbiAgICBpZiAodmxxID4gMCkge1xyXG4gICAgICAvLyBUaGVyZSBhcmUgc3RpbGwgbW9yZSBkaWdpdHMgaW4gdGhpcyB2YWx1ZSwgc28gd2UgbXVzdCBtYWtlIHN1cmUgdGhlXHJcbiAgICAgIC8vIGNvbnRpbnVhdGlvbiBiaXQgaXMgbWFya2VkLlxyXG4gICAgICBkaWdpdCB8PSBWTFFfQ09OVElOVUFUSU9OX0JJVDtcclxuICAgIH1cclxuICAgIGVuY29kZWQgKz0gYmFzZTY0LmVuY29kZShkaWdpdCk7XHJcbiAgfSB3aGlsZSAodmxxID4gMCk7XHJcblxyXG4gIHJldHVybiBlbmNvZGVkO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgdGhlIG5leHQgYmFzZSA2NCBWTFEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gc3RyaW5nIGFuZCByZXR1cm5zIHRoZVxyXG4gKiB2YWx1ZSBhbmQgdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyB2aWEgdGhlIG91dCBwYXJhbWV0ZXIuXHJcbiAqL1xyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIGJhc2U2NFZMUV9kZWNvZGUoYVN0ciwgYUluZGV4LCBhT3V0UGFyYW0pIHtcclxuICB2YXIgc3RyTGVuID0gYVN0ci5sZW5ndGg7XHJcbiAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgdmFyIHNoaWZ0ID0gMDtcclxuICB2YXIgY29udGludWF0aW9uLCBkaWdpdDtcclxuXHJcbiAgZG8ge1xyXG4gICAgaWYgKGFJbmRleCA+PSBzdHJMZW4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgbW9yZSBkaWdpdHMgaW4gYmFzZSA2NCBWTFEgdmFsdWUuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpZ2l0ID0gYmFzZTY0LmRlY29kZShhU3RyLmNoYXJDb2RlQXQoYUluZGV4KyspKTtcclxuICAgIGlmIChkaWdpdCA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgZGlnaXQ6IFwiICsgYVN0ci5jaGFyQXQoYUluZGV4IC0gMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRpbnVhdGlvbiA9ICEhKGRpZ2l0ICYgVkxRX0NPTlRJTlVBVElPTl9CSVQpO1xyXG4gICAgZGlnaXQgJj0gVkxRX0JBU0VfTUFTSztcclxuICAgIHJlc3VsdCA9IHJlc3VsdCArIChkaWdpdCA8PCBzaGlmdCk7XHJcbiAgICBzaGlmdCArPSBWTFFfQkFTRV9TSElGVDtcclxuICB9IHdoaWxlIChjb250aW51YXRpb24pO1xyXG5cclxuICBhT3V0UGFyYW0udmFsdWUgPSBmcm9tVkxRU2lnbmVkKHJlc3VsdCk7XHJcbiAgYU91dFBhcmFtLnJlc3QgPSBhSW5kZXg7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgaW50VG9DaGFyTWFwID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIuc3BsaXQoXHJcbiAgXCJcIlxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZSBhbiBpbnRlZ2VyIGluIHRoZSByYW5nZSBvZiAwIHRvIDYzIHRvIGEgc2luZ2xlIGJhc2UgNjQgZGlnaXQuXHJcbiAqL1xyXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gIGlmICgwIDw9IG51bWJlciAmJiBudW1iZXIgPCBpbnRUb0NoYXJNYXAubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gaW50VG9DaGFyTWFwW251bWJlcl07XHJcbiAgfVxyXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJNdXN0IGJlIGJldHdlZW4gMCBhbmQgNjM6IFwiICsgbnVtYmVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGUgYSBzaW5nbGUgYmFzZSA2NCBjaGFyYWN0ZXIgY29kZSBkaWdpdCB0byBhbiBpbnRlZ2VyLiBSZXR1cm5zIC0xIG9uXHJcbiAqIGZhaWx1cmUuXHJcbiAqL1xyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKGNoYXJDb2RlKSB7XHJcbiAgdmFyIGJpZ0EgPSA2NTsgLy8gJ0EnXHJcbiAgdmFyIGJpZ1ogPSA5MDsgLy8gJ1onXHJcblxyXG4gIHZhciBsaXR0bGVBID0gOTc7IC8vICdhJ1xyXG4gIHZhciBsaXR0bGVaID0gMTIyOyAvLyAneidcclxuXHJcbiAgdmFyIHplcm8gPSA0ODsgLy8gJzAnXHJcbiAgdmFyIG5pbmUgPSA1NzsgLy8gJzknXHJcblxyXG4gIHZhciBwbHVzID0gNDM7IC8vICcrJ1xyXG4gIHZhciBzbGFzaCA9IDQ3OyAvLyAnLydcclxuXHJcbiAgdmFyIGxpdHRsZU9mZnNldCA9IDI2O1xyXG4gIHZhciBudW1iZXJPZmZzZXQgPSA1MjtcclxuXHJcbiAgLy8gMCAtIDI1OiBBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlxyXG4gIGlmIChiaWdBIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IGJpZ1opIHtcclxuICAgIHJldHVybiBjaGFyQ29kZSAtIGJpZ0E7XHJcbiAgfVxyXG5cclxuICAvLyAyNiAtIDUxOiBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elxyXG4gIGlmIChsaXR0bGVBIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IGxpdHRsZVopIHtcclxuICAgIHJldHVybiBjaGFyQ29kZSAtIGxpdHRsZUEgKyBsaXR0bGVPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICAvLyA1MiAtIDYxOiAwMTIzNDU2Nzg5XHJcbiAgaWYgKHplcm8gPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbmluZSkge1xyXG4gICAgcmV0dXJuIGNoYXJDb2RlIC0gemVybyArIG51bWJlck9mZnNldDtcclxuICB9XHJcblxyXG4gIC8vIDYyOiArXHJcbiAgaWYgKGNoYXJDb2RlID09IHBsdXMpIHtcclxuICAgIHJldHVybiA2MjtcclxuICB9XHJcblxyXG4gIC8vIDYzOiAvXHJcbiAgaWYgKGNoYXJDb2RlID09IHNsYXNoKSB7XHJcbiAgICByZXR1cm4gNjM7XHJcbiAgfVxyXG5cclxuICAvLyBJbnZhbGlkIGJhc2U2NCBkaWdpdC5cclxuICByZXR1cm4gLTE7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG5leHBvcnRzLkdSRUFURVNUX0xPV0VSX0JPVU5EID0gMTtcclxuZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCA9IDI7XHJcblxyXG4vKipcclxuICogUmVjdXJzaXZlIGltcGxlbWVudGF0aW9uIG9mIGJpbmFyeSBzZWFyY2guXHJcbiAqXHJcbiAqIEBwYXJhbSBhTG93IEluZGljZXMgaGVyZSBhbmQgbG93ZXIgZG8gbm90IGNvbnRhaW4gdGhlIG5lZWRsZS5cclxuICogQHBhcmFtIGFIaWdoIEluZGljZXMgaGVyZSBhbmQgaGlnaGVyIGRvIG5vdCBjb250YWluIHRoZSBuZWVkbGUuXHJcbiAqIEBwYXJhbSBhTmVlZGxlIFRoZSBlbGVtZW50IGJlaW5nIHNlYXJjaGVkIGZvci5cclxuICogQHBhcmFtIGFIYXlzdGFjayBUaGUgbm9uLWVtcHR5IGFycmF5IGJlaW5nIHNlYXJjaGVkLlxyXG4gKiBAcGFyYW0gYUNvbXBhcmUgRnVuY3Rpb24gd2hpY2ggdGFrZXMgdHdvIGVsZW1lbnRzIGFuZCByZXR1cm5zIC0xLCAwLCBvciAxLlxyXG4gKiBAcGFyYW0gYUJpYXMgRWl0aGVyICdiaW5hcnlTZWFyY2guR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxyXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxyXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiByZWN1cnNpdmVTZWFyY2goYUxvdywgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKSB7XHJcbiAgLy8gVGhpcyBmdW5jdGlvbiB0ZXJtaW5hdGVzIHdoZW4gb25lIG9mIHRoZSBmb2xsb3dpbmcgaXMgdHJ1ZTpcclxuICAvL1xyXG4gIC8vICAgMS4gV2UgZmluZCB0aGUgZXhhY3QgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXHJcbiAgLy9cclxuICAvLyAgIDIuIFdlIGRpZCBub3QgZmluZCB0aGUgZXhhY3QgZWxlbWVudCwgYnV0IHdlIGNhbiByZXR1cm4gdGhlIGluZGV4IG9mXHJcbiAgLy8gICAgICB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQuXHJcbiAgLy9cclxuICAvLyAgIDMuIFdlIGRpZCBub3QgZmluZCB0aGUgZXhhY3QgZWxlbWVudCwgYW5kIHRoZXJlIGlzIG5vIG5leHQtY2xvc2VzdFxyXG4gIC8vICAgICAgZWxlbWVudCB0aGFuIHRoZSBvbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IsIHNvIHdlIHJldHVybiAtMS5cclxuICB2YXIgbWlkID0gTWF0aC5mbG9vcigoYUhpZ2ggLSBhTG93KSAvIDIpICsgYUxvdztcclxuICB2YXIgY21wID0gYUNvbXBhcmUoYU5lZWRsZSwgYUhheXN0YWNrW21pZF0sIHRydWUpO1xyXG4gIGlmIChjbXAgPT09IDApIHtcclxuICAgIC8vIEZvdW5kIHRoZSBlbGVtZW50IHdlIGFyZSBsb29raW5nIGZvci5cclxuICAgIHJldHVybiBtaWQ7XHJcbiAgfSBlbHNlIGlmIChjbXAgPiAwKSB7XHJcbiAgICAvLyBPdXIgbmVlZGxlIGlzIGdyZWF0ZXIgdGhhbiBhSGF5c3RhY2tbbWlkXS5cclxuICAgIGlmIChhSGlnaCAtIG1pZCA+IDEpIHtcclxuICAgICAgLy8gVGhlIGVsZW1lbnQgaXMgaW4gdGhlIHVwcGVyIGhhbGYuXHJcbiAgICAgIHJldHVybiByZWN1cnNpdmVTZWFyY2gobWlkLCBhSGlnaCwgYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSBleGFjdCBuZWVkbGUgZWxlbWVudCB3YXMgbm90IGZvdW5kIGluIHRoaXMgaGF5c3RhY2suIERldGVybWluZSBpZlxyXG4gICAgLy8gd2UgYXJlIGluIHRlcm1pbmF0aW9uIGNhc2UgKDMpIG9yICgyKSBhbmQgcmV0dXJuIHRoZSBhcHByb3ByaWF0ZSB0aGluZy5cclxuICAgIGlmIChhQmlhcyA9PSBleHBvcnRzLkxFQVNUX1VQUEVSX0JPVU5EKSB7XHJcbiAgICAgIHJldHVybiBhSGlnaCA8IGFIYXlzdGFjay5sZW5ndGggPyBhSGlnaCA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG1pZDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gT3VyIG5lZWRsZSBpcyBsZXNzIHRoYW4gYUhheXN0YWNrW21pZF0uXHJcbiAgICBpZiAobWlkIC0gYUxvdyA+IDEpIHtcclxuICAgICAgLy8gVGhlIGVsZW1lbnQgaXMgaW4gdGhlIGxvd2VyIGhhbGYuXHJcbiAgICAgIHJldHVybiByZWN1cnNpdmVTZWFyY2goYUxvdywgbWlkLCBhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgYXJlIGluIHRlcm1pbmF0aW9uIGNhc2UgKDMpIG9yICgyKSBhbmQgcmV0dXJuIHRoZSBhcHByb3ByaWF0ZSB0aGluZy5cclxuICAgIGlmIChhQmlhcyA9PSBleHBvcnRzLkxFQVNUX1VQUEVSX0JPVU5EKSB7XHJcbiAgICAgIHJldHVybiBtaWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYUxvdyA8IDAgPyAtMSA6IGFMb3c7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBiaW5hcnkgc2VhcmNoIHdoaWNoIHdpbGwgYWx3YXlzIHRyeSBhbmQgcmV0dXJuXHJcbiAqIHRoZSBpbmRleCBvZiB0aGUgY2xvc2VzdCBlbGVtZW50IGlmIHRoZXJlIGlzIG5vIGV4YWN0IGhpdC4gVGhpcyBpcyBiZWNhdXNlXHJcbiAqIG1hcHBpbmdzIGJldHdlZW4gb3JpZ2luYWwgYW5kIGdlbmVyYXRlZCBsaW5lL2NvbCBwYWlycyBhcmUgc2luZ2xlIHBvaW50cyxcclxuICogYW5kIHRoZXJlIGlzIGFuIGltcGxpY2l0IHJlZ2lvbiBiZXR3ZWVuIGVhY2ggb2YgdGhlbSwgc28gYSBtaXNzIGp1c3QgbWVhbnNcclxuICogdGhhdCB5b3UgYXJlbid0IG9uIHRoZSB2ZXJ5IHN0YXJ0IG9mIGEgcmVnaW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU5lZWRsZSBUaGUgZWxlbWVudCB5b3UgYXJlIGxvb2tpbmcgZm9yLlxyXG4gKiBAcGFyYW0gYUhheXN0YWNrIFRoZSBhcnJheSB0aGF0IGlzIGJlaW5nIHNlYXJjaGVkLlxyXG4gKiBAcGFyYW0gYUNvbXBhcmUgQSBmdW5jdGlvbiB3aGljaCB0YWtlcyB0aGUgbmVlZGxlIGFuZCBhbiBlbGVtZW50IGluIHRoZVxyXG4gKiAgICAgYXJyYXkgYW5kIHJldHVybnMgLTEsIDAsIG9yIDEgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIG5lZWRsZSBpcyBsZXNzXHJcbiAqICAgICB0aGFuLCBlcXVhbCB0bywgb3IgZ3JlYXRlciB0aGFuIHRoZSBlbGVtZW50LCByZXNwZWN0aXZlbHkuXHJcbiAqIEBwYXJhbSBhQmlhcyBFaXRoZXIgJ2JpbmFyeVNlYXJjaC5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcclxuICogICAgICdiaW5hcnlTZWFyY2guTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXHJcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXHJcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cclxuICogICAgIERlZmF1bHRzIHRvICdiaW5hcnlTZWFyY2guR1JFQVRFU1RfTE9XRVJfQk9VTkQnLlxyXG4gKi9cclxuZXhwb3J0cy5zZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2goYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpIHtcclxuICBpZiAoYUhheXN0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuXHJcbiAgdmFyIGluZGV4ID0gcmVjdXJzaXZlU2VhcmNoKFxyXG4gICAgLTEsXHJcbiAgICBhSGF5c3RhY2subGVuZ3RoLFxyXG4gICAgYU5lZWRsZSxcclxuICAgIGFIYXlzdGFjayxcclxuICAgIGFDb21wYXJlLFxyXG4gICAgYUJpYXMgfHwgZXhwb3J0cy5HUkVBVEVTVF9MT1dFUl9CT1VORFxyXG4gICk7XHJcbiAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuXHJcbiAgLy8gV2UgaGF2ZSBmb3VuZCBlaXRoZXIgdGhlIGV4YWN0IGVsZW1lbnQsIG9yIHRoZSBuZXh0LWNsb3Nlc3QgZWxlbWVudCB0aGFuXHJcbiAgLy8gdGhlIG9uZSB3ZSBhcmUgc2VhcmNoaW5nIGZvci4gSG93ZXZlciwgdGhlcmUgbWF5IGJlIG1vcmUgdGhhbiBvbmUgc3VjaFxyXG4gIC8vIGVsZW1lbnQuIE1ha2Ugc3VyZSB3ZSBhbHdheXMgcmV0dXJuIHRoZSBzbWFsbGVzdCBvZiB0aGVzZS5cclxuICB3aGlsZSAoaW5kZXggLSAxID49IDApIHtcclxuICAgIGlmIChhQ29tcGFyZShhSGF5c3RhY2tbaW5kZXhdLCBhSGF5c3RhY2tbaW5kZXggLSAxXSwgdHJ1ZSkgIT09IDApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICAtLWluZGV4O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZGV4O1xyXG59O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDE0IE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIG1hcHBpbmdCIGlzIGFmdGVyIG1hcHBpbmdBIHdpdGggcmVzcGVjdCB0byBnZW5lcmF0ZWRcclxuICogcG9zaXRpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZW5lcmF0ZWRQb3NpdGlvbkFmdGVyKG1hcHBpbmdBLCBtYXBwaW5nQikge1xyXG4gIC8vIE9wdGltaXplZCBmb3IgbW9zdCBjb21tb24gY2FzZVxyXG4gIHZhciBsaW5lQSA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmU7XHJcbiAgdmFyIGxpbmVCID0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICB2YXIgY29sdW1uQSA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbjtcclxuICB2YXIgY29sdW1uQiA9IG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICByZXR1cm4gKFxyXG4gICAgbGluZUIgPiBsaW5lQSB8fFxyXG4gICAgKGxpbmVCID09IGxpbmVBICYmIGNvbHVtbkIgPj0gY29sdW1uQSkgfHxcclxuICAgIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCKSA8PSAwXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZGF0YSBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhIHNvcnRlZCB2aWV3IG9mIGFjY3VtdWxhdGVkIG1hcHBpbmdzIGluIGFcclxuICogcGVyZm9ybWFuY2UgY29uc2Npb3VzIG1hbm5lci4gSXQgdHJhZGVzIGEgbmVnbGlnaWJsZSBvdmVyaGVhZCBpbiBnZW5lcmFsXHJcbiAqIGNhc2UgZm9yIGEgbGFyZ2Ugc3BlZWR1cCBpbiBjYXNlIG9mIG1hcHBpbmdzIGJlaW5nIGFkZGVkIGluIG9yZGVyLlxyXG4gKi9cclxuZnVuY3Rpb24gTWFwcGluZ0xpc3QoKSB7XHJcbiAgdGhpcy5fYXJyYXkgPSBbXTtcclxuICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xyXG4gIC8vIFNlcnZlcyBhcyBpbmZpbXVtXHJcbiAgdGhpcy5fbGFzdCA9IHsgZ2VuZXJhdGVkTGluZTogLTEsIGdlbmVyYXRlZENvbHVtbjogMCB9O1xyXG59XHJcblxyXG4vKipcclxuICogSXRlcmF0ZSB0aHJvdWdoIGludGVybmFsIGl0ZW1zLiBUaGlzIG1ldGhvZCB0YWtlcyB0aGUgc2FtZSBhcmd1bWVudHMgdGhhdFxyXG4gKiBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIHRha2VzLlxyXG4gKlxyXG4gKiBOT1RFOiBUaGUgb3JkZXIgb2YgdGhlIG1hcHBpbmdzIGlzIE5PVCBndWFyYW50ZWVkLlxyXG4gKi9cclxuTWFwcGluZ0xpc3QucHJvdG90eXBlLnVuc29ydGVkRm9yRWFjaCA9IGZ1bmN0aW9uIE1hcHBpbmdMaXN0X2ZvckVhY2goXHJcbiAgYUNhbGxiYWNrLFxyXG4gIGFUaGlzQXJnXHJcbikge1xyXG4gIHRoaXMuX2FycmF5LmZvckVhY2goYUNhbGxiYWNrLCBhVGhpc0FyZyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBnaXZlbiBzb3VyY2UgbWFwcGluZy5cclxuICpcclxuICogQHBhcmFtIE9iamVjdCBhTWFwcGluZ1xyXG4gKi9cclxuTWFwcGluZ0xpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIE1hcHBpbmdMaXN0X2FkZChhTWFwcGluZykge1xyXG4gIGlmIChnZW5lcmF0ZWRQb3NpdGlvbkFmdGVyKHRoaXMuX2xhc3QsIGFNYXBwaW5nKSkge1xyXG4gICAgdGhpcy5fbGFzdCA9IGFNYXBwaW5nO1xyXG4gICAgdGhpcy5fYXJyYXkucHVzaChhTWFwcGluZyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fYXJyYXkucHVzaChhTWFwcGluZyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGZsYXQsIHNvcnRlZCBhcnJheSBvZiBtYXBwaW5ncy4gVGhlIG1hcHBpbmdzIGFyZSBzb3J0ZWQgYnlcclxuICogZ2VuZXJhdGVkIHBvc2l0aW9uLlxyXG4gKlxyXG4gKiBXQVJOSU5HOiBUaGlzIG1ldGhvZCByZXR1cm5zIGludGVybmFsIGRhdGEgd2l0aG91dCBjb3B5aW5nLCBmb3JcclxuICogcGVyZm9ybWFuY2UuIFRoZSByZXR1cm4gdmFsdWUgbXVzdCBOT1QgYmUgbXV0YXRlZCwgYW5kIHNob3VsZCBiZSB0cmVhdGVkIGFzXHJcbiAqIGFuIGltbXV0YWJsZSBib3Jyb3cuIElmIHlvdSB3YW50IHRvIHRha2Ugb3duZXJzaGlwLCB5b3UgbXVzdCBtYWtlIHlvdXIgb3duXHJcbiAqIGNvcHkuXHJcbiAqL1xyXG5NYXBwaW5nTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIE1hcHBpbmdMaXN0X3RvQXJyYXkoKSB7XHJcbiAgaWYgKCF0aGlzLl9zb3J0ZWQpIHtcclxuICAgIHRoaXMuX2FycmF5LnNvcnQodXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZCk7XHJcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy5fYXJyYXk7XHJcbn07XHJcblxyXG5leHBvcnRzLk1hcHBpbmdMaXN0ID0gTWFwcGluZ0xpc3Q7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG4vLyBJdCB0dXJucyBvdXQgdGhhdCBzb21lIChtb3N0PykgSmF2YVNjcmlwdCBlbmdpbmVzIGRvbid0IHNlbGYtaG9zdFxyXG4vLyBgQXJyYXkucHJvdG90eXBlLnNvcnRgLiBUaGlzIG1ha2VzIHNlbnNlIGJlY2F1c2UgQysrIHdpbGwgbGlrZWx5IHJlbWFpblxyXG4vLyBmYXN0ZXIgdGhhbiBKUyB3aGVuIGRvaW5nIHJhdyBDUFUtaW50ZW5zaXZlIHNvcnRpbmcuIEhvd2V2ZXIsIHdoZW4gdXNpbmcgYVxyXG4vLyBjdXN0b20gY29tcGFyYXRvciBmdW5jdGlvbiwgY2FsbGluZyBiYWNrIGFuZCBmb3J0aCBiZXR3ZWVuIHRoZSBWTSdzIEMrKyBhbmRcclxuLy8gSklUJ2QgSlMgaXMgcmF0aGVyIHNsb3cgKmFuZCogbG9zZXMgSklUIHR5cGUgaW5mb3JtYXRpb24sIHJlc3VsdGluZyBpblxyXG4vLyB3b3JzZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24gdGhhbiB3b3VsZCBiZSBvcHRpbWFsLiBJblxyXG4vLyBmYWN0LCB3aGVuIHNvcnRpbmcgd2l0aCBhIGNvbXBhcmF0b3IsIHRoZXNlIGNvc3RzIG91dHdlaWdoIHRoZSBiZW5lZml0cyBvZlxyXG4vLyBzb3J0aW5nIGluIEMrKy4gQnkgdXNpbmcgb3VyIG93biBKUy1pbXBsZW1lbnRlZCBRdWljayBTb3J0IChiZWxvdyksIHdlIGdldFxyXG4vLyBhIH4zNTAwbXMgbWVhbiBzcGVlZC11cCBpbiBgYmVuY2gvYmVuY2guaHRtbGAuXHJcblxyXG4vLyBDYXB0dXJlIE1hdGgucmFuZG9tKCkgbm93LCB0byBhdm9pZCBwcm9ibGVtcyBpbiBjYXNlIGEgdGVzdCBtb2NrcyBpdCBsYXRlci5cclxuLy8gSWYgTWF0aC5yYW5kb20oKSBpcyBtb2NrZWQgdG8gcmV0dXJuIGEgY29uc3RhbnQgdmFsdWUsIHF1aWNrU29ydCBtYXkgYmVjb21lXHJcbi8vIE8obl4yKSB3aGVuIGludm9rZWQgb24gYWxyZWFkeS1zb3J0ZWQgZGF0YS5cclxudmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLyoqXHJcbiAqIFN3YXAgdGhlIGVsZW1lbnRzIGluZGV4ZWQgYnkgYHhgIGFuZCBgeWAgaW4gdGhlIGFycmF5IGBhcnlgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcclxuICogICAgICAgIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgc2Vjb25kIGl0ZW0uXHJcbiAqL1xyXG5mdW5jdGlvbiBzd2FwKGFyeSwgeCwgeSkge1xyXG4gIHZhciB0ZW1wID0gYXJ5W3hdO1xyXG4gIGFyeVt4XSA9IGFyeVt5XTtcclxuICBhcnlbeV0gPSB0ZW1wO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIHdpdGhpbiB0aGUgcmFuZ2UgYGxvdyAuLiBoaWdoYCBpbmNsdXNpdmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3dcclxuICogICAgICAgIFRoZSBsb3dlciBib3VuZCBvbiB0aGUgcmFuZ2UuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoXHJcbiAqICAgICAgICBUaGUgdXBwZXIgYm91bmQgb24gdGhlIHJhbmdlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmFuZG9tSW50SW5SYW5nZShsb3csIGhpZ2gpIHtcclxuICByZXR1cm4gTWF0aC5yb3VuZChsb3cgKyByYW5kb20oKSAqIChoaWdoIC0gbG93KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgUXVpY2sgU29ydCBhbGdvcml0aG0uXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyeVxyXG4gKiAgICAgICAgQW4gYXJyYXkgdG8gc29ydC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29tcGFyYXRvclxyXG4gKiAgICAgICAgRnVuY3Rpb24gdG8gdXNlIHRvIGNvbXBhcmUgdHdvIGl0ZW1zLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gcFxyXG4gKiAgICAgICAgU3RhcnQgaW5kZXggb2YgdGhlIGFycmF5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByXHJcbiAqICAgICAgICBFbmQgaW5kZXggb2YgdGhlIGFycmF5XHJcbiAqL1xyXG5mdW5jdGlvbiBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHAsIHIpIHtcclxuICAvLyBJZiBvdXIgbG93ZXIgYm91bmQgaXMgbGVzcyB0aGFuIG91ciB1cHBlciBib3VuZCwgd2UgKDEpIHBhcnRpdGlvbiB0aGVcclxuICAvLyBhcnJheSBpbnRvIHR3byBwaWVjZXMgYW5kICgyKSByZWN1cnNlIG9uIGVhY2ggaGFsZi4gSWYgaXQgaXMgbm90LCB0aGlzIGlzXHJcbiAgLy8gdGhlIGVtcHR5IGFycmF5IGFuZCBvdXIgYmFzZSBjYXNlLlxyXG5cclxuICBpZiAocCA8IHIpIHtcclxuICAgIC8vICgxKSBQYXJ0aXRpb25pbmcuXHJcbiAgICAvL1xyXG4gICAgLy8gVGhlIHBhcnRpdGlvbmluZyBjaG9vc2VzIGEgcGl2b3QgYmV0d2VlbiBgcGAgYW5kIGByYCBhbmQgbW92ZXMgYWxsXHJcbiAgICAvLyBlbGVtZW50cyB0aGF0IGFyZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHBpdm90IHRvIHRoZSBiZWZvcmUgaXQsIGFuZFxyXG4gICAgLy8gYWxsIHRoZSBlbGVtZW50cyB0aGF0IGFyZSBncmVhdGVyIHRoYW4gaXQgYWZ0ZXIgaXQuIFRoZSBlZmZlY3QgaXMgdGhhdFxyXG4gICAgLy8gb25jZSBwYXJ0aXRpb24gaXMgZG9uZSwgdGhlIHBpdm90IGlzIGluIHRoZSBleGFjdCBwbGFjZSBpdCB3aWxsIGJlIHdoZW5cclxuICAgIC8vIHRoZSBhcnJheSBpcyBwdXQgaW4gc29ydGVkIG9yZGVyLCBhbmQgaXQgd2lsbCBub3QgbmVlZCB0byBiZSBtb3ZlZFxyXG4gICAgLy8gYWdhaW4uIFRoaXMgcnVucyBpbiBPKG4gbG9nIG4pIHRpbWUuXHJcblxyXG4gICAgLy8gQWx3YXlzIGNob29zZSBhIHJhbmRvbSBwaXZvdCBzbyB0aGF0IGFuIGlucHV0IGFycmF5IHdoaWNoIGlzIHJldmVyc2VcclxuICAgIC8vIHNvcnRlZCBkb2VzIG5vdCBjYXVzZSBPKG5eMikgcnVubmluZyB0aW1lLlxyXG4gICAgdmFyIHBpdm90SW5kZXggPSByYW5kb21JbnRJblJhbmdlKHAsIHIpO1xyXG4gICAgdmFyIGkgPSBwIC0gMTtcclxuXHJcbiAgICBzd2FwKGFyeSwgcGl2b3RJbmRleCwgcik7XHJcbiAgICB2YXIgcGl2b3QgPSBhcnlbcl07XHJcblxyXG4gICAgLy8gSW1tZWRpYXRlbHkgYWZ0ZXIgYGpgIGlzIGluY3JlbWVudGVkIGluIHRoaXMgbG9vcCwgdGhlIGZvbGxvd2luZyBob2xkXHJcbiAgICAvLyB0cnVlOlxyXG4gICAgLy9cclxuICAgIC8vICAgKiBFdmVyeSBlbGVtZW50IGluIGBhcnlbcCAuLiBpXWAgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwaXZvdC5cclxuICAgIC8vXHJcbiAgICAvLyAgICogRXZlcnkgZWxlbWVudCBpbiBgYXJ5W2krMSAuLiBqLTFdYCBpcyBncmVhdGVyIHRoYW4gdGhlIHBpdm90LlxyXG4gICAgZm9yICh2YXIgaiA9IHA7IGogPCByOyBqKyspIHtcclxuICAgICAgaWYgKGNvbXBhcmF0b3IoYXJ5W2pdLCBwaXZvdCkgPD0gMCkge1xyXG4gICAgICAgIGkgKz0gMTtcclxuICAgICAgICBzd2FwKGFyeSwgaSwgaik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzd2FwKGFyeSwgaSArIDEsIGopO1xyXG4gICAgdmFyIHEgPSBpICsgMTtcclxuXHJcbiAgICAvLyAoMikgUmVjdXJzZSBvbiBlYWNoIGhhbGYuXHJcblxyXG4gICAgZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCBwLCBxIC0gMSk7XHJcbiAgICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHEgKyAxLCByKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTb3J0IHRoZSBnaXZlbiBhcnJheSBpbi1wbGFjZSB3aXRoIHRoZSBnaXZlbiBjb21wYXJhdG9yIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcclxuICogICAgICAgIEFuIGFycmF5IHRvIHNvcnQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmF0b3JcclxuICogICAgICAgIEZ1bmN0aW9uIHRvIHVzZSB0byBjb21wYXJlIHR3byBpdGVtcy5cclxuICovXHJcbmV4cG9ydHMucXVpY2tTb3J0ID0gZnVuY3Rpb24oYXJ5LCBjb21wYXJhdG9yKSB7XHJcbiAgZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCAwLCBhcnkubGVuZ3RoIC0gMSk7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBiaW5hcnlTZWFyY2ggPSByZXF1aXJlKFwiLi9iaW5hcnktc2VhcmNoXCIpO1xyXG52YXIgQXJyYXlTZXQgPSByZXF1aXJlKFwiLi9hcnJheS1zZXRcIikuQXJyYXlTZXQ7XHJcbnZhciBiYXNlNjRWTFEgPSByZXF1aXJlKFwiLi9iYXNlNjQtdmxxXCIpO1xyXG52YXIgcXVpY2tTb3J0ID0gcmVxdWlyZShcIi4vcXVpY2stc29ydFwiKS5xdWlja1NvcnQ7XHJcblxyXG5mdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XHJcbiAgdmFyIHNvdXJjZU1hcCA9IGFTb3VyY2VNYXA7XHJcbiAgaWYgKHR5cGVvZiBhU291cmNlTWFwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc291cmNlTWFwLnNlY3Rpb25zICE9IG51bGxcclxuICAgID8gbmV3IEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcihzb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpXHJcbiAgICA6IG5ldyBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XHJcbn1cclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAgPSBmdW5jdGlvbihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XHJcbiAgcmV0dXJuIEJhc2ljU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcChhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcHBpbmcgc3BlYyB0aGF0IHdlIGFyZSBjb25zdW1pbmcuXHJcbiAqL1xyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xyXG5cclxuLy8gYF9fZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZCBgX19vcmlnaW5hbE1hcHBpbmdzYCBhcmUgYXJyYXlzIHRoYXQgaG9sZCB0aGVcclxuLy8gcGFyc2VkIG1hcHBpbmcgY29vcmRpbmF0ZXMgZnJvbSB0aGUgc291cmNlIG1hcCdzIFwibWFwcGluZ3NcIiBhdHRyaWJ1dGUuIFRoZXlcclxuLy8gYXJlIGxhemlseSBpbnN0YW50aWF0ZWQsIGFjY2Vzc2VkIHZpYSB0aGUgYF9nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kXHJcbi8vIGBfb3JpZ2luYWxNYXBwaW5nc2AgZ2V0dGVycyByZXNwZWN0aXZlbHksIGFuZCB3ZSBvbmx5IHBhcnNlIHRoZSBtYXBwaW5nc1xyXG4vLyBhbmQgY3JlYXRlIHRoZXNlIGFycmF5cyBvbmNlIHF1ZXJpZWQgZm9yIGEgc291cmNlIGxvY2F0aW9uLiBXZSBqdW1wIHRocm91Z2hcclxuLy8gdGhlc2UgaG9vcHMgYmVjYXVzZSB0aGVyZSBjYW4gYmUgbWFueSB0aG91c2FuZHMgb2YgbWFwcGluZ3MsIGFuZCBwYXJzaW5nXHJcbi8vIHRoZW0gaXMgZXhwZW5zaXZlLCBzbyB3ZSBvbmx5IHdhbnQgdG8gZG8gaXQgaWYgd2UgbXVzdC5cclxuLy9cclxuLy8gRWFjaCBvYmplY3QgaW4gdGhlIGFycmF5cyBpcyBvZiB0aGUgZm9ybTpcclxuLy9cclxuLy8gICAgIHtcclxuLy8gICAgICAgZ2VuZXJhdGVkTGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgY29kZSxcclxuLy8gICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIGNvZGUsXHJcbi8vICAgICAgIHNvdXJjZTogVGhlIHBhdGggdG8gdGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlIHRoYXQgZ2VuZXJhdGVkIHRoaXNcclxuLy8gICAgICAgICAgICAgICBjaHVuayBvZiBjb2RlLFxyXG4vLyAgICAgICBvcmlnaW5hbExpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlIHRoYXRcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kcyB0byB0aGlzIGNodW5rIG9mIGdlbmVyYXRlZCBjb2RlLFxyXG4vLyAgICAgICBvcmlnaW5hbENvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSB0aGF0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kcyB0byB0aGlzIGNodW5rIG9mIGdlbmVyYXRlZCBjb2RlLFxyXG4vLyAgICAgICBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgb3JpZ2luYWwgc3ltYm9sIHdoaWNoIGdlbmVyYXRlZCB0aGlzIGNodW5rIG9mXHJcbi8vICAgICAgICAgICAgIGNvZGUuXHJcbi8vICAgICB9XHJcbi8vXHJcbi8vIEFsbCBwcm9wZXJ0aWVzIGV4Y2VwdCBmb3IgYGdlbmVyYXRlZExpbmVgIGFuZCBgZ2VuZXJhdGVkQ29sdW1uYCBjYW4gYmVcclxuLy8gYG51bGxgLlxyXG4vL1xyXG4vLyBgX2dlbmVyYXRlZE1hcHBpbmdzYCBpcyBvcmRlcmVkIGJ5IHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zLlxyXG4vL1xyXG4vLyBgX29yaWdpbmFsTWFwcGluZ3NgIGlzIG9yZGVyZWQgYnkgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucy5cclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fX2dlbmVyYXRlZE1hcHBpbmdzID0gbnVsbDtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgXCJfZ2VuZXJhdGVkTWFwcGluZ3NcIiwge1xyXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncykge1xyXG4gICAgICB0aGlzLl9zb3J0R2VuZXJhdGVkTWFwcGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzO1xyXG4gIH1cclxufSk7XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX19vcmlnaW5hbE1hcHBpbmdzID0gbnVsbDtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgXCJfb3JpZ2luYWxNYXBwaW5nc1wiLCB7XHJcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5fX29yaWdpbmFsTWFwcGluZ3MpIHtcclxuICAgICAgdGhpcy5fc29ydE9yaWdpbmFsTWFwcGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fX29yaWdpbmFsTWFwcGluZ3M7XHJcbiAgfVxyXG59KTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWQgPSBudWxsO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoXHJcbiAgU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLFxyXG4gIFwiX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWRcIixcclxuICB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCF0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcnNlTWFwcGluZ3ModGhpcy5fbWFwcGluZ3MsIHRoaXMuc291cmNlUm9vdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZDtcclxuICAgIH1cclxuICB9XHJcbik7XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX19vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWQgPSBudWxsO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoXHJcbiAgU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLFxyXG4gIFwiX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZFwiLFxyXG4gIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoIXRoaXMuX19vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJzZU1hcHBpbmdzKHRoaXMuX21hcHBpbmdzLCB0aGlzLnNvdXJjZVJvb3QpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZDtcclxuICAgIH1cclxuICB9XHJcbik7XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2NoYXJJc01hcHBpbmdTZXBhcmF0b3IgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yKFxyXG4gIGFTdHIsXHJcbiAgaW5kZXhcclxuKSB7XHJcbiAgdmFyIGMgPSBhU3RyLmNoYXJBdChpbmRleCk7XHJcbiAgcmV0dXJuIGMgPT09IFwiO1wiIHx8IGMgPT09IFwiLFwiO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHRoZSBtYXBwaW5ncyBpbiBhIHN0cmluZyBpbiB0byBhIGRhdGEgc3RydWN0dXJlIHdoaWNoIHdlIGNhbiBlYXNpbHlcclxuICogcXVlcnkgKHRoZSBvcmRlcmVkIGFycmF5cyBpbiB0aGUgYHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kXHJcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXHJcbiAqL1xyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9wYXJzZU1hcHBpbmdzKFxyXG4gIGFTdHIsXHJcbiAgYVNvdXJjZVJvb3RcclxuKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiU3ViY2xhc3NlcyBtdXN0IGltcGxlbWVudCBfcGFyc2VNYXBwaW5nc1wiKTtcclxufTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fc29ydEdlbmVyYXRlZE1hcHBpbmdzID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfc29ydEdlbmVyYXRlZE1hcHBpbmdzKCkge1xyXG4gIGNvbnN0IG1hcHBpbmdzID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZDtcclxuICBxdWlja1NvcnQobWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQpO1xyXG4gIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IG1hcHBpbmdzO1xyXG59O1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9zb3J0T3JpZ2luYWxNYXBwaW5ncyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3NvcnRPcmlnaW5hbE1hcHBpbmdzKCkge1xyXG4gIGNvbnN0IG1hcHBpbmdzID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkO1xyXG4gIHF1aWNrU29ydChtYXBwaW5ncywgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyk7XHJcbiAgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3MgPSBtYXBwaW5ncztcclxufTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUiA9IDE7XHJcblNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSID0gMjtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EID0gMTtcclxuU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQgPSAyO1xyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgb3ZlciBlYWNoIG1hcHBpbmcgYmV0d2VlbiBhbiBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4gYW5kIGFcclxuICogZ2VuZXJhdGVkIGxpbmUvY29sdW1uIGluIHRoaXMgc291cmNlIG1hcC5cclxuICpcclxuICogQHBhcmFtIEZ1bmN0aW9uIGFDYWxsYmFja1xyXG4gKiAgICAgICAgVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggZWFjaCBtYXBwaW5nLlxyXG4gKiBAcGFyYW0gT2JqZWN0IGFDb250ZXh0XHJcbiAqICAgICAgICBPcHRpb25hbC4gSWYgc3BlY2lmaWVkLCB0aGlzIG9iamVjdCB3aWxsIGJlIHRoZSB2YWx1ZSBvZiBgdGhpc2AgZXZlcnlcclxuICogICAgICAgIHRpbWUgdGhhdCBgYUNhbGxiYWNrYCBpcyBjYWxsZWQuXHJcbiAqIEBwYXJhbSBhT3JkZXJcclxuICogICAgICAgIEVpdGhlciBgU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSYCBvclxyXG4gKiAgICAgICAgYFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSYC4gU3BlY2lmaWVzIHdoZXRoZXIgeW91IHdhbnQgdG9cclxuICogICAgICAgIGl0ZXJhdGUgb3ZlciB0aGUgbWFwcGluZ3Mgc29ydGVkIGJ5IHRoZSBnZW5lcmF0ZWQgZmlsZSdzIGxpbmUvY29sdW1uXHJcbiAqICAgICAgICBvcmRlciBvciB0aGUgb3JpZ2luYWwncyBzb3VyY2UvbGluZS9jb2x1bW4gb3JkZXIsIHJlc3BlY3RpdmVseS4gRGVmYXVsdHMgdG9cclxuICogICAgICAgIGBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVJgLlxyXG4gKi9cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmVhY2hNYXBwaW5nID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZWFjaE1hcHBpbmcoXHJcbiAgYUNhbGxiYWNrLFxyXG4gIGFDb250ZXh0LFxyXG4gIGFPcmRlclxyXG4pIHtcclxuICB2YXIgY29udGV4dCA9IGFDb250ZXh0IHx8IG51bGw7XHJcbiAgdmFyIG9yZGVyID0gYU9yZGVyIHx8IFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUjtcclxuXHJcbiAgdmFyIG1hcHBpbmdzO1xyXG4gIHN3aXRjaCAob3JkZXIpIHtcclxuICAgIGNhc2UgU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSOlxyXG4gICAgICBtYXBwaW5ncyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVI6XHJcbiAgICAgIG1hcHBpbmdzID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5ncztcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG9yZGVyIG9mIGl0ZXJhdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICB2YXIgc291cmNlUm9vdCA9IHRoaXMuc291cmNlUm9vdDtcclxuICBtYXBwaW5nc1xyXG4gICAgLm1hcChmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICAgIHZhciBzb3VyY2UgPSBudWxsO1xyXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZSA9IHRoaXMuX3NvdXJjZXMuYXQobWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIHNvdXJjZSA9IHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2UsIHRoaXMuX3NvdXJjZU1hcFVSTCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgICBnZW5lcmF0ZWRMaW5lOiBtYXBwaW5nLmdlbmVyYXRlZExpbmUsXHJcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbixcclxuICAgICAgICBvcmlnaW5hbExpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxyXG4gICAgICAgIG9yaWdpbmFsQ29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uLFxyXG4gICAgICAgIG5hbWU6IG1hcHBpbmcubmFtZSA9PSBudWxsID8gbnVsbCA6IHRoaXMuX25hbWVzLmF0KG1hcHBpbmcubmFtZSlcclxuICAgICAgfTtcclxuICAgIH0sIHRoaXMpXHJcbiAgICAuZm9yRWFjaChhQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYWxsIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBvcmlnaW5hbCBzb3VyY2UsXHJcbiAqIGxpbmUsIGFuZCBjb2x1bW4gcHJvdmlkZWQuIElmIG5vIGNvbHVtbiBpcyBwcm92aWRlZCwgcmV0dXJucyBhbGwgbWFwcGluZ3NcclxuICogY29ycmVzcG9uZGluZyB0byBhIGVpdGhlciB0aGUgbGluZSB3ZSBhcmUgc2VhcmNoaW5nIGZvciBvciB0aGUgbmV4dFxyXG4gKiBjbG9zZXN0IGxpbmUgdGhhdCBoYXMgYW55IG1hcHBpbmdzLiBPdGhlcndpc2UsIHJldHVybnMgYWxsIG1hcHBpbmdzXHJcbiAqIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIGxpbmUgYW5kIGVpdGhlciB0aGUgY29sdW1uIHdlIGFyZSBzZWFyY2hpbmcgZm9yXHJcbiAqIG9yIHRoZSBuZXh0IGNsb3Nlc3QgY29sdW1uIHRoYXQgaGFzIGFueSBvZmZzZXRzLlxyXG4gKlxyXG4gKiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBmaWxlbmFtZSBvZiB0aGUgb3JpZ2luYWwgc291cmNlLlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogT3B0aW9uYWwuIHRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqXHJcbiAqIGFuZCBhbiBhcnJheSBvZiBvYmplY3RzIGlzIHJldHVybmVkLCBlYWNoIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxyXG4gKiAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKi9cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2FsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvcihcclxuICBhQXJnc1xyXG4pIHtcclxuICB2YXIgbGluZSA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImxpbmVcIik7XHJcblxyXG4gIC8vIFdoZW4gdGhlcmUgaXMgbm8gZXhhY3QgbWF0Y2gsIEJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9maW5kTWFwcGluZ1xyXG4gIC8vIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBjbG9zZXN0IG1hcHBpbmcgbGVzcyB0aGFuIHRoZSBuZWVkbGUuIEJ5XHJcbiAgLy8gc2V0dGluZyBuZWVkbGUub3JpZ2luYWxDb2x1bW4gdG8gMCwgd2UgdGh1cyBmaW5kIHRoZSBsYXN0IG1hcHBpbmcgZm9yXHJcbiAgLy8gdGhlIGdpdmVuIGxpbmUsIHByb3ZpZGVkIHN1Y2ggYSBtYXBwaW5nIGV4aXN0cy5cclxuICB2YXIgbmVlZGxlID0ge1xyXG4gICAgc291cmNlOiB1dGlsLmdldEFyZyhhQXJncywgXCJzb3VyY2VcIiksXHJcbiAgICBvcmlnaW5hbExpbmU6IGxpbmUsXHJcbiAgICBvcmlnaW5hbENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsIFwiY29sdW1uXCIsIDApXHJcbiAgfTtcclxuXHJcbiAgbmVlZGxlLnNvdXJjZSA9IHRoaXMuX2ZpbmRTb3VyY2VJbmRleChuZWVkbGUuc291cmNlKTtcclxuICBpZiAobmVlZGxlLnNvdXJjZSA8IDApIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IFtdO1xyXG5cclxuICB2YXIgaW5kZXggPSB0aGlzLl9maW5kTWFwcGluZyhcclxuICAgIG5lZWRsZSxcclxuICAgIHRoaXMuX29yaWdpbmFsTWFwcGluZ3MsXHJcbiAgICBcIm9yaWdpbmFsTGluZVwiLFxyXG4gICAgXCJvcmlnaW5hbENvbHVtblwiLFxyXG4gICAgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyxcclxuICAgIGJpbmFyeVNlYXJjaC5MRUFTVF9VUFBFUl9CT1VORFxyXG4gICk7XHJcbiAgaWYgKGluZGV4ID49IDApIHtcclxuICAgIHZhciBtYXBwaW5nID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1tpbmRleF07XHJcblxyXG4gICAgaWYgKGFBcmdzLmNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZhciBvcmlnaW5hbExpbmUgPSBtYXBwaW5nLm9yaWdpbmFsTGluZTtcclxuXHJcbiAgICAgIC8vIEl0ZXJhdGUgdW50aWwgZWl0aGVyIHdlIHJ1biBvdXQgb2YgbWFwcGluZ3MsIG9yIHdlIHJ1biBpbnRvXHJcbiAgICAgIC8vIGEgbWFwcGluZyBmb3IgYSBkaWZmZXJlbnQgbGluZSB0aGFuIHRoZSBvbmUgd2UgZm91bmQuIFNpbmNlXHJcbiAgICAgIC8vIG1hcHBpbmdzIGFyZSBzb3J0ZWQsIHRoaXMgaXMgZ3VhcmFudGVlZCB0byBmaW5kIGFsbCBtYXBwaW5ncyBmb3JcclxuICAgICAgLy8gdGhlIGxpbmUgd2UgZm91bmQuXHJcbiAgICAgIHdoaWxlIChtYXBwaW5nICYmIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBvcmlnaW5hbExpbmUpIHtcclxuICAgICAgICBtYXBwaW5ncy5wdXNoKHtcclxuICAgICAgICAgIGxpbmU6IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwiZ2VuZXJhdGVkTGluZVwiLCBudWxsKSxcclxuICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJnZW5lcmF0ZWRDb2x1bW5cIiwgbnVsbCksXHJcbiAgICAgICAgICBsYXN0Q29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImxhc3RHZW5lcmF0ZWRDb2x1bW5cIiwgbnVsbClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbKytpbmRleF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBvcmlnaW5hbENvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcblxyXG4gICAgICAvLyBJdGVyYXRlIHVudGlsIGVpdGhlciB3ZSBydW4gb3V0IG9mIG1hcHBpbmdzLCBvciB3ZSBydW4gaW50b1xyXG4gICAgICAvLyBhIG1hcHBpbmcgZm9yIGEgZGlmZmVyZW50IGxpbmUgdGhhbiB0aGUgb25lIHdlIHdlcmUgc2VhcmNoaW5nIGZvci5cclxuICAgICAgLy8gU2luY2UgbWFwcGluZ3MgYXJlIHNvcnRlZCwgdGhpcyBpcyBndWFyYW50ZWVkIHRvIGZpbmQgYWxsIG1hcHBpbmdzIGZvclxyXG4gICAgICAvLyB0aGUgbGluZSB3ZSBhcmUgc2VhcmNoaW5nIGZvci5cclxuICAgICAgd2hpbGUgKFxyXG4gICAgICAgIG1hcHBpbmcgJiZcclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gbGluZSAmJlxyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPT0gb3JpZ2luYWxDb2x1bW5cclxuICAgICAgKSB7XHJcbiAgICAgICAgbWFwcGluZ3MucHVzaCh7XHJcbiAgICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImdlbmVyYXRlZExpbmVcIiwgbnVsbCksXHJcbiAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwiZ2VuZXJhdGVkQ29sdW1uXCIsIG51bGwpLFxyXG4gICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJsYXN0R2VuZXJhdGVkQ29sdW1uXCIsIG51bGwpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzWysraW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWFwcGluZ3M7XHJcbn07XHJcblxyXG5leHBvcnRzLlNvdXJjZU1hcENvbnN1bWVyID0gU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogQSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyIGluc3RhbmNlIHJlcHJlc2VudHMgYSBwYXJzZWQgc291cmNlIG1hcCB3aGljaCB3ZSBjYW5cclxuICogcXVlcnkgZm9yIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcmlnaW5hbCBmaWxlIHBvc2l0aW9ucyBieSBnaXZpbmcgaXQgYSBmaWxlXHJcbiAqIHBvc2l0aW9uIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLlxyXG4gKlxyXG4gKiBUaGUgZmlyc3QgcGFyYW1ldGVyIGlzIHRoZSByYXcgc291cmNlIG1hcCAoZWl0aGVyIGFzIGEgSlNPTiBzdHJpbmcsIG9yXHJcbiAqIGFscmVhZHkgcGFyc2VkIHRvIGFuIG9iamVjdCkuIEFjY29yZGluZyB0byB0aGUgc3BlYywgc291cmNlIG1hcHMgaGF2ZSB0aGVcclxuICogZm9sbG93aW5nIGF0dHJpYnV0ZXM6XHJcbiAqXHJcbiAqICAgLSB2ZXJzaW9uOiBXaGljaCB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwIHNwZWMgdGhpcyBtYXAgaXMgZm9sbG93aW5nLlxyXG4gKiAgIC0gc291cmNlczogQW4gYXJyYXkgb2YgVVJMcyB0byB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGVzLlxyXG4gKiAgIC0gbmFtZXM6IEFuIGFycmF5IG9mIGlkZW50aWZpZXJzIHdoaWNoIGNhbiBiZSByZWZlcmVuY2VkIGJ5IGluZGl2aWR1YWwgbWFwcGluZ3MuXHJcbiAqICAgLSBzb3VyY2VSb290OiBPcHRpb25hbC4gVGhlIFVSTCByb290IGZyb20gd2hpY2ggYWxsIHNvdXJjZXMgYXJlIHJlbGF0aXZlLlxyXG4gKiAgIC0gc291cmNlc0NvbnRlbnQ6IE9wdGlvbmFsLiBBbiBhcnJheSBvZiBjb250ZW50cyBvZiB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGVzLlxyXG4gKiAgIC0gbWFwcGluZ3M6IEEgc3RyaW5nIG9mIGJhc2U2NCBWTFFzIHdoaWNoIGNvbnRhaW4gdGhlIGFjdHVhbCBtYXBwaW5ncy5cclxuICogICAtIGZpbGU6IE9wdGlvbmFsLiBUaGUgZ2VuZXJhdGVkIGZpbGUgdGhpcyBzb3VyY2UgbWFwIGlzIGFzc29jaWF0ZWQgd2l0aC5cclxuICpcclxuICogSGVyZSBpcyBhbiBleGFtcGxlIHNvdXJjZSBtYXAsIHRha2VuIGZyb20gdGhlIHNvdXJjZSBtYXAgc3BlY1swXTpcclxuICpcclxuICogICAgIHtcclxuICogICAgICAgdmVyc2lvbiA6IDMsXHJcbiAqICAgICAgIGZpbGU6IFwib3V0LmpzXCIsXHJcbiAqICAgICAgIHNvdXJjZVJvb3QgOiBcIlwiLFxyXG4gKiAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIiwgXCJiYXIuanNcIl0sXHJcbiAqICAgICAgIG5hbWVzOiBbXCJzcmNcIiwgXCJtYXBzXCIsIFwiYXJlXCIsIFwiZnVuXCJdLFxyXG4gKiAgICAgICBtYXBwaW5nczogXCJBQSxBQjs7QUJDREU7XCJcclxuICogICAgIH1cclxuICpcclxuICogVGhlIHNlY29uZCBwYXJhbWV0ZXIsIGlmIGdpdmVuLCBpcyBhIHN0cmluZyB3aG9zZSB2YWx1ZSBpcyB0aGUgVVJMXHJcbiAqIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIHdhcyBmb3VuZC4gIFRoaXMgVVJMIGlzIHVzZWQgdG8gY29tcHV0ZSB0aGVcclxuICogc291cmNlcyBhcnJheS5cclxuICpcclxuICogWzBdOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzFVMVJHQWVoUXdSeXBVVG92RjFLUmxwaU9GemUwYi1fMmdjNmZBSDBLWTBrL2VkaXQ/cGxpPTEjXHJcbiAqL1xyXG5mdW5jdGlvbiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcclxuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHNvdXJjZU1hcCA9IHV0aWwucGFyc2VTb3VyY2VNYXBJbnB1dChhU291cmNlTWFwKTtcclxuICB9XHJcblxyXG4gIHZhciB2ZXJzaW9uID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcInZlcnNpb25cIik7XHJcbiAgdmFyIHNvdXJjZXMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwic291cmNlc1wiKTtcclxuICAvLyBTYXNzIDMuMyBsZWF2ZXMgb3V0IHRoZSAnbmFtZXMnIGFycmF5LCBzbyB3ZSBkZXZpYXRlIGZyb20gdGhlIHNwZWMgKHdoaWNoXHJcbiAgLy8gcmVxdWlyZXMgdGhlIGFycmF5KSB0byBwbGF5IG5pY2UgaGVyZS5cclxuICB2YXIgbmFtZXMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwibmFtZXNcIiwgW10pO1xyXG4gIHZhciBzb3VyY2VSb290ID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcInNvdXJjZVJvb3RcIiwgbnVsbCk7XHJcbiAgdmFyIHNvdXJjZXNDb250ZW50ID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcInNvdXJjZXNDb250ZW50XCIsIG51bGwpO1xyXG4gIHZhciBtYXBwaW5ncyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJtYXBwaW5nc1wiKTtcclxuICB2YXIgZmlsZSA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJmaWxlXCIsIG51bGwpO1xyXG5cclxuICAvLyBPbmNlIGFnYWluLCBTYXNzIGRldmlhdGVzIGZyb20gdGhlIHNwZWMgYW5kIHN1cHBsaWVzIHRoZSB2ZXJzaW9uIGFzIGFcclxuICAvLyBzdHJpbmcgcmF0aGVyIHRoYW4gYSBudW1iZXIsIHNvIHdlIHVzZSBsb29zZSBlcXVhbGl0eSBjaGVja2luZyBoZXJlLlxyXG4gIGlmICh2ZXJzaW9uICE9IHRoaXMuX3ZlcnNpb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHZlcnNpb246IFwiICsgdmVyc2lvbik7XHJcbiAgfVxyXG5cclxuICBpZiAoc291cmNlUm9vdCkge1xyXG4gICAgc291cmNlUm9vdCA9IHV0aWwubm9ybWFsaXplKHNvdXJjZVJvb3QpO1xyXG4gIH1cclxuXHJcbiAgc291cmNlcyA9IHNvdXJjZXNcclxuICAgIC5tYXAoU3RyaW5nKVxyXG4gICAgLy8gU29tZSBzb3VyY2UgbWFwcyBwcm9kdWNlIHJlbGF0aXZlIHNvdXJjZSBwYXRocyBsaWtlIFwiLi9mb28uanNcIiBpbnN0ZWFkIG9mXHJcbiAgICAvLyBcImZvby5qc1wiLiAgTm9ybWFsaXplIHRoZXNlIGZpcnN0IHNvIHRoYXQgZnV0dXJlIGNvbXBhcmlzb25zIHdpbGwgc3VjY2VlZC5cclxuICAgIC8vIFNlZSBidWd6aWwubGEvMTA5MDc2OC5cclxuICAgIC5tYXAodXRpbC5ub3JtYWxpemUpXHJcbiAgICAvLyBBbHdheXMgZW5zdXJlIHRoYXQgYWJzb2x1dGUgc291cmNlcyBhcmUgaW50ZXJuYWxseSBzdG9yZWQgcmVsYXRpdmUgdG9cclxuICAgIC8vIHRoZSBzb3VyY2Ugcm9vdCwgaWYgdGhlIHNvdXJjZSByb290IGlzIGFic29sdXRlLiBOb3QgZG9pbmcgdGhpcyB3b3VsZFxyXG4gICAgLy8gYmUgcGFydGljdWxhcmx5IHByb2JsZW1hdGljIHdoZW4gdGhlIHNvdXJjZSByb290IGlzIGEgcHJlZml4IG9mIHRoZVxyXG4gICAgLy8gc291cmNlICh2YWxpZCwgYnV0IHdoeT8/KS4gU2VlIGdpdGh1YiBpc3N1ZSAjMTk5IGFuZCBidWd6aWwubGEvMTE4ODk4Mi5cclxuICAgIC5tYXAoZnVuY3Rpb24oc291cmNlKSB7XHJcbiAgICAgIHJldHVybiBzb3VyY2VSb290ICYmXHJcbiAgICAgICAgdXRpbC5pc0Fic29sdXRlKHNvdXJjZVJvb3QpICYmXHJcbiAgICAgICAgdXRpbC5pc0Fic29sdXRlKHNvdXJjZSlcclxuICAgICAgICA/IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgc291cmNlKVxyXG4gICAgICAgIDogc291cmNlO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIFBhc3MgYHRydWVgIGJlbG93IHRvIGFsbG93IGR1cGxpY2F0ZSBuYW1lcyBhbmQgc291cmNlcy4gV2hpbGUgc291cmNlIG1hcHNcclxuICAvLyBhcmUgaW50ZW5kZWQgdG8gYmUgY29tcHJlc3NlZCBhbmQgZGVkdXBsaWNhdGVkLCB0aGUgVHlwZVNjcmlwdCBjb21waWxlclxyXG4gIC8vIHNvbWV0aW1lcyBnZW5lcmF0ZXMgc291cmNlIG1hcHMgd2l0aCBkdXBsaWNhdGVzIGluIHRoZW0uIFNlZSBHaXRodWIgaXNzdWVcclxuICAvLyAjNzIgYW5kIGJ1Z3ppbC5sYS84ODk0OTIuXHJcbiAgdGhpcy5fbmFtZXMgPSBBcnJheVNldC5mcm9tQXJyYXkobmFtZXMubWFwKFN0cmluZyksIHRydWUpO1xyXG4gIHRoaXMuX3NvdXJjZXMgPSBBcnJheVNldC5mcm9tQXJyYXkoc291cmNlcywgdHJ1ZSk7XHJcblxyXG4gIHRoaXMuX2Fic29sdXRlU291cmNlcyA9IHRoaXMuX3NvdXJjZXMudG9BcnJheSgpLm1hcChmdW5jdGlvbihzKSB7XHJcbiAgICByZXR1cm4gdXRpbC5jb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHMsIGFTb3VyY2VNYXBVUkwpO1xyXG4gIH0pO1xyXG5cclxuICB0aGlzLnNvdXJjZVJvb3QgPSBzb3VyY2VSb290O1xyXG4gIHRoaXMuc291cmNlc0NvbnRlbnQgPSBzb3VyY2VzQ29udGVudDtcclxuICB0aGlzLl9tYXBwaW5ncyA9IG1hcHBpbmdzO1xyXG4gIHRoaXMuX3NvdXJjZU1hcFVSTCA9IGFTb3VyY2VNYXBVUkw7XHJcbiAgdGhpcy5maWxlID0gZmlsZTtcclxufVxyXG5cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSk7XHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmNvbnN1bWVyID0gU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBmdW5jdGlvbiB0byBmaW5kIHRoZSBpbmRleCBvZiBhIHNvdXJjZS4gIFJldHVybnMgLTEgaWYgbm90XHJcbiAqIGZvdW5kLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2ZpbmRTb3VyY2VJbmRleCA9IGZ1bmN0aW9uKGFTb3VyY2UpIHtcclxuICB2YXIgcmVsYXRpdmVTb3VyY2UgPSBhU291cmNlO1xyXG4gIGlmICh0aGlzLnNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgcmVsYXRpdmVTb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHRoaXMuc291cmNlUm9vdCwgcmVsYXRpdmVTb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRoaXMuX3NvdXJjZXMuaGFzKHJlbGF0aXZlU291cmNlKSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXMuaW5kZXhPZihyZWxhdGl2ZVNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvLyBNYXliZSBhU291cmNlIGlzIGFuIGFic29sdXRlIFVSTCBhcyByZXR1cm5lZCBieSB8c291cmNlc3wuICBJblxyXG4gIC8vIHRoaXMgY2FzZSB3ZSBjYW4ndCBzaW1wbHkgdW5kbyB0aGUgdHJhbnNmb3JtLlxyXG4gIHZhciBpO1xyXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMubGVuZ3RoOyArK2kpIHtcclxuICAgIGlmICh0aGlzLl9hYnNvbHV0ZVNvdXJjZXNbaV0gPT0gYVNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiAtMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyIGZyb20gYSBTb3VyY2VNYXBHZW5lcmF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSBTb3VyY2VNYXBHZW5lcmF0b3IgYVNvdXJjZU1hcFxyXG4gKiAgICAgICAgVGhlIHNvdXJjZSBtYXAgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTb3VyY2VNYXBVUkxcclxuICogICAgICAgIFRoZSBVUkwgYXQgd2hpY2ggdGhlIHNvdXJjZSBtYXAgY2FuIGJlIGZvdW5kIChvcHRpb25hbClcclxuICogQHJldHVybnMgQmFzaWNTb3VyY2VNYXBDb25zdW1lclxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZnJvbVNvdXJjZU1hcChcclxuICBhU291cmNlTWFwLFxyXG4gIGFTb3VyY2VNYXBVUkxcclxuKSB7XHJcbiAgdmFyIHNtYyA9IE9iamVjdC5jcmVhdGUoQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xyXG5cclxuICB2YXIgbmFtZXMgPSAoc21jLl9uYW1lcyA9IEFycmF5U2V0LmZyb21BcnJheShcclxuICAgIGFTb3VyY2VNYXAuX25hbWVzLnRvQXJyYXkoKSxcclxuICAgIHRydWVcclxuICApKTtcclxuICB2YXIgc291cmNlcyA9IChzbWMuX3NvdXJjZXMgPSBBcnJheVNldC5mcm9tQXJyYXkoXHJcbiAgICBhU291cmNlTWFwLl9zb3VyY2VzLnRvQXJyYXkoKSxcclxuICAgIHRydWVcclxuICApKTtcclxuICBzbWMuc291cmNlUm9vdCA9IGFTb3VyY2VNYXAuX3NvdXJjZVJvb3Q7XHJcbiAgc21jLnNvdXJjZXNDb250ZW50ID0gYVNvdXJjZU1hcC5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudChcclxuICAgIHNtYy5fc291cmNlcy50b0FycmF5KCksXHJcbiAgICBzbWMuc291cmNlUm9vdFxyXG4gICk7XHJcbiAgc21jLmZpbGUgPSBhU291cmNlTWFwLl9maWxlO1xyXG4gIHNtYy5fc291cmNlTWFwVVJMID0gYVNvdXJjZU1hcFVSTDtcclxuICBzbWMuX2Fic29sdXRlU291cmNlcyA9IHNtYy5fc291cmNlcy50b0FycmF5KCkubWFwKGZ1bmN0aW9uKHMpIHtcclxuICAgIHJldHVybiB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc21jLnNvdXJjZVJvb3QsIHMsIGFTb3VyY2VNYXBVUkwpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBCZWNhdXNlIHdlIGFyZSBtb2RpZnlpbmcgdGhlIGVudHJpZXMgKGJ5IGNvbnZlcnRpbmcgc3RyaW5nIHNvdXJjZXMgYW5kXHJcbiAgLy8gbmFtZXMgdG8gaW5kaWNlcyBpbnRvIHRoZSBzb3VyY2VzIGFuZCBuYW1lcyBBcnJheVNldHMpLCB3ZSBoYXZlIHRvIG1ha2VcclxuICAvLyBhIGNvcHkgb2YgdGhlIGVudHJ5IG9yIGVsc2UgYmFkIHRoaW5ncyBoYXBwZW4uIFNoYXJlZCBtdXRhYmxlIHN0YXRlXHJcbiAgLy8gc3RyaWtlcyBhZ2FpbiEgU2VlIGdpdGh1YiBpc3N1ZSAjMTkxLlxyXG5cclxuICB2YXIgZ2VuZXJhdGVkTWFwcGluZ3MgPSBhU291cmNlTWFwLl9tYXBwaW5ncy50b0FycmF5KCkuc2xpY2UoKTtcclxuICB2YXIgZGVzdEdlbmVyYXRlZE1hcHBpbmdzID0gKHNtYy5fX2dlbmVyYXRlZE1hcHBpbmdzID0gW10pO1xyXG4gIHZhciBkZXN0T3JpZ2luYWxNYXBwaW5ncyA9IChzbWMuX19vcmlnaW5hbE1hcHBpbmdzID0gW10pO1xyXG5cclxuICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2VuZXJhdGVkTWFwcGluZ3MubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBzcmNNYXBwaW5nID0gZ2VuZXJhdGVkTWFwcGluZ3NbaV07XHJcbiAgICB2YXIgZGVzdE1hcHBpbmcgPSBuZXcgTWFwcGluZygpO1xyXG4gICAgZGVzdE1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9IHNyY01hcHBpbmcuZ2VuZXJhdGVkTGluZTtcclxuICAgIGRlc3RNYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA9IHNyY01hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xyXG5cclxuICAgIGlmIChzcmNNYXBwaW5nLnNvdXJjZSkge1xyXG4gICAgICBkZXN0TWFwcGluZy5zb3VyY2UgPSBzb3VyY2VzLmluZGV4T2Yoc3JjTWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICBkZXN0TWFwcGluZy5vcmlnaW5hbExpbmUgPSBzcmNNYXBwaW5nLm9yaWdpbmFsTGluZTtcclxuICAgICAgZGVzdE1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPSBzcmNNYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xyXG5cclxuICAgICAgaWYgKHNyY01hcHBpbmcubmFtZSkge1xyXG4gICAgICAgIGRlc3RNYXBwaW5nLm5hbWUgPSBuYW1lcy5pbmRleE9mKHNyY01hcHBpbmcubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlc3RPcmlnaW5hbE1hcHBpbmdzLnB1c2goZGVzdE1hcHBpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3RHZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKGRlc3RNYXBwaW5nKTtcclxuICB9XHJcblxyXG4gIHF1aWNrU29ydChzbWMuX19vcmlnaW5hbE1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zKTtcclxuXHJcbiAgcmV0dXJuIHNtYztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcHBpbmcgc3BlYyB0aGF0IHdlIGFyZSBjb25zdW1pbmcuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vKipcclxuICogVGhlIGxpc3Qgb2Ygb3JpZ2luYWwgc291cmNlcy5cclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgXCJzb3VyY2VzXCIsIHtcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Fic29sdXRlU291cmNlcy5zbGljZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogUHJvdmlkZSB0aGUgSklUIHdpdGggYSBuaWNlIHNoYXBlIC8gaGlkZGVuIGNsYXNzLlxyXG4gKi9cclxuZnVuY3Rpb24gTWFwcGluZygpIHtcclxuICB0aGlzLmdlbmVyYXRlZExpbmUgPSAwO1xyXG4gIHRoaXMuZ2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICB0aGlzLnNvdXJjZSA9IG51bGw7XHJcbiAgdGhpcy5vcmlnaW5hbExpbmUgPSBudWxsO1xyXG4gIHRoaXMub3JpZ2luYWxDb2x1bW4gPSBudWxsO1xyXG4gIHRoaXMubmFtZSA9IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XHJcbiAqIHF1ZXJ5ICh0aGUgb3JkZXJlZCBhcnJheXMgaW4gdGhlIGB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZFxyXG4gKiBgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3NgIHByb3BlcnRpZXMpLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9wYXJzZU1hcHBpbmdzKFxyXG4gIGFTdHIsXHJcbiAgYVNvdXJjZVJvb3RcclxuKSB7XHJcbiAgdmFyIGdlbmVyYXRlZExpbmUgPSAxO1xyXG4gIHZhciBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IDA7XHJcbiAgdmFyIHByZXZpb3VzT3JpZ2luYWxMaW5lID0gMDtcclxuICB2YXIgcHJldmlvdXNPcmlnaW5hbENvbHVtbiA9IDA7XHJcbiAgdmFyIHByZXZpb3VzU291cmNlID0gMDtcclxuICB2YXIgcHJldmlvdXNOYW1lID0gMDtcclxuICB2YXIgbGVuZ3RoID0gYVN0ci5sZW5ndGg7XHJcbiAgdmFyIGluZGV4ID0gMDtcclxuICB2YXIgY2FjaGVkU2VnbWVudHMgPSB7fTtcclxuICB2YXIgdGVtcCA9IHt9O1xyXG4gIHZhciBvcmlnaW5hbE1hcHBpbmdzID0gW107XHJcbiAgdmFyIGdlbmVyYXRlZE1hcHBpbmdzID0gW107XHJcbiAgdmFyIG1hcHBpbmcsIHN0ciwgc2VnbWVudCwgZW5kLCB2YWx1ZTtcclxuXHJcbiAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XHJcbiAgICBpZiAoYVN0ci5jaGFyQXQoaW5kZXgpID09PSBcIjtcIikge1xyXG4gICAgICBnZW5lcmF0ZWRMaW5lKys7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICAgIH0gZWxzZSBpZiAoYVN0ci5jaGFyQXQoaW5kZXgpID09PSBcIixcIikge1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFwcGluZyA9IG5ldyBNYXBwaW5nKCk7XHJcbiAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9IGdlbmVyYXRlZExpbmU7XHJcblxyXG4gICAgICAvLyBCZWNhdXNlIGVhY2ggb2Zmc2V0IGlzIGVuY29kZWQgcmVsYXRpdmUgdG8gdGhlIHByZXZpb3VzIG9uZSxcclxuICAgICAgLy8gbWFueSBzZWdtZW50cyBvZnRlbiBoYXZlIHRoZSBzYW1lIGVuY29kaW5nLiBXZSBjYW4gZXhwbG9pdCB0aGlzXHJcbiAgICAgIC8vIGZhY3QgYnkgY2FjaGluZyB0aGUgcGFyc2VkIHZhcmlhYmxlIGxlbmd0aCBmaWVsZHMgb2YgZWFjaCBzZWdtZW50LFxyXG4gICAgICAvLyBhbGxvd2luZyB1cyB0byBhdm9pZCBhIHNlY29uZCBwYXJzZSBpZiB3ZSBlbmNvdW50ZXIgdGhlIHNhbWVcclxuICAgICAgLy8gc2VnbWVudCBhZ2Fpbi5cclxuICAgICAgZm9yIChlbmQgPSBpbmRleDsgZW5kIDwgbGVuZ3RoOyBlbmQrKykge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yKGFTdHIsIGVuZCkpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzdHIgPSBhU3RyLnNsaWNlKGluZGV4LCBlbmQpO1xyXG5cclxuICAgICAgc2VnbWVudCA9IGNhY2hlZFNlZ21lbnRzW3N0cl07XHJcbiAgICAgIGlmIChzZWdtZW50KSB7XHJcbiAgICAgICAgaW5kZXggKz0gc3RyLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWdtZW50ID0gW107XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgZW5kKSB7XHJcbiAgICAgICAgICBiYXNlNjRWTFEuZGVjb2RlKGFTdHIsIGluZGV4LCB0ZW1wKTtcclxuICAgICAgICAgIHZhbHVlID0gdGVtcC52YWx1ZTtcclxuICAgICAgICAgIGluZGV4ID0gdGVtcC5yZXN0O1xyXG4gICAgICAgICAgc2VnbWVudC5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm91bmQgYSBzb3VyY2UsIGJ1dCBubyBsaW5lIGFuZCBjb2x1bW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvdW5kIGEgc291cmNlIGFuZCBsaW5lLCBidXQgbm8gY29sdW1uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FjaGVkU2VnbWVudHNbc3RyXSA9IHNlZ21lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdlbmVyYXRlZCBjb2x1bW4uXHJcbiAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uID0gcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gKyBzZWdtZW50WzBdO1xyXG4gICAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xyXG5cclxuICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIC8vIE9yaWdpbmFsIHNvdXJjZS5cclxuICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHByZXZpb3VzU291cmNlICsgc2VnbWVudFsxXTtcclxuICAgICAgICBwcmV2aW91c1NvdXJjZSArPSBzZWdtZW50WzFdO1xyXG5cclxuICAgICAgICAvLyBPcmlnaW5hbCBsaW5lLlxyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lID0gcHJldmlvdXNPcmlnaW5hbExpbmUgKyBzZWdtZW50WzJdO1xyXG4gICAgICAgIHByZXZpb3VzT3JpZ2luYWxMaW5lID0gbWFwcGluZy5vcmlnaW5hbExpbmU7XHJcbiAgICAgICAgLy8gTGluZXMgYXJlIHN0b3JlZCAwLWJhc2VkXHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgKz0gMTtcclxuXHJcbiAgICAgICAgLy8gT3JpZ2luYWwgY29sdW1uLlxyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPSBwcmV2aW91c09yaWdpbmFsQ29sdW1uICsgc2VnbWVudFszXTtcclxuICAgICAgICBwcmV2aW91c09yaWdpbmFsQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuXHJcbiAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgLy8gT3JpZ2luYWwgbmFtZS5cclxuICAgICAgICAgIG1hcHBpbmcubmFtZSA9IHByZXZpb3VzTmFtZSArIHNlZ21lbnRbNF07XHJcbiAgICAgICAgICBwcmV2aW91c05hbWUgKz0gc2VnbWVudFs0XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdlbmVyYXRlZE1hcHBpbmdzLnB1c2gobWFwcGluZyk7XHJcbiAgICAgIGlmICh0eXBlb2YgbWFwcGluZy5vcmlnaW5hbExpbmUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICBvcmlnaW5hbE1hcHBpbmdzLnB1c2gobWFwcGluZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkID0gZ2VuZXJhdGVkTWFwcGluZ3M7XHJcblxyXG4gIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWQgPSBvcmlnaW5hbE1hcHBpbmdzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIG1hcHBpbmcgdGhhdCBiZXN0IG1hdGNoZXMgdGhlIGh5cG90aGV0aWNhbCBcIm5lZWRsZVwiIG1hcHBpbmcgdGhhdFxyXG4gKiB3ZSBhcmUgc2VhcmNoaW5nIGZvciBpbiB0aGUgZ2l2ZW4gXCJoYXlzdGFja1wiIG9mIG1hcHBpbmdzLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2ZpbmRNYXBwaW5nID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZmluZE1hcHBpbmcoXHJcbiAgYU5lZWRsZSxcclxuICBhTWFwcGluZ3MsXHJcbiAgYUxpbmVOYW1lLFxyXG4gIGFDb2x1bW5OYW1lLFxyXG4gIGFDb21wYXJhdG9yLFxyXG4gIGFCaWFzXHJcbikge1xyXG4gIC8vIFRvIHJldHVybiB0aGUgcG9zaXRpb24gd2UgYXJlIHNlYXJjaGluZyBmb3IsIHdlIG11c3QgZmlyc3QgZmluZCB0aGVcclxuICAvLyBtYXBwaW5nIGZvciB0aGUgZ2l2ZW4gcG9zaXRpb24gYW5kIHRoZW4gcmV0dXJuIHRoZSBvcHBvc2l0ZSBwb3NpdGlvbiBpdFxyXG4gIC8vIHBvaW50cyB0by4gQmVjYXVzZSB0aGUgbWFwcGluZ3MgYXJlIHNvcnRlZCwgd2UgY2FuIHVzZSBiaW5hcnkgc2VhcmNoIHRvXHJcbiAgLy8gZmluZCB0aGUgYmVzdCBtYXBwaW5nLlxyXG5cclxuICBpZiAoYU5lZWRsZVthTGluZU5hbWVdIDw9IDApIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgIFwiTGluZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxLCBnb3QgXCIgKyBhTmVlZGxlW2FMaW5lTmFtZV1cclxuICAgICk7XHJcbiAgfVxyXG4gIGlmIChhTmVlZGxlW2FDb2x1bW5OYW1lXSA8IDApIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgIFwiQ29sdW1uIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDAsIGdvdCBcIiArIGFOZWVkbGVbYUNvbHVtbk5hbWVdXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJpbmFyeVNlYXJjaC5zZWFyY2goYU5lZWRsZSwgYU1hcHBpbmdzLCBhQ29tcGFyYXRvciwgYUJpYXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIGxhc3QgY29sdW1uIGZvciBlYWNoIGdlbmVyYXRlZCBtYXBwaW5nLiBUaGUgbGFzdCBjb2x1bW4gaXNcclxuICogaW5jbHVzaXZlLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29tcHV0ZUNvbHVtblNwYW5zID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfY29tcHV0ZUNvbHVtblNwYW5zKCkge1xyXG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5ncy5sZW5ndGg7ICsraW5kZXgpIHtcclxuICAgIHZhciBtYXBwaW5nID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NbaW5kZXhdO1xyXG5cclxuICAgIC8vIE1hcHBpbmdzIGRvIG5vdCBjb250YWluIGEgZmllbGQgZm9yIHRoZSBsYXN0IGdlbmVyYXRlZCBjb2x1bW50LiBXZVxyXG4gICAgLy8gY2FuIGNvbWUgdXAgd2l0aCBhbiBvcHRpbWlzdGljIGVzdGltYXRlLCBob3dldmVyLCBieSBhc3N1bWluZyB0aGF0XHJcbiAgICAvLyBtYXBwaW5ncyBhcmUgY29udGlndW91cyAoaS5lLiBnaXZlbiB0d28gY29uc2VjdXRpdmUgbWFwcGluZ3MsIHRoZVxyXG4gICAgLy8gZmlyc3QgbWFwcGluZyBlbmRzIHdoZXJlIHRoZSBzZWNvbmQgb25lIHN0YXJ0cykuXHJcbiAgICBpZiAoaW5kZXggKyAxIDwgdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgIHZhciBuZXh0TWFwcGluZyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzW2luZGV4ICsgMV07XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lID09PSBuZXh0TWFwcGluZy5nZW5lcmF0ZWRMaW5lKSB7XHJcbiAgICAgICAgbWFwcGluZy5sYXN0R2VuZXJhdGVkQ29sdW1uID0gbmV4dE1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uIC0gMTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSBsYXN0IG1hcHBpbmcgZm9yIGVhY2ggbGluZSBzcGFucyB0aGUgZW50aXJlIGxpbmUuXHJcbiAgICBtYXBwaW5nLmxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBJbmZpbml0eTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlLCBsaW5lLCBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2VuZXJhdGVkXHJcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdFxyXG4gKiB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgY29sdW1uXHJcbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cclxuICogICAtIGJpYXM6IEVpdGhlciAnU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXHJcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXHJcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cclxuICogICAgIERlZmF1bHRzIHRvICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcuXHJcbiAqXHJcbiAqIGFuZCBhbiBvYmplY3QgaXMgcmV0dXJuZWQgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSwgb3IgbnVsbC5cclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqICAgLSBuYW1lOiBUaGUgb3JpZ2luYWwgaWRlbnRpZmllciwgb3IgbnVsbC5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLm9yaWdpbmFsUG9zaXRpb25Gb3IgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9vcmlnaW5hbFBvc2l0aW9uRm9yKFxyXG4gIGFBcmdzXHJcbikge1xyXG4gIHZhciBuZWVkbGUgPSB7XHJcbiAgICBnZW5lcmF0ZWRMaW5lOiB1dGlsLmdldEFyZyhhQXJncywgXCJsaW5lXCIpLFxyXG4gICAgZ2VuZXJhdGVkQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgXCJjb2x1bW5cIilcclxuICB9O1xyXG5cclxuICB2YXIgaW5kZXggPSB0aGlzLl9maW5kTWFwcGluZyhcclxuICAgIG5lZWRsZSxcclxuICAgIHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLFxyXG4gICAgXCJnZW5lcmF0ZWRMaW5lXCIsXHJcbiAgICBcImdlbmVyYXRlZENvbHVtblwiLFxyXG4gICAgdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCxcclxuICAgIHV0aWwuZ2V0QXJnKGFBcmdzLCBcImJpYXNcIiwgU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQpXHJcbiAgKTtcclxuXHJcbiAgaWYgKGluZGV4ID49IDApIHtcclxuICAgIHZhciBtYXBwaW5nID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NbaW5kZXhdO1xyXG5cclxuICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgPT09IG5lZWRsZS5nZW5lcmF0ZWRMaW5lKSB7XHJcbiAgICAgIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhtYXBwaW5nLCBcInNvdXJjZVwiLCBudWxsKTtcclxuICAgICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgc291cmNlID0gdGhpcy5fc291cmNlcy5hdChzb3VyY2UpO1xyXG4gICAgICAgIHNvdXJjZSA9IHV0aWwuY29tcHV0ZVNvdXJjZVVSTChcclxuICAgICAgICAgIHRoaXMuc291cmNlUm9vdCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIHRoaXMuX3NvdXJjZU1hcFVSTFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIG5hbWUgPSB1dGlsLmdldEFyZyhtYXBwaW5nLCBcIm5hbWVcIiwgbnVsbCk7XHJcbiAgICAgIGlmIChuYW1lICE9IG51bGwpIHtcclxuICAgICAgICBuYW1lID0gdGhpcy5fbmFtZXMuYXQobmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcIm9yaWdpbmFsTGluZVwiLCBudWxsKSxcclxuICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwib3JpZ2luYWxDb2x1bW5cIiwgbnVsbCksXHJcbiAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNvdXJjZTogbnVsbCxcclxuICAgIGxpbmU6IG51bGwsXHJcbiAgICBjb2x1bW46IG51bGwsXHJcbiAgICBuYW1lOiBudWxsXHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBoYXZlIHRoZSBzb3VyY2UgY29udGVudCBmb3IgZXZlcnkgc291cmNlIGluIHRoZSBzb3VyY2VcclxuICogbWFwLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5oYXNDb250ZW50c09mQWxsU291cmNlcyA9IGZ1bmN0aW9uIEJhc2ljU291cmNlTWFwQ29uc3VtZXJfaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKSB7XHJcbiAgaWYgKCF0aGlzLnNvdXJjZXNDb250ZW50KSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICB0aGlzLnNvdXJjZXNDb250ZW50Lmxlbmd0aCA+PSB0aGlzLl9zb3VyY2VzLnNpemUoKSAmJlxyXG4gICAgIXRoaXMuc291cmNlc0NvbnRlbnQuc29tZShmdW5jdGlvbihzYykge1xyXG4gICAgICByZXR1cm4gc2MgPT0gbnVsbDtcclxuICAgIH0pXHJcbiAgKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UgY29udGVudC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgdGhlIHVybCBvZiB0aGVcclxuICogb3JpZ2luYWwgc291cmNlIGZpbGUuIFJldHVybnMgbnVsbCBpZiBubyBvcmlnaW5hbCBzb3VyY2UgY29udGVudCBpc1xyXG4gKiBhdmFpbGFibGUuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5zb3VyY2VDb250ZW50Rm9yID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfc291cmNlQ29udGVudEZvcihcclxuICBhU291cmNlLFxyXG4gIG51bGxPbk1pc3NpbmdcclxuKSB7XHJcbiAgaWYgKCF0aGlzLnNvdXJjZXNDb250ZW50KSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRTb3VyY2VJbmRleChhU291cmNlKTtcclxuICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc291cmNlc0NvbnRlbnRbaW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgdmFyIHJlbGF0aXZlU291cmNlID0gYVNvdXJjZTtcclxuICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgIHJlbGF0aXZlU291cmNlID0gdXRpbC5yZWxhdGl2ZSh0aGlzLnNvdXJjZVJvb3QsIHJlbGF0aXZlU291cmNlKTtcclxuICB9XHJcblxyXG4gIHZhciB1cmw7XHJcbiAgaWYgKHRoaXMuc291cmNlUm9vdCAhPSBudWxsICYmICh1cmwgPSB1dGlsLnVybFBhcnNlKHRoaXMuc291cmNlUm9vdCkpKSB7XHJcbiAgICAvLyBYWFg6IGZpbGU6Ly8gVVJJcyBhbmQgYWJzb2x1dGUgcGF0aHMgbGVhZCB0byB1bmV4cGVjdGVkIGJlaGF2aW9yIGZvclxyXG4gICAgLy8gbWFueSB1c2Vycy4gV2UgY2FuIGhlbHAgdGhlbSBvdXQgd2hlbiB0aGV5IGV4cGVjdCBmaWxlOi8vIFVSSXMgdG9cclxuICAgIC8vIGJlaGF2ZSBsaWtlIGl0IHdvdWxkIGlmIHRoZXkgd2VyZSBydW5uaW5nIGEgbG9jYWwgSFRUUCBzZXJ2ZXIuIFNlZVxyXG4gICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODg1NTk3LlxyXG4gICAgdmFyIGZpbGVVcmlBYnNQYXRoID0gcmVsYXRpdmVTb3VyY2UucmVwbGFjZSgvXmZpbGU6XFwvXFwvLywgXCJcIik7XHJcbiAgICBpZiAodXJsLnNjaGVtZSA9PSBcImZpbGVcIiAmJiB0aGlzLl9zb3VyY2VzLmhhcyhmaWxlVXJpQWJzUGF0aCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc291cmNlc0NvbnRlbnRbdGhpcy5fc291cmNlcy5pbmRleE9mKGZpbGVVcmlBYnNQYXRoKV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIXVybC5wYXRoIHx8IHVybC5wYXRoID09IFwiL1wiKSAmJlxyXG4gICAgICB0aGlzLl9zb3VyY2VzLmhhcyhcIi9cIiArIHJlbGF0aXZlU291cmNlKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZXNDb250ZW50W3RoaXMuX3NvdXJjZXMuaW5kZXhPZihcIi9cIiArIHJlbGF0aXZlU291cmNlKV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgcmVjdXJzaXZlbHkgZnJvbVxyXG4gIC8vIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvci4gSW4gdGhhdCBjYXNlLCB3ZVxyXG4gIC8vIGRvbid0IHdhbnQgdG8gdGhyb3cgaWYgd2UgY2FuJ3QgZmluZCB0aGUgc291cmNlIC0gd2UganVzdCB3YW50IHRvXHJcbiAgLy8gcmV0dXJuIG51bGwsIHNvIHdlIHByb3ZpZGUgYSBmbGFnIHRvIGV4aXQgZ3JhY2VmdWxseS5cclxuICBpZiAobnVsbE9uTWlzc2luZykge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignXCInICsgcmVsYXRpdmVTb3VyY2UgKyAnXCIgaXMgbm90IGluIHRoZSBTb3VyY2VNYXAuJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBvcmlnaW5hbCBzb3VyY2UsXHJcbiAqIGxpbmUsIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3Qgd2l0aFxyXG4gKiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBmaWxlbmFtZSBvZiB0aGUgb3JpZ2luYWwgc291cmNlLlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcclxuICogICAgIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgY29sdW1uXHJcbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cclxuICogICAtIGJpYXM6IEVpdGhlciAnU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXHJcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXHJcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cclxuICogICAgIERlZmF1bHRzIHRvICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcuXHJcbiAqXHJcbiAqIGFuZCBhbiBvYmplY3QgaXMgcmV0dXJuZWQgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxyXG4gKiAgICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmdlbmVyYXRlZFBvc2l0aW9uRm9yID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZ2VuZXJhdGVkUG9zaXRpb25Gb3IoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgdmFyIHNvdXJjZSA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcInNvdXJjZVwiKTtcclxuICBzb3VyY2UgPSB0aGlzLl9maW5kU291cmNlSW5kZXgoc291cmNlKTtcclxuICBpZiAoc291cmNlIDwgMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGluZTogbnVsbCxcclxuICAgICAgY29sdW1uOiBudWxsLFxyXG4gICAgICBsYXN0Q29sdW1uOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdmFyIG5lZWRsZSA9IHtcclxuICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgb3JpZ2luYWxMaW5lOiB1dGlsLmdldEFyZyhhQXJncywgXCJsaW5lXCIpLFxyXG4gICAgb3JpZ2luYWxDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImNvbHVtblwiKVxyXG4gIH07XHJcblxyXG4gIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRNYXBwaW5nKFxyXG4gICAgbmVlZGxlLFxyXG4gICAgdGhpcy5fb3JpZ2luYWxNYXBwaW5ncyxcclxuICAgIFwib3JpZ2luYWxMaW5lXCIsXHJcbiAgICBcIm9yaWdpbmFsQ29sdW1uXCIsXHJcbiAgICB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zLFxyXG4gICAgdXRpbC5nZXRBcmcoYUFyZ3MsIFwiYmlhc1wiLCBTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORClcclxuICApO1xyXG5cclxuICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzW2luZGV4XTtcclxuXHJcbiAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IG5lZWRsZS5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImdlbmVyYXRlZExpbmVcIiwgbnVsbCksXHJcbiAgICAgICAgY29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImdlbmVyYXRlZENvbHVtblwiLCBudWxsKSxcclxuICAgICAgICBsYXN0Q29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImxhc3RHZW5lcmF0ZWRDb2x1bW5cIiwgbnVsbClcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBsaW5lOiBudWxsLFxyXG4gICAgY29sdW1uOiBudWxsLFxyXG4gICAgbGFzdENvbHVtbjogbnVsbFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnRzLkJhc2ljU291cmNlTWFwQ29uc3VtZXIgPSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyO1xyXG5cclxuLyoqXHJcbiAqIEFuIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lciBpbnN0YW5jZSByZXByZXNlbnRzIGEgcGFyc2VkIHNvdXJjZSBtYXAgd2hpY2hcclxuICogd2UgY2FuIHF1ZXJ5IGZvciBpbmZvcm1hdGlvbi4gSXQgZGlmZmVycyBmcm9tIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgaW5cclxuICogdGhhdCBpdCB0YWtlcyBcImluZGV4ZWRcIiBzb3VyY2UgbWFwcyAoaS5lLiBvbmVzIHdpdGggYSBcInNlY3Rpb25zXCIgZmllbGQpIGFzXHJcbiAqIGlucHV0LlxyXG4gKlxyXG4gKiBUaGUgZmlyc3QgcGFyYW1ldGVyIGlzIGEgcmF3IHNvdXJjZSBtYXAgKGVpdGhlciBhcyBhIEpTT04gc3RyaW5nLCBvciBhbHJlYWR5XHJcbiAqIHBhcnNlZCB0byBhbiBvYmplY3QpLiBBY2NvcmRpbmcgdG8gdGhlIHNwZWMgZm9yIGluZGV4ZWQgc291cmNlIG1hcHMsIHRoZXlcclxuICogaGF2ZSB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZXM6XHJcbiAqXHJcbiAqICAgLSB2ZXJzaW9uOiBXaGljaCB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwIHNwZWMgdGhpcyBtYXAgaXMgZm9sbG93aW5nLlxyXG4gKiAgIC0gZmlsZTogT3B0aW9uYWwuIFRoZSBnZW5lcmF0ZWQgZmlsZSB0aGlzIHNvdXJjZSBtYXAgaXMgYXNzb2NpYXRlZCB3aXRoLlxyXG4gKiAgIC0gc2VjdGlvbnM6IEEgbGlzdCBvZiBzZWN0aW9uIGRlZmluaXRpb25zLlxyXG4gKlxyXG4gKiBFYWNoIHZhbHVlIHVuZGVyIHRoZSBcInNlY3Rpb25zXCIgZmllbGQgaGFzIHR3byBmaWVsZHM6XHJcbiAqICAgLSBvZmZzZXQ6IFRoZSBvZmZzZXQgaW50byB0aGUgb3JpZ2luYWwgc3BlY2lmaWVkIGF0IHdoaWNoIHRoaXMgc2VjdGlvblxyXG4gKiAgICAgICBiZWdpbnMgdG8gYXBwbHksIGRlZmluZWQgYXMgYW4gb2JqZWN0IHdpdGggYSBcImxpbmVcIiBhbmQgXCJjb2x1bW5cIlxyXG4gKiAgICAgICBmaWVsZC5cclxuICogICAtIG1hcDogQSBzb3VyY2UgbWFwIGRlZmluaXRpb24uIFRoaXMgc291cmNlIG1hcCBjb3VsZCBhbHNvIGJlIGluZGV4ZWQsXHJcbiAqICAgICAgIGJ1dCBkb2Vzbid0IGhhdmUgdG8gYmUuXHJcbiAqXHJcbiAqIEluc3RlYWQgb2YgdGhlIFwibWFwXCIgZmllbGQsIGl0J3MgYWxzbyBwb3NzaWJsZSB0byBoYXZlIGEgXCJ1cmxcIiBmaWVsZFxyXG4gKiBzcGVjaWZ5aW5nIGEgVVJMIHRvIHJldHJpZXZlIGEgc291cmNlIG1hcCBmcm9tLCBidXQgdGhhdCdzIGN1cnJlbnRseVxyXG4gKiB1bnN1cHBvcnRlZC5cclxuICpcclxuICogSGVyZSdzIGFuIGV4YW1wbGUgc291cmNlIG1hcCwgdGFrZW4gZnJvbSB0aGUgc291cmNlIG1hcCBzcGVjWzBdLCBidXRcclxuICogbW9kaWZpZWQgdG8gb21pdCBhIHNlY3Rpb24gd2hpY2ggdXNlcyB0aGUgXCJ1cmxcIiBmaWVsZC5cclxuICpcclxuICogIHtcclxuICogICAgdmVyc2lvbiA6IDMsXHJcbiAqICAgIGZpbGU6IFwiYXBwLmpzXCIsXHJcbiAqICAgIHNlY3Rpb25zOiBbe1xyXG4gKiAgICAgIG9mZnNldDoge2xpbmU6MTAwLCBjb2x1bW46MTB9LFxyXG4gKiAgICAgIG1hcDoge1xyXG4gKiAgICAgICAgdmVyc2lvbiA6IDMsXHJcbiAqICAgICAgICBmaWxlOiBcInNlY3Rpb24uanNcIixcclxuICogICAgICAgIHNvdXJjZXM6IFtcImZvby5qc1wiLCBcImJhci5qc1wiXSxcclxuICogICAgICAgIG5hbWVzOiBbXCJzcmNcIiwgXCJtYXBzXCIsIFwiYXJlXCIsIFwiZnVuXCJdLFxyXG4gKiAgICAgICAgbWFwcGluZ3M6IFwiQUFBQSxFOztBQkNERTtcIlxyXG4gKiAgICAgIH1cclxuICogICAgfV0sXHJcbiAqICB9XHJcbiAqXHJcbiAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyLCBpZiBnaXZlbiwgaXMgYSBzdHJpbmcgd2hvc2UgdmFsdWUgaXMgdGhlIFVSTFxyXG4gKiBhdCB3aGljaCB0aGUgc291cmNlIG1hcCB3YXMgZm91bmQuICBUaGlzIFVSTCBpcyB1c2VkIHRvIGNvbXB1dGUgdGhlXHJcbiAqIHNvdXJjZXMgYXJyYXkuXHJcbiAqXHJcbiAqIFswXTogaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xVTFSR0FlaFF3UnlwVVRvdkYxS1JscGlPRnplMGItXzJnYzZmQUgwS1kway9lZGl0I2hlYWRpbmc9aC41MzVlczN4ZXByZ3RcclxuICovXHJcbmZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XHJcbiAgdmFyIHNvdXJjZU1hcCA9IGFTb3VyY2VNYXA7XHJcbiAgaWYgKHR5cGVvZiBhU291cmNlTWFwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XHJcbiAgfVxyXG5cclxuICB2YXIgdmVyc2lvbiA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJ2ZXJzaW9uXCIpO1xyXG4gIHZhciBzZWN0aW9ucyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJzZWN0aW9uc1wiKTtcclxuXHJcbiAgaWYgKHZlcnNpb24gIT0gdGhpcy5fdmVyc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdmVyc2lvbjogXCIgKyB2ZXJzaW9uKTtcclxuICB9XHJcblxyXG4gIHRoaXMuX3NvdXJjZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuICB0aGlzLl9uYW1lcyA9IG5ldyBBcnJheVNldCgpO1xyXG5cclxuICB2YXIgbGFzdE9mZnNldCA9IHtcclxuICAgIGxpbmU6IC0xLFxyXG4gICAgY29sdW1uOiAwXHJcbiAgfTtcclxuICB0aGlzLl9zZWN0aW9ucyA9IHNlY3Rpb25zLm1hcChmdW5jdGlvbihzKSB7XHJcbiAgICBpZiAocy51cmwpIHtcclxuICAgICAgLy8gVGhlIHVybCBmaWVsZCB3aWxsIHJlcXVpcmUgc3VwcG9ydCBmb3IgYXN5bmNocm9uaWNpdHkuXHJcbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL2lzc3Vlcy8xNlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdXBwb3J0IGZvciB1cmwgZmllbGQgaW4gc2VjdGlvbnMgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIHZhciBvZmZzZXQgPSB1dGlsLmdldEFyZyhzLCBcIm9mZnNldFwiKTtcclxuICAgIHZhciBvZmZzZXRMaW5lID0gdXRpbC5nZXRBcmcob2Zmc2V0LCBcImxpbmVcIik7XHJcbiAgICB2YXIgb2Zmc2V0Q29sdW1uID0gdXRpbC5nZXRBcmcob2Zmc2V0LCBcImNvbHVtblwiKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9mZnNldExpbmUgPCBsYXN0T2Zmc2V0LmxpbmUgfHxcclxuICAgICAgKG9mZnNldExpbmUgPT09IGxhc3RPZmZzZXQubGluZSAmJiBvZmZzZXRDb2x1bW4gPCBsYXN0T2Zmc2V0LmNvbHVtbilcclxuICAgICkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZWN0aW9uIG9mZnNldHMgbXVzdCBiZSBvcmRlcmVkIGFuZCBub24tb3ZlcmxhcHBpbmcuXCIpO1xyXG4gICAgfVxyXG4gICAgbGFzdE9mZnNldCA9IG9mZnNldDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBnZW5lcmF0ZWRPZmZzZXQ6IHtcclxuICAgICAgICAvLyBUaGUgb2Zmc2V0IGZpZWxkcyBhcmUgMC1iYXNlZCwgYnV0IHdlIHVzZSAxLWJhc2VkIGluZGljZXMgd2hlblxyXG4gICAgICAgIC8vIGVuY29kaW5nL2RlY29kaW5nIGZyb20gVkxRLlxyXG4gICAgICAgIGdlbmVyYXRlZExpbmU6IG9mZnNldExpbmUgKyAxLFxyXG4gICAgICAgIGdlbmVyYXRlZENvbHVtbjogb2Zmc2V0Q29sdW1uICsgMVxyXG4gICAgICB9LFxyXG4gICAgICBjb25zdW1lcjogbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuZ2V0QXJnKHMsIFwibWFwXCIpLCBhU291cmNlTWFwVVJMKVxyXG4gICAgfTtcclxuICB9KTtcclxufVxyXG5cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlKTtcclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNvdXJjZU1hcENvbnN1bWVyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMuXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgXCJzb3VyY2VzXCIsIHtcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9zZWN0aW9uc1tpXS5jb25zdW1lci5zb3VyY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgc291cmNlcy5wdXNoKHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLnNvdXJjZXNbal0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc291cmNlcztcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG9yaWdpbmFsIHNvdXJjZSwgbGluZSwgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIGdlbmVyYXRlZFxyXG4gKiBzb3VyY2UncyBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3RcclxuICogd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcclxuICogICAgIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLiAgVGhlIGNvbHVtblxyXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqXHJcbiAqIGFuZCBhbiBvYmplY3QgaXMgcmV0dXJuZWQgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSwgb3IgbnVsbC5cclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqICAgLSBuYW1lOiBUaGUgb3JpZ2luYWwgaWRlbnRpZmllciwgb3IgbnVsbC5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUub3JpZ2luYWxQb3NpdGlvbkZvciA9IGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9vcmlnaW5hbFBvc2l0aW9uRm9yKFxyXG4gIGFBcmdzXHJcbikge1xyXG4gIHZhciBuZWVkbGUgPSB7XHJcbiAgICBnZW5lcmF0ZWRMaW5lOiB1dGlsLmdldEFyZyhhQXJncywgXCJsaW5lXCIpLFxyXG4gICAgZ2VuZXJhdGVkQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgXCJjb2x1bW5cIilcclxuICB9O1xyXG5cclxuICAvLyBGaW5kIHRoZSBzZWN0aW9uIGNvbnRhaW5pbmcgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbiB3ZSdyZSB0cnlpbmcgdG8gbWFwXHJcbiAgLy8gdG8gYW4gb3JpZ2luYWwgcG9zaXRpb24uXHJcbiAgdmFyIHNlY3Rpb25JbmRleCA9IGJpbmFyeVNlYXJjaC5zZWFyY2gobmVlZGxlLCB0aGlzLl9zZWN0aW9ucywgZnVuY3Rpb24oXHJcbiAgICBuZWVkbGUsXHJcbiAgICBzZWN0aW9uXHJcbiAgKSB7XHJcbiAgICB2YXIgY21wID0gbmVlZGxlLmdlbmVyYXRlZExpbmUgLSBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lO1xyXG4gICAgaWYgKGNtcCkge1xyXG4gICAgICByZXR1cm4gY21wO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWVkbGUuZ2VuZXJhdGVkQ29sdW1uICsgMSAtIHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbjtcclxuICB9KTtcclxuICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW3NlY3Rpb25JbmRleF07XHJcblxyXG4gIGlmICghc2VjdGlvbikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiBudWxsLFxyXG4gICAgICBsaW5lOiBudWxsLFxyXG4gICAgICBjb2x1bW46IG51bGwsXHJcbiAgICAgIG5hbWU6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2VjdGlvbi5jb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IG5lZWRsZS5nZW5lcmF0ZWRMaW5lIC0gKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgLSAxKSxcclxuICAgIGNvbHVtbjpcclxuICAgICAgbmVlZGxlLmdlbmVyYXRlZENvbHVtbiAtXHJcbiAgICAgIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lID09PSBuZWVkbGUuZ2VuZXJhdGVkTGluZVxyXG4gICAgICAgID8gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkQ29sdW1uIC0gMVxyXG4gICAgICAgIDogMCksXHJcbiAgICBiaWFzOiBhQXJncy5iaWFzXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgd2UgaGF2ZSB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGV2ZXJ5IHNvdXJjZSBpbiB0aGUgc291cmNlXHJcbiAqIG1hcCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5oYXNDb250ZW50c09mQWxsU291cmNlcyA9IGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9oYXNDb250ZW50c09mQWxsU291cmNlcygpIHtcclxuICByZXR1cm4gdGhpcy5fc2VjdGlvbnMuZXZlcnkoZnVuY3Rpb24ocykge1xyXG4gICAgcmV0dXJuIHMuY29uc3VtZXIuaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UgY29udGVudC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgdGhlIHVybCBvZiB0aGVcclxuICogb3JpZ2luYWwgc291cmNlIGZpbGUuIFJldHVybnMgbnVsbCBpZiBubyBvcmlnaW5hbCBzb3VyY2UgY29udGVudCBpc1xyXG4gKiBhdmFpbGFibGUuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLnNvdXJjZUNvbnRlbnRGb3IgPSBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfc291cmNlQ29udGVudEZvcihcclxuICBhU291cmNlLFxyXG4gIG51bGxPbk1pc3NpbmdcclxuKSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tpXTtcclxuXHJcbiAgICB2YXIgY29udGVudCA9IHNlY3Rpb24uY29uc3VtZXIuc291cmNlQ29udGVudEZvcihhU291cmNlLCB0cnVlKTtcclxuICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAobnVsbE9uTWlzc2luZykge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignXCInICsgYVNvdXJjZSArICdcIiBpcyBub3QgaW4gdGhlIFNvdXJjZU1hcC4nKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcclxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXHJcbiAqIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKlxyXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC5cclxuICogICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmdlbmVyYXRlZFBvc2l0aW9uRm9yID0gZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX2dlbmVyYXRlZFBvc2l0aW9uRm9yKFxyXG4gIGFBcmdzXHJcbikge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbaV07XHJcblxyXG4gICAgLy8gT25seSBjb25zaWRlciB0aGlzIHNlY3Rpb24gaWYgdGhlIHJlcXVlc3RlZCBzb3VyY2UgaXMgaW4gdGhlIGxpc3Qgb2ZcclxuICAgIC8vIHNvdXJjZXMgb2YgdGhlIGNvbnN1bWVyLlxyXG4gICAgaWYgKFxyXG4gICAgICBzZWN0aW9uLmNvbnN1bWVyLl9maW5kU291cmNlSW5kZXgodXRpbC5nZXRBcmcoYUFyZ3MsIFwic291cmNlXCIpKSA9PT0gLTFcclxuICAgICkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIHZhciBnZW5lcmF0ZWRQb3NpdGlvbiA9IHNlY3Rpb24uY29uc3VtZXIuZ2VuZXJhdGVkUG9zaXRpb25Gb3IoYUFyZ3MpO1xyXG4gICAgaWYgKGdlbmVyYXRlZFBvc2l0aW9uKSB7XHJcbiAgICAgIHZhciByZXQgPSB7XHJcbiAgICAgICAgbGluZTpcclxuICAgICAgICAgIGdlbmVyYXRlZFBvc2l0aW9uLmxpbmUgKyAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxyXG4gICAgICAgIGNvbHVtbjpcclxuICAgICAgICAgIGdlbmVyYXRlZFBvc2l0aW9uLmNvbHVtbiArXHJcbiAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSA9PT0gZ2VuZXJhdGVkUG9zaXRpb24ubGluZVxyXG4gICAgICAgICAgICA/IHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbiAtIDFcclxuICAgICAgICAgICAgOiAwKVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmU6IG51bGwsXHJcbiAgICBjb2x1bW46IG51bGxcclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHRoZSBtYXBwaW5ncyBpbiBhIHN0cmluZyBpbiB0byBhIGRhdGEgc3RydWN0dXJlIHdoaWNoIHdlIGNhbiBlYXNpbHlcclxuICogcXVlcnkgKHRoZSBvcmRlcmVkIGFycmF5cyBpbiB0aGUgYHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kXHJcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9wYXJzZU1hcHBpbmdzID0gZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX3BhcnNlTWFwcGluZ3MoXHJcbiAgYVN0cixcclxuICBhU291cmNlUm9vdFxyXG4pIHtcclxuICBjb25zdCBnZW5lcmF0ZWRNYXBwaW5ncyA9ICh0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZCA9IFtdKTtcclxuICBjb25zdCBvcmlnaW5hbE1hcHBpbmdzID0gKHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWQgPSBbXSk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tpXTtcclxuICAgIHZhciBzZWN0aW9uTWFwcGluZ3MgPSBzZWN0aW9uLmNvbnN1bWVyLl9nZW5lcmF0ZWRNYXBwaW5ncztcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VjdGlvbk1hcHBpbmdzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIHZhciBtYXBwaW5nID0gc2VjdGlvbk1hcHBpbmdzW2pdO1xyXG5cclxuICAgICAgdmFyIHNvdXJjZSA9IG51bGw7XHJcbiAgICAgIGlmIChtYXBwaW5nLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgc291cmNlID0gc2VjdGlvbi5jb25zdW1lci5fc291cmNlcy5hdChtYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKFxyXG4gICAgICAgICAgc2VjdGlvbi5jb25zdW1lci5zb3VyY2VSb290LFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgdGhpcy5fc291cmNlTWFwVVJMXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9zb3VyY2VzLmFkZChzb3VyY2UpO1xyXG4gICAgICAgIHNvdXJjZSA9IHRoaXMuX3NvdXJjZXMuaW5kZXhPZihzb3VyY2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbmFtZSA9IG51bGw7XHJcbiAgICAgIGlmIChtYXBwaW5nLm5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgIG5hbWUgPSBzZWN0aW9uLmNvbnN1bWVyLl9uYW1lcy5hdChtYXBwaW5nLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuX25hbWVzLmFkZChuYW1lKTtcclxuICAgICAgICBuYW1lID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVGhlIG1hcHBpbmdzIGNvbWluZyBmcm9tIHRoZSBjb25zdW1lciBmb3IgdGhlIHNlY3Rpb24gaGF2ZVxyXG4gICAgICAvLyBnZW5lcmF0ZWQgcG9zaXRpb25zIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgc2VjdGlvbiwgc28gd2VcclxuICAgICAgLy8gbmVlZCB0byBvZmZzZXQgdGhlbSB0byBiZSByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIGNvbmNhdGVuYXRlZFxyXG4gICAgICAvLyBnZW5lcmF0ZWQgZmlsZS5cclxuICAgICAgdmFyIGFkanVzdGVkTWFwcGluZyA9IHtcclxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgICBnZW5lcmF0ZWRMaW5lOlxyXG4gICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWRMaW5lICsgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgLSAxKSxcclxuICAgICAgICBnZW5lcmF0ZWRDb2x1bW46XHJcbiAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiArXHJcbiAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSA9PT0gbWFwcGluZy5nZW5lcmF0ZWRMaW5lXHJcbiAgICAgICAgICAgID8gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkQ29sdW1uIC0gMVxyXG4gICAgICAgICAgICA6IDApLFxyXG4gICAgICAgIG9yaWdpbmFsTGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXHJcbiAgICAgICAgb3JpZ2luYWxDb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZ2VuZXJhdGVkTWFwcGluZ3MucHVzaChhZGp1c3RlZE1hcHBpbmcpO1xyXG4gICAgICBpZiAodHlwZW9mIGFkanVzdGVkTWFwcGluZy5vcmlnaW5hbExpbmUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICBvcmlnaW5hbE1hcHBpbmdzLnB1c2goYWRqdXN0ZWRNYXBwaW5nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29tcHV0ZUNvbHVtblNwYW5zID0gZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX2NvbXB1dGVDb2x1bW5TcGFucygpIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0aGlzLl9zZWN0aW9uc1tpXS5jb25zdW1lci5jb21wdXRlQ29sdW1uU3BhbnMoKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnRzLkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lciA9IEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcjtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciBiYXNlNjRWTFEgPSByZXF1aXJlKFwiLi9iYXNlNjQtdmxxXCIpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBBcnJheVNldCA9IHJlcXVpcmUoXCIuL2FycmF5LXNldFwiKS5BcnJheVNldDtcclxudmFyIE1hcHBpbmdMaXN0ID0gcmVxdWlyZShcIi4vbWFwcGluZy1saXN0XCIpLk1hcHBpbmdMaXN0O1xyXG5cclxuLyoqXHJcbiAqIEFuIGluc3RhbmNlIG9mIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IgcmVwcmVzZW50cyBhIHNvdXJjZSBtYXAgd2hpY2ggaXNcclxuICogYmVpbmcgYnVpbHQgaW5jcmVtZW50YWxseS4gWW91IG1heSBwYXNzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmdcclxuICogcHJvcGVydGllczpcclxuICpcclxuICogICAtIGZpbGU6IFRoZSBmaWxlbmFtZSBvZiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS5cclxuICogICAtIHNvdXJjZVJvb3Q6IEEgcm9vdCBmb3IgYWxsIHJlbGF0aXZlIFVSTHMgaW4gdGhpcyBzb3VyY2UgbWFwLlxyXG4gKi9cclxuZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yKGFBcmdzKSB7XHJcbiAgaWYgKCFhQXJncykge1xyXG4gICAgYUFyZ3MgPSB7fTtcclxuICB9XHJcbiAgdGhpcy5fZmlsZSA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImZpbGVcIiwgbnVsbCk7XHJcbiAgdGhpcy5fc291cmNlUm9vdCA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcInNvdXJjZVJvb3RcIiwgbnVsbCk7XHJcbiAgdGhpcy5fc2tpcFZhbGlkYXRpb24gPSB1dGlsLmdldEFyZyhhQXJncywgXCJza2lwVmFsaWRhdGlvblwiLCBmYWxzZSk7XHJcbiAgdGhpcy5fc291cmNlcyA9IG5ldyBBcnJheVNldCgpO1xyXG4gIHRoaXMuX25hbWVzID0gbmV3IEFycmF5U2V0KCk7XHJcbiAgdGhpcy5fbWFwcGluZ3MgPSBuZXcgTWFwcGluZ0xpc3QoKTtcclxuICB0aGlzLl9zb3VyY2VzQ29udGVudHMgPSBudWxsO1xyXG59XHJcblxyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLl92ZXJzaW9uID0gMztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IFNvdXJjZU1hcEdlbmVyYXRvciBiYXNlZCBvbiBhIFNvdXJjZU1hcENvbnN1bWVyXHJcbiAqXHJcbiAqIEBwYXJhbSBhU291cmNlTWFwQ29uc3VtZXIgVGhlIFNvdXJjZU1hcC5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5mcm9tU291cmNlTWFwID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX2Zyb21Tb3VyY2VNYXAoXHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyXHJcbikge1xyXG4gIHZhciBzb3VyY2VSb290ID0gYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZVJvb3Q7XHJcbiAgdmFyIGdlbmVyYXRvciA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogYVNvdXJjZU1hcENvbnN1bWVyLmZpbGUsXHJcbiAgICBzb3VyY2VSb290OiBzb3VyY2VSb290XHJcbiAgfSk7XHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIHZhciBuZXdNYXBwaW5nID0ge1xyXG4gICAgICBnZW5lcmF0ZWQ6IHtcclxuICAgICAgICBsaW5lOiBtYXBwaW5nLmdlbmVyYXRlZExpbmUsXHJcbiAgICAgICAgY29sdW1uOiBtYXBwaW5nLmdlbmVyYXRlZENvbHVtblxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChtYXBwaW5nLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgIG5ld01hcHBpbmcuc291cmNlID0gbWFwcGluZy5zb3VyY2U7XHJcbiAgICAgIGlmIChzb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgICAgICBuZXdNYXBwaW5nLnNvdXJjZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgbmV3TWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuZXdNYXBwaW5nLm9yaWdpbmFsID0ge1xyXG4gICAgICAgIGxpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxyXG4gICAgICAgIGNvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKG1hcHBpbmcubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgbmV3TWFwcGluZy5uYW1lID0gbWFwcGluZy5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdG9yLmFkZE1hcHBpbmcobmV3TWFwcGluZyk7XHJcbiAgfSk7XHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VGaWxlKSB7XHJcbiAgICB2YXIgc291cmNlUmVsYXRpdmUgPSBzb3VyY2VGaWxlO1xyXG4gICAgaWYgKHNvdXJjZVJvb3QgIT09IG51bGwpIHtcclxuICAgICAgc291cmNlUmVsYXRpdmUgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZUZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZ2VuZXJhdG9yLl9zb3VyY2VzLmhhcyhzb3VyY2VSZWxhdGl2ZSkpIHtcclxuICAgICAgZ2VuZXJhdG9yLl9zb3VyY2VzLmFkZChzb3VyY2VSZWxhdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvbnRlbnQgPSBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlQ29udGVudEZvcihzb3VyY2VGaWxlKTtcclxuICAgIGlmIChjb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgZ2VuZXJhdG9yLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGdlbmVyYXRvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBzaW5nbGUgbWFwcGluZyBmcm9tIG9yaWdpbmFsIHNvdXJjZSBsaW5lIGFuZCBjb2x1bW4gdG8gdGhlIGdlbmVyYXRlZFxyXG4gKiBzb3VyY2UncyBsaW5lIGFuZCBjb2x1bW4gZm9yIHRoaXMgc291cmNlIG1hcCBiZWluZyBjcmVhdGVkLiBUaGUgbWFwcGluZ1xyXG4gKiBvYmplY3Qgc2hvdWxkIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gZ2VuZXJhdGVkOiBBbiBvYmplY3Qgd2l0aCB0aGUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMuXHJcbiAqICAgLSBvcmlnaW5hbDogQW4gb2JqZWN0IHdpdGggdGhlIG9yaWdpbmFsIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMuXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSAocmVsYXRpdmUgdG8gdGhlIHNvdXJjZVJvb3QpLlxyXG4gKiAgIC0gbmFtZTogQW4gb3B0aW9uYWwgb3JpZ2luYWwgdG9rZW4gbmFtZSBmb3IgdGhpcyBtYXBwaW5nLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5hZGRNYXBwaW5nID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX2FkZE1hcHBpbmcoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgdmFyIGdlbmVyYXRlZCA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImdlbmVyYXRlZFwiKTtcclxuICB2YXIgb3JpZ2luYWwgPSB1dGlsLmdldEFyZyhhQXJncywgXCJvcmlnaW5hbFwiLCBudWxsKTtcclxuICB2YXIgc291cmNlID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwic291cmNlXCIsIG51bGwpO1xyXG4gIHZhciBuYW1lID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwibmFtZVwiLCBudWxsKTtcclxuXHJcbiAgaWYgKCF0aGlzLl9za2lwVmFsaWRhdGlvbikge1xyXG4gICAgdGhpcy5fdmFsaWRhdGVNYXBwaW5nKGdlbmVyYXRlZCwgb3JpZ2luYWwsIHNvdXJjZSwgbmFtZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc291cmNlICE9IG51bGwpIHtcclxuICAgIHNvdXJjZSA9IFN0cmluZyhzb3VyY2UpO1xyXG4gICAgaWYgKCF0aGlzLl9zb3VyY2VzLmhhcyhzb3VyY2UpKSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZXMuYWRkKHNvdXJjZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobmFtZSAhPSBudWxsKSB7XHJcbiAgICBuYW1lID0gU3RyaW5nKG5hbWUpO1xyXG4gICAgaWYgKCF0aGlzLl9uYW1lcy5oYXMobmFtZSkpIHtcclxuICAgICAgdGhpcy5fbmFtZXMuYWRkKG5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5fbWFwcGluZ3MuYWRkKHtcclxuICAgIGdlbmVyYXRlZExpbmU6IGdlbmVyYXRlZC5saW5lLFxyXG4gICAgZ2VuZXJhdGVkQ29sdW1uOiBnZW5lcmF0ZWQuY29sdW1uLFxyXG4gICAgb3JpZ2luYWxMaW5lOiBvcmlnaW5hbCAhPSBudWxsICYmIG9yaWdpbmFsLmxpbmUsXHJcbiAgICBvcmlnaW5hbENvbHVtbjogb3JpZ2luYWwgIT0gbnVsbCAmJiBvcmlnaW5hbC5jb2x1bW4sXHJcbiAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgIG5hbWU6IG5hbWVcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHNvdXJjZSBjb250ZW50IGZvciBhIHNvdXJjZSBmaWxlLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5zZXRTb3VyY2VDb250ZW50ID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3NldFNvdXJjZUNvbnRlbnQoXHJcbiAgYVNvdXJjZUZpbGUsXHJcbiAgYVNvdXJjZUNvbnRlbnRcclxuKSB7XHJcbiAgdmFyIHNvdXJjZSA9IGFTb3VyY2VGaWxlO1xyXG4gIGlmICh0aGlzLl9zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgIHNvdXJjZSA9IHV0aWwucmVsYXRpdmUodGhpcy5fc291cmNlUm9vdCwgc291cmNlKTtcclxuICB9XHJcblxyXG4gIGlmIChhU291cmNlQ29udGVudCAhPSBudWxsKSB7XHJcbiAgICAvLyBBZGQgdGhlIHNvdXJjZSBjb250ZW50IHRvIHRoZSBfc291cmNlc0NvbnRlbnRzIG1hcC5cclxuICAgIC8vIENyZWF0ZSBhIG5ldyBfc291cmNlc0NvbnRlbnRzIG1hcCBpZiB0aGUgcHJvcGVydHkgaXMgbnVsbC5cclxuICAgIGlmICghdGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZXNDb250ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zb3VyY2VzQ29udGVudHNbdXRpbC50b1NldFN0cmluZyhzb3VyY2UpXSA9IGFTb3VyY2VDb250ZW50O1xyXG4gIH0gZWxzZSBpZiAodGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XHJcbiAgICAvLyBSZW1vdmUgdGhlIHNvdXJjZSBmaWxlIGZyb20gdGhlIF9zb3VyY2VzQ29udGVudHMgbWFwLlxyXG4gICAgLy8gSWYgdGhlIF9zb3VyY2VzQ29udGVudHMgbWFwIGlzIGVtcHR5LCBzZXQgdGhlIHByb3BlcnR5IHRvIG51bGwuXHJcbiAgICBkZWxldGUgdGhpcy5fc291cmNlc0NvbnRlbnRzW3V0aWwudG9TZXRTdHJpbmcoc291cmNlKV07XHJcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fc291cmNlc0NvbnRlbnRzKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5fc291cmNlc0NvbnRlbnRzID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQXBwbGllcyB0aGUgbWFwcGluZ3Mgb2YgYSBzdWItc291cmNlLW1hcCBmb3IgYSBzcGVjaWZpYyBzb3VyY2UgZmlsZSB0byB0aGVcclxuICogc291cmNlIG1hcCBiZWluZyBnZW5lcmF0ZWQuIEVhY2ggbWFwcGluZyB0byB0aGUgc3VwcGxpZWQgc291cmNlIGZpbGUgaXNcclxuICogcmV3cml0dGVuIHVzaW5nIHRoZSBzdXBwbGllZCBzb3VyY2UgbWFwLiBOb3RlOiBUaGUgcmVzb2x1dGlvbiBmb3IgdGhlXHJcbiAqIHJlc3VsdGluZyBtYXBwaW5ncyBpcyB0aGUgbWluaW1pdW0gb2YgdGhpcyBtYXAgYW5kIHRoZSBzdXBwbGllZCBtYXAuXHJcbiAqXHJcbiAqIEBwYXJhbSBhU291cmNlTWFwQ29uc3VtZXIgVGhlIHNvdXJjZSBtYXAgdG8gYmUgYXBwbGllZC5cclxuICogQHBhcmFtIGFTb3VyY2VGaWxlIE9wdGlvbmFsLiBUaGUgZmlsZW5hbWUgb2YgdGhlIHNvdXJjZSBmaWxlLlxyXG4gKiAgICAgICAgSWYgb21pdHRlZCwgU291cmNlTWFwQ29uc3VtZXIncyBmaWxlIHByb3BlcnR5IHdpbGwgYmUgdXNlZC5cclxuICogQHBhcmFtIGFTb3VyY2VNYXBQYXRoIE9wdGlvbmFsLiBUaGUgZGlybmFtZSBvZiB0aGUgcGF0aCB0byB0aGUgc291cmNlIG1hcFxyXG4gKiAgICAgICAgdG8gYmUgYXBwbGllZC4gSWYgcmVsYXRpdmUsIGl0IGlzIHJlbGF0aXZlIHRvIHRoZSBTb3VyY2VNYXBDb25zdW1lci5cclxuICogICAgICAgIFRoaXMgcGFyYW1ldGVyIGlzIG5lZWRlZCB3aGVuIHRoZSB0d28gc291cmNlIG1hcHMgYXJlbid0IGluIHRoZSBzYW1lXHJcbiAqICAgICAgICBkaXJlY3RvcnksIGFuZCB0aGUgc291cmNlIG1hcCB0byBiZSBhcHBsaWVkIGNvbnRhaW5zIHJlbGF0aXZlIHNvdXJjZVxyXG4gKiAgICAgICAgcGF0aHMuIElmIHNvLCB0aG9zZSByZWxhdGl2ZSBzb3VyY2UgcGF0aHMgbmVlZCB0byBiZSByZXdyaXR0ZW5cclxuICogICAgICAgIHJlbGF0aXZlIHRvIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFwcGx5U291cmNlTWFwID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX2FwcGx5U291cmNlTWFwKFxyXG4gIGFTb3VyY2VNYXBDb25zdW1lcixcclxuICBhU291cmNlRmlsZSxcclxuICBhU291cmNlTWFwUGF0aFxyXG4pIHtcclxuICB2YXIgc291cmNlRmlsZSA9IGFTb3VyY2VGaWxlO1xyXG4gIC8vIElmIGFTb3VyY2VGaWxlIGlzIG9taXR0ZWQsIHdlIHdpbGwgdXNlIHRoZSBmaWxlIHByb3BlcnR5IG9mIHRoZSBTb3VyY2VNYXBcclxuICBpZiAoYVNvdXJjZUZpbGUgPT0gbnVsbCkge1xyXG4gICAgaWYgKGFTb3VyY2VNYXBDb25zdW1lci5maWxlID09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIFwiU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5hcHBseVNvdXJjZU1hcCByZXF1aXJlcyBlaXRoZXIgYW4gZXhwbGljaXQgc291cmNlIGZpbGUsIFwiICtcclxuICAgICAgICAgICdvciB0aGUgc291cmNlIG1hcFxcJ3MgXCJmaWxlXCIgcHJvcGVydHkuIEJvdGggd2VyZSBvbWl0dGVkLidcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHNvdXJjZUZpbGUgPSBhU291cmNlTWFwQ29uc3VtZXIuZmlsZTtcclxuICB9XHJcbiAgdmFyIHNvdXJjZVJvb3QgPSB0aGlzLl9zb3VyY2VSb290O1xyXG4gIC8vIE1ha2UgXCJzb3VyY2VGaWxlXCIgcmVsYXRpdmUgaWYgYW4gYWJzb2x1dGUgVXJsIGlzIHBhc3NlZC5cclxuICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICBzb3VyY2VGaWxlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2VGaWxlKTtcclxuICB9XHJcbiAgLy8gQXBwbHlpbmcgdGhlIFNvdXJjZU1hcCBjYW4gYWRkIGFuZCByZW1vdmUgaXRlbXMgZnJvbSB0aGUgc291cmNlcyBhbmRcclxuICAvLyB0aGUgbmFtZXMgYXJyYXkuXHJcbiAgdmFyIG5ld1NvdXJjZXMgPVxyXG4gICAgdGhpcy5fbWFwcGluZ3MudG9BcnJheSgpLmxlbmd0aCA+IDAgPyBuZXcgQXJyYXlTZXQoKSA6IHRoaXMuX3NvdXJjZXM7XHJcbiAgdmFyIG5ld05hbWVzID0gbmV3IEFycmF5U2V0KCk7XHJcblxyXG4gIC8vIEZpbmQgbWFwcGluZ3MgZm9yIHRoZSBcInNvdXJjZUZpbGVcIlxyXG4gIHRoaXMuX21hcHBpbmdzLnVuc29ydGVkRm9yRWFjaChmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IHNvdXJjZUZpbGUgJiYgbWFwcGluZy5vcmlnaW5hbExpbmUgIT0gbnVsbCkge1xyXG4gICAgICAvLyBDaGVjayBpZiBpdCBjYW4gYmUgbWFwcGVkIGJ5IHRoZSBzb3VyY2UgbWFwLCB0aGVuIHVwZGF0ZSB0aGUgbWFwcGluZy5cclxuICAgICAgdmFyIG9yaWdpbmFsID0gYVNvdXJjZU1hcENvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgICAgIGxpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxyXG4gICAgICAgIGNvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtblxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKG9yaWdpbmFsLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gQ29weSBtYXBwaW5nXHJcbiAgICAgICAgbWFwcGluZy5zb3VyY2UgPSBvcmlnaW5hbC5zb3VyY2U7XHJcbiAgICAgICAgaWYgKGFTb3VyY2VNYXBQYXRoICE9IG51bGwpIHtcclxuICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gdXRpbC5qb2luKGFTb3VyY2VNYXBQYXRoLCBtYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBtYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lID0gb3JpZ2luYWwubGluZTtcclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uID0gb3JpZ2luYWwuY29sdW1uO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbC5uYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgIG1hcHBpbmcubmFtZSA9IG9yaWdpbmFsLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNvdXJjZSA9IG1hcHBpbmcuc291cmNlO1xyXG4gICAgaWYgKHNvdXJjZSAhPSBudWxsICYmICFuZXdTb3VyY2VzLmhhcyhzb3VyY2UpKSB7XHJcbiAgICAgIG5ld1NvdXJjZXMuYWRkKHNvdXJjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5hbWUgPSBtYXBwaW5nLm5hbWU7XHJcbiAgICBpZiAobmFtZSAhPSBudWxsICYmICFuZXdOYW1lcy5oYXMobmFtZSkpIHtcclxuICAgICAgbmV3TmFtZXMuYWRkKG5hbWUpO1xyXG4gICAgfVxyXG4gIH0sIHRoaXMpO1xyXG4gIHRoaXMuX3NvdXJjZXMgPSBuZXdTb3VyY2VzO1xyXG4gIHRoaXMuX25hbWVzID0gbmV3TmFtZXM7XHJcblxyXG4gIC8vIENvcHkgc291cmNlc0NvbnRlbnRzIG9mIGFwcGxpZWQgbWFwLlxyXG4gIGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VzLmZvckVhY2goZnVuY3Rpb24oc291cmNlRmlsZSkge1xyXG4gICAgdmFyIGNvbnRlbnQgPSBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlQ29udGVudEZvcihzb3VyY2VGaWxlKTtcclxuICAgIGlmIChjb250ZW50ICE9IG51bGwpIHtcclxuICAgICAgaWYgKGFTb3VyY2VNYXBQYXRoICE9IG51bGwpIHtcclxuICAgICAgICBzb3VyY2VGaWxlID0gdXRpbC5qb2luKGFTb3VyY2VNYXBQYXRoLCBzb3VyY2VGaWxlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgICAgc291cmNlRmlsZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgc291cmNlRmlsZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTb3VyY2VDb250ZW50KHNvdXJjZUZpbGUsIGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH0sIHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgbWFwcGluZyBjYW4gaGF2ZSBvbmUgb2YgdGhlIHRocmVlIGxldmVscyBvZiBkYXRhOlxyXG4gKlxyXG4gKiAgIDEuIEp1c3QgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbi5cclxuICogICAyLiBUaGUgR2VuZXJhdGVkIHBvc2l0aW9uLCBvcmlnaW5hbCBwb3NpdGlvbiwgYW5kIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAzLiBHZW5lcmF0ZWQgYW5kIG9yaWdpbmFsIHBvc2l0aW9uLCBvcmlnaW5hbCBzb3VyY2UsIGFzIHdlbGwgYXMgYSBuYW1lXHJcbiAqICAgICAgdG9rZW4uXHJcbiAqXHJcbiAqIFRvIG1haW50YWluIGNvbnNpc3RlbmN5LCB3ZSB2YWxpZGF0ZSB0aGF0IGFueSBuZXcgbWFwcGluZyBiZWluZyBhZGRlZCBmYWxsc1xyXG4gKiBpbiB0byBvbmUgb2YgdGhlc2UgY2F0ZWdvcmllcy5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlTWFwcGluZyA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl92YWxpZGF0ZU1hcHBpbmcoXHJcbiAgYUdlbmVyYXRlZCxcclxuICBhT3JpZ2luYWwsXHJcbiAgYVNvdXJjZSxcclxuICBhTmFtZVxyXG4pIHtcclxuICAvLyBXaGVuIGFPcmlnaW5hbCBpcyB0cnV0aHkgYnV0IGhhcyBlbXB0eSB2YWx1ZXMgZm9yIC5saW5lIGFuZCAuY29sdW1uLFxyXG4gIC8vIGl0IGlzIG1vc3QgbGlrZWx5IGEgcHJvZ3JhbW1lciBlcnJvci4gSW4gdGhpcyBjYXNlIHdlIHRocm93IGEgdmVyeVxyXG4gIC8vIHNwZWNpZmljIGVycm9yIG1lc3NhZ2UgdG8gdHJ5IHRvIGd1aWRlIHRoZW0gdGhlIHJpZ2h0IHdheS5cclxuICAvLyBGb3IgZXhhbXBsZTogaHR0cHM6Ly9naXRodWIuY29tL1BvbHltZXIvcG9seW1lci1idW5kbGVyL3B1bGwvNTE5XHJcbiAgaWYgKFxyXG4gICAgYU9yaWdpbmFsICYmXHJcbiAgICB0eXBlb2YgYU9yaWdpbmFsLmxpbmUgIT09IFwibnVtYmVyXCIgJiZcclxuICAgIHR5cGVvZiBhT3JpZ2luYWwuY29sdW1uICE9PSBcIm51bWJlclwiXHJcbiAgKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIFwib3JpZ2luYWwubGluZSBhbmQgb3JpZ2luYWwuY29sdW1uIGFyZSBub3QgbnVtYmVycyAtLSB5b3UgcHJvYmFibHkgbWVhbnQgdG8gb21pdCBcIiArXHJcbiAgICAgICAgXCJ0aGUgb3JpZ2luYWwgbWFwcGluZyBlbnRpcmVseSBhbmQgb25seSBtYXAgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbi4gSWYgc28sIHBhc3MgXCIgK1xyXG4gICAgICAgIFwibnVsbCBmb3IgdGhlIG9yaWdpbmFsIG1hcHBpbmcgaW5zdGVhZCBvZiBhbiBvYmplY3Qgd2l0aCBlbXB0eSBvciBudWxsIHZhbHVlcy5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIGFHZW5lcmF0ZWQgJiZcclxuICAgIFwibGluZVwiIGluIGFHZW5lcmF0ZWQgJiZcclxuICAgIFwiY29sdW1uXCIgaW4gYUdlbmVyYXRlZCAmJlxyXG4gICAgYUdlbmVyYXRlZC5saW5lID4gMCAmJlxyXG4gICAgYUdlbmVyYXRlZC5jb2x1bW4gPj0gMCAmJlxyXG4gICAgIWFPcmlnaW5hbCAmJlxyXG4gICAgIWFTb3VyY2UgJiZcclxuICAgICFhTmFtZVxyXG4gICkge1xyXG4gICAgLy8gQ2FzZSAxLlxyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICBhR2VuZXJhdGVkICYmXHJcbiAgICBcImxpbmVcIiBpbiBhR2VuZXJhdGVkICYmXHJcbiAgICBcImNvbHVtblwiIGluIGFHZW5lcmF0ZWQgJiZcclxuICAgIGFPcmlnaW5hbCAmJlxyXG4gICAgXCJsaW5lXCIgaW4gYU9yaWdpbmFsICYmXHJcbiAgICBcImNvbHVtblwiIGluIGFPcmlnaW5hbCAmJlxyXG4gICAgYUdlbmVyYXRlZC5saW5lID4gMCAmJlxyXG4gICAgYUdlbmVyYXRlZC5jb2x1bW4gPj0gMCAmJlxyXG4gICAgYU9yaWdpbmFsLmxpbmUgPiAwICYmXHJcbiAgICBhT3JpZ2luYWwuY29sdW1uID49IDAgJiZcclxuICAgIGFTb3VyY2VcclxuICApIHtcclxuICAgIC8vIENhc2VzIDIgYW5kIDMuXHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgXCJJbnZhbGlkIG1hcHBpbmc6IFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBnZW5lcmF0ZWQ6IGFHZW5lcmF0ZWQsXHJcbiAgICAgICAgICBzb3VyY2U6IGFTb3VyY2UsXHJcbiAgICAgICAgICBvcmlnaW5hbDogYU9yaWdpbmFsLFxyXG4gICAgICAgICAgbmFtZTogYU5hbWVcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2VyaWFsaXplIHRoZSBhY2N1bXVsYXRlZCBtYXBwaW5ncyBpbiB0byB0aGUgc3RyZWFtIG9mIGJhc2UgNjQgVkxRc1xyXG4gKiBzcGVjaWZpZWQgYnkgdGhlIHNvdXJjZSBtYXAgZm9ybWF0LlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5fc2VyaWFsaXplTWFwcGluZ3MgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3Jfc2VyaWFsaXplTWFwcGluZ3MoKSB7XHJcbiAgdmFyIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICB2YXIgcHJldmlvdXNHZW5lcmF0ZWRMaW5lID0gMTtcclxuICB2YXIgcHJldmlvdXNPcmlnaW5hbENvbHVtbiA9IDA7XHJcbiAgdmFyIHByZXZpb3VzT3JpZ2luYWxMaW5lID0gMDtcclxuICB2YXIgcHJldmlvdXNOYW1lID0gMDtcclxuICB2YXIgcHJldmlvdXNTb3VyY2UgPSAwO1xyXG4gIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gIHZhciBuZXh0O1xyXG4gIHZhciBtYXBwaW5nO1xyXG4gIHZhciBuYW1lSWR4O1xyXG4gIHZhciBzb3VyY2VJZHg7XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IHRoaXMuX21hcHBpbmdzLnRvQXJyYXkoKTtcclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbWFwcGluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIG1hcHBpbmcgPSBtYXBwaW5nc1tpXTtcclxuICAgIG5leHQgPSBcIlwiO1xyXG5cclxuICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgIT09IHByZXZpb3VzR2VuZXJhdGVkTGluZSkge1xyXG4gICAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IDA7XHJcbiAgICAgIHdoaWxlIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgIT09IHByZXZpb3VzR2VuZXJhdGVkTGluZSkge1xyXG4gICAgICAgIG5leHQgKz0gXCI7XCI7XHJcbiAgICAgICAgcHJldmlvdXNHZW5lcmF0ZWRMaW5lKys7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICF1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmcsIG1hcHBpbmdzW2kgLSAxXSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0ICs9IFwiLFwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uIC0gcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4pO1xyXG4gICAgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcclxuXHJcbiAgICBpZiAobWFwcGluZy5zb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICBzb3VyY2VJZHggPSB0aGlzLl9zb3VyY2VzLmluZGV4T2YobWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUoc291cmNlSWR4IC0gcHJldmlvdXNTb3VyY2UpO1xyXG4gICAgICBwcmV2aW91c1NvdXJjZSA9IHNvdXJjZUlkeDtcclxuXHJcbiAgICAgIC8vIGxpbmVzIGFyZSBzdG9yZWQgMC1iYXNlZCBpbiBTb3VyY2VNYXAgc3BlYyB2ZXJzaW9uIDNcclxuICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKG1hcHBpbmcub3JpZ2luYWxMaW5lIC0gMSAtIHByZXZpb3VzT3JpZ2luYWxMaW5lKTtcclxuICAgICAgcHJldmlvdXNPcmlnaW5hbExpbmUgPSBtYXBwaW5nLm9yaWdpbmFsTGluZSAtIDE7XHJcblxyXG4gICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5vcmlnaW5hbENvbHVtbiAtIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4pO1xyXG4gICAgICBwcmV2aW91c09yaWdpbmFsQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuXHJcbiAgICAgIGlmIChtYXBwaW5nLm5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgIG5hbWVJZHggPSB0aGlzLl9uYW1lcy5pbmRleE9mKG1hcHBpbmcubmFtZSk7XHJcbiAgICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKG5hbWVJZHggLSBwcmV2aW91c05hbWUpO1xyXG4gICAgICAgIHByZXZpb3VzTmFtZSA9IG5hbWVJZHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXN1bHQgKz0gbmV4dDtcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLl9nZW5lcmF0ZVNvdXJjZXNDb250ZW50ID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX2dlbmVyYXRlU291cmNlc0NvbnRlbnQoXHJcbiAgYVNvdXJjZXMsXHJcbiAgYVNvdXJjZVJvb3RcclxuKSB7XHJcbiAgcmV0dXJuIGFTb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UpIHtcclxuICAgIGlmICghdGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKGFTb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgICAgc291cmNlID0gdXRpbC5yZWxhdGl2ZShhU291cmNlUm9vdCwgc291cmNlKTtcclxuICAgIH1cclxuICAgIHZhciBrZXkgPSB1dGlsLnRvU2V0U3RyaW5nKHNvdXJjZSk7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX3NvdXJjZXNDb250ZW50cywga2V5KVxyXG4gICAgICA/IHRoaXMuX3NvdXJjZXNDb250ZW50c1trZXldXHJcbiAgICAgIDogbnVsbDtcclxuICB9LCB0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeHRlcm5hbGl6ZSB0aGUgc291cmNlIG1hcC5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3RvSlNPTigpIHtcclxuICB2YXIgbWFwID0ge1xyXG4gICAgdmVyc2lvbjogdGhpcy5fdmVyc2lvbixcclxuICAgIHNvdXJjZXM6IHRoaXMuX3NvdXJjZXMudG9BcnJheSgpLFxyXG4gICAgbmFtZXM6IHRoaXMuX25hbWVzLnRvQXJyYXkoKSxcclxuICAgIG1hcHBpbmdzOiB0aGlzLl9zZXJpYWxpemVNYXBwaW5ncygpXHJcbiAgfTtcclxuICBpZiAodGhpcy5fZmlsZSAhPSBudWxsKSB7XHJcbiAgICBtYXAuZmlsZSA9IHRoaXMuX2ZpbGU7XHJcbiAgfVxyXG4gIGlmICh0aGlzLl9zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgIG1hcC5zb3VyY2VSb290ID0gdGhpcy5fc291cmNlUm9vdDtcclxuICB9XHJcbiAgaWYgKHRoaXMuX3NvdXJjZXNDb250ZW50cykge1xyXG4gICAgbWFwLnNvdXJjZXNDb250ZW50ID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudChcclxuICAgICAgbWFwLnNvdXJjZXMsXHJcbiAgICAgIG1hcC5zb3VyY2VSb290XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXIgdGhlIHNvdXJjZSBtYXAgYmVpbmcgZ2VuZXJhdGVkIHRvIGEgc3RyaW5nLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl90b1N0cmluZygpIHtcclxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlNvdXJjZU1hcEdlbmVyYXRvciA9IFNvdXJjZU1hcEdlbmVyYXRvcjtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIHZhbHVlcyBmcm9tIHBhcmFtZXRlci9vcHRpb25zXHJcbiAqIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcmdzIFRoZSBvYmplY3Qgd2UgYXJlIGV4dHJhY3RpbmcgdmFsdWVzIGZyb21cclxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIGFyZSBnZXR0aW5nLlxyXG4gKiBAcGFyYW0gZGVmYXVsdFZhbHVlIEFuIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBpZiB0aGUgcHJvcGVydHkgaXMgbWlzc2luZ1xyXG4gKiBmcm9tIHRoZSBvYmplY3QuIElmIHRoaXMgaXMgbm90IHNwZWNpZmllZCBhbmQgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmcsIGFuXHJcbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QXJnKGFBcmdzLCBhTmFtZSwgYURlZmF1bHRWYWx1ZSkge1xyXG4gIGlmIChhTmFtZSBpbiBhQXJncykge1xyXG4gICAgcmV0dXJuIGFBcmdzW2FOYW1lXTtcclxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgIHJldHVybiBhRGVmYXVsdFZhbHVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFOYW1lICsgJ1wiIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0QXJnID0gZ2V0QXJnO1xyXG5cclxudmFyIHVybFJlZ2V4cCA9IC9eKD86KFtcXHcrXFwtLl0rKTopP1xcL1xcLyg/OihcXHcrOlxcdyspQCk/KFtcXHcuLV0qKSg/OjooXFxkKykpPyguKikkLztcclxudmFyIGRhdGFVcmxSZWdleHAgPSAvXmRhdGE6LitcXCwuKyQvO1xyXG5cclxuZnVuY3Rpb24gdXJsUGFyc2UoYVVybCkge1xyXG4gIHZhciBtYXRjaCA9IGFVcmwubWF0Y2godXJsUmVnZXhwKTtcclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHNjaGVtZTogbWF0Y2hbMV0sXHJcbiAgICBhdXRoOiBtYXRjaFsyXSxcclxuICAgIGhvc3Q6IG1hdGNoWzNdLFxyXG4gICAgcG9ydDogbWF0Y2hbNF0sXHJcbiAgICBwYXRoOiBtYXRjaFs1XVxyXG4gIH07XHJcbn1cclxuZXhwb3J0cy51cmxQYXJzZSA9IHVybFBhcnNlO1xyXG5cclxuZnVuY3Rpb24gdXJsR2VuZXJhdGUoYVBhcnNlZFVybCkge1xyXG4gIHZhciB1cmwgPSBcIlwiO1xyXG4gIGlmIChhUGFyc2VkVXJsLnNjaGVtZSkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuc2NoZW1lICsgXCI6XCI7XHJcbiAgfVxyXG4gIHVybCArPSBcIi8vXCI7XHJcbiAgaWYgKGFQYXJzZWRVcmwuYXV0aCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuYXV0aCArIFwiQFwiO1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5ob3N0KSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5ob3N0O1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5wb3J0KSB7XHJcbiAgICB1cmwgKz0gXCI6XCIgKyBhUGFyc2VkVXJsLnBvcnQ7XHJcbiAgfVxyXG4gIGlmIChhUGFyc2VkVXJsLnBhdGgpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnBhdGg7XHJcbiAgfVxyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuZXhwb3J0cy51cmxHZW5lcmF0ZSA9IHVybEdlbmVyYXRlO1xyXG5cclxuY29uc3QgTUFYX0NBQ0hFRF9JTlBVVFMgPSAzMjtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBzb21lIGZ1bmN0aW9uIGBmKGlucHV0KSAtPiByZXN1bHRgIGFuZCByZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZlxyXG4gKiBgZmAuXHJcbiAqXHJcbiAqIFdlIGtlZXAgYXQgbW9zdCBgTUFYX0NBQ0hFRF9JTlBVVFNgIG1lbW9pemVkIHJlc3VsdHMgb2YgYGZgIGFsaXZlLiBUaGVcclxuICogbWVtb2l6YXRpb24gaXMgYSBkdW1iLXNpbXBsZSwgbGluZWFyIGxlYXN0LXJlY2VudGx5LXVzZWQgY2FjaGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBscnVNZW1vaXplKGYpIHtcclxuICBjb25zdCBjYWNoZSA9IFtdO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGNhY2hlW2ldLmlucHV0ID09PSBpbnB1dCkge1xyXG4gICAgICAgIHZhciB0ZW1wID0gY2FjaGVbMF07XHJcbiAgICAgICAgY2FjaGVbMF0gPSBjYWNoZVtpXTtcclxuICAgICAgICBjYWNoZVtpXSA9IHRlbXA7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlWzBdLnJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXN1bHQgPSBmKGlucHV0KTtcclxuXHJcbiAgICBjYWNoZS51bnNoaWZ0KHtcclxuICAgICAgaW5wdXQsXHJcbiAgICAgIHJlc3VsdFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNhY2hlLmxlbmd0aCA+IE1BWF9DQUNIRURfSU5QVVRTKSB7XHJcbiAgICAgIGNhY2hlLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgYSBwYXRoLCBvciB0aGUgcGF0aCBwb3J0aW9uIG9mIGEgVVJMOlxyXG4gKlxyXG4gKiAtIFJlcGxhY2VzIGNvbnNlY3V0aXZlIHNsYXNoZXMgd2l0aCBvbmUgc2xhc2guXHJcbiAqIC0gUmVtb3ZlcyB1bm5lY2Vzc2FyeSAnLicgcGFydHMuXHJcbiAqIC0gUmVtb3ZlcyB1bm5lY2Vzc2FyeSAnPGRpcj4vLi4nIHBhcnRzLlxyXG4gKlxyXG4gKiBCYXNlZCBvbiBjb2RlIGluIHRoZSBOb2RlLmpzICdwYXRoJyBjb3JlIG1vZHVsZS5cclxuICpcclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIHVybCB0byBub3JtYWxpemUuXHJcbiAqL1xyXG52YXIgbm9ybWFsaXplID0gbHJ1TWVtb2l6ZShmdW5jdGlvbiBub3JtYWxpemUoYVBhdGgpIHtcclxuICB2YXIgcGF0aCA9IGFQYXRoO1xyXG4gIHZhciB1cmwgPSB1cmxQYXJzZShhUGF0aCk7XHJcbiAgaWYgKHVybCkge1xyXG4gICAgaWYgKCF1cmwucGF0aCkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcbiAgICBwYXRoID0gdXJsLnBhdGg7XHJcbiAgfVxyXG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpO1xyXG5cclxuICAvLyBTcGxpdCB0aGUgcGF0aCBpbnRvIHBhcnRzIGJldHdlZW4gYC9gIGNoYXJhY3RlcnMuIFRoaXMgaXMgbXVjaCBmYXN0ZXIgdGhhblxyXG4gIC8vIHVzaW5nIGAuc3BsaXQoL1xcLysvZylgLlxyXG4gIHZhciBwYXJ0cyA9IFtdO1xyXG4gIHZhciBzdGFydCA9IDA7XHJcbiAgdmFyIGkgPSAwO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBzdGFydCA9IGk7XHJcbiAgICBpID0gcGF0aC5pbmRleE9mKFwiL1wiLCBzdGFydCk7XHJcbiAgICBpZiAoaSA9PT0gLTEpIHtcclxuICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKHN0YXJ0KSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKHN0YXJ0LCBpKSk7XHJcbiAgICAgIHdoaWxlIChpIDwgcGF0aC5sZW5ndGggJiYgcGF0aFtpXSA9PT0gXCIvXCIpIHtcclxuICAgICAgICBpKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAodmFyIHBhcnQsIHVwID0gMCwgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBwYXJ0ID0gcGFydHNbaV07XHJcbiAgICBpZiAocGFydCA9PT0gXCIuXCIpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSBcIi4uXCIpIHtcclxuICAgICAgdXArKztcclxuICAgIH0gZWxzZSBpZiAodXAgPiAwKSB7XHJcbiAgICAgIGlmIChwYXJ0ID09PSBcIlwiKSB7XHJcbiAgICAgICAgLy8gVGhlIGZpcnN0IHBhcnQgaXMgYmxhbmsgaWYgdGhlIHBhdGggaXMgYWJzb2x1dGUuIFRyeWluZyB0byBnb1xyXG4gICAgICAgIC8vIGFib3ZlIHRoZSByb290IGlzIGEgbm8tb3AuIFRoZXJlZm9yZSB3ZSBjYW4gcmVtb3ZlIGFsbCAnLi4nIHBhcnRzXHJcbiAgICAgICAgLy8gZGlyZWN0bHkgYWZ0ZXIgdGhlIHJvb3QuXHJcbiAgICAgICAgcGFydHMuc3BsaWNlKGkgKyAxLCB1cCk7XHJcbiAgICAgICAgdXAgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcnRzLnNwbGljZShpLCAyKTtcclxuICAgICAgICB1cC0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHBhdGggPSBwYXJ0cy5qb2luKFwiL1wiKTtcclxuXHJcbiAgaWYgKHBhdGggPT09IFwiXCIpIHtcclxuICAgIHBhdGggPSBpc0Fic29sdXRlID8gXCIvXCIgOiBcIi5cIjtcclxuICB9XHJcblxyXG4gIGlmICh1cmwpIHtcclxuICAgIHVybC5wYXRoID0gcGF0aDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZSh1cmwpO1xyXG4gIH1cclxuICByZXR1cm4gcGF0aDtcclxufSk7XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG5cclxuLyoqXHJcbiAqIEpvaW5zIHR3byBwYXRocy9VUkxzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgam9pbmVkIHdpdGggdGhlIHJvb3QuXHJcbiAqXHJcbiAqIC0gSWYgYVBhdGggaXMgYSBVUkwgb3IgYSBkYXRhIFVSSSwgYVBhdGggaXMgcmV0dXJuZWQsIHVubGVzcyBhUGF0aCBpcyBhXHJcbiAqICAgc2NoZW1lLXJlbGF0aXZlIFVSTDogVGhlbiB0aGUgc2NoZW1lIG9mIGFSb290LCBpZiBhbnksIGlzIHByZXBlbmRlZFxyXG4gKiAgIGZpcnN0LlxyXG4gKiAtIE90aGVyd2lzZSBhUGF0aCBpcyBhIHBhdGguIElmIGFSb290IGlzIGEgVVJMLCB0aGVuIGl0cyBwYXRoIHBvcnRpb25cclxuICogICBpcyB1cGRhdGVkIHdpdGggdGhlIHJlc3VsdCBhbmQgYVJvb3QgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSB0aGUgcmVzdWx0XHJcbiAqICAgaXMgcmV0dXJuZWQuXHJcbiAqICAgLSBJZiBhUGF0aCBpcyBhYnNvbHV0ZSwgdGhlIHJlc3VsdCBpcyBhUGF0aC5cclxuICogICAtIE90aGVyd2lzZSB0aGUgdHdvIHBhdGhzIGFyZSBqb2luZWQgd2l0aCBhIHNsYXNoLlxyXG4gKiAtIEpvaW5pbmcgZm9yIGV4YW1wbGUgJ2h0dHA6Ly8nIGFuZCAnd3d3LmV4YW1wbGUuY29tJyBpcyBhbHNvIHN1cHBvcnRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGpvaW4oYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuICBpZiAoYVBhdGggPT09IFwiXCIpIHtcclxuICAgIGFQYXRoID0gXCIuXCI7XHJcbiAgfVxyXG4gIHZhciBhUGF0aFVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICB2YXIgYVJvb3RVcmwgPSB1cmxQYXJzZShhUm9vdCk7XHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdCA9IGFSb290VXJsLnBhdGggfHwgXCIvXCI7XHJcbiAgfVxyXG5cclxuICAvLyBgam9pbihmb28sICcvL3d3dy5leGFtcGxlLm9yZycpYFxyXG4gIGlmIChhUGF0aFVybCAmJiAhYVBhdGhVcmwuc2NoZW1lKSB7XHJcbiAgICBpZiAoYVJvb3RVcmwpIHtcclxuICAgICAgYVBhdGhVcmwuc2NoZW1lID0gYVJvb3RVcmwuc2NoZW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFQYXRoVXJsKTtcclxuICB9XHJcblxyXG4gIGlmIChhUGF0aFVybCB8fCBhUGF0aC5tYXRjaChkYXRhVXJsUmVnZXhwKSkge1xyXG4gICAgcmV0dXJuIGFQYXRoO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oJ2h0dHA6Ly8nLCAnd3d3LmV4YW1wbGUuY29tJylgXHJcbiAgaWYgKGFSb290VXJsICYmICFhUm9vdFVybC5ob3N0ICYmICFhUm9vdFVybC5wYXRoKSB7XHJcbiAgICBhUm9vdFVybC5ob3N0ID0gYVBhdGg7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVJvb3RVcmwpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGpvaW5lZCA9XHJcbiAgICBhUGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiXHJcbiAgICAgID8gYVBhdGhcclxuICAgICAgOiBub3JtYWxpemUoYVJvb3QucmVwbGFjZSgvXFwvKyQvLCBcIlwiKSArIFwiL1wiICsgYVBhdGgpO1xyXG5cclxuICBpZiAoYVJvb3RVcmwpIHtcclxuICAgIGFSb290VXJsLnBhdGggPSBqb2luZWQ7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVJvb3RVcmwpO1xyXG4gIH1cclxuICByZXR1cm4gam9pbmVkO1xyXG59XHJcbmV4cG9ydHMuam9pbiA9IGpvaW47XHJcblxyXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihhUGF0aCkge1xyXG4gIHJldHVybiBhUGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiIHx8IHVybFJlZ2V4cC50ZXN0KGFQYXRoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWtlIGEgcGF0aCByZWxhdGl2ZSB0byBhIFVSTCBvciBhbm90aGVyIHBhdGguXHJcbiAqXHJcbiAqIEBwYXJhbSBhUm9vdCBUaGUgcm9vdCBwYXRoIG9yIFVSTC5cclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBtYWRlIHJlbGF0aXZlIHRvIGFSb290LlxyXG4gKi9cclxuZnVuY3Rpb24gcmVsYXRpdmUoYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuXHJcbiAgYVJvb3QgPSBhUm9vdC5yZXBsYWNlKC9cXC8kLywgXCJcIik7XHJcblxyXG4gIC8vIEl0IGlzIHBvc3NpYmxlIGZvciB0aGUgcGF0aCB0byBiZSBhYm92ZSB0aGUgcm9vdC4gSW4gdGhpcyBjYXNlLCBzaW1wbHlcclxuICAvLyBjaGVja2luZyB3aGV0aGVyIHRoZSByb290IGlzIGEgcHJlZml4IG9mIHRoZSBwYXRoIHdvbid0IHdvcmsuIEluc3RlYWQsIHdlXHJcbiAgLy8gbmVlZCB0byByZW1vdmUgY29tcG9uZW50cyBmcm9tIHRoZSByb290IG9uZSBieSBvbmUsIHVudGlsIGVpdGhlciB3ZSBmaW5kXHJcbiAgLy8gYSBwcmVmaXggdGhhdCBmaXRzLCBvciB3ZSBydW4gb3V0IG9mIGNvbXBvbmVudHMgdG8gcmVtb3ZlLlxyXG4gIHZhciBsZXZlbCA9IDA7XHJcbiAgd2hpbGUgKGFQYXRoLmluZGV4T2YoYVJvb3QgKyBcIi9cIikgIT09IDApIHtcclxuICAgIHZhciBpbmRleCA9IGFSb290Lmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHRoZSBvbmx5IHBhcnQgb2YgdGhlIHJvb3QgdGhhdCBpcyBsZWZ0IGlzIHRoZSBzY2hlbWUgKGkuZS4gaHR0cDovLyxcclxuICAgIC8vIGZpbGU6Ly8vLCBldGMuKSwgb25lIG9yIG1vcmUgc2xhc2hlcyAoLyksIG9yIHNpbXBseSBub3RoaW5nIGF0IGFsbCwgd2VcclxuICAgIC8vIGhhdmUgZXhoYXVzdGVkIGFsbCBjb21wb25lbnRzLCBzbyB0aGUgcGF0aCBpcyBub3QgcmVsYXRpdmUgdG8gdGhlIHJvb3QuXHJcbiAgICBhUm9vdCA9IGFSb290LnNsaWNlKDAsIGluZGV4KTtcclxuICAgIGlmIChhUm9vdC5tYXRjaCgvXihbXlxcL10rOlxcLyk/XFwvKiQvKSkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgKytsZXZlbDtcclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB3ZSBhZGQgYSBcIi4uL1wiIGZvciBlYWNoIGNvbXBvbmVudCB3ZSByZW1vdmVkIGZyb20gdGhlIHJvb3QuXHJcbiAgcmV0dXJuIEFycmF5KGxldmVsICsgMSkuam9pbihcIi4uL1wiKSArIGFQYXRoLnN1YnN0cihhUm9vdC5sZW5ndGggKyAxKTtcclxufVxyXG5leHBvcnRzLnJlbGF0aXZlID0gcmVsYXRpdmU7XHJcblxyXG52YXIgc3VwcG9ydHNOdWxsUHJvdG8gPSAoZnVuY3Rpb24oKSB7XHJcbiAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgcmV0dXJuICEoXCJfX3Byb3RvX19cIiBpbiBvYmopO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gaWRlbnRpdHkocykge1xyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG4vKipcclxuICogQmVjYXVzZSBiZWhhdmlvciBnb2VzIHdhY2t5IHdoZW4geW91IHNldCBgX19wcm90b19fYCBvbiBvYmplY3RzLCB3ZVxyXG4gKiBoYXZlIHRvIHByZWZpeCBhbGwgdGhlIHN0cmluZ3MgaW4gb3VyIHNldCB3aXRoIGFuIGFyYml0cmFyeSBjaGFyYWN0ZXIuXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL3B1bGwvMzEgYW5kXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvaXNzdWVzLzMwXHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuZnVuY3Rpb24gdG9TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gXCIkXCIgKyBhU3RyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFTdHI7XHJcbn1cclxuZXhwb3J0cy50b1NldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiB0b1NldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGZyb21TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gYVN0ci5zbGljZSgxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMuZnJvbVNldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiBmcm9tU2V0U3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gaXNQcm90b1N0cmluZyhzKSB7XHJcbiAgaWYgKCFzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB2YXIgbGVuZ3RoID0gcy5sZW5ndGg7XHJcblxyXG4gIGlmIChsZW5ndGggPCA5IC8qIFwiX19wcm90b19fXCIubGVuZ3RoICovKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoXHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSkgIT09IDk1IC8qICdfJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDIpICE9PSA5NSAvKiAnXycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAzKSAhPT0gMTExIC8qICdvJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDQpICE9PSAxMTYgLyogJ3QnICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNSkgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA2KSAhPT0gMTE0IC8qICdyJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDcpICE9PSAxMTIgLyogJ3AnICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOCkgIT09IDk1IC8qICdfJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDkpICE9PSA5NSAvKiAnXycgKi9cclxuICApIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZvciAodmFyIGkgPSBsZW5ndGggLSAxMDsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGlmIChzLmNoYXJDb2RlQXQoaSkgIT09IDM2IC8qICckJyAqLykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2hlcmUgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqXHJcbiAqIE9wdGlvbmFsbHkgcGFzcyBpbiBgdHJ1ZWAgYXMgYG9ubHlDb21wYXJlR2VuZXJhdGVkYCB0byBjb25zaWRlciB0d29cclxuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4sIGJ1dCBkaWZmZXJlbnQgZ2VuZXJhdGVkXHJcbiAqIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhIG1hcHBpbmcgd2l0aCBhXHJcbiAqIHN0dWJiZWQgb3V0IG1hcHBpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyhtYXBwaW5nQSwgbWFwcGluZ0IsIG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICB2YXIgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVPcmlnaW5hbCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyA9IGNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zO1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2l0aCBkZWZsYXRlZCBzb3VyY2UgYW5kIG5hbWUgaW5kaWNlcyB3aGVyZVxyXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqXHJcbiAqIE9wdGlvbmFsbHkgcGFzcyBpbiBgdHJ1ZWAgYXMgYG9ubHlDb21wYXJlR2VuZXJhdGVkYCB0byBjb25zaWRlciB0d29cclxuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uLCBidXQgZGlmZmVyZW50XHJcbiAqIHNvdXJjZS9uYW1lL29yaWdpbmFsIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhXHJcbiAqIG1hcHBpbmcgd2l0aCBhIHN0dWJiZWQgb3V0IG1hcHBpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZChcclxuICBtYXBwaW5nQSxcclxuICBtYXBwaW5nQixcclxuICBvbmx5Q29tcGFyZUdlbmVyYXRlZFxyXG4pIHtcclxuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlR2VuZXJhdGVkKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZDtcclxuXHJcbmZ1bmN0aW9uIHN0cmNtcChhU3RyMSwgYVN0cjIpIHtcclxuICBpZiAoYVN0cjEgPT09IGFTdHIyKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMSA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIDE7IC8vIGFTdHIyICE9PSBudWxsXHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjIgPT09IG51bGwpIHtcclxuICAgIHJldHVybiAtMTsgLy8gYVN0cjEgIT09IG51bGxcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMSA+IGFTdHIyKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9XHJcblxyXG4gIHJldHVybiAtMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2l0aCBpbmZsYXRlZCBzb3VyY2UgYW5kIG5hbWUgc3RyaW5ncyB3aGVyZVxyXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZChtYXBwaW5nQSwgbWFwcGluZ0IpIHtcclxuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZDtcclxuXHJcbi8qKlxyXG4gKiBTdHJpcCBhbnkgSlNPTiBYU1NJIGF2b2lkYW5jZSBwcmVmaXggZnJvbSB0aGUgc3RyaW5nIChhcyBkb2N1bWVudGVkXHJcbiAqIGluIHRoZSBzb3VyY2UgbWFwcyBzcGVjaWZpY2F0aW9uKSwgYW5kIHRoZW4gcGFyc2UgdGhlIHN0cmluZyBhc1xyXG4gKiBKU09OLlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VTb3VyY2VNYXBJbnB1dChzdHIpIHtcclxuICByZXR1cm4gSlNPTi5wYXJzZShzdHIucmVwbGFjZSgvXlxcKV19J1teXFxuXSpcXG4vLCBcIlwiKSk7XHJcbn1cclxuZXhwb3J0cy5wYXJzZVNvdXJjZU1hcElucHV0ID0gcGFyc2VTb3VyY2VNYXBJbnB1dDtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHRoZSBVUkwgb2YgYSBzb3VyY2UgZ2l2ZW4gdGhlIHRoZSBzb3VyY2Ugcm9vdCwgdGhlIHNvdXJjZSdzXHJcbiAqIFVSTCwgYW5kIHRoZSBzb3VyY2UgbWFwJ3MgVVJMLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkge1xyXG4gIHNvdXJjZVVSTCA9IHNvdXJjZVVSTCB8fCBcIlwiO1xyXG5cclxuICBpZiAoc291cmNlUm9vdCkge1xyXG4gICAgLy8gVGhpcyBmb2xsb3dzIHdoYXQgQ2hyb21lIGRvZXMuXHJcbiAgICBpZiAoc291cmNlUm9vdFtzb3VyY2VSb290Lmxlbmd0aCAtIDFdICE9PSBcIi9cIiAmJiBzb3VyY2VVUkxbMF0gIT09IFwiL1wiKSB7XHJcbiAgICAgIHNvdXJjZVJvb3QgKz0gXCIvXCI7XHJcbiAgICB9XHJcbiAgICAvLyBUaGUgc3BlYyBzYXlzOlxyXG4gICAgLy8gICBMaW5lIDQ6IEFuIG9wdGlvbmFsIHNvdXJjZSByb290LCB1c2VmdWwgZm9yIHJlbG9jYXRpbmcgc291cmNlXHJcbiAgICAvLyAgIGZpbGVzIG9uIGEgc2VydmVyIG9yIHJlbW92aW5nIHJlcGVhdGVkIHZhbHVlcyBpbiB0aGVcclxuICAgIC8vICAg4oCcc291cmNlc+KAnSBlbnRyeS4gIFRoaXMgdmFsdWUgaXMgcHJlcGVuZGVkIHRvIHRoZSBpbmRpdmlkdWFsXHJcbiAgICAvLyAgIGVudHJpZXMgaW4gdGhlIOKAnHNvdXJjZeKAnSBmaWVsZC5cclxuICAgIHNvdXJjZVVSTCA9IHNvdXJjZVJvb3QgKyBzb3VyY2VVUkw7XHJcbiAgfVxyXG5cclxuICAvLyBIaXN0b3JpY2FsbHksIFNvdXJjZU1hcENvbnN1bWVyIGRpZCBub3QgdGFrZSB0aGUgc291cmNlTWFwVVJMIGFzXHJcbiAgLy8gYSBwYXJhbWV0ZXIuICBUaGlzIG1vZGUgaXMgc3RpbGwgc29tZXdoYXQgc3VwcG9ydGVkLCB3aGljaCBpcyB3aHlcclxuICAvLyB0aGlzIGNvZGUgYmxvY2sgaXMgY29uZGl0aW9uYWwuICBIb3dldmVyLCBpdCdzIHByZWZlcmFibGUgdG8gcGFzc1xyXG4gIC8vIHRoZSBzb3VyY2UgbWFwIFVSTCB0byBTb3VyY2VNYXBDb25zdW1lciwgc28gdGhhdCB0aGlzIGZ1bmN0aW9uXHJcbiAgLy8gY2FuIGltcGxlbWVudCB0aGUgc291cmNlIFVSTCByZXNvbHV0aW9uIGFsZ29yaXRobSBhcyBvdXRsaW5lZCBpblxyXG4gIC8vIHRoZSBzcGVjLiAgVGhpcyBibG9jayBpcyBiYXNpY2FsbHkgdGhlIGVxdWl2YWxlbnQgb2Y6XHJcbiAgLy8gICAgbmV3IFVSTChzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkudG9TdHJpbmcoKVxyXG4gIC8vIC4uLiBleGNlcHQgaXQgYXZvaWRzIHVzaW5nIFVSTCwgd2hpY2ggd2Fzbid0IGF2YWlsYWJsZSBpbiB0aGVcclxuICAvLyBvbGRlciByZWxlYXNlcyBvZiBub2RlIHN0aWxsIHN1cHBvcnRlZCBieSB0aGlzIGxpYnJhcnkuXHJcbiAgLy9cclxuICAvLyBUaGUgc3BlYyBzYXlzOlxyXG4gIC8vICAgSWYgdGhlIHNvdXJjZXMgYXJlIG5vdCBhYnNvbHV0ZSBVUkxzIGFmdGVyIHByZXBlbmRpbmcgb2YgdGhlXHJcbiAgLy8gICDigJxzb3VyY2VSb2904oCdLCB0aGUgc291cmNlcyBhcmUgcmVzb2x2ZWQgcmVsYXRpdmUgdG8gdGhlXHJcbiAgLy8gICBTb3VyY2VNYXAgKGxpa2UgcmVzb2x2aW5nIHNjcmlwdCBzcmMgaW4gYSBodG1sIGRvY3VtZW50KS5cclxuICBpZiAoc291cmNlTWFwVVJMKSB7XHJcbiAgICB2YXIgcGFyc2VkID0gdXJsUGFyc2Uoc291cmNlTWFwVVJMKTtcclxuICAgIGlmICghcGFyc2VkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNvdXJjZU1hcFVSTCBjb3VsZCBub3QgYmUgcGFyc2VkXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnNlZC5wYXRoKSB7XHJcbiAgICAgIC8vIFN0cmlwIHRoZSBsYXN0IHBhdGggY29tcG9uZW50LCBidXQga2VlcCB0aGUgXCIvXCIuXHJcbiAgICAgIHZhciBpbmRleCA9IHBhcnNlZC5wYXRoLmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICBwYXJzZWQucGF0aCA9IHBhcnNlZC5wYXRoLnN1YnN0cmluZygwLCBpbmRleCArIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzb3VyY2VVUkwgPSBqb2luKHVybEdlbmVyYXRlKHBhcnNlZCksIHNvdXJjZVVSTCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplKHNvdXJjZVVSTCk7XHJcbn1cclxuZXhwb3J0cy5jb21wdXRlU291cmNlVVJMID0gY29tcHV0ZVNvdXJjZVVSTDtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxudmFyIFNvdXJjZU1hcENvbnN1bWVyID0gcmVxdWlyZShcIi4uL2xpYi9zb3VyY2UtbWFwLWNvbnN1bWVyXCIpLlNvdXJjZU1hcENvbnN1bWVyO1xyXG52YXIgSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyID0gcmVxdWlyZShcIi4uL2xpYi9zb3VyY2UtbWFwLWNvbnN1bWVyXCIpXHJcbiAgLkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcjtcclxudmFyIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgPSByZXF1aXJlKFwiLi4vbGliL3NvdXJjZS1tYXAtY29uc3VtZXJcIilcclxuICAuQmFzaWNTb3VyY2VNYXBDb25zdW1lcjtcclxudmFyIFNvdXJjZU1hcEdlbmVyYXRvciA9IHJlcXVpcmUoXCIuLi9saWIvc291cmNlLW1hcC1nZW5lcmF0b3JcIilcclxuICAuU291cmNlTWFwR2VuZXJhdG9yO1xyXG5cclxuZXhwb3J0c1tcInRlc3QgdGhhdCB3ZSBjYW4gaW5zdGFudGlhdGUgd2l0aCBhIHN0cmluZyBvciBhbiBvYmplY3RcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgYXNzZXJ0LmRvZXNOb3RUaHJvdyhmdW5jdGlvbigpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwKTtcclxuICB9KTtcclxuICBhc3NlcnQuZG9lc05vdFRocm93KGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihKU09OLnN0cmluZ2lmeSh1dGlsLnRlc3RNYXApKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IHRoYXQgdGhlIG9iamVjdCByZXR1cm5lZCBmcm9tIG5ldyBTb3VyY2VNYXBDb25zdW1lciBpbmhlcml0cyBmcm9tIFNvdXJjZU1hcENvbnN1bWVyXCJcclxuXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIGFzc2VydC5vayhuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwKSBpbnN0YW5jZW9mIFNvdXJjZU1hcENvbnN1bWVyKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IHRoYXQgYSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyIGlzIHJldHVybmVkIGZvciBzb3VyY2VtYXBzIHdpdGhvdXQgc2VjdGlvbnNcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgYXNzZXJ0Lm9rKFxyXG4gICAgbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcCkgaW5zdGFuY2VvZiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IHRoYXQgYW4gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyIGlzIHJldHVybmVkIGZvciBzb3VyY2VtYXBzIHdpdGggc2VjdGlvbnNcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgYXNzZXJ0Lm9rKFxyXG4gICAgbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuaW5kZXhlZFRlc3RNYXApIGluc3RhbmNlb2ZcclxuICAgICAgSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IHRoYXQgdGhlIGBzb3VyY2VzYCBmaWVsZCBoYXMgdGhlIG9yaWdpbmFsIHNvdXJjZXNcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgdmFyIG1hcDtcclxuICB2YXIgc291cmNlcztcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcCk7XHJcbiAgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzBdLCBcIi90aGUvcm9vdC9vbmUuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMV0sIFwiL3RoZS9yb290L3R3by5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwoc291cmNlcy5sZW5ndGgsIDIpO1xyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCk7XHJcbiAgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzBdLCBcIi90aGUvcm9vdC9vbmUuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMV0sIFwiL3RoZS9yb290L3R3by5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwoc291cmNlcy5sZW5ndGgsIDIpO1xyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcERpZmZlcmVudFNvdXJjZVJvb3RzKTtcclxuICBzb3VyY2VzID0gbWFwLnNvdXJjZXM7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMF0sIFwiL3RoZS9yb290L29uZS5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwoc291cmNlc1sxXSwgXCIvZGlmZmVyZW50L3Jvb3QvdHdvLmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMik7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBOb1NvdXJjZVJvb3QpO1xyXG4gIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuICBhc3NlcnQuZXF1YWwoc291cmNlc1swXSwgXCJvbmUuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMV0sIFwidHdvLmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMik7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBFbXB0eVNvdXJjZVJvb3QpO1xyXG4gIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuICBhc3NlcnQuZXF1YWwoc291cmNlc1swXSwgXCJvbmUuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMV0sIFwidHdvLmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMik7XHJcbn07XHJcblxyXG5leHBvcnRzW1xyXG4gIFwidGVzdCB0aGF0IHRoZSBzb3VyY2Ugcm9vdCBpcyByZWZsZWN0ZWQgaW4gYSBtYXBwaW5nJ3Mgc291cmNlIGZpZWxkXCJcclxuXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXA7XHJcbiAgdmFyIG1hcHBpbmc7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG5cclxuICBtYXBwaW5nID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMVxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nLnNvdXJjZSwgXCIvdGhlL3Jvb3QvdHdvLmpzXCIpO1xyXG5cclxuICBtYXBwaW5nID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMVxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nLnNvdXJjZSwgXCIvdGhlL3Jvb3Qvb25lLmpzXCIpO1xyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwTm9Tb3VyY2VSb290KTtcclxuXHJcbiAgbWFwcGluZyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDFcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZy5zb3VyY2UsIFwidHdvLmpzXCIpO1xyXG5cclxuICBtYXBwaW5nID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMVxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nLnNvdXJjZSwgXCJvbmUuanNcIik7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBFbXB0eVNvdXJjZVJvb3QpO1xyXG5cclxuICBtYXBwaW5nID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMVxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nLnNvdXJjZSwgXCJ0d28uanNcIik7XHJcblxyXG4gIG1hcHBpbmcgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAxXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmcuc291cmNlLCBcIm9uZS5qc1wiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IG1hcHBpbmcgdG9rZW5zIGJhY2sgZXhhY3RseVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwKTtcclxuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDEsIFwiL3RoZS9yb290L29uZS5qc1wiLCAxLCAxLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDUsIFwiL3RoZS9yb290L29uZS5qc1wiLCAxLCA1LCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDksIFwiL3RoZS9yb290L29uZS5qc1wiLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDEsXHJcbiAgICAxOCxcclxuICAgIFwiL3RoZS9yb290L29uZS5qc1wiLFxyXG4gICAgMSxcclxuICAgIDIxLFxyXG4gICAgXCJiYXJcIixcclxuICAgIG51bGwsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnRcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyMSwgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsIDIsIDMsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMjgsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDIsXHJcbiAgICAxMCxcclxuICAgIFwiYmF6XCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0XHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMzIsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDIsXHJcbiAgICAxNCxcclxuICAgIFwiYmFyXCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0XHJcbiAgKTtcclxuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDEsIFwiL3RoZS9yb290L3R3by5qc1wiLCAxLCAxLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDUsIFwiL3RoZS9yb290L3R3by5qc1wiLCAxLCA1LCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDksIFwiL3RoZS9yb290L3R3by5qc1wiLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAxOCwgXCIvdGhlL3Jvb3QvdHdvLmpzXCIsIDEsIDIxLCBcIm5cIiwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAyMSwgXCIvdGhlL3Jvb3QvdHdvLmpzXCIsIDIsIDMsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgMjgsIFwiL3RoZS9yb290L3R3by5qc1wiLCAyLCAxMCwgXCJuXCIsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IG1hcHBpbmcgdG9rZW5zIGJhY2sgZXhhY3RseSBpbiBpbmRleGVkIHNvdXJjZSBtYXBcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmluZGV4ZWRUZXN0TWFwKTtcclxuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDEsIFwiL3RoZS9yb290L29uZS5qc1wiLCAxLCAxLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDUsIFwiL3RoZS9yb290L29uZS5qc1wiLCAxLCA1LCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDksIFwiL3RoZS9yb290L29uZS5qc1wiLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDEsXHJcbiAgICAxOCxcclxuICAgIFwiL3RoZS9yb290L29uZS5qc1wiLFxyXG4gICAgMSxcclxuICAgIDIxLFxyXG4gICAgXCJiYXJcIixcclxuICAgIG51bGwsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnRcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyMSwgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsIDIsIDMsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMjgsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDIsXHJcbiAgICAxMCxcclxuICAgIFwiYmF6XCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0XHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMzIsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDIsXHJcbiAgICAxNCxcclxuICAgIFwiYmFyXCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0XHJcbiAgKTtcclxuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDEsIFwiL3RoZS9yb290L3R3by5qc1wiLCAxLCAxLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDUsIFwiL3RoZS9yb290L3R3by5qc1wiLCAxLCA1LCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDksIFwiL3RoZS9yb290L3R3by5qc1wiLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAxOCwgXCIvdGhlL3Jvb3QvdHdvLmpzXCIsIDEsIDIxLCBcIm5cIiwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAyMSwgXCIvdGhlL3Jvb3QvdHdvLmpzXCIsIDIsIDMsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgMjgsIFwiL3RoZS9yb290L3R3by5qc1wiLCAyLCAxMCwgXCJuXCIsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IG1hcHBpbmcgdG9rZW5zIGZ1enp5XCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG5cclxuICAvLyBGaW5kaW5nIG9yaWdpbmFsIHBvc2l0aW9ucyB3aXRoIGRlZmF1bHQgKGdsYikgYmlhcy5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMjAsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDEsXHJcbiAgICAyMSxcclxuICAgIFwiYmFyXCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDMwLFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAyLFxyXG4gICAgMTAsXHJcbiAgICBcImJhelwiLFxyXG4gICAgbnVsbCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDIsXHJcbiAgICAxMixcclxuICAgIFwiL3RoZS9yb290L3R3by5qc1wiLFxyXG4gICAgMSxcclxuICAgIDExLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuXHJcbiAgLy8gRmluZGluZyBvcmlnaW5hbCBwb3NpdGlvbnMgd2l0aCBsdWIgYmlhcy5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMTYsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDEsXHJcbiAgICAyMSxcclxuICAgIFwiYmFyXCIsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDEsXHJcbiAgICAyNixcclxuICAgIFwiL3RoZS9yb290L29uZS5qc1wiLFxyXG4gICAgMixcclxuICAgIDEwLFxyXG4gICAgXCJiYXpcIixcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMixcclxuICAgIDYsXHJcbiAgICBcIi90aGUvcm9vdC90d28uanNcIixcclxuICAgIDEsXHJcbiAgICAxMSxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG5cclxuICAvLyBGaW5kaW5nIGdlbmVyYXRlZCBwb3NpdGlvbnMgd2l0aCBkZWZhdWx0IChnbGIpIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDE4LFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAxLFxyXG4gICAgMjIsXHJcbiAgICBcImJhclwiLFxyXG4gICAgbnVsbCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMjgsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDIsXHJcbiAgICAxMyxcclxuICAgIFwiYmF6XCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgbnVsbCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDIsXHJcbiAgICA5LFxyXG4gICAgXCIvdGhlL3Jvb3QvdHdvLmpzXCIsXHJcbiAgICAxLFxyXG4gICAgMTYsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuXHJcbiAgLy8gRmluZGluZyBnZW5lcmF0ZWQgcG9zaXRpb25zIHdpdGggbHViIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDE4LFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAxLFxyXG4gICAgMjAsXHJcbiAgICBcImJhclwiLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDI4LFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAyLFxyXG4gICAgNyxcclxuICAgIFwiYmF6XCIsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAyLFxyXG4gICAgOSxcclxuICAgIFwiL3RoZS9yb290L3R3by5qc1wiLFxyXG4gICAgMSxcclxuICAgIDYsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBtYXBwaW5nIHRva2VucyBmdXp6eSBpbiBpbmRleGVkIHNvdXJjZSBtYXBcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuaW5kZXhlZFRlc3RNYXApO1xyXG5cclxuICAvLyBGaW5kaW5nIG9yaWdpbmFsIHBvc2l0aW9ucyB3aXRoIGRlZmF1bHQgKGdsYikgYmlhcy5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMjAsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDEsXHJcbiAgICAyMSxcclxuICAgIFwiYmFyXCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDMwLFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAyLFxyXG4gICAgMTAsXHJcbiAgICBcImJhelwiLFxyXG4gICAgbnVsbCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDIsXHJcbiAgICAxMixcclxuICAgIFwiL3RoZS9yb290L3R3by5qc1wiLFxyXG4gICAgMSxcclxuICAgIDExLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuXHJcbiAgLy8gRmluZGluZyBvcmlnaW5hbCBwb3NpdGlvbnMgd2l0aCBsdWIgYmlhcy5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMTYsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDEsXHJcbiAgICAyMSxcclxuICAgIFwiYmFyXCIsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDEsXHJcbiAgICAyNixcclxuICAgIFwiL3RoZS9yb290L29uZS5qc1wiLFxyXG4gICAgMixcclxuICAgIDEwLFxyXG4gICAgXCJiYXpcIixcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMixcclxuICAgIDYsXHJcbiAgICBcIi90aGUvcm9vdC90d28uanNcIixcclxuICAgIDEsXHJcbiAgICAxMSxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG5cclxuICAvLyBGaW5kaW5nIGdlbmVyYXRlZCBwb3NpdGlvbnMgd2l0aCBkZWZhdWx0IChnbGIpIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDE4LFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAxLFxyXG4gICAgMjIsXHJcbiAgICBcImJhclwiLFxyXG4gICAgbnVsbCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAxLFxyXG4gICAgMjgsXHJcbiAgICBcIi90aGUvcm9vdC9vbmUuanNcIixcclxuICAgIDIsXHJcbiAgICAxMyxcclxuICAgIFwiYmF6XCIsXHJcbiAgICBudWxsLFxyXG4gICAgbWFwLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgbnVsbCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDIsXHJcbiAgICA5LFxyXG4gICAgXCIvdGhlL3Jvb3QvdHdvLmpzXCIsXHJcbiAgICAxLFxyXG4gICAgMTYsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuXHJcbiAgLy8gRmluZGluZyBnZW5lcmF0ZWQgcG9zaXRpb25zIHdpdGggbHViIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDE4LFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAxLFxyXG4gICAgMjAsXHJcbiAgICBcImJhclwiLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMSxcclxuICAgIDI4LFxyXG4gICAgXCIvdGhlL3Jvb3Qvb25lLmpzXCIsXHJcbiAgICAyLFxyXG4gICAgNyxcclxuICAgIFwiYmF6XCIsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIG1hcCxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAyLFxyXG4gICAgOSxcclxuICAgIFwiL3RoZS9yb290L3R3by5qc1wiLFxyXG4gICAgMSxcclxuICAgIDYsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBtYXBwaW5ncyBhbmQgZW5kIG9mIGxpbmVzXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIHNtZyA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogXCJmb28uanNcIlxyXG4gIH0pO1xyXG4gIHNtZy5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgc291cmNlOiBcImJhci5qc1wiXHJcbiAgfSk7XHJcbiAgc21nLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiYmFyLmpzXCJcclxuICB9KTtcclxuICBzbWcuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIHNvdXJjZTogXCJiYXouanNcIlxyXG4gIH0pO1xyXG5cclxuICB2YXIgbWFwID0gU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcChzbWcpO1xyXG5cclxuICAvLyBXaGVuIGZpbmRpbmcgb3JpZ2luYWwgcG9zaXRpb25zLCBtYXBwaW5ncyBlbmQgYXQgdGhlIGVuZCBvZiB0aGUgbGluZS5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgMSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQsIHRydWUpO1xyXG5cclxuICAvLyBXaGVuIGZpbmRpbmcgZ2VuZXJhdGVkIHBvc2l0aW9ucywgbWFwcGluZ3MgZG8gbm90IGVuZCBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lLlxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAxLCBcImJhci5qc1wiLCAyLCAxLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCwgbnVsbCwgdHJ1ZSk7XHJcblxyXG4gIC8vIFdoZW4gZmluZGluZyBnZW5lcmF0ZWQgcG9zaXRpb25zIHdpdGgsIG1hcHBpbmdzIGVuZCBhdCB0aGUgZW5kIG9mIHRoZSBzb3VyY2UuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBcImJhci5qc1wiLFxyXG4gICAgMyxcclxuICAgIDEsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBtYXAsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBjcmVhdGluZyBzb3VyY2UgbWFwIGNvbnN1bWVycyB3aXRoICldfScgcHJlZml4XCJdID0gZnVuY3Rpb24oXHJcbiAgYXNzZXJ0XHJcbikge1xyXG4gIGFzc2VydC5kb2VzTm90VGhyb3coZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKFwiKV19J1xcblwiICsgSlNPTi5zdHJpbmdpZnkodXRpbC50ZXN0TWFwKSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBlYWNoTWFwcGluZ1wiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXA7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG4gIHZhciBwcmV2aW91c0xpbmUgPSAtSW5maW5pdHk7XHJcbiAgdmFyIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gIG1hcC5lYWNoTWFwcGluZyhmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICBhc3NlcnQub2sobWFwcGluZy5nZW5lcmF0ZWRMaW5lID49IHByZXZpb3VzTGluZSk7XHJcblxyXG4gICAgYXNzZXJ0Lm9rKFxyXG4gICAgICBtYXBwaW5nLnNvdXJjZSA9PT0gXCIvdGhlL3Jvb3Qvb25lLmpzXCIgfHxcclxuICAgICAgICBtYXBwaW5nLnNvdXJjZSA9PT0gXCIvdGhlL3Jvb3QvdHdvLmpzXCJcclxuICAgICk7XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9PT0gcHJldmlvdXNMaW5lKSB7XHJcbiAgICAgIGFzc2VydC5vayhtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA+PSBwcmV2aW91c0NvbHVtbik7XHJcbiAgICAgIHByZXZpb3VzQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmV2aW91c0xpbmUgPSBtYXBwaW5nLmdlbmVyYXRlZExpbmU7XHJcbiAgICAgIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwTm9Tb3VyY2VSb290KTtcclxuICBtYXAuZWFjaE1hcHBpbmcoZnVuY3Rpb24obWFwcGluZykge1xyXG4gICAgYXNzZXJ0Lm9rKG1hcHBpbmcuc291cmNlID09PSBcIm9uZS5qc1wiIHx8IG1hcHBpbmcuc291cmNlID09PSBcInR3by5qc1wiKTtcclxuICB9KTtcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcEVtcHR5U291cmNlUm9vdCk7XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIGFzc2VydC5vayhtYXBwaW5nLnNvdXJjZSA9PT0gXCJvbmUuanNcIiB8fCBtYXBwaW5nLnNvdXJjZSA9PT0gXCJ0d28uanNcIik7XHJcbiAgfSk7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLm1hcFdpdGhTb3VyY2VsZXNzTWFwcGluZyk7XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIGFzc2VydC5vayhcclxuICAgICAgbWFwcGluZy5zb3VyY2UgPT09IG51bGwgfHxcclxuICAgICAgICAodHlwZW9mIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPT09IFwibnVtYmVyXCIgJiZcclxuICAgICAgICAgIHR5cGVvZiBtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gXCJudW1iZXJcIilcclxuICAgICk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBlYWNoTWFwcGluZyBmb3IgaW5kZXhlZCBzb3VyY2UgbWFwc1wiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCk7XHJcbiAgdmFyIHByZXZpb3VzTGluZSA9IC1JbmZpbml0eTtcclxuICB2YXIgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIGFzc2VydC5vayhtYXBwaW5nLmdlbmVyYXRlZExpbmUgPj0gcHJldmlvdXNMaW5lKTtcclxuXHJcbiAgICBpZiAobWFwcGluZy5zb3VyY2UpIHtcclxuICAgICAgYXNzZXJ0LmVxdWFsKG1hcHBpbmcuc291cmNlLmluZGV4T2YodXRpbC50ZXN0TWFwLnNvdXJjZVJvb3QpLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lID09PSBwcmV2aW91c0xpbmUpIHtcclxuICAgICAgYXNzZXJ0Lm9rKG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uID49IHByZXZpb3VzQ29sdW1uKTtcclxuICAgICAgcHJldmlvdXNDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHByZXZpb3VzTGluZSA9IG1hcHBpbmcuZ2VuZXJhdGVkTGluZTtcclxuICAgICAgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1xyXG4gIFwidGVzdCBlYWNoTWFwcGluZyBmb3IgaW5kZXhlZCBzb3VyY2UgbWFwcyB3aXRoIGNvbHVtbiBvZmZzZXRzXCJcclxuXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcENvbHVtbk9mZnNldCk7XHJcbiAgbWFwLmNvbXB1dGVDb2x1bW5TcGFucygpO1xyXG4gIHZhciBwcmV2aW91c0xpbmUgPSAtSW5maW5pdHk7XHJcbiAgdmFyIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gIHZhciBwcmV2aW91c0xhc3RDb2x1bW4gPSAtSW5maW5pdHk7XHJcblxyXG4gIG1hcC5lYWNoTWFwcGluZyhmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICBhc3NlcnQub2sobWFwcGluZy5nZW5lcmF0ZWRMaW5lID49IHByZXZpb3VzTGluZSk7XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlKSB7XHJcbiAgICAgIGFzc2VydC5lcXVhbChtYXBwaW5nLnNvdXJjZS5pbmRleE9mKHV0aWwudGVzdE1hcC5zb3VyY2VSb290KSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9PT0gcHJldmlvdXNMaW5lKSB7XHJcbiAgICAgIGFzc2VydC5vayhtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA+PSBwcmV2aW91c0NvbHVtbik7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJldmlvdXNMYXN0Q29sdW1uID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgYXNzZXJ0Lm9rKG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uID4gcHJldmlvdXNMYXN0Q29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgICBwcmV2aW91c0NvbHVtbiA9IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gICAgICBwcmV2aW91c0xhc3RDb2x1bW4gPSBtYXBwaW5nLmxhc3RHZW5lcmF0ZWRDb2x1bW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmV2aW91c0xpbmUgPSBtYXBwaW5nLmdlbmVyYXRlZExpbmU7XHJcbiAgICAgIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gICAgICBwcmV2aW91c0xhc3RDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBpdGVyYXRpbmcgb3ZlciBtYXBwaW5ncyBpbiBhIGRpZmZlcmVudCBvcmRlclwiXSA9IGZ1bmN0aW9uKFxyXG4gIGFzc2VydFxyXG4pIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcCk7XHJcbiAgdmFyIHByZXZpb3VzTGluZSA9IC1JbmZpbml0eTtcclxuICB2YXIgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgdmFyIHByZXZpb3VzU291cmNlID0gXCJcIjtcclxuICBtYXAuZWFjaE1hcHBpbmcoXHJcbiAgICBmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICAgIGFzc2VydC5vayhtYXBwaW5nLnNvdXJjZSA+PSBwcmV2aW91c1NvdXJjZSk7XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IHByZXZpb3VzU291cmNlKSB7XHJcbiAgICAgICAgYXNzZXJ0Lm9rKG1hcHBpbmcub3JpZ2luYWxMaW5lID49IHByZXZpb3VzTGluZSk7XHJcblxyXG4gICAgICAgIGlmIChtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gcHJldmlvdXNMaW5lKSB7XHJcbiAgICAgICAgICBhc3NlcnQub2sobWFwcGluZy5vcmlnaW5hbENvbHVtbiA+PSBwcmV2aW91c0NvbHVtbik7XHJcbiAgICAgICAgICBwcmV2aW91c0NvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHByZXZpb3VzTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xyXG4gICAgICAgICAgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByZXZpb3VzU291cmNlID0gbWFwcGluZy5zb3VyY2U7XHJcbiAgICAgICAgcHJldmlvdXNMaW5lID0gLUluZmluaXR5O1xyXG4gICAgICAgIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbnVsbCxcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IGl0ZXJhdGluZyBvdmVyIG1hcHBpbmdzIGluIGEgZGlmZmVyZW50IG9yZGVyIGluIGluZGV4ZWQgc291cmNlIG1hcHNcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmluZGV4ZWRUZXN0TWFwKTtcclxuICB2YXIgcHJldmlvdXNMaW5lID0gLUluZmluaXR5O1xyXG4gIHZhciBwcmV2aW91c0NvbHVtbiA9IC1JbmZpbml0eTtcclxuICB2YXIgcHJldmlvdXNTb3VyY2UgPSBcIlwiO1xyXG4gIG1hcC5lYWNoTWFwcGluZyhcclxuICAgIGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgICAgYXNzZXJ0Lm9rKG1hcHBpbmcuc291cmNlID49IHByZXZpb3VzU291cmNlKTtcclxuXHJcbiAgICAgIGlmIChtYXBwaW5nLnNvdXJjZSA9PT0gcHJldmlvdXNTb3VyY2UpIHtcclxuICAgICAgICBhc3NlcnQub2sobWFwcGluZy5vcmlnaW5hbExpbmUgPj0gcHJldmlvdXNMaW5lKTtcclxuXHJcbiAgICAgICAgaWYgKG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBwcmV2aW91c0xpbmUpIHtcclxuICAgICAgICAgIGFzc2VydC5vayhtYXBwaW5nLm9yaWdpbmFsQ29sdW1uID49IHByZXZpb3VzQ29sdW1uKTtcclxuICAgICAgICAgIHByZXZpb3VzQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcHJldmlvdXNMaW5lID0gbWFwcGluZy5vcmlnaW5hbExpbmU7XHJcbiAgICAgICAgICBwcmV2aW91c0NvbHVtbiA9IC1JbmZpbml0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UgPSBtYXBwaW5nLnNvdXJjZTtcclxuICAgICAgICBwcmV2aW91c0xpbmUgPSAtSW5maW5pdHk7XHJcbiAgICAgICAgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVJcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgdGhhdCB3ZSBjYW4gc2V0IHRoZSBjb250ZXh0IGZvciBgdGhpc2AgaW4gZWFjaE1hcHBpbmdcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG4gIHZhciBjb250ZXh0ID0ge307XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgYXNzZXJ0LmVxdWFsKHRoaXMsIGNvbnRleHQpO1xyXG4gIH0sIGNvbnRleHQpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgdGhhdCB3ZSBjYW4gc2V0IHRoZSBjb250ZXh0IGZvciBgdGhpc2AgaW4gZWFjaE1hcHBpbmcgaW4gaW5kZXhlZCBzb3VyY2UgbWFwc1wiXHJcbl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuaW5kZXhlZFRlc3RNYXApO1xyXG4gIHZhciBjb250ZXh0ID0ge307XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgYXNzZXJ0LmVxdWFsKHRoaXMsIGNvbnRleHQpO1xyXG4gIH0sIGNvbnRleHQpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgdGhhdCB0aGUgYHNvdXJjZXNDb250ZW50YCBmaWVsZCBoYXMgdGhlIG9yaWdpbmFsIHNvdXJjZXNcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBXaXRoU291cmNlc0NvbnRlbnQpO1xyXG4gIHZhciBzb3VyY2VzQ29udGVudCA9IG1hcC5zb3VyY2VzQ29udGVudDtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgc291cmNlc0NvbnRlbnRbMF0sXHJcbiAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbiAgIHJldHVybiBiYXooYmFyKTtcXG4gfTtcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgc291cmNlc0NvbnRlbnRbMV0sXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4gICByZXR1cm4gbiArIDE7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzQ29udGVudC5sZW5ndGgsIDIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgdGhhdCB3ZSBjYW4gZ2V0IHRoZSBvcmlnaW5hbCBzb3VyY2VzIGZvciB0aGUgc291cmNlc1wiXSA9IGZ1bmN0aW9uKFxyXG4gIGFzc2VydFxyXG4pIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcFdpdGhTb3VyY2VzQ29udGVudCk7XHJcbiAgdmFyIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1swXSksXHJcbiAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbiAgIHJldHVybiBiYXooYmFyKTtcXG4gfTtcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1sxXSksXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4gICByZXR1cm4gbiArIDE7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwib25lLmpzXCIpLFxyXG4gICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4gICByZXR1cm4gYmF6KGJhcik7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidHdvLmpzXCIpLFxyXG4gICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuICAgcmV0dXJuIG4gKyAxO1xcbiB9O1wiXHJcbiAgKTtcclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uKCkge1xyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24oKSB7XHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcIi90aGUvcm9vdC90aHJlZS5qc1wiKTtcclxuICB9LCBFcnJvcik7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidGhyZWUuanNcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgdGhhdCB3ZSBjYW4gZ2V0IHRoZSBvcmlnaW5hbCBzb3VyY2UgY29udGVudCB3aXRoIHJlbGF0aXZlIHNvdXJjZSBwYXRoc1wiXHJcbl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcFJlbGF0aXZlU291cmNlcyk7XHJcbiAgdmFyIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1swXSksXHJcbiAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbiAgIHJldHVybiBiYXooYmFyKTtcXG4gfTtcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1sxXSksXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4gICByZXR1cm4gbiArIDE7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwib25lLmpzXCIpLFxyXG4gICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4gICByZXR1cm4gYmF6KGJhcik7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidHdvLmpzXCIpLFxyXG4gICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuICAgcmV0dXJuIG4gKyAxO1xcbiB9O1wiXHJcbiAgKTtcclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uKCkge1xyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24oKSB7XHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcIi90aGUvcm9vdC90aHJlZS5qc1wiKTtcclxuICB9LCBFcnJvcik7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidGhyZWUuanNcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgdGhhdCB3ZSBjYW4gZ2V0IHRoZSBvcmlnaW5hbCBzb3VyY2UgY29udGVudCBmb3IgdGhlIHNvdXJjZXMgb24gYW4gaW5kZXhlZCBzb3VyY2UgbWFwXCJcclxuXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCk7XHJcbiAgdmFyIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1swXSksXHJcbiAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbiAgIHJldHVybiBiYXooYmFyKTtcXG4gfTtcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1sxXSksXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4gICByZXR1cm4gbiArIDE7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwib25lLmpzXCIpLFxyXG4gICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4gICByZXR1cm4gYmF6KGJhcik7XFxuIH07XCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidHdvLmpzXCIpLFxyXG4gICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuICAgcmV0dXJuIG4gKyAxO1xcbiB9O1wiXHJcbiAgKTtcclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uKCkge1xyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24oKSB7XHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcIi90aGUvcm9vdC90aHJlZS5qc1wiKTtcclxuICB9LCBFcnJvcik7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidGhyZWUuanNcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgaGFzQ29udGVudHNPZkFsbFNvdXJjZXMsIHNpbmdsZSBzb3VyY2Ugd2l0aCBjb250ZW50c1wiXSA9IGZ1bmN0aW9uKFxyXG4gIGFzc2VydFxyXG4pIHtcclxuICAvLyBIYXMgb25lIHNvdXJjZTogZm9vLmpzICh3aXRoIGNvbnRlbnRzKS5cclxuICB2YXIgbWFwV2l0aENvbnRlbnRzID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcigpO1xyXG4gIG1hcFdpdGhDb250ZW50cy5hZGRNYXBwaW5nKHtcclxuICAgIHNvdXJjZTogXCJmb28uanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMTAgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH1cclxuICB9KTtcclxuICBtYXBXaXRoQ29udGVudHMuc2V0U291cmNlQ29udGVudChcImZvby5qc1wiLCBcImNvbnRlbnQgb2YgZm9vLmpzXCIpO1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXBXaXRoQ29udGVudHMudG9KU09OKCkpO1xyXG4gIGFzc2VydC5vayhjb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IGhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzLCBzaW5nbGUgc291cmNlIHdpdGhvdXQgY29udGVudHNcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgLy8gSGFzIG9uZSBzb3VyY2U6IGZvby5qcyAod2l0aG91dCBjb250ZW50cykuXHJcbiAgdmFyIG1hcFdpdGhvdXRDb250ZW50cyA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoKTtcclxuICBtYXBXaXRob3V0Q29udGVudHMuYWRkTWFwcGluZyh7XHJcbiAgICBzb3VyY2U6IFwiZm9vLmpzXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9XHJcbiAgfSk7XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcFdpdGhvdXRDb250ZW50cy50b0pTT04oKSk7XHJcbiAgYXNzZXJ0Lm9rKCFjb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzLCB0d28gc291cmNlcyB3aXRoIGNvbnRlbnRzXCJdID0gZnVuY3Rpb24oXHJcbiAgYXNzZXJ0XHJcbikge1xyXG4gIC8vIEhhcyB0d28gc291cmNlczogZm9vLmpzICh3aXRoIGNvbnRlbnRzKSBhbmQgYmFyLmpzICh3aXRoIGNvbnRlbnRzKS5cclxuICB2YXIgbWFwV2l0aEJvdGhDb250ZW50cyA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoKTtcclxuICBtYXBXaXRoQm90aENvbnRlbnRzLmFkZE1hcHBpbmcoe1xyXG4gICAgc291cmNlOiBcImZvby5qc1wiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDEsIGNvbHVtbjogMTAgfVxyXG4gIH0pO1xyXG4gIG1hcFdpdGhCb3RoQ29udGVudHMuYWRkTWFwcGluZyh7XHJcbiAgICBzb3VyY2U6IFwiYmFyLmpzXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9XHJcbiAgfSk7XHJcbiAgbWFwV2l0aEJvdGhDb250ZW50cy5zZXRTb3VyY2VDb250ZW50KFwiZm9vLmpzXCIsIFwiY29udGVudCBvZiBmb28uanNcIik7XHJcbiAgbWFwV2l0aEJvdGhDb250ZW50cy5zZXRTb3VyY2VDb250ZW50KFwiYmFyLmpzXCIsIFwiY29udGVudCBvZiBiYXIuanNcIik7XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcFdpdGhCb3RoQ29udGVudHMudG9KU09OKCkpO1xyXG4gIGFzc2VydC5vayhjb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IGhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzLCB0d28gc291cmNlcyBvbmUgd2l0aCBhbmQgb25lIHdpdGhvdXQgY29udGVudHNcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgLy8gSGFzIHR3byBzb3VyY2VzOiBmb28uanMgKHdpdGggY29udGVudHMpIGFuZCBiYXIuanMgKHdpdGhvdXQgY29udGVudHMpLlxyXG4gIHZhciBtYXBXaXRob3V0U29tZUNvbnRlbnRzID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcigpO1xyXG4gIG1hcFdpdGhvdXRTb21lQ29udGVudHMuYWRkTWFwcGluZyh7XHJcbiAgICBzb3VyY2U6IFwiZm9vLmpzXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9XHJcbiAgfSk7XHJcbiAgbWFwV2l0aG91dFNvbWVDb250ZW50cy5hZGRNYXBwaW5nKHtcclxuICAgIHNvdXJjZTogXCJiYXIuanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMTAgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH1cclxuICB9KTtcclxuICBtYXBXaXRob3V0U29tZUNvbnRlbnRzLnNldFNvdXJjZUNvbnRlbnQoXCJmb28uanNcIiwgXCJjb250ZW50IG9mIGZvby5qc1wiKTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwV2l0aG91dFNvbWVDb250ZW50cy50b0pTT04oKSk7XHJcbiAgYXNzZXJ0Lm9rKCFjb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IHNvdXJjZVJvb3QgKyBnZW5lcmF0ZWRQb3NpdGlvbkZvclwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIHNvdXJjZVJvb3Q6IFwiZm9vL2JhclwiLFxyXG4gICAgZmlsZTogXCJiYXouanNcIlxyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiBcImJhbmcuY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiA1LCBjb2x1bW46IDUgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiA2LCBjb2x1bW46IDYgfSxcclxuICAgIHNvdXJjZTogXCJiYW5nLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpLCBcImh0dHA6Ly9leGFtcGxlLmNvbS9cIik7XHJcblxyXG4gIC8vIFNob3VsZCBoYW5kbGUgd2l0aG91dCBzb3VyY2VSb290LlxyXG4gIHZhciBwb3MgPSBtYXAuZ2VuZXJhdGVkUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMSxcclxuICAgIHNvdXJjZTogXCJiYW5nLmNvZmZlZVwiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDIpO1xyXG5cclxuICAvLyBTaG91bGQgaGFuZGxlIHdpdGggc291cmNlUm9vdC5cclxuICB2YXIgcG9zID0gbWFwLmdlbmVyYXRlZFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDEsXHJcbiAgICBzb3VyY2U6IFwiZm9vL2Jhci9iYW5nLmNvZmZlZVwiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDIpO1xyXG5cclxuICAvLyBTaG91bGQgaGFuZGxlIGFic29sdXRlIGNhc2UuXHJcbiAgdmFyIHBvcyA9IG1hcC5nZW5lcmF0ZWRQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAxLFxyXG4gICAgc291cmNlOiBcImh0dHA6Ly9leGFtcGxlLmNvbS9mb28vYmFyL2JhbmcuY29mZmVlXCJcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAyKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMik7XHJcbn07XHJcblxyXG5leHBvcnRzW1xyXG4gIFwidGVzdCBzb3VyY2VSb290ICsgZ2VuZXJhdGVkUG9zaXRpb25Gb3IgZm9yIHBhdGggYWJvdmUgdGhlIHJvb3RcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgc291cmNlUm9vdDogXCJmb28vYmFyXCIsXHJcbiAgICBmaWxlOiBcImJhei5qc1wiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiLi4vYmFuZy5jb2ZmZWVcIlxyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIC8vIFNob3VsZCBoYW5kbGUgd2l0aCBzb3VyY2VSb290LlxyXG4gIHZhciBwb3MgPSBtYXAuZ2VuZXJhdGVkUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMSxcclxuICAgIHNvdXJjZTogXCJmb28vYmFuZy5jb2ZmZWVcIlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAyKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGluZGV4IG1hcCArIG9yaWdpbmFsUG9zaXRpb25Gb3JcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKFxyXG4gICAgdXRpbC5pbmRleGVkVGVzdE1hcFdpdGhNYXBwaW5nc0F0U2VjdGlvblN0YXJ0XHJcbiAgKTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDBcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMCk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5zb3VyY2UsIFwiZm9vLmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubmFtZSwgXCJmaXJzdFwiKTtcclxuXHJcbiAgcG9zID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMVxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgXCJiYXIuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCBcInNlY29uZFwiKTtcclxuXHJcbiAgcG9zID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAwKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgXCJiYXouanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCBcInRoaXJkXCIpO1xyXG5cclxuICBwb3MgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAzXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDEpO1xyXG4gIGFzc2VydC5lcXVhbChwb3Muc291cmNlLCBcInF1dXguanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCBcImZvdXJ0aFwiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciBmb3IgbGluZVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6IFwiZ2VuZXJhdGVkLmpzXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJiYXIuY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAzLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJiYXIuY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAzLCBjb2x1bW46IDMgfSxcclxuICAgIHNvdXJjZTogXCJiYXIuY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAzLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiA0LCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJiYXIuY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCksIFwiaHR0cDovL2V4YW1wbGUuY29tL1wiKTtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gbWFwLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0Zvcih7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgc291cmNlOiBcImJhci5jb2ZmZWVcIlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGluZSwgMyk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmNvbHVtbiwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmxpbmUsIDMpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1sxXS5jb2x1bW4sIDMpO1xyXG5cclxuICBtYXBwaW5ncyA9IG1hcC5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIHNvdXJjZTogXCJodHRwOi8vZXhhbXBsZS5jb20vYmFyLmNvZmZlZVwiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5saW5lLCAzKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uY29sdW1uLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0ubGluZSwgMyk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmNvbHVtbiwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBhbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgZm9yIGxpbmUgZnV6enlcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBmaWxlOiBcImdlbmVyYXRlZC5qc1wiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiYmFyLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMywgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogNCwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiYmFyLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gbWFwLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0Zvcih7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgc291cmNlOiBcImJhci5jb2ZmZWVcIlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGluZSwgNCk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmNvbHVtbiwgMik7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBhbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgZm9yIGVtcHR5IHNvdXJjZSBtYXBcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogXCJnZW5lcmF0ZWQuanNcIlxyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IG1hcC5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIHNvdXJjZTogXCJiYXIuY29mZmVlXCJcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzLmxlbmd0aCwgMCk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBhbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgZm9yIGNvbHVtblwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6IFwiZ2VuZXJhdGVkLmpzXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDMgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCkpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDEsXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uY29sdW1uLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0ubGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmNvbHVtbiwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBhbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgZm9yIGNvbHVtbiBmdXp6eVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6IFwiZ2VuZXJhdGVkLmpzXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDMgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCkpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDAsXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uY29sdW1uLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0ubGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmNvbHVtbiwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzW1xyXG4gIFwidGVzdCBhbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgZm9yIGNvbHVtbiBvbiBkaWZmZXJlbnQgbGluZSBmdXp6eVwiXHJcbl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBmaWxlOiBcImdlbmVyYXRlZC5qc1wiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAzIH0sXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gbWFwLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0Zvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAwLFxyXG4gICAgc291cmNlOiBcImZvby5jb2ZmZWVcIlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAwKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGNvbXB1dGVDb2x1bW5TcGFuc1wiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6IFwiZ2VuZXJhdGVkLmpzXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDEgfSxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDEwIH0sXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAzIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyMCB9LFxyXG4gICAgc291cmNlOiBcImZvby5jb2ZmZWVcIlxyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDMsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogMSB9LFxyXG4gICAgc291cmNlOiBcImZvby5jb2ZmZWVcIlxyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDMsIGNvbHVtbjogMiB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiBcImZvby5jb2ZmZWVcIlxyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIG1hcC5jb21wdXRlQ29sdW1uU3BhbnMoKTtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gbWFwLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0Zvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgc291cmNlOiBcImZvby5jb2ZmZWVcIlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGFzdENvbHVtbiwgSW5maW5pdHkpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBzb3VyY2U6IFwiZm9vLmNvZmZlZVwiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDMpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5sYXN0Q29sdW1uLCA5KTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0ubGFzdENvbHVtbiwgMTkpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1syXS5sYXN0Q29sdW1uLCBJbmZpbml0eSk7XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IG1hcC5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3Ioe1xyXG4gICAgbGluZTogMyxcclxuICAgIHNvdXJjZTogXCJmb28uY29mZmVlXCJcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzLmxlbmd0aCwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmxhc3RDb2x1bW4sIDEpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1sxXS5sYXN0Q29sdW1uLCBJbmZpbml0eSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBzb3VyY2VSb290ICsgb3JpZ2luYWxQb3NpdGlvbkZvclwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIHNvdXJjZVJvb3Q6IFwiZm9vL2JhclwiLFxyXG4gICAgZmlsZTogXCJiYXouanNcIlxyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiBcImJhbmcuY29mZmVlXCJcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCkpO1xyXG5cclxuICB2YXIgcG9zID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMlxyXG4gIH0pO1xyXG5cclxuICAvLyBTaG91bGQgYWx3YXlzIGhhdmUgdGhlIHByZXBlbmRlZCBzb3VyY2Ugcm9vdFxyXG4gIGFzc2VydC5lcXVhbChwb3Muc291cmNlLCBcImZvby9iYXIvYmFuZy5jb2ZmZWVcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBnaXRodWIgaXNzdWUgIzU2XCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgc291cmNlUm9vdDogXCJodHRwOi8vXCIsXHJcbiAgICBmaWxlOiBcInd3dy5leGFtcGxlLmNvbS9mb28uanNcIlxyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiBcInd3dy5leGFtcGxlLmNvbS9vcmlnaW5hbC5qc1wiXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgdmFyIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuICBhc3NlcnQuZXF1YWwoc291cmNlcy5sZW5ndGgsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzBdLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vb3JpZ2luYWwuanNcIik7XHJcbn07XHJcblxyXG4vLyBXYXMgZ2l0aHViIGlzc3VlICM0MywgYnV0IHRoYXQncyBubyBsb25nZXIgdmFsaWQuXHJcbmV4cG9ydHNbXCJ0ZXN0IHNvdXJjZSByZXNvbHV0aW9uIHdpdGggc291cmNlTWFwVVJMXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgc291cmNlUm9vdDogXCJcIixcclxuICAgIGZpbGU6IFwiZm9vLmpzXCJcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJvcmlnaW5hbC5qc1wiXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpLCBcImh0dHA6Ly9jZG4uZXhhbXBsZS5jb21cIik7XHJcblxyXG4gIHZhciBzb3VyY2VzID0gbWFwLnNvdXJjZXM7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXMubGVuZ3RoLCAxLCBcIlNob3VsZCBvbmx5IGJlIG9uZSBzb3VyY2UuXCIpO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIHNvdXJjZXNbMF0sXHJcbiAgICBcImh0dHA6Ly9jZG4uZXhhbXBsZS5jb20vb3JpZ2luYWwuanNcIixcclxuICAgIFwiU2hvdWxkIGJlIGpvaW5lZCB3aXRoIHRoZSBzb3VyY2UgbWFwIFVSTC5cIlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBzb3VyY2VSb290IHByZXBlbmRpbmdcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBzb3VyY2VSb290OiBcImh0dHA6Ly9leGFtcGxlLmNvbS9mb28vYmFyXCIsXHJcbiAgICBmaWxlOiBcImZvby5qc1wiXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiL29yaWdpbmFsLmpzXCJcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCkpO1xyXG5cclxuICB2YXIgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMSwgXCJTaG91bGQgb25seSBiZSBvbmUgc291cmNlLlwiKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBzb3VyY2VzWzBdLFxyXG4gICAgXCJodHRwOi8vZXhhbXBsZS5jb20vZm9vL2Jhci9vcmlnaW5hbC5qc1wiLFxyXG4gICAgXCJTb3VyY2UgaW5jbHVkZSB0aGUgc291cmNlIHJvb3QuXCJcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgaW5kZXhlZCBzb3VyY2UgbWFwIGVycm9ycyB3aGVuIHNlY3Rpb25zIGFyZSBvdXQgb2Ygb3JkZXIgYnkgbGluZVwiXHJcbl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICAvLyBNYWtlIGEgZGVlcCBjb3B5IG9mIHRoZSBpbmRleGVkVGVzdE1hcFxyXG4gIHZhciBtaXNvcmRlcmVkSW5kZXhlZFRlc3RNYXAgPSBKU09OLnBhcnNlKFxyXG4gICAgSlNPTi5zdHJpbmdpZnkodXRpbC5pbmRleGVkVGVzdE1hcClcclxuICApO1xyXG5cclxuICBtaXNvcmRlcmVkSW5kZXhlZFRlc3RNYXAuc2VjdGlvbnNbMF0ub2Zmc2V0ID0ge1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMFxyXG4gIH07XHJcblxyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24oKSB7XHJcbiAgICBuZXcgU291cmNlTWFwQ29uc3VtZXIobWlzb3JkZXJlZEluZGV4ZWRUZXN0TWFwKTtcclxuICB9LCBFcnJvcik7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBnaXRodWIgaXNzdWUgIzY0XCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgZmlsZTogXCJmb28uanNcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiaHR0cDovL2V4YW1wbGUuY29tL1wiLFxyXG4gICAgc291cmNlczogW1wiL2FcIl0sXHJcbiAgICBuYW1lczogW10sXHJcbiAgICBtYXBwaW5nczogXCJBQUNBXCIsXHJcbiAgICBzb3VyY2VzQ29udGVudDogW1wiZm9vXCJdXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcihcImFcIiksIFwiZm9vXCIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcihcIi9hXCIpLCBcImZvb1wiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGZ1bGwgc291cmNlIGNvbnRlbnQgd2l0aCBzb3VyY2VNYXBVUkxcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKFxyXG4gICAge1xyXG4gICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICBmaWxlOiBcImZvby5qc1wiLFxyXG4gICAgICBzb3VyY2VSb290OiBcIlwiLFxyXG4gICAgICBzb3VyY2VzOiBbXCJvcmlnaW5hbC5qc1wiXSxcclxuICAgICAgbmFtZXM6IFtdLFxyXG4gICAgICBtYXBwaW5nczogXCJBQUNBXCIsXHJcbiAgICAgIHNvdXJjZXNDb250ZW50OiBbXCJ5ZWxsb3cgd2FyYmxlclwiXVxyXG4gICAgfSxcclxuICAgIFwiaHR0cDovL2Nkbi5leGFtcGxlLmNvbVwiXHJcbiAgKTtcclxuXHJcbiAgdmFyIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcImh0dHA6Ly9jZG4uZXhhbXBsZS5jb20vb3JpZ2luYWwuanNcIiksXHJcbiAgICBcInllbGxvdyB3YXJibGVyXCIsXHJcbiAgICBcIlNvdXJjZSBjb250ZW50IHNob3VsZCBiZSBmb3VuZCB1c2luZyBmdWxsIFVSTFwiXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGJ1ZyA4ODU1OTdcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHtcclxuICAgIHZlcnNpb246IDMsXHJcbiAgICBmaWxlOiBcImZvby5qc1wiLFxyXG4gICAgc291cmNlUm9vdDogXCJmaWxlOi8vL1VzZXJzL0FsR29yZS9JbnZlbnRlZC9UaGUvSW50ZXJuZXQvXCIsXHJcbiAgICBzb3VyY2VzOiBbXCIvYVwiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkFBQ0FcIixcclxuICAgIHNvdXJjZXNDb250ZW50OiBbXCJmb29cIl1cclxuICB9KTtcclxuXHJcbiAgdmFyIHMgPSBtYXAuc291cmNlc1swXTtcclxuICBhc3NlcnQuZXF1YWwobWFwLnNvdXJjZUNvbnRlbnRGb3IocyksIFwiZm9vXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgZ2l0aHViIGlzc3VlICM3MiwgZHVwbGljYXRlIHNvdXJjZXNcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHtcclxuICAgIHZlcnNpb246IDMsXHJcbiAgICBmaWxlOiBcImZvby5qc1wiLFxyXG4gICAgc291cmNlczogW1wic291cmNlMS5qc1wiLCBcInNvdXJjZTEuanNcIiwgXCJzb3VyY2UzLmpzXCJdLFxyXG4gICAgbmFtZXM6IFtdLFxyXG4gICAgbWFwcGluZ3M6IFwiO0VBQUM7O0lBRUU7O01FRUVcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiaHR0cDovL2V4YW1wbGUuY29tXCJcclxuICB9KTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDJcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgXCJodHRwOi8vZXhhbXBsZS5jb20vc291cmNlMS5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAxKTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDQsXHJcbiAgICBjb2x1bW46IDRcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgXCJodHRwOi8vZXhhbXBsZS5jb20vc291cmNlMS5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDMpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAzKTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDYsXHJcbiAgICBjb2x1bW46IDZcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgXCJodHRwOi8vZXhhbXBsZS5jb20vc291cmNlMy5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDUpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCA1KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGdpdGh1YiBpc3N1ZSAjNzIsIGR1cGxpY2F0ZSBuYW1lc1wiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIoe1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIGZpbGU6IFwiZm9vLmpzXCIsXHJcbiAgICBzb3VyY2VzOiBbXCJzb3VyY2UuanNcIl0sXHJcbiAgICBuYW1lczogW1wibmFtZTFcIiwgXCJuYW1lMVwiLCBcIm5hbWUzXCJdLFxyXG4gICAgbWFwcGluZ3M6IFwiO0VBQUNBOztJQUVFQTs7TUFFRUVcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiaHR0cDovL2V4YW1wbGUuY29tXCJcclxuICB9KTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDJcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLm5hbWUsIFwibmFtZTFcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMSk7XHJcblxyXG4gIHZhciBwb3MgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiA0LFxyXG4gICAgY29sdW1uOiA0XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCBcIm5hbWUxXCIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDMpO1xyXG5cclxuICB2YXIgcG9zID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogNixcclxuICAgIGNvbHVtbjogNlxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubmFtZSwgXCJuYW1lM1wiKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDUpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCA1KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IFNvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXBcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgc21nID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBzb3VyY2VSb290OiBcImh0dHA6Ly9leGFtcGxlLmNvbS9cIixcclxuICAgIGZpbGU6IFwiZm9vLmpzXCJcclxuICB9KTtcclxuICBzbWcuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogXCJiYXIuanNcIlxyXG4gIH0pO1xyXG4gIHNtZy5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDQsIGNvbHVtbjogNCB9LFxyXG4gICAgc291cmNlOiBcImJhei5qc1wiLFxyXG4gICAgbmFtZTogXCJkaXJ0TWNHaXJ0XCJcclxuICB9KTtcclxuICBzbWcuc2V0U291cmNlQ29udGVudChcImJhei5qc1wiLCBcImJhei5qcyBjb250ZW50XCIpO1xyXG5cclxuICB2YXIgc21jID0gU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcChzbWcpO1xyXG4gIGFzc2VydC5lcXVhbChzbWMuZmlsZSwgXCJmb28uanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VSb290LCBcImh0dHA6Ly9leGFtcGxlLmNvbS9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VzLmxlbmd0aCwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VzWzBdLCBcImh0dHA6Ly9leGFtcGxlLmNvbS9iYXIuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VzWzFdLCBcImh0dHA6Ly9leGFtcGxlLmNvbS9iYXouanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VDb250ZW50Rm9yKFwiYmF6LmpzXCIpLCBcImJhei5qcyBjb250ZW50XCIpO1xyXG5cclxuICB2YXIgcG9zID0gc21jLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMlxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDEpO1xyXG4gIGFzc2VydC5lcXVhbChwb3Muc291cmNlLCBcImh0dHA6Ly9leGFtcGxlLmNvbS9iYXIuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCBudWxsKTtcclxuXHJcbiAgcG9zID0gc21jLmdlbmVyYXRlZFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDEsXHJcbiAgICBzb3VyY2U6IFwiaHR0cDovL2V4YW1wbGUuY29tL2Jhci5qc1wiXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAyKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMik7XHJcblxyXG4gIHBvcyA9IHNtYy5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDQsXHJcbiAgICBjb2x1bW46IDRcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAyKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgXCJodHRwOi8vZXhhbXBsZS5jb20vYmF6LmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubmFtZSwgXCJkaXJ0TWNHaXJ0XCIpO1xyXG5cclxuICBwb3MgPSBzbWMuZ2VuZXJhdGVkUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMixcclxuICAgIHNvdXJjZTogXCJodHRwOi8vZXhhbXBsZS5jb20vYmF6LmpzXCJcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDQpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCA0KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGlzc3VlICMxOTFcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgZ2VuZXJhdG9yID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6IFwiYS5jc3NcIiB9KTtcclxuICBnZW5lcmF0b3IuYWRkTWFwcGluZyh7XHJcbiAgICBzb3VyY2U6IFwiYi5jc3NcIixcclxuICAgIG9yaWdpbmFsOiB7XHJcbiAgICAgIGxpbmU6IDEsXHJcbiAgICAgIGNvbHVtbjogMFxyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlZDoge1xyXG4gICAgICBsaW5lOiAxLFxyXG4gICAgICBjb2x1bW46IDBcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gQ3JlYXRlIGEgU291cmNlTWFwQ29uc3VtZXIgZnJvbSB0aGUgU291cmNlTWFwR2VuZXJhdG9yLCAuLi5cclxuICB2YXIgY29uc3VtZXIgPSBTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwKGdlbmVyYXRvcik7XHJcbiAgLy8gLi4uIGFuZCB0aGVuIHRyeSBhbmQgdXNlIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IgYWdhaW4uIFRoaXMgc2hvdWxkIG5vdFxyXG4gIC8vIHRocm93LlxyXG4gIGdlbmVyYXRvci50b0pTT04oKTtcclxuXHJcbiAgYXNzZXJ0Lm9rKFxyXG4gICAgdHJ1ZSxcclxuICAgIFwiVXNpbmcgYSBTb3VyY2VNYXBHZW5lcmF0b3IgYWdhaW4gYWZ0ZXIgY3JlYXRpbmcgYSBcIiArXHJcbiAgICAgIFwiU291cmNlTWFwQ29uc3VtZXIgZnJvbSBpdCBzaG91bGQgbm90IHRocm93XCJcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3Qgc291cmNlcyB3aGVyZSB0aGVpciBwcmVmaXggaXMgdGhlIHNvdXJjZSByb290OiBpc3N1ZSAjMTk5XCJcclxuXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciB0ZXN0U291cmNlTWFwID0ge1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIHNvdXJjZXM6IFtcIi9zb3VyY2UvYXBwL2FwcC9hcHAuanNcIl0sXHJcbiAgICBuYW1lczogW1wiU3lzdGVtXCJdLFxyXG4gICAgbWFwcGluZ3M6IFwiQUFBQUFcIixcclxuICAgIGZpbGU6IFwiYXBwL2FwcC5qc1wiLFxyXG4gICAgc291cmNlc0NvbnRlbnQ6IFtcIid1c2Ugc3RyaWN0JztcIl0sXHJcbiAgICBzb3VyY2VSb290OiBcIi9zb3VyY2UvXCJcclxuICB9O1xyXG5cclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodGVzdFNvdXJjZU1hcCk7XHJcblxyXG4gIGZ1bmN0aW9uIGNvbnN1bWVySGFzU291cmNlKHMpIHtcclxuICAgIGFzc2VydC5vayhjb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHMpKTtcclxuICB9XHJcblxyXG4gIGNvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChjb25zdW1lckhhc1NvdXJjZSk7XHJcbiAgdGVzdFNvdXJjZU1hcC5zb3VyY2VzLmZvckVhY2goY29uc3VtZXJIYXNTb3VyY2UpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3Qgc291cmNlcyB3aGVyZSB0aGVpciBwcmVmaXggaXMgdGhlIHNvdXJjZSByb290IGFuZCB0aGUgc291cmNlIHJvb3QgaXMgYSB1cmw6IGlzc3VlICMxOTlcIlxyXG5dID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIHRlc3RTb3VyY2VNYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogW1wiaHR0cDovL2V4YW1wbGUuY29tL3NvdXJjZS9hcHAvYXBwL2FwcC5qc1wiXSxcclxuICAgIG5hbWVzOiBbXCJTeXN0ZW1cIl0sXHJcbiAgICBtYXBwaW5nczogXCJBQUFBQVwiLFxyXG4gICAgc291cmNlc0NvbnRlbnQ6IFtcIid1c2Ugc3RyaWN0JztcIl0sXHJcbiAgICBzb3VyY2VSb290OiBcImh0dHA6Ly9leGFtcGxlLmNvbS9zb3VyY2UvXCJcclxuICB9O1xyXG5cclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodGVzdFNvdXJjZU1hcCk7XHJcblxyXG4gIGZ1bmN0aW9uIGNvbnN1bWVySGFzU291cmNlKHMpIHtcclxuICAgIGFzc2VydC5vayhjb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHMpKTtcclxuICB9XHJcblxyXG4gIGNvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChjb25zdW1lckhhc1NvdXJjZSk7XHJcbiAgdGVzdFNvdXJjZU1hcC5zb3VyY2VzLmZvckVhY2goY29uc3VtZXJIYXNTb3VyY2UpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgY29uc3VtaW5nIG5hbWVzIGFuZCBzb3VyY2VzIHRoYXQgYXJlIG51bWJlcnNcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgdmFyIHRlc3RTb3VyY2VNYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogWzBdLFxyXG4gICAgbmFtZXM6IFsxXSxcclxuICAgIG1hcHBpbmdzOiBcIkFBQUFBXCJcclxuICB9O1xyXG5cclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodGVzdFNvdXJjZU1hcCk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXNbMF0sIFwiMFwiKTtcclxuXHJcbiAgdmFyIGkgPSAwO1xyXG4gIGNvbnN1bWVyLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG0pIHtcclxuICAgIGkrKztcclxuICAgIGFzc2VydC5lcXVhbChtLm5hbWUsIFwiMVwiKTtcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwoaSwgMSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCBub24tbm9ybWFsaXplZCBzb3VyY2VSb290IChmcm9tIGlzc3VlICMyMjcpXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHtcclxuICAgIHZlcnNpb246IDMsXHJcbiAgICBzb3VyY2VzOiBbXCJpbmRleC5qc1wiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIjs7QUFBQSxJQUFJLE9BQU8sTUFBUFwiLFxyXG4gICAgZmlsZTogXCJpbmRleC5qc1wiLFxyXG4gICAgc291cmNlUm9vdDogXCIuL3NyYy9cIixcclxuICAgIHNvdXJjZXNDb250ZW50OiBbJ3ZhciBuYW1lID0gXCJNYXJrXCJcXG4nXVxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VSb290LCBcInNyYy9cIiwgXCJzb3VyY2VSb290IHdhcyBub3JtYWxpemVkXCIpO1xyXG4gIC8vIEJlZm9yZSB0aGUgZml4LCB0aGlzIHRocmV3IGFuIGV4Y2VwdGlvbi5cclxuICBjb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKGNvbnN1bWVyLnNvdXJjZXNbMF0pO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3Qgd2VicGFjayBVUkwgcmVzb2x1dGlvblwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogW1wid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NFwiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkNBQVNcIixcclxuICAgIGZpbGU6IFwic3RhdGljL2pzL21hbmlmZXN0LmI3Y2Y5NzY4MGY3YTUwZmExNTBmLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcIlwiXHJcbiAgfTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBjb25zdW1lci5zb3VyY2VzWzBdLFxyXG4gICAgXCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY3ZTE4NGY5Njc5NzMzMjk4ZDQ0XCJcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3Qgd2VicGFjayBVUkwgcmVzb2x1dGlvbiB3aXRoIHNvdXJjZU1hcFVSTFwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogW1wid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NFwiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkNBQVNcIixcclxuICAgIGZpbGU6IFwic3RhdGljL2pzL21hbmlmZXN0LmI3Y2Y5NzY4MGY3YTUwZmExNTBmLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcIlwiXHJcbiAgfTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcS5qcy5tYXBcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgY29uc3VtZXIuc291cmNlc1swXSxcclxuICAgIFwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NFwiXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IHJlbGF0aXZlIHdlYnBhY2sgVVJMIHJlc29sdXRpb24gd2l0aCBzb3VyY2VNYXBVUkxcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgdmFyIG1hcCA9IHtcclxuICAgIHZlcnNpb246IDMsXHJcbiAgICBzb3VyY2VzOiBbXCJ3ZWJwYWNrL2Jvb3RzdHJhcC5qc1wiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkNBQVNcIixcclxuICAgIGZpbGU6IFwic3RhdGljL2pzL21hbmlmZXN0LmI3Y2Y5NzY4MGY3YTUwZmExNTBmLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcIndlYnBhY2s6Ly8vXCJcclxuICB9O1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9xLmpzLm1hcFwiKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwoY29uc3VtZXIuc291cmNlc1swXSwgXCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwLmpzXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgYmFzaWMgVVJMIHJlc29sdXRpb24gd2l0aCBzb3VyY2VNYXBVUkxcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0ge1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIHNvdXJjZXM6IFtcInNvbWV0aGluZy5qc1wiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkNBQVNcIixcclxuICAgIGZpbGU6IFwic3RhdGljL2pzL21hbmlmZXN0LmI3Y2Y5NzY4MGY3YTUwZmExNTBmLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcInNyY1wiXHJcbiAgfTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIoXHJcbiAgICBtYXAsXHJcbiAgICBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20veC9xLmpzLm1hcFwiXHJcbiAgKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBjb25zdW1lci5zb3VyY2VzWzBdLFxyXG4gICAgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3gvc3JjL3NvbWV0aGluZy5qc1wiXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGFic29sdXRlIHNvdXJjZVVSTCByZXNvbHV0aW9uIHdpdGggc291cmNlTWFwVVJMXCJdID0gZnVuY3Rpb24oXHJcbiAgYXNzZXJ0XHJcbikge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogW1wic29tZXRoaW5nLmpzXCJdLFxyXG4gICAgbmFtZXM6IFtdLFxyXG4gICAgbWFwcGluZ3M6IFwiQ0FBU1wiLFxyXG4gICAgZmlsZTogXCJzdGF0aWMvanMvbWFuaWZlc3QuYjdjZjk3NjgwZjdhNTBmYTE1MGYuanNcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9zcmNcIlxyXG4gIH07XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKFxyXG4gICAgbWFwLFxyXG4gICAgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3gvcS5qcy5tYXBcIlxyXG4gICk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXNbMF0sIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9zcmMvc29tZXRoaW5nLmpzXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgbWFwcGluZyB3aXRob3V0IHNlY3Rpb24gaW4gYW4gaW5kZXhlZCBtYXBcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbWFwID0ge1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIHNlY3Rpb25zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBvZmZzZXQ6IHsgbGluZTogMCwgY29sdW1uOiAwIH0sXHJcbiAgICAgICAgbWFwOiB7XHJcbiAgICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgICAgbmFtZXM6IFtdLFxyXG4gICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICBtYXBwaW5nczogXCJBXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXApO1xyXG4gIHZhciBtYXBwaW5ncyA9IFtdO1xyXG4gIGNvbnN1bWVyLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIG1hcHBpbmdzLnB1c2gobWFwcGluZyk7XHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5zb3VyY2UsIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5nZW5lcmF0ZWRMaW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uZ2VuZXJhdGVkQ29sdW1uLCAwKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ub3JpZ2luYWxMaW5lLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ub3JpZ2luYWxDb2x1bW4sIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5uYW1lLCBudWxsKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IG1hcHBpbmcgd2l0aG91dCBuYW1lIGluIGFuIGluZGV4ZWQgbWFwXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IHtcclxuICAgIHZlcnNpb246IDMsXHJcbiAgICBzZWN0aW9uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiB7IGxpbmU6IDAsIGNvbHVtbjogMCB9LFxyXG4gICAgICAgIG1hcDoge1xyXG4gICAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICAgIG5hbWVzOiBbXSxcclxuICAgICAgICAgIHNvdXJjZXM6IFtcImZvby5qc1wiXSxcclxuICAgICAgICAgIG1hcHBpbmdzOiBcIkFBQUFcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcCk7XHJcbiAgdmFyIG1hcHBpbmdzID0gW107XHJcbiAgY29uc3VtZXIuZWFjaE1hcHBpbmcoZnVuY3Rpb24obWFwcGluZykge1xyXG4gICAgbWFwcGluZ3MucHVzaChtYXBwaW5nKTtcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmdlbmVyYXRlZExpbmUsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5nZW5lcmF0ZWRDb2x1bW4sIDApO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5vcmlnaW5hbExpbmUsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5vcmlnaW5hbENvbHVtbiwgMCk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLm5hbWUsIG51bGwpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgbWFwcGluZyB3aXRoIG5hbWU9MCBpbiBhbiBpbmRleGVkIG1hcFwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc2VjdGlvbnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogeyBsaW5lOiAwLCBjb2x1bW46IDAgfSxcclxuICAgICAgICBtYXA6IHtcclxuICAgICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgICBuYW1lczogW1wiZmlyc3RcIl0sXHJcbiAgICAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIl0sXHJcbiAgICAgICAgICBtYXBwaW5nczogXCJBQUFBQVwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwKTtcclxuICB2YXIgbWFwcGluZ3MgPSBbXTtcclxuICBjb25zdW1lci5lYWNoTWFwcGluZyhmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG1hcHBpbmcpO1xyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uZ2VuZXJhdGVkTGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmdlbmVyYXRlZENvbHVtbiwgMCk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLm9yaWdpbmFsTGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLm9yaWdpbmFsQ29sdW1uLCAwKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubmFtZSwgXCJmaXJzdFwiKTtcclxufTtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL2xpYi91dGlsXCIpO1xyXG5cclxuLy8gVGhpcyBpcyBhIHRlc3QgbWFwcGluZyB3aGljaCBtYXBzIGZ1bmN0aW9ucyBmcm9tIHR3byBkaWZmZXJlbnQgZmlsZXNcclxuLy8gKG9uZS5qcyBhbmQgdHdvLmpzKSB0byBhIG1pbmlmaWVkIGdlbmVyYXRlZCBzb3VyY2UuXHJcbi8vXHJcbi8vIEhlcmUgaXMgb25lLmpzOlxyXG4vL1xyXG4vLyAgIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XHJcbi8vICAgICByZXR1cm4gYmF6KGJhcik7XHJcbi8vICAgfTtcclxuLy9cclxuLy8gSGVyZSBpcyB0d28uanM6XHJcbi8vXHJcbi8vICAgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XHJcbi8vICAgICByZXR1cm4gbiArIDE7XHJcbi8vICAgfTtcclxuLy9cclxuLy8gQW5kIGhlcmUgaXMgdGhlIGdlbmVyYXRlZCBjb2RlIChtaW4uanMpOlxyXG4vL1xyXG4vLyAgIE9ORS5mb289ZnVuY3Rpb24oYSl7cmV0dXJuIGJheihhKTt9O1xyXG4vLyAgIFRXTy5pbmM9ZnVuY3Rpb24oYSl7cmV0dXJuIGErMTt9O1xyXG5leHBvcnRzLnRlc3RHZW5lcmF0ZWRDb2RlID1cclxuICBcIiBPTkUuZm9vPWZ1bmN0aW9uKGEpe3JldHVybiBiYXooYSk7fTtcXG5cIiArXHJcbiAgXCIgVFdPLmluYz1mdW5jdGlvbihhKXtyZXR1cm4gYSsxO307XCI7XHJcbmV4cG9ydHMudGVzdE1hcCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiLCBcIm5cIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCIsXHJcbiAgbWFwcGluZ3M6XHJcbiAgICBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEO0NDRGIsSUFBSSxJQUFNLFNBQVVFLEdBQ2xCLE9BQU9BXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwTm9Tb3VyY2VSb290ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCIsIFwiblwiXSxcclxuICBzb3VyY2VzOiBbXCJvbmUuanNcIiwgXCJ0d28uanNcIl0sXHJcbiAgbWFwcGluZ3M6XHJcbiAgICBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEO0NDRGIsSUFBSSxJQUFNLFNBQVVFLEdBQ2xCLE9BQU9BXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwRW1wdHlTb3VyY2VSb290ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCIsIFwiblwiXSxcclxuICBzb3VyY2VzOiBbXCJvbmUuanNcIiwgXCJ0d28uanNcIl0sXHJcbiAgc291cmNlUm9vdDogXCJcIixcclxuICBtYXBwaW5nczpcclxuICAgIFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSUQ7Q0NEYixJQUFJLElBQU0sU0FBVUUsR0FDbEIsT0FBT0FcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBTaW5nbGVTb3VyY2UgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCJdLFxyXG4gIHNvdXJjZVJvb3Q6IFwiXCIsXHJcbiAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSURcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBFbXB0eU1hcHBpbmdzID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIHNvdXJjZXNDb250ZW50OiBbXCIgT05FLmZvbyA9IDE7XCIsIFwiIFRXTy5pbmMgPSAyO1wiXSxcclxuICBzb3VyY2VSb290OiBcIlwiLFxyXG4gIG1hcHBpbmdzOiBcIlwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcEVtcHR5TWFwcGluZ3NSZWxhdGl2ZVNvdXJjZXMgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXSxcclxuICBzb3VyY2VzOiBbXCIuL29uZS5qc1wiLCBcIi4vdHdvLmpzXCJdLFxyXG4gIHNvdXJjZXNDb250ZW50OiBbXCIgT05FLmZvbyA9IDE7XCIsIFwiIFRXTy5pbmMgPSAyO1wiXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOiBcIlwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcEVtcHR5TWFwcGluZ3NSZWxhdGl2ZVNvdXJjZXNfZ2VuZXJhdGVkRXhwZWN0ZWQgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXSxcclxuICBzb3VyY2VzOiBbXCJvbmUuanNcIiwgXCJ0d28uanNcIl0sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcIiBPTkUuZm9vID0gMTtcIiwgXCIgVFdPLmluYyA9IDI7XCJdLFxyXG4gIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCIsXHJcbiAgbWFwcGluZ3M6IFwiXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwTXVsdGlTb3VyY2VzTWFwcGluZ1JlZmVyc1NpbmdsZVNvdXJjZU9ubHkgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwid2l0aG91dE1hcHBpbmdzLmpzXCJdLFxyXG4gIHNvdXJjZVJvb3Q6IFwiXCIsXHJcbiAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSURcIlxyXG59O1xyXG4vLyBUaGlzIG1hcHBpbmcgaXMgaWRlbnRpY2FsIHRvIGFib3ZlLCBidXQgdXNlcyB0aGUgaW5kZXhlZCBmb3JtYXQgaW5zdGVhZC5cclxuZXhwb3J0cy5pbmRleGVkVGVzdE1hcCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgc2VjdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgbGluZTogMCxcclxuICAgICAgICBjb2x1bW46IDBcclxuICAgICAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBzb3VyY2VzOiBbXCJvbmUuanNcIl0sXHJcbiAgICAgICAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgICAgICAgIFwiIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuXCIgKyBcIiAgIHJldHVybiBiYXooYmFyKTtcXG5cIiArIFwiIH07XCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSURcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgbGluZTogMSxcclxuICAgICAgICBjb2x1bW46IDBcclxuICAgICAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBzb3VyY2VzOiBbXCJ0d28uanNcIl0sXHJcbiAgICAgICAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgICAgICAgIFwiIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcblwiICsgXCIgICByZXR1cm4gbiArIDE7XFxuXCIgKyBcIiB9O1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1wiblwiXSxcclxuICAgICAgICBtYXBwaW5nczogXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQVwiLFxyXG4gICAgICAgIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgICAgICAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXVxyXG59O1xyXG5leHBvcnRzLmluZGV4ZWRUZXN0TWFwRGlmZmVyZW50U291cmNlUm9vdHMgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1wib25lLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcblwiICsgXCIgICByZXR1cm4gYmF6KGJhcik7XFxuXCIgKyBcIiB9O1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDEsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1widHdvLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcIm5cIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0FcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL2RpZmZlcmVudC9yb290XCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuZXhwb3J0cy5pbmRleGVkVGVzdE1hcENvbHVtbk9mZnNldCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgc2VjdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgbGluZTogMCxcclxuICAgICAgICBjb2x1bW46IDBcclxuICAgICAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBzb3VyY2VzOiBbXCJvbmUuanNcIl0sXHJcbiAgICAgICAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgICAgICAgIFwiIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuXCIgKyBcIiAgIHJldHVybiBiYXooYmFyKTtcXG5cIiArIFwiIH07XCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSURcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgbGluZTogMCxcclxuICAgICAgICAvLyBQcmV2aW91cyBzZWN0aW9uJ3MgbGFzdCBnZW5lcmF0ZWQgbWFwcGluZyBpcyBbMzIsIEluZmluaXR5KSwgc29cclxuICAgICAgICAvLyB3ZSdyZSBwbGFjaW5nIHRoaXMgYSBiaXQgYWZ0ZXIgdGhhdC5cclxuICAgICAgICBjb2x1bW46IDUwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1widHdvLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcIm5cIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0FcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuZXhwb3J0cy5pbmRleGVkVGVzdE1hcFdpdGhNYXBwaW5nc0F0U2VjdGlvblN0YXJ0ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgc2VjdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7IGxpbmU6IDAsIGNvbHVtbjogMCB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIG5hbWVzOiBbXCJmaXJzdFwiLCBcInNlY29uZFwiXSxcclxuICAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIiwgXCJiYXIuanNcIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQUFBQUEsQ0NDQ0NcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBvZmZzZXQ6IHsgbGluZTogMCwgY29sdW1uOiAyIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgbmFtZXM6IFtcInRoaXJkXCIsIFwiZm91cnRoXCJdLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcImJhei5qc1wiLCBcInF1dXguanNcIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQUFBQUEsQ0NDQ0NcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXVxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBXaXRoU291cmNlc0NvbnRlbnQgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIiwgXCJuXCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcInR3by5qc1wiXSxcclxuICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG5cIiArIFwiICAgcmV0dXJuIGJheihiYXIpO1xcblwiICsgXCIgfTtcIixcclxuICAgIFwiIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcblwiICsgXCIgICByZXR1cm4gbiArIDE7XFxuXCIgKyBcIiB9O1wiXHJcbiAgXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOlxyXG4gICAgXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQVwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcFJlbGF0aXZlU291cmNlcyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiLCBcIm5cIl0sXHJcbiAgc291cmNlczogW1wiLi9vbmUuanNcIiwgXCIuL3R3by5qc1wiXSxcclxuICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG5cIiArIFwiICAgcmV0dXJuIGJheihiYXIpO1xcblwiICsgXCIgfTtcIixcclxuICAgIFwiIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcblwiICsgXCIgICByZXR1cm4gbiArIDE7XFxuXCIgKyBcIiB9O1wiXHJcbiAgXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOlxyXG4gICAgXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQVwiXHJcbn07XHJcbmV4cG9ydHMuZW1wdHlNYXAgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXSxcclxuICBzb3VyY2VzOiBbXSxcclxuICBtYXBwaW5nczogXCJcIlxyXG59O1xyXG5leHBvcnRzLm1hcFdpdGhTb3VyY2VsZXNzTWFwcGluZyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwiZXhhbXBsZS5qc1wiLFxyXG4gIG5hbWVzOiBbXSxcclxuICBzb3VyY2VzOiBbXCJleGFtcGxlLmpzXCJdLFxyXG4gIG1hcHBpbmdzOiBcIkFBZ0NBLENcIlxyXG59O1xyXG5cclxuZnVuY3Rpb24gYXNzZXJ0TWFwcGluZyhcclxuICBnZW5lcmF0ZWRMaW5lLFxyXG4gIGdlbmVyYXRlZENvbHVtbixcclxuICBvcmlnaW5hbFNvdXJjZSxcclxuICBvcmlnaW5hbExpbmUsXHJcbiAgb3JpZ2luYWxDb2x1bW4sXHJcbiAgbmFtZSxcclxuICBiaWFzLFxyXG4gIG1hcCxcclxuICBhc3NlcnQsXHJcbiAgZG9udFRlc3RHZW5lcmF0ZWQsXHJcbiAgZG9udFRlc3RPcmlnaW5hbFxyXG4pIHtcclxuICBpZiAoIWRvbnRUZXN0T3JpZ2luYWwpIHtcclxuICAgIHZhciBvcmlnTWFwcGluZyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgICAgbGluZTogZ2VuZXJhdGVkTGluZSxcclxuICAgICAgY29sdW1uOiBnZW5lcmF0ZWRDb2x1bW4sXHJcbiAgICAgIGJpYXM6IGJpYXNcclxuICAgIH0pO1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBvcmlnTWFwcGluZy5uYW1lLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICBcIkluY29ycmVjdCBuYW1lLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobmFtZSkgK1xyXG4gICAgICAgIFwiLCBnb3QgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG9yaWdNYXBwaW5nLm5hbWUpXHJcbiAgICApO1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBvcmlnTWFwcGluZy5saW5lLFxyXG4gICAgICBvcmlnaW5hbExpbmUsXHJcbiAgICAgIFwiSW5jb3JyZWN0IGxpbmUsIGV4cGVjdGVkIFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShvcmlnaW5hbExpbmUpICtcclxuICAgICAgICBcIiwgZ290IFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShvcmlnTWFwcGluZy5saW5lKVxyXG4gICAgKTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgb3JpZ01hcHBpbmcuY29sdW1uLFxyXG4gICAgICBvcmlnaW5hbENvbHVtbixcclxuICAgICAgXCJJbmNvcnJlY3QgY29sdW1uLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxDb2x1bW4pICtcclxuICAgICAgICBcIiwgZ290IFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShvcmlnTWFwcGluZy5jb2x1bW4pXHJcbiAgICApO1xyXG5cclxuICAgIHZhciBleHBlY3RlZFNvdXJjZTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9yaWdpbmFsU291cmNlICYmXHJcbiAgICAgIG1hcC5zb3VyY2VSb290ICYmXHJcbiAgICAgIG9yaWdpbmFsU291cmNlLmluZGV4T2YobWFwLnNvdXJjZVJvb3QpID09PSAwXHJcbiAgICApIHtcclxuICAgICAgZXhwZWN0ZWRTb3VyY2UgPSBvcmlnaW5hbFNvdXJjZTtcclxuICAgIH0gZWxzZSBpZiAob3JpZ2luYWxTb3VyY2UpIHtcclxuICAgICAgZXhwZWN0ZWRTb3VyY2UgPSBtYXAuc291cmNlUm9vdFxyXG4gICAgICAgID8gdXRpbC5qb2luKG1hcC5zb3VyY2VSb290LCBvcmlnaW5hbFNvdXJjZSlcclxuICAgICAgICA6IG9yaWdpbmFsU291cmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZXhwZWN0ZWRTb3VyY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgb3JpZ01hcHBpbmcuc291cmNlLFxyXG4gICAgICBleHBlY3RlZFNvdXJjZSxcclxuICAgICAgXCJJbmNvcnJlY3Qgc291cmNlLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRTb3VyY2UpICtcclxuICAgICAgICBcIiwgZ290IFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShvcmlnTWFwcGluZy5zb3VyY2UpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFkb250VGVzdEdlbmVyYXRlZCkge1xyXG4gICAgdmFyIGdlbk1hcHBpbmcgPSBtYXAuZ2VuZXJhdGVkUG9zaXRpb25Gb3Ioe1xyXG4gICAgICBzb3VyY2U6IG9yaWdpbmFsU291cmNlLFxyXG4gICAgICBsaW5lOiBvcmlnaW5hbExpbmUsXHJcbiAgICAgIGNvbHVtbjogb3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgIGJpYXM6IGJpYXNcclxuICAgIH0pO1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBnZW5NYXBwaW5nLmxpbmUsXHJcbiAgICAgIGdlbmVyYXRlZExpbmUsXHJcbiAgICAgIFwiSW5jb3JyZWN0IGxpbmUsIGV4cGVjdGVkIFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShnZW5lcmF0ZWRMaW5lKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2VuTWFwcGluZy5saW5lKVxyXG4gICAgKTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgZ2VuTWFwcGluZy5jb2x1bW4sXHJcbiAgICAgIGdlbmVyYXRlZENvbHVtbixcclxuICAgICAgXCJJbmNvcnJlY3QgY29sdW1uLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2VuZXJhdGVkQ29sdW1uKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2VuTWFwcGluZy5jb2x1bW4pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5leHBvcnRzLmFzc2VydE1hcHBpbmcgPSBhc3NlcnRNYXBwaW5nO1xyXG5cclxuZnVuY3Rpb24gYXNzZXJ0RXF1YWxNYXBzKGFzc2VydCwgYWN0dWFsTWFwLCBleHBlY3RlZE1hcCkge1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWxNYXAudmVyc2lvbiwgZXhwZWN0ZWRNYXAudmVyc2lvbiwgXCJ2ZXJzaW9uIG1pc21hdGNoXCIpO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWxNYXAuZmlsZSwgZXhwZWN0ZWRNYXAuZmlsZSwgXCJmaWxlIG1pc21hdGNoXCIpO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGFjdHVhbE1hcC5uYW1lcy5sZW5ndGgsXHJcbiAgICBleHBlY3RlZE1hcC5uYW1lcy5sZW5ndGgsXHJcbiAgICBcIm5hbWVzIGxlbmd0aCBtaXNtYXRjaDogXCIgK1xyXG4gICAgICBhY3R1YWxNYXAubmFtZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgXCIgIT0gXCIgK1xyXG4gICAgICBleHBlY3RlZE1hcC5uYW1lcy5qb2luKFwiLCBcIilcclxuICApO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsTWFwLm5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIGFjdHVhbE1hcC5uYW1lc1tpXSxcclxuICAgICAgZXhwZWN0ZWRNYXAubmFtZXNbaV0sXHJcbiAgICAgIFwibmFtZXNbXCIgK1xyXG4gICAgICAgIGkgK1xyXG4gICAgICAgIFwiXSBtaXNtYXRjaDogXCIgK1xyXG4gICAgICAgIGFjdHVhbE1hcC5uYW1lcy5qb2luKFwiLCBcIikgK1xyXG4gICAgICAgIFwiICE9IFwiICtcclxuICAgICAgICBleHBlY3RlZE1hcC5uYW1lcy5qb2luKFwiLCBcIilcclxuICAgICk7XHJcbiAgfVxyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGFjdHVhbE1hcC5zb3VyY2VzLmxlbmd0aCxcclxuICAgIGV4cGVjdGVkTWFwLnNvdXJjZXMubGVuZ3RoLFxyXG4gICAgXCJzb3VyY2VzIGxlbmd0aCBtaXNtYXRjaDogXCIgK1xyXG4gICAgICBhY3R1YWxNYXAuc291cmNlcy5qb2luKFwiLCBcIikgK1xyXG4gICAgICBcIiAhPSBcIiArXHJcbiAgICAgIGV4cGVjdGVkTWFwLnNvdXJjZXMuam9pbihcIiwgXCIpXHJcbiAgKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbE1hcC5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIGFjdHVhbE1hcC5zb3VyY2VzW2ldLFxyXG4gICAgICBleHBlY3RlZE1hcC5zb3VyY2VzW2ldLFxyXG4gICAgICBcInNvdXJjZXNbXCIgK1xyXG4gICAgICAgIGkgK1xyXG4gICAgICAgIFwiXSBsZW5ndGggbWlzbWF0Y2g6IFwiICtcclxuICAgICAgICBhY3R1YWxNYXAuc291cmNlcy5qb2luKFwiLCBcIikgK1xyXG4gICAgICAgIFwiICE9IFwiICtcclxuICAgICAgICBleHBlY3RlZE1hcC5zb3VyY2VzLmpvaW4oXCIsIFwiKVxyXG4gICAgKTtcclxuICB9XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgYWN0dWFsTWFwLnNvdXJjZVJvb3QsXHJcbiAgICBleHBlY3RlZE1hcC5zb3VyY2VSb290LFxyXG4gICAgXCJzb3VyY2VSb290IG1pc21hdGNoOiBcIiArXHJcbiAgICAgIGFjdHVhbE1hcC5zb3VyY2VSb290ICtcclxuICAgICAgXCIgIT0gXCIgK1xyXG4gICAgICBleHBlY3RlZE1hcC5zb3VyY2VSb290XHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBhY3R1YWxNYXAubWFwcGluZ3MsXHJcbiAgICBleHBlY3RlZE1hcC5tYXBwaW5ncyxcclxuICAgIFwibWFwcGluZ3MgbWlzbWF0Y2g6XFxuQWN0dWFsOiAgIFwiICtcclxuICAgICAgYWN0dWFsTWFwLm1hcHBpbmdzICtcclxuICAgICAgXCJcXG5FeHBlY3RlZDogXCIgK1xyXG4gICAgICBleHBlY3RlZE1hcC5tYXBwaW5nc1xyXG4gICk7XHJcbiAgaWYgKGFjdHVhbE1hcC5zb3VyY2VzQ29udGVudCkge1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQubGVuZ3RoLFxyXG4gICAgICBleHBlY3RlZE1hcC5zb3VyY2VzQ29udGVudC5sZW5ndGgsXHJcbiAgICAgIFwic291cmNlc0NvbnRlbnQgbGVuZ3RoIG1pc21hdGNoXCJcclxuICAgICk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbE1hcC5zb3VyY2VzQ29udGVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgICAgYWN0dWFsTWFwLnNvdXJjZXNDb250ZW50W2ldLFxyXG4gICAgICAgIGV4cGVjdGVkTWFwLnNvdXJjZXNDb250ZW50W2ldLFxyXG4gICAgICAgIFwic291cmNlc0NvbnRlbnRbXCIgKyBpICsgXCJdIG1pc21hdGNoXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0cy5hc3NlcnRFcXVhbE1hcHMgPSBhc3NlcnRFcXVhbE1hcHM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=