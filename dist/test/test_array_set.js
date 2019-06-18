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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test-array-set.js");
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

/***/ "./test/test-array-set.js":
/*!********************************!*\
  !*** ./test/test-array-set.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var ArraySet = __webpack_require__(/*! ../lib/array-set */ "./lib/array-set.js").ArraySet;

function makeTestSet() {
  var set = new ArraySet();
  for (var i = 0; i < 100; i++) {
    set.add(String(i));
  }
  return set;
}

exports["test .has() membership"] = function(assert) {
  var set = makeTestSet();
  for (var i = 0; i < 100; i++) {
    assert.ok(set.has(String(i)));
  }
};

exports["test .indexOf() elements"] = function(assert) {
  var set = makeTestSet();
  for (var i = 0; i < 100; i++) {
    assert.strictEqual(set.indexOf(String(i)), i);
  }
};

exports["test .at() indexing"] = function(assert) {
  var set = makeTestSet();
  for (var i = 0; i < 100; i++) {
    assert.strictEqual(set.at(i), String(i));
  }
};

exports["test creating from an array"] = function(assert) {
  var set = ArraySet.fromArray(["foo", "bar", "baz", "quux", "hasOwnProperty"]);

  assert.ok(set.has("foo"));
  assert.ok(set.has("bar"));
  assert.ok(set.has("baz"));
  assert.ok(set.has("quux"));
  assert.ok(set.has("hasOwnProperty"));

  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.indexOf("bar"), 1);
  assert.strictEqual(set.indexOf("baz"), 2);
  assert.strictEqual(set.indexOf("quux"), 3);

  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.at(1), "bar");
  assert.strictEqual(set.at(2), "baz");
  assert.strictEqual(set.at(3), "quux");
};

exports["test that you can add __proto__; see github issue #30"] = function(
  assert
) {
  var set = new ArraySet();
  set.add("__proto__");
  assert.ok(set.has("__proto__"));
  assert.strictEqual(set.at(0), "__proto__");
  assert.strictEqual(set.indexOf("__proto__"), 0);
};

exports["test .fromArray() with duplicates"] = function(assert) {
  var set = ArraySet.fromArray(["foo", "foo"]);
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 1);

  set = ArraySet.fromArray(["foo", "foo"], true);
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.at(1), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 2);
};

exports["test .add() with duplicates"] = function(assert) {
  var set = new ArraySet();
  set.add("foo");

  set.add("foo");
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 1);

  set.add("foo", true);
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.at(1), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 2);
};

exports["test .size()"] = function(assert) {
  var set = new ArraySet();
  set.add("foo");
  set.add("bar");
  set.add("baz");
  assert.strictEqual(set.size(), 3);
};

exports["test .size() with disallowed duplicates"] = function(assert) {
  var set = new ArraySet();

  set.add("foo");
  set.add("foo");

  set.add("bar");
  set.add("bar");

  set.add("baz");
  set.add("baz");

  assert.strictEqual(set.size(), 3);
};

