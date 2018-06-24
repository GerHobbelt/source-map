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
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
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
  throw new Error('No element indexed by ' + aIdx);
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
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
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
  return isNegative
    ? -shifted
    : shifted;
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

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
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
  }
  else if (cmp > 0) {
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
  }
  else {
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

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
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
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
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
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
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
  return Math.round(low + (random() * (high - low)));
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
exports.quickSort = function (ary, comparator) {
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
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
}

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
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
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
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
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
    mappings.map(function (mapping) {
      var source = null;
      if(mapping.source !== null) {
        source = this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
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
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
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
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
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
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
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
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
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
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
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
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
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
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
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
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
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
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
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
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
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
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
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
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
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
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
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
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
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
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
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
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
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
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
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
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
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
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
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
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
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
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
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
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
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
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
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
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
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
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
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
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
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
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

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
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
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
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
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
    var newSources = this._mappings.toArray().length > 0
      ? new ArraySet()
      : this._sources;
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
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
            mapping.source = util.join(aSourceMapPath, mapping.source)
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
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
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
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
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

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
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
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
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
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
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
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
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

  return function (input) {
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
      result,
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
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
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
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
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
    aRoot = aRootUrl.path || '/';
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

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
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

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
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

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
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
    return '$' + aStr;
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

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
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
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
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
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
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
      var index = parsed.path.lastIndexOf('/');
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
var IndexedSourceMapConsumer = __webpack_require__(/*! ../lib/source-map-consumer */ "./lib/source-map-consumer.js").IndexedSourceMapConsumer;
var BasicSourceMapConsumer = __webpack_require__(/*! ../lib/source-map-consumer */ "./lib/source-map-consumer.js").BasicSourceMapConsumer;
var SourceMapGenerator = __webpack_require__(/*! ../lib/source-map-generator */ "./lib/source-map-generator.js").SourceMapGenerator;

exports['test that we can instantiate with a string or an object'] = function (assert) {
  assert.doesNotThrow(function () {
    var map = new SourceMapConsumer(util.testMap);
  });
  assert.doesNotThrow(function () {
    var map = new SourceMapConsumer(JSON.stringify(util.testMap));
  });
};

exports['test that the object returned from new SourceMapConsumer inherits from SourceMapConsumer'] = function (assert) {
  assert.ok(new SourceMapConsumer(util.testMap) instanceof SourceMapConsumer);
}

exports['test that a BasicSourceMapConsumer is returned for sourcemaps without sections'] = function(assert) {
  assert.ok(new SourceMapConsumer(util.testMap) instanceof BasicSourceMapConsumer);
};

exports['test that an IndexedSourceMapConsumer is returned for sourcemaps with sections'] = function(assert) {
  assert.ok(new SourceMapConsumer(util.indexedTestMap) instanceof IndexedSourceMapConsumer);
};

exports['test that the `sources` field has the original sources'] = function (assert) {
  var map;
  var sources;

  map = new SourceMapConsumer(util.testMap);
  sources = map.sources;
  assert.equal(sources[0], '/the/root/one.js');
  assert.equal(sources[1], '/the/root/two.js');
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.indexedTestMap);
  sources = map.sources;
  assert.equal(sources[0], '/the/root/one.js');
  assert.equal(sources[1], '/the/root/two.js');
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.indexedTestMapDifferentSourceRoots);
  sources = map.sources;
  assert.equal(sources[0], '/the/root/one.js');
  assert.equal(sources[1], '/different/root/two.js');
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.testMapNoSourceRoot);
  sources = map.sources;
  assert.equal(sources[0], 'one.js');
  assert.equal(sources[1], 'two.js');
  assert.equal(sources.length, 2);

  map = new SourceMapConsumer(util.testMapEmptySourceRoot);
  sources = map.sources;
  assert.equal(sources[0], 'one.js');
  assert.equal(sources[1], 'two.js');
  assert.equal(sources.length, 2);
};

exports['test that the source root is reflected in a mapping\'s source field'] = function (assert) {
  var map;
  var mapping;

  map = new SourceMapConsumer(util.testMap);

  mapping = map.originalPositionFor({
    line: 2,
    column: 1
  });
  assert.equal(mapping.source, '/the/root/two.js');

  mapping = map.originalPositionFor({
    line: 1,
    column: 1
  });
  assert.equal(mapping.source, '/the/root/one.js');


  map = new SourceMapConsumer(util.testMapNoSourceRoot);

  mapping = map.originalPositionFor({
    line: 2,
    column: 1
  });
  assert.equal(mapping.source, 'two.js');

  mapping = map.originalPositionFor({
    line: 1,
    column: 1
  });
  assert.equal(mapping.source, 'one.js');


  map = new SourceMapConsumer(util.testMapEmptySourceRoot);

  mapping = map.originalPositionFor({
    line: 2,
    column: 1
  });
  assert.equal(mapping.source, 'two.js');

  mapping = map.originalPositionFor({
    line: 1,
    column: 1
  });
  assert.equal(mapping.source, 'one.js');
};

exports['test mapping tokens back exactly'] = function (assert) {
  var map = new SourceMapConsumer(util.testMap);

  util.assertMapping(1, 1, '/the/root/one.js', 1, 1, null, null, map, assert);
  util.assertMapping(1, 5, '/the/root/one.js', 1, 5, null, null, map, assert);
  util.assertMapping(1, 9, '/the/root/one.js', 1, 11, null, null, map, assert);
  util.assertMapping(1, 18, '/the/root/one.js', 1, 21, 'bar', null, map, assert);
  util.assertMapping(1, 21, '/the/root/one.js', 2, 3, null, null, map, assert);
  util.assertMapping(1, 28, '/the/root/one.js', 2, 10, 'baz', null, map, assert);
  util.assertMapping(1, 32, '/the/root/one.js', 2, 14, 'bar', null, map, assert);

  util.assertMapping(2, 1, '/the/root/two.js', 1, 1, null, null, map, assert);
  util.assertMapping(2, 5, '/the/root/two.js', 1, 5, null, null, map, assert);
  util.assertMapping(2, 9, '/the/root/two.js', 1, 11, null, null, map, assert);
  util.assertMapping(2, 18, '/the/root/two.js', 1, 21, 'n', null, map, assert);
  util.assertMapping(2, 21, '/the/root/two.js', 2, 3, null, null, map, assert);
  util.assertMapping(2, 28, '/the/root/two.js', 2, 10, 'n', null, map, assert);
};

exports['test mapping tokens back exactly in indexed source map'] = function (assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);

  util.assertMapping(1, 1, '/the/root/one.js', 1, 1, null, null, map, assert);
  util.assertMapping(1, 5, '/the/root/one.js', 1, 5, null, null, map, assert);
  util.assertMapping(1, 9, '/the/root/one.js', 1, 11, null, null, map, assert);
  util.assertMapping(1, 18, '/the/root/one.js', 1, 21, 'bar', null, map, assert);
  util.assertMapping(1, 21, '/the/root/one.js', 2, 3, null, null, map, assert);
  util.assertMapping(1, 28, '/the/root/one.js', 2, 10, 'baz', null, map, assert);
  util.assertMapping(1, 32, '/the/root/one.js', 2, 14, 'bar', null, map, assert);

  util.assertMapping(2, 1, '/the/root/two.js', 1, 1, null, null, map, assert);
  util.assertMapping(2, 5, '/the/root/two.js', 1, 5, null, null, map, assert);
  util.assertMapping(2, 9, '/the/root/two.js', 1, 11, null, null, map, assert);
  util.assertMapping(2, 18, '/the/root/two.js', 1, 21, 'n', null, map, assert);
  util.assertMapping(2, 21, '/the/root/two.js', 2, 3, null, null, map, assert);
  util.assertMapping(2, 28, '/the/root/two.js', 2, 10, 'n', null, map, assert);
};

exports['test mapping tokens fuzzy'] = function (assert) {
  var map = new SourceMapConsumer(util.testMap);

  // Finding original positions with default (glb) bias.
  util.assertMapping(1, 20, '/the/root/one.js', 1, 21, 'bar', null, map, assert, true);
  util.assertMapping(1, 30, '/the/root/one.js', 2, 10, 'baz', null, map, assert, true);
  util.assertMapping(2, 12, '/the/root/two.js', 1, 11, null, null, map, assert, true);

  // Finding original positions with lub bias.
  util.assertMapping(1, 16, '/the/root/one.js', 1, 21, 'bar', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 26, '/the/root/one.js', 2, 10, 'baz', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 6, '/the/root/two.js', 1, 11, null, SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, true);

  // Finding generated positions with default (glb) bias.
  util.assertMapping(1, 18, '/the/root/one.js', 1, 22, 'bar', null, map, assert, null, true);
  util.assertMapping(1, 28, '/the/root/one.js', 2, 13, 'baz', null, map, assert, null, true);
  util.assertMapping(2, 9, '/the/root/two.js', 1, 16, null, null, map, assert, null, true);

  // Finding generated positions with lub bias.
  util.assertMapping(1, 18, '/the/root/one.js', 1, 20, 'bar', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
  util.assertMapping(1, 28, '/the/root/one.js', 2, 7, 'baz', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
  util.assertMapping(2, 9, '/the/root/two.js', 1, 6, null, SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
};

exports['test mapping tokens fuzzy in indexed source map'] = function (assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);

  // Finding original positions with default (glb) bias.
  util.assertMapping(1, 20, '/the/root/one.js', 1, 21, 'bar', null, map, assert, true);
  util.assertMapping(1, 30, '/the/root/one.js', 2, 10, 'baz', null, map, assert, true);
  util.assertMapping(2, 12, '/the/root/two.js', 1, 11, null, null, map, assert, true);

  // Finding original positions with lub bias.
  util.assertMapping(1, 16, '/the/root/one.js', 1, 21, 'bar', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 26, '/the/root/one.js', 2, 10, 'baz', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 6, '/the/root/two.js', 1, 11, null, SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, true);

  // Finding generated positions with default (glb) bias.
  util.assertMapping(1, 18, '/the/root/one.js', 1, 22, 'bar', null, map, assert, null, true);
  util.assertMapping(1, 28, '/the/root/one.js', 2, 13, 'baz', null, map, assert, null, true);
  util.assertMapping(2, 9, '/the/root/two.js', 1, 16, null, null, map, assert, null, true);

  // Finding generated positions with lub bias.
  util.assertMapping(1, 18, '/the/root/one.js', 1, 20, 'bar', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
  util.assertMapping(1, 28, '/the/root/one.js', 2, 7, 'baz', SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
  util.assertMapping(2, 9, '/the/root/two.js', 1, 6, null, SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
};

exports['test mappings and end of lines'] = function (assert) {
  var smg = new SourceMapGenerator({
    file: 'foo.js'
  });
  smg.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 1 },
    source: 'bar.js'
  });
  smg.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 2, column: 2 },
    source: 'bar.js'
  });
  smg.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 1 },
    source: 'baz.js'
  });

  var map = SourceMapConsumer.fromSourceMap(smg);

  // When finding original positions, mappings end at the end of the line.
  util.assertMapping(2, 1, null, null, null, null, null, map, assert, true)

  // When finding generated positions, mappings do not end at the end of the line.
  util.assertMapping(1, 1, 'bar.js', 2, 1, null, null, map, assert, null, true);

  // When finding generated positions with, mappings end at the end of the source.
  util.assertMapping(null, null, 'bar.js', 3, 1, null, SourceMapConsumer.LEAST_UPPER_BOUND, map, assert, null, true);
};

exports['test creating source map consumers with )]}\' prefix'] = function (assert) {
  assert.doesNotThrow(function () {
    var map = new SourceMapConsumer(")]}'\n" + JSON.stringify(util.testMap));
  });
};

exports['test eachMapping'] = function (assert) {
  var map;

  map = new SourceMapConsumer(util.testMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  map.eachMapping(function (mapping) {
    assert.ok(mapping.generatedLine >= previousLine);

    assert.ok(mapping.source === '/the/root/one.js' || mapping.source === '/the/root/two.js');

    if (mapping.generatedLine === previousLine) {
      assert.ok(mapping.generatedColumn >= previousColumn);
      previousColumn = mapping.generatedColumn;
    }
    else {
      previousLine = mapping.generatedLine;
      previousColumn = -Infinity;
    }
  });

  map = new SourceMapConsumer(util.testMapNoSourceRoot);
  map.eachMapping(function (mapping) {
    assert.ok(mapping.source === 'one.js' || mapping.source === 'two.js');
  });

  map = new SourceMapConsumer(util.testMapEmptySourceRoot);
  map.eachMapping(function (mapping) {
    assert.ok(mapping.source === 'one.js' || mapping.source === 'two.js');
  });

  map = new SourceMapConsumer(util.mapWithSourcelessMapping);
  map.eachMapping(function (mapping) {
    assert.ok(mapping.source === null || (typeof mapping.originalColumn === 'number' && typeof mapping.originalLine === 'number'));
  });
};

exports['test eachMapping for indexed source maps'] = function(assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  map.eachMapping(function (mapping) {
    assert.ok(mapping.generatedLine >= previousLine);

    if (mapping.source) {
      assert.equal(mapping.source.indexOf(util.testMap.sourceRoot), 0);
    }

    if (mapping.generatedLine === previousLine) {
      assert.ok(mapping.generatedColumn >= previousColumn);
      previousColumn = mapping.generatedColumn;
    }
    else {
      previousLine = mapping.generatedLine;
      previousColumn = -Infinity;
    }
  });
};


exports['test iterating over mappings in a different order'] = function (assert) {
  var map = new SourceMapConsumer(util.testMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  var previousSource = "";
  map.eachMapping(function (mapping) {
    assert.ok(mapping.source >= previousSource);

    if (mapping.source === previousSource) {
      assert.ok(mapping.originalLine >= previousLine);

      if (mapping.originalLine === previousLine) {
        assert.ok(mapping.originalColumn >= previousColumn);
        previousColumn = mapping.originalColumn;
      }
      else {
        previousLine = mapping.originalLine;
        previousColumn = -Infinity;
      }
    }
    else {
      previousSource = mapping.source;
      previousLine = -Infinity;
      previousColumn = -Infinity;
    }
  }, null, SourceMapConsumer.ORIGINAL_ORDER);
};

exports['test iterating over mappings in a different order in indexed source maps'] = function (assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var previousLine = -Infinity;
  var previousColumn = -Infinity;
  var previousSource = "";
  map.eachMapping(function (mapping) {
    assert.ok(mapping.source >= previousSource);

    if (mapping.source === previousSource) {
      assert.ok(mapping.originalLine >= previousLine);

      if (mapping.originalLine === previousLine) {
        assert.ok(mapping.originalColumn >= previousColumn);
        previousColumn = mapping.originalColumn;
      }
      else {
        previousLine = mapping.originalLine;
        previousColumn = -Infinity;
      }
    }
    else {
      previousSource = mapping.source;
      previousLine = -Infinity;
      previousColumn = -Infinity;
    }
  }, null, SourceMapConsumer.ORIGINAL_ORDER);
};

exports['test that we can set the context for `this` in eachMapping'] = function (assert) {
  var map = new SourceMapConsumer(util.testMap);
  var context = {};
  map.eachMapping(function () {
    assert.equal(this, context);
  }, context);
};

exports['test that we can set the context for `this` in eachMapping in indexed source maps'] = function (assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var context = {};
  map.eachMapping(function () {
    assert.equal(this, context);
  }, context);
};

exports['test that the `sourcesContent` field has the original sources'] = function (assert) {
  var map = new SourceMapConsumer(util.testMapWithSourcesContent);
  var sourcesContent = map.sourcesContent;

  assert.equal(sourcesContent[0], ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(sourcesContent[1], ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.equal(sourcesContent.length, 2);
};

exports['test that we can get the original sources for the sources'] = function (assert) {
  var map = new SourceMapConsumer(util.testMapWithSourcesContent);
  var sources = map.sources;

  assert.equal(map.sourceContentFor(sources[0]), ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(map.sourceContentFor(sources[1]), ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.equal(map.sourceContentFor("one.js"), ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(map.sourceContentFor("two.js"), ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.throws(function () {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function () {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function () {
    map.sourceContentFor("three.js");
  }, Error);
};

exports['test that we can get the original source content with relative source paths'] = function (assert) {
  var map = new SourceMapConsumer(util.testMapRelativeSources);
  var sources = map.sources;

  assert.equal(map.sourceContentFor(sources[0]), ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(map.sourceContentFor(sources[1]), ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.equal(map.sourceContentFor("one.js"), ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(map.sourceContentFor("two.js"), ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.throws(function () {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function () {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function () {
    map.sourceContentFor("three.js");
  }, Error);
};

exports['test that we can get the original source content for the sources on an indexed source map'] = function (assert) {
  var map = new SourceMapConsumer(util.indexedTestMap);
  var sources = map.sources;

  assert.equal(map.sourceContentFor(sources[0]), ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(map.sourceContentFor(sources[1]), ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.equal(map.sourceContentFor("one.js"), ' ONE.foo = function (bar) {\n   return baz(bar);\n };');
  assert.equal(map.sourceContentFor("two.js"), ' TWO.inc = function (n) {\n   return n + 1;\n };');
  assert.throws(function () {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function () {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function () {
    map.sourceContentFor("three.js");
  }, Error);
};

exports['test hasContentsOfAllSources, single source with contents'] = function (assert) {
  // Has one source: foo.js (with contents).
  var mapWithContents = new SourceMapGenerator();
  mapWithContents.addMapping({ source: 'foo.js',
                               original: { line: 1, column: 10 },
                               generated: { line: 1, column: 10 } });
  mapWithContents.setSourceContent('foo.js', 'content of foo.js');
  var consumer = new SourceMapConsumer(mapWithContents.toJSON());
  assert.ok(consumer.hasContentsOfAllSources());
};

exports['test hasContentsOfAllSources, single source without contents'] = function (assert) {
  // Has one source: foo.js (without contents).
  var mapWithoutContents = new SourceMapGenerator();
  mapWithoutContents.addMapping({ source: 'foo.js',
                                  original: { line: 1, column: 10 },
                                  generated: { line: 1, column: 10 } });
  var consumer = new SourceMapConsumer(mapWithoutContents.toJSON());
  assert.ok(!consumer.hasContentsOfAllSources());
};

exports['test hasContentsOfAllSources, two sources with contents'] = function (assert) {
  // Has two sources: foo.js (with contents) and bar.js (with contents).
  var mapWithBothContents = new SourceMapGenerator();
  mapWithBothContents.addMapping({ source: 'foo.js',
                                   original: { line: 1, column: 10 },
                                   generated: { line: 1, column: 10 } });
  mapWithBothContents.addMapping({ source: 'bar.js',
                                   original: { line: 1, column: 10 },
                                   generated: { line: 1, column: 10 } });
  mapWithBothContents.setSourceContent('foo.js', 'content of foo.js');
  mapWithBothContents.setSourceContent('bar.js', 'content of bar.js');
  var consumer = new SourceMapConsumer(mapWithBothContents.toJSON());
  assert.ok(consumer.hasContentsOfAllSources());
};

exports['test hasContentsOfAllSources, two sources one with and one without contents'] = function (assert) {
  // Has two sources: foo.js (with contents) and bar.js (without contents).
  var mapWithoutSomeContents = new SourceMapGenerator();
  mapWithoutSomeContents.addMapping({ source: 'foo.js',
                                      original: { line: 1, column: 10 },
                                      generated: { line: 1, column: 10 } });
  mapWithoutSomeContents.addMapping({ source: 'bar.js',
                                      original: { line: 1, column: 10 },
                                      generated: { line: 1, column: 10 } });
  mapWithoutSomeContents.setSourceContent('foo.js', 'content of foo.js');
  var consumer = new SourceMapConsumer(mapWithoutSomeContents.toJSON());
  assert.ok(!consumer.hasContentsOfAllSources());
};

exports['test sourceRoot + generatedPositionFor'] = function (assert) {
  var map = new SourceMapGenerator({
    sourceRoot: 'foo/bar',
    file: 'baz.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'bang.coffee'
  });
  map.addMapping({
    original: { line: 5, column: 5 },
    generated: { line: 6, column: 6 },
    source: 'bang.coffee'
  });
  map = new SourceMapConsumer(map.toString(), 'http://example.com/');

  // Should handle without sourceRoot.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: 'bang.coffee'
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  // Should handle with sourceRoot.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: 'foo/bar/bang.coffee'
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  // Should handle absolute case.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: 'http://example.com/foo/bar/bang.coffee'
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);
};

exports['test sourceRoot + generatedPositionFor for path above the root'] = function (assert) {
  var map = new SourceMapGenerator({
    sourceRoot: 'foo/bar',
    file: 'baz.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: '../bang.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  // Should handle with sourceRoot.
  var pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: 'foo/bang.coffee'
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);
};

exports['test allGeneratedPositionsFor for line'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'bar.coffee'
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 3, column: 2 },
    source: 'bar.coffee'
  });
  map.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 3, column: 3 },
    source: 'bar.coffee'
  });
  map.addMapping({
    original: { line: 3, column: 1 },
    generated: { line: 4, column: 2 },
    source: 'bar.coffee'
  });
  map = new SourceMapConsumer(map.toString(), 'http://example.com/');

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: 'bar.coffee'
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 3);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 3);
  assert.equal(mappings[1].column, 3);

  mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: 'http://example.com/bar.coffee'
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 3);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 3);
  assert.equal(mappings[1].column, 3);
};

exports['test allGeneratedPositionsFor for line fuzzy'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'bar.coffee'
  });
  map.addMapping({
    original: { line: 3, column: 1 },
    generated: { line: 4, column: 2 },
    source: 'bar.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: 'bar.coffee'
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].line, 4);
  assert.equal(mappings[0].column, 2);
};

exports['test allGeneratedPositionsFor for empty source map'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: 'bar.coffee'
  });

  assert.equal(mappings.length, 0);
};

exports['test allGeneratedPositionsFor for column'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 2 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 3 },
    source: 'foo.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 1,
    source: 'foo.coffee'
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 1);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 1);
  assert.equal(mappings[1].column, 3);
};

exports['test allGeneratedPositionsFor for column fuzzy'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 2 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 3 },
    source: 'foo.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 0,
    source: 'foo.coffee'
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 1);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 1);
  assert.equal(mappings[1].column, 3);
};

exports['test allGeneratedPositionsFor for column on different line fuzzy'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 2, column: 3 },
    source: 'foo.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 0,
    source: 'foo.coffee'
  });

  assert.equal(mappings.length, 0);
};

exports['test computeColumnSpans'] = function (assert) {
  var map = new SourceMapGenerator({
    file: 'generated.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 1, column: 1 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 2, column: 1 },
    generated: { line: 2, column: 1 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 2, column: 10 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 2, column: 3 },
    generated: { line: 2, column: 20 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 3, column: 1 },
    generated: { line: 3, column: 1 },
    source: 'foo.coffee'
  });
  map.addMapping({
    original: { line: 3, column: 2 },
    generated: { line: 3, column: 2 },
    source: 'foo.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  map.computeColumnSpans();

  var mappings = map.allGeneratedPositionsFor({
    line: 1,
    source: 'foo.coffee'
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].lastColumn, Infinity);

  var mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: 'foo.coffee'
  });

  assert.equal(mappings.length, 3);
  assert.equal(mappings[0].lastColumn, 9);
  assert.equal(mappings[1].lastColumn, 19);
  assert.equal(mappings[2].lastColumn, Infinity);

  var mappings = map.allGeneratedPositionsFor({
    line: 3,
    source: 'foo.coffee'
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].lastColumn, 1);
  assert.equal(mappings[1].lastColumn, Infinity);
};

exports['test sourceRoot + originalPositionFor'] = function (assert) {
  var map = new SourceMapGenerator({
    sourceRoot: 'foo/bar',
    file: 'baz.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'bang.coffee'
  });
  map = new SourceMapConsumer(map.toString());

  var pos = map.originalPositionFor({
    line: 2,
    column: 2,
  });

  // Should always have the prepended source root
  assert.equal(pos.source, 'foo/bar/bang.coffee');
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);
};

exports['test github issue #56'] = function (assert) {
  var map = new SourceMapGenerator({
    sourceRoot: 'http://',
    file: 'www.example.com/foo.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'www.example.com/original.js'
  });
  map = new SourceMapConsumer(map.toString());

  var sources = map.sources;
  assert.equal(sources.length, 1);
  assert.equal(sources[0], 'http://www.example.com/original.js');
};

// Was github issue #43, but that's no longer valid.
exports['test source resolution with sourceMapURL'] = function (assert) {
  var map = new SourceMapGenerator({
    sourceRoot: '',
    file: 'foo.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'original.js',
  });
  map = new SourceMapConsumer(map.toString(), 'http://cdn.example.com');

  var sources = map.sources;
  assert.equal(sources.length, 1,
               'Should only be one source.');
  assert.equal(sources[0], 'http://cdn.example.com/original.js',
               'Should be joined with the source map URL.');
};

exports['test sourceRoot prepending'] = function (assert) {
  var map = new SourceMapGenerator({
    sourceRoot: 'http://example.com/foo/bar',
    file: 'foo.js'
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: '/original.js'
  });
  map = new SourceMapConsumer(map.toString());

  var sources = map.sources;
  assert.equal(sources.length, 1,
               'Should only be one source.');
  assert.equal(sources[0], 'http://example.com/foo/bar/original.js',
               'Source include the source root.');
};

exports['test indexed source map errors when sections are out of order by line'] = function(assert) {
  // Make a deep copy of the indexedTestMap
  var misorderedIndexedTestMap = JSON.parse(JSON.stringify(util.indexedTestMap));

  misorderedIndexedTestMap.sections[0].offset = {
    line: 2,
    column: 0
  };

  assert.throws(function() {
    new SourceMapConsumer(misorderedIndexedTestMap);
  }, Error);
};

exports['test github issue #64'] = function (assert) {
  var map = new SourceMapConsumer({
    "version": 3,
    "file": "foo.js",
    "sourceRoot": "http://example.com/",
    "sources": ["/a"],
    "names": [],
    "mappings": "AACA",
    "sourcesContent": ["foo"]
  });

  assert.equal(map.sourceContentFor("a"), "foo");
  assert.equal(map.sourceContentFor("/a"), "foo");
};

exports['test full source content with sourceMapURL'] = function (assert) {
  var map = new SourceMapConsumer({
    'version': 3,
    'file': 'foo.js',
    'sourceRoot': '',
    'sources': ['original.js'],
    'names': [],
    'mappings': 'AACA',
    'sourcesContent': ['yellow warbler']
  }, 'http://cdn.example.com');

  var sources = map.sources;
  assert.equal(map.sourceContentFor('http://cdn.example.com/original.js'), 'yellow warbler',
               'Source content should be found using full URL');
};

exports['test bug 885597'] = function (assert) {
  var map = new SourceMapConsumer({
    "version": 3,
    "file": "foo.js",
    "sourceRoot": "file:///Users/AlGore/Invented/The/Internet/",
    "sources": ["/a"],
    "names": [],
    "mappings": "AACA",
    "sourcesContent": ["foo"]
  });

  var s = map.sources[0];
  assert.equal(map.sourceContentFor(s), "foo");
};

exports['test github issue #72, duplicate sources'] = function (assert) {
  var map = new SourceMapConsumer({
    "version": 3,
    "file": "foo.js",
    "sources": ["source1.js", "source1.js", "source3.js"],
    "names": [],
    "mappings": ";EAAC;;IAEE;;MEEE",
    "sourceRoot": "http://example.com"
  });

  var pos = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.source, 'http://example.com/source1.js');
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  var pos = map.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.source, 'http://example.com/source1.js');
  assert.equal(pos.line, 3);
  assert.equal(pos.column, 3);

  var pos = map.originalPositionFor({
    line: 6,
    column: 6
  });
  assert.equal(pos.source, 'http://example.com/source3.js');
  assert.equal(pos.line, 5);
  assert.equal(pos.column, 5);
};

exports['test github issue #72, duplicate names'] = function (assert) {
  var map = new SourceMapConsumer({
    "version": 3,
    "file": "foo.js",
    "sources": ["source.js"],
    "names": ["name1", "name1", "name3"],
    "mappings": ";EAACA;;IAEEA;;MAEEE",
    "sourceRoot": "http://example.com"
  });

  var pos = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.name, 'name1');
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  var pos = map.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.name, 'name1');
  assert.equal(pos.line, 3);
  assert.equal(pos.column, 3);

  var pos = map.originalPositionFor({
    line: 6,
    column: 6
  });
  assert.equal(pos.name, 'name3');
  assert.equal(pos.line, 5);
  assert.equal(pos.column, 5);
};

exports['test SourceMapConsumer.fromSourceMap'] = function (assert) {
  var smg = new SourceMapGenerator({
    sourceRoot: 'http://example.com/',
    file: 'foo.js'
  });
  smg.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: 'bar.js'
  });
  smg.addMapping({
    original: { line: 2, column: 2 },
    generated: { line: 4, column: 4 },
    source: 'baz.js',
    name: 'dirtMcGirt'
  });
  smg.setSourceContent('baz.js', 'baz.js content');

  var smc = SourceMapConsumer.fromSourceMap(smg);
  assert.equal(smc.file, 'foo.js');
  assert.equal(smc.sourceRoot, 'http://example.com/');
  assert.equal(smc.sources.length, 2);
  assert.equal(smc.sources[0], 'http://example.com/bar.js');
  assert.equal(smc.sources[1], 'http://example.com/baz.js');
  assert.equal(smc.sourceContentFor('baz.js'), 'baz.js content');

  var pos = smc.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);
  assert.equal(pos.source, 'http://example.com/bar.js');
  assert.equal(pos.name, null);

  pos = smc.generatedPositionFor({
    line: 1,
    column: 1,
    source: 'http://example.com/bar.js'
  });
  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  pos = smc.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);
  assert.equal(pos.source, 'http://example.com/baz.js');
  assert.equal(pos.name, 'dirtMcGirt');

  pos = smc.generatedPositionFor({
    line: 2,
    column: 2,
    source: 'http://example.com/baz.js'
  });
  assert.equal(pos.line, 4);
  assert.equal(pos.column, 4);
};

exports['test issue #191'] = function (assert) {
  var generator = new SourceMapGenerator({ file: 'a.css' });
  generator.addMapping({
    source:   'b.css',
    original: {
      line:   1,
      column: 0
    },
    generated: {
      line:   1,
      column: 0
    }
  });

  // Create a SourceMapConsumer from the SourceMapGenerator, ...
  var consumer  = SourceMapConsumer.fromSourceMap(generator);
  // ... and then try and use the SourceMapGenerator again. This should not
  // throw.
  generator.toJSON();

  assert.ok(true, "Using a SourceMapGenerator again after creating a " +
                  "SourceMapConsumer from it should not throw");
};

exports['test sources where their prefix is the source root: issue #199'] = function (assert) {
  var testSourceMap = {
    "version": 3,
    "sources": ["/source/app/app/app.js"],
    "names": ["System"],
    "mappings": "AAAAA",
    "file": "app/app.js",
    "sourcesContent": ["'use strict';"],
    "sourceRoot":"/source/"
  };

  var consumer = new SourceMapConsumer(testSourceMap);

  function consumerHasSource(s) {
    assert.ok(consumer.sourceContentFor(s));
  }

  consumer.sources.forEach(consumerHasSource);
  testSourceMap.sources.forEach(consumerHasSource);
};

exports['test sources where their prefix is the source root and the source root is a url: issue #199'] = function (assert) {
  var testSourceMap = {
    "version": 3,
    "sources": ["http://example.com/source/app/app/app.js"],
    "names": ["System"],
    "mappings": "AAAAA",
    "sourcesContent": ["'use strict';"],
    "sourceRoot":"http://example.com/source/"
  };

  var consumer = new SourceMapConsumer(testSourceMap);

  function consumerHasSource(s) {
    assert.ok(consumer.sourceContentFor(s));
  }

  consumer.sources.forEach(consumerHasSource);
  testSourceMap.sources.forEach(consumerHasSource);
};

exports['test consuming names and sources that are numbers'] = function (assert) {
  var testSourceMap = {
    "version": 3,
    "sources": [0],
    "names": [1],
    "mappings": "AAAAA",
  };

  var consumer = new SourceMapConsumer(testSourceMap);

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "0");

  var i = 0;
  consumer.eachMapping(function (m) {
    i++;
    assert.equal(m.name, "1");
  });
  assert.equal(i, 1);
};

exports['test non-normalized sourceRoot (from issue #227)'] = function (assert) {
  var consumer = new SourceMapConsumer({
    version: 3,
    sources: [ 'index.js' ],
    names: [],
    mappings: ';;AAAA,IAAI,OAAO,MAAP',
    file: 'index.js',
    sourceRoot: './src/',
    sourcesContent: [ 'var name = "Mark"\n' ]
  });
  assert.equal(consumer.sourceRoot, 'src/', 'sourceRoot was normalized');
  // Before the fix, this threw an exception.
  consumer.sourceContentFor(consumer.sources[0]);
};

exports['test webpack URL resolution'] = function (assert) {
  var map = {
    version: 3,
    sources:  ["webpack:///webpack/bootstrap 67e184f9679733298d44"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: ""
  };
  var consumer = new SourceMapConsumer(map);

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap 67e184f9679733298d44");
};

exports['test webpack URL resolution with sourceMapURL'] = function (assert) {
  var map = {
    version: 3,
    sources:  ["webpack:///webpack/bootstrap 67e184f9679733298d44"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: ""
  };
  var consumer = new SourceMapConsumer(map, 'http://www.example.com/q.js.map');

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap 67e184f9679733298d44");
};

exports['test relative webpack URL resolution with sourceMapURL'] = function (assert) {
  var map = {
    version: 3,
    sources:  ["webpack/bootstrap.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "webpack:///"
  };
  var consumer = new SourceMapConsumer(map, 'http://www.example.com/q.js.map');

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap.js");
};

exports['test basic URL resolution with sourceMapURL'] = function (assert) {
  var map = {
    version: 3,
    sources:  ["something.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "src"
  };
  var consumer = new SourceMapConsumer(map, 'http://www.example.com/x/q.js.map');

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], 'http://www.example.com/x/src/something.js');
};

exports['test absolute sourceURL resolution with sourceMapURL'] = function (assert) {
  var map = {
    version: 3,
    sources:  ["something.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "http://www.example.com/src"
  };
  var consumer = new SourceMapConsumer(map, 'http://www.example.com/x/q.js.map');

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], 'http://www.example.com/src/something.js');
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
exports.testGeneratedCode = " ONE.foo=function(a){return baz(a);};\n"+
                            " TWO.inc=function(a){return a+1;};";
exports.testMap = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz', 'n'],
  sources: ['one.js', 'two.js'],
  sourceRoot: '/the/root',
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
};
exports.testMapNoSourceRoot = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz', 'n'],
  sources: ['one.js', 'two.js'],
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
};
exports.testMapEmptySourceRoot = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz', 'n'],
  sources: ['one.js', 'two.js'],
  sourceRoot: '',
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
};
exports.testMapSingleSource = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz'],
  sources: ['one.js'],
  sourceRoot: '',
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID'
};
exports.testMapEmptyMappings = {
  version: 3,
  file: 'min.js',
  names: [],
  sources: ['one.js', 'two.js'],
  sourcesContent: [
    ' ONE.foo = 1;',
    ' TWO.inc = 2;'
  ],
  sourceRoot: '',
  mappings: ''
};
exports.testMapEmptyMappingsRelativeSources = {
  version: 3,
  file: 'min.js',
  names: [],
  sources: ['./one.js', './two.js'],
  sourcesContent: [
    ' ONE.foo = 1;',
    ' TWO.inc = 2;'
  ],
  sourceRoot: '/the/root',
  mappings: ''
};
exports.testMapEmptyMappingsRelativeSources_generatedExpected = {
  version: 3,
  file: 'min.js',
  names: [],
  sources: ['one.js', 'two.js'],
  sourcesContent: [
    ' ONE.foo = 1;',
    ' TWO.inc = 2;'
  ],
  sourceRoot: '/the/root',
  mappings: ''
};
exports.testMapMultiSourcesMappingRefersSingleSourceOnly = {
    version: 3,
    file: 'min.js',
    names: ['bar', 'baz'],
    sources: ['one.js', 'withoutMappings.js'],
    sourceRoot: '',
    mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID'
};
// This mapping is identical to above, but uses the indexed format instead.
exports.indexedTestMap = {
  version: 3,
  file: 'min.js',
  sections: [
    {
      offset: {
        line: 0,
        column: 0
      },
      map: {
        version: 3,
        sources: [
          "one.js"
        ],
        sourcesContent: [
          ' ONE.foo = function (bar) {\n' +
          '   return baz(bar);\n' +
          ' };',
        ],
        names: [
          "bar",
          "baz"
        ],
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
        sources: [
          "two.js"
        ],
        sourcesContent: [
          ' TWO.inc = function (n) {\n' +
          '   return n + 1;\n' +
          ' };'
        ],
        names: [
          "n"
        ],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOA",
        file: "min.js",
        sourceRoot: "/the/root"
      }
    }
  ]
};
exports.indexedTestMapDifferentSourceRoots = {
  version: 3,
  file: 'min.js',
  sections: [
    {
      offset: {
        line: 0,
        column: 0
      },
      map: {
        version: 3,
        sources: [
          "one.js"
        ],
        sourcesContent: [
          ' ONE.foo = function (bar) {\n' +
          '   return baz(bar);\n' +
          ' };',
        ],
        names: [
          "bar",
          "baz"
        ],
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
        sources: [
          "two.js"
        ],
        sourcesContent: [
          ' TWO.inc = function (n) {\n' +
          '   return n + 1;\n' +
          ' };'
        ],
        names: [
          "n"
        ],
        mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOA",
        file: "min.js",
        sourceRoot: "/different/root"
      }
    }
  ]
};
exports.testMapWithSourcesContent = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz', 'n'],
  sources: ['one.js', 'two.js'],
  sourcesContent: [
    ' ONE.foo = function (bar) {\n' +
    '   return baz(bar);\n' +
    ' };',
    ' TWO.inc = function (n) {\n' +
    '   return n + 1;\n' +
    ' };'
  ],
  sourceRoot: '/the/root',
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
};
exports.testMapRelativeSources = {
  version: 3,
  file: 'min.js',
  names: ['bar', 'baz', 'n'],
  sources: ['./one.js', './two.js'],
  sourcesContent: [
    ' ONE.foo = function (bar) {\n' +
    '   return baz(bar);\n' +
    ' };',
    ' TWO.inc = function (n) {\n' +
    '   return n + 1;\n' +
    ' };'
  ],
  sourceRoot: '/the/root',
  mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
};
exports.emptyMap = {
  version: 3,
  file: 'min.js',
  names: [],
  sources: [],
  mappings: ''
};
exports.mapWithSourcelessMapping = {
  version: 3,
  file: 'example.js',
  names: [],
  sources: ['example.js'],
  mappings: 'AAgCA,C'
};


