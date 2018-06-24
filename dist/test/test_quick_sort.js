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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test-quick-sort.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./test/test-quick-sort.js":
/*!*********************************!*\
  !*** ./test/test-quick-sort.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var quickSort = __webpack_require__(/*! ../lib/quick-sort */ "./lib/quick-sort.js").quickSort;

function numberCompare(a, b) {
  return a - b;
}

exports['test sorting sorted array'] = function (assert) {
  var ary = [0,1,2,3,4,5,6,7,8,9];

  var quickSorted = ary.slice();
  quickSort(quickSorted, numberCompare);

  assert.equal(JSON.stringify(ary),
               JSON.stringify(quickSorted));
};

exports['test sorting reverse-sorted array'] = function (assert) {
  var ary = [9,8,7,6,5,4,3,2,1,0];

  var quickSorted = ary.slice();
  quickSort(quickSorted, numberCompare);

  assert.equal(JSON.stringify(ary.sort(numberCompare)),
               JSON.stringify(quickSorted));
};

exports['test sorting unsorted array'] = function (assert) {
  var ary = [];
  for (var i = 0; i < 10; i++) {
    ary.push(Math.random());
  }

  var quickSorted = ary.slice();
  quickSort(quickSorted, numberCompare);

  assert.equal(JSON.stringify(ary.sort(numberCompare)),
               JSON.stringify(quickSorted));
};