exports["test .size() with allowed duplicates"] = function(assert) {
  var set = new ArraySet();

  set.add("foo");
  set.add("foo", true);

  set.add("bar");
  set.add("bar", true);

  set.add("baz");
  set.add("baz", true);

  assert.strictEqual(set.size(), 3);
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvYXJyYXktc2V0LmpzIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LWFycmF5LXNldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw2QkFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDMUhBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JpQkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsbUJBQU8sQ0FBQyw0Q0FBa0I7O0FBRXpDO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJ0ZXN0X2FycmF5X3NldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC90ZXN0LWFycmF5LXNldC5qc1wiKTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG52YXIgaGFzTmF0aXZlTWFwID0gdHlwZW9mIE1hcCAhPT0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbi8qKlxyXG4gKiBBIGRhdGEgc3RydWN0dXJlIHdoaWNoIGlzIGEgY29tYmluYXRpb24gb2YgYW4gYXJyYXkgYW5kIGEgc2V0LiBBZGRpbmcgYSBuZXdcclxuICogbWVtYmVyIGlzIE8oMSksIHRlc3RpbmcgZm9yIG1lbWJlcnNoaXAgaXMgTygxKSwgYW5kIGZpbmRpbmcgdGhlIGluZGV4IG9mIGFuXHJcbiAqIGVsZW1lbnQgaXMgTygxKS4gUmVtb3ZpbmcgZWxlbWVudHMgZnJvbSB0aGUgc2V0IGlzIG5vdCBzdXBwb3J0ZWQuIE9ubHlcclxuICogc3RyaW5ncyBhcmUgc3VwcG9ydGVkIGZvciBtZW1iZXJzaGlwLlxyXG4gKi9cclxuZnVuY3Rpb24gQXJyYXlTZXQoKSB7XHJcbiAgdGhpcy5fYXJyYXkgPSBbXTtcclxuICB0aGlzLl9zZXQgPSBoYXNOYXRpdmVNYXAgPyBuZXcgTWFwKCkgOiBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG59XHJcblxyXG4vKipcclxuICogU3RhdGljIG1ldGhvZCBmb3IgY3JlYXRpbmcgQXJyYXlTZXQgaW5zdGFuY2VzIGZyb20gYW4gZXhpc3RpbmcgYXJyYXkuXHJcbiAqL1xyXG5BcnJheVNldC5mcm9tQXJyYXkgPSBmdW5jdGlvbiBBcnJheVNldF9mcm9tQXJyYXkoYUFycmF5LCBhQWxsb3dEdXBsaWNhdGVzKSB7XHJcbiAgdmFyIHNldCA9IG5ldyBBcnJheVNldCgpO1xyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhQXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHNldC5hZGQoYUFycmF5W2ldLCBhQWxsb3dEdXBsaWNhdGVzKTtcclxuICB9XHJcbiAgcmV0dXJuIHNldDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gaG93IG1hbnkgdW5pcXVlIGl0ZW1zIGFyZSBpbiB0aGlzIEFycmF5U2V0LiBJZiBkdXBsaWNhdGVzIGhhdmUgYmVlblxyXG4gKiBhZGRlZCwgdGhhbiB0aG9zZSBkbyBub3QgY291bnQgdG93YXJkcyB0aGUgc2l6ZS5cclxuICpcclxuICogQHJldHVybnMgTnVtYmVyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uIEFycmF5U2V0X3NpemUoKSB7XHJcbiAgcmV0dXJuIGhhc05hdGl2ZU1hcFxyXG4gICAgPyB0aGlzLl9zZXQuc2l6ZVxyXG4gICAgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLl9zZXQpLmxlbmd0aDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgdGhlIGdpdmVuIHN0cmluZyB0byB0aGlzIHNldC5cclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gQXJyYXlTZXRfYWRkKGFTdHIsIGFBbGxvd0R1cGxpY2F0ZXMpIHtcclxuICB2YXIgc1N0ciA9IGhhc05hdGl2ZU1hcCA/IGFTdHIgOiB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xyXG4gIHZhciBpc0R1cGxpY2F0ZSA9IGhhc05hdGl2ZU1hcCA/IHRoaXMuaGFzKGFTdHIpIDogaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKTtcclxuICB2YXIgaWR4ID0gdGhpcy5fYXJyYXkubGVuZ3RoO1xyXG4gIGlmICghaXNEdXBsaWNhdGUgfHwgYUFsbG93RHVwbGljYXRlcykge1xyXG4gICAgdGhpcy5fYXJyYXkucHVzaChhU3RyKTtcclxuICB9XHJcbiAgaWYgKCFpc0R1cGxpY2F0ZSkge1xyXG4gICAgaWYgKGhhc05hdGl2ZU1hcCkge1xyXG4gICAgICB0aGlzLl9zZXQuc2V0KGFTdHIsIGlkeCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zZXRbc1N0cl0gPSBpZHg7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIElzIHRoZSBnaXZlbiBzdHJpbmcgYSBtZW1iZXIgb2YgdGhpcyBzZXQ/XHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIEFycmF5U2V0X2hhcyhhU3RyKSB7XHJcbiAgaWYgKGhhc05hdGl2ZU1hcCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NldC5oYXMoYVN0cik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzU3RyID0gdXRpbC50b1NldFN0cmluZyhhU3RyKTtcclxuICAgIHJldHVybiBoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGF0IGlzIHRoZSBpbmRleCBvZiB0aGUgZ2l2ZW4gc3RyaW5nIGluIHRoZSBhcnJheT9cclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5BcnJheVNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIEFycmF5U2V0X2luZGV4T2YoYVN0cikge1xyXG4gIGlmIChoYXNOYXRpdmVNYXApIHtcclxuICAgIHZhciBpZHggPSB0aGlzLl9zZXQuZ2V0KGFTdHIpO1xyXG4gICAgaWYgKGlkeCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBpZHg7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzU3RyID0gdXRpbC50b1NldFN0cmluZyhhU3RyKTtcclxuICAgIGlmIChoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zZXRbc1N0cl07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFTdHIgKyAnXCIgaXMgbm90IGluIHRoZSBzZXQuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogV2hhdCBpcyB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXg/XHJcbiAqXHJcbiAqIEBwYXJhbSBOdW1iZXIgYUlkeFxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLmF0ID0gZnVuY3Rpb24gQXJyYXlTZXRfYXQoYUlkeCkge1xyXG4gIGlmIChhSWR4ID49IDAgJiYgYUlkeCA8IHRoaXMuX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2FJZHhdO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoXCJObyBlbGVtZW50IGluZGV4ZWQgYnkgXCIgKyBhSWR4KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHNldCAod2hpY2ggaGFzIHRoZSBwcm9wZXIgaW5kaWNlc1xyXG4gKiBpbmRpY2F0ZWQgYnkgaW5kZXhPZikuIE5vdGUgdGhhdCB0aGlzIGlzIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgYXJyYXkgdXNlZFxyXG4gKiBmb3Igc3RvcmluZyB0aGUgbWVtYmVycyBzbyB0aGF0IG5vIG9uZSBjYW4gbWVzcyB3aXRoIGludGVybmFsIHN0YXRlLlxyXG4gKi9cclxuQXJyYXlTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiBBcnJheVNldF90b0FycmF5KCkge1xyXG4gIHJldHVybiB0aGlzLl9hcnJheS5zbGljZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5BcnJheVNldCA9IEFycmF5U2V0O1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24gZm9yIGdldHRpbmcgdmFsdWVzIGZyb20gcGFyYW1ldGVyL29wdGlvbnNcclxuICogb2JqZWN0cy5cclxuICpcclxuICogQHBhcmFtIGFyZ3MgVGhlIG9iamVjdCB3ZSBhcmUgZXh0cmFjdGluZyB2YWx1ZXMgZnJvbVxyXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgd2UgYXJlIGdldHRpbmcuXHJcbiAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgQW4gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGlmIHRoZSBwcm9wZXJ0eSBpcyBtaXNzaW5nXHJcbiAqIGZyb20gdGhlIG9iamVjdC4gSWYgdGhpcyBpcyBub3Qgc3BlY2lmaWVkIGFuZCB0aGUgcHJvcGVydHkgaXMgbWlzc2luZywgYW5cclxuICogZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBcmcoYUFyZ3MsIGFOYW1lLCBhRGVmYXVsdFZhbHVlKSB7XHJcbiAgaWYgKGFOYW1lIGluIGFBcmdzKSB7XHJcbiAgICByZXR1cm4gYUFyZ3NbYU5hbWVdO1xyXG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgcmV0dXJuIGFEZWZhdWx0VmFsdWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignXCInICsgYU5hbWUgKyAnXCIgaXMgYSByZXF1aXJlZCBhcmd1bWVudC4nKTtcclxuICB9XHJcbn1cclxuZXhwb3J0cy5nZXRBcmcgPSBnZXRBcmc7XHJcblxyXG52YXIgdXJsUmVnZXhwID0gL14oPzooW1xcdytcXC0uXSspOik/XFwvXFwvKD86KFxcdys6XFx3KylAKT8oW1xcdy4tXSopKD86OihcXGQrKSk/KC4qKSQvO1xyXG52YXIgZGF0YVVybFJlZ2V4cCA9IC9eZGF0YTouK1xcLC4rJC87XHJcblxyXG5mdW5jdGlvbiB1cmxQYXJzZShhVXJsKSB7XHJcbiAgdmFyIG1hdGNoID0gYVVybC5tYXRjaCh1cmxSZWdleHApO1xyXG4gIGlmICghbWF0Y2gpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgc2NoZW1lOiBtYXRjaFsxXSxcclxuICAgIGF1dGg6IG1hdGNoWzJdLFxyXG4gICAgaG9zdDogbWF0Y2hbM10sXHJcbiAgICBwb3J0OiBtYXRjaFs0XSxcclxuICAgIHBhdGg6IG1hdGNoWzVdXHJcbiAgfTtcclxufVxyXG5leHBvcnRzLnVybFBhcnNlID0gdXJsUGFyc2U7XHJcblxyXG5mdW5jdGlvbiB1cmxHZW5lcmF0ZShhUGFyc2VkVXJsKSB7XHJcbiAgdmFyIHVybCA9IFwiXCI7XHJcbiAgaWYgKGFQYXJzZWRVcmwuc2NoZW1lKSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5zY2hlbWUgKyBcIjpcIjtcclxuICB9XHJcbiAgdXJsICs9IFwiLy9cIjtcclxuICBpZiAoYVBhcnNlZFVybC5hdXRoKSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5hdXRoICsgXCJAXCI7XHJcbiAgfVxyXG4gIGlmIChhUGFyc2VkVXJsLmhvc3QpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLmhvc3Q7XHJcbiAgfVxyXG4gIGlmIChhUGFyc2VkVXJsLnBvcnQpIHtcclxuICAgIHVybCArPSBcIjpcIiArIGFQYXJzZWRVcmwucG9ydDtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwucGF0aCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwucGF0aDtcclxuICB9XHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5leHBvcnRzLnVybEdlbmVyYXRlID0gdXJsR2VuZXJhdGU7XHJcblxyXG5jb25zdCBNQVhfQ0FDSEVEX0lOUFVUUyA9IDMyO1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIHNvbWUgZnVuY3Rpb24gYGYoaW5wdXQpIC0+IHJlc3VsdGAgYW5kIHJldHVybnMgYSBtZW1vaXplZCB2ZXJzaW9uIG9mXHJcbiAqIGBmYC5cclxuICpcclxuICogV2Uga2VlcCBhdCBtb3N0IGBNQVhfQ0FDSEVEX0lOUFVUU2AgbWVtb2l6ZWQgcmVzdWx0cyBvZiBgZmAgYWxpdmUuIFRoZVxyXG4gKiBtZW1vaXphdGlvbiBpcyBhIGR1bWItc2ltcGxlLCBsaW5lYXIgbGVhc3QtcmVjZW50bHktdXNlZCBjYWNoZS5cclxuICovXHJcbmZ1bmN0aW9uIGxydU1lbW9pemUoZikge1xyXG4gIGNvbnN0IGNhY2hlID0gW107XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWNoZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoY2FjaGVbaV0uaW5wdXQgPT09IGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBjYWNoZVswXTtcclxuICAgICAgICBjYWNoZVswXSA9IGNhY2hlW2ldO1xyXG4gICAgICAgIGNhY2hlW2ldID0gdGVtcDtcclxuICAgICAgICByZXR1cm4gY2FjaGVbMF0ucmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IGYoaW5wdXQpO1xyXG5cclxuICAgIGNhY2hlLnVuc2hpZnQoe1xyXG4gICAgICBpbnB1dCxcclxuICAgICAgcmVzdWx0XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2FjaGUubGVuZ3RoID4gTUFYX0NBQ0hFRF9JTlBVVFMpIHtcclxuICAgICAgY2FjaGUucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplcyBhIHBhdGgsIG9yIHRoZSBwYXRoIHBvcnRpb24gb2YgYSBVUkw6XHJcbiAqXHJcbiAqIC0gUmVwbGFjZXMgY29uc2VjdXRpdmUgc2xhc2hlcyB3aXRoIG9uZSBzbGFzaC5cclxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICcuJyBwYXJ0cy5cclxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICc8ZGlyPi8uLicgcGFydHMuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIGNvZGUgaW4gdGhlIE5vZGUuanMgJ3BhdGgnIGNvcmUgbW9kdWxlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgdXJsIHRvIG5vcm1hbGl6ZS5cclxuICovXHJcbnZhciBub3JtYWxpemUgPSBscnVNZW1vaXplKGZ1bmN0aW9uIG5vcm1hbGl6ZShhUGF0aCkge1xyXG4gIHZhciBwYXRoID0gYVBhdGg7XHJcbiAgdmFyIHVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICBpZiAodXJsKSB7XHJcbiAgICBpZiAoIXVybC5wYXRoKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuICAgIHBhdGggPSB1cmwucGF0aDtcclxuICB9XHJcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCk7XHJcblxyXG4gIC8vIFNwbGl0IHRoZSBwYXRoIGludG8gcGFydHMgYmV0d2VlbiBgL2AgY2hhcmFjdGVycy4gVGhpcyBpcyBtdWNoIGZhc3RlciB0aGFuXHJcbiAgLy8gdXNpbmcgYC5zcGxpdCgvXFwvKy9nKWAuXHJcbiAgdmFyIHBhcnRzID0gW107XHJcbiAgdmFyIHN0YXJ0ID0gMDtcclxuICB2YXIgaSA9IDA7XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHN0YXJ0ID0gaTtcclxuICAgIGkgPSBwYXRoLmluZGV4T2YoXCIvXCIsIHN0YXJ0KTtcclxuICAgIGlmIChpID09PSAtMSkge1xyXG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQpKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQsIGkpKTtcclxuICAgICAgd2hpbGUgKGkgPCBwYXRoLmxlbmd0aCAmJiBwYXRoW2ldID09PSBcIi9cIikge1xyXG4gICAgICAgIGkrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgcGFydCwgdXAgPSAwLCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHBhcnQgPSBwYXJ0c1tpXTtcclxuICAgIGlmIChwYXJ0ID09PSBcIi5cIikge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICB9IGVsc2UgaWYgKHBhcnQgPT09IFwiLi5cIikge1xyXG4gICAgICB1cCsrO1xyXG4gICAgfSBlbHNlIGlmICh1cCA+IDApIHtcclxuICAgICAgaWYgKHBhcnQgPT09IFwiXCIpIHtcclxuICAgICAgICAvLyBUaGUgZmlyc3QgcGFydCBpcyBibGFuayBpZiB0aGUgcGF0aCBpcyBhYnNvbHV0ZS4gVHJ5aW5nIHRvIGdvXHJcbiAgICAgICAgLy8gYWJvdmUgdGhlIHJvb3QgaXMgYSBuby1vcC4gVGhlcmVmb3JlIHdlIGNhbiByZW1vdmUgYWxsICcuLicgcGFydHNcclxuICAgICAgICAvLyBkaXJlY3RseSBhZnRlciB0aGUgcm9vdC5cclxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSArIDEsIHVwKTtcclxuICAgICAgICB1cCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFydHMuc3BsaWNlKGksIDIpO1xyXG4gICAgICAgIHVwLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcGF0aCA9IHBhcnRzLmpvaW4oXCIvXCIpO1xyXG5cclxuICBpZiAocGF0aCA9PT0gXCJcIikge1xyXG4gICAgcGF0aCA9IGlzQWJzb2x1dGUgPyBcIi9cIiA6IFwiLlwiO1xyXG4gIH1cclxuXHJcbiAgaWYgKHVybCkge1xyXG4gICAgdXJsLnBhdGggPSBwYXRoO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKHVybCk7XHJcbiAgfVxyXG4gIHJldHVybiBwYXRoO1xyXG59KTtcclxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XHJcblxyXG4vKipcclxuICogSm9pbnMgdHdvIHBhdGhzL1VSTHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhUm9vdCBUaGUgcm9vdCBwYXRoIG9yIFVSTC5cclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBqb2luZWQgd2l0aCB0aGUgcm9vdC5cclxuICpcclxuICogLSBJZiBhUGF0aCBpcyBhIFVSTCBvciBhIGRhdGEgVVJJLCBhUGF0aCBpcyByZXR1cm5lZCwgdW5sZXNzIGFQYXRoIGlzIGFcclxuICogICBzY2hlbWUtcmVsYXRpdmUgVVJMOiBUaGVuIHRoZSBzY2hlbWUgb2YgYVJvb3QsIGlmIGFueSwgaXMgcHJlcGVuZGVkXHJcbiAqICAgZmlyc3QuXHJcbiAqIC0gT3RoZXJ3aXNlIGFQYXRoIGlzIGEgcGF0aC4gSWYgYVJvb3QgaXMgYSBVUkwsIHRoZW4gaXRzIHBhdGggcG9ydGlvblxyXG4gKiAgIGlzIHVwZGF0ZWQgd2l0aCB0aGUgcmVzdWx0IGFuZCBhUm9vdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlIHRoZSByZXN1bHRcclxuICogICBpcyByZXR1cm5lZC5cclxuICogICAtIElmIGFQYXRoIGlzIGFic29sdXRlLCB0aGUgcmVzdWx0IGlzIGFQYXRoLlxyXG4gKiAgIC0gT3RoZXJ3aXNlIHRoZSB0d28gcGF0aHMgYXJlIGpvaW5lZCB3aXRoIGEgc2xhc2guXHJcbiAqIC0gSm9pbmluZyBmb3IgZXhhbXBsZSAnaHR0cDovLycgYW5kICd3d3cuZXhhbXBsZS5jb20nIGlzIGFsc28gc3VwcG9ydGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gam9pbihhUm9vdCwgYVBhdGgpIHtcclxuICBpZiAoYVJvb3QgPT09IFwiXCIpIHtcclxuICAgIGFSb290ID0gXCIuXCI7XHJcbiAgfVxyXG4gIGlmIChhUGF0aCA9PT0gXCJcIikge1xyXG4gICAgYVBhdGggPSBcIi5cIjtcclxuICB9XHJcbiAgdmFyIGFQYXRoVXJsID0gdXJsUGFyc2UoYVBhdGgpO1xyXG4gIHZhciBhUm9vdFVybCA9IHVybFBhcnNlKGFSb290KTtcclxuICBpZiAoYVJvb3RVcmwpIHtcclxuICAgIGFSb290ID0gYVJvb3RVcmwucGF0aCB8fCBcIi9cIjtcclxuICB9XHJcblxyXG4gIC8vIGBqb2luKGZvbywgJy8vd3d3LmV4YW1wbGUub3JnJylgXHJcbiAgaWYgKGFQYXRoVXJsICYmICFhUGF0aFVybC5zY2hlbWUpIHtcclxuICAgIGlmIChhUm9vdFVybCkge1xyXG4gICAgICBhUGF0aFVybC5zY2hlbWUgPSBhUm9vdFVybC5zY2hlbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVBhdGhVcmwpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFQYXRoVXJsIHx8IGFQYXRoLm1hdGNoKGRhdGFVcmxSZWdleHApKSB7XHJcbiAgICByZXR1cm4gYVBhdGg7XHJcbiAgfVxyXG5cclxuICAvLyBgam9pbignaHR0cDovLycsICd3d3cuZXhhbXBsZS5jb20nKWBcclxuICBpZiAoYVJvb3RVcmwgJiYgIWFSb290VXJsLmhvc3QgJiYgIWFSb290VXJsLnBhdGgpIHtcclxuICAgIGFSb290VXJsLmhvc3QgPSBhUGF0aDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUm9vdFVybCk7XHJcbiAgfVxyXG5cclxuICB2YXIgam9pbmVkID1cclxuICAgIGFQYXRoLmNoYXJBdCgwKSA9PT0gXCIvXCJcclxuICAgICAgPyBhUGF0aFxyXG4gICAgICA6IG5vcm1hbGl6ZShhUm9vdC5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpICsgXCIvXCIgKyBhUGF0aCk7XHJcblxyXG4gIGlmIChhUm9vdFVybCkge1xyXG4gICAgYVJvb3RVcmwucGF0aCA9IGpvaW5lZDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUm9vdFVybCk7XHJcbiAgfVxyXG4gIHJldHVybiBqb2luZWQ7XHJcbn1cclxuZXhwb3J0cy5qb2luID0gam9pbjtcclxuXHJcbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKGFQYXRoKSB7XHJcbiAgcmV0dXJuIGFQYXRoLmNoYXJBdCgwKSA9PT0gXCIvXCIgfHwgdXJsUmVnZXhwLnRlc3QoYVBhdGgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1ha2UgYSBwYXRoIHJlbGF0aXZlIHRvIGEgVVJMIG9yIGFub3RoZXIgcGF0aC5cclxuICpcclxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxyXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgVVJMIHRvIGJlIG1hZGUgcmVsYXRpdmUgdG8gYVJvb3QuXHJcbiAqL1xyXG5mdW5jdGlvbiByZWxhdGl2ZShhUm9vdCwgYVBhdGgpIHtcclxuICBpZiAoYVJvb3QgPT09IFwiXCIpIHtcclxuICAgIGFSb290ID0gXCIuXCI7XHJcbiAgfVxyXG5cclxuICBhUm9vdCA9IGFSb290LnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcclxuXHJcbiAgLy8gSXQgaXMgcG9zc2libGUgZm9yIHRoZSBwYXRoIHRvIGJlIGFib3ZlIHRoZSByb290LiBJbiB0aGlzIGNhc2UsIHNpbXBseVxyXG4gIC8vIGNoZWNraW5nIHdoZXRoZXIgdGhlIHJvb3QgaXMgYSBwcmVmaXggb2YgdGhlIHBhdGggd29uJ3Qgd29yay4gSW5zdGVhZCwgd2VcclxuICAvLyBuZWVkIHRvIHJlbW92ZSBjb21wb25lbnRzIGZyb20gdGhlIHJvb3Qgb25lIGJ5IG9uZSwgdW50aWwgZWl0aGVyIHdlIGZpbmRcclxuICAvLyBhIHByZWZpeCB0aGF0IGZpdHMsIG9yIHdlIHJ1biBvdXQgb2YgY29tcG9uZW50cyB0byByZW1vdmUuXHJcbiAgdmFyIGxldmVsID0gMDtcclxuICB3aGlsZSAoYVBhdGguaW5kZXhPZihhUm9vdCArIFwiL1wiKSAhPT0gMCkge1xyXG4gICAgdmFyIGluZGV4ID0gYVJvb3QubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgdGhlIG9ubHkgcGFydCBvZiB0aGUgcm9vdCB0aGF0IGlzIGxlZnQgaXMgdGhlIHNjaGVtZSAoaS5lLiBodHRwOi8vLFxyXG4gICAgLy8gZmlsZTovLy8sIGV0Yy4pLCBvbmUgb3IgbW9yZSBzbGFzaGVzICgvKSwgb3Igc2ltcGx5IG5vdGhpbmcgYXQgYWxsLCB3ZVxyXG4gICAgLy8gaGF2ZSBleGhhdXN0ZWQgYWxsIGNvbXBvbmVudHMsIHNvIHRoZSBwYXRoIGlzIG5vdCByZWxhdGl2ZSB0byB0aGUgcm9vdC5cclxuICAgIGFSb290ID0gYVJvb3Quc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgaWYgKGFSb290Lm1hdGNoKC9eKFteXFwvXSs6XFwvKT9cXC8qJC8pKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICArK2xldmVsO1xyXG4gIH1cclxuXHJcbiAgLy8gTWFrZSBzdXJlIHdlIGFkZCBhIFwiLi4vXCIgZm9yIGVhY2ggY29tcG9uZW50IHdlIHJlbW92ZWQgZnJvbSB0aGUgcm9vdC5cclxuICByZXR1cm4gQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiLi4vXCIpICsgYVBhdGguc3Vic3RyKGFSb290Lmxlbmd0aCArIDEpO1xyXG59XHJcbmV4cG9ydHMucmVsYXRpdmUgPSByZWxhdGl2ZTtcclxuXHJcbnZhciBzdXBwb3J0c051bGxQcm90byA9IChmdW5jdGlvbigpIHtcclxuICB2YXIgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICByZXR1cm4gIShcIl9fcHJvdG9fX1wiIGluIG9iaik7XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBpZGVudGl0eShzKSB7XHJcbiAgcmV0dXJuIHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCZWNhdXNlIGJlaGF2aW9yIGdvZXMgd2Fja3kgd2hlbiB5b3Ugc2V0IGBfX3Byb3RvX19gIG9uIG9iamVjdHMsIHdlXHJcbiAqIGhhdmUgdG8gcHJlZml4IGFsbCB0aGUgc3RyaW5ncyBpbiBvdXIgc2V0IHdpdGggYW4gYXJiaXRyYXJ5IGNoYXJhY3Rlci5cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvcHVsbC8zMSBhbmRcclxuICogaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9pc3N1ZXMvMzBcclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5mdW5jdGlvbiB0b1NldFN0cmluZyhhU3RyKSB7XHJcbiAgaWYgKGlzUHJvdG9TdHJpbmcoYVN0cikpIHtcclxuICAgIHJldHVybiBcIiRcIiArIGFTdHI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYVN0cjtcclxufVxyXG5leHBvcnRzLnRvU2V0U3RyaW5nID0gc3VwcG9ydHNOdWxsUHJvdG8gPyBpZGVudGl0eSA6IHRvU2V0U3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gZnJvbVNldFN0cmluZyhhU3RyKSB7XHJcbiAgaWYgKGlzUHJvdG9TdHJpbmcoYVN0cikpIHtcclxuICAgIHJldHVybiBhU3RyLnNsaWNlKDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFTdHI7XHJcbn1cclxuZXhwb3J0cy5mcm9tU2V0U3RyaW5nID0gc3VwcG9ydHNOdWxsUHJvdG8gPyBpZGVudGl0eSA6IGZyb21TZXRTdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBpc1Byb3RvU3RyaW5nKHMpIHtcclxuICBpZiAoIXMpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHZhciBsZW5ndGggPSBzLmxlbmd0aDtcclxuXHJcbiAgaWYgKGxlbmd0aCA8IDkgLyogXCJfX3Byb3RvX19cIi5sZW5ndGggKi8pIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAxKSAhPT0gOTUgLyogJ18nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMikgIT09IDk1IC8qICdfJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDMpICE9PSAxMTEgLyogJ28nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNCkgIT09IDExNiAvKiAndCcgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA1KSAhPT0gMTExIC8qICdvJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDYpICE9PSAxMTQgLyogJ3InICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNykgIT09IDExMiAvKiAncCcgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA4KSAhPT0gOTUgLyogJ18nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOSkgIT09IDk1IC8qICdfJyAqL1xyXG4gICkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDEwOyBpID49IDA7IGktLSkge1xyXG4gICAgaWYgKHMuY2hhckNvZGVBdChpKSAhPT0gMzYgLyogJyQnICovKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aGVyZSB0aGUgb3JpZ2luYWwgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cclxuICpcclxuICogT3B0aW9uYWxseSBwYXNzIGluIGB0cnVlYCBhcyBgb25seUNvbXBhcmVHZW5lcmF0ZWRgIHRvIGNvbnNpZGVyIHR3b1xyXG4gKiBtYXBwaW5ncyB3aXRoIHRoZSBzYW1lIG9yaWdpbmFsIHNvdXJjZS9saW5lL2NvbHVtbiwgYnV0IGRpZmZlcmVudCBnZW5lcmF0ZWRcclxuICogbGluZSBhbmQgY29sdW1uIHRoZSBzYW1lLiBVc2VmdWwgd2hlbiBzZWFyY2hpbmcgZm9yIGEgbWFwcGluZyB3aXRoIGFcclxuICogc3R1YmJlZCBvdXQgbWFwcGluZy5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zKG1hcHBpbmdBLCBtYXBwaW5nQiwgb25seUNvbXBhcmVPcmlnaW5hbCkge1xyXG4gIHZhciBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCB8fCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zID0gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnM7XHJcblxyXG4vKipcclxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGRlZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBpbmRpY2VzIHdoZXJlXHJcbiAqIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cclxuICpcclxuICogT3B0aW9uYWxseSBwYXNzIGluIGB0cnVlYCBhcyBgb25seUNvbXBhcmVHZW5lcmF0ZWRgIHRvIGNvbnNpZGVyIHR3b1xyXG4gKiBtYXBwaW5ncyB3aXRoIHRoZSBzYW1lIGdlbmVyYXRlZCBsaW5lIGFuZCBjb2x1bW4sIGJ1dCBkaWZmZXJlbnRcclxuICogc291cmNlL25hbWUvb3JpZ2luYWwgbGluZSBhbmQgY29sdW1uIHRoZSBzYW1lLiBVc2VmdWwgd2hlbiBzZWFyY2hpbmcgZm9yIGFcclxuICogbWFwcGluZyB3aXRoIGEgc3R1YmJlZCBvdXQgbWFwcGluZy5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkKFxyXG4gIG1hcHBpbmdBLFxyXG4gIG1hcHBpbmdCLFxyXG4gIG9ubHlDb21wYXJlR2VuZXJhdGVkXHJcbikge1xyXG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVHZW5lcmF0ZWQpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkO1xyXG5cclxuZnVuY3Rpb24gc3RyY21wKGFTdHIxLCBhU3RyMikge1xyXG4gIGlmIChhU3RyMSA9PT0gYVN0cjIpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIxID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gMTsgLy8gYVN0cjIgIT09IG51bGxcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMiA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIC0xOyAvLyBhU3RyMSAhPT0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIxID4gYVN0cjIpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIC0xO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGluZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBzdHJpbmdzIHdoZXJlXHJcbiAqIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmdBLCBtYXBwaW5nQikge1xyXG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkO1xyXG5cclxuLyoqXHJcbiAqIFN0cmlwIGFueSBKU09OIFhTU0kgYXZvaWRhbmNlIHByZWZpeCBmcm9tIHRoZSBzdHJpbmcgKGFzIGRvY3VtZW50ZWRcclxuICogaW4gdGhlIHNvdXJjZSBtYXBzIHNwZWNpZmljYXRpb24pLCBhbmQgdGhlbiBwYXJzZSB0aGUgc3RyaW5nIGFzXHJcbiAqIEpTT04uXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVNvdXJjZU1hcElucHV0KHN0cikge1xyXG4gIHJldHVybiBKU09OLnBhcnNlKHN0ci5yZXBsYWNlKC9eXFwpXX0nW15cXG5dKlxcbi8sIFwiXCIpKTtcclxufVxyXG5leHBvcnRzLnBhcnNlU291cmNlTWFwSW5wdXQgPSBwYXJzZVNvdXJjZU1hcElucHV0O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIFVSTCBvZiBhIHNvdXJjZSBnaXZlbiB0aGUgdGhlIHNvdXJjZSByb290LCB0aGUgc291cmNlJ3NcclxuICogVVJMLCBhbmQgdGhlIHNvdXJjZSBtYXAncyBVUkwuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHNvdXJjZVVSTCwgc291cmNlTWFwVVJMKSB7XHJcbiAgc291cmNlVVJMID0gc291cmNlVVJMIHx8IFwiXCI7XHJcblxyXG4gIGlmIChzb3VyY2VSb290KSB7XHJcbiAgICAvLyBUaGlzIGZvbGxvd3Mgd2hhdCBDaHJvbWUgZG9lcy5cclxuICAgIGlmIChzb3VyY2VSb290W3NvdXJjZVJvb3QubGVuZ3RoIC0gMV0gIT09IFwiL1wiICYmIHNvdXJjZVVSTFswXSAhPT0gXCIvXCIpIHtcclxuICAgICAgc291cmNlUm9vdCArPSBcIi9cIjtcclxuICAgIH1cclxuICAgIC8vIFRoZSBzcGVjIHNheXM6XHJcbiAgICAvLyAgIExpbmUgNDogQW4gb3B0aW9uYWwgc291cmNlIHJvb3QsIHVzZWZ1bCBmb3IgcmVsb2NhdGluZyBzb3VyY2VcclxuICAgIC8vICAgZmlsZXMgb24gYSBzZXJ2ZXIgb3IgcmVtb3ZpbmcgcmVwZWF0ZWQgdmFsdWVzIGluIHRoZVxyXG4gICAgLy8gICDigJxzb3VyY2Vz4oCdIGVudHJ5LiAgVGhpcyB2YWx1ZSBpcyBwcmVwZW5kZWQgdG8gdGhlIGluZGl2aWR1YWxcclxuICAgIC8vICAgZW50cmllcyBpbiB0aGUg4oCcc291cmNl4oCdIGZpZWxkLlxyXG4gICAgc291cmNlVVJMID0gc291cmNlUm9vdCArIHNvdXJjZVVSTDtcclxuICB9XHJcblxyXG4gIC8vIEhpc3RvcmljYWxseSwgU291cmNlTWFwQ29uc3VtZXIgZGlkIG5vdCB0YWtlIHRoZSBzb3VyY2VNYXBVUkwgYXNcclxuICAvLyBhIHBhcmFtZXRlci4gIFRoaXMgbW9kZSBpcyBzdGlsbCBzb21ld2hhdCBzdXBwb3J0ZWQsIHdoaWNoIGlzIHdoeVxyXG4gIC8vIHRoaXMgY29kZSBibG9jayBpcyBjb25kaXRpb25hbC4gIEhvd2V2ZXIsIGl0J3MgcHJlZmVyYWJsZSB0byBwYXNzXHJcbiAgLy8gdGhlIHNvdXJjZSBtYXAgVVJMIHRvIFNvdXJjZU1hcENvbnN1bWVyLCBzbyB0aGF0IHRoaXMgZnVuY3Rpb25cclxuICAvLyBjYW4gaW1wbGVtZW50IHRoZSBzb3VyY2UgVVJMIHJlc29sdXRpb24gYWxnb3JpdGhtIGFzIG91dGxpbmVkIGluXHJcbiAgLy8gdGhlIHNwZWMuICBUaGlzIGJsb2NrIGlzIGJhc2ljYWxseSB0aGUgZXF1aXZhbGVudCBvZjpcclxuICAvLyAgICBuZXcgVVJMKHNvdXJjZVVSTCwgc291cmNlTWFwVVJMKS50b1N0cmluZygpXHJcbiAgLy8gLi4uIGV4Y2VwdCBpdCBhdm9pZHMgdXNpbmcgVVJMLCB3aGljaCB3YXNuJ3QgYXZhaWxhYmxlIGluIHRoZVxyXG4gIC8vIG9sZGVyIHJlbGVhc2VzIG9mIG5vZGUgc3RpbGwgc3VwcG9ydGVkIGJ5IHRoaXMgbGlicmFyeS5cclxuICAvL1xyXG4gIC8vIFRoZSBzcGVjIHNheXM6XHJcbiAgLy8gICBJZiB0aGUgc291cmNlcyBhcmUgbm90IGFic29sdXRlIFVSTHMgYWZ0ZXIgcHJlcGVuZGluZyBvZiB0aGVcclxuICAvLyAgIOKAnHNvdXJjZVJvb3TigJ0sIHRoZSBzb3VyY2VzIGFyZSByZXNvbHZlZCByZWxhdGl2ZSB0byB0aGVcclxuICAvLyAgIFNvdXJjZU1hcCAobGlrZSByZXNvbHZpbmcgc2NyaXB0IHNyYyBpbiBhIGh0bWwgZG9jdW1lbnQpLlxyXG4gIGlmIChzb3VyY2VNYXBVUkwpIHtcclxuICAgIHZhciBwYXJzZWQgPSB1cmxQYXJzZShzb3VyY2VNYXBVUkwpO1xyXG4gICAgaWYgKCFwYXJzZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic291cmNlTWFwVVJMIGNvdWxkIG5vdCBiZSBwYXJzZWRcIik7XHJcbiAgICB9XHJcbiAgICBpZiAocGFyc2VkLnBhdGgpIHtcclxuICAgICAgLy8gU3RyaXAgdGhlIGxhc3QgcGF0aCBjb21wb25lbnQsIGJ1dCBrZWVwIHRoZSBcIi9cIi5cclxuICAgICAgdmFyIGluZGV4ID0gcGFyc2VkLnBhdGgubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIHBhcnNlZC5wYXRoID0gcGFyc2VkLnBhdGguc3Vic3RyaW5nKDAsIGluZGV4ICsgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvdXJjZVVSTCA9IGpvaW4odXJsR2VuZXJhdGUocGFyc2VkKSwgc291cmNlVVJMKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemUoc291cmNlVVJMKTtcclxufVxyXG5leHBvcnRzLmNvbXB1dGVTb3VyY2VVUkwgPSBjb21wdXRlU291cmNlVVJMO1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIEFycmF5U2V0ID0gcmVxdWlyZShcIi4uL2xpYi9hcnJheS1zZXRcIikuQXJyYXlTZXQ7XHJcblxyXG5mdW5jdGlvbiBtYWtlVGVzdFNldCgpIHtcclxuICB2YXIgc2V0ID0gbmV3IEFycmF5U2V0KCk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgc2V0LmFkZChTdHJpbmcoaSkpO1xyXG4gIH1cclxuICByZXR1cm4gc2V0O1xyXG59XHJcblxyXG5leHBvcnRzW1widGVzdCAuaGFzKCkgbWVtYmVyc2hpcFwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBzZXQgPSBtYWtlVGVzdFNldCgpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgIGFzc2VydC5vayhzZXQuaGFzKFN0cmluZyhpKSkpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IC5pbmRleE9mKCkgZWxlbWVudHNcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgc2V0ID0gbWFrZVRlc3RTZXQoKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmluZGV4T2YoU3RyaW5nKGkpKSwgaSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgLmF0KCkgaW5kZXhpbmdcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgc2V0ID0gbWFrZVRlc3RTZXQoKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KGkpLCBTdHJpbmcoaSkpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGNyZWF0aW5nIGZyb20gYW4gYXJyYXlcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgc2V0ID0gQXJyYXlTZXQuZnJvbUFycmF5KFtcImZvb1wiLCBcImJhclwiLCBcImJhelwiLCBcInF1dXhcIiwgXCJoYXNPd25Qcm9wZXJ0eVwiXSk7XHJcblxyXG4gIGFzc2VydC5vayhzZXQuaGFzKFwiZm9vXCIpKTtcclxuICBhc3NlcnQub2soc2V0LmhhcyhcImJhclwiKSk7XHJcbiAgYXNzZXJ0Lm9rKHNldC5oYXMoXCJiYXpcIikpO1xyXG4gIGFzc2VydC5vayhzZXQuaGFzKFwicXV1eFwiKSk7XHJcbiAgYXNzZXJ0Lm9rKHNldC5oYXMoXCJoYXNPd25Qcm9wZXJ0eVwiKSk7XHJcblxyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQuaW5kZXhPZihcImZvb1wiKSwgMCk7XHJcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHNldC5pbmRleE9mKFwiYmFyXCIpLCAxKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmluZGV4T2YoXCJiYXpcIiksIDIpO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQuaW5kZXhPZihcInF1dXhcIiksIDMpO1xyXG5cclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDApLCBcImZvb1wiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDEpLCBcImJhclwiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDIpLCBcImJhelwiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDMpLCBcInF1dXhcIik7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCB0aGF0IHlvdSBjYW4gYWRkIF9fcHJvdG9fXzsgc2VlIGdpdGh1YiBpc3N1ZSAjMzBcIl0gPSBmdW5jdGlvbihcclxuICBhc3NlcnRcclxuKSB7XHJcbiAgdmFyIHNldCA9IG5ldyBBcnJheVNldCgpO1xyXG4gIHNldC5hZGQoXCJfX3Byb3RvX19cIik7XHJcbiAgYXNzZXJ0Lm9rKHNldC5oYXMoXCJfX3Byb3RvX19cIikpO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQuYXQoMCksIFwiX19wcm90b19fXCIpO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQuaW5kZXhPZihcIl9fcHJvdG9fX1wiKSwgMCk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCAuZnJvbUFycmF5KCkgd2l0aCBkdXBsaWNhdGVzXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIHNldCA9IEFycmF5U2V0LmZyb21BcnJheShbXCJmb29cIiwgXCJmb29cIl0pO1xyXG4gIGFzc2VydC5vayhzZXQuaGFzKFwiZm9vXCIpKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDApLCBcImZvb1wiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmluZGV4T2YoXCJmb29cIiksIDApO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQudG9BcnJheSgpLmxlbmd0aCwgMSk7XHJcblxyXG4gIHNldCA9IEFycmF5U2V0LmZyb21BcnJheShbXCJmb29cIiwgXCJmb29cIl0sIHRydWUpO1xyXG4gIGFzc2VydC5vayhzZXQuaGFzKFwiZm9vXCIpKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDApLCBcImZvb1wiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmF0KDEpLCBcImZvb1wiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LmluZGV4T2YoXCJmb29cIiksIDApO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQudG9BcnJheSgpLmxlbmd0aCwgMik7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCAuYWRkKCkgd2l0aCBkdXBsaWNhdGVzXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIHNldCA9IG5ldyBBcnJheVNldCgpO1xyXG4gIHNldC5hZGQoXCJmb29cIik7XHJcblxyXG4gIHNldC5hZGQoXCJmb29cIik7XHJcbiAgYXNzZXJ0Lm9rKHNldC5oYXMoXCJmb29cIikpO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQuYXQoMCksIFwiZm9vXCIpO1xyXG4gIGFzc2VydC5zdHJpY3RFcXVhbChzZXQuaW5kZXhPZihcImZvb1wiKSwgMCk7XHJcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHNldC50b0FycmF5KCkubGVuZ3RoLCAxKTtcclxuXHJcbiAgc2V0LmFkZChcImZvb1wiLCB0cnVlKTtcclxuICBhc3NlcnQub2soc2V0LmhhcyhcImZvb1wiKSk7XHJcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHNldC5hdCgwKSwgXCJmb29cIik7XHJcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHNldC5hdCgxKSwgXCJmb29cIik7XHJcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHNldC5pbmRleE9mKFwiZm9vXCIpLCAwKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LnRvQXJyYXkoKS5sZW5ndGgsIDIpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3QgLnNpemUoKVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIHZhciBzZXQgPSBuZXcgQXJyYXlTZXQoKTtcclxuICBzZXQuYWRkKFwiZm9vXCIpO1xyXG4gIHNldC5hZGQoXCJiYXJcIik7XHJcbiAgc2V0LmFkZChcImJhelwiKTtcclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LnNpemUoKSwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCAuc2l6ZSgpIHdpdGggZGlzYWxsb3dlZCBkdXBsaWNhdGVzXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIHNldCA9IG5ldyBBcnJheVNldCgpO1xyXG5cclxuICBzZXQuYWRkKFwiZm9vXCIpO1xyXG4gIHNldC5hZGQoXCJmb29cIik7XHJcblxyXG4gIHNldC5hZGQoXCJiYXJcIik7XHJcbiAgc2V0LmFkZChcImJhclwiKTtcclxuXHJcbiAgc2V0LmFkZChcImJhelwiKTtcclxuICBzZXQuYWRkKFwiYmF6XCIpO1xyXG5cclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LnNpemUoKSwgMyk7XHJcbn07XHJcblxyXG5leHBvcnRzW1widGVzdCAuc2l6ZSgpIHdpdGggYWxsb3dlZCBkdXBsaWNhdGVzXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgdmFyIHNldCA9IG5ldyBBcnJheVNldCgpO1xyXG5cclxuICBzZXQuYWRkKFwiZm9vXCIpO1xyXG4gIHNldC5hZGQoXCJmb29cIiwgdHJ1ZSk7XHJcblxyXG4gIHNldC5hZGQoXCJiYXJcIik7XHJcbiAgc2V0LmFkZChcImJhclwiLCB0cnVlKTtcclxuXHJcbiAgc2V0LmFkZChcImJhelwiKTtcclxuICBzZXQuYWRkKFwiYmF6XCIsIHRydWUpO1xyXG5cclxuICBhc3NlcnQuc3RyaWN0RXF1YWwoc2V0LnNpemUoKSwgMyk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=