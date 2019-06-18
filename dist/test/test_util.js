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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test-util.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./test/test-util.js":
/*!***************************!*\
  !*** ./test/test-util.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var libUtil = __webpack_require__(/*! ../lib/util */ "./lib/util.js");

exports['test urls'] = function (assert) {
  var assertUrl = function (url) {
    assert.equal(url, libUtil.urlGenerate(libUtil.urlParse(url)));
  };
  assertUrl('http://');
  assertUrl('http://www.example.com');
  assertUrl('http://user:pass@www.example.com');
  assertUrl('http://www.example.com:80');
  assertUrl('http://www.example.com/');
  assertUrl('http://www.example.com/foo/bar');
  assertUrl('http://www.example.com/foo/bar/');
  assertUrl('http://user:pass@www.example.com:80/foo/bar/');

  assertUrl('//');
  assertUrl('//www.example.com');
  assertUrl('file:///www.example.com');

  assert.equal(libUtil.urlParse(''), null);
  assert.equal(libUtil.urlParse('.'), null);
  assert.equal(libUtil.urlParse('..'), null);
  assert.equal(libUtil.urlParse('a'), null);
  assert.equal(libUtil.urlParse('a/b'), null);
  assert.equal(libUtil.urlParse('a//b'), null);
  assert.equal(libUtil.urlParse('/a'), null);
  assert.equal(libUtil.urlParse('data:foo,bar'), null);

  var parsed = libUtil.urlParse('http://x-y.com/bar');
  assert.equal(parsed.scheme, 'http');
  assert.equal(parsed.host, 'x-y.com');
  assert.equal(parsed.path, '/bar');

  var webpackURL = 'webpack:///webpack/bootstrap 67e184f9679733298d44'
  parsed = libUtil.urlParse(webpackURL);
  assert.equal(parsed.scheme, 'webpack');
  assert.equal(parsed.host, '');
  assert.equal(parsed.path, '/webpack/bootstrap 67e184f9679733298d44');
  assert.equal(webpackURL, libUtil.urlGenerate(parsed));
};