exports['test sorting when Math.random has been mocked'] = function (assert) {
  // Our dataset needs to be big enough to cause a stack overflow in quickSort
  // if it invokes a mocked version of Math.random() that always returns zero.
  var ary = [];
  for (var i = 0; i < 10000; i++) {
    ary.push(i);
  }

  // mock out Math.random()
  var originalMathRandom = Math.random;
  var usedMockedMathRandom = false;
  Math.random = function() {
    usedMockedMathRandom = true;
    return 0;
  };

  var caught = null;
  try {
    quickSort(ary, numberCompare);
  } catch (e) {
    caught = e; // if we get here, it was probably a stack overflow
  }

  // clean up
  Math.random = originalMathRandom;

  assert.equal(usedMockedMathRandom, false);
  assert.equal(caught, null);
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvcXVpY2stc29ydC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LXF1aWNrLXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0SEEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsV0FBVztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdF9xdWlja19zb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0L3Rlc3QtcXVpY2stc29ydC5qc1wiKTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG4vLyBJdCB0dXJucyBvdXQgdGhhdCBzb21lIChtb3N0PykgSmF2YVNjcmlwdCBlbmdpbmVzIGRvbid0IHNlbGYtaG9zdFxyXG4vLyBgQXJyYXkucHJvdG90eXBlLnNvcnRgLiBUaGlzIG1ha2VzIHNlbnNlIGJlY2F1c2UgQysrIHdpbGwgbGlrZWx5IHJlbWFpblxyXG4vLyBmYXN0ZXIgdGhhbiBKUyB3aGVuIGRvaW5nIHJhdyBDUFUtaW50ZW5zaXZlIHNvcnRpbmcuIEhvd2V2ZXIsIHdoZW4gdXNpbmcgYVxyXG4vLyBjdXN0b20gY29tcGFyYXRvciBmdW5jdGlvbiwgY2FsbGluZyBiYWNrIGFuZCBmb3J0aCBiZXR3ZWVuIHRoZSBWTSdzIEMrKyBhbmRcclxuLy8gSklUJ2QgSlMgaXMgcmF0aGVyIHNsb3cgKmFuZCogbG9zZXMgSklUIHR5cGUgaW5mb3JtYXRpb24sIHJlc3VsdGluZyBpblxyXG4vLyB3b3JzZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24gdGhhbiB3b3VsZCBiZSBvcHRpbWFsLiBJblxyXG4vLyBmYWN0LCB3aGVuIHNvcnRpbmcgd2l0aCBhIGNvbXBhcmF0b3IsIHRoZXNlIGNvc3RzIG91dHdlaWdoIHRoZSBiZW5lZml0cyBvZlxyXG4vLyBzb3J0aW5nIGluIEMrKy4gQnkgdXNpbmcgb3VyIG93biBKUy1pbXBsZW1lbnRlZCBRdWljayBTb3J0IChiZWxvdyksIHdlIGdldFxyXG4vLyBhIH4zNTAwbXMgbWVhbiBzcGVlZC11cCBpbiBgYmVuY2gvYmVuY2guaHRtbGAuXHJcblxyXG4vLyBDYXB0dXJlIE1hdGgucmFuZG9tKCkgbm93LCB0byBhdm9pZCBwcm9ibGVtcyBpbiBjYXNlIGEgdGVzdCBtb2NrcyBpdCBsYXRlci5cclxuLy8gSWYgTWF0aC5yYW5kb20oKSBpcyBtb2NrZWQgdG8gcmV0dXJuIGEgY29uc3RhbnQgdmFsdWUsIHF1aWNrU29ydCBtYXkgYmVjb21lXHJcbi8vIE8obl4yKSB3aGVuIGludm9rZWQgb24gYWxyZWFkeS1zb3J0ZWQgZGF0YS5cclxudmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLyoqXHJcbiAqIFN3YXAgdGhlIGVsZW1lbnRzIGluZGV4ZWQgYnkgYHhgIGFuZCBgeWAgaW4gdGhlIGFycmF5IGBhcnlgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnlcclxuICogICAgICAgIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgc2Vjb25kIGl0ZW0uXHJcbiAqL1xyXG5mdW5jdGlvbiBzd2FwKGFyeSwgeCwgeSkge1xyXG4gIHZhciB0ZW1wID0gYXJ5W3hdO1xyXG4gIGFyeVt4XSA9IGFyeVt5XTtcclxuICBhcnlbeV0gPSB0ZW1wO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIHdpdGhpbiB0aGUgcmFuZ2UgYGxvdyAuLiBoaWdoYCBpbmNsdXNpdmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsb3dcclxuICogICAgICAgIFRoZSBsb3dlciBib3VuZCBvbiB0aGUgcmFuZ2UuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoaWdoXHJcbiAqICAgICAgICBUaGUgdXBwZXIgYm91bmQgb24gdGhlIHJhbmdlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmFuZG9tSW50SW5SYW5nZShsb3csIGhpZ2gpIHtcclxuICByZXR1cm4gTWF0aC5yb3VuZChsb3cgKyAocmFuZG9tKCkgKiAoaGlnaCAtIGxvdykpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBRdWljayBTb3J0IGFsZ29yaXRobS5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJ5XHJcbiAqICAgICAgICBBbiBhcnJheSB0byBzb3J0LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJhdG9yXHJcbiAqICAgICAgICBGdW5jdGlvbiB0byB1c2UgdG8gY29tcGFyZSB0d28gaXRlbXMuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwXHJcbiAqICAgICAgICBTdGFydCBpbmRleCBvZiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJcclxuICogICAgICAgIEVuZCBpbmRleCBvZiB0aGUgYXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcCwgcikge1xyXG4gIC8vIElmIG91ciBsb3dlciBib3VuZCBpcyBsZXNzIHRoYW4gb3VyIHVwcGVyIGJvdW5kLCB3ZSAoMSkgcGFydGl0aW9uIHRoZVxyXG4gIC8vIGFycmF5IGludG8gdHdvIHBpZWNlcyBhbmQgKDIpIHJlY3Vyc2Ugb24gZWFjaCBoYWxmLiBJZiBpdCBpcyBub3QsIHRoaXMgaXNcclxuICAvLyB0aGUgZW1wdHkgYXJyYXkgYW5kIG91ciBiYXNlIGNhc2UuXHJcblxyXG4gIGlmIChwIDwgcikge1xyXG4gICAgLy8gKDEpIFBhcnRpdGlvbmluZy5cclxuICAgIC8vXHJcbiAgICAvLyBUaGUgcGFydGl0aW9uaW5nIGNob29zZXMgYSBwaXZvdCBiZXR3ZWVuIGBwYCBhbmQgYHJgIGFuZCBtb3ZlcyBhbGxcclxuICAgIC8vIGVsZW1lbnRzIHRoYXQgYXJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgcGl2b3QgdG8gdGhlIGJlZm9yZSBpdCwgYW5kXHJcbiAgICAvLyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgYXJlIGdyZWF0ZXIgdGhhbiBpdCBhZnRlciBpdC4gVGhlIGVmZmVjdCBpcyB0aGF0XHJcbiAgICAvLyBvbmNlIHBhcnRpdGlvbiBpcyBkb25lLCB0aGUgcGl2b3QgaXMgaW4gdGhlIGV4YWN0IHBsYWNlIGl0IHdpbGwgYmUgd2hlblxyXG4gICAgLy8gdGhlIGFycmF5IGlzIHB1dCBpbiBzb3J0ZWQgb3JkZXIsIGFuZCBpdCB3aWxsIG5vdCBuZWVkIHRvIGJlIG1vdmVkXHJcbiAgICAvLyBhZ2Fpbi4gVGhpcyBydW5zIGluIE8obiBsb2cgbikgdGltZS5cclxuXHJcbiAgICAvLyBBbHdheXMgY2hvb3NlIGEgcmFuZG9tIHBpdm90IHNvIHRoYXQgYW4gaW5wdXQgYXJyYXkgd2hpY2ggaXMgcmV2ZXJzZVxyXG4gICAgLy8gc29ydGVkIGRvZXMgbm90IGNhdXNlIE8obl4yKSBydW5uaW5nIHRpbWUuXHJcbiAgICB2YXIgcGl2b3RJbmRleCA9IHJhbmRvbUludEluUmFuZ2UocCwgcik7XHJcbiAgICB2YXIgaSA9IHAgLSAxO1xyXG5cclxuICAgIHN3YXAoYXJ5LCBwaXZvdEluZGV4LCByKTtcclxuICAgIHZhciBwaXZvdCA9IGFyeVtyXTtcclxuXHJcbiAgICAvLyBJbW1lZGlhdGVseSBhZnRlciBgamAgaXMgaW5jcmVtZW50ZWQgaW4gdGhpcyBsb29wLCB0aGUgZm9sbG93aW5nIGhvbGRcclxuICAgIC8vIHRydWU6XHJcbiAgICAvL1xyXG4gICAgLy8gICAqIEV2ZXJ5IGVsZW1lbnQgaW4gYGFyeVtwIC4uIGldYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHBpdm90LlxyXG4gICAgLy9cclxuICAgIC8vICAgKiBFdmVyeSBlbGVtZW50IGluIGBhcnlbaSsxIC4uIGotMV1gIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGl2b3QuXHJcbiAgICBmb3IgKHZhciBqID0gcDsgaiA8IHI7IGorKykge1xyXG4gICAgICBpZiAoY29tcGFyYXRvcihhcnlbal0sIHBpdm90KSA8PSAwKSB7XHJcbiAgICAgICAgaSArPSAxO1xyXG4gICAgICAgIHN3YXAoYXJ5LCBpLCBqKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN3YXAoYXJ5LCBpICsgMSwgaik7XHJcbiAgICB2YXIgcSA9IGkgKyAxO1xyXG5cclxuICAgIC8vICgyKSBSZWN1cnNlIG9uIGVhY2ggaGFsZi5cclxuXHJcbiAgICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHAsIHEgLSAxKTtcclxuICAgIGRvUXVpY2tTb3J0KGFyeSwgY29tcGFyYXRvciwgcSArIDEsIHIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNvcnQgdGhlIGdpdmVuIGFycmF5IGluLXBsYWNlIHdpdGggdGhlIGdpdmVuIGNvbXBhcmF0b3IgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyeVxyXG4gKiAgICAgICAgQW4gYXJyYXkgdG8gc29ydC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29tcGFyYXRvclxyXG4gKiAgICAgICAgRnVuY3Rpb24gdG8gdXNlIHRvIGNvbXBhcmUgdHdvIGl0ZW1zLlxyXG4gKi9cclxuZXhwb3J0cy5xdWlja1NvcnQgPSBmdW5jdGlvbiAoYXJ5LCBjb21wYXJhdG9yKSB7XHJcbiAgZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCAwLCBhcnkubGVuZ3RoIC0gMSk7XHJcbn07XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgcXVpY2tTb3J0ID0gcmVxdWlyZSgnLi4vbGliL3F1aWNrLXNvcnQnKS5xdWlja1NvcnQ7XHJcblxyXG5mdW5jdGlvbiBudW1iZXJDb21wYXJlKGEsIGIpIHtcclxuICByZXR1cm4gYSAtIGI7XHJcbn1cclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgc29ydGluZyBzb3J0ZWQgYXJyYXknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgYXJ5ID0gWzAsMSwyLDMsNCw1LDYsNyw4LDldO1xyXG5cclxuICB2YXIgcXVpY2tTb3J0ZWQgPSBhcnkuc2xpY2UoKTtcclxuICBxdWlja1NvcnQocXVpY2tTb3J0ZWQsIG51bWJlckNvbXBhcmUpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoSlNPTi5zdHJpbmdpZnkoYXJ5KSxcclxuICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkocXVpY2tTb3J0ZWQpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgc29ydGluZyByZXZlcnNlLXNvcnRlZCBhcnJheSddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIHZhciBhcnkgPSBbOSw4LDcsNiw1LDQsMywyLDEsMF07XHJcblxyXG4gIHZhciBxdWlja1NvcnRlZCA9IGFyeS5zbGljZSgpO1xyXG4gIHF1aWNrU29ydChxdWlja1NvcnRlZCwgbnVtYmVyQ29tcGFyZSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChKU09OLnN0cmluZ2lmeShhcnkuc29ydChudW1iZXJDb21wYXJlKSksXHJcbiAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHF1aWNrU29ydGVkKSk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHNvcnRpbmcgdW5zb3J0ZWQgYXJyYXknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgYXJ5ID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBhcnkucHVzaChNYXRoLnJhbmRvbSgpKTtcclxuICB9XHJcblxyXG4gIHZhciBxdWlja1NvcnRlZCA9IGFyeS5zbGljZSgpO1xyXG4gIHF1aWNrU29ydChxdWlja1NvcnRlZCwgbnVtYmVyQ29tcGFyZSk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChKU09OLnN0cmluZ2lmeShhcnkuc29ydChudW1iZXJDb21wYXJlKSksXHJcbiAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHF1aWNrU29ydGVkKSk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IHNvcnRpbmcgd2hlbiBNYXRoLnJhbmRvbSBoYXMgYmVlbiBtb2NrZWQnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICAvLyBPdXIgZGF0YXNldCBuZWVkcyB0byBiZSBiaWcgZW5vdWdoIHRvIGNhdXNlIGEgc3RhY2sgb3ZlcmZsb3cgaW4gcXVpY2tTb3J0XHJcbiAgLy8gaWYgaXQgaW52b2tlcyBhIG1vY2tlZCB2ZXJzaW9uIG9mIE1hdGgucmFuZG9tKCkgdGhhdCBhbHdheXMgcmV0dXJucyB6ZXJvLlxyXG4gIHZhciBhcnkgPSBbXTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDAwOyBpKyspIHtcclxuICAgIGFyeS5wdXNoKGkpO1xyXG4gIH1cclxuXHJcbiAgLy8gbW9jayBvdXQgTWF0aC5yYW5kb20oKVxyXG4gIHZhciBvcmlnaW5hbE1hdGhSYW5kb20gPSBNYXRoLnJhbmRvbTtcclxuICB2YXIgdXNlZE1vY2tlZE1hdGhSYW5kb20gPSBmYWxzZTtcclxuICBNYXRoLnJhbmRvbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdXNlZE1vY2tlZE1hdGhSYW5kb20gPSB0cnVlO1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGNhdWdodCA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIHF1aWNrU29ydChhcnksIG51bWJlckNvbXBhcmUpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNhdWdodCA9IGU7IC8vIGlmIHdlIGdldCBoZXJlLCBpdCB3YXMgcHJvYmFibHkgYSBzdGFjayBvdmVyZmxvd1xyXG4gIH1cclxuXHJcbiAgLy8gY2xlYW4gdXBcclxuICBNYXRoLnJhbmRvbSA9IG9yaWdpbmFsTWF0aFJhbmRvbTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKHVzZWRNb2NrZWRNYXRoUmFuZG9tLCBmYWxzZSk7XHJcbiAgYXNzZXJ0LmVxdWFsKGNhdWdodCwgbnVsbCk7XHJcbn07XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9