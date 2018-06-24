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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LXV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5aEJBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0X3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3QvdGVzdC11dGlsLmpzXCIpO1xuIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xyXG4vKlxyXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcclxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIHZhbHVlcyBmcm9tIHBhcmFtZXRlci9vcHRpb25zXHJcbiAqIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcmdzIFRoZSBvYmplY3Qgd2UgYXJlIGV4dHJhY3RpbmcgdmFsdWVzIGZyb21cclxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIGFyZSBnZXR0aW5nLlxyXG4gKiBAcGFyYW0gZGVmYXVsdFZhbHVlIEFuIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBpZiB0aGUgcHJvcGVydHkgaXMgbWlzc2luZ1xyXG4gKiBmcm9tIHRoZSBvYmplY3QuIElmIHRoaXMgaXMgbm90IHNwZWNpZmllZCBhbmQgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmcsIGFuXHJcbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QXJnKGFBcmdzLCBhTmFtZSwgYURlZmF1bHRWYWx1ZSkge1xyXG4gIGlmIChhTmFtZSBpbiBhQXJncykge1xyXG4gICAgcmV0dXJuIGFBcmdzW2FOYW1lXTtcclxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgIHJldHVybiBhRGVmYXVsdFZhbHVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFOYW1lICsgJ1wiIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0QXJnID0gZ2V0QXJnO1xyXG5cclxudmFyIHVybFJlZ2V4cCA9IC9eKD86KFtcXHcrXFwtLl0rKTopP1xcL1xcLyg/OihcXHcrOlxcdyspQCk/KFtcXHcuLV0qKSg/OjooXFxkKykpPyguKikkLztcclxudmFyIGRhdGFVcmxSZWdleHAgPSAvXmRhdGE6LitcXCwuKyQvO1xyXG5cclxuZnVuY3Rpb24gdXJsUGFyc2UoYVVybCkge1xyXG4gIHZhciBtYXRjaCA9IGFVcmwubWF0Y2godXJsUmVnZXhwKTtcclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHNjaGVtZTogbWF0Y2hbMV0sXHJcbiAgICBhdXRoOiBtYXRjaFsyXSxcclxuICAgIGhvc3Q6IG1hdGNoWzNdLFxyXG4gICAgcG9ydDogbWF0Y2hbNF0sXHJcbiAgICBwYXRoOiBtYXRjaFs1XVxyXG4gIH07XHJcbn1cclxuZXhwb3J0cy51cmxQYXJzZSA9IHVybFBhcnNlO1xyXG5cclxuZnVuY3Rpb24gdXJsR2VuZXJhdGUoYVBhcnNlZFVybCkge1xyXG4gIHZhciB1cmwgPSAnJztcclxuICBpZiAoYVBhcnNlZFVybC5zY2hlbWUpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnNjaGVtZSArICc6JztcclxuICB9XHJcbiAgdXJsICs9ICcvLyc7XHJcbiAgaWYgKGFQYXJzZWRVcmwuYXV0aCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuYXV0aCArICdAJztcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwuaG9zdCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuaG9zdDtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwucG9ydCkge1xyXG4gICAgdXJsICs9IFwiOlwiICsgYVBhcnNlZFVybC5wb3J0XHJcbiAgfVxyXG4gIGlmIChhUGFyc2VkVXJsLnBhdGgpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnBhdGg7XHJcbiAgfVxyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuZXhwb3J0cy51cmxHZW5lcmF0ZSA9IHVybEdlbmVyYXRlO1xyXG5cclxuY29uc3QgTUFYX0NBQ0hFRF9JTlBVVFMgPSAzMjtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBzb21lIGZ1bmN0aW9uIGBmKGlucHV0KSAtPiByZXN1bHRgIGFuZCByZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZlxyXG4gKiBgZmAuXHJcbiAqXHJcbiAqIFdlIGtlZXAgYXQgbW9zdCBgTUFYX0NBQ0hFRF9JTlBVVFNgIG1lbW9pemVkIHJlc3VsdHMgb2YgYGZgIGFsaXZlLiBUaGVcclxuICogbWVtb2l6YXRpb24gaXMgYSBkdW1iLXNpbXBsZSwgbGluZWFyIGxlYXN0LXJlY2VudGx5LXVzZWQgY2FjaGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBscnVNZW1vaXplKGYpIHtcclxuICBjb25zdCBjYWNoZSA9IFtdO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChjYWNoZVtpXS5pbnB1dCA9PT0gaW5wdXQpIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNhY2hlWzBdO1xyXG4gICAgICAgIGNhY2hlWzBdID0gY2FjaGVbaV07XHJcbiAgICAgICAgY2FjaGVbaV0gPSB0ZW1wO1xyXG4gICAgICAgIHJldHVybiBjYWNoZVswXS5yZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gZihpbnB1dCk7XHJcblxyXG4gICAgY2FjaGUudW5zaGlmdCh7XHJcbiAgICAgIGlucHV0LFxyXG4gICAgICByZXN1bHQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2FjaGUubGVuZ3RoID4gTUFYX0NBQ0hFRF9JTlBVVFMpIHtcclxuICAgICAgY2FjaGUucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplcyBhIHBhdGgsIG9yIHRoZSBwYXRoIHBvcnRpb24gb2YgYSBVUkw6XHJcbiAqXHJcbiAqIC0gUmVwbGFjZXMgY29uc2VjdXRpdmUgc2xhc2hlcyB3aXRoIG9uZSBzbGFzaC5cclxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICcuJyBwYXJ0cy5cclxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICc8ZGlyPi8uLicgcGFydHMuXHJcbiAqXHJcbiAqIEJhc2VkIG9uIGNvZGUgaW4gdGhlIE5vZGUuanMgJ3BhdGgnIGNvcmUgbW9kdWxlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgdXJsIHRvIG5vcm1hbGl6ZS5cclxuICovXHJcbnZhciBub3JtYWxpemUgPSBscnVNZW1vaXplKGZ1bmN0aW9uIG5vcm1hbGl6ZShhUGF0aCkge1xyXG4gIHZhciBwYXRoID0gYVBhdGg7XHJcbiAgdmFyIHVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICBpZiAodXJsKSB7XHJcbiAgICBpZiAoIXVybC5wYXRoKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuICAgIHBhdGggPSB1cmwucGF0aDtcclxuICB9XHJcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCk7XHJcblxyXG4gIC8vIFNwbGl0IHRoZSBwYXRoIGludG8gcGFydHMgYmV0d2VlbiBgL2AgY2hhcmFjdGVycy4gVGhpcyBpcyBtdWNoIGZhc3RlciB0aGFuXHJcbiAgLy8gdXNpbmcgYC5zcGxpdCgvXFwvKy9nKWAuXHJcbiAgdmFyIHBhcnRzID0gW107XHJcbiAgdmFyIHN0YXJ0ID0gMDtcclxuICB2YXIgaSA9IDA7XHJcbiAgd2hpbGUgKHRydWUpIHtcclxuICAgIHN0YXJ0ID0gaTtcclxuICAgIGkgPSBwYXRoLmluZGV4T2YoXCIvXCIsIHN0YXJ0KTtcclxuICAgIGlmIChpID09PSAtMSkge1xyXG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQpKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQsIGkpKTtcclxuICAgICAgd2hpbGUgKGkgPCBwYXRoLmxlbmd0aCAmJiBwYXRoW2ldID09PSBcIi9cIikge1xyXG4gICAgICAgIGkrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgcGFydCwgdXAgPSAwLCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHBhcnQgPSBwYXJ0c1tpXTtcclxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcclxuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XHJcbiAgICAgIHVwKys7XHJcbiAgICB9IGVsc2UgaWYgKHVwID4gMCkge1xyXG4gICAgICBpZiAocGFydCA9PT0gJycpIHtcclxuICAgICAgICAvLyBUaGUgZmlyc3QgcGFydCBpcyBibGFuayBpZiB0aGUgcGF0aCBpcyBhYnNvbHV0ZS4gVHJ5aW5nIHRvIGdvXHJcbiAgICAgICAgLy8gYWJvdmUgdGhlIHJvb3QgaXMgYSBuby1vcC4gVGhlcmVmb3JlIHdlIGNhbiByZW1vdmUgYWxsICcuLicgcGFydHNcclxuICAgICAgICAvLyBkaXJlY3RseSBhZnRlciB0aGUgcm9vdC5cclxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSArIDEsIHVwKTtcclxuICAgICAgICB1cCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFydHMuc3BsaWNlKGksIDIpO1xyXG4gICAgICAgIHVwLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcGF0aCA9IHBhcnRzLmpvaW4oJy8nKTtcclxuXHJcbiAgaWYgKHBhdGggPT09ICcnKSB7XHJcbiAgICBwYXRoID0gaXNBYnNvbHV0ZSA/ICcvJyA6ICcuJztcclxuICB9XHJcblxyXG4gIGlmICh1cmwpIHtcclxuICAgIHVybC5wYXRoID0gcGF0aDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZSh1cmwpO1xyXG4gIH1cclxuICByZXR1cm4gcGF0aDtcclxufSk7XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG5cclxuLyoqXHJcbiAqIEpvaW5zIHR3byBwYXRocy9VUkxzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgam9pbmVkIHdpdGggdGhlIHJvb3QuXHJcbiAqXHJcbiAqIC0gSWYgYVBhdGggaXMgYSBVUkwgb3IgYSBkYXRhIFVSSSwgYVBhdGggaXMgcmV0dXJuZWQsIHVubGVzcyBhUGF0aCBpcyBhXHJcbiAqICAgc2NoZW1lLXJlbGF0aXZlIFVSTDogVGhlbiB0aGUgc2NoZW1lIG9mIGFSb290LCBpZiBhbnksIGlzIHByZXBlbmRlZFxyXG4gKiAgIGZpcnN0LlxyXG4gKiAtIE90aGVyd2lzZSBhUGF0aCBpcyBhIHBhdGguIElmIGFSb290IGlzIGEgVVJMLCB0aGVuIGl0cyBwYXRoIHBvcnRpb25cclxuICogICBpcyB1cGRhdGVkIHdpdGggdGhlIHJlc3VsdCBhbmQgYVJvb3QgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSB0aGUgcmVzdWx0XHJcbiAqICAgaXMgcmV0dXJuZWQuXHJcbiAqICAgLSBJZiBhUGF0aCBpcyBhYnNvbHV0ZSwgdGhlIHJlc3VsdCBpcyBhUGF0aC5cclxuICogICAtIE90aGVyd2lzZSB0aGUgdHdvIHBhdGhzIGFyZSBqb2luZWQgd2l0aCBhIHNsYXNoLlxyXG4gKiAtIEpvaW5pbmcgZm9yIGV4YW1wbGUgJ2h0dHA6Ly8nIGFuZCAnd3d3LmV4YW1wbGUuY29tJyBpcyBhbHNvIHN1cHBvcnRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGpvaW4oYVJvb3QsIGFQYXRoKSB7XHJcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XHJcbiAgICBhUm9vdCA9IFwiLlwiO1xyXG4gIH1cclxuICBpZiAoYVBhdGggPT09IFwiXCIpIHtcclxuICAgIGFQYXRoID0gXCIuXCI7XHJcbiAgfVxyXG4gIHZhciBhUGF0aFVybCA9IHVybFBhcnNlKGFQYXRoKTtcclxuICB2YXIgYVJvb3RVcmwgPSB1cmxQYXJzZShhUm9vdCk7XHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdCA9IGFSb290VXJsLnBhdGggfHwgJy8nO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oZm9vLCAnLy93d3cuZXhhbXBsZS5vcmcnKWBcclxuICBpZiAoYVBhdGhVcmwgJiYgIWFQYXRoVXJsLnNjaGVtZSkge1xyXG4gICAgaWYgKGFSb290VXJsKSB7XHJcbiAgICAgIGFQYXRoVXJsLnNjaGVtZSA9IGFSb290VXJsLnNjaGVtZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUGF0aFVybCk7XHJcbiAgfVxyXG5cclxuICBpZiAoYVBhdGhVcmwgfHwgYVBhdGgubWF0Y2goZGF0YVVybFJlZ2V4cCkpIHtcclxuICAgIHJldHVybiBhUGF0aDtcclxuICB9XHJcblxyXG4gIC8vIGBqb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpYFxyXG4gIGlmIChhUm9vdFVybCAmJiAhYVJvb3RVcmwuaG9zdCAmJiAhYVJvb3RVcmwucGF0aCkge1xyXG4gICAgYVJvb3RVcmwuaG9zdCA9IGFQYXRoO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcblxyXG4gIHZhciBqb2luZWQgPSBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJ1xyXG4gICAgPyBhUGF0aFxyXG4gICAgOiBub3JtYWxpemUoYVJvb3QucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyBhUGF0aCk7XHJcblxyXG4gIGlmIChhUm9vdFVybCkge1xyXG4gICAgYVJvb3RVcmwucGF0aCA9IGpvaW5lZDtcclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUm9vdFVybCk7XHJcbiAgfVxyXG4gIHJldHVybiBqb2luZWQ7XHJcbn1cclxuZXhwb3J0cy5qb2luID0gam9pbjtcclxuXHJcbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uIChhUGF0aCkge1xyXG4gIHJldHVybiBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJyB8fCB1cmxSZWdleHAudGVzdChhUGF0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSBhIHBhdGggcmVsYXRpdmUgdG8gYSBVUkwgb3IgYW5vdGhlciBwYXRoLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgbWFkZSByZWxhdGl2ZSB0byBhUm9vdC5cclxuICovXHJcbmZ1bmN0aW9uIHJlbGF0aXZlKGFSb290LCBhUGF0aCkge1xyXG4gIGlmIChhUm9vdCA9PT0gXCJcIikge1xyXG4gICAgYVJvb3QgPSBcIi5cIjtcclxuICB9XHJcblxyXG4gIGFSb290ID0gYVJvb3QucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuXHJcbiAgLy8gSXQgaXMgcG9zc2libGUgZm9yIHRoZSBwYXRoIHRvIGJlIGFib3ZlIHRoZSByb290LiBJbiB0aGlzIGNhc2UsIHNpbXBseVxyXG4gIC8vIGNoZWNraW5nIHdoZXRoZXIgdGhlIHJvb3QgaXMgYSBwcmVmaXggb2YgdGhlIHBhdGggd29uJ3Qgd29yay4gSW5zdGVhZCwgd2VcclxuICAvLyBuZWVkIHRvIHJlbW92ZSBjb21wb25lbnRzIGZyb20gdGhlIHJvb3Qgb25lIGJ5IG9uZSwgdW50aWwgZWl0aGVyIHdlIGZpbmRcclxuICAvLyBhIHByZWZpeCB0aGF0IGZpdHMsIG9yIHdlIHJ1biBvdXQgb2YgY29tcG9uZW50cyB0byByZW1vdmUuXHJcbiAgdmFyIGxldmVsID0gMDtcclxuICB3aGlsZSAoYVBhdGguaW5kZXhPZihhUm9vdCArICcvJykgIT09IDApIHtcclxuICAgIHZhciBpbmRleCA9IGFSb290Lmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHRoZSBvbmx5IHBhcnQgb2YgdGhlIHJvb3QgdGhhdCBpcyBsZWZ0IGlzIHRoZSBzY2hlbWUgKGkuZS4gaHR0cDovLyxcclxuICAgIC8vIGZpbGU6Ly8vLCBldGMuKSwgb25lIG9yIG1vcmUgc2xhc2hlcyAoLyksIG9yIHNpbXBseSBub3RoaW5nIGF0IGFsbCwgd2VcclxuICAgIC8vIGhhdmUgZXhoYXVzdGVkIGFsbCBjb21wb25lbnRzLCBzbyB0aGUgcGF0aCBpcyBub3QgcmVsYXRpdmUgdG8gdGhlIHJvb3QuXHJcbiAgICBhUm9vdCA9IGFSb290LnNsaWNlKDAsIGluZGV4KTtcclxuICAgIGlmIChhUm9vdC5tYXRjaCgvXihbXlxcL10rOlxcLyk/XFwvKiQvKSkge1xyXG4gICAgICByZXR1cm4gYVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgKytsZXZlbDtcclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB3ZSBhZGQgYSBcIi4uL1wiIGZvciBlYWNoIGNvbXBvbmVudCB3ZSByZW1vdmVkIGZyb20gdGhlIHJvb3QuXHJcbiAgcmV0dXJuIEFycmF5KGxldmVsICsgMSkuam9pbihcIi4uL1wiKSArIGFQYXRoLnN1YnN0cihhUm9vdC5sZW5ndGggKyAxKTtcclxufVxyXG5leHBvcnRzLnJlbGF0aXZlID0gcmVsYXRpdmU7XHJcblxyXG52YXIgc3VwcG9ydHNOdWxsUHJvdG8gPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIHJldHVybiAhKCdfX3Byb3RvX18nIGluIG9iaik7XHJcbn0oKSk7XHJcblxyXG5mdW5jdGlvbiBpZGVudGl0eSAocykge1xyXG4gIHJldHVybiBzO1xyXG59XHJcblxyXG4vKipcclxuICogQmVjYXVzZSBiZWhhdmlvciBnb2VzIHdhY2t5IHdoZW4geW91IHNldCBgX19wcm90b19fYCBvbiBvYmplY3RzLCB3ZVxyXG4gKiBoYXZlIHRvIHByZWZpeCBhbGwgdGhlIHN0cmluZ3MgaW4gb3VyIHNldCB3aXRoIGFuIGFyYml0cmFyeSBjaGFyYWN0ZXIuXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL3B1bGwvMzEgYW5kXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3NvdXJjZS1tYXAvaXNzdWVzLzMwXHJcbiAqXHJcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxyXG4gKi9cclxuZnVuY3Rpb24gdG9TZXRTdHJpbmcoYVN0cikge1xyXG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XHJcbiAgICByZXR1cm4gJyQnICsgYVN0cjtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMudG9TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogdG9TZXRTdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBmcm9tU2V0U3RyaW5nKGFTdHIpIHtcclxuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xyXG4gICAgcmV0dXJuIGFTdHIuc2xpY2UoMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYVN0cjtcclxufVxyXG5leHBvcnRzLmZyb21TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogZnJvbVNldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGlzUHJvdG9TdHJpbmcocykge1xyXG4gIGlmICghcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdmFyIGxlbmd0aCA9IHMubGVuZ3RoO1xyXG5cclxuICBpZiAobGVuZ3RoIDwgOSAvKiBcIl9fcHJvdG9fX1wiLmxlbmd0aCAqLykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHMuY2hhckNvZGVBdChsZW5ndGggLSAxKSAhPT0gOTUgIC8qICdfJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMikgIT09IDk1ICAvKiAnXycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDMpICE9PSAxMTEgLyogJ28nICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA0KSAhPT0gMTE2IC8qICd0JyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNSkgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDYpICE9PSAxMTQgLyogJ3InICovIHx8XHJcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA3KSAhPT0gMTEyIC8qICdwJyAqLyB8fFxyXG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gOCkgIT09IDk1ICAvKiAnXycgKi8gfHxcclxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDkpICE9PSA5NSAgLyogJ18nICovKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTA7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBpZiAocy5jaGFyQ29kZUF0KGkpICE9PSAzNiAvKiAnJCcgKi8pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdoZXJlIHRoZSBvcmlnaW5hbCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgb3JpZ2luYWwgc291cmNlL2xpbmUvY29sdW1uLCBidXQgZGlmZmVyZW50IGdlbmVyYXRlZFxyXG4gKiBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYSBtYXBwaW5nIHdpdGggYVxyXG4gKiBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XHJcbiAgdmFyIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMgPSBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggZGVmbGF0ZWQgc291cmNlIGFuZCBuYW1lIGluZGljZXMgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiwgYnV0IGRpZmZlcmVudFxyXG4gKiBzb3VyY2UvbmFtZS9vcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYVxyXG4gKiBtYXBwaW5nIHdpdGggYSBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xyXG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDAgfHwgb25seUNvbXBhcmVHZW5lcmF0ZWQpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkO1xyXG5cclxuZnVuY3Rpb24gc3RyY21wKGFTdHIxLCBhU3RyMikge1xyXG4gIGlmIChhU3RyMSA9PT0gYVN0cjIpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIxID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gMTsgLy8gYVN0cjIgIT09IG51bGxcclxuICB9XHJcblxyXG4gIGlmIChhU3RyMiA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIC0xOyAvLyBhU3RyMSAhPT0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIxID4gYVN0cjIpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIC0xO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGluZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBzdHJpbmdzIHdoZXJlXHJcbiAqIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb25zIGFyZSBjb21wYXJlZC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmdBLCBtYXBwaW5nQikge1xyXG4gIHZhciBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRMaW5lIC0gbWFwcGluZ0IuZ2VuZXJhdGVkTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbExpbmUgLSBtYXBwaW5nQi5vcmlnaW5hbExpbmU7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZCA9IGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkO1xyXG5cclxuLyoqXHJcbiAqIFN0cmlwIGFueSBKU09OIFhTU0kgYXZvaWRhbmNlIHByZWZpeCBmcm9tIHRoZSBzdHJpbmcgKGFzIGRvY3VtZW50ZWRcclxuICogaW4gdGhlIHNvdXJjZSBtYXBzIHNwZWNpZmljYXRpb24pLCBhbmQgdGhlbiBwYXJzZSB0aGUgc3RyaW5nIGFzXHJcbiAqIEpTT04uXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVNvdXJjZU1hcElucHV0KHN0cikge1xyXG4gIHJldHVybiBKU09OLnBhcnNlKHN0ci5yZXBsYWNlKC9eXFwpXX0nW15cXG5dKlxcbi8sICcnKSk7XHJcbn1cclxuZXhwb3J0cy5wYXJzZVNvdXJjZU1hcElucHV0ID0gcGFyc2VTb3VyY2VNYXBJbnB1dDtcclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHRoZSBVUkwgb2YgYSBzb3VyY2UgZ2l2ZW4gdGhlIHRoZSBzb3VyY2Ugcm9vdCwgdGhlIHNvdXJjZSdzXHJcbiAqIFVSTCwgYW5kIHRoZSBzb3VyY2UgbWFwJ3MgVVJMLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkge1xyXG4gIHNvdXJjZVVSTCA9IHNvdXJjZVVSTCB8fCAnJztcclxuXHJcbiAgaWYgKHNvdXJjZVJvb3QpIHtcclxuICAgIC8vIFRoaXMgZm9sbG93cyB3aGF0IENocm9tZSBkb2VzLlxyXG4gICAgaWYgKHNvdXJjZVJvb3Rbc291cmNlUm9vdC5sZW5ndGggLSAxXSAhPT0gJy8nICYmIHNvdXJjZVVSTFswXSAhPT0gJy8nKSB7XHJcbiAgICAgIHNvdXJjZVJvb3QgKz0gJy8nO1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAgIC8vICAgTGluZSA0OiBBbiBvcHRpb25hbCBzb3VyY2Ugcm9vdCwgdXNlZnVsIGZvciByZWxvY2F0aW5nIHNvdXJjZVxyXG4gICAgLy8gICBmaWxlcyBvbiBhIHNlcnZlciBvciByZW1vdmluZyByZXBlYXRlZCB2YWx1ZXMgaW4gdGhlXHJcbiAgICAvLyAgIOKAnHNvdXJjZXPigJ0gZW50cnkuICBUaGlzIHZhbHVlIGlzIHByZXBlbmRlZCB0byB0aGUgaW5kaXZpZHVhbFxyXG4gICAgLy8gICBlbnRyaWVzIGluIHRoZSDigJxzb3VyY2XigJ0gZmllbGQuXHJcbiAgICBzb3VyY2VVUkwgPSBzb3VyY2VSb290ICsgc291cmNlVVJMO1xyXG4gIH1cclxuXHJcbiAgLy8gSGlzdG9yaWNhbGx5LCBTb3VyY2VNYXBDb25zdW1lciBkaWQgbm90IHRha2UgdGhlIHNvdXJjZU1hcFVSTCBhc1xyXG4gIC8vIGEgcGFyYW1ldGVyLiAgVGhpcyBtb2RlIGlzIHN0aWxsIHNvbWV3aGF0IHN1cHBvcnRlZCwgd2hpY2ggaXMgd2h5XHJcbiAgLy8gdGhpcyBjb2RlIGJsb2NrIGlzIGNvbmRpdGlvbmFsLiAgSG93ZXZlciwgaXQncyBwcmVmZXJhYmxlIHRvIHBhc3NcclxuICAvLyB0aGUgc291cmNlIG1hcCBVUkwgdG8gU291cmNlTWFwQ29uc3VtZXIsIHNvIHRoYXQgdGhpcyBmdW5jdGlvblxyXG4gIC8vIGNhbiBpbXBsZW1lbnQgdGhlIHNvdXJjZSBVUkwgcmVzb2x1dGlvbiBhbGdvcml0aG0gYXMgb3V0bGluZWQgaW5cclxuICAvLyB0aGUgc3BlYy4gIFRoaXMgYmxvY2sgaXMgYmFzaWNhbGx5IHRoZSBlcXVpdmFsZW50IG9mOlxyXG4gIC8vICAgIG5ldyBVUkwoc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpLnRvU3RyaW5nKClcclxuICAvLyAuLi4gZXhjZXB0IGl0IGF2b2lkcyB1c2luZyBVUkwsIHdoaWNoIHdhc24ndCBhdmFpbGFibGUgaW4gdGhlXHJcbiAgLy8gb2xkZXIgcmVsZWFzZXMgb2Ygbm9kZSBzdGlsbCBzdXBwb3J0ZWQgYnkgdGhpcyBsaWJyYXJ5LlxyXG4gIC8vXHJcbiAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAvLyAgIElmIHRoZSBzb3VyY2VzIGFyZSBub3QgYWJzb2x1dGUgVVJMcyBhZnRlciBwcmVwZW5kaW5nIG9mIHRoZVxyXG4gIC8vICAg4oCcc291cmNlUm9vdOKAnSwgdGhlIHNvdXJjZXMgYXJlIHJlc29sdmVkIHJlbGF0aXZlIHRvIHRoZVxyXG4gIC8vICAgU291cmNlTWFwIChsaWtlIHJlc29sdmluZyBzY3JpcHQgc3JjIGluIGEgaHRtbCBkb2N1bWVudCkuXHJcbiAgaWYgKHNvdXJjZU1hcFVSTCkge1xyXG4gICAgdmFyIHBhcnNlZCA9IHVybFBhcnNlKHNvdXJjZU1hcFVSTCk7XHJcbiAgICBpZiAoIXBhcnNlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzb3VyY2VNYXBVUkwgY291bGQgbm90IGJlIHBhcnNlZFwiKTtcclxuICAgIH1cclxuICAgIGlmIChwYXJzZWQucGF0aCkge1xyXG4gICAgICAvLyBTdHJpcCB0aGUgbGFzdCBwYXRoIGNvbXBvbmVudCwgYnV0IGtlZXAgdGhlIFwiL1wiLlxyXG4gICAgICB2YXIgaW5kZXggPSBwYXJzZWQucGF0aC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIHBhcnNlZC5wYXRoID0gcGFyc2VkLnBhdGguc3Vic3RyaW5nKDAsIGluZGV4ICsgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvdXJjZVVSTCA9IGpvaW4odXJsR2VuZXJhdGUocGFyc2VkKSwgc291cmNlVVJMKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemUoc291cmNlVVJMKTtcclxufVxyXG5leHBvcnRzLmNvbXB1dGVTb3VyY2VVUkwgPSBjb21wdXRlU291cmNlVVJMO1xyXG4iLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDE0IE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxyXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5cclxudmFyIGxpYlV0aWwgPSByZXF1aXJlKCcuLi9saWIvdXRpbCcpO1xyXG5cclxuZXhwb3J0c1sndGVzdCB1cmxzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgdmFyIGFzc2VydFVybCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgIGFzc2VydC5lcXVhbCh1cmwsIGxpYlV0aWwudXJsR2VuZXJhdGUobGliVXRpbC51cmxQYXJzZSh1cmwpKSk7XHJcbiAgfTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly8nKTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcclxuICBhc3NlcnRVcmwoJ2h0dHA6Ly91c2VyOnBhc3NAd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0VXJsKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tOjgwJyk7XHJcbiAgYXNzZXJ0VXJsKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tLycpO1xyXG4gIGFzc2VydFVybCgnaHR0cDovL3d3dy5leGFtcGxlLmNvbS9mb28vYmFyJyk7XHJcbiAgYXNzZXJ0VXJsKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tL2Zvby9iYXIvJyk7XHJcbiAgYXNzZXJ0VXJsKCdodHRwOi8vdXNlcjpwYXNzQHd3dy5leGFtcGxlLmNvbTo4MC9mb28vYmFyLycpO1xyXG5cclxuICBhc3NlcnRVcmwoJy8vJyk7XHJcbiAgYXNzZXJ0VXJsKCcvL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydFVybCgnZmlsZTovLy93d3cuZXhhbXBsZS5jb20nKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJycpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnLicpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnLi4nKSwgbnVsbCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJ2EnKSwgbnVsbCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJ2EvYicpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnYS8vYicpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnL2EnKSwgbnVsbCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJ2RhdGE6Zm9vLGJhcicpLCBudWxsKTtcclxuXHJcbiAgdmFyIHBhcnNlZCA9IGxpYlV0aWwudXJsUGFyc2UoJ2h0dHA6Ly94LXkuY29tL2JhcicpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQuc2NoZW1lLCAnaHR0cCcpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQuaG9zdCwgJ3gteS5jb20nKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLnBhdGgsICcvYmFyJyk7XHJcblxyXG4gIHZhciB3ZWJwYWNrVVJMID0gJ3dlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjdlMTg0Zjk2Nzk3MzMyOThkNDQnXHJcbiAgcGFyc2VkID0gbGliVXRpbC51cmxQYXJzZSh3ZWJwYWNrVVJMKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLnNjaGVtZSwgJ3dlYnBhY2snKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLmhvc3QsICcnKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLnBhdGgsICcvd2VicGFjay9ib290c3RyYXAgNjdlMTg0Zjk2Nzk3MzMyOThkNDQnKTtcclxuICBhc3NlcnQuZXF1YWwod2VicGFja1VSTCwgbGliVXRpbC51cmxHZW5lcmF0ZShwYXJzZWQpKTtcclxufTtcclxuXHJcbmV4cG9ydHNbJ3Rlc3Qgbm9ybWFsaXplKCknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy8uLicpLCAnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4uLycpLCAnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4uLy4uLy4uLy4uJyksICcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi4vLi4vLi4vLi4vYS9iL2MnKSwgJy9hL2IvYycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnL2EvYi9jLy4uLy4uLy4uL2QvLi4vLi4vZScpLCAnL2UnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLicpLCAnLi4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4uLycpLCAnLi4vJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLi8uLi9hLycpLCAnLi4vLi4vYS8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2EvLi4nKSwgJy4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2EvLi4vLi4vLi4nKSwgJy4uLy4uJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4nKSwgJy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy8uLycpLCAnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4vLi8uLy4nKSwgJy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy8uLy4vLi8uL2EvYi9jJyksICcvYS9iL2MnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy9hL2IvYy8uLy4vLi9kLy4vLi9lJyksICcvYS9iL2MvZC9lJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLycpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLi8uL2EnKSwgJ2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2EvLi8nKSwgJ2EvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdhLy4vLi8uJyksICdhJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnL2EvYi8vYy8vLy9kLy8vLy8nKSwgJy9hL2IvYy9kLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy8vYS9iLy9jLy8vL2QvLy8vLycpLCAnLy8vYS9iL2MvZC8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2EvYi8vYy8vLy9kJyksICdhL2IvYy9kJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLi8vLy4uLy4vLi4vYS9iLy8uLy4uJyksICcuLi8uLi9hJylcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tLycpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbS8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vLi8uLi8vYS9iL2MvLi4vLi9kLy8nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vYS9iL2QvJyk7XHJcbn07XHJcblxyXG5leHBvcnRzWyd0ZXN0IGpvaW4oKSddID0gZnVuY3Rpb24gKGFzc2VydCkge1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnYicpLCAnYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8nLCAnYicpLCAnYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8vJywgJ2InKSwgJ2EvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnYi8nKSwgJ2EvYi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJ2IvLycpLCAnYS9iLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvJywgJy9iJyksICcvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvLycsICcvL2InKSwgJy8vYicpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJy4uJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICcuLi9iJyksICdiJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS9iJywgJy4uL2MnKSwgJ2EvYycpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJy4nKSwgJ2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJy4vYicpLCAnYS9iJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS9iJywgJy4vYycpLCAnYS9iL2MnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdkYXRhOmZvbyxiYXInKSwgJ2RhdGE6Zm9vLGJhcicpO1xyXG5cclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJ2InKSwgJ2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJ2InKSwgJ2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnYi8nKSwgJ2IvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICdiLycpLCAnYi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnYi8vJyksICdiLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnYi8vJyksICdiLycpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnLi4nKSwgJy4uJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuLicpLCAnLi4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnLi4vYicpLCAnLi4vYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnLi4vYicpLCAnLi4vYicpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnLicpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnLicpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcuL2InKSwgJ2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJy4vYicpLCAnYicpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICdkYXRhOmZvbyxiYXInKSwgJ2RhdGE6Zm9vLGJhcicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnZGF0YTpmb28sYmFyJyksICdkYXRhOmZvbyxiYXInKTtcclxuXHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2InKSwgJy4uL2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICdiLycpLCAnLi4vYi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICdiLy8nKSwgJy4uL2IvJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJy4uJyksICcuLi8uLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJy4uL2InKSwgJy4uLy4uL2InKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnLicpLCAnLi4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICcuL2InKSwgJy4uL2InKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2RhdGE6Zm9vLGJhcicpLCAnZGF0YTpmb28sYmFyJyk7XHJcblxyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJycpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnLicpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvJywgJycpLCAnYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvJywgJy4nKSwgJ2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLy8nLCAnJyksICdhJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8vJywgJy4nKSwgJ2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcvYScsICcnKSwgJy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignL2EnLCAnLicpLCAnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnJyksICcuJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcnKSwgJy4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJycpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnLicpLCAnLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJycpLCAnLi4nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICcuJyksICcuLicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8nLCAnJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8nLCAnLicpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvLycsICcnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hLy8nLCAnLicpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnJywgJycpLCAnaHR0cDovL2Zvby5vcmcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcnLCAnLicpLCAnaHR0cDovL2Zvby5vcmcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvJywgJycpLCAnaHR0cDovL2Zvby5vcmcvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLy8nLCAnJyksICdodHRwOi8vZm9vLm9yZy8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8vJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy8vd3d3LmV4YW1wbGUuY29tJywgJycpLCAnLy93d3cuZXhhbXBsZS5jb20vJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLy93d3cuZXhhbXBsZS5jb20nLCAnLicpLCAnLy93d3cuZXhhbXBsZS5jb20vJyk7XHJcblxyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJ2InKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvJywgJ2InKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvLycsICdiJyksICdodHRwOi8vZm9vLm9yZy9hL2InKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJ2IvJyksICdodHRwOi8vZm9vLm9yZy9hL2IvJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICdiLy8nKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYi8nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hLycsICcvYicpLCAnaHR0cDovL2Zvby5vcmcvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvLycsICcvL2InKSwgJ2h0dHA6Ly9iJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnLi4nKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnLi4vYicpLCAnaHR0cDovL2Zvby5vcmcvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvYicsICcuLi9jJyksICdodHRwOi8vZm9vLm9yZy9hL2MnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuL2InKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYicpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvYicsICcuL2MnKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYi9jJyk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnZGF0YTpmb28sYmFyJyksICdkYXRhOmZvbyxiYXInKTtcclxuXHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnJywgJ2EnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8nLCAnYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLy8nLCAnYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnJywgJy9hJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvJywgJy9hJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvLycsICcvYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xyXG5cclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovLycsICd3d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdmaWxlOi8vLycsICd3d3cuZXhhbXBsZS5jb20nKSwgJ2ZpbGU6Ly8vd3d3LmV4YW1wbGUuY29tJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovLycsICdmdHA6Ly9leGFtcGxlLmNvbScpLCAnZnRwOi8vZXhhbXBsZS5jb20nKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL3d3dy5leGFtcGxlLmNvbScsICcvL2Zvby5vcmcvYmFyJyksICdodHRwOi8vZm9vLm9yZy9iYXInKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcvL3d3dy5leGFtcGxlLmNvbScsICcvL2Zvby5vcmcvYmFyJyksICcvL2Zvby5vcmcvYmFyJyk7XHJcbn07XHJcblxyXG4vLyBUT0RPIElzc3VlICMxMjg6IERlZmluZSBhbmQgdGVzdCB0aGlzIGZ1bmN0aW9uIHByb3Blcmx5LlxyXG5leHBvcnRzWyd0ZXN0IHJlbGF0aXZlKCknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnL3RoZS9yb290JywgJy90aGUvcm9vdC9vbmUuanMnKSwgJ29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCdodHRwOi8vdGhlL3Jvb3QnLCAnaHR0cDovL3RoZS9yb290L29uZS5qcycpLCAnb25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy90aGUvcm9vdCcsICcvdGhlL3Jvb3RvbmUuanMnKSwgJy4uL3Jvb3RvbmUuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnaHR0cDovL3RoZS9yb290JywgJ2h0dHA6Ly90aGUvcm9vdG9uZS5qcycpLCAnLi4vcm9vdG9uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcvdGhlL3Jvb3QnLCAnL3RoZXJvb3RvbmUuanMnKSwgJy90aGVyb290b25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJ2h0dHA6Ly90aGUvcm9vdCcsICcvdGhlcm9vdG9uZS5qcycpLCAnL3RoZXJvb3RvbmUuanMnKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJycsICcvdGhlL3Jvb3Qvb25lLmpzJyksICcvdGhlL3Jvb3Qvb25lLmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy4nLCAnL3RoZS9yb290L29uZS5qcycpLCAnL3RoZS9yb290L29uZS5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcnLCAndGhlL3Jvb3Qvb25lLmpzJyksICd0aGUvcm9vdC9vbmUuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnLicsICd0aGUvcm9vdC9vbmUuanMnKSwgJ3RoZS9yb290L29uZS5qcycpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnLycsICcvdGhlL3Jvb3Qvb25lLmpzJyksICd0aGUvcm9vdC9vbmUuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnLycsICd0aGUvcm9vdC9vbmUuanMnKSwgJ3RoZS9yb290L29uZS5qcycpO1xyXG59O1xyXG5cclxuZXhwb3J0c1sndGVzdCBjb21wdXRlU291cmNlVVJMJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XHJcbiAgLy8gVGVzdHMgd2l0aCBzb3VyY2VNYXBVUkwuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnJywgJ3NyYy90ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCh1bmRlZmluZWQsICdzcmMvdGVzdC5qcycsICdodHRwOi8vZXhhbXBsZS5jb20nKSxcclxuICAgICAgICAgICAgICAgJ2h0dHA6Ly9leGFtcGxlLmNvbS9zcmMvdGVzdC5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJ3NyYycsICd0ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjLycsICd0ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJy90ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnaHR0cDovL21vemlsbGEuY29tJywgJ3NyYy90ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL21vemlsbGEuY29tL3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnJywgJ3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzLm1hcCcpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XHJcblxyXG4gIC8vIExlZ2FjeSBjb2RlIHdvbid0IHBhc3MgaW4gdGhlIHNvdXJjZU1hcFVSTC5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCcnLCAnc3JjL3Rlc3QuanMnKSwgJ3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCh1bmRlZmluZWQsICdzcmMvdGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMnLCAndGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMvJywgJ3Rlc3QuanMnKSwgJ3NyYy90ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJy90ZXN0LmpzJyksICdzcmMvdGVzdC5qcycpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJ3NyYycsICcuLi90ZXN0LmpzJyksICd0ZXN0LmpzJyk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjL2RpcicsICcuLi8uLy4vLi4vdGVzdC5qcycpLCAndGVzdC5qcycpO1xyXG5cclxuICAvLyBUaGlzIGdpdmVzIGRpZmZlcmVudCByZXN1bHRzIHdpdGggdGhlIG9sZCBhbGdvcml0aG0gYW5kIHRoZSBuZXdcclxuICAvLyBzcGVjLWNvbXBsaWFudCBhbGdvcml0aG0uXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnaHR0cDovL2V4YW1wbGUuY29tL2RpcicsICcvdGVzdC5qcycpLFxyXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL2Rpci90ZXN0LmpzJyk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=