exports['test normalize()'] = function (assert) {
  assert.equal(libUtil.normalize('/..'), '/');
  assert.equal(libUtil.normalize('/../'), '/');
  assert.equal(libUtil.normalize('/../../../..'), '/');
  assert.equal(libUtil.normalize('/../../../../a/b/c'), '/a/b/c');
  assert.equal(libUtil.normalize('/a/b/c/../../../d/../../e'), '/e');

  assert.equal(libUtil.normalize('..'), '..');
  assert.equal(libUtil.normalize('../'), '../');
  assert.equal(libUtil.normalize('../../a/'), '../../a/');
  assert.equal(libUtil.normalize('a/..'), '.');
  assert.equal(libUtil.normalize('a/../../..'), '../..');

  assert.equal(libUtil.normalize('/.'), '/');
  assert.equal(libUtil.normalize('/./'), '/');
  assert.equal(libUtil.normalize('/./././.'), '/');
  assert.equal(libUtil.normalize('/././././a/b/c'), '/a/b/c');
  assert.equal(libUtil.normalize('/a/b/c/./././d/././e'), '/a/b/c/d/e');

  assert.equal(libUtil.normalize(''), '.');
  assert.equal(libUtil.normalize('.'), '.');
  assert.equal(libUtil.normalize('./'), '.');
  assert.equal(libUtil.normalize('././a'), 'a');
  assert.equal(libUtil.normalize('a/./'), 'a/');
  assert.equal(libUtil.normalize('a/././.'), 'a');

  assert.equal(libUtil.normalize('/a/b//c////d/////'), '/a/b/c/d/');
  assert.equal(libUtil.normalize('///a/b//c////d/////'), '///a/b/c/d/');
  assert.equal(libUtil.normalize('a/b//c////d'), 'a/b/c/d');

  assert.equal(libUtil.normalize('.///.././../a/b//./..'), '../../a')

  assert.equal(libUtil.normalize('http://www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.normalize('http://www.example.com/'), 'http://www.example.com/');
  assert.equal(libUtil.normalize('http://www.example.com/./..//a/b/c/.././d//'), 'http://www.example.com/a/b/d/');
};

exports['test join()'] = function (assert) {
  assert.equal(libUtil.join('a', 'b'), 'a/b');
  assert.equal(libUtil.join('a/', 'b'), 'a/b');
  assert.equal(libUtil.join('a//', 'b'), 'a/b');
  assert.equal(libUtil.join('a', 'b/'), 'a/b/');
  assert.equal(libUtil.join('a', 'b//'), 'a/b/');
  assert.equal(libUtil.join('a/', '/b'), '/b');
  assert.equal(libUtil.join('a//', '//b'), '//b');

  assert.equal(libUtil.join('a', '..'), '.');
  assert.equal(libUtil.join('a', '../b'), 'b');
  assert.equal(libUtil.join('a/b', '../c'), 'a/c');

  assert.equal(libUtil.join('a', '.'), 'a');
  assert.equal(libUtil.join('a', './b'), 'a/b');
  assert.equal(libUtil.join('a/b', './c'), 'a/b/c');

  assert.equal(libUtil.join('a', 'http://www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.join('a', 'data:foo,bar'), 'data:foo,bar');


  assert.equal(libUtil.join('', 'b'), 'b');
  assert.equal(libUtil.join('.', 'b'), 'b');
  assert.equal(libUtil.join('', 'b/'), 'b/');
  assert.equal(libUtil.join('.', 'b/'), 'b/');
  assert.equal(libUtil.join('', 'b//'), 'b/');
  assert.equal(libUtil.join('.', 'b//'), 'b/');

  assert.equal(libUtil.join('', '..'), '..');
  assert.equal(libUtil.join('.', '..'), '..');
  assert.equal(libUtil.join('', '../b'), '../b');
  assert.equal(libUtil.join('.', '../b'), '../b');

  assert.equal(libUtil.join('', '.'), '.');
  assert.equal(libUtil.join('.', '.'), '.');
  assert.equal(libUtil.join('', './b'), 'b');
  assert.equal(libUtil.join('.', './b'), 'b');

  assert.equal(libUtil.join('', 'http://www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.join('.', 'http://www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.join('', 'data:foo,bar'), 'data:foo,bar');
  assert.equal(libUtil.join('.', 'data:foo,bar'), 'data:foo,bar');


  assert.equal(libUtil.join('..', 'b'), '../b');
  assert.equal(libUtil.join('..', 'b/'), '../b/');
  assert.equal(libUtil.join('..', 'b//'), '../b/');

  assert.equal(libUtil.join('..', '..'), '../..');
  assert.equal(libUtil.join('..', '../b'), '../../b');

  assert.equal(libUtil.join('..', '.'), '..');
  assert.equal(libUtil.join('..', './b'), '../b');

  assert.equal(libUtil.join('..', 'http://www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.join('..', 'data:foo,bar'), 'data:foo,bar');


  assert.equal(libUtil.join('a', ''), 'a');
  assert.equal(libUtil.join('a', '.'), 'a');
  assert.equal(libUtil.join('a/', ''), 'a');
  assert.equal(libUtil.join('a/', '.'), 'a');
  assert.equal(libUtil.join('a//', ''), 'a');
  assert.equal(libUtil.join('a//', '.'), 'a');
  assert.equal(libUtil.join('/a', ''), '/a');
  assert.equal(libUtil.join('/a', '.'), '/a');
  assert.equal(libUtil.join('', ''), '.');
  assert.equal(libUtil.join('.', ''), '.');
  assert.equal(libUtil.join('.', ''), '.');
  assert.equal(libUtil.join('.', '.'), '.');
  assert.equal(libUtil.join('..', ''), '..');
  assert.equal(libUtil.join('..', '.'), '..');
  assert.equal(libUtil.join('http://foo.org/a', ''), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/a', '.'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/a/', ''), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/a/', '.'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/a//', ''), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/a//', '.'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org', ''), 'http://foo.org/');
  assert.equal(libUtil.join('http://foo.org', '.'), 'http://foo.org/');
  assert.equal(libUtil.join('http://foo.org/', ''), 'http://foo.org/');
  assert.equal(libUtil.join('http://foo.org/', '.'), 'http://foo.org/');
  assert.equal(libUtil.join('http://foo.org//', ''), 'http://foo.org/');
  assert.equal(libUtil.join('http://foo.org//', '.'), 'http://foo.org/');
  assert.equal(libUtil.join('//www.example.com', ''), '//www.example.com/');
  assert.equal(libUtil.join('//www.example.com', '.'), '//www.example.com/');


  assert.equal(libUtil.join('http://foo.org/a', 'b'), 'http://foo.org/a/b');
  assert.equal(libUtil.join('http://foo.org/a/', 'b'), 'http://foo.org/a/b');
  assert.equal(libUtil.join('http://foo.org/a//', 'b'), 'http://foo.org/a/b');
  assert.equal(libUtil.join('http://foo.org/a', 'b/'), 'http://foo.org/a/b/');
  assert.equal(libUtil.join('http://foo.org/a', 'b//'), 'http://foo.org/a/b/');
  assert.equal(libUtil.join('http://foo.org/a/', '/b'), 'http://foo.org/b');
  assert.equal(libUtil.join('http://foo.org/a//', '//b'), 'http://b');

  assert.equal(libUtil.join('http://foo.org/a', '..'), 'http://foo.org/');
  assert.equal(libUtil.join('http://foo.org/a', '../b'), 'http://foo.org/b');
  assert.equal(libUtil.join('http://foo.org/a/b', '../c'), 'http://foo.org/a/c');

  assert.equal(libUtil.join('http://foo.org/a', '.'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/a', './b'), 'http://foo.org/a/b');
  assert.equal(libUtil.join('http://foo.org/a/b', './c'), 'http://foo.org/a/b/c');

  assert.equal(libUtil.join('http://foo.org/a', 'http://www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.join('http://foo.org/a', 'data:foo,bar'), 'data:foo,bar');


  assert.equal(libUtil.join('http://foo.org', 'a'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/', 'a'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org//', 'a'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org', '/a'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org/', '/a'), 'http://foo.org/a');
  assert.equal(libUtil.join('http://foo.org//', '/a'), 'http://foo.org/a');


  assert.equal(libUtil.join('http://', 'www.example.com'), 'http://www.example.com');
  assert.equal(libUtil.join('file:///', 'www.example.com'), 'file:///www.example.com');
  assert.equal(libUtil.join('http://', 'ftp://example.com'), 'ftp://example.com');

  assert.equal(libUtil.join('http://www.example.com', '//foo.org/bar'), 'http://foo.org/bar');
  assert.equal(libUtil.join('//www.example.com', '//foo.org/bar'), '//foo.org/bar');
};

// TODO Issue #128: Define and test this function properly.
exports['test relative()'] = function (assert) {
  assert.equal(libUtil.relative('/the/root', '/the/root/one.js'), 'one.js');
  assert.equal(libUtil.relative('http://the/root', 'http://the/root/one.js'), 'one.js');
  assert.equal(libUtil.relative('/the/root', '/the/rootone.js'), '../rootone.js');
  assert.equal(libUtil.relative('http://the/root', 'http://the/rootone.js'), '../rootone.js');
  assert.equal(libUtil.relative('/the/root', '/therootone.js'), '/therootone.js');
  assert.equal(libUtil.relative('http://the/root', '/therootone.js'), '/therootone.js');

  assert.equal(libUtil.relative('', '/the/root/one.js'), '/the/root/one.js');
  assert.equal(libUtil.relative('.', '/the/root/one.js'), '/the/root/one.js');
  assert.equal(libUtil.relative('', 'the/root/one.js'), 'the/root/one.js');
  assert.equal(libUtil.relative('.', 'the/root/one.js'), 'the/root/one.js');

  assert.equal(libUtil.relative('/', '/the/root/one.js'), 'the/root/one.js');
  assert.equal(libUtil.relative('/', 'the/root/one.js'), 'the/root/one.js');
};

exports['test computeSourceURL'] = function (assert) {
  // Tests with sourceMapURL.
  assert.equal(libUtil.computeSourceURL('', 'src/test.js', 'http://example.com'),
               'http://example.com/src/test.js');
  assert.equal(libUtil.computeSourceURL(undefined, 'src/test.js', 'http://example.com'),
               'http://example.com/src/test.js');
  assert.equal(libUtil.computeSourceURL('src', 'test.js', 'http://example.com'),
               'http://example.com/src/test.js');
  assert.equal(libUtil.computeSourceURL('src/', 'test.js', 'http://example.com'),
               'http://example.com/src/test.js');
  assert.equal(libUtil.computeSourceURL('src', '/test.js', 'http://example.com'),
               'http://example.com/src/test.js');
  assert.equal(libUtil.computeSourceURL('http://mozilla.com', 'src/test.js', 'http://example.com'),
               'http://mozilla.com/src/test.js');
  assert.equal(libUtil.computeSourceURL('', 'test.js', 'http://example.com/src/test.js.map'),
               'http://example.com/src/test.js');

  // Legacy code won't pass in the sourceMapURL.
  assert.equal(libUtil.computeSourceURL('', 'src/test.js'), 'src/test.js');
  assert.equal(libUtil.computeSourceURL(undefined, 'src/test.js'), 'src/test.js');
  assert.equal(libUtil.computeSourceURL('src', 'test.js'), 'src/test.js');
  assert.equal(libUtil.computeSourceURL('src/', 'test.js'), 'src/test.js');
  assert.equal(libUtil.computeSourceURL('src', '/test.js'), 'src/test.js');
  assert.equal(libUtil.computeSourceURL('src', '../test.js'), 'test.js');
  assert.equal(libUtil.computeSourceURL('src/dir', '../././../test.js'), 'test.js');

  // This gives different results with the old algorithm and the new
  // spec-compliant algorithm.
  assert.equal(libUtil.computeSourceURL('http://example.com/dir', '/test.js'),
               'http://example.com/dir/test.js');
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LXV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5aEJBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsa0NBQWE7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InRlc3RfdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC90ZXN0LXV0aWwuanNcIik7XG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24gZm9yIGdldHRpbmcgdmFsdWVzIGZyb20gcGFyYW1ldGVyL29wdGlvbnNcclxuICogb2JqZWN0cy5cclxuICpcclxuICogQHBhcmFtIGFyZ3MgVGhlIG9iamVjdCB3ZSBhcmUgZXh0cmFjdGluZyB2YWx1ZXMgZnJvbVxyXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgd2UgYXJlIGdldHRpbmcuXHJcbiAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgQW4gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGlmIHRoZSBwcm9wZXJ0eSBpcyBtaXNzaW5nXHJcbiAqIGZyb20gdGhlIG9iamVjdC4gSWYgdGhpcyBpcyBub3Qgc3BlY2lmaWVkIGFuZCB0aGUgcHJvcGVydHkgaXMgbWlzc2luZywgYW5cclxuICogZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBcmcoYUFyZ3MsIGFOYW1lLCBhRGVmYXVsdFZhbHVlKSB7XHJcbiAgaWYgKGFOYW1lIGluIGFBcmdzKSB7XHJcbiAgICByZXR1cm4gYUFyZ3NbYU5hbWVdO1xyXG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgcmV0dXJuIGFEZWZhdWx0VmFsdWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignXCInICsgYU5hbWUgKyAnXCIgaXMgYSByZXF1aXJlZCBhcmd1bWVudC4nKTtcclxuICB9XHJcbn1cclxuZXhwb3J0cy5nZXRBcmcgPSBnZXRBcmc7XHJcblxyXG52YXIgdXJsUmVnZXhwID0gL14oPzooW1xcdytcXC0uXSspOik/XFwvXFwvKD86KFxcdys6XFx3KylAKT8oW1xcdy4tXSopKD86OihcXGQrKSk/KC4qKSQvO1xyXG52YXIgZGF0YVVybFJlZ2V4cCA9IC9eZGF0YTouK1xcLC4rJC87XHJcblxyXG5mdW5jdGlvbiB1cmxQYXJzZShhVXJsKSB7XHJcbiAgdmFyIG1hdGNoID0gYVVybC5tYXRjaCh1cmxSZWdleHApO1xyXG4gIGlmICghbWF0Y2gpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgc2NoZW1lOiBtYXRjaFsxXSxcclxuICAgIGF1dGg6IG1hdGNoWzJdLFxyXG4gICAgaG9zdDogbWF0Y2hbM10sXHJcbiAgICBwb3J0OiBtYXRjaFs0XSxcclxuICAgIHBhdGg6IG1hdGNoWzVdXHJcbiAgfTtcclxufVxyXG5leHBvcnRzLnVybFBhcnNlID0gdXJsUGFyc2U7XHJcblxyXG5mdW5jdGlvbiB1cmxHZW5lcmF0ZShhUGFyc2VkVXJsKSB7XHJcbiAgdmFyIHVybCA9ICcnO1xyXG4gIGlmIChhUGFyc2VkVXJsLnNjaGVtZSkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuc2NoZW1lICsgJzonO1xyXG4gIH1cclxuICB1cmwgKz0gJy8vJztcclxuICBpZiAoYVBhcnNlZFVybC5hdXRoKSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5hdXRoICsgJ0AnO1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5ob3N0KSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5ob3N0O1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5wb3J0KSB7XHJcbiAgICB1cmwgKz0gXCI6XCIgKyBhUGFyc2VkVXJsLnBvcnRcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwucGF0aCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwucGF0aDtcclxuICB9XHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5leHBvcnRzLnVybEdlbmVyYXRlID0gdXJsR2VuZXJhdGU7XHJcblxyXG5jb25zdCBNQVhfQ0FDSEVEX0lOUFVUUyA9IDMyO1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIHNvbWUgZnVuY3Rpb24gYGYoaW5wdXQpIC0+IHJlc3VsdGAgYW5kIHJldHVybnMgYSBtZW1vaXplZCB2ZXJzaW9uIG9mXHJcbiAqIGBmYC5cclxuICpcclxuICogV2Uga2VlcCBhdCBtb3N0IGBNQVhfQ0FDSEVEX0lOUFVUU2AgbWVtb2l6ZWQgcmVzdWx0cyBvZiBgZmAgYWxpdmUuIFRoZVxyXG4gKiBtZW1vaXphdGlvbiBpcyBhIGR1bWItc2ltcGxlLCBsaW5lYXIgbGVhc3QtcmVjZW50bHktdXNlZCBjYWNoZS5cclxuICovXHJcbmZ1bmN0aW9uIGxydU1lbW9pemUoZikge1xyXG4gIGNvbnN0IGNhY2hlID0gW107XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGNhY2hlW2ldLmlucHV0ID09PSBpbnB1dCkge1xyXG4gICAgICAgIHZhciB0ZW1wID0gY2FjaGVbMF07XHJcbiAgICAgICAgY2FjaGVbMF0gPSBjYWNoZVtpXTtcclxuICAgICAgICBjYWNoZVtpXSA9IHRlbXA7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlWzBdLnJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXN1bHQgPSBmKGlucHV0KTtcclxuXHJcbiAgICBjYWNoZS51bnNoaWZ0KHtcclxuICAgICAgaW5wdXQsXHJcbiAgICAgIHJlc3VsdCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYWNoZS5sZW5ndGggPiBNQVhfQ0FDSEVEX0lOUFVUUykge1xyXG4gICAgICBjYWNoZS5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGEgcGF0aCwgb3IgdGhlIHBhdGggcG9ydGlvbiBvZiBhIFVSTDpcclxuICpcclxuICogLSBSZXBsYWNlcyBjb25zZWN1dGl2ZSBzbGFzaGVzIHdpdGggb25lIHNsYXNoLlxyXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJy4nIHBhcnRzLlxyXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJzxkaXI+Ly4uJyBwYXJ0cy5cclxuICpcclxuICogQmFzZWQgb24gY29kZSBpbiB0aGUgTm9kZS5qcyAncGF0aCcgY29yZSBtb2R1bGUuXHJcbiAqXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciB1cmwgdG8gbm9ybWFsaXplLlxyXG4gKi9cclxudmFyIG5vcm1hbGl6ZSA9IGxydU1lbW9pemUoZnVuY3Rpb24gbm9ybWFsaXplKGFQYXRoKSB7XHJcbiAgdmFyIHBhdGggPSBhUGF0aDtcclxuICB2YXIgdXJsID0gdXJsUGFyc2UoYVBhdGgpO1xyXG4gIGlmICh1cmwpIHtcclxuICAgIGlmICghdXJsLnBhdGgpIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHVybC5wYXRoO1xyXG4gIH1cclxuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKTtcclxuXHJcbiAgLy8gU3BsaXQgdGhlIHBhdGggaW50byBwYXJ0cyBiZXR3ZWVuIGAvYCBjaGFyYWN0ZXJzLiBUaGlzIGlzIG11Y2ggZmFzdGVyIHRoYW5cclxuICAvLyB1c2luZyBgLnNwbGl0KC9cXC8rL2cpYC5cclxuICB2YXIgcGFydHMgPSBbXTtcclxuICB2YXIgc3RhcnQgPSAwO1xyXG4gIHZhciBpID0gMDtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgc3RhcnQgPSBpO1xyXG4gICAgaSA9IHBhdGguaW5kZXhPZihcIi9cIiwgc3RhcnQpO1xyXG4gICAgaWYgKGkgPT09IC0xKSB7XHJcbiAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShzdGFydCkpO1xyXG4gICAgICBicmVhaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShzdGFydCwgaSkpO1xyXG4gICAgICB3aGlsZSAoaSA8IHBhdGgubGVuZ3RoICYmIHBhdGhbaV0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgaSsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBwYXJ0LCB1cCA9IDAsIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgcGFydCA9IHBhcnRzW2ldO1xyXG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xyXG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICB9IGVsc2UgaWYgKHBhcnQgPT09ICcuLicpIHtcclxuICAgICAgdXArKztcclxuICAgIH0gZWxzZSBpZiAodXAgPiAwKSB7XHJcbiAgICAgIGlmIChwYXJ0ID09PSAnJykge1xyXG4gICAgICAgIC8vIFRoZSBmaXJzdCBwYXJ0IGlzIGJsYW5rIGlmIHRoZSBwYXRoIGlzIGFic29sdXRlLiBUcnlpbmcgdG8gZ29cclxuICAgICAgICAvLyBhYm92ZSB0aGUgcm9vdCBpcyBhIG5vLW9wLiBUaGVyZWZvcmUgd2UgY2FuIHJlbW92ZSBhbGwgJy4uJyBwYXJ0c1xyXG4gICAgICAgIC8vIGRpcmVjdGx5IGFmdGVyIHRoZSByb290LlxyXG4gICAgICAgIHBhcnRzLnNwbGljZShpICsgMSwgdXApO1xyXG4gICAgICAgIHVwID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMik7XHJcbiAgICAgICAgdXAtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwYXRoID0gcGFydHMuam9pbignLycpO1xyXG5cclxuICBpZiAocGF0aCA9PT0gJycpIHtcclxuICAgIHBhdGggPSBpc0Fic29sdXRlID8gJy8nIDogJy4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHVybCkge1xyXG4gICAgdXJsLnBhdGggPSBwYXRoO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKHVybCk7XHJcbiAgfVxyXG4gIHJldHVybiBwYXRoO1xyXG59KTtcclxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XHJcblxyXG4vKipcclxuICogSm9pbnMgdHdvIHBhdGhzL1VSTHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhUm9vdCBUaGUgcm9vdCBwYXRoIG9yIFVSTC5cclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBqb2luZWQgd2l0aCB0aGUgcm9vdC5cclxuICpcclxuICogLSBJZiBhUGF0aCBpcyBhIFVSTCBvciBhIGRhdGEgVVJJLCBhUGF0aCBpcyByZXR1cm5lZCwgdW5sZXNzIGFQYXRoIGlzIGFcclxuICogICBzY2hlbWUtcmVsYXRpdmUgVVJMOiBUaGVuIHRoZSBzY2hlbWUgb2YgYVJvb3QsIGlmIGFueSwgaXMgcHJlcGVuZGVkXHJcbiAqICAgZmlyc3QuXHJcbiAqIC0gT3RoZXJ3aXNlIGFQYXRoIGlzIGEgcGF0aC4gSWYgYVJvb3QgaXMgYSBVUkwsIHRoZW4gaXRzIHBhdGggcG9ydGlvblxyXG4gKiAgIGlzIHVwZGF0ZWQgd2l0aCB0aGUgcmVzdWx0IGFuZCBhUm9vdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlIHRoZSByZXN1bHRcclxuICogICBpcyByZXR1cm5lZC5cclxuICogICAtIElmIGFQYXRoIGlzIGFic29sdXRlLCB0aGUgcmVzdWx0IGlzIGFQYXRoLlxyXG4gKiAgIC0gT3RoZXJ3aXNlIHRoZSB0d28gcGF0aHMgYXJlIGpvaW5lZCB3aXRoIGEgc2xhc2guXHJcbiAqIC0gSm9pbmluZyBmb3IgZXhhbXBsZSAnaHR0cDovLycgYW5kICd3d3cuZXhhbXBsZS5jb20nIGlzIGFsc28gc3VwcG9ydGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gam9pbihhUm9vdCwgYVBhdGgpIHtcclxuICBpZiAoYVJvb3QgPT09IFwiXCIpIHtcclxuICAgIGFSb290ID0gXCIuXCI7XHJcbiAgfVxyXG4gIGlmIChhUGF0aCA9PT0gXCJcIikge1xyXG4gICAgYVBhdGggPSBcIi5cIjtcclxuICB9XHJcbiAgdmFyIGFQYXRoVXJsID0gdXJsUGFyc2UoYVBhdGgpO1xyXG4gIHZhciBhUm9vdFVybCA9IHVybFBhcnNlKGFSb290KTtcclxuICBpZiAoYVJvb3RVcmwpIHtcclxuICAgIGFSb290ID0gYVJvb3RVcmwucGF0aCB8fCAnLyc7XHJcbiAgfVxyXG5cclxuICAvLyBgam9pbihmb28sICcvL3d3dy5leGFtcGxlLm9yZycpYFxyXG4gIGlmIChhUGF0aFVybCAmJiAhYVBhdGhVcmwuc2NoZW1lKSB7XHJcbiAgICBpZiAoYVJvb3RVcmwpIHtcclxuICAgICAgYVBhdGhVcmwuc2NoZW1lID0gYVJvb3RVcmwuc2NoZW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFQYXRoVXJsKTtcclxuICB9XHJcblxyXG4gIGlmIChhUGF0aFVybCB8fCBhUGF0aC5tYXRjaChkYXRhVXJsUmVnZXhwKSkge1xyXG4gICAgcmV0dXJuIGFQYXRoO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oJ2h0dHA6Ly8nLCAnd3d3LmV4YW1wbGUuY29tJylgXHJcbiAgaWYgKGFSb290VXJsICYmICFhUm9vdFVybC5ob3N0ICYmICFhUm9vdFVybC5wYXRoKSB7XHJcbiAgICBhUm9vdFVybC5ob3N0ID0gYVBhdGg7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUoYVJvb3RVcmwpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGpvaW5lZCA9IGFQYXRoLmNoYXJBdCgwKSA9PT0gJy8nXHJcbiAgICA/IGFQYXRoXHJcbiAgICA6IG5vcm1hbGl6ZShhUm9vdC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIGFQYXRoKTtcclxuXHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdFVybC5wYXRoID0gam9pbmVkO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcbiAgcmV0dXJuIGpvaW5lZDtcclxufVxyXG5leHBvcnRzLmpvaW4gPSBqb2luO1xyXG5cclxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24gKGFQYXRoKSB7XHJcbiAgcmV0dXJuIGFQYXRoLmNoYXJBdCgwKSA9PT0gJy8nIHx8IHVybFJlZ2V4cC50ZXN0KGFQYXRoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWtlIGEgcGF0aCByZWxhdGl2ZSB0byBhIFVSTCBvciBhbm90aGVyIHBhdGguXHJcbiAqXHJcbiAqIEBwYXJhbSBhUm9vdCBUaGUgcm9vdCBwYXRoIG9yIFVSTC5cclxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBtYWRlIHJlbGF0aXZlIHRvIGFSb290LlxyXG4gKi9cclxuZnVuY3Rpb24gcmVsYXRpdmUoYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuXHJcbiAgYVJvb3QgPSBhUm9vdC5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG5cclxuICAvLyBJdCBpcyBwb3NzaWJsZSBmb3IgdGhlIHBhdGggdG8gYmUgYWJvdmUgdGhlIHJvb3QuIEluIHRoaXMgY2FzZSwgc2ltcGx5XHJcbiAgLy8gY2hlY2tpbmcgd2hldGhlciB0aGUgcm9vdCBpcyBhIHByZWZpeCBvZiB0aGUgcGF0aCB3b24ndCB3b3JrLiBJbnN0ZWFkLCB3ZVxyXG4gIC8vIG5lZWQgdG8gcmVtb3ZlIGNvbXBvbmVudHMgZnJvbSB0aGUgcm9vdCBvbmUgYnkgb25lLCB1bnRpbCBlaXRoZXIgd2UgZmluZFxyXG4gIC8vIGEgcHJlZml4IHRoYXQgZml0cywgb3Igd2UgcnVuIG91dCBvZiBjb21wb25lbnRzIHRvIHJlbW92ZS5cclxuICB2YXIgbGV2ZWwgPSAwO1xyXG4gIHdoaWxlIChhUGF0aC5pbmRleE9mKGFSb290ICsgJy8nKSAhPT0gMCkge1xyXG4gICAgdmFyIGluZGV4ID0gYVJvb3QubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgdGhlIG9ubHkgcGFydCBvZiB0aGUgcm9vdCB0aGF0IGlzIGxlZnQgaXMgdGhlIHNjaGVtZSAoaS5lLiBodHRwOi8vLFxyXG4gICAgLy8gZmlsZTovLy8sIGV0Yy4pLCBvbmUgb3IgbW9yZSBzbGFzaGVzICgvKSwgb3Igc2ltcGx5IG5vdGhpbmcgYXQgYWxsLCB3ZVxyXG4gICAgLy8gaGF2ZSBleGhhdXN0ZWQgYWxsIGNvbXBvbmVudHMsIHNvIHRoZSBwYXRoIGlzIG5vdCByZWxhdGl2ZSB0byB0aGUgcm9vdC5cclxuICAgIGFSb290ID0gYVJvb3Quc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgaWYgKGFSb290Lm1hdGNoKC9eKFteXFwvXSs6XFwvKT9cXC8qJC8pKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICArK2xldmVsO1xyXG4gIH1cclxuXHJcbiAgLy8gTWFrZSBzdXJlIHdlIGFkZCBhIFwiLi4vXCIgZm9yIGVhY2ggY29tcG9uZW50IHdlIHJlbW92ZWQgZnJvbSB0aGUgcm9vdC5cclxuICByZXR1cm4gQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiLi4vXCIpICsgYVBhdGguc3Vic3RyKGFSb290Lmxlbmd0aCArIDEpO1xyXG59XHJcbmV4cG9ydHMucmVsYXRpdmUgPSByZWxhdGl2ZTtcclxuXHJcbnZhciBzdXBwb3J0c051bGxQcm90byA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgcmV0dXJuICEoJ19fcHJvdG9fXycgaW4gb2JqKTtcclxufSgpKTtcclxuXHJcbmZ1bmN0aW9uIGlkZW50aXR5IChzKSB7XHJcbiAgcmV0dXJuIHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCZWNhdXNlIGJlaGF2aW9yIGdvZXMgd2Fja3kgd2hlbiB5b3Ugc2V0IGBfX3Byb3RvX19gIG9uIG9iamVjdHMsIHdlXHJcbiAqIGhhdmUgdG8gcHJlZml4IGFsbCB0aGUgc3RyaW5ncyBpbiBvdXIgc2V0IHdpdGggYW4gYXJiaXRyYXJ5IGNoYXJhY3Rlci5cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvcHVsbC8zMSBhbmRcclxuICogaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9pc3N1ZXMvMzBcclxuICpcclxuICogQHBhcmFtIFN0cmluZyBhU3RyXHJcbiAqL1xyXG5mdW5jdGlvbiB0b1NldFN0cmluZyhhU3RyKSB7XHJcbiAgaWYgKGlzUHJvdG9TdHJpbmcoYVN0cikpIHtcclxuICAgIHJldHVybiAnJCcgKyBhU3RyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFTdHI7XHJcbn1cclxuZXhwb3J0cy50b1NldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiB0b1NldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGZyb21TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gYVN0ci5zbGljZSgxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMuZnJvbVNldFN0cmluZyA9IHN1cHBvcnRzTnVsbFByb3RvID8gaWRlbnRpdHkgOiBmcm9tU2V0U3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gaXNQcm90b1N0cmluZyhzKSB7XHJcbiAgaWYgKCFzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB2YXIgbGVuZ3RoID0gcy5sZW5ndGg7XHJcblxyXG4gIGlmIChsZW5ndGggPCA5IC8qIFwiX19wcm90b19fXCIubGVuZ3RoICovKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAocy5jaGFyQ29kZUF0KGxlbmd0aCAtIDEpICE9PSA5NSAgLyogJ18nICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAyKSAhPT0gOTUgIC8qICdfJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMykgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDQpICE9PSAxMTYgLyogJ3QnICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA1KSAhPT0gMTExIC8qICdvJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNikgIT09IDExNCAvKiAncicgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDcpICE9PSAxMTIgLyogJ3AnICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA4KSAhPT0gOTUgIC8qICdfJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOSkgIT09IDk1ICAvKiAnXycgKi8pIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZvciAodmFyIGkgPSBsZW5ndGggLSAxMDsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGlmIChzLmNoYXJDb2RlQXQoaSkgIT09IDM2IC8qICckJyAqLykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2hlcmUgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqXHJcbiAqIE9wdGlvbmFsbHkgcGFzcyBpbiBgdHJ1ZWAgYXMgYG9ubHlDb21wYXJlR2VuZXJhdGVkYCB0byBjb25zaWRlciB0d29cclxuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4sIGJ1dCBkaWZmZXJlbnQgZ2VuZXJhdGVkXHJcbiAqIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhIG1hcHBpbmcgd2l0aCBhXHJcbiAqIHN0dWJiZWQgb3V0IG1hcHBpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyhtYXBwaW5nQSwgbWFwcGluZ0IsIG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICB2YXIgY21wID0gc3RyY21wKG1hcHBpbmdBLnNvdXJjZSwgbWFwcGluZ0Iuc291cmNlKTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVPcmlnaW5hbCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZENvbHVtbiAtIG1hcHBpbmdCLmdlbmVyYXRlZENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyA9IGNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zO1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2l0aCBkZWZsYXRlZCBzb3VyY2UgYW5kIG5hbWUgaW5kaWNlcyB3aGVyZVxyXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXHJcbiAqXHJcbiAqIE9wdGlvbmFsbHkgcGFzcyBpbiBgdHJ1ZWAgYXMgYG9ubHlDb21wYXJlR2VuZXJhdGVkYCB0byBjb25zaWRlciB0d29cclxuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uLCBidXQgZGlmZmVyZW50XHJcbiAqIHNvdXJjZS9uYW1lL29yaWdpbmFsIGxpbmUgYW5kIGNvbHVtbiB0aGUgc2FtZS4gVXNlZnVsIHdoZW4gc2VhcmNoaW5nIGZvciBhXHJcbiAqIG1hcHBpbmcgd2l0aCBhIHN0dWJiZWQgb3V0IG1hcHBpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZChtYXBwaW5nQSwgbWFwcGluZ0IsIG9ubHlDb21wYXJlR2VuZXJhdGVkKSB7XHJcbiAgdmFyIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCB8fCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkID0gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQ7XHJcblxyXG5mdW5jdGlvbiBzdHJjbXAoYVN0cjEsIGFTdHIyKSB7XHJcbiAgaWYgKGFTdHIxID09PSBhU3RyMikge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjEgPT09IG51bGwpIHtcclxuICAgIHJldHVybiAxOyAvLyBhU3RyMiAhPT0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIyID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gLTE7IC8vIGFTdHIxICE9PSBudWxsXHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjEgPiBhU3RyMikge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gLTE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggaW5mbGF0ZWQgc291cmNlIGFuZCBuYW1lIHN0cmluZ3Mgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCKSB7XHJcbiAgdmFyIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkID0gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQ7XHJcblxyXG4vKipcclxuICogU3RyaXAgYW55IEpTT04gWFNTSSBhdm9pZGFuY2UgcHJlZml4IGZyb20gdGhlIHN0cmluZyAoYXMgZG9jdW1lbnRlZFxyXG4gKiBpbiB0aGUgc291cmNlIG1hcHMgc3BlY2lmaWNhdGlvbiksIGFuZCB0aGVuIHBhcnNlIHRoZSBzdHJpbmcgYXNcclxuICogSlNPTi5cclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlU291cmNlTWFwSW5wdXQoc3RyKSB7XHJcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLnJlcGxhY2UoL15cXCldfSdbXlxcbl0qXFxuLywgJycpKTtcclxufVxyXG5leHBvcnRzLnBhcnNlU291cmNlTWFwSW5wdXQgPSBwYXJzZVNvdXJjZU1hcElucHV0O1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIFVSTCBvZiBhIHNvdXJjZSBnaXZlbiB0aGUgdGhlIHNvdXJjZSByb290LCB0aGUgc291cmNlJ3NcclxuICogVVJMLCBhbmQgdGhlIHNvdXJjZSBtYXAncyBVUkwuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHNvdXJjZVVSTCwgc291cmNlTWFwVVJMKSB7XHJcbiAgc291cmNlVVJMID0gc291cmNlVVJMIHx8ICcnO1xyXG5cclxuICBpZiAoc291cmNlUm9vdCkge1xyXG4gICAgLy8gVGhpcyBmb2xsb3dzIHdoYXQgQ2hyb21lIGRvZXMuXHJcbiAgICBpZiAoc291cmNlUm9vdFtzb3VyY2VSb290Lmxlbmd0aCAtIDFdICE9PSAnLycgJiYgc291cmNlVVJMWzBdICE9PSAnLycpIHtcclxuICAgICAgc291cmNlUm9vdCArPSAnLyc7XHJcbiAgICB9XHJcbiAgICAvLyBUaGUgc3BlYyBzYXlzOlxyXG4gICAgLy8gICBMaW5lIDQ6IEFuIG9wdGlvbmFsIHNvdXJjZSByb290LCB1c2VmdWwgZm9yIHJlbG9jYXRpbmcgc291cmNlXHJcbiAgICAvLyAgIGZpbGVzIG9uIGEgc2VydmVyIG9yIHJlbW92aW5nIHJlcGVhdGVkIHZhbHVlcyBpbiB0aGVcclxuICAgIC8vICAg4oCcc291cmNlc+KAnSBlbnRyeS4gIFRoaXMgdmFsdWUgaXMgcHJlcGVuZGVkIHRvIHRoZSBpbmRpdmlkdWFsXHJcbiAgICAvLyAgIGVudHJpZXMgaW4gdGhlIOKAnHNvdXJjZeKAnSBmaWVsZC5cclxuICAgIHNvdXJjZVVSTCA9IHNvdXJjZVJvb3QgKyBzb3VyY2VVUkw7XHJcbiAgfVxyXG5cclxuICAvLyBIaXN0b3JpY2FsbHksIFNvdXJjZU1hcENvbnN1bWVyIGRpZCBub3QgdGFrZSB0aGUgc291cmNlTWFwVVJMIGFzXHJcbiAgLy8gYSBwYXJhbWV0ZXIuICBUaGlzIG1vZGUgaXMgc3RpbGwgc29tZXdoYXQgc3VwcG9ydGVkLCB3aGljaCBpcyB3aHlcclxuICAvLyB0aGlzIGNvZGUgYmxvY2sgaXMgY29uZGl0aW9uYWwuICBIb3dldmVyLCBpdCdzIHByZWZlcmFibGUgdG8gcGFzc1xyXG4gIC8vIHRoZSBzb3VyY2UgbWFwIFVSTCB0byBTb3VyY2VNYXBDb25zdW1lciwgc28gdGhhdCB0aGlzIGZ1bmN0aW9uXHJcbiAgLy8gY2FuIGltcGxlbWVudCB0aGUgc291cmNlIFVSTCByZXNvbHV0aW9uIGFsZ29yaXRobSBhcyBvdXRsaW5lZCBpblxyXG4gIC8vIHRoZSBzcGVjLiAgVGhpcyBibG9jayBpcyBiYXNpY2FsbHkgdGhlIGVxdWl2YWxlbnQgb2Y6XHJcbiAgLy8gICAgbmV3IFVSTChzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkudG9TdHJpbmcoKVxyXG4gIC8vIC4uLiBleGNlcHQgaXQgYXZvaWRzIHVzaW5nIFVSTCwgd2hpY2ggd2Fzbid0IGF2YWlsYWJsZSBpbiB0aGVcclxuICAvLyBvbGRlciByZWxlYXNlcyBvZiBub2RlIHN0aWxsIHN1cHBvcnRlZCBieSB0aGlzIGxpYnJhcnkuXHJcbiAgLy9cclxuICAvLyBUaGUgc3BlYyBzYXlzOlxyXG4gIC8vICAgSWYgdGhlIHNvdXJjZXMgYXJlIG5vdCBhYnNvbHV0ZSBVUkxzIGFmdGVyIHByZXBlbmRpbmcgb2YgdGhlXHJcbiAgLy8gICDigJxzb3VyY2VSb2904oCdLCB0aGUgc291cmNlcyBhcmUgcmVzb2x2ZWQgcmVsYXRpdmUgdG8gdGhlXHJcbiAgLy8gICBTb3VyY2VNYXAgKGxpa2UgcmVzb2x2aW5nIHNjcmlwdCBzcmMgaW4gYSBodG1sIGRvY3VtZW50KS5cclxuICBpZiAoc291cmNlTWFwVVJMKSB7XHJcbiAgICB2YXIgcGFyc2VkID0gdXJsUGFyc2Uoc291cmNlTWFwVVJMKTtcclxuICAgIGlmICghcGFyc2VkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNvdXJjZU1hcFVSTCBjb3VsZCBub3QgYmUgcGFyc2VkXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnNlZC5wYXRoKSB7XHJcbiAgICAgIC8vIFN0cmlwIHRoZSBsYXN0IHBhdGggY29tcG9uZW50LCBidXQga2VlcCB0aGUgXCIvXCIuXHJcbiAgICAgIHZhciBpbmRleCA9IHBhcnNlZC5wYXRoLmxhc3RJbmRleE9mKCcvJyk7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgcGFyc2VkLnBhdGggPSBwYXJzZWQucGF0aC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc291cmNlVVJMID0gam9pbih1cmxHZW5lcmF0ZShwYXJzZWQpLCBzb3VyY2VVUkwpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZShzb3VyY2VVUkwpO1xyXG59XHJcbmV4cG9ydHMuY29tcHV0ZVNvdXJjZVVSTCA9IGNvbXB1dGVTb3VyY2VVUkw7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTQgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgbGliVXRpbCA9IHJlcXVpcmUoJy4uL2xpYi91dGlsJyk7XHJcblxyXG5leHBvcnRzWyd0ZXN0IHVybHMnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICB2YXIgYXNzZXJ0VXJsID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgYXNzZXJ0LmVxdWFsKHVybCwgbGliVXRpbC51cmxHZW5lcmF0ZShsaWJVdGlsLnVybFBhcnNlKHVybCkpKTtcclxuICB9O1xyXG4gIGFzc2VydFVybCgnaHR0cDovLycpO1xyXG4gIGFzc2VydFVybCgnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydFVybCgnaHR0cDovL3VzZXI6cGFzc0B3d3cuZXhhbXBsZS5jb20nKTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb206ODAnKTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vJyk7XHJcbiAgYXNzZXJ0VXJsKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tL2Zvby9iYXInKTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vZm9vL2Jhci8nKTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly91c2VyOnBhc3NAd3d3LmV4YW1wbGUuY29tOjgwL2Zvby9iYXIvJyk7XHJcblxyXG4gIGFzc2VydFVybCgnLy8nKTtcclxuICBhc3NlcnRVcmwoJy8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0VXJsKCdmaWxlOi8vL3d3dy5leGFtcGxlLmNvbScpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnJyksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKCcuJyksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKCcuLicpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnYScpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnYS9iJyksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKCdhLy9iJyksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKCcvYScpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnZGF0YTpmb28sYmFyJyksIG51bGwpO1xyXG5cclxuICB2YXIgcGFyc2VkID0gbGliVXRpbC51cmxQYXJzZSgnaHR0cDovL3gteS5jb20vYmFyJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBhcnNlZC5zY2hlbWUsICdodHRwJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKHBhcnNlZC5ob3N0LCAneC15LmNvbScpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQucGF0aCwgJy9iYXInKTtcclxuXHJcbiAgdmFyIHdlYnBhY2tVUkwgPSAnd2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NCdcclxuICBwYXJzZWQgPSBsaWJVdGlsLnVybFBhcnNlKHdlYnBhY2tVUkwpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQuc2NoZW1lLCAnd2VicGFjaycpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQuaG9zdCwgJycpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQucGF0aCwgJy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NCcpO1xyXG4gIGFzc2VydC5lcXVhbCh3ZWJwYWNrVVJMLCBsaWJVdGlsLnVybEdlbmVyYXRlKHBhcnNlZCkpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBub3JtYWxpemUoKSddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4uJyksICcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi4vJyksICcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi4vLi4vLi4vLi4nKSwgJy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy8uLi8uLi8uLi8uLi9hL2IvYycpLCAnL2EvYi9jJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvYS9iL2MvLi4vLi4vLi4vZC8uLi8uLi9lJyksICcvZScpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4uJyksICcuLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLi4vJyksICcuLi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4uLy4uL2EvJyksICcuLi8uLi9hLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnYS8uLicpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnYS8uLi8uLi8uLicpLCAnLi4vLi4nKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLicpLCAnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4vJyksICcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi8uLy4vLicpLCAnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4vLi8uLy4vYS9iL2MnKSwgJy9hL2IvYycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnL2EvYi9jLy4vLi8uL2QvLi8uL2UnKSwgJy9hL2IvYy9kL2UnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcnKSwgJy4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4nKSwgJy4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4vJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLy4vYScpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnYS8uLycpLCAnYS8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2EvLi8uLy4nKSwgJ2EnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvYS9iLy9jLy8vL2QvLy8vLycpLCAnL2EvYi9jL2QvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLy9hL2IvL2MvLy8vZC8vLy8vJyksICcvLy9hL2IvYy9kLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnYS9iLy9jLy8vL2QnKSwgJ2EvYi9jL2QnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLy8vLi4vLi8uLi9hL2IvLy4vLi4nKSwgJy4uLy4uL2EnKVxyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnaHR0cDovL3d3dy5leGFtcGxlLmNvbS8uLy4uLy9hL2IvYy8uLi8uL2QvLycpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbS9hL2IvZC8nKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgam9pbigpJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdiJyksICdhL2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLycsICdiJyksICdhL2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLy8nLCAnYicpLCAnYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdiLycpLCAnYS9iLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnYi8vJyksICdhL2IvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8nLCAnL2InKSwgJy9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8vJywgJy8vYicpLCAnLy9iJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnLi4nKSwgJy4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJy4uL2InKSwgJ2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhL2InLCAnLi4vYycpLCAnYS9jJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnLicpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnLi9iJyksICdhL2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhL2InLCAnLi9jJyksICdhL2IvYycpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJ2RhdGE6Zm9vLGJhcicpLCAnZGF0YTpmb28sYmFyJyk7XHJcblxyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnYicpLCAnYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnYicpLCAnYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICdiLycpLCAnYi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJ2IvJyksICdiLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICdiLy8nKSwgJ2IvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICdiLy8nKSwgJ2IvJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcuLicpLCAnLi4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJy4uJyksICcuLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcuLi9iJyksICcuLi9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuLi9iJyksICcuLi9iJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcuJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJy4vYicpLCAnYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnLi9iJyksICdiJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJ2RhdGE6Zm9vLGJhcicpLCAnZGF0YTpmb28sYmFyJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICdkYXRhOmZvbyxiYXInKSwgJ2RhdGE6Zm9vLGJhcicpO1xyXG5cclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnYicpLCAnLi4vYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2IvJyksICcuLi9iLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2IvLycpLCAnLi4vYi8nKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnLi4nKSwgJy4uLy4uJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnLi4vYicpLCAnLi4vLi4vYicpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICcuJyksICcuLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJy4vYicpLCAnLi4vYicpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnZGF0YTpmb28sYmFyJyksICdkYXRhOmZvbyxiYXInKTtcclxuXHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnJyksICdhJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICcuJyksICdhJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8nLCAnJyksICdhJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8nLCAnLicpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvLycsICcnKSwgJ2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLy8nLCAnLicpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy9hJywgJycpLCAnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcvYScsICcuJyksICcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcnKSwgJy4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJycpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnJyksICcuLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJy4nKSwgJy4uJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hLycsICcnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hLycsICcuJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8vJywgJycpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvLycsICcuJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcnLCAnJyksICdodHRwOi8vZm9vLm9yZy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZycsICcuJyksICdodHRwOi8vZm9vLm9yZy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8nLCAnJyksICdodHRwOi8vZm9vLm9yZy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8nLCAnLicpLCAnaHR0cDovL2Zvby5vcmcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvLycsICcnKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLy8nLCAnLicpLCAnaHR0cDovL2Zvby5vcmcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLy93d3cuZXhhbXBsZS5jb20nLCAnJyksICcvL3d3dy5leGFtcGxlLmNvbS8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcvL3d3dy5leGFtcGxlLmNvbScsICcuJyksICcvL3d3dy5leGFtcGxlLmNvbS8nKTtcclxuXHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnYicpLCAnaHR0cDovL2Zvby5vcmcvYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8nLCAnYicpLCAnaHR0cDovL2Zvby5vcmcvYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8vJywgJ2InKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnYi8nKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJ2IvLycpLCAnaHR0cDovL2Zvby5vcmcvYS9iLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvJywgJy9iJyksICdodHRwOi8vZm9vLm9yZy9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8vJywgJy8vYicpLCAnaHR0cDovL2InKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuLicpLCAnaHR0cDovL2Zvby5vcmcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuLi9iJyksICdodHRwOi8vZm9vLm9yZy9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS9iJywgJy4uL2MnKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYycpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJy4vYicpLCAnaHR0cDovL2Zvby5vcmcvYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS9iJywgJy4vYycpLCAnaHR0cDovL2Zvby5vcmcvYS9iL2MnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICdkYXRhOmZvbyxiYXInKSwgJ2RhdGE6Zm9vLGJhcicpO1xyXG5cclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcnLCAnYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLycsICdhJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvLycsICdhJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcnLCAnL2EnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8nLCAnL2EnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8vJywgJy9hJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcblxyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2ZpbGU6Ly8vJywgJ3d3dy5leGFtcGxlLmNvbScpLCAnZmlsZTovLy93d3cuZXhhbXBsZS5jb20nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vJywgJ2Z0cDovL2V4YW1wbGUuY29tJyksICdmdHA6Ly9leGFtcGxlLmNvbScpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tJywgJy8vZm9vLm9yZy9iYXInKSwgJ2h0dHA6Ly9mb28ub3JnL2JhcicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy8vd3d3LmV4YW1wbGUuY29tJywgJy8vZm9vLm9yZy9iYXInKSwgJy8vZm9vLm9yZy9iYXInKTtcclxufTtcclxuXHJcbi8vIFRPRE8gSXNzdWUgIzEyODogRGVmaW5lIGFuZCB0ZXN0IHRoaXMgZnVuY3Rpb24gcHJvcGVybHkuXHJcbmV4cG9ydHNbJ3Rlc3QgcmVsYXRpdmUoKSddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcvdGhlL3Jvb3QnLCAnL3RoZS9yb290L29uZS5qcycpLCAnb25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJ2h0dHA6Ly90aGUvcm9vdCcsICdodHRwOi8vdGhlL3Jvb3Qvb25lLmpzJyksICdvbmUuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnL3RoZS9yb290JywgJy90aGUvcm9vdG9uZS5qcycpLCAnLi4vcm9vdG9uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCdodHRwOi8vdGhlL3Jvb3QnLCAnaHR0cDovL3RoZS9yb290b25lLmpzJyksICcuLi9yb290b25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy90aGUvcm9vdCcsICcvdGhlcm9vdG9uZS5qcycpLCAnL3RoZXJvb3RvbmUuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnaHR0cDovL3RoZS9yb290JywgJy90aGVyb290b25lLmpzJyksICcvdGhlcm9vdG9uZS5qcycpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnJywgJy90aGUvcm9vdC9vbmUuanMnKSwgJy90aGUvcm9vdC9vbmUuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnLicsICcvdGhlL3Jvb3Qvb25lLmpzJyksICcvdGhlL3Jvb3Qvb25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJycsICd0aGUvcm9vdC9vbmUuanMnKSwgJ3RoZS9yb290L29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcuJywgJ3RoZS9yb290L29uZS5qcycpLCAndGhlL3Jvb3Qvb25lLmpzJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcvJywgJy90aGUvcm9vdC9vbmUuanMnKSwgJ3RoZS9yb290L29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcvJywgJ3RoZS9yb290L29uZS5qcycpLCAndGhlL3Jvb3Qvb25lLmpzJyk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGNvbXB1dGVTb3VyY2VVUkwnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICAvLyBUZXN0cyB3aXRoIHNvdXJjZU1hcFVSTC5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCcnLCAnc3JjL3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKHVuZGVmaW5lZCwgJ3NyYy90ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJ3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMvJywgJ3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMnLCAnL3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdodHRwOi8vbW96aWxsYS5jb20nLCAnc3JjL3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vbW96aWxsYS5jb20vc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCcnLCAndGVzdC5qcycsICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMubWFwJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcclxuXHJcbiAgLy8gTGVnYWN5IGNvZGUgd29uJ3QgcGFzcyBpbiB0aGUgc291cmNlTWFwVVJMLlxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJycsICdzcmMvdGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKHVuZGVmaW5lZCwgJ3NyYy90ZXN0LmpzJyksICdzcmMvdGVzdC5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJ3NyYycsICd0ZXN0LmpzJyksICdzcmMvdGVzdC5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJ3NyYy8nLCAndGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMnLCAnL3Rlc3QuanMnKSwgJ3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJy4uL3Rlc3QuanMnKSwgJ3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMvZGlyJywgJy4uLy4vLi8uLi90ZXN0LmpzJyksICd0ZXN0LmpzJyk7XHJcblxyXG4gIC8vIFRoaXMgZ2l2ZXMgZGlmZmVyZW50IHJlc3VsdHMgd2l0aCB0aGUgb2xkIGFsZ29yaXRobSBhbmQgdGhlIG5ld1xyXG4gIC8vIHNwZWMtY29tcGxpYW50IGFsZ29yaXRobS5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdodHRwOi8vZXhhbXBsZS5jb20vZGlyJywgJy90ZXN0LmpzJyksXHJcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vZGlyL3Rlc3QuanMnKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==