function assertMapping(generatedLine, generatedColumn, originalSource,
                       originalLine, originalColumn, name, bias, map, assert,
                       dontTestGenerated, dontTestOriginal) {
  if (!dontTestOriginal) {
    var origMapping = map.originalPositionFor({
      line: generatedLine,
      column: generatedColumn,
      bias: bias
    });
    assert.equal(origMapping.name, name,
                 'Incorrect name, expected ' + JSON.stringify(name)
                 + ', got ' + JSON.stringify(origMapping.name));
    assert.equal(origMapping.line, originalLine,
                 'Incorrect line, expected ' + JSON.stringify(originalLine)
                 + ', got ' + JSON.stringify(origMapping.line));
    assert.equal(origMapping.column, originalColumn,
                 'Incorrect column, expected ' + JSON.stringify(originalColumn)
                 + ', got ' + JSON.stringify(origMapping.column));

    var expectedSource;

    if (originalSource && map.sourceRoot && originalSource.indexOf(map.sourceRoot) === 0) {
      expectedSource = originalSource;
    } else if (originalSource) {
      expectedSource = map.sourceRoot
        ? util.join(map.sourceRoot, originalSource)
        : originalSource;
    } else {
      expectedSource = null;
    }

    assert.equal(origMapping.source, expectedSource,
                 'Incorrect source, expected ' + JSON.stringify(expectedSource)
                 + ', got ' + JSON.stringify(origMapping.source));
  }

  if (!dontTestGenerated) {
    var genMapping = map.generatedPositionFor({
      source: originalSource,
      line: originalLine,
      column: originalColumn,
      bias: bias
    });
    assert.equal(genMapping.line, generatedLine,
                 'Incorrect line, expected ' + JSON.stringify(generatedLine)
                 + ', got ' + JSON.stringify(genMapping.line));
    assert.equal(genMapping.column, generatedColumn,
                 'Incorrect column, expected ' + JSON.stringify(generatedColumn)
                 + ', got ' + JSON.stringify(genMapping.column));
  }
}
exports.assertMapping = assertMapping;

