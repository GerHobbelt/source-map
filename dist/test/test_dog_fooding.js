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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test-dog-fooding.js");
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

/***/ "./test/test-dog-fooding.js":
/*!**********************************!*\
  !*** ./test/test-dog-fooding.js ***!
  \**********************************/
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
var SourceMapGenerator = __webpack_require__(/*! ../lib/source-map-generator */ "./lib/source-map-generator.js")
  .SourceMapGenerator;

exports["test eating our own dog food"] = function(assert) {
  var smg = new SourceMapGenerator({
    file: "testing.js",
    sourceRoot: "/wu/tang"
  });

  smg.addMapping({
    source: "gza.coffee",
    original: { line: 1, column: 0 },
    generated: { line: 2, column: 2 }
  });

  smg.addMapping({
    source: "gza.coffee",
    original: { line: 2, column: 0 },
    generated: { line: 3, column: 2 }
  });

  smg.addMapping({
    source: "gza.coffee",
    original: { line: 3, column: 0 },
    generated: { line: 4, column: 2 }
  });

  smg.addMapping({
    source: "gza.coffee",
    original: { line: 4, column: 0 },
    generated: { line: 5, column: 2 }
  });

  smg.addMapping({
    source: "gza.coffee",
    original: { line: 5, column: 10 },
    generated: { line: 6, column: 12 }
  });

  var smc = new SourceMapConsumer(smg.toString());

  // Exact
  util.assertMapping(
    2,
    2,
    "/wu/tang/gza.coffee",
    1,
    0,
    null,
    null,
    smc,
    assert
  );
  util.assertMapping(
    3,
    2,
    "/wu/tang/gza.coffee",
    2,
    0,
    null,
    null,
    smc,
    assert
  );
  util.assertMapping(
    4,
    2,
    "/wu/tang/gza.coffee",
    3,
    0,
    null,
    null,
    smc,
    assert
  );
  util.assertMapping(
    5,
    2,
    "/wu/tang/gza.coffee",
    4,
    0,
    null,
    null,
    smc,
    assert
  );
  util.assertMapping(
    6,
    12,
    "/wu/tang/gza.coffee",
    5,
    10,
    null,
    null,
    smc,
    assert
  );

  // Fuzzy

  // Generated to original with default (glb) bias.
  util.assertMapping(2, 0, null, null, null, null, null, smc, assert, true);
  util.assertMapping(
    2,
    9,
    "/wu/tang/gza.coffee",
    1,
    0,
    null,
    null,
    smc,
    assert,
    true
  );
  util.assertMapping(3, 0, null, null, null, null, null, smc, assert, true);
  util.assertMapping(
    3,
    9,
    "/wu/tang/gza.coffee",
    2,
    0,
    null,
    null,
    smc,
    assert,
    true
  );
  util.assertMapping(4, 0, null, null, null, null, null, smc, assert, true);
  util.assertMapping(
    4,
    9,
    "/wu/tang/gza.coffee",
    3,
    0,
    null,
    null,
    smc,
    assert,
    true
  );
  util.assertMapping(5, 0, null, null, null, null, null, smc, assert, true);
  util.assertMapping(
    5,
    9,
    "/wu/tang/gza.coffee",
    4,
    0,
    null,
    null,
    smc,
    assert,
    true
  );
  util.assertMapping(6, 0, null, null, null, null, null, smc, assert, true);
  util.assertMapping(6, 9, null, null, null, null, null, smc, assert, true);
  util.assertMapping(
    6,
    13,
    "/wu/tang/gza.coffee",
    5,
    10,
    null,
    null,
    smc,
    assert,
    true
  );

  // Generated to original with lub bias.
  util.assertMapping(
    2,
    0,
    "/wu/tang/gza.coffee",
    1,
    0,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    2,
    9,
    null,
    null,
    null,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    3,
    0,
    "/wu/tang/gza.coffee",
    2,
    0,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    3,
    9,
    null,
    null,
    null,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    4,
    0,
    "/wu/tang/gza.coffee",
    3,
    0,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    4,
    9,
    null,
    null,
    null,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    5,
    0,
    "/wu/tang/gza.coffee",
    4,
    0,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    5,
    9,
    null,
    null,
    null,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    6,
    0,
    "/wu/tang/gza.coffee",
    5,
    10,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    6,
    9,
    "/wu/tang/gza.coffee",
    5,
    10,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );
  util.assertMapping(
    6,
    13,
    null,
    null,
    null,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    true
  );

  // Original to generated with default (glb) bias
  util.assertMapping(
    2,
    2,
    "/wu/tang/gza.coffee",
    1,
    1,
    null,
    null,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    3,
    2,
    "/wu/tang/gza.coffee",
    2,
    3,
    null,
    null,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    4,
    2,
    "/wu/tang/gza.coffee",
    3,
    6,
    null,
    null,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    5,
    2,
    "/wu/tang/gza.coffee",
    4,
    9,
    null,
    null,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    5,
    2,
    "/wu/tang/gza.coffee",
    5,
    9,
    null,
    null,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    6,
    12,
    "/wu/tang/gza.coffee",
    6,
    19,
    null,
    null,
    smc,
    assert,
    null,
    true
  );

  // Original to generated with lub bias.
  util.assertMapping(
    3,
    2,
    "/wu/tang/gza.coffee",
    1,
    1,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    4,
    2,
    "/wu/tang/gza.coffee",
    2,
    3,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    5,
    2,
    "/wu/tang/gza.coffee",
    3,
    6,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    6,
    12,
    "/wu/tang/gza.coffee",
    4,
    9,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    6,
    12,
    "/wu/tang/gza.coffee",
    5,
    9,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    null,
    true
  );
  util.assertMapping(
    null,
    null,
    "/wu/tang/gza.coffee",
    6,
    19,
    null,
    SourceMapConsumer.LEAST_UPPER_BOUND,
    smc,
    assert,
    null,
    true
  );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYXJyYXktc2V0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYmFzZTY0LXZscS5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2JpbmFyeS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9tYXBwaW5nLWxpc3QuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9xdWljay1zb3J0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvc291cmNlLW1hcC1jb25zdW1lci5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LWRvZy1mb29kaW5nLmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi90ZXN0L3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsNkJBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFIQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Qsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SUEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixnQkFBZ0I7O0FBRWhCLG1CQUFtQjtBQUNuQixvQkFBb0I7O0FBRXBCLGdCQUFnQjtBQUNoQixnQkFBZ0I7O0FBRWhCLGdCQUFnQjtBQUNoQixpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwRUEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xIQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLDZCQUFROztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDbkZBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0SEEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw2QkFBUTtBQUMzQixtQkFBbUIsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLHVDQUFhO0FBQ3BDLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFjO0FBQ3RDLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFjOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsTUFBTTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0NBQWtDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9ELFlBQVk7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsd0NBQXdDO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QyxxQkFBcUIsK0NBQStDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN0dUNBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsbUJBQU8sQ0FBQyx5Q0FBYztBQUN0QyxXQUFXLG1CQUFPLENBQUMsNkJBQVE7QUFDM0IsZUFBZSxtQkFBTyxDQUFDLHVDQUFhO0FBQ3BDLGtCQUFrQixtQkFBTyxDQUFDLDZDQUFnQjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3RjQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLFFBQVE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyaUJBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsOEJBQVE7QUFDM0Isd0JBQXdCLG1CQUFPLENBQUMsZ0VBQTRCO0FBQzVELHlCQUF5QixtQkFBTyxDQUFDLGtFQUE2QjtBQUM5RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQjtBQUNoQixHQUFHOztBQUVIO0FBQ0E7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0I7QUFDaEIsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCO0FBQ2hCLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQjtBQUNoQixHQUFHOztBQUVIO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxnQkFBZ0I7QUFDaEIsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RkQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLGtDQUFhOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QjtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEMsd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBCQUEwQixVQUFVO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx1QkFBdUIsVUFBVTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBCQUEwQixVQUFVO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx1QkFBdUIsVUFBVTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBCQUEwQixVQUFVO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUJBQXVCLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCLFVBQVU7QUFDcEUsOEJBQThCLHVCQUF1QixVQUFVO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywwQkFBMEIsVUFBVTtBQUNwRSw4QkFBOEIsdUJBQXVCLFVBQVU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUNBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0X2RvZ19mb29kaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0L3Rlc3QtZG9nLWZvb2RpbmcuanNcIik7XG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxudmFyIGhhc05hdGl2ZU1hcCA9IHR5cGVvZiBNYXAgIT09IFwidW5kZWZpbmVkXCI7XHJcblxyXG4vKipcclxuICogQSBkYXRhIHN0cnVjdHVyZSB3aGljaCBpcyBhIGNvbWJpbmF0aW9uIG9mIGFuIGFycmF5IGFuZCBhIHNldC4gQWRkaW5nIGEgbmV3XHJcbiAqIG1lbWJlciBpcyBPKDEpLCB0ZXN0aW5nIGZvciBtZW1iZXJzaGlwIGlzIE8oMSksIGFuZCBmaW5kaW5nIHRoZSBpbmRleCBvZiBhblxyXG4gKiBlbGVtZW50IGlzIE8oMSkuIFJlbW92aW5nIGVsZW1lbnRzIGZyb20gdGhlIHNldCBpcyBub3Qgc3VwcG9ydGVkLiBPbmx5XHJcbiAqIHN0cmluZ3MgYXJlIHN1cHBvcnRlZCBmb3IgbWVtYmVyc2hpcC5cclxuICovXHJcbmZ1bmN0aW9uIEFycmF5U2V0KCkge1xyXG4gIHRoaXMuX2FycmF5ID0gW107XHJcbiAgdGhpcy5fc2V0ID0gaGFzTmF0aXZlTWFwID8gbmV3IE1hcCgpIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0YXRpYyBtZXRob2QgZm9yIGNyZWF0aW5nIEFycmF5U2V0IGluc3RhbmNlcyBmcm9tIGFuIGV4aXN0aW5nIGFycmF5LlxyXG4gKi9cclxuQXJyYXlTZXQuZnJvbUFycmF5ID0gZnVuY3Rpb24gQXJyYXlTZXRfZnJvbUFycmF5KGFBcnJheSwgYUFsbG93RHVwbGljYXRlcykge1xyXG4gIHZhciBzZXQgPSBuZXcgQXJyYXlTZXQoKTtcclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYUFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICBzZXQuYWRkKGFBcnJheVtpXSwgYUFsbG93RHVwbGljYXRlcyk7XHJcbiAgfVxyXG4gIHJldHVybiBzZXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGhvdyBtYW55IHVuaXF1ZSBpdGVtcyBhcmUgaW4gdGhpcyBBcnJheVNldC4gSWYgZHVwbGljYXRlcyBoYXZlIGJlZW5cclxuICogYWRkZWQsIHRoYW4gdGhvc2UgZG8gbm90IGNvdW50IHRvd2FyZHMgdGhlIHNpemUuXHJcbiAqXHJcbiAqIEByZXR1cm5zIE51bWJlclxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiBBcnJheVNldF9zaXplKCkge1xyXG4gIHJldHVybiBoYXNOYXRpdmVNYXBcclxuICAgID8gdGhpcy5fc2V0LnNpemVcclxuICAgIDogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5fc2V0KS5sZW5ndGg7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBnaXZlbiBzdHJpbmcgdG8gdGhpcyBzZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIEFycmF5U2V0X2FkZChhU3RyLCBhQWxsb3dEdXBsaWNhdGVzKSB7XHJcbiAgdmFyIHNTdHIgPSBoYXNOYXRpdmVNYXAgPyBhU3RyIDogdXRpbC50b1NldFN0cmluZyhhU3RyKTtcclxuICB2YXIgaXNEdXBsaWNhdGUgPSBoYXNOYXRpdmVNYXAgPyB0aGlzLmhhcyhhU3RyKSA6IGhhcy5jYWxsKHRoaXMuX3NldCwgc1N0cik7XHJcbiAgdmFyIGlkeCA9IHRoaXMuX2FycmF5Lmxlbmd0aDtcclxuICBpZiAoIWlzRHVwbGljYXRlIHx8IGFBbGxvd0R1cGxpY2F0ZXMpIHtcclxuICAgIHRoaXMuX2FycmF5LnB1c2goYVN0cik7XHJcbiAgfVxyXG4gIGlmICghaXNEdXBsaWNhdGUpIHtcclxuICAgIGlmIChoYXNOYXRpdmVNYXApIHtcclxuICAgICAgdGhpcy5fc2V0LnNldChhU3RyLCBpZHgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2V0W3NTdHJdID0gaWR4O1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJcyB0aGUgZ2l2ZW4gc3RyaW5nIGEgbWVtYmVyIG9mIHRoaXMgc2V0P1xyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBBcnJheVNldF9oYXMoYVN0cikge1xyXG4gIGlmIChoYXNOYXRpdmVNYXApIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXQuaGFzKGFTdHIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc1N0ciA9IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XHJcbiAgICByZXR1cm4gaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogV2hhdCBpcyB0aGUgaW5kZXggb2YgdGhlIGdpdmVuIHN0cmluZyBpbiB0aGUgYXJyYXk/XHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBBcnJheVNldF9pbmRleE9mKGFTdHIpIHtcclxuICBpZiAoaGFzTmF0aXZlTWFwKSB7XHJcbiAgICB2YXIgaWR4ID0gdGhpcy5fc2V0LmdldChhU3RyKTtcclxuICAgIGlmIChpZHggPj0gMCkge1xyXG4gICAgICByZXR1cm4gaWR4O1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc1N0ciA9IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XHJcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2V0W3NTdHJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhU3RyICsgJ1wiIGlzIG5vdCBpbiB0aGUgc2V0LicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoYXQgaXMgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4P1xyXG4gKlxyXG4gKiBAcGFyYW0gTnVtYmVyIGFJZHhcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5hdCA9IGZ1bmN0aW9uIEFycmF5U2V0X2F0KGFJZHgpIHtcclxuICBpZiAoYUlkeCA+PSAwICYmIGFJZHggPCB0aGlzLl9hcnJheS5sZW5ndGgpIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnJheVthSWR4XTtcclxuICB9XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZWxlbWVudCBpbmRleGVkIGJ5IFwiICsgYUlkeCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYXJyYXkgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBzZXQgKHdoaWNoIGhhcyB0aGUgcHJvcGVyIGluZGljZXNcclxuICogaW5kaWNhdGVkIGJ5IGluZGV4T2YpLiBOb3RlIHRoYXQgdGhpcyBpcyBhIGNvcHkgb2YgdGhlIGludGVybmFsIGFycmF5IHVzZWRcclxuICogZm9yIHN0b3JpbmcgdGhlIG1lbWJlcnMgc28gdGhhdCBubyBvbmUgY2FuIG1lc3Mgd2l0aCBpbnRlcm5hbCBzdGF0ZS5cclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gQXJyYXlTZXRfdG9BcnJheSgpIHtcclxuICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKTtcclxufTtcclxuXHJcbmV4cG9ydHMuQXJyYXlTZXQgPSBBcnJheVNldDtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKlxyXG4gKiBCYXNlZCBvbiB0aGUgQmFzZSA2NCBWTFEgaW1wbGVtZW50YXRpb24gaW4gQ2xvc3VyZSBDb21waWxlcjpcclxuICogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jbG9zdXJlLWNvbXBpbGVyL3NvdXJjZS9icm93c2UvdHJ1bmsvc3JjL2NvbS9nb29nbGUvZGVidWdnaW5nL3NvdXJjZW1hcC9CYXNlNjRWTFEuamF2YVxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBUaGUgQ2xvc3VyZSBDb21waWxlciBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcclxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZVxyXG4gKiBtZXQ6XHJcbiAqXHJcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XHJcbiAqICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cclxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZVxyXG4gKiAgICBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZ1xyXG4gKiAgICBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWRcclxuICogICAgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxyXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIEdvb2dsZSBJbmMuIG5vciB0aGUgbmFtZXMgb2YgaXRzXHJcbiAqICAgIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZFxyXG4gKiAgICBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXHJcbiAqXHJcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlNcclxuICogXCJBUyBJU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVFxyXG4gKiBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1JcclxuICogQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFRcclxuICogT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsXHJcbiAqIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1RcclxuICogTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsXHJcbiAqIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWVxyXG4gKiBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXHJcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRVxyXG4gKiBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxyXG4gKi9cclxuXHJcbnZhciBiYXNlNjQgPSByZXF1aXJlKFwiLi9iYXNlNjRcIik7XHJcblxyXG4vLyBBIHNpbmdsZSBiYXNlIDY0IGRpZ2l0IGNhbiBjb250YWluIDYgYml0cyBvZiBkYXRhLiBGb3IgdGhlIGJhc2UgNjQgdmFyaWFibGVcclxuLy8gbGVuZ3RoIHF1YW50aXRpZXMgd2UgdXNlIGluIHRoZSBzb3VyY2UgbWFwIHNwZWMsIHRoZSBmaXJzdCBiaXQgaXMgdGhlIHNpZ24sXHJcbi8vIHRoZSBuZXh0IGZvdXIgYml0cyBhcmUgdGhlIGFjdHVhbCB2YWx1ZSwgYW5kIHRoZSA2dGggYml0IGlzIHRoZVxyXG4vLyBjb250aW51YXRpb24gYml0LiBUaGUgY29udGludWF0aW9uIGJpdCB0ZWxscyB1cyB3aGV0aGVyIHRoZXJlIGFyZSBtb3JlXHJcbi8vIGRpZ2l0cyBpbiB0aGlzIHZhbHVlIGZvbGxvd2luZyB0aGlzIGRpZ2l0LlxyXG4vL1xyXG4vLyAgIENvbnRpbnVhdGlvblxyXG4vLyAgIHwgICAgU2lnblxyXG4vLyAgIHwgICAgfFxyXG4vLyAgIFYgICAgVlxyXG4vLyAgIDEwMTAxMVxyXG5cclxudmFyIFZMUV9CQVNFX1NISUZUID0gNTtcclxuXHJcbi8vIGJpbmFyeTogMTAwMDAwXHJcbnZhciBWTFFfQkFTRSA9IDEgPDwgVkxRX0JBU0VfU0hJRlQ7XHJcblxyXG4vLyBiaW5hcnk6IDAxMTExMVxyXG52YXIgVkxRX0JBU0VfTUFTSyA9IFZMUV9CQVNFIC0gMTtcclxuXHJcbi8vIGJpbmFyeTogMTAwMDAwXHJcbnZhciBWTFFfQ09OVElOVUFUSU9OX0JJVCA9IFZMUV9CQVNFO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGZyb20gYSB0d28tY29tcGxlbWVudCB2YWx1ZSB0byBhIHZhbHVlIHdoZXJlIHRoZSBzaWduIGJpdCBpc1xyXG4gKiBwbGFjZWQgaW4gdGhlIGxlYXN0IHNpZ25pZmljYW50IGJpdC4gIEZvciBleGFtcGxlLCBhcyBkZWNpbWFsczpcclxuICogICAxIGJlY29tZXMgMiAoMTAgYmluYXJ5KSwgLTEgYmVjb21lcyAzICgxMSBiaW5hcnkpXHJcbiAqICAgMiBiZWNvbWVzIDQgKDEwMCBiaW5hcnkpLCAtMiBiZWNvbWVzIDUgKDEwMSBiaW5hcnkpXHJcbiAqL1xyXG5mdW5jdGlvbiB0b1ZMUVNpZ25lZChhVmFsdWUpIHtcclxuICByZXR1cm4gYVZhbHVlIDwgMCA/ICgtYVZhbHVlIDw8IDEpICsgMSA6IChhVmFsdWUgPDwgMSkgKyAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdG8gYSB0d28tY29tcGxlbWVudCB2YWx1ZSBmcm9tIGEgdmFsdWUgd2hlcmUgdGhlIHNpZ24gYml0IGlzXHJcbiAqIHBsYWNlZCBpbiB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0LiAgRm9yIGV4YW1wbGUsIGFzIGRlY2ltYWxzOlxyXG4gKiAgIDIgKDEwIGJpbmFyeSkgYmVjb21lcyAxLCAzICgxMSBiaW5hcnkpIGJlY29tZXMgLTFcclxuICogICA0ICgxMDAgYmluYXJ5KSBiZWNvbWVzIDIsIDUgKDEwMSBiaW5hcnkpIGJlY29tZXMgLTJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21WTFFTaWduZWQoYVZhbHVlKSB7XHJcbiAgdmFyIGlzTmVnYXRpdmUgPSAoYVZhbHVlICYgMSkgPT09IDE7XHJcbiAgdmFyIHNoaWZ0ZWQgPSBhVmFsdWUgPj4gMTtcclxuICByZXR1cm4gaXNOZWdhdGl2ZSA/IC1zaGlmdGVkIDogc2hpZnRlZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJhc2UgNjQgVkxRIGVuY29kZWQgdmFsdWUuXHJcbiAqL1xyXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIGJhc2U2NFZMUV9lbmNvZGUoYVZhbHVlKSB7XHJcbiAgdmFyIGVuY29kZWQgPSBcIlwiO1xyXG4gIHZhciBkaWdpdDtcclxuXHJcbiAgdmFyIHZscSA9IHRvVkxRU2lnbmVkKGFWYWx1ZSk7XHJcblxyXG4gIGRvIHtcclxuICAgIGRpZ2l0ID0gdmxxICYgVkxRX0JBU0VfTUFTSztcclxuICAgIHZscSA+Pj49IFZMUV9CQVNFX1NISUZUO1xyXG4gICAgaWYgKHZscSA+IDApIHtcclxuICAgICAgLy8gVGhlcmUgYXJlIHN0aWxsIG1vcmUgZGlnaXRzIGluIHRoaXMgdmFsdWUsIHNvIHdlIG11c3QgbWFrZSBzdXJlIHRoZVxyXG4gICAgICAvLyBjb250aW51YXRpb24gYml0IGlzIG1hcmtlZC5cclxuICAgICAgZGlnaXQgfD0gVkxRX0NPTlRJTlVBVElPTl9CSVQ7XHJcbiAgICB9XHJcbiAgICBlbmNvZGVkICs9IGJhc2U2NC5lbmNvZGUoZGlnaXQpO1xyXG4gIH0gd2hpbGUgKHZscSA+IDApO1xyXG5cclxuICByZXR1cm4gZW5jb2RlZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIHRoZSBuZXh0IGJhc2UgNjQgVkxRIHZhbHVlIGZyb20gdGhlIGdpdmVuIHN0cmluZyBhbmQgcmV0dXJucyB0aGVcclxuICogdmFsdWUgYW5kIHRoZSByZXN0IG9mIHRoZSBzdHJpbmcgdmlhIHRoZSBvdXQgcGFyYW1ldGVyLlxyXG4gKi9cclxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiBiYXNlNjRWTFFfZGVjb2RlKGFTdHIsIGFJbmRleCwgYU91dFBhcmFtKSB7XHJcbiAgdmFyIHN0ckxlbiA9IGFTdHIubGVuZ3RoO1xyXG4gIHZhciByZXN1bHQgPSAwO1xyXG4gIHZhciBzaGlmdCA9IDA7XHJcbiAgdmFyIGNvbnRpbnVhdGlvbiwgZGlnaXQ7XHJcblxyXG4gIGRvIHtcclxuICAgIGlmIChhSW5kZXggPj0gc3RyTGVuKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIG1vcmUgZGlnaXRzIGluIGJhc2UgNjQgVkxRIHZhbHVlLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBkaWdpdCA9IGJhc2U2NC5kZWNvZGUoYVN0ci5jaGFyQ29kZUF0KGFJbmRleCsrKSk7XHJcbiAgICBpZiAoZGlnaXQgPT09IC0xKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFzZTY0IGRpZ2l0OiBcIiArIGFTdHIuY2hhckF0KGFJbmRleCAtIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250aW51YXRpb24gPSAhIShkaWdpdCAmIFZMUV9DT05USU5VQVRJT05fQklUKTtcclxuICAgIGRpZ2l0ICY9IFZMUV9CQVNFX01BU0s7XHJcbiAgICByZXN1bHQgPSByZXN1bHQgKyAoZGlnaXQgPDwgc2hpZnQpO1xyXG4gICAgc2hpZnQgKz0gVkxRX0JBU0VfU0hJRlQ7XHJcbiAgfSB3aGlsZSAoY29udGludWF0aW9uKTtcclxuXHJcbiAgYU91dFBhcmFtLnZhbHVlID0gZnJvbVZMUVNpZ25lZChyZXN1bHQpO1xyXG4gIGFPdXRQYXJhbS5yZXN0ID0gYUluZGV4O1xyXG59O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIGludFRvQ2hhck1hcCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLnNwbGl0KFxyXG4gIFwiXCJcclxuKTtcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGUgYW4gaW50ZWdlciBpbiB0aGUgcmFuZ2Ugb2YgMCB0byA2MyB0byBhIHNpbmdsZSBiYXNlIDY0IGRpZ2l0LlxyXG4gKi9cclxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihudW1iZXIpIHtcclxuICBpZiAoMCA8PSBudW1iZXIgJiYgbnVtYmVyIDwgaW50VG9DaGFyTWFwLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGludFRvQ2hhck1hcFtudW1iZXJdO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDYzOiBcIiArIG51bWJlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb2RlIGEgc2luZ2xlIGJhc2UgNjQgY2hhcmFjdGVyIGNvZGUgZGlnaXQgdG8gYW4gaW50ZWdlci4gUmV0dXJucyAtMSBvblxyXG4gKiBmYWlsdXJlLlxyXG4gKi9cclxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihjaGFyQ29kZSkge1xyXG4gIHZhciBiaWdBID0gNjU7IC8vICdBJ1xyXG4gIHZhciBiaWdaID0gOTA7IC8vICdaJ1xyXG5cclxuICB2YXIgbGl0dGxlQSA9IDk3OyAvLyAnYSdcclxuICB2YXIgbGl0dGxlWiA9IDEyMjsgLy8gJ3onXHJcblxyXG4gIHZhciB6ZXJvID0gNDg7IC8vICcwJ1xyXG4gIHZhciBuaW5lID0gNTc7IC8vICc5J1xyXG5cclxuICB2YXIgcGx1cyA9IDQzOyAvLyAnKydcclxuICB2YXIgc2xhc2ggPSA0NzsgLy8gJy8nXHJcblxyXG4gIHZhciBsaXR0bGVPZmZzZXQgPSAyNjtcclxuICB2YXIgbnVtYmVyT2Zmc2V0ID0gNTI7XHJcblxyXG4gIC8vIDAgLSAyNTogQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcclxuICBpZiAoYmlnQSA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSBiaWdaKSB7XHJcbiAgICByZXR1cm4gY2hhckNvZGUgLSBiaWdBO1xyXG4gIH1cclxuXHJcbiAgLy8gMjYgLSA1MTogYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcclxuICBpZiAobGl0dGxlQSA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSBsaXR0bGVaKSB7XHJcbiAgICByZXR1cm4gY2hhckNvZGUgLSBsaXR0bGVBICsgbGl0dGxlT2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgLy8gNTIgLSA2MTogMDEyMzQ1Njc4OVxyXG4gIGlmICh6ZXJvIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IG5pbmUpIHtcclxuICAgIHJldHVybiBjaGFyQ29kZSAtIHplcm8gKyBudW1iZXJPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICAvLyA2MjogK1xyXG4gIGlmIChjaGFyQ29kZSA9PSBwbHVzKSB7XHJcbiAgICByZXR1cm4gNjI7XHJcbiAgfVxyXG5cclxuICAvLyA2MzogL1xyXG4gIGlmIChjaGFyQ29kZSA9PSBzbGFzaCkge1xyXG4gICAgcmV0dXJuIDYzO1xyXG4gIH1cclxuXHJcbiAgLy8gSW52YWxpZCBiYXNlNjQgZGlnaXQuXHJcbiAgcmV0dXJuIC0xO1xyXG59O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5HUkVBVEVTVF9MT1dFUl9CT1VORCA9IDE7XHJcbmV4cG9ydHMuTEVBU1RfVVBQRVJfQk9VTkQgPSAyO1xyXG5cclxuLyoqXHJcbiAqIFJlY3Vyc2l2ZSBpbXBsZW1lbnRhdGlvbiBvZiBiaW5hcnkgc2VhcmNoLlxyXG4gKlxyXG4gKiBAcGFyYW0gYUxvdyBJbmRpY2VzIGhlcmUgYW5kIGxvd2VyIGRvIG5vdCBjb250YWluIHRoZSBuZWVkbGUuXHJcbiAqIEBwYXJhbSBhSGlnaCBJbmRpY2VzIGhlcmUgYW5kIGhpZ2hlciBkbyBub3QgY29udGFpbiB0aGUgbmVlZGxlLlxyXG4gKiBAcGFyYW0gYU5lZWRsZSBUaGUgZWxlbWVudCBiZWluZyBzZWFyY2hlZCBmb3IuXHJcbiAqIEBwYXJhbSBhSGF5c3RhY2sgVGhlIG5vbi1lbXB0eSBhcnJheSBiZWluZyBzZWFyY2hlZC5cclxuICogQHBhcmFtIGFDb21wYXJlIEZ1bmN0aW9uIHdoaWNoIHRha2VzIHR3byBlbGVtZW50cyBhbmQgcmV0dXJucyAtMSwgMCwgb3IgMS5cclxuICogQHBhcmFtIGFCaWFzIEVpdGhlciAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxyXG4gKiAgICAgJ2JpbmFyeVNlYXJjaC5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcclxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcclxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVjdXJzaXZlU2VhcmNoKGFMb3csIGFIaWdoLCBhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcykge1xyXG4gIC8vIFRoaXMgZnVuY3Rpb24gdGVybWluYXRlcyB3aGVuIG9uZSBvZiB0aGUgZm9sbG93aW5nIGlzIHRydWU6XHJcbiAgLy9cclxuICAvLyAgIDEuIFdlIGZpbmQgdGhlIGV4YWN0IGVsZW1lbnQgd2UgYXJlIGxvb2tpbmcgZm9yLlxyXG4gIC8vXHJcbiAgLy8gICAyLiBXZSBkaWQgbm90IGZpbmQgdGhlIGV4YWN0IGVsZW1lbnQsIGJ1dCB3ZSBjYW4gcmV0dXJuIHRoZSBpbmRleCBvZlxyXG4gIC8vICAgICAgdGhlIG5leHQtY2xvc2VzdCBlbGVtZW50LlxyXG4gIC8vXHJcbiAgLy8gICAzLiBXZSBkaWQgbm90IGZpbmQgdGhlIGV4YWN0IGVsZW1lbnQsIGFuZCB0aGVyZSBpcyBubyBuZXh0LWNsb3Nlc3RcclxuICAvLyAgICAgIGVsZW1lbnQgdGhhbiB0aGUgb25lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLCBzbyB3ZSByZXR1cm4gLTEuXHJcbiAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGFIaWdoIC0gYUxvdykgLyAyKSArIGFMb3c7XHJcbiAgdmFyIGNtcCA9IGFDb21wYXJlKGFOZWVkbGUsIGFIYXlzdGFja1ttaWRdLCB0cnVlKTtcclxuICBpZiAoY21wID09PSAwKSB7XHJcbiAgICAvLyBGb3VuZCB0aGUgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXHJcbiAgICByZXR1cm4gbWlkO1xyXG4gIH0gZWxzZSBpZiAoY21wID4gMCkge1xyXG4gICAgLy8gT3VyIG5lZWRsZSBpcyBncmVhdGVyIHRoYW4gYUhheXN0YWNrW21pZF0uXHJcbiAgICBpZiAoYUhpZ2ggLSBtaWQgPiAxKSB7XHJcbiAgICAgIC8vIFRoZSBlbGVtZW50IGlzIGluIHRoZSB1cHBlciBoYWxmLlxyXG4gICAgICByZXR1cm4gcmVjdXJzaXZlU2VhcmNoKG1pZCwgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgZXhhY3QgbmVlZGxlIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBpbiB0aGlzIGhheXN0YWNrLiBEZXRlcm1pbmUgaWZcclxuICAgIC8vIHdlIGFyZSBpbiB0ZXJtaW5hdGlvbiBjYXNlICgzKSBvciAoMikgYW5kIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgdGhpbmcuXHJcbiAgICBpZiAoYUJpYXMgPT0gZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCkge1xyXG4gICAgICByZXR1cm4gYUhpZ2ggPCBhSGF5c3RhY2subGVuZ3RoID8gYUhpZ2ggOiAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBtaWQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIE91ciBuZWVkbGUgaXMgbGVzcyB0aGFuIGFIYXlzdGFja1ttaWRdLlxyXG4gICAgaWYgKG1pZCAtIGFMb3cgPiAxKSB7XHJcbiAgICAgIC8vIFRoZSBlbGVtZW50IGlzIGluIHRoZSBsb3dlciBoYWxmLlxyXG4gICAgICByZXR1cm4gcmVjdXJzaXZlU2VhcmNoKGFMb3csIG1pZCwgYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIGFyZSBpbiB0ZXJtaW5hdGlvbiBjYXNlICgzKSBvciAoMikgYW5kIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgdGhpbmcuXHJcbiAgICBpZiAoYUJpYXMgPT0gZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCkge1xyXG4gICAgICByZXR1cm4gbWlkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFMb3cgPCAwID8gLTEgOiBhTG93O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgYmluYXJ5IHNlYXJjaCB3aGljaCB3aWxsIGFsd2F5cyB0cnkgYW5kIHJldHVyblxyXG4gKiB0aGUgaW5kZXggb2YgdGhlIGNsb3Nlc3QgZWxlbWVudCBpZiB0aGVyZSBpcyBubyBleGFjdCBoaXQuIFRoaXMgaXMgYmVjYXVzZVxyXG4gKiBtYXBwaW5ncyBiZXR3ZWVuIG9yaWdpbmFsIGFuZCBnZW5lcmF0ZWQgbGluZS9jb2wgcGFpcnMgYXJlIHNpbmdsZSBwb2ludHMsXHJcbiAqIGFuZCB0aGVyZSBpcyBhbiBpbXBsaWNpdCByZWdpb24gYmV0d2VlbiBlYWNoIG9mIHRoZW0sIHNvIGEgbWlzcyBqdXN0IG1lYW5zXHJcbiAqIHRoYXQgeW91IGFyZW4ndCBvbiB0aGUgdmVyeSBzdGFydCBvZiBhIHJlZ2lvbi5cclxuICpcclxuICogQHBhcmFtIGFOZWVkbGUgVGhlIGVsZW1lbnQgeW91IGFyZSBsb29raW5nIGZvci5cclxuICogQHBhcmFtIGFIYXlzdGFjayBUaGUgYXJyYXkgdGhhdCBpcyBiZWluZyBzZWFyY2hlZC5cclxuICogQHBhcmFtIGFDb21wYXJlIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgdGhlIG5lZWRsZSBhbmQgYW4gZWxlbWVudCBpbiB0aGVcclxuICogICAgIGFycmF5IGFuZCByZXR1cm5zIC0xLCAwLCBvciAxIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBuZWVkbGUgaXMgbGVzc1xyXG4gKiAgICAgdGhhbiwgZXF1YWwgdG8sIG9yIGdyZWF0ZXIgdGhhbiB0aGUgZWxlbWVudCwgcmVzcGVjdGl2ZWx5LlxyXG4gKiBAcGFyYW0gYUJpYXMgRWl0aGVyICdiaW5hcnlTZWFyY2guR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxyXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxyXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXHJcbiAqICAgICBEZWZhdWx0cyB0byAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cclxuICovXHJcbmV4cG9ydHMuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoKGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKSB7XHJcbiAgaWYgKGFIYXlzdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcblxyXG4gIHZhciBpbmRleCA9IHJlY3Vyc2l2ZVNlYXJjaChcclxuICAgIC0xLFxyXG4gICAgYUhheXN0YWNrLmxlbmd0aCxcclxuICAgIGFOZWVkbGUsXHJcbiAgICBhSGF5c3RhY2ssXHJcbiAgICBhQ29tcGFyZSxcclxuICAgIGFCaWFzIHx8IGV4cG9ydHMuR1JFQVRFU1RfTE9XRVJfQk9VTkRcclxuICApO1xyXG4gIGlmIChpbmRleCA8IDApIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcblxyXG4gIC8vIFdlIGhhdmUgZm91bmQgZWl0aGVyIHRoZSBleGFjdCBlbGVtZW50LCBvciB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQgdGhhblxyXG4gIC8vIHRoZSBvbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IuIEhvd2V2ZXIsIHRoZXJlIG1heSBiZSBtb3JlIHRoYW4gb25lIHN1Y2hcclxuICAvLyBlbGVtZW50LiBNYWtlIHN1cmUgd2UgYWx3YXlzIHJldHVybiB0aGUgc21hbGxlc3Qgb2YgdGhlc2UuXHJcbiAgd2hpbGUgKGluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICBpZiAoYUNvbXBhcmUoYUhheXN0YWNrW2luZGV4XSwgYUhheXN0YWNrW2luZGV4IC0gMV0sIHRydWUpICE9PSAwKSB7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgLS1pbmRleDtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRleDtcclxufTtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxNCBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgd2hldGhlciBtYXBwaW5nQiBpcyBhZnRlciBtYXBwaW5nQSB3aXRoIHJlc3BlY3QgdG8gZ2VuZXJhdGVkXHJcbiAqIHBvc2l0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuZXJhdGVkUG9zaXRpb25BZnRlcihtYXBwaW5nQSwgbWFwcGluZ0IpIHtcclxuICAvLyBPcHRpbWl6ZWQgZm9yIG1vc3QgY29tbW9uIGNhc2VcclxuICB2YXIgbGluZUEgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lO1xyXG4gIHZhciBsaW5lQiA9IG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgdmFyIGNvbHVtbkEgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgdmFyIGNvbHVtbkIgPSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgcmV0dXJuIChcclxuICAgIGxpbmVCID4gbGluZUEgfHxcclxuICAgIChsaW5lQiA9PSBsaW5lQSAmJiBjb2x1bW5CID49IGNvbHVtbkEpIHx8XHJcbiAgICB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmdBLCBtYXBwaW5nQikgPD0gMFxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRhdGEgc3RydWN0dXJlIHRvIHByb3ZpZGUgYSBzb3J0ZWQgdmlldyBvZiBhY2N1bXVsYXRlZCBtYXBwaW5ncyBpbiBhXHJcbiAqIHBlcmZvcm1hbmNlIGNvbnNjaW91cyBtYW5uZXIuIEl0IHRyYWRlcyBhIG5lZ2xpZ2libGUgb3ZlcmhlYWQgaW4gZ2VuZXJhbFxyXG4gKiBjYXNlIGZvciBhIGxhcmdlIHNwZWVkdXAgaW4gY2FzZSBvZiBtYXBwaW5ncyBiZWluZyBhZGRlZCBpbiBvcmRlci5cclxuICovXHJcbmZ1bmN0aW9uIE1hcHBpbmdMaXN0KCkge1xyXG4gIHRoaXMuX2FycmF5ID0gW107XHJcbiAgdGhpcy5fc29ydGVkID0gdHJ1ZTtcclxuICAvLyBTZXJ2ZXMgYXMgaW5maW11bVxyXG4gIHRoaXMuX2xhc3QgPSB7IGdlbmVyYXRlZExpbmU6IC0xLCBnZW5lcmF0ZWRDb2x1bW46IDAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgdGhyb3VnaCBpbnRlcm5hbCBpdGVtcy4gVGhpcyBtZXRob2QgdGFrZXMgdGhlIHNhbWUgYXJndW1lbnRzIHRoYXRcclxuICogYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCB0YWtlcy5cclxuICpcclxuICogTk9URTogVGhlIG9yZGVyIG9mIHRoZSBtYXBwaW5ncyBpcyBOT1QgZ3VhcmFudGVlZC5cclxuICovXHJcbk1hcHBpbmdMaXN0LnByb3RvdHlwZS51bnNvcnRlZEZvckVhY2ggPSBmdW5jdGlvbiBNYXBwaW5nTGlzdF9mb3JFYWNoKFxyXG4gIGFDYWxsYmFjayxcclxuICBhVGhpc0FyZ1xyXG4pIHtcclxuICB0aGlzLl9hcnJheS5mb3JFYWNoKGFDYWxsYmFjaywgYVRoaXNBcmcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgZ2l2ZW4gc291cmNlIG1hcHBpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSBPYmplY3QgYU1hcHBpbmdcclxuICovXHJcbk1hcHBpbmdMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBNYXBwaW5nTGlzdF9hZGQoYU1hcHBpbmcpIHtcclxuICBpZiAoZ2VuZXJhdGVkUG9zaXRpb25BZnRlcih0aGlzLl9sYXN0LCBhTWFwcGluZykpIHtcclxuICAgIHRoaXMuX2xhc3QgPSBhTWFwcGluZztcclxuICAgIHRoaXMuX2FycmF5LnB1c2goYU1hcHBpbmcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2FycmF5LnB1c2goYU1hcHBpbmcpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBmbGF0LCBzb3J0ZWQgYXJyYXkgb2YgbWFwcGluZ3MuIFRoZSBtYXBwaW5ncyBhcmUgc29ydGVkIGJ5XHJcbiAqIGdlbmVyYXRlZCBwb3NpdGlvbi5cclxuICpcclxuICogV0FSTklORzogVGhpcyBtZXRob2QgcmV0dXJucyBpbnRlcm5hbCBkYXRhIHdpdGhvdXQgY29weWluZywgZm9yXHJcbiAqIHBlcmZvcm1hbmNlLiBUaGUgcmV0dXJuIHZhbHVlIG11c3QgTk9UIGJlIG11dGF0ZWQsIGFuZCBzaG91bGQgYmUgdHJlYXRlZCBhc1xyXG4gKiBhbiBpbW11dGFibGUgYm9ycm93LiBJZiB5b3Ugd2FudCB0byB0YWtlIG93bmVyc2hpcCwgeW91IG11c3QgbWFrZSB5b3VyIG93blxyXG4gKiBjb3B5LlxyXG4gKi9cclxuTWFwcGluZ0xpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiBNYXBwaW5nTGlzdF90b0FycmF5KCkge1xyXG4gIGlmICghdGhpcy5fc29ydGVkKSB7XHJcbiAgICB0aGlzLl9hcnJheS5zb3J0KHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQpO1xyXG4gICAgdGhpcy5fc29ydGVkID0gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMuX2FycmF5O1xyXG59O1xyXG5cclxuZXhwb3J0cy5NYXBwaW5nTGlzdCA9IE1hcHBpbmdMaXN0O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxuLy8gSXQgdHVybnMgb3V0IHRoYXQgc29tZSAobW9zdD8pIEphdmFTY3JpcHQgZW5naW5lcyBkb24ndCBzZWxmLWhvc3RcclxuLy8gYEFycmF5LnByb3RvdHlwZS5zb3J0YC4gVGhpcyBtYWtlcyBzZW5zZSBiZWNhdXNlIEMrKyB3aWxsIGxpa2VseSByZW1haW5cclxuLy8gZmFzdGVyIHRoYW4gSlMgd2hlbiBkb2luZyByYXcgQ1BVLWludGVuc2l2ZSBzb3J0aW5nLiBIb3dldmVyLCB3aGVuIHVzaW5nIGFcclxuLy8gY3VzdG9tIGNvbXBhcmF0b3IgZnVuY3Rpb24sIGNhbGxpbmcgYmFjayBhbmQgZm9ydGggYmV0d2VlbiB0aGUgVk0ncyBDKysgYW5kXHJcbi8vIEpJVCdkIEpTIGlzIHJhdGhlciBzbG93ICphbmQqIGxvc2VzIEpJVCB0eXBlIGluZm9ybWF0aW9uLCByZXN1bHRpbmcgaW5cclxuLy8gd29yc2UgZ2VuZXJhdGVkIGNvZGUgZm9yIHRoZSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRoYW4gd291bGQgYmUgb3B0aW1hbC4gSW5cclxuLy8gZmFjdCwgd2hlbiBzb3J0aW5nIHdpdGggYSBjb21wYXJhdG9yLCB0aGVzZSBjb3N0cyBvdXR3ZWlnaCB0aGUgYmVuZWZpdHMgb2ZcclxuLy8gc29ydGluZyBpbiBDKysuIEJ5IHVzaW5nIG91ciBvd24gSlMtaW1wbGVtZW50ZWQgUXVpY2sgU29ydCAoYmVsb3cpLCB3ZSBnZXRcclxuLy8gYSB+MzUwMG1zIG1lYW4gc3BlZWQtdXAgaW4gYGJlbmNoL2JlbmNoLmh0bWxgLlxyXG5cclxuLy8gQ2FwdHVyZSBNYXRoLnJhbmRvbSgpIG5vdywgdG8gYXZvaWQgcHJvYmxlbXMgaW4gY2FzZSBhIHRlc3QgbW9ja3MgaXQgbGF0ZXIuXHJcbi8vIElmIE1hdGgucmFuZG9tKCkgaXMgbW9ja2VkIHRvIHJldHVybiBhIGNvbnN0YW50IHZhbHVlLCBxdWlja1NvcnQgbWF5IGJlY29tZVxyXG4vLyBPKG5eMikgd2hlbiBpbnZva2VkIG9uIGFscmVhZHktc29ydGVkIGRhdGEuXHJcbnZhciByYW5kb20gPSBNYXRoLnJhbmRvbTtcclxuXHJcbi8qKlxyXG4gKiBTd2FwIHRoZSBlbGVtZW50cyBpbmRleGVkIGJ5IGB4YCBhbmQgYHlgIGluIHRoZSBhcnJheSBgYXJ5YC5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJ5XHJcbiAqICAgICAgICBUaGUgYXJyYXkuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAqICAgICAgICBUaGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAqICAgICAgICBUaGUgaW5kZXggb2YgdGhlIHNlY29uZCBpdGVtLlxyXG4gKi9cclxuZnVuY3Rpb24gc3dhcChhcnksIHgsIHkpIHtcclxuICB2YXIgdGVtcCA9IGFyeVt4XTtcclxuICBhcnlbeF0gPSBhcnlbeV07XHJcbiAgYXJ5W3ldID0gdGVtcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciB3aXRoaW4gdGhlIHJhbmdlIGBsb3cgLi4gaGlnaGAgaW5jbHVzaXZlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbG93XHJcbiAqICAgICAgICBUaGUgbG93ZXIgYm91bmQgb24gdGhlIHJhbmdlLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGlnaFxyXG4gKiAgICAgICAgVGhlIHVwcGVyIGJvdW5kIG9uIHRoZSByYW5nZS5cclxuICovXHJcbmZ1bmN0aW9uIHJhbmRvbUludEluUmFuZ2UobG93LCBoaWdoKSB7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQobG93ICsgcmFuZG9tKCkgKiAoaGlnaCAtIGxvdykpO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIFF1aWNrIFNvcnQgYWxnb3JpdGhtLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcclxuICogICAgICAgIEFuIGFycmF5IHRvIHNvcnQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmF0b3JcclxuICogICAgICAgIEZ1bmN0aW9uIHRvIHVzZSB0byBjb21wYXJlIHR3byBpdGVtcy5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHBcclxuICogICAgICAgIFN0YXJ0IGluZGV4IG9mIHRoZSBhcnJheVxyXG4gKiBAcGFyYW0ge051bWJlcn0gclxyXG4gKiAgICAgICAgRW5kIGluZGV4IG9mIHRoZSBhcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCBwLCByKSB7XHJcbiAgLy8gSWYgb3VyIGxvd2VyIGJvdW5kIGlzIGxlc3MgdGhhbiBvdXIgdXBwZXIgYm91bmQsIHdlICgxKSBwYXJ0aXRpb24gdGhlXHJcbiAgLy8gYXJyYXkgaW50byB0d28gcGllY2VzIGFuZCAoMikgcmVjdXJzZSBvbiBlYWNoIGhhbGYuIElmIGl0IGlzIG5vdCwgdGhpcyBpc1xyXG4gIC8vIHRoZSBlbXB0eSBhcnJheSBhbmQgb3VyIGJhc2UgY2FzZS5cclxuXHJcbiAgaWYgKHAgPCByKSB7XHJcbiAgICAvLyAoMSkgUGFydGl0aW9uaW5nLlxyXG4gICAgLy9cclxuICAgIC8vIFRoZSBwYXJ0aXRpb25pbmcgY2hvb3NlcyBhIHBpdm90IGJldHdlZW4gYHBgIGFuZCBgcmAgYW5kIG1vdmVzIGFsbFxyXG4gICAgLy8gZWxlbWVudHMgdGhhdCBhcmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBwaXZvdCB0byB0aGUgYmVmb3JlIGl0LCBhbmRcclxuICAgIC8vIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBhcmUgZ3JlYXRlciB0aGFuIGl0IGFmdGVyIGl0LiBUaGUgZWZmZWN0IGlzIHRoYXRcclxuICAgIC8vIG9uY2UgcGFydGl0aW9uIGlzIGRvbmUsIHRoZSBwaXZvdCBpcyBpbiB0aGUgZXhhY3QgcGxhY2UgaXQgd2lsbCBiZSB3aGVuXHJcbiAgICAvLyB0aGUgYXJyYXkgaXMgcHV0IGluIHNvcnRlZCBvcmRlciwgYW5kIGl0IHdpbGwgbm90IG5lZWQgdG8gYmUgbW92ZWRcclxuICAgIC8vIGFnYWluLiBUaGlzIHJ1bnMgaW4gTyhuIGxvZyBuKSB0aW1lLlxyXG5cclxuICAgIC8vIEFsd2F5cyBjaG9vc2UgYSByYW5kb20gcGl2b3Qgc28gdGhhdCBhbiBpbnB1dCBhcnJheSB3aGljaCBpcyByZXZlcnNlXHJcbiAgICAvLyBzb3J0ZWQgZG9lcyBub3QgY2F1c2UgTyhuXjIpIHJ1bm5pbmcgdGltZS5cclxuICAgIHZhciBwaXZvdEluZGV4ID0gcmFuZG9tSW50SW5SYW5nZShwLCByKTtcclxuICAgIHZhciBpID0gcCAtIDE7XHJcblxyXG4gICAgc3dhcChhcnksIHBpdm90SW5kZXgsIHIpO1xyXG4gICAgdmFyIHBpdm90ID0gYXJ5W3JdO1xyXG5cclxuICAgIC8vIEltbWVkaWF0ZWx5IGFmdGVyIGBqYCBpcyBpbmNyZW1lbnRlZCBpbiB0aGlzIGxvb3AsIHRoZSBmb2xsb3dpbmcgaG9sZFxyXG4gICAgLy8gdHJ1ZTpcclxuICAgIC8vXHJcbiAgICAvLyAgICogRXZlcnkgZWxlbWVudCBpbiBgYXJ5W3AgLi4gaV1gIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3QuXHJcbiAgICAvL1xyXG4gICAgLy8gICAqIEV2ZXJ5IGVsZW1lbnQgaW4gYGFyeVtpKzEgLi4gai0xXWAgaXMgZ3JlYXRlciB0aGFuIHRoZSBwaXZvdC5cclxuICAgIGZvciAodmFyIGogPSBwOyBqIDwgcjsgaisrKSB7XHJcbiAgICAgIGlmIChjb21wYXJhdG9yKGFyeVtqXSwgcGl2b3QpIDw9IDApIHtcclxuICAgICAgICBpICs9IDE7XHJcbiAgICAgICAgc3dhcChhcnksIGksIGopO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3dhcChhcnksIGkgKyAxLCBqKTtcclxuICAgIHZhciBxID0gaSArIDE7XHJcblxyXG4gICAgLy8gKDIpIFJlY3Vyc2Ugb24gZWFjaCBoYWxmLlxyXG5cclxuICAgIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcCwgcSAtIDEpO1xyXG4gICAgZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCBxICsgMSwgcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU29ydCB0aGUgZ2l2ZW4gYXJyYXkgaW4tcGxhY2Ugd2l0aCB0aGUgZ2l2ZW4gY29tcGFyYXRvciBmdW5jdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJ5XHJcbiAqICAgICAgICBBbiBhcnJheSB0byBzb3J0LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJhdG9yXHJcbiAqICAgICAgICBGdW5jdGlvbiB0byB1c2UgdG8gY29tcGFyZSB0d28gaXRlbXMuXHJcbiAqL1xyXG5leHBvcnRzLnF1aWNrU29ydCA9IGZ1bmN0aW9uKGFyeSwgY29tcGFyYXRvcikge1xyXG4gIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgMCwgYXJ5Lmxlbmd0aCAtIDEpO1xyXG59O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgYmluYXJ5U2VhcmNoID0gcmVxdWlyZShcIi4vYmluYXJ5LXNlYXJjaFwiKTtcclxudmFyIEFycmF5U2V0ID0gcmVxdWlyZShcIi4vYXJyYXktc2V0XCIpLkFycmF5U2V0O1xyXG52YXIgYmFzZTY0VkxRID0gcmVxdWlyZShcIi4vYmFzZTY0LXZscVwiKTtcclxudmFyIHF1aWNrU29ydCA9IHJlcXVpcmUoXCIuL3F1aWNrLXNvcnRcIikucXVpY2tTb3J0O1xyXG5cclxuZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXIoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCkge1xyXG4gIHZhciBzb3VyY2VNYXAgPSBhU291cmNlTWFwO1xyXG4gIGlmICh0eXBlb2YgYVNvdXJjZU1hcCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgc291cmNlTWFwID0gdXRpbC5wYXJzZVNvdXJjZU1hcElucHV0KGFTb3VyY2VNYXApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNvdXJjZU1hcC5zZWN0aW9ucyAhPSBudWxsXHJcbiAgICA/IG5ldyBJbmRleGVkU291cmNlTWFwQ29uc3VtZXIoc291cmNlTWFwLCBhU291cmNlTWFwVVJMKVxyXG4gICAgOiBuZXcgQmFzaWNTb3VyY2VNYXBDb25zdW1lcihzb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpO1xyXG59XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwID0gZnVuY3Rpb24oYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCkge1xyXG4gIHJldHVybiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXBwaW5nIHNwZWMgdGhhdCB3ZSBhcmUgY29uc3VtaW5nLlxyXG4gKi9cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl92ZXJzaW9uID0gMztcclxuXHJcbi8vIGBfX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmQgYF9fb3JpZ2luYWxNYXBwaW5nc2AgYXJlIGFycmF5cyB0aGF0IGhvbGQgdGhlXHJcbi8vIHBhcnNlZCBtYXBwaW5nIGNvb3JkaW5hdGVzIGZyb20gdGhlIHNvdXJjZSBtYXAncyBcIm1hcHBpbmdzXCIgYXR0cmlidXRlLiBUaGV5XHJcbi8vIGFyZSBsYXppbHkgaW5zdGFudGlhdGVkLCBhY2Nlc3NlZCB2aWEgdGhlIGBfZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZFxyXG4vLyBgX29yaWdpbmFsTWFwcGluZ3NgIGdldHRlcnMgcmVzcGVjdGl2ZWx5LCBhbmQgd2Ugb25seSBwYXJzZSB0aGUgbWFwcGluZ3NcclxuLy8gYW5kIGNyZWF0ZSB0aGVzZSBhcnJheXMgb25jZSBxdWVyaWVkIGZvciBhIHNvdXJjZSBsb2NhdGlvbi4gV2UganVtcCB0aHJvdWdoXHJcbi8vIHRoZXNlIGhvb3BzIGJlY2F1c2UgdGhlcmUgY2FuIGJlIG1hbnkgdGhvdXNhbmRzIG9mIG1hcHBpbmdzLCBhbmQgcGFyc2luZ1xyXG4vLyB0aGVtIGlzIGV4cGVuc2l2ZSwgc28gd2Ugb25seSB3YW50IHRvIGRvIGl0IGlmIHdlIG11c3QuXHJcbi8vXHJcbi8vIEVhY2ggb2JqZWN0IGluIHRoZSBhcnJheXMgaXMgb2YgdGhlIGZvcm06XHJcbi8vXHJcbi8vICAgICB7XHJcbi8vICAgICAgIGdlbmVyYXRlZExpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIGNvZGUsXHJcbi8vICAgICAgIGdlbmVyYXRlZENvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBjb2RlLFxyXG4vLyAgICAgICBzb3VyY2U6IFRoZSBwYXRoIHRvIHRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSB0aGF0IGdlbmVyYXRlZCB0aGlzXHJcbi8vICAgICAgICAgICAgICAgY2h1bmsgb2YgY29kZSxcclxuLy8gICAgICAgb3JpZ2luYWxMaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSB0aGF0XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29ycmVzcG9uZHMgdG8gdGhpcyBjaHVuayBvZiBnZW5lcmF0ZWQgY29kZSxcclxuLy8gICAgICAgb3JpZ2luYWxDb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UgdGhhdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgY29ycmVzcG9uZHMgdG8gdGhpcyBjaHVuayBvZiBnZW5lcmF0ZWQgY29kZSxcclxuLy8gICAgICAgbmFtZTogVGhlIG5hbWUgb2YgdGhlIG9yaWdpbmFsIHN5bWJvbCB3aGljaCBnZW5lcmF0ZWQgdGhpcyBjaHVuayBvZlxyXG4vLyAgICAgICAgICAgICBjb2RlLlxyXG4vLyAgICAgfVxyXG4vL1xyXG4vLyBBbGwgcHJvcGVydGllcyBleGNlcHQgZm9yIGBnZW5lcmF0ZWRMaW5lYCBhbmQgYGdlbmVyYXRlZENvbHVtbmAgY2FuIGJlXHJcbi8vIGBudWxsYC5cclxuLy9cclxuLy8gYF9nZW5lcmF0ZWRNYXBwaW5nc2AgaXMgb3JkZXJlZCBieSB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucy5cclxuLy9cclxuLy8gYF9vcmlnaW5hbE1hcHBpbmdzYCBpcyBvcmRlcmVkIGJ5IHRoZSBvcmlnaW5hbCBwb3NpdGlvbnMuXHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IG51bGw7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsIFwiX2dlbmVyYXRlZE1hcHBpbmdzXCIsIHtcclxuICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MpIHtcclxuICAgICAgdGhpcy5fc29ydEdlbmVyYXRlZE1hcHBpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncztcclxuICB9XHJcbn0pO1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fb3JpZ2luYWxNYXBwaW5ncyA9IG51bGw7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsIFwiX29yaWdpbmFsTWFwcGluZ3NcIiwge1xyXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuX19vcmlnaW5hbE1hcHBpbmdzKSB7XHJcbiAgICAgIHRoaXMuX3NvcnRPcmlnaW5hbE1hcHBpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzO1xyXG4gIH1cclxufSk7XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX19nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkID0gbnVsbDtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFxyXG4gIFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSxcclxuICBcIl9nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkXCIsXHJcbiAge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJzZU1hcHBpbmdzKHRoaXMuX21hcHBpbmdzLCB0aGlzLnNvdXJjZVJvb3QpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4pO1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkID0gbnVsbDtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFxyXG4gIFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSxcclxuICBcIl9vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWRcIixcclxuICB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCF0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyc2VNYXBwaW5ncyh0aGlzLl9tYXBwaW5ncywgdGhpcy5zb3VyY2VSb290KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4pO1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfY2hhcklzTWFwcGluZ1NlcGFyYXRvcihcclxuICBhU3RyLFxyXG4gIGluZGV4XHJcbikge1xyXG4gIHZhciBjID0gYVN0ci5jaGFyQXQoaW5kZXgpO1xyXG4gIHJldHVybiBjID09PSBcIjtcIiB8fCBjID09PSBcIixcIjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XHJcbiAqIHF1ZXJ5ICh0aGUgb3JkZXJlZCBhcnJheXMgaW4gdGhlIGB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZFxyXG4gKiBgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3NgIHByb3BlcnRpZXMpLlxyXG4gKi9cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9wYXJzZU1hcHBpbmdzID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhcclxuICBhU3RyLFxyXG4gIGFTb3VyY2VSb290XHJcbikge1xyXG4gIHRocm93IG5ldyBFcnJvcihcIlN1YmNsYXNzZXMgbXVzdCBpbXBsZW1lbnQgX3BhcnNlTWFwcGluZ3NcIik7XHJcbn07XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3NvcnRHZW5lcmF0ZWRNYXBwaW5ncyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3NvcnRHZW5lcmF0ZWRNYXBwaW5ncygpIHtcclxuICBjb25zdCBtYXBwaW5ncyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWQ7XHJcbiAgcXVpY2tTb3J0KG1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkKTtcclxuICB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBtYXBwaW5ncztcclxufTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fc29ydE9yaWdpbmFsTWFwcGluZ3MgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9zb3J0T3JpZ2luYWxNYXBwaW5ncygpIHtcclxuICBjb25zdCBtYXBwaW5ncyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZDtcclxuICBxdWlja1NvcnQobWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMpO1xyXG4gIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzID0gbWFwcGluZ3M7XHJcbn07XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVIgPSAxO1xyXG5Tb3VyY2VNYXBDb25zdW1lci5PUklHSU5BTF9PUkRFUiA9IDI7XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCA9IDE7XHJcblNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5EID0gMjtcclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIG92ZXIgZWFjaCBtYXBwaW5nIGJldHdlZW4gYW4gb3JpZ2luYWwgc291cmNlL2xpbmUvY29sdW1uIGFuZCBhXHJcbiAqIGdlbmVyYXRlZCBsaW5lL2NvbHVtbiBpbiB0aGlzIHNvdXJjZSBtYXAuXHJcbiAqXHJcbiAqIEBwYXJhbSBGdW5jdGlvbiBhQ2FsbGJhY2tcclxuICogICAgICAgIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aXRoIGVhY2ggbWFwcGluZy5cclxuICogQHBhcmFtIE9iamVjdCBhQ29udGV4dFxyXG4gKiAgICAgICAgT3B0aW9uYWwuIElmIHNwZWNpZmllZCwgdGhpcyBvYmplY3Qgd2lsbCBiZSB0aGUgdmFsdWUgb2YgYHRoaXNgIGV2ZXJ5XHJcbiAqICAgICAgICB0aW1lIHRoYXQgYGFDYWxsYmFja2AgaXMgY2FsbGVkLlxyXG4gKiBAcGFyYW0gYU9yZGVyXHJcbiAqICAgICAgICBFaXRoZXIgYFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUmAgb3JcclxuICogICAgICAgIGBTb3VyY2VNYXBDb25zdW1lci5PUklHSU5BTF9PUkRFUmAuIFNwZWNpZmllcyB3aGV0aGVyIHlvdSB3YW50IHRvXHJcbiAqICAgICAgICBpdGVyYXRlIG92ZXIgdGhlIG1hcHBpbmdzIHNvcnRlZCBieSB0aGUgZ2VuZXJhdGVkIGZpbGUncyBsaW5lL2NvbHVtblxyXG4gKiAgICAgICAgb3JkZXIgb3IgdGhlIG9yaWdpbmFsJ3Mgc291cmNlL2xpbmUvY29sdW1uIG9yZGVyLCByZXNwZWN0aXZlbHkuIERlZmF1bHRzIHRvXHJcbiAqICAgICAgICBgU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSYC5cclxuICovXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5lYWNoTWFwcGluZyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2VhY2hNYXBwaW5nKFxyXG4gIGFDYWxsYmFjayxcclxuICBhQ29udGV4dCxcclxuICBhT3JkZXJcclxuKSB7XHJcbiAgdmFyIGNvbnRleHQgPSBhQ29udGV4dCB8fCBudWxsO1xyXG4gIHZhciBvcmRlciA9IGFPcmRlciB8fCBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVI7XHJcblxyXG4gIHZhciBtYXBwaW5ncztcclxuICBzd2l0Y2ggKG9yZGVyKSB7XHJcbiAgICBjYXNlIFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUjpcclxuICAgICAgbWFwcGluZ3MgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5ncztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSOlxyXG4gICAgICBtYXBwaW5ncyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3M7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBvcmRlciBvZiBpdGVyYXRpb24uXCIpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNvdXJjZVJvb3QgPSB0aGlzLnNvdXJjZVJvb3Q7XHJcbiAgbWFwcGluZ3NcclxuICAgIC5tYXAoZnVuY3Rpb24obWFwcGluZykge1xyXG4gICAgICB2YXIgc291cmNlID0gbnVsbDtcclxuICAgICAgaWYgKG1hcHBpbmcuc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmF0KG1hcHBpbmcuc291cmNlKTtcclxuICAgICAgICBzb3VyY2UgPSB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgICAgZ2VuZXJhdGVkTGluZTogbWFwcGluZy5nZW5lcmF0ZWRMaW5lLFxyXG4gICAgICAgIGdlbmVyYXRlZENvbHVtbjogbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4sXHJcbiAgICAgICAgb3JpZ2luYWxMaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICBvcmlnaW5hbENvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtbixcclxuICAgICAgICBuYW1lOiBtYXBwaW5nLm5hbWUgPT0gbnVsbCA/IG51bGwgOiB0aGlzLl9uYW1lcy5hdChtYXBwaW5nLm5hbWUpXHJcbiAgICAgIH07XHJcbiAgICB9LCB0aGlzKVxyXG4gICAgLmZvckVhY2goYUNhbGxiYWNrLCBjb250ZXh0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFsbCBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxyXG4gKiBsaW5lLCBhbmQgY29sdW1uIHByb3ZpZGVkLiBJZiBubyBjb2x1bW4gaXMgcHJvdmlkZWQsIHJldHVybnMgYWxsIG1hcHBpbmdzXHJcbiAqIGNvcnJlc3BvbmRpbmcgdG8gYSBlaXRoZXIgdGhlIGxpbmUgd2UgYXJlIHNlYXJjaGluZyBmb3Igb3IgdGhlIG5leHRcclxuICogY2xvc2VzdCBsaW5lIHRoYXQgaGFzIGFueSBtYXBwaW5ncy4gT3RoZXJ3aXNlLCByZXR1cm5zIGFsbCBtYXBwaW5nc1xyXG4gKiBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBsaW5lIGFuZCBlaXRoZXIgdGhlIGNvbHVtbiB3ZSBhcmUgc2VhcmNoaW5nIGZvclxyXG4gKiBvciB0aGUgbmV4dCBjbG9zZXN0IGNvbHVtbiB0aGF0IGhhcyBhbnkgb2Zmc2V0cy5cclxuICpcclxuICogVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gc291cmNlOiBUaGUgZmlsZW5hbWUgb2YgdGhlIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IE9wdGlvbmFsLiB0aGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLlxyXG4gKiAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKlxyXG4gKiBhbmQgYW4gYXJyYXkgb2Ygb2JqZWN0cyBpcyByZXR1cm5lZCwgZWFjaCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC5cclxuICogICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICovXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgdmFyIGxpbmUgPSB1dGlsLmdldEFyZyhhQXJncywgXCJsaW5lXCIpO1xyXG5cclxuICAvLyBXaGVuIHRoZXJlIGlzIG5vIGV4YWN0IG1hdGNoLCBCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fZmluZE1hcHBpbmdcclxuICAvLyByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY2xvc2VzdCBtYXBwaW5nIGxlc3MgdGhhbiB0aGUgbmVlZGxlLiBCeVxyXG4gIC8vIHNldHRpbmcgbmVlZGxlLm9yaWdpbmFsQ29sdW1uIHRvIDAsIHdlIHRodXMgZmluZCB0aGUgbGFzdCBtYXBwaW5nIGZvclxyXG4gIC8vIHRoZSBnaXZlbiBsaW5lLCBwcm92aWRlZCBzdWNoIGEgbWFwcGluZyBleGlzdHMuXHJcbiAgdmFyIG5lZWRsZSA9IHtcclxuICAgIHNvdXJjZTogdXRpbC5nZXRBcmcoYUFyZ3MsIFwic291cmNlXCIpLFxyXG4gICAgb3JpZ2luYWxMaW5lOiBsaW5lLFxyXG4gICAgb3JpZ2luYWxDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImNvbHVtblwiLCAwKVxyXG4gIH07XHJcblxyXG4gIG5lZWRsZS5zb3VyY2UgPSB0aGlzLl9maW5kU291cmNlSW5kZXgobmVlZGxlLnNvdXJjZSk7XHJcbiAgaWYgKG5lZWRsZS5zb3VyY2UgPCAwKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBbXTtcclxuXHJcbiAgdmFyIGluZGV4ID0gdGhpcy5fZmluZE1hcHBpbmcoXHJcbiAgICBuZWVkbGUsXHJcbiAgICB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzLFxyXG4gICAgXCJvcmlnaW5hbExpbmVcIixcclxuICAgIFwib3JpZ2luYWxDb2x1bW5cIixcclxuICAgIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMsXHJcbiAgICBiaW5hcnlTZWFyY2guTEVBU1RfVVBQRVJfQk9VTkRcclxuICApO1xyXG4gIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICB2YXIgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbaW5kZXhdO1xyXG5cclxuICAgIGlmIChhQXJncy5jb2x1bW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgb3JpZ2luYWxMaW5lID0gbWFwcGluZy5vcmlnaW5hbExpbmU7XHJcblxyXG4gICAgICAvLyBJdGVyYXRlIHVudGlsIGVpdGhlciB3ZSBydW4gb3V0IG9mIG1hcHBpbmdzLCBvciB3ZSBydW4gaW50b1xyXG4gICAgICAvLyBhIG1hcHBpbmcgZm9yIGEgZGlmZmVyZW50IGxpbmUgdGhhbiB0aGUgb25lIHdlIGZvdW5kLiBTaW5jZVxyXG4gICAgICAvLyBtYXBwaW5ncyBhcmUgc29ydGVkLCB0aGlzIGlzIGd1YXJhbnRlZWQgdG8gZmluZCBhbGwgbWFwcGluZ3MgZm9yXHJcbiAgICAgIC8vIHRoZSBsaW5lIHdlIGZvdW5kLlxyXG4gICAgICB3aGlsZSAobWFwcGluZyAmJiBtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gb3JpZ2luYWxMaW5lKSB7XHJcbiAgICAgICAgbWFwcGluZ3MucHVzaCh7XHJcbiAgICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImdlbmVyYXRlZExpbmVcIiwgbnVsbCksXHJcbiAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwiZ2VuZXJhdGVkQ29sdW1uXCIsIG51bGwpLFxyXG4gICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJsYXN0R2VuZXJhdGVkQ29sdW1uXCIsIG51bGwpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzWysraW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgb3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xyXG5cclxuICAgICAgLy8gSXRlcmF0ZSB1bnRpbCBlaXRoZXIgd2UgcnVuIG91dCBvZiBtYXBwaW5ncywgb3Igd2UgcnVuIGludG9cclxuICAgICAgLy8gYSBtYXBwaW5nIGZvciBhIGRpZmZlcmVudCBsaW5lIHRoYW4gdGhlIG9uZSB3ZSB3ZXJlIHNlYXJjaGluZyBmb3IuXHJcbiAgICAgIC8vIFNpbmNlIG1hcHBpbmdzIGFyZSBzb3J0ZWQsIHRoaXMgaXMgZ3VhcmFudGVlZCB0byBmaW5kIGFsbCBtYXBwaW5ncyBmb3JcclxuICAgICAgLy8gdGhlIGxpbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IuXHJcbiAgICAgIHdoaWxlIChcclxuICAgICAgICBtYXBwaW5nICYmXHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgPT09IGxpbmUgJiZcclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uID09IG9yaWdpbmFsQ29sdW1uXHJcbiAgICAgICkge1xyXG4gICAgICAgIG1hcHBpbmdzLnB1c2goe1xyXG4gICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgXCJnZW5lcmF0ZWRMaW5lXCIsIG51bGwpLFxyXG4gICAgICAgICAgY29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImdlbmVyYXRlZENvbHVtblwiLCBudWxsKSxcclxuICAgICAgICAgIGxhc3RDb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwibGFzdEdlbmVyYXRlZENvbHVtblwiLCBudWxsKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYXBwaW5nID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1srK2luZGV4XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hcHBpbmdzO1xyXG59O1xyXG5cclxuZXhwb3J0cy5Tb3VyY2VNYXBDb25zdW1lciA9IFNvdXJjZU1hcENvbnN1bWVyO1xyXG5cclxuLyoqXHJcbiAqIEEgQmFzaWNTb3VyY2VNYXBDb25zdW1lciBpbnN0YW5jZSByZXByZXNlbnRzIGEgcGFyc2VkIHNvdXJjZSBtYXAgd2hpY2ggd2UgY2FuXHJcbiAqIHF1ZXJ5IGZvciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3JpZ2luYWwgZmlsZSBwb3NpdGlvbnMgYnkgZ2l2aW5nIGl0IGEgZmlsZVxyXG4gKiBwb3NpdGlvbiBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS5cclxuICpcclxuICogVGhlIGZpcnN0IHBhcmFtZXRlciBpcyB0aGUgcmF3IHNvdXJjZSBtYXAgKGVpdGhlciBhcyBhIEpTT04gc3RyaW5nLCBvclxyXG4gKiBhbHJlYWR5IHBhcnNlZCB0byBhbiBvYmplY3QpLiBBY2NvcmRpbmcgdG8gdGhlIHNwZWMsIHNvdXJjZSBtYXBzIGhhdmUgdGhlXHJcbiAqIGZvbGxvd2luZyBhdHRyaWJ1dGVzOlxyXG4gKlxyXG4gKiAgIC0gdmVyc2lvbjogV2hpY2ggdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcCBzcGVjIHRoaXMgbWFwIGlzIGZvbGxvd2luZy5cclxuICogICAtIHNvdXJjZXM6IEFuIGFycmF5IG9mIFVSTHMgdG8gdGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlcy5cclxuICogICAtIG5hbWVzOiBBbiBhcnJheSBvZiBpZGVudGlmaWVycyB3aGljaCBjYW4gYmUgcmVmZXJlbmNlZCBieSBpbmRpdmlkdWFsIG1hcHBpbmdzLlxyXG4gKiAgIC0gc291cmNlUm9vdDogT3B0aW9uYWwuIFRoZSBVUkwgcm9vdCBmcm9tIHdoaWNoIGFsbCBzb3VyY2VzIGFyZSByZWxhdGl2ZS5cclxuICogICAtIHNvdXJjZXNDb250ZW50OiBPcHRpb25hbC4gQW4gYXJyYXkgb2YgY29udGVudHMgb2YgdGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlcy5cclxuICogICAtIG1hcHBpbmdzOiBBIHN0cmluZyBvZiBiYXNlNjQgVkxRcyB3aGljaCBjb250YWluIHRoZSBhY3R1YWwgbWFwcGluZ3MuXHJcbiAqICAgLSBmaWxlOiBPcHRpb25hbC4gVGhlIGdlbmVyYXRlZCBmaWxlIHRoaXMgc291cmNlIG1hcCBpcyBhc3NvY2lhdGVkIHdpdGguXHJcbiAqXHJcbiAqIEhlcmUgaXMgYW4gZXhhbXBsZSBzb3VyY2UgbWFwLCB0YWtlbiBmcm9tIHRoZSBzb3VyY2UgbWFwIHNwZWNbMF06XHJcbiAqXHJcbiAqICAgICB7XHJcbiAqICAgICAgIHZlcnNpb24gOiAzLFxyXG4gKiAgICAgICBmaWxlOiBcIm91dC5qc1wiLFxyXG4gKiAgICAgICBzb3VyY2VSb290IDogXCJcIixcclxuICogICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxyXG4gKiAgICAgICBuYW1lczogW1wic3JjXCIsIFwibWFwc1wiLCBcImFyZVwiLCBcImZ1blwiXSxcclxuICogICAgICAgbWFwcGluZ3M6IFwiQUEsQUI7O0FCQ0RFO1wiXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyLCBpZiBnaXZlbiwgaXMgYSBzdHJpbmcgd2hvc2UgdmFsdWUgaXMgdGhlIFVSTFxyXG4gKiBhdCB3aGljaCB0aGUgc291cmNlIG1hcCB3YXMgZm91bmQuICBUaGlzIFVSTCBpcyB1c2VkIHRvIGNvbXB1dGUgdGhlXHJcbiAqIHNvdXJjZXMgYXJyYXkuXHJcbiAqXHJcbiAqIFswXTogaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xVTFSR0FlaFF3UnlwVVRvdkYxS1JscGlPRnplMGItXzJnYzZmQUgwS1kway9lZGl0P3BsaT0xI1xyXG4gKi9cclxuZnVuY3Rpb24gQmFzaWNTb3VyY2VNYXBDb25zdW1lcihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XHJcbiAgdmFyIHNvdXJjZU1hcCA9IGFTb3VyY2VNYXA7XHJcbiAgaWYgKHR5cGVvZiBhU291cmNlTWFwID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XHJcbiAgfVxyXG5cclxuICB2YXIgdmVyc2lvbiA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJ2ZXJzaW9uXCIpO1xyXG4gIHZhciBzb3VyY2VzID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcInNvdXJjZXNcIik7XHJcbiAgLy8gU2FzcyAzLjMgbGVhdmVzIG91dCB0aGUgJ25hbWVzJyBhcnJheSwgc28gd2UgZGV2aWF0ZSBmcm9tIHRoZSBzcGVjICh3aGljaFxyXG4gIC8vIHJlcXVpcmVzIHRoZSBhcnJheSkgdG8gcGxheSBuaWNlIGhlcmUuXHJcbiAgdmFyIG5hbWVzID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcIm5hbWVzXCIsIFtdKTtcclxuICB2YXIgc291cmNlUm9vdCA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJzb3VyY2VSb290XCIsIG51bGwpO1xyXG4gIHZhciBzb3VyY2VzQ29udGVudCA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJzb3VyY2VzQ29udGVudFwiLCBudWxsKTtcclxuICB2YXIgbWFwcGluZ3MgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwibWFwcGluZ3NcIik7XHJcbiAgdmFyIGZpbGUgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwiZmlsZVwiLCBudWxsKTtcclxuXHJcbiAgLy8gT25jZSBhZ2FpbiwgU2FzcyBkZXZpYXRlcyBmcm9tIHRoZSBzcGVjIGFuZCBzdXBwbGllcyB0aGUgdmVyc2lvbiBhcyBhXHJcbiAgLy8gc3RyaW5nIHJhdGhlciB0aGFuIGEgbnVtYmVyLCBzbyB3ZSB1c2UgbG9vc2UgZXF1YWxpdHkgY2hlY2tpbmcgaGVyZS5cclxuICBpZiAodmVyc2lvbiAhPSB0aGlzLl92ZXJzaW9uKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB2ZXJzaW9uOiBcIiArIHZlcnNpb24pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNvdXJjZVJvb3QpIHtcclxuICAgIHNvdXJjZVJvb3QgPSB1dGlsLm5vcm1hbGl6ZShzb3VyY2VSb290KTtcclxuICB9XHJcblxyXG4gIHNvdXJjZXMgPSBzb3VyY2VzXHJcbiAgICAubWFwKFN0cmluZylcclxuICAgIC8vIFNvbWUgc291cmNlIG1hcHMgcHJvZHVjZSByZWxhdGl2ZSBzb3VyY2UgcGF0aHMgbGlrZSBcIi4vZm9vLmpzXCIgaW5zdGVhZCBvZlxyXG4gICAgLy8gXCJmb28uanNcIi4gIE5vcm1hbGl6ZSB0aGVzZSBmaXJzdCBzbyB0aGF0IGZ1dHVyZSBjb21wYXJpc29ucyB3aWxsIHN1Y2NlZWQuXHJcbiAgICAvLyBTZWUgYnVnemlsLmxhLzEwOTA3NjguXHJcbiAgICAubWFwKHV0aWwubm9ybWFsaXplKVxyXG4gICAgLy8gQWx3YXlzIGVuc3VyZSB0aGF0IGFic29sdXRlIHNvdXJjZXMgYXJlIGludGVybmFsbHkgc3RvcmVkIHJlbGF0aXZlIHRvXHJcbiAgICAvLyB0aGUgc291cmNlIHJvb3QsIGlmIHRoZSBzb3VyY2Ugcm9vdCBpcyBhYnNvbHV0ZS4gTm90IGRvaW5nIHRoaXMgd291bGRcclxuICAgIC8vIGJlIHBhcnRpY3VsYXJseSBwcm9ibGVtYXRpYyB3aGVuIHRoZSBzb3VyY2Ugcm9vdCBpcyBhIHByZWZpeCBvZiB0aGVcclxuICAgIC8vIHNvdXJjZSAodmFsaWQsIGJ1dCB3aHk/PykuIFNlZSBnaXRodWIgaXNzdWUgIzE5OSBhbmQgYnVnemlsLmxhLzExODg5ODIuXHJcbiAgICAubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gc291cmNlUm9vdCAmJlxyXG4gICAgICAgIHV0aWwuaXNBYnNvbHV0ZShzb3VyY2VSb290KSAmJlxyXG4gICAgICAgIHV0aWwuaXNBYnNvbHV0ZShzb3VyY2UpXHJcbiAgICAgICAgPyB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZSlcclxuICAgICAgICA6IHNvdXJjZTtcclxuICAgIH0pO1xyXG5cclxuICAvLyBQYXNzIGB0cnVlYCBiZWxvdyB0byBhbGxvdyBkdXBsaWNhdGUgbmFtZXMgYW5kIHNvdXJjZXMuIFdoaWxlIHNvdXJjZSBtYXBzXHJcbiAgLy8gYXJlIGludGVuZGVkIHRvIGJlIGNvbXByZXNzZWQgYW5kIGRlZHVwbGljYXRlZCwgdGhlIFR5cGVTY3JpcHQgY29tcGlsZXJcclxuICAvLyBzb21ldGltZXMgZ2VuZXJhdGVzIHNvdXJjZSBtYXBzIHdpdGggZHVwbGljYXRlcyBpbiB0aGVtLiBTZWUgR2l0aHViIGlzc3VlXHJcbiAgLy8gIzcyIGFuZCBidWd6aWwubGEvODg5NDkyLlxyXG4gIHRoaXMuX25hbWVzID0gQXJyYXlTZXQuZnJvbUFycmF5KG5hbWVzLm1hcChTdHJpbmcpLCB0cnVlKTtcclxuICB0aGlzLl9zb3VyY2VzID0gQXJyYXlTZXQuZnJvbUFycmF5KHNvdXJjZXMsIHRydWUpO1xyXG5cclxuICB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMgPSB0aGlzLl9zb3VyY2VzLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24ocykge1xyXG4gICAgcmV0dXJuIHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzLCBhU291cmNlTWFwVVJMKTtcclxuICB9KTtcclxuXHJcbiAgdGhpcy5zb3VyY2VSb290ID0gc291cmNlUm9vdDtcclxuICB0aGlzLnNvdXJjZXNDb250ZW50ID0gc291cmNlc0NvbnRlbnQ7XHJcbiAgdGhpcy5fbWFwcGluZ3MgPSBtYXBwaW5ncztcclxuICB0aGlzLl9zb3VyY2VNYXBVUkwgPSBhU291cmNlTWFwVVJMO1xyXG4gIHRoaXMuZmlsZSA9IGZpbGU7XHJcbn1cclxuXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5jb25zdW1lciA9IFNvdXJjZU1hcENvbnN1bWVyO1xyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZmluZCB0aGUgaW5kZXggb2YgYSBzb3VyY2UuICBSZXR1cm5zIC0xIGlmIG5vdFxyXG4gKiBmb3VuZC5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9maW5kU291cmNlSW5kZXggPSBmdW5jdGlvbihhU291cmNlKSB7XHJcbiAgdmFyIHJlbGF0aXZlU291cmNlID0gYVNvdXJjZTtcclxuICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgIHJlbGF0aXZlU291cmNlID0gdXRpbC5yZWxhdGl2ZSh0aGlzLnNvdXJjZVJvb3QsIHJlbGF0aXZlU291cmNlKTtcclxuICB9XHJcblxyXG4gIGlmICh0aGlzLl9zb3VyY2VzLmhhcyhyZWxhdGl2ZVNvdXJjZSkpIHtcclxuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLmluZGV4T2YocmVsYXRpdmVTb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLy8gTWF5YmUgYVNvdXJjZSBpcyBhbiBhYnNvbHV0ZSBVUkwgYXMgcmV0dXJuZWQgYnkgfHNvdXJjZXN8LiAgSW5cclxuICAvLyB0aGlzIGNhc2Ugd2UgY2FuJ3Qgc2ltcGx5IHVuZG8gdGhlIHRyYW5zZm9ybS5cclxuICB2YXIgaTtcclxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5fYWJzb2x1dGVTb3VyY2VzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBpZiAodGhpcy5fYWJzb2x1dGVTb3VyY2VzW2ldID09IGFTb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgQmFzaWNTb3VyY2VNYXBDb25zdW1lciBmcm9tIGEgU291cmNlTWFwR2VuZXJhdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0gU291cmNlTWFwR2VuZXJhdG9yIGFTb3VyY2VNYXBcclxuICogICAgICAgIFRoZSBzb3VyY2UgbWFwIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cclxuICogQHBhcmFtIFN0cmluZyBhU291cmNlTWFwVVJMXHJcbiAqICAgICAgICBUaGUgVVJMIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIGNhbiBiZSBmb3VuZCAob3B0aW9uYWwpXHJcbiAqIEByZXR1cm5zIEJhc2ljU291cmNlTWFwQ29uc3VtZXJcclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcCA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2Zyb21Tb3VyY2VNYXAoXHJcbiAgYVNvdXJjZU1hcCxcclxuICBhU291cmNlTWFwVVJMXHJcbikge1xyXG4gIHZhciBzbWMgPSBPYmplY3QuY3JlYXRlKEJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlKTtcclxuXHJcbiAgdmFyIG5hbWVzID0gKHNtYy5fbmFtZXMgPSBBcnJheVNldC5mcm9tQXJyYXkoXHJcbiAgICBhU291cmNlTWFwLl9uYW1lcy50b0FycmF5KCksXHJcbiAgICB0cnVlXHJcbiAgKSk7XHJcbiAgdmFyIHNvdXJjZXMgPSAoc21jLl9zb3VyY2VzID0gQXJyYXlTZXQuZnJvbUFycmF5KFxyXG4gICAgYVNvdXJjZU1hcC5fc291cmNlcy50b0FycmF5KCksXHJcbiAgICB0cnVlXHJcbiAgKSk7XHJcbiAgc21jLnNvdXJjZVJvb3QgPSBhU291cmNlTWFwLl9zb3VyY2VSb290O1xyXG4gIHNtYy5zb3VyY2VzQ29udGVudCA9IGFTb3VyY2VNYXAuX2dlbmVyYXRlU291cmNlc0NvbnRlbnQoXHJcbiAgICBzbWMuX3NvdXJjZXMudG9BcnJheSgpLFxyXG4gICAgc21jLnNvdXJjZVJvb3RcclxuICApO1xyXG4gIHNtYy5maWxlID0gYVNvdXJjZU1hcC5fZmlsZTtcclxuICBzbWMuX3NvdXJjZU1hcFVSTCA9IGFTb3VyY2VNYXBVUkw7XHJcbiAgc21jLl9hYnNvbHV0ZVNvdXJjZXMgPSBzbWMuX3NvdXJjZXMudG9BcnJheSgpLm1hcChmdW5jdGlvbihzKSB7XHJcbiAgICByZXR1cm4gdXRpbC5jb21wdXRlU291cmNlVVJMKHNtYy5zb3VyY2VSb290LCBzLCBhU291cmNlTWFwVVJMKTtcclxuICB9KTtcclxuXHJcbiAgLy8gQmVjYXVzZSB3ZSBhcmUgbW9kaWZ5aW5nIHRoZSBlbnRyaWVzIChieSBjb252ZXJ0aW5nIHN0cmluZyBzb3VyY2VzIGFuZFxyXG4gIC8vIG5hbWVzIHRvIGluZGljZXMgaW50byB0aGUgc291cmNlcyBhbmQgbmFtZXMgQXJyYXlTZXRzKSwgd2UgaGF2ZSB0byBtYWtlXHJcbiAgLy8gYSBjb3B5IG9mIHRoZSBlbnRyeSBvciBlbHNlIGJhZCB0aGluZ3MgaGFwcGVuLiBTaGFyZWQgbXV0YWJsZSBzdGF0ZVxyXG4gIC8vIHN0cmlrZXMgYWdhaW4hIFNlZSBnaXRodWIgaXNzdWUgIzE5MS5cclxuXHJcbiAgdmFyIGdlbmVyYXRlZE1hcHBpbmdzID0gYVNvdXJjZU1hcC5fbWFwcGluZ3MudG9BcnJheSgpLnNsaWNlKCk7XHJcbiAgdmFyIGRlc3RHZW5lcmF0ZWRNYXBwaW5ncyA9IChzbWMuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IFtdKTtcclxuICB2YXIgZGVzdE9yaWdpbmFsTWFwcGluZ3MgPSAoc21jLl9fb3JpZ2luYWxNYXBwaW5ncyA9IFtdKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgc3JjTWFwcGluZyA9IGdlbmVyYXRlZE1hcHBpbmdzW2ldO1xyXG4gICAgdmFyIGRlc3RNYXBwaW5nID0gbmV3IE1hcHBpbmcoKTtcclxuICAgIGRlc3RNYXBwaW5nLmdlbmVyYXRlZExpbmUgPSBzcmNNYXBwaW5nLmdlbmVyYXRlZExpbmU7XHJcbiAgICBkZXN0TWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gPSBzcmNNYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcclxuXHJcbiAgICBpZiAoc3JjTWFwcGluZy5zb3VyY2UpIHtcclxuICAgICAgZGVzdE1hcHBpbmcuc291cmNlID0gc291cmNlcy5pbmRleE9mKHNyY01hcHBpbmcuc291cmNlKTtcclxuICAgICAgZGVzdE1hcHBpbmcub3JpZ2luYWxMaW5lID0gc3JjTWFwcGluZy5vcmlnaW5hbExpbmU7XHJcbiAgICAgIGRlc3RNYXBwaW5nLm9yaWdpbmFsQ29sdW1uID0gc3JjTWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuXHJcbiAgICAgIGlmIChzcmNNYXBwaW5nLm5hbWUpIHtcclxuICAgICAgICBkZXN0TWFwcGluZy5uYW1lID0gbmFtZXMuaW5kZXhPZihzcmNNYXBwaW5nLm5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkZXN0T3JpZ2luYWxNYXBwaW5ncy5wdXNoKGRlc3RNYXBwaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0R2VuZXJhdGVkTWFwcGluZ3MucHVzaChkZXN0TWFwcGluZyk7XHJcbiAgfVxyXG5cclxuICBxdWlja1NvcnQoc21jLl9fb3JpZ2luYWxNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyk7XHJcblxyXG4gIHJldHVybiBzbWM7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXBwaW5nIHNwZWMgdGhhdCB3ZSBhcmUgY29uc3VtaW5nLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMuXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsIFwic291cmNlc1wiLCB7XHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMuc2xpY2UoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGUgdGhlIEpJVCB3aXRoIGEgbmljZSBzaGFwZSAvIGhpZGRlbiBjbGFzcy5cclxuICovXHJcbmZ1bmN0aW9uIE1hcHBpbmcoKSB7XHJcbiAgdGhpcy5nZW5lcmF0ZWRMaW5lID0gMDtcclxuICB0aGlzLmdlbmVyYXRlZENvbHVtbiA9IDA7XHJcbiAgdGhpcy5zb3VyY2UgPSBudWxsO1xyXG4gIHRoaXMub3JpZ2luYWxMaW5lID0gbnVsbDtcclxuICB0aGlzLm9yaWdpbmFsQ29sdW1uID0gbnVsbDtcclxuICB0aGlzLm5hbWUgPSBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2UgdGhlIG1hcHBpbmdzIGluIGEgc3RyaW5nIGluIHRvIGEgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggd2UgY2FuIGVhc2lseVxyXG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcclxuICogYHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzYCBwcm9wZXJ0aWVzKS5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9wYXJzZU1hcHBpbmdzID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhcclxuICBhU3RyLFxyXG4gIGFTb3VyY2VSb290XHJcbikge1xyXG4gIHZhciBnZW5lcmF0ZWRMaW5lID0gMTtcclxuICB2YXIgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gIHZhciBwcmV2aW91c09yaWdpbmFsTGluZSA9IDA7XHJcbiAgdmFyIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSAwO1xyXG4gIHZhciBwcmV2aW91c1NvdXJjZSA9IDA7XHJcbiAgdmFyIHByZXZpb3VzTmFtZSA9IDA7XHJcbiAgdmFyIGxlbmd0aCA9IGFTdHIubGVuZ3RoO1xyXG4gIHZhciBpbmRleCA9IDA7XHJcbiAgdmFyIGNhY2hlZFNlZ21lbnRzID0ge307XHJcbiAgdmFyIHRlbXAgPSB7fTtcclxuICB2YXIgb3JpZ2luYWxNYXBwaW5ncyA9IFtdO1xyXG4gIHZhciBnZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xyXG4gIHZhciBtYXBwaW5nLCBzdHIsIHNlZ21lbnQsIGVuZCwgdmFsdWU7XHJcblxyXG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xyXG4gICAgaWYgKGFTdHIuY2hhckF0KGluZGV4KSA9PT0gXCI7XCIpIHtcclxuICAgICAgZ2VuZXJhdGVkTGluZSsrO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKGFTdHIuY2hhckF0KGluZGV4KSA9PT0gXCIsXCIpIHtcclxuICAgICAgaW5kZXgrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcHBpbmcgPSBuZXcgTWFwcGluZygpO1xyXG4gICAgICBtYXBwaW5nLmdlbmVyYXRlZExpbmUgPSBnZW5lcmF0ZWRMaW5lO1xyXG5cclxuICAgICAgLy8gQmVjYXVzZSBlYWNoIG9mZnNldCBpcyBlbmNvZGVkIHJlbGF0aXZlIHRvIHRoZSBwcmV2aW91cyBvbmUsXHJcbiAgICAgIC8vIG1hbnkgc2VnbWVudHMgb2Z0ZW4gaGF2ZSB0aGUgc2FtZSBlbmNvZGluZy4gV2UgY2FuIGV4cGxvaXQgdGhpc1xyXG4gICAgICAvLyBmYWN0IGJ5IGNhY2hpbmcgdGhlIHBhcnNlZCB2YXJpYWJsZSBsZW5ndGggZmllbGRzIG9mIGVhY2ggc2VnbWVudCxcclxuICAgICAgLy8gYWxsb3dpbmcgdXMgdG8gYXZvaWQgYSBzZWNvbmQgcGFyc2UgaWYgd2UgZW5jb3VudGVyIHRoZSBzYW1lXHJcbiAgICAgIC8vIHNlZ21lbnQgYWdhaW4uXHJcbiAgICAgIGZvciAoZW5kID0gaW5kZXg7IGVuZCA8IGxlbmd0aDsgZW5kKyspIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcklzTWFwcGluZ1NlcGFyYXRvcihhU3RyLCBlbmQpKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgc3RyID0gYVN0ci5zbGljZShpbmRleCwgZW5kKTtcclxuXHJcbiAgICAgIHNlZ21lbnQgPSBjYWNoZWRTZWdtZW50c1tzdHJdO1xyXG4gICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgIGluZGV4ICs9IHN0ci5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VnbWVudCA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IGVuZCkge1xyXG4gICAgICAgICAgYmFzZTY0VkxRLmRlY29kZShhU3RyLCBpbmRleCwgdGVtcCk7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRlbXAudmFsdWU7XHJcbiAgICAgICAgICBpbmRleCA9IHRlbXAucmVzdDtcclxuICAgICAgICAgIHNlZ21lbnQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvdW5kIGEgc291cmNlLCBidXQgbm8gbGluZSBhbmQgY29sdW1uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3VuZCBhIHNvdXJjZSBhbmQgbGluZSwgYnV0IG5vIGNvbHVtblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhY2hlZFNlZ21lbnRzW3N0cl0gPSBzZWdtZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHZW5lcmF0ZWQgY29sdW1uLlxyXG4gICAgICBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA9IHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uICsgc2VnbWVudFswXTtcclxuICAgICAgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcclxuXHJcbiAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAvLyBPcmlnaW5hbCBzb3VyY2UuXHJcbiAgICAgICAgbWFwcGluZy5zb3VyY2UgPSBwcmV2aW91c1NvdXJjZSArIHNlZ21lbnRbMV07XHJcbiAgICAgICAgcHJldmlvdXNTb3VyY2UgKz0gc2VnbWVudFsxXTtcclxuXHJcbiAgICAgICAgLy8gT3JpZ2luYWwgbGluZS5cclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSA9IHByZXZpb3VzT3JpZ2luYWxMaW5lICsgc2VnbWVudFsyXTtcclxuICAgICAgICBwcmV2aW91c09yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xyXG4gICAgICAgIC8vIExpbmVzIGFyZSBzdG9yZWQgMC1iYXNlZFxyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lICs9IDE7XHJcblxyXG4gICAgICAgIC8vIE9yaWdpbmFsIGNvbHVtbi5cclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uID0gcHJldmlvdXNPcmlnaW5hbENvbHVtbiArIHNlZ21lbnRbM107XHJcbiAgICAgICAgcHJldmlvdXNPcmlnaW5hbENvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgIC8vIE9yaWdpbmFsIG5hbWUuXHJcbiAgICAgICAgICBtYXBwaW5nLm5hbWUgPSBwcmV2aW91c05hbWUgKyBzZWdtZW50WzRdO1xyXG4gICAgICAgICAgcHJldmlvdXNOYW1lICs9IHNlZ21lbnRbNF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKG1hcHBpbmcpO1xyXG4gICAgICBpZiAodHlwZW9mIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgb3JpZ2luYWxNYXBwaW5ncy5wdXNoKG1hcHBpbmcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZCA9IGdlbmVyYXRlZE1hcHBpbmdzO1xyXG5cclxuICB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkID0gb3JpZ2luYWxNYXBwaW5ncztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaW5kIHRoZSBtYXBwaW5nIHRoYXQgYmVzdCBtYXRjaGVzIHRoZSBoeXBvdGhldGljYWwgXCJuZWVkbGVcIiBtYXBwaW5nIHRoYXRcclxuICogd2UgYXJlIHNlYXJjaGluZyBmb3IgaW4gdGhlIGdpdmVuIFwiaGF5c3RhY2tcIiBvZiBtYXBwaW5ncy5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9maW5kTWFwcGluZyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2ZpbmRNYXBwaW5nKFxyXG4gIGFOZWVkbGUsXHJcbiAgYU1hcHBpbmdzLFxyXG4gIGFMaW5lTmFtZSxcclxuICBhQ29sdW1uTmFtZSxcclxuICBhQ29tcGFyYXRvcixcclxuICBhQmlhc1xyXG4pIHtcclxuICAvLyBUbyByZXR1cm4gdGhlIHBvc2l0aW9uIHdlIGFyZSBzZWFyY2hpbmcgZm9yLCB3ZSBtdXN0IGZpcnN0IGZpbmQgdGhlXHJcbiAgLy8gbWFwcGluZyBmb3IgdGhlIGdpdmVuIHBvc2l0aW9uIGFuZCB0aGVuIHJldHVybiB0aGUgb3Bwb3NpdGUgcG9zaXRpb24gaXRcclxuICAvLyBwb2ludHMgdG8uIEJlY2F1c2UgdGhlIG1hcHBpbmdzIGFyZSBzb3J0ZWQsIHdlIGNhbiB1c2UgYmluYXJ5IHNlYXJjaCB0b1xyXG4gIC8vIGZpbmQgdGhlIGJlc3QgbWFwcGluZy5cclxuXHJcbiAgaWYgKGFOZWVkbGVbYUxpbmVOYW1lXSA8PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBcIkxpbmUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMSwgZ290IFwiICsgYU5lZWRsZVthTGluZU5hbWVdXHJcbiAgICApO1xyXG4gIH1cclxuICBpZiAoYU5lZWRsZVthQ29sdW1uTmFtZV0gPCAwKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBcIkNvbHVtbiBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLCBnb3QgXCIgKyBhTmVlZGxlW2FDb2x1bW5OYW1lXVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBiaW5hcnlTZWFyY2guc2VhcmNoKGFOZWVkbGUsIGFNYXBwaW5ncywgYUNvbXBhcmF0b3IsIGFCaWFzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHRoZSBsYXN0IGNvbHVtbiBmb3IgZWFjaCBnZW5lcmF0ZWQgbWFwcGluZy4gVGhlIGxhc3QgY29sdW1uIGlzXHJcbiAqIGluY2x1c2l2ZS5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmNvbXB1dGVDb2x1bW5TcGFucyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2NvbXB1dGVDb2x1bW5TcGFucygpIHtcclxuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3MubGVuZ3RoOyArK2luZGV4KSB7XHJcbiAgICB2YXIgbWFwcGluZyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzW2luZGV4XTtcclxuXHJcbiAgICAvLyBNYXBwaW5ncyBkbyBub3QgY29udGFpbiBhIGZpZWxkIGZvciB0aGUgbGFzdCBnZW5lcmF0ZWQgY29sdW1udC4gV2VcclxuICAgIC8vIGNhbiBjb21lIHVwIHdpdGggYW4gb3B0aW1pc3RpYyBlc3RpbWF0ZSwgaG93ZXZlciwgYnkgYXNzdW1pbmcgdGhhdFxyXG4gICAgLy8gbWFwcGluZ3MgYXJlIGNvbnRpZ3VvdXMgKGkuZS4gZ2l2ZW4gdHdvIGNvbnNlY3V0aXZlIG1hcHBpbmdzLCB0aGVcclxuICAgIC8vIGZpcnN0IG1hcHBpbmcgZW5kcyB3aGVyZSB0aGUgc2Vjb25kIG9uZSBzdGFydHMpLlxyXG4gICAgaWYgKGluZGV4ICsgMSA8IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aCkge1xyXG4gICAgICB2YXIgbmV4dE1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleCArIDFdO1xyXG5cclxuICAgICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9PT0gbmV4dE1hcHBpbmcuZ2VuZXJhdGVkTGluZSkge1xyXG4gICAgICAgIG1hcHBpbmcubGFzdEdlbmVyYXRlZENvbHVtbiA9IG5leHRNYXBwaW5nLmdlbmVyYXRlZENvbHVtbiAtIDE7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgbGFzdCBtYXBwaW5nIGZvciBlYWNoIGxpbmUgc3BhbnMgdGhlIGVudGlyZSBsaW5lLlxyXG4gICAgbWFwcGluZy5sYXN0R2VuZXJhdGVkQ29sdW1uID0gSW5maW5pdHk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG9yaWdpbmFsIHNvdXJjZSwgbGluZSwgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIGdlbmVyYXRlZFxyXG4gKiBzb3VyY2UncyBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3RcclxuICogd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcclxuICogICAgIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLiAgVGhlIGNvbHVtblxyXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqICAgLSBiaWFzOiBFaXRoZXIgJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxyXG4gKiAgICAgJ1NvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxyXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxyXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXHJcbiAqICAgICBEZWZhdWx0cyB0byAnU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQnLlxyXG4gKlxyXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUsIG9yIG51bGwuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKiAgIC0gbmFtZTogVGhlIG9yaWdpbmFsIGlkZW50aWZpZXIsIG9yIG51bGwuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5vcmlnaW5hbFBvc2l0aW9uRm9yID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfb3JpZ2luYWxQb3NpdGlvbkZvcihcclxuICBhQXJnc1xyXG4pIHtcclxuICB2YXIgbmVlZGxlID0ge1xyXG4gICAgZ2VuZXJhdGVkTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsIFwibGluZVwiKSxcclxuICAgIGdlbmVyYXRlZENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsIFwiY29sdW1uXCIpXHJcbiAgfTtcclxuXHJcbiAgdmFyIGluZGV4ID0gdGhpcy5fZmluZE1hcHBpbmcoXHJcbiAgICBuZWVkbGUsXHJcbiAgICB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5ncyxcclxuICAgIFwiZ2VuZXJhdGVkTGluZVwiLFxyXG4gICAgXCJnZW5lcmF0ZWRDb2x1bW5cIixcclxuICAgIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQsXHJcbiAgICB1dGlsLmdldEFyZyhhQXJncywgXCJiaWFzXCIsIFNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EKVxyXG4gICk7XHJcblxyXG4gIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICB2YXIgbWFwcGluZyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzW2luZGV4XTtcclxuXHJcbiAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lID09PSBuZWVkbGUuZ2VuZXJhdGVkTGluZSkge1xyXG4gICAgICB2YXIgc291cmNlID0gdXRpbC5nZXRBcmcobWFwcGluZywgXCJzb3VyY2VcIiwgbnVsbCk7XHJcbiAgICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZSA9IHRoaXMuX3NvdXJjZXMuYXQoc291cmNlKTtcclxuICAgICAgICBzb3VyY2UgPSB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoXHJcbiAgICAgICAgICB0aGlzLnNvdXJjZVJvb3QsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICB0aGlzLl9zb3VyY2VNYXBVUkxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBuYW1lID0gdXRpbC5nZXRBcmcobWFwcGluZywgXCJuYW1lXCIsIG51bGwpO1xyXG4gICAgICBpZiAobmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgbmFtZSA9IHRoaXMuX25hbWVzLmF0KG5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgXCJvcmlnaW5hbExpbmVcIiwgbnVsbCksXHJcbiAgICAgICAgY29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcIm9yaWdpbmFsQ29sdW1uXCIsIG51bGwpLFxyXG4gICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzb3VyY2U6IG51bGwsXHJcbiAgICBsaW5lOiBudWxsLFxyXG4gICAgY29sdW1uOiBudWxsLFxyXG4gICAgbmFtZTogbnVsbFxyXG4gIH07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgd2UgaGF2ZSB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGV2ZXJ5IHNvdXJjZSBpbiB0aGUgc291cmNlXHJcbiAqIG1hcCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuaGFzQ29udGVudHNPZkFsbFNvdXJjZXMgPSBmdW5jdGlvbiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyX2hhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCkge1xyXG4gIGlmICghdGhpcy5zb3VyY2VzQ29udGVudCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgdGhpcy5zb3VyY2VzQ29udGVudC5sZW5ndGggPj0gdGhpcy5fc291cmNlcy5zaXplKCkgJiZcclxuICAgICF0aGlzLnNvdXJjZXNDb250ZW50LnNvbWUoZnVuY3Rpb24oc2MpIHtcclxuICAgICAgcmV0dXJuIHNjID09IG51bGw7XHJcbiAgICB9KVxyXG4gICk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIHRoZSB1cmwgb2YgdGhlXHJcbiAqIG9yaWdpbmFsIHNvdXJjZSBmaWxlLiBSZXR1cm5zIG51bGwgaWYgbm8gb3JpZ2luYWwgc291cmNlIGNvbnRlbnQgaXNcclxuICogYXZhaWxhYmxlLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvciA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3NvdXJjZUNvbnRlbnRGb3IoXHJcbiAgYVNvdXJjZSxcclxuICBudWxsT25NaXNzaW5nXHJcbikge1xyXG4gIGlmICghdGhpcy5zb3VyY2VzQ29udGVudCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICB2YXIgaW5kZXggPSB0aGlzLl9maW5kU291cmNlSW5kZXgoYVNvdXJjZSk7XHJcbiAgaWYgKGluZGV4ID49IDApIHtcclxuICAgIHJldHVybiB0aGlzLnNvdXJjZXNDb250ZW50W2luZGV4XTtcclxuICB9XHJcblxyXG4gIHZhciByZWxhdGl2ZVNvdXJjZSA9IGFTb3VyY2U7XHJcbiAgaWYgKHRoaXMuc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICByZWxhdGl2ZVNvdXJjZSA9IHV0aWwucmVsYXRpdmUodGhpcy5zb3VyY2VSb290LCByZWxhdGl2ZVNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICB2YXIgdXJsO1xyXG4gIGlmICh0aGlzLnNvdXJjZVJvb3QgIT0gbnVsbCAmJiAodXJsID0gdXRpbC51cmxQYXJzZSh0aGlzLnNvdXJjZVJvb3QpKSkge1xyXG4gICAgLy8gWFhYOiBmaWxlOi8vIFVSSXMgYW5kIGFic29sdXRlIHBhdGhzIGxlYWQgdG8gdW5leHBlY3RlZCBiZWhhdmlvciBmb3JcclxuICAgIC8vIG1hbnkgdXNlcnMuIFdlIGNhbiBoZWxwIHRoZW0gb3V0IHdoZW4gdGhleSBleHBlY3QgZmlsZTovLyBVUklzIHRvXHJcbiAgICAvLyBiZWhhdmUgbGlrZSBpdCB3b3VsZCBpZiB0aGV5IHdlcmUgcnVubmluZyBhIGxvY2FsIEhUVFAgc2VydmVyLiBTZWVcclxuICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTg4NTU5Ny5cclxuICAgIHZhciBmaWxlVXJpQWJzUGF0aCA9IHJlbGF0aXZlU291cmNlLnJlcGxhY2UoL15maWxlOlxcL1xcLy8sIFwiXCIpO1xyXG4gICAgaWYgKHVybC5zY2hlbWUgPT0gXCJmaWxlXCIgJiYgdGhpcy5fc291cmNlcy5oYXMoZmlsZVVyaUFic1BhdGgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZXNDb250ZW50W3RoaXMuX3NvdXJjZXMuaW5kZXhPZihmaWxlVXJpQWJzUGF0aCldO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKCF1cmwucGF0aCB8fCB1cmwucGF0aCA9PSBcIi9cIikgJiZcclxuICAgICAgdGhpcy5fc291cmNlcy5oYXMoXCIvXCIgKyByZWxhdGl2ZVNvdXJjZSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFt0aGlzLl9zb3VyY2VzLmluZGV4T2YoXCIvXCIgKyByZWxhdGl2ZVNvdXJjZSldO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHJlY3Vyc2l2ZWx5IGZyb21cclxuICAvLyBJbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLnNvdXJjZUNvbnRlbnRGb3IuIEluIHRoYXQgY2FzZSwgd2VcclxuICAvLyBkb24ndCB3YW50IHRvIHRocm93IGlmIHdlIGNhbid0IGZpbmQgdGhlIHNvdXJjZSAtIHdlIGp1c3Qgd2FudCB0b1xyXG4gIC8vIHJldHVybiBudWxsLCBzbyB3ZSBwcm92aWRlIGEgZmxhZyB0byBleGl0IGdyYWNlZnVsbHkuXHJcbiAgaWYgKG51bGxPbk1pc3NpbmcpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIHJlbGF0aXZlU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxyXG4gKiBsaW5lLCBhbmQgY29sdW1uIHBvc2l0aW9ucyBwcm92aWRlZC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0IHdpdGhcclxuICogdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gc291cmNlOiBUaGUgZmlsZW5hbWUgb2YgdGhlIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyXHJcbiAqICAgICBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGNvbHVtblxyXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqICAgLSBiaWFzOiBFaXRoZXIgJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxyXG4gKiAgICAgJ1NvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxyXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxyXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXHJcbiAqICAgICBEZWZhdWx0cyB0byAnU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQnLlxyXG4gKlxyXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC5cclxuICogICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5nZW5lcmF0ZWRQb3NpdGlvbkZvciA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2dlbmVyYXRlZFBvc2l0aW9uRm9yKFxyXG4gIGFBcmdzXHJcbikge1xyXG4gIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhhQXJncywgXCJzb3VyY2VcIik7XHJcbiAgc291cmNlID0gdGhpcy5fZmluZFNvdXJjZUluZGV4KHNvdXJjZSk7XHJcbiAgaWYgKHNvdXJjZSA8IDApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxpbmU6IG51bGwsXHJcbiAgICAgIGNvbHVtbjogbnVsbCxcclxuICAgICAgbGFzdENvbHVtbjogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHZhciBuZWVkbGUgPSB7XHJcbiAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgIG9yaWdpbmFsTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsIFwibGluZVwiKSxcclxuICAgIG9yaWdpbmFsQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgXCJjb2x1bW5cIilcclxuICB9O1xyXG5cclxuICB2YXIgaW5kZXggPSB0aGlzLl9maW5kTWFwcGluZyhcclxuICAgIG5lZWRsZSxcclxuICAgIHRoaXMuX29yaWdpbmFsTWFwcGluZ3MsXHJcbiAgICBcIm9yaWdpbmFsTGluZVwiLFxyXG4gICAgXCJvcmlnaW5hbENvbHVtblwiLFxyXG4gICAgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyxcclxuICAgIHV0aWwuZ2V0QXJnKGFBcmdzLCBcImJpYXNcIiwgU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQpXHJcbiAgKTtcclxuXHJcbiAgaWYgKGluZGV4ID49IDApIHtcclxuICAgIHZhciBtYXBwaW5nID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1tpbmRleF07XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlID09PSBuZWVkbGUuc291cmNlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgXCJnZW5lcmF0ZWRMaW5lXCIsIG51bGwpLFxyXG4gICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJnZW5lcmF0ZWRDb2x1bW5cIiwgbnVsbCksXHJcbiAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJsYXN0R2VuZXJhdGVkQ29sdW1uXCIsIG51bGwpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGluZTogbnVsbCxcclxuICAgIGNvbHVtbjogbnVsbCxcclxuICAgIGxhc3RDb2x1bW46IG51bGxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0cy5CYXNpY1NvdXJjZU1hcENvbnN1bWVyID0gQmFzaWNTb3VyY2VNYXBDb25zdW1lcjtcclxuXHJcbi8qKlxyXG4gKiBBbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXIgaW5zdGFuY2UgcmVwcmVzZW50cyBhIHBhcnNlZCBzb3VyY2UgbWFwIHdoaWNoXHJcbiAqIHdlIGNhbiBxdWVyeSBmb3IgaW5mb3JtYXRpb24uIEl0IGRpZmZlcnMgZnJvbSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyIGluXHJcbiAqIHRoYXQgaXQgdGFrZXMgXCJpbmRleGVkXCIgc291cmNlIG1hcHMgKGkuZS4gb25lcyB3aXRoIGEgXCJzZWN0aW9uc1wiIGZpZWxkKSBhc1xyXG4gKiBpbnB1dC5cclxuICpcclxuICogVGhlIGZpcnN0IHBhcmFtZXRlciBpcyBhIHJhdyBzb3VyY2UgbWFwIChlaXRoZXIgYXMgYSBKU09OIHN0cmluZywgb3IgYWxyZWFkeVxyXG4gKiBwYXJzZWQgdG8gYW4gb2JqZWN0KS4gQWNjb3JkaW5nIHRvIHRoZSBzcGVjIGZvciBpbmRleGVkIHNvdXJjZSBtYXBzLCB0aGV5XHJcbiAqIGhhdmUgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzOlxyXG4gKlxyXG4gKiAgIC0gdmVyc2lvbjogV2hpY2ggdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcCBzcGVjIHRoaXMgbWFwIGlzIGZvbGxvd2luZy5cclxuICogICAtIGZpbGU6IE9wdGlvbmFsLiBUaGUgZ2VuZXJhdGVkIGZpbGUgdGhpcyBzb3VyY2UgbWFwIGlzIGFzc29jaWF0ZWQgd2l0aC5cclxuICogICAtIHNlY3Rpb25zOiBBIGxpc3Qgb2Ygc2VjdGlvbiBkZWZpbml0aW9ucy5cclxuICpcclxuICogRWFjaCB2YWx1ZSB1bmRlciB0aGUgXCJzZWN0aW9uc1wiIGZpZWxkIGhhcyB0d28gZmllbGRzOlxyXG4gKiAgIC0gb2Zmc2V0OiBUaGUgb2Zmc2V0IGludG8gdGhlIG9yaWdpbmFsIHNwZWNpZmllZCBhdCB3aGljaCB0aGlzIHNlY3Rpb25cclxuICogICAgICAgYmVnaW5zIHRvIGFwcGx5LCBkZWZpbmVkIGFzIGFuIG9iamVjdCB3aXRoIGEgXCJsaW5lXCIgYW5kIFwiY29sdW1uXCJcclxuICogICAgICAgZmllbGQuXHJcbiAqICAgLSBtYXA6IEEgc291cmNlIG1hcCBkZWZpbml0aW9uLiBUaGlzIHNvdXJjZSBtYXAgY291bGQgYWxzbyBiZSBpbmRleGVkLFxyXG4gKiAgICAgICBidXQgZG9lc24ndCBoYXZlIHRvIGJlLlxyXG4gKlxyXG4gKiBJbnN0ZWFkIG9mIHRoZSBcIm1hcFwiIGZpZWxkLCBpdCdzIGFsc28gcG9zc2libGUgdG8gaGF2ZSBhIFwidXJsXCIgZmllbGRcclxuICogc3BlY2lmeWluZyBhIFVSTCB0byByZXRyaWV2ZSBhIHNvdXJjZSBtYXAgZnJvbSwgYnV0IHRoYXQncyBjdXJyZW50bHlcclxuICogdW5zdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEhlcmUncyBhbiBleGFtcGxlIHNvdXJjZSBtYXAsIHRha2VuIGZyb20gdGhlIHNvdXJjZSBtYXAgc3BlY1swXSwgYnV0XHJcbiAqIG1vZGlmaWVkIHRvIG9taXQgYSBzZWN0aW9uIHdoaWNoIHVzZXMgdGhlIFwidXJsXCIgZmllbGQuXHJcbiAqXHJcbiAqICB7XHJcbiAqICAgIHZlcnNpb24gOiAzLFxyXG4gKiAgICBmaWxlOiBcImFwcC5qc1wiLFxyXG4gKiAgICBzZWN0aW9uczogW3tcclxuICogICAgICBvZmZzZXQ6IHtsaW5lOjEwMCwgY29sdW1uOjEwfSxcclxuICogICAgICBtYXA6IHtcclxuICogICAgICAgIHZlcnNpb24gOiAzLFxyXG4gKiAgICAgICAgZmlsZTogXCJzZWN0aW9uLmpzXCIsXHJcbiAqICAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIiwgXCJiYXIuanNcIl0sXHJcbiAqICAgICAgICBuYW1lczogW1wic3JjXCIsIFwibWFwc1wiLCBcImFyZVwiLCBcImZ1blwiXSxcclxuICogICAgICAgIG1hcHBpbmdzOiBcIkFBQUEsRTs7QUJDREU7XCJcclxuICogICAgICB9XHJcbiAqICAgIH1dLFxyXG4gKiAgfVxyXG4gKlxyXG4gKiBUaGUgc2Vjb25kIHBhcmFtZXRlciwgaWYgZ2l2ZW4sIGlzIGEgc3RyaW5nIHdob3NlIHZhbHVlIGlzIHRoZSBVUkxcclxuICogYXQgd2hpY2ggdGhlIHNvdXJjZSBtYXAgd2FzIGZvdW5kLiAgVGhpcyBVUkwgaXMgdXNlZCB0byBjb21wdXRlIHRoZVxyXG4gKiBzb3VyY2VzIGFycmF5LlxyXG4gKlxyXG4gKiBbMF06IGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMVUxUkdBZWhRd1J5cFVUb3ZGMUtSbHBpT0Z6ZTBiLV8yZ2M2ZkFIMEtZMGsvZWRpdCNoZWFkaW5nPWguNTM1ZXMzeGVwcmd0XHJcbiAqL1xyXG5mdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXIoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCkge1xyXG4gIHZhciBzb3VyY2VNYXAgPSBhU291cmNlTWFwO1xyXG4gIGlmICh0eXBlb2YgYVNvdXJjZU1hcCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgc291cmNlTWFwID0gdXRpbC5wYXJzZVNvdXJjZU1hcElucHV0KGFTb3VyY2VNYXApO1xyXG4gIH1cclxuXHJcbiAgdmFyIHZlcnNpb24gPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwidmVyc2lvblwiKTtcclxuICB2YXIgc2VjdGlvbnMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwic2VjdGlvbnNcIik7XHJcblxyXG4gIGlmICh2ZXJzaW9uICE9IHRoaXMuX3ZlcnNpb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHZlcnNpb246IFwiICsgdmVyc2lvbik7XHJcbiAgfVxyXG5cclxuICB0aGlzLl9zb3VyY2VzID0gbmV3IEFycmF5U2V0KCk7XHJcbiAgdGhpcy5fbmFtZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuXHJcbiAgdmFyIGxhc3RPZmZzZXQgPSB7XHJcbiAgICBsaW5lOiAtMSxcclxuICAgIGNvbHVtbjogMFxyXG4gIH07XHJcbiAgdGhpcy5fc2VjdGlvbnMgPSBzZWN0aW9ucy5tYXAoZnVuY3Rpb24ocykge1xyXG4gICAgaWYgKHMudXJsKSB7XHJcbiAgICAgIC8vIFRoZSB1cmwgZmllbGQgd2lsbCByZXF1aXJlIHN1cHBvcnQgZm9yIGFzeW5jaHJvbmljaXR5LlxyXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9pc3N1ZXMvMTZcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3VwcG9ydCBmb3IgdXJsIGZpZWxkIGluIHNlY3Rpb25zIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcbiAgICB2YXIgb2Zmc2V0ID0gdXRpbC5nZXRBcmcocywgXCJvZmZzZXRcIik7XHJcbiAgICB2YXIgb2Zmc2V0TGluZSA9IHV0aWwuZ2V0QXJnKG9mZnNldCwgXCJsaW5lXCIpO1xyXG4gICAgdmFyIG9mZnNldENvbHVtbiA9IHV0aWwuZ2V0QXJnKG9mZnNldCwgXCJjb2x1bW5cIik7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvZmZzZXRMaW5lIDwgbGFzdE9mZnNldC5saW5lIHx8XHJcbiAgICAgIChvZmZzZXRMaW5lID09PSBsYXN0T2Zmc2V0LmxpbmUgJiYgb2Zmc2V0Q29sdW1uIDwgbGFzdE9mZnNldC5jb2x1bW4pXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VjdGlvbiBvZmZzZXRzIG11c3QgYmUgb3JkZXJlZCBhbmQgbm9uLW92ZXJsYXBwaW5nLlwiKTtcclxuICAgIH1cclxuICAgIGxhc3RPZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZ2VuZXJhdGVkT2Zmc2V0OiB7XHJcbiAgICAgICAgLy8gVGhlIG9mZnNldCBmaWVsZHMgYXJlIDAtYmFzZWQsIGJ1dCB3ZSB1c2UgMS1iYXNlZCBpbmRpY2VzIHdoZW5cclxuICAgICAgICAvLyBlbmNvZGluZy9kZWNvZGluZyBmcm9tIFZMUS5cclxuICAgICAgICBnZW5lcmF0ZWRMaW5lOiBvZmZzZXRMaW5lICsgMSxcclxuICAgICAgICBnZW5lcmF0ZWRDb2x1bW46IG9mZnNldENvbHVtbiArIDFcclxuICAgICAgfSxcclxuICAgICAgY29uc3VtZXI6IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmdldEFyZyhzLCBcIm1hcFwiKSwgYVNvdXJjZU1hcFVSTClcclxuICAgIH07XHJcbiAgfSk7XHJcbn1cclxuXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSk7XHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTb3VyY2VNYXBDb25zdW1lcjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcHBpbmcgc3BlYyB0aGF0IHdlIGFyZSBjb25zdW1pbmcuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl92ZXJzaW9uID0gMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgbGlzdCBvZiBvcmlnaW5hbCBzb3VyY2VzLlxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsIFwic291cmNlc1wiLCB7XHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzb3VyY2VzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fc2VjdGlvbnNbaV0uY29uc3VtZXIuc291cmNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHNvdXJjZXMucHVzaCh0aGlzLl9zZWN0aW9uc1tpXS5jb25zdW1lci5zb3VyY2VzW2pdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvdXJjZXM7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UsIGxpbmUsIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBnZW5lcmF0ZWRcclxuICogc291cmNlJ3MgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucyBwcm92aWRlZC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0XHJcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyXHJcbiAqICAgICBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKlxyXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUsIG9yIG51bGwuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKiAgIC0gbmFtZTogVGhlIG9yaWdpbmFsIGlkZW50aWZpZXIsIG9yIG51bGwuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLm9yaWdpbmFsUG9zaXRpb25Gb3IgPSBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfb3JpZ2luYWxQb3NpdGlvbkZvcihcclxuICBhQXJnc1xyXG4pIHtcclxuICB2YXIgbmVlZGxlID0ge1xyXG4gICAgZ2VuZXJhdGVkTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsIFwibGluZVwiKSxcclxuICAgIGdlbmVyYXRlZENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsIFwiY29sdW1uXCIpXHJcbiAgfTtcclxuXHJcbiAgLy8gRmluZCB0aGUgc2VjdGlvbiBjb250YWluaW5nIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24gd2UncmUgdHJ5aW5nIHRvIG1hcFxyXG4gIC8vIHRvIGFuIG9yaWdpbmFsIHBvc2l0aW9uLlxyXG4gIHZhciBzZWN0aW9uSW5kZXggPSBiaW5hcnlTZWFyY2guc2VhcmNoKG5lZWRsZSwgdGhpcy5fc2VjdGlvbnMsIGZ1bmN0aW9uKFxyXG4gICAgbmVlZGxlLFxyXG4gICAgc2VjdGlvblxyXG4gICkge1xyXG4gICAgdmFyIGNtcCA9IG5lZWRsZS5nZW5lcmF0ZWRMaW5lIC0gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZTtcclxuICAgIGlmIChjbXApIHtcclxuICAgICAgcmV0dXJuIGNtcDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVlZGxlLmdlbmVyYXRlZENvbHVtbiArIDEgLSBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgfSk7XHJcbiAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tzZWN0aW9uSW5kZXhdO1xyXG5cclxuICBpZiAoIXNlY3Rpb24pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogbnVsbCxcclxuICAgICAgbGluZTogbnVsbCxcclxuICAgICAgY29sdW1uOiBudWxsLFxyXG4gICAgICBuYW1lOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNlY3Rpb24uY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiBuZWVkbGUuZ2VuZXJhdGVkTGluZSAtIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lIC0gMSksXHJcbiAgICBjb2x1bW46XHJcbiAgICAgIG5lZWRsZS5nZW5lcmF0ZWRDb2x1bW4gLVxyXG4gICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSA9PT0gbmVlZGxlLmdlbmVyYXRlZExpbmVcclxuICAgICAgICA/IHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbiAtIDFcclxuICAgICAgICA6IDApLFxyXG4gICAgYmlhczogYUFyZ3MuYmlhc1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIHdlIGhhdmUgdGhlIHNvdXJjZSBjb250ZW50IGZvciBldmVyeSBzb3VyY2UgaW4gdGhlIHNvdXJjZVxyXG4gKiBtYXAsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuaGFzQ29udGVudHNPZkFsbFNvdXJjZXMgPSBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKSB7XHJcbiAgcmV0dXJuIHRoaXMuX3NlY3Rpb25zLmV2ZXJ5KGZ1bmN0aW9uKHMpIHtcclxuICAgIHJldHVybiBzLmNvbnN1bWVyLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIHRoZSB1cmwgb2YgdGhlXHJcbiAqIG9yaWdpbmFsIHNvdXJjZSBmaWxlLiBSZXR1cm5zIG51bGwgaWYgbm8gb3JpZ2luYWwgc291cmNlIGNvbnRlbnQgaXNcclxuICogYXZhaWxhYmxlLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5zb3VyY2VDb250ZW50Rm9yID0gZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX3NvdXJjZUNvbnRlbnRGb3IoXHJcbiAgYVNvdXJjZSxcclxuICBudWxsT25NaXNzaW5nXHJcbikge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbaV07XHJcblxyXG4gICAgdmFyIGNvbnRlbnQgPSBzZWN0aW9uLmNvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3IoYVNvdXJjZSwgdHJ1ZSk7XHJcbiAgICBpZiAoY29udGVudCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKG51bGxPbk1pc3NpbmcpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFTb3VyY2UgKyAnXCIgaXMgbm90IGluIHRoZSBTb3VyY2VNYXAuJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBvcmlnaW5hbCBzb3VyY2UsXHJcbiAqIGxpbmUsIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3Qgd2l0aFxyXG4gKiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBmaWxlbmFtZSBvZiB0aGUgb3JpZ2luYWwgc291cmNlLlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcclxuICogICAgIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgY29sdW1uXHJcbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cclxuICpcclxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXHJcbiAqICAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5nZW5lcmF0ZWRQb3NpdGlvbkZvciA9IGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9nZW5lcmF0ZWRQb3NpdGlvbkZvcihcclxuICBhQXJnc1xyXG4pIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xyXG5cclxuICAgIC8vIE9ubHkgY29uc2lkZXIgdGhpcyBzZWN0aW9uIGlmIHRoZSByZXF1ZXN0ZWQgc291cmNlIGlzIGluIHRoZSBsaXN0IG9mXHJcbiAgICAvLyBzb3VyY2VzIG9mIHRoZSBjb25zdW1lci5cclxuICAgIGlmIChcclxuICAgICAgc2VjdGlvbi5jb25zdW1lci5fZmluZFNvdXJjZUluZGV4KHV0aWwuZ2V0QXJnKGFBcmdzLCBcInNvdXJjZVwiKSkgPT09IC0xXHJcbiAgICApIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICB2YXIgZ2VuZXJhdGVkUG9zaXRpb24gPSBzZWN0aW9uLmNvbnN1bWVyLmdlbmVyYXRlZFBvc2l0aW9uRm9yKGFBcmdzKTtcclxuICAgIGlmIChnZW5lcmF0ZWRQb3NpdGlvbikge1xyXG4gICAgICB2YXIgcmV0ID0ge1xyXG4gICAgICAgIGxpbmU6XHJcbiAgICAgICAgICBnZW5lcmF0ZWRQb3NpdGlvbi5saW5lICsgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgLSAxKSxcclxuICAgICAgICBjb2x1bW46XHJcbiAgICAgICAgICBnZW5lcmF0ZWRQb3NpdGlvbi5jb2x1bW4gK1xyXG4gICAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IGdlbmVyYXRlZFBvc2l0aW9uLmxpbmVcclxuICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXHJcbiAgICAgICAgICAgIDogMClcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBsaW5lOiBudWxsLFxyXG4gICAgY29sdW1uOiBudWxsXHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XHJcbiAqIHF1ZXJ5ICh0aGUgb3JkZXJlZCBhcnJheXMgaW4gdGhlIGB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZFxyXG4gKiBgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3NgIHByb3BlcnRpZXMpLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fcGFyc2VNYXBwaW5ncyA9IGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9wYXJzZU1hcHBpbmdzKFxyXG4gIGFTdHIsXHJcbiAgYVNvdXJjZVJvb3RcclxuKSB7XHJcbiAgY29uc3QgZ2VuZXJhdGVkTWFwcGluZ3MgPSAodGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWQgPSBbXSk7XHJcbiAgY29uc3Qgb3JpZ2luYWxNYXBwaW5ncyA9ICh0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkID0gW10pO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbaV07XHJcbiAgICB2YXIgc2VjdGlvbk1hcHBpbmdzID0gc2VjdGlvbi5jb25zdW1lci5fZ2VuZXJhdGVkTWFwcGluZ3M7XHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlY3Rpb25NYXBwaW5ncy5sZW5ndGg7IGorKykge1xyXG4gICAgICB2YXIgbWFwcGluZyA9IHNlY3Rpb25NYXBwaW5nc1tqXTtcclxuXHJcbiAgICAgIHZhciBzb3VyY2UgPSBudWxsO1xyXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZSA9IHNlY3Rpb24uY29uc3VtZXIuX3NvdXJjZXMuYXQobWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIHNvdXJjZSA9IHV0aWwuY29tcHV0ZVNvdXJjZVVSTChcclxuICAgICAgICAgIHNlY3Rpb24uY29uc3VtZXIuc291cmNlUm9vdCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIHRoaXMuX3NvdXJjZU1hcFVSTFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlcy5hZGQoc291cmNlKTtcclxuICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmluZGV4T2Yoc291cmNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG5hbWUgPSBudWxsO1xyXG4gICAgICBpZiAobWFwcGluZy5uYW1lICE9IG51bGwpIHtcclxuICAgICAgICBuYW1lID0gc2VjdGlvbi5jb25zdW1lci5fbmFtZXMuYXQobWFwcGluZy5uYW1lKTtcclxuICAgICAgICB0aGlzLl9uYW1lcy5hZGQobmFtZSk7XHJcbiAgICAgICAgbmFtZSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRoZSBtYXBwaW5ncyBjb21pbmcgZnJvbSB0aGUgY29uc3VtZXIgZm9yIHRoZSBzZWN0aW9uIGhhdmVcclxuICAgICAgLy8gZ2VuZXJhdGVkIHBvc2l0aW9ucyByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHNlY3Rpb24sIHNvIHdlXHJcbiAgICAgIC8vIG5lZWQgdG8gb2Zmc2V0IHRoZW0gdG8gYmUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBjb25jYXRlbmF0ZWRcclxuICAgICAgLy8gZ2VuZXJhdGVkIGZpbGUuXHJcbiAgICAgIHZhciBhZGp1c3RlZE1hcHBpbmcgPSB7XHJcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgICAgZ2VuZXJhdGVkTGluZTpcclxuICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkTGluZSArIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lIC0gMSksXHJcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOlxyXG4gICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gK1xyXG4gICAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IG1hcHBpbmcuZ2VuZXJhdGVkTGluZVxyXG4gICAgICAgICAgICA/IHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbiAtIDFcclxuICAgICAgICAgICAgOiAwKSxcclxuICAgICAgICBvcmlnaW5hbExpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxyXG4gICAgICAgIG9yaWdpbmFsQ29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uLFxyXG4gICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGdlbmVyYXRlZE1hcHBpbmdzLnB1c2goYWRqdXN0ZWRNYXBwaW5nKTtcclxuICAgICAgaWYgKHR5cGVvZiBhZGp1c3RlZE1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgb3JpZ2luYWxNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmNvbXB1dGVDb2x1bW5TcGFucyA9IGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9jb21wdXRlQ29sdW1uU3BhbnMoKSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgdGhpcy5fc2VjdGlvbnNbaV0uY29uc3VtZXIuY29tcHV0ZUNvbHVtblNwYW5zKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0cy5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIgPSBJbmRleGVkU291cmNlTWFwQ29uc3VtZXI7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgYmFzZTY0VkxRID0gcmVxdWlyZShcIi4vYmFzZTY0LXZscVwiKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgQXJyYXlTZXQgPSByZXF1aXJlKFwiLi9hcnJheS1zZXRcIikuQXJyYXlTZXQ7XHJcbnZhciBNYXBwaW5nTGlzdCA9IHJlcXVpcmUoXCIuL21hcHBpbmctbGlzdFwiKS5NYXBwaW5nTGlzdDtcclxuXHJcbi8qKlxyXG4gKiBBbiBpbnN0YW5jZSBvZiB0aGUgU291cmNlTWFwR2VuZXJhdG9yIHJlcHJlc2VudHMgYSBzb3VyY2UgbWFwIHdoaWNoIGlzXHJcbiAqIGJlaW5nIGJ1aWx0IGluY3JlbWVudGFsbHkuIFlvdSBtYXkgcGFzcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nXHJcbiAqIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBmaWxlOiBUaGUgZmlsZW5hbWUgb2YgdGhlIGdlbmVyYXRlZCBzb3VyY2UuXHJcbiAqICAgLSBzb3VyY2VSb290OiBBIHJvb3QgZm9yIGFsbCByZWxhdGl2ZSBVUkxzIGluIHRoaXMgc291cmNlIG1hcC5cclxuICovXHJcbmZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcihhQXJncykge1xyXG4gIGlmICghYUFyZ3MpIHtcclxuICAgIGFBcmdzID0ge307XHJcbiAgfVxyXG4gIHRoaXMuX2ZpbGUgPSB1dGlsLmdldEFyZyhhQXJncywgXCJmaWxlXCIsIG51bGwpO1xyXG4gIHRoaXMuX3NvdXJjZVJvb3QgPSB1dGlsLmdldEFyZyhhQXJncywgXCJzb3VyY2VSb290XCIsIG51bGwpO1xyXG4gIHRoaXMuX3NraXBWYWxpZGF0aW9uID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwic2tpcFZhbGlkYXRpb25cIiwgZmFsc2UpO1xyXG4gIHRoaXMuX3NvdXJjZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuICB0aGlzLl9uYW1lcyA9IG5ldyBBcnJheVNldCgpO1xyXG4gIHRoaXMuX21hcHBpbmdzID0gbmV3IE1hcHBpbmdMaXN0KCk7XHJcbiAgdGhpcy5fc291cmNlc0NvbnRlbnRzID0gbnVsbDtcclxufVxyXG5cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IgYmFzZWQgb24gYSBTb3VyY2VNYXBDb25zdW1lclxyXG4gKlxyXG4gKiBAcGFyYW0gYVNvdXJjZU1hcENvbnN1bWVyIFRoZSBTb3VyY2VNYXAuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IuZnJvbVNvdXJjZU1hcCA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9mcm9tU291cmNlTWFwKFxyXG4gIGFTb3VyY2VNYXBDb25zdW1lclxyXG4pIHtcclxuICB2YXIgc291cmNlUm9vdCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VSb290O1xyXG4gIHZhciBnZW5lcmF0b3IgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6IGFTb3VyY2VNYXBDb25zdW1lci5maWxlLFxyXG4gICAgc291cmNlUm9vdDogc291cmNlUm9vdFxyXG4gIH0pO1xyXG4gIGFTb3VyY2VNYXBDb25zdW1lci5lYWNoTWFwcGluZyhmdW5jdGlvbihtYXBwaW5nKSB7XHJcbiAgICB2YXIgbmV3TWFwcGluZyA9IHtcclxuICAgICAgZ2VuZXJhdGVkOiB7XHJcbiAgICAgICAgbGluZTogbWFwcGluZy5nZW5lcmF0ZWRMaW5lLFxyXG4gICAgICAgIGNvbHVtbjogbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAobWFwcGluZy5zb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICBuZXdNYXBwaW5nLnNvdXJjZSA9IG1hcHBpbmcuc291cmNlO1xyXG4gICAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgICAgbmV3TWFwcGluZy5zb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIG5ld01hcHBpbmcuc291cmNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmV3TWFwcGluZy5vcmlnaW5hbCA9IHtcclxuICAgICAgICBsaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICBjb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChtYXBwaW5nLm5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgIG5ld01hcHBpbmcubmFtZSA9IG1hcHBpbmcubmFtZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRvci5hZGRNYXBwaW5nKG5ld01hcHBpbmcpO1xyXG4gIH0pO1xyXG4gIGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VzLmZvckVhY2goZnVuY3Rpb24oc291cmNlRmlsZSkge1xyXG4gICAgdmFyIHNvdXJjZVJlbGF0aXZlID0gc291cmNlRmlsZTtcclxuICAgIGlmIChzb3VyY2VSb290ICE9PSBudWxsKSB7XHJcbiAgICAgIHNvdXJjZVJlbGF0aXZlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2VGaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWdlbmVyYXRvci5fc291cmNlcy5oYXMoc291cmNlUmVsYXRpdmUpKSB7XHJcbiAgICAgIGdlbmVyYXRvci5fc291cmNlcy5hZGQoc291cmNlUmVsYXRpdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjb250ZW50ID0gYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlRmlsZSk7XHJcbiAgICBpZiAoY29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgIGdlbmVyYXRvci5zZXRTb3VyY2VDb250ZW50KHNvdXJjZUZpbGUsIGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBnZW5lcmF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGEgc2luZ2xlIG1hcHBpbmcgZnJvbSBvcmlnaW5hbCBzb3VyY2UgbGluZSBhbmQgY29sdW1uIHRvIHRoZSBnZW5lcmF0ZWRcclxuICogc291cmNlJ3MgbGluZSBhbmQgY29sdW1uIGZvciB0aGlzIHNvdXJjZSBtYXAgYmVpbmcgY3JlYXRlZC4gVGhlIG1hcHBpbmdcclxuICogb2JqZWN0IHNob3VsZCBoYXZlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGdlbmVyYXRlZDogQW4gb2JqZWN0IHdpdGggdGhlIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zLlxyXG4gKiAgIC0gb3JpZ2luYWw6IEFuIG9iamVjdCB3aXRoIHRoZSBvcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zLlxyXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUgKHJlbGF0aXZlIHRvIHRoZSBzb3VyY2VSb290KS5cclxuICogICAtIG5hbWU6IEFuIG9wdGlvbmFsIG9yaWdpbmFsIHRva2VuIG5hbWUgZm9yIHRoaXMgbWFwcGluZy5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuYWRkTWFwcGluZyA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9hZGRNYXBwaW5nKFxyXG4gIGFBcmdzXHJcbikge1xyXG4gIHZhciBnZW5lcmF0ZWQgPSB1dGlsLmdldEFyZyhhQXJncywgXCJnZW5lcmF0ZWRcIik7XHJcbiAgdmFyIG9yaWdpbmFsID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwib3JpZ2luYWxcIiwgbnVsbCk7XHJcbiAgdmFyIHNvdXJjZSA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcInNvdXJjZVwiLCBudWxsKTtcclxuICB2YXIgbmFtZSA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcIm5hbWVcIiwgbnVsbCk7XHJcblxyXG4gIGlmICghdGhpcy5fc2tpcFZhbGlkYXRpb24pIHtcclxuICAgIHRoaXMuX3ZhbGlkYXRlTWFwcGluZyhnZW5lcmF0ZWQsIG9yaWdpbmFsLCBzb3VyY2UsIG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICBzb3VyY2UgPSBTdHJpbmcoc291cmNlKTtcclxuICAgIGlmICghdGhpcy5fc291cmNlcy5oYXMoc291cmNlKSkge1xyXG4gICAgICB0aGlzLl9zb3VyY2VzLmFkZChzb3VyY2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgIT0gbnVsbCkge1xyXG4gICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcclxuICAgIGlmICghdGhpcy5fbmFtZXMuaGFzKG5hbWUpKSB7XHJcbiAgICAgIHRoaXMuX25hbWVzLmFkZChuYW1lKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMuX21hcHBpbmdzLmFkZCh7XHJcbiAgICBnZW5lcmF0ZWRMaW5lOiBnZW5lcmF0ZWQubGluZSxcclxuICAgIGdlbmVyYXRlZENvbHVtbjogZ2VuZXJhdGVkLmNvbHVtbixcclxuICAgIG9yaWdpbmFsTGluZTogb3JpZ2luYWwgIT0gbnVsbCAmJiBvcmlnaW5hbC5saW5lLFxyXG4gICAgb3JpZ2luYWxDb2x1bW46IG9yaWdpbmFsICE9IG51bGwgJiYgb3JpZ2luYWwuY29sdW1uLFxyXG4gICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICBuYW1lOiBuYW1lXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzb3VyY2UgY29udGVudCBmb3IgYSBzb3VyY2UgZmlsZS5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuc2V0U291cmNlQ29udGVudCA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9zZXRTb3VyY2VDb250ZW50KFxyXG4gIGFTb3VyY2VGaWxlLFxyXG4gIGFTb3VyY2VDb250ZW50XHJcbikge1xyXG4gIHZhciBzb3VyY2UgPSBhU291cmNlRmlsZTtcclxuICBpZiAodGhpcy5fc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICBzb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHRoaXMuX3NvdXJjZVJvb3QsIHNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoYVNvdXJjZUNvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgLy8gQWRkIHRoZSBzb3VyY2UgY29udGVudCB0byB0aGUgX3NvdXJjZXNDb250ZW50cyBtYXAuXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgX3NvdXJjZXNDb250ZW50cyBtYXAgaWYgdGhlIHByb3BlcnR5IGlzIG51bGwuXHJcbiAgICBpZiAoIXRoaXMuX3NvdXJjZXNDb250ZW50cykge1xyXG4gICAgICB0aGlzLl9zb3VyY2VzQ29udGVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc291cmNlc0NvbnRlbnRzW3V0aWwudG9TZXRTdHJpbmcoc291cmNlKV0gPSBhU291cmNlQ29udGVudDtcclxuICB9IGVsc2UgaWYgKHRoaXMuX3NvdXJjZXNDb250ZW50cykge1xyXG4gICAgLy8gUmVtb3ZlIHRoZSBzb3VyY2UgZmlsZSBmcm9tIHRoZSBfc291cmNlc0NvbnRlbnRzIG1hcC5cclxuICAgIC8vIElmIHRoZSBfc291cmNlc0NvbnRlbnRzIG1hcCBpcyBlbXB0eSwgc2V0IHRoZSBwcm9wZXJ0eSB0byBudWxsLlxyXG4gICAgZGVsZXRlIHRoaXMuX3NvdXJjZXNDb250ZW50c1t1dGlsLnRvU2V0U3RyaW5nKHNvdXJjZSldO1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX3NvdXJjZXNDb250ZW50cykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZXNDb250ZW50cyA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFwcGxpZXMgdGhlIG1hcHBpbmdzIG9mIGEgc3ViLXNvdXJjZS1tYXAgZm9yIGEgc3BlY2lmaWMgc291cmNlIGZpbGUgdG8gdGhlXHJcbiAqIHNvdXJjZSBtYXAgYmVpbmcgZ2VuZXJhdGVkLiBFYWNoIG1hcHBpbmcgdG8gdGhlIHN1cHBsaWVkIHNvdXJjZSBmaWxlIGlzXHJcbiAqIHJld3JpdHRlbiB1c2luZyB0aGUgc3VwcGxpZWQgc291cmNlIG1hcC4gTm90ZTogVGhlIHJlc29sdXRpb24gZm9yIHRoZVxyXG4gKiByZXN1bHRpbmcgbWFwcGluZ3MgaXMgdGhlIG1pbmltaXVtIG9mIHRoaXMgbWFwIGFuZCB0aGUgc3VwcGxpZWQgbWFwLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVNvdXJjZU1hcENvbnN1bWVyIFRoZSBzb3VyY2UgbWFwIHRvIGJlIGFwcGxpZWQuXHJcbiAqIEBwYXJhbSBhU291cmNlRmlsZSBPcHRpb25hbC4gVGhlIGZpbGVuYW1lIG9mIHRoZSBzb3VyY2UgZmlsZS5cclxuICogICAgICAgIElmIG9taXR0ZWQsIFNvdXJjZU1hcENvbnN1bWVyJ3MgZmlsZSBwcm9wZXJ0eSB3aWxsIGJlIHVzZWQuXHJcbiAqIEBwYXJhbSBhU291cmNlTWFwUGF0aCBPcHRpb25hbC4gVGhlIGRpcm5hbWUgb2YgdGhlIHBhdGggdG8gdGhlIHNvdXJjZSBtYXBcclxuICogICAgICAgIHRvIGJlIGFwcGxpZWQuIElmIHJlbGF0aXZlLCBpdCBpcyByZWxhdGl2ZSB0byB0aGUgU291cmNlTWFwQ29uc3VtZXIuXHJcbiAqICAgICAgICBUaGlzIHBhcmFtZXRlciBpcyBuZWVkZWQgd2hlbiB0aGUgdHdvIHNvdXJjZSBtYXBzIGFyZW4ndCBpbiB0aGUgc2FtZVxyXG4gKiAgICAgICAgZGlyZWN0b3J5LCBhbmQgdGhlIHNvdXJjZSBtYXAgdG8gYmUgYXBwbGllZCBjb250YWlucyByZWxhdGl2ZSBzb3VyY2VcclxuICogICAgICAgIHBhdGhzLiBJZiBzbywgdGhvc2UgcmVsYXRpdmUgc291cmNlIHBhdGhzIG5lZWQgdG8gYmUgcmV3cml0dGVuXHJcbiAqICAgICAgICByZWxhdGl2ZSB0byB0aGUgU291cmNlTWFwR2VuZXJhdG9yLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5hcHBseVNvdXJjZU1hcCA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9hcHBseVNvdXJjZU1hcChcclxuICBhU291cmNlTWFwQ29uc3VtZXIsXHJcbiAgYVNvdXJjZUZpbGUsXHJcbiAgYVNvdXJjZU1hcFBhdGhcclxuKSB7XHJcbiAgdmFyIHNvdXJjZUZpbGUgPSBhU291cmNlRmlsZTtcclxuICAvLyBJZiBhU291cmNlRmlsZSBpcyBvbWl0dGVkLCB3ZSB3aWxsIHVzZSB0aGUgZmlsZSBwcm9wZXJ0eSBvZiB0aGUgU291cmNlTWFwXHJcbiAgaWYgKGFTb3VyY2VGaWxlID09IG51bGwpIHtcclxuICAgIGlmIChhU291cmNlTWFwQ29uc3VtZXIuZmlsZSA9PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBcIlNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuYXBwbHlTb3VyY2VNYXAgcmVxdWlyZXMgZWl0aGVyIGFuIGV4cGxpY2l0IHNvdXJjZSBmaWxlLCBcIiArXHJcbiAgICAgICAgICAnb3IgdGhlIHNvdXJjZSBtYXBcXCdzIFwiZmlsZVwiIHByb3BlcnR5LiBCb3RoIHdlcmUgb21pdHRlZC4nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBzb3VyY2VGaWxlID0gYVNvdXJjZU1hcENvbnN1bWVyLmZpbGU7XHJcbiAgfVxyXG4gIHZhciBzb3VyY2VSb290ID0gdGhpcy5fc291cmNlUm9vdDtcclxuICAvLyBNYWtlIFwic291cmNlRmlsZVwiIHJlbGF0aXZlIGlmIGFuIGFic29sdXRlIFVybCBpcyBwYXNzZWQuXHJcbiAgaWYgKHNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgc291cmNlRmlsZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgc291cmNlRmlsZSk7XHJcbiAgfVxyXG4gIC8vIEFwcGx5aW5nIHRoZSBTb3VyY2VNYXAgY2FuIGFkZCBhbmQgcmVtb3ZlIGl0ZW1zIGZyb20gdGhlIHNvdXJjZXMgYW5kXHJcbiAgLy8gdGhlIG5hbWVzIGFycmF5LlxyXG4gIHZhciBuZXdTb3VyY2VzID1cclxuICAgIHRoaXMuX21hcHBpbmdzLnRvQXJyYXkoKS5sZW5ndGggPiAwID8gbmV3IEFycmF5U2V0KCkgOiB0aGlzLl9zb3VyY2VzO1xyXG4gIHZhciBuZXdOYW1lcyA9IG5ldyBBcnJheVNldCgpO1xyXG5cclxuICAvLyBGaW5kIG1hcHBpbmdzIGZvciB0aGUgXCJzb3VyY2VGaWxlXCJcclxuICB0aGlzLl9tYXBwaW5ncy51bnNvcnRlZEZvckVhY2goZnVuY3Rpb24obWFwcGluZykge1xyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlID09PSBzb3VyY2VGaWxlICYmIG1hcHBpbmcub3JpZ2luYWxMaW5lICE9IG51bGwpIHtcclxuICAgICAgLy8gQ2hlY2sgaWYgaXQgY2FuIGJlIG1hcHBlZCBieSB0aGUgc291cmNlIG1hcCwgdGhlbiB1cGRhdGUgdGhlIG1hcHBpbmcuXHJcbiAgICAgIHZhciBvcmlnaW5hbCA9IGFTb3VyY2VNYXBDb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgICAgICBsaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICBjb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW5cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChvcmlnaW5hbC5zb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vIENvcHkgbWFwcGluZ1xyXG4gICAgICAgIG1hcHBpbmcuc291cmNlID0gb3JpZ2luYWwuc291cmNlO1xyXG4gICAgICAgIGlmIChhU291cmNlTWFwUGF0aCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHV0aWwuam9pbihhU291cmNlTWFwUGF0aCwgbWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgbWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSA9IG9yaWdpbmFsLmxpbmU7XHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9IG9yaWdpbmFsLmNvbHVtbjtcclxuICAgICAgICBpZiAob3JpZ2luYWwubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICBtYXBwaW5nLm5hbWUgPSBvcmlnaW5hbC5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzb3VyY2UgPSBtYXBwaW5nLnNvdXJjZTtcclxuICAgIGlmIChzb3VyY2UgIT0gbnVsbCAmJiAhbmV3U291cmNlcy5oYXMoc291cmNlKSkge1xyXG4gICAgICBuZXdTb3VyY2VzLmFkZChzb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuYW1lID0gbWFwcGluZy5uYW1lO1xyXG4gICAgaWYgKG5hbWUgIT0gbnVsbCAmJiAhbmV3TmFtZXMuaGFzKG5hbWUpKSB7XHJcbiAgICAgIG5ld05hbWVzLmFkZChuYW1lKTtcclxuICAgIH1cclxuICB9LCB0aGlzKTtcclxuICB0aGlzLl9zb3VyY2VzID0gbmV3U291cmNlcztcclxuICB0aGlzLl9uYW1lcyA9IG5ld05hbWVzO1xyXG5cclxuICAvLyBDb3B5IHNvdXJjZXNDb250ZW50cyBvZiBhcHBsaWVkIG1hcC5cclxuICBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZUZpbGUpIHtcclxuICAgIHZhciBjb250ZW50ID0gYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlRmlsZSk7XHJcbiAgICBpZiAoY29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgIGlmIChhU291cmNlTWFwUGF0aCAhPSBudWxsKSB7XHJcbiAgICAgICAgc291cmNlRmlsZSA9IHV0aWwuam9pbihhU291cmNlTWFwUGF0aCwgc291cmNlRmlsZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZUZpbGUgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZUZpbGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U291cmNlQ29udGVudChzb3VyY2VGaWxlLCBjb250ZW50KTtcclxuICAgIH1cclxuICB9LCB0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIG1hcHBpbmcgY2FuIGhhdmUgb25lIG9mIHRoZSB0aHJlZSBsZXZlbHMgb2YgZGF0YTpcclxuICpcclxuICogICAxLiBKdXN0IHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24uXHJcbiAqICAgMi4gVGhlIEdlbmVyYXRlZCBwb3NpdGlvbiwgb3JpZ2luYWwgcG9zaXRpb24sIGFuZCBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgMy4gR2VuZXJhdGVkIGFuZCBvcmlnaW5hbCBwb3NpdGlvbiwgb3JpZ2luYWwgc291cmNlLCBhcyB3ZWxsIGFzIGEgbmFtZVxyXG4gKiAgICAgIHRva2VuLlxyXG4gKlxyXG4gKiBUbyBtYWludGFpbiBjb25zaXN0ZW5jeSwgd2UgdmFsaWRhdGUgdGhhdCBhbnkgbmV3IG1hcHBpbmcgYmVpbmcgYWRkZWQgZmFsbHNcclxuICogaW4gdG8gb25lIG9mIHRoZXNlIGNhdGVnb3JpZXMuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLl92YWxpZGF0ZU1hcHBpbmcgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfdmFsaWRhdGVNYXBwaW5nKFxyXG4gIGFHZW5lcmF0ZWQsXHJcbiAgYU9yaWdpbmFsLFxyXG4gIGFTb3VyY2UsXHJcbiAgYU5hbWVcclxuKSB7XHJcbiAgLy8gV2hlbiBhT3JpZ2luYWwgaXMgdHJ1dGh5IGJ1dCBoYXMgZW1wdHkgdmFsdWVzIGZvciAubGluZSBhbmQgLmNvbHVtbixcclxuICAvLyBpdCBpcyBtb3N0IGxpa2VseSBhIHByb2dyYW1tZXIgZXJyb3IuIEluIHRoaXMgY2FzZSB3ZSB0aHJvdyBhIHZlcnlcclxuICAvLyBzcGVjaWZpYyBlcnJvciBtZXNzYWdlIHRvIHRyeSB0byBndWlkZSB0aGVtIHRoZSByaWdodCB3YXkuXHJcbiAgLy8gRm9yIGV4YW1wbGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qb2x5bWVyL3BvbHltZXItYnVuZGxlci9wdWxsLzUxOVxyXG4gIGlmIChcclxuICAgIGFPcmlnaW5hbCAmJlxyXG4gICAgdHlwZW9mIGFPcmlnaW5hbC5saW5lICE9PSBcIm51bWJlclwiICYmXHJcbiAgICB0eXBlb2YgYU9yaWdpbmFsLmNvbHVtbiAhPT0gXCJudW1iZXJcIlxyXG4gICkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBcIm9yaWdpbmFsLmxpbmUgYW5kIG9yaWdpbmFsLmNvbHVtbiBhcmUgbm90IG51bWJlcnMgLS0geW91IHByb2JhYmx5IG1lYW50IHRvIG9taXQgXCIgK1xyXG4gICAgICAgIFwidGhlIG9yaWdpbmFsIG1hcHBpbmcgZW50aXJlbHkgYW5kIG9ubHkgbWFwIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24uIElmIHNvLCBwYXNzIFwiICtcclxuICAgICAgICBcIm51bGwgZm9yIHRoZSBvcmlnaW5hbCBtYXBwaW5nIGluc3RlYWQgb2YgYW4gb2JqZWN0IHdpdGggZW1wdHkgb3IgbnVsbCB2YWx1ZXMuXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAoXHJcbiAgICBhR2VuZXJhdGVkICYmXHJcbiAgICBcImxpbmVcIiBpbiBhR2VuZXJhdGVkICYmXHJcbiAgICBcImNvbHVtblwiIGluIGFHZW5lcmF0ZWQgJiZcclxuICAgIGFHZW5lcmF0ZWQubGluZSA+IDAgJiZcclxuICAgIGFHZW5lcmF0ZWQuY29sdW1uID49IDAgJiZcclxuICAgICFhT3JpZ2luYWwgJiZcclxuICAgICFhU291cmNlICYmXHJcbiAgICAhYU5hbWVcclxuICApIHtcclxuICAgIC8vIENhc2UgMS5cclxuICAgIHJldHVybjtcclxuICB9IGVsc2UgaWYgKFxyXG4gICAgYUdlbmVyYXRlZCAmJlxyXG4gICAgXCJsaW5lXCIgaW4gYUdlbmVyYXRlZCAmJlxyXG4gICAgXCJjb2x1bW5cIiBpbiBhR2VuZXJhdGVkICYmXHJcbiAgICBhT3JpZ2luYWwgJiZcclxuICAgIFwibGluZVwiIGluIGFPcmlnaW5hbCAmJlxyXG4gICAgXCJjb2x1bW5cIiBpbiBhT3JpZ2luYWwgJiZcclxuICAgIGFHZW5lcmF0ZWQubGluZSA+IDAgJiZcclxuICAgIGFHZW5lcmF0ZWQuY29sdW1uID49IDAgJiZcclxuICAgIGFPcmlnaW5hbC5saW5lID4gMCAmJlxyXG4gICAgYU9yaWdpbmFsLmNvbHVtbiA+PSAwICYmXHJcbiAgICBhU291cmNlXHJcbiAgKSB7XHJcbiAgICAvLyBDYXNlcyAyIGFuZCAzLlxyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIFwiSW52YWxpZCBtYXBwaW5nOiBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgZ2VuZXJhdGVkOiBhR2VuZXJhdGVkLFxyXG4gICAgICAgICAgc291cmNlOiBhU291cmNlLFxyXG4gICAgICAgICAgb3JpZ2luYWw6IGFPcmlnaW5hbCxcclxuICAgICAgICAgIG5hbWU6IGFOYW1lXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlcmlhbGl6ZSB0aGUgYWNjdW11bGF0ZWQgbWFwcGluZ3MgaW4gdG8gdGhlIHN0cmVhbSBvZiBiYXNlIDY0IFZMUXNcclxuICogc3BlY2lmaWVkIGJ5IHRoZSBzb3VyY2UgbWFwIGZvcm1hdC5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3NlcmlhbGl6ZU1hcHBpbmdzID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3NlcmlhbGl6ZU1hcHBpbmdzKCkge1xyXG4gIHZhciBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IDA7XHJcbiAgdmFyIHByZXZpb3VzR2VuZXJhdGVkTGluZSA9IDE7XHJcbiAgdmFyIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSAwO1xyXG4gIHZhciBwcmV2aW91c09yaWdpbmFsTGluZSA9IDA7XHJcbiAgdmFyIHByZXZpb3VzTmFtZSA9IDA7XHJcbiAgdmFyIHByZXZpb3VzU291cmNlID0gMDtcclxuICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICB2YXIgbmV4dDtcclxuICB2YXIgbWFwcGluZztcclxuICB2YXIgbmFtZUlkeDtcclxuICB2YXIgc291cmNlSWR4O1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSB0aGlzLl9tYXBwaW5ncy50b0FycmF5KCk7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1hcHBpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICBtYXBwaW5nID0gbWFwcGluZ3NbaV07XHJcbiAgICBuZXh0ID0gXCJcIjtcclxuXHJcbiAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lICE9PSBwcmV2aW91c0dlbmVyYXRlZExpbmUpIHtcclxuICAgICAgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gICAgICB3aGlsZSAobWFwcGluZy5nZW5lcmF0ZWRMaW5lICE9PSBwcmV2aW91c0dlbmVyYXRlZExpbmUpIHtcclxuICAgICAgICBuZXh0ICs9IFwiO1wiO1xyXG4gICAgICAgIHByZXZpb3VzR2VuZXJhdGVkTGluZSsrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAhdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZChtYXBwaW5nLCBtYXBwaW5nc1tpIC0gMV0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dCArPSBcIixcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiAtIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uKTtcclxuICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlICE9IG51bGwpIHtcclxuICAgICAgc291cmNlSWR4ID0gdGhpcy5fc291cmNlcy5pbmRleE9mKG1hcHBpbmcuc291cmNlKTtcclxuICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKHNvdXJjZUlkeCAtIHByZXZpb3VzU291cmNlKTtcclxuICAgICAgcHJldmlvdXNTb3VyY2UgPSBzb3VyY2VJZHg7XHJcblxyXG4gICAgICAvLyBsaW5lcyBhcmUgc3RvcmVkIDAtYmFzZWQgaW4gU291cmNlTWFwIHNwZWMgdmVyc2lvbiAzXHJcbiAgICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShtYXBwaW5nLm9yaWdpbmFsTGluZSAtIDEgLSBwcmV2aW91c09yaWdpbmFsTGluZSk7XHJcbiAgICAgIHByZXZpb3VzT3JpZ2luYWxMaW5lID0gbWFwcGluZy5vcmlnaW5hbExpbmUgLSAxO1xyXG5cclxuICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gLSBwcmV2aW91c09yaWdpbmFsQ29sdW1uKTtcclxuICAgICAgcHJldmlvdXNPcmlnaW5hbENvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5uYW1lICE9IG51bGwpIHtcclxuICAgICAgICBuYW1lSWR4ID0gdGhpcy5fbmFtZXMuaW5kZXhPZihtYXBwaW5nLm5hbWUpO1xyXG4gICAgICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShuYW1lSWR4IC0gcHJldmlvdXNOYW1lKTtcclxuICAgICAgICBwcmV2aW91c05hbWUgPSBuYW1lSWR4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0ICs9IG5leHQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudCA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9nZW5lcmF0ZVNvdXJjZXNDb250ZW50KFxyXG4gIGFTb3VyY2VzLFxyXG4gIGFTb3VyY2VSb290XHJcbikge1xyXG4gIHJldHVybiBhU291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlKSB7XHJcbiAgICBpZiAoIXRoaXMuX3NvdXJjZXNDb250ZW50cykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChhU291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgIHNvdXJjZSA9IHV0aWwucmVsYXRpdmUoYVNvdXJjZVJvb3QsIHNvdXJjZSk7XHJcbiAgICB9XHJcbiAgICB2YXIga2V5ID0gdXRpbC50b1NldFN0cmluZyhzb3VyY2UpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9zb3VyY2VzQ29udGVudHMsIGtleSlcclxuICAgICAgPyB0aGlzLl9zb3VyY2VzQ29udGVudHNba2V5XVxyXG4gICAgICA6IG51bGw7XHJcbiAgfSwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRXh0ZXJuYWxpemUgdGhlIHNvdXJjZSBtYXAuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl90b0pTT04oKSB7XHJcbiAgdmFyIG1hcCA9IHtcclxuICAgIHZlcnNpb246IHRoaXMuX3ZlcnNpb24sXHJcbiAgICBzb3VyY2VzOiB0aGlzLl9zb3VyY2VzLnRvQXJyYXkoKSxcclxuICAgIG5hbWVzOiB0aGlzLl9uYW1lcy50b0FycmF5KCksXHJcbiAgICBtYXBwaW5nczogdGhpcy5fc2VyaWFsaXplTWFwcGluZ3MoKVxyXG4gIH07XHJcbiAgaWYgKHRoaXMuX2ZpbGUgIT0gbnVsbCkge1xyXG4gICAgbWFwLmZpbGUgPSB0aGlzLl9maWxlO1xyXG4gIH1cclxuICBpZiAodGhpcy5fc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICBtYXAuc291cmNlUm9vdCA9IHRoaXMuX3NvdXJjZVJvb3Q7XHJcbiAgfVxyXG4gIGlmICh0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgIG1hcC5zb3VyY2VzQ29udGVudCA9IHRoaXMuX2dlbmVyYXRlU291cmNlc0NvbnRlbnQoXHJcbiAgICAgIG1hcC5zb3VyY2VzLFxyXG4gICAgICBtYXAuc291cmNlUm9vdFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBtYXA7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVyIHRoZSBzb3VyY2UgbWFwIGJlaW5nIGdlbmVyYXRlZCB0byBhIHN0cmluZy5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfdG9TdHJpbmcoKSB7XHJcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9KU09OKCkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5Tb3VyY2VNYXBHZW5lcmF0b3IgPSBTb3VyY2VNYXBHZW5lcmF0b3I7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGhlbHBlciBmdW5jdGlvbiBmb3IgZ2V0dGluZyB2YWx1ZXMgZnJvbSBwYXJhbWV0ZXIvb3B0aW9uc1xyXG4gKiBvYmplY3RzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJncyBUaGUgb2JqZWN0IHdlIGFyZSBleHRyYWN0aW5nIHZhbHVlcyBmcm9tXHJcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSBhcmUgZ2V0dGluZy5cclxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZSBBbiBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gaWYgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmdcclxuICogZnJvbSB0aGUgb2JqZWN0LiBJZiB0aGlzIGlzIG5vdCBzcGVjaWZpZWQgYW5kIHRoZSBwcm9wZXJ0eSBpcyBtaXNzaW5nLCBhblxyXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICovXHJcbmZ1bmN0aW9uIGdldEFyZyhhQXJncywgYU5hbWUsIGFEZWZhdWx0VmFsdWUpIHtcclxuICBpZiAoYU5hbWUgaW4gYUFyZ3MpIHtcclxuICAgIHJldHVybiBhQXJnc1thTmFtZV07XHJcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICByZXR1cm4gYURlZmF1bHRWYWx1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhTmFtZSArICdcIiBpcyBhIHJlcXVpcmVkIGFyZ3VtZW50LicpO1xyXG4gIH1cclxufVxyXG5leHBvcnRzLmdldEFyZyA9IGdldEFyZztcclxuXHJcbnZhciB1cmxSZWdleHAgPSAvXig/OihbXFx3K1xcLS5dKyk6KT9cXC9cXC8oPzooXFx3KzpcXHcrKUApPyhbXFx3Li1dKikoPzo6KFxcZCspKT8oLiopJC87XHJcbnZhciBkYXRhVXJsUmVnZXhwID0gL15kYXRhOi4rXFwsLiskLztcclxuXHJcbmZ1bmN0aW9uIHVybFBhcnNlKGFVcmwpIHtcclxuICB2YXIgbWF0Y2ggPSBhVXJsLm1hdGNoKHVybFJlZ2V4cCk7XHJcbiAgaWYgKCFtYXRjaCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICBzY2hlbWU6IG1hdGNoWzFdLFxyXG4gICAgYXV0aDogbWF0Y2hbMl0sXHJcbiAgICBob3N0OiBtYXRjaFszXSxcclxuICAgIHBvcnQ6IG1hdGNoWzRdLFxyXG4gICAgcGF0aDogbWF0Y2hbNV1cclxuICB9O1xyXG59XHJcbmV4cG9ydHMudXJsUGFyc2UgPSB1cmxQYXJzZTtcclxuXHJcbmZ1bmN0aW9uIHVybEdlbmVyYXRlKGFQYXJzZWRVcmwpIHtcclxuICB2YXIgdXJsID0gXCJcIjtcclxuICBpZiAoYVBhcnNlZFVybC5zY2hlbWUpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnNjaGVtZSArIFwiOlwiO1xyXG4gIH1cclxuICB1cmwgKz0gXCIvL1wiO1xyXG4gIGlmIChhUGFyc2VkVXJsLmF1dGgpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLmF1dGggKyBcIkBcIjtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwuaG9zdCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuaG9zdDtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwucG9ydCkge1xyXG4gICAgdXJsICs9IFwiOlwiICsgYVBhcnNlZFVybC5wb3J0O1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5wYXRoKSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5wYXRoO1xyXG4gIH1cclxuICByZXR1cm4gdXJsO1xyXG59XHJcbmV4cG9ydHMudXJsR2VuZXJhdGUgPSB1cmxHZW5lcmF0ZTtcclxuXHJcbmNvbnN0IE1BWF9DQUNIRURfSU5QVVRTID0gMzI7XHJcblxyXG4vKipcclxuICogVGFrZXMgc29tZSBmdW5jdGlvbiBgZihpbnB1dCkgLT4gcmVzdWx0YCBhbmQgcmV0dXJucyBhIG1lbW9pemVkIHZlcnNpb24gb2ZcclxuICogYGZgLlxyXG4gKlxyXG4gKiBXZSBrZWVwIGF0IG1vc3QgYE1BWF9DQUNIRURfSU5QVVRTYCBtZW1vaXplZCByZXN1bHRzIG9mIGBmYCBhbGl2ZS4gVGhlXHJcbiAqIG1lbW9pemF0aW9uIGlzIGEgZHVtYi1zaW1wbGUsIGxpbmVhciBsZWFzdC1yZWNlbnRseS11c2VkIGNhY2hlLlxyXG4gKi9cclxuZnVuY3Rpb24gbHJ1TWVtb2l6ZShmKSB7XHJcbiAgY29uc3QgY2FjaGUgPSBbXTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChjYWNoZVtpXS5pbnB1dCA9PT0gaW5wdXQpIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNhY2hlWzBdO1xyXG4gICAgICAgIGNhY2hlWzBdID0gY2FjaGVbaV07XHJcbiAgICAgICAgY2FjaGVbaV0gPSB0ZW1wO1xyXG4gICAgICAgIHJldHVybiBjYWNoZVswXS5yZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gZihpbnB1dCk7XHJcblxyXG4gICAgY2FjaGUudW5zaGlmdCh7XHJcbiAgICAgIGlucHV0LFxyXG4gICAgICByZXN1bHRcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYWNoZS5sZW5ndGggPiBNQVhfQ0FDSEVEX0lOUFVUUykge1xyXG4gICAgICBjYWNoZS5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGEgcGF0aCwgb3IgdGhlIHBhdGggcG9ydGlvbiBvZiBhIFVSTDpcclxuICpcclxuICogLSBSZXBsYWNlcyBjb25zZWN1dGl2ZSBzbGFzaGVzIHdpdGggb25lIHNsYXNoLlxyXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJy4nIHBhcnRzLlxyXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJzxkaXI+Ly4uJyBwYXJ0cy5cclxuICpcclxuICogQmFzZWQgb24gY29kZSBpbiB0aGUgTm9kZS5qcyAncGF0aCcgY29yZSBtb2R1bGUuXHJcbiAqXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciB1cmwgdG8gbm9ybWFsaXplLlxyXG4gKi9cclxudmFyIG5vcm1hbGl6ZSA9IGxydU1lbW9pemUoZnVuY3Rpb24gbm9ybWFsaXplKGFQYXRoKSB7XHJcbiAgdmFyIHBhdGggPSBhUGF0aDtcclxuICB2YXIgdXJsID0gdXJsUGFyc2UoYVBhdGgpO1xyXG4gIGlmICh1cmwpIHtcclxuICAgIGlmICghdXJsLnBhdGgpIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHVybC5wYXRoO1xyXG4gIH1cclxuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKTtcclxuXHJcbiAgLy8gU3BsaXQgdGhlIHBhdGggaW50byBwYXJ0cyBiZXR3ZWVuIGAvYCBjaGFyYWN0ZXJzLiBUaGlzIGlzIG11Y2ggZmFzdGVyIHRoYW5cclxuICAvLyB1c2luZyBgLnNwbGl0KC9cXC8rL2cpYC5cclxuICB2YXIgcGFydHMgPSBbXTtcclxuICB2YXIgc3RhcnQgPSAwO1xyXG4gIHZhciBpID0gMDtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgc3RhcnQgPSBpO1xyXG4gICAgaSA9IHBhdGguaW5kZXhPZihcIi9cIiwgc3RhcnQpO1xyXG4gICAgaWYgKGkgPT09IC0xKSB7XHJcbiAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShzdGFydCkpO1xyXG4gICAgICBicmVhaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShzdGFydCwgaSkpO1xyXG4gICAgICB3aGlsZSAoaSA8IHBhdGgubGVuZ3RoICYmIHBhdGhbaV0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgaSsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBwYXJ0LCB1cCA9IDAsIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgcGFydCA9IHBhcnRzW2ldO1xyXG4gICAgaWYgKHBhcnQgPT09IFwiLlwiKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gXCIuLlwiKSB7XHJcbiAgICAgIHVwKys7XHJcbiAgICB9IGVsc2UgaWYgKHVwID4gMCkge1xyXG4gICAgICBpZiAocGFydCA9PT0gXCJcIikge1xyXG4gICAgICAgIC8vIFRoZSBmaXJzdCBwYXJ0IGlzIGJsYW5rIGlmIHRoZSBwYXRoIGlzIGFic29sdXRlLiBUcnlpbmcgdG8gZ29cclxuICAgICAgICAvLyBhYm92ZSB0aGUgcm9vdCBpcyBhIG5vLW9wLiBUaGVyZWZvcmUgd2UgY2FuIHJlbW92ZSBhbGwgJy4uJyBwYXJ0c1xyXG4gICAgICAgIC8vIGRpcmVjdGx5IGFmdGVyIHRoZSByb290LlxyXG4gICAgICAgIHBhcnRzLnNwbGljZShpICsgMSwgdXApO1xyXG4gICAgICAgIHVwID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMik7XHJcbiAgICAgICAgdXAtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwYXRoID0gcGFydHMuam9pbihcIi9cIik7XHJcblxyXG4gIGlmIChwYXRoID09PSBcIlwiKSB7XHJcbiAgICBwYXRoID0gaXNBYnNvbHV0ZSA/IFwiL1wiIDogXCIuXCI7XHJcbiAgfVxyXG5cclxuICBpZiAodXJsKSB7XHJcbiAgICB1cmwucGF0aCA9IHBhdGg7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUodXJsKTtcclxuICB9XHJcbiAgcmV0dXJuIHBhdGg7XHJcbn0pO1xyXG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcclxuXHJcbi8qKlxyXG4gKiBKb2lucyB0d28gcGF0aHMvVVJMcy5cclxuICpcclxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxyXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgVVJMIHRvIGJlIGpvaW5lZCB3aXRoIHRoZSByb290LlxyXG4gKlxyXG4gKiAtIElmIGFQYXRoIGlzIGEgVVJMIG9yIGEgZGF0YSBVUkksIGFQYXRoIGlzIHJldHVybmVkLCB1bmxlc3MgYVBhdGggaXMgYVxyXG4gKiAgIHNjaGVtZS1yZWxhdGl2ZSBVUkw6IFRoZW4gdGhlIHNjaGVtZSBvZiBhUm9vdCwgaWYgYW55LCBpcyBwcmVwZW5kZWRcclxuICogICBmaXJzdC5cclxuICogLSBPdGhlcndpc2UgYVBhdGggaXMgYSBwYXRoLiBJZiBhUm9vdCBpcyBhIFVSTCwgdGhlbiBpdHMgcGF0aCBwb3J0aW9uXHJcbiAqICAgaXMgdXBkYXRlZCB3aXRoIHRoZSByZXN1bHQgYW5kIGFSb290IGlzIHJldHVybmVkLiBPdGhlcndpc2UgdGhlIHJlc3VsdFxyXG4gKiAgIGlzIHJldHVybmVkLlxyXG4gKiAgIC0gSWYgYVBhdGggaXMgYWJzb2x1dGUsIHRoZSByZXN1bHQgaXMgYVBhdGguXHJcbiAqICAgLSBPdGhlcndpc2UgdGhlIHR3byBwYXRocyBhcmUgam9pbmVkIHdpdGggYSBzbGFzaC5cclxuICogLSBKb2luaW5nIGZvciBleGFtcGxlICdodHRwOi8vJyBhbmQgJ3d3dy5leGFtcGxlLmNvbScgaXMgYWxzbyBzdXBwb3J0ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBqb2luKGFSb290LCBhUGF0aCkge1xyXG4gIGlmIChhUm9vdCA9PT0gXCJcIikge1xyXG4gICAgYVJvb3QgPSBcIi5cIjtcclxuICB9XHJcbiAgaWYgKGFQYXRoID09PSBcIlwiKSB7XHJcbiAgICBhUGF0aCA9IFwiLlwiO1xyXG4gIH1cclxuICB2YXIgYVBhdGhVcmwgPSB1cmxQYXJzZShhUGF0aCk7XHJcbiAgdmFyIGFSb290VXJsID0gdXJsUGFyc2UoYVJvb3QpO1xyXG4gIGlmIChhUm9vdFVybCkge1xyXG4gICAgYVJvb3QgPSBhUm9vdFVybC5wYXRoIHx8IFwiL1wiO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oZm9vLCAnLy93d3cuZXhhbXBsZS5vcmcnKWBcclxuICBpZiAoYVBhdGhVcmwgJiYgIWFQYXRoVXJsLnNjaGVtZSkge1xyXG4gICAgaWYgKGFSb290VXJsKSB7XHJcbiAgICAgIGFQYXRoVXJsLnNjaGVtZSA9IGFSb290VXJsLnNjaGVtZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUGF0aFVybCk7XHJcbiAgfVxyXG5cclxuICBpZiAoYVBhdGhVcmwgfHwgYVBhdGgubWF0Y2goZGF0YVVybFJlZ2V4cCkpIHtcclxuICAgIHJldHVybiBhUGF0aDtcclxuICB9XHJcblxyXG4gIC8vIGBqb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpYFxyXG4gIGlmIChhUm9vdFVybCAmJiAhYVJvb3RVcmwuaG9zdCAmJiAhYVJvb3RVcmwucGF0aCkge1xyXG4gICAgYVJvb3RVcmwuaG9zdCA9IGFQYXRoO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcblxyXG4gIHZhciBqb2luZWQgPVxyXG4gICAgYVBhdGguY2hhckF0KDApID09PSBcIi9cIlxyXG4gICAgICA/IGFQYXRoXHJcbiAgICAgIDogbm9ybWFsaXplKGFSb290LnJlcGxhY2UoL1xcLyskLywgXCJcIikgKyBcIi9cIiArIGFQYXRoKTtcclxuXHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdFVybC5wYXRoID0gam9pbmVkO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcbiAgcmV0dXJuIGpvaW5lZDtcclxufVxyXG5leHBvcnRzLmpvaW4gPSBqb2luO1xyXG5cclxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24oYVBhdGgpIHtcclxuICByZXR1cm4gYVBhdGguY2hhckF0KDApID09PSBcIi9cIiB8fCB1cmxSZWdleHAudGVzdChhUGF0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSBhIHBhdGggcmVsYXRpdmUgdG8gYSBVUkwgb3IgYW5vdGhlciBwYXRoLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgbWFkZSByZWxhdGl2ZSB0byBhUm9vdC5cclxuICovXHJcbmZ1bmN0aW9uIHJlbGF0aXZlKGFSb290LCBhUGF0aCkge1xyXG4gIGlmIChhUm9vdCA9PT0gXCJcIikge1xyXG4gICAgYVJvb3QgPSBcIi5cIjtcclxuICB9XHJcblxyXG4gIGFSb290ID0gYVJvb3QucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xyXG5cclxuICAvLyBJdCBpcyBwb3NzaWJsZSBmb3IgdGhlIHBhdGggdG8gYmUgYWJvdmUgdGhlIHJvb3QuIEluIHRoaXMgY2FzZSwgc2ltcGx5XHJcbiAgLy8gY2hlY2tpbmcgd2hldGhlciB0aGUgcm9vdCBpcyBhIHByZWZpeCBvZiB0aGUgcGF0aCB3b24ndCB3b3JrLiBJbnN0ZWFkLCB3ZVxyXG4gIC8vIG5lZWQgdG8gcmVtb3ZlIGNvbXBvbmVudHMgZnJvbSB0aGUgcm9vdCBvbmUgYnkgb25lLCB1bnRpbCBlaXRoZXIgd2UgZmluZFxyXG4gIC8vIGEgcHJlZml4IHRoYXQgZml0cywgb3Igd2UgcnVuIG91dCBvZiBjb21wb25lbnRzIHRvIHJlbW92ZS5cclxuICB2YXIgbGV2ZWwgPSAwO1xyXG4gIHdoaWxlIChhUGF0aC5pbmRleE9mKGFSb290ICsgXCIvXCIpICE9PSAwKSB7XHJcbiAgICB2YXIgaW5kZXggPSBhUm9vdC5sYXN0SW5kZXhPZihcIi9cIik7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGUgb25seSBwYXJ0IG9mIHRoZSByb290IHRoYXQgaXMgbGVmdCBpcyB0aGUgc2NoZW1lIChpLmUuIGh0dHA6Ly8sXHJcbiAgICAvLyBmaWxlOi8vLywgZXRjLiksIG9uZSBvciBtb3JlIHNsYXNoZXMgKC8pLCBvciBzaW1wbHkgbm90aGluZyBhdCBhbGwsIHdlXHJcbiAgICAvLyBoYXZlIGV4aGF1c3RlZCBhbGwgY29tcG9uZW50cywgc28gdGhlIHBhdGggaXMgbm90IHJlbGF0aXZlIHRvIHRoZSByb290LlxyXG4gICAgYVJvb3QgPSBhUm9vdC5zbGljZSgwLCBpbmRleCk7XHJcbiAgICBpZiAoYVJvb3QubWF0Y2goL14oW15cXC9dKzpcXC8pP1xcLyokLykpIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgICsrbGV2ZWw7XHJcbiAgfVxyXG5cclxuICAvLyBNYWtlIHN1cmUgd2UgYWRkIGEgXCIuLi9cIiBmb3IgZWFjaCBjb21wb25lbnQgd2UgcmVtb3ZlZCBmcm9tIHRoZSByb290LlxyXG4gIHJldHVybiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIuLi9cIikgKyBhUGF0aC5zdWJzdHIoYVJvb3QubGVuZ3RoICsgMSk7XHJcbn1cclxuZXhwb3J0cy5yZWxhdGl2ZSA9IHJlbGF0aXZlO1xyXG5cclxudmFyIHN1cHBvcnRzTnVsbFByb3RvID0gKGZ1bmN0aW9uKCkge1xyXG4gIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIHJldHVybiAhKFwiX19wcm90b19fXCIgaW4gb2JqKTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGlkZW50aXR5KHMpIHtcclxuICByZXR1cm4gcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEJlY2F1c2UgYmVoYXZpb3IgZ29lcyB3YWNreSB3aGVuIHlvdSBzZXQgYF9fcHJvdG9fX2Agb24gb2JqZWN0cywgd2VcclxuICogaGF2ZSB0byBwcmVmaXggYWxsIHRoZSBzdHJpbmdzIGluIG91ciBzZXQgd2l0aCBhbiBhcmJpdHJhcnkgY2hhcmFjdGVyLlxyXG4gKlxyXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9wdWxsLzMxIGFuZFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL2lzc3Vlcy8zMFxyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbmZ1bmN0aW9uIHRvU2V0U3RyaW5nKGFTdHIpIHtcclxuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xyXG4gICAgcmV0dXJuIFwiJFwiICsgYVN0cjtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMudG9TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogdG9TZXRTdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBmcm9tU2V0U3RyaW5nKGFTdHIpIHtcclxuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xyXG4gICAgcmV0dXJuIGFTdHIuc2xpY2UoMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYVN0cjtcclxufVxyXG5leHBvcnRzLmZyb21TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogZnJvbVNldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGlzUHJvdG9TdHJpbmcocykge1xyXG4gIGlmICghcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdmFyIGxlbmd0aCA9IHMubGVuZ3RoO1xyXG5cclxuICBpZiAobGVuZ3RoIDwgOSAvKiBcIl9fcHJvdG9fX1wiLmxlbmd0aCAqLykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDEpICE9PSA5NSAvKiAnXycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAyKSAhPT0gOTUgLyogJ18nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMykgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA0KSAhPT0gMTE2IC8qICd0JyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDUpICE9PSAxMTEgLyogJ28nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNikgIT09IDExNCAvKiAncicgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA3KSAhPT0gMTEyIC8qICdwJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDgpICE9PSA5NSAvKiAnXycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA5KSAhPT0gOTUgLyogJ18nICovXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTA7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBpZiAocy5jaGFyQ29kZUF0KGkpICE9PSAzNiAvKiAnJCcgKi8pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdoZXJlIHRoZSBvcmlnaW5hbCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgb3JpZ2luYWwgc291cmNlL2xpbmUvY29sdW1uLCBidXQgZGlmZmVyZW50IGdlbmVyYXRlZFxyXG4gKiBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYSBtYXBwaW5nIHdpdGggYVxyXG4gKiBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XHJcbiAgdmFyIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMgPSBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggZGVmbGF0ZWQgc291cmNlIGFuZCBuYW1lIGluZGljZXMgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiwgYnV0IGRpZmZlcmVudFxyXG4gKiBzb3VyY2UvbmFtZS9vcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYVxyXG4gKiBtYXBwaW5nIHdpdGggYSBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQoXHJcbiAgbWFwcGluZ0EsXHJcbiAgbWFwcGluZ0IsXHJcbiAgb25seUNvbXBhcmVHZW5lcmF0ZWRcclxuKSB7XHJcbiAgdmFyIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCB8fCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkID0gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQ7XHJcblxyXG5mdW5jdGlvbiBzdHJjbXAoYVN0cjEsIGFTdHIyKSB7XHJcbiAgaWYgKGFTdHIxID09PSBhU3RyMikge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjEgPT09IG51bGwpIHtcclxuICAgIHJldHVybiAxOyAvLyBhU3RyMiAhPT0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIyID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gLTE7IC8vIGFTdHIxICE9PSBudWxsXHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjEgPiBhU3RyMikge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gLTE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggaW5mbGF0ZWQgc291cmNlIGFuZCBuYW1lIHN0cmluZ3Mgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCKSB7XHJcbiAgdmFyIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkID0gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQ7XHJcblxyXG4vKipcclxuICogU3RyaXAgYW55IEpTT04gWFNTSSBhdm9pZGFuY2UgcHJlZml4IGZyb20gdGhlIHN0cmluZyAoYXMgZG9jdW1lbnRlZFxyXG4gKiBpbiB0aGUgc291cmNlIG1hcHMgc3BlY2lmaWNhdGlvbiksIGFuZCB0aGVuIHBhcnNlIHRoZSBzdHJpbmcgYXNcclxuICogSlNPTi5cclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlU291cmNlTWFwSW5wdXQoc3RyKSB7XHJcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLnJlcGxhY2UoL15cXCldfSdbXlxcbl0qXFxuLywgXCJcIikpO1xyXG59XHJcbmV4cG9ydHMucGFyc2VTb3VyY2VNYXBJbnB1dCA9IHBhcnNlU291cmNlTWFwSW5wdXQ7XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgVVJMIG9mIGEgc291cmNlIGdpdmVuIHRoZSB0aGUgc291cmNlIHJvb3QsIHRoZSBzb3VyY2Unc1xyXG4gKiBVUkwsIGFuZCB0aGUgc291cmNlIG1hcCdzIFVSTC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpIHtcclxuICBzb3VyY2VVUkwgPSBzb3VyY2VVUkwgfHwgXCJcIjtcclxuXHJcbiAgaWYgKHNvdXJjZVJvb3QpIHtcclxuICAgIC8vIFRoaXMgZm9sbG93cyB3aGF0IENocm9tZSBkb2VzLlxyXG4gICAgaWYgKHNvdXJjZVJvb3Rbc291cmNlUm9vdC5sZW5ndGggLSAxXSAhPT0gXCIvXCIgJiYgc291cmNlVVJMWzBdICE9PSBcIi9cIikge1xyXG4gICAgICBzb3VyY2VSb290ICs9IFwiL1wiO1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAgIC8vICAgTGluZSA0OiBBbiBvcHRpb25hbCBzb3VyY2Ugcm9vdCwgdXNlZnVsIGZvciByZWxvY2F0aW5nIHNvdXJjZVxyXG4gICAgLy8gICBmaWxlcyBvbiBhIHNlcnZlciBvciByZW1vdmluZyByZXBlYXRlZCB2YWx1ZXMgaW4gdGhlXHJcbiAgICAvLyAgIOKAnHNvdXJjZXPigJ0gZW50cnkuICBUaGlzIHZhbHVlIGlzIHByZXBlbmRlZCB0byB0aGUgaW5kaXZpZHVhbFxyXG4gICAgLy8gICBlbnRyaWVzIGluIHRoZSDigJxzb3VyY2XigJ0gZmllbGQuXHJcbiAgICBzb3VyY2VVUkwgPSBzb3VyY2VSb290ICsgc291cmNlVVJMO1xyXG4gIH1cclxuXHJcbiAgLy8gSGlzdG9yaWNhbGx5LCBTb3VyY2VNYXBDb25zdW1lciBkaWQgbm90IHRha2UgdGhlIHNvdXJjZU1hcFVSTCBhc1xyXG4gIC8vIGEgcGFyYW1ldGVyLiAgVGhpcyBtb2RlIGlzIHN0aWxsIHNvbWV3aGF0IHN1cHBvcnRlZCwgd2hpY2ggaXMgd2h5XHJcbiAgLy8gdGhpcyBjb2RlIGJsb2NrIGlzIGNvbmRpdGlvbmFsLiAgSG93ZXZlciwgaXQncyBwcmVmZXJhYmxlIHRvIHBhc3NcclxuICAvLyB0aGUgc291cmNlIG1hcCBVUkwgdG8gU291cmNlTWFwQ29uc3VtZXIsIHNvIHRoYXQgdGhpcyBmdW5jdGlvblxyXG4gIC8vIGNhbiBpbXBsZW1lbnQgdGhlIHNvdXJjZSBVUkwgcmVzb2x1dGlvbiBhbGdvcml0aG0gYXMgb3V0bGluZWQgaW5cclxuICAvLyB0aGUgc3BlYy4gIFRoaXMgYmxvY2sgaXMgYmFzaWNhbGx5IHRoZSBlcXVpdmFsZW50IG9mOlxyXG4gIC8vICAgIG5ldyBVUkwoc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpLnRvU3RyaW5nKClcclxuICAvLyAuLi4gZXhjZXB0IGl0IGF2b2lkcyB1c2luZyBVUkwsIHdoaWNoIHdhc24ndCBhdmFpbGFibGUgaW4gdGhlXHJcbiAgLy8gb2xkZXIgcmVsZWFzZXMgb2Ygbm9kZSBzdGlsbCBzdXBwb3J0ZWQgYnkgdGhpcyBsaWJyYXJ5LlxyXG4gIC8vXHJcbiAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAvLyAgIElmIHRoZSBzb3VyY2VzIGFyZSBub3QgYWJzb2x1dGUgVVJMcyBhZnRlciBwcmVwZW5kaW5nIG9mIHRoZVxyXG4gIC8vICAg4oCcc291cmNlUm9vdOKAnSwgdGhlIHNvdXJjZXMgYXJlIHJlc29sdmVkIHJlbGF0aXZlIHRvIHRoZVxyXG4gIC8vICAgU291cmNlTWFwIChsaWtlIHJlc29sdmluZyBzY3JpcHQgc3JjIGluIGEgaHRtbCBkb2N1bWVudCkuXHJcbiAgaWYgKHNvdXJjZU1hcFVSTCkge1xyXG4gICAgdmFyIHBhcnNlZCA9IHVybFBhcnNlKHNvdXJjZU1hcFVSTCk7XHJcbiAgICBpZiAoIXBhcnNlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzb3VyY2VNYXBVUkwgY291bGQgbm90IGJlIHBhcnNlZFwiKTtcclxuICAgIH1cclxuICAgIGlmIChwYXJzZWQucGF0aCkge1xyXG4gICAgICAvLyBTdHJpcCB0aGUgbGFzdCBwYXRoIGNvbXBvbmVudCwgYnV0IGtlZXAgdGhlIFwiL1wiLlxyXG4gICAgICB2YXIgaW5kZXggPSBwYXJzZWQucGF0aC5sYXN0SW5kZXhPZihcIi9cIik7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgcGFyc2VkLnBhdGggPSBwYXJzZWQucGF0aC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc291cmNlVVJMID0gam9pbih1cmxHZW5lcmF0ZShwYXJzZWQpLCBzb3VyY2VVUkwpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZShzb3VyY2VVUkwpO1xyXG59XHJcbmV4cG9ydHMuY29tcHV0ZVNvdXJjZVVSTCA9IGNvbXB1dGVTb3VyY2VVUkw7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBTb3VyY2VNYXBDb25zdW1lciA9IHJlcXVpcmUoXCIuLi9saWIvc291cmNlLW1hcC1jb25zdW1lclwiKS5Tb3VyY2VNYXBDb25zdW1lcjtcclxudmFyIFNvdXJjZU1hcEdlbmVyYXRvciA9IHJlcXVpcmUoXCIuLi9saWIvc291cmNlLW1hcC1nZW5lcmF0b3JcIilcclxuICAuU291cmNlTWFwR2VuZXJhdG9yO1xyXG5cclxuZXhwb3J0c1tcInRlc3QgZWF0aW5nIG91ciBvd24gZG9nIGZvb2RcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgc21nID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBmaWxlOiBcInRlc3RpbmcuanNcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiL3d1L3RhbmdcIlxyXG4gIH0pO1xyXG5cclxuICBzbWcuYWRkTWFwcGluZyh7XHJcbiAgICBzb3VyY2U6IFwiZ3phLmNvZmZlZVwiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAwIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH1cclxuICB9KTtcclxuXHJcbiAgc21nLmFkZE1hcHBpbmcoe1xyXG4gICAgc291cmNlOiBcImd6YS5jb2ZmZWVcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDIsIGNvbHVtbjogMCB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogMiB9XHJcbiAgfSk7XHJcblxyXG4gIHNtZy5hZGRNYXBwaW5nKHtcclxuICAgIHNvdXJjZTogXCJnemEuY29mZmVlXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAzLCBjb2x1bW46IDAgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiA0LCBjb2x1bW46IDIgfVxyXG4gIH0pO1xyXG5cclxuICBzbWcuYWRkTWFwcGluZyh7XHJcbiAgICBzb3VyY2U6IFwiZ3phLmNvZmZlZVwiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogNCwgY29sdW1uOiAwIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogNSwgY29sdW1uOiAyIH1cclxuICB9KTtcclxuXHJcbiAgc21nLmFkZE1hcHBpbmcoe1xyXG4gICAgc291cmNlOiBcImd6YS5jb2ZmZWVcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDUsIGNvbHVtbjogMTAgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiA2LCBjb2x1bW46IDEyIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIHNtYyA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihzbWcudG9TdHJpbmcoKSk7XHJcblxyXG4gIC8vIEV4YWN0XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMixcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDEsXHJcbiAgICAwLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnRcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDMsXHJcbiAgICAyLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICAyLFxyXG4gICAgMCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0XHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA0LFxyXG4gICAgMixcclxuICAgIFwiL3d1L3RhbmcvZ3phLmNvZmZlZVwiLFxyXG4gICAgMyxcclxuICAgIDAsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydFxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNSxcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDQsXHJcbiAgICAwLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnRcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDYsXHJcbiAgICAxMixcclxuICAgIFwiL3d1L3RhbmcvZ3phLmNvZmZlZVwiLFxyXG4gICAgNSxcclxuICAgIDEwLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnRcclxuICApO1xyXG5cclxuICAvLyBGdXp6eVxyXG5cclxuICAvLyBHZW5lcmF0ZWQgdG8gb3JpZ2luYWwgd2l0aCBkZWZhdWx0IChnbGIpIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIHNtYywgYXNzZXJ0LCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICAyLFxyXG4gICAgOSxcclxuICAgIFwiL3d1L3RhbmcvZ3phLmNvZmZlZVwiLFxyXG4gICAgMSxcclxuICAgIDAsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygzLCAwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBzbWMsIGFzc2VydCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMyxcclxuICAgIDksXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDIsXHJcbiAgICAwLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoNCwgMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgc21jLCBhc3NlcnQsIHRydWUpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDQsXHJcbiAgICA5LFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICAzLFxyXG4gICAgMCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDUsIDAsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIHNtYywgYXNzZXJ0LCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA1LFxyXG4gICAgOSxcclxuICAgIFwiL3d1L3RhbmcvZ3phLmNvZmZlZVwiLFxyXG4gICAgNCxcclxuICAgIDAsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyg2LCAwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBzbWMsIGFzc2VydCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDYsIDksIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIHNtYywgYXNzZXJ0LCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA2LFxyXG4gICAgMTMsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDUsXHJcbiAgICAxMCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcblxyXG4gIC8vIEdlbmVyYXRlZCB0byBvcmlnaW5hbCB3aXRoIGx1YiBiaWFzLlxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDIsXHJcbiAgICAwLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICAxLFxyXG4gICAgMCxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDIsXHJcbiAgICA5LFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMyxcclxuICAgIDAsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDIsXHJcbiAgICAwLFxyXG4gICAgbnVsbCxcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMyxcclxuICAgIDksXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA0LFxyXG4gICAgMCxcclxuICAgIFwiL3d1L3RhbmcvZ3phLmNvZmZlZVwiLFxyXG4gICAgMyxcclxuICAgIDAsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA0LFxyXG4gICAgOSxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDUsXHJcbiAgICAwLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICA0LFxyXG4gICAgMCxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDUsXHJcbiAgICA5LFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNixcclxuICAgIDAsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDUsXHJcbiAgICAxMCxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDYsXHJcbiAgICA5LFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICA1LFxyXG4gICAgMTAsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA2LFxyXG4gICAgMTMsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuXHJcbiAgLy8gT3JpZ2luYWwgdG8gZ2VuZXJhdGVkIHdpdGggZGVmYXVsdCAoZ2xiKSBiaWFzXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMixcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDEsXHJcbiAgICAxLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMyxcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDIsXHJcbiAgICAzLFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNCxcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDMsXHJcbiAgICA2LFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNSxcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDQsXHJcbiAgICA5LFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNSxcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDUsXHJcbiAgICA5LFxyXG4gICAgbnVsbCxcclxuICAgIG51bGwsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNixcclxuICAgIDEyLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICA2LFxyXG4gICAgMTksXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuXHJcbiAgLy8gT3JpZ2luYWwgdG8gZ2VuZXJhdGVkIHdpdGggbHViIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgMyxcclxuICAgIDIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDEsXHJcbiAgICAxLFxyXG4gICAgbnVsbCxcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgbnVsbCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIDQsXHJcbiAgICAyLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICAyLFxyXG4gICAgMyxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA1LFxyXG4gICAgMixcclxuICAgIFwiL3d1L3RhbmcvZ3phLmNvZmZlZVwiLFxyXG4gICAgMyxcclxuICAgIDYsXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKFxyXG4gICAgNixcclxuICAgIDEyLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICA0LFxyXG4gICAgOSxcclxuICAgIG51bGwsXHJcbiAgICBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCxcclxuICAgIHNtYyxcclxuICAgIGFzc2VydCxcclxuICAgIG51bGwsXHJcbiAgICB0cnVlXHJcbiAgKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoXHJcbiAgICA2LFxyXG4gICAgMTIsXHJcbiAgICBcIi93dS90YW5nL2d6YS5jb2ZmZWVcIixcclxuICAgIDUsXHJcbiAgICA5LFxyXG4gICAgbnVsbCxcclxuICAgIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELFxyXG4gICAgc21jLFxyXG4gICAgYXNzZXJ0LFxyXG4gICAgbnVsbCxcclxuICAgIHRydWVcclxuICApO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZyhcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgXCIvd3UvdGFuZy9nemEuY29mZmVlXCIsXHJcbiAgICA2LFxyXG4gICAgMTksXHJcbiAgICBudWxsLFxyXG4gICAgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsXHJcbiAgICBzbWMsXHJcbiAgICBhc3NlcnQsXHJcbiAgICBudWxsLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi9saWIvdXRpbFwiKTtcclxuXHJcbi8vIFRoaXMgaXMgYSB0ZXN0IG1hcHBpbmcgd2hpY2ggbWFwcyBmdW5jdGlvbnMgZnJvbSB0d28gZGlmZmVyZW50IGZpbGVzXHJcbi8vIChvbmUuanMgYW5kIHR3by5qcykgdG8gYSBtaW5pZmllZCBnZW5lcmF0ZWQgc291cmNlLlxyXG4vL1xyXG4vLyBIZXJlIGlzIG9uZS5qczpcclxuLy9cclxuLy8gICBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xyXG4vLyAgICAgcmV0dXJuIGJheihiYXIpO1xyXG4vLyAgIH07XHJcbi8vXHJcbi8vIEhlcmUgaXMgdHdvLmpzOlxyXG4vL1xyXG4vLyAgIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xyXG4vLyAgICAgcmV0dXJuIG4gKyAxO1xyXG4vLyAgIH07XHJcbi8vXHJcbi8vIEFuZCBoZXJlIGlzIHRoZSBnZW5lcmF0ZWQgY29kZSAobWluLmpzKTpcclxuLy9cclxuLy8gICBPTkUuZm9vPWZ1bmN0aW9uKGEpe3JldHVybiBiYXooYSk7fTtcclxuLy8gICBUV08uaW5jPWZ1bmN0aW9uKGEpe3JldHVybiBhKzE7fTtcclxuZXhwb3J0cy50ZXN0R2VuZXJhdGVkQ29kZSA9XHJcbiAgXCIgT05FLmZvbz1mdW5jdGlvbihhKXtyZXR1cm4gYmF6KGEpO307XFxuXCIgK1xyXG4gIFwiIFRXTy5pbmM9ZnVuY3Rpb24oYSl7cmV0dXJuIGErMTt9O1wiO1xyXG5leHBvcnRzLnRlc3RNYXAgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIiwgXCJuXCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcInR3by5qc1wiXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOlxyXG4gICAgXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQVwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcE5vU291cmNlUm9vdCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiLCBcIm5cIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIG1hcHBpbmdzOlxyXG4gICAgXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQVwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcEVtcHR5U291cmNlUm9vdCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiLCBcIm5cIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIHNvdXJjZVJvb3Q6IFwiXCIsXHJcbiAgbWFwcGluZ3M6XHJcbiAgICBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEO0NDRGIsSUFBSSxJQUFNLFNBQVVFLEdBQ2xCLE9BQU9BXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwU2luZ2xlU291cmNlID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiXSxcclxuICBzb3VyY2VSb290OiBcIlwiLFxyXG4gIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwRW1wdHlNYXBwaW5ncyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcInR3by5qc1wiXSxcclxuICBzb3VyY2VzQ29udGVudDogW1wiIE9ORS5mb28gPSAxO1wiLCBcIiBUV08uaW5jID0gMjtcIl0sXHJcbiAgc291cmNlUm9vdDogXCJcIixcclxuICBtYXBwaW5nczogXCJcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBFbXB0eU1hcHBpbmdzUmVsYXRpdmVTb3VyY2VzID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wiLi9vbmUuanNcIiwgXCIuL3R3by5qc1wiXSxcclxuICBzb3VyY2VzQ29udGVudDogW1wiIE9ORS5mb28gPSAxO1wiLCBcIiBUV08uaW5jID0gMjtcIl0sXHJcbiAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIixcclxuICBtYXBwaW5nczogXCJcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBFbXB0eU1hcHBpbmdzUmVsYXRpdmVTb3VyY2VzX2dlbmVyYXRlZEV4cGVjdGVkID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIHNvdXJjZXNDb250ZW50OiBbXCIgT05FLmZvbyA9IDE7XCIsIFwiIFRXTy5pbmMgPSAyO1wiXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOiBcIlwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcE11bHRpU291cmNlc01hcHBpbmdSZWZlcnNTaW5nbGVTb3VyY2VPbmx5ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcIndpdGhvdXRNYXBwaW5ncy5qc1wiXSxcclxuICBzb3VyY2VSb290OiBcIlwiLFxyXG4gIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCJcclxufTtcclxuLy8gVGhpcyBtYXBwaW5nIGlzIGlkZW50aWNhbCB0byBhYm92ZSwgYnV0IHVzZXMgdGhlIGluZGV4ZWQgZm9ybWF0IGluc3RlYWQuXHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXAgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1wib25lLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcblwiICsgXCIgICByZXR1cm4gYmF6KGJhcik7XFxuXCIgKyBcIiB9O1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDEsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1widHdvLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcIm5cIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0FcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuZXhwb3J0cy5pbmRleGVkVGVzdE1hcERpZmZlcmVudFNvdXJjZVJvb3RzID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBzZWN0aW9uczogW1xyXG4gICAge1xyXG4gICAgICBvZmZzZXQ6IHtcclxuICAgICAgICBsaW5lOiAwLFxyXG4gICAgICAgIGNvbHVtbjogMFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcIm9uZS5qc1wiXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG5cIiArIFwiICAgcmV0dXJuIGJheihiYXIpO1xcblwiICsgXCIgfTtcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiXSxcclxuICAgICAgICBtYXBwaW5nczogXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRFwiLFxyXG4gICAgICAgIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgICAgICAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBvZmZzZXQ6IHtcclxuICAgICAgICBsaW5lOiAxLFxyXG4gICAgICAgIGNvbHVtbjogMFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcInR3by5qc1wiXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuXCIgKyBcIiAgIHJldHVybiBuICsgMTtcXG5cIiArIFwiIH07XCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXCJuXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9BXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi9kaWZmZXJlbnQvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdXHJcbn07XHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXBDb2x1bW5PZmZzZXQgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1wib25lLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcblwiICsgXCIgICByZXR1cm4gYmF6KGJhcik7XFxuXCIgKyBcIiB9O1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgLy8gUHJldmlvdXMgc2VjdGlvbidzIGxhc3QgZ2VuZXJhdGVkIG1hcHBpbmcgaXMgWzMyLCBJbmZpbml0eSksIHNvXHJcbiAgICAgICAgLy8gd2UncmUgcGxhY2luZyB0aGlzIGEgYml0IGFmdGVyIHRoYXQuXHJcbiAgICAgICAgY29sdW1uOiA1MFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcInR3by5qc1wiXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuXCIgKyBcIiAgIHJldHVybiBuICsgMTtcXG5cIiArIFwiIH07XCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXCJuXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9BXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdXHJcbn07XHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXBXaXRoTWFwcGluZ3NBdFNlY3Rpb25TdGFydCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDogeyBsaW5lOiAwLCBjb2x1bW46IDAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBuYW1lczogW1wiZmlyc3RcIiwgXCJzZWNvbmRcIl0sXHJcbiAgICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkFBQUFBLENDQ0NDXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7IGxpbmU6IDAsIGNvbHVtbjogMiB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIG5hbWVzOiBbXCJ0aGlyZFwiLCBcImZvdXJ0aFwiXSxcclxuICAgICAgICBzb3VyY2VzOiBbXCJiYXouanNcIiwgXCJxdXV4LmpzXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkFBQUFBLENDQ0NDXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuZXhwb3J0cy50ZXN0TWFwV2l0aFNvdXJjZXNDb250ZW50ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCIsIFwiblwiXSxcclxuICBzb3VyY2VzOiBbXCJvbmUuanNcIiwgXCJ0d28uanNcIl0sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgIFwiIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuXCIgKyBcIiAgIHJldHVybiBiYXooYmFyKTtcXG5cIiArIFwiIH07XCIsXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIixcclxuICBtYXBwaW5nczpcclxuICAgIFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSUQ7Q0NEYixJQUFJLElBQU0sU0FBVUUsR0FDbEIsT0FBT0FcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBSZWxhdGl2ZVNvdXJjZXMgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIiwgXCJuXCJdLFxyXG4gIHNvdXJjZXM6IFtcIi4vb25lLmpzXCIsIFwiLi90d28uanNcIl0sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgIFwiIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuXCIgKyBcIiAgIHJldHVybiBiYXooYmFyKTtcXG5cIiArIFwiIH07XCIsXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIixcclxuICBtYXBwaW5nczpcclxuICAgIFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSUQ7Q0NEYixJQUFJLElBQU0sU0FBVUUsR0FDbEIsT0FBT0FcIlxyXG59O1xyXG5leHBvcnRzLmVtcHR5TWFwID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW10sXHJcbiAgbWFwcGluZ3M6IFwiXCJcclxufTtcclxuZXhwb3J0cy5tYXBXaXRoU291cmNlbGVzc01hcHBpbmcgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcImV4YW1wbGUuanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wiZXhhbXBsZS5qc1wiXSxcclxuICBtYXBwaW5nczogXCJBQWdDQSxDXCJcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFzc2VydE1hcHBpbmcoXHJcbiAgZ2VuZXJhdGVkTGluZSxcclxuICBnZW5lcmF0ZWRDb2x1bW4sXHJcbiAgb3JpZ2luYWxTb3VyY2UsXHJcbiAgb3JpZ2luYWxMaW5lLFxyXG4gIG9yaWdpbmFsQ29sdW1uLFxyXG4gIG5hbWUsXHJcbiAgYmlhcyxcclxuICBtYXAsXHJcbiAgYXNzZXJ0LFxyXG4gIGRvbnRUZXN0R2VuZXJhdGVkLFxyXG4gIGRvbnRUZXN0T3JpZ2luYWxcclxuKSB7XHJcbiAgaWYgKCFkb250VGVzdE9yaWdpbmFsKSB7XHJcbiAgICB2YXIgb3JpZ01hcHBpbmcgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICAgIGxpbmU6IGdlbmVyYXRlZExpbmUsXHJcbiAgICAgIGNvbHVtbjogZ2VuZXJhdGVkQ29sdW1uLFxyXG4gICAgICBiaWFzOiBiaWFzXHJcbiAgICB9KTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgb3JpZ01hcHBpbmcubmFtZSxcclxuICAgICAgbmFtZSxcclxuICAgICAgXCJJbmNvcnJlY3QgbmFtZSwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG5hbWUpICtcclxuICAgICAgICBcIiwgZ290IFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShvcmlnTWFwcGluZy5uYW1lKVxyXG4gICAgKTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgb3JpZ01hcHBpbmcubGluZSxcclxuICAgICAgb3JpZ2luYWxMaW5lLFxyXG4gICAgICBcIkluY29ycmVjdCBsaW5lLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxMaW5lKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcubGluZSlcclxuICAgICk7XHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIG9yaWdNYXBwaW5nLmNvbHVtbixcclxuICAgICAgb3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgIFwiSW5jb3JyZWN0IGNvbHVtbiwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsQ29sdW1uKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcuY29sdW1uKVxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgZXhwZWN0ZWRTb3VyY2U7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvcmlnaW5hbFNvdXJjZSAmJlxyXG4gICAgICBtYXAuc291cmNlUm9vdCAmJlxyXG4gICAgICBvcmlnaW5hbFNvdXJjZS5pbmRleE9mKG1hcC5zb3VyY2VSb290KSA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIGV4cGVjdGVkU291cmNlID0gb3JpZ2luYWxTb3VyY2U7XHJcbiAgICB9IGVsc2UgaWYgKG9yaWdpbmFsU291cmNlKSB7XHJcbiAgICAgIGV4cGVjdGVkU291cmNlID0gbWFwLnNvdXJjZVJvb3RcclxuICAgICAgICA/IHV0aWwuam9pbihtYXAuc291cmNlUm9vdCwgb3JpZ2luYWxTb3VyY2UpXHJcbiAgICAgICAgOiBvcmlnaW5hbFNvdXJjZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGV4cGVjdGVkU291cmNlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIG9yaWdNYXBwaW5nLnNvdXJjZSxcclxuICAgICAgZXhwZWN0ZWRTb3VyY2UsXHJcbiAgICAgIFwiSW5jb3JyZWN0IHNvdXJjZSwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkU291cmNlKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcuc291cmNlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmICghZG9udFRlc3RHZW5lcmF0ZWQpIHtcclxuICAgIHZhciBnZW5NYXBwaW5nID0gbWFwLmdlbmVyYXRlZFBvc2l0aW9uRm9yKHtcclxuICAgICAgc291cmNlOiBvcmlnaW5hbFNvdXJjZSxcclxuICAgICAgbGluZTogb3JpZ2luYWxMaW5lLFxyXG4gICAgICBjb2x1bW46IG9yaWdpbmFsQ29sdW1uLFxyXG4gICAgICBiaWFzOiBiaWFzXHJcbiAgICB9KTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgZ2VuTWFwcGluZy5saW5lLFxyXG4gICAgICBnZW5lcmF0ZWRMaW5lLFxyXG4gICAgICBcIkluY29ycmVjdCBsaW5lLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2VuZXJhdGVkTGluZSkgK1xyXG4gICAgICAgIFwiLCBnb3QgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdlbk1hcHBpbmcubGluZSlcclxuICAgICk7XHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIGdlbk1hcHBpbmcuY29sdW1uLFxyXG4gICAgICBnZW5lcmF0ZWRDb2x1bW4sXHJcbiAgICAgIFwiSW5jb3JyZWN0IGNvbHVtbiwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdlbmVyYXRlZENvbHVtbikgK1xyXG4gICAgICAgIFwiLCBnb3QgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdlbk1hcHBpbmcuY29sdW1uKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuZXhwb3J0cy5hc3NlcnRNYXBwaW5nID0gYXNzZXJ0TWFwcGluZztcclxuXHJcbmZ1bmN0aW9uIGFzc2VydEVxdWFsTWFwcyhhc3NlcnQsIGFjdHVhbE1hcCwgZXhwZWN0ZWRNYXApIHtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsTWFwLnZlcnNpb24sIGV4cGVjdGVkTWFwLnZlcnNpb24sIFwidmVyc2lvbiBtaXNtYXRjaFwiKTtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsTWFwLmZpbGUsIGV4cGVjdGVkTWFwLmZpbGUsIFwiZmlsZSBtaXNtYXRjaFwiKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBhY3R1YWxNYXAubmFtZXMubGVuZ3RoLFxyXG4gICAgZXhwZWN0ZWRNYXAubmFtZXMubGVuZ3RoLFxyXG4gICAgXCJuYW1lcyBsZW5ndGggbWlzbWF0Y2g6IFwiICtcclxuICAgICAgYWN0dWFsTWFwLm5hbWVzLmpvaW4oXCIsIFwiKSArXHJcbiAgICAgIFwiICE9IFwiICtcclxuICAgICAgZXhwZWN0ZWRNYXAubmFtZXMuam9pbihcIiwgXCIpXHJcbiAgKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbE1hcC5uYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBhY3R1YWxNYXAubmFtZXNbaV0sXHJcbiAgICAgIGV4cGVjdGVkTWFwLm5hbWVzW2ldLFxyXG4gICAgICBcIm5hbWVzW1wiICtcclxuICAgICAgICBpICtcclxuICAgICAgICBcIl0gbWlzbWF0Y2g6IFwiICtcclxuICAgICAgICBhY3R1YWxNYXAubmFtZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgICBcIiAhPSBcIiArXHJcbiAgICAgICAgZXhwZWN0ZWRNYXAubmFtZXMuam9pbihcIiwgXCIpXHJcbiAgICApO1xyXG4gIH1cclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBhY3R1YWxNYXAuc291cmNlcy5sZW5ndGgsXHJcbiAgICBleHBlY3RlZE1hcC5zb3VyY2VzLmxlbmd0aCxcclxuICAgIFwic291cmNlcyBsZW5ndGggbWlzbWF0Y2g6IFwiICtcclxuICAgICAgYWN0dWFsTWFwLnNvdXJjZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgXCIgIT0gXCIgK1xyXG4gICAgICBleHBlY3RlZE1hcC5zb3VyY2VzLmpvaW4oXCIsIFwiKVxyXG4gICk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3R1YWxNYXAuc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBhY3R1YWxNYXAuc291cmNlc1tpXSxcclxuICAgICAgZXhwZWN0ZWRNYXAuc291cmNlc1tpXSxcclxuICAgICAgXCJzb3VyY2VzW1wiICtcclxuICAgICAgICBpICtcclxuICAgICAgICBcIl0gbGVuZ3RoIG1pc21hdGNoOiBcIiArXHJcbiAgICAgICAgYWN0dWFsTWFwLnNvdXJjZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgICBcIiAhPSBcIiArXHJcbiAgICAgICAgZXhwZWN0ZWRNYXAuc291cmNlcy5qb2luKFwiLCBcIilcclxuICAgICk7XHJcbiAgfVxyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGFjdHVhbE1hcC5zb3VyY2VSb290LFxyXG4gICAgZXhwZWN0ZWRNYXAuc291cmNlUm9vdCxcclxuICAgIFwic291cmNlUm9vdCBtaXNtYXRjaDogXCIgK1xyXG4gICAgICBhY3R1YWxNYXAuc291cmNlUm9vdCArXHJcbiAgICAgIFwiICE9IFwiICtcclxuICAgICAgZXhwZWN0ZWRNYXAuc291cmNlUm9vdFxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgYWN0dWFsTWFwLm1hcHBpbmdzLFxyXG4gICAgZXhwZWN0ZWRNYXAubWFwcGluZ3MsXHJcbiAgICBcIm1hcHBpbmdzIG1pc21hdGNoOlxcbkFjdHVhbDogICBcIiArXHJcbiAgICAgIGFjdHVhbE1hcC5tYXBwaW5ncyArXHJcbiAgICAgIFwiXFxuRXhwZWN0ZWQ6IFwiICtcclxuICAgICAgZXhwZWN0ZWRNYXAubWFwcGluZ3NcclxuICApO1xyXG4gIGlmIChhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQpIHtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgYWN0dWFsTWFwLnNvdXJjZXNDb250ZW50Lmxlbmd0aCxcclxuICAgICAgZXhwZWN0ZWRNYXAuc291cmNlc0NvbnRlbnQubGVuZ3RoLFxyXG4gICAgICBcInNvdXJjZXNDb250ZW50IGxlbmd0aCBtaXNtYXRjaFwiXHJcbiAgICApO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICAgIGFjdHVhbE1hcC5zb3VyY2VzQ29udGVudFtpXSxcclxuICAgICAgICBleHBlY3RlZE1hcC5zb3VyY2VzQ29udGVudFtpXSxcclxuICAgICAgICBcInNvdXJjZXNDb250ZW50W1wiICsgaSArIFwiXSBtaXNtYXRjaFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuYXNzZXJ0RXF1YWxNYXBzID0gYXNzZXJ0RXF1YWxNYXBzO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9