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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test-source-node.js");
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

/***/ "./lib/source-node.js":
/*!****************************!*\
  !*** ./lib/source-node.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(/*! ./source-map-generator */ "./lib/source-map-generator.js").SourceMapGenerator;
var util = __webpack_require__(/*! ./util */ "./lib/util.js");

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(
  aGeneratedCode,
  aSourceMapConsumer,
  aRelativePath
) {
  // The SourceNode we want to fill with the generated code
  // and the SourceMap
  var node = new SourceNode();

  // All even indices of this array are one line of the generated code,
  // while all odd indices are the newlines between two adjacent lines
  // (since `REGEX_NEWLINE` captures its match).
  // Processed fragments are accessed by calling `shiftNextLine`.
  var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
  var remainingLinesIndex = 0;
  var shiftNextLine = function() {
    var lineContents = getNextLine();
    // The last line of a file might not have a newline.
    var newLine = getNextLine() || "";
    return lineContents + newLine;

    function getNextLine() {
      return remainingLinesIndex < remainingLines.length
        ? remainingLines[remainingLinesIndex++]
        : undefined;
    }
  };

  // We need to remember the position of "remainingLines"
  var lastGeneratedLine = 1,
    lastGeneratedColumn = 0;

  // The generate SourceNodes we need a code range.
  // To extract it current and last mapping is used.
  // Here we store the last mapping.
  var lastMapping = null;

  aSourceMapConsumer.eachMapping(function(mapping) {
    if (lastMapping !== null) {
      // We add the code from "lastMapping" to "mapping":
      // First check if there is a new line in between.
      if (lastGeneratedLine < mapping.generatedLine) {
        // Associate first line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
        lastGeneratedLine++;
        lastGeneratedColumn = 0;
        // The remaining code is added without mapping
      } else {
        // There is no new line in between.
        // Associate the code between "lastGeneratedColumn" and
        // "mapping.generatedColumn" with "lastMapping"
        var nextLine = remainingLines[remainingLinesIndex] || "";
        var code = nextLine.substr(
          0,
          mapping.generatedColumn - lastGeneratedColumn
        );
        remainingLines[remainingLinesIndex] = nextLine.substr(
          mapping.generatedColumn - lastGeneratedColumn
        );
        lastGeneratedColumn = mapping.generatedColumn;
        addMappingWithCode(lastMapping, code);
        // No more remaining code, continue
        lastMapping = mapping;
        return;
      }
    }
    // We add the generated code until the first mapping
    // to the SourceNode without any mapping.
    // Each line is added as separate string.
    while (lastGeneratedLine < mapping.generatedLine) {
      node.add(shiftNextLine());
      lastGeneratedLine++;
    }
    if (lastGeneratedColumn < mapping.generatedColumn) {
      var nextLine = remainingLines[remainingLinesIndex] || "";
      node.add(nextLine.substr(0, mapping.generatedColumn));
      remainingLines[remainingLinesIndex] = nextLine.substr(
        mapping.generatedColumn
      );
      lastGeneratedColumn = mapping.generatedColumn;
    }
    lastMapping = mapping;
  }, this);
  // We have processed all mappings.
  if (remainingLinesIndex < remainingLines.length) {
    if (lastMapping) {
      // Associate the remaining code in the current line with "lastMapping"
      addMappingWithCode(lastMapping, shiftNextLine());
    }
    // and add the remaining lines without any mapping
    node.add(remainingLines.splice(remainingLinesIndex).join(""));
  }

  // Copy sourcesContent into SourceNode
  aSourceMapConsumer.sources.forEach(function(sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      if (aRelativePath != null) {
        sourceFile = util.join(aRelativePath, sourceFile);
      }
      node.setSourceContent(sourceFile, content);
    }
  });

  return node;

  function addMappingWithCode(mapping, code) {
    if (mapping === null || mapping.source === undefined) {
      node.add(code);
    } else {
      var source =
        aRelativePath && mapping.source
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
      node.add(
        new SourceNode(
          mapping.originalLine,
          mapping.originalColumn,
          source,
          code,
          mapping.name
        )
      );
    }
  }
};

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function(chunk) {
      this.add(chunk);
    }, this);
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  } else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
        aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length - 1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  } else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
        aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    } else {
      if (chunk !== "") {
        aFn(chunk, {
          source: this.source,
          line: this.line,
          column: this.column,
          name: this.name
        });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len - 1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(
  aPattern,
  aReplacement
) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  } else if (typeof lastChild === "string") {
    this.children[this.children.length - 1] = lastChild.replace(
      aPattern,
      aReplacement
    );
  } else {
    this.children.push("".replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(
  aSourceFile,
  aSourceContent
) {
  this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
};

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(
  aFn
) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    if (this.children[i][isSourceNode]) {
      this.children[i].walkSourceContents(aFn);
    }
  }

  var sources = Object.keys(this.sourceContents);
  for (var i = 0, len = sources.length; i < len; i++) {
    aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  }
};

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function(chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(
  aArgs
) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function(chunk, original) {
    generated.code += chunk;
    if (
      original.source !== null &&
      original.line !== null &&
      original.column !== null
    ) {
      if (
        lastOriginalSource !== original.source ||
        lastOriginalLine !== original.line ||
        lastOriginalColumn !== original.column ||
        lastOriginalName !== original.name
      ) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function(sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


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

/***/ "./test/test-source-node.js":
/*!**********************************!*\
  !*** ./test/test-source-node.js ***!
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
var SourceMapGenerator = __webpack_require__(/*! ../lib/source-map-generator */ "./lib/source-map-generator.js")
  .SourceMapGenerator;
var SourceMapConsumer = __webpack_require__(/*! ../lib/source-map-consumer */ "./lib/source-map-consumer.js").SourceMapConsumer;
var SourceNode = __webpack_require__(/*! ../lib/source-node */ "./lib/source-node.js").SourceNode;

function forEachNewline(fn) {
  return function(assert) {
    ["\n", "\r\n"].forEach(fn.bind(null, assert));
  };
}

exports["test .add()"] = function(assert) {
  var node = new SourceNode(null, null, null);

  // Adding a string works.
  node.add("function noop() {}");

  // Adding another source node works.
  node.add(new SourceNode(null, null, null));

  // Adding an array works.
  node.add([
    "function foo() {",
    new SourceNode(null, null, null, "return 10;"),
    "}"
  ]);

  // Adding other stuff doesn't.
  assert.throws(function() {
    node.add({});
  });
  assert.throws(function() {
    node.add(function() {});
  });
};

exports["test .prepend()"] = function(assert) {
  var node = new SourceNode(null, null, null);

  // Prepending a string works.
  node.prepend("function noop() {}");
  assert.equal(node.children[0], "function noop() {}");
  assert.equal(node.children.length, 1);

  // Prepending another source node works.
  node.prepend(new SourceNode(null, null, null));
  assert.equal(node.children[0], "");
  assert.equal(node.children[1], "function noop() {}");
  assert.equal(node.children.length, 2);

  // Prepending an array works.
  node.prepend([
    "function foo() {",
    new SourceNode(null, null, null, "return 10;"),
    "}"
  ]);
  assert.equal(node.children[0], "function foo() {");
  assert.equal(node.children[1], "return 10;");
  assert.equal(node.children[2], "}");
  assert.equal(node.children[3], "");
  assert.equal(node.children[4], "function noop() {}");
  assert.equal(node.children.length, 5);

  // Prepending other stuff doesn't.
  assert.throws(function() {
    node.prepend({});
  });
  assert.throws(function() {
    node.prepend(function() {});
  });
};

exports["test .toString()"] = function(assert) {
  assert.equal(
    new SourceNode(null, null, null, [
      "function foo() {",
      new SourceNode(null, null, null, "return 10;"),
      "}"
    ]).toString(),
    "function foo() {return 10;}"
  );
};

exports["test .join()"] = function(assert) {
  assert.equal(
    new SourceNode(null, null, null, ["a", "b", "c", "d"])
      .join(", ")
      .toString(),
    "a, b, c, d"
  );
};

exports["test .walk()"] = function(assert) {
  var node = new SourceNode(null, null, null, [
    "(function () {\n",
    "  ",
    new SourceNode(1, 0, "a.js", ["someCall()"]),
    ";\n",
    "  ",
    new SourceNode(2, 0, "b.js", ["if (foo) bar()"]),
    ";\n",
    "}());"
  ]);
  var expected = [
    { str: "(function () {\n", source: null, line: null, column: null },
    { str: "  ", source: null, line: null, column: null },
    { str: "someCall()", source: "a.js", line: 1, column: 0 },
    { str: ";\n", source: null, line: null, column: null },
    { str: "  ", source: null, line: null, column: null },
    { str: "if (foo) bar()", source: "b.js", line: 2, column: 0 },
    { str: ";\n", source: null, line: null, column: null },
    { str: "}());", source: null, line: null, column: null }
  ];
  var i = 0;
  node.walk(function(chunk, loc) {
    assert.equal(expected[i].str, chunk);
    assert.equal(expected[i].source, loc.source);
    assert.equal(expected[i].line, loc.line);
    assert.equal(expected[i].column, loc.column);
    i++;
  });
};

exports["test .replaceRight"] = function(assert) {
  var node;

  // Not nested
  node = new SourceNode(null, null, null, "hello world");
  node.replaceRight(/world/, "universe");
  assert.equal(node.toString(), "hello universe");

  // Nested
  node = new SourceNode(null, null, null, [
    new SourceNode(null, null, null, "hey sexy mama, "),
    new SourceNode(null, null, null, "want to kill all humans?")
  ]);
  node.replaceRight(/kill all humans/, "watch Futurama");
  assert.equal(node.toString(), "hey sexy mama, want to watch Futurama?");
};

exports["test .toStringWithSourceMap()"] = forEachNewline(function(assert, nl) {
  var node = new SourceNode(null, null, null, [
    "(function () {" + nl,
    "  ",
    new SourceNode(1, 0, "a.js", "someCall", "originalCall"),
    new SourceNode(1, 8, "a.js", "()"),
    ";" + nl,
    "  ",
    new SourceNode(2, 0, "b.js", ["if (foo) bar()"]),
    ";" + nl,
    "}());"
  ]);
  var result = node.toStringWithSourceMap({
    file: "foo.js"
  });

  assert.equal(
    result.code,
    ["(function () {", "  someCall();", "  if (foo) bar();", "}());"].join(nl)
  );

  var map = result.map;
  var mapWithoutOptions = node.toStringWithSourceMap().map;

  assert.ok(
    map instanceof SourceMapGenerator,
    "map instanceof SourceMapGenerator"
  );
  assert.ok(
    mapWithoutOptions instanceof SourceMapGenerator,
    "mapWithoutOptions instanceof SourceMapGenerator"
  );
  assert.ok(!("file" in mapWithoutOptions));
  mapWithoutOptions._file = "foo.js";
  util.assertEqualMaps(assert, map.toJSON(), mapWithoutOptions.toJSON());

  map = new SourceMapConsumer(map.toString());

  var actual;

  actual = map.originalPositionFor({
    line: 1,
    column: 4
  });
  assert.equal(actual.source, null);
  assert.equal(actual.line, null);
  assert.equal(actual.column, null);

  actual = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(actual.source, "a.js");
  assert.equal(actual.line, 1);
  assert.equal(actual.column, 0);
  assert.equal(actual.name, "originalCall");

  actual = map.originalPositionFor({
    line: 3,
    column: 2
  });
  assert.equal(actual.source, "b.js");
  assert.equal(actual.line, 2);
  assert.equal(actual.column, 0);

  actual = map.originalPositionFor({
    line: 3,
    column: 16
  });
  assert.equal(actual.source, null);
  assert.equal(actual.line, null);
  assert.equal(actual.column, null);

  actual = map.originalPositionFor({
    line: 4,
    column: 2
  });
  assert.equal(actual.source, null);
  assert.equal(actual.line, null);
  assert.equal(actual.column, null);
});

exports["test .fromStringWithSourceMap()"] = forEachNewline(function(
  assert,
  nl
) {
  var testCode = util.testGeneratedCode.replace(/\n/g, nl);
  var node = SourceNode.fromStringWithSourceMap(
    testCode,
    new SourceMapConsumer(util.testMap)
  );

  var result = node.toStringWithSourceMap({
    file: "min.js"
  });
  var map = result.map;
  var code = result.code;

  assert.equal(code, testCode);
  assert.ok(
    map instanceof SourceMapGenerator,
    "map instanceof SourceMapGenerator"
  );
  map = map.toJSON();
  assert.equal(map.version, util.testMap.version);
  assert.equal(map.file, util.testMap.file);
  assert.equal(map.mappings, util.testMap.mappings);
});

exports["test .fromStringWithSourceMap() empty map"] = forEachNewline(function(
  assert,
  nl
) {
  var node = SourceNode.fromStringWithSourceMap(
    util.testGeneratedCode.replace(/\n/g, nl),
    new SourceMapConsumer(util.emptyMap)
  );
  var result = node.toStringWithSourceMap({
    file: "min.js"
  });
  var map = result.map;
  var code = result.code;

  assert.equal(code, util.testGeneratedCode.replace(/\n/g, nl));
  assert.ok(
    map instanceof SourceMapGenerator,
    "map instanceof SourceMapGenerator"
  );
  map = map.toJSON();
  assert.equal(map.version, util.emptyMap.version);
  assert.equal(map.file, util.emptyMap.file);
  assert.equal(map.mappings.length, util.emptyMap.mappings.length);
  assert.equal(map.mappings, util.emptyMap.mappings);
});

exports["test .fromStringWithSourceMap() complex version"] = forEachNewline(
  function(assert, nl) {
    var input = new SourceNode(null, null, null, [
      "(function() {" + nl,
      "  var Test = {};" + nl,
      "  ",
      new SourceNode(1, 0, "a.js", "Test.A = { value: 1234 };" + nl),
      "  ",
      new SourceNode(2, 0, "a.js", "Test.A.x = 'xyz';"),
      nl,
      "}());" + nl,
      "/* Generated Source */"
    ]);
    input = input.toStringWithSourceMap({
      file: "foo.js"
    });

    var node = SourceNode.fromStringWithSourceMap(
      input.code,
      new SourceMapConsumer(input.map.toString())
    );

    var result = node.toStringWithSourceMap({
      file: "foo.js"
    });
    var map = result.map;
    var code = result.code;

    assert.equal(code, input.code);
    assert.ok(
      map instanceof SourceMapGenerator,
      "map instanceof SourceMapGenerator"
    );
    map = map.toJSON();
    var inputMap = input.map.toJSON();
    util.assertEqualMaps(assert, map, inputMap);
  }
);

exports["test .fromStringWithSourceMap() third argument"] = function(assert) {
  // Assume the following directory structure:
  //
  // http://foo.org/
  //   app/
  //     coffee/
  //       foo.coffee
  //       coffeeBundle.js # Made from {foo,bar,baz}.coffee
  //       maps/
  //         coffeeBundle.js.map
  //     js/
  //       foo.js
  //     public/
  //       app.js # Made from {foo,coffeeBundle}.js
  //       app.js.map

  var coffeeBundle = new SourceNode(1, 0, "foo.coffee", "foo(coffee);\n");
  coffeeBundle.setSourceContent("foo.coffee", "foo coffee");
  coffeeBundle = coffeeBundle.toStringWithSourceMap({
    file: "foo.js",
    sourceRoot: ".."
  });

  var foo = new SourceNode(1, 0, "foo.js", "foo(js);");

  var test = function(relativePath, expectedSources) {
    var app = new SourceNode();
    app.add(
      SourceNode.fromStringWithSourceMap(
        coffeeBundle.code,
        new SourceMapConsumer(coffeeBundle.map.toString()),
        relativePath
      )
    );
    app.add(foo);
    var i = 0;
    app.walk(function(chunk, loc) {
      assert.equal(loc.source, expectedSources[i]);
      i++;
    });
    app.walkSourceContents(function(sourceFile, sourceContent) {
      assert.equal(sourceFile, expectedSources[0]);
      assert.equal(sourceContent, "foo coffee");
    });
  };

  test("../coffee/maps", ["../coffee/foo.coffee", "foo.js"]);

  // If the third parameter is omitted or set to the current working
  // directory we get incorrect source paths:

  test(undefined, ["../foo.coffee", "foo.js"]);

  test("", ["../foo.coffee", "foo.js"]);

  test(".", ["../foo.coffee", "foo.js"]);

  test("./", ["../foo.coffee", "foo.js"]);
};

exports[
  "test .toStringWithSourceMap() merging duplicate mappings"
] = forEachNewline(function(assert, nl) {
  var input = new SourceNode(null, null, null, [
    new SourceNode(1, 0, "a.js", "(function"),
    new SourceNode(1, 0, "a.js", "() {" + nl),
    "  ",
    new SourceNode(1, 0, "a.js", "var Test = "),
    new SourceNode(1, 0, "b.js", "{};" + nl),
    new SourceNode(2, 0, "b.js", "Test"),
    new SourceNode(2, 0, "b.js", ".A", "A"),
    new SourceNode(2, 20, "b.js", " = { value: ", "A"),
    "1234",
    new SourceNode(2, 40, "b.js", " };" + nl, "A"),
    "}());" + nl,
    "/* Generated Source */"
  ]);
  input = input.toStringWithSourceMap({
    file: "foo.js"
  });

  assert.equal(
    input.code,
    [
      "(function() {",
      "  var Test = {};",
      "Test.A = { value: 1234 };",
      "}());",
      "/* Generated Source */"
    ].join(nl)
  );

  var correctMap = new SourceMapGenerator({
    file: "foo.js"
  });
  correctMap.addMapping({
    generated: { line: 1, column: 0 },
    source: "a.js",
    original: { line: 1, column: 0 }
  });
  // Here is no need for a empty mapping,
  // because mappings ends at eol
  correctMap.addMapping({
    generated: { line: 2, column: 2 },
    source: "a.js",
    original: { line: 1, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 2, column: 13 },
    source: "b.js",
    original: { line: 1, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 3, column: 0 },
    source: "b.js",
    original: { line: 2, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 3, column: 4 },
    source: "b.js",
    name: "A",
    original: { line: 2, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 3, column: 6 },
    source: "b.js",
    name: "A",
    original: { line: 2, column: 20 }
  });
  // This empty mapping is required,
  // because there is a hole in the middle of the line
  correctMap.addMapping({
    generated: { line: 3, column: 18 }
  });
  correctMap.addMapping({
    generated: { line: 3, column: 22 },
    source: "b.js",
    name: "A",
    original: { line: 2, column: 40 }
  });
  // Here is no need for a empty mapping,
  // because mappings ends at eol

  var inputMap = input.map.toJSON();
  correctMap = correctMap.toJSON();
  util.assertEqualMaps(assert, inputMap, correctMap);
});

exports[
  "test .toStringWithSourceMap() multi-line SourceNodes"
] = forEachNewline(function(assert, nl) {
  var input = new SourceNode(null, null, null, [
    new SourceNode(
      1,
      0,
      "a.js",
      "(function() {" + nl + "var nextLine = 1;" + nl + "anotherLine();" + nl
    ),
    new SourceNode(2, 2, "b.js", "Test.call(this, 123);" + nl),
    new SourceNode(2, 2, "b.js", "this['stuff'] = 'v';" + nl),
    new SourceNode(2, 2, "b.js", "anotherLine();" + nl),
    "/*" + nl + "Generated" + nl + "Source" + nl + "*/" + nl,
    new SourceNode(3, 4, "c.js", "anotherLine();" + nl),
    "/*" + nl + "Generated" + nl + "Source" + nl + "*/"
  ]);
  input = input.toStringWithSourceMap({
    file: "foo.js"
  });

  assert.equal(
    input.code,
    [
      "(function() {",
      "var nextLine = 1;",
      "anotherLine();",
      "Test.call(this, 123);",
      "this['stuff'] = 'v';",
      "anotherLine();",
      "/*",
      "Generated",
      "Source",
      "*/",
      "anotherLine();",
      "/*",
      "Generated",
      "Source",
      "*/"
    ].join(nl)
  );

  var correctMap = new SourceMapGenerator({
    file: "foo.js"
  });
  correctMap.addMapping({
    generated: { line: 1, column: 0 },
    source: "a.js",
    original: { line: 1, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 2, column: 0 },
    source: "a.js",
    original: { line: 1, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 3, column: 0 },
    source: "a.js",
    original: { line: 1, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 4, column: 0 },
    source: "b.js",
    original: { line: 2, column: 2 }
  });
  correctMap.addMapping({
    generated: { line: 5, column: 0 },
    source: "b.js",
    original: { line: 2, column: 2 }
  });
  correctMap.addMapping({
    generated: { line: 6, column: 0 },
    source: "b.js",
    original: { line: 2, column: 2 }
  });
  correctMap.addMapping({
    generated: { line: 11, column: 0 },
    source: "c.js",
    original: { line: 3, column: 4 }
  });

  var inputMap = input.map.toJSON();
  correctMap = correctMap.toJSON();
  util.assertEqualMaps(assert, inputMap, correctMap);
});

exports["test .toStringWithSourceMap() with empty string"] = function(assert) {
  var node = new SourceNode(1, 0, "empty.js", "");
  var result = node.toStringWithSourceMap();
  assert.equal(result.code, "");
};

exports[
  "test .toStringWithSourceMap() with consecutive newlines"
] = forEachNewline(function(assert, nl) {
  var input = new SourceNode(null, null, null, [
    "/***/" + nl + nl,
    new SourceNode(1, 0, "a.js", "'use strict';" + nl),
    new SourceNode(2, 0, "a.js", "a();")
  ]);
  input = input.toStringWithSourceMap({
    file: "foo.js"
  });

  assert.equal(input.code, ["/***/", "", "'use strict';", "a();"].join(nl));

  var correctMap = new SourceMapGenerator({
    file: "foo.js"
  });
  correctMap.addMapping({
    generated: { line: 3, column: 0 },
    source: "a.js",
    original: { line: 1, column: 0 }
  });
  correctMap.addMapping({
    generated: { line: 4, column: 0 },
    source: "a.js",
    original: { line: 2, column: 0 }
  });

  var inputMap = input.map.toJSON();
  correctMap = correctMap.toJSON();
  util.assertEqualMaps(assert, inputMap, correctMap);
});

exports["test setSourceContent with toStringWithSourceMap"] = function(assert) {
  var aNode = new SourceNode(1, 1, "a.js", "a");
  aNode.setSourceContent("a.js", "someContent");
  var node = new SourceNode(null, null, null, [
    "(function () {\n",
    "  ",
    aNode,
    "  ",
    new SourceNode(1, 1, "b.js", "b"),
    "}());"
  ]);
  node.setSourceContent("b.js", "otherContent");
  var map = node.toStringWithSourceMap({
    file: "foo.js"
  }).map;

  assert.ok(
    map instanceof SourceMapGenerator,
    "map instanceof SourceMapGenerator"
  );
  map = new SourceMapConsumer(map.toString());

  assert.equal(map.sources.length, 2);
  assert.equal(map.sources[0], "a.js");
  assert.equal(map.sources[1], "b.js");
  assert.equal(map.sourcesContent.length, 2);
  assert.equal(map.sourcesContent[0], "someContent");
  assert.equal(map.sourcesContent[1], "otherContent");
};

exports["test walkSourceContents"] = function(assert) {
  var aNode = new SourceNode(1, 1, "a.js", "a");
  aNode.setSourceContent("a.js", "someContent");
  var node = new SourceNode(null, null, null, [
    "(function () {\n",
    "  ",
    aNode,
    "  ",
    new SourceNode(1, 1, "b.js", "b"),
    "}());"
  ]);
  node.setSourceContent("b.js", "otherContent");
  var results = [];
  node.walkSourceContents(function(sourceFile, sourceContent) {
    results.push([sourceFile, sourceContent]);
  });
  assert.equal(results.length, 2);
  assert.equal(results[0][0], "a.js");
  assert.equal(results[0][1], "someContent");
  assert.equal(results[1][0], "b.js");
  assert.equal(results[1][1], "otherContent");
};

exports["test from issue 258"] = function(assert) {
  var node = new SourceNode();

  var reactCode =
    ";require(0);\n//# sourceMappingURL=/index.ios.map?platform=ios&dev=false&minify=true";

  var reactMap =
    '{"version":3,"file":"/index.ios.bundle?platform=ios&dev=false&minify=true","sections":[{"offset":{"line":0,"column":0},"map":{"version":3,"sources":["require-0.js"],"names":[],"mappings":"AAAA;","file":"require-0.js","sourcesContent":[";require(0);"]}}]}';

  node.add(
    SourceNode.fromStringWithSourceMap(
      reactCode,
      new SourceMapConsumer(reactMap)
    )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYXJyYXktc2V0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYmFzZTY0LXZscS5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL2JpbmFyeS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9tYXBwaW5nLWxpc3QuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi9xdWljay1zb3J0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvc291cmNlLW1hcC1jb25zdW1lci5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vbGliL3NvdXJjZS1tYXAtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvc291cmNlLW5vZGUuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL2xpYi91dGlsLmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi90ZXN0L3Rlc3Qtc291cmNlLW5vZGUuanMiLCJ3ZWJwYWNrOi8vU09VUkNFX01BUF9URVNUX01PRFVMRS8uL3Rlc3QvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw2QkFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDMUhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLGlDQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZJQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGdCQUFnQjs7QUFFaEIsbUJBQW1CO0FBQ25CLG9CQUFvQjs7QUFFcEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQjs7QUFFaEIsZ0JBQWdCO0FBQ2hCLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BFQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsNkJBQVE7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNuRkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RIQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLDZCQUFRO0FBQzNCLG1CQUFtQixtQkFBTyxDQUFDLCtDQUFpQjtBQUM1QyxlQUFlLG1CQUFPLENBQUMsdUNBQWE7QUFDcEMsZ0JBQWdCLG1CQUFPLENBQUMseUNBQWM7QUFDdEMsZ0JBQWdCLG1CQUFPLENBQUMseUNBQWM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQ0FBa0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsWUFBWTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3Q0FBd0M7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixNQUFNO0FBQ25DO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDLHFCQUFxQiwrQ0FBK0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0EsbUJBQW1CLDRCQUE0QjtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3R1Q0EsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFjO0FBQ3RDLFdBQVcsbUJBQU8sQ0FBQyw2QkFBUTtBQUMzQixlQUFlLG1CQUFPLENBQUMsdUNBQWE7QUFDcEMsa0JBQWtCLG1CQUFPLENBQUMsNkNBQWdCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdGNBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsbUJBQU8sQ0FBQyw2REFBd0I7QUFDekQsV0FBVyxtQkFBTyxDQUFDLDZCQUFROztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxTQUFTO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxjQUFjO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxVQUFVO0FBQ1Y7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3ZiQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLFFBQVE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyaUJBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsOEJBQVE7QUFDM0IseUJBQXlCLG1CQUFPLENBQUMsa0VBQTZCO0FBQzlEO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMsZ0VBQTRCO0FBQzVELGlCQUFpQixtQkFBTyxDQUFDLGdEQUFvQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsZ0RBQWdEO0FBQ2hELE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLEdBQUc7QUFDSDtBQUNBLDBCQUEwQjtBQUMxQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQyxvREFBb0Q7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsZ0RBQWdEO0FBQ2hELE1BQU07QUFDTjtBQUNBLGtEQUFrRDtBQUNsRCw0Q0FBNEM7QUFDNUMsbUNBQW1DO0FBQ25DO0FBQ0Esb0RBQW9EO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsR0FBRztBQUNIO0FBQ0EsOEJBQThCO0FBQzlCLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsa0RBQWtEO0FBQ2xELFFBQVE7QUFDUjtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTixNQUFNLElBQUk7QUFDVjtBQUNBO0FBQ0EsS0FBSyxxQkFBcUIsNkNBQTZDO0FBQ3ZFLEtBQUssb0RBQW9EO0FBQ3pELEtBQUssd0RBQXdEO0FBQzdELEtBQUssUUFBUSw2Q0FBNkM7QUFDMUQsS0FBSyxvREFBb0Q7QUFDekQsS0FBSyw0REFBNEQ7QUFDakUsS0FBSyxRQUFRLDZDQUE2QztBQUMxRCxLQUFLLFFBQVEsSUFBSTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU0sSUFBSTtBQUNWO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUIscUJBQXFCLEtBQUssSUFBSTtBQUNuRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsdUJBQXVCO0FBQ3ZCO0FBQ0EsOENBQThDLGVBQWU7QUFDN0Q7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQSxRQUFRLElBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixpQkFBaUI7QUFDaEQ7O0FBRUEscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxvREFBb0Q7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBLHNDQUFzQztBQUN0QyxNQUFNLElBQUk7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLHVCQUF1QjtBQUN2QixpQkFBaUIsZUFBZTtBQUNoQyxRQUFRLElBQUk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxlQUFlO0FBQ2YsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxlQUFlO0FBQ2YsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBLGVBQWU7QUFDZixHQUFHO0FBQ0g7QUFDQSxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsZUFBZTtBQUNmLEdBQUc7QUFDSDtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQTtBQUNBLGVBQWU7QUFDZixHQUFHO0FBQ0g7QUFDQSxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixHQUFHO0FBQ0g7QUFDQSxnQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJCQUEyQix3QkFBd0I7QUFDdkU7QUFDQSx1REFBdUQ7QUFDdkQsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRDtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIsNEJBQTRCO0FBQzVCLDJCQUEyQjtBQUMzQixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsZUFBZTtBQUNmLEdBQUc7QUFDSDtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxlQUFlO0FBQ2YsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLGVBQWU7QUFDZixHQUFHO0FBQ0g7QUFDQSxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsZUFBZTtBQUNmLEdBQUc7QUFDSDtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxlQUFlO0FBQ2YsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBLGVBQWU7QUFDZixHQUFHO0FBQ0g7QUFDQSxnQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0EsZUFBZTtBQUNmLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0Msc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsdURBQXVELFFBQVE7O0FBRS9EO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxnQkFBZ0IscUJBQXFCO0FBQ3JDO0FBQ0EsZUFBZTtBQUNmLEdBQUc7QUFDSDtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQSxlQUFlO0FBQ2YsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFJO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUk7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxXQUFXOztBQUVqQjtBQUNBLE1BQU0sdUZBQXVGLFVBQVUsb0JBQW9CLFFBQVEsbUVBQW1FLDRDQUE0QyxXQUFXLElBQUksRUFBRTs7QUFFblE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZwQkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyxrQ0FBYTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekI7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwQkFBMEIsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUJBQXVCLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwQkFBMEIsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUJBQXVCLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwQkFBMEIsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QixVQUFVO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDBCQUEwQixVQUFVO0FBQ3BFLDhCQUE4Qix1QkFBdUIsVUFBVTtBQUMvRDtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCLFVBQVU7QUFDcEUsOEJBQThCLHVCQUF1QixVQUFVO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFDQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdF9zb3VyY2Vfbm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC90ZXN0LXNvdXJjZS1ub2RlLmpzXCIpO1xuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbnZhciBoYXNOYXRpdmVNYXAgPSB0eXBlb2YgTWFwICE9PSBcInVuZGVmaW5lZFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggaXMgYSBjb21iaW5hdGlvbiBvZiBhbiBhcnJheSBhbmQgYSBzZXQuIEFkZGluZyBhIG5ld1xyXG4gKiBtZW1iZXIgaXMgTygxKSwgdGVzdGluZyBmb3IgbWVtYmVyc2hpcCBpcyBPKDEpLCBhbmQgZmluZGluZyB0aGUgaW5kZXggb2YgYW5cclxuICogZWxlbWVudCBpcyBPKDEpLiBSZW1vdmluZyBlbGVtZW50cyBmcm9tIHRoZSBzZXQgaXMgbm90IHN1cHBvcnRlZC4gT25seVxyXG4gKiBzdHJpbmdzIGFyZSBzdXBwb3J0ZWQgZm9yIG1lbWJlcnNoaXAuXHJcbiAqL1xyXG5mdW5jdGlvbiBBcnJheVNldCgpIHtcclxuICB0aGlzLl9hcnJheSA9IFtdO1xyXG4gIHRoaXMuX3NldCA9IGhhc05hdGl2ZU1hcCA/IG5ldyBNYXAoKSA6IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGF0aWMgbWV0aG9kIGZvciBjcmVhdGluZyBBcnJheVNldCBpbnN0YW5jZXMgZnJvbSBhbiBleGlzdGluZyBhcnJheS5cclxuICovXHJcbkFycmF5U2V0LmZyb21BcnJheSA9IGZ1bmN0aW9uIEFycmF5U2V0X2Zyb21BcnJheShhQXJyYXksIGFBbGxvd0R1cGxpY2F0ZXMpIHtcclxuICB2YXIgc2V0ID0gbmV3IEFycmF5U2V0KCk7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFBcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgc2V0LmFkZChhQXJyYXlbaV0sIGFBbGxvd0R1cGxpY2F0ZXMpO1xyXG4gIH1cclxuICByZXR1cm4gc2V0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBob3cgbWFueSB1bmlxdWUgaXRlbXMgYXJlIGluIHRoaXMgQXJyYXlTZXQuIElmIGR1cGxpY2F0ZXMgaGF2ZSBiZWVuXHJcbiAqIGFkZGVkLCB0aGFuIHRob3NlIGRvIG5vdCBjb3VudCB0b3dhcmRzIHRoZSBzaXplLlxyXG4gKlxyXG4gKiBAcmV0dXJucyBOdW1iZXJcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gQXJyYXlTZXRfc2l6ZSgpIHtcclxuICByZXR1cm4gaGFzTmF0aXZlTWFwXHJcbiAgICA/IHRoaXMuX3NldC5zaXplXHJcbiAgICA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX3NldCkubGVuZ3RoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCB0aGUgZ2l2ZW4gc3RyaW5nIHRvIHRoaXMgc2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBBcnJheVNldF9hZGQoYVN0ciwgYUFsbG93RHVwbGljYXRlcykge1xyXG4gIHZhciBzU3RyID0gaGFzTmF0aXZlTWFwID8gYVN0ciA6IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XHJcbiAgdmFyIGlzRHVwbGljYXRlID0gaGFzTmF0aXZlTWFwID8gdGhpcy5oYXMoYVN0cikgOiBoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpO1xyXG4gIHZhciBpZHggPSB0aGlzLl9hcnJheS5sZW5ndGg7XHJcbiAgaWYgKCFpc0R1cGxpY2F0ZSB8fCBhQWxsb3dEdXBsaWNhdGVzKSB7XHJcbiAgICB0aGlzLl9hcnJheS5wdXNoKGFTdHIpO1xyXG4gIH1cclxuICBpZiAoIWlzRHVwbGljYXRlKSB7XHJcbiAgICBpZiAoaGFzTmF0aXZlTWFwKSB7XHJcbiAgICAgIHRoaXMuX3NldC5zZXQoYVN0ciwgaWR4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldFtzU3RyXSA9IGlkeDtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSXMgdGhlIGdpdmVuIHN0cmluZyBhIG1lbWJlciBvZiB0aGlzIHNldD9cclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gQXJyYXlTZXRfaGFzKGFTdHIpIHtcclxuICBpZiAoaGFzTmF0aXZlTWFwKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2V0LmhhcyhhU3RyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHNTdHIgPSB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xyXG4gICAgcmV0dXJuIGhhcy5jYWxsKHRoaXMuX3NldCwgc1N0cik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoYXQgaXMgdGhlIGluZGV4IG9mIHRoZSBnaXZlbiBzdHJpbmcgaW4gdGhlIGFycmF5P1xyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbkFycmF5U2V0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gQXJyYXlTZXRfaW5kZXhPZihhU3RyKSB7XHJcbiAgaWYgKGhhc05hdGl2ZU1hcCkge1xyXG4gICAgdmFyIGlkeCA9IHRoaXMuX3NldC5nZXQoYVN0cik7XHJcbiAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAgcmV0dXJuIGlkeDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHNTdHIgPSB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xyXG4gICAgaWYgKGhhcy5jYWxsKHRoaXMuX3NldCwgc1N0cikpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3NldFtzU3RyXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcignXCInICsgYVN0ciArICdcIiBpcyBub3QgaW4gdGhlIHNldC4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGF0IGlzIHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleD9cclxuICpcclxuICogQHBhcmFtIE51bWJlciBhSWR4XHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuYXQgPSBmdW5jdGlvbiBBcnJheVNldF9hdChhSWR4KSB7XHJcbiAgaWYgKGFJZHggPj0gMCAmJiBhSWR4IDwgdGhpcy5fYXJyYXkubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbYUlkeF07XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihcIk5vIGVsZW1lbnQgaW5kZXhlZCBieSBcIiArIGFJZHgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc2V0ICh3aGljaCBoYXMgdGhlIHByb3BlciBpbmRpY2VzXHJcbiAqIGluZGljYXRlZCBieSBpbmRleE9mKS4gTm90ZSB0aGF0IHRoaXMgaXMgYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBhcnJheSB1c2VkXHJcbiAqIGZvciBzdG9yaW5nIHRoZSBtZW1iZXJzIHNvIHRoYXQgbm8gb25lIGNhbiBtZXNzIHdpdGggaW50ZXJuYWwgc3RhdGUuXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIEFycmF5U2V0X3RvQXJyYXkoKSB7XHJcbiAgcmV0dXJuIHRoaXMuX2FycmF5LnNsaWNlKCk7XHJcbn07XHJcblxyXG5leHBvcnRzLkFycmF5U2V0ID0gQXJyYXlTZXQ7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICpcclxuICogQmFzZWQgb24gdGhlIEJhc2UgNjQgVkxRIGltcGxlbWVudGF0aW9uIGluIENsb3N1cmUgQ29tcGlsZXI6XHJcbiAqIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2xvc3VyZS1jb21waWxlci9zb3VyY2UvYnJvd3NlL3RydW5rL3NyYy9jb20vZ29vZ2xlL2RlYnVnZ2luZy9zb3VyY2VtYXAvQmFzZTY0VkxRLmphdmFcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTEgVGhlIENsb3N1cmUgQ29tcGlsZXIgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XHJcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmVcclxuICogbWV0OlxyXG4gKlxyXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxyXG4gKiAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXHJcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmVcclxuICogICAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmdcclxuICogICAgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkXHJcbiAqICAgIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cclxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBHb29nbGUgSW5jLiBub3IgdGhlIG5hbWVzIG9mIGl0c1xyXG4gKiAgICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWRcclxuICogICAgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG4gKlxyXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTXHJcbiAqIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1RcclxuICogTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SXHJcbiAqIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUXHJcbiAqIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLFxyXG4gKiBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UXHJcbiAqIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLFxyXG4gKiBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTllcclxuICogVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxyXG4gKiAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0VcclxuICogT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cclxuICovXHJcblxyXG52YXIgYmFzZTY0ID0gcmVxdWlyZShcIi4vYmFzZTY0XCIpO1xyXG5cclxuLy8gQSBzaW5nbGUgYmFzZSA2NCBkaWdpdCBjYW4gY29udGFpbiA2IGJpdHMgb2YgZGF0YS4gRm9yIHRoZSBiYXNlIDY0IHZhcmlhYmxlXHJcbi8vIGxlbmd0aCBxdWFudGl0aWVzIHdlIHVzZSBpbiB0aGUgc291cmNlIG1hcCBzcGVjLCB0aGUgZmlyc3QgYml0IGlzIHRoZSBzaWduLFxyXG4vLyB0aGUgbmV4dCBmb3VyIGJpdHMgYXJlIHRoZSBhY3R1YWwgdmFsdWUsIGFuZCB0aGUgNnRoIGJpdCBpcyB0aGVcclxuLy8gY29udGludWF0aW9uIGJpdC4gVGhlIGNvbnRpbnVhdGlvbiBiaXQgdGVsbHMgdXMgd2hldGhlciB0aGVyZSBhcmUgbW9yZVxyXG4vLyBkaWdpdHMgaW4gdGhpcyB2YWx1ZSBmb2xsb3dpbmcgdGhpcyBkaWdpdC5cclxuLy9cclxuLy8gICBDb250aW51YXRpb25cclxuLy8gICB8ICAgIFNpZ25cclxuLy8gICB8ICAgIHxcclxuLy8gICBWICAgIFZcclxuLy8gICAxMDEwMTFcclxuXHJcbnZhciBWTFFfQkFTRV9TSElGVCA9IDU7XHJcblxyXG4vLyBiaW5hcnk6IDEwMDAwMFxyXG52YXIgVkxRX0JBU0UgPSAxIDw8IFZMUV9CQVNFX1NISUZUO1xyXG5cclxuLy8gYmluYXJ5OiAwMTExMTFcclxudmFyIFZMUV9CQVNFX01BU0sgPSBWTFFfQkFTRSAtIDE7XHJcblxyXG4vLyBiaW5hcnk6IDEwMDAwMFxyXG52YXIgVkxRX0NPTlRJTlVBVElPTl9CSVQgPSBWTFFfQkFTRTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBmcm9tIGEgdHdvLWNvbXBsZW1lbnQgdmFsdWUgdG8gYSB2YWx1ZSB3aGVyZSB0aGUgc2lnbiBiaXQgaXNcclxuICogcGxhY2VkIGluIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQuICBGb3IgZXhhbXBsZSwgYXMgZGVjaW1hbHM6XHJcbiAqICAgMSBiZWNvbWVzIDIgKDEwIGJpbmFyeSksIC0xIGJlY29tZXMgMyAoMTEgYmluYXJ5KVxyXG4gKiAgIDIgYmVjb21lcyA0ICgxMDAgYmluYXJ5KSwgLTIgYmVjb21lcyA1ICgxMDEgYmluYXJ5KVxyXG4gKi9cclxuZnVuY3Rpb24gdG9WTFFTaWduZWQoYVZhbHVlKSB7XHJcbiAgcmV0dXJuIGFWYWx1ZSA8IDAgPyAoLWFWYWx1ZSA8PCAxKSArIDEgOiAoYVZhbHVlIDw8IDEpICsgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRvIGEgdHdvLWNvbXBsZW1lbnQgdmFsdWUgZnJvbSBhIHZhbHVlIHdoZXJlIHRoZSBzaWduIGJpdCBpc1xyXG4gKiBwbGFjZWQgaW4gdGhlIGxlYXN0IHNpZ25pZmljYW50IGJpdC4gIEZvciBleGFtcGxlLCBhcyBkZWNpbWFsczpcclxuICogICAyICgxMCBiaW5hcnkpIGJlY29tZXMgMSwgMyAoMTEgYmluYXJ5KSBiZWNvbWVzIC0xXHJcbiAqICAgNCAoMTAwIGJpbmFyeSkgYmVjb21lcyAyLCA1ICgxMDEgYmluYXJ5KSBiZWNvbWVzIC0yXHJcbiAqL1xyXG5mdW5jdGlvbiBmcm9tVkxRU2lnbmVkKGFWYWx1ZSkge1xyXG4gIHZhciBpc05lZ2F0aXZlID0gKGFWYWx1ZSAmIDEpID09PSAxO1xyXG4gIHZhciBzaGlmdGVkID0gYVZhbHVlID4+IDE7XHJcbiAgcmV0dXJuIGlzTmVnYXRpdmUgPyAtc2hpZnRlZCA6IHNoaWZ0ZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBiYXNlIDY0IFZMUSBlbmNvZGVkIHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiBiYXNlNjRWTFFfZW5jb2RlKGFWYWx1ZSkge1xyXG4gIHZhciBlbmNvZGVkID0gXCJcIjtcclxuICB2YXIgZGlnaXQ7XHJcblxyXG4gIHZhciB2bHEgPSB0b1ZMUVNpZ25lZChhVmFsdWUpO1xyXG5cclxuICBkbyB7XHJcbiAgICBkaWdpdCA9IHZscSAmIFZMUV9CQVNFX01BU0s7XHJcbiAgICB2bHEgPj4+PSBWTFFfQkFTRV9TSElGVDtcclxuICAgIGlmICh2bHEgPiAwKSB7XHJcbiAgICAgIC8vIFRoZXJlIGFyZSBzdGlsbCBtb3JlIGRpZ2l0cyBpbiB0aGlzIHZhbHVlLCBzbyB3ZSBtdXN0IG1ha2Ugc3VyZSB0aGVcclxuICAgICAgLy8gY29udGludWF0aW9uIGJpdCBpcyBtYXJrZWQuXHJcbiAgICAgIGRpZ2l0IHw9IFZMUV9DT05USU5VQVRJT05fQklUO1xyXG4gICAgfVxyXG4gICAgZW5jb2RlZCArPSBiYXNlNjQuZW5jb2RlKGRpZ2l0KTtcclxuICB9IHdoaWxlICh2bHEgPiAwKTtcclxuXHJcbiAgcmV0dXJuIGVuY29kZWQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb2RlcyB0aGUgbmV4dCBiYXNlIDY0IFZMUSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBzdHJpbmcgYW5kIHJldHVybnMgdGhlXHJcbiAqIHZhbHVlIGFuZCB0aGUgcmVzdCBvZiB0aGUgc3RyaW5nIHZpYSB0aGUgb3V0IHBhcmFtZXRlci5cclxuICovXHJcbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gYmFzZTY0VkxRX2RlY29kZShhU3RyLCBhSW5kZXgsIGFPdXRQYXJhbSkge1xyXG4gIHZhciBzdHJMZW4gPSBhU3RyLmxlbmd0aDtcclxuICB2YXIgcmVzdWx0ID0gMDtcclxuICB2YXIgc2hpZnQgPSAwO1xyXG4gIHZhciBjb250aW51YXRpb24sIGRpZ2l0O1xyXG5cclxuICBkbyB7XHJcbiAgICBpZiAoYUluZGV4ID49IHN0ckxlbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBtb3JlIGRpZ2l0cyBpbiBiYXNlIDY0IFZMUSB2YWx1ZS5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlnaXQgPSBiYXNlNjQuZGVjb2RlKGFTdHIuY2hhckNvZGVBdChhSW5kZXgrKykpO1xyXG4gICAgaWYgKGRpZ2l0ID09PSAtMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBkaWdpdDogXCIgKyBhU3RyLmNoYXJBdChhSW5kZXggLSAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGludWF0aW9uID0gISEoZGlnaXQgJiBWTFFfQ09OVElOVUFUSU9OX0JJVCk7XHJcbiAgICBkaWdpdCAmPSBWTFFfQkFTRV9NQVNLO1xyXG4gICAgcmVzdWx0ID0gcmVzdWx0ICsgKGRpZ2l0IDw8IHNoaWZ0KTtcclxuICAgIHNoaWZ0ICs9IFZMUV9CQVNFX1NISUZUO1xyXG4gIH0gd2hpbGUgKGNvbnRpbnVhdGlvbik7XHJcblxyXG4gIGFPdXRQYXJhbS52YWx1ZSA9IGZyb21WTFFTaWduZWQocmVzdWx0KTtcclxuICBhT3V0UGFyYW0ucmVzdCA9IGFJbmRleDtcclxufTtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciBpbnRUb0NoYXJNYXAgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5zcGxpdChcclxuICBcIlwiXHJcbik7XHJcblxyXG4vKipcclxuICogRW5jb2RlIGFuIGludGVnZXIgaW4gdGhlIHJhbmdlIG9mIDAgdG8gNjMgdG8gYSBzaW5nbGUgYmFzZSA2NCBkaWdpdC5cclxuICovXHJcbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgaWYgKDAgPD0gbnVtYmVyICYmIG51bWJlciA8IGludFRvQ2hhck1hcC5sZW5ndGgpIHtcclxuICAgIHJldHVybiBpbnRUb0NoYXJNYXBbbnVtYmVyXTtcclxuICB9XHJcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk11c3QgYmUgYmV0d2VlbiAwIGFuZCA2MzogXCIgKyBudW1iZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29kZSBhIHNpbmdsZSBiYXNlIDY0IGNoYXJhY3RlciBjb2RlIGRpZ2l0IHRvIGFuIGludGVnZXIuIFJldHVybnMgLTEgb25cclxuICogZmFpbHVyZS5cclxuICovXHJcbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24oY2hhckNvZGUpIHtcclxuICB2YXIgYmlnQSA9IDY1OyAvLyAnQSdcclxuICB2YXIgYmlnWiA9IDkwOyAvLyAnWidcclxuXHJcbiAgdmFyIGxpdHRsZUEgPSA5NzsgLy8gJ2EnXHJcbiAgdmFyIGxpdHRsZVogPSAxMjI7IC8vICd6J1xyXG5cclxuICB2YXIgemVybyA9IDQ4OyAvLyAnMCdcclxuICB2YXIgbmluZSA9IDU3OyAvLyAnOSdcclxuXHJcbiAgdmFyIHBsdXMgPSA0MzsgLy8gJysnXHJcbiAgdmFyIHNsYXNoID0gNDc7IC8vICcvJ1xyXG5cclxuICB2YXIgbGl0dGxlT2Zmc2V0ID0gMjY7XHJcbiAgdmFyIG51bWJlck9mZnNldCA9IDUyO1xyXG5cclxuICAvLyAwIC0gMjU6IEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXHJcbiAgaWYgKGJpZ0EgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gYmlnWikge1xyXG4gICAgcmV0dXJuIGNoYXJDb2RlIC0gYmlnQTtcclxuICB9XHJcblxyXG4gIC8vIDI2IC0gNTE6IGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XHJcbiAgaWYgKGxpdHRsZUEgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbGl0dGxlWikge1xyXG4gICAgcmV0dXJuIGNoYXJDb2RlIC0gbGl0dGxlQSArIGxpdHRsZU9mZnNldDtcclxuICB9XHJcblxyXG4gIC8vIDUyIC0gNjE6IDAxMjM0NTY3ODlcclxuICBpZiAoemVybyA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSBuaW5lKSB7XHJcbiAgICByZXR1cm4gY2hhckNvZGUgLSB6ZXJvICsgbnVtYmVyT2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgLy8gNjI6ICtcclxuICBpZiAoY2hhckNvZGUgPT0gcGx1cykge1xyXG4gICAgcmV0dXJuIDYyO1xyXG4gIH1cclxuXHJcbiAgLy8gNjM6IC9cclxuICBpZiAoY2hhckNvZGUgPT0gc2xhc2gpIHtcclxuICAgIHJldHVybiA2MztcclxuICB9XHJcblxyXG4gIC8vIEludmFsaWQgYmFzZTY0IGRpZ2l0LlxyXG4gIHJldHVybiAtMTtcclxufTtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuR1JFQVRFU1RfTE9XRVJfQk9VTkQgPSAxO1xyXG5leHBvcnRzLkxFQVNUX1VQUEVSX0JPVU5EID0gMjtcclxuXHJcbi8qKlxyXG4gKiBSZWN1cnNpdmUgaW1wbGVtZW50YXRpb24gb2YgYmluYXJ5IHNlYXJjaC5cclxuICpcclxuICogQHBhcmFtIGFMb3cgSW5kaWNlcyBoZXJlIGFuZCBsb3dlciBkbyBub3QgY29udGFpbiB0aGUgbmVlZGxlLlxyXG4gKiBAcGFyYW0gYUhpZ2ggSW5kaWNlcyBoZXJlIGFuZCBoaWdoZXIgZG8gbm90IGNvbnRhaW4gdGhlIG5lZWRsZS5cclxuICogQHBhcmFtIGFOZWVkbGUgVGhlIGVsZW1lbnQgYmVpbmcgc2VhcmNoZWQgZm9yLlxyXG4gKiBAcGFyYW0gYUhheXN0YWNrIFRoZSBub24tZW1wdHkgYXJyYXkgYmVpbmcgc2VhcmNoZWQuXHJcbiAqIEBwYXJhbSBhQ29tcGFyZSBGdW5jdGlvbiB3aGljaCB0YWtlcyB0d28gZWxlbWVudHMgYW5kIHJldHVybnMgLTEsIDAsIG9yIDEuXHJcbiAqIEBwYXJhbSBhQmlhcyBFaXRoZXIgJ2JpbmFyeVNlYXJjaC5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcclxuICogICAgICdiaW5hcnlTZWFyY2guTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXHJcbiAqICAgICBjbG9zZXN0IGVsZW1lbnQgdGhhdCBpcyBzbWFsbGVyIHRoYW4gb3IgZ3JlYXRlciB0aGFuIHRoZSBvbmUgd2UgYXJlXHJcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIHJlY3Vyc2l2ZVNlYXJjaChhTG93LCBhSGlnaCwgYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpIHtcclxuICAvLyBUaGlzIGZ1bmN0aW9uIHRlcm1pbmF0ZXMgd2hlbiBvbmUgb2YgdGhlIGZvbGxvd2luZyBpcyB0cnVlOlxyXG4gIC8vXHJcbiAgLy8gICAxLiBXZSBmaW5kIHRoZSBleGFjdCBlbGVtZW50IHdlIGFyZSBsb29raW5nIGZvci5cclxuICAvL1xyXG4gIC8vICAgMi4gV2UgZGlkIG5vdCBmaW5kIHRoZSBleGFjdCBlbGVtZW50LCBidXQgd2UgY2FuIHJldHVybiB0aGUgaW5kZXggb2ZcclxuICAvLyAgICAgIHRoZSBuZXh0LWNsb3Nlc3QgZWxlbWVudC5cclxuICAvL1xyXG4gIC8vICAgMy4gV2UgZGlkIG5vdCBmaW5kIHRoZSBleGFjdCBlbGVtZW50LCBhbmQgdGhlcmUgaXMgbm8gbmV4dC1jbG9zZXN0XHJcbiAgLy8gICAgICBlbGVtZW50IHRoYW4gdGhlIG9uZSB3ZSBhcmUgc2VhcmNoaW5nIGZvciwgc28gd2UgcmV0dXJuIC0xLlxyXG4gIHZhciBtaWQgPSBNYXRoLmZsb29yKChhSGlnaCAtIGFMb3cpIC8gMikgKyBhTG93O1xyXG4gIHZhciBjbXAgPSBhQ29tcGFyZShhTmVlZGxlLCBhSGF5c3RhY2tbbWlkXSwgdHJ1ZSk7XHJcbiAgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgLy8gRm91bmQgdGhlIGVsZW1lbnQgd2UgYXJlIGxvb2tpbmcgZm9yLlxyXG4gICAgcmV0dXJuIG1pZDtcclxuICB9IGVsc2UgaWYgKGNtcCA+IDApIHtcclxuICAgIC8vIE91ciBuZWVkbGUgaXMgZ3JlYXRlciB0aGFuIGFIYXlzdGFja1ttaWRdLlxyXG4gICAgaWYgKGFIaWdoIC0gbWlkID4gMSkge1xyXG4gICAgICAvLyBUaGUgZWxlbWVudCBpcyBpbiB0aGUgdXBwZXIgaGFsZi5cclxuICAgICAgcmV0dXJuIHJlY3Vyc2l2ZVNlYXJjaChtaWQsIGFIaWdoLCBhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIGV4YWN0IG5lZWRsZSBlbGVtZW50IHdhcyBub3QgZm91bmQgaW4gdGhpcyBoYXlzdGFjay4gRGV0ZXJtaW5lIGlmXHJcbiAgICAvLyB3ZSBhcmUgaW4gdGVybWluYXRpb24gY2FzZSAoMykgb3IgKDIpIGFuZCByZXR1cm4gdGhlIGFwcHJvcHJpYXRlIHRoaW5nLlxyXG4gICAgaWYgKGFCaWFzID09IGV4cG9ydHMuTEVBU1RfVVBQRVJfQk9VTkQpIHtcclxuICAgICAgcmV0dXJuIGFIaWdoIDwgYUhheXN0YWNrLmxlbmd0aCA/IGFIaWdoIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbWlkO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBPdXIgbmVlZGxlIGlzIGxlc3MgdGhhbiBhSGF5c3RhY2tbbWlkXS5cclxuICAgIGlmIChtaWQgLSBhTG93ID4gMSkge1xyXG4gICAgICAvLyBUaGUgZWxlbWVudCBpcyBpbiB0aGUgbG93ZXIgaGFsZi5cclxuICAgICAgcmV0dXJuIHJlY3Vyc2l2ZVNlYXJjaChhTG93LCBtaWQsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3ZSBhcmUgaW4gdGVybWluYXRpb24gY2FzZSAoMykgb3IgKDIpIGFuZCByZXR1cm4gdGhlIGFwcHJvcHJpYXRlIHRoaW5nLlxyXG4gICAgaWYgKGFCaWFzID09IGV4cG9ydHMuTEVBU1RfVVBQRVJfQk9VTkQpIHtcclxuICAgICAgcmV0dXJuIG1pZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhTG93IDwgMCA/IC0xIDogYUxvdztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIGJpbmFyeSBzZWFyY2ggd2hpY2ggd2lsbCBhbHdheXMgdHJ5IGFuZCByZXR1cm5cclxuICogdGhlIGluZGV4IG9mIHRoZSBjbG9zZXN0IGVsZW1lbnQgaWYgdGhlcmUgaXMgbm8gZXhhY3QgaGl0LiBUaGlzIGlzIGJlY2F1c2VcclxuICogbWFwcGluZ3MgYmV0d2VlbiBvcmlnaW5hbCBhbmQgZ2VuZXJhdGVkIGxpbmUvY29sIHBhaXJzIGFyZSBzaW5nbGUgcG9pbnRzLFxyXG4gKiBhbmQgdGhlcmUgaXMgYW4gaW1wbGljaXQgcmVnaW9uIGJldHdlZW4gZWFjaCBvZiB0aGVtLCBzbyBhIG1pc3MganVzdCBtZWFuc1xyXG4gKiB0aGF0IHlvdSBhcmVuJ3Qgb24gdGhlIHZlcnkgc3RhcnQgb2YgYSByZWdpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBhTmVlZGxlIFRoZSBlbGVtZW50IHlvdSBhcmUgbG9va2luZyBmb3IuXHJcbiAqIEBwYXJhbSBhSGF5c3RhY2sgVGhlIGFycmF5IHRoYXQgaXMgYmVpbmcgc2VhcmNoZWQuXHJcbiAqIEBwYXJhbSBhQ29tcGFyZSBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIHRoZSBuZWVkbGUgYW5kIGFuIGVsZW1lbnQgaW4gdGhlXHJcbiAqICAgICBhcnJheSBhbmQgcmV0dXJucyAtMSwgMCwgb3IgMSBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgbmVlZGxlIGlzIGxlc3NcclxuICogICAgIHRoYW4sIGVxdWFsIHRvLCBvciBncmVhdGVyIHRoYW4gdGhlIGVsZW1lbnQsIHJlc3BlY3RpdmVseS5cclxuICogQHBhcmFtIGFCaWFzIEVpdGhlciAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxyXG4gKiAgICAgJ2JpbmFyeVNlYXJjaC5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcclxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcclxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxyXG4gKiAgICAgRGVmYXVsdHMgdG8gJ2JpbmFyeVNlYXJjaC5HUkVBVEVTVF9MT1dFUl9CT1VORCcuXHJcbiAqL1xyXG5leHBvcnRzLnNlYXJjaCA9IGZ1bmN0aW9uIHNlYXJjaChhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcykge1xyXG4gIGlmIChhSGF5c3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG5cclxuICB2YXIgaW5kZXggPSByZWN1cnNpdmVTZWFyY2goXHJcbiAgICAtMSxcclxuICAgIGFIYXlzdGFjay5sZW5ndGgsXHJcbiAgICBhTmVlZGxlLFxyXG4gICAgYUhheXN0YWNrLFxyXG4gICAgYUNvbXBhcmUsXHJcbiAgICBhQmlhcyB8fCBleHBvcnRzLkdSRUFURVNUX0xPV0VSX0JPVU5EXHJcbiAgKTtcclxuICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG5cclxuICAvLyBXZSBoYXZlIGZvdW5kIGVpdGhlciB0aGUgZXhhY3QgZWxlbWVudCwgb3IgdGhlIG5leHQtY2xvc2VzdCBlbGVtZW50IHRoYW5cclxuICAvLyB0aGUgb25lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLiBIb3dldmVyLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBzdWNoXHJcbiAgLy8gZWxlbWVudC4gTWFrZSBzdXJlIHdlIGFsd2F5cyByZXR1cm4gdGhlIHNtYWxsZXN0IG9mIHRoZXNlLlxyXG4gIHdoaWxlIChpbmRleCAtIDEgPj0gMCkge1xyXG4gICAgaWYgKGFDb21wYXJlKGFIYXlzdGFja1tpbmRleF0sIGFIYXlzdGFja1tpbmRleCAtIDFdLCB0cnVlKSAhPT0gMCkge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIC0taW5kZXg7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW5kZXg7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTQgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgbWFwcGluZ0IgaXMgYWZ0ZXIgbWFwcGluZ0Egd2l0aCByZXNwZWN0IHRvIGdlbmVyYXRlZFxyXG4gKiBwb3NpdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIGdlbmVyYXRlZFBvc2l0aW9uQWZ0ZXIobWFwcGluZ0EsIG1hcHBpbmdCKSB7XHJcbiAgLy8gT3B0aW1pemVkIGZvciBtb3N0IGNvbW1vbiBjYXNlXHJcbiAgdmFyIGxpbmVBID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZTtcclxuICB2YXIgbGluZUIgPSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIHZhciBjb2x1bW5BID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIHZhciBjb2x1bW5CID0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIHJldHVybiAoXHJcbiAgICBsaW5lQiA+IGxpbmVBIHx8XHJcbiAgICAobGluZUIgPT0gbGluZUEgJiYgY29sdW1uQiA+PSBjb2x1bW5BKSB8fFxyXG4gICAgdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZChtYXBwaW5nQSwgbWFwcGluZ0IpIDw9IDBcclxuICApO1xyXG59XHJcblxyXG4vKipcclxuICogQSBkYXRhIHN0cnVjdHVyZSB0byBwcm92aWRlIGEgc29ydGVkIHZpZXcgb2YgYWNjdW11bGF0ZWQgbWFwcGluZ3MgaW4gYVxyXG4gKiBwZXJmb3JtYW5jZSBjb25zY2lvdXMgbWFubmVyLiBJdCB0cmFkZXMgYSBuZWdsaWdpYmxlIG92ZXJoZWFkIGluIGdlbmVyYWxcclxuICogY2FzZSBmb3IgYSBsYXJnZSBzcGVlZHVwIGluIGNhc2Ugb2YgbWFwcGluZ3MgYmVpbmcgYWRkZWQgaW4gb3JkZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBNYXBwaW5nTGlzdCgpIHtcclxuICB0aGlzLl9hcnJheSA9IFtdO1xyXG4gIHRoaXMuX3NvcnRlZCA9IHRydWU7XHJcbiAgLy8gU2VydmVzIGFzIGluZmltdW1cclxuICB0aGlzLl9sYXN0ID0geyBnZW5lcmF0ZWRMaW5lOiAtMSwgZ2VuZXJhdGVkQ29sdW1uOiAwIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIHRocm91Z2ggaW50ZXJuYWwgaXRlbXMuIFRoaXMgbWV0aG9kIHRha2VzIHRoZSBzYW1lIGFyZ3VtZW50cyB0aGF0XHJcbiAqIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgdGFrZXMuXHJcbiAqXHJcbiAqIE5PVEU6IFRoZSBvcmRlciBvZiB0aGUgbWFwcGluZ3MgaXMgTk9UIGd1YXJhbnRlZWQuXHJcbiAqL1xyXG5NYXBwaW5nTGlzdC5wcm90b3R5cGUudW5zb3J0ZWRGb3JFYWNoID0gZnVuY3Rpb24gTWFwcGluZ0xpc3RfZm9yRWFjaChcclxuICBhQ2FsbGJhY2ssXHJcbiAgYVRoaXNBcmdcclxuKSB7XHJcbiAgdGhpcy5fYXJyYXkuZm9yRWFjaChhQ2FsbGJhY2ssIGFUaGlzQXJnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGdpdmVuIHNvdXJjZSBtYXBwaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0gT2JqZWN0IGFNYXBwaW5nXHJcbiAqL1xyXG5NYXBwaW5nTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gTWFwcGluZ0xpc3RfYWRkKGFNYXBwaW5nKSB7XHJcbiAgaWYgKGdlbmVyYXRlZFBvc2l0aW9uQWZ0ZXIodGhpcy5fbGFzdCwgYU1hcHBpbmcpKSB7XHJcbiAgICB0aGlzLl9sYXN0ID0gYU1hcHBpbmc7XHJcbiAgICB0aGlzLl9hcnJheS5wdXNoKGFNYXBwaW5nKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9hcnJheS5wdXNoKGFNYXBwaW5nKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZmxhdCwgc29ydGVkIGFycmF5IG9mIG1hcHBpbmdzLiBUaGUgbWFwcGluZ3MgYXJlIHNvcnRlZCBieVxyXG4gKiBnZW5lcmF0ZWQgcG9zaXRpb24uXHJcbiAqXHJcbiAqIFdBUk5JTkc6IFRoaXMgbWV0aG9kIHJldHVybnMgaW50ZXJuYWwgZGF0YSB3aXRob3V0IGNvcHlpbmcsIGZvclxyXG4gKiBwZXJmb3JtYW5jZS4gVGhlIHJldHVybiB2YWx1ZSBtdXN0IE5PVCBiZSBtdXRhdGVkLCBhbmQgc2hvdWxkIGJlIHRyZWF0ZWQgYXNcclxuICogYW4gaW1tdXRhYmxlIGJvcnJvdy4gSWYgeW91IHdhbnQgdG8gdGFrZSBvd25lcnNoaXAsIHlvdSBtdXN0IG1ha2UgeW91ciBvd25cclxuICogY29weS5cclxuICovXHJcbk1hcHBpbmdMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gTWFwcGluZ0xpc3RfdG9BcnJheSgpIHtcclxuICBpZiAoIXRoaXMuX3NvcnRlZCkge1xyXG4gICAgdGhpcy5fYXJyYXkuc29ydCh1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKTtcclxuICAgIHRoaXMuX3NvcnRlZCA9IHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLl9hcnJheTtcclxufTtcclxuXHJcbmV4cG9ydHMuTWFwcGluZ0xpc3QgPSBNYXBwaW5nTGlzdDtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbi8vIEl0IHR1cm5zIG91dCB0aGF0IHNvbWUgKG1vc3Q/KSBKYXZhU2NyaXB0IGVuZ2luZXMgZG9uJ3Qgc2VsZi1ob3N0XHJcbi8vIGBBcnJheS5wcm90b3R5cGUuc29ydGAuIFRoaXMgbWFrZXMgc2Vuc2UgYmVjYXVzZSBDKysgd2lsbCBsaWtlbHkgcmVtYWluXHJcbi8vIGZhc3RlciB0aGFuIEpTIHdoZW4gZG9pbmcgcmF3IENQVS1pbnRlbnNpdmUgc29ydGluZy4gSG93ZXZlciwgd2hlbiB1c2luZyBhXHJcbi8vIGN1c3RvbSBjb21wYXJhdG9yIGZ1bmN0aW9uLCBjYWxsaW5nIGJhY2sgYW5kIGZvcnRoIGJldHdlZW4gdGhlIFZNJ3MgQysrIGFuZFxyXG4vLyBKSVQnZCBKUyBpcyByYXRoZXIgc2xvdyAqYW5kKiBsb3NlcyBKSVQgdHlwZSBpbmZvcm1hdGlvbiwgcmVzdWx0aW5nIGluXHJcbi8vIHdvcnNlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgY29tcGFyYXRvciBmdW5jdGlvbiB0aGFuIHdvdWxkIGJlIG9wdGltYWwuIEluXHJcbi8vIGZhY3QsIHdoZW4gc29ydGluZyB3aXRoIGEgY29tcGFyYXRvciwgdGhlc2UgY29zdHMgb3V0d2VpZ2ggdGhlIGJlbmVmaXRzIG9mXHJcbi8vIHNvcnRpbmcgaW4gQysrLiBCeSB1c2luZyBvdXIgb3duIEpTLWltcGxlbWVudGVkIFF1aWNrIFNvcnQgKGJlbG93KSwgd2UgZ2V0XHJcbi8vIGEgfjM1MDBtcyBtZWFuIHNwZWVkLXVwIGluIGBiZW5jaC9iZW5jaC5odG1sYC5cclxuXHJcbi8vIENhcHR1cmUgTWF0aC5yYW5kb20oKSBub3csIHRvIGF2b2lkIHByb2JsZW1zIGluIGNhc2UgYSB0ZXN0IG1vY2tzIGl0IGxhdGVyLlxyXG4vLyBJZiBNYXRoLnJhbmRvbSgpIGlzIG1vY2tlZCB0byByZXR1cm4gYSBjb25zdGFudCB2YWx1ZSwgcXVpY2tTb3J0IG1heSBiZWNvbWVcclxuLy8gTyhuXjIpIHdoZW4gaW52b2tlZCBvbiBhbHJlYWR5LXNvcnRlZCBkYXRhLlxyXG52YXIgcmFuZG9tID0gTWF0aC5yYW5kb207XHJcblxyXG4vKipcclxuICogU3dhcCB0aGUgZWxlbWVudHMgaW5kZXhlZCBieSBgeGAgYW5kIGB5YCBpbiB0aGUgYXJyYXkgYGFyeWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyeVxyXG4gKiAgICAgICAgVGhlIGFycmF5LlxyXG4gKiBAcGFyYW0ge051bWJlcn0geFxyXG4gKiAgICAgICAgVGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpdGVtLlxyXG4gKiBAcGFyYW0ge051bWJlcn0geVxyXG4gKiAgICAgICAgVGhlIGluZGV4IG9mIHRoZSBzZWNvbmQgaXRlbS5cclxuICovXHJcbmZ1bmN0aW9uIHN3YXAoYXJ5LCB4LCB5KSB7XHJcbiAgdmFyIHRlbXAgPSBhcnlbeF07XHJcbiAgYXJ5W3hdID0gYXJ5W3ldO1xyXG4gIGFyeVt5XSA9IHRlbXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgd2l0aGluIHRoZSByYW5nZSBgbG93IC4uIGhpZ2hgIGluY2x1c2l2ZS5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxvd1xyXG4gKiAgICAgICAgVGhlIGxvd2VyIGJvdW5kIG9uIHRoZSByYW5nZS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhpZ2hcclxuICogICAgICAgIFRoZSB1cHBlciBib3VuZCBvbiB0aGUgcmFuZ2UuXHJcbiAqL1xyXG5mdW5jdGlvbiByYW5kb21JbnRJblJhbmdlKGxvdywgaGlnaCkge1xyXG4gIHJldHVybiBNYXRoLnJvdW5kKGxvdyArIHJhbmRvbSgpICogKGhpZ2ggLSBsb3cpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBRdWljayBTb3J0IGFsZ29yaXRobS5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJ5XHJcbiAqICAgICAgICBBbiBhcnJheSB0byBzb3J0LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJhdG9yXHJcbiAqICAgICAgICBGdW5jdGlvbiB0byB1c2UgdG8gY29tcGFyZSB0d28gaXRlbXMuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwXHJcbiAqICAgICAgICBTdGFydCBpbmRleCBvZiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJcclxuICogICAgICAgIEVuZCBpbmRleCBvZiB0aGUgYXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcCwgcikge1xyXG4gIC8vIElmIG91ciBsb3dlciBib3VuZCBpcyBsZXNzIHRoYW4gb3VyIHVwcGVyIGJvdW5kLCB3ZSAoMSkgcGFydGl0aW9uIHRoZVxyXG4gIC8vIGFycmF5IGludG8gdHdvIHBpZWNlcyBhbmQgKDIpIHJlY3Vyc2Ugb24gZWFjaCBoYWxmLiBJZiBpdCBpcyBub3QsIHRoaXMgaXNcclxuICAvLyB0aGUgZW1wdHkgYXJyYXkgYW5kIG91ciBiYXNlIGNhc2UuXHJcblxyXG4gIGlmIChwIDwgcikge1xyXG4gICAgLy8gKDEpIFBhcnRpdGlvbmluZy5cclxuICAgIC8vXHJcbiAgICAvLyBUaGUgcGFydGl0aW9uaW5nIGNob29zZXMgYSBwaXZvdCBiZXR3ZWVuIGBwYCBhbmQgYHJgIGFuZCBtb3ZlcyBhbGxcclxuICAgIC8vIGVsZW1lbnRzIHRoYXQgYXJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3QgdG8gdGhlIGJlZm9yZSBpdCwgYW5kXHJcbiAgICAvLyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgYXJlIGdyZWF0ZXIgdGhhbiBpdCBhZnRlciBpdC4gVGhlIGVmZmVjdCBpcyB0aGF0XHJcbiAgICAvLyBvbmNlIHBhcnRpdGlvbiBpcyBkb25lLCB0aGUgcGl2b3QgaXMgaW4gdGhlIGV4YWN0IHBsYWNlIGl0IHdpbGwgYmUgd2hlblxyXG4gICAgLy8gdGhlIGFycmF5IGlzIHB1dCBpbiBzb3J0ZWQgb3JkZXIsIGFuZCBpdCB3aWxsIG5vdCBuZWVkIHRvIGJlIG1vdmVkXHJcbiAgICAvLyBhZ2Fpbi4gVGhpcyBydW5zIGluIE8obiBsb2cgbikgdGltZS5cclxuXHJcbiAgICAvLyBBbHdheXMgY2hvb3NlIGEgcmFuZG9tIHBpdm90IHNvIHRoYXQgYW4gaW5wdXQgYXJyYXkgd2hpY2ggaXMgcmV2ZXJzZVxyXG4gICAgLy8gc29ydGVkIGRvZXMgbm90IGNhdXNlIE8obl4yKSBydW5uaW5nIHRpbWUuXHJcbiAgICB2YXIgcGl2b3RJbmRleCA9IHJhbmRvbUludEluUmFuZ2UocCwgcik7XHJcbiAgICB2YXIgaSA9IHAgLSAxO1xyXG5cclxuICAgIHN3YXAoYXJ5LCBwaXZvdEluZGV4LCByKTtcclxuICAgIHZhciBwaXZvdCA9IGFyeVtyXTtcclxuXHJcbiAgICAvLyBJbW1lZGlhdGVseSBhZnRlciBgamAgaXMgaW5jcmVtZW50ZWQgaW4gdGhpcyBsb29wLCB0aGUgZm9sbG93aW5nIGhvbGRcclxuICAgIC8vIHRydWU6XHJcbiAgICAvL1xyXG4gICAgLy8gICAqIEV2ZXJ5IGVsZW1lbnQgaW4gYGFyeVtwIC4uIGldYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHBpdm90LlxyXG4gICAgLy9cclxuICAgIC8vICAgKiBFdmVyeSBlbGVtZW50IGluIGBhcnlbaSsxIC4uIGotMV1gIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGl2b3QuXHJcbiAgICBmb3IgKHZhciBqID0gcDsgaiA8IHI7IGorKykge1xyXG4gICAgICBpZiAoY29tcGFyYXRvcihhcnlbal0sIHBpdm90KSA8PSAwKSB7XHJcbiAgICAgICAgaSArPSAxO1xyXG4gICAgICAgIHN3YXAoYXJ5LCBpLCBqKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN3YXAoYXJ5LCBpICsgMSwgaik7XHJcbiAgICB2YXIgcSA9IGkgKyAxO1xyXG5cclxuICAgIC8vICgyKSBSZWN1cnNlIG9uIGVhY2ggaGFsZi5cclxuXHJcbiAgICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHAsIHEgLSAxKTtcclxuICAgIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcSArIDEsIHIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNvcnQgdGhlIGdpdmVuIGFycmF5IGluLXBsYWNlIHdpdGggdGhlIGdpdmVuIGNvbXBhcmF0b3IgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyeVxyXG4gKiAgICAgICAgQW4gYXJyYXkgdG8gc29ydC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29tcGFyYXRvclxyXG4gKiAgICAgICAgRnVuY3Rpb24gdG8gdXNlIHRvIGNvbXBhcmUgdHdvIGl0ZW1zLlxyXG4gKi9cclxuZXhwb3J0cy5xdWlja1NvcnQgPSBmdW5jdGlvbihhcnksIGNvbXBhcmF0b3IpIHtcclxuICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIDAsIGFyeS5sZW5ndGggLSAxKTtcclxufTtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxudmFyIGJpbmFyeVNlYXJjaCA9IHJlcXVpcmUoXCIuL2JpbmFyeS1zZWFyY2hcIik7XHJcbnZhciBBcnJheVNldCA9IHJlcXVpcmUoXCIuL2FycmF5LXNldFwiKS5BcnJheVNldDtcclxudmFyIGJhc2U2NFZMUSA9IHJlcXVpcmUoXCIuL2Jhc2U2NC12bHFcIik7XHJcbnZhciBxdWlja1NvcnQgPSByZXF1aXJlKFwiLi9xdWljay1zb3J0XCIpLnF1aWNrU29ydDtcclxuXHJcbmZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcclxuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHNvdXJjZU1hcCA9IHV0aWwucGFyc2VTb3VyY2VNYXBJbnB1dChhU291cmNlTWFwKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzb3VyY2VNYXAuc2VjdGlvbnMgIT0gbnVsbFxyXG4gICAgPyBuZXcgSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTClcclxuICAgIDogbmV3IEJhc2ljU291cmNlTWFwQ29uc3VtZXIoc291cmNlTWFwLCBhU291cmNlTWFwVVJMKTtcclxufVxyXG5cclxuU291cmNlTWFwQ29uc3VtZXIuZnJvbVNvdXJjZU1hcCA9IGZ1bmN0aW9uKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICByZXR1cm4gQmFzaWNTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cclxuICovXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vLyBgX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kIGBfX29yaWdpbmFsTWFwcGluZ3NgIGFyZSBhcnJheXMgdGhhdCBob2xkIHRoZVxyXG4vLyBwYXJzZWQgbWFwcGluZyBjb29yZGluYXRlcyBmcm9tIHRoZSBzb3VyY2UgbWFwJ3MgXCJtYXBwaW5nc1wiIGF0dHJpYnV0ZS4gVGhleVxyXG4vLyBhcmUgbGF6aWx5IGluc3RhbnRpYXRlZCwgYWNjZXNzZWQgdmlhIHRoZSBgX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcclxuLy8gYF9vcmlnaW5hbE1hcHBpbmdzYCBnZXR0ZXJzIHJlc3BlY3RpdmVseSwgYW5kIHdlIG9ubHkgcGFyc2UgdGhlIG1hcHBpbmdzXHJcbi8vIGFuZCBjcmVhdGUgdGhlc2UgYXJyYXlzIG9uY2UgcXVlcmllZCBmb3IgYSBzb3VyY2UgbG9jYXRpb24uIFdlIGp1bXAgdGhyb3VnaFxyXG4vLyB0aGVzZSBob29wcyBiZWNhdXNlIHRoZXJlIGNhbiBiZSBtYW55IHRob3VzYW5kcyBvZiBtYXBwaW5ncywgYW5kIHBhcnNpbmdcclxuLy8gdGhlbSBpcyBleHBlbnNpdmUsIHNvIHdlIG9ubHkgd2FudCB0byBkbyBpdCBpZiB3ZSBtdXN0LlxyXG4vL1xyXG4vLyBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXlzIGlzIG9mIHRoZSBmb3JtOlxyXG4vL1xyXG4vLyAgICAge1xyXG4vLyAgICAgICBnZW5lcmF0ZWRMaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBjb2RlLFxyXG4vLyAgICAgICBnZW5lcmF0ZWRDb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgY29kZSxcclxuLy8gICAgICAgc291cmNlOiBUaGUgcGF0aCB0byB0aGUgb3JpZ2luYWwgc291cmNlIGZpbGUgdGhhdCBnZW5lcmF0ZWQgdGhpc1xyXG4vLyAgICAgICAgICAgICAgIGNodW5rIG9mIGNvZGUsXHJcbi8vICAgICAgIG9yaWdpbmFsTGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UgdGhhdFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRzIHRvIHRoaXMgY2h1bmsgb2YgZ2VuZXJhdGVkIGNvZGUsXHJcbi8vICAgICAgIG9yaWdpbmFsQ29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlIHRoYXRcclxuLy8gICAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRzIHRvIHRoaXMgY2h1bmsgb2YgZ2VuZXJhdGVkIGNvZGUsXHJcbi8vICAgICAgIG5hbWU6IFRoZSBuYW1lIG9mIHRoZSBvcmlnaW5hbCBzeW1ib2wgd2hpY2ggZ2VuZXJhdGVkIHRoaXMgY2h1bmsgb2ZcclxuLy8gICAgICAgICAgICAgY29kZS5cclxuLy8gICAgIH1cclxuLy9cclxuLy8gQWxsIHByb3BlcnRpZXMgZXhjZXB0IGZvciBgZ2VuZXJhdGVkTGluZWAgYW5kIGBnZW5lcmF0ZWRDb2x1bW5gIGNhbiBiZVxyXG4vLyBgbnVsbGAuXHJcbi8vXHJcbi8vIGBfZ2VuZXJhdGVkTWFwcGluZ3NgIGlzIG9yZGVyZWQgYnkgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMuXHJcbi8vXHJcbi8vIGBfb3JpZ2luYWxNYXBwaW5nc2AgaXMgb3JkZXJlZCBieSB0aGUgb3JpZ2luYWwgcG9zaXRpb25zLlxyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBudWxsO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCBcIl9nZW5lcmF0ZWRNYXBwaW5nc1wiLCB7XHJcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzKSB7XHJcbiAgICAgIHRoaXMuX3NvcnRHZW5lcmF0ZWRNYXBwaW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3M7XHJcbiAgfVxyXG59KTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fX29yaWdpbmFsTWFwcGluZ3MgPSBudWxsO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCBcIl9vcmlnaW5hbE1hcHBpbmdzXCIsIHtcclxuICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncykge1xyXG4gICAgICB0aGlzLl9zb3J0T3JpZ2luYWxNYXBwaW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncztcclxuICB9XHJcbn0pO1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9fZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZCA9IG51bGw7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShcclxuICBTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsXHJcbiAgXCJfZ2VuZXJhdGVkTWFwcGluZ3NVbnNvcnRlZFwiLFxyXG4gIHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoIXRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyc2VNYXBwaW5ncyh0aGlzLl9tYXBwaW5ncywgdGhpcy5zb3VyY2VSb290KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkO1xyXG4gICAgfVxyXG4gIH1cclxuKTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZCA9IG51bGw7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShcclxuICBTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsXHJcbiAgXCJfb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkXCIsXHJcbiAge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghdGhpcy5fX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcnNlTWFwcGluZ3ModGhpcy5fbWFwcGluZ3MsIHRoaXMuc291cmNlUm9vdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc1Vuc29ydGVkO1xyXG4gICAgfVxyXG4gIH1cclxuKTtcclxuXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fY2hhcklzTWFwcGluZ1NlcGFyYXRvciA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2NoYXJJc01hcHBpbmdTZXBhcmF0b3IoXHJcbiAgYVN0cixcclxuICBpbmRleFxyXG4pIHtcclxuICB2YXIgYyA9IGFTdHIuY2hhckF0KGluZGV4KTtcclxuICByZXR1cm4gYyA9PT0gXCI7XCIgfHwgYyA9PT0gXCIsXCI7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyc2UgdGhlIG1hcHBpbmdzIGluIGEgc3RyaW5nIGluIHRvIGEgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggd2UgY2FuIGVhc2lseVxyXG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcclxuICogYHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzYCBwcm9wZXJ0aWVzKS5cclxuICovXHJcblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fcGFyc2VNYXBwaW5ncyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3BhcnNlTWFwcGluZ3MoXHJcbiAgYVN0cixcclxuICBhU291cmNlUm9vdFxyXG4pIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXCJTdWJjbGFzc2VzIG11c3QgaW1wbGVtZW50IF9wYXJzZU1hcHBpbmdzXCIpO1xyXG59O1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9zb3J0R2VuZXJhdGVkTWFwcGluZ3MgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9zb3J0R2VuZXJhdGVkTWFwcGluZ3MoKSB7XHJcbiAgY29uc3QgbWFwcGluZ3MgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkO1xyXG4gIHF1aWNrU29ydChtYXBwaW5ncywgdXRpbC5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCk7XHJcbiAgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzID0gbWFwcGluZ3M7XHJcbn07XHJcblxyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3NvcnRPcmlnaW5hbE1hcHBpbmdzID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfc29ydE9yaWdpbmFsTWFwcGluZ3MoKSB7XHJcbiAgY29uc3QgbWFwcGluZ3MgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzVW5zb3J0ZWQ7XHJcbiAgcXVpY2tTb3J0KG1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zKTtcclxuICB0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncyA9IG1hcHBpbmdzO1xyXG59O1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSID0gMTtcclxuU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVIgPSAyO1xyXG5cclxuU291cmNlTWFwQ29uc3VtZXIuR1JFQVRFU1RfTE9XRVJfQk9VTkQgPSAxO1xyXG5Tb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCA9IDI7XHJcblxyXG4vKipcclxuICogSXRlcmF0ZSBvdmVyIGVhY2ggbWFwcGluZyBiZXR3ZWVuIGFuIG9yaWdpbmFsIHNvdXJjZS9saW5lL2NvbHVtbiBhbmQgYVxyXG4gKiBnZW5lcmF0ZWQgbGluZS9jb2x1bW4gaW4gdGhpcyBzb3VyY2UgbWFwLlxyXG4gKlxyXG4gKiBAcGFyYW0gRnVuY3Rpb24gYUNhbGxiYWNrXHJcbiAqICAgICAgICBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2l0aCBlYWNoIG1hcHBpbmcuXHJcbiAqIEBwYXJhbSBPYmplY3QgYUNvbnRleHRcclxuICogICAgICAgIE9wdGlvbmFsLiBJZiBzcGVjaWZpZWQsIHRoaXMgb2JqZWN0IHdpbGwgYmUgdGhlIHZhbHVlIG9mIGB0aGlzYCBldmVyeVxyXG4gKiAgICAgICAgdGltZSB0aGF0IGBhQ2FsbGJhY2tgIGlzIGNhbGxlZC5cclxuICogQHBhcmFtIGFPcmRlclxyXG4gKiAgICAgICAgRWl0aGVyIGBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVJgIG9yXHJcbiAqICAgICAgICBgU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVJgLiBTcGVjaWZpZXMgd2hldGhlciB5b3Ugd2FudCB0b1xyXG4gKiAgICAgICAgaXRlcmF0ZSBvdmVyIHRoZSBtYXBwaW5ncyBzb3J0ZWQgYnkgdGhlIGdlbmVyYXRlZCBmaWxlJ3MgbGluZS9jb2x1bW5cclxuICogICAgICAgIG9yZGVyIG9yIHRoZSBvcmlnaW5hbCdzIHNvdXJjZS9saW5lL2NvbHVtbiBvcmRlciwgcmVzcGVjdGl2ZWx5LiBEZWZhdWx0cyB0b1xyXG4gKiAgICAgICAgYFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUmAuXHJcbiAqL1xyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZWFjaE1hcHBpbmcgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9lYWNoTWFwcGluZyhcclxuICBhQ2FsbGJhY2ssXHJcbiAgYUNvbnRleHQsXHJcbiAgYU9yZGVyXHJcbikge1xyXG4gIHZhciBjb250ZXh0ID0gYUNvbnRleHQgfHwgbnVsbDtcclxuICB2YXIgb3JkZXIgPSBhT3JkZXIgfHwgU291cmNlTWFwQ29uc3VtZXIuR0VORVJBVEVEX09SREVSO1xyXG5cclxuICB2YXIgbWFwcGluZ3M7XHJcbiAgc3dpdGNoIChvcmRlcikge1xyXG4gICAgY2FzZSBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVI6XHJcbiAgICAgIG1hcHBpbmdzID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3M7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBTb3VyY2VNYXBDb25zdW1lci5PUklHSU5BTF9PUkRFUjpcclxuICAgICAgbWFwcGluZ3MgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gb3JkZXIgb2YgaXRlcmF0aW9uLlwiKTtcclxuICB9XHJcblxyXG4gIHZhciBzb3VyY2VSb290ID0gdGhpcy5zb3VyY2VSb290O1xyXG4gIG1hcHBpbmdzXHJcbiAgICAubWFwKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgICAgdmFyIHNvdXJjZSA9IG51bGw7XHJcbiAgICAgIGlmIChtYXBwaW5nLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgc291cmNlID0gdGhpcy5fc291cmNlcy5hdChtYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHNvdXJjZSwgdGhpcy5fc291cmNlTWFwVVJMKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICAgIGdlbmVyYXRlZExpbmU6IG1hcHBpbmcuZ2VuZXJhdGVkTGluZSxcclxuICAgICAgICBnZW5lcmF0ZWRDb2x1bW46IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uLFxyXG4gICAgICAgIG9yaWdpbmFsTGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXHJcbiAgICAgICAgb3JpZ2luYWxDb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgICAgbmFtZTogbWFwcGluZy5uYW1lID09IG51bGwgPyBudWxsIDogdGhpcy5fbmFtZXMuYXQobWFwcGluZy5uYW1lKVxyXG4gICAgICB9O1xyXG4gICAgfSwgdGhpcylcclxuICAgIC5mb3JFYWNoKGFDYWxsYmFjaywgY29udGV4dCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbGwgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcclxuICogbGluZSwgYW5kIGNvbHVtbiBwcm92aWRlZC4gSWYgbm8gY29sdW1uIGlzIHByb3ZpZGVkLCByZXR1cm5zIGFsbCBtYXBwaW5nc1xyXG4gKiBjb3JyZXNwb25kaW5nIHRvIGEgZWl0aGVyIHRoZSBsaW5lIHdlIGFyZSBzZWFyY2hpbmcgZm9yIG9yIHRoZSBuZXh0XHJcbiAqIGNsb3Nlc3QgbGluZSB0aGF0IGhhcyBhbnkgbWFwcGluZ3MuIE90aGVyd2lzZSwgcmV0dXJucyBhbGwgbWFwcGluZ3NcclxuICogY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4gbGluZSBhbmQgZWl0aGVyIHRoZSBjb2x1bW4gd2UgYXJlIHNlYXJjaGluZyBmb3JcclxuICogb3IgdGhlIG5leHQgY2xvc2VzdCBjb2x1bW4gdGhhdCBoYXMgYW55IG9mZnNldHMuXHJcbiAqXHJcbiAqIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBPcHRpb25hbC4gdGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICpcclxuICogYW5kIGFuIGFycmF5IG9mIG9iamVjdHMgaXMgcmV0dXJuZWQsIGVhY2ggd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXHJcbiAqICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqL1xyXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yID0gZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfYWxsR2VuZXJhdGVkUG9zaXRpb25zRm9yKFxyXG4gIGFBcmdzXHJcbikge1xyXG4gIHZhciBsaW5lID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwibGluZVwiKTtcclxuXHJcbiAgLy8gV2hlbiB0aGVyZSBpcyBubyBleGFjdCBtYXRjaCwgQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2ZpbmRNYXBwaW5nXHJcbiAgLy8gcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGNsb3Nlc3QgbWFwcGluZyBsZXNzIHRoYW4gdGhlIG5lZWRsZS4gQnlcclxuICAvLyBzZXR0aW5nIG5lZWRsZS5vcmlnaW5hbENvbHVtbiB0byAwLCB3ZSB0aHVzIGZpbmQgdGhlIGxhc3QgbWFwcGluZyBmb3JcclxuICAvLyB0aGUgZ2l2ZW4gbGluZSwgcHJvdmlkZWQgc3VjaCBhIG1hcHBpbmcgZXhpc3RzLlxyXG4gIHZhciBuZWVkbGUgPSB7XHJcbiAgICBzb3VyY2U6IHV0aWwuZ2V0QXJnKGFBcmdzLCBcInNvdXJjZVwiKSxcclxuICAgIG9yaWdpbmFsTGluZTogbGluZSxcclxuICAgIG9yaWdpbmFsQ29sdW1uOiB1dGlsLmdldEFyZyhhQXJncywgXCJjb2x1bW5cIiwgMClcclxuICB9O1xyXG5cclxuICBuZWVkbGUuc291cmNlID0gdGhpcy5fZmluZFNvdXJjZUluZGV4KG5lZWRsZS5zb3VyY2UpO1xyXG4gIGlmIChuZWVkbGUuc291cmNlIDwgMCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gW107XHJcblxyXG4gIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRNYXBwaW5nKFxyXG4gICAgbmVlZGxlLFxyXG4gICAgdGhpcy5fb3JpZ2luYWxNYXBwaW5ncyxcclxuICAgIFwib3JpZ2luYWxMaW5lXCIsXHJcbiAgICBcIm9yaWdpbmFsQ29sdW1uXCIsXHJcbiAgICB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zLFxyXG4gICAgYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EXHJcbiAgKTtcclxuICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzW2luZGV4XTtcclxuXHJcbiAgICBpZiAoYUFyZ3MuY29sdW1uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIG9yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xyXG5cclxuICAgICAgLy8gSXRlcmF0ZSB1bnRpbCBlaXRoZXIgd2UgcnVuIG91dCBvZiBtYXBwaW5ncywgb3Igd2UgcnVuIGludG9cclxuICAgICAgLy8gYSBtYXBwaW5nIGZvciBhIGRpZmZlcmVudCBsaW5lIHRoYW4gdGhlIG9uZSB3ZSBmb3VuZC4gU2luY2VcclxuICAgICAgLy8gbWFwcGluZ3MgYXJlIHNvcnRlZCwgdGhpcyBpcyBndWFyYW50ZWVkIHRvIGZpbmQgYWxsIG1hcHBpbmdzIGZvclxyXG4gICAgICAvLyB0aGUgbGluZSB3ZSBmb3VuZC5cclxuICAgICAgd2hpbGUgKG1hcHBpbmcgJiYgbWFwcGluZy5vcmlnaW5hbExpbmUgPT09IG9yaWdpbmFsTGluZSkge1xyXG4gICAgICAgIG1hcHBpbmdzLnB1c2goe1xyXG4gICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgXCJnZW5lcmF0ZWRMaW5lXCIsIG51bGwpLFxyXG4gICAgICAgICAgY29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImdlbmVyYXRlZENvbHVtblwiLCBudWxsKSxcclxuICAgICAgICAgIGxhc3RDb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwibGFzdEdlbmVyYXRlZENvbHVtblwiLCBudWxsKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYXBwaW5nID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5nc1srK2luZGV4XTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIG9yaWdpbmFsQ29sdW1uID0gbWFwcGluZy5vcmlnaW5hbENvbHVtbjtcclxuXHJcbiAgICAgIC8vIEl0ZXJhdGUgdW50aWwgZWl0aGVyIHdlIHJ1biBvdXQgb2YgbWFwcGluZ3MsIG9yIHdlIHJ1biBpbnRvXHJcbiAgICAgIC8vIGEgbWFwcGluZyBmb3IgYSBkaWZmZXJlbnQgbGluZSB0aGFuIHRoZSBvbmUgd2Ugd2VyZSBzZWFyY2hpbmcgZm9yLlxyXG4gICAgICAvLyBTaW5jZSBtYXBwaW5ncyBhcmUgc29ydGVkLCB0aGlzIGlzIGd1YXJhbnRlZWQgdG8gZmluZCBhbGwgbWFwcGluZ3MgZm9yXHJcbiAgICAgIC8vIHRoZSBsaW5lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLlxyXG4gICAgICB3aGlsZSAoXHJcbiAgICAgICAgbWFwcGluZyAmJlxyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBsaW5lICYmXHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9PSBvcmlnaW5hbENvbHVtblxyXG4gICAgICApIHtcclxuICAgICAgICBtYXBwaW5ncy5wdXNoKHtcclxuICAgICAgICAgIGxpbmU6IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwiZ2VuZXJhdGVkTGluZVwiLCBudWxsKSxcclxuICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJnZW5lcmF0ZWRDb2x1bW5cIiwgbnVsbCksXHJcbiAgICAgICAgICBsYXN0Q29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCBcImxhc3RHZW5lcmF0ZWRDb2x1bW5cIiwgbnVsbClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbKytpbmRleF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBtYXBwaW5ncztcclxufTtcclxuXHJcbmV4cG9ydHMuU291cmNlTWFwQ29uc3VtZXIgPSBTb3VyY2VNYXBDb25zdW1lcjtcclxuXHJcbi8qKlxyXG4gKiBBIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgaW5zdGFuY2UgcmVwcmVzZW50cyBhIHBhcnNlZCBzb3VyY2UgbWFwIHdoaWNoIHdlIGNhblxyXG4gKiBxdWVyeSBmb3IgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9yaWdpbmFsIGZpbGUgcG9zaXRpb25zIGJ5IGdpdmluZyBpdCBhIGZpbGVcclxuICogcG9zaXRpb24gaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuXHJcbiAqXHJcbiAqIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgdGhlIHJhdyBzb3VyY2UgbWFwIChlaXRoZXIgYXMgYSBKU09OIHN0cmluZywgb3JcclxuICogYWxyZWFkeSBwYXJzZWQgdG8gYW4gb2JqZWN0KS4gQWNjb3JkaW5nIHRvIHRoZSBzcGVjLCBzb3VyY2UgbWFwcyBoYXZlIHRoZVxyXG4gKiBmb2xsb3dpbmcgYXR0cmlidXRlczpcclxuICpcclxuICogICAtIHZlcnNpb246IFdoaWNoIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXAgc3BlYyB0aGlzIG1hcCBpcyBmb2xsb3dpbmcuXHJcbiAqICAgLSBzb3VyY2VzOiBBbiBhcnJheSBvZiBVUkxzIHRvIHRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZXMuXHJcbiAqICAgLSBuYW1lczogQW4gYXJyYXkgb2YgaWRlbnRpZmllcnMgd2hpY2ggY2FuIGJlIHJlZmVyZW5jZWQgYnkgaW5kaXZpZHVhbCBtYXBwaW5ncy5cclxuICogICAtIHNvdXJjZVJvb3Q6IE9wdGlvbmFsLiBUaGUgVVJMIHJvb3QgZnJvbSB3aGljaCBhbGwgc291cmNlcyBhcmUgcmVsYXRpdmUuXHJcbiAqICAgLSBzb3VyY2VzQ29udGVudDogT3B0aW9uYWwuIEFuIGFycmF5IG9mIGNvbnRlbnRzIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZXMuXHJcbiAqICAgLSBtYXBwaW5nczogQSBzdHJpbmcgb2YgYmFzZTY0IFZMUXMgd2hpY2ggY29udGFpbiB0aGUgYWN0dWFsIG1hcHBpbmdzLlxyXG4gKiAgIC0gZmlsZTogT3B0aW9uYWwuIFRoZSBnZW5lcmF0ZWQgZmlsZSB0aGlzIHNvdXJjZSBtYXAgaXMgYXNzb2NpYXRlZCB3aXRoLlxyXG4gKlxyXG4gKiBIZXJlIGlzIGFuIGV4YW1wbGUgc291cmNlIG1hcCwgdGFrZW4gZnJvbSB0aGUgc291cmNlIG1hcCBzcGVjWzBdOlxyXG4gKlxyXG4gKiAgICAge1xyXG4gKiAgICAgICB2ZXJzaW9uIDogMyxcclxuICogICAgICAgZmlsZTogXCJvdXQuanNcIixcclxuICogICAgICAgc291cmNlUm9vdCA6IFwiXCIsXHJcbiAqICAgICAgIHNvdXJjZXM6IFtcImZvby5qc1wiLCBcImJhci5qc1wiXSxcclxuICogICAgICAgbmFtZXM6IFtcInNyY1wiLCBcIm1hcHNcIiwgXCJhcmVcIiwgXCJmdW5cIl0sXHJcbiAqICAgICAgIG1hcHBpbmdzOiBcIkFBLEFCOztBQkNERTtcIlxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiBUaGUgc2Vjb25kIHBhcmFtZXRlciwgaWYgZ2l2ZW4sIGlzIGEgc3RyaW5nIHdob3NlIHZhbHVlIGlzIHRoZSBVUkxcclxuICogYXQgd2hpY2ggdGhlIHNvdXJjZSBtYXAgd2FzIGZvdW5kLiAgVGhpcyBVUkwgaXMgdXNlZCB0byBjb21wdXRlIHRoZVxyXG4gKiBzb3VyY2VzIGFycmF5LlxyXG4gKlxyXG4gKiBbMF06IGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMVUxUkdBZWhRd1J5cFVUb3ZGMUtSbHBpT0Z6ZTBiLV8yZ2M2ZkFIMEtZMGsvZWRpdD9wbGk9MSNcclxuICovXHJcbmZ1bmN0aW9uIEJhc2ljU291cmNlTWFwQ29uc3VtZXIoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCkge1xyXG4gIHZhciBzb3VyY2VNYXAgPSBhU291cmNlTWFwO1xyXG4gIGlmICh0eXBlb2YgYVNvdXJjZU1hcCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgc291cmNlTWFwID0gdXRpbC5wYXJzZVNvdXJjZU1hcElucHV0KGFTb3VyY2VNYXApO1xyXG4gIH1cclxuXHJcbiAgdmFyIHZlcnNpb24gPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwidmVyc2lvblwiKTtcclxuICB2YXIgc291cmNlcyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJzb3VyY2VzXCIpO1xyXG4gIC8vIFNhc3MgMy4zIGxlYXZlcyBvdXQgdGhlICduYW1lcycgYXJyYXksIHNvIHdlIGRldmlhdGUgZnJvbSB0aGUgc3BlYyAod2hpY2hcclxuICAvLyByZXF1aXJlcyB0aGUgYXJyYXkpIHRvIHBsYXkgbmljZSBoZXJlLlxyXG4gIHZhciBuYW1lcyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgXCJuYW1lc1wiLCBbXSk7XHJcbiAgdmFyIHNvdXJjZVJvb3QgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwic291cmNlUm9vdFwiLCBudWxsKTtcclxuICB2YXIgc291cmNlc0NvbnRlbnQgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsIFwic291cmNlc0NvbnRlbnRcIiwgbnVsbCk7XHJcbiAgdmFyIG1hcHBpbmdzID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcIm1hcHBpbmdzXCIpO1xyXG4gIHZhciBmaWxlID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcImZpbGVcIiwgbnVsbCk7XHJcblxyXG4gIC8vIE9uY2UgYWdhaW4sIFNhc3MgZGV2aWF0ZXMgZnJvbSB0aGUgc3BlYyBhbmQgc3VwcGxpZXMgdGhlIHZlcnNpb24gYXMgYVxyXG4gIC8vIHN0cmluZyByYXRoZXIgdGhhbiBhIG51bWJlciwgc28gd2UgdXNlIGxvb3NlIGVxdWFsaXR5IGNoZWNraW5nIGhlcmUuXHJcbiAgaWYgKHZlcnNpb24gIT0gdGhpcy5fdmVyc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdmVyc2lvbjogXCIgKyB2ZXJzaW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChzb3VyY2VSb290KSB7XHJcbiAgICBzb3VyY2VSb290ID0gdXRpbC5ub3JtYWxpemUoc291cmNlUm9vdCk7XHJcbiAgfVxyXG5cclxuICBzb3VyY2VzID0gc291cmNlc1xyXG4gICAgLm1hcChTdHJpbmcpXHJcbiAgICAvLyBTb21lIHNvdXJjZSBtYXBzIHByb2R1Y2UgcmVsYXRpdmUgc291cmNlIHBhdGhzIGxpa2UgXCIuL2Zvby5qc1wiIGluc3RlYWQgb2ZcclxuICAgIC8vIFwiZm9vLmpzXCIuICBOb3JtYWxpemUgdGhlc2UgZmlyc3Qgc28gdGhhdCBmdXR1cmUgY29tcGFyaXNvbnMgd2lsbCBzdWNjZWVkLlxyXG4gICAgLy8gU2VlIGJ1Z3ppbC5sYS8xMDkwNzY4LlxyXG4gICAgLm1hcCh1dGlsLm5vcm1hbGl6ZSlcclxuICAgIC8vIEFsd2F5cyBlbnN1cmUgdGhhdCBhYnNvbHV0ZSBzb3VyY2VzIGFyZSBpbnRlcm5hbGx5IHN0b3JlZCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIHNvdXJjZSByb290LCBpZiB0aGUgc291cmNlIHJvb3QgaXMgYWJzb2x1dGUuIE5vdCBkb2luZyB0aGlzIHdvdWxkXHJcbiAgICAvLyBiZSBwYXJ0aWN1bGFybHkgcHJvYmxlbWF0aWMgd2hlbiB0aGUgc291cmNlIHJvb3QgaXMgYSBwcmVmaXggb2YgdGhlXHJcbiAgICAvLyBzb3VyY2UgKHZhbGlkLCBidXQgd2h5Pz8pLiBTZWUgZ2l0aHViIGlzc3VlICMxOTkgYW5kIGJ1Z3ppbC5sYS8xMTg4OTgyLlxyXG4gICAgLm1hcChmdW5jdGlvbihzb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIHNvdXJjZVJvb3QgJiZcclxuICAgICAgICB1dGlsLmlzQWJzb2x1dGUoc291cmNlUm9vdCkgJiZcclxuICAgICAgICB1dGlsLmlzQWJzb2x1dGUoc291cmNlKVxyXG4gICAgICAgID8gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2UpXHJcbiAgICAgICAgOiBzb3VyY2U7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gUGFzcyBgdHJ1ZWAgYmVsb3cgdG8gYWxsb3cgZHVwbGljYXRlIG5hbWVzIGFuZCBzb3VyY2VzLiBXaGlsZSBzb3VyY2UgbWFwc1xyXG4gIC8vIGFyZSBpbnRlbmRlZCB0byBiZSBjb21wcmVzc2VkIGFuZCBkZWR1cGxpY2F0ZWQsIHRoZSBUeXBlU2NyaXB0IGNvbXBpbGVyXHJcbiAgLy8gc29tZXRpbWVzIGdlbmVyYXRlcyBzb3VyY2UgbWFwcyB3aXRoIGR1cGxpY2F0ZXMgaW4gdGhlbS4gU2VlIEdpdGh1YiBpc3N1ZVxyXG4gIC8vICM3MiBhbmQgYnVnemlsLmxhLzg4OTQ5Mi5cclxuICB0aGlzLl9uYW1lcyA9IEFycmF5U2V0LmZyb21BcnJheShuYW1lcy5tYXAoU3RyaW5nKSwgdHJ1ZSk7XHJcbiAgdGhpcy5fc291cmNlcyA9IEFycmF5U2V0LmZyb21BcnJheShzb3VyY2VzLCB0cnVlKTtcclxuXHJcbiAgdGhpcy5fYWJzb2x1dGVTb3VyY2VzID0gdGhpcy5fc291cmNlcy50b0FycmF5KCkubWFwKGZ1bmN0aW9uKHMpIHtcclxuICAgIHJldHVybiB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgcywgYVNvdXJjZU1hcFVSTCk7XHJcbiAgfSk7XHJcblxyXG4gIHRoaXMuc291cmNlUm9vdCA9IHNvdXJjZVJvb3Q7XHJcbiAgdGhpcy5zb3VyY2VzQ29udGVudCA9IHNvdXJjZXNDb250ZW50O1xyXG4gIHRoaXMuX21hcHBpbmdzID0gbWFwcGluZ3M7XHJcbiAgdGhpcy5fc291cmNlTWFwVVJMID0gYVNvdXJjZU1hcFVSTDtcclxuICB0aGlzLmZpbGUgPSBmaWxlO1xyXG59XHJcblxyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlKTtcclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29uc3VtZXIgPSBTb3VyY2VNYXBDb25zdW1lcjtcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGZpbmQgdGhlIGluZGV4IG9mIGEgc291cmNlLiAgUmV0dXJucyAtMSBpZiBub3RcclxuICogZm91bmQuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fZmluZFNvdXJjZUluZGV4ID0gZnVuY3Rpb24oYVNvdXJjZSkge1xyXG4gIHZhciByZWxhdGl2ZVNvdXJjZSA9IGFTb3VyY2U7XHJcbiAgaWYgKHRoaXMuc291cmNlUm9vdCAhPSBudWxsKSB7XHJcbiAgICByZWxhdGl2ZVNvdXJjZSA9IHV0aWwucmVsYXRpdmUodGhpcy5zb3VyY2VSb290LCByZWxhdGl2ZVNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBpZiAodGhpcy5fc291cmNlcy5oYXMocmVsYXRpdmVTb3VyY2UpKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc291cmNlcy5pbmRleE9mKHJlbGF0aXZlU291cmNlKTtcclxuICB9XHJcblxyXG4gIC8vIE1heWJlIGFTb3VyY2UgaXMgYW4gYWJzb2x1dGUgVVJMIGFzIHJldHVybmVkIGJ5IHxzb3VyY2VzfC4gIEluXHJcbiAgLy8gdGhpcyBjYXNlIHdlIGNhbid0IHNpbXBseSB1bmRvIHRoZSB0cmFuc2Zvcm0uXHJcbiAgdmFyIGk7XHJcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMuX2Fic29sdXRlU291cmNlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKHRoaXMuX2Fic29sdXRlU291cmNlc1tpXSA9PSBhU291cmNlKSB7XHJcbiAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIC0xO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgZnJvbSBhIFNvdXJjZU1hcEdlbmVyYXRvci5cclxuICpcclxuICogQHBhcmFtIFNvdXJjZU1hcEdlbmVyYXRvciBhU291cmNlTWFwXHJcbiAqICAgICAgICBUaGUgc291cmNlIG1hcCB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVNvdXJjZU1hcFVSTFxyXG4gKiAgICAgICAgVGhlIFVSTCBhdCB3aGljaCB0aGUgc291cmNlIG1hcCBjYW4gYmUgZm91bmQgKG9wdGlvbmFsKVxyXG4gKiBAcmV0dXJucyBCYXNpY1NvdXJjZU1hcENvbnN1bWVyXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9mcm9tU291cmNlTWFwKFxyXG4gIGFTb3VyY2VNYXAsXHJcbiAgYVNvdXJjZU1hcFVSTFxyXG4pIHtcclxuICB2YXIgc21jID0gT2JqZWN0LmNyZWF0ZShCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSk7XHJcblxyXG4gIHZhciBuYW1lcyA9IChzbWMuX25hbWVzID0gQXJyYXlTZXQuZnJvbUFycmF5KFxyXG4gICAgYVNvdXJjZU1hcC5fbmFtZXMudG9BcnJheSgpLFxyXG4gICAgdHJ1ZVxyXG4gICkpO1xyXG4gIHZhciBzb3VyY2VzID0gKHNtYy5fc291cmNlcyA9IEFycmF5U2V0LmZyb21BcnJheShcclxuICAgIGFTb3VyY2VNYXAuX3NvdXJjZXMudG9BcnJheSgpLFxyXG4gICAgdHJ1ZVxyXG4gICkpO1xyXG4gIHNtYy5zb3VyY2VSb290ID0gYVNvdXJjZU1hcC5fc291cmNlUm9vdDtcclxuICBzbWMuc291cmNlc0NvbnRlbnQgPSBhU291cmNlTWFwLl9nZW5lcmF0ZVNvdXJjZXNDb250ZW50KFxyXG4gICAgc21jLl9zb3VyY2VzLnRvQXJyYXkoKSxcclxuICAgIHNtYy5zb3VyY2VSb290XHJcbiAgKTtcclxuICBzbWMuZmlsZSA9IGFTb3VyY2VNYXAuX2ZpbGU7XHJcbiAgc21jLl9zb3VyY2VNYXBVUkwgPSBhU291cmNlTWFwVVJMO1xyXG4gIHNtYy5fYWJzb2x1dGVTb3VyY2VzID0gc21jLl9zb3VyY2VzLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24ocykge1xyXG4gICAgcmV0dXJuIHV0aWwuY29tcHV0ZVNvdXJjZVVSTChzbWMuc291cmNlUm9vdCwgcywgYVNvdXJjZU1hcFVSTCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIEJlY2F1c2Ugd2UgYXJlIG1vZGlmeWluZyB0aGUgZW50cmllcyAoYnkgY29udmVydGluZyBzdHJpbmcgc291cmNlcyBhbmRcclxuICAvLyBuYW1lcyB0byBpbmRpY2VzIGludG8gdGhlIHNvdXJjZXMgYW5kIG5hbWVzIEFycmF5U2V0cyksIHdlIGhhdmUgdG8gbWFrZVxyXG4gIC8vIGEgY29weSBvZiB0aGUgZW50cnkgb3IgZWxzZSBiYWQgdGhpbmdzIGhhcHBlbi4gU2hhcmVkIG11dGFibGUgc3RhdGVcclxuICAvLyBzdHJpa2VzIGFnYWluISBTZWUgZ2l0aHViIGlzc3VlICMxOTEuXHJcblxyXG4gIHZhciBnZW5lcmF0ZWRNYXBwaW5ncyA9IGFTb3VyY2VNYXAuX21hcHBpbmdzLnRvQXJyYXkoKS5zbGljZSgpO1xyXG4gIHZhciBkZXN0R2VuZXJhdGVkTWFwcGluZ3MgPSAoc21jLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBbXSk7XHJcbiAgdmFyIGRlc3RPcmlnaW5hbE1hcHBpbmdzID0gKHNtYy5fX29yaWdpbmFsTWFwcGluZ3MgPSBbXSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZW5lcmF0ZWRNYXBwaW5ncy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHNyY01hcHBpbmcgPSBnZW5lcmF0ZWRNYXBwaW5nc1tpXTtcclxuICAgIHZhciBkZXN0TWFwcGluZyA9IG5ldyBNYXBwaW5nKCk7XHJcbiAgICBkZXN0TWFwcGluZy5nZW5lcmF0ZWRMaW5lID0gc3JjTWFwcGluZy5nZW5lcmF0ZWRMaW5lO1xyXG4gICAgZGVzdE1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uID0gc3JjTWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcblxyXG4gICAgaWYgKHNyY01hcHBpbmcuc291cmNlKSB7XHJcbiAgICAgIGRlc3RNYXBwaW5nLnNvdXJjZSA9IHNvdXJjZXMuaW5kZXhPZihzcmNNYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgIGRlc3RNYXBwaW5nLm9yaWdpbmFsTGluZSA9IHNyY01hcHBpbmcub3JpZ2luYWxMaW5lO1xyXG4gICAgICBkZXN0TWFwcGluZy5vcmlnaW5hbENvbHVtbiA9IHNyY01hcHBpbmcub3JpZ2luYWxDb2x1bW47XHJcblxyXG4gICAgICBpZiAoc3JjTWFwcGluZy5uYW1lKSB7XHJcbiAgICAgICAgZGVzdE1hcHBpbmcubmFtZSA9IG5hbWVzLmluZGV4T2Yoc3JjTWFwcGluZy5uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGVzdE9yaWdpbmFsTWFwcGluZ3MucHVzaChkZXN0TWFwcGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdEdlbmVyYXRlZE1hcHBpbmdzLnB1c2goZGVzdE1hcHBpbmcpO1xyXG4gIH1cclxuXHJcbiAgcXVpY2tTb3J0KHNtYy5fX29yaWdpbmFsTWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMpO1xyXG5cclxuICByZXR1cm4gc21jO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl92ZXJzaW9uID0gMztcclxuXHJcbi8qKlxyXG4gKiBUaGUgbGlzdCBvZiBvcmlnaW5hbCBzb3VyY2VzLlxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCBcInNvdXJjZXNcIiwge1xyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWJzb2x1dGVTb3VyY2VzLnNsaWNlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlIHRoZSBKSVQgd2l0aCBhIG5pY2Ugc2hhcGUgLyBoaWRkZW4gY2xhc3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBNYXBwaW5nKCkge1xyXG4gIHRoaXMuZ2VuZXJhdGVkTGluZSA9IDA7XHJcbiAgdGhpcy5nZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gIHRoaXMuc291cmNlID0gbnVsbDtcclxuICB0aGlzLm9yaWdpbmFsTGluZSA9IG51bGw7XHJcbiAgdGhpcy5vcmlnaW5hbENvbHVtbiA9IG51bGw7XHJcbiAgdGhpcy5uYW1lID0gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHRoZSBtYXBwaW5ncyBpbiBhIHN0cmluZyBpbiB0byBhIGRhdGEgc3RydWN0dXJlIHdoaWNoIHdlIGNhbiBlYXNpbHlcclxuICogcXVlcnkgKHRoZSBvcmRlcmVkIGFycmF5cyBpbiB0aGUgYHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc2AgYW5kXHJcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fcGFyc2VNYXBwaW5ncyA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3BhcnNlTWFwcGluZ3MoXHJcbiAgYVN0cixcclxuICBhU291cmNlUm9vdFxyXG4pIHtcclxuICB2YXIgZ2VuZXJhdGVkTGluZSA9IDE7XHJcbiAgdmFyIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICB2YXIgcHJldmlvdXNPcmlnaW5hbExpbmUgPSAwO1xyXG4gIHZhciBwcmV2aW91c09yaWdpbmFsQ29sdW1uID0gMDtcclxuICB2YXIgcHJldmlvdXNTb3VyY2UgPSAwO1xyXG4gIHZhciBwcmV2aW91c05hbWUgPSAwO1xyXG4gIHZhciBsZW5ndGggPSBhU3RyLmxlbmd0aDtcclxuICB2YXIgaW5kZXggPSAwO1xyXG4gIHZhciBjYWNoZWRTZWdtZW50cyA9IHt9O1xyXG4gIHZhciB0ZW1wID0ge307XHJcbiAgdmFyIG9yaWdpbmFsTWFwcGluZ3MgPSBbXTtcclxuICB2YXIgZ2VuZXJhdGVkTWFwcGluZ3MgPSBbXTtcclxuICB2YXIgbWFwcGluZywgc3RyLCBzZWdtZW50LCBlbmQsIHZhbHVlO1xyXG5cclxuICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcclxuICAgIGlmIChhU3RyLmNoYXJBdChpbmRleCkgPT09IFwiO1wiKSB7XHJcbiAgICAgIGdlbmVyYXRlZExpbmUrKztcclxuICAgICAgaW5kZXgrKztcclxuICAgICAgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gICAgfSBlbHNlIGlmIChhU3RyLmNoYXJBdChpbmRleCkgPT09IFwiLFwiKSB7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXBwaW5nID0gbmV3IE1hcHBpbmcoKTtcclxuICAgICAgbWFwcGluZy5nZW5lcmF0ZWRMaW5lID0gZ2VuZXJhdGVkTGluZTtcclxuXHJcbiAgICAgIC8vIEJlY2F1c2UgZWFjaCBvZmZzZXQgaXMgZW5jb2RlZCByZWxhdGl2ZSB0byB0aGUgcHJldmlvdXMgb25lLFxyXG4gICAgICAvLyBtYW55IHNlZ21lbnRzIG9mdGVuIGhhdmUgdGhlIHNhbWUgZW5jb2RpbmcuIFdlIGNhbiBleHBsb2l0IHRoaXNcclxuICAgICAgLy8gZmFjdCBieSBjYWNoaW5nIHRoZSBwYXJzZWQgdmFyaWFibGUgbGVuZ3RoIGZpZWxkcyBvZiBlYWNoIHNlZ21lbnQsXHJcbiAgICAgIC8vIGFsbG93aW5nIHVzIHRvIGF2b2lkIGEgc2Vjb25kIHBhcnNlIGlmIHdlIGVuY291bnRlciB0aGUgc2FtZVxyXG4gICAgICAvLyBzZWdtZW50IGFnYWluLlxyXG4gICAgICBmb3IgKGVuZCA9IGluZGV4OyBlbmQgPCBsZW5ndGg7IGVuZCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJJc01hcHBpbmdTZXBhcmF0b3IoYVN0ciwgZW5kKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHN0ciA9IGFTdHIuc2xpY2UoaW5kZXgsIGVuZCk7XHJcblxyXG4gICAgICBzZWdtZW50ID0gY2FjaGVkU2VnbWVudHNbc3RyXTtcclxuICAgICAgaWYgKHNlZ21lbnQpIHtcclxuICAgICAgICBpbmRleCArPSBzdHIubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlZ21lbnQgPSBbXTtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPCBlbmQpIHtcclxuICAgICAgICAgIGJhc2U2NFZMUS5kZWNvZGUoYVN0ciwgaW5kZXgsIHRlbXApO1xyXG4gICAgICAgICAgdmFsdWUgPSB0ZW1wLnZhbHVlO1xyXG4gICAgICAgICAgaW5kZXggPSB0ZW1wLnJlc3Q7XHJcbiAgICAgICAgICBzZWdtZW50LnB1c2godmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3VuZCBhIHNvdXJjZSwgYnV0IG5vIGxpbmUgYW5kIGNvbHVtblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm91bmQgYSBzb3VyY2UgYW5kIGxpbmUsIGJ1dCBubyBjb2x1bW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWNoZWRTZWdtZW50c1tzdHJdID0gc2VnbWVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2VuZXJhdGVkIGNvbHVtbi5cclxuICAgICAgbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gPSBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiArIHNlZ21lbnRbMF07XHJcbiAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XHJcblxyXG4gICAgICBpZiAoc2VnbWVudC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgLy8gT3JpZ2luYWwgc291cmNlLlxyXG4gICAgICAgIG1hcHBpbmcuc291cmNlID0gcHJldmlvdXNTb3VyY2UgKyBzZWdtZW50WzFdO1xyXG4gICAgICAgIHByZXZpb3VzU291cmNlICs9IHNlZ21lbnRbMV07XHJcblxyXG4gICAgICAgIC8vIE9yaWdpbmFsIGxpbmUuXHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgPSBwcmV2aW91c09yaWdpbmFsTGluZSArIHNlZ21lbnRbMl07XHJcbiAgICAgICAgcHJldmlvdXNPcmlnaW5hbExpbmUgPSBtYXBwaW5nLm9yaWdpbmFsTGluZTtcclxuICAgICAgICAvLyBMaW5lcyBhcmUgc3RvcmVkIDAtYmFzZWRcclxuICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSArPSAxO1xyXG5cclxuICAgICAgICAvLyBPcmlnaW5hbCBjb2x1bW4uXHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9IHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gKyBzZWdtZW50WzNdO1xyXG4gICAgICAgIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAvLyBPcmlnaW5hbCBuYW1lLlxyXG4gICAgICAgICAgbWFwcGluZy5uYW1lID0gcHJldmlvdXNOYW1lICsgc2VnbWVudFs0XTtcclxuICAgICAgICAgIHByZXZpb3VzTmFtZSArPSBzZWdtZW50WzRdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZ2VuZXJhdGVkTWFwcGluZ3MucHVzaChtYXBwaW5nKTtcclxuICAgICAgaWYgKHR5cGVvZiBtYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIG9yaWdpbmFsTWFwcGluZ3MucHVzaChtYXBwaW5nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzVW5zb3J0ZWQgPSBnZW5lcmF0ZWRNYXBwaW5ncztcclxuXHJcbiAgdGhpcy5fX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZCA9IG9yaWdpbmFsTWFwcGluZ3M7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZCB0aGUgbWFwcGluZyB0aGF0IGJlc3QgbWF0Y2hlcyB0aGUgaHlwb3RoZXRpY2FsIFwibmVlZGxlXCIgbWFwcGluZyB0aGF0XHJcbiAqIHdlIGFyZSBzZWFyY2hpbmcgZm9yIGluIHRoZSBnaXZlbiBcImhheXN0YWNrXCIgb2YgbWFwcGluZ3MuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fZmluZE1hcHBpbmcgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9maW5kTWFwcGluZyhcclxuICBhTmVlZGxlLFxyXG4gIGFNYXBwaW5ncyxcclxuICBhTGluZU5hbWUsXHJcbiAgYUNvbHVtbk5hbWUsXHJcbiAgYUNvbXBhcmF0b3IsXHJcbiAgYUJpYXNcclxuKSB7XHJcbiAgLy8gVG8gcmV0dXJuIHRoZSBwb3NpdGlvbiB3ZSBhcmUgc2VhcmNoaW5nIGZvciwgd2UgbXVzdCBmaXJzdCBmaW5kIHRoZVxyXG4gIC8vIG1hcHBpbmcgZm9yIHRoZSBnaXZlbiBwb3NpdGlvbiBhbmQgdGhlbiByZXR1cm4gdGhlIG9wcG9zaXRlIHBvc2l0aW9uIGl0XHJcbiAgLy8gcG9pbnRzIHRvLiBCZWNhdXNlIHRoZSBtYXBwaW5ncyBhcmUgc29ydGVkLCB3ZSBjYW4gdXNlIGJpbmFyeSBzZWFyY2ggdG9cclxuICAvLyBmaW5kIHRoZSBiZXN0IG1hcHBpbmcuXHJcblxyXG4gIGlmIChhTmVlZGxlW2FMaW5lTmFtZV0gPD0gMCkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgXCJMaW5lIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDEsIGdvdCBcIiArIGFOZWVkbGVbYUxpbmVOYW1lXVxyXG4gICAgKTtcclxuICB9XHJcbiAgaWYgKGFOZWVkbGVbYUNvbHVtbk5hbWVdIDwgMCkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgXCJDb2x1bW4gbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMCwgZ290IFwiICsgYU5lZWRsZVthQ29sdW1uTmFtZV1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYmluYXJ5U2VhcmNoLnNlYXJjaChhTmVlZGxlLCBhTWFwcGluZ3MsIGFDb21wYXJhdG9yLCBhQmlhcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgbGFzdCBjb2x1bW4gZm9yIGVhY2ggZ2VuZXJhdGVkIG1hcHBpbmcuIFRoZSBsYXN0IGNvbHVtbiBpc1xyXG4gKiBpbmNsdXNpdmUuXHJcbiAqL1xyXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5jb21wdXRlQ29sdW1uU3BhbnMgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9jb21wdXRlQ29sdW1uU3BhbnMoKSB7XHJcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aDsgKytpbmRleCkge1xyXG4gICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleF07XHJcblxyXG4gICAgLy8gTWFwcGluZ3MgZG8gbm90IGNvbnRhaW4gYSBmaWVsZCBmb3IgdGhlIGxhc3QgZ2VuZXJhdGVkIGNvbHVtbnQuIFdlXHJcbiAgICAvLyBjYW4gY29tZSB1cCB3aXRoIGFuIG9wdGltaXN0aWMgZXN0aW1hdGUsIGhvd2V2ZXIsIGJ5IGFzc3VtaW5nIHRoYXRcclxuICAgIC8vIG1hcHBpbmdzIGFyZSBjb250aWd1b3VzIChpLmUuIGdpdmVuIHR3byBjb25zZWN1dGl2ZSBtYXBwaW5ncywgdGhlXHJcbiAgICAvLyBmaXJzdCBtYXBwaW5nIGVuZHMgd2hlcmUgdGhlIHNlY29uZCBvbmUgc3RhcnRzKS5cclxuICAgIGlmIChpbmRleCArIDEgPCB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5ncy5sZW5ndGgpIHtcclxuICAgICAgdmFyIG5leHRNYXBwaW5nID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NbaW5kZXggKyAxXTtcclxuXHJcbiAgICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgPT09IG5leHRNYXBwaW5nLmdlbmVyYXRlZExpbmUpIHtcclxuICAgICAgICBtYXBwaW5nLmxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBuZXh0TWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gLSAxO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIGxhc3QgbWFwcGluZyBmb3IgZWFjaCBsaW5lIHNwYW5zIHRoZSBlbnRpcmUgbGluZS5cclxuICAgIG1hcHBpbmcubGFzdEdlbmVyYXRlZENvbHVtbiA9IEluZmluaXR5O1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UsIGxpbmUsIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBnZW5lcmF0ZWRcclxuICogc291cmNlJ3MgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucyBwcm92aWRlZC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0XHJcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyXHJcbiAqICAgICBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKiAgIC0gYmlhczogRWl0aGVyICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcclxuICogICAgICdTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcclxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcclxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxyXG4gKiAgICAgRGVmYXVsdHMgdG8gJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cclxuICpcclxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlLCBvciBudWxsLlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICogICAtIG5hbWU6IFRoZSBvcmlnaW5hbCBpZGVudGlmaWVyLCBvciBudWxsLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUub3JpZ2luYWxQb3NpdGlvbkZvciA9IGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX29yaWdpbmFsUG9zaXRpb25Gb3IoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgdmFyIG5lZWRsZSA9IHtcclxuICAgIGdlbmVyYXRlZExpbmU6IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImxpbmVcIiksXHJcbiAgICBnZW5lcmF0ZWRDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImNvbHVtblwiKVxyXG4gIH07XHJcblxyXG4gIHZhciBpbmRleCA9IHRoaXMuX2ZpbmRNYXBwaW5nKFxyXG4gICAgbmVlZGxlLFxyXG4gICAgdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3MsXHJcbiAgICBcImdlbmVyYXRlZExpbmVcIixcclxuICAgIFwiZ2VuZXJhdGVkQ29sdW1uXCIsXHJcbiAgICB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkLFxyXG4gICAgdXRpbC5nZXRBcmcoYUFyZ3MsIFwiYmlhc1wiLCBTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORClcclxuICApO1xyXG5cclxuICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleF07XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9PT0gbmVlZGxlLmdlbmVyYXRlZExpbmUpIHtcclxuICAgICAgdmFyIHNvdXJjZSA9IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwic291cmNlXCIsIG51bGwpO1xyXG4gICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmF0KHNvdXJjZSk7XHJcbiAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKFxyXG4gICAgICAgICAgdGhpcy5zb3VyY2VSb290LFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgdGhpcy5fc291cmNlTWFwVVJMXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgbmFtZSA9IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwibmFtZVwiLCBudWxsKTtcclxuICAgICAgaWYgKG5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgIG5hbWUgPSB0aGlzLl9uYW1lcy5hdChuYW1lKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICAgIGxpbmU6IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwib3JpZ2luYWxMaW5lXCIsIG51bGwpLFxyXG4gICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgXCJvcmlnaW5hbENvbHVtblwiLCBudWxsKSxcclxuICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc291cmNlOiBudWxsLFxyXG4gICAgbGluZTogbnVsbCxcclxuICAgIGNvbHVtbjogbnVsbCxcclxuICAgIG5hbWU6IG51bGxcclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIHdlIGhhdmUgdGhlIHNvdXJjZSBjb250ZW50IGZvciBldmVyeSBzb3VyY2UgaW4gdGhlIHNvdXJjZVxyXG4gKiBtYXAsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzID0gZnVuY3Rpb24gQmFzaWNTb3VyY2VNYXBDb25zdW1lcl9oYXNDb250ZW50c09mQWxsU291cmNlcygpIHtcclxuICBpZiAoIXRoaXMuc291cmNlc0NvbnRlbnQpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIHRoaXMuc291cmNlc0NvbnRlbnQubGVuZ3RoID49IHRoaXMuX3NvdXJjZXMuc2l6ZSgpICYmXHJcbiAgICAhdGhpcy5zb3VyY2VzQ29udGVudC5zb21lKGZ1bmN0aW9uKHNjKSB7XHJcbiAgICAgIHJldHVybiBzYyA9PSBudWxsO1xyXG4gICAgfSlcclxuICApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50LiBUaGUgb25seSBhcmd1bWVudCBpcyB0aGUgdXJsIG9mIHRoZVxyXG4gKiBvcmlnaW5hbCBzb3VyY2UgZmlsZS4gUmV0dXJucyBudWxsIGlmIG5vIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50IGlzXHJcbiAqIGF2YWlsYWJsZS5cclxuICovXHJcbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLnNvdXJjZUNvbnRlbnRGb3IgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9zb3VyY2VDb250ZW50Rm9yKFxyXG4gIGFTb3VyY2UsXHJcbiAgbnVsbE9uTWlzc2luZ1xyXG4pIHtcclxuICBpZiAoIXRoaXMuc291cmNlc0NvbnRlbnQpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgdmFyIGluZGV4ID0gdGhpcy5fZmluZFNvdXJjZUluZGV4KGFTb3VyY2UpO1xyXG4gIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFtpbmRleF07XHJcbiAgfVxyXG5cclxuICB2YXIgcmVsYXRpdmVTb3VyY2UgPSBhU291cmNlO1xyXG4gIGlmICh0aGlzLnNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgcmVsYXRpdmVTb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHRoaXMuc291cmNlUm9vdCwgcmVsYXRpdmVTb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHVybDtcclxuICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwgJiYgKHVybCA9IHV0aWwudXJsUGFyc2UodGhpcy5zb3VyY2VSb290KSkpIHtcclxuICAgIC8vIFhYWDogZmlsZTovLyBVUklzIGFuZCBhYnNvbHV0ZSBwYXRocyBsZWFkIHRvIHVuZXhwZWN0ZWQgYmVoYXZpb3IgZm9yXHJcbiAgICAvLyBtYW55IHVzZXJzLiBXZSBjYW4gaGVscCB0aGVtIG91dCB3aGVuIHRoZXkgZXhwZWN0IGZpbGU6Ly8gVVJJcyB0b1xyXG4gICAgLy8gYmVoYXZlIGxpa2UgaXQgd291bGQgaWYgdGhleSB3ZXJlIHJ1bm5pbmcgYSBsb2NhbCBIVFRQIHNlcnZlci4gU2VlXHJcbiAgICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODU1OTcuXHJcbiAgICB2YXIgZmlsZVVyaUFic1BhdGggPSByZWxhdGl2ZVNvdXJjZS5yZXBsYWNlKC9eZmlsZTpcXC9cXC8vLCBcIlwiKTtcclxuICAgIGlmICh1cmwuc2NoZW1lID09IFwiZmlsZVwiICYmIHRoaXMuX3NvdXJjZXMuaGFzKGZpbGVVcmlBYnNQYXRoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFt0aGlzLl9zb3VyY2VzLmluZGV4T2YoZmlsZVVyaUFic1BhdGgpXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICghdXJsLnBhdGggfHwgdXJsLnBhdGggPT0gXCIvXCIpICYmXHJcbiAgICAgIHRoaXMuX3NvdXJjZXMuaGFzKFwiL1wiICsgcmVsYXRpdmVTb3VyY2UpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc291cmNlc0NvbnRlbnRbdGhpcy5fc291cmNlcy5pbmRleE9mKFwiL1wiICsgcmVsYXRpdmVTb3VyY2UpXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCByZWN1cnNpdmVseSBmcm9tXHJcbiAgLy8gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5zb3VyY2VDb250ZW50Rm9yLiBJbiB0aGF0IGNhc2UsIHdlXHJcbiAgLy8gZG9uJ3Qgd2FudCB0byB0aHJvdyBpZiB3ZSBjYW4ndCBmaW5kIHRoZSBzb3VyY2UgLSB3ZSBqdXN0IHdhbnQgdG9cclxuICAvLyByZXR1cm4gbnVsbCwgc28gd2UgcHJvdmlkZSBhIGZsYWcgdG8gZXhpdCBncmFjZWZ1bGx5LlxyXG4gIGlmIChudWxsT25NaXNzaW5nKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyByZWxhdGl2ZVNvdXJjZSArICdcIiBpcyBub3QgaW4gdGhlIFNvdXJjZU1hcC4nKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcclxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXHJcbiAqIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cclxuICogICAgIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKiAgIC0gYmlhczogRWl0aGVyICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcclxuICogICAgICdTb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCcuIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJldHVybiB0aGVcclxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcclxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxyXG4gKiAgICAgRGVmYXVsdHMgdG8gJ1NvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cclxuICpcclxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxyXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuXHJcbiAqICAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxyXG4gKi9cclxuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZ2VuZXJhdGVkUG9zaXRpb25Gb3IgPSBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9nZW5lcmF0ZWRQb3NpdGlvbkZvcihcclxuICBhQXJnc1xyXG4pIHtcclxuICB2YXIgc291cmNlID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwic291cmNlXCIpO1xyXG4gIHNvdXJjZSA9IHRoaXMuX2ZpbmRTb3VyY2VJbmRleChzb3VyY2UpO1xyXG4gIGlmIChzb3VyY2UgPCAwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsaW5lOiBudWxsLFxyXG4gICAgICBjb2x1bW46IG51bGwsXHJcbiAgICAgIGxhc3RDb2x1bW46IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB2YXIgbmVlZGxlID0ge1xyXG4gICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICBvcmlnaW5hbExpbmU6IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImxpbmVcIiksXHJcbiAgICBvcmlnaW5hbENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsIFwiY29sdW1uXCIpXHJcbiAgfTtcclxuXHJcbiAgdmFyIGluZGV4ID0gdGhpcy5fZmluZE1hcHBpbmcoXHJcbiAgICBuZWVkbGUsXHJcbiAgICB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzLFxyXG4gICAgXCJvcmlnaW5hbExpbmVcIixcclxuICAgIFwib3JpZ2luYWxDb2x1bW5cIixcclxuICAgIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMsXHJcbiAgICB1dGlsLmdldEFyZyhhQXJncywgXCJiaWFzXCIsIFNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EKVxyXG4gICk7XHJcblxyXG4gIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICB2YXIgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbaW5kZXhdO1xyXG5cclxuICAgIGlmIChtYXBwaW5nLnNvdXJjZSA9PT0gbmVlZGxlLnNvdXJjZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbmU6IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwiZ2VuZXJhdGVkTGluZVwiLCBudWxsKSxcclxuICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwiZ2VuZXJhdGVkQ29sdW1uXCIsIG51bGwpLFxyXG4gICAgICAgIGxhc3RDb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsIFwibGFzdEdlbmVyYXRlZENvbHVtblwiLCBudWxsKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmU6IG51bGwsXHJcbiAgICBjb2x1bW46IG51bGwsXHJcbiAgICBsYXN0Q29sdW1uOiBudWxsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydHMuQmFzaWNTb3VyY2VNYXBDb25zdW1lciA9IEJhc2ljU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogQW4gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyIGluc3RhbmNlIHJlcHJlc2VudHMgYSBwYXJzZWQgc291cmNlIG1hcCB3aGljaFxyXG4gKiB3ZSBjYW4gcXVlcnkgZm9yIGluZm9ybWF0aW9uLiBJdCBkaWZmZXJzIGZyb20gQmFzaWNTb3VyY2VNYXBDb25zdW1lciBpblxyXG4gKiB0aGF0IGl0IHRha2VzIFwiaW5kZXhlZFwiIHNvdXJjZSBtYXBzIChpLmUuIG9uZXMgd2l0aCBhIFwic2VjdGlvbnNcIiBmaWVsZCkgYXNcclxuICogaW5wdXQuXHJcbiAqXHJcbiAqIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgYSByYXcgc291cmNlIG1hcCAoZWl0aGVyIGFzIGEgSlNPTiBzdHJpbmcsIG9yIGFscmVhZHlcclxuICogcGFyc2VkIHRvIGFuIG9iamVjdCkuIEFjY29yZGluZyB0byB0aGUgc3BlYyBmb3IgaW5kZXhlZCBzb3VyY2UgbWFwcywgdGhleVxyXG4gKiBoYXZlIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlczpcclxuICpcclxuICogICAtIHZlcnNpb246IFdoaWNoIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXAgc3BlYyB0aGlzIG1hcCBpcyBmb2xsb3dpbmcuXHJcbiAqICAgLSBmaWxlOiBPcHRpb25hbC4gVGhlIGdlbmVyYXRlZCBmaWxlIHRoaXMgc291cmNlIG1hcCBpcyBhc3NvY2lhdGVkIHdpdGguXHJcbiAqICAgLSBzZWN0aW9uczogQSBsaXN0IG9mIHNlY3Rpb24gZGVmaW5pdGlvbnMuXHJcbiAqXHJcbiAqIEVhY2ggdmFsdWUgdW5kZXIgdGhlIFwic2VjdGlvbnNcIiBmaWVsZCBoYXMgdHdvIGZpZWxkczpcclxuICogICAtIG9mZnNldDogVGhlIG9mZnNldCBpbnRvIHRoZSBvcmlnaW5hbCBzcGVjaWZpZWQgYXQgd2hpY2ggdGhpcyBzZWN0aW9uXHJcbiAqICAgICAgIGJlZ2lucyB0byBhcHBseSwgZGVmaW5lZCBhcyBhbiBvYmplY3Qgd2l0aCBhIFwibGluZVwiIGFuZCBcImNvbHVtblwiXHJcbiAqICAgICAgIGZpZWxkLlxyXG4gKiAgIC0gbWFwOiBBIHNvdXJjZSBtYXAgZGVmaW5pdGlvbi4gVGhpcyBzb3VyY2UgbWFwIGNvdWxkIGFsc28gYmUgaW5kZXhlZCxcclxuICogICAgICAgYnV0IGRvZXNuJ3QgaGF2ZSB0byBiZS5cclxuICpcclxuICogSW5zdGVhZCBvZiB0aGUgXCJtYXBcIiBmaWVsZCwgaXQncyBhbHNvIHBvc3NpYmxlIHRvIGhhdmUgYSBcInVybFwiIGZpZWxkXHJcbiAqIHNwZWNpZnlpbmcgYSBVUkwgdG8gcmV0cmlldmUgYSBzb3VyY2UgbWFwIGZyb20sIGJ1dCB0aGF0J3MgY3VycmVudGx5XHJcbiAqIHVuc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBIZXJlJ3MgYW4gZXhhbXBsZSBzb3VyY2UgbWFwLCB0YWtlbiBmcm9tIHRoZSBzb3VyY2UgbWFwIHNwZWNbMF0sIGJ1dFxyXG4gKiBtb2RpZmllZCB0byBvbWl0IGEgc2VjdGlvbiB3aGljaCB1c2VzIHRoZSBcInVybFwiIGZpZWxkLlxyXG4gKlxyXG4gKiAge1xyXG4gKiAgICB2ZXJzaW9uIDogMyxcclxuICogICAgZmlsZTogXCJhcHAuanNcIixcclxuICogICAgc2VjdGlvbnM6IFt7XHJcbiAqICAgICAgb2Zmc2V0OiB7bGluZToxMDAsIGNvbHVtbjoxMH0sXHJcbiAqICAgICAgbWFwOiB7XHJcbiAqICAgICAgICB2ZXJzaW9uIDogMyxcclxuICogICAgICAgIGZpbGU6IFwic2VjdGlvbi5qc1wiLFxyXG4gKiAgICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxyXG4gKiAgICAgICAgbmFtZXM6IFtcInNyY1wiLCBcIm1hcHNcIiwgXCJhcmVcIiwgXCJmdW5cIl0sXHJcbiAqICAgICAgICBtYXBwaW5nczogXCJBQUFBLEU7O0FCQ0RFO1wiXHJcbiAqICAgICAgfVxyXG4gKiAgICB9XSxcclxuICogIH1cclxuICpcclxuICogVGhlIHNlY29uZCBwYXJhbWV0ZXIsIGlmIGdpdmVuLCBpcyBhIHN0cmluZyB3aG9zZSB2YWx1ZSBpcyB0aGUgVVJMXHJcbiAqIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIHdhcyBmb3VuZC4gIFRoaXMgVVJMIGlzIHVzZWQgdG8gY29tcHV0ZSB0aGVcclxuICogc291cmNlcyBhcnJheS5cclxuICpcclxuICogWzBdOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzFVMVJHQWVoUXdSeXBVVG92RjFLUmxwaU9GemUwYi1fMmdjNmZBSDBLWTBrL2VkaXQjaGVhZGluZz1oLjUzNWVzM3hlcHJndFxyXG4gKi9cclxuZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcclxuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcclxuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHNvdXJjZU1hcCA9IHV0aWwucGFyc2VTb3VyY2VNYXBJbnB1dChhU291cmNlTWFwKTtcclxuICB9XHJcblxyXG4gIHZhciB2ZXJzaW9uID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcInZlcnNpb25cIik7XHJcbiAgdmFyIHNlY3Rpb25zID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCBcInNlY3Rpb25zXCIpO1xyXG5cclxuICBpZiAodmVyc2lvbiAhPSB0aGlzLl92ZXJzaW9uKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB2ZXJzaW9uOiBcIiArIHZlcnNpb24pO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5fc291cmNlcyA9IG5ldyBBcnJheVNldCgpO1xyXG4gIHRoaXMuX25hbWVzID0gbmV3IEFycmF5U2V0KCk7XHJcblxyXG4gIHZhciBsYXN0T2Zmc2V0ID0ge1xyXG4gICAgbGluZTogLTEsXHJcbiAgICBjb2x1bW46IDBcclxuICB9O1xyXG4gIHRoaXMuX3NlY3Rpb25zID0gc2VjdGlvbnMubWFwKGZ1bmN0aW9uKHMpIHtcclxuICAgIGlmIChzLnVybCkge1xyXG4gICAgICAvLyBUaGUgdXJsIGZpZWxkIHdpbGwgcmVxdWlyZSBzdXBwb3J0IGZvciBhc3luY2hyb25pY2l0eS5cclxuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvaXNzdWVzLzE2XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlN1cHBvcnQgZm9yIHVybCBmaWVsZCBpbiBzZWN0aW9ucyBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIG9mZnNldCA9IHV0aWwuZ2V0QXJnKHMsIFwib2Zmc2V0XCIpO1xyXG4gICAgdmFyIG9mZnNldExpbmUgPSB1dGlsLmdldEFyZyhvZmZzZXQsIFwibGluZVwiKTtcclxuICAgIHZhciBvZmZzZXRDb2x1bW4gPSB1dGlsLmdldEFyZyhvZmZzZXQsIFwiY29sdW1uXCIpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgb2Zmc2V0TGluZSA8IGxhc3RPZmZzZXQubGluZSB8fFxyXG4gICAgICAob2Zmc2V0TGluZSA9PT0gbGFzdE9mZnNldC5saW5lICYmIG9mZnNldENvbHVtbiA8IGxhc3RPZmZzZXQuY29sdW1uKVxyXG4gICAgKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlY3Rpb24gb2Zmc2V0cyBtdXN0IGJlIG9yZGVyZWQgYW5kIG5vbi1vdmVybGFwcGluZy5cIik7XHJcbiAgICB9XHJcbiAgICBsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdlbmVyYXRlZE9mZnNldDoge1xyXG4gICAgICAgIC8vIFRoZSBvZmZzZXQgZmllbGRzIGFyZSAwLWJhc2VkLCBidXQgd2UgdXNlIDEtYmFzZWQgaW5kaWNlcyB3aGVuXHJcbiAgICAgICAgLy8gZW5jb2RpbmcvZGVjb2RpbmcgZnJvbSBWTFEuXHJcbiAgICAgICAgZ2VuZXJhdGVkTGluZTogb2Zmc2V0TGluZSArIDEsXHJcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBvZmZzZXRDb2x1bW4gKyAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbnN1bWVyOiBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5nZXRBcmcocywgXCJtYXBcIiksIGFTb3VyY2VNYXBVUkwpXHJcbiAgICB9O1xyXG4gIH0pO1xyXG59XHJcblxyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU291cmNlTWFwQ29uc3VtZXI7XHJcblxyXG4vKipcclxuICogVGhlIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXBwaW5nIHNwZWMgdGhhdCB3ZSBhcmUgY29uc3VtaW5nLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fdmVyc2lvbiA9IDM7XHJcblxyXG4vKipcclxuICogVGhlIGxpc3Qgb2Ygb3JpZ2luYWwgc291cmNlcy5cclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCBcInNvdXJjZXNcIiwge1xyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc291cmNlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBzb3VyY2VzLnB1c2godGhpcy5fc2VjdGlvbnNbaV0uY29uc3VtZXIuc291cmNlc1tqXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzb3VyY2VzO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlLCBsaW5lLCBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2VuZXJhdGVkXHJcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdFxyXG4gKiB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlclxyXG4gKiAgICAgaXMgMS1iYXNlZC5cclxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgY29sdW1uXHJcbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cclxuICpcclxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogICAtIHNvdXJjZTogVGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlLCBvciBudWxsLlxyXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICogICAtIG5hbWU6IFRoZSBvcmlnaW5hbCBpZGVudGlmaWVyLCBvciBudWxsLlxyXG4gKi9cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5vcmlnaW5hbFBvc2l0aW9uRm9yID0gZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX29yaWdpbmFsUG9zaXRpb25Gb3IoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgdmFyIG5lZWRsZSA9IHtcclxuICAgIGdlbmVyYXRlZExpbmU6IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImxpbmVcIiksXHJcbiAgICBnZW5lcmF0ZWRDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCBcImNvbHVtblwiKVxyXG4gIH07XHJcblxyXG4gIC8vIEZpbmQgdGhlIHNlY3Rpb24gY29udGFpbmluZyB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9uIHdlJ3JlIHRyeWluZyB0byBtYXBcclxuICAvLyB0byBhbiBvcmlnaW5hbCBwb3NpdGlvbi5cclxuICB2YXIgc2VjdGlvbkluZGV4ID0gYmluYXJ5U2VhcmNoLnNlYXJjaChuZWVkbGUsIHRoaXMuX3NlY3Rpb25zLCBmdW5jdGlvbihcclxuICAgIG5lZWRsZSxcclxuICAgIHNlY3Rpb25cclxuICApIHtcclxuICAgIHZhciBjbXAgPSBuZWVkbGUuZ2VuZXJhdGVkTGluZSAtIHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmU7XHJcbiAgICBpZiAoY21wKSB7XHJcbiAgICAgIHJldHVybiBjbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5lZWRsZS5nZW5lcmF0ZWRDb2x1bW4gKyAxIC0gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIH0pO1xyXG4gIHZhciBzZWN0aW9uID0gdGhpcy5fc2VjdGlvbnNbc2VjdGlvbkluZGV4XTtcclxuXHJcbiAgaWYgKCFzZWN0aW9uKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IG51bGwsXHJcbiAgICAgIGxpbmU6IG51bGwsXHJcbiAgICAgIGNvbHVtbjogbnVsbCxcclxuICAgICAgbmFtZTogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzZWN0aW9uLmNvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogbmVlZGxlLmdlbmVyYXRlZExpbmUgLSAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxyXG4gICAgY29sdW1uOlxyXG4gICAgICBuZWVkbGUuZ2VuZXJhdGVkQ29sdW1uIC1cclxuICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IG5lZWRsZS5nZW5lcmF0ZWRMaW5lXHJcbiAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXHJcbiAgICAgICAgOiAwKSxcclxuICAgIGJpYXM6IGFBcmdzLmJpYXNcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBoYXZlIHRoZSBzb3VyY2UgY29udGVudCBmb3IgZXZlcnkgc291cmNlIGluIHRoZSBzb3VyY2VcclxuICogbWFwLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5JbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzID0gZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX2hhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCkge1xyXG4gIHJldHVybiB0aGlzLl9zZWN0aW9ucy5ldmVyeShmdW5jdGlvbihzKSB7XHJcbiAgICByZXR1cm4gcy5jb25zdW1lci5oYXNDb250ZW50c09mQWxsU291cmNlcygpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50LiBUaGUgb25seSBhcmd1bWVudCBpcyB0aGUgdXJsIG9mIHRoZVxyXG4gKiBvcmlnaW5hbCBzb3VyY2UgZmlsZS4gUmV0dXJucyBudWxsIGlmIG5vIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50IGlzXHJcbiAqIGF2YWlsYWJsZS5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvciA9IGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9zb3VyY2VDb250ZW50Rm9yKFxyXG4gIGFTb3VyY2UsXHJcbiAgbnVsbE9uTWlzc2luZ1xyXG4pIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xyXG5cclxuICAgIHZhciBjb250ZW50ID0gc2VjdGlvbi5jb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKGFTb3VyY2UsIHRydWUpO1xyXG4gICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChudWxsT25NaXNzaW5nKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxyXG4gKiBsaW5lLCBhbmQgY29sdW1uIHBvc2l0aW9ucyBwcm92aWRlZC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgYW4gb2JqZWN0IHdpdGhcclxuICogdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gc291cmNlOiBUaGUgZmlsZW5hbWUgb2YgdGhlIG9yaWdpbmFsIHNvdXJjZS5cclxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyXHJcbiAqICAgICBpcyAxLWJhc2VkLlxyXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGNvbHVtblxyXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXHJcbiAqXHJcbiAqIGFuZCBhbiBvYmplY3QgaXMgcmV0dXJuZWQgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcclxuICogICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXHJcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxyXG4gKiAgICAgVGhlIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZ2VuZXJhdGVkUG9zaXRpb25Gb3IgPSBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfZ2VuZXJhdGVkUG9zaXRpb25Gb3IoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tpXTtcclxuXHJcbiAgICAvLyBPbmx5IGNvbnNpZGVyIHRoaXMgc2VjdGlvbiBpZiB0aGUgcmVxdWVzdGVkIHNvdXJjZSBpcyBpbiB0aGUgbGlzdCBvZlxyXG4gICAgLy8gc291cmNlcyBvZiB0aGUgY29uc3VtZXIuXHJcbiAgICBpZiAoXHJcbiAgICAgIHNlY3Rpb24uY29uc3VtZXIuX2ZpbmRTb3VyY2VJbmRleCh1dGlsLmdldEFyZyhhQXJncywgXCJzb3VyY2VcIikpID09PSAtMVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIGdlbmVyYXRlZFBvc2l0aW9uID0gc2VjdGlvbi5jb25zdW1lci5nZW5lcmF0ZWRQb3NpdGlvbkZvcihhQXJncyk7XHJcbiAgICBpZiAoZ2VuZXJhdGVkUG9zaXRpb24pIHtcclxuICAgICAgdmFyIHJldCA9IHtcclxuICAgICAgICBsaW5lOlxyXG4gICAgICAgICAgZ2VuZXJhdGVkUG9zaXRpb24ubGluZSArIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lIC0gMSksXHJcbiAgICAgICAgY29sdW1uOlxyXG4gICAgICAgICAgZ2VuZXJhdGVkUG9zaXRpb24uY29sdW1uICtcclxuICAgICAgICAgIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lID09PSBnZW5lcmF0ZWRQb3NpdGlvbi5saW5lXHJcbiAgICAgICAgICAgID8gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkQ29sdW1uIC0gMVxyXG4gICAgICAgICAgICA6IDApXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGluZTogbnVsbCxcclxuICAgIGNvbHVtbjogbnVsbFxyXG4gIH07XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyc2UgdGhlIG1hcHBpbmdzIGluIGEgc3RyaW5nIGluIHRvIGEgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggd2UgY2FuIGVhc2lseVxyXG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcclxuICogYHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzYCBwcm9wZXJ0aWVzKS5cclxuICovXHJcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPSBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhcclxuICBhU3RyLFxyXG4gIGFTb3VyY2VSb290XHJcbikge1xyXG4gIGNvbnN0IGdlbmVyYXRlZE1hcHBpbmdzID0gKHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5nc1Vuc29ydGVkID0gW10pO1xyXG4gIGNvbnN0IG9yaWdpbmFsTWFwcGluZ3MgPSAodGhpcy5fX29yaWdpbmFsTWFwcGluZ3NVbnNvcnRlZCA9IFtdKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xyXG4gICAgdmFyIHNlY3Rpb25NYXBwaW5ncyA9IHNlY3Rpb24uY29uc3VtZXIuX2dlbmVyYXRlZE1hcHBpbmdzO1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWN0aW9uTWFwcGluZ3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgdmFyIG1hcHBpbmcgPSBzZWN0aW9uTWFwcGluZ3Nbal07XHJcblxyXG4gICAgICB2YXIgc291cmNlID0gbnVsbDtcclxuICAgICAgaWYgKG1hcHBpbmcuc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICBzb3VyY2UgPSBzZWN0aW9uLmNvbnN1bWVyLl9zb3VyY2VzLmF0KG1hcHBpbmcuc291cmNlKTtcclxuICAgICAgICBzb3VyY2UgPSB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoXHJcbiAgICAgICAgICBzZWN0aW9uLmNvbnN1bWVyLnNvdXJjZVJvb3QsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICB0aGlzLl9zb3VyY2VNYXBVUkxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZXMuYWRkKHNvdXJjZSk7XHJcbiAgICAgICAgc291cmNlID0gdGhpcy5fc291cmNlcy5pbmRleE9mKHNvdXJjZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBuYW1lID0gbnVsbDtcclxuICAgICAgaWYgKG1hcHBpbmcubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgbmFtZSA9IHNlY3Rpb24uY29uc3VtZXIuX25hbWVzLmF0KG1hcHBpbmcubmFtZSk7XHJcbiAgICAgICAgdGhpcy5fbmFtZXMuYWRkKG5hbWUpO1xyXG4gICAgICAgIG5hbWUgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBUaGUgbWFwcGluZ3MgY29taW5nIGZyb20gdGhlIGNvbnN1bWVyIGZvciB0aGUgc2VjdGlvbiBoYXZlXHJcbiAgICAgIC8vIGdlbmVyYXRlZCBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBzZWN0aW9uLCBzbyB3ZVxyXG4gICAgICAvLyBuZWVkIHRvIG9mZnNldCB0aGVtIHRvIGJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgY29uY2F0ZW5hdGVkXHJcbiAgICAgIC8vIGdlbmVyYXRlZCBmaWxlLlxyXG4gICAgICB2YXIgYWRqdXN0ZWRNYXBwaW5nID0ge1xyXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICAgIGdlbmVyYXRlZExpbmU6XHJcbiAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZExpbmUgKyAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxyXG4gICAgICAgIGdlbmVyYXRlZENvbHVtbjpcclxuICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uICtcclxuICAgICAgICAgIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lID09PSBtYXBwaW5nLmdlbmVyYXRlZExpbmVcclxuICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXHJcbiAgICAgICAgICAgIDogMCksXHJcbiAgICAgICAgb3JpZ2luYWxMaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICBvcmlnaW5hbENvbHVtbjogbWFwcGluZy5vcmlnaW5hbENvbHVtbixcclxuICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBnZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XHJcbiAgICAgIGlmICh0eXBlb2YgYWRqdXN0ZWRNYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIG9yaWdpbmFsTWFwcGluZ3MucHVzaChhZGp1c3RlZE1hcHBpbmcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5jb21wdXRlQ29sdW1uU3BhbnMgPSBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfY29tcHV0ZUNvbHVtblNwYW5zKCkge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLmNvbXB1dGVDb2x1bW5TcGFucygpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydHMuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyID0gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyO1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIGJhc2U2NFZMUSA9IHJlcXVpcmUoXCIuL2Jhc2U2NC12bHFcIik7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxudmFyIEFycmF5U2V0ID0gcmVxdWlyZShcIi4vYXJyYXktc2V0XCIpLkFycmF5U2V0O1xyXG52YXIgTWFwcGluZ0xpc3QgPSByZXF1aXJlKFwiLi9tYXBwaW5nLWxpc3RcIikuTWFwcGluZ0xpc3Q7XHJcblxyXG4vKipcclxuICogQW4gaW5zdGFuY2Ugb2YgdGhlIFNvdXJjZU1hcEdlbmVyYXRvciByZXByZXNlbnRzIGEgc291cmNlIG1hcCB3aGljaCBpc1xyXG4gKiBiZWluZyBidWlsdCBpbmNyZW1lbnRhbGx5LiBZb3UgbWF5IHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZ1xyXG4gKiBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgIC0gZmlsZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBnZW5lcmF0ZWQgc291cmNlLlxyXG4gKiAgIC0gc291cmNlUm9vdDogQSByb290IGZvciBhbGwgcmVsYXRpdmUgVVJMcyBpbiB0aGlzIHNvdXJjZSBtYXAuXHJcbiAqL1xyXG5mdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3IoYUFyZ3MpIHtcclxuICBpZiAoIWFBcmdzKSB7XHJcbiAgICBhQXJncyA9IHt9O1xyXG4gIH1cclxuICB0aGlzLl9maWxlID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwiZmlsZVwiLCBudWxsKTtcclxuICB0aGlzLl9zb3VyY2VSb290ID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwic291cmNlUm9vdFwiLCBudWxsKTtcclxuICB0aGlzLl9za2lwVmFsaWRhdGlvbiA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcInNraXBWYWxpZGF0aW9uXCIsIGZhbHNlKTtcclxuICB0aGlzLl9zb3VyY2VzID0gbmV3IEFycmF5U2V0KCk7XHJcbiAgdGhpcy5fbmFtZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuICB0aGlzLl9tYXBwaW5ncyA9IG5ldyBNYXBwaW5nTGlzdCgpO1xyXG4gIHRoaXMuX3NvdXJjZXNDb250ZW50cyA9IG51bGw7XHJcbn1cclxuXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgU291cmNlTWFwR2VuZXJhdG9yIGJhc2VkIG9uIGEgU291cmNlTWFwQ29uc3VtZXJcclxuICpcclxuICogQHBhcmFtIGFTb3VyY2VNYXBDb25zdW1lciBUaGUgU291cmNlTWFwLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLmZyb21Tb3VyY2VNYXAgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfZnJvbVNvdXJjZU1hcChcclxuICBhU291cmNlTWFwQ29uc3VtZXJcclxuKSB7XHJcbiAgdmFyIHNvdXJjZVJvb3QgPSBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlUm9vdDtcclxuICB2YXIgZ2VuZXJhdG9yID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7XHJcbiAgICBmaWxlOiBhU291cmNlTWFwQ29uc3VtZXIuZmlsZSxcclxuICAgIHNvdXJjZVJvb3Q6IHNvdXJjZVJvb3RcclxuICB9KTtcclxuICBhU291cmNlTWFwQ29uc3VtZXIuZWFjaE1hcHBpbmcoZnVuY3Rpb24obWFwcGluZykge1xyXG4gICAgdmFyIG5ld01hcHBpbmcgPSB7XHJcbiAgICAgIGdlbmVyYXRlZDoge1xyXG4gICAgICAgIGxpbmU6IG1hcHBpbmcuZ2VuZXJhdGVkTGluZSxcclxuICAgICAgICBjb2x1bW46IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuc291cmNlICE9IG51bGwpIHtcclxuICAgICAgbmV3TWFwcGluZy5zb3VyY2UgPSBtYXBwaW5nLnNvdXJjZTtcclxuICAgICAgaWYgKHNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgICAgIG5ld01hcHBpbmcuc291cmNlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBuZXdNYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5ld01hcHBpbmcub3JpZ2luYWwgPSB7XHJcbiAgICAgICAgbGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXHJcbiAgICAgICAgY29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAobWFwcGluZy5uYW1lICE9IG51bGwpIHtcclxuICAgICAgICBuZXdNYXBwaW5nLm5hbWUgPSBtYXBwaW5nLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0b3IuYWRkTWFwcGluZyhuZXdNYXBwaW5nKTtcclxuICB9KTtcclxuICBhU291cmNlTWFwQ29uc3VtZXIuc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZUZpbGUpIHtcclxuICAgIHZhciBzb3VyY2VSZWxhdGl2ZSA9IHNvdXJjZUZpbGU7XHJcbiAgICBpZiAoc291cmNlUm9vdCAhPT0gbnVsbCkge1xyXG4gICAgICBzb3VyY2VSZWxhdGl2ZSA9IHV0aWwucmVsYXRpdmUoc291cmNlUm9vdCwgc291cmNlRmlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFnZW5lcmF0b3IuX3NvdXJjZXMuaGFzKHNvdXJjZVJlbGF0aXZlKSkge1xyXG4gICAgICBnZW5lcmF0b3IuX3NvdXJjZXMuYWRkKHNvdXJjZVJlbGF0aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY29udGVudCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xyXG4gICAgaWYgKGNvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgICBnZW5lcmF0b3Iuc2V0U291cmNlQ29udGVudChzb3VyY2VGaWxlLCBjb250ZW50KTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZ2VuZXJhdG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIHNpbmdsZSBtYXBwaW5nIGZyb20gb3JpZ2luYWwgc291cmNlIGxpbmUgYW5kIGNvbHVtbiB0byB0aGUgZ2VuZXJhdGVkXHJcbiAqIHNvdXJjZSdzIGxpbmUgYW5kIGNvbHVtbiBmb3IgdGhpcyBzb3VyY2UgbWFwIGJlaW5nIGNyZWF0ZWQuIFRoZSBtYXBwaW5nXHJcbiAqIG9iamVjdCBzaG91bGQgaGF2ZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAgLSBnZW5lcmF0ZWQ6IEFuIG9iamVjdCB3aXRoIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucy5cclxuICogICAtIG9yaWdpbmFsOiBBbiBvYmplY3Qgd2l0aCB0aGUgb3JpZ2luYWwgbGluZSBhbmQgY29sdW1uIHBvc2l0aW9ucy5cclxuICogICAtIHNvdXJjZTogVGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlIChyZWxhdGl2ZSB0byB0aGUgc291cmNlUm9vdCkuXHJcbiAqICAgLSBuYW1lOiBBbiBvcHRpb25hbCBvcmlnaW5hbCB0b2tlbiBuYW1lIGZvciB0aGlzIG1hcHBpbmcuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFkZE1hcHBpbmcgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfYWRkTWFwcGluZyhcclxuICBhQXJnc1xyXG4pIHtcclxuICB2YXIgZ2VuZXJhdGVkID0gdXRpbC5nZXRBcmcoYUFyZ3MsIFwiZ2VuZXJhdGVkXCIpO1xyXG4gIHZhciBvcmlnaW5hbCA9IHV0aWwuZ2V0QXJnKGFBcmdzLCBcIm9yaWdpbmFsXCIsIG51bGwpO1xyXG4gIHZhciBzb3VyY2UgPSB1dGlsLmdldEFyZyhhQXJncywgXCJzb3VyY2VcIiwgbnVsbCk7XHJcbiAgdmFyIG5hbWUgPSB1dGlsLmdldEFyZyhhQXJncywgXCJuYW1lXCIsIG51bGwpO1xyXG5cclxuICBpZiAoIXRoaXMuX3NraXBWYWxpZGF0aW9uKSB7XHJcbiAgICB0aGlzLl92YWxpZGF0ZU1hcHBpbmcoZ2VuZXJhdGVkLCBvcmlnaW5hbCwgc291cmNlLCBuYW1lKTtcclxuICB9XHJcblxyXG4gIGlmIChzb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgc291cmNlID0gU3RyaW5nKHNvdXJjZSk7XHJcbiAgICBpZiAoIXRoaXMuX3NvdXJjZXMuaGFzKHNvdXJjZSkpIHtcclxuICAgICAgdGhpcy5fc291cmNlcy5hZGQoc291cmNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChuYW1lICE9IG51bGwpIHtcclxuICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XHJcbiAgICBpZiAoIXRoaXMuX25hbWVzLmhhcyhuYW1lKSkge1xyXG4gICAgICB0aGlzLl9uYW1lcy5hZGQobmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLl9tYXBwaW5ncy5hZGQoe1xyXG4gICAgZ2VuZXJhdGVkTGluZTogZ2VuZXJhdGVkLmxpbmUsXHJcbiAgICBnZW5lcmF0ZWRDb2x1bW46IGdlbmVyYXRlZC5jb2x1bW4sXHJcbiAgICBvcmlnaW5hbExpbmU6IG9yaWdpbmFsICE9IG51bGwgJiYgb3JpZ2luYWwubGluZSxcclxuICAgIG9yaWdpbmFsQ29sdW1uOiBvcmlnaW5hbCAhPSBudWxsICYmIG9yaWdpbmFsLmNvbHVtbixcclxuICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgbmFtZTogbmFtZVxyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGEgc291cmNlIGZpbGUuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLnNldFNvdXJjZUNvbnRlbnQgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3Jfc2V0U291cmNlQ29udGVudChcclxuICBhU291cmNlRmlsZSxcclxuICBhU291cmNlQ29udGVudFxyXG4pIHtcclxuICB2YXIgc291cmNlID0gYVNvdXJjZUZpbGU7XHJcbiAgaWYgKHRoaXMuX3NvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgc291cmNlID0gdXRpbC5yZWxhdGl2ZSh0aGlzLl9zb3VyY2VSb290LCBzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFTb3VyY2VDb250ZW50ICE9IG51bGwpIHtcclxuICAgIC8vIEFkZCB0aGUgc291cmNlIGNvbnRlbnQgdG8gdGhlIF9zb3VyY2VzQ29udGVudHMgbWFwLlxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IF9zb3VyY2VzQ29udGVudHMgbWFwIGlmIHRoZSBwcm9wZXJ0eSBpcyBudWxsLlxyXG4gICAgaWYgKCF0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgICAgdGhpcy5fc291cmNlc0NvbnRlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NvdXJjZXNDb250ZW50c1t1dGlsLnRvU2V0U3RyaW5nKHNvdXJjZSldID0gYVNvdXJjZUNvbnRlbnQ7XHJcbiAgfSBlbHNlIGlmICh0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgIC8vIFJlbW92ZSB0aGUgc291cmNlIGZpbGUgZnJvbSB0aGUgX3NvdXJjZXNDb250ZW50cyBtYXAuXHJcbiAgICAvLyBJZiB0aGUgX3NvdXJjZXNDb250ZW50cyBtYXAgaXMgZW1wdHksIHNldCB0aGUgcHJvcGVydHkgdG8gbnVsbC5cclxuICAgIGRlbGV0ZSB0aGlzLl9zb3VyY2VzQ29udGVudHNbdXRpbC50b1NldFN0cmluZyhzb3VyY2UpXTtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9zb3VyY2VzQ29udGVudHMpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLl9zb3VyY2VzQ29udGVudHMgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIHRoZSBtYXBwaW5ncyBvZiBhIHN1Yi1zb3VyY2UtbWFwIGZvciBhIHNwZWNpZmljIHNvdXJjZSBmaWxlIHRvIHRoZVxyXG4gKiBzb3VyY2UgbWFwIGJlaW5nIGdlbmVyYXRlZC4gRWFjaCBtYXBwaW5nIHRvIHRoZSBzdXBwbGllZCBzb3VyY2UgZmlsZSBpc1xyXG4gKiByZXdyaXR0ZW4gdXNpbmcgdGhlIHN1cHBsaWVkIHNvdXJjZSBtYXAuIE5vdGU6IFRoZSByZXNvbHV0aW9uIGZvciB0aGVcclxuICogcmVzdWx0aW5nIG1hcHBpbmdzIGlzIHRoZSBtaW5pbWl1bSBvZiB0aGlzIG1hcCBhbmQgdGhlIHN1cHBsaWVkIG1hcC5cclxuICpcclxuICogQHBhcmFtIGFTb3VyY2VNYXBDb25zdW1lciBUaGUgc291cmNlIG1hcCB0byBiZSBhcHBsaWVkLlxyXG4gKiBAcGFyYW0gYVNvdXJjZUZpbGUgT3B0aW9uYWwuIFRoZSBmaWxlbmFtZSBvZiB0aGUgc291cmNlIGZpbGUuXHJcbiAqICAgICAgICBJZiBvbWl0dGVkLCBTb3VyY2VNYXBDb25zdW1lcidzIGZpbGUgcHJvcGVydHkgd2lsbCBiZSB1c2VkLlxyXG4gKiBAcGFyYW0gYVNvdXJjZU1hcFBhdGggT3B0aW9uYWwuIFRoZSBkaXJuYW1lIG9mIHRoZSBwYXRoIHRvIHRoZSBzb3VyY2UgbWFwXHJcbiAqICAgICAgICB0byBiZSBhcHBsaWVkLiBJZiByZWxhdGl2ZSwgaXQgaXMgcmVsYXRpdmUgdG8gdGhlIFNvdXJjZU1hcENvbnN1bWVyLlxyXG4gKiAgICAgICAgVGhpcyBwYXJhbWV0ZXIgaXMgbmVlZGVkIHdoZW4gdGhlIHR3byBzb3VyY2UgbWFwcyBhcmVuJ3QgaW4gdGhlIHNhbWVcclxuICogICAgICAgIGRpcmVjdG9yeSwgYW5kIHRoZSBzb3VyY2UgbWFwIHRvIGJlIGFwcGxpZWQgY29udGFpbnMgcmVsYXRpdmUgc291cmNlXHJcbiAqICAgICAgICBwYXRocy4gSWYgc28sIHRob3NlIHJlbGF0aXZlIHNvdXJjZSBwYXRocyBuZWVkIHRvIGJlIHJld3JpdHRlblxyXG4gKiAgICAgICAgcmVsYXRpdmUgdG8gdGhlIFNvdXJjZU1hcEdlbmVyYXRvci5cclxuICovXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuYXBwbHlTb3VyY2VNYXAgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfYXBwbHlTb3VyY2VNYXAoXHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyLFxyXG4gIGFTb3VyY2VGaWxlLFxyXG4gIGFTb3VyY2VNYXBQYXRoXHJcbikge1xyXG4gIHZhciBzb3VyY2VGaWxlID0gYVNvdXJjZUZpbGU7XHJcbiAgLy8gSWYgYVNvdXJjZUZpbGUgaXMgb21pdHRlZCwgd2Ugd2lsbCB1c2UgdGhlIGZpbGUgcHJvcGVydHkgb2YgdGhlIFNvdXJjZU1hcFxyXG4gIGlmIChhU291cmNlRmlsZSA9PSBudWxsKSB7XHJcbiAgICBpZiAoYVNvdXJjZU1hcENvbnN1bWVyLmZpbGUgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgXCJTb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLmFwcGx5U291cmNlTWFwIHJlcXVpcmVzIGVpdGhlciBhbiBleHBsaWNpdCBzb3VyY2UgZmlsZSwgXCIgK1xyXG4gICAgICAgICAgJ29yIHRoZSBzb3VyY2UgbWFwXFwncyBcImZpbGVcIiBwcm9wZXJ0eS4gQm90aCB3ZXJlIG9taXR0ZWQuJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgc291cmNlRmlsZSA9IGFTb3VyY2VNYXBDb25zdW1lci5maWxlO1xyXG4gIH1cclxuICB2YXIgc291cmNlUm9vdCA9IHRoaXMuX3NvdXJjZVJvb3Q7XHJcbiAgLy8gTWFrZSBcInNvdXJjZUZpbGVcIiByZWxhdGl2ZSBpZiBhbiBhYnNvbHV0ZSBVcmwgaXMgcGFzc2VkLlxyXG4gIGlmIChzb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgIHNvdXJjZUZpbGUgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZUZpbGUpO1xyXG4gIH1cclxuICAvLyBBcHBseWluZyB0aGUgU291cmNlTWFwIGNhbiBhZGQgYW5kIHJlbW92ZSBpdGVtcyBmcm9tIHRoZSBzb3VyY2VzIGFuZFxyXG4gIC8vIHRoZSBuYW1lcyBhcnJheS5cclxuICB2YXIgbmV3U291cmNlcyA9XHJcbiAgICB0aGlzLl9tYXBwaW5ncy50b0FycmF5KCkubGVuZ3RoID4gMCA/IG5ldyBBcnJheVNldCgpIDogdGhpcy5fc291cmNlcztcclxuICB2YXIgbmV3TmFtZXMgPSBuZXcgQXJyYXlTZXQoKTtcclxuXHJcbiAgLy8gRmluZCBtYXBwaW5ncyBmb3IgdGhlIFwic291cmNlRmlsZVwiXHJcbiAgdGhpcy5fbWFwcGluZ3MudW5zb3J0ZWRGb3JFYWNoKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIGlmIChtYXBwaW5nLnNvdXJjZSA9PT0gc291cmNlRmlsZSAmJiBtYXBwaW5nLm9yaWdpbmFsTGluZSAhPSBudWxsKSB7XHJcbiAgICAgIC8vIENoZWNrIGlmIGl0IGNhbiBiZSBtYXBwZWQgYnkgdGhlIHNvdXJjZSBtYXAsIHRoZW4gdXBkYXRlIHRoZSBtYXBwaW5nLlxyXG4gICAgICB2YXIgb3JpZ2luYWwgPSBhU291cmNlTWFwQ29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICAgICAgbGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXHJcbiAgICAgICAgY29sdW1uOiBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAob3JpZ2luYWwuc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAvLyBDb3B5IG1hcHBpbmdcclxuICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IG9yaWdpbmFsLnNvdXJjZTtcclxuICAgICAgICBpZiAoYVNvdXJjZU1hcFBhdGggIT0gbnVsbCkge1xyXG4gICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB1dGlsLmpvaW4oYVNvdXJjZU1hcFBhdGgsIG1hcHBpbmcuc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIG1hcHBpbmcuc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgPSBvcmlnaW5hbC5saW5lO1xyXG4gICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPSBvcmlnaW5hbC5jb2x1bW47XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsLm5hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgbWFwcGluZy5uYW1lID0gb3JpZ2luYWwubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc291cmNlID0gbWFwcGluZy5zb3VyY2U7XHJcbiAgICBpZiAoc291cmNlICE9IG51bGwgJiYgIW5ld1NvdXJjZXMuaGFzKHNvdXJjZSkpIHtcclxuICAgICAgbmV3U291cmNlcy5hZGQoc291cmNlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmFtZSA9IG1hcHBpbmcubmFtZTtcclxuICAgIGlmIChuYW1lICE9IG51bGwgJiYgIW5ld05hbWVzLmhhcyhuYW1lKSkge1xyXG4gICAgICBuZXdOYW1lcy5hZGQobmFtZSk7XHJcbiAgICB9XHJcbiAgfSwgdGhpcyk7XHJcbiAgdGhpcy5fc291cmNlcyA9IG5ld1NvdXJjZXM7XHJcbiAgdGhpcy5fbmFtZXMgPSBuZXdOYW1lcztcclxuXHJcbiAgLy8gQ29weSBzb3VyY2VzQ29udGVudHMgb2YgYXBwbGllZCBtYXAuXHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VGaWxlKSB7XHJcbiAgICB2YXIgY29udGVudCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xyXG4gICAgaWYgKGNvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgICBpZiAoYVNvdXJjZU1hcFBhdGggIT0gbnVsbCkge1xyXG4gICAgICAgIHNvdXJjZUZpbGUgPSB1dGlsLmpvaW4oYVNvdXJjZU1hcFBhdGgsIHNvdXJjZUZpbGUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzb3VyY2VSb290ICE9IG51bGwpIHtcclxuICAgICAgICBzb3VyY2VGaWxlID0gdXRpbC5yZWxhdGl2ZShzb3VyY2VSb290LCBzb3VyY2VGaWxlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQSBtYXBwaW5nIGNhbiBoYXZlIG9uZSBvZiB0aGUgdGhyZWUgbGV2ZWxzIG9mIGRhdGE6XHJcbiAqXHJcbiAqICAgMS4gSnVzdCB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9uLlxyXG4gKiAgIDIuIFRoZSBHZW5lcmF0ZWQgcG9zaXRpb24sIG9yaWdpbmFsIHBvc2l0aW9uLCBhbmQgb3JpZ2luYWwgc291cmNlLlxyXG4gKiAgIDMuIEdlbmVyYXRlZCBhbmQgb3JpZ2luYWwgcG9zaXRpb24sIG9yaWdpbmFsIHNvdXJjZSwgYXMgd2VsbCBhcyBhIG5hbWVcclxuICogICAgICB0b2tlbi5cclxuICpcclxuICogVG8gbWFpbnRhaW4gY29uc2lzdGVuY3ksIHdlIHZhbGlkYXRlIHRoYXQgYW55IG5ldyBtYXBwaW5nIGJlaW5nIGFkZGVkIGZhbGxzXHJcbiAqIGluIHRvIG9uZSBvZiB0aGVzZSBjYXRlZ29yaWVzLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGVNYXBwaW5nID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3ZhbGlkYXRlTWFwcGluZyhcclxuICBhR2VuZXJhdGVkLFxyXG4gIGFPcmlnaW5hbCxcclxuICBhU291cmNlLFxyXG4gIGFOYW1lXHJcbikge1xyXG4gIC8vIFdoZW4gYU9yaWdpbmFsIGlzIHRydXRoeSBidXQgaGFzIGVtcHR5IHZhbHVlcyBmb3IgLmxpbmUgYW5kIC5jb2x1bW4sXHJcbiAgLy8gaXQgaXMgbW9zdCBsaWtlbHkgYSBwcm9ncmFtbWVyIGVycm9yLiBJbiB0aGlzIGNhc2Ugd2UgdGhyb3cgYSB2ZXJ5XHJcbiAgLy8gc3BlY2lmaWMgZXJyb3IgbWVzc2FnZSB0byB0cnkgdG8gZ3VpZGUgdGhlbSB0aGUgcmlnaHQgd2F5LlxyXG4gIC8vIEZvciBleGFtcGxlOiBodHRwczovL2dpdGh1Yi5jb20vUG9seW1lci9wb2x5bWVyLWJ1bmRsZXIvcHVsbC81MTlcclxuICBpZiAoXHJcbiAgICBhT3JpZ2luYWwgJiZcclxuICAgIHR5cGVvZiBhT3JpZ2luYWwubGluZSAhPT0gXCJudW1iZXJcIiAmJlxyXG4gICAgdHlwZW9mIGFPcmlnaW5hbC5jb2x1bW4gIT09IFwibnVtYmVyXCJcclxuICApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgXCJvcmlnaW5hbC5saW5lIGFuZCBvcmlnaW5hbC5jb2x1bW4gYXJlIG5vdCBudW1iZXJzIC0tIHlvdSBwcm9iYWJseSBtZWFudCB0byBvbWl0IFwiICtcclxuICAgICAgICBcInRoZSBvcmlnaW5hbCBtYXBwaW5nIGVudGlyZWx5IGFuZCBvbmx5IG1hcCB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9uLiBJZiBzbywgcGFzcyBcIiArXHJcbiAgICAgICAgXCJudWxsIGZvciB0aGUgb3JpZ2luYWwgbWFwcGluZyBpbnN0ZWFkIG9mIGFuIG9iamVjdCB3aXRoIGVtcHR5IG9yIG51bGwgdmFsdWVzLlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgYUdlbmVyYXRlZCAmJlxyXG4gICAgXCJsaW5lXCIgaW4gYUdlbmVyYXRlZCAmJlxyXG4gICAgXCJjb2x1bW5cIiBpbiBhR2VuZXJhdGVkICYmXHJcbiAgICBhR2VuZXJhdGVkLmxpbmUgPiAwICYmXHJcbiAgICBhR2VuZXJhdGVkLmNvbHVtbiA+PSAwICYmXHJcbiAgICAhYU9yaWdpbmFsICYmXHJcbiAgICAhYVNvdXJjZSAmJlxyXG4gICAgIWFOYW1lXHJcbiAgKSB7XHJcbiAgICAvLyBDYXNlIDEuXHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIGFHZW5lcmF0ZWQgJiZcclxuICAgIFwibGluZVwiIGluIGFHZW5lcmF0ZWQgJiZcclxuICAgIFwiY29sdW1uXCIgaW4gYUdlbmVyYXRlZCAmJlxyXG4gICAgYU9yaWdpbmFsICYmXHJcbiAgICBcImxpbmVcIiBpbiBhT3JpZ2luYWwgJiZcclxuICAgIFwiY29sdW1uXCIgaW4gYU9yaWdpbmFsICYmXHJcbiAgICBhR2VuZXJhdGVkLmxpbmUgPiAwICYmXHJcbiAgICBhR2VuZXJhdGVkLmNvbHVtbiA+PSAwICYmXHJcbiAgICBhT3JpZ2luYWwubGluZSA+IDAgJiZcclxuICAgIGFPcmlnaW5hbC5jb2x1bW4gPj0gMCAmJlxyXG4gICAgYVNvdXJjZVxyXG4gICkge1xyXG4gICAgLy8gQ2FzZXMgMiBhbmQgMy5cclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBcIkludmFsaWQgbWFwcGluZzogXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgIGdlbmVyYXRlZDogYUdlbmVyYXRlZCxcclxuICAgICAgICAgIHNvdXJjZTogYVNvdXJjZSxcclxuICAgICAgICAgIG9yaWdpbmFsOiBhT3JpZ2luYWwsXHJcbiAgICAgICAgICBuYW1lOiBhTmFtZVxyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXJpYWxpemUgdGhlIGFjY3VtdWxhdGVkIG1hcHBpbmdzIGluIHRvIHRoZSBzdHJlYW0gb2YgYmFzZSA2NCBWTFFzXHJcbiAqIHNwZWNpZmllZCBieSB0aGUgc291cmNlIG1hcCBmb3JtYXQuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLl9zZXJpYWxpemVNYXBwaW5ncyA9IGZ1bmN0aW9uIFNvdXJjZU1hcEdlbmVyYXRvcl9zZXJpYWxpemVNYXBwaW5ncygpIHtcclxuICB2YXIgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG4gIHZhciBwcmV2aW91c0dlbmVyYXRlZExpbmUgPSAxO1xyXG4gIHZhciBwcmV2aW91c09yaWdpbmFsQ29sdW1uID0gMDtcclxuICB2YXIgcHJldmlvdXNPcmlnaW5hbExpbmUgPSAwO1xyXG4gIHZhciBwcmV2aW91c05hbWUgPSAwO1xyXG4gIHZhciBwcmV2aW91c1NvdXJjZSA9IDA7XHJcbiAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgdmFyIG5leHQ7XHJcbiAgdmFyIG1hcHBpbmc7XHJcbiAgdmFyIG5hbWVJZHg7XHJcbiAgdmFyIHNvdXJjZUlkeDtcclxuXHJcbiAgdmFyIG1hcHBpbmdzID0gdGhpcy5fbWFwcGluZ3MudG9BcnJheSgpO1xyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtYXBwaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgbWFwcGluZyA9IG1hcHBpbmdzW2ldO1xyXG4gICAgbmV4dCA9IFwiXCI7XHJcblxyXG4gICAgaWYgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSAhPT0gcHJldmlvdXNHZW5lcmF0ZWRMaW5lKSB7XHJcbiAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICAgICAgd2hpbGUgKG1hcHBpbmcuZ2VuZXJhdGVkTGluZSAhPT0gcHJldmlvdXNHZW5lcmF0ZWRMaW5lKSB7XHJcbiAgICAgICAgbmV4dCArPSBcIjtcIjtcclxuICAgICAgICBwcmV2aW91c0dlbmVyYXRlZExpbmUrKztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIXV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZywgbWFwcGluZ3NbaSAtIDFdKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHQgKz0gXCIsXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gLSBwcmV2aW91c0dlbmVyYXRlZENvbHVtbik7XHJcbiAgICBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiA9IG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xyXG5cclxuICAgIGlmIChtYXBwaW5nLnNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgIHNvdXJjZUlkeCA9IHRoaXMuX3NvdXJjZXMuaW5kZXhPZihtYXBwaW5nLnNvdXJjZSk7XHJcbiAgICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShzb3VyY2VJZHggLSBwcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgIHByZXZpb3VzU291cmNlID0gc291cmNlSWR4O1xyXG5cclxuICAgICAgLy8gbGluZXMgYXJlIHN0b3JlZCAwLWJhc2VkIGluIFNvdXJjZU1hcCBzcGVjIHZlcnNpb24gM1xyXG4gICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobWFwcGluZy5vcmlnaW5hbExpbmUgLSAxIC0gcHJldmlvdXNPcmlnaW5hbExpbmUpO1xyXG4gICAgICBwcmV2aW91c09yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lIC0gMTtcclxuXHJcbiAgICAgIG5leHQgKz0gYmFzZTY0VkxRLmVuY29kZShtYXBwaW5nLm9yaWdpbmFsQ29sdW1uIC0gcHJldmlvdXNPcmlnaW5hbENvbHVtbik7XHJcbiAgICAgIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xyXG5cclxuICAgICAgaWYgKG1hcHBpbmcubmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgbmFtZUlkeCA9IHRoaXMuX25hbWVzLmluZGV4T2YobWFwcGluZy5uYW1lKTtcclxuICAgICAgICBuZXh0ICs9IGJhc2U2NFZMUS5lbmNvZGUobmFtZUlkeCAtIHByZXZpb3VzTmFtZSk7XHJcbiAgICAgICAgcHJldmlvdXNOYW1lID0gbmFtZUlkeDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3VsdCArPSBuZXh0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcblNvdXJjZU1hcEdlbmVyYXRvci5wcm90b3R5cGUuX2dlbmVyYXRlU291cmNlc0NvbnRlbnQgPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfZ2VuZXJhdGVTb3VyY2VzQ29udGVudChcclxuICBhU291cmNlcyxcclxuICBhU291cmNlUm9vdFxyXG4pIHtcclxuICByZXR1cm4gYVNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xyXG4gICAgaWYgKCF0aGlzLl9zb3VyY2VzQ29udGVudHMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoYVNvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgICBzb3VyY2UgPSB1dGlsLnJlbGF0aXZlKGFTb3VyY2VSb290LCBzb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgdmFyIGtleSA9IHV0aWwudG9TZXRTdHJpbmcoc291cmNlKTtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5fc291cmNlc0NvbnRlbnRzLCBrZXkpXHJcbiAgICAgID8gdGhpcy5fc291cmNlc0NvbnRlbnRzW2tleV1cclxuICAgICAgOiBudWxsO1xyXG4gIH0sIHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4dGVybmFsaXplIHRoZSBzb3VyY2UgbWFwLlxyXG4gKi9cclxuU291cmNlTWFwR2VuZXJhdG9yLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiBTb3VyY2VNYXBHZW5lcmF0b3JfdG9KU09OKCkge1xyXG4gIHZhciBtYXAgPSB7XHJcbiAgICB2ZXJzaW9uOiB0aGlzLl92ZXJzaW9uLFxyXG4gICAgc291cmNlczogdGhpcy5fc291cmNlcy50b0FycmF5KCksXHJcbiAgICBuYW1lczogdGhpcy5fbmFtZXMudG9BcnJheSgpLFxyXG4gICAgbWFwcGluZ3M6IHRoaXMuX3NlcmlhbGl6ZU1hcHBpbmdzKClcclxuICB9O1xyXG4gIGlmICh0aGlzLl9maWxlICE9IG51bGwpIHtcclxuICAgIG1hcC5maWxlID0gdGhpcy5fZmlsZTtcclxuICB9XHJcbiAgaWYgKHRoaXMuX3NvdXJjZVJvb3QgIT0gbnVsbCkge1xyXG4gICAgbWFwLnNvdXJjZVJvb3QgPSB0aGlzLl9zb3VyY2VSb290O1xyXG4gIH1cclxuICBpZiAodGhpcy5fc291cmNlc0NvbnRlbnRzKSB7XHJcbiAgICBtYXAuc291cmNlc0NvbnRlbnQgPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZXNDb250ZW50KFxyXG4gICAgICBtYXAuc291cmNlcyxcclxuICAgICAgbWFwLnNvdXJjZVJvb3RcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWFwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlciB0aGUgc291cmNlIG1hcCBiZWluZyBnZW5lcmF0ZWQgdG8gYSBzdHJpbmcuXHJcbiAqL1xyXG5Tb3VyY2VNYXBHZW5lcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gU291cmNlTWFwR2VuZXJhdG9yX3RvU3RyaW5nKCkge1xyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcclxufTtcclxuXHJcbmV4cG9ydHMuU291cmNlTWFwR2VuZXJhdG9yID0gU291cmNlTWFwR2VuZXJhdG9yO1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIFNvdXJjZU1hcEdlbmVyYXRvciA9IHJlcXVpcmUoXCIuL3NvdXJjZS1tYXAtZ2VuZXJhdG9yXCIpLlNvdXJjZU1hcEdlbmVyYXRvcjtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5cclxuLy8gTWF0Y2hlcyBhIFdpbmRvd3Mtc3R5bGUgYFxcclxcbmAgbmV3bGluZSBvciBhIGBcXG5gIG5ld2xpbmUgdXNlZCBieSBhbGwgb3RoZXJcclxuLy8gb3BlcmF0aW5nIHN5c3RlbXMgdGhlc2UgZGF5cyAoY2FwdHVyaW5nIHRoZSByZXN1bHQpLlxyXG52YXIgUkVHRVhfTkVXTElORSA9IC8oXFxyP1xcbikvO1xyXG5cclxuLy8gTmV3bGluZSBjaGFyYWN0ZXIgY29kZSBmb3IgY2hhckNvZGVBdCgpIGNvbXBhcmlzb25zXHJcbnZhciBORVdMSU5FX0NPREUgPSAxMDtcclxuXHJcbi8vIFByaXZhdGUgc3ltYm9sIGZvciBpZGVudGlmeWluZyBgU291cmNlTm9kZWBzIHdoZW4gbXVsdGlwbGUgdmVyc2lvbnMgb2ZcclxuLy8gdGhlIHNvdXJjZS1tYXAgbGlicmFyeSBhcmUgbG9hZGVkLiBUaGlzIE1VU1QgTk9UIENIQU5HRSBhY3Jvc3NcclxuLy8gdmVyc2lvbnMhXHJcbnZhciBpc1NvdXJjZU5vZGUgPSBcIiQkJGlzU291cmNlTm9kZSQkJFwiO1xyXG5cclxuLyoqXHJcbiAqIFNvdXJjZU5vZGVzIHByb3ZpZGUgYSB3YXkgdG8gYWJzdHJhY3Qgb3ZlciBpbnRlcnBvbGF0aW5nL2NvbmNhdGVuYXRpbmdcclxuICogc25pcHBldHMgb2YgZ2VuZXJhdGVkIEphdmFTY3JpcHQgc291cmNlIGNvZGUgd2hpbGUgbWFpbnRhaW5pbmcgdGhlIGxpbmUgYW5kXHJcbiAqIGNvbHVtbiBpbmZvcm1hdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIG9yaWdpbmFsIHNvdXJjZSBjb2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYUxpbmUgVGhlIG9yaWdpbmFsIGxpbmUgbnVtYmVyLlxyXG4gKiBAcGFyYW0gYUNvbHVtbiBUaGUgb3JpZ2luYWwgY29sdW1uIG51bWJlci5cclxuICogQHBhcmFtIGFTb3VyY2UgVGhlIG9yaWdpbmFsIHNvdXJjZSdzIGZpbGVuYW1lLlxyXG4gKiBAcGFyYW0gYUNodW5rcyBPcHRpb25hbC4gQW4gYXJyYXkgb2Ygc3RyaW5ncyB3aGljaCBhcmUgc25pcHBldHMgb2ZcclxuICogICAgICAgIGdlbmVyYXRlZCBKUywgb3Igb3RoZXIgU291cmNlTm9kZXMuXHJcbiAqIEBwYXJhbSBhTmFtZSBUaGUgb3JpZ2luYWwgaWRlbnRpZmllci5cclxuICovXHJcbmZ1bmN0aW9uIFNvdXJjZU5vZGUoYUxpbmUsIGFDb2x1bW4sIGFTb3VyY2UsIGFDaHVua3MsIGFOYW1lKSB7XHJcbiAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gIHRoaXMuc291cmNlQ29udGVudHMgPSB7fTtcclxuICB0aGlzLmxpbmUgPSBhTGluZSA9PSBudWxsID8gbnVsbCA6IGFMaW5lO1xyXG4gIHRoaXMuY29sdW1uID0gYUNvbHVtbiA9PSBudWxsID8gbnVsbCA6IGFDb2x1bW47XHJcbiAgdGhpcy5zb3VyY2UgPSBhU291cmNlID09IG51bGwgPyBudWxsIDogYVNvdXJjZTtcclxuICB0aGlzLm5hbWUgPSBhTmFtZSA9PSBudWxsID8gbnVsbCA6IGFOYW1lO1xyXG4gIHRoaXNbaXNTb3VyY2VOb2RlXSA9IHRydWU7XHJcbiAgaWYgKGFDaHVua3MgIT0gbnVsbCkgdGhpcy5hZGQoYUNodW5rcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgU291cmNlTm9kZSBmcm9tIGdlbmVyYXRlZCBjb2RlIGFuZCBhIFNvdXJjZU1hcENvbnN1bWVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gYUdlbmVyYXRlZENvZGUgVGhlIGdlbmVyYXRlZCBjb2RlXHJcbiAqIEBwYXJhbSBhU291cmNlTWFwQ29uc3VtZXIgVGhlIFNvdXJjZU1hcCBmb3IgdGhlIGdlbmVyYXRlZCBjb2RlXHJcbiAqIEBwYXJhbSBhUmVsYXRpdmVQYXRoIE9wdGlvbmFsLiBUaGUgcGF0aCB0aGF0IHJlbGF0aXZlIHNvdXJjZXMgaW4gdGhlXHJcbiAqICAgICAgICBTb3VyY2VNYXBDb25zdW1lciBzaG91bGQgYmUgcmVsYXRpdmUgdG8uXHJcbiAqL1xyXG5Tb3VyY2VOb2RlLmZyb21TdHJpbmdXaXRoU291cmNlTWFwID0gZnVuY3Rpb24gU291cmNlTm9kZV9mcm9tU3RyaW5nV2l0aFNvdXJjZU1hcChcclxuICBhR2VuZXJhdGVkQ29kZSxcclxuICBhU291cmNlTWFwQ29uc3VtZXIsXHJcbiAgYVJlbGF0aXZlUGF0aFxyXG4pIHtcclxuICAvLyBUaGUgU291cmNlTm9kZSB3ZSB3YW50IHRvIGZpbGwgd2l0aCB0aGUgZ2VuZXJhdGVkIGNvZGVcclxuICAvLyBhbmQgdGhlIFNvdXJjZU1hcFxyXG4gIHZhciBub2RlID0gbmV3IFNvdXJjZU5vZGUoKTtcclxuXHJcbiAgLy8gQWxsIGV2ZW4gaW5kaWNlcyBvZiB0aGlzIGFycmF5IGFyZSBvbmUgbGluZSBvZiB0aGUgZ2VuZXJhdGVkIGNvZGUsXHJcbiAgLy8gd2hpbGUgYWxsIG9kZCBpbmRpY2VzIGFyZSB0aGUgbmV3bGluZXMgYmV0d2VlbiB0d28gYWRqYWNlbnQgbGluZXNcclxuICAvLyAoc2luY2UgYFJFR0VYX05FV0xJTkVgIGNhcHR1cmVzIGl0cyBtYXRjaCkuXHJcbiAgLy8gUHJvY2Vzc2VkIGZyYWdtZW50cyBhcmUgYWNjZXNzZWQgYnkgY2FsbGluZyBgc2hpZnROZXh0TGluZWAuXHJcbiAgdmFyIHJlbWFpbmluZ0xpbmVzID0gYUdlbmVyYXRlZENvZGUuc3BsaXQoUkVHRVhfTkVXTElORSk7XHJcbiAgdmFyIHJlbWFpbmluZ0xpbmVzSW5kZXggPSAwO1xyXG4gIHZhciBzaGlmdE5leHRMaW5lID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbGluZUNvbnRlbnRzID0gZ2V0TmV4dExpbmUoKTtcclxuICAgIC8vIFRoZSBsYXN0IGxpbmUgb2YgYSBmaWxlIG1pZ2h0IG5vdCBoYXZlIGEgbmV3bGluZS5cclxuICAgIHZhciBuZXdMaW5lID0gZ2V0TmV4dExpbmUoKSB8fCBcIlwiO1xyXG4gICAgcmV0dXJuIGxpbmVDb250ZW50cyArIG5ld0xpbmU7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmV4dExpbmUoKSB7XHJcbiAgICAgIHJldHVybiByZW1haW5pbmdMaW5lc0luZGV4IDwgcmVtYWluaW5nTGluZXMubGVuZ3RoXHJcbiAgICAgICAgPyByZW1haW5pbmdMaW5lc1tyZW1haW5pbmdMaW5lc0luZGV4KytdXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gV2UgbmVlZCB0byByZW1lbWJlciB0aGUgcG9zaXRpb24gb2YgXCJyZW1haW5pbmdMaW5lc1wiXHJcbiAgdmFyIGxhc3RHZW5lcmF0ZWRMaW5lID0gMSxcclxuICAgIGxhc3RHZW5lcmF0ZWRDb2x1bW4gPSAwO1xyXG5cclxuICAvLyBUaGUgZ2VuZXJhdGUgU291cmNlTm9kZXMgd2UgbmVlZCBhIGNvZGUgcmFuZ2UuXHJcbiAgLy8gVG8gZXh0cmFjdCBpdCBjdXJyZW50IGFuZCBsYXN0IG1hcHBpbmcgaXMgdXNlZC5cclxuICAvLyBIZXJlIHdlIHN0b3JlIHRoZSBsYXN0IG1hcHBpbmcuXHJcbiAgdmFyIGxhc3RNYXBwaW5nID0gbnVsbDtcclxuXHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyLmVhY2hNYXBwaW5nKGZ1bmN0aW9uKG1hcHBpbmcpIHtcclxuICAgIGlmIChsYXN0TWFwcGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAvLyBXZSBhZGQgdGhlIGNvZGUgZnJvbSBcImxhc3RNYXBwaW5nXCIgdG8gXCJtYXBwaW5nXCI6XHJcbiAgICAgIC8vIEZpcnN0IGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IGxpbmUgaW4gYmV0d2Vlbi5cclxuICAgICAgaWYgKGxhc3RHZW5lcmF0ZWRMaW5lIDwgbWFwcGluZy5nZW5lcmF0ZWRMaW5lKSB7XHJcbiAgICAgICAgLy8gQXNzb2NpYXRlIGZpcnN0IGxpbmUgd2l0aCBcImxhc3RNYXBwaW5nXCJcclxuICAgICAgICBhZGRNYXBwaW5nV2l0aENvZGUobGFzdE1hcHBpbmcsIHNoaWZ0TmV4dExpbmUoKSk7XHJcbiAgICAgICAgbGFzdEdlbmVyYXRlZExpbmUrKztcclxuICAgICAgICBsYXN0R2VuZXJhdGVkQ29sdW1uID0gMDtcclxuICAgICAgICAvLyBUaGUgcmVtYWluaW5nIGNvZGUgaXMgYWRkZWQgd2l0aG91dCBtYXBwaW5nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gbmV3IGxpbmUgaW4gYmV0d2Vlbi5cclxuICAgICAgICAvLyBBc3NvY2lhdGUgdGhlIGNvZGUgYmV0d2VlbiBcImxhc3RHZW5lcmF0ZWRDb2x1bW5cIiBhbmRcclxuICAgICAgICAvLyBcIm1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uXCIgd2l0aCBcImxhc3RNYXBwaW5nXCJcclxuICAgICAgICB2YXIgbmV4dExpbmUgPSByZW1haW5pbmdMaW5lc1tyZW1haW5pbmdMaW5lc0luZGV4XSB8fCBcIlwiO1xyXG4gICAgICAgIHZhciBjb2RlID0gbmV4dExpbmUuc3Vic3RyKFxyXG4gICAgICAgICAgMCxcclxuICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uIC0gbGFzdEdlbmVyYXRlZENvbHVtblxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVtYWluaW5nTGluZXNbcmVtYWluaW5nTGluZXNJbmRleF0gPSBuZXh0TGluZS5zdWJzdHIoXHJcbiAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbiAtIGxhc3RHZW5lcmF0ZWRDb2x1bW5cclxuICAgICAgICApO1xyXG4gICAgICAgIGxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcclxuICAgICAgICBhZGRNYXBwaW5nV2l0aENvZGUobGFzdE1hcHBpbmcsIGNvZGUpO1xyXG4gICAgICAgIC8vIE5vIG1vcmUgcmVtYWluaW5nIGNvZGUsIGNvbnRpbnVlXHJcbiAgICAgICAgbGFzdE1hcHBpbmcgPSBtYXBwaW5nO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gV2UgYWRkIHRoZSBnZW5lcmF0ZWQgY29kZSB1bnRpbCB0aGUgZmlyc3QgbWFwcGluZ1xyXG4gICAgLy8gdG8gdGhlIFNvdXJjZU5vZGUgd2l0aG91dCBhbnkgbWFwcGluZy5cclxuICAgIC8vIEVhY2ggbGluZSBpcyBhZGRlZCBhcyBzZXBhcmF0ZSBzdHJpbmcuXHJcbiAgICB3aGlsZSAobGFzdEdlbmVyYXRlZExpbmUgPCBtYXBwaW5nLmdlbmVyYXRlZExpbmUpIHtcclxuICAgICAgbm9kZS5hZGQoc2hpZnROZXh0TGluZSgpKTtcclxuICAgICAgbGFzdEdlbmVyYXRlZExpbmUrKztcclxuICAgIH1cclxuICAgIGlmIChsYXN0R2VuZXJhdGVkQ29sdW1uIDwgbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4pIHtcclxuICAgICAgdmFyIG5leHRMaW5lID0gcmVtYWluaW5nTGluZXNbcmVtYWluaW5nTGluZXNJbmRleF0gfHwgXCJcIjtcclxuICAgICAgbm9kZS5hZGQobmV4dExpbmUuc3Vic3RyKDAsIG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uKSk7XHJcbiAgICAgIHJlbWFpbmluZ0xpbmVzW3JlbWFpbmluZ0xpbmVzSW5kZXhdID0gbmV4dExpbmUuc3Vic3RyKFxyXG4gICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uXHJcbiAgICAgICk7XHJcbiAgICAgIGxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbjtcclxuICAgIH1cclxuICAgIGxhc3RNYXBwaW5nID0gbWFwcGluZztcclxuICB9LCB0aGlzKTtcclxuICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgbWFwcGluZ3MuXHJcbiAgaWYgKHJlbWFpbmluZ0xpbmVzSW5kZXggPCByZW1haW5pbmdMaW5lcy5sZW5ndGgpIHtcclxuICAgIGlmIChsYXN0TWFwcGluZykge1xyXG4gICAgICAvLyBBc3NvY2lhdGUgdGhlIHJlbWFpbmluZyBjb2RlIGluIHRoZSBjdXJyZW50IGxpbmUgd2l0aCBcImxhc3RNYXBwaW5nXCJcclxuICAgICAgYWRkTWFwcGluZ1dpdGhDb2RlKGxhc3RNYXBwaW5nLCBzaGlmdE5leHRMaW5lKCkpO1xyXG4gICAgfVxyXG4gICAgLy8gYW5kIGFkZCB0aGUgcmVtYWluaW5nIGxpbmVzIHdpdGhvdXQgYW55IG1hcHBpbmdcclxuICAgIG5vZGUuYWRkKHJlbWFpbmluZ0xpbmVzLnNwbGljZShyZW1haW5pbmdMaW5lc0luZGV4KS5qb2luKFwiXCIpKTtcclxuICB9XHJcblxyXG4gIC8vIENvcHkgc291cmNlc0NvbnRlbnQgaW50byBTb3VyY2VOb2RlXHJcbiAgYVNvdXJjZU1hcENvbnN1bWVyLnNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VGaWxlKSB7XHJcbiAgICB2YXIgY29udGVudCA9IGFTb3VyY2VNYXBDb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xyXG4gICAgaWYgKGNvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgICBpZiAoYVJlbGF0aXZlUGF0aCAhPSBudWxsKSB7XHJcbiAgICAgICAgc291cmNlRmlsZSA9IHV0aWwuam9pbihhUmVsYXRpdmVQYXRoLCBzb3VyY2VGaWxlKTtcclxuICAgICAgfVxyXG4gICAgICBub2RlLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG5cclxuICBmdW5jdGlvbiBhZGRNYXBwaW5nV2l0aENvZGUobWFwcGluZywgY29kZSkge1xyXG4gICAgaWYgKG1hcHBpbmcgPT09IG51bGwgfHwgbWFwcGluZy5zb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBub2RlLmFkZChjb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBzb3VyY2UgPVxyXG4gICAgICAgIGFSZWxhdGl2ZVBhdGggJiYgbWFwcGluZy5zb3VyY2VcclxuICAgICAgICAgID8gdXRpbC5qb2luKGFSZWxhdGl2ZVBhdGgsIG1hcHBpbmcuc291cmNlKVxyXG4gICAgICAgICAgOiBtYXBwaW5nLnNvdXJjZTtcclxuICAgICAgbm9kZS5hZGQoXHJcbiAgICAgICAgbmV3IFNvdXJjZU5vZGUoXHJcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSxcclxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBjb2RlLFxyXG4gICAgICAgICAgbWFwcGluZy5uYW1lXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBjaHVuayBvZiBnZW5lcmF0ZWQgSlMgdG8gdGhpcyBzb3VyY2Ugbm9kZS5cclxuICpcclxuICogQHBhcmFtIGFDaHVuayBBIHN0cmluZyBzbmlwcGV0IG9mIGdlbmVyYXRlZCBKUyBjb2RlLCBhbm90aGVyIGluc3RhbmNlIG9mXHJcbiAqICAgICAgICBTb3VyY2VOb2RlLCBvciBhbiBhcnJheSB3aGVyZSBlYWNoIG1lbWJlciBpcyBvbmUgb2YgdGhvc2UgdGhpbmdzLlxyXG4gKi9cclxuU291cmNlTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gU291cmNlTm9kZV9hZGQoYUNodW5rKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoYUNodW5rKSkge1xyXG4gICAgYUNodW5rLmZvckVhY2goZnVuY3Rpb24oY2h1bmspIHtcclxuICAgICAgdGhpcy5hZGQoY2h1bmspO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSBlbHNlIGlmIChhQ2h1bmtbaXNTb3VyY2VOb2RlXSB8fCB0eXBlb2YgYUNodW5rID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBpZiAoYUNodW5rKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChhQ2h1bmspO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBcIkV4cGVjdGVkIGEgU291cmNlTm9kZSwgc3RyaW5nLCBvciBhbiBhcnJheSBvZiBTb3VyY2VOb2RlcyBhbmQgc3RyaW5ncy4gR290IFwiICtcclxuICAgICAgICBhQ2h1bmtcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIGNodW5rIG9mIGdlbmVyYXRlZCBKUyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgc291cmNlIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSBhQ2h1bmsgQSBzdHJpbmcgc25pcHBldCBvZiBnZW5lcmF0ZWQgSlMgY29kZSwgYW5vdGhlciBpbnN0YW5jZSBvZlxyXG4gKiAgICAgICAgU291cmNlTm9kZSwgb3IgYW4gYXJyYXkgd2hlcmUgZWFjaCBtZW1iZXIgaXMgb25lIG9mIHRob3NlIHRoaW5ncy5cclxuICovXHJcblNvdXJjZU5vZGUucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiBTb3VyY2VOb2RlX3ByZXBlbmQoYUNodW5rKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoYUNodW5rKSkge1xyXG4gICAgZm9yICh2YXIgaSA9IGFDaHVuay5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICB0aGlzLnByZXBlbmQoYUNodW5rW2ldKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGFDaHVua1tpc1NvdXJjZU5vZGVdIHx8IHR5cGVvZiBhQ2h1bmsgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4udW5zaGlmdChhQ2h1bmspO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBcIkV4cGVjdGVkIGEgU291cmNlTm9kZSwgc3RyaW5nLCBvciBhbiBhcnJheSBvZiBTb3VyY2VOb2RlcyBhbmQgc3RyaW5ncy4gR290IFwiICtcclxuICAgICAgICBhQ2h1bmtcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdhbGsgb3ZlciB0aGUgdHJlZSBvZiBKUyBzbmlwcGV0cyBpbiB0aGlzIG5vZGUgYW5kIGl0cyBjaGlsZHJlbi4gVGhlXHJcbiAqIHdhbGtpbmcgZnVuY3Rpb24gaXMgY2FsbGVkIG9uY2UgZm9yIGVhY2ggc25pcHBldCBvZiBKUyBhbmQgaXMgcGFzc2VkIHRoYXRcclxuICogc25pcHBldCBhbmQgdGhlIGl0cyBvcmlnaW5hbCBhc3NvY2lhdGVkIHNvdXJjZSdzIGxpbmUvY29sdW1uIGxvY2F0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gYUZuIFRoZSB0cmF2ZXJzYWwgZnVuY3Rpb24uXHJcbiAqL1xyXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24gU291cmNlTm9kZV93YWxrKGFGbikge1xyXG4gIHZhciBjaHVuaztcclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgY2h1bmsgPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG4gICAgaWYgKGNodW5rW2lzU291cmNlTm9kZV0pIHtcclxuICAgICAgY2h1bmsud2FsayhhRm4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNodW5rICE9PSBcIlwiKSB7XHJcbiAgICAgICAgYUZuKGNodW5rLCB7XHJcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxyXG4gICAgICAgICAgbGluZTogdGhpcy5saW5lLFxyXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIExpa2UgYFN0cmluZy5wcm90b3R5cGUuam9pbmAgZXhjZXB0IGZvciBTb3VyY2VOb2Rlcy4gSW5zZXJ0cyBgYVN0cmAgYmV0d2VlblxyXG4gKiBlYWNoIG9mIGB0aGlzLmNoaWxkcmVuYC5cclxuICpcclxuICogQHBhcmFtIGFTZXAgVGhlIHNlcGFyYXRvci5cclxuICovXHJcblNvdXJjZU5vZGUucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiBTb3VyY2VOb2RlX2pvaW4oYVNlcCkge1xyXG4gIHZhciBuZXdDaGlsZHJlbjtcclxuICB2YXIgaTtcclxuICB2YXIgbGVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgaWYgKGxlbiA+IDApIHtcclxuICAgIG5ld0NoaWxkcmVuID0gW107XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuIC0gMTsgaSsrKSB7XHJcbiAgICAgIG5ld0NoaWxkcmVuLnB1c2godGhpcy5jaGlsZHJlbltpXSk7XHJcbiAgICAgIG5ld0NoaWxkcmVuLnB1c2goYVNlcCk7XHJcbiAgICB9XHJcbiAgICBuZXdDaGlsZHJlbi5wdXNoKHRoaXMuY2hpbGRyZW5baV0pO1xyXG4gICAgdGhpcy5jaGlsZHJlbiA9IG5ld0NoaWxkcmVuO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSBvbiB0aGUgdmVyeSByaWdodC1tb3N0IHNvdXJjZSBzbmlwcGV0LiBVc2VmdWxcclxuICogZm9yIHRyaW1taW5nIHdoaXRlc3BhY2UgZnJvbSB0aGUgZW5kIG9mIGEgc291cmNlIG5vZGUsIGV0Yy5cclxuICpcclxuICogQHBhcmFtIGFQYXR0ZXJuIFRoZSBwYXR0ZXJuIHRvIHJlcGxhY2UuXHJcbiAqIEBwYXJhbSBhUmVwbGFjZW1lbnQgVGhlIHRoaW5nIHRvIHJlcGxhY2UgdGhlIHBhdHRlcm4gd2l0aC5cclxuICovXHJcblNvdXJjZU5vZGUucHJvdG90eXBlLnJlcGxhY2VSaWdodCA9IGZ1bmN0aW9uIFNvdXJjZU5vZGVfcmVwbGFjZVJpZ2h0KFxyXG4gIGFQYXR0ZXJuLFxyXG4gIGFSZXBsYWNlbWVudFxyXG4pIHtcclxuICB2YXIgbGFzdENoaWxkID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xyXG4gIGlmIChsYXN0Q2hpbGRbaXNTb3VyY2VOb2RlXSkge1xyXG4gICAgbGFzdENoaWxkLnJlcGxhY2VSaWdodChhUGF0dGVybiwgYVJlcGxhY2VtZW50KTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBsYXN0Q2hpbGQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXSA9IGxhc3RDaGlsZC5yZXBsYWNlKFxyXG4gICAgICBhUGF0dGVybixcclxuICAgICAgYVJlcGxhY2VtZW50XHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goXCJcIi5yZXBsYWNlKGFQYXR0ZXJuLCBhUmVwbGFjZW1lbnQpKTtcclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBzb3VyY2UgY29udGVudCBmb3IgYSBzb3VyY2UgZmlsZS4gVGhpcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBTb3VyY2VNYXBHZW5lcmF0b3JcclxuICogaW4gdGhlIHNvdXJjZXNDb250ZW50IGZpZWxkLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVNvdXJjZUZpbGUgVGhlIGZpbGVuYW1lIG9mIHRoZSBzb3VyY2UgZmlsZVxyXG4gKiBAcGFyYW0gYVNvdXJjZUNvbnRlbnQgVGhlIGNvbnRlbnQgb2YgdGhlIHNvdXJjZSBmaWxlXHJcbiAqL1xyXG5Tb3VyY2VOb2RlLnByb3RvdHlwZS5zZXRTb3VyY2VDb250ZW50ID0gZnVuY3Rpb24gU291cmNlTm9kZV9zZXRTb3VyY2VDb250ZW50KFxyXG4gIGFTb3VyY2VGaWxlLFxyXG4gIGFTb3VyY2VDb250ZW50XHJcbikge1xyXG4gIHRoaXMuc291cmNlQ29udGVudHNbdXRpbC50b1NldFN0cmluZyhhU291cmNlRmlsZSldID0gYVNvdXJjZUNvbnRlbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogV2FsayBvdmVyIHRoZSB0cmVlIG9mIFNvdXJjZU5vZGVzLiBUaGUgd2Fsa2luZyBmdW5jdGlvbiBpcyBjYWxsZWQgZm9yIGVhY2hcclxuICogc291cmNlIGZpbGUgY29udGVudCBhbmQgaXMgcGFzc2VkIHRoZSBmaWxlbmFtZSBhbmQgc291cmNlIGNvbnRlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhRm4gVGhlIHRyYXZlcnNhbCBmdW5jdGlvbi5cclxuICovXHJcblNvdXJjZU5vZGUucHJvdG90eXBlLndhbGtTb3VyY2VDb250ZW50cyA9IGZ1bmN0aW9uIFNvdXJjZU5vZGVfd2Fsa1NvdXJjZUNvbnRlbnRzKFxyXG4gIGFGblxyXG4pIHtcclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW5baV1baXNTb3VyY2VOb2RlXSkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuW2ldLndhbGtTb3VyY2VDb250ZW50cyhhRm4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHNvdXJjZXMgPSBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUNvbnRlbnRzKTtcclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgYUZuKHV0aWwuZnJvbVNldFN0cmluZyhzb3VyY2VzW2ldKSwgdGhpcy5zb3VyY2VDb250ZW50c1tzb3VyY2VzW2ldXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc291cmNlIG5vZGUuIFdhbGtzIG92ZXIgdGhlIHRyZWVcclxuICogYW5kIGNvbmNhdGVuYXRlcyBhbGwgdGhlIHZhcmlvdXMgc25pcHBldHMgdG9nZXRoZXIgdG8gb25lIHN0cmluZy5cclxuICovXHJcblNvdXJjZU5vZGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gU291cmNlTm9kZV90b1N0cmluZygpIHtcclxuICB2YXIgc3RyID0gXCJcIjtcclxuICB0aGlzLndhbGsoZnVuY3Rpb24oY2h1bmspIHtcclxuICAgIHN0ciArPSBjaHVuaztcclxuICB9KTtcclxuICByZXR1cm4gc3RyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHNvdXJjZSBub2RlIGFsb25nIHdpdGggYSBzb3VyY2VcclxuICogbWFwLlxyXG4gKi9cclxuU291cmNlTm9kZS5wcm90b3R5cGUudG9TdHJpbmdXaXRoU291cmNlTWFwID0gZnVuY3Rpb24gU291cmNlTm9kZV90b1N0cmluZ1dpdGhTb3VyY2VNYXAoXHJcbiAgYUFyZ3NcclxuKSB7XHJcbiAgdmFyIGdlbmVyYXRlZCA9IHtcclxuICAgIGNvZGU6IFwiXCIsXHJcbiAgICBsaW5lOiAxLFxyXG4gICAgY29sdW1uOiAwXHJcbiAgfTtcclxuICB2YXIgbWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcihhQXJncyk7XHJcbiAgdmFyIHNvdXJjZU1hcHBpbmdBY3RpdmUgPSBmYWxzZTtcclxuICB2YXIgbGFzdE9yaWdpbmFsU291cmNlID0gbnVsbDtcclxuICB2YXIgbGFzdE9yaWdpbmFsTGluZSA9IG51bGw7XHJcbiAgdmFyIGxhc3RPcmlnaW5hbENvbHVtbiA9IG51bGw7XHJcbiAgdmFyIGxhc3RPcmlnaW5hbE5hbWUgPSBudWxsO1xyXG4gIHRoaXMud2FsayhmdW5jdGlvbihjaHVuaywgb3JpZ2luYWwpIHtcclxuICAgIGdlbmVyYXRlZC5jb2RlICs9IGNodW5rO1xyXG4gICAgaWYgKFxyXG4gICAgICBvcmlnaW5hbC5zb3VyY2UgIT09IG51bGwgJiZcclxuICAgICAgb3JpZ2luYWwubGluZSAhPT0gbnVsbCAmJlxyXG4gICAgICBvcmlnaW5hbC5jb2x1bW4gIT09IG51bGxcclxuICAgICkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgbGFzdE9yaWdpbmFsU291cmNlICE9PSBvcmlnaW5hbC5zb3VyY2UgfHxcclxuICAgICAgICBsYXN0T3JpZ2luYWxMaW5lICE9PSBvcmlnaW5hbC5saW5lIHx8XHJcbiAgICAgICAgbGFzdE9yaWdpbmFsQ29sdW1uICE9PSBvcmlnaW5hbC5jb2x1bW4gfHxcclxuICAgICAgICBsYXN0T3JpZ2luYWxOYW1lICE9PSBvcmlnaW5hbC5uYW1lXHJcbiAgICAgICkge1xyXG4gICAgICAgIG1hcC5hZGRNYXBwaW5nKHtcclxuICAgICAgICAgIHNvdXJjZTogb3JpZ2luYWwuc291cmNlLFxyXG4gICAgICAgICAgb3JpZ2luYWw6IHtcclxuICAgICAgICAgICAgbGluZTogb3JpZ2luYWwubGluZSxcclxuICAgICAgICAgICAgY29sdW1uOiBvcmlnaW5hbC5jb2x1bW5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZW5lcmF0ZWQ6IHtcclxuICAgICAgICAgICAgbGluZTogZ2VuZXJhdGVkLmxpbmUsXHJcbiAgICAgICAgICAgIGNvbHVtbjogZ2VuZXJhdGVkLmNvbHVtblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG5hbWU6IG9yaWdpbmFsLm5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBsYXN0T3JpZ2luYWxTb3VyY2UgPSBvcmlnaW5hbC5zb3VyY2U7XHJcbiAgICAgIGxhc3RPcmlnaW5hbExpbmUgPSBvcmlnaW5hbC5saW5lO1xyXG4gICAgICBsYXN0T3JpZ2luYWxDb2x1bW4gPSBvcmlnaW5hbC5jb2x1bW47XHJcbiAgICAgIGxhc3RPcmlnaW5hbE5hbWUgPSBvcmlnaW5hbC5uYW1lO1xyXG4gICAgICBzb3VyY2VNYXBwaW5nQWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc291cmNlTWFwcGluZ0FjdGl2ZSkge1xyXG4gICAgICBtYXAuYWRkTWFwcGluZyh7XHJcbiAgICAgICAgZ2VuZXJhdGVkOiB7XHJcbiAgICAgICAgICBsaW5lOiBnZW5lcmF0ZWQubGluZSxcclxuICAgICAgICAgIGNvbHVtbjogZ2VuZXJhdGVkLmNvbHVtblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGxhc3RPcmlnaW5hbFNvdXJjZSA9IG51bGw7XHJcbiAgICAgIHNvdXJjZU1hcHBpbmdBY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGlkeCA9IDAsIGxlbmd0aCA9IGNodW5rLmxlbmd0aDsgaWR4IDwgbGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICBpZiAoY2h1bmsuY2hhckNvZGVBdChpZHgpID09PSBORVdMSU5FX0NPREUpIHtcclxuICAgICAgICBnZW5lcmF0ZWQubGluZSsrO1xyXG4gICAgICAgIGdlbmVyYXRlZC5jb2x1bW4gPSAwO1xyXG4gICAgICAgIC8vIE1hcHBpbmdzIGVuZCBhdCBlb2xcclxuICAgICAgICBpZiAoaWR4ICsgMSA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICBsYXN0T3JpZ2luYWxTb3VyY2UgPSBudWxsO1xyXG4gICAgICAgICAgc291cmNlTWFwcGluZ0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc291cmNlTWFwcGluZ0FjdGl2ZSkge1xyXG4gICAgICAgICAgbWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IG9yaWdpbmFsLnNvdXJjZSxcclxuICAgICAgICAgICAgb3JpZ2luYWw6IHtcclxuICAgICAgICAgICAgICBsaW5lOiBvcmlnaW5hbC5saW5lLFxyXG4gICAgICAgICAgICAgIGNvbHVtbjogb3JpZ2luYWwuY29sdW1uXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdlbmVyYXRlZDoge1xyXG4gICAgICAgICAgICAgIGxpbmU6IGdlbmVyYXRlZC5saW5lLFxyXG4gICAgICAgICAgICAgIGNvbHVtbjogZ2VuZXJhdGVkLmNvbHVtblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYW1lOiBvcmlnaW5hbC5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2VuZXJhdGVkLmNvbHVtbisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgdGhpcy53YWxrU291cmNlQ29udGVudHMoZnVuY3Rpb24oc291cmNlRmlsZSwgc291cmNlQ29udGVudCkge1xyXG4gICAgbWFwLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgc291cmNlQ29udGVudCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7IGNvZGU6IGdlbmVyYXRlZC5jb2RlLCBtYXA6IG1hcCB9O1xyXG59O1xyXG5cclxuZXhwb3J0cy5Tb3VyY2VOb2RlID0gU291cmNlTm9kZTtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIHZhbHVlcyBmcm9tIHBhcmFtZXRlci9vcHRpb25zXHJcbiAqIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcmdzIFRoZSBvYmplY3Qgd2UgYXJlIGV4dHJhY3RpbmcgdmFsdWVzIGZyb21cclxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIGFyZSBnZXR0aW5nLlxyXG4gKiBAcGFyYW0gZGVmYXVsdFZhbHVlIEFuIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBpZiB0aGUgcHJvcGVydHkgaXMgbWlzc2luZ1xyXG4gKiBmcm9tIHRoZSBvYmplY3QuIElmIHRoaXMgaXMgbm90IHNwZWNpZmllZCBhbmQgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmcsIGFuXHJcbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QXJnKGFBcmdzLCBhTmFtZSwgYURlZmF1bHRWYWx1ZSkge1xyXG4gIGlmIChhTmFtZSBpbiBhQXJncykge1xyXG4gICAgcmV0dXJuIGFBcmdzW2FOYW1lXTtcclxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgIHJldHVybiBhRGVmYXVsdFZhbHVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFOYW1lICsgJ1wiIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0QXJnID0gZ2V0QXJnO1xyXG5cclxudmFyIHVybFJlZ2V4cCA9IC9eKD86KFtcXHcrXFwtLl0rKTopP1xcL1xcLyg/OihcXHcrOlxcdyspQCk/KFtcXHcuLV0qKSg/OjooXFxkKykpPyguKikkLztcclxudmFyIGRhdGFVcmxSZWdleHAgPSAvXmRhdGE6LitcXCwuKyQvO1xyXG5cclxuZnVuY3Rpb24gdXJsUGFyc2UoYVVybCkge1xyXG4gIHZhciBtYXRjaCA9IGFVcmwubWF0Y2godXJsUmVnZXhwKTtcclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHNjaGVtZTogbWF0Y2hbMV0sXHJcbiAgICBhdXRoOiBtYXRjaFsyXSxcclxuICAgIGhvc3Q6IG1hdGNoWzNdLFxyXG4gICAgcG9ydDogbWF0Y2hbNF0sXHJcbiAgICBwYXRoOiBtYXRjaFs1XVxyXG4gIH07XHJcbn1cclxuZXhwb3J0cy51cmxQYXJzZSA9IHVybFBhcnNlO1xyXG5cclxuZnVuY3Rpb24gdXJsR2VuZXJhdGUoYVBhcnNlZFVybCkge1xyXG4gIHZhciB1cmwgPSBcIlwiO1xyXG4gIGlmIChhUGFyc2VkVXJsLnNjaGVtZSkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuc2NoZW1lICsgXCI6XCI7XHJcbiAgfVxyXG4gIHVybCArPSBcIi8vXCI7XHJcbiAgaWYgKGFQYXJzZWRVcmwuYXV0aCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuYXV0aCArIFwiQFwiO1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5ob3N0KSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5ob3N0O1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5wb3J0KSB7XHJcbiAgICB1cmwgKz0gXCI6XCIgKyBhUGFyc2VkVXJsLnBvcnQ7XHJcbiAgfVxyXG4gIGlmIChhUGFyc2VkVXJsLnBhdGgpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnBhdGg7XHJcbiAgfVxyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuZXhwb3J0cy51cmxHZW5lcmF0ZSA9IHVybEdlbmVyYXRlO1xyXG5cclxuY29uc3QgTUFYX0NBQ0hFRF9JTlBVVFMgPSAzMjtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBzb21lIGZ1bmN0aW9uIGBmKGlucHV0KSAtPiByZXN1bHRgIGFuZCByZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZlxyXG4gKiBgZmAuXHJcbiAqXHJcbiAqIFdlIGtlZXAgYXQgbW9zdCBgTUFYX0NBQ0hFRF9JTlBVVFNgIG1lbW9pemVkIHJlc3VsdHMgb2YgYGZgIGFsaXZlLiBUaGVcclxuICogbWVtb2l6YXRpb24gaXMgYSBkdW1iLXNpbXBsZSwgbGluZWFyIGxlYXN0LXJlY2VudGx5LXVzZWQgY2FjaGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBscnVNZW1vaXplKGYpIHtcclxuICBjb25zdCBjYWNoZSA9IFtdO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGNhY2hlW2ldLmlucHV0ID09PSBpbnB1dCkge1xyXG4gICAgICAgIHZhciB0ZW1wID0gY2FjaGVbMF07XHJcbiAgICAgICAgY2FjaGVbMF0gPSBjYWNoZVtpXTtcclxuICAgICAgICBjYWNoZVtpXSA9IHRlbXA7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlWzBdLnJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXN1bHQgPSBmKGlucHV0KTtcclxuXHJcbiAgICBjYWNoZS51bnNoaWZ0KHtcclxuICAgICAgaW5wdXQsXHJcbiAgICAgIHJlc3VsdFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNhY2hlLmxlbmd0aCA+IE1BWF9DQUNIRURfSU5QVVRTKSB7XHJcbiAgICAgIGNhY2hlLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgYSBwYXRoLCBvciB0aGUgcGF0aCBwb3J0aW9uIG9mIGEgVVJMOlxyXG4gKlxyXG4gKiAtIFJlcGxhY2VzIGNvbnNlY3V0aXZlIHNsYXNoZXMgd2l0aCBvbmUgc2xhc2guXHJcbiAqIC0gUmVtb3ZlcyB1bm5lY2Vzc2FyeSAnLicgcGFydHMuXHJcbiAqIC0gUmVtb3ZlcyB1bm5lY2Vzc2FyeSAnPGRpcj4vLi4nIHBhcnRzLlxyXG4gKlxyXG4gKiBCYXNlZCBvbiBjb2RlIGluIHRoZSBOb2RlLmpzICdwYXRoJyBjb3JlIG1vZHVsZS5cclxuICpcclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIHVybCB0byBub3JtYWxpemUuXHJcbiAqL1xyXG52YXIgbm9ybWFsaXplID0gbHJ1TWVtb2l6ZShmdW5jdGlvbiBub3JtYWxpemUoYVBhdGgpIHtcclxuICB2YXIgcGF0aCA9IGFQYXRoO1xyXG4gIHZhciB1cmwgPSB1cmxQYXJzZShhUGF0aCk7XHJcbiAgaWYgKHVybCkge1xyXG4gICAgaWYgKCF1cmwucGF0aCkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcbiAgICBwYXRoID0gdXJsLnBhdGg7XHJcbiAgfVxyXG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpO1xyXG5cclxuICAvLyBTcGxpdCB0aGUgcGF0aCBpbnRvIHBhcnRzIGJldHdlZW4gYC9gIGNoYXJhY3RlcnMuIFRoaXMgaXMgbXVjaCBmYXN0ZXIgdGhhblxyXG4gIC8vIHVzaW5nIGAuc3BsaXQoL1xcLysvZylgLlxyXG4gIHZhciBwYXJ0cyA9IFtdO1xyXG4gIHZhciBzdGFydCA9IDA7XHJcbiAgdmFyIGkgPSAwO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBzdGFydCA9IGk7XHJcbiAgICBpID0gcGF0aC5pbmRleE9mKFwiL1wiLCBzdGFydCk7XHJcbiAgICBpZiAoaSA9PT0gLTEpIHtcclxuICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKHN0YXJ0KSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKHN0YXJ0LCBpKSk7XHJcbiAgICAgIHdoaWxlIChpIDwgcGF0aC5sZW5ndGggJiYgcGF0aFtpXSA9PT0gXCIvXCIpIHtcclxuICAgICAgICBpKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAodmFyIHBhcnQsIHVwID0gMCwgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBwYXJ0ID0gcGFydHNbaV07XHJcbiAgICBpZiAocGFydCA9PT0gXCIuXCIpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSBcIi4uXCIpIHtcclxuICAgICAgdXArKztcclxuICAgIH0gZWxzZSBpZiAodXAgPiAwKSB7XHJcbiAgICAgIGlmIChwYXJ0ID09PSBcIlwiKSB7XHJcbiAgICAgICAgLy8gVGhlIGZpcnN0IHBhcnQgaXMgYmxhbmsgaWYgdGhlIHBhdGggaXMgYWJzb2x1dGUuIFRyeWluZyB0byBnb1xyXG4gICAgICAgIC8vIGFib3ZlIHRoZSByb290IGlzIGEgbm8tb3AuIFRoZXJlZm9yZSB3ZSBjYW4gcmVtb3ZlIGFsbCAnLi4nIHBhcnRzXHJcbiAgICAgICAgLy8gZGlyZWN0bHkgYWZ0ZXIgdGhlIHJvb3QuXHJcbiAgICAgICAgcGFydHMuc3BsaWNlKGkgKyAxLCB1cCk7XHJcbiAgICAgICAgdXAgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcnRzLnNwbGljZShpLCAyKTtcclxuICAgICAgICB1cC0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHBhdGggPSBwYXJ0cy5qb2luKFwiL1wiKTtcclxuXHJcbiAgaWYgKHBhdGggPT09IFwiXCIpIHtcclxuICAgIHBhdGggPSBpc0Fic29sdXRlID8gXCIvXCIgOiBcIi5cIjtcclxuICB9XHJcblxyXG4gIGlmICh1cmwpIHtcclxuICAgIHVybC5wYXRoID0gcGF0aDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZSh1cmwpO1xyXG4gIH1cclxuICByZXR1cm4gcGF0aDtcclxufSk7XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG5cclxuLyoqXHJcbiAqIEpvaW5zIHR3byBwYXRocy9VUkxzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgam9pbmVkIHdpdGggdGhlIHJvb3QuXHJcbiAqXHJcbiAqIC0gSWYgYVBhdGggaXMgYSBVUkwgb3IgYSBkYXRhIFVSSSwgYVBhdGggaXMgcmV0dXJuZWQsIHVubGVzcyBhUGF0aCBpcyBhXHJcbiAqICAgc2NoZW1lLXJlbGF0aXZlIFVSTDogVGhlbiB0aGUgc2NoZW1lIG9mIGFSb290LCBpZiBhbnksIGlzIHByZXBlbmRlZFxyXG4gKiAgIGZpcnN0LlxyXG4gKiAtIE90aGVyd2lzZSBhUGF0aCBpcyBhIHBhdGguIElmIGFSb290IGlzIGEgVVJMLCB0aGVuIGl0cyBwYXRoIHBvcnRpb25cclxuICogICBpcyB1cGRhdGVkIHdpdGggdGhlIHJlc3VsdCBhbmQgYVJvb3QgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSB0aGUgcmVzdWx0XHJcbiAqICAgaXMgcmV0dXJuZWQuXHJcbiAqICAgLSBJZiBhUGF0aCBpcyBhYnNvbHV0ZSwgdGhlIHJlc3VsdCBpcyBhUGF0aC5cclxuICogICAtIE90aGVyd2lzZSB0aGUgdHdvIHBhdGhzIGFyZSBqb2luZWQgd2l0aCBhIHNsYXNoLlxyXG4gKiAtIEpvaW5pbmcgZm9yIGV4YW1wbGUgJ2h0dHA6Ly8nIGFuZCAnd3d3LmV4YW1wbGUuY29tJyBpcyBhbHNvIHN1cHBvcnRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGpvaW4oYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuICBpZiAoYVBhdGggPT09IFwiXCIpIHtcclxuICAgIGFQYXRoID0gXCIuXCI7XHJcbiAgfVxyXG4gIHZhciBhUGF0aFVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICB2YXIgYVJvb3RVcmwgPSB1cmxQYXJzZShhUm9vdCk7XHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdCA9IGFSb290VXJsLnBhdGggfHwgXCIvXCI7XHJcbiAgfVxyXG5cclxuICAvLyBgam9pbihmb28sICcvL3d3dy5leGFtcGxlLm9yZycpYFxyXG4gIGlmIChhUGF0aFVybCAmJiAhYVBhdGhVcmwuc2NoZW1lKSB7XHJcbiAgICBpZiAoYVJvb3RVcmwpIHtcclxuICAgICAgYVBhdGhVcmwuc2NoZW1lID0gYVJvb3RVcmwuc2NoZW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFQYXRoVXJsKTtcclxuICB9XHJcblxyXG4gIGlmIChhUGF0aFVybCB8fCBhUGF0aC5tYXRjaChkYXRhVXJsUmVnZXhwKSkge1xyXG4gICAgcmV0dXJuIGFQYXRoO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oJ2h0dHA6Ly8nLCAnd3d3LmV4YW1wbGUuY29tJylgXHJcbiAgaWYgKGFSb290VXJsICYmICFhUm9vdFVybC5ob3N0ICYmICFhUm9vdFVybC5wYXRoKSB7XHJcbiAgICBhUm9vdFVybC5ob3N0ID0gYVBhdGg7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVJvb3RVcmwpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGpvaW5lZCA9XHJcbiAgICBhUGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiXHJcbiAgICAgID8gYVBhdGhcclxuICAgICAgOiBub3JtYWxpemUoYVJvb3QucmVwbGFjZSgvXFwvKyQvLCBcIlwiKSArIFwiL1wiICsgYVBhdGgpO1xyXG5cclxuICBpZiAoYVJvb3RVcmwpIHtcclxuICAgIGFSb290VXJsLnBhdGggPSBqb2luZWQ7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVJvb3RVcmwpO1xyXG4gIH1cclxuICByZXR1cm4gam9pbmVkO1xyXG59XHJcbmV4cG9ydHMuam9pbiA9IGpvaW47XHJcblxyXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihhUGF0aCkge1xyXG4gIHJldHVybiBhUGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiIHx8IHVybFJlZ2V4cC50ZXN0KGFQYXRoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWtlIGEgcGF0aCByZWxhdGl2ZSB0byBhIFVSTCBvciBhbm90aGVyIHBhdGguXHJcbiAqXHJcbiAqIEBwYXJhbSBhUm9vdCBUaGUgcm9vdCBwYXRoIG9yIFVSTC5cclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBtYWRlIHJlbGF0aXZlIHRvIGFSb290LlxyXG4gKi9cclxuZnVuY3Rpb24gcmVsYXRpdmUoYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuXHJcbiAgYVJvb3QgPSBhUm9vdC5yZXBsYWNlKC9cXC8kLywgXCJcIik7XHJcblxyXG4gIC8vIEl0IGlzIHBvc3NpYmxlIGZvciB0aGUgcGF0aCB0byBiZSBhYm92ZSB0aGUgcm9vdC4gSW4gdGhpcyBjYXNlLCBzaW1wbHlcclxuICAvLyBjaGVja2luZyB3aGV0aGVyIHRoZSByb290IGlzIGEgcHJlZml4IG9mIHRoZSBwYXRoIHdvbid0IHdvcmsuIEluc3RlYWQsIHdlXHJcbiAgLy8gbmVlZCB0byByZW1vdmUgY29tcG9uZW50cyBmcm9tIHRoZSByb290IG9uZSBieSBvbmUsIHVudGlsIGVpdGhlciB3ZSBmaW5kXHJcbiAgLy8gYSBwcmVmaXggdGhhdCBmaXRzLCBvciB3ZSBydW4gb3V0IG9mIGNvbXBvbmVudHMgdG8gcmVtb3ZlLlxyXG4gIHZhciBsZXZlbCA9IDA7XHJcbiAgd2hpbGUgKGFQYXRoLmluZGV4T2YoYVJvb3QgKyBcIi9cIikgIT09IDApIHtcclxuICAgIHZhciBpbmRleCA9IGFSb290Lmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHRoZSBvbmx5IHBhcnQgb2YgdGhlIHJvb3QgdGhhdCBpcyBsZWZ0IGlzIHRoZSBzY2hlbWUgKGkuZS4gaHR0cDovLyxcclxuICAgIC8vIGZpbGU6Ly8vLCBldGMuKSwgb25lIG9yIG1vcmUgc2xhc2hlcyAoLyksIG9yIHNpbXBseSBub3RoaW5nIGF0IGFsbCwgd2VcclxuICAgIC8vIGhhdmUgZXhoYXVzdGVkIGFsbCBjb21wb25lbnRzLCBzbyB0aGUgcGF0aCBpcyBub3QgcmVsYXRpdmUgdG8gdGhlIHJvb3QuXHJcbiAgICBhUm9vdCA9IGFSb290LnNsaWNlKDAsIGluZGV4KTtcclxuICAgIGlmIChhUm9vdC5tYXRjaCgvXihbXlxcL10rOlxcLyk/XFwvKiQvKSkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgKytsZXZlbDtcclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB3ZSBhZGQgYSBcIi4uL1wiIGZvciBlYWNoIGNvbXBvbmVudCB3ZSByZW1vdmVkIGZyb20gdGhlIHJvb3QuXHJcbiAgcmV0dXJuIEFycmF5KGxldmVsICsgMSkuam9pbihcIi4uL1wiKSArIGFQYXRoLnN1YnN0cihhUm9vdC5sZW5ndGggKyAxKTtcclxufVxyXG5leHBvcnRzLnJlbGF0aXZlID0gcmVsYXRpdmU7XHJcblxyXG52YXIgc3VwcG9ydHNOdWxsUHJvdG8gPSAoZnVuY3Rpb24oKSB7XHJcbiAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgcmV0dXJuICEoXCJfX3Byb3RvX19cIiBpbiBvYmopO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gaWRlbnRpdHkocykge1xyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG4vKipcclxuICogQmVjYXVzZSBiZWhhdmlvciBnb2VzIHdhY2t5IHdoZW4geW91IHNldCBgX19wcm90b19fYCBvbiBvYmplY3RzLCB3ZVxyXG4gKiBoYXZlIHRvIHByZWZpeCBhbGwgdGhlIHN0cmluZ3MgaW4gb3VyIHNldCB3aXRoIGFuIGFyYml0cmFyeSBjaGFyYWN0ZXIuXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL3B1bGwvMzEgYW5kXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvaXNzdWVzLzMwXHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuZnVuY3Rpb24gdG9TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gXCIkXCIgKyBhU3RyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFTdHI7XHJcbn1cclxuZXhwb3J0cy50b1NldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiB0b1NldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGZyb21TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gYVN0ci5zbGljZSgxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMuZnJvbVNldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiBmcm9tU2V0U3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gaXNQcm90b1N0cmluZyhzKSB7XHJcbiAgaWYgKCFzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB2YXIgbGVuZ3RoID0gcy5sZW5ndGg7XHJcblxyXG4gIGlmIChsZW5ndGggPCA5IC8qIFwiX19wcm90b19fXCIubGVuZ3RoICovKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoXHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSkgIT09IDk1IC8qICdfJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDIpICE9PSA5NSAvKiAnXycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAzKSAhPT0gMTExIC8qICdvJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDQpICE9PSAxMTYgLyogJ3QnICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNSkgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA2KSAhPT0gMTE0IC8qICdyJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDcpICE9PSAxMTIgLyogJ3AnICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOCkgIT09IDk1IC8qICdfJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDkpICE9PSA5NSAvKiAnXycgKi9cclxuICApIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZvciAodmFyIGkgPSBsZW5ndGggLSAxMDsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGlmIChzLmNoYXJDb2RlQXQoaSkgIT09IDM2IC8qICckJyAqLykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2hlcmUgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqXHJcbiAqIE9wdGlvbmFsbHkgcGFzcyBpbiBgdHJ1ZWAgYXMgYG9ubHlDb21wYXJlR2VuZXJhdGVkYCB0byBjb25zaWRlciB0d29cclxuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4sIGJ1dCBkaWZmZXJlbnQgZ2VuZXJhdGVkXHJcbiAqIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhIG1hcHBpbmcgd2l0aCBhXHJcbiAqIHN0dWJiZWQgb3V0IG1hcHBpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyhtYXBwaW5nQSwgbWFwcGluZ0IsIG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICB2YXIgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVPcmlnaW5hbCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyA9IGNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zO1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2l0aCBkZWZsYXRlZCBzb3VyY2UgYW5kIG5hbWUgaW5kaWNlcyB3aGVyZVxyXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqXHJcbiAqIE9wdGlvbmFsbHkgcGFzcyBpbiBgdHJ1ZWAgYXMgYG9ubHlDb21wYXJlR2VuZXJhdGVkYCB0byBjb25zaWRlciB0d29cclxuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uLCBidXQgZGlmZmVyZW50XHJcbiAqIHNvdXJjZS9uYW1lL29yaWdpbmFsIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhXHJcbiAqIG1hcHBpbmcgd2l0aCBhIHN0dWJiZWQgb3V0IG1hcHBpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZChcclxuICBtYXBwaW5nQSxcclxuICBtYXBwaW5nQixcclxuICBvbmx5Q29tcGFyZUdlbmVyYXRlZFxyXG4pIHtcclxuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlR2VuZXJhdGVkKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZDtcclxuXHJcbmZ1bmN0aW9uIHN0cmNtcChhU3RyMSwgYVN0cjIpIHtcclxuICBpZiAoYVN0cjEgPT09IGFTdHIyKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMSA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIDE7IC8vIGFTdHIyICE9PSBudWxsXHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjIgPT09IG51bGwpIHtcclxuICAgIHJldHVybiAtMTsgLy8gYVN0cjEgIT09IG51bGxcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMSA+IGFTdHIyKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9XHJcblxyXG4gIHJldHVybiAtMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2l0aCBpbmZsYXRlZCBzb3VyY2UgYW5kIG5hbWUgc3RyaW5ncyB3aGVyZVxyXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZChtYXBwaW5nQSwgbWFwcGluZ0IpIHtcclxuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZDtcclxuXHJcbi8qKlxyXG4gKiBTdHJpcCBhbnkgSlNPTiBYU1NJIGF2b2lkYW5jZSBwcmVmaXggZnJvbSB0aGUgc3RyaW5nIChhcyBkb2N1bWVudGVkXHJcbiAqIGluIHRoZSBzb3VyY2UgbWFwcyBzcGVjaWZpY2F0aW9uKSwgYW5kIHRoZW4gcGFyc2UgdGhlIHN0cmluZyBhc1xyXG4gKiBKU09OLlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VTb3VyY2VNYXBJbnB1dChzdHIpIHtcclxuICByZXR1cm4gSlNPTi5wYXJzZShzdHIucmVwbGFjZSgvXlxcKV19J1teXFxuXSpcXG4vLCBcIlwiKSk7XHJcbn1cclxuZXhwb3J0cy5wYXJzZVNvdXJjZU1hcElucHV0ID0gcGFyc2VTb3VyY2VNYXBJbnB1dDtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHRoZSBVUkwgb2YgYSBzb3VyY2UgZ2l2ZW4gdGhlIHRoZSBzb3VyY2Ugcm9vdCwgdGhlIHNvdXJjZSdzXHJcbiAqIFVSTCwgYW5kIHRoZSBzb3VyY2UgbWFwJ3MgVVJMLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkge1xyXG4gIHNvdXJjZVVSTCA9IHNvdXJjZVVSTCB8fCBcIlwiO1xyXG5cclxuICBpZiAoc291cmNlUm9vdCkge1xyXG4gICAgLy8gVGhpcyBmb2xsb3dzIHdoYXQgQ2hyb21lIGRvZXMuXHJcbiAgICBpZiAoc291cmNlUm9vdFtzb3VyY2VSb290Lmxlbmd0aCAtIDFdICE9PSBcIi9cIiAmJiBzb3VyY2VVUkxbMF0gIT09IFwiL1wiKSB7XHJcbiAgICAgIHNvdXJjZVJvb3QgKz0gXCIvXCI7XHJcbiAgICB9XHJcbiAgICAvLyBUaGUgc3BlYyBzYXlzOlxyXG4gICAgLy8gICBMaW5lIDQ6IEFuIG9wdGlvbmFsIHNvdXJjZSByb290LCB1c2VmdWwgZm9yIHJlbG9jYXRpbmcgc291cmNlXHJcbiAgICAvLyAgIGZpbGVzIG9uIGEgc2VydmVyIG9yIHJlbW92aW5nIHJlcGVhdGVkIHZhbHVlcyBpbiB0aGVcclxuICAgIC8vICAg4oCcc291cmNlc+KAnSBlbnRyeS4gIFRoaXMgdmFsdWUgaXMgcHJlcGVuZGVkIHRvIHRoZSBpbmRpdmlkdWFsXHJcbiAgICAvLyAgIGVudHJpZXMgaW4gdGhlIOKAnHNvdXJjZeKAnSBmaWVsZC5cclxuICAgIHNvdXJjZVVSTCA9IHNvdXJjZVJvb3QgKyBzb3VyY2VVUkw7XHJcbiAgfVxyXG5cclxuICAvLyBIaXN0b3JpY2FsbHksIFNvdXJjZU1hcENvbnN1bWVyIGRpZCBub3QgdGFrZSB0aGUgc291cmNlTWFwVVJMIGFzXHJcbiAgLy8gYSBwYXJhbWV0ZXIuICBUaGlzIG1vZGUgaXMgc3RpbGwgc29tZXdoYXQgc3VwcG9ydGVkLCB3aGljaCBpcyB3aHlcclxuICAvLyB0aGlzIGNvZGUgYmxvY2sgaXMgY29uZGl0aW9uYWwuICBIb3dldmVyLCBpdCdzIHByZWZlcmFibGUgdG8gcGFzc1xyXG4gIC8vIHRoZSBzb3VyY2UgbWFwIFVSTCB0byBTb3VyY2VNYXBDb25zdW1lciwgc28gdGhhdCB0aGlzIGZ1bmN0aW9uXHJcbiAgLy8gY2FuIGltcGxlbWVudCB0aGUgc291cmNlIFVSTCByZXNvbHV0aW9uIGFsZ29yaXRobSBhcyBvdXRsaW5lZCBpblxyXG4gIC8vIHRoZSBzcGVjLiAgVGhpcyBibG9jayBpcyBiYXNpY2FsbHkgdGhlIGVxdWl2YWxlbnQgb2Y6XHJcbiAgLy8gICAgbmV3IFVSTChzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkudG9TdHJpbmcoKVxyXG4gIC8vIC4uLiBleGNlcHQgaXQgYXZvaWRzIHVzaW5nIFVSTCwgd2hpY2ggd2Fzbid0IGF2YWlsYWJsZSBpbiB0aGVcclxuICAvLyBvbGRlciByZWxlYXNlcyBvZiBub2RlIHN0aWxsIHN1cHBvcnRlZCBieSB0aGlzIGxpYnJhcnkuXHJcbiAgLy9cclxuICAvLyBUaGUgc3BlYyBzYXlzOlxyXG4gIC8vICAgSWYgdGhlIHNvdXJjZXMgYXJlIG5vdCBhYnNvbHV0ZSBVUkxzIGFmdGVyIHByZXBlbmRpbmcgb2YgdGhlXHJcbiAgLy8gICDigJxzb3VyY2VSb2904oCdLCB0aGUgc291cmNlcyBhcmUgcmVzb2x2ZWQgcmVsYXRpdmUgdG8gdGhlXHJcbiAgLy8gICBTb3VyY2VNYXAgKGxpa2UgcmVzb2x2aW5nIHNjcmlwdCBzcmMgaW4gYSBodG1sIGRvY3VtZW50KS5cclxuICBpZiAoc291cmNlTWFwVVJMKSB7XHJcbiAgICB2YXIgcGFyc2VkID0gdXJsUGFyc2Uoc291cmNlTWFwVVJMKTtcclxuICAgIGlmICghcGFyc2VkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNvdXJjZU1hcFVSTCBjb3VsZCBub3QgYmUgcGFyc2VkXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnNlZC5wYXRoKSB7XHJcbiAgICAgIC8vIFN0cmlwIHRoZSBsYXN0IHBhdGggY29tcG9uZW50LCBidXQga2VlcCB0aGUgXCIvXCIuXHJcbiAgICAgIHZhciBpbmRleCA9IHBhcnNlZC5wYXRoLmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICBwYXJzZWQucGF0aCA9IHBhcnNlZC5wYXRoLnN1YnN0cmluZygwLCBpbmRleCArIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzb3VyY2VVUkwgPSBqb2luKHVybEdlbmVyYXRlKHBhcnNlZCksIHNvdXJjZVVSTCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplKHNvdXJjZVVSTCk7XHJcbn1cclxuZXhwb3J0cy5jb21wdXRlU291cmNlVVJMID0gY29tcHV0ZVNvdXJjZVVSTDtcclxuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxudmFyIFNvdXJjZU1hcEdlbmVyYXRvciA9IHJlcXVpcmUoXCIuLi9saWIvc291cmNlLW1hcC1nZW5lcmF0b3JcIilcclxuICAuU291cmNlTWFwR2VuZXJhdG9yO1xyXG52YXIgU291cmNlTWFwQ29uc3VtZXIgPSByZXF1aXJlKFwiLi4vbGliL3NvdXJjZS1tYXAtY29uc3VtZXJcIikuU291cmNlTWFwQ29uc3VtZXI7XHJcbnZhciBTb3VyY2VOb2RlID0gcmVxdWlyZShcIi4uL2xpYi9zb3VyY2Utbm9kZVwiKS5Tb3VyY2VOb2RlO1xyXG5cclxuZnVuY3Rpb24gZm9yRWFjaE5ld2xpbmUoZm4pIHtcclxuICByZXR1cm4gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgICBbXCJcXG5cIiwgXCJcXHJcXG5cIl0uZm9yRWFjaChmbi5iaW5kKG51bGwsIGFzc2VydCkpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC5hZGQoKVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBub2RlID0gbmV3IFNvdXJjZU5vZGUobnVsbCwgbnVsbCwgbnVsbCk7XHJcblxyXG4gIC8vIEFkZGluZyBhIHN0cmluZyB3b3Jrcy5cclxuICBub2RlLmFkZChcImZ1bmN0aW9uIG5vb3AoKSB7fVwiKTtcclxuXHJcbiAgLy8gQWRkaW5nIGFub3RoZXIgc291cmNlIG5vZGUgd29ya3MuXHJcbiAgbm9kZS5hZGQobmV3IFNvdXJjZU5vZGUobnVsbCwgbnVsbCwgbnVsbCkpO1xyXG5cclxuICAvLyBBZGRpbmcgYW4gYXJyYXkgd29ya3MuXHJcbiAgbm9kZS5hZGQoW1xyXG4gICAgXCJmdW5jdGlvbiBmb28oKSB7XCIsXHJcbiAgICBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBcInJldHVybiAxMDtcIiksXHJcbiAgICBcIn1cIlxyXG4gIF0pO1xyXG5cclxuICAvLyBBZGRpbmcgb3RoZXIgc3R1ZmYgZG9lc24ndC5cclxuICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uKCkge1xyXG4gICAgbm9kZS5hZGQoe30pO1xyXG4gIH0pO1xyXG4gIGFzc2VydC50aHJvd3MoZnVuY3Rpb24oKSB7XHJcbiAgICBub2RlLmFkZChmdW5jdGlvbigpIHt9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC5wcmVwZW5kKClcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbm9kZSA9IG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwpO1xyXG5cclxuICAvLyBQcmVwZW5kaW5nIGEgc3RyaW5nIHdvcmtzLlxyXG4gIG5vZGUucHJlcGVuZChcImZ1bmN0aW9uIG5vb3AoKSB7fVwiKTtcclxuICBhc3NlcnQuZXF1YWwobm9kZS5jaGlsZHJlblswXSwgXCJmdW5jdGlvbiBub29wKCkge31cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG5vZGUuY2hpbGRyZW4ubGVuZ3RoLCAxKTtcclxuXHJcbiAgLy8gUHJlcGVuZGluZyBhbm90aGVyIHNvdXJjZSBub2RlIHdvcmtzLlxyXG4gIG5vZGUucHJlcGVuZChuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsKSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG5vZGUuY2hpbGRyZW5bMF0sIFwiXCIpO1xyXG4gIGFzc2VydC5lcXVhbChub2RlLmNoaWxkcmVuWzFdLCBcImZ1bmN0aW9uIG5vb3AoKSB7fVwiKTtcclxuICBhc3NlcnQuZXF1YWwobm9kZS5jaGlsZHJlbi5sZW5ndGgsIDIpO1xyXG5cclxuICAvLyBQcmVwZW5kaW5nIGFuIGFycmF5IHdvcmtzLlxyXG4gIG5vZGUucHJlcGVuZChbXHJcbiAgICBcImZ1bmN0aW9uIGZvbygpIHtcIixcclxuICAgIG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwsIFwicmV0dXJuIDEwO1wiKSxcclxuICAgIFwifVwiXHJcbiAgXSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG5vZGUuY2hpbGRyZW5bMF0sIFwiZnVuY3Rpb24gZm9vKCkge1wiKTtcclxuICBhc3NlcnQuZXF1YWwobm9kZS5jaGlsZHJlblsxXSwgXCJyZXR1cm4gMTA7XCIpO1xyXG4gIGFzc2VydC5lcXVhbChub2RlLmNoaWxkcmVuWzJdLCBcIn1cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG5vZGUuY2hpbGRyZW5bM10sIFwiXCIpO1xyXG4gIGFzc2VydC5lcXVhbChub2RlLmNoaWxkcmVuWzRdLCBcImZ1bmN0aW9uIG5vb3AoKSB7fVwiKTtcclxuICBhc3NlcnQuZXF1YWwobm9kZS5jaGlsZHJlbi5sZW5ndGgsIDUpO1xyXG5cclxuICAvLyBQcmVwZW5kaW5nIG90aGVyIHN0dWZmIGRvZXNuJ3QuXHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcclxuICAgIG5vZGUucHJlcGVuZCh7fSk7XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbigpIHtcclxuICAgIG5vZGUucHJlcGVuZChmdW5jdGlvbigpIHt9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC50b1N0cmluZygpXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbmV3IFNvdXJjZU5vZGUobnVsbCwgbnVsbCwgbnVsbCwgW1xyXG4gICAgICBcImZ1bmN0aW9uIGZvbygpIHtcIixcclxuICAgICAgbmV3IFNvdXJjZU5vZGUobnVsbCwgbnVsbCwgbnVsbCwgXCJyZXR1cm4gMTA7XCIpLFxyXG4gICAgICBcIn1cIlxyXG4gICAgXSkudG9TdHJpbmcoKSxcclxuICAgIFwiZnVuY3Rpb24gZm9vKCkge3JldHVybiAxMDt9XCJcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgLmpvaW4oKVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwsIFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIl0pXHJcbiAgICAgIC5qb2luKFwiLCBcIilcclxuICAgICAgLnRvU3RyaW5nKCksXHJcbiAgICBcImEsIGIsIGMsIGRcIlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCAud2FsaygpXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG5vZGUgPSBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBbXHJcbiAgICBcIihmdW5jdGlvbiAoKSB7XFxuXCIsXHJcbiAgICBcIiAgXCIsXHJcbiAgICBuZXcgU291cmNlTm9kZSgxLCAwLCBcImEuanNcIiwgW1wic29tZUNhbGwoKVwiXSksXHJcbiAgICBcIjtcXG5cIixcclxuICAgIFwiICBcIixcclxuICAgIG5ldyBTb3VyY2VOb2RlKDIsIDAsIFwiYi5qc1wiLCBbXCJpZiAoZm9vKSBiYXIoKVwiXSksXHJcbiAgICBcIjtcXG5cIixcclxuICAgIFwifSgpKTtcIlxyXG4gIF0pO1xyXG4gIHZhciBleHBlY3RlZCA9IFtcclxuICAgIHsgc3RyOiBcIihmdW5jdGlvbiAoKSB7XFxuXCIsIHNvdXJjZTogbnVsbCwgbGluZTogbnVsbCwgY29sdW1uOiBudWxsIH0sXHJcbiAgICB7IHN0cjogXCIgIFwiLCBzb3VyY2U6IG51bGwsIGxpbmU6IG51bGwsIGNvbHVtbjogbnVsbCB9LFxyXG4gICAgeyBzdHI6IFwic29tZUNhbGwoKVwiLCBzb3VyY2U6IFwiYS5qc1wiLCBsaW5lOiAxLCBjb2x1bW46IDAgfSxcclxuICAgIHsgc3RyOiBcIjtcXG5cIiwgc291cmNlOiBudWxsLCBsaW5lOiBudWxsLCBjb2x1bW46IG51bGwgfSxcclxuICAgIHsgc3RyOiBcIiAgXCIsIHNvdXJjZTogbnVsbCwgbGluZTogbnVsbCwgY29sdW1uOiBudWxsIH0sXHJcbiAgICB7IHN0cjogXCJpZiAoZm9vKSBiYXIoKVwiLCBzb3VyY2U6IFwiYi5qc1wiLCBsaW5lOiAyLCBjb2x1bW46IDAgfSxcclxuICAgIHsgc3RyOiBcIjtcXG5cIiwgc291cmNlOiBudWxsLCBsaW5lOiBudWxsLCBjb2x1bW46IG51bGwgfSxcclxuICAgIHsgc3RyOiBcIn0oKSk7XCIsIHNvdXJjZTogbnVsbCwgbGluZTogbnVsbCwgY29sdW1uOiBudWxsIH1cclxuICBdO1xyXG4gIHZhciBpID0gMDtcclxuICBub2RlLndhbGsoZnVuY3Rpb24oY2h1bmssIGxvYykge1xyXG4gICAgYXNzZXJ0LmVxdWFsKGV4cGVjdGVkW2ldLnN0ciwgY2h1bmspO1xyXG4gICAgYXNzZXJ0LmVxdWFsKGV4cGVjdGVkW2ldLnNvdXJjZSwgbG9jLnNvdXJjZSk7XHJcbiAgICBhc3NlcnQuZXF1YWwoZXhwZWN0ZWRbaV0ubGluZSwgbG9jLmxpbmUpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKGV4cGVjdGVkW2ldLmNvbHVtbiwgbG9jLmNvbHVtbik7XHJcbiAgICBpKys7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCAucmVwbGFjZVJpZ2h0XCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIG5vZGU7XHJcblxyXG4gIC8vIE5vdCBuZXN0ZWRcclxuICBub2RlID0gbmV3IFNvdXJjZU5vZGUobnVsbCwgbnVsbCwgbnVsbCwgXCJoZWxsbyB3b3JsZFwiKTtcclxuICBub2RlLnJlcGxhY2VSaWdodCgvd29ybGQvLCBcInVuaXZlcnNlXCIpO1xyXG4gIGFzc2VydC5lcXVhbChub2RlLnRvU3RyaW5nKCksIFwiaGVsbG8gdW5pdmVyc2VcIik7XHJcblxyXG4gIC8vIE5lc3RlZFxyXG4gIG5vZGUgPSBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBbXHJcbiAgICBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBcImhleSBzZXh5IG1hbWEsIFwiKSxcclxuICAgIG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwsIFwid2FudCB0byBraWxsIGFsbCBodW1hbnM/XCIpXHJcbiAgXSk7XHJcbiAgbm9kZS5yZXBsYWNlUmlnaHQoL2tpbGwgYWxsIGh1bWFucy8sIFwid2F0Y2ggRnV0dXJhbWFcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG5vZGUudG9TdHJpbmcoKSwgXCJoZXkgc2V4eSBtYW1hLCB3YW50IHRvIHdhdGNoIEZ1dHVyYW1hP1wiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC50b1N0cmluZ1dpdGhTb3VyY2VNYXAoKVwiXSA9IGZvckVhY2hOZXdsaW5lKGZ1bmN0aW9uKGFzc2VydCwgbmwpIHtcclxuICB2YXIgbm9kZSA9IG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwsIFtcclxuICAgIFwiKGZ1bmN0aW9uICgpIHtcIiArIG5sLFxyXG4gICAgXCIgIFwiLFxyXG4gICAgbmV3IFNvdXJjZU5vZGUoMSwgMCwgXCJhLmpzXCIsIFwic29tZUNhbGxcIiwgXCJvcmlnaW5hbENhbGxcIiksXHJcbiAgICBuZXcgU291cmNlTm9kZSgxLCA4LCBcImEuanNcIiwgXCIoKVwiKSxcclxuICAgIFwiO1wiICsgbmwsXHJcbiAgICBcIiAgXCIsXHJcbiAgICBuZXcgU291cmNlTm9kZSgyLCAwLCBcImIuanNcIiwgW1wiaWYgKGZvbykgYmFyKClcIl0pLFxyXG4gICAgXCI7XCIgKyBubCxcclxuICAgIFwifSgpKTtcIlxyXG4gIF0pO1xyXG4gIHZhciByZXN1bHQgPSBub2RlLnRvU3RyaW5nV2l0aFNvdXJjZU1hcCh7XHJcbiAgICBmaWxlOiBcImZvby5qc1wiXHJcbiAgfSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIHJlc3VsdC5jb2RlLFxyXG4gICAgW1wiKGZ1bmN0aW9uICgpIHtcIiwgXCIgIHNvbWVDYWxsKCk7XCIsIFwiICBpZiAoZm9vKSBiYXIoKTtcIiwgXCJ9KCkpO1wiXS5qb2luKG5sKVxyXG4gICk7XHJcblxyXG4gIHZhciBtYXAgPSByZXN1bHQubWFwO1xyXG4gIHZhciBtYXBXaXRob3V0T3B0aW9ucyA9IG5vZGUudG9TdHJpbmdXaXRoU291cmNlTWFwKCkubWFwO1xyXG5cclxuICBhc3NlcnQub2soXHJcbiAgICBtYXAgaW5zdGFuY2VvZiBTb3VyY2VNYXBHZW5lcmF0b3IsXHJcbiAgICBcIm1hcCBpbnN0YW5jZW9mIFNvdXJjZU1hcEdlbmVyYXRvclwiXHJcbiAgKTtcclxuICBhc3NlcnQub2soXHJcbiAgICBtYXBXaXRob3V0T3B0aW9ucyBpbnN0YW5jZW9mIFNvdXJjZU1hcEdlbmVyYXRvcixcclxuICAgIFwibWFwV2l0aG91dE9wdGlvbnMgaW5zdGFuY2VvZiBTb3VyY2VNYXBHZW5lcmF0b3JcIlxyXG4gICk7XHJcbiAgYXNzZXJ0Lm9rKCEoXCJmaWxlXCIgaW4gbWFwV2l0aG91dE9wdGlvbnMpKTtcclxuICBtYXBXaXRob3V0T3B0aW9ucy5fZmlsZSA9IFwiZm9vLmpzXCI7XHJcbiAgdXRpbC5hc3NlcnRFcXVhbE1hcHMoYXNzZXJ0LCBtYXAudG9KU09OKCksIG1hcFdpdGhvdXRPcHRpb25zLnRvSlNPTigpKTtcclxuXHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgdmFyIGFjdHVhbDtcclxuXHJcbiAgYWN0dWFsID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMSxcclxuICAgIGNvbHVtbjogNFxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWwuc291cmNlLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsLmxpbmUsIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWwuY29sdW1uLCBudWxsKTtcclxuXHJcbiAgYWN0dWFsID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMixcclxuICAgIGNvbHVtbjogMlxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWwuc291cmNlLCBcImEuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5saW5lLCAxKTtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsLmNvbHVtbiwgMCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5uYW1lLCBcIm9yaWdpbmFsQ2FsbFwiKTtcclxuXHJcbiAgYWN0dWFsID0gbWFwLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xyXG4gICAgbGluZTogMyxcclxuICAgIGNvbHVtbjogMlxyXG4gIH0pO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWwuc291cmNlLCBcImIuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5saW5lLCAyKTtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsLmNvbHVtbiwgMCk7XHJcblxyXG4gIGFjdHVhbCA9IG1hcC5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgIGxpbmU6IDMsXHJcbiAgICBjb2x1bW46IDE2XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5zb3VyY2UsIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWwubGluZSwgbnVsbCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5jb2x1bW4sIG51bGwpO1xyXG5cclxuICBhY3R1YWwgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICBsaW5lOiA0LFxyXG4gICAgY29sdW1uOiAyXHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5zb3VyY2UsIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChhY3R1YWwubGluZSwgbnVsbCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGFjdHVhbC5jb2x1bW4sIG51bGwpO1xyXG59KTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC5mcm9tU3RyaW5nV2l0aFNvdXJjZU1hcCgpXCJdID0gZm9yRWFjaE5ld2xpbmUoZnVuY3Rpb24oXHJcbiAgYXNzZXJ0LFxyXG4gIG5sXHJcbikge1xyXG4gIHZhciB0ZXN0Q29kZSA9IHV0aWwudGVzdEdlbmVyYXRlZENvZGUucmVwbGFjZSgvXFxuL2csIG5sKTtcclxuICB2YXIgbm9kZSA9IFNvdXJjZU5vZGUuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAoXHJcbiAgICB0ZXN0Q29kZSxcclxuICAgIG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLnRlc3RNYXApXHJcbiAgKTtcclxuXHJcbiAgdmFyIHJlc3VsdCA9IG5vZGUudG9TdHJpbmdXaXRoU291cmNlTWFwKHtcclxuICAgIGZpbGU6IFwibWluLmpzXCJcclxuICB9KTtcclxuICB2YXIgbWFwID0gcmVzdWx0Lm1hcDtcclxuICB2YXIgY29kZSA9IHJlc3VsdC5jb2RlO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoY29kZSwgdGVzdENvZGUpO1xyXG4gIGFzc2VydC5vayhcclxuICAgIG1hcCBpbnN0YW5jZW9mIFNvdXJjZU1hcEdlbmVyYXRvcixcclxuICAgIFwibWFwIGluc3RhbmNlb2YgU291cmNlTWFwR2VuZXJhdG9yXCJcclxuICApO1xyXG4gIG1hcCA9IG1hcC50b0pTT04oKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLnZlcnNpb24sIHV0aWwudGVzdE1hcC52ZXJzaW9uKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLmZpbGUsIHV0aWwudGVzdE1hcC5maWxlKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLm1hcHBpbmdzLCB1dGlsLnRlc3RNYXAubWFwcGluZ3MpO1xyXG59KTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC5mcm9tU3RyaW5nV2l0aFNvdXJjZU1hcCgpIGVtcHR5IG1hcFwiXSA9IGZvckVhY2hOZXdsaW5lKGZ1bmN0aW9uKFxyXG4gIGFzc2VydCxcclxuICBubFxyXG4pIHtcclxuICB2YXIgbm9kZSA9IFNvdXJjZU5vZGUuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAoXHJcbiAgICB1dGlsLnRlc3RHZW5lcmF0ZWRDb2RlLnJlcGxhY2UoL1xcbi9nLCBubCksXHJcbiAgICBuZXcgU291cmNlTWFwQ29uc3VtZXIodXRpbC5lbXB0eU1hcClcclxuICApO1xyXG4gIHZhciByZXN1bHQgPSBub2RlLnRvU3RyaW5nV2l0aFNvdXJjZU1hcCh7XHJcbiAgICBmaWxlOiBcIm1pbi5qc1wiXHJcbiAgfSk7XHJcbiAgdmFyIG1hcCA9IHJlc3VsdC5tYXA7XHJcbiAgdmFyIGNvZGUgPSByZXN1bHQuY29kZTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGNvZGUsIHV0aWwudGVzdEdlbmVyYXRlZENvZGUucmVwbGFjZSgvXFxuL2csIG5sKSk7XHJcbiAgYXNzZXJ0Lm9rKFxyXG4gICAgbWFwIGluc3RhbmNlb2YgU291cmNlTWFwR2VuZXJhdG9yLFxyXG4gICAgXCJtYXAgaW5zdGFuY2VvZiBTb3VyY2VNYXBHZW5lcmF0b3JcIlxyXG4gICk7XHJcbiAgbWFwID0gbWFwLnRvSlNPTigpO1xyXG4gIGFzc2VydC5lcXVhbChtYXAudmVyc2lvbiwgdXRpbC5lbXB0eU1hcC52ZXJzaW9uKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLmZpbGUsIHV0aWwuZW1wdHlNYXAuZmlsZSk7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5tYXBwaW5ncy5sZW5ndGgsIHV0aWwuZW1wdHlNYXAubWFwcGluZ3MubGVuZ3RoKTtcclxuICBhc3NlcnQuZXF1YWwobWFwLm1hcHBpbmdzLCB1dGlsLmVtcHR5TWFwLm1hcHBpbmdzKTtcclxufSk7XHJcblxyXG5leHBvcnRzW1widGVzdCAuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAoKSBjb21wbGV4IHZlcnNpb25cIl0gPSBmb3JFYWNoTmV3bGluZShcclxuICBmdW5jdGlvbihhc3NlcnQsIG5sKSB7XHJcbiAgICB2YXIgaW5wdXQgPSBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBbXHJcbiAgICAgIFwiKGZ1bmN0aW9uKCkge1wiICsgbmwsXHJcbiAgICAgIFwiICB2YXIgVGVzdCA9IHt9O1wiICsgbmwsXHJcbiAgICAgIFwiICBcIixcclxuICAgICAgbmV3IFNvdXJjZU5vZGUoMSwgMCwgXCJhLmpzXCIsIFwiVGVzdC5BID0geyB2YWx1ZTogMTIzNCB9O1wiICsgbmwpLFxyXG4gICAgICBcIiAgXCIsXHJcbiAgICAgIG5ldyBTb3VyY2VOb2RlKDIsIDAsIFwiYS5qc1wiLCBcIlRlc3QuQS54ID0gJ3h5eic7XCIpLFxyXG4gICAgICBubCxcclxuICAgICAgXCJ9KCkpO1wiICsgbmwsXHJcbiAgICAgIFwiLyogR2VuZXJhdGVkIFNvdXJjZSAqL1wiXHJcbiAgICBdKTtcclxuICAgIGlucHV0ID0gaW5wdXQudG9TdHJpbmdXaXRoU291cmNlTWFwKHtcclxuICAgICAgZmlsZTogXCJmb28uanNcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIG5vZGUgPSBTb3VyY2VOb2RlLmZyb21TdHJpbmdXaXRoU291cmNlTWFwKFxyXG4gICAgICBpbnB1dC5jb2RlLFxyXG4gICAgICBuZXcgU291cmNlTWFwQ29uc3VtZXIoaW5wdXQubWFwLnRvU3RyaW5nKCkpXHJcbiAgICApO1xyXG5cclxuICAgIHZhciByZXN1bHQgPSBub2RlLnRvU3RyaW5nV2l0aFNvdXJjZU1hcCh7XHJcbiAgICAgIGZpbGU6IFwiZm9vLmpzXCJcclxuICAgIH0pO1xyXG4gICAgdmFyIG1hcCA9IHJlc3VsdC5tYXA7XHJcbiAgICB2YXIgY29kZSA9IHJlc3VsdC5jb2RlO1xyXG5cclxuICAgIGFzc2VydC5lcXVhbChjb2RlLCBpbnB1dC5jb2RlKTtcclxuICAgIGFzc2VydC5vayhcclxuICAgICAgbWFwIGluc3RhbmNlb2YgU291cmNlTWFwR2VuZXJhdG9yLFxyXG4gICAgICBcIm1hcCBpbnN0YW5jZW9mIFNvdXJjZU1hcEdlbmVyYXRvclwiXHJcbiAgICApO1xyXG4gICAgbWFwID0gbWFwLnRvSlNPTigpO1xyXG4gICAgdmFyIGlucHV0TWFwID0gaW5wdXQubWFwLnRvSlNPTigpO1xyXG4gICAgdXRpbC5hc3NlcnRFcXVhbE1hcHMoYXNzZXJ0LCBtYXAsIGlucHV0TWFwKTtcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnRzW1widGVzdCAuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAoKSB0aGlyZCBhcmd1bWVudFwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIC8vIEFzc3VtZSB0aGUgZm9sbG93aW5nIGRpcmVjdG9yeSBzdHJ1Y3R1cmU6XHJcbiAgLy9cclxuICAvLyBodHRwOi8vZm9vLm9yZy9cclxuICAvLyAgIGFwcC9cclxuICAvLyAgICAgY29mZmVlL1xyXG4gIC8vICAgICAgIGZvby5jb2ZmZWVcclxuICAvLyAgICAgICBjb2ZmZWVCdW5kbGUuanMgIyBNYWRlIGZyb20ge2ZvbyxiYXIsYmF6fS5jb2ZmZWVcclxuICAvLyAgICAgICBtYXBzL1xyXG4gIC8vICAgICAgICAgY29mZmVlQnVuZGxlLmpzLm1hcFxyXG4gIC8vICAgICBqcy9cclxuICAvLyAgICAgICBmb28uanNcclxuICAvLyAgICAgcHVibGljL1xyXG4gIC8vICAgICAgIGFwcC5qcyAjIE1hZGUgZnJvbSB7Zm9vLGNvZmZlZUJ1bmRsZX0uanNcclxuICAvLyAgICAgICBhcHAuanMubWFwXHJcblxyXG4gIHZhciBjb2ZmZWVCdW5kbGUgPSBuZXcgU291cmNlTm9kZSgxLCAwLCBcImZvby5jb2ZmZWVcIiwgXCJmb28oY29mZmVlKTtcXG5cIik7XHJcbiAgY29mZmVlQnVuZGxlLnNldFNvdXJjZUNvbnRlbnQoXCJmb28uY29mZmVlXCIsIFwiZm9vIGNvZmZlZVwiKTtcclxuICBjb2ZmZWVCdW5kbGUgPSBjb2ZmZWVCdW5kbGUudG9TdHJpbmdXaXRoU291cmNlTWFwKHtcclxuICAgIGZpbGU6IFwiZm9vLmpzXCIsXHJcbiAgICBzb3VyY2VSb290OiBcIi4uXCJcclxuICB9KTtcclxuXHJcbiAgdmFyIGZvbyA9IG5ldyBTb3VyY2VOb2RlKDEsIDAsIFwiZm9vLmpzXCIsIFwiZm9vKGpzKTtcIik7XHJcblxyXG4gIHZhciB0ZXN0ID0gZnVuY3Rpb24ocmVsYXRpdmVQYXRoLCBleHBlY3RlZFNvdXJjZXMpIHtcclxuICAgIHZhciBhcHAgPSBuZXcgU291cmNlTm9kZSgpO1xyXG4gICAgYXBwLmFkZChcclxuICAgICAgU291cmNlTm9kZS5mcm9tU3RyaW5nV2l0aFNvdXJjZU1hcChcclxuICAgICAgICBjb2ZmZWVCdW5kbGUuY29kZSxcclxuICAgICAgICBuZXcgU291cmNlTWFwQ29uc3VtZXIoY29mZmVlQnVuZGxlLm1hcC50b1N0cmluZygpKSxcclxuICAgICAgICByZWxhdGl2ZVBhdGhcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIGFwcC5hZGQoZm9vKTtcclxuICAgIHZhciBpID0gMDtcclxuICAgIGFwcC53YWxrKGZ1bmN0aW9uKGNodW5rLCBsb2MpIHtcclxuICAgICAgYXNzZXJ0LmVxdWFsKGxvYy5zb3VyY2UsIGV4cGVjdGVkU291cmNlc1tpXSk7XHJcbiAgICAgIGkrKztcclxuICAgIH0pO1xyXG4gICAgYXBwLndhbGtTb3VyY2VDb250ZW50cyhmdW5jdGlvbihzb3VyY2VGaWxlLCBzb3VyY2VDb250ZW50KSB7XHJcbiAgICAgIGFzc2VydC5lcXVhbChzb3VyY2VGaWxlLCBleHBlY3RlZFNvdXJjZXNbMF0pO1xyXG4gICAgICBhc3NlcnQuZXF1YWwoc291cmNlQ29udGVudCwgXCJmb28gY29mZmVlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdGVzdChcIi4uL2NvZmZlZS9tYXBzXCIsIFtcIi4uL2NvZmZlZS9mb28uY29mZmVlXCIsIFwiZm9vLmpzXCJdKTtcclxuXHJcbiAgLy8gSWYgdGhlIHRoaXJkIHBhcmFtZXRlciBpcyBvbWl0dGVkIG9yIHNldCB0byB0aGUgY3VycmVudCB3b3JraW5nXHJcbiAgLy8gZGlyZWN0b3J5IHdlIGdldCBpbmNvcnJlY3Qgc291cmNlIHBhdGhzOlxyXG5cclxuICB0ZXN0KHVuZGVmaW5lZCwgW1wiLi4vZm9vLmNvZmZlZVwiLCBcImZvby5qc1wiXSk7XHJcblxyXG4gIHRlc3QoXCJcIiwgW1wiLi4vZm9vLmNvZmZlZVwiLCBcImZvby5qc1wiXSk7XHJcblxyXG4gIHRlc3QoXCIuXCIsIFtcIi4uL2Zvby5jb2ZmZWVcIiwgXCJmb28uanNcIl0pO1xyXG5cclxuICB0ZXN0KFwiLi9cIiwgW1wiLi4vZm9vLmNvZmZlZVwiLCBcImZvby5qc1wiXSk7XHJcbn07XHJcblxyXG5leHBvcnRzW1xyXG4gIFwidGVzdCAudG9TdHJpbmdXaXRoU291cmNlTWFwKCkgbWVyZ2luZyBkdXBsaWNhdGUgbWFwcGluZ3NcIlxyXG5dID0gZm9yRWFjaE5ld2xpbmUoZnVuY3Rpb24oYXNzZXJ0LCBubCkge1xyXG4gIHZhciBpbnB1dCA9IG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwsIFtcclxuICAgIG5ldyBTb3VyY2VOb2RlKDEsIDAsIFwiYS5qc1wiLCBcIihmdW5jdGlvblwiKSxcclxuICAgIG5ldyBTb3VyY2VOb2RlKDEsIDAsIFwiYS5qc1wiLCBcIigpIHtcIiArIG5sKSxcclxuICAgIFwiICBcIixcclxuICAgIG5ldyBTb3VyY2VOb2RlKDEsIDAsIFwiYS5qc1wiLCBcInZhciBUZXN0ID0gXCIpLFxyXG4gICAgbmV3IFNvdXJjZU5vZGUoMSwgMCwgXCJiLmpzXCIsIFwie307XCIgKyBubCksXHJcbiAgICBuZXcgU291cmNlTm9kZSgyLCAwLCBcImIuanNcIiwgXCJUZXN0XCIpLFxyXG4gICAgbmV3IFNvdXJjZU5vZGUoMiwgMCwgXCJiLmpzXCIsIFwiLkFcIiwgXCJBXCIpLFxyXG4gICAgbmV3IFNvdXJjZU5vZGUoMiwgMjAsIFwiYi5qc1wiLCBcIiA9IHsgdmFsdWU6IFwiLCBcIkFcIiksXHJcbiAgICBcIjEyMzRcIixcclxuICAgIG5ldyBTb3VyY2VOb2RlKDIsIDQwLCBcImIuanNcIiwgXCIgfTtcIiArIG5sLCBcIkFcIiksXHJcbiAgICBcIn0oKSk7XCIgKyBubCxcclxuICAgIFwiLyogR2VuZXJhdGVkIFNvdXJjZSAqL1wiXHJcbiAgXSk7XHJcbiAgaW5wdXQgPSBpbnB1dC50b1N0cmluZ1dpdGhTb3VyY2VNYXAoe1xyXG4gICAgZmlsZTogXCJmb28uanNcIlxyXG4gIH0pO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBpbnB1dC5jb2RlLFxyXG4gICAgW1xyXG4gICAgICBcIihmdW5jdGlvbigpIHtcIixcclxuICAgICAgXCIgIHZhciBUZXN0ID0ge307XCIsXHJcbiAgICAgIFwiVGVzdC5BID0geyB2YWx1ZTogMTIzNCB9O1wiLFxyXG4gICAgICBcIn0oKSk7XCIsXHJcbiAgICAgIFwiLyogR2VuZXJhdGVkIFNvdXJjZSAqL1wiXHJcbiAgICBdLmpvaW4obmwpXHJcbiAgKTtcclxuXHJcbiAgdmFyIGNvcnJlY3RNYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcclxuICAgIGZpbGU6IFwiZm9vLmpzXCJcclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDEsIGNvbHVtbjogMCB9LFxyXG4gICAgc291cmNlOiBcImEuanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMCB9XHJcbiAgfSk7XHJcbiAgLy8gSGVyZSBpcyBubyBuZWVkIGZvciBhIGVtcHR5IG1hcHBpbmcsXHJcbiAgLy8gYmVjYXVzZSBtYXBwaW5ncyBlbmRzIGF0IGVvbFxyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMiwgY29sdW1uOiAyIH0sXHJcbiAgICBzb3VyY2U6IFwiYS5qc1wiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAwIH1cclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMTMgfSxcclxuICAgIHNvdXJjZTogXCJiLmpzXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDAgfVxyXG4gIH0pO1xyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMywgY29sdW1uOiAwIH0sXHJcbiAgICBzb3VyY2U6IFwiYi5qc1wiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAwIH1cclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogNCB9LFxyXG4gICAgc291cmNlOiBcImIuanNcIixcclxuICAgIG5hbWU6IFwiQVwiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAwIH1cclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogNiB9LFxyXG4gICAgc291cmNlOiBcImIuanNcIixcclxuICAgIG5hbWU6IFwiQVwiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAyMCB9XHJcbiAgfSk7XHJcbiAgLy8gVGhpcyBlbXB0eSBtYXBwaW5nIGlzIHJlcXVpcmVkLFxyXG4gIC8vIGJlY2F1c2UgdGhlcmUgaXMgYSBob2xlIGluIHRoZSBtaWRkbGUgb2YgdGhlIGxpbmVcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDMsIGNvbHVtbjogMTggfVxyXG4gIH0pO1xyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMywgY29sdW1uOiAyMiB9LFxyXG4gICAgc291cmNlOiBcImIuanNcIixcclxuICAgIG5hbWU6IFwiQVwiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiA0MCB9XHJcbiAgfSk7XHJcbiAgLy8gSGVyZSBpcyBubyBuZWVkIGZvciBhIGVtcHR5IG1hcHBpbmcsXHJcbiAgLy8gYmVjYXVzZSBtYXBwaW5ncyBlbmRzIGF0IGVvbFxyXG5cclxuICB2YXIgaW5wdXRNYXAgPSBpbnB1dC5tYXAudG9KU09OKCk7XHJcbiAgY29ycmVjdE1hcCA9IGNvcnJlY3RNYXAudG9KU09OKCk7XHJcbiAgdXRpbC5hc3NlcnRFcXVhbE1hcHMoYXNzZXJ0LCBpbnB1dE1hcCwgY29ycmVjdE1hcCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0c1tcclxuICBcInRlc3QgLnRvU3RyaW5nV2l0aFNvdXJjZU1hcCgpIG11bHRpLWxpbmUgU291cmNlTm9kZXNcIlxyXG5dID0gZm9yRWFjaE5ld2xpbmUoZnVuY3Rpb24oYXNzZXJ0LCBubCkge1xyXG4gIHZhciBpbnB1dCA9IG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwsIFtcclxuICAgIG5ldyBTb3VyY2VOb2RlKFxyXG4gICAgICAxLFxyXG4gICAgICAwLFxyXG4gICAgICBcImEuanNcIixcclxuICAgICAgXCIoZnVuY3Rpb24oKSB7XCIgKyBubCArIFwidmFyIG5leHRMaW5lID0gMTtcIiArIG5sICsgXCJhbm90aGVyTGluZSgpO1wiICsgbmxcclxuICAgICksXHJcbiAgICBuZXcgU291cmNlTm9kZSgyLCAyLCBcImIuanNcIiwgXCJUZXN0LmNhbGwodGhpcywgMTIzKTtcIiArIG5sKSxcclxuICAgIG5ldyBTb3VyY2VOb2RlKDIsIDIsIFwiYi5qc1wiLCBcInRoaXNbJ3N0dWZmJ10gPSAndic7XCIgKyBubCksXHJcbiAgICBuZXcgU291cmNlTm9kZSgyLCAyLCBcImIuanNcIiwgXCJhbm90aGVyTGluZSgpO1wiICsgbmwpLFxyXG4gICAgXCIvKlwiICsgbmwgKyBcIkdlbmVyYXRlZFwiICsgbmwgKyBcIlNvdXJjZVwiICsgbmwgKyBcIiovXCIgKyBubCxcclxuICAgIG5ldyBTb3VyY2VOb2RlKDMsIDQsIFwiYy5qc1wiLCBcImFub3RoZXJMaW5lKCk7XCIgKyBubCksXHJcbiAgICBcIi8qXCIgKyBubCArIFwiR2VuZXJhdGVkXCIgKyBubCArIFwiU291cmNlXCIgKyBubCArIFwiKi9cIlxyXG4gIF0pO1xyXG4gIGlucHV0ID0gaW5wdXQudG9TdHJpbmdXaXRoU291cmNlTWFwKHtcclxuICAgIGZpbGU6IFwiZm9vLmpzXCJcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgaW5wdXQuY29kZSxcclxuICAgIFtcclxuICAgICAgXCIoZnVuY3Rpb24oKSB7XCIsXHJcbiAgICAgIFwidmFyIG5leHRMaW5lID0gMTtcIixcclxuICAgICAgXCJhbm90aGVyTGluZSgpO1wiLFxyXG4gICAgICBcIlRlc3QuY2FsbCh0aGlzLCAxMjMpO1wiLFxyXG4gICAgICBcInRoaXNbJ3N0dWZmJ10gPSAndic7XCIsXHJcbiAgICAgIFwiYW5vdGhlckxpbmUoKTtcIixcclxuICAgICAgXCIvKlwiLFxyXG4gICAgICBcIkdlbmVyYXRlZFwiLFxyXG4gICAgICBcIlNvdXJjZVwiLFxyXG4gICAgICBcIiovXCIsXHJcbiAgICAgIFwiYW5vdGhlckxpbmUoKTtcIixcclxuICAgICAgXCIvKlwiLFxyXG4gICAgICBcIkdlbmVyYXRlZFwiLFxyXG4gICAgICBcIlNvdXJjZVwiLFxyXG4gICAgICBcIiovXCJcclxuICAgIF0uam9pbihubClcclxuICApO1xyXG5cclxuICB2YXIgY29ycmVjdE1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogXCJmb28uanNcIlxyXG4gIH0pO1xyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMSwgY29sdW1uOiAwIH0sXHJcbiAgICBzb3VyY2U6IFwiYS5qc1wiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAwIH1cclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDIsIGNvbHVtbjogMCB9LFxyXG4gICAgc291cmNlOiBcImEuanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMCB9XHJcbiAgfSk7XHJcbiAgY29ycmVjdE1hcC5hZGRNYXBwaW5nKHtcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiAzLCBjb2x1bW46IDAgfSxcclxuICAgIHNvdXJjZTogXCJhLmpzXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAxLCBjb2x1bW46IDAgfVxyXG4gIH0pO1xyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogNCwgY29sdW1uOiAwIH0sXHJcbiAgICBzb3VyY2U6IFwiYi5qc1wiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMiwgY29sdW1uOiAyIH1cclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDUsIGNvbHVtbjogMCB9LFxyXG4gICAgc291cmNlOiBcImIuanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDIsIGNvbHVtbjogMiB9XHJcbiAgfSk7XHJcbiAgY29ycmVjdE1hcC5hZGRNYXBwaW5nKHtcclxuICAgIGdlbmVyYXRlZDogeyBsaW5lOiA2LCBjb2x1bW46IDAgfSxcclxuICAgIHNvdXJjZTogXCJiLmpzXCIsXHJcbiAgICBvcmlnaW5hbDogeyBsaW5lOiAyLCBjb2x1bW46IDIgfVxyXG4gIH0pO1xyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMTEsIGNvbHVtbjogMCB9LFxyXG4gICAgc291cmNlOiBcImMuanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDMsIGNvbHVtbjogNCB9XHJcbiAgfSk7XHJcblxyXG4gIHZhciBpbnB1dE1hcCA9IGlucHV0Lm1hcC50b0pTT04oKTtcclxuICBjb3JyZWN0TWFwID0gY29ycmVjdE1hcC50b0pTT04oKTtcclxuICB1dGlsLmFzc2VydEVxdWFsTWFwcyhhc3NlcnQsIGlucHV0TWFwLCBjb3JyZWN0TWFwKTtcclxufSk7XHJcblxyXG5leHBvcnRzW1widGVzdCAudG9TdHJpbmdXaXRoU291cmNlTWFwKCkgd2l0aCBlbXB0eSBzdHJpbmdcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbm9kZSA9IG5ldyBTb3VyY2VOb2RlKDEsIDAsIFwiZW1wdHkuanNcIiwgXCJcIik7XHJcbiAgdmFyIHJlc3VsdCA9IG5vZGUudG9TdHJpbmdXaXRoU291cmNlTWFwKCk7XHJcbiAgYXNzZXJ0LmVxdWFsKHJlc3VsdC5jb2RlLCBcIlwiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXHJcbiAgXCJ0ZXN0IC50b1N0cmluZ1dpdGhTb3VyY2VNYXAoKSB3aXRoIGNvbnNlY3V0aXZlIG5ld2xpbmVzXCJcclxuXSA9IGZvckVhY2hOZXdsaW5lKGZ1bmN0aW9uKGFzc2VydCwgbmwpIHtcclxuICB2YXIgaW5wdXQgPSBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBbXHJcbiAgICBcIi8qKiovXCIgKyBubCArIG5sLFxyXG4gICAgbmV3IFNvdXJjZU5vZGUoMSwgMCwgXCJhLmpzXCIsIFwiJ3VzZSBzdHJpY3QnO1wiICsgbmwpLFxyXG4gICAgbmV3IFNvdXJjZU5vZGUoMiwgMCwgXCJhLmpzXCIsIFwiYSgpO1wiKVxyXG4gIF0pO1xyXG4gIGlucHV0ID0gaW5wdXQudG9TdHJpbmdXaXRoU291cmNlTWFwKHtcclxuICAgIGZpbGU6IFwiZm9vLmpzXCJcclxuICB9KTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGlucHV0LmNvZGUsIFtcIi8qKiovXCIsIFwiXCIsIFwiJ3VzZSBzdHJpY3QnO1wiLCBcImEoKTtcIl0uam9pbihubCkpO1xyXG5cclxuICB2YXIgY29ycmVjdE1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe1xyXG4gICAgZmlsZTogXCJmb28uanNcIlxyXG4gIH0pO1xyXG4gIGNvcnJlY3RNYXAuYWRkTWFwcGluZyh7XHJcbiAgICBnZW5lcmF0ZWQ6IHsgbGluZTogMywgY29sdW1uOiAwIH0sXHJcbiAgICBzb3VyY2U6IFwiYS5qc1wiLFxyXG4gICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAwIH1cclxuICB9KTtcclxuICBjb3JyZWN0TWFwLmFkZE1hcHBpbmcoe1xyXG4gICAgZ2VuZXJhdGVkOiB7IGxpbmU6IDQsIGNvbHVtbjogMCB9LFxyXG4gICAgc291cmNlOiBcImEuanNcIixcclxuICAgIG9yaWdpbmFsOiB7IGxpbmU6IDIsIGNvbHVtbjogMCB9XHJcbiAgfSk7XHJcblxyXG4gIHZhciBpbnB1dE1hcCA9IGlucHV0Lm1hcC50b0pTT04oKTtcclxuICBjb3JyZWN0TWFwID0gY29ycmVjdE1hcC50b0pTT04oKTtcclxuICB1dGlsLmFzc2VydEVxdWFsTWFwcyhhc3NlcnQsIGlucHV0TWFwLCBjb3JyZWN0TWFwKTtcclxufSk7XHJcblxyXG5leHBvcnRzW1widGVzdCBzZXRTb3VyY2VDb250ZW50IHdpdGggdG9TdHJpbmdXaXRoU291cmNlTWFwXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIGFOb2RlID0gbmV3IFNvdXJjZU5vZGUoMSwgMSwgXCJhLmpzXCIsIFwiYVwiKTtcclxuICBhTm9kZS5zZXRTb3VyY2VDb250ZW50KFwiYS5qc1wiLCBcInNvbWVDb250ZW50XCIpO1xyXG4gIHZhciBub2RlID0gbmV3IFNvdXJjZU5vZGUobnVsbCwgbnVsbCwgbnVsbCwgW1xyXG4gICAgXCIoZnVuY3Rpb24gKCkge1xcblwiLFxyXG4gICAgXCIgIFwiLFxyXG4gICAgYU5vZGUsXHJcbiAgICBcIiAgXCIsXHJcbiAgICBuZXcgU291cmNlTm9kZSgxLCAxLCBcImIuanNcIiwgXCJiXCIpLFxyXG4gICAgXCJ9KCkpO1wiXHJcbiAgXSk7XHJcbiAgbm9kZS5zZXRTb3VyY2VDb250ZW50KFwiYi5qc1wiLCBcIm90aGVyQ29udGVudFwiKTtcclxuICB2YXIgbWFwID0gbm9kZS50b1N0cmluZ1dpdGhTb3VyY2VNYXAoe1xyXG4gICAgZmlsZTogXCJmb28uanNcIlxyXG4gIH0pLm1hcDtcclxuXHJcbiAgYXNzZXJ0Lm9rKFxyXG4gICAgbWFwIGluc3RhbmNlb2YgU291cmNlTWFwR2VuZXJhdG9yLFxyXG4gICAgXCJtYXAgaW5zdGFuY2VvZiBTb3VyY2VNYXBHZW5lcmF0b3JcIlxyXG4gICk7XHJcbiAgbWFwID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKG1hcC50b1N0cmluZygpKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VzLmxlbmd0aCwgMik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VzWzBdLCBcImEuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VzWzFdLCBcImIuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VzQ29udGVudC5sZW5ndGgsIDIpO1xyXG4gIGFzc2VydC5lcXVhbChtYXAuc291cmNlc0NvbnRlbnRbMF0sIFwic29tZUNvbnRlbnRcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKG1hcC5zb3VyY2VzQ29udGVudFsxXSwgXCJvdGhlckNvbnRlbnRcIik7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCB3YWxrU291cmNlQ29udGVudHNcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgYU5vZGUgPSBuZXcgU291cmNlTm9kZSgxLCAxLCBcImEuanNcIiwgXCJhXCIpO1xyXG4gIGFOb2RlLnNldFNvdXJjZUNvbnRlbnQoXCJhLmpzXCIsIFwic29tZUNvbnRlbnRcIik7XHJcbiAgdmFyIG5vZGUgPSBuZXcgU291cmNlTm9kZShudWxsLCBudWxsLCBudWxsLCBbXHJcbiAgICBcIihmdW5jdGlvbiAoKSB7XFxuXCIsXHJcbiAgICBcIiAgXCIsXHJcbiAgICBhTm9kZSxcclxuICAgIFwiICBcIixcclxuICAgIG5ldyBTb3VyY2VOb2RlKDEsIDEsIFwiYi5qc1wiLCBcImJcIiksXHJcbiAgICBcIn0oKSk7XCJcclxuICBdKTtcclxuICBub2RlLnNldFNvdXJjZUNvbnRlbnQoXCJiLmpzXCIsIFwib3RoZXJDb250ZW50XCIpO1xyXG4gIHZhciByZXN1bHRzID0gW107XHJcbiAgbm9kZS53YWxrU291cmNlQ29udGVudHMoZnVuY3Rpb24oc291cmNlRmlsZSwgc291cmNlQ29udGVudCkge1xyXG4gICAgcmVzdWx0cy5wdXNoKFtzb3VyY2VGaWxlLCBzb3VyY2VDb250ZW50XSk7XHJcbiAgfSk7XHJcbiAgYXNzZXJ0LmVxdWFsKHJlc3VsdHMubGVuZ3RoLCAyKTtcclxuICBhc3NlcnQuZXF1YWwocmVzdWx0c1swXVswXSwgXCJhLmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChyZXN1bHRzWzBdWzFdLCBcInNvbWVDb250ZW50XCIpO1xyXG4gIGFzc2VydC5lcXVhbChyZXN1bHRzWzFdWzBdLCBcImIuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHJlc3VsdHNbMV1bMV0sIFwib3RoZXJDb250ZW50XCIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgZnJvbSBpc3N1ZSAyNThcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgbm9kZSA9IG5ldyBTb3VyY2VOb2RlKCk7XHJcblxyXG4gIHZhciByZWFjdENvZGUgPVxyXG4gICAgXCI7cmVxdWlyZSgwKTtcXG4vLyMgc291cmNlTWFwcGluZ1VSTD0vaW5kZXguaW9zLm1hcD9wbGF0Zm9ybT1pb3MmZGV2PWZhbHNlJm1pbmlmeT10cnVlXCI7XHJcblxyXG4gIHZhciByZWFjdE1hcCA9XHJcbiAgICAne1widmVyc2lvblwiOjMsXCJmaWxlXCI6XCIvaW5kZXguaW9zLmJ1bmRsZT9wbGF0Zm9ybT1pb3MmZGV2PWZhbHNlJm1pbmlmeT10cnVlXCIsXCJzZWN0aW9uc1wiOlt7XCJvZmZzZXRcIjp7XCJsaW5lXCI6MCxcImNvbHVtblwiOjB9LFwibWFwXCI6e1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wicmVxdWlyZS0wLmpzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO1wiLFwiZmlsZVwiOlwicmVxdWlyZS0wLmpzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjtyZXF1aXJlKDApO1wiXX19XX0nO1xyXG5cclxuICBub2RlLmFkZChcclxuICAgIFNvdXJjZU5vZGUuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAoXHJcbiAgICAgIHJlYWN0Q29kZSxcclxuICAgICAgbmV3IFNvdXJjZU1hcENvbnN1bWVyKHJlYWN0TWFwKVxyXG4gICAgKVxyXG4gICk7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi9saWIvdXRpbFwiKTtcclxuXHJcbi8vIFRoaXMgaXMgYSB0ZXN0IG1hcHBpbmcgd2hpY2ggbWFwcyBmdW5jdGlvbnMgZnJvbSB0d28gZGlmZmVyZW50IGZpbGVzXHJcbi8vIChvbmUuanMgYW5kIHR3by5qcykgdG8gYSBtaW5pZmllZCBnZW5lcmF0ZWQgc291cmNlLlxyXG4vL1xyXG4vLyBIZXJlIGlzIG9uZS5qczpcclxuLy9cclxuLy8gICBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xyXG4vLyAgICAgcmV0dXJuIGJheihiYXIpO1xyXG4vLyAgIH07XHJcbi8vXHJcbi8vIEhlcmUgaXMgdHdvLmpzOlxyXG4vL1xyXG4vLyAgIFRXTy5pbmMgPSBmdW5jdGlvbiAobikge1xyXG4vLyAgICAgcmV0dXJuIG4gKyAxO1xyXG4vLyAgIH07XHJcbi8vXHJcbi8vIEFuZCBoZXJlIGlzIHRoZSBnZW5lcmF0ZWQgY29kZSAobWluLmpzKTpcclxuLy9cclxuLy8gICBPTkUuZm9vPWZ1bmN0aW9uKGEpe3JldHVybiBiYXooYSk7fTtcclxuLy8gICBUV08uaW5jPWZ1bmN0aW9uKGEpe3JldHVybiBhKzE7fTtcclxuZXhwb3J0cy50ZXN0R2VuZXJhdGVkQ29kZSA9XHJcbiAgXCIgT05FLmZvbz1mdW5jdGlvbihhKXtyZXR1cm4gYmF6KGEpO307XFxuXCIgK1xyXG4gIFwiIFRXTy5pbmM9ZnVuY3Rpb24oYSl7cmV0dXJuIGErMTt9O1wiO1xyXG5leHBvcnRzLnRlc3RNYXAgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIiwgXCJuXCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcInR3by5qc1wiXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOlxyXG4gICAgXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQVwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcE5vU291cmNlUm9vdCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiLCBcIm5cIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIG1hcHBpbmdzOlxyXG4gICAgXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRDtDQ0RiLElBQUksSUFBTSxTQUFVRSxHQUNsQixPQUFPQVwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcEVtcHR5U291cmNlUm9vdCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiLCBcIm5cIl0sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIHNvdXJjZVJvb3Q6IFwiXCIsXHJcbiAgbWFwcGluZ3M6XHJcbiAgICBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEO0NDRGIsSUFBSSxJQUFNLFNBQVVFLEdBQ2xCLE9BQU9BXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwU2luZ2xlU291cmNlID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiXSxcclxuICBzb3VyY2VSb290OiBcIlwiLFxyXG4gIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCJcclxufTtcclxuZXhwb3J0cy50ZXN0TWFwRW1wdHlNYXBwaW5ncyA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgbmFtZXM6IFtdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcInR3by5qc1wiXSxcclxuICBzb3VyY2VzQ29udGVudDogW1wiIE9ORS5mb28gPSAxO1wiLCBcIiBUV08uaW5jID0gMjtcIl0sXHJcbiAgc291cmNlUm9vdDogXCJcIixcclxuICBtYXBwaW5nczogXCJcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBFbXB0eU1hcHBpbmdzUmVsYXRpdmVTb3VyY2VzID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wiLi9vbmUuanNcIiwgXCIuL3R3by5qc1wiXSxcclxuICBzb3VyY2VzQ29udGVudDogW1wiIE9ORS5mb28gPSAxO1wiLCBcIiBUV08uaW5jID0gMjtcIl0sXHJcbiAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIixcclxuICBtYXBwaW5nczogXCJcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBFbXB0eU1hcHBpbmdzUmVsYXRpdmVTb3VyY2VzX2dlbmVyYXRlZEV4cGVjdGVkID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wib25lLmpzXCIsIFwidHdvLmpzXCJdLFxyXG4gIHNvdXJjZXNDb250ZW50OiBbXCIgT05FLmZvbyA9IDE7XCIsIFwiIFRXTy5pbmMgPSAyO1wiXSxcclxuICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiLFxyXG4gIG1hcHBpbmdzOiBcIlwiXHJcbn07XHJcbmV4cG9ydHMudGVzdE1hcE11bHRpU291cmNlc01hcHBpbmdSZWZlcnNTaW5nbGVTb3VyY2VPbmx5ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gIHNvdXJjZXM6IFtcIm9uZS5qc1wiLCBcIndpdGhvdXRNYXBwaW5ncy5qc1wiXSxcclxuICBzb3VyY2VSb290OiBcIlwiLFxyXG4gIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCJcclxufTtcclxuLy8gVGhpcyBtYXBwaW5nIGlzIGlkZW50aWNhbCB0byBhYm92ZSwgYnV0IHVzZXMgdGhlIGluZGV4ZWQgZm9ybWF0IGluc3RlYWQuXHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXAgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1wib25lLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcblwiICsgXCIgICByZXR1cm4gYmF6KGJhcik7XFxuXCIgKyBcIiB9O1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDEsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1widHdvLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcIm5cIl0sXHJcbiAgICAgICAgbWFwcGluZ3M6IFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0FcIixcclxuICAgICAgICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gICAgICAgIHNvdXJjZVJvb3Q6IFwiL3RoZS9yb290XCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuZXhwb3J0cy5pbmRleGVkVGVzdE1hcERpZmZlcmVudFNvdXJjZVJvb3RzID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBzZWN0aW9uczogW1xyXG4gICAge1xyXG4gICAgICBvZmZzZXQ6IHtcclxuICAgICAgICBsaW5lOiAwLFxyXG4gICAgICAgIGNvbHVtbjogMFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcIm9uZS5qc1wiXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgXCIgT05FLmZvbyA9IGZ1bmN0aW9uIChiYXIpIHtcXG5cIiArIFwiICAgcmV0dXJuIGJheihiYXIpO1xcblwiICsgXCIgfTtcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFtZXM6IFtcImJhclwiLCBcImJhelwiXSxcclxuICAgICAgICBtYXBwaW5nczogXCJDQUFDLElBQUksSUFBTSxTQUFVQSxHQUNsQixPQUFPQyxJQUFJRFwiLFxyXG4gICAgICAgIGZpbGU6IFwibWluLmpzXCIsXHJcbiAgICAgICAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBvZmZzZXQ6IHtcclxuICAgICAgICBsaW5lOiAxLFxyXG4gICAgICAgIGNvbHVtbjogMFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcInR3by5qc1wiXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuXCIgKyBcIiAgIHJldHVybiBuICsgMTtcXG5cIiArIFwiIH07XCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXCJuXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9BXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi9kaWZmZXJlbnQvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdXHJcbn07XHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXBDb2x1bW5PZmZzZXQgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgY29sdW1uOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcDoge1xyXG4gICAgICAgIHZlcnNpb246IDMsXHJcbiAgICAgICAgc291cmNlczogW1wib25lLmpzXCJdLFxyXG4gICAgICAgIHNvdXJjZXNDb250ZW50OiBbXHJcbiAgICAgICAgICBcIiBPTkUuZm9vID0gZnVuY3Rpb24gKGJhcikge1xcblwiICsgXCIgICByZXR1cm4gYmF6KGJhcik7XFxuXCIgKyBcIiB9O1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9DLElBQUlEXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDoge1xyXG4gICAgICAgIGxpbmU6IDAsXHJcbiAgICAgICAgLy8gUHJldmlvdXMgc2VjdGlvbidzIGxhc3QgZ2VuZXJhdGVkIG1hcHBpbmcgaXMgWzMyLCBJbmZpbml0eSksIHNvXHJcbiAgICAgICAgLy8gd2UncmUgcGxhY2luZyB0aGlzIGEgYml0IGFmdGVyIHRoYXQuXHJcbiAgICAgICAgY29sdW1uOiA1MFxyXG4gICAgICB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIHNvdXJjZXM6IFtcInR3by5qc1wiXSxcclxuICAgICAgICBzb3VyY2VzQ29udGVudDogW1xyXG4gICAgICAgICAgXCIgVFdPLmluYyA9IGZ1bmN0aW9uIChuKSB7XFxuXCIgKyBcIiAgIHJldHVybiBuICsgMTtcXG5cIiArIFwiIH07XCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hbWVzOiBbXCJuXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkNBQUMsSUFBSSxJQUFNLFNBQVVBLEdBQ2xCLE9BQU9BXCIsXHJcbiAgICAgICAgZmlsZTogXCJtaW4uanNcIixcclxuICAgICAgICBzb3VyY2VSb290OiBcIi90aGUvcm9vdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdXHJcbn07XHJcbmV4cG9ydHMuaW5kZXhlZFRlc3RNYXBXaXRoTWFwcGluZ3NBdFNlY3Rpb25TdGFydCA9IHtcclxuICB2ZXJzaW9uOiAzLFxyXG4gIHNlY3Rpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG9mZnNldDogeyBsaW5lOiAwLCBjb2x1bW46IDAgfSxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmVyc2lvbjogMyxcclxuICAgICAgICBuYW1lczogW1wiZmlyc3RcIiwgXCJzZWNvbmRcIl0sXHJcbiAgICAgICAgc291cmNlczogW1wiZm9vLmpzXCIsIFwiYmFyLmpzXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkFBQUFBLENDQ0NDXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgb2Zmc2V0OiB7IGxpbmU6IDAsIGNvbHVtbjogMiB9LFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2ZXJzaW9uOiAzLFxyXG4gICAgICAgIG5hbWVzOiBbXCJ0aGlyZFwiLCBcImZvdXJ0aFwiXSxcclxuICAgICAgICBzb3VyY2VzOiBbXCJiYXouanNcIiwgXCJxdXV4LmpzXCJdLFxyXG4gICAgICAgIG1hcHBpbmdzOiBcIkFBQUFBLENDQ0NDXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuZXhwb3J0cy50ZXN0TWFwV2l0aFNvdXJjZXNDb250ZW50ID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW1wiYmFyXCIsIFwiYmF6XCIsIFwiblwiXSxcclxuICBzb3VyY2VzOiBbXCJvbmUuanNcIiwgXCJ0d28uanNcIl0sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgIFwiIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuXCIgKyBcIiAgIHJldHVybiBiYXooYmFyKTtcXG5cIiArIFwiIH07XCIsXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIixcclxuICBtYXBwaW5nczpcclxuICAgIFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSUQ7Q0NEYixJQUFJLElBQU0sU0FBVUUsR0FDbEIsT0FBT0FcIlxyXG59O1xyXG5leHBvcnRzLnRlc3RNYXBSZWxhdGl2ZVNvdXJjZXMgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcIm1pbi5qc1wiLFxyXG4gIG5hbWVzOiBbXCJiYXJcIiwgXCJiYXpcIiwgXCJuXCJdLFxyXG4gIHNvdXJjZXM6IFtcIi4vb25lLmpzXCIsIFwiLi90d28uanNcIl0sXHJcbiAgc291cmNlc0NvbnRlbnQ6IFtcclxuICAgIFwiIE9ORS5mb28gPSBmdW5jdGlvbiAoYmFyKSB7XFxuXCIgKyBcIiAgIHJldHVybiBiYXooYmFyKTtcXG5cIiArIFwiIH07XCIsXHJcbiAgICBcIiBUV08uaW5jID0gZnVuY3Rpb24gKG4pIHtcXG5cIiArIFwiICAgcmV0dXJuIG4gKyAxO1xcblwiICsgXCIgfTtcIlxyXG4gIF0sXHJcbiAgc291cmNlUm9vdDogXCIvdGhlL3Jvb3RcIixcclxuICBtYXBwaW5nczpcclxuICAgIFwiQ0FBQyxJQUFJLElBQU0sU0FBVUEsR0FDbEIsT0FBT0MsSUFBSUQ7Q0NEYixJQUFJLElBQU0sU0FBVUUsR0FDbEIsT0FBT0FcIlxyXG59O1xyXG5leHBvcnRzLmVtcHR5TWFwID0ge1xyXG4gIHZlcnNpb246IDMsXHJcbiAgZmlsZTogXCJtaW4uanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW10sXHJcbiAgbWFwcGluZ3M6IFwiXCJcclxufTtcclxuZXhwb3J0cy5tYXBXaXRoU291cmNlbGVzc01hcHBpbmcgPSB7XHJcbiAgdmVyc2lvbjogMyxcclxuICBmaWxlOiBcImV4YW1wbGUuanNcIixcclxuICBuYW1lczogW10sXHJcbiAgc291cmNlczogW1wiZXhhbXBsZS5qc1wiXSxcclxuICBtYXBwaW5nczogXCJBQWdDQSxDXCJcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFzc2VydE1hcHBpbmcoXHJcbiAgZ2VuZXJhdGVkTGluZSxcclxuICBnZW5lcmF0ZWRDb2x1bW4sXHJcbiAgb3JpZ2luYWxTb3VyY2UsXHJcbiAgb3JpZ2luYWxMaW5lLFxyXG4gIG9yaWdpbmFsQ29sdW1uLFxyXG4gIG5hbWUsXHJcbiAgYmlhcyxcclxuICBtYXAsXHJcbiAgYXNzZXJ0LFxyXG4gIGRvbnRUZXN0R2VuZXJhdGVkLFxyXG4gIGRvbnRUZXN0T3JpZ2luYWxcclxuKSB7XHJcbiAgaWYgKCFkb250VGVzdE9yaWdpbmFsKSB7XHJcbiAgICB2YXIgb3JpZ01hcHBpbmcgPSBtYXAub3JpZ2luYWxQb3NpdGlvbkZvcih7XHJcbiAgICAgIGxpbmU6IGdlbmVyYXRlZExpbmUsXHJcbiAgICAgIGNvbHVtbjogZ2VuZXJhdGVkQ29sdW1uLFxyXG4gICAgICBiaWFzOiBiaWFzXHJcbiAgICB9KTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgb3JpZ01hcHBpbmcubmFtZSxcclxuICAgICAgbmFtZSxcclxuICAgICAgXCJJbmNvcnJlY3QgbmFtZSwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG5hbWUpICtcclxuICAgICAgICBcIiwgZ290IFwiICtcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShvcmlnTWFwcGluZy5uYW1lKVxyXG4gICAgKTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgb3JpZ01hcHBpbmcubGluZSxcclxuICAgICAgb3JpZ2luYWxMaW5lLFxyXG4gICAgICBcIkluY29ycmVjdCBsaW5lLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxMaW5lKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcubGluZSlcclxuICAgICk7XHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIG9yaWdNYXBwaW5nLmNvbHVtbixcclxuICAgICAgb3JpZ2luYWxDb2x1bW4sXHJcbiAgICAgIFwiSW5jb3JyZWN0IGNvbHVtbiwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsQ29sdW1uKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcuY29sdW1uKVxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgZXhwZWN0ZWRTb3VyY2U7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvcmlnaW5hbFNvdXJjZSAmJlxyXG4gICAgICBtYXAuc291cmNlUm9vdCAmJlxyXG4gICAgICBvcmlnaW5hbFNvdXJjZS5pbmRleE9mKG1hcC5zb3VyY2VSb290KSA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIGV4cGVjdGVkU291cmNlID0gb3JpZ2luYWxTb3VyY2U7XHJcbiAgICB9IGVsc2UgaWYgKG9yaWdpbmFsU291cmNlKSB7XHJcbiAgICAgIGV4cGVjdGVkU291cmNlID0gbWFwLnNvdXJjZVJvb3RcclxuICAgICAgICA/IHV0aWwuam9pbihtYXAuc291cmNlUm9vdCwgb3JpZ2luYWxTb3VyY2UpXHJcbiAgICAgICAgOiBvcmlnaW5hbFNvdXJjZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGV4cGVjdGVkU291cmNlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIG9yaWdNYXBwaW5nLnNvdXJjZSxcclxuICAgICAgZXhwZWN0ZWRTb3VyY2UsXHJcbiAgICAgIFwiSW5jb3JyZWN0IHNvdXJjZSwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkU291cmNlKSArXHJcbiAgICAgICAgXCIsIGdvdCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkob3JpZ01hcHBpbmcuc291cmNlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmICghZG9udFRlc3RHZW5lcmF0ZWQpIHtcclxuICAgIHZhciBnZW5NYXBwaW5nID0gbWFwLmdlbmVyYXRlZFBvc2l0aW9uRm9yKHtcclxuICAgICAgc291cmNlOiBvcmlnaW5hbFNvdXJjZSxcclxuICAgICAgbGluZTogb3JpZ2luYWxMaW5lLFxyXG4gICAgICBjb2x1bW46IG9yaWdpbmFsQ29sdW1uLFxyXG4gICAgICBiaWFzOiBiaWFzXHJcbiAgICB9KTtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgZ2VuTWFwcGluZy5saW5lLFxyXG4gICAgICBnZW5lcmF0ZWRMaW5lLFxyXG4gICAgICBcIkluY29ycmVjdCBsaW5lLCBleHBlY3RlZCBcIiArXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZ2VuZXJhdGVkTGluZSkgK1xyXG4gICAgICAgIFwiLCBnb3QgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdlbk1hcHBpbmcubGluZSlcclxuICAgICk7XHJcbiAgICBhc3NlcnQuZXF1YWwoXHJcbiAgICAgIGdlbk1hcHBpbmcuY29sdW1uLFxyXG4gICAgICBnZW5lcmF0ZWRDb2x1bW4sXHJcbiAgICAgIFwiSW5jb3JyZWN0IGNvbHVtbiwgZXhwZWN0ZWQgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdlbmVyYXRlZENvbHVtbikgK1xyXG4gICAgICAgIFwiLCBnb3QgXCIgK1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdlbk1hcHBpbmcuY29sdW1uKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuZXhwb3J0cy5hc3NlcnRNYXBwaW5nID0gYXNzZXJ0TWFwcGluZztcclxuXHJcbmZ1bmN0aW9uIGFzc2VydEVxdWFsTWFwcyhhc3NlcnQsIGFjdHVhbE1hcCwgZXhwZWN0ZWRNYXApIHtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsTWFwLnZlcnNpb24sIGV4cGVjdGVkTWFwLnZlcnNpb24sIFwidmVyc2lvbiBtaXNtYXRjaFwiKTtcclxuICBhc3NlcnQuZXF1YWwoYWN0dWFsTWFwLmZpbGUsIGV4cGVjdGVkTWFwLmZpbGUsIFwiZmlsZSBtaXNtYXRjaFwiKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBhY3R1YWxNYXAubmFtZXMubGVuZ3RoLFxyXG4gICAgZXhwZWN0ZWRNYXAubmFtZXMubGVuZ3RoLFxyXG4gICAgXCJuYW1lcyBsZW5ndGggbWlzbWF0Y2g6IFwiICtcclxuICAgICAgYWN0dWFsTWFwLm5hbWVzLmpvaW4oXCIsIFwiKSArXHJcbiAgICAgIFwiICE9IFwiICtcclxuICAgICAgZXhwZWN0ZWRNYXAubmFtZXMuam9pbihcIiwgXCIpXHJcbiAgKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbE1hcC5uYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBhY3R1YWxNYXAubmFtZXNbaV0sXHJcbiAgICAgIGV4cGVjdGVkTWFwLm5hbWVzW2ldLFxyXG4gICAgICBcIm5hbWVzW1wiICtcclxuICAgICAgICBpICtcclxuICAgICAgICBcIl0gbWlzbWF0Y2g6IFwiICtcclxuICAgICAgICBhY3R1YWxNYXAubmFtZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgICBcIiAhPSBcIiArXHJcbiAgICAgICAgZXhwZWN0ZWRNYXAubmFtZXMuam9pbihcIiwgXCIpXHJcbiAgICApO1xyXG4gIH1cclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBhY3R1YWxNYXAuc291cmNlcy5sZW5ndGgsXHJcbiAgICBleHBlY3RlZE1hcC5zb3VyY2VzLmxlbmd0aCxcclxuICAgIFwic291cmNlcyBsZW5ndGggbWlzbWF0Y2g6IFwiICtcclxuICAgICAgYWN0dWFsTWFwLnNvdXJjZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgXCIgIT0gXCIgK1xyXG4gICAgICBleHBlY3RlZE1hcC5zb3VyY2VzLmpvaW4oXCIsIFwiKVxyXG4gICk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3R1YWxNYXAuc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICBhY3R1YWxNYXAuc291cmNlc1tpXSxcclxuICAgICAgZXhwZWN0ZWRNYXAuc291cmNlc1tpXSxcclxuICAgICAgXCJzb3VyY2VzW1wiICtcclxuICAgICAgICBpICtcclxuICAgICAgICBcIl0gbGVuZ3RoIG1pc21hdGNoOiBcIiArXHJcbiAgICAgICAgYWN0dWFsTWFwLnNvdXJjZXMuam9pbihcIiwgXCIpICtcclxuICAgICAgICBcIiAhPSBcIiArXHJcbiAgICAgICAgZXhwZWN0ZWRNYXAuc291cmNlcy5qb2luKFwiLCBcIilcclxuICAgICk7XHJcbiAgfVxyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGFjdHVhbE1hcC5zb3VyY2VSb290LFxyXG4gICAgZXhwZWN0ZWRNYXAuc291cmNlUm9vdCxcclxuICAgIFwic291cmNlUm9vdCBtaXNtYXRjaDogXCIgK1xyXG4gICAgICBhY3R1YWxNYXAuc291cmNlUm9vdCArXHJcbiAgICAgIFwiICE9IFwiICtcclxuICAgICAgZXhwZWN0ZWRNYXAuc291cmNlUm9vdFxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgYWN0dWFsTWFwLm1hcHBpbmdzLFxyXG4gICAgZXhwZWN0ZWRNYXAubWFwcGluZ3MsXHJcbiAgICBcIm1hcHBpbmdzIG1pc21hdGNoOlxcbkFjdHVhbDogICBcIiArXHJcbiAgICAgIGFjdHVhbE1hcC5tYXBwaW5ncyArXHJcbiAgICAgIFwiXFxuRXhwZWN0ZWQ6IFwiICtcclxuICAgICAgZXhwZWN0ZWRNYXAubWFwcGluZ3NcclxuICApO1xyXG4gIGlmIChhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQpIHtcclxuICAgIGFzc2VydC5lcXVhbChcclxuICAgICAgYWN0dWFsTWFwLnNvdXJjZXNDb250ZW50Lmxlbmd0aCxcclxuICAgICAgZXhwZWN0ZWRNYXAuc291cmNlc0NvbnRlbnQubGVuZ3RoLFxyXG4gICAgICBcInNvdXJjZXNDb250ZW50IGxlbmd0aCBtaXNtYXRjaFwiXHJcbiAgICApO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3R1YWxNYXAuc291cmNlc0NvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgICAgIGFjdHVhbE1hcC5zb3VyY2VzQ29udGVudFtpXSxcclxuICAgICAgICBleHBlY3RlZE1hcC5zb3VyY2VzQ29udGVudFtpXSxcclxuICAgICAgICBcInNvdXJjZXNDb250ZW50W1wiICsgaSArIFwiXSBtaXNtYXRjaFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuYXNzZXJ0RXF1YWxNYXBzID0gYXNzZXJ0RXF1YWxNYXBzO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9