function assertEqualMaps(assert, actualMap, expectedMap) {
  assert.equal(actualMap.version, expectedMap.version, "version mismatch");
  assert.equal(actualMap.file, expectedMap.file, "file mismatch");
  assert.equal(actualMap.names.length,
               expectedMap.names.length,
               "names length mismatch: " +
                 actualMap.names.join(", ") + " != " + expectedMap.names.join(", "));
  for (var i = 0; i < actualMap.names.length; i++) {
    assert.equal(actualMap.names[i],
                 expectedMap.names[i],
                 "names[" + i + "] mismatch: " +
                   actualMap.names.join(", ") + " != " + expectedMap.names.join(", "));
  }
  assert.equal(actualMap.sources.length,
               expectedMap.sources.length,
               "sources length mismatch: " +
                 actualMap.sources.join(", ") + " != " + expectedMap.sources.join(", "));
  for (var i = 0; i < actualMap.sources.length; i++) {
    assert.equal(actualMap.sources[i],
                 expectedMap.sources[i],
                 "sources[" + i + "] length mismatch: " +
                 actualMap.sources.join(", ") + " != " + expectedMap.sources.join(", "));
  }
  assert.equal(actualMap.sourceRoot,
               expectedMap.sourceRoot,
               "sourceRoot mismatch: " +
                 actualMap.sourceRoot + " != " + expectedMap.sourceRoot);
  assert.equal(actualMap.mappings, expectedMap.mappings,
               "mappings mismatch:\nActual:   " + actualMap.mappings + "\nExpected: " + expectedMap.mappings);
  if (actualMap.sourcesContent) {
    assert.equal(actualMap.sourcesContent.length,
                 expectedMap.sourcesContent.length,
                 "sourcesContent length mismatch");
    for (var i = 0; i < actualMap.sourcesContent.length; i++) {
      assert.equal(actualMap.sourcesContent[i],
                   expectedMap.sourcesContent[i],
                   "sourcesContent[" + i + "] mismatch");
    }
  }
}
exports.assertEqualMaps = assertEqualMaps;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYXJyYXktc2V0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYmFzZTY0LXZscS5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2JpbmFyeS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9tYXBwaW5nLWxpc3QuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9xdWljay1zb3J0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvc291cmNlLW1hcC1jb25zdW1lci5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LXNvdXJjZS1tYXAtY29uc3VtZXIuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL3Rlc3QvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeEhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNJQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsZ0JBQWdCOztBQUVoQixtQkFBbUI7QUFDbkIsb0JBQW9COztBQUVwQixnQkFBZ0I7QUFDaEIsZ0JBQWdCOztBQUVoQixnQkFBZ0I7QUFDaEIsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEVBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5R0EsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzlFQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGtDQUFrQztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0QsWUFBWTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3Q0FBd0M7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbUJBQW1CLEVBQUU7QUFDcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE1BQU07QUFDbkM7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJCQUEyQjtBQUM5QyxxQkFBcUIsK0NBQStDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBLHFCQUFxQiw0QkFBNEI7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNuQ0EsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFNBQVM7QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxYUEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixRQUFRO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzloQkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9EQUFvRDtBQUNwRDtBQUNBLHdDQUF3QztBQUN4QyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOERBQThELHFCQUFxQixLQUFLO0FBQ3hGLDREQUE0RCxrQkFBa0IsS0FBSztBQUNuRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw2RUFBNkUscUJBQXFCLEtBQUs7QUFDdkcsMkVBQTJFLGtCQUFrQixLQUFLO0FBQ2xHLDJFQUEyRSxxQkFBcUIsS0FBSztBQUNyRyx5RUFBeUUsa0JBQWtCLEtBQUs7QUFDaEc7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZFQUE2RSxxQkFBcUIsS0FBSztBQUN2RywyRUFBMkUsa0JBQWtCLEtBQUs7QUFDbEcsMkVBQTJFLHFCQUFxQixLQUFLO0FBQ3JHLHlFQUF5RSxrQkFBa0IsS0FBSztBQUNoRztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkVBQTZFLHFCQUFxQixLQUFLO0FBQ3ZHLDJFQUEyRSxrQkFBa0IsS0FBSztBQUNsRywyRUFBMkUscUJBQXFCLEtBQUs7QUFDckcseUVBQXlFLGtCQUFrQixLQUFLO0FBQ2hHO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QiwwQ0FBMEMsc0JBQXNCO0FBQ2hFLDJDQUEyQyxzQkFBc0IsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsNkNBQTZDLHNCQUFzQjtBQUNuRSw4Q0FBOEMsc0JBQXNCLEVBQUU7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyw4Q0FBOEMsc0JBQXNCO0FBQ3BFLCtDQUErQyxzQkFBc0IsRUFBRTtBQUN2RSxrQ0FBa0M7QUFDbEMsOENBQThDLHNCQUFzQjtBQUNwRSwrQ0FBK0Msc0JBQXNCLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckMsaURBQWlELHNCQUFzQjtBQUN2RSxrREFBa0Qsc0JBQXNCLEVBQUU7QUFDMUUscUNBQXFDO0FBQ3JDLGlEQUFpRCxzQkFBc0I7QUFDdkUsa0RBQWtELHNCQUFzQixFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixzQkFBc0I7QUFDdEM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixNQUFNLE1BQU07QUFDOUI7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU8sT0FBTztBQUNoQztBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxnQkFBZ0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3J1Q0EsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLGtEQUFrRCxnQkFBZ0I7QUFDbEUsa0RBQWtELGFBQWE7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsOEJBQThCO0FBQzlCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyx3QkFBd0I7QUFDeEIsUUFBUTtBQUNSLDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckIsUUFBUTtBQUNSO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUiw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCLFFBQVE7QUFDUjtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQ0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdF9zb3VyY2VfbWFwX2NvbnN1bWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0L3Rlc3Qtc291cmNlLW1hcC1jb25zdW1lci5qc1wiKTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xyXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxudmFyIGhhc05hdGl2ZU1hcCA9IHR5cGVvZiBNYXAgIT09IFwidW5kZWZpbmVkXCI7XHJcblxyXG4vKipcclxuICogQSBkYXRhIHN0cnVjdHVyZSB3aGljaCBpcyBhIGNvbWJpbmF0aW9uIG9mIGFuIGFycmF5IGFuZCBhIHNldC4gQWRkaW5nIGEgbmV3XHJcbiAqIG1lbWJlciBpcyBPKDEpLCB0ZXN0aW5nIGZvciBtZW1iZXJzaGlwIGlzIE8oMSksIGFuZCBmaW5kaW5nIHRoZSBpbmRleCBvZiBhblxyXG4gKiBlbGVtZW50IGlzIE8oMSkuIFJlbW92aW5nIGVsZW1lbnRzIGZyb20gdGhlIHNldCBpcyBub3Qgc3VwcG9ydGVkLiBPbmx5XHJcbiAqIHN0cmluZ3MgYXJlIHN1cHBvcnRlZCBmb3IgbWVtYmVyc2hpcC5cclxuICovXHJcbmZ1bmN0aW9uIEFycmF5U2V0KCkge1xyXG4gIHRoaXMuX2FycmF5ID0gW107XHJcbiAgdGhpcy5fc2V0ID0gaGFzTmF0aXZlTWFwID8gbmV3IE1hcCgpIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0YXRpYyBtZXRob2QgZm9yIGNyZWF0aW5nIEFycmF5U2V0IGluc3RhbmNlcyBmcm9tIGFuIGV4aXN0aW5nIGFycmF5LlxyXG4gKi9cclxuQXJyYXlTZXQuZnJvbUFycmF5ID0gZnVuY3Rpb24gQXJyYXlTZXRfZnJvbUFycmF5KGFBcnJheSwgYUFsbG93RHVwbGljYXRlcykge1xyXG4gIHZhciBzZXQgPSBuZXcgQXJyYXlTZXQoKTtcclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYUFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICBzZXQuYWRkKGFBcnJheVtpXSwgYUFsbG93RHVwbGljYXRlcyk7XHJcbiAgfVxyXG4gIHJldHVybiBzZXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGhvdyBtYW55IHVuaXF1ZSBpdGVtcyBhcmUgaW4gdGhpcyBBcnJheVNldC4gSWYgZHVwbGljYXRlcyBoYXZlIGJlZW5cclxuICogYWRkZWQsIHRoYW4gdGhvc2UgZG8gbm90IGNvdW50IHRvd2FyZHMgdGhlIHNpemUuXHJcbiAqXHJcbiAqIEByZXR1cm5zIE51bWJlclxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiBBcnJheVNldF9zaXplKCkge1xyXG4gIHJldHVybiBoYXNOYXRpdmVNYXAgPyB0aGlzLl9zZXQuc2l6ZSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX3NldCkubGVuZ3RoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgZ2l2ZW4gc3RyaW5nIHRvIHRoaXMgc2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBBcnJheVNldF9hZGQoYVN0ciwgYUFsbG93RHVwbGljYXRlcykge1xyXG4gIHZhciBzU3RyID0gaGFzTmF0aXZlTWFwID8gYVN0ciA6IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XHJcbiAgdmFyIGlzRHVwbGljYXRlID0gaGFzTmF0aXZlTWFwID8gdGhpcy5oYXMoYVN0cikgOiBoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpO1xyXG4gIHZhciBpZHggPSB0aGlzLl9hcnJheS5sZW5ndGg7XHJcbiAgaWYgKCFpc0R1cGxpY2F0ZSB8fCBhQWxsb3dEdXBsaWNhdGVzKSB7XHJcbiAgICB0aGlzLl9hcnJheS5wdXNoKGFTdHIpO1xyXG4gIH1cclxuICBpZiAoIWlzRHVwbGljYXRlKSB7XHJcbiAgICBpZiAoaGFzTmF0aXZlTWFwKSB7XHJcbiAgICAgIHRoaXMuX3NldC5zZXQoYVN0ciwgaWR4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldFtzU3RyXSA9IGlkeDtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSXMgdGhlIGdpdmVuIHN0cmluZyBhIG1lbWJlciBvZiB0aGlzIHNldD9cclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gQXJyYXlTZXRfaGFzKGFTdHIpIHtcclxuICBpZiAoaGFzTmF0aXZlTWFwKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2V0LmhhcyhhU3RyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHNTdHIgPSB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xyXG4gICAgcmV0dXJuIGhhcy5jYWxsKHRoaXMuX3NldCwgc1N0cik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoYXQgaXMgdGhlIGluZGV4IG9mIHRoZSBnaXZlbiBzdHJpbmcgaW4gdGhlIGFycmF5P1xyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gQXJyYXlTZXRfaW5kZXhPZihhU3RyKSB7XHJcbiAgaWYgKGhhc05hdGl2ZU1hcCkge1xyXG4gICAgdmFyIGlkeCA9IHRoaXMuX3NldC5nZXQoYVN0cik7XHJcbiAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAgICByZXR1cm4gaWR4O1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc1N0ciA9IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XHJcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2V0W3NTdHJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhU3RyICsgJ1wiIGlzIG5vdCBpbiB0aGUgc2V0LicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoYXQgaXMgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4P1xyXG4gKlxyXG4gKiBAcGFyYW0gTnVtYmVyIGFJZHhcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5hdCA9IGZ1bmN0aW9uIEFycmF5U2V0X2F0KGFJZHgpIHtcclxuICBpZiAoYUlkeCA+PSAwICYmIGFJZHggPCB0aGlzLl9hcnJheS5sZW5ndGgpIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnJheVthSWR4XTtcclxuICB9XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50IGluZGV4ZWQgYnkgJyArIGFJZHgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc2V0ICh3aGljaCBoYXMgdGhlIHByb3BlciBpbmRpY2VzXHJcbiAqIGluZGljYXRlZCBieSBpbmRleE9mKS4gTm90ZSB0aGF0IHRoaXMgaXMgYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBhcnJheSB1c2VkXHJcbiAqIGZvciBzdG9yaW5nIHRoZSBtZW1iZXJzIHNvIHRoYXQgbm8gb25lIGNhbiBtZXNzIHdpdGggaW50ZXJuYWwgc3RhdGUuXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIEFycmF5U2V0X3RvQXJyYXkoKSB7XHJcbiAgcmV0dXJuIHRoaXMuX2FycmF5LnNsaWNlKCk7XHJcbn07XHJcblxyXG5leHBvcnRzLkFycmF5U2V0ID0gQXJyYXlTZXQ7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICpcclxuICogQmFzZWQgb24gdGhlIEJhc2UgNjQgVkxRIGltcGxlbWVudGF0aW9uIGluIENsb3N1cmUgQ29tcGlsZXI6XHJcbiAqIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2xvc3VyZS1jb21waWxlci9zb3VyY2UvYnJvd3NlL3RydW5rL3NyYy9jb20vZ29vZ2xlL2RlYnVnZ2luZy9zb3VyY2VtYXAvQmFzZTY0VkxRLmphdmFcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTEgVGhlIENsb3N1cmUgQ29tcGlsZXIgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XHJcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmVcclxuICogbWV0OlxyXG4gKlxyXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxyXG4gKiAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXHJcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmVcclxuICogICAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmdcclxuICogICAgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkXHJcbiAqICAgIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cclxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBHb29nbGUgSW5jLiBub3IgdGhlIG5hbWVzIG9mIGl0c1xyXG4gKiAgICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWRcclxuICogICAgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG4gKlxyXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTXHJcbiAqIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1RcclxuICogTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SXHJcbiAqIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUXHJcbiAqIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLFxyXG4gKiBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UXHJcbiAqIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLFxyXG4gKiBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTllcclxuICogVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxyXG4gKiAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0VcclxuICogT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cclxuICovXHJcblxyXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnLi9iYXNlNjQnKTtcclxuXHJcbi8vIEEgc2luZ2xlIGJhc2UgNjQgZGlnaXQgY2FuIGNvbnRhaW4gNiBiaXRzIG9mIGRhdGEuIEZvciB0aGUgYmFzZSA2NCB2YXJpYWJsZVxyXG4vLyBsZW5ndGggcXVhbnRpdGllcyB3ZSB1c2UgaW4gdGhlIHNvdXJjZSBtYXAgc3BlYywgdGhlIGZpcnN0IGJpdCBpcyB0aGUgc2lnbixcclxuLy8gdGhlIG5leHQgZm91ciBiaXRzIGFyZSB0aGUgYWN0dWFsIHZhbHVlLCBhbmQgdGhlIDZ0aCBiaXQgaXMgdGhlXHJcbi8vIGNvbnRpbnVhdGlvbiBiaXQuIFRoZSBjb250aW51YXRpb24gYml0IHRlbGxzIHVzIHdoZXRoZXIgdGhlcmUgYXJlIG1vcmVcclxuLy8gZGlnaXRzIGluIHRoaXMgdmFsdWUgZm9sbG93aW5nIHRoaXMgZGlnaXQuXHJcbi8vXHJcbi8vICAgQ29udGludWF0aW9uXHJcbi8vICAgfCAgICBTaWduXHJcbi8vICAgfCAgICB8XHJcbi8vICAgViAgICBWXHJcbi8vICAgMTAxMDExXHJcblxyXG52YXIgVkxRX0JBU0VfU0hJRlQgPSA1O1xyXG5cclxuLy8gYmluYXJ5OiAxMDAwMDBcclxudmFyIFZMUV9CQVNFID0gMSA8PCBWTFFfQkFTRV9TSElGVDtcclxuXHJcbi8vIGJpbmFyeTogMDExMTExXHJcbnZhciBWTFFfQkFTRV9NQVNLID0gVkxRX0JBU0UgLSAxO1xyXG5cclxuLy8gYmluYXJ5OiAxMDAwMDBcclxudmFyIFZMUV9DT05USU5VQVRJT05fQklUID0gVkxRX0JBU0U7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgZnJvbSBhIHR3by1jb21wbGVtZW50IHZhbHVlIHRvIGEgdmFsdWUgd2hlcmUgdGhlIHNpZ24gYml0IGlzXHJcbiAqIHBsYWNlZCBpbiB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0LiAgRm9yIGV4YW1wbGUsIGFzIGRlY2ltYWxzOlxyXG4gKiAgIDEgYmVjb21lcyAyICgxMCBiaW5hcnkpLCAtMSBiZWNvbWVzIDMgKDExIGJpbmFyeSlcclxuICogICAyIGJlY29tZXMgNCAoMTAwIGJpbmFyeSksIC0yIGJlY29tZXMgNSAoMTAxIGJpbmFyeSlcclxuICovXHJcbmZ1bmN0aW9uIHRvVkxRU2lnbmVkKGFWYWx1ZSkge1xyXG4gIHJldHVybiBhVmFsdWUgPCAwXHJcbiAgICA/ICgoLWFWYWx1ZSkgPDwgMSkgKyAxXHJcbiAgICA6IChhVmFsdWUgPDwgMSkgKyAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdG8gYSB0d28tY29tcGxlbWVudCB2YWx1ZSBmcm9tIGEgdmFsdWUgd2hlcmUgdGhlIHNpZ24gYml0IGlzXHJcbiAqIHBsYWNlZCBpbiB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0LiAgRm9yIGV4YW1wbGUsIGFzIGRlY2ltYWxzOlxyXG4gKiAgIDIgKDEwIGJpbmFyeSkgYmVjb21lcyAxLCAzICgxMSBiaW5hcnkpIGJlY29tZXMgLTFcclxuICogICA0ICgxMDAgYmluYXJ5KSBiZWNvbWVzIDIsIDUgKDEwMSBiaW5hcnkpIGJlY29tZXMgLTJcclxuICovXHJcbmZ1bmN0aW9uIGZyb21WTFFTaWduZWQoYVZhbHVlKSB7XHJcbiAgdmFyIGlzTmVnYXRpdmUgPSAoYVZhbHVlICYgMSkgPT09IDE7XHJcbiAgdmFyIHNoaWZ0ZWQgPSBhVmFsdWUgPj4gMTtcclxuICByZXR1cm4gaXNOZWdhdGl2ZVxyXG4gICAgPyAtc2hpZnRlZFxyXG4gICAgOiBzaGlmdGVkO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYmFzZSA2NCBWTFEgZW5jb2RlZCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gYmFzZTY0VkxRX2VuY29kZShhVmFsdWUpIHtcclxuICB2YXIgZW5jb2RlZCA9IFwiXCI7XHJcbiAgdmFyIGRpZ2l0O1xyXG5cclxuICB2YXIgdmxxID0gdG9WTFFTaWduZWQoYVZhbHVlKTtcclxuXHJcbiAgZG8ge1xyXG4gICAgZGlnaXQgPSB2bHEgJiBWTFFfQkFTRV9NQVNLO1xyXG4gICAgdmxxID4+Pj0gVkxRX0JBU0VfU0hJRlQ7XHJcbiAgICBpZiAodmxxID4gMCkge1xyXG4gICAgICAvLyBUaGVyZSBhcmUgc3RpbGwgbW9yZSBkaWdpdHMgaW4gdGhpcyB2YWx1ZSwgc28gd2UgbXVzdCBtYWtlIHN1cmUgdGhlXHJcbiAgICAgIC8vIGNvbnRpbnVhdGlvbiBiaXQgaXMgbWFya2VkLlxyXG4gICAgICBkaWdpdCB8PSBWTFFfQ09OVElOVUFUSU9OX0JJVDtcclxuICAgIH1cclxuICAgIGVuY29kZWQgKz0gYmFzZTY0LmVuY29kZShkaWdpdCk7XHJcbiAgfSB3aGlsZSAodmxxID4gMCk7XHJcblxyXG4gIHJldHVybiBlbmNvZGVkO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgdGhlIG5leHQgYmFzZSA2NCBWTFEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gc3RyaW5nIGFuZCByZXR1cm5zIHRoZVxyXG4gKiB2YWx1ZSBhbmQgdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyB2aWEgdGhlIG91dCBwYXJhbWV0ZXIuXHJcbiAqL1xyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIGJhc2U2NFZMUV9kZWNvZGUoYVN0ciwgYUluZGV4LCBhT3V0UGFyYW0pIHtcclxuICB2YXIgc3RyTGVuID0gYVN0ci5sZW5ndGg7XHJcbiAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgdmFyIHNoaWZ0ID0gMDtcclxuICB2YXIgY29udGludWF0aW9uLCBkaWdpdDtcclxuXHJcbiAgZG8ge1xyXG4gICAgaWYgKGFJbmRleCA+PSBzdHJMZW4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgbW9yZSBkaWdpdHMgaW4gYmFzZSA2NCBWTFEgdmFsdWUuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpZ2l0ID0gYmFzZTY0LmRlY29kZShhU3RyLmNoYXJDb2RlQXQoYUluZGV4KyspKTtcclxuICAgIGlmIChkaWdpdCA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgZGlnaXQ6IFwiICsgYVN0ci5jaGFyQXQoYUluZGV4IC0gMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRpbnVhdGlvbiA9ICEhKGRpZ2l0ICYgVkxRX0NPTlRJTlVBVElPTl9CSVQpO1xyXG4gICAgZGlnaXQgJj0gVkxRX0JBU0VfTUFTSztcclxuICAgIHJlc3VsdCA9IHJlc3VsdCArIChkaWdpdCA8PCBzaGlmdCk7XHJcbiAgICBzaGlmdCArPSBWTFFfQkFTRV9TSElGVDtcclxuICB9IHdoaWxlIChjb250aW51YXRpb24pO1xyXG5cclxuICBhT3V0UGFyYW0udmFsdWUgPSBmcm9tVkxRU2lnbmVkKHJlc3VsdCk7XHJcbiAgYU91dFBhcmFtLnJlc3QgPSBhSW5kZXg7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgaW50VG9DaGFyTWFwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nLnNwbGl0KCcnKTtcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGUgYW4gaW50ZWdlciBpbiB0aGUgcmFuZ2Ugb2YgMCB0byA2MyB0byBhIHNpbmdsZSBiYXNlIDY0IGRpZ2l0LlxyXG4gKi9cclxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAobnVtYmVyKSB7XHJcbiAgaWYgKDAgPD0gbnVtYmVyICYmIG51bWJlciA8IGludFRvQ2hhck1hcC5sZW5ndGgpIHtcclxuICAgIHJldHVybiBpbnRUb0NoYXJNYXBbbnVtYmVyXTtcclxuICB9XHJcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk11c3QgYmUgYmV0d2VlbiAwIGFuZCA2MzogXCIgKyBudW1iZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29kZSBhIHNpbmdsZSBiYXNlIDY0IGNoYXJhY3RlciBjb2RlIGRpZ2l0IHRvIGFuIGludGVnZXIuIFJldHVybnMgLTEgb25cclxuICogZmFpbHVyZS5cclxuICovXHJcbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKGNoYXJDb2RlKSB7XHJcbiAgdmFyIGJpZ0EgPSA2NTsgICAgIC8vICdBJ1xyXG4gIHZhciBiaWdaID0gOTA7ICAgICAvLyAnWidcclxuXHJcbiAgdmFyIGxpdHRsZUEgPSA5NzsgIC8vICdhJ1xyXG4gIHZhciBsaXR0bGVaID0gMTIyOyAvLyAneidcclxuXHJcbiAgdmFyIHplcm8gPSA0ODsgICAgIC8vICcwJ1xyXG4gIHZhciBuaW5lID0gNTc7ICAgICAvLyAnOSdcclxuXHJcbiAgdmFyIHBsdXMgPSA0MzsgICAgIC8vICcrJ1xyXG4gIHZhciBzbGFzaCA9IDQ3OyAgICAvLyAnLydcclxuXHJcbiAgdmFyIGxpdHRsZU9mZnNldCA9IDI2O1xyXG4gIHZhciBudW1iZXJPZmZzZXQgPSA1MjtcclxuXHJcbiAgLy8gMCAtIDI1OiBBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlxyXG4gIGlmIChiaWdBIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IGJpZ1opIHtcclxuICAgIHJldHVybiAoY2hhckNvZGUgLSBiaWdBKTtcclxuICB9XHJcblxyXG4gIC8vIDI2IC0gNTE6IGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XHJcbiAgaWYgKGxpdHRsZUEgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbGl0dGxlWikge1xyXG4gICAgcmV0dXJuIChjaGFyQ29kZSAtIGxpdHRsZUEgKyBsaXR0bGVPZmZzZXQpO1xyXG4gIH1cclxuXHJcbiAgLy8gNTIgLSA2MTogMDEyMzQ1Njc4OVxyXG4gIGlmICh6ZXJvIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IG5pbmUpIHtcclxuICAgIHJldHVybiAoY2hhckNvZGUgLSB6ZXJvICsgbnVtYmVyT2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIC8vIDYyOiArXHJcbiAgaWYgKGNoYXJDb2RlID09IHBsdXMpIHtcclxuICAgIHJldHVybiA2MjtcclxuICB9XHJcblxyXG4gIC8vIDYzOiAvXHJcbiAgaWYgKGNoYXJDb2RlID09IHNsYXNoKSB7XHJcbiAgICByZXR1cm4gNjM7XHJcbiAgfVxyXG5cclxuICAvLyBJbnZhbGlkIGJhc2U2NCBkaWdpdC5cclxuICByZXR1cm4gLTE7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG5leHBvcnRzLkdSRUFURVNUX0xPV0VSX0JPVU5EID0gMTtcclxuZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCA9IDI7XHJcblxyXG4vKipcclxuICogUmVjdXJzaXZlIGltcGxlbWVudGF0aW9uIG9mIGJpbmFyeSBzZWFyY2guXHJcbiAqXHJcbiAqIEBwYXJhbSBhTG93IEluZGljZXMgaGVyZSBhbmQgbG93ZXIgZG8gbm90IGNvbnRhaW4gdGhlIG5lZWRsZS5cclxuICogQHBhcmFtIGFIaWdoIEluZGljZXMgaGVyZSBhbmQgaGlnaGVyIGRvIG5vdCBjb250YWluIHRoZSBuZWVkbGUuXHJcbiAqIEBwYXJhbSBhTmVlZGxlIFRoZSBlbGVtZW50IGJlaW5nIHNlYXJjaGVkIGZvci5cclxuICogQHBhcmFtIGFIYXlzdGFjayBUaGUgbm9uLWVtcHR5IGFycmF5IGJlaW5nIHNlYXJjaGVkLlxyXG4gKiBAcGFyYW0gYUNvbXBhcmUgRnVuY3Rpb24gd2hpY2ggdGFrZXMgdHdvIGVsZW1lbnRzIGFuZCByZXR1cm5zIC0xLCAwLCBvciAxLlxyXG4gKiBAcGFyYW0gYUJpYXMgRWl0aGVyICdiaW5hcnlTZWFyY2guR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxyXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxyXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiByZWN1cnNpdmVTZWFyY2goYUxvdywgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKSB7XHJcbiAgLy8gVGhpcyBmdW5jdGlvbiB0ZXJtaW5hdGVzIHdoZW4gb25lIG9mIHRoZSBmb2xsb3dpbmcgaXMgdHJ1ZTpcclxuICAvL1xyXG4gIC8vICAgMS4gV2UgZmluZCB0aGUgZXhhY3QgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXHJcbiAgLy9cclxuICAvLyAgIDIuIFdlIGRpZCBub3QgZmluZCB0aGUgZXhhY3QgZWxlbWVudCwgYnV0IHdlIGNhbiByZXR1cm4gdGhlIGluZGV4IG9mXHJcbiAgLy8gICAgICB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQuXHJcbiAgLy9cclxuICAvLyAgIDMuIFdlIGRpZCBub3QgZmluZCB0aGUgZXhhY3QgZWxlbWVudCwgYW5kIHRoZXJlIGlzIG5vIG5leHQtY2xvc2VzdFxyXG4gIC8vICAgICAgZWxlbWVudCB0aGFuIHRoZSBvbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IsIHNvIHdlIHJldHVybiAtMS5cclxuICB2YXIgbWlkID0gTWF0aC5mbG9vcigoYUhpZ2ggLSBhTG93KSAvIDIpICsgYUxvdztcclxuICB2YXIgY21wID0gYUNvbXBhcmUoYU5lZWRsZSwgYUhheXN0YWNrW21pZF0sIHRydWUpO1xyXG4gIGlmIChjbXAgPT09IDApIHtcclxuICAgIC8vIEZvdW5kIHRoZSBlbGVtZW50IHdlIGFyZSBsb29raW5nIGZvci5cclxuICAgIHJldHVybiBtaWQ7XHJcbiAgfVxyXG4gIGVsc2UgaWYgKGNtcCA+IDApIHtcclxuICAgIC8vIE91ciBuZWVkbGUgaXMgZ3JlYXRlciB0aGFuIGFIYXlzdGFja1ttaWRdLlxyXG4gICAgaWYgKGFIaWdoIC0gbWlkID4gMSkge1xyXG4gICAgICAvLyBUaGUgZWxlbWVudCBpcyBpbiB0aGUgdXBwZXIgaGFsZi5cclxuICAgICAgcmV0dXJuIHJlY3Vyc2l2ZVNlYXJjaChtaWQsIGFIaWdoLCBhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIGV4YWN0IG5lZWRsZSBlbGVtZW50IHdhcyBub3QgZm91bmQgaW4gdGhpcyBoYXlzdGFjay4gRGV0ZXJtaW5lIGlmXHJcbiAgICAvLyB3ZSBhcmUgaW4gdGVybWluYXRpb24gY2FzZSAoMykgb3IgKDIpIGFuZCByZXR1cm4gdGhlIGFwcHJvcHJpYXRlIHRoaW5nLlxyXG4gICAgaWYgKGFCaWFzID09IGV4cG9ydHMuTEVBU1RfVVBQRVJfQk9VTkQpIHtcclxuICAgICAgcmV0dXJuIGFIaWdoIDwgYUhheXN0YWNrLmxlbmd0aCA/IGFIaWdoIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbWlkO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIC8vIE91ciBuZWVkbGUgaXMgbGVzcyB0aGFuIGFIYXlzdGFja1ttaWRdLlxyXG4gICAgaWYgKG1pZCAtIGFMb3cgPiAxKSB7XHJcbiAgICAgIC8vIFRoZSBlbGVtZW50IGlzIGluIHRoZSBsb3dlciBoYWxmLlxyXG4gICAgICByZXR1cm4gcmVjdXJzaXZlU2VhcmNoKGFMb3csIG1pZCwgYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIGFyZSBpbiB0ZXJtaW5hdGlvbiBjYXNlICgzKSBvciAoMikgYW5kIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgdGhpbmcuXHJcbiAgICBpZiAoYUJpYXMgPT0gZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCkge1xyXG4gICAgICByZXR1cm4gbWlkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFMb3cgPCAwID8gLTEgOiBhTG93O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgYmluYXJ5IHNlYXJjaCB3aGljaCB3aWxsIGFsd2F5cyB0cnkgYW5kIHJldHVyblxyXG4gKiB0aGUgaW5kZXggb2YgdGhlIGNsb3Nlc3QgZWxlbWVudCBpZiB0aGVyZSBpcyBubyBleGFjdCBoaXQuIFRoaXMgaXMgYmVjYXVzZVxyXG4gKiBtYXBwaW5ncyBiZXR3ZWVuIG9yaWdpbmFsIGFuZCBnZW5lcmF0ZWQgbGluZS9jb2wgcGFpcnMgYXJlIHNpbmdsZSBwb2ludHMsXHJcbiAqIGFuZCB0aGVyZSBpcyBhbiBpbXBsaWNpdCByZWdpb24gYmV0d2VlbiBlYWNoIG9mIHRoZW0sIHNvIGEgbWlzcyBqdXN0IG1lYW5zXHJcbiAqIHRoYXQgeW91IGFyZW4ndCBvbiB0aGUgdmVyeSBzdGFydCBvZiBhIHJlZ2lvbi5cclxuICpcclxuICogQHBhcmFtIGFOZWVkbGUgVGhlIGVsZW1lbnQgeW91IGFyZSBsb29raW5nIGZvci5cclxuICogQHBhcmFtIGFIYXlzdGFjayBUaGUgYXJyYXkgdGhhdCBpcyBiZWluZyBzZWFyY2hlZC5cclxuICogQHBhcmFtIGFDb21wYXJlIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgdGhlIG5lZWRsZSBhbmQgYW4gZWxlbWVudCBpbiB0aGVcclxuICogICAgIGFycmF5IGFuZCByZXR1cm5zIC0xLCAwLCBvciAxIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBuZWVkbGUgaXMgbGVzc1xyXG4gKiAgICAgdGhhbiwgZXF1YWwgdG8sIG9yIGdyZWF0ZXIgdGhhbiB0aGUgZWxlbWVudCwgcmVzcGVjdGl2ZWx5LlxyXG4gKiBAcGFyYW0gYUJpYXMgRWl0aGVyICdiaW5hcnlTZWFyY2guR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxyXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxyXG4gKiAgICAgc2VhcmNoaW5nIGZvciwgcmVzcGVjdGl2ZWx5LCBpZiB0aGUgZXhhY3QgZWxlbWVudCBjYW5ub3QgYmUgZm91bmQuXHJcbiAqICAgICBEZWZhdWx0cyB0byAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cclxuICovXHJcbmV4cG9ydHMuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoKGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKSB7XHJcbiAgaWYgKGFIYXlzdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcblxyXG4gIHZhciBpbmRleCA9IHJlY3Vyc2l2ZVNlYXJjaCgtMSwgYUhheXN0YWNrLmxlbmd0aCwgYU5lZWRsZSwgYUhheXN0YWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhQ29tcGFyZSwgYUJpYXMgfHwgZXhwb3J0cy5HUkVBVEVTVF9MT1dFUl9CT1VORCk7XHJcbiAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuXHJcbiAgLy8gV2UgaGF2ZSBmb3VuZCBlaXRoZXIgdGhlIGV4YWN0IGVsZW1lbnQsIG9yIHRoZSBuZXh0LWNsb3Nlc3QgZWxlbWVudCB0aGFuXHJcbiAgLy8gdGhlIG9uZSB3ZSBhcmUgc2VhcmNoaW5nIGZvci4gSG93ZXZlciwgdGhlcmUgbWF5IGJlIG1vcmUgdGhhbiBvbmUgc3VjaFxyXG4gIC8vIGVsZW1lbnQuIE1ha2Ugc3VyZSB3ZSBhbHdheXMgcmV0dXJuIHRoZSBzbWFsbGVzdCBvZiB0aGVzZS5cclxuICB3aGlsZSAoaW5kZXggLSAxID49IDApIHtcclxuICAgIGlmIChhQ29tcGFyZShhSGF5c3RhY2tbaW5kZXhdLCBhSGF5c3RhY2tbaW5kZXggLSAxXSwgdHJ1ZSkgIT09IDApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICAtLWluZGV4O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZGV4O1xyXG59O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDE0IE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgd2hldGhlciBtYXBwaW5nQiBpcyBhZnRlciBtYXBwaW5nQSB3aXRoIHJlc3BlY3QgdG8gZ2VuZXJhdGVkXHJcbiAqIHBvc2l0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuZXJhdGVkUG9zaXRpb25BZnRlcihtYXBwaW5nQSwgbWFwcGluZ0IpIHtcclxuICAvLyBPcHRpbWl6ZWQgZm9yIG1vc3QgY29tbW9uIGNhc2VcclxuICB2YXIgbGluZUEgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lO1xyXG4gIHZhciBsaW5lQiA9IG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgdmFyIGNvbHVtbkEgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgdmFyIGNvbHVtbkIgPSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgcmV0dXJuIGxpbmVCID4gbGluZUEgfHwgbGluZUIgPT0gbGluZUEgJiYgY29sdW1uQiA+PSBjb2x1bW5BIHx8XHJcbiAgICAgICAgIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCKSA8PSAwO1xyXG59XHJcblxyXG4vKipcclxuICogQSBkYXRhIHN0cnVjdHVyZSB0byBwcm92aWRlIGEgc29ydGVkIHZpZXcgb2YgYWNjdW11bGF0ZWQgbWFwcGluZ3MgaW4gYVxyXG4gKiBwZXJmb3JtYW5jZSBjb25zY2lvdXMgbWFubmVyLiBJdCB0cmFkZXMgYSBuZWdsaWdpYmxlIG92ZXJoZWFkIGluIGdlbmVyYWxcclxuICogY2FzZSBmb3IgYSBsYXJnZSBzcGVlZHVwIGluIGNhc2Ugb2YgbWFwcGluZ3MgYmVpbmcgYWRkZWQgaW4gb3JkZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBNYXBwaW5nTGlzdCgpIHtcclxuICB0aGlzLl9hcnJheSA9IFtdO1xyXG4gIHRoaXMuX3NvcnRlZCA9IHRydWU7XHJcbiAgLy8gU2VydmVzIGFzIGluZmltdW1cclxuICB0aGlzLl9sYXN0ID0ge2dlbmVyYXRlZExpbmU6IC0xLCBnZW5lcmF0ZWRDb2x1bW46IDB9O1xyXG59XHJcblxyXG4vKipcclxuICogSXRlcmF0ZSB0aHJvdWdoIGludGVybmFsIGl0ZW1zLiBUaGlzIG1ldGhvZCB0YWtlcyB0aGUgc2FtZSBhcmd1bWVudHMgdGhhdFxyXG4gKiBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIHRha2VzLlxyXG4gKlxyXG4gKiBOT1RFOiBUaGUgb3JkZXIgb2YgdGhlIG1hcHBpbmdzIGlzIE5PVCBndWFyYW50ZWVkLlxyXG4gKi9cclxuTWFwcGluZ0xpc3QucHJvdG90eXBlLnVuc29ydGVkRm9yRWFjaCA9XHJcbiAgZnVuY3Rpb24gTWFwcGluZ0xpc3RfZm9yRWFjaChhQ2FsbGJhY2ssIGFUaGlzQXJnKSB7XHJcbiAgICB0aGlzLl9hcnJheS5mb3JFYWNoKGFDYWxsYmFjaywgYVRoaXNBcmcpO1xyXG4gIH07XHJcblxyXG4vKipcclxuICogQWRkIHRoZSBnaXZlbiBzb3VyY2UgbWFwcGluZy5cclxuICpcclxuICogQHBhcmFtIE9iamVjdCBhTWFwcGluZ1xyXG4gKi9cclxuTWFwcGluZ0xpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIE1hcHBpbmdMaXN0X2FkZChhTWFwcGluZykge1xyXG4gIGlmIChnZW5lcmF0ZWRQb3NpdGlvbkFmdGVyKHRoaXMuX2xhc3QsIGFNYXBwaW5nKSkge1xyXG4gICAgdGhpcy5fbGFzdCA9IGFNYXBwaW5nO1xyXG4gICAgdGhpcy5fYXJyYXkucHVzaChhTWFwcGluZyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fYXJyYXkucHVzaChhTWFwcGluZyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGZsYXQsIHNvcnRlZCBhcnJheSBvZiBtYXBwaW5ncy4gVGhlIG1hcHBpbmdzIGFyZSBzb3J0ZWQgYnlcclxuICogZ2VuZXJhdGVkIHBvc2l0aW9uLlxyXG4gKlxyXG4gKiBXQVJOSU5HOiBUaGlzIG1ldGhvZCByZXR1cm5zIGludGVybmFsIGRhdGEgd2l0aG91dCBjb3B5aW5nLCBmb3JcclxuICogcGVyZm9ybWFuY2UuIFRoZSByZXR1cm4gdmFsdWUgbXVzdCBOT1QgYmUgbXV0YXRlZCwgYW5kIHNob3VsZCBiZSB0cmVhdGVkIGFzXHJcbiAqIGFuIGltbXV0YWJsZSBib3Jyb3cuIElmIHlvdSB3YW50IHRvIHRha2Ugb3duZXJzaGlwLCB5b3UgbXVzdCBtYWtlIHlvdXIgb3duXHJcbiAqIGNvcHkuXHJcbiAqL1xyXG5NYXBwaW5nTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIE1hcHBpbmdMaXN0X3RvQXJyYXkoKSB7XHJcbiAgaWYgKCF0aGlzLl9zb3J0ZWQpIHtcclxuICAgIHRoaXMuX2FycmF5LnNvcnQodXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZCk7XHJcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy5fYXJyYXk7XHJcbn07XHJcblxyXG5leHBvcnRzLk1hcHBpbmdMaXN0ID0gTWFwcGluZ0xpc3Q7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG4vLyBJdCB0dXJucyBvdXQgdGhhdCBzb21lIChtb3N0PykgSmF2YVNjcmlwdCBlbmdpbmVzIGRvbid0IHNlbGYtaG9zdFxyXG4vLyBgQXJyYXkucHJvdG90eXBlLnNvcnRgLiBUaGlzIG1ha2VzIHNlbnNlIGJlY2F1c2UgQysrIHdpbGwgbGlrZWx5IHJlbWFpblxyXG4vLyBmYXN0ZXIgdGhhbiBKUyB3aGVuIGRvaW5nIHJhdyBDUFUtaW50ZW5zaXZlIHNvcnRpbmcuIEhvd2V2ZXIsIHdoZW4gdXNpbmcgYVxyXG4vLyBjdXN0b20gY29tcGFyYXRvciBmdW5jdGlvbiwgY2FsbGluZyBiYWNrIGFuZCBmb3J0aCBiZXR3ZWVuIHRoZSBWTSdzIEMrKyBhbmRcclxuLy8gSklUJ2QgSlMgaXMgcmF0aGVyIHNsb3cgKmFuZCogbG9zZXMgSklUIHR5cGUgaW5mb3JtYXRpb24sIHJlc3VsdGluZyBpblxyXG4vLyB3b3JzZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24gdGhhbiB3b3VsZCBiZSBvcHRpbWFsLiBJblxyXG4vLyBmYWN0LCB3aGVuIHNvcnRpbmcgd2l0aCBhIGNvbXBhcmF0b3IsIHRoZXNlIGNvc3RzIG91dHdlaWdoIHRoZSBiZW5lZml0cyBvZlxyXG4vLyBzb3J0aW5nIGluIEMrKy4gQnkgdXNpbmcgb3VyIG93biBKUy1pbXBsZW1lbnRlZCBRdWljayBTb3J0IChiZWxvdyksIHdlIGdldFxyXG4vLyBhIH4zNTAwbXMgbWVhbiBzcGVlZC11cCBpbiBgYmVuY2gvYmVuY2guaHRtbGAuXHJcblxyXG4vLyBDYXB0dXJlIE1hdGgucmFuZG9tKCkgbm93LCB0byBhdm9pZCBwcm9ibGVtcyBpbiBjYXNlIGEgdGVzdCBtb2NrcyBpdCBsYXRlci5cclxuLy8gSWYgTWF0aC5yYW5kb20oKSBpcyBtb2NrZWQgdG8gcmV0dXJuIGEgY29uc3RhbnQgdmFsdWUsIHF1aWNrU29ydCBtYXkgYmVjb21lXHJcbi8vIE8obl4yKSB3aGVuIGludm9rZWQgb24gYWxyZWFkeS1zb3J0ZWQgZGF0YS5cclxudmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLyoqXHJcbiAqIFN3YXAgdGhlIGVsZW1lbnRzIGluZGV4ZWQgYnkgYHhgIGFuZCBgeWAgaW4gdGhlIGFycmF5IGBhcnlgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcclxuICogICAgICAgIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgc2Vjb25kIGl0ZW0uXHJcbiAqL1xyXG5mdW5jdGlvbiBzd2FwKGFyeSwgeCwgeSkge1xyXG4gIHZhciB0ZW1wID0gYXJ5W3hdO1xyXG4gIGFyeVt4XSA9IGFyeVt5XTtcclxuICBhcnlbeV0gPSB0ZW1wO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIHdpdGhpbiB0aGUgcmFuZ2UgYGxvdyAuLiBoaWdoYCBpbmNsdXNpdmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3dcclxuICogICAgICAgIFRoZSBsb3dlciBib3VuZCBvbiB0aGUgcmFuZ2UuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoXHJcbiAqICAgICAgICBUaGUgdXBwZXIgYm91bmQgb24gdGhlIHJhbmdlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmFuZG9tSW50SW5SYW5nZShsb3csIGhpZ2gpIHtcclxuICByZXR1cm4gTWF0aC5yb3VuZChsb3cgKyAocmFuZG9tKCkgKiAoaGlnaCAtIGxvdykpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBRdWljayBTb3J0IGFsZ29yaXRobS5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJ5XHJcbiAqICAgICAgICBBbiBhcnJheSB0byBzb3J0LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJhdG9yXHJcbiAqICAgICAgICBGdW5jdGlvbiB0byB1c2UgdG8gY29tcGFyZSB0d28gaXRlbXMuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwXHJcbiAqICAgICAgICBTdGFydCBpbmRleCBvZiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJcclxuICogICAgICAgIEVuZCBpbmRleCBvZiB0aGUgYXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcCwgcikge1xyXG4gIC8vIElmIG91ciBsb3dlciBib3VuZCBpcyBsZXNzIHRoYW4gb3VyIHVwcGVyIGJvdW5kLCB3ZSAoMSkgcGFydGl0aW9uIHRoZVxyXG4gIC8vIGFycmF5IGludG8gdHdvIHBpZWNlcyBhbmQgKDIpIHJlY3Vyc2Ugb24gZWFjaCBoYWxmLiBJZiBpdCBpcyBub3QsIHRoaXMgaXNcclxuICAvLyB0aGUgZW1wdHkgYXJyYXkgYW5kIG91ciBiYXNlIGNhc2UuXHJcblxyXG4gIGlmIChwIDwgcikge1xyXG4gICAgLy8gKDEpIFBhcnRpdGlvbmluZy5cclxuICAgIC8vXHJcbiAgICAvLyBUaGUgcGFydGl0aW9uaW5nIGNob29zZXMgYSBwaXZvdCBiZXR3ZWVuIGBwYCBhbmQgYHJgIGFuZCBtb3ZlcyBhbGxcclxuICAgIC8vIGVsZW1lbnRzIHRoYXQgYXJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3QgdG8gdGhlIGJlZm9yZSBpdCwgYW5kXHJcbiAgICAvLyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgYXJlIGdyZWF0ZXIgdGhhbiBpdCBhZnRlciBpdC4gVGhlIGVmZmVjdCBpcyB0aGF0XHJcbiAgICAvLyBvbmNlIHBhcnRpdGlvbiBpcyBkb25lLCB0aGUgcGl2b3QgaXMgaW4gdGhlIGV4YWN0IHBsYWNlIGl0IHdpbGwgYmUgd2hlblxyXG4gICAgLy8gdGhlIGFycmF5IGlzIHB1dCBpbiBzb3J0ZWQgb3JkZXIsIGFuZCBpdCB3aWxsIG5vdCBuZWVkIHRvIGJlIG1vdmVkXHJcbiAgICAvLyBhZ2Fpbi4gVGhpcyBydW5zIGluIE8obiBsb2cgbikgdGltZS5cclxuXHJcbiAgICAvLyBBbHdheXMgY2hvb3NlIGEgcmFuZG9tIHBpdm90IHNvIHRoYXQgYW4gaW5wdXQgYXJyYXkgd2hpY2ggaXMgcmV2ZXJzZVxyXG4gICAgLy8gc29ydGVkIGRvZXMgbm90IGNhdXNlIE8obl4yKSBydW5uaW5nIHRpbWUuXHJcbiAgICB2YXIgcGl2b3RJbmRleCA9IHJhbmRvbUludEluUmFuZ2UocCwgcik7XHJcbiAgICB2YXIgaSA9IHAgLSAxO1xyXG5cclxuICAgIHN3YXAoYXJ5LCBwaXZvdEluZGV4LCByKTtcclxuICAgIHZhciBwaXZvdCA9IGFyeVtyXTtcclxuXHJcbiAgICAvLyBJbW1lZGlhdGVseSBhZnRlciBgamAgaXMgaW5jcmVtZW50ZWQgaW4gdGhpcyBsb29wLCB0aGUgZm9sbG93aW5nIGhvbGRcclxuICAgIC8vIHRydWU6XHJcbiAgICAvL1xyXG4gICAgLy8gICAqIEV2ZXJ5IGVsZW1lbnQgaW4gYGFyeVtwIC4uIGldYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHBpdm90LlxyXG4gICAgLy9cclxuICAgIC8vICAgKiBFdmVyeSBlbGVtZW50IGluIGBhcnlbaSsxIC4uIGotMV1gIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGl2b3QuXHJcbiAgICBmb3IgKHZhciBqID0gcDsgaiA8IHI7IGorKykge1xyXG4gICAgICBpZiAoY29tcGFyYXRvcihhcnlbal0sIHBpdm90KSA8PSAwKSB7XHJcbiAgICAgICAgaSArPSAxO1xyXG4gICAgICAgIHN3YXAoYXJ5LCBpLCBqKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN3YXAoYXJ5LCBpICsgMSwgaik7XHJcbiAgICB2YXIgcSA9IGkgKyAxO1xyXG5cclxuICAgIC8vICgyKSBSZWN1cnNlIG9uIGVhY2ggaGFsZi5cclxuXHJcbiAgICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHAsIHEgLSAxKTtcclxuICAgIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcSArIDEsIHIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNvcnQgdGhlIGdpdmVuIGFycmF5IGluLXBsYWNlIHdpdGggdGhlIGdpdmVuIGNvbXBhcmF0b3IgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyeVxyXG4gKiAgICAgICAgQW4gYXJyYXkgdG8gc29ydC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29tcGFyYXRvclxyXG4gKiAgICAgICAgRnVuY3Rpb24gdG8gdXNlIHRvIGNvbXBhcmUgdHdvIGl0ZW1zLlxyXG4gKi9cclxuZXhwb3J0cy5xdWlja1NvcnQgPSBmdW5jdGlvbiAoYXJ5LCBjb21wYXJhdG9yKSB7XHJcbiAgZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCAwLCBhcnkubGVuZ3RoIC0gMSk7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xyXG52YXIgYmluYXJ5U2VhcmNoID0gcmVxdWlyZSgnLi9iaW5hcnktc2VhcmNoJyk7XHJcbnZhciBBcnJheVNldCA9IHJlcXVpcmUoJy4vYXJyYXktc2V0JykuQXJyYXlTZXQ7XHJcbnZhciBiYXNlNjRWTFEgPSByZXF1aXJlKCcuL2Jhc2U2NC12bHEnKTtcclxudmFyIHF1aWNrU29ydCA9IHJlcXVpcmUoJy4vcXVpY2stc29ydCcpLnF1aWNrU29ydDtcclxuXHJcbmZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcclxuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc291cmNlTWFwLnNlY3Rpb25zICE9IG51bGxcclxuICAgID8gbmV3IEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcihzb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpXHJcbiAgICA6IG5ldyBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XHJcbn1cclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAgPSBmdW5jdGlvbihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XHJcbiAgcmV0dXJuIEJhc2ljU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcChhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cclxuICovXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vLyBgX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kIGBfX29yaWdpbmFsTWFwcGluZ3NgIGFyZSBhcnJheXMgdGhhdCBob2xkIHRoZVxyXG4vLyBwYXJzZWQgbWFwcGluZyBjb29yZGluYXRlcyBmcm9tIHRoZSBzb3VyY2UgbWFwJ3MgXCJtYXBwaW5nc1wiIGF0dHJpYnV0ZS4gVGhleVxyXG4vLyBhcmUgbGF6aWx5IGluc3RhbnRpYXRlZCwgYWNjZXNzZWQgdmlhIHRoZSBgX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcclxuLy8gYF9vcmlnaW5hbE1hcHBpbmdzYCBnZXR0ZXJzIHJlc3BlY3RpdmVseSwgYW5kIHdlIG9ubHkgcGFyc2UgdGhlIG1hcHBpbmdzXHJcbi8vIGFuZCBjcmVhdGUgdGhlc2UgYXJyYXlzIG9uY2UgcXVlcmllZCBmb3IgYSBzb3VyY2UgbG9jYXRpb24uIFdlIGp1bXAgdGhyb3VnaFxyXG4vLyB0aGVzZSBob29wcyBiZWNhdXNlIHRoZXJlIGNhbiBiZSBtYW55IHRob3VzYW5kcyBvZiBtYXBwaW5ncywgYW5kIHBhcnNpbmdcclxuLy8gdGhlbSBpcyBleHBlbnNpdmUsIHNvIHdlIG9ubHkgd2FudCB0byBkbyBpdCBpZiB3ZSBtdXN0LlxyXG4vL1xyXG4vLyBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXlzIGlzIG9mIHRoZSBmb3JtOlxyXG4vL1xyXG4vLyAgICAge1xyXG4vLyAgICAgICBnZW5lcmF0ZWRMaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBjb2RlLFxyXG4vLyAgICAgICBnZW5lcmF0ZWRDb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgY29kZSxcclxuLy8gICAgICAgc291cmNlOiBUaGUgcGF0aCB0byB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGUgdGhhdCBnZW5lcmF0ZWQgdGhpc1xyXG4vLyAgICAgICAgICAgICAgIGNodW5rIG9mIGNvZGUsXHJcbi8vICAgICAgIG9yaWdpbmFsTGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UgdGhhdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRzIHRvIHRoaXMgY2h1bmsgb2YgZ2VuZXJhdGVkIGNvZGUsXHJcbi8vICAgICAgIG9yaWdpbmFsQ29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlIHRoYXRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRzIHRvIHRoaXMgY2h1bmsgb2YgZ2VuZXJhdGVkIGNvZGUsXHJcbi8vICAgICAgIG5hbWU6IFRoZSBuYW1lIG9mIHRoZSBvcmlnaW5hbCBzeW1ib2wgd2hpY2ggZ2VuZXJhdGVkIHRoaXMgY2h1bmsgb2ZcclxuLy8gICAgICAgICAgICAgY29kZS5cclxuLy8gICAgIH1cclxuLy9cclxuLy8gQWxsIHByb3BlcnRpZXMgZXhjZXB0IGZvciBgZ2VuZXJhdGVkTGluZWAgYW5kIGBnZW5lcmF0ZWRDb2x1bW5gIGNhbiBiZVxyXG4vLyBgbnVsbGAuXHJcbi8vXHJcbi8vIGBfZ2VuZXJhdGVkTWFwcGluZ3NgIGlzIG9yZGVyZWQgYnkgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMuXHJcbi8vXHJcbi8vIGBfb3JpZ2luYWxNYXBwaW5nc2AgaXMgb3JkZXJlZCBieSB0aGUgb3JpZ2luYWwgcG9zaXRpb25zLlxyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBudWxsO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCAnX2dlbmVyYXRlZE1hcHBpbmdzJywge1xyXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MpIHtcclxuICAgICAgdGhpcy5fcGFyc2VNYXBwaW5ncyh0aGlzLl9tYXBwaW5ncywgdGhpcy5zb3VyY2VSb290KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzO1xyXG4gIH1cclxufSk7XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX19vcmlnaW5hbE1hcHBpbmdzID0gbnVsbDtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgJ19vcmlnaW5hbE1hcHBpbmdzJywge1xyXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncykge1xyXG4gICAgICB0aGlzLl9wYXJzZU1hcHBpbmdzKHRoaXMuX21hcHBpbmdzLCB0aGlzLnNvdXJjZVJvb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncztcclxuICB9XHJcbn0pO1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yKGFTdHIsIGluZGV4KSB7XHJcbiAgICB2YXIgYyA9IGFTdHIuY2hhckF0KGluZGV4KTtcclxuICAgIHJldHVybiBjID09PSBcIjtcIiB8fCBjID09PSBcIixcIjtcclxuICB9O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHRoZSBtYXBwaW5ncyBpbiBhIHN0cmluZyBpbiB0byBhIGRhdGEgc3RydWN0dXJlIHdoaWNoIHdlIGNhbiBlYXNpbHlcclxuICogcXVlcnkgKHRoZSBvcmRlcmVkIGFycmF5cyBpbiB0aGUgYHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kXHJcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXHJcbiAqL1xyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPVxyXG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3BhcnNlTWFwcGluZ3MoYVN0ciwgYVNvdXJjZVJvb3QpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN1YmNsYXNzZXMgbXVzdCBpbXBsZW1lbnQgX3BhcnNlTWFwcGluZ3NcIik7XHJcbiAgfTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUiA9IDE7XHJcblNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSID0gMjtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EID0gMTtcclxuU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQgPSAyO1xyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgb3ZlciBlYWNoIG1hcHBpbmcgYmV0d2VlbiBhbiBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4gYW5kIGFcclxuICogZ2VuZXJhdGVkIGxpbmUvY29sdW1uIGluIHRoaXMgc291cmNlIG1hcC5cclxuICpcclxuICogQHBhcmFtIEZ1bmN0aW9uIGFDYWxsYmFja1xyXG4gKiAgICAgICAgVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggZWFjaCBtYXBwaW5nLlxyXG4gKiBAcGFyYW0gT2JqZWN0IGFDb250ZXh0XHJcbiAqICAgICAgICBPcHRpb25hbC4gSWYgc3BlY2lmaWVkLCB0aGlzIG9iamVjdCB3aWxsIGJlIHRoZSB2YWx1ZSBvZiBgdGhpc2AgZXZlcnlcclxuICogICAgICAgIHRpbWUgdGhhdCBgYUNhbGxiYWNrYCBpcyBjYWxsZWQuXHJcbiAqIEBwYXJhbSBhT3JkZXJcclxuICogICAgICAgIEVpdGhlciBgU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSYCBvclxyXG4gKiAgICAgICAgYFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSYC4gU3BlY2lmaWVzIHdoZXRoZXIgeW91IHdhbnQgdG9cclxuICogICAgICAgIGl0ZXJhdGUgb3ZlciB0aGUgbWFwcGluZ3Mgc29ydGVkIGJ5IHRoZSBnZW5lcmF0ZWQgZmlsZSdzIGxpbmUvY29sdW1uXHJcbiAqICAgICAgICBvcmRlciBvciB0aGUgb3JpZ2luYWwncyBzb3VyY2UvbGluZS9jb2x1bW4gb3JkZXIsIHJlc3BlY3RpdmVseS4gRGVmYXVsdHMgdG9cclxuICogICAgICAgIGBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVJgLlxyXG4gKi9cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmVhY2hNYXBwaW5nID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9lYWNoTWFwcGluZyhhQ2FsbGJhY2ssIGFDb250ZXh0LCBhT3JkZXIpIHtcclxuICAgIHZhciBjb250ZXh0ID0gYUNvbnRleHQgfHwgbnVsbDtcclxuICAgIHZhciBvcmRlciA9IGFPcmRlciB8fCBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVI7XHJcblxyXG4gICAgdmFyIG1hcHBpbmdzO1xyXG4gICAgc3dpdGNoIChvcmRlcikge1xyXG4gICAgY2FzZSBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVI6XHJcbiAgICAgIG1hcHBpbmdzID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3M7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBTb3VyY2VNYXBDb25zdW1lci5PUklHSU5BTF9PUkRFUjpcclxuICAgICAgbWFwcGluZ3MgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3JkZXIgb2YgaXRlcmF0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc291cmNlUm9vdCA9IHRoaXMuc291cmNlUm9vdDtcclxuICAgIG1hcHBpbmdzLm1hcChmdW5jdGlvbiAobWFwcGluZykge1xyXG4gICAgICB2YXIgc291cmNlID0gbnVsbDtcclxuICAgICAgaWYobWFwcGluZy5zb3VyY2UgIT09IG51bGwpIHtcclxuICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmF0KG1hcHBpbmcuc291cmNlKTtcclxuICAgICAgICBzb3VyY2UgPSB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgICAgZ2VuZXJhdGVkTGluZTogbWFwcGluZy5nZW5lcmF0ZWRMaW5lLFxyXG4gICAgICAgIGdlbmVyYXRlZENvbHVtbjogbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4sXHJcbiAgICAgICAgb3JpZ2luYWxMaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICBvcmlnaW5hbENvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtbixcclxuICAgICAgICBuYW1lOiBtYXBwaW5nLm5hbWUgPT09IG51bGwgPyBudWxsIDogdGhpcy5fbmFtZXMuYXQobWFwcGluZy5uYW1lKVxyXG4gICAgICB9O1xyXG4gICAgfSwgdGhpcykuZm9yRWFjaChhQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbGwgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcclxuICogbGluZSwgYW5kIGNvbHVtbiBwcm92aWRlZC4gSWYgbm8gY29sdW1uIGlzIHByb3ZpZGVkLCByZXR1cm5zIGFsbCBtYXBwaW5nc1xyXG4gKiBjb3JyZXNwb25kaW5nIHRvIGEgZWl0aGVyIHRoZSBsaW5lIHdlIGFyZSBzZWFyY2hpbmcgZm9yIG9yIHRoZSBuZXh0XHJcbiAqIGNsb3Nlc3QgbGluZSB0aGF0IGhhcyBhbnkgbWFwcGluZ3MuIE90aGVyd2lzZSwgcmV0dXJucyBhbGwgbWFwcGluZ3NcclxuICogY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4gbGluZSBhbmQgZWl0aGVyIHRoZSBjb2x1bW4gd2UgYXJlIHNlYXJjaGluZyBmb3JcclxuICogb3IgdGhlIG5leHQgY2xvc2VzdCBjb2x1bW4gdGhhdCBoYXMgYW55IG9mZnNldHMuXHJcbiAqXHJcbiAqIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBPcHRpb25hbC4gdGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICpcclxuICogYW5kIGFuIGFycmF5IG9mIG9iamVjdHMgaXMgcmV0dXJuZWQsIGVhY2ggd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXHJcbiAqICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqL1xyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IoYUFyZ3MpIHtcclxuICAgIHZhciBsaW5lID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyk7XHJcblxyXG4gICAgLy8gV2hlbiB0aGVyZSBpcyBubyBleGFjdCBtYXRjaCwgQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2ZpbmRNYXBwaW5nXHJcbiAgICAvLyByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY2xvc2VzdCBtYXBwaW5nIGxlc3MgdGhhbiB0aGUgbmVlZGxlLiBCeVxyXG4gICAgLy8gc2V0dGluZyBuZWVkbGUub3JpZ2luYWxDb2x1bW4gdG8gMCwgd2UgdGh1cyBmaW5kIHRoZSBsYXN0IG1hcHBpbmcgZm9yXHJcbiAgICAvLyB0aGUgZ2l2ZW4gbGluZSwgcHJvdmlkZWQgc3VjaCBhIG1hcHBpbmcgZXhpc3RzLlxyXG4gICAgdmFyIG5lZWRsZSA9IHtcclxuICAgICAgc291cmNlOiB1dGlsLmdldEFyZyhhQXJncywgJ3NvdXJjZScpLFxyXG4gICAgICBvcmlnaW5hbExpbmU6IGxpbmUsXHJcbiAgICAgIG9yaWdpbmFsQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgJ2NvbHVtbicsIDApXHJcbiAgICB9O1xyXG5cclxuICAgIG5lZWRsZS5zb3VyY2UgPSB0aGlzLl9maW5kU291cmNlSW5kZXgobmVlZGxlLnNvdXJjZSk7XHJcbiAgICBpZiAobmVlZGxlLnNvdXJjZSA8IDApIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtYXBwaW5ncyA9IFtdO1xyXG5cclxuICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRNYXBwaW5nKG5lZWRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsTWFwcGluZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yaWdpbmFsTGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcmlnaW5hbENvbHVtblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVNlYXJjaC5MRUFTVF9VUFBFUl9CT1VORCk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB2YXIgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbaW5kZXhdO1xyXG5cclxuICAgICAgaWYgKGFBcmdzLmNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHVudGlsIGVpdGhlciB3ZSBydW4gb3V0IG9mIG1hcHBpbmdzLCBvciB3ZSBydW4gaW50b1xyXG4gICAgICAgIC8vIGEgbWFwcGluZyBmb3IgYSBkaWZmZXJlbnQgbGluZSB0aGFuIHRoZSBvbmUgd2UgZm91bmQuIFNpbmNlXHJcbiAgICAgICAgLy8gbWFwcGluZ3MgYXJlIHNvcnRlZCwgdGhpcyBpcyBndWFyYW50ZWVkIHRvIGZpbmQgYWxsIG1hcHBpbmdzIGZvclxyXG4gICAgICAgIC8vIHRoZSBsaW5lIHdlIGZvdW5kLlxyXG4gICAgICAgIHdoaWxlIChtYXBwaW5nICYmIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBvcmlnaW5hbExpbmUpIHtcclxuICAgICAgICAgIG1hcHBpbmdzLnB1c2goe1xyXG4gICAgICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnZ2VuZXJhdGVkTGluZScsIG51bGwpLFxyXG4gICAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRDb2x1bW4nLCBudWxsKSxcclxuICAgICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2xhc3RHZW5lcmF0ZWRDb2x1bW4nLCBudWxsKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbKytpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBvcmlnaW5hbENvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdW50aWwgZWl0aGVyIHdlIHJ1biBvdXQgb2YgbWFwcGluZ3MsIG9yIHdlIHJ1biBpbnRvXHJcbiAgICAgICAgLy8gYSBtYXBwaW5nIGZvciBhIGRpZmZlcmVudCBsaW5lIHRoYW4gdGhlIG9uZSB3ZSB3ZXJlIHNlYXJjaGluZyBmb3IuXHJcbiAgICAgICAgLy8gU2luY2UgbWFwcGluZ3MgYXJlIHNvcnRlZCwgdGhpcyBpcyBndWFyYW50ZWVkIHRvIGZpbmQgYWxsIG1hcHBpbmdzIGZvclxyXG4gICAgICAgIC8vIHRoZSBsaW5lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLlxyXG4gICAgICAgIHdoaWxlIChtYXBwaW5nICYmXHJcbiAgICAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBsaW5lICYmXHJcbiAgICAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPT0gb3JpZ2luYWxDb2x1bW4pIHtcclxuICAgICAgICAgIG1hcHBpbmdzLnB1c2goe1xyXG4gICAgICAgICAgICBsaW5lOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnZ2VuZXJhdGVkTGluZScsIG51bGwpLFxyXG4gICAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRDb2x1bW4nLCBudWxsKSxcclxuICAgICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2xhc3RHZW5lcmF0ZWRDb2x1bW4nLCBudWxsKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbKytpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcHBpbmdzO1xyXG4gIH07XHJcblxyXG5leHBvcnRzLlNvdXJjZU1hcENvbnN1bWVyID0gU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogQSBCYXNpY1NvdXJjZU1hcENvbnN1bWVyIGluc3RhbmNlIHJlcHJlc2VudHMgYSBwYXJzZWQgc291cmNlIG1hcCB3aGljaCB3ZSBjYW5cclxuICogcXVlcnkgZm9yIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcmlnaW5hbCBmaWxlIHBvc2l0aW9ucyBieSBnaXZpbmcgaXQgYSBmaWxlXHJcbiAqIHBvc2l0aW9uIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLlxyXG4gKlxyXG4gKiBUaGUgZmlyc3QgcGFyYW1ldGVyIGlzIHRoZSByYXcgc291cmNlIG1hcCAoZWl0aGVyIGFzIGEgSlNPTiBzdHJpbmcsIG9yXHJcbiAqIGFscmVhZHkgcGFyc2VkIHRvIGFuIG9iamVjdCkuIEFjY29yZGluZyB0byB0aGUgc3BlYywgc291cmNlIG1hcHMgaGF2ZSB0aGVcclxuICogZm9sbG93aW5nIGF0dHJpYnV0ZXM6XHJcbiAqXHJcbiAqICAgLSB2ZXJzaW9uOiBXaGljaCB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwIHNwZWMgdGhpcyBtYXAgaXMgZm9sbG93aW5nLlxyXG4gKiAgIC0gc291cmNlczogQW4gYXJyYXkgb2YgVVJMcyB0byB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGVzLlxyXG4gKiAgIC0gbmFtZXM6IEFuIGFycmF5IG9mIGlkZW50aWZpZXJzIHdoaWNoIGNhbiBiZSByZWZlcmVuY2VkIGJ5IGluZGl2aWR1YWwgbWFwcGluZ3MuXHJcbiAqICAgLSBzb3VyY2VSb290OiBPcHRpb25hbC4gVGhlIFVSTCByb290IGZyb20gd2hpY2ggYWxsIHNvdXJjZXMgYXJlIHJlbGF0aXZlLlxyXG4gKiAgIC0gc291cmNlc0NvbnRlbnQ6IE9wdGlvbmFsLiBBbiBhcnJheSBvZiBjb250ZW50cyBvZiB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGVzLlxyXG4gKiAgIC0gbWFwcGluZ3M6IEEgc3RyaW5nIG9mIGJhc2U2NCBWTFFzIHdoaWNoIGNvbnRhaW4gdGhlIGFjdHVhbCBtYXBwaW5ncy5cclxuICogICAtIGZpbGU6IE9wdGlvbmFsLiBUaGUgZ2VuZXJhdGVkIGZpbGUgdGhpcyBzb3VyY2UgbWFwIGlzIGFzc29jaWF0ZWQgd2l0aC5cclxuICpcclxuICogSGVyZSBpcyBhbiBleGFtcGxlIHNvdXJjZSBtYXAsIHRha2VuIGZyb20gdGhlIHNvdXJjZSBtYXAgc3BlY1swXTpcclxuICpcclxuICogICAgIHtcclxuICogICAgICAgdmVyc2lvbiA6IDMsXHJcbiAqICAgICAgIGZpbGU6IFwib3V0LmpzXCIsXHJcbiAqICAgICAgIHNvdXJjZVJvb3QgOiBcIlwiLFxyXG4gKiAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIiwgXCJiYXIuanNcIl0sXHJcbiAqICAgICAgIG5hbWVzOiBbXCJzcmNcIiwgXCJtYXBzXCIsIFwiYXJlXCIsIFwiZnVuXCJdLFxyXG4gKiAgICAgICBtYXBwaW5nczogXCJBQSxBQjs7QUJDREU7XCJcclxuICogICAgIH1cclxuICpcclxuICogVGhlIHNlY29uZCBwYXJhbWV0ZXIsIGlmIGdpdmVuLCBpcyBhIHN0cmluZyB3aG9zZSB2YWx1ZSBpcyB0aGUgVVJMXHJcbiAqIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIHdhcyBmb3VuZC4gIFRoaXMgVVJMIGlzIHVzZWQgdG8gY29tcHV0ZSB0aGVcclxuICogc291cmNlcyBhcnJheS5cclxuICpcclxuICogWzBdOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzFVMVJHQWVoUXdSeXBVVG92RjFLUmxwaU9GemUwYi1fMmdjNmZBSDBLWTBrL2VkaXQ/cGxpPTEjXHJcbiAqL1xyXG5mdW5jdGlvbiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcclxuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XHJcbiAgfVxyXG5cclxuICB2YXIgdmVyc2lvbiA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3ZlcnNpb24nKTtcclxuICB2YXIgc291cmNlcyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3NvdXJjZXMnKTtcclxuICAvLyBTYXNzIDMuMyBsZWF2ZXMgb3V0IHRoZSAnbmFtZXMnIGFycmF5LCBzbyB3ZSBkZXZpYXRlIGZyb20gdGhlIHNwZWMgKHdoaWNoXHJcbiAgLy8gcmVxdWlyZXMgdGhlIGFycmF5KSB0byBwbGF5IG5pY2UgaGVyZS5cclxuICB2YXIgbmFtZXMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICduYW1lcycsIFtdKTtcclxuICB2YXIgc291cmNlUm9vdCA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3NvdXJjZVJvb3QnLCBudWxsKTtcclxuICB2YXIgc291cmNlc0NvbnRlbnQgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdzb3VyY2VzQ29udGVudCcsIG51bGwpO1xyXG4gIHZhciBtYXBwaW5ncyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ21hcHBpbmdzJyk7XHJcbiAgdmFyIGZpbGUgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdmaWxlJywgbnVsbCk7XHJcblxyXG4gIC8vIE9uY2UgYWdhaW4sIFNhc3MgZGV2aWF0ZXMgZnJvbSB0aGUgc3BlYyBhbmQgc3VwcGxpZXMgdGhlIHZlcnNpb24gYXMgYVxyXG4gIC8vIHN0cmluZyByYXRoZXIgdGhhbiBhIG51bWJlciwgc28gd2UgdXNlIGxvb3NlIGVxdWFsaXR5IGNoZWNraW5nIGhlcmUuXHJcbiAgaWYgKHZlcnNpb24gIT0gdGhpcy5fdmVyc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XHJcbiAgfVxyXG5cclxuICBpZiAoc291cmNlUm9vdCkge1xyXG4gICAgc291cmNlUm9vdCA9IHV0aWwubm9ybWFsaXplKHNvdXJjZVJvb3QpO1xyXG4gIH1cclxuXHJcbiAgc291cmNlcyA9IHNvdXJjZXNcclxuICAgIC5tYXAoU3RyaW5nKVxyXG4gICAgLy8gU29tZSBzb3VyY2UgbWFwcyBwcm9kdWNlIHJlbGF0aXZlIHNvdXJjZSBwYXRocyBsaWtlIFwiLi9mb28uanNcIiBpbnN0ZWFkIG9mXHJcbiAgICAvLyBcImZvby5qc1wiLiAgTm9ybWFsaXplIHRoZXNlIGZpcnN0IHNvIHRoYXQgZnV0dXJlIGNvbXBhcmlzb25zIHdpbGwgc3VjY2VlZC5cclxuICAgIC8vIFNlZSBidWd6aWwubGEvMTA5MDc2OC5cclxuICAgIC5tYXAodXRpbC5ub3JtYWxpemUpXHJcbiAgICAvLyBBbHdheXMgZW5zdXJlIHRoYXQgYWJzb2x1dGUgc291cmNlcyBhcmUgaW50ZXJuYWxseSBzdG9yZWQgcmVsYXRpdmUgdG9cclxuICAgIC8vIHRoZSBzb3VyY2Ugcm9vdCwgaWYgdGhlIHNvdXJjZSByb290IGlzIGFic29sdXRlLiBOb3QgZG9pbmcgdGhpcyB3b3VsZFxyXG4gICAgLy8gYmUgcGFydGljdWxhcmx5IHByb2JsZW1hdGljIHdoZW4gdGhlIHNvdXJjZSByb290IGlzIGEgcHJlZml4IG9mIHRoZVxyXG4gICAgLy8gc291cmNlICh2YWxpZCwgYnV0IHdoeT8/KS4gU2VlIGdpdGh1YiBpc3N1ZSAjMTk5IGFuZCBidWd6aWwubGEvMTE4ODk4Mi5cclxuICAgIC5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gc291cmNlUm9vdCAmJiB1dGlsLmlzQWJzb2x1dGUoc291cmNlUm9vdCkgJiYgdXRpbC5pc0Fic29sdXRlKHNvdXJjZSlcclxuICAgICAgICA/IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgc291cmNlKVxyXG4gICAgICAgIDogc291cmNlO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIFBhc3MgYHRydWVgIGJlbG93IHRvIGFsbG93IGR1cGxpY2F0ZSBuYW1lcyBhbmQgc291cmNlcy4gV2hpbGUgc291cmNlIG1hcHNcclxuICAvLyBhcmUgaW50ZW5kZWQgdG8gYmUgY29tcHJlc3NlZCBhbmQgZGVkdXBsaWNhdGVkLCB0aGUgVHlwZVNjcmlwdCBjb21waWxlclxyXG4gIC8vIHNvbWV0aW1lcyBnZW5lcmF0ZXMgc291cmNlIG1hcHMgd2l0aCBkdXBsaWNhdGVzIGluIHRoZW0uIFNlZSBHaXRodWIgaXNzdWVcclxuICAvLyAjNzIgYW5kIGJ1Z3ppbC5sYS84ODk0OTIuXHJcbiAgdGhpcy5fbmFtZXMgPSBBcnJheVNldC5mcm9tQXJyYXkobmFtZXMubWFwKFN0cmluZyksIHRydWUpO1xyXG4gIHRoaXMuX3NvdXJjZXMgPSBBcnJheVNldC5mcm9tQXJyYXkoc291cmNlcywgdHJ1ZSk7XHJcblxyXG4gIHRoaXMuX2Fic29sdXRlU291cmNlcyA9IHRoaXMuX3NvdXJjZXMudG9BcnJheSgpLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgcmV0dXJuIHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzLCBhU291cmNlTWFwVVJMKTtcclxuICB9KTtcclxuXHJcbiAgdGhpcy5zb3VyY2VSb290ID0gc291cmNlUm9vdDtcclxuICB0aGlzLnNvdXJjZXNDb250ZW50ID0gc291cmNlc0NvbnRlbnQ7XHJcbiAgdGhpcy5fbWFwcGluZ3MgPSBtYXBwaW5ncztcclxuICB0aGlzLl9zb3VyY2VNYXBVUkwgPSBhU291cmNlTWFwVVJMO1xyXG4gIHRoaXMuZmlsZSA9IGZpbGU7XHJcbn1cclxuXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5jb25zdW1lciA9IFNvdXJjZU1hcENvbnN1bWVyO1xyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZmluZCB0aGUgaW5kZXggb2YgYSBzb3VyY2UuICBSZXR1cm5zIC0xIGlmIG5vdFxyXG4gKiBmb3VuZC5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9maW5kU291cmNlSW5kZXggPSBmdW5jdGlvbihhU291cmNlKSB7XHJcbiAgdmFyIHJlbGF0aXZlU291cmNlID0gYVNvdXJjZTtcclxuICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgIHJlbGF0aXZlU291cmNlID0gdXRpbC5yZWxhdGl2ZSh0aGlzLnNvdXJjZVJvb3QsIHJlbGF0aXZlU291cmNlKTtcclxuICB9XHJcblxyXG4gIGlmICh0aGlzLl9zb3VyY2VzLmhhcyhyZWxhdGl2ZVNvdXJjZSkpIHtcclxuICAgIHJldHVybiB0aGlzLl9zb3VyY2VzLmluZGV4T2YocmVsYXRpdmVTb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgLy8gTWF5YmUgYVNvdXJjZSBpcyBhbiBhYnNvbHV0ZSBVUkwgYXMgcmV0dXJuZWQgYnkgfHNvdXJjZXN8LiAgSW5cclxuICAvLyB0aGlzIGNhc2Ugd2UgY2FuJ3Qgc2ltcGx5IHVuZG8gdGhlIHRyYW5zZm9ybS5cclxuICB2YXIgaTtcclxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5fYWJzb2x1dGVTb3VyY2VzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBpZiAodGhpcy5fYWJzb2x1dGVTb3VyY2VzW2ldID09IGFTb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgQmFzaWNTb3VyY2VNYXBDb25zdW1lciBmcm9tIGEgU291cmNlTWFwR2VuZXJhdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0gU291cmNlTWFwR2VuZXJhdG9yIGFTb3VyY2VNYXBcclxuICogICAgICAgIFRoZSBzb3VyY2UgbWFwIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cclxuICogQHBhcmFtIFN0cmluZyBhU291cmNlTWFwVVJMXHJcbiAqICAgICAgICBUaGUgVVJMIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIGNhbiBiZSBmb3VuZCAob3B0aW9uYWwpXHJcbiAqIEByZXR1cm5zIEJhc2ljU291cmNlTWFwQ29uc3VtZXJcclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcCA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZnJvbVNvdXJjZU1hcChhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XHJcbiAgICB2YXIgc21jID0gT2JqZWN0LmNyZWF0ZShCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSk7XHJcblxyXG4gICAgdmFyIG5hbWVzID0gc21jLl9uYW1lcyA9IEFycmF5U2V0LmZyb21BcnJheShhU291cmNlTWFwLl9uYW1lcy50b0FycmF5KCksIHRydWUpO1xyXG4gICAgdmFyIHNvdXJjZXMgPSBzbWMuX3NvdXJjZXMgPSBBcnJheVNldC5mcm9tQXJyYXkoYVNvdXJjZU1hcC5fc291cmNlcy50b0FycmF5KCksIHRydWUpO1xyXG4gICAgc21jLnNvdXJjZVJvb3QgPSBhU291cmNlTWFwLl9zb3VyY2VSb290O1xyXG4gICAgc21jLnNvdXJjZXNDb250ZW50ID0gYVNvdXJjZU1hcC5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudChzbWMuX3NvdXJjZXMudG9BcnJheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWMuc291cmNlUm9vdCk7XHJcbiAgICBzbWMuZmlsZSA9IGFTb3VyY2VNYXAuX2ZpbGU7XHJcbiAgICBzbWMuX3NvdXJjZU1hcFVSTCA9IGFTb3VyY2VNYXBVUkw7XHJcbiAgICBzbWMuX2Fic29sdXRlU291cmNlcyA9IHNtYy5fc291cmNlcy50b0FycmF5KCkubWFwKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgIHJldHVybiB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc21jLnNvdXJjZVJvb3QsIHMsIGFTb3VyY2VNYXBVUkwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQmVjYXVzZSB3ZSBhcmUgbW9kaWZ5aW5nIHRoZSBlbnRyaWVzIChieSBjb252ZXJ0aW5nIHN0cmluZyBzb3VyY2VzIGFuZFxyXG4gICAgLy8gbmFtZXMgdG8gaW5kaWNlcyBpbnRvIHRoZSBzb3VyY2VzIGFuZCBuYW1lcyBBcnJheVNldHMpLCB3ZSBoYXZlIHRvIG1ha2VcclxuICAgIC8vIGEgY29weSBvZiB0aGUgZW50cnkgb3IgZWxzZSBiYWQgdGhpbmdzIGhhcHBlbi4gU2hhcmVkIG11dGFibGUgc3RhdGVcclxuICAgIC8vIHN0cmlrZXMgYWdhaW4hIFNlZSBnaXRodWIgaXNzdWUgIzE5MS5cclxuXHJcbiAgICB2YXIgZ2VuZXJhdGVkTWFwcGluZ3MgPSBhU291cmNlTWFwLl9tYXBwaW5ncy50b0FycmF5KCkuc2xpY2UoKTtcclxuICAgIHZhciBkZXN0R2VuZXJhdGVkTWFwcGluZ3MgPSBzbWMuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xyXG4gICAgdmFyIGRlc3RPcmlnaW5hbE1hcHBpbmdzID0gc21jLl9fb3JpZ2luYWxNYXBwaW5ncyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZW5lcmF0ZWRNYXBwaW5ncy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgc3JjTWFwcGluZyA9IGdlbmVyYXRlZE1hcHBpbmdzW2ldO1xyXG4gICAgICB2YXIgZGVzdE1hcHBpbmcgPSBuZXcgTWFwcGluZztcclxuICAgICAgZGVzdE1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9IHNyY01hcHBpbmcuZ2VuZXJhdGVkTGluZTtcclxuICAgICAgZGVzdE1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uID0gc3JjTWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcblxyXG4gICAgICBpZiAoc3JjTWFwcGluZy5zb3VyY2UpIHtcclxuICAgICAgICBkZXN0TWFwcGluZy5zb3VyY2UgPSBzb3VyY2VzLmluZGV4T2Yoc3JjTWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIGRlc3RNYXBwaW5nLm9yaWdpbmFsTGluZSA9IHNyY01hcHBpbmcub3JpZ2luYWxMaW5lO1xyXG4gICAgICAgIGRlc3RNYXBwaW5nLm9yaWdpbmFsQ29sdW1uID0gc3JjTWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuXHJcbiAgICAgICAgaWYgKHNyY01hcHBpbmcubmFtZSkge1xyXG4gICAgICAgICAgZGVzdE1hcHBpbmcubmFtZSA9IG5hbWVzLmluZGV4T2Yoc3JjTWFwcGluZy5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc3RPcmlnaW5hbE1hcHBpbmdzLnB1c2goZGVzdE1hcHBpbmcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkZXN0R2VuZXJhdGVkTWFwcGluZ3MucHVzaChkZXN0TWFwcGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcXVpY2tTb3J0KHNtYy5fX29yaWdpbmFsTWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiBzbWM7XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcHBpbmcgc3BlYyB0aGF0IHdlIGFyZSBjb25zdW1pbmcuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vKipcclxuICogVGhlIGxpc3Qgb2Ygb3JpZ2luYWwgc291cmNlcy5cclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgJ3NvdXJjZXMnLCB7XHJcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWJzb2x1dGVTb3VyY2VzLnNsaWNlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHRoZSBKSVQgd2l0aCBhIG5pY2Ugc2hhcGUgLyBoaWRkZW4gY2xhc3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBNYXBwaW5nKCkge1xyXG4gIHRoaXMuZ2VuZXJhdGVkTGluZSA9IDA7XHJcbiAgdGhpcy5nZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gIHRoaXMuc291cmNlID0gbnVsbDtcclxuICB0aGlzLm9yaWdpbmFsTGluZSA9IG51bGw7XHJcbiAgdGhpcy5vcmlnaW5hbENvbHVtbiA9IG51bGw7XHJcbiAgdGhpcy5uYW1lID0gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHRoZSBtYXBwaW5ncyBpbiBhIHN0cmluZyBpbiB0byBhIGRhdGEgc3RydWN0dXJlIHdoaWNoIHdlIGNhbiBlYXNpbHlcclxuICogcXVlcnkgKHRoZSBvcmRlcmVkIGFycmF5cyBpbiB0aGUgYHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kXHJcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fcGFyc2VNYXBwaW5ncyA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhhU3RyLCBhU291cmNlUm9vdCkge1xyXG4gICAgdmFyIGdlbmVyYXRlZExpbmUgPSAxO1xyXG4gICAgdmFyIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICAgIHZhciBwcmV2aW91c09yaWdpbmFsTGluZSA9IDA7XHJcbiAgICB2YXIgcHJldmlvdXNPcmlnaW5hbENvbHVtbiA9IDA7XHJcbiAgICB2YXIgcHJldmlvdXNTb3VyY2UgPSAwO1xyXG4gICAgdmFyIHByZXZpb3VzTmFtZSA9IDA7XHJcbiAgICB2YXIgbGVuZ3RoID0gYVN0ci5sZW5ndGg7XHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgdmFyIGNhY2hlZFNlZ21lbnRzID0ge307XHJcbiAgICB2YXIgdGVtcCA9IHt9O1xyXG4gICAgdmFyIG9yaWdpbmFsTWFwcGluZ3MgPSBbXTtcclxuICAgIHZhciBnZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xyXG4gICAgdmFyIG1hcHBpbmcsIHN0ciwgc2VnbWVudCwgZW5kLCB2YWx1ZTtcclxuXHJcbiAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcclxuICAgICAgaWYgKGFTdHIuY2hhckF0KGluZGV4KSA9PT0gJzsnKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVkTGluZSsrO1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGFTdHIuY2hhckF0KGluZGV4KSA9PT0gJywnKSB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBtYXBwaW5nID0gbmV3IE1hcHBpbmcoKTtcclxuICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZExpbmUgPSBnZW5lcmF0ZWRMaW5lO1xyXG5cclxuICAgICAgICAvLyBCZWNhdXNlIGVhY2ggb2Zmc2V0IGlzIGVuY29kZWQgcmVsYXRpdmUgdG8gdGhlIHByZXZpb3VzIG9uZSxcclxuICAgICAgICAvLyBtYW55IHNlZ21lbnRzIG9mdGVuIGhhdmUgdGhlIHNhbWUgZW5jb2RpbmcuIFdlIGNhbiBleHBsb2l0IHRoaXNcclxuICAgICAgICAvLyBmYWN0IGJ5IGNhY2hpbmcgdGhlIHBhcnNlZCB2YXJpYWJsZSBsZW5ndGggZmllbGRzIG9mIGVhY2ggc2VnbWVudCxcclxuICAgICAgICAvLyBhbGxvd2luZyB1cyB0byBhdm9pZCBhIHNlY29uZCBwYXJzZSBpZiB3ZSBlbmNvdW50ZXIgdGhlIHNhbWVcclxuICAgICAgICAvLyBzZWdtZW50IGFnYWluLlxyXG4gICAgICAgIGZvciAoZW5kID0gaW5kZXg7IGVuZCA8IGxlbmd0aDsgZW5kKyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yKGFTdHIsIGVuZCkpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciA9IGFTdHIuc2xpY2UoaW5kZXgsIGVuZCk7XHJcblxyXG4gICAgICAgIHNlZ21lbnQgPSBjYWNoZWRTZWdtZW50c1tzdHJdO1xyXG4gICAgICAgIGlmIChzZWdtZW50KSB7XHJcbiAgICAgICAgICBpbmRleCArPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZWdtZW50ID0gW107XHJcbiAgICAgICAgICB3aGlsZSAoaW5kZXggPCBlbmQpIHtcclxuICAgICAgICAgICAgYmFzZTY0VkxRLmRlY29kZShhU3RyLCBpbmRleCwgdGVtcCk7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGVtcC52YWx1ZTtcclxuICAgICAgICAgICAgaW5kZXggPSB0ZW1wLnJlc3Q7XHJcbiAgICAgICAgICAgIHNlZ21lbnQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgYSBzb3VyY2UsIGJ1dCBubyBsaW5lIGFuZCBjb2x1bW4nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCBhIHNvdXJjZSBhbmQgbGluZSwgYnV0IG5vIGNvbHVtbicpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhY2hlZFNlZ21lbnRzW3N0cl0gPSBzZWdtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGVkIGNvbHVtbi5cclxuICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA9IHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uICsgc2VnbWVudFswXTtcclxuICAgICAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAvLyBPcmlnaW5hbCBzb3VyY2UuXHJcbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHByZXZpb3VzU291cmNlICsgc2VnbWVudFsxXTtcclxuICAgICAgICAgIHByZXZpb3VzU291cmNlICs9IHNlZ21lbnRbMV07XHJcblxyXG4gICAgICAgICAgLy8gT3JpZ2luYWwgbGluZS5cclxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lID0gcHJldmlvdXNPcmlnaW5hbExpbmUgKyBzZWdtZW50WzJdO1xyXG4gICAgICAgICAgcHJldmlvdXNPcmlnaW5hbExpbmUgPSBtYXBwaW5nLm9yaWdpbmFsTGluZTtcclxuICAgICAgICAgIC8vIExpbmVzIGFyZSBzdG9yZWQgMC1iYXNlZFxyXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgKz0gMTtcclxuXHJcbiAgICAgICAgICAvLyBPcmlnaW5hbCBjb2x1bW4uXHJcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uID0gcHJldmlvdXNPcmlnaW5hbENvbHVtbiArIHNlZ21lbnRbM107XHJcbiAgICAgICAgICBwcmV2aW91c09yaWdpbmFsQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuXHJcbiAgICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgIC8vIE9yaWdpbmFsIG5hbWUuXHJcbiAgICAgICAgICAgIG1hcHBpbmcubmFtZSA9IHByZXZpb3VzTmFtZSArIHNlZ21lbnRbNF07XHJcbiAgICAgICAgICAgIHByZXZpb3VzTmFtZSArPSBzZWdtZW50WzRdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2VuZXJhdGVkTWFwcGluZ3MucHVzaChtYXBwaW5nKTtcclxuICAgICAgICBpZiAodHlwZW9mIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgb3JpZ2luYWxNYXBwaW5ncy5wdXNoKG1hcHBpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHF1aWNrU29ydChnZW5lcmF0ZWRNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCk7XHJcbiAgICB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBnZW5lcmF0ZWRNYXBwaW5ncztcclxuXHJcbiAgICBxdWlja1NvcnQob3JpZ2luYWxNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyk7XHJcbiAgICB0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncyA9IG9yaWdpbmFsTWFwcGluZ3M7XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBGaW5kIHRoZSBtYXBwaW5nIHRoYXQgYmVzdCBtYXRjaGVzIHRoZSBoeXBvdGhldGljYWwgXCJuZWVkbGVcIiBtYXBwaW5nIHRoYXRcclxuICogd2UgYXJlIHNlYXJjaGluZyBmb3IgaW4gdGhlIGdpdmVuIFwiaGF5c3RhY2tcIiBvZiBtYXBwaW5ncy5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9maW5kTWFwcGluZyA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZmluZE1hcHBpbmcoYU5lZWRsZSwgYU1hcHBpbmdzLCBhTGluZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYUNvbHVtbk5hbWUsIGFDb21wYXJhdG9yLCBhQmlhcykge1xyXG4gICAgLy8gVG8gcmV0dXJuIHRoZSBwb3NpdGlvbiB3ZSBhcmUgc2VhcmNoaW5nIGZvciwgd2UgbXVzdCBmaXJzdCBmaW5kIHRoZVxyXG4gICAgLy8gbWFwcGluZyBmb3IgdGhlIGdpdmVuIHBvc2l0aW9uIGFuZCB0aGVuIHJldHVybiB0aGUgb3Bwb3NpdGUgcG9zaXRpb24gaXRcclxuICAgIC8vIHBvaW50cyB0by4gQmVjYXVzZSB0aGUgbWFwcGluZ3MgYXJlIHNvcnRlZCwgd2UgY2FuIHVzZSBiaW5hcnkgc2VhcmNoIHRvXHJcbiAgICAvLyBmaW5kIHRoZSBiZXN0IG1hcHBpbmcuXHJcblxyXG4gICAgaWYgKGFOZWVkbGVbYUxpbmVOYW1lXSA8PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0xpbmUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMSwgZ290ICdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIGFOZWVkbGVbYUxpbmVOYW1lXSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYU5lZWRsZVthQ29sdW1uTmFtZV0gPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbHVtbiBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLCBnb3QgJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgYU5lZWRsZVthQ29sdW1uTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiaW5hcnlTZWFyY2guc2VhcmNoKGFOZWVkbGUsIGFNYXBwaW5ncywgYUNvbXBhcmF0b3IsIGFCaWFzKTtcclxuICB9O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIGxhc3QgY29sdW1uIGZvciBlYWNoIGdlbmVyYXRlZCBtYXBwaW5nLiBUaGUgbGFzdCBjb2x1bW4gaXNcclxuICogaW5jbHVzaXZlLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29tcHV0ZUNvbHVtblNwYW5zID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9jb21wdXRlQ29sdW1uU3BhbnMoKSB7XHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3MubGVuZ3RoOyArK2luZGV4KSB7XHJcbiAgICAgIHZhciBtYXBwaW5nID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NbaW5kZXhdO1xyXG5cclxuICAgICAgLy8gTWFwcGluZ3MgZG8gbm90IGNvbnRhaW4gYSBmaWVsZCBmb3IgdGhlIGxhc3QgZ2VuZXJhdGVkIGNvbHVtbnQuIFdlXHJcbiAgICAgIC8vIGNhbiBjb21lIHVwIHdpdGggYW4gb3B0aW1pc3RpYyBlc3RpbWF0ZSwgaG93ZXZlciwgYnkgYXNzdW1pbmcgdGhhdFxyXG4gICAgICAvLyBtYXBwaW5ncyBhcmUgY29udGlndW91cyAoaS5lLiBnaXZlbiB0d28gY29uc2VjdXRpdmUgbWFwcGluZ3MsIHRoZVxyXG4gICAgICAvLyBmaXJzdCBtYXBwaW5nIGVuZHMgd2hlcmUgdGhlIHNlY29uZCBvbmUgc3RhcnRzKS5cclxuICAgICAgaWYgKGluZGV4ICsgMSA8IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBuZXh0TWFwcGluZyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzW2luZGV4ICsgMV07XHJcblxyXG4gICAgICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgPT09IG5leHRNYXBwaW5nLmdlbmVyYXRlZExpbmUpIHtcclxuICAgICAgICAgIG1hcHBpbmcubGFzdEdlbmVyYXRlZENvbHVtbiA9IG5leHRNYXBwaW5nLmdlbmVyYXRlZENvbHVtbiAtIDE7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRoZSBsYXN0IG1hcHBpbmcgZm9yIGVhY2ggbGluZSBzcGFucyB0aGUgZW50aXJlIGxpbmUuXHJcbiAgICAgIG1hcHBpbmcubGFzdEdlbmVyYXRlZENvbHVtbiA9IEluZmluaXR5O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlLCBsaW5lLCBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2VuZXJhdGVkXHJcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdFxyXG4gKiB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgY29sdW1uXHJcbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cclxuICogICAtIGJpYXM6IEVpdGhlciAnU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQnIG9yXHJcbiAqICAgICAnU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXHJcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXHJcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cclxuICogICAgIERlZmF1bHRzIHRvICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcuXHJcbiAqXHJcbiAqIGFuZCBhbiBvYmplY3QgaXMgcmV0dXJuZWQgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBzb3VyY2U6IFRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSwgb3IgbnVsbC5cclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqICAgLSBuYW1lOiBUaGUgb3JpZ2luYWwgaWRlbnRpZmllciwgb3IgbnVsbC5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLm9yaWdpbmFsUG9zaXRpb25Gb3IgPVxyXG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX29yaWdpbmFsUG9zaXRpb25Gb3IoYUFyZ3MpIHtcclxuICAgIHZhciBuZWVkbGUgPSB7XHJcbiAgICAgIGdlbmVyYXRlZExpbmU6IHV0aWwuZ2V0QXJnKGFBcmdzLCAnbGluZScpLFxyXG4gICAgICBnZW5lcmF0ZWRDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCAnY29sdW1uJylcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZE1hcHBpbmcoXHJcbiAgICAgIG5lZWRsZSxcclxuICAgICAgdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3MsXHJcbiAgICAgIFwiZ2VuZXJhdGVkTGluZVwiLFxyXG4gICAgICBcImdlbmVyYXRlZENvbHVtblwiLFxyXG4gICAgICB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkLFxyXG4gICAgICB1dGlsLmdldEFyZyhhQXJncywgJ2JpYXMnLCBTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORClcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleF07XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lID09PSBuZWVkbGUuZ2VuZXJhdGVkTGluZSkge1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhtYXBwaW5nLCAnc291cmNlJywgbnVsbCk7XHJcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc291cmNlID0gdGhpcy5fc291cmNlcy5hdChzb3VyY2UpO1xyXG4gICAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKHRoaXMuc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmFtZSA9IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICduYW1lJywgbnVsbCk7XHJcbiAgICAgICAgaWYgKG5hbWUgIT09IG51bGwpIHtcclxuICAgICAgICAgIG5hbWUgPSB0aGlzLl9uYW1lcy5hdChuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgJ29yaWdpbmFsTGluZScsIG51bGwpLFxyXG4gICAgICAgICAgY29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnb3JpZ2luYWxDb2x1bW4nLCBudWxsKSxcclxuICAgICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiBudWxsLFxyXG4gICAgICBsaW5lOiBudWxsLFxyXG4gICAgICBjb2x1bW46IG51bGwsXHJcbiAgICAgIG5hbWU6IG51bGxcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBoYXZlIHRoZSBzb3VyY2UgY29udGVudCBmb3IgZXZlcnkgc291cmNlIGluIHRoZSBzb3VyY2VcclxuICogbWFwLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5oYXNDb250ZW50c09mQWxsU291cmNlcyA9XHJcbiAgZnVuY3Rpb24gQmFzaWNTb3VyY2VNYXBDb25zdW1lcl9oYXNDb250ZW50c09mQWxsU291cmNlcygpIHtcclxuICAgIGlmICghdGhpcy5zb3VyY2VzQ29udGVudCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudC5sZW5ndGggPj0gdGhpcy5fc291cmNlcy5zaXplKCkgJiZcclxuICAgICAgIXRoaXMuc291cmNlc0NvbnRlbnQuc29tZShmdW5jdGlvbiAoc2MpIHsgcmV0dXJuIHNjID09IG51bGw7IH0pO1xyXG4gIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIHRoZSB1cmwgb2YgdGhlXHJcbiAqIG9yaWdpbmFsIHNvdXJjZSBmaWxlLiBSZXR1cm5zIG51bGwgaWYgbm8gb3JpZ2luYWwgc291cmNlIGNvbnRlbnQgaXNcclxuICogYXZhaWxhYmxlLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvciA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfc291cmNlQ29udGVudEZvcihhU291cmNlLCBudWxsT25NaXNzaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuc291cmNlc0NvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZFNvdXJjZUluZGV4KGFTb3VyY2UpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc291cmNlc0NvbnRlbnRbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByZWxhdGl2ZVNvdXJjZSA9IGFTb3VyY2U7XHJcbiAgICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgICAgcmVsYXRpdmVTb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHRoaXMuc291cmNlUm9vdCwgcmVsYXRpdmVTb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB1cmw7XHJcbiAgICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGxcclxuICAgICAgICAmJiAodXJsID0gdXRpbC51cmxQYXJzZSh0aGlzLnNvdXJjZVJvb3QpKSkge1xyXG4gICAgICAvLyBYWFg6IGZpbGU6Ly8gVVJJcyBhbmQgYWJzb2x1dGUgcGF0aHMgbGVhZCB0byB1bmV4cGVjdGVkIGJlaGF2aW9yIGZvclxyXG4gICAgICAvLyBtYW55IHVzZXJzLiBXZSBjYW4gaGVscCB0aGVtIG91dCB3aGVuIHRoZXkgZXhwZWN0IGZpbGU6Ly8gVVJJcyB0b1xyXG4gICAgICAvLyBiZWhhdmUgbGlrZSBpdCB3b3VsZCBpZiB0aGV5IHdlcmUgcnVubmluZyBhIGxvY2FsIEhUVFAgc2VydmVyLiBTZWVcclxuICAgICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODg1NTk3LlxyXG4gICAgICB2YXIgZmlsZVVyaUFic1BhdGggPSByZWxhdGl2ZVNvdXJjZS5yZXBsYWNlKC9eZmlsZTpcXC9cXC8vLCBcIlwiKTtcclxuICAgICAgaWYgKHVybC5zY2hlbWUgPT0gXCJmaWxlXCJcclxuICAgICAgICAgICYmIHRoaXMuX3NvdXJjZXMuaGFzKGZpbGVVcmlBYnNQYXRoKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZXNDb250ZW50W3RoaXMuX3NvdXJjZXMuaW5kZXhPZihmaWxlVXJpQWJzUGF0aCldXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoIXVybC5wYXRoIHx8IHVybC5wYXRoID09IFwiL1wiKVxyXG4gICAgICAgICAgJiYgdGhpcy5fc291cmNlcy5oYXMoXCIvXCIgKyByZWxhdGl2ZVNvdXJjZSkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFt0aGlzLl9zb3VyY2VzLmluZGV4T2YoXCIvXCIgKyByZWxhdGl2ZVNvdXJjZSldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHJlY3Vyc2l2ZWx5IGZyb21cclxuICAgIC8vIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvci4gSW4gdGhhdCBjYXNlLCB3ZVxyXG4gICAgLy8gZG9uJ3Qgd2FudCB0byB0aHJvdyBpZiB3ZSBjYW4ndCBmaW5kIHRoZSBzb3VyY2UgLSB3ZSBqdXN0IHdhbnQgdG9cclxuICAgIC8vIHJldHVybiBudWxsLCBzbyB3ZSBwcm92aWRlIGEgZmxhZyB0byBleGl0IGdyYWNlZnVsbHkuXHJcbiAgICBpZiAobnVsbE9uTWlzc2luZykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIHJlbGF0aXZlU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcclxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXHJcbiAqIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKiAgIC0gYmlhczogRWl0aGVyICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcclxuICogICAgICdTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcclxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcclxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxyXG4gKiAgICAgRGVmYXVsdHMgdG8gJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cclxuICpcclxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXHJcbiAqICAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZ2VuZXJhdGVkUG9zaXRpb25Gb3IgPVxyXG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2dlbmVyYXRlZFBvc2l0aW9uRm9yKGFBcmdzKSB7XHJcbiAgICB2YXIgc291cmNlID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdzb3VyY2UnKTtcclxuICAgIHNvdXJjZSA9IHRoaXMuX2ZpbmRTb3VyY2VJbmRleChzb3VyY2UpO1xyXG4gICAgaWYgKHNvdXJjZSA8IDApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsaW5lOiBudWxsLFxyXG4gICAgICAgIGNvbHVtbjogbnVsbCxcclxuICAgICAgICBsYXN0Q29sdW1uOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5lZWRsZSA9IHtcclxuICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgIG9yaWdpbmFsTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyksXHJcbiAgICAgIG9yaWdpbmFsQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgJ2NvbHVtbicpXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRNYXBwaW5nKFxyXG4gICAgICBuZWVkbGUsXHJcbiAgICAgIHRoaXMuX29yaWdpbmFsTWFwcGluZ3MsXHJcbiAgICAgIFwib3JpZ2luYWxMaW5lXCIsXHJcbiAgICAgIFwib3JpZ2luYWxDb2x1bW5cIixcclxuICAgICAgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyxcclxuICAgICAgdXRpbC5nZXRBcmcoYUFyZ3MsICdiaWFzJywgU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQpXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHZhciBtYXBwaW5nID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1tpbmRleF07XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IG5lZWRsZS5zb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZExpbmUnLCBudWxsKSxcclxuICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZENvbHVtbicsIG51bGwpLFxyXG4gICAgICAgICAgbGFzdENvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ2xhc3RHZW5lcmF0ZWRDb2x1bW4nLCBudWxsKVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsaW5lOiBudWxsLFxyXG4gICAgICBjb2x1bW46IG51bGwsXHJcbiAgICAgIGxhc3RDb2x1bW46IG51bGxcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbmV4cG9ydHMuQmFzaWNTb3VyY2VNYXBDb25zdW1lciA9IEJhc2ljU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogQW4gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyIGluc3RhbmNlIHJlcHJlc2VudHMgYSBwYXJzZWQgc291cmNlIG1hcCB3aGljaFxyXG4gKiB3ZSBjYW4gcXVlcnkgZm9yIGluZm9ybWF0aW9uLiBJdCBkaWZmZXJzIGZyb20gQmFzaWNTb3VyY2VNYXBDb25zdW1lciBpblxyXG4gKiB0aGF0IGl0IHRha2VzIFwiaW5kZXhlZFwiIHNvdXJjZSBtYXBzIChpLmUuIG9uZXMgd2l0aCBhIFwic2VjdGlvbnNcIiBmaWVsZCkgYXNcclxuICogaW5wdXQuXHJcbiAqXHJcbiAqIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgYSByYXcgc291cmNlIG1hcCAoZWl0aGVyIGFzIGEgSlNPTiBzdHJpbmcsIG9yIGFscmVhZHlcclxuICogcGFyc2VkIHRvIGFuIG9iamVjdCkuIEFjY29yZGluZyB0byB0aGUgc3BlYyBmb3IgaW5kZXhlZCBzb3VyY2UgbWFwcywgdGhleVxyXG4gKiBoYXZlIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlczpcclxuICpcclxuICogICAtIHZlcnNpb246IFdoaWNoIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXAgc3BlYyB0aGlzIG1hcCBpcyBmb2xsb3dpbmcuXHJcbiAqICAgLSBmaWxlOiBPcHRpb25hbC4gVGhlIGdlbmVyYXRlZCBmaWxlIHRoaXMgc291cmNlIG1hcCBpcyBhc3NvY2lhdGVkIHdpdGguXHJcbiAqICAgLSBzZWN0aW9uczogQSBsaXN0IG9mIHNlY3Rpb24gZGVmaW5pdGlvbnMuXHJcbiAqXHJcbiAqIEVhY2ggdmFsdWUgdW5kZXIgdGhlIFwic2VjdGlvbnNcIiBmaWVsZCBoYXMgdHdvIGZpZWxkczpcclxuICogICAtIG9mZnNldDogVGhlIG9mZnNldCBpbnRvIHRoZSBvcmlnaW5hbCBzcGVjaWZpZWQgYXQgd2hpY2ggdGhpcyBzZWN0aW9uXHJcbiAqICAgICAgIGJlZ2lucyB0byBhcHBseSwgZGVmaW5lZCBhcyBhbiBvYmplY3Qgd2l0aCBhIFwibGluZVwiIGFuZCBcImNvbHVtblwiXHJcbiAqICAgICAgIGZpZWxkLlxyXG4gKiAgIC0gbWFwOiBBIHNvdXJjZSBtYXAgZGVmaW5pdGlvbi4gVGhpcyBzb3VyY2UgbWFwIGNvdWxkIGFsc28gYmUgaW5kZXhlZCxcclxuICogICAgICAgYnV0IGRvZXNuJ3QgaGF2ZSB0byBiZS5cclxuICpcclxuICogSW5zdGVhZCBvZiB0aGUgXCJtYXBcIiBmaWVsZCwgaXQncyBhbHNvIHBvc3NpYmxlIHRvIGhhdmUgYSBcInVybFwiIGZpZWxkXHJcbiAqIHNwZWNpZnlpbmcgYSBVUkwgdG8gcmV0cmlldmUgYSBzb3VyY2UgbWFwIGZyb20sIGJ1dCB0aGF0J3MgY3VycmVudGx5XHJcbiAqIHVuc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBIZXJlJ3MgYW4gZXhhbXBsZSBzb3VyY2UgbWFwLCB0YWtlbiBmcm9tIHRoZSBzb3VyY2UgbWFwIHNwZWNbMF0sIGJ1dFxyXG4gKiBtb2RpZmllZCB0byBvbWl0IGEgc2VjdGlvbiB3aGljaCB1c2VzIHRoZSBcInVybFwiIGZpZWxkLlxyXG4gKlxyXG4gKiAge1xyXG4gKiAgICB2ZXJzaW9uIDogMyxcclxuICogICAgZmlsZTogXCJhcHAuanNcIixcclxuICogICAgc2VjdGlvbnM6IFt7XHJcbiAqICAgICAgb2Zmc2V0OiB7bGluZToxMDAsIGNvbHVtbjoxMH0sXHJcbiAqICAgICAgbWFwOiB7XHJcbiAqICAgICAgICB2ZXJzaW9uIDogMyxcclxuICogICAgICAgIGZpbGU6IFwic2VjdGlvbi5qc1wiLFxyXG4gKiAgICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxyXG4gKiAgICAgICAgbmFtZXM6IFtcInNyY1wiLCBcIm1hcHNcIiwgXCJhcmVcIiwgXCJmdW5cIl0sXHJcbiAqICAgICAgICBtYXBwaW5nczogXCJBQUFBLEU7O0FCQ0RFO1wiXHJcbiAqICAgICAgfVxyXG4gKiAgICB9XSxcclxuICogIH1cclxuICpcclxuICogVGhlIHNlY29uZCBwYXJhbWV0ZXIsIGlmIGdpdmVuLCBpcyBhIHN0cmluZyB3aG9zZSB2YWx1ZSBpcyB0aGUgVVJMXHJcbiAqIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIHdhcyBmb3VuZC4gIFRoaXMgVVJMIGlzIHVzZWQgdG8gY29tcHV0ZSB0aGVcclxuICogc291cmNlcyBhcnJheS5cclxuICpcclxuICogWzBdOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzFVMVJHQWVoUXdSeXBVVG92RjFLUmxwaU9GemUwYi1fMmdjNmZBSDBLWTBrL2VkaXQjaGVhZGluZz1oLjUzNWVzM3hlcHJndFxyXG4gKi9cclxuZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcclxuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XHJcbiAgfVxyXG5cclxuICB2YXIgdmVyc2lvbiA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3ZlcnNpb24nKTtcclxuICB2YXIgc2VjdGlvbnMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdzZWN0aW9ucycpO1xyXG5cclxuICBpZiAodmVyc2lvbiAhPSB0aGlzLl92ZXJzaW9uKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHZlcnNpb246ICcgKyB2ZXJzaW9uKTtcclxuICB9XHJcblxyXG4gIHRoaXMuX3NvdXJjZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuICB0aGlzLl9uYW1lcyA9IG5ldyBBcnJheVNldCgpO1xyXG5cclxuICB2YXIgbGFzdE9mZnNldCA9IHtcclxuICAgIGxpbmU6IC0xLFxyXG4gICAgY29sdW1uOiAwXHJcbiAgfTtcclxuICB0aGlzLl9zZWN0aW9ucyA9IHNlY3Rpb25zLm1hcChmdW5jdGlvbiAocykge1xyXG4gICAgaWYgKHMudXJsKSB7XHJcbiAgICAgIC8vIFRoZSB1cmwgZmllbGQgd2lsbCByZXF1aXJlIHN1cHBvcnQgZm9yIGFzeW5jaHJvbmljaXR5LlxyXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9pc3N1ZXMvMTZcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdXBwb3J0IGZvciB1cmwgZmllbGQgaW4gc2VjdGlvbnMgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgfVxyXG4gICAgdmFyIG9mZnNldCA9IHV0aWwuZ2V0QXJnKHMsICdvZmZzZXQnKTtcclxuICAgIHZhciBvZmZzZXRMaW5lID0gdXRpbC5nZXRBcmcob2Zmc2V0LCAnbGluZScpO1xyXG4gICAgdmFyIG9mZnNldENvbHVtbiA9IHV0aWwuZ2V0QXJnKG9mZnNldCwgJ2NvbHVtbicpO1xyXG5cclxuICAgIGlmIChvZmZzZXRMaW5lIDwgbGFzdE9mZnNldC5saW5lIHx8XHJcbiAgICAgICAgKG9mZnNldExpbmUgPT09IGxhc3RPZmZzZXQubGluZSAmJiBvZmZzZXRDb2x1bW4gPCBsYXN0T2Zmc2V0LmNvbHVtbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWN0aW9uIG9mZnNldHMgbXVzdCBiZSBvcmRlcmVkIGFuZCBub24tb3ZlcmxhcHBpbmcuJyk7XHJcbiAgICB9XHJcbiAgICBsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdlbmVyYXRlZE9mZnNldDoge1xyXG4gICAgICAgIC8vIFRoZSBvZmZzZXQgZmllbGRzIGFyZSAwLWJhc2VkLCBidXQgd2UgdXNlIDEtYmFzZWQgaW5kaWNlcyB3aGVuXHJcbiAgICAgICAgLy8gZW5jb2RpbmcvZGVjb2RpbmcgZnJvbSBWTFEuXHJcbiAgICAgICAgZ2VuZXJhdGVkTGluZTogb2Zmc2V0TGluZSArIDEsXHJcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBvZmZzZXRDb2x1bW4gKyAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbnN1bWVyOiBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5nZXRBcmcocywgJ21hcCcpLCBhU291cmNlTWFwVVJMKVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogVGhlIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXBwaW5nIHNwZWMgdGhhdCB3ZSBhcmUgY29uc3VtaW5nLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vKipcclxuICogVGhlIGxpc3Qgb2Ygb3JpZ2luYWwgc291cmNlcy5cclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCAnc291cmNlcycsIHtcclxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzb3VyY2VzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fc2VjdGlvbnNbaV0uY29uc3VtZXIuc291cmNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHNvdXJjZXMucHVzaCh0aGlzLl9zZWN0aW9uc1tpXS5jb25zdW1lci5zb3VyY2VzW2pdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvdXJjZXM7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UsIGxpbmUsIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBnZW5lcmF0ZWRcclxuICogc291cmNlJ3MgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucyBwcm92aWRlZC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0XHJcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyXHJcbiAqICAgICBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKlxyXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUsIG9yIG51bGwuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKiAgIC0gbmFtZTogVGhlIG9yaWdpbmFsIGlkZW50aWZpZXIsIG9yIG51bGwuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLm9yaWdpbmFsUG9zaXRpb25Gb3IgPVxyXG4gIGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9vcmlnaW5hbFBvc2l0aW9uRm9yKGFBcmdzKSB7XHJcbiAgICB2YXIgbmVlZGxlID0ge1xyXG4gICAgICBnZW5lcmF0ZWRMaW5lOiB1dGlsLmdldEFyZyhhQXJncywgJ2xpbmUnKSxcclxuICAgICAgZ2VuZXJhdGVkQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgJ2NvbHVtbicpXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIHNlY3Rpb24gY29udGFpbmluZyB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9uIHdlJ3JlIHRyeWluZyB0byBtYXBcclxuICAgIC8vIHRvIGFuIG9yaWdpbmFsIHBvc2l0aW9uLlxyXG4gICAgdmFyIHNlY3Rpb25JbmRleCA9IGJpbmFyeVNlYXJjaC5zZWFyY2gobmVlZGxlLCB0aGlzLl9zZWN0aW9ucyxcclxuICAgICAgZnVuY3Rpb24obmVlZGxlLCBzZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNtcCA9IG5lZWRsZS5nZW5lcmF0ZWRMaW5lIC0gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZTtcclxuICAgICAgICBpZiAoY21wKSB7XHJcbiAgICAgICAgICByZXR1cm4gY21wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChuZWVkbGUuZ2VuZXJhdGVkQ29sdW1uIC1cclxuICAgICAgICAgICAgICAgIHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbik7XHJcbiAgICAgIH0pO1xyXG4gICAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tzZWN0aW9uSW5kZXhdO1xyXG5cclxuICAgIGlmICghc2VjdGlvbikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvdXJjZTogbnVsbCxcclxuICAgICAgICBsaW5lOiBudWxsLFxyXG4gICAgICAgIGNvbHVtbjogbnVsbCxcclxuICAgICAgICBuYW1lOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlY3Rpb24uY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICAgIGxpbmU6IG5lZWRsZS5nZW5lcmF0ZWRMaW5lIC1cclxuICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxyXG4gICAgICBjb2x1bW46IG5lZWRsZS5nZW5lcmF0ZWRDb2x1bW4gLVxyXG4gICAgICAgIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lID09PSBuZWVkbGUuZ2VuZXJhdGVkTGluZVxyXG4gICAgICAgICA/IHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbiAtIDFcclxuICAgICAgICAgOiAwKSxcclxuICAgICAgYmlhczogYUFyZ3MuYmlhc1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBoYXZlIHRoZSBzb3VyY2UgY29udGVudCBmb3IgZXZlcnkgc291cmNlIGluIHRoZSBzb3VyY2VcclxuICogbWFwLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzID1cclxuICBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VjdGlvbnMuZXZlcnkoZnVuY3Rpb24gKHMpIHtcclxuICAgICAgcmV0dXJuIHMuY29uc3VtZXIuaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIHRoZSB1cmwgb2YgdGhlXHJcbiAqIG9yaWdpbmFsIHNvdXJjZSBmaWxlLiBSZXR1cm5zIG51bGwgaWYgbm8gb3JpZ2luYWwgc291cmNlIGNvbnRlbnQgaXNcclxuICogYXZhaWxhYmxlLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5zb3VyY2VDb250ZW50Rm9yID1cclxuICBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfc291cmNlQ29udGVudEZvcihhU291cmNlLCBudWxsT25NaXNzaW5nKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbaV07XHJcblxyXG4gICAgICB2YXIgY29udGVudCA9IHNlY3Rpb24uY29uc3VtZXIuc291cmNlQ29udGVudEZvcihhU291cmNlLCB0cnVlKTtcclxuICAgICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG51bGxPbk1pc3NpbmcpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcclxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXHJcbiAqIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKlxyXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLiAgVGhlXHJcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLiBcclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXHJcbiAqICAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5nZW5lcmF0ZWRQb3NpdGlvbkZvciA9XHJcbiAgZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX2dlbmVyYXRlZFBvc2l0aW9uRm9yKGFBcmdzKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbaV07XHJcblxyXG4gICAgICAvLyBPbmx5IGNvbnNpZGVyIHRoaXMgc2VjdGlvbiBpZiB0aGUgcmVxdWVzdGVkIHNvdXJjZSBpcyBpbiB0aGUgbGlzdCBvZlxyXG4gICAgICAvLyBzb3VyY2VzIG9mIHRoZSBjb25zdW1lci5cclxuICAgICAgaWYgKHNlY3Rpb24uY29uc3VtZXIuX2ZpbmRTb3VyY2VJbmRleCh1dGlsLmdldEFyZyhhQXJncywgJ3NvdXJjZScpKSA9PT0gLTEpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgZ2VuZXJhdGVkUG9zaXRpb24gPSBzZWN0aW9uLmNvbnN1bWVyLmdlbmVyYXRlZFBvc2l0aW9uRm9yKGFBcmdzKTtcclxuICAgICAgaWYgKGdlbmVyYXRlZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHJldCA9IHtcclxuICAgICAgICAgIGxpbmU6IGdlbmVyYXRlZFBvc2l0aW9uLmxpbmUgK1xyXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxyXG4gICAgICAgICAgY29sdW1uOiBnZW5lcmF0ZWRQb3NpdGlvbi5jb2x1bW4gK1xyXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSA9PT0gZ2VuZXJhdGVkUG9zaXRpb24ubGluZVxyXG4gICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXHJcbiAgICAgICAgICAgICA6IDApXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGluZTogbnVsbCxcclxuICAgICAgY29sdW1uOiBudWxsXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4vKipcclxuICogUGFyc2UgdGhlIG1hcHBpbmdzIGluIGEgc3RyaW5nIGluIHRvIGEgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggd2UgY2FuIGVhc2lseVxyXG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcclxuICogYHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzYCBwcm9wZXJ0aWVzKS5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPVxyXG4gIGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9wYXJzZU1hcHBpbmdzKGFTdHIsIGFTb3VyY2VSb290KSB7XHJcbiAgICB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBbXTtcclxuICAgIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbaV07XHJcbiAgICAgIHZhciBzZWN0aW9uTWFwcGluZ3MgPSBzZWN0aW9uLmNvbnN1bWVyLl9nZW5lcmF0ZWRNYXBwaW5ncztcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWN0aW9uTWFwcGluZ3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICB2YXIgbWFwcGluZyA9IHNlY3Rpb25NYXBwaW5nc1tqXTtcclxuXHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNlY3Rpb24uY29uc3VtZXIuX3NvdXJjZXMuYXQobWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIHNvdXJjZSA9IHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzZWN0aW9uLmNvbnN1bWVyLnNvdXJjZVJvb3QsIHNvdXJjZSwgdGhpcy5fc291cmNlTWFwVVJMKTtcclxuICAgICAgICB0aGlzLl9zb3VyY2VzLmFkZChzb3VyY2UpO1xyXG4gICAgICAgIHNvdXJjZSA9IHRoaXMuX3NvdXJjZXMuaW5kZXhPZihzb3VyY2UpO1xyXG5cclxuICAgICAgICB2YXIgbmFtZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1hcHBpbmcubmFtZSkge1xyXG4gICAgICAgICAgbmFtZSA9IHNlY3Rpb24uY29uc3VtZXIuX25hbWVzLmF0KG1hcHBpbmcubmFtZSk7XHJcbiAgICAgICAgICB0aGlzLl9uYW1lcy5hZGQobmFtZSk7XHJcbiAgICAgICAgICBuYW1lID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBtYXBwaW5ncyBjb21pbmcgZnJvbSB0aGUgY29uc3VtZXIgZm9yIHRoZSBzZWN0aW9uIGhhdmVcclxuICAgICAgICAvLyBnZW5lcmF0ZWQgcG9zaXRpb25zIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgc2VjdGlvbiwgc28gd2VcclxuICAgICAgICAvLyBuZWVkIHRvIG9mZnNldCB0aGVtIHRvIGJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgY29uY2F0ZW5hdGVkXHJcbiAgICAgICAgLy8gZ2VuZXJhdGVkIGZpbGUuXHJcbiAgICAgICAgdmFyIGFkanVzdGVkTWFwcGluZyA9IHtcclxuICAgICAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICAgICAgZ2VuZXJhdGVkTGluZTogbWFwcGluZy5nZW5lcmF0ZWRMaW5lICtcclxuICAgICAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgLSAxKSxcclxuICAgICAgICAgIGdlbmVyYXRlZENvbHVtbjogbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gK1xyXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSA9PT0gbWFwcGluZy5nZW5lcmF0ZWRMaW5lXHJcbiAgICAgICAgICAgID8gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkQ29sdW1uIC0gMVxyXG4gICAgICAgICAgICA6IDApLFxyXG4gICAgICAgICAgb3JpZ2luYWxMaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICAgIG9yaWdpbmFsQ29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uLFxyXG4gICAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhZGp1c3RlZE1hcHBpbmcub3JpZ2luYWxMaW5lID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3MucHVzaChhZGp1c3RlZE1hcHBpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHF1aWNrU29ydCh0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQpO1xyXG4gICAgcXVpY2tTb3J0KHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zKTtcclxuICB9O1xyXG5cclxuZXhwb3J0cy5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIgPSBJbmRleGVkU291cmNlTWFwQ29uc3VtZXI7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgYmFzZTY0VkxRID0gcmVxdWlyZSgnLi9iYXNlNjQtdmxxJyk7XHJcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XHJcbnZhciBBcnJheVNldCA9IHJlcXVpcmUoJy4vYXJyYXktc2V0JykuQXJyYXlTZXQ7XHJcbnZhciBNYXBwaW5nTGlzdCA9IHJlcXVpcmUoJy4vbWFwcGluZy1saXN0JykuTWFwcGluZ0xpc3Q7XHJcblxyXG4vKipcclxuICogQW4gaW5zdGFuY2Ugb2YgdGhlIFNvdXJjZU1hcEdlbmVyYXRvciByZXByZXNlbnRzIGEgc291cmNlIG1hcCB3aGljaCBpc1xyXG4gKiBiZWluZyBidWlsdCBpbmNyZW1lbnRhbGx5LiBZb3UgbWF5IHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZ1xyXG4gKiBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gZmlsZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBnZW5lcmF0ZWQgc291cmNlLlxyXG4gKiAgIC0gc291cmNlUm9vdDogQSByb290IGZvciBhbGwgcmVsYXRpdmUgVVJMcyBpbiB0aGlzIHNvdXJjZSBtYXAuXHJcbiAqL1xyXG5mdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3IoYUFyZ3MpIHtcclxuICBpZiAoIWFBcmdzKSB7XHJcbiAgICBhQXJncyA9IHt9O1xyXG4gIH1cclxuICB0aGlzLl9maWxlID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdmaWxlJywgbnVsbCk7XHJcbiAgdGhpcy5fc291cmNlUm9vdCA9IHV0aWwuZ2V0QXJnKGFBcmdzLCAnc291cmNlUm9vdCcsIG51bGwpO1xyXG4gIHRoaXMuX3NraXBWYWxpZGF0aW9uID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdza2lwVmFsaWRhdGlvbicsIGZhbHNlKTtcclxuICB0aGlzLl9zb3VyY2VzID0gbmV3IEFycmF5U2V0KCk7XHJcbiAgdGhpcy5fbmFtZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuICB0aGlzLl9tYXBwaW5ncyA9IG5ldyBNYXBwaW5nTGlzdCgpO1xyXG4gIHRoaXMuX3NvdXJjZXNDb250ZW50cyA9IG51bGw7XHJcbn1cclxuXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgU291cmNlTWFwR2VuZXJhdG9yIGJhc2VkIG9uIGEgU291cmNlTWFwQ29uc3VtZXJcclxuICpcclxuICogQHBhcmFtIGFTb3VyY2VNYXBDb25zdW1lciBUaGUgU291cmNlTWFwLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLmZyb21Tb3VyY2VNYXAgPVxyXG4gIGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9mcm9tU291cmNlTWFwKGFTb3VyY2VNYXBDb25zdW1lcikge1xyXG4gICAgdmFyIHNvdXJjZVJvb3QgPSBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlUm9vdDtcclxuICAgIHZhciBnZW5lcmF0b3IgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgICAgZmlsZTogYVNvdXJjZU1hcENvbnN1bWVyLmZpbGUsXHJcbiAgICAgIHNvdXJjZVJvb3Q6IHNvdXJjZVJvb3RcclxuICAgIH0pO1xyXG4gICAgYVNvdXJjZU1hcENvbnN1bWVyLmVhY2hNYXBwaW5nKGZ1bmN0aW9uIChtYXBwaW5nKSB7XHJcbiAgICAgIHZhciBuZXdNYXBwaW5nID0ge1xyXG4gICAgICAgIGdlbmVyYXRlZDoge1xyXG4gICAgICAgICAgbGluZTogbWFwcGluZy5nZW5lcmF0ZWRMaW5lLFxyXG4gICAgICAgICAgY29sdW1uOiBtYXBwaW5nLmdlbmVyYXRlZENvbHVtblxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChtYXBwaW5nLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgbmV3TWFwcGluZy5zb3VyY2UgPSBtYXBwaW5nLnNvdXJjZTtcclxuICAgICAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBuZXdNYXBwaW5nLnNvdXJjZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgbmV3TWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3TWFwcGluZy5vcmlnaW5hbCA9IHtcclxuICAgICAgICAgIGxpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxyXG4gICAgICAgICAgY29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG1hcHBpbmcubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICBuZXdNYXBwaW5nLm5hbWUgPSBtYXBwaW5nLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZW5lcmF0b3IuYWRkTWFwcGluZyhuZXdNYXBwaW5nKTtcclxuICAgIH0pO1xyXG4gICAgYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlRmlsZSkge1xyXG4gICAgICB2YXIgc291cmNlUmVsYXRpdmUgPSBzb3VyY2VGaWxlO1xyXG4gICAgICBpZiAoc291cmNlUm9vdCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZVJlbGF0aXZlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2VGaWxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFnZW5lcmF0b3IuX3NvdXJjZXMuaGFzKHNvdXJjZVJlbGF0aXZlKSkge1xyXG4gICAgICAgIGdlbmVyYXRvci5fc291cmNlcy5hZGQoc291cmNlUmVsYXRpdmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgY29udGVudCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xyXG4gICAgICBpZiAoY29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgZ2VuZXJhdG9yLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgY29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcclxuICB9O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIHNpbmdsZSBtYXBwaW5nIGZyb20gb3JpZ2luYWwgc291cmNlIGxpbmUgYW5kIGNvbHVtbiB0byB0aGUgZ2VuZXJhdGVkXHJcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBmb3IgdGhpcyBzb3VyY2UgbWFwIGJlaW5nIGNyZWF0ZWQuIFRoZSBtYXBwaW5nXHJcbiAqIG9iamVjdCBzaG91bGQgaGF2ZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBnZW5lcmF0ZWQ6IEFuIG9iamVjdCB3aXRoIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucy5cclxuICogICAtIG9yaWdpbmFsOiBBbiBvYmplY3Qgd2l0aCB0aGUgb3JpZ2luYWwgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucy5cclxuICogICAtIHNvdXJjZTogVGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlIChyZWxhdGl2ZSB0byB0aGUgc291cmNlUm9vdCkuXHJcbiAqICAgLSBuYW1lOiBBbiBvcHRpb25hbCBvcmlnaW5hbCB0b2tlbiBuYW1lIGZvciB0aGlzIG1hcHBpbmcuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFkZE1hcHBpbmcgPVxyXG4gIGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9hZGRNYXBwaW5nKGFBcmdzKSB7XHJcbiAgICB2YXIgZ2VuZXJhdGVkID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdnZW5lcmF0ZWQnKTtcclxuICAgIHZhciBvcmlnaW5hbCA9IHV0aWwuZ2V0QXJnKGFBcmdzLCAnb3JpZ2luYWwnLCBudWxsKTtcclxuICAgIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhhQXJncywgJ3NvdXJjZScsIG51bGwpO1xyXG4gICAgdmFyIG5hbWUgPSB1dGlsLmdldEFyZyhhQXJncywgJ25hbWUnLCBudWxsKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX3NraXBWYWxpZGF0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3ZhbGlkYXRlTWFwcGluZyhnZW5lcmF0ZWQsIG9yaWdpbmFsLCBzb3VyY2UsIG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICBzb3VyY2UgPSBTdHJpbmcoc291cmNlKTtcclxuICAgICAgaWYgKCF0aGlzLl9zb3VyY2VzLmhhcyhzb3VyY2UpKSB7XHJcbiAgICAgICAgdGhpcy5fc291cmNlcy5hZGQoc291cmNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYW1lICE9IG51bGwpIHtcclxuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcclxuICAgICAgaWYgKCF0aGlzLl9uYW1lcy5oYXMobmFtZSkpIHtcclxuICAgICAgICB0aGlzLl9uYW1lcy5hZGQobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9tYXBwaW5ncy5hZGQoe1xyXG4gICAgICBnZW5lcmF0ZWRMaW5lOiBnZW5lcmF0ZWQubGluZSxcclxuICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBnZW5lcmF0ZWQuY29sdW1uLFxyXG4gICAgICBvcmlnaW5hbExpbmU6IG9yaWdpbmFsICE9IG51bGwgJiYgb3JpZ2luYWwubGluZSxcclxuICAgICAgb3JpZ2luYWxDb2x1bW46IG9yaWdpbmFsICE9IG51bGwgJiYgb3JpZ2luYWwuY29sdW1uLFxyXG4gICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgbmFtZTogbmFtZVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHNvdXJjZSBjb250ZW50IGZvciBhIHNvdXJjZSBmaWxlLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5zZXRTb3VyY2VDb250ZW50ID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3Jfc2V0U291cmNlQ29udGVudChhU291cmNlRmlsZSwgYVNvdXJjZUNvbnRlbnQpIHtcclxuICAgIHZhciBzb3VyY2UgPSBhU291cmNlRmlsZTtcclxuICAgIGlmICh0aGlzLl9zb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgICAgc291cmNlID0gdXRpbC5yZWxhdGl2ZSh0aGlzLl9zb3VyY2VSb290LCBzb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhU291cmNlQ29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgIC8vIEFkZCB0aGUgc291cmNlIGNvbnRlbnQgdG8gdGhlIF9zb3VyY2VzQ29udGVudHMgbWFwLlxyXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgX3NvdXJjZXNDb250ZW50cyBtYXAgaWYgdGhlIHByb3BlcnR5IGlzIG51bGwuXHJcbiAgICAgIGlmICghdGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XHJcbiAgICAgICAgdGhpcy5fc291cmNlc0NvbnRlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9zb3VyY2VzQ29udGVudHNbdXRpbC50b1NldFN0cmluZyhzb3VyY2UpXSA9IGFTb3VyY2VDb250ZW50O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBzb3VyY2UgZmlsZSBmcm9tIHRoZSBfc291cmNlc0NvbnRlbnRzIG1hcC5cclxuICAgICAgLy8gSWYgdGhlIF9zb3VyY2VzQ29udGVudHMgbWFwIGlzIGVtcHR5LCBzZXQgdGhlIHByb3BlcnR5IHRvIG51bGwuXHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9zb3VyY2VzQ29udGVudHNbdXRpbC50b1NldFN0cmluZyhzb3VyY2UpXTtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX3NvdXJjZXNDb250ZW50cykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fc291cmNlc0NvbnRlbnRzID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4vKipcclxuICogQXBwbGllcyB0aGUgbWFwcGluZ3Mgb2YgYSBzdWItc291cmNlLW1hcCBmb3IgYSBzcGVjaWZpYyBzb3VyY2UgZmlsZSB0byB0aGVcclxuICogc291cmNlIG1hcCBiZWluZyBnZW5lcmF0ZWQuIEVhY2ggbWFwcGluZyB0byB0aGUgc3VwcGxpZWQgc291cmNlIGZpbGUgaXNcclxuICogcmV3cml0dGVuIHVzaW5nIHRoZSBzdXBwbGllZCBzb3VyY2UgbWFwLiBOb3RlOiBUaGUgcmVzb2x1dGlvbiBmb3IgdGhlXHJcbiAqIHJlc3VsdGluZyBtYXBwaW5ncyBpcyB0aGUgbWluaW1pdW0gb2YgdGhpcyBtYXAgYW5kIHRoZSBzdXBwbGllZCBtYXAuXHJcbiAqXHJcbiAqIEBwYXJhbSBhU291cmNlTWFwQ29uc3VtZXIgVGhlIHNvdXJjZSBtYXAgdG8gYmUgYXBwbGllZC5cclxuICogQHBhcmFtIGFTb3VyY2VGaWxlIE9wdGlvbmFsLiBUaGUgZmlsZW5hbWUgb2YgdGhlIHNvdXJjZSBmaWxlLlxyXG4gKiAgICAgICAgSWYgb21pdHRlZCwgU291cmNlTWFwQ29uc3VtZXIncyBmaWxlIHByb3BlcnR5IHdpbGwgYmUgdXNlZC5cclxuICogQHBhcmFtIGFTb3VyY2VNYXBQYXRoIE9wdGlvbmFsLiBUaGUgZGlybmFtZSBvZiB0aGUgcGF0aCB0byB0aGUgc291cmNlIG1hcFxyXG4gKiAgICAgICAgdG8gYmUgYXBwbGllZC4gSWYgcmVsYXRpdmUsIGl0IGlzIHJlbGF0aXZlIHRvIHRoZSBTb3VyY2VNYXBDb25zdW1lci5cclxuICogICAgICAgIFRoaXMgcGFyYW1ldGVyIGlzIG5lZWRlZCB3aGVuIHRoZSB0d28gc291cmNlIG1hcHMgYXJlbid0IGluIHRoZSBzYW1lXHJcbiAqICAgICAgICBkaXJlY3RvcnksIGFuZCB0aGUgc291cmNlIG1hcCB0byBiZSBhcHBsaWVkIGNvbnRhaW5zIHJlbGF0aXZlIHNvdXJjZVxyXG4gKiAgICAgICAgcGF0aHMuIElmIHNvLCB0aG9zZSByZWxhdGl2ZSBzb3VyY2UgcGF0aHMgbmVlZCB0byBiZSByZXdyaXR0ZW5cclxuICogICAgICAgIHJlbGF0aXZlIHRvIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFwcGx5U291cmNlTWFwID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfYXBwbHlTb3VyY2VNYXAoYVNvdXJjZU1hcENvbnN1bWVyLCBhU291cmNlRmlsZSwgYVNvdXJjZU1hcFBhdGgpIHtcclxuICAgIHZhciBzb3VyY2VGaWxlID0gYVNvdXJjZUZpbGU7XHJcbiAgICAvLyBJZiBhU291cmNlRmlsZSBpcyBvbWl0dGVkLCB3ZSB3aWxsIHVzZSB0aGUgZmlsZSBwcm9wZXJ0eSBvZiB0aGUgU291cmNlTWFwXHJcbiAgICBpZiAoYVNvdXJjZUZpbGUgPT0gbnVsbCkge1xyXG4gICAgICBpZiAoYVNvdXJjZU1hcENvbnN1bWVyLmZpbGUgPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdTb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFwcGx5U291cmNlTWFwIHJlcXVpcmVzIGVpdGhlciBhbiBleHBsaWNpdCBzb3VyY2UgZmlsZSwgJyArXHJcbiAgICAgICAgICAnb3IgdGhlIHNvdXJjZSBtYXBcXCdzIFwiZmlsZVwiIHByb3BlcnR5LiBCb3RoIHdlcmUgb21pdHRlZC4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VGaWxlID0gYVNvdXJjZU1hcENvbnN1bWVyLmZpbGU7XHJcbiAgICB9XHJcbiAgICB2YXIgc291cmNlUm9vdCA9IHRoaXMuX3NvdXJjZVJvb3Q7XHJcbiAgICAvLyBNYWtlIFwic291cmNlRmlsZVwiIHJlbGF0aXZlIGlmIGFuIGFic29sdXRlIFVybCBpcyBwYXNzZWQuXHJcbiAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgIHNvdXJjZUZpbGUgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZUZpbGUpO1xyXG4gICAgfVxyXG4gICAgLy8gQXBwbHlpbmcgdGhlIFNvdXJjZU1hcCBjYW4gYWRkIGFuZCByZW1vdmUgaXRlbXMgZnJvbSB0aGUgc291cmNlcyBhbmRcclxuICAgIC8vIHRoZSBuYW1lcyBhcnJheS5cclxuICAgIHZhciBuZXdTb3VyY2VzID0gdGhpcy5fbWFwcGluZ3MudG9BcnJheSgpLmxlbmd0aCA+IDBcclxuICAgICAgPyBuZXcgQXJyYXlTZXQoKVxyXG4gICAgICA6IHRoaXMuX3NvdXJjZXM7XHJcbiAgICB2YXIgbmV3TmFtZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuXHJcbiAgICAvLyBGaW5kIG1hcHBpbmdzIGZvciB0aGUgXCJzb3VyY2VGaWxlXCJcclxuICAgIHRoaXMuX21hcHBpbmdzLnVuc29ydGVkRm9yRWFjaChmdW5jdGlvbiAobWFwcGluZykge1xyXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgPT09IHNvdXJjZUZpbGUgJiYgbWFwcGluZy5vcmlnaW5hbExpbmUgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGNhbiBiZSBtYXBwZWQgYnkgdGhlIHNvdXJjZSBtYXAsIHRoZW4gdXBkYXRlIHRoZSBtYXBwaW5nLlxyXG4gICAgICAgIHZhciBvcmlnaW5hbCA9IGFTb3VyY2VNYXBDb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgICAgICAgIGxpbmU6IG1hcHBpbmcub3JpZ2luYWxMaW5lLFxyXG4gICAgICAgICAgY29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAvLyBDb3B5IG1hcHBpbmdcclxuICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gb3JpZ2luYWwuc291cmNlO1xyXG4gICAgICAgICAgaWYgKGFTb3VyY2VNYXBQYXRoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB1dGlsLmpvaW4oYVNvdXJjZU1hcFBhdGgsIG1hcHBpbmcuc291cmNlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgbWFwcGluZy5zb3VyY2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgPSBvcmlnaW5hbC5saW5lO1xyXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9IG9yaWdpbmFsLmNvbHVtbjtcclxuICAgICAgICAgIGlmIChvcmlnaW5hbC5uYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbWFwcGluZy5uYW1lID0gb3JpZ2luYWwubmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzb3VyY2UgPSBtYXBwaW5nLnNvdXJjZTtcclxuICAgICAgaWYgKHNvdXJjZSAhPSBudWxsICYmICFuZXdTb3VyY2VzLmhhcyhzb3VyY2UpKSB7XHJcbiAgICAgICAgbmV3U291cmNlcy5hZGQoc291cmNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG5hbWUgPSBtYXBwaW5nLm5hbWU7XHJcbiAgICAgIGlmIChuYW1lICE9IG51bGwgJiYgIW5ld05hbWVzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgIG5ld05hbWVzLmFkZChuYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0sIHRoaXMpO1xyXG4gICAgdGhpcy5fc291cmNlcyA9IG5ld1NvdXJjZXM7XHJcbiAgICB0aGlzLl9uYW1lcyA9IG5ld05hbWVzO1xyXG5cclxuICAgIC8vIENvcHkgc291cmNlc0NvbnRlbnRzIG9mIGFwcGxpZWQgbWFwLlxyXG4gICAgYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlRmlsZSkge1xyXG4gICAgICB2YXIgY29udGVudCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xyXG4gICAgICBpZiAoY29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKGFTb3VyY2VNYXBQYXRoICE9IG51bGwpIHtcclxuICAgICAgICAgIHNvdXJjZUZpbGUgPSB1dGlsLmpvaW4oYVNvdXJjZU1hcFBhdGgsIHNvdXJjZUZpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBzb3VyY2VGaWxlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2VGaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTb3VyY2VDb250ZW50KHNvdXJjZUZpbGUsIGNvbnRlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICB9O1xyXG5cclxuLyoqXHJcbiAqIEEgbWFwcGluZyBjYW4gaGF2ZSBvbmUgb2YgdGhlIHRocmVlIGxldmVscyBvZiBkYXRhOlxyXG4gKlxyXG4gKiAgIDEuIEp1c3QgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbi5cclxuICogICAyLiBUaGUgR2VuZXJhdGVkIHBvc2l0aW9uLCBvcmlnaW5hbCBwb3NpdGlvbiwgYW5kIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAzLiBHZW5lcmF0ZWQgYW5kIG9yaWdpbmFsIHBvc2l0aW9uLCBvcmlnaW5hbCBzb3VyY2UsIGFzIHdlbGwgYXMgYSBuYW1lXHJcbiAqICAgICAgdG9rZW4uXHJcbiAqXHJcbiAqIFRvIG1haW50YWluIGNvbnNpc3RlbmN5LCB3ZSB2YWxpZGF0ZSB0aGF0IGFueSBuZXcgbWFwcGluZyBiZWluZyBhZGRlZCBmYWxsc1xyXG4gKiBpbiB0byBvbmUgb2YgdGhlc2UgY2F0ZWdvcmllcy5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlTWFwcGluZyA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3ZhbGlkYXRlTWFwcGluZyhhR2VuZXJhdGVkLCBhT3JpZ2luYWwsIGFTb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTmFtZSkge1xyXG4gICAgLy8gV2hlbiBhT3JpZ2luYWwgaXMgdHJ1dGh5IGJ1dCBoYXMgZW1wdHkgdmFsdWVzIGZvciAubGluZSBhbmQgLmNvbHVtbixcclxuICAgIC8vIGl0IGlzIG1vc3QgbGlrZWx5IGEgcHJvZ3JhbW1lciBlcnJvci4gSW4gdGhpcyBjYXNlIHdlIHRocm93IGEgdmVyeVxyXG4gICAgLy8gc3BlY2lmaWMgZXJyb3IgbWVzc2FnZSB0byB0cnkgdG8gZ3VpZGUgdGhlbSB0aGUgcmlnaHQgd2F5LlxyXG4gICAgLy8gRm9yIGV4YW1wbGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Qb2x5bWVyL3BvbHltZXItYnVuZGxlci9wdWxsLzUxOVxyXG4gICAgaWYgKGFPcmlnaW5hbCAmJiB0eXBlb2YgYU9yaWdpbmFsLmxpbmUgIT09ICdudW1iZXInICYmIHR5cGVvZiBhT3JpZ2luYWwuY29sdW1uICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgJ29yaWdpbmFsLmxpbmUgYW5kIG9yaWdpbmFsLmNvbHVtbiBhcmUgbm90IG51bWJlcnMgLS0geW91IHByb2JhYmx5IG1lYW50IHRvIG9taXQgJyArXHJcbiAgICAgICAgICAgICd0aGUgb3JpZ2luYWwgbWFwcGluZyBlbnRpcmVseSBhbmQgb25seSBtYXAgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbi4gSWYgc28sIHBhc3MgJyArXHJcbiAgICAgICAgICAgICdudWxsIGZvciB0aGUgb3JpZ2luYWwgbWFwcGluZyBpbnN0ZWFkIG9mIGFuIG9iamVjdCB3aXRoIGVtcHR5IG9yIG51bGwgdmFsdWVzLidcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhR2VuZXJhdGVkICYmICdsaW5lJyBpbiBhR2VuZXJhdGVkICYmICdjb2x1bW4nIGluIGFHZW5lcmF0ZWRcclxuICAgICAgICAmJiBhR2VuZXJhdGVkLmxpbmUgPiAwICYmIGFHZW5lcmF0ZWQuY29sdW1uID49IDBcclxuICAgICAgICAmJiAhYU9yaWdpbmFsICYmICFhU291cmNlICYmICFhTmFtZSkge1xyXG4gICAgICAvLyBDYXNlIDEuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFHZW5lcmF0ZWQgJiYgJ2xpbmUnIGluIGFHZW5lcmF0ZWQgJiYgJ2NvbHVtbicgaW4gYUdlbmVyYXRlZFxyXG4gICAgICAgICAgICAgJiYgYU9yaWdpbmFsICYmICdsaW5lJyBpbiBhT3JpZ2luYWwgJiYgJ2NvbHVtbicgaW4gYU9yaWdpbmFsXHJcbiAgICAgICAgICAgICAmJiBhR2VuZXJhdGVkLmxpbmUgPiAwICYmIGFHZW5lcmF0ZWQuY29sdW1uID49IDBcclxuICAgICAgICAgICAgICYmIGFPcmlnaW5hbC5saW5lID4gMCAmJiBhT3JpZ2luYWwuY29sdW1uID49IDBcclxuICAgICAgICAgICAgICYmIGFTb3VyY2UpIHtcclxuICAgICAgLy8gQ2FzZXMgMiBhbmQgMy5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXBwaW5nOiAnICsgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGdlbmVyYXRlZDogYUdlbmVyYXRlZCxcclxuICAgICAgICBzb3VyY2U6IGFTb3VyY2UsXHJcbiAgICAgICAgb3JpZ2luYWw6IGFPcmlnaW5hbCxcclxuICAgICAgICBuYW1lOiBhTmFtZVxyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBTZXJpYWxpemUgdGhlIGFjY3VtdWxhdGVkIG1hcHBpbmdzIGluIHRvIHRoZSBzdHJlYW0gb2YgYmFzZSA2NCBWTFFzXHJcbiAqIHNwZWNpZmllZCBieSB0aGUgc291cmNlIG1hcCBmb3JtYXQuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLl9zZXJpYWxpemVNYXBwaW5ncyA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3NlcmlhbGl6ZU1hcHBpbmdzKCkge1xyXG4gICAgdmFyIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICAgIHZhciBwcmV2aW91c0dlbmVyYXRlZExpbmUgPSAxO1xyXG4gICAgdmFyIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSAwO1xyXG4gICAgdmFyIHByZXZpb3VzT3JpZ2luYWxMaW5lID0gMDtcclxuICAgIHZhciBwcmV2aW91c05hbWUgPSAwO1xyXG4gICAgdmFyIHByZXZpb3VzU291cmNlID0gMDtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHZhciBuZXh0O1xyXG4gICAgdmFyIG1hcHBpbmc7XHJcbiAgICB2YXIgbmFtZUlkeDtcclxuICAgIHZhciBzb3VyY2VJZHg7XHJcblxyXG4gICAgdmFyIG1hcHBpbmdzID0gdGhpcy5fbWFwcGluZ3MudG9BcnJheSgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1hcHBpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIG1hcHBpbmcgPSBtYXBwaW5nc1tpXTtcclxuICAgICAgbmV4dCA9ICcnXHJcblxyXG4gICAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lICE9PSBwcmV2aW91c0dlbmVyYXRlZExpbmUpIHtcclxuICAgICAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IDA7XHJcbiAgICAgICAgd2hpbGUgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSAhPT0gcHJldmlvdXNHZW5lcmF0ZWRMaW5lKSB7XHJcbiAgICAgICAgICBuZXh0ICs9ICc7JztcclxuICAgICAgICAgIHByZXZpb3VzR2VuZXJhdGVkTGluZSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgIGlmICghdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZChtYXBwaW5nLCBtYXBwaW5nc1tpIC0gMV0pKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmV4dCArPSAnLCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5nZW5lcmF0ZWRDb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBwcmV2aW91c0dlbmVyYXRlZENvbHVtbik7XHJcbiAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5zb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZUlkeCA9IHRoaXMuX3NvdXJjZXMuaW5kZXhPZihtYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKHNvdXJjZUlkeCAtIHByZXZpb3VzU291cmNlKTtcclxuICAgICAgICBwcmV2aW91c1NvdXJjZSA9IHNvdXJjZUlkeDtcclxuXHJcbiAgICAgICAgLy8gbGluZXMgYXJlIHN0b3JlZCAwLWJhc2VkIGluIFNvdXJjZU1hcCBzcGVjIHZlcnNpb24gM1xyXG4gICAgICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShtYXBwaW5nLm9yaWdpbmFsTGluZSAtIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIHByZXZpb3VzT3JpZ2luYWxMaW5lKTtcclxuICAgICAgICBwcmV2aW91c09yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lIC0gMTtcclxuXHJcbiAgICAgICAgbmV4dCArPSBiYXNlNjRWTFEuZW5jb2RlKG1hcHBpbmcub3JpZ2luYWxDb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4pO1xyXG4gICAgICAgIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xyXG5cclxuICAgICAgICBpZiAobWFwcGluZy5uYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgIG5hbWVJZHggPSB0aGlzLl9uYW1lcy5pbmRleE9mKG1hcHBpbmcubmFtZSk7XHJcbiAgICAgICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobmFtZUlkeCAtIHByZXZpb3VzTmFtZSk7XHJcbiAgICAgICAgICBwcmV2aW91c05hbWUgPSBuYW1lSWR4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmVzdWx0ICs9IG5leHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudCA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX2dlbmVyYXRlU291cmNlc0NvbnRlbnQoYVNvdXJjZXMsIGFTb3VyY2VSb290KSB7XHJcbiAgICByZXR1cm4gYVNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgaWYgKCF0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYVNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZSA9IHV0aWwucmVsYXRpdmUoYVNvdXJjZVJvb3QsIHNvdXJjZSk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGtleSA9IHV0aWwudG9TZXRTdHJpbmcoc291cmNlKTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9zb3VyY2VzQ29udGVudHMsIGtleSlcclxuICAgICAgICA/IHRoaXMuX3NvdXJjZXNDb250ZW50c1trZXldXHJcbiAgICAgICAgOiBudWxsO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBFeHRlcm5hbGl6ZSB0aGUgc291cmNlIG1hcC5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUudG9KU09OID1cclxuICBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfdG9KU09OKCkge1xyXG4gICAgdmFyIG1hcCA9IHtcclxuICAgICAgdmVyc2lvbjogdGhpcy5fdmVyc2lvbixcclxuICAgICAgc291cmNlczogdGhpcy5fc291cmNlcy50b0FycmF5KCksXHJcbiAgICAgIG5hbWVzOiB0aGlzLl9uYW1lcy50b0FycmF5KCksXHJcbiAgICAgIG1hcHBpbmdzOiB0aGlzLl9zZXJpYWxpemVNYXBwaW5ncygpXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMuX2ZpbGUgIT0gbnVsbCkge1xyXG4gICAgICBtYXAuZmlsZSA9IHRoaXMuX2ZpbGU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICAgIG1hcC5zb3VyY2VSb290ID0gdGhpcy5fc291cmNlUm9vdDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgICAgbWFwLnNvdXJjZXNDb250ZW50ID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VzQ29udGVudChtYXAuc291cmNlcywgbWFwLnNvdXJjZVJvb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXA7XHJcbiAgfTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXIgdGhlIHNvdXJjZSBtYXAgYmVpbmcgZ2VuZXJhdGVkIHRvIGEgc3RyaW5nLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9XHJcbiAgZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3RvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9KU09OKCkpO1xyXG4gIH07XHJcblxyXG5leHBvcnRzLlNvdXJjZU1hcEdlbmVyYXRvciA9IFNvdXJjZU1hcEdlbmVyYXRvcjtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIHZhbHVlcyBmcm9tIHBhcmFtZXRlci9vcHRpb25zXHJcbiAqIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcmdzIFRoZSBvYmplY3Qgd2UgYXJlIGV4dHJhY3RpbmcgdmFsdWVzIGZyb21cclxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIGFyZSBnZXR0aW5nLlxyXG4gKiBAcGFyYW0gZGVmYXVsdFZhbHVlIEFuIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBpZiB0aGUgcHJvcGVydHkgaXMgbWlzc2luZ1xyXG4gKiBmcm9tIHRoZSBvYmplY3QuIElmIHRoaXMgaXMgbm90IHNwZWNpZmllZCBhbmQgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmcsIGFuXHJcbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QXJnKGFBcmdzLCBhTmFtZSwgYURlZmF1bHRWYWx1ZSkge1xyXG4gIGlmIChhTmFtZSBpbiBhQXJncykge1xyXG4gICAgcmV0dXJuIGFBcmdzW2FOYW1lXTtcclxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgIHJldHVybiBhRGVmYXVsdFZhbHVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFOYW1lICsgJ1wiIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0QXJnID0gZ2V0QXJnO1xyXG5cclxudmFyIHVybFJlZ2V4cCA9IC9eKD86KFtcXHcrXFwtLl0rKTopP1xcL1xcLyg/OihcXHcrOlxcdyspQCk/KFtcXHcuLV0qKSg/OjooXFxkKykpPyguKikkLztcclxudmFyIGRhdGFVcmxSZWdleHAgPSAvXmRhdGE6LitcXCwuKyQvO1xyXG5cclxuZnVuY3Rpb24gdXJsUGFyc2UoYVVybCkge1xyXG4gIHZhciBtYXRjaCA9IGFVcmwubWF0Y2godXJsUmVnZXhwKTtcclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHNjaGVtZTogbWF0Y2hbMV0sXHJcbiAgICBhdXRoOiBtYXRjaFsyXSxcclxuICAgIGhvc3Q6IG1hdGNoWzNdLFxyXG4gICAgcG9ydDogbWF0Y2hbNF0sXHJcbiAgICBwYXRoOiBtYXRjaFs1XVxyXG4gIH07XHJcbn1cclxuZXhwb3J0cy51cmxQYXJzZSA9IHVybFBhcnNlO1xyXG5cclxuZnVuY3Rpb24gdXJsR2VuZXJhdGUoYVBhcnNlZFVybCkge1xyXG4gIHZhciB1cmwgPSAnJztcclxuICBpZiAoYVBhcnNlZFVybC5zY2hlbWUpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnNjaGVtZSArICc6JztcclxuICB9XHJcbiAgdXJsICs9ICcvLyc7XHJcbiAgaWYgKGFQYXJzZWRVcmwuYXV0aCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuYXV0aCArICdAJztcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwuaG9zdCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuaG9zdDtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwucG9ydCkge1xyXG4gICAgdXJsICs9IFwiOlwiICsgYVBhcnNlZFVybC5wb3J0XHJcbiAgfVxyXG4gIGlmIChhUGFyc2VkVXJsLnBhdGgpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnBhdGg7XHJcbiAgfVxyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuZXhwb3J0cy51cmxHZW5lcmF0ZSA9IHVybEdlbmVyYXRlO1xyXG5cclxuY29uc3QgTUFYX0NBQ0hFRF9JTlBVVFMgPSAzMjtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBzb21lIGZ1bmN0aW9uIGBmKGlucHV0KSAtPiByZXN1bHRgIGFuZCByZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZlxyXG4gKiBgZmAuXHJcbiAqXHJcbiAqIFdlIGtlZXAgYXQgbW9zdCBgTUFYX0NBQ0hFRF9JTlBVVFNgIG1lbW9pemVkIHJlc3VsdHMgb2YgYGZgIGFsaXZlLiBUaGVcclxuICogbWVtb2l6YXRpb24gaXMgYSBkdW1iLXNpbXBsZSwgbGluZWFyIGxlYXN0LXJlY2VudGx5LXVzZWQgY2FjaGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBscnVNZW1vaXplKGYpIHtcclxuICBjb25zdCBjYWNoZSA9IFtdO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChjYWNoZVtpXS5pbnB1dCA9PT0gaW5wdXQpIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNhY2hlWzBdO1xyXG4gICAgICAgIGNhY2hlWzBdID0gY2FjaGVbaV07XHJcbiAgICAgICAgY2FjaGVbaV0gPSB0ZW1wO1xyXG4gICAgICAgIHJldHVybiBjYWNoZVswXS5yZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gZihpbnB1dCk7XHJcblxyXG4gICAgY2FjaGUudW5zaGlmdCh7XHJcbiAgICAgIGlucHV0LFxyXG4gICAgICByZXN1bHQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2FjaGUubGVuZ3RoID4gTUFYX0NBQ0hFRF9JTlBVVFMpIHtcclxuICAgICAgY2FjaGUucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplcyBhIHBhdGgsIG9yIHRoZSBwYXRoIHBvcnRpb24gb2YgYSBVUkw6XHJcbiAqXHJcbiAqIC0gUmVwbGFjZXMgY29uc2VjdXRpdmUgc2xhc2hlcyB3aXRoIG9uZSBzbGFzaC5cclxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICcuJyBwYXJ0cy5cclxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICc8ZGlyPi8uLicgcGFydHMuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIGNvZGUgaW4gdGhlIE5vZGUuanMgJ3BhdGgnIGNvcmUgbW9kdWxlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgdXJsIHRvIG5vcm1hbGl6ZS5cclxuICovXHJcbnZhciBub3JtYWxpemUgPSBscnVNZW1vaXplKGZ1bmN0aW9uIG5vcm1hbGl6ZShhUGF0aCkge1xyXG4gIHZhciBwYXRoID0gYVBhdGg7XHJcbiAgdmFyIHVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICBpZiAodXJsKSB7XHJcbiAgICBpZiAoIXVybC5wYXRoKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuICAgIHBhdGggPSB1cmwucGF0aDtcclxuICB9XHJcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCk7XHJcblxyXG4gIC8vIFNwbGl0IHRoZSBwYXRoIGludG8gcGFydHMgYmV0d2VlbiBgL2AgY2hhcmFjdGVycy4gVGhpcyBpcyBtdWNoIGZhc3RlciB0aGFuXHJcbiAgLy8gdXNpbmcgYC5zcGxpdCgvXFwvKy9nKWAuXHJcbiAgdmFyIHBhcnRzID0gW107XHJcbiAgdmFyIHN0YXJ0ID0gMDtcclxuICB2YXIgaSA9IDA7XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHN0YXJ0ID0gaTtcclxuICAgIGkgPSBwYXRoLmluZGV4T2YoXCIvXCIsIHN0YXJ0KTtcclxuICAgIGlmIChpID09PSAtMSkge1xyXG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQpKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQsIGkpKTtcclxuICAgICAgd2hpbGUgKGkgPCBwYXRoLmxlbmd0aCAmJiBwYXRoW2ldID09PSBcIi9cIikge1xyXG4gICAgICAgIGkrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgcGFydCwgdXAgPSAwLCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHBhcnQgPSBwYXJ0c1tpXTtcclxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XHJcbiAgICAgIHVwKys7XHJcbiAgICB9IGVsc2UgaWYgKHVwID4gMCkge1xyXG4gICAgICBpZiAocGFydCA9PT0gJycpIHtcclxuICAgICAgICAvLyBUaGUgZmlyc3QgcGFydCBpcyBibGFuayBpZiB0aGUgcGF0aCBpcyBhYnNvbHV0ZS4gVHJ5aW5nIHRvIGdvXHJcbiAgICAgICAgLy8gYWJvdmUgdGhlIHJvb3QgaXMgYSBuby1vcC4gVGhlcmVmb3JlIHdlIGNhbiByZW1vdmUgYWxsICcuLicgcGFydHNcclxuICAgICAgICAvLyBkaXJlY3RseSBhZnRlciB0aGUgcm9vdC5cclxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSArIDEsIHVwKTtcclxuICAgICAgICB1cCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFydHMuc3BsaWNlKGksIDIpO1xyXG4gICAgICAgIHVwLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcGF0aCA9IHBhcnRzLmpvaW4oJy8nKTtcclxuXHJcbiAgaWYgKHBhdGggPT09ICcnKSB7XHJcbiAgICBwYXRoID0gaXNBYnNvbHV0ZSA/ICcvJyA6ICcuJztcclxuICB9XHJcblxyXG4gIGlmICh1cmwpIHtcclxuICAgIHVybC5wYXRoID0gcGF0aDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZSh1cmwpO1xyXG4gIH1cclxuICByZXR1cm4gcGF0aDtcclxufSk7XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG5cclxuLyoqXHJcbiAqIEpvaW5zIHR3byBwYXRocy9VUkxzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgam9pbmVkIHdpdGggdGhlIHJvb3QuXHJcbiAqXHJcbiAqIC0gSWYgYVBhdGggaXMgYSBVUkwgb3IgYSBkYXRhIFVSSSwgYVBhdGggaXMgcmV0dXJuZWQsIHVubGVzcyBhUGF0aCBpcyBhXHJcbiAqICAgc2NoZW1lLXJlbGF0aXZlIFVSTDogVGhlbiB0aGUgc2NoZW1lIG9mIGFSb290LCBpZiBhbnksIGlzIHByZXBlbmRlZFxyXG4gKiAgIGZpcnN0LlxyXG4gKiAtIE90aGVyd2lzZSBhUGF0aCBpcyBhIHBhdGguIElmIGFSb290IGlzIGEgVVJMLCB0aGVuIGl0cyBwYXRoIHBvcnRpb25cclxuICogICBpcyB1cGRhdGVkIHdpdGggdGhlIHJlc3VsdCBhbmQgYVJvb3QgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSB0aGUgcmVzdWx0XHJcbiAqICAgaXMgcmV0dXJuZWQuXHJcbiAqICAgLSBJZiBhUGF0aCBpcyBhYnNvbHV0ZSwgdGhlIHJlc3VsdCBpcyBhUGF0aC5cclxuICogICAtIE90aGVyd2lzZSB0aGUgdHdvIHBhdGhzIGFyZSBqb2luZWQgd2l0aCBhIHNsYXNoLlxyXG4gKiAtIEpvaW5pbmcgZm9yIGV4YW1wbGUgJ2h0dHA6Ly8nIGFuZCAnd3d3LmV4YW1wbGUuY29tJyBpcyBhbHNvIHN1cHBvcnRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGpvaW4oYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuICBpZiAoYVBhdGggPT09IFwiXCIpIHtcclxuICAgIGFQYXRoID0gXCIuXCI7XHJcbiAgfVxyXG4gIHZhciBhUGF0aFVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICB2YXIgYVJvb3RVcmwgPSB1cmxQYXJzZShhUm9vdCk7XHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdCA9IGFSb290VXJsLnBhdGggfHwgJy8nO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oZm9vLCAnLy93d3cuZXhhbXBsZS5vcmcnKWBcclxuICBpZiAoYVBhdGhVcmwgJiYgIWFQYXRoVXJsLnNjaGVtZSkge1xyXG4gICAgaWYgKGFSb290VXJsKSB7XHJcbiAgICAgIGFQYXRoVXJsLnNjaGVtZSA9IGFSb290VXJsLnNjaGVtZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUGF0aFVybCk7XHJcbiAgfVxyXG5cclxuICBpZiAoYVBhdGhVcmwgfHwgYVBhdGgubWF0Y2goZGF0YVVybFJlZ2V4cCkpIHtcclxuICAgIHJldHVybiBhUGF0aDtcclxuICB9XHJcblxyXG4gIC8vIGBqb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpYFxyXG4gIGlmIChhUm9vdFVybCAmJiAhYVJvb3RVcmwuaG9zdCAmJiAhYVJvb3RVcmwucGF0aCkge1xyXG4gICAgYVJvb3RVcmwuaG9zdCA9IGFQYXRoO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcblxyXG4gIHZhciBqb2luZWQgPSBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJ1xyXG4gICAgPyBhUGF0aFxyXG4gICAgOiBub3JtYWxpemUoYVJvb3QucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBhUGF0aCk7XHJcblxyXG4gIGlmIChhUm9vdFVybCkge1xyXG4gICAgYVJvb3RVcmwucGF0aCA9IGpvaW5lZDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUm9vdFVybCk7XHJcbiAgfVxyXG4gIHJldHVybiBqb2luZWQ7XHJcbn1cclxuZXhwb3J0cy5qb2luID0gam9pbjtcclxuXHJcbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uIChhUGF0aCkge1xyXG4gIHJldHVybiBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJyB8fCB1cmxSZWdleHAudGVzdChhUGF0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSBhIHBhdGggcmVsYXRpdmUgdG8gYSBVUkwgb3IgYW5vdGhlciBwYXRoLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgbWFkZSByZWxhdGl2ZSB0byBhUm9vdC5cclxuICovXHJcbmZ1bmN0aW9uIHJlbGF0aXZlKGFSb290LCBhUGF0aCkge1xyXG4gIGlmIChhUm9vdCA9PT0gXCJcIikge1xyXG4gICAgYVJvb3QgPSBcIi5cIjtcclxuICB9XHJcblxyXG4gIGFSb290ID0gYVJvb3QucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuXHJcbiAgLy8gSXQgaXMgcG9zc2libGUgZm9yIHRoZSBwYXRoIHRvIGJlIGFib3ZlIHRoZSByb290LiBJbiB0aGlzIGNhc2UsIHNpbXBseVxyXG4gIC8vIGNoZWNraW5nIHdoZXRoZXIgdGhlIHJvb3QgaXMgYSBwcmVmaXggb2YgdGhlIHBhdGggd29uJ3Qgd29yay4gSW5zdGVhZCwgd2VcclxuICAvLyBuZWVkIHRvIHJlbW92ZSBjb21wb25lbnRzIGZyb20gdGhlIHJvb3Qgb25lIGJ5IG9uZSwgdW50aWwgZWl0aGVyIHdlIGZpbmRcclxuICAvLyBhIHByZWZpeCB0aGF0IGZpdHMsIG9yIHdlIHJ1biBvdXQgb2YgY29tcG9uZW50cyB0byByZW1vdmUuXHJcbiAgdmFyIGxldmVsID0gMDtcclxuICB3aGlsZSAoYVBhdGguaW5kZXhPZihhUm9vdCArICcvJykgIT09IDApIHtcclxuICAgIHZhciBpbmRleCA9IGFSb290Lmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHRoZSBvbmx5IHBhcnQgb2YgdGhlIHJvb3QgdGhhdCBpcyBsZWZ0IGlzIHRoZSBzY2hlbWUgKGkuZS4gaHR0cDovLyxcclxuICAgIC8vIGZpbGU6Ly8vLCBldGMuKSwgb25lIG9yIG1vcmUgc2xhc2hlcyAoLyksIG9yIHNpbXBseSBub3RoaW5nIGF0IGFsbCwgd2VcclxuICAgIC8vIGhhdmUgZXhoYXVzdGVkIGFsbCBjb21wb25lbnRzLCBzbyB0aGUgcGF0aCBpcyBub3QgcmVsYXRpdmUgdG8gdGhlIHJvb3QuXHJcbiAgICBhUm9vdCA9IGFSb290LnNsaWNlKDAsIGluZGV4KTtcclxuICAgIGlmIChhUm9vdC5tYXRjaCgvXihbXlxcL10rOlxcLyk/XFwvKiQvKSkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgKytsZXZlbDtcclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB3ZSBhZGQgYSBcIi4uL1wiIGZvciBlYWNoIGNvbXBvbmVudCB3ZSByZW1vdmVkIGZyb20gdGhlIHJvb3QuXHJcbiAgcmV0dXJuIEFycmF5KGxldmVsICsgMSkuam9pbihcIi4uL1wiKSArIGFQYXRoLnN1YnN0cihhUm9vdC5sZW5ndGggKyAxKTtcclxufVxyXG5leHBvcnRzLnJlbGF0aXZlID0gcmVsYXRpdmU7XHJcblxyXG52YXIgc3VwcG9ydHNOdWxsUHJvdG8gPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIHJldHVybiAhKCdfX3Byb3RvX18nIGluIG9iaik7XHJcbn0oKSk7XHJcblxyXG5mdW5jdGlvbiBpZGVudGl0eSAocykge1xyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG4vKipcclxuICogQmVjYXVzZSBiZWhhdmlvciBnb2VzIHdhY2t5IHdoZW4geW91IHNldCBgX19wcm90b19fYCBvbiBvYmplY3RzLCB3ZVxyXG4gKiBoYXZlIHRvIHByZWZpeCBhbGwgdGhlIHN0cmluZ3MgaW4gb3VyIHNldCB3aXRoIGFuIGFyYml0cmFyeSBjaGFyYWN0ZXIuXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL3B1bGwvMzEgYW5kXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvaXNzdWVzLzMwXHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuZnVuY3Rpb24gdG9TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gJyQnICsgYVN0cjtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMudG9TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogdG9TZXRTdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBmcm9tU2V0U3RyaW5nKGFTdHIpIHtcclxuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xyXG4gICAgcmV0dXJuIGFTdHIuc2xpY2UoMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYVN0cjtcclxufVxyXG5leHBvcnRzLmZyb21TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogZnJvbVNldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGlzUHJvdG9TdHJpbmcocykge1xyXG4gIGlmICghcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdmFyIGxlbmd0aCA9IHMubGVuZ3RoO1xyXG5cclxuICBpZiAobGVuZ3RoIDwgOSAvKiBcIl9fcHJvdG9fX1wiLmxlbmd0aCAqLykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHMuY2hhckNvZGVBdChsZW5ndGggLSAxKSAhPT0gOTUgIC8qICdfJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMikgIT09IDk1ICAvKiAnXycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDMpICE9PSAxMTEgLyogJ28nICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA0KSAhPT0gMTE2IC8qICd0JyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNSkgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDYpICE9PSAxMTQgLyogJ3InICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA3KSAhPT0gMTEyIC8qICdwJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOCkgIT09IDk1ICAvKiAnXycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDkpICE9PSA5NSAgLyogJ18nICovKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTA7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBpZiAocy5jaGFyQ29kZUF0KGkpICE9PSAzNiAvKiAnJCcgKi8pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdoZXJlIHRoZSBvcmlnaW5hbCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgb3JpZ2luYWwgc291cmNlL2xpbmUvY29sdW1uLCBidXQgZGlmZmVyZW50IGdlbmVyYXRlZFxyXG4gKiBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYSBtYXBwaW5nIHdpdGggYVxyXG4gKiBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XHJcbiAgdmFyIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMgPSBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggZGVmbGF0ZWQgc291cmNlIGFuZCBuYW1lIGluZGljZXMgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiwgYnV0IGRpZmZlcmVudFxyXG4gKiBzb3VyY2UvbmFtZS9vcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYVxyXG4gKiBtYXBwaW5nIHdpdGggYSBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xyXG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVHZW5lcmF0ZWQpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkO1xyXG5cclxuZnVuY3Rpb24gc3RyY21wKGFTdHIxLCBhU3RyMikge1xyXG4gIGlmIChhU3RyMSA9PT0gYVN0cjIpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIxID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gMTsgLy8gYVN0cjIgIT09IG51bGxcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMiA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIC0xOyAvLyBhU3RyMSAhPT0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIxID4gYVN0cjIpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIC0xO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGluZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBzdHJpbmdzIHdoZXJlXHJcbiAqIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmdBLCBtYXBwaW5nQikge1xyXG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkO1xyXG5cclxuLyoqXHJcbiAqIFN0cmlwIGFueSBKU09OIFhTU0kgYXZvaWRhbmNlIHByZWZpeCBmcm9tIHRoZSBzdHJpbmcgKGFzIGRvY3VtZW50ZWRcclxuICogaW4gdGhlIHNvdXJjZSBtYXBzIHNwZWNpZmljYXRpb24pLCBhbmQgdGhlbiBwYXJzZSB0aGUgc3RyaW5nIGFzXHJcbiAqIEpTT04uXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVNvdXJjZU1hcElucHV0KHN0cikge1xyXG4gIHJldHVybiBKU09OLnBhcnNlKHN0ci5yZXBsYWNlKC9eXFwpXX0nW15cXG5dKlxcbi8sICcnKSk7XHJcbn1cclxuZXhwb3J0cy5wYXJzZVNvdXJjZU1hcElucHV0ID0gcGFyc2VTb3VyY2VNYXBJbnB1dDtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHRoZSBVUkwgb2YgYSBzb3VyY2UgZ2l2ZW4gdGhlIHRoZSBzb3VyY2Ugcm9vdCwgdGhlIHNvdXJjZSdzXHJcbiAqIFVSTCwgYW5kIHRoZSBzb3VyY2UgbWFwJ3MgVVJMLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkge1xyXG4gIHNvdXJjZVVSTCA9IHNvdXJjZVVSTCB8fCAnJztcclxuXHJcbiAgaWYgKHNvdXJjZVJvb3QpIHtcclxuICAgIC8vIFRoaXMgZm9sbG93cyB3aGF0IENocm9tZSBkb2VzLlxyXG4gICAgaWYgKHNvdXJjZVJvb3Rbc291cmNlUm9vdC5sZW5ndGggLSAxXSAhPT0gJy8nICYmIHNvdXJjZVVSTFswXSAhPT0gJy8nKSB7XHJcbiAgICAgIHNvdXJjZVJvb3QgKz0gJy8nO1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAgIC8vICAgTGluZSA0OiBBbiBvcHRpb25hbCBzb3VyY2Ugcm9vdCwgdXNlZnVsIGZvciByZWxvY2F0aW5nIHNvdXJjZVxyXG4gICAgLy8gICBmaWxlcyBvbiBhIHNlcnZlciBvciByZW1vdmluZyByZXBlYXRlZCB2YWx1ZXMgaW4gdGhlXHJcbiAgICAvLyAgIOKAnHNvdXJjZXPigJ0gZW50cnkuICBUaGlzIHZhbHVlIGlzIHByZXBlbmRlZCB0byB0aGUgaW5kaXZpZHVhbFxyXG4gICAgLy8gICBlbnRyaWVzIGluIHRoZSDigJxzb3VyY2XigJ0gZmllbGQuXHJcbiAgICBzb3VyY2VVUkwgPSBzb3VyY2VSb290ICsgc291cmNlVVJMO1xyXG4gIH1cclxuXHJcbiAgLy8gSGlzdG9yaWNhbGx5LCBTb3VyY2VNYXBDb25zdW1lciBkaWQgbm90IHRha2UgdGhlIHNvdXJjZU1hcFVSTCBhc1xyXG4gIC8vIGEgcGFyYW1ldGVyLiAgVGhpcyBtb2RlIGlzIHN0aWxsIHNvbWV3aGF0IHN1cHBvcnRlZCwgd2hpY2ggaXMgd2h5XHJcbiAgLy8gdGhpcyBjb2RlIGJsb2NrIGlzIGNvbmRpdGlvbmFsLiAgSG93ZXZlciwgaXQncyBwcmVmZXJhYmxlIHRvIHBhc3NcclxuICAvLyB0aGUgc291cmNlIG1hcCBVUkwgdG8gU291cmNlTWFwQ29uc3VtZXIsIHNvIHRoYXQgdGhpcyBmdW5jdGlvblxyXG4gIC8vIGNhbiBpbXBsZW1lbnQgdGhlIHNvdXJjZSBVUkwgcmVzb2x1dGlvbiBhbGdvcml0aG0gYXMgb3V0bGluZWQgaW5cclxuICAvLyB0aGUgc3BlYy4gIFRoaXMgYmxvY2sgaXMgYmFzaWNhbGx5IHRoZSBlcXVpdmFsZW50IG9mOlxyXG4gIC8vICAgIG5ldyBVUkwoc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpLnRvU3RyaW5nKClcclxuICAvLyAuLi4gZXhjZXB0IGl0IGF2b2lkcyB1c2luZyBVUkwsIHdoaWNoIHdhc24ndCBhdmFpbGFibGUgaW4gdGhlXHJcbiAgLy8gb2xkZXIgcmVsZWFzZXMgb2Ygbm9kZSBzdGlsbCBzdXBwb3J0ZWQgYnkgdGhpcyBsaWJyYXJ5LlxyXG4gIC8vXHJcbiAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAvLyAgIElmIHRoZSBzb3VyY2VzIGFyZSBub3QgYWJzb2x1dGUgVVJMcyBhZnRlciBwcmVwZW5kaW5nIG9mIHRoZVxyXG4gIC8vICAg4oCcc291cmNlUm9vdOKAnSwgdGhlIHNvdXJjZXMgYXJlIHJlc29sdmVkIHJlbGF0aXZlIHRvIHRoZVxyXG4gIC8vICAgU291cmNlTWFwIChsaWtlIHJlc29sdmluZyBzY3JpcHQgc3JjIGluIGEgaHRtbCBkb2N1bWVudCkuXHJcbiAgaWYgKHNvdXJjZU1hcFVSTCkge1xyXG4gICAgdmFyIHBhcnNlZCA9IHVybFBhcnNlKHNvdXJjZU1hcFVSTCk7XHJcbiAgICBpZiAoIXBhcnNlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzb3VyY2VNYXBVUkwgY291bGQgbm90IGJlIHBhcnNlZFwiKTtcclxuICAgIH1cclxuICAgIGlmIChwYXJzZWQucGF0aCkge1xyXG4gICAgICAvLyBTdHJpcCB0aGUgbGFzdCBwYXRoIGNvbXBvbmVudCwgYnV0IGtlZXAgdGhlIFwiL1wiLlxyXG4gICAgICB2YXIgaW5kZXggPSBwYXJzZWQucGF0aC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIHBhcnNlZC5wYXRoID0gcGFyc2VkLnBhdGguc3Vic3RyaW5nKDAsIGluZGV4ICsgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvdXJjZVVSTCA9IGpvaW4odXJsR2VuZXJhdGUocGFyc2VkKSwgc291cmNlVVJMKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemUoc291cmNlVVJMKTtcclxufVxyXG5leHBvcnRzLmNvbXB1dGVTb3VyY2VVUkwgPSBjb21wdXRlU291cmNlVVJMO1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgU291cmNlTWFwQ29uc3VtZXIgPSByZXF1aXJlKCcuLi9saWIvc291cmNlLW1hcC1jb25zdW1lcicpLlNvdXJjZU1hcENvbnN1bWVyO1xyXG52YXIgSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyID0gcmVxdWlyZSgnLi4vbGliL3NvdXJjZS1tYXAtY29uc3VtZXInKS5JbmRleGVkU291cmNlTWFwQ29uc3VtZXI7XHJcbnZhciBCYXNpY1NvdXJjZU1hcENvbnN1bWVyID0gcmVxdWlyZSgnLi4vbGliL3NvdXJjZS1tYXAtY29uc3VtZXInKS5CYXNpY1NvdXJjZU1hcENvbnN1bWVyO1xyXG52YXIgU291cmNlTWFwR2VuZXJhdG9yID0gcmVxdWlyZSgnLi4vbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yJykuU291cmNlTWFwR2VuZXJhdG9yO1xyXG5cclxuZXhwb3J0c1sndGVzdCB0aGF0IHdlIGNhbiBpbnN0YW50aWF0ZSB3aXRoIGEgc3RyaW5nIG9yIGFuIG9iamVjdCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIGFzc2VydC5kb2VzTm90VGhyb3coZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG4gIH0pO1xyXG4gIGFzc2VydC5kb2VzTm90VGhyb3coZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihKU09OLnN0cmluZ2lmeSh1dGlsLnRlc3RNYXApKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgdGhhdCB0aGUgb2JqZWN0IHJldHVybmVkIGZyb20gbmV3IFNvdXJjZU1hcENvbnN1bWVyIGluaGVyaXRzIGZyb20gU291cmNlTWFwQ29uc3VtZXInXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICBhc3NlcnQub2sobmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcCkgaW5zdGFuY2VvZiBTb3VyY2VNYXBDb25zdW1lcik7XHJcbn1cclxuXHJcbmV4cG9ydHNbJ3Rlc3QgdGhhdCBhIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgaXMgcmV0dXJuZWQgZm9yIHNvdXJjZW1hcHMgd2l0aG91dCBzZWN0aW9ucyddID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgYXNzZXJ0Lm9rKG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApIGluc3RhbmNlb2YgQmFzaWNTb3VyY2VNYXBDb25zdW1lcik7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHRoYXQgYW4gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyIGlzIHJldHVybmVkIGZvciBzb3VyY2VtYXBzIHdpdGggc2VjdGlvbnMnXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIGFzc2VydC5vayhuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCkgaW5zdGFuY2VvZiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCB0aGF0IHRoZSBgc291cmNlc2AgZmllbGQgaGFzIHRoZSBvcmlnaW5hbCBzb3VyY2VzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcDtcclxuICB2YXIgc291cmNlcztcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcCk7XHJcbiAgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzBdLCAnL3RoZS9yb290L29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzFdLCAnL3RoZS9yb290L3R3by5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMik7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmluZGV4ZWRUZXN0TWFwKTtcclxuICBzb3VyY2VzID0gbWFwLnNvdXJjZXM7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMF0sICcvdGhlL3Jvb3Qvb25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMV0sICcvdGhlL3Jvb3QvdHdvLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXMubGVuZ3RoLCAyKTtcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuaW5kZXhlZFRlc3RNYXBEaWZmZXJlbnRTb3VyY2VSb290cyk7XHJcbiAgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzBdLCAnL3RoZS9yb290L29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzFdLCAnL2RpZmZlcmVudC9yb290L3R3by5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMik7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBOb1NvdXJjZVJvb3QpO1xyXG4gIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuICBhc3NlcnQuZXF1YWwoc291cmNlc1swXSwgJ29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzFdLCAndHdvLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXMubGVuZ3RoLCAyKTtcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcEVtcHR5U291cmNlUm9vdCk7XHJcbiAgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzWzBdLCAnb25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMV0sICd0d28uanMnKTtcclxuICBhc3NlcnQuZXF1YWwoc291cmNlcy5sZW5ndGgsIDIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCB0aGF0IHRoZSBzb3VyY2Ugcm9vdCBpcyByZWZsZWN0ZWQgaW4gYSBtYXBwaW5nXFwncyBzb3VyY2UgZmllbGQnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwO1xyXG4gIHZhciBtYXBwaW5nO1xyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwKTtcclxuXHJcbiAgbWFwcGluZyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDFcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZy5zb3VyY2UsICcvdGhlL3Jvb3QvdHdvLmpzJyk7XHJcblxyXG4gIG1hcHBpbmcgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAxXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmcuc291cmNlLCAnL3RoZS9yb290L29uZS5qcycpO1xyXG5cclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcE5vU291cmNlUm9vdCk7XHJcblxyXG4gIG1hcHBpbmcgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgY29sdW1uOiAxXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmcuc291cmNlLCAndHdvLmpzJyk7XHJcblxyXG4gIG1hcHBpbmcgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAxXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmcuc291cmNlLCAnb25lLmpzJyk7XHJcblxyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwRW1wdHlTb3VyY2VSb290KTtcclxuXHJcbiAgbWFwcGluZyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDFcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZy5zb3VyY2UsICd0d28uanMnKTtcclxuXHJcbiAgbWFwcGluZyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDFcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZy5zb3VyY2UsICdvbmUuanMnKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgbWFwcGluZyB0b2tlbnMgYmFjayBleGFjdGx5J10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMSwgJy90aGUvcm9vdC9vbmUuanMnLCAxLCAxLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDUsICcvdGhlL3Jvb3Qvb25lLmpzJywgMSwgNSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCA5LCAnL3RoZS9yb290L29uZS5qcycsIDEsIDExLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDE4LCAnL3RoZS9yb290L29uZS5qcycsIDEsIDIxLCAnYmFyJywgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyMSwgJy90aGUvcm9vdC9vbmUuanMnLCAyLCAzLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDI4LCAnL3RoZS9yb290L29uZS5qcycsIDIsIDEwLCAnYmF6JywgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAzMiwgJy90aGUvcm9vdC9vbmUuanMnLCAyLCAxNCwgJ2JhcicsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDEsICcvdGhlL3Jvb3QvdHdvLmpzJywgMSwgMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCA1LCAnL3RoZS9yb290L3R3by5qcycsIDEsIDUsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgOSwgJy90aGUvcm9vdC90d28uanMnLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAxOCwgJy90aGUvcm9vdC90d28uanMnLCAxLCAyMSwgJ24nLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDIxLCAnL3RoZS9yb290L3R3by5qcycsIDIsIDMsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgMjgsICcvdGhlL3Jvb3QvdHdvLmpzJywgMiwgMTAsICduJywgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBtYXBwaW5nIHRva2VucyBiYWNrIGV4YWN0bHkgaW4gaW5kZXhlZCBzb3VyY2UgbWFwJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmluZGV4ZWRUZXN0TWFwKTtcclxuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDEsICcvdGhlL3Jvb3Qvb25lLmpzJywgMSwgMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCA1LCAnL3RoZS9yb290L29uZS5qcycsIDEsIDUsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgOSwgJy90aGUvcm9vdC9vbmUuanMnLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAxOCwgJy90aGUvcm9vdC9vbmUuanMnLCAxLCAyMSwgJ2JhcicsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMjEsICcvdGhlL3Jvb3Qvb25lLmpzJywgMiwgMywgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyOCwgJy90aGUvcm9vdC9vbmUuanMnLCAyLCAxMCwgJ2JheicsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMzIsICcvdGhlL3Jvb3Qvb25lLmpzJywgMiwgMTQsICdiYXInLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcblxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAxLCAnL3RoZS9yb290L3R3by5qcycsIDEsIDEsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgNSwgJy90aGUvcm9vdC90d28uanMnLCAxLCA1LCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDksICcvdGhlL3Jvb3QvdHdvLmpzJywgMSwgMTEsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgMTgsICcvdGhlL3Jvb3QvdHdvLmpzJywgMSwgMjEsICduJywgbnVsbCwgbWFwLCBhc3NlcnQpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAyMSwgJy90aGUvcm9vdC90d28uanMnLCAyLCAzLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDI4LCAnL3RoZS9yb290L3R3by5qcycsIDIsIDEwLCAnbicsIG51bGwsIG1hcCwgYXNzZXJ0KTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgbWFwcGluZyB0b2tlbnMgZnV6enknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcCk7XHJcblxyXG4gIC8vIEZpbmRpbmcgb3JpZ2luYWwgcG9zaXRpb25zIHdpdGggZGVmYXVsdCAoZ2xiKSBiaWFzLlxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyMCwgJy90aGUvcm9vdC9vbmUuanMnLCAxLCAyMSwgJ2JhcicsIG51bGwsIG1hcCwgYXNzZXJ0LCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMzAsICcvdGhlL3Jvb3Qvb25lLmpzJywgMiwgMTAsICdiYXonLCBudWxsLCBtYXAsIGFzc2VydCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDEyLCAnL3RoZS9yb290L3R3by5qcycsIDEsIDExLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCwgdHJ1ZSk7XHJcblxyXG4gIC8vIEZpbmRpbmcgb3JpZ2luYWwgcG9zaXRpb25zIHdpdGggbHViIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDE2LCAnL3RoZS9yb290L29uZS5qcycsIDEsIDIxLCAnYmFyJywgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsIG1hcCwgYXNzZXJ0LCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMjYsICcvdGhlL3Jvb3Qvb25lLmpzJywgMiwgMTAsICdiYXonLCBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCwgbWFwLCBhc3NlcnQsIHRydWUpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCA2LCAnL3RoZS9yb290L3R3by5qcycsIDEsIDExLCBudWxsLCBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCwgbWFwLCBhc3NlcnQsIHRydWUpO1xyXG5cclxuICAvLyBGaW5kaW5nIGdlbmVyYXRlZCBwb3NpdGlvbnMgd2l0aCBkZWZhdWx0IChnbGIpIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDE4LCAnL3RoZS9yb290L29uZS5qcycsIDEsIDIyLCAnYmFyJywgbnVsbCwgbWFwLCBhc3NlcnQsIG51bGwsIHRydWUpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyOCwgJy90aGUvcm9vdC9vbmUuanMnLCAyLCAxMywgJ2JheicsIG51bGwsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgOSwgJy90aGUvcm9vdC90d28uanMnLCAxLCAxNiwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQsIG51bGwsIHRydWUpO1xyXG5cclxuICAvLyBGaW5kaW5nIGdlbmVyYXRlZCBwb3NpdGlvbnMgd2l0aCBsdWIgYmlhcy5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMTgsICcvdGhlL3Jvb3Qvb25lLmpzJywgMSwgMjAsICdiYXInLCBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCwgbWFwLCBhc3NlcnQsIG51bGwsIHRydWUpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAyOCwgJy90aGUvcm9vdC9vbmUuanMnLCAyLCA3LCAnYmF6JywgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgOSwgJy90aGUvcm9vdC90d28uanMnLCAxLCA2LCBudWxsLCBTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCwgbWFwLCBhc3NlcnQsIG51bGwsIHRydWUpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBtYXBwaW5nIHRva2VucyBmdXp6eSBpbiBpbmRleGVkIHNvdXJjZSBtYXAnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuaW5kZXhlZFRlc3RNYXApO1xyXG5cclxuICAvLyBGaW5kaW5nIG9yaWdpbmFsIHBvc2l0aW9ucyB3aXRoIGRlZmF1bHQgKGdsYikgYmlhcy5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMjAsICcvdGhlL3Jvb3Qvb25lLmpzJywgMSwgMjEsICdiYXInLCBudWxsLCBtYXAsIGFzc2VydCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDMwLCAnL3RoZS9yb290L29uZS5qcycsIDIsIDEwLCAnYmF6JywgbnVsbCwgbWFwLCBhc3NlcnQsIHRydWUpO1xyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAxMiwgJy90aGUvcm9vdC90d28uanMnLCAxLCAxMSwgbnVsbCwgbnVsbCwgbWFwLCBhc3NlcnQsIHRydWUpO1xyXG5cclxuICAvLyBGaW5kaW5nIG9yaWdpbmFsIHBvc2l0aW9ucyB3aXRoIGx1YiBiaWFzLlxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAxNiwgJy90aGUvcm9vdC9vbmUuanMnLCAxLCAyMSwgJ2JhcicsIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELCBtYXAsIGFzc2VydCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDI2LCAnL3RoZS9yb290L29uZS5qcycsIDIsIDEwLCAnYmF6JywgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsIG1hcCwgYXNzZXJ0LCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMiwgNiwgJy90aGUvcm9vdC90d28uanMnLCAxLCAxMSwgbnVsbCwgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsIG1hcCwgYXNzZXJ0LCB0cnVlKTtcclxuXHJcbiAgLy8gRmluZGluZyBnZW5lcmF0ZWQgcG9zaXRpb25zIHdpdGggZGVmYXVsdCAoZ2xiKSBiaWFzLlxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygxLCAxOCwgJy90aGUvcm9vdC9vbmUuanMnLCAxLCAyMiwgJ2JhcicsIG51bGwsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMjgsICcvdGhlL3Jvb3Qvb25lLmpzJywgMiwgMTMsICdiYXonLCBudWxsLCBtYXAsIGFzc2VydCwgbnVsbCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDksICcvdGhlL3Jvb3QvdHdvLmpzJywgMSwgMTYsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxuXHJcbiAgLy8gRmluZGluZyBnZW5lcmF0ZWQgcG9zaXRpb25zIHdpdGggbHViIGJpYXMuXHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDEsIDE4LCAnL3RoZS9yb290L29uZS5qcycsIDEsIDIwLCAnYmFyJywgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMjgsICcvdGhlL3Jvb3Qvb25lLmpzJywgMiwgNywgJ2JheicsIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELCBtYXAsIGFzc2VydCwgbnVsbCwgdHJ1ZSk7XHJcbiAgdXRpbC5hc3NlcnRNYXBwaW5nKDIsIDksICcvdGhlL3Jvb3QvdHdvLmpzJywgMSwgNiwgbnVsbCwgU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgbWFwcGluZ3MgYW5kIGVuZCBvZiBsaW5lcyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBzbWcgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6ICdmb28uanMnXHJcbiAgfSk7XHJcbiAgc21nLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBzb3VyY2U6ICdiYXIuanMnXHJcbiAgfSk7XHJcbiAgc21nLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6ICdiYXIuanMnXHJcbiAgfSk7XHJcbiAgc21nLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBzb3VyY2U6ICdiYXouanMnXHJcbiAgfSk7XHJcblxyXG4gIHZhciBtYXAgPSBTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwKHNtZyk7XHJcblxyXG4gIC8vIFdoZW4gZmluZGluZyBvcmlnaW5hbCBwb3NpdGlvbnMsIG1hcHBpbmdzIGVuZCBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lLlxyXG4gIHV0aWwuYXNzZXJ0TWFwcGluZygyLCAxLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBtYXAsIGFzc2VydCwgdHJ1ZSlcclxuXHJcbiAgLy8gV2hlbiBmaW5kaW5nIGdlbmVyYXRlZCBwb3NpdGlvbnMsIG1hcHBpbmdzIGRvIG5vdCBlbmQgYXQgdGhlIGVuZCBvZiB0aGUgbGluZS5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcoMSwgMSwgJ2Jhci5qcycsIDIsIDEsIG51bGwsIG51bGwsIG1hcCwgYXNzZXJ0LCBudWxsLCB0cnVlKTtcclxuXHJcbiAgLy8gV2hlbiBmaW5kaW5nIGdlbmVyYXRlZCBwb3NpdGlvbnMgd2l0aCwgbWFwcGluZ3MgZW5kIGF0IHRoZSBlbmQgb2YgdGhlIHNvdXJjZS5cclxuICB1dGlsLmFzc2VydE1hcHBpbmcobnVsbCwgbnVsbCwgJ2Jhci5qcycsIDMsIDEsIG51bGwsIFNvdXJjZU1hcENvbnN1bWVyLkxFQVNUX1VQUEVSX0JPVU5ELCBtYXAsIGFzc2VydCwgbnVsbCwgdHJ1ZSk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGNyZWF0aW5nIHNvdXJjZSBtYXAgY29uc3VtZXJzIHdpdGggKV19XFwnIHByZWZpeCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIGFzc2VydC5kb2VzTm90VGhyb3coZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihcIildfSdcXG5cIiArIEpTT04uc3RyaW5naWZ5KHV0aWwudGVzdE1hcCkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBlYWNoTWFwcGluZyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXA7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG4gIHZhciBwcmV2aW91c0xpbmUgPSAtSW5maW5pdHk7XHJcbiAgdmFyIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gIG1hcC5lYWNoTWFwcGluZyhmdW5jdGlvbiAobWFwcGluZykge1xyXG4gICAgYXNzZXJ0Lm9rKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA+PSBwcmV2aW91c0xpbmUpO1xyXG5cclxuICAgIGFzc2VydC5vayhtYXBwaW5nLnNvdXJjZSA9PT0gJy90aGUvcm9vdC9vbmUuanMnIHx8IG1hcHBpbmcuc291cmNlID09PSAnL3RoZS9yb290L3R3by5qcycpO1xyXG5cclxuICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgPT09IHByZXZpb3VzTGluZSkge1xyXG4gICAgICBhc3NlcnQub2sobWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gPj0gcHJldmlvdXNDb2x1bW4pO1xyXG4gICAgICBwcmV2aW91c0NvbHVtbiA9IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHByZXZpb3VzTGluZSA9IG1hcHBpbmcuZ2VuZXJhdGVkTGluZTtcclxuICAgICAgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBOb1NvdXJjZVJvb3QpO1xyXG4gIG1hcC5lYWNoTWFwcGluZyhmdW5jdGlvbiAobWFwcGluZykge1xyXG4gICAgYXNzZXJ0Lm9rKG1hcHBpbmcuc291cmNlID09PSAnb25lLmpzJyB8fCBtYXBwaW5nLnNvdXJjZSA9PT0gJ3R3by5qcycpO1xyXG4gIH0pO1xyXG5cclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwRW1wdHlTb3VyY2VSb290KTtcclxuICBtYXAuZWFjaE1hcHBpbmcoZnVuY3Rpb24gKG1hcHBpbmcpIHtcclxuICAgIGFzc2VydC5vayhtYXBwaW5nLnNvdXJjZSA9PT0gJ29uZS5qcycgfHwgbWFwcGluZy5zb3VyY2UgPT09ICd0d28uanMnKTtcclxuICB9KTtcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwubWFwV2l0aFNvdXJjZWxlc3NNYXBwaW5nKTtcclxuICBtYXAuZWFjaE1hcHBpbmcoZnVuY3Rpb24gKG1hcHBpbmcpIHtcclxuICAgIGFzc2VydC5vayhtYXBwaW5nLnNvdXJjZSA9PT0gbnVsbCB8fCAodHlwZW9mIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gJ251bWJlcicpKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgZWFjaE1hcHBpbmcgZm9yIGluZGV4ZWQgc291cmNlIG1hcHMnXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCk7XHJcbiAgdmFyIHByZXZpb3VzTGluZSA9IC1JbmZpbml0eTtcclxuICB2YXIgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uIChtYXBwaW5nKSB7XHJcbiAgICBhc3NlcnQub2sobWFwcGluZy5nZW5lcmF0ZWRMaW5lID49IHByZXZpb3VzTGluZSk7XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlKSB7XHJcbiAgICAgIGFzc2VydC5lcXVhbChtYXBwaW5nLnNvdXJjZS5pbmRleE9mKHV0aWwudGVzdE1hcC5zb3VyY2VSb290KSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9PT0gcHJldmlvdXNMaW5lKSB7XHJcbiAgICAgIGFzc2VydC5vayhtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA+PSBwcmV2aW91c0NvbHVtbik7XHJcbiAgICAgIHByZXZpb3VzQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcHJldmlvdXNMaW5lID0gbWFwcGluZy5nZW5lcmF0ZWRMaW5lO1xyXG4gICAgICBwcmV2aW91c0NvbHVtbiA9IC1JbmZpbml0eTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcblxyXG5leHBvcnRzWyd0ZXN0IGl0ZXJhdGluZyBvdmVyIG1hcHBpbmdzIGluIGEgZGlmZmVyZW50IG9yZGVyJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApO1xyXG4gIHZhciBwcmV2aW91c0xpbmUgPSAtSW5maW5pdHk7XHJcbiAgdmFyIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gIHZhciBwcmV2aW91c1NvdXJjZSA9IFwiXCI7XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uIChtYXBwaW5nKSB7XHJcbiAgICBhc3NlcnQub2sobWFwcGluZy5zb3VyY2UgPj0gcHJldmlvdXNTb3VyY2UpO1xyXG5cclxuICAgIGlmIChtYXBwaW5nLnNvdXJjZSA9PT0gcHJldmlvdXNTb3VyY2UpIHtcclxuICAgICAgYXNzZXJ0Lm9rKG1hcHBpbmcub3JpZ2luYWxMaW5lID49IHByZXZpb3VzTGluZSk7XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5vcmlnaW5hbExpbmUgPT09IHByZXZpb3VzTGluZSkge1xyXG4gICAgICAgIGFzc2VydC5vayhtYXBwaW5nLm9yaWdpbmFsQ29sdW1uID49IHByZXZpb3VzQ29sdW1uKTtcclxuICAgICAgICBwcmV2aW91c0NvbHVtbiA9IG1hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcHJldmlvdXNMaW5lID0gbWFwcGluZy5vcmlnaW5hbExpbmU7XHJcbiAgICAgICAgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBwcmV2aW91c1NvdXJjZSA9IG1hcHBpbmcuc291cmNlO1xyXG4gICAgICBwcmV2aW91c0xpbmUgPSAtSW5maW5pdHk7XHJcbiAgICAgIHByZXZpb3VzQ29sdW1uID0gLUluZmluaXR5O1xyXG4gICAgfVxyXG4gIH0sIG51bGwsIFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgaXRlcmF0aW5nIG92ZXIgbWFwcGluZ3MgaW4gYSBkaWZmZXJlbnQgb3JkZXIgaW4gaW5kZXhlZCBzb3VyY2UgbWFwcyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCk7XHJcbiAgdmFyIHByZXZpb3VzTGluZSA9IC1JbmZpbml0eTtcclxuICB2YXIgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgdmFyIHByZXZpb3VzU291cmNlID0gXCJcIjtcclxuICBtYXAuZWFjaE1hcHBpbmcoZnVuY3Rpb24gKG1hcHBpbmcpIHtcclxuICAgIGFzc2VydC5vayhtYXBwaW5nLnNvdXJjZSA+PSBwcmV2aW91c1NvdXJjZSk7XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlID09PSBwcmV2aW91c1NvdXJjZSkge1xyXG4gICAgICBhc3NlcnQub2sobWFwcGluZy5vcmlnaW5hbExpbmUgPj0gcHJldmlvdXNMaW5lKTtcclxuXHJcbiAgICAgIGlmIChtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gcHJldmlvdXNMaW5lKSB7XHJcbiAgICAgICAgYXNzZXJ0Lm9rKG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPj0gcHJldmlvdXNDb2x1bW4pO1xyXG4gICAgICAgIHByZXZpb3VzQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBwcmV2aW91c0xpbmUgPSBtYXBwaW5nLm9yaWdpbmFsTGluZTtcclxuICAgICAgICBwcmV2aW91c0NvbHVtbiA9IC1JbmZpbml0eTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHByZXZpb3VzU291cmNlID0gbWFwcGluZy5zb3VyY2U7XHJcbiAgICAgIHByZXZpb3VzTGluZSA9IC1JbmZpbml0eTtcclxuICAgICAgcHJldmlvdXNDb2x1bW4gPSAtSW5maW5pdHk7XHJcbiAgICB9XHJcbiAgfSwgbnVsbCwgU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCB0aGF0IHdlIGNhbiBzZXQgdGhlIGNvbnRleHQgZm9yIGB0aGlzYCBpbiBlYWNoTWFwcGluZyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwKTtcclxuICB2YXIgY29udGV4dCA9IHt9O1xyXG4gIG1hcC5lYWNoTWFwcGluZyhmdW5jdGlvbiAoKSB7XHJcbiAgICBhc3NlcnQuZXF1YWwodGhpcywgY29udGV4dCk7XHJcbiAgfSwgY29udGV4dCk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHRoYXQgd2UgY2FuIHNldCB0aGUgY29udGV4dCBmb3IgYHRoaXNgIGluIGVhY2hNYXBwaW5nIGluIGluZGV4ZWQgc291cmNlIG1hcHMnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwuaW5kZXhlZFRlc3RNYXApO1xyXG4gIHZhciBjb250ZXh0ID0ge307XHJcbiAgbWFwLmVhY2hNYXBwaW5nKGZ1bmN0aW9uICgpIHtcclxuICAgIGFzc2VydC5lcXVhbCh0aGlzLCBjb250ZXh0KTtcclxuICB9LCBjb250ZXh0KTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgdGhhdCB0aGUgYHNvdXJjZXNDb250ZW50YCBmaWVsZCBoYXMgdGhlIG9yaWdpbmFsIHNvdXJjZXMnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHV0aWwudGVzdE1hcFdpdGhTb3VyY2VzQ29udGVudCk7XHJcbiAgdmFyIHNvdXJjZXNDb250ZW50ID0gbWFwLnNvdXJjZXNDb250ZW50O1xyXG5cclxuICBhc3NlcnQuZXF1YWwoc291cmNlc0NvbnRlbnRbMF0sICcgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4gICByZXR1cm4gYmF6KGJhcik7XFxuIH07Jyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNDb250ZW50WzFdLCAnIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcbiAgIHJldHVybiBuICsgMTtcXG4gfTsnKTtcclxuICBhc3NlcnQuZXF1YWwoc291cmNlc0NvbnRlbnQubGVuZ3RoLCAyKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgdGhhdCB3ZSBjYW4gZ2V0IHRoZSBvcmlnaW5hbCBzb3VyY2VzIGZvciB0aGUgc291cmNlcyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC50ZXN0TWFwV2l0aFNvdXJjZXNDb250ZW50KTtcclxuICB2YXIgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1swXSksICcgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4gICByZXR1cm4gYmF6KGJhcik7XFxuIH07Jyk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZXNbMV0pLCAnIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcbiAgIHJldHVybiBuICsgMTtcXG4gfTsnKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJvbmUuanNcIiksICcgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4gICByZXR1cm4gYmF6KGJhcik7XFxuIH07Jyk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidHdvLmpzXCIpLCAnIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcbiAgIHJldHVybiBuICsgMTtcXG4gfTsnKTtcclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uICgpIHtcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwiXCIpO1xyXG4gIH0sIEVycm9yKTtcclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uICgpIHtcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwiL3RoZS9yb290L3RocmVlLmpzXCIpO1xyXG4gIH0sIEVycm9yKTtcclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uICgpIHtcclxuICAgIG1hcC5zb3VyY2VDb250ZW50Rm9yKFwidGhyZWUuanNcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCB0aGF0IHdlIGNhbiBnZXQgdGhlIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50IHdpdGggcmVsYXRpdmUgc291cmNlIHBhdGhzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXBSZWxhdGl2ZVNvdXJjZXMpO1xyXG4gIHZhciBzb3VyY2VzID0gbWFwLnNvdXJjZXM7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcihzb3VyY2VzWzBdKSwgJyBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbiAgIHJldHVybiBiYXooYmFyKTtcXG4gfTsnKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLnNvdXJjZUNvbnRlbnRGb3Ioc291cmNlc1sxXSksICcgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuICAgcmV0dXJuIG4gKyAxO1xcbiB9OycpO1xyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcihcIm9uZS5qc1wiKSwgJyBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbiAgIHJldHVybiBiYXooYmFyKTtcXG4gfTsnKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJ0d28uanNcIiksICcgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuICAgcmV0dXJuIG4gKyAxO1xcbiB9OycpO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24gKCkge1xyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24gKCkge1xyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3IoXCIvdGhlL3Jvb3QvdGhyZWUuanNcIik7XHJcbiAgfSwgRXJyb3IpO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24gKCkge1xyXG4gICAgbWFwLnNvdXJjZUNvbnRlbnRGb3IoXCJ0aHJlZS5qc1wiKTtcclxuICB9LCBFcnJvcik7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHRoYXQgd2UgY2FuIGdldCB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQgZm9yIHRoZSBzb3VyY2VzIG9uIGFuIGluZGV4ZWQgc291cmNlIG1hcCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5pbmRleGVkVGVzdE1hcCk7XHJcbiAgdmFyIHNvdXJjZXMgPSBtYXAuc291cmNlcztcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZXNbMF0pLCAnIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuICAgcmV0dXJuIGJheihiYXIpO1xcbiB9OycpO1xyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcihzb3VyY2VzWzFdKSwgJyBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4gICByZXR1cm4gbiArIDE7XFxuIH07Jyk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKFwib25lLmpzXCIpLCAnIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuICAgcmV0dXJuIGJheihiYXIpO1xcbiB9OycpO1xyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcihcInR3by5qc1wiKSwgJyBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4gICByZXR1cm4gbiArIDE7XFxuIH07Jyk7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbiAoKSB7XHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcIlwiKTtcclxuICB9LCBFcnJvcik7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbiAoKSB7XHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcIi90aGUvcm9vdC90aHJlZS5qc1wiKTtcclxuICB9LCBFcnJvcik7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbiAoKSB7XHJcbiAgICBtYXAuc291cmNlQ29udGVudEZvcihcInRocmVlLmpzXCIpO1xyXG4gIH0sIEVycm9yKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgaGFzQ29udGVudHNPZkFsbFNvdXJjZXMsIHNpbmdsZSBzb3VyY2Ugd2l0aCBjb250ZW50cyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIC8vIEhhcyBvbmUgc291cmNlOiBmb28uanMgKHdpdGggY29udGVudHMpLlxyXG4gIHZhciBtYXBXaXRoQ29udGVudHMgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKCk7XHJcbiAgbWFwV2l0aENvbnRlbnRzLmFkZE1hcHBpbmcoeyBzb3VyY2U6ICdmb28uanMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDEsIGNvbHVtbjogMTAgfSB9KTtcclxuICBtYXBXaXRoQ29udGVudHMuc2V0U291cmNlQ29udGVudCgnZm9vLmpzJywgJ2NvbnRlbnQgb2YgZm9vLmpzJyk7XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcFdpdGhDb250ZW50cy50b0pTT04oKSk7XHJcbiAgYXNzZXJ0Lm9rKGNvbnN1bWVyLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCkpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBoYXNDb250ZW50c09mQWxsU291cmNlcywgc2luZ2xlIHNvdXJjZSB3aXRob3V0IGNvbnRlbnRzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgLy8gSGFzIG9uZSBzb3VyY2U6IGZvby5qcyAod2l0aG91dCBjb250ZW50cykuXHJcbiAgdmFyIG1hcFdpdGhvdXRDb250ZW50cyA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoKTtcclxuICBtYXBXaXRob3V0Q29udGVudHMuYWRkTWFwcGluZyh7IHNvdXJjZTogJ2Zvby5qcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9IH0pO1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXBXaXRob3V0Q29udGVudHMudG9KU09OKCkpO1xyXG4gIGFzc2VydC5vayghY29uc3VtZXIuaGFzQ29udGVudHNPZkFsbFNvdXJjZXMoKSk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzLCB0d28gc291cmNlcyB3aXRoIGNvbnRlbnRzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgLy8gSGFzIHR3byBzb3VyY2VzOiBmb28uanMgKHdpdGggY29udGVudHMpIGFuZCBiYXIuanMgKHdpdGggY29udGVudHMpLlxyXG4gIHZhciBtYXBXaXRoQm90aENvbnRlbnRzID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcigpO1xyXG4gIG1hcFdpdGhCb3RoQ29udGVudHMuYWRkTWFwcGluZyh7IHNvdXJjZTogJ2Zvby5qcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0gfSk7XHJcbiAgbWFwV2l0aEJvdGhDb250ZW50cy5hZGRNYXBwaW5nKHsgc291cmNlOiAnYmFyLmpzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDEsIGNvbHVtbjogMTAgfSB9KTtcclxuICBtYXBXaXRoQm90aENvbnRlbnRzLnNldFNvdXJjZUNvbnRlbnQoJ2Zvby5qcycsICdjb250ZW50IG9mIGZvby5qcycpO1xyXG4gIG1hcFdpdGhCb3RoQ29udGVudHMuc2V0U291cmNlQ29udGVudCgnYmFyLmpzJywgJ2NvbnRlbnQgb2YgYmFyLmpzJyk7XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcFdpdGhCb3RoQ29udGVudHMudG9KU09OKCkpO1xyXG4gIGFzc2VydC5vayhjb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgaGFzQ29udGVudHNPZkFsbFNvdXJjZXMsIHR3byBzb3VyY2VzIG9uZSB3aXRoIGFuZCBvbmUgd2l0aG91dCBjb250ZW50cyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIC8vIEhhcyB0d28gc291cmNlczogZm9vLmpzICh3aXRoIGNvbnRlbnRzKSBhbmQgYmFyLmpzICh3aXRob3V0IGNvbnRlbnRzKS5cclxuICB2YXIgbWFwV2l0aG91dFNvbWVDb250ZW50cyA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoKTtcclxuICBtYXBXaXRob3V0U29tZUNvbnRlbnRzLmFkZE1hcHBpbmcoeyBzb3VyY2U6ICdmb28uanMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMTAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9IH0pO1xyXG4gIG1hcFdpdGhvdXRTb21lQ29udGVudHMuYWRkTWFwcGluZyh7IHNvdXJjZTogJ2Jhci5qcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDEwIH0gfSk7XHJcbiAgbWFwV2l0aG91dFNvbWVDb250ZW50cy5zZXRTb3VyY2VDb250ZW50KCdmb28uanMnLCAnY29udGVudCBvZiBmb28uanMnKTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwV2l0aG91dFNvbWVDb250ZW50cy50b0pTT04oKSk7XHJcbiAgYXNzZXJ0Lm9rKCFjb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgc291cmNlUm9vdCArIGdlbmVyYXRlZFBvc2l0aW9uRm9yJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgc291cmNlUm9vdDogJ2Zvby9iYXInLFxyXG4gICAgZmlsZTogJ2Jhei5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2JhbmcuY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDUsIGNvbHVtbjogNSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDYsIGNvbHVtbjogNiB9LFxyXG4gICAgc291cmNlOiAnYmFuZy5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpLCAnaHR0cDovL2V4YW1wbGUuY29tLycpO1xyXG5cclxuICAvLyBTaG91bGQgaGFuZGxlIHdpdGhvdXQgc291cmNlUm9vdC5cclxuICB2YXIgcG9zID0gbWFwLmdlbmVyYXRlZFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDEsXHJcbiAgICBzb3VyY2U6ICdiYW5nLmNvZmZlZSdcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAyKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMik7XHJcblxyXG4gIC8vIFNob3VsZCBoYW5kbGUgd2l0aCBzb3VyY2VSb290LlxyXG4gIHZhciBwb3MgPSBtYXAuZ2VuZXJhdGVkUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMSxcclxuICAgIHNvdXJjZTogJ2Zvby9iYXIvYmFuZy5jb2ZmZWUnXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDIpO1xyXG5cclxuICAvLyBTaG91bGQgaGFuZGxlIGFic29sdXRlIGNhc2UuXHJcbiAgdmFyIHBvcyA9IG1hcC5nZW5lcmF0ZWRQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAxLFxyXG4gICAgc291cmNlOiAnaHR0cDovL2V4YW1wbGUuY29tL2Zvby9iYXIvYmFuZy5jb2ZmZWUnXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBzb3VyY2VSb290ICsgZ2VuZXJhdGVkUG9zaXRpb25Gb3IgZm9yIHBhdGggYWJvdmUgdGhlIHJvb3QnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBzb3VyY2VSb290OiAnZm9vL2JhcicsXHJcbiAgICBmaWxlOiAnYmF6LmpzJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiAnLi4vYmFuZy5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgLy8gU2hvdWxkIGhhbmRsZSB3aXRoIHNvdXJjZVJvb3QuXHJcbiAgdmFyIHBvcyA9IG1hcC5nZW5lcmF0ZWRQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAxLFxyXG4gICAgc291cmNlOiAnZm9vL2JhbmcuY29mZmVlJ1xyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAyKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yIGZvciBsaW5lJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogJ2dlbmVyYXRlZC5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6ICdiYXIuY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDIsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiAnYmFyLmNvZmZlZSdcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAzLCBjb2x1bW46IDMgfSxcclxuICAgIHNvdXJjZTogJ2Jhci5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMywgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogNCwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6ICdiYXIuY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSwgJ2h0dHA6Ly9leGFtcGxlLmNvbS8nKTtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gbWFwLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0Zvcih7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgc291cmNlOiAnYmFyLmNvZmZlZSdcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzLmxlbmd0aCwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmxpbmUsIDMpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5jb2x1bW4sIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1sxXS5saW5lLCAzKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0uY29sdW1uLCAzKTtcclxuXHJcbiAgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBzb3VyY2U6ICdodHRwOi8vZXhhbXBsZS5jb20vYmFyLmNvZmZlZSdcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzLmxlbmd0aCwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmxpbmUsIDMpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5jb2x1bW4sIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1sxXS5saW5lLCAzKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0uY29sdW1uLCAzKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yIGZvciBsaW5lIGZ1enp5J10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogJ2dlbmVyYXRlZC5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6ICdiYXIuY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDMsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDQsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiAnYmFyLmNvZmZlZSdcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCkpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBzb3VyY2U6ICdiYXIuY29mZmVlJ1xyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGluZSwgNCk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzBdLmNvbHVtbiwgMik7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciBmb3IgZW1wdHkgc291cmNlIG1hcCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6ICdnZW5lcmF0ZWQuanMnXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gbWFwLmFsbEdlbmVyYXRlZFBvc2l0aW9uc0Zvcih7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgc291cmNlOiAnYmFyLmNvZmZlZSdcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzLmxlbmd0aCwgMCk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciBmb3IgY29sdW1uJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogJ2dlbmVyYXRlZC5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAzIH0sXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IG1hcC5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uY29sdW1uLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0ubGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmNvbHVtbiwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciBmb3IgY29sdW1uIGZ1enp5J10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogJ2dlbmVyYXRlZC5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAxLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAzIH0sXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IG1hcC5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMCxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5nc1swXS5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0uY29sdW1uLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMV0ubGluZSwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmNvbHVtbiwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGFsbEdlbmVyYXRlZFBvc2l0aW9uc0ZvciBmb3IgY29sdW1uIG9uIGRpZmZlcmVudCBsaW5lIGZ1enp5J10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogJ2dlbmVyYXRlZC5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAzIH0sXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIHZhciBtYXBwaW5ncyA9IG1hcC5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogMCxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChtYXBwaW5ncy5sZW5ndGgsIDApO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBjb21wdXRlQ29sdW1uU3BhbnMnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBmaWxlOiAnZ2VuZXJhdGVkLmpzJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgc291cmNlOiAnZm9vLmNvZmZlZSdcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDEgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAxMCB9LFxyXG4gICAgc291cmNlOiAnZm9vLmNvZmZlZSdcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDMgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIwIH0sXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDMsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogMSB9LFxyXG4gICAgc291cmNlOiAnZm9vLmNvZmZlZSdcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAzLCBjb2x1bW46IDIgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAzLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Zvby5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgbWFwLmNvbXB1dGVDb2x1bW5TcGFucygpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGFzdENvbHVtbiwgSW5maW5pdHkpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAzKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGFzdENvbHVtbiwgOSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmxhc3RDb2x1bW4sIDE5KTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMl0ubGFzdENvbHVtbiwgSW5maW5pdHkpO1xyXG5cclxuICB2YXIgbWFwcGluZ3MgPSBtYXAuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKHtcclxuICAgIGxpbmU6IDMsXHJcbiAgICBzb3VyY2U6ICdmb28uY29mZmVlJ1xyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3MubGVuZ3RoLCAyKTtcclxuICBhc3NlcnQuZXF1YWwobWFwcGluZ3NbMF0ubGFzdENvbHVtbiwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcHBpbmdzWzFdLmxhc3RDb2x1bW4sIEluZmluaXR5KTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgc291cmNlUm9vdCArIG9yaWdpbmFsUG9zaXRpb25Gb3InXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBzb3VyY2VSb290OiAnZm9vL2JhcicsXHJcbiAgICBmaWxlOiAnYmF6LmpzJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiAnYmFuZy5jb2ZmZWUnXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFNob3VsZCBhbHdheXMgaGF2ZSB0aGUgcHJlcGVuZGVkIHNvdXJjZSByb290XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5zb3VyY2UsICdmb28vYmFyL2JhbmcuY29mZmVlJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMSk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGdpdGh1YiBpc3N1ZSAjNTYnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBzb3VyY2VSb290OiAnaHR0cDovLycsXHJcbiAgICBmaWxlOiAnd3d3LmV4YW1wbGUuY29tL2Zvby5qcydcclxuICB9KTtcclxuICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ3d3dy5leGFtcGxlLmNvbS9vcmlnaW5hbC5qcydcclxuICB9KTtcclxuICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLnRvU3RyaW5nKCkpO1xyXG5cclxuICB2YXIgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMF0sICdodHRwOi8vd3d3LmV4YW1wbGUuY29tL29yaWdpbmFsLmpzJyk7XHJcbn07XHJcblxyXG4vLyBXYXMgZ2l0aHViIGlzc3VlICM0MywgYnV0IHRoYXQncyBubyBsb25nZXIgdmFsaWQuXHJcbmV4cG9ydHNbJ3Rlc3Qgc291cmNlIHJlc29sdXRpb24gd2l0aCBzb3VyY2VNYXBVUkwnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBzb3VyY2VSb290OiAnJyxcclxuICAgIGZpbGU6ICdmb28uanMnXHJcbiAgfSk7XHJcbiAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAxIH0sXHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6ICdvcmlnaW5hbC5qcycsXHJcbiAgfSk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpLCAnaHR0cDovL2Nkbi5leGFtcGxlLmNvbScpO1xyXG5cclxuICB2YXIgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChzb3VyY2VzLmxlbmd0aCwgMSxcclxuICAgICAgICAgICAgICAgJ1Nob3VsZCBvbmx5IGJlIG9uZSBzb3VyY2UuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXNbMF0sICdodHRwOi8vY2RuLmV4YW1wbGUuY29tL29yaWdpbmFsLmpzJyxcclxuICAgICAgICAgICAgICAgJ1Nob3VsZCBiZSBqb2luZWQgd2l0aCB0aGUgc291cmNlIG1hcCBVUkwuJyk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHNvdXJjZVJvb3QgcHJlcGVuZGluZyddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIHNvdXJjZVJvb3Q6ICdodHRwOi8vZXhhbXBsZS5jb20vZm9vL2JhcicsXHJcbiAgICBmaWxlOiAnZm9vLmpzJ1xyXG4gIH0pO1xyXG4gIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9LFxyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9LFxyXG4gICAgc291cmNlOiAnL29yaWdpbmFsLmpzJ1xyXG4gIH0pO1xyXG4gIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAudG9TdHJpbmcoKSk7XHJcblxyXG4gIHZhciBzb3VyY2VzID0gbWFwLnNvdXJjZXM7XHJcbiAgYXNzZXJ0LmVxdWFsKHNvdXJjZXMubGVuZ3RoLCAxLFxyXG4gICAgICAgICAgICAgICAnU2hvdWxkIG9ubHkgYmUgb25lIHNvdXJjZS4nKTtcclxuICBhc3NlcnQuZXF1YWwoc291cmNlc1swXSwgJ2h0dHA6Ly9leGFtcGxlLmNvbS9mb28vYmFyL29yaWdpbmFsLmpzJyxcclxuICAgICAgICAgICAgICAgJ1NvdXJjZSBpbmNsdWRlIHRoZSBzb3VyY2Ugcm9vdC4nKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgaW5kZXhlZCBzb3VyY2UgbWFwIGVycm9ycyB3aGVuIHNlY3Rpb25zIGFyZSBvdXQgb2Ygb3JkZXIgYnkgbGluZSddID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgLy8gTWFrZSBhIGRlZXAgY29weSBvZiB0aGUgaW5kZXhlZFRlc3RNYXBcclxuICB2YXIgbWlzb3JkZXJlZEluZGV4ZWRUZXN0TWFwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh1dGlsLmluZGV4ZWRUZXN0TWFwKSk7XHJcblxyXG4gIG1pc29yZGVyZWRJbmRleGVkVGVzdE1hcC5zZWN0aW9uc1swXS5vZmZzZXQgPSB7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgY29sdW1uOiAwXHJcbiAgfTtcclxuXHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcclxuICAgIG5ldyBTb3VyY2VNYXBDb25zdW1lcihtaXNvcmRlcmVkSW5kZXhlZFRlc3RNYXApO1xyXG4gIH0sIEVycm9yKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgZ2l0aHViIGlzc3VlICM2NCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIoe1xyXG4gICAgXCJ2ZXJzaW9uXCI6IDMsXHJcbiAgICBcImZpbGVcIjogXCJmb28uanNcIixcclxuICAgIFwic291cmNlUm9vdFwiOiBcImh0dHA6Ly9leGFtcGxlLmNvbS9cIixcclxuICAgIFwic291cmNlc1wiOiBbXCIvYVwiXSxcclxuICAgIFwibmFtZXNcIjogW10sXHJcbiAgICBcIm1hcHBpbmdzXCI6IFwiQUFDQVwiLFxyXG4gICAgXCJzb3VyY2VzQ29udGVudFwiOiBbXCJmb29cIl1cclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKFwiYVwiKSwgXCJmb29cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKFwiL2FcIiksIFwiZm9vXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBmdWxsIHNvdXJjZSBjb250ZW50IHdpdGggc291cmNlTWFwVVJMJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih7XHJcbiAgICAndmVyc2lvbic6IDMsXHJcbiAgICAnZmlsZSc6ICdmb28uanMnLFxyXG4gICAgJ3NvdXJjZVJvb3QnOiAnJyxcclxuICAgICdzb3VyY2VzJzogWydvcmlnaW5hbC5qcyddLFxyXG4gICAgJ25hbWVzJzogW10sXHJcbiAgICAnbWFwcGluZ3MnOiAnQUFDQScsXHJcbiAgICAnc291cmNlc0NvbnRlbnQnOiBbJ3llbGxvdyB3YXJibGVyJ11cclxuICB9LCAnaHR0cDovL2Nkbi5leGFtcGxlLmNvbScpO1xyXG5cclxuICB2YXIgc291cmNlcyA9IG1hcC5zb3VyY2VzO1xyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlQ29udGVudEZvcignaHR0cDovL2Nkbi5leGFtcGxlLmNvbS9vcmlnaW5hbC5qcycpLCAneWVsbG93IHdhcmJsZXInLFxyXG4gICAgICAgICAgICAgICAnU291cmNlIGNvbnRlbnQgc2hvdWxkIGJlIGZvdW5kIHVzaW5nIGZ1bGwgVVJMJyk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGJ1ZyA4ODU1OTcnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHtcclxuICAgIFwidmVyc2lvblwiOiAzLFxyXG4gICAgXCJmaWxlXCI6IFwiZm9vLmpzXCIsXHJcbiAgICBcInNvdXJjZVJvb3RcIjogXCJmaWxlOi8vL1VzZXJzL0FsR29yZS9JbnZlbnRlZC9UaGUvSW50ZXJuZXQvXCIsXHJcbiAgICBcInNvdXJjZXNcIjogW1wiL2FcIl0sXHJcbiAgICBcIm5hbWVzXCI6IFtdLFxyXG4gICAgXCJtYXBwaW5nc1wiOiBcIkFBQ0FcIixcclxuICAgIFwic291cmNlc0NvbnRlbnRcIjogW1wiZm9vXCJdXHJcbiAgfSk7XHJcblxyXG4gIHZhciBzID0gbWFwLnNvdXJjZXNbMF07XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VDb250ZW50Rm9yKHMpLCBcImZvb1wiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgZ2l0aHViIGlzc3VlICM3MiwgZHVwbGljYXRlIHNvdXJjZXMnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHtcclxuICAgIFwidmVyc2lvblwiOiAzLFxyXG4gICAgXCJmaWxlXCI6IFwiZm9vLmpzXCIsXHJcbiAgICBcInNvdXJjZXNcIjogW1wic291cmNlMS5qc1wiLCBcInNvdXJjZTEuanNcIiwgXCJzb3VyY2UzLmpzXCJdLFxyXG4gICAgXCJuYW1lc1wiOiBbXSxcclxuICAgIFwibWFwcGluZ3NcIjogXCI7RUFBQzs7SUFFRTs7TUVFRVwiLFxyXG4gICAgXCJzb3VyY2VSb290XCI6IFwiaHR0cDovL2V4YW1wbGUuY29tXCJcclxuICB9KTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDIsXHJcbiAgICBjb2x1bW46IDJcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLnNvdXJjZSwgJ2h0dHA6Ly9leGFtcGxlLmNvbS9zb3VyY2UxLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMSk7XHJcblxyXG4gIHZhciBwb3MgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiA0LFxyXG4gICAgY29sdW1uOiA0XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5zb3VyY2UsICdodHRwOi8vZXhhbXBsZS5jb20vc291cmNlMS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDMpO1xyXG5cclxuICB2YXIgcG9zID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogNixcclxuICAgIGNvbHVtbjogNlxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChwb3Muc291cmNlLCAnaHR0cDovL2V4YW1wbGUuY29tL3NvdXJjZTMuanMnKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDUpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCA1KTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgZ2l0aHViIGlzc3VlICM3MiwgZHVwbGljYXRlIG5hbWVzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIG1hcCA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih7XHJcbiAgICBcInZlcnNpb25cIjogMyxcclxuICAgIFwiZmlsZVwiOiBcImZvby5qc1wiLFxyXG4gICAgXCJzb3VyY2VzXCI6IFtcInNvdXJjZS5qc1wiXSxcclxuICAgIFwibmFtZXNcIjogW1wibmFtZTFcIiwgXCJuYW1lMVwiLCBcIm5hbWUzXCJdLFxyXG4gICAgXCJtYXBwaW5nc1wiOiBcIjtFQUFDQTs7SUFFRUE7O01BRUVFXCIsXHJcbiAgICBcInNvdXJjZVJvb3RcIjogXCJodHRwOi8vZXhhbXBsZS5jb21cIlxyXG4gIH0pO1xyXG5cclxuICB2YXIgcG9zID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMlxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubmFtZSwgJ25hbWUxJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMSk7XHJcblxyXG4gIHZhciBwb3MgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiA0LFxyXG4gICAgY29sdW1uOiA0XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCAnbmFtZTEnKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmxpbmUsIDMpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MuY29sdW1uLCAzKTtcclxuXHJcbiAgdmFyIHBvcyA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDYsXHJcbiAgICBjb2x1bW46IDZcclxuICB9KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLm5hbWUsICduYW1lMycpO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgNSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDUpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIHNtZyA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgc291cmNlUm9vdDogJ2h0dHA6Ly9leGFtcGxlLmNvbS8nLFxyXG4gICAgZmlsZTogJ2Zvby5qcydcclxuICB9KTtcclxuICBzbWcuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIHNvdXJjZTogJ2Jhci5qcydcclxuICB9KTtcclxuICBzbWcuYWRkTWFwcGluZyh7XHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfSxcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiA0LCBjb2x1bW46IDQgfSxcclxuICAgIHNvdXJjZTogJ2Jhei5qcycsXHJcbiAgICBuYW1lOiAnZGlydE1jR2lydCdcclxuICB9KTtcclxuICBzbWcuc2V0U291cmNlQ29udGVudCgnYmF6LmpzJywgJ2Jhei5qcyBjb250ZW50Jyk7XHJcblxyXG4gIHZhciBzbWMgPSBTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwKHNtZyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5maWxlLCAnZm9vLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VSb290LCAnaHR0cDovL2V4YW1wbGUuY29tLycpO1xyXG4gIGFzc2VydC5lcXVhbChzbWMuc291cmNlcy5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChzbWMuc291cmNlc1swXSwgJ2h0dHA6Ly9leGFtcGxlLmNvbS9iYXIuanMnKTtcclxuICBhc3NlcnQuZXF1YWwoc21jLnNvdXJjZXNbMV0sICdodHRwOi8vZXhhbXBsZS5jb20vYmF6LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHNtYy5zb3VyY2VDb250ZW50Rm9yKCdiYXouanMnKSwgJ2Jhei5qcyBjb250ZW50Jyk7XHJcblxyXG4gIHZhciBwb3MgPSBzbWMub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiAyLFxyXG4gICAgY29sdW1uOiAyXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5zb3VyY2UsICdodHRwOi8vZXhhbXBsZS5jb20vYmFyLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCBudWxsKTtcclxuXHJcbiAgcG9zID0gc21jLmdlbmVyYXRlZFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDEsXHJcbiAgICBjb2x1bW46IDEsXHJcbiAgICBzb3VyY2U6ICdodHRwOi8vZXhhbXBsZS5jb20vYmFyLmpzJ1xyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChwb3MubGluZSwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5jb2x1bW4sIDIpO1xyXG5cclxuICBwb3MgPSBzbWMub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiA0LFxyXG4gICAgY29sdW1uOiA0XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCAyKTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5zb3VyY2UsICdodHRwOi8vZXhhbXBsZS5jb20vYmF6LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5uYW1lLCAnZGlydE1jR2lydCcpO1xyXG5cclxuICBwb3MgPSBzbWMuZ2VuZXJhdGVkUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMixcclxuICAgIHNvdXJjZTogJ2h0dHA6Ly9leGFtcGxlLmNvbS9iYXouanMnXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBvcy5saW5lLCA0KTtcclxuICBhc3NlcnQuZXF1YWwocG9zLmNvbHVtbiwgNCk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGlzc3VlICMxOTEnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgZ2VuZXJhdG9yID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6ICdhLmNzcycgfSk7XHJcbiAgZ2VuZXJhdG9yLmFkZE1hcHBpbmcoe1xyXG4gICAgc291cmNlOiAgICdiLmNzcycsXHJcbiAgICBvcmlnaW5hbDoge1xyXG4gICAgICBsaW5lOiAgIDEsXHJcbiAgICAgIGNvbHVtbjogMFxyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlZDoge1xyXG4gICAgICBsaW5lOiAgIDEsXHJcbiAgICAgIGNvbHVtbjogMFxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBDcmVhdGUgYSBTb3VyY2VNYXBDb25zdW1lciBmcm9tIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IsIC4uLlxyXG4gIHZhciBjb25zdW1lciAgPSBTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwKGdlbmVyYXRvcik7XHJcbiAgLy8gLi4uIGFuZCB0aGVuIHRyeSBhbmQgdXNlIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3IgYWdhaW4uIFRoaXMgc2hvdWxkIG5vdFxyXG4gIC8vIHRocm93LlxyXG4gIGdlbmVyYXRvci50b0pTT04oKTtcclxuXHJcbiAgYXNzZXJ0Lm9rKHRydWUsIFwiVXNpbmcgYSBTb3VyY2VNYXBHZW5lcmF0b3IgYWdhaW4gYWZ0ZXIgY3JlYXRpbmcgYSBcIiArXHJcbiAgICAgICAgICAgICAgICAgIFwiU291cmNlTWFwQ29uc3VtZXIgZnJvbSBpdCBzaG91bGQgbm90IHRocm93XCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBzb3VyY2VzIHdoZXJlIHRoZWlyIHByZWZpeCBpcyB0aGUgc291cmNlIHJvb3Q6IGlzc3VlICMxOTknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgdGVzdFNvdXJjZU1hcCA9IHtcclxuICAgIFwidmVyc2lvblwiOiAzLFxyXG4gICAgXCJzb3VyY2VzXCI6IFtcIi9zb3VyY2UvYXBwL2FwcC9hcHAuanNcIl0sXHJcbiAgICBcIm5hbWVzXCI6IFtcIlN5c3RlbVwiXSxcclxuICAgIFwibWFwcGluZ3NcIjogXCJBQUFBQVwiLFxyXG4gICAgXCJmaWxlXCI6IFwiYXBwL2FwcC5qc1wiLFxyXG4gICAgXCJzb3VyY2VzQ29udGVudFwiOiBbXCIndXNlIHN0cmljdCc7XCJdLFxyXG4gICAgXCJzb3VyY2VSb290XCI6XCIvc291cmNlL1wiXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHRlc3RTb3VyY2VNYXApO1xyXG5cclxuICBmdW5jdGlvbiBjb25zdW1lckhhc1NvdXJjZShzKSB7XHJcbiAgICBhc3NlcnQub2soY29uc3VtZXIuc291cmNlQ29udGVudEZvcihzKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdW1lci5zb3VyY2VzLmZvckVhY2goY29uc3VtZXJIYXNTb3VyY2UpO1xyXG4gIHRlc3RTb3VyY2VNYXAuc291cmNlcy5mb3JFYWNoKGNvbnN1bWVySGFzU291cmNlKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgc291cmNlcyB3aGVyZSB0aGVpciBwcmVmaXggaXMgdGhlIHNvdXJjZSByb290IGFuZCB0aGUgc291cmNlIHJvb3QgaXMgYSB1cmw6IGlzc3VlICMxOTknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgdGVzdFNvdXJjZU1hcCA9IHtcclxuICAgIFwidmVyc2lvblwiOiAzLFxyXG4gICAgXCJzb3VyY2VzXCI6IFtcImh0dHA6Ly9leGFtcGxlLmNvbS9zb3VyY2UvYXBwL2FwcC9hcHAuanNcIl0sXHJcbiAgICBcIm5hbWVzXCI6IFtcIlN5c3RlbVwiXSxcclxuICAgIFwibWFwcGluZ3NcIjogXCJBQUFBQVwiLFxyXG4gICAgXCJzb3VyY2VzQ29udGVudFwiOiBbXCIndXNlIHN0cmljdCc7XCJdLFxyXG4gICAgXCJzb3VyY2VSb290XCI6XCJodHRwOi8vZXhhbXBsZS5jb20vc291cmNlL1wiXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHRlc3RTb3VyY2VNYXApO1xyXG5cclxuICBmdW5jdGlvbiBjb25zdW1lckhhc1NvdXJjZShzKSB7XHJcbiAgICBhc3NlcnQub2soY29uc3VtZXIuc291cmNlQ29udGVudEZvcihzKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdW1lci5zb3VyY2VzLmZvckVhY2goY29uc3VtZXJIYXNTb3VyY2UpO1xyXG4gIHRlc3RTb3VyY2VNYXAuc291cmNlcy5mb3JFYWNoKGNvbnN1bWVySGFzU291cmNlKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgY29uc3VtaW5nIG5hbWVzIGFuZCBzb3VyY2VzIHRoYXQgYXJlIG51bWJlcnMnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgdGVzdFNvdXJjZU1hcCA9IHtcclxuICAgIFwidmVyc2lvblwiOiAzLFxyXG4gICAgXCJzb3VyY2VzXCI6IFswXSxcclxuICAgIFwibmFtZXNcIjogWzFdLFxyXG4gICAgXCJtYXBwaW5nc1wiOiBcIkFBQUFBXCIsXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHRlc3RTb3VyY2VNYXApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoY29uc3VtZXIuc291cmNlcy5sZW5ndGgsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzWzBdLCBcIjBcIik7XHJcblxyXG4gIHZhciBpID0gMDtcclxuICBjb25zdW1lci5lYWNoTWFwcGluZyhmdW5jdGlvbiAobSkge1xyXG4gICAgaSsrO1xyXG4gICAgYXNzZXJ0LmVxdWFsKG0ubmFtZSwgXCIxXCIpO1xyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChpLCAxKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgbm9uLW5vcm1hbGl6ZWQgc291cmNlUm9vdCAoZnJvbSBpc3N1ZSAjMjI3KSddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcih7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogWyAnaW5kZXguanMnIF0sXHJcbiAgICBuYW1lczogW10sXHJcbiAgICBtYXBwaW5nczogJzs7QUFBQSxJQUFJLE9BQU8sTUFBUCcsXHJcbiAgICBmaWxlOiAnaW5kZXguanMnLFxyXG4gICAgc291cmNlUm9vdDogJy4vc3JjLycsXHJcbiAgICBzb3VyY2VzQ29udGVudDogWyAndmFyIG5hbWUgPSBcIk1hcmtcIlxcbicgXVxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VSb290LCAnc3JjLycsICdzb3VyY2VSb290IHdhcyBub3JtYWxpemVkJyk7XHJcbiAgLy8gQmVmb3JlIHRoZSBmaXgsIHRoaXMgdGhyZXcgYW4gZXhjZXB0aW9uLlxyXG4gIGNvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3IoY29uc3VtZXIuc291cmNlc1swXSk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHdlYnBhY2sgVVJMIHJlc29sdXRpb24nXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0ge1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIHNvdXJjZXM6ICBbXCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY3ZTE4NGY5Njc5NzMzMjk4ZDQ0XCJdLFxyXG4gICAgbmFtZXM6IFtdLFxyXG4gICAgbWFwcGluZ3M6IFwiQ0FBU1wiLFxyXG4gICAgZmlsZTogXCJzdGF0aWMvanMvbWFuaWZlc3QuYjdjZjk3NjgwZjdhNTBmYTE1MGYuanNcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiXCJcclxuICB9O1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoY29uc3VtZXIuc291cmNlcy5sZW5ndGgsIDEpO1xyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzWzBdLCBcIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjdlMTg0Zjk2Nzk3MzMyOThkNDRcIik7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHdlYnBhY2sgVVJMIHJlc29sdXRpb24gd2l0aCBzb3VyY2VNYXBVUkwnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgbWFwID0ge1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIHNvdXJjZXM6ICBbXCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY3ZTE4NGY5Njc5NzMzMjk4ZDQ0XCJdLFxyXG4gICAgbmFtZXM6IFtdLFxyXG4gICAgbWFwcGluZ3M6IFwiQ0FBU1wiLFxyXG4gICAgZmlsZTogXCJzdGF0aWMvanMvbWFuaWZlc3QuYjdjZjk3NjgwZjdhNTBmYTE1MGYuanNcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwiXCJcclxuICB9O1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tL3EuanMubWFwJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXNbMF0sIFwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NFwiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3QgcmVsYXRpdmUgd2VicGFjayBVUkwgcmVzb2x1dGlvbiB3aXRoIHNvdXJjZU1hcFVSTCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogIFtcIndlYnBhY2svYm9vdHN0cmFwLmpzXCJdLFxyXG4gICAgbmFtZXM6IFtdLFxyXG4gICAgbWFwcGluZ3M6IFwiQ0FBU1wiLFxyXG4gICAgZmlsZTogXCJzdGF0aWMvanMvbWFuaWZlc3QuYjdjZjk3NjgwZjdhNTBmYTE1MGYuanNcIixcclxuICAgIHNvdXJjZVJvb3Q6IFwid2VicGFjazovLy9cIlxyXG4gIH07XHJcbiAgdmFyIGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcCwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vcS5qcy5tYXAnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwoY29uc3VtZXIuc291cmNlc1swXSwgXCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwLmpzXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBiYXNpYyBVUkwgcmVzb2x1dGlvbiB3aXRoIHNvdXJjZU1hcFVSTCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogIFtcInNvbWV0aGluZy5qc1wiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkNBQVNcIixcclxuICAgIGZpbGU6IFwic3RhdGljL2pzL21hbmlmZXN0LmI3Y2Y5NzY4MGY3YTUwZmExNTBmLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcInNyY1wiXHJcbiAgfTtcclxuICB2YXIgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobWFwLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbS94L3EuanMubWFwJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChjb25zdW1lci5zb3VyY2VzLmxlbmd0aCwgMSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXNbMF0sICdodHRwOi8vd3d3LmV4YW1wbGUuY29tL3gvc3JjL3NvbWV0aGluZy5qcycpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBhYnNvbHV0ZSBzb3VyY2VVUkwgcmVzb2x1dGlvbiB3aXRoIHNvdXJjZU1hcFVSTCddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiAzLFxyXG4gICAgc291cmNlczogIFtcInNvbWV0aGluZy5qc1wiXSxcclxuICAgIG5hbWVzOiBbXSxcclxuICAgIG1hcHBpbmdzOiBcIkNBQVNcIixcclxuICAgIGZpbGU6IFwic3RhdGljL2pzL21hbmlmZXN0LmI3Y2Y5NzY4MGY3YTUwZmExNTBmLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vc3JjXCJcclxuICB9O1xyXG4gIHZhciBjb25zdW1lciA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihtYXAsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tL3gvcS5qcy5tYXAnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoLCAxKTtcclxuICBhc3NlcnQuZXF1YWwoY29uc3VtZXIuc291cmNlc1swXSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vc3JjL3NvbWV0aGluZy5qcycpO1xyXG59O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi9saWIvdXRpbCcpO1xyXG5cclxuLy8gVGhpcyBpcyBhIHRlc3QgbWFwcGluZyB3aGljaCBtYXBzIGZ1bmN0aW9ucyBmcm9tIHR3byBkaWZmZXJlbnQgZmlsZXNcclxuLy8gKG9uZS5qcyBhbmQgdHdvLmpzKSB0byBhIG1pbmlmaWVkIGdlbmVyYXRlZCBzb3VyY2UuXHJcbi8vXHJcbi8vIEhlcmUgaXMgb25lLmpzOlxyXG4vL1xyXG4vLyAgIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XHJcbi8vICAgICByZXR1cm4gYmF6KGJhcik7XHJcbi8vICAgfTtcclxuLy9cclxuLy8gSGVyZSBpcyB0d28uanM6XHJcbi8vXHJcbi8vICAgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XHJcbi8vICAgICByZXR1cm4gbiArIDE7XHJcbi8vICAgfTtcclxuLy9cclxuLy8gQW5kIGhlcmUgaXMgdGhlIGdlbmVyYXRlZCBjb2RlIChtaW4uanMpOlxyXG4vL1xyXG4vLyAgIE9ORS5mb289ZnVuY3Rpb24oYSl7cmV0dXJuIGJheihhKTt9O1xyXG4vLyAgIFRXTy5pbmM9ZnVuY3Rpb24oYSl7cmV0dXJuIGErMTt9O1xyXG5leHBvcnRzLnRlc3RHZW5lcmF0ZWRDb2RlID0gXCIgT05FLmZvbz1mdW5jdGlvbihhKXtyZXR1cm4gYmF6KGEpO307XFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBUV08uaW5jPWZ1bmN0aW9uKGEpe3JldHVybiBhKzE7fTtcIjtcclxuZXhwb3J0cy50ZXN0TWFwID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgbmFtZXM6IFsnYmFyJywgJ2JheicsICduJ10sXHJcbiAgc291cmNlczogWydvbmUuanMnLCAndHdvLmpzJ10sXHJcbiAgc291cmNlUm9vdDogJy90aGUvcm9vdCcsXHJcbiAgbWFwcGluZ3M6ICdDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQSdcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwTm9Tb3VyY2VSb290ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgbmFtZXM6IFsnYmFyJywgJ2JheicsICduJ10sXHJcbiAgc291cmNlczogWydvbmUuanMnLCAndHdvLmpzJ10sXHJcbiAgbWFwcGluZ3M6ICdDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQSdcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwRW1wdHlTb3VyY2VSb290ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgbmFtZXM6IFsnYmFyJywgJ2JheicsICduJ10sXHJcbiAgc291cmNlczogWydvbmUuanMnLCAndHdvLmpzJ10sXHJcbiAgc291cmNlUm9vdDogJycsXHJcbiAgbWFwcGluZ3M6ICdDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQSdcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwU2luZ2xlU291cmNlID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgbmFtZXM6IFsnYmFyJywgJ2JheiddLFxyXG4gIHNvdXJjZXM6IFsnb25lLmpzJ10sXHJcbiAgc291cmNlUm9vdDogJycsXHJcbiAgbWFwcGluZ3M6ICdDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRCdcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwRW1wdHlNYXBwaW5ncyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6ICdtaW4uanMnLFxyXG4gIG5hbWVzOiBbXSxcclxuICBzb3VyY2VzOiBbJ29uZS5qcycsICd0d28uanMnXSxcclxuICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgJyBPTkUuZm9vID0gMTsnLFxyXG4gICAgJyBUV08uaW5jID0gMjsnXHJcbiAgXSxcclxuICBzb3VyY2VSb290OiAnJyxcclxuICBtYXBwaW5nczogJydcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwRW1wdHlNYXBwaW5nc1JlbGF0aXZlU291cmNlcyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6ICdtaW4uanMnLFxyXG4gIG5hbWVzOiBbXSxcclxuICBzb3VyY2VzOiBbJy4vb25lLmpzJywgJy4vdHdvLmpzJ10sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgICcgT05FLmZvbyA9IDE7JyxcclxuICAgICcgVFdPLmluYyA9IDI7J1xyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogJy90aGUvcm9vdCcsXHJcbiAgbWFwcGluZ3M6ICcnXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcEVtcHR5TWFwcGluZ3NSZWxhdGl2ZVNvdXJjZXNfZ2VuZXJhdGVkRXhwZWN0ZWQgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiAnbWluLmpzJyxcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogWydvbmUuanMnLCAndHdvLmpzJ10sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgICcgT05FLmZvbyA9IDE7JyxcclxuICAgICcgVFdPLmluYyA9IDI7J1xyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogJy90aGUvcm9vdCcsXHJcbiAgbWFwcGluZ3M6ICcnXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcE11bHRpU291cmNlc01hcHBpbmdSZWZlcnNTaW5nbGVTb3VyY2VPbmx5ID0ge1xyXG4gICAgdmVyc2lvbjogMyxcclxuICAgIGZpbGU6ICdtaW4uanMnLFxyXG4gICAgbmFtZXM6IFsnYmFyJywgJ2JheiddLFxyXG4gICAgc291cmNlczogWydvbmUuanMnLCAnd2l0aG91dE1hcHBpbmdzLmpzJ10sXHJcbiAgICBzb3VyY2VSb290OiAnJyxcclxuICAgIG1hcHBpbmdzOiAnQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSUQnXHJcbn07XHJcbi8vIFRoaXMgbWFwcGluZyBpcyBpZGVudGljYWwgdG8gYWJvdmUsIGJ1dCB1c2VzIHRoZSBpbmRleGVkIGZvcm1hdCBpbnN0ZWFkLlxyXG5leHBvcnRzLmluZGV4ZWRUZXN0TWFwID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgc2VjdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgbGluZTogMCxcclxuICAgICAgICBjb2x1bW46IDBcclxuICAgICAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBzb3VyY2VzOiBbXHJcbiAgICAgICAgICBcIm9uZS5qc1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgJyBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbicgK1xyXG4gICAgICAgICAgJyAgIHJldHVybiBiYXooYmFyKTtcXG4nICtcclxuICAgICAgICAgICcgfTsnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcclxuICAgICAgICAgIFwiYmFyXCIsXHJcbiAgICAgICAgICBcImJhelwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtYXBwaW5nczogXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRFwiLFxyXG4gICAgICAgIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgICAgICAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBvZmZzZXQ6IHtcclxuICAgICAgICBsaW5lOiAxLFxyXG4gICAgICAgIGNvbHVtbjogMFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcclxuICAgICAgICAgIFwidHdvLmpzXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICAnIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcbicgK1xyXG4gICAgICAgICAgJyAgIHJldHVybiBuICsgMTtcXG4nICtcclxuICAgICAgICAgICcgfTsnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1xyXG4gICAgICAgICAgXCJuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9BXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdXHJcbn07XHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXBEaWZmZXJlbnRTb3VyY2VSb290cyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6ICdtaW4uanMnLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1xyXG4gICAgICAgICAgXCJvbmUuanNcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgICAgICAgICcgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG4nICtcclxuICAgICAgICAgICcgICByZXR1cm4gYmF6KGJhcik7XFxuJyArXHJcbiAgICAgICAgICAnIH07JyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXHJcbiAgICAgICAgICBcImJhclwiLFxyXG4gICAgICAgICAgXCJiYXpcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSURcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgbGluZTogMSxcclxuICAgICAgICBjb2x1bW46IDBcclxuICAgICAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBzb3VyY2VzOiBbXHJcbiAgICAgICAgICBcInR3by5qc1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgJyBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4nICtcclxuICAgICAgICAgICcgICByZXR1cm4gbiArIDE7XFxuJyArXHJcbiAgICAgICAgICAnIH07J1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcclxuICAgICAgICAgIFwiblwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtYXBwaW5nczogXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQVwiLFxyXG4gICAgICAgIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgICAgICAgc291cmNlUm9vdDogXCIvZGlmZmVyZW50L3Jvb3RcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXVxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBXaXRoU291cmNlc0NvbnRlbnQgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiAnbWluLmpzJyxcclxuICBuYW1lczogWydiYXInLCAnYmF6JywgJ24nXSxcclxuICBzb3VyY2VzOiBbJ29uZS5qcycsICd0d28uanMnXSxcclxuICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgJyBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcbicgK1xyXG4gICAgJyAgIHJldHVybiBiYXooYmFyKTtcXG4nICtcclxuICAgICcgfTsnLFxyXG4gICAgJyBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG4nICtcclxuICAgICcgICByZXR1cm4gbiArIDE7XFxuJyArXHJcbiAgICAnIH07J1xyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogJy90aGUvcm9vdCcsXHJcbiAgbWFwcGluZ3M6ICdDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQSdcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwUmVsYXRpdmVTb3VyY2VzID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgbmFtZXM6IFsnYmFyJywgJ2JheicsICduJ10sXHJcbiAgc291cmNlczogWycuL29uZS5qcycsICcuL3R3by5qcyddLFxyXG4gIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAnIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuJyArXHJcbiAgICAnICAgcmV0dXJuIGJheihiYXIpO1xcbicgK1xyXG4gICAgJyB9OycsXHJcbiAgICAnIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xcbicgK1xyXG4gICAgJyAgIHJldHVybiBuICsgMTtcXG4nICtcclxuICAgICcgfTsnXHJcbiAgXSxcclxuICBzb3VyY2VSb290OiAnL3RoZS9yb290JyxcclxuICBtYXBwaW5nczogJ0NBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEO0NDRGIsSUFBSSxJQUFNLFNBQVVFLEdBQ2xCLE9BQU9BJ1xyXG59O1xyXG5leHBvcnRzLmVtcHR5TWFwID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogJ21pbi5qcycsXHJcbiAgbmFtZXM6IFtdLFxyXG4gIHNvdXJjZXM6IFtdLFxyXG4gIG1hcHBpbmdzOiAnJ1xyXG59O1xyXG5leHBvcnRzLm1hcFdpdGhTb3VyY2VsZXNzTWFwcGluZyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6ICdleGFtcGxlLmpzJyxcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogWydleGFtcGxlLmpzJ10sXHJcbiAgbWFwcGluZ3M6ICdBQWdDQSxDJ1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGFzc2VydE1hcHBpbmcoZ2VuZXJhdGVkTGluZSwgZ2VuZXJhdGVkQ29sdW1uLCBvcmlnaW5hbFNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbExpbmUsIG9yaWdpbmFsQ29sdW1uLCBuYW1lLCBiaWFzLCBtYXAsIGFzc2VydCxcclxuICAgICAgICAgICAgICAgICAgICAgICBkb250VGVzdEdlbmVyYXRlZCwgZG9udFRlc3RPcmlnaW5hbCkge1xyXG4gIGlmICghZG9udFRlc3RPcmlnaW5hbCkge1xyXG4gICAgdmFyIG9yaWdNYXBwaW5nID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgICBsaW5lOiBnZW5lcmF0ZWRMaW5lLFxyXG4gICAgICBjb2x1bW46IGdlbmVyYXRlZENvbHVtbixcclxuICAgICAgYmlhczogYmlhc1xyXG4gICAgfSk7XHJcbiAgICBhc3NlcnQuZXF1YWwob3JpZ01hcHBpbmcubmFtZSwgbmFtZSxcclxuICAgICAgICAgICAgICAgICAnSW5jb3JyZWN0IG5hbWUsIGV4cGVjdGVkICcgKyBKU09OLnN0cmluZ2lmeShuYW1lKVxyXG4gICAgICAgICAgICAgICAgICsgJywgZ290ICcgKyBKU09OLnN0cmluZ2lmeShvcmlnTWFwcGluZy5uYW1lKSk7XHJcbiAgICBhc3NlcnQuZXF1YWwob3JpZ01hcHBpbmcubGluZSwgb3JpZ2luYWxMaW5lLFxyXG4gICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgbGluZSwgZXhwZWN0ZWQgJyArIEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsTGluZSlcclxuICAgICAgICAgICAgICAgICArICcsIGdvdCAnICsgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcubGluZSkpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKG9yaWdNYXBwaW5nLmNvbHVtbiwgb3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgJ0luY29ycmVjdCBjb2x1bW4sIGV4cGVjdGVkICcgKyBKU09OLnN0cmluZ2lmeShvcmlnaW5hbENvbHVtbilcclxuICAgICAgICAgICAgICAgICArICcsIGdvdCAnICsgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcuY29sdW1uKSk7XHJcblxyXG4gICAgdmFyIGV4cGVjdGVkU291cmNlO1xyXG5cclxuICAgIGlmIChvcmlnaW5hbFNvdXJjZSAmJiBtYXAuc291cmNlUm9vdCAmJiBvcmlnaW5hbFNvdXJjZS5pbmRleE9mKG1hcC5zb3VyY2VSb290KSA9PT0gMCkge1xyXG4gICAgICBleHBlY3RlZFNvdXJjZSA9IG9yaWdpbmFsU291cmNlO1xyXG4gICAgfSBlbHNlIGlmIChvcmlnaW5hbFNvdXJjZSkge1xyXG4gICAgICBleHBlY3RlZFNvdXJjZSA9IG1hcC5zb3VyY2VSb290XHJcbiAgICAgICAgPyB1dGlsLmpvaW4obWFwLnNvdXJjZVJvb3QsIG9yaWdpbmFsU291cmNlKVxyXG4gICAgICAgIDogb3JpZ2luYWxTb3VyY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBleHBlY3RlZFNvdXJjZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYXNzZXJ0LmVxdWFsKG9yaWdNYXBwaW5nLnNvdXJjZSwgZXhwZWN0ZWRTb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgJ0luY29ycmVjdCBzb3VyY2UsIGV4cGVjdGVkICcgKyBKU09OLnN0cmluZ2lmeShleHBlY3RlZFNvdXJjZSlcclxuICAgICAgICAgICAgICAgICArICcsIGdvdCAnICsgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcuc291cmNlKSk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWRvbnRUZXN0R2VuZXJhdGVkKSB7XHJcbiAgICB2YXIgZ2VuTWFwcGluZyA9IG1hcC5nZW5lcmF0ZWRQb3NpdGlvbkZvcih7XHJcbiAgICAgIHNvdXJjZTogb3JpZ2luYWxTb3VyY2UsXHJcbiAgICAgIGxpbmU6IG9yaWdpbmFsTGluZSxcclxuICAgICAgY29sdW1uOiBvcmlnaW5hbENvbHVtbixcclxuICAgICAgYmlhczogYmlhc1xyXG4gICAgfSk7XHJcbiAgICBhc3NlcnQuZXF1YWwoZ2VuTWFwcGluZy5saW5lLCBnZW5lcmF0ZWRMaW5lLFxyXG4gICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgbGluZSwgZXhwZWN0ZWQgJyArIEpTT04uc3RyaW5naWZ5KGdlbmVyYXRlZExpbmUpXHJcbiAgICAgICAgICAgICAgICAgKyAnLCBnb3QgJyArIEpTT04uc3RyaW5naWZ5KGdlbk1hcHBpbmcubGluZSkpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKGdlbk1hcHBpbmcuY29sdW1uLCBnZW5lcmF0ZWRDb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgJ0luY29ycmVjdCBjb2x1bW4sIGV4cGVjdGVkICcgKyBKU09OLnN0cmluZ2lmeShnZW5lcmF0ZWRDb2x1bW4pXHJcbiAgICAgICAgICAgICAgICAgKyAnLCBnb3QgJyArIEpTT04uc3RyaW5naWZ5KGdlbk1hcHBpbmcuY29sdW1uKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuYXNzZXJ0TWFwcGluZyA9IGFzc2VydE1hcHBpbmc7XHJcblxyXG5mdW5jdGlvbiBhc3NlcnRFcXVhbE1hcHMoYXNzZXJ0LCBhY3R1YWxNYXAsIGV4cGVjdGVkTWFwKSB7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbE1hcC52ZXJzaW9uLCBleHBlY3RlZE1hcC52ZXJzaW9uLCBcInZlcnNpb24gbWlzbWF0Y2hcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbE1hcC5maWxlLCBleHBlY3RlZE1hcC5maWxlLCBcImZpbGUgbWlzbWF0Y2hcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbE1hcC5uYW1lcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgIGV4cGVjdGVkTWFwLm5hbWVzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgXCJuYW1lcyBsZW5ndGggbWlzbWF0Y2g6IFwiICtcclxuICAgICAgICAgICAgICAgICBhY3R1YWxNYXAubmFtZXMuam9pbihcIiwgXCIpICsgXCIgIT0gXCIgKyBleHBlY3RlZE1hcC5uYW1lcy5qb2luKFwiLCBcIikpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsTWFwLm5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhc3NlcnQuZXF1YWwoYWN0dWFsTWFwLm5hbWVzW2ldLFxyXG4gICAgICAgICAgICAgICAgIGV4cGVjdGVkTWFwLm5hbWVzW2ldLFxyXG4gICAgICAgICAgICAgICAgIFwibmFtZXNbXCIgKyBpICsgXCJdIG1pc21hdGNoOiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICBhY3R1YWxNYXAubmFtZXMuam9pbihcIiwgXCIpICsgXCIgIT0gXCIgKyBleHBlY3RlZE1hcC5uYW1lcy5qb2luKFwiLCBcIikpO1xyXG4gIH1cclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsTWFwLnNvdXJjZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICBleHBlY3RlZE1hcC5zb3VyY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgXCJzb3VyY2VzIGxlbmd0aCBtaXNtYXRjaDogXCIgK1xyXG4gICAgICAgICAgICAgICAgIGFjdHVhbE1hcC5zb3VyY2VzLmpvaW4oXCIsIFwiKSArIFwiICE9IFwiICsgZXhwZWN0ZWRNYXAuc291cmNlcy5qb2luKFwiLCBcIikpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsTWFwLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGFzc2VydC5lcXVhbChhY3R1YWxNYXAuc291cmNlc1tpXSxcclxuICAgICAgICAgICAgICAgICBleHBlY3RlZE1hcC5zb3VyY2VzW2ldLFxyXG4gICAgICAgICAgICAgICAgIFwic291cmNlc1tcIiArIGkgKyBcIl0gbGVuZ3RoIG1pc21hdGNoOiBcIiArXHJcbiAgICAgICAgICAgICAgICAgYWN0dWFsTWFwLnNvdXJjZXMuam9pbihcIiwgXCIpICsgXCIgIT0gXCIgKyBleHBlY3RlZE1hcC5zb3VyY2VzLmpvaW4oXCIsIFwiKSk7XHJcbiAgfVxyXG4gIGFzc2VydC5lcXVhbChhY3R1YWxNYXAuc291cmNlUm9vdCxcclxuICAgICAgICAgICAgICAgZXhwZWN0ZWRNYXAuc291cmNlUm9vdCxcclxuICAgICAgICAgICAgICAgXCJzb3VyY2VSb290IG1pc21hdGNoOiBcIiArXHJcbiAgICAgICAgICAgICAgICAgYWN0dWFsTWFwLnNvdXJjZVJvb3QgKyBcIiAhPSBcIiArIGV4cGVjdGVkTWFwLnNvdXJjZVJvb3QpO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWxNYXAubWFwcGluZ3MsIGV4cGVjdGVkTWFwLm1hcHBpbmdzLFxyXG4gICAgICAgICAgICAgICBcIm1hcHBpbmdzIG1pc21hdGNoOlxcbkFjdHVhbDogICBcIiArIGFjdHVhbE1hcC5tYXBwaW5ncyArIFwiXFxuRXhwZWN0ZWQ6IFwiICsgZXhwZWN0ZWRNYXAubWFwcGluZ3MpO1xyXG4gIGlmIChhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQpIHtcclxuICAgIGFzc2VydC5lcXVhbChhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgIGV4cGVjdGVkTWFwLnNvdXJjZXNDb250ZW50Lmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICBcInNvdXJjZXNDb250ZW50IGxlbmd0aCBtaXNtYXRjaFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsTWFwLnNvdXJjZXNDb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGFzc2VydC5lcXVhbChhY3R1YWxNYXAuc291cmNlc0NvbnRlbnRbaV0sXHJcbiAgICAgICAgICAgICAgICAgICBleHBlY3RlZE1hcC5zb3VyY2VzQ29udGVudFtpXSxcclxuICAgICAgICAgICAgICAgICAgIFwic291cmNlc0NvbnRlbnRbXCIgKyBpICsgXCJdIG1pc21hdGNoXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnRzLmFzc2VydEVxdWFsTWFwcyA9IGFzc2VydEVxdWFsTWFwcztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==