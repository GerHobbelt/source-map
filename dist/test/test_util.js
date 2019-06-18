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

exports["test urls"] = function(assert) {
  var assertUrl = function(url) {
    assert.equal(url, libUtil.urlGenerate(libUtil.urlParse(url)));
  };
  assertUrl("http://");
  assertUrl("http://www.example.com");
  assertUrl("http://user:pass@www.example.com");
  assertUrl("http://www.example.com:80");
  assertUrl("http://www.example.com/");
  assertUrl("http://www.example.com/foo/bar");
  assertUrl("http://www.example.com/foo/bar/");
  assertUrl("http://user:pass@www.example.com:80/foo/bar/");

  assertUrl("//");
  assertUrl("//www.example.com");
  assertUrl("file:///www.example.com");

  assert.equal(libUtil.urlParse(""), null);
  assert.equal(libUtil.urlParse("."), null);
  assert.equal(libUtil.urlParse(".."), null);
  assert.equal(libUtil.urlParse("a"), null);
  assert.equal(libUtil.urlParse("a/b"), null);
  assert.equal(libUtil.urlParse("a//b"), null);
  assert.equal(libUtil.urlParse("/a"), null);
  assert.equal(libUtil.urlParse("data:foo,bar"), null);

  var parsed = libUtil.urlParse("http://x-y.com/bar");
  assert.equal(parsed.scheme, "http");
  assert.equal(parsed.host, "x-y.com");
  assert.equal(parsed.path, "/bar");

  var webpackURL = "webpack:///webpack/bootstrap 67e184f9679733298d44";
  parsed = libUtil.urlParse(webpackURL);
  assert.equal(parsed.scheme, "webpack");
  assert.equal(parsed.host, "");
  assert.equal(parsed.path, "/webpack/bootstrap 67e184f9679733298d44");
  assert.equal(webpackURL, libUtil.urlGenerate(parsed));
};

exports["test normalize()"] = function(assert) {
  assert.equal(libUtil.normalize("/.."), "/");
  assert.equal(libUtil.normalize("/../"), "/");
  assert.equal(libUtil.normalize("/../../../.."), "/");
  assert.equal(libUtil.normalize("/../../../../a/b/c"), "/a/b/c");
  assert.equal(libUtil.normalize("/a/b/c/../../../d/../../e"), "/e");

  assert.equal(libUtil.normalize(".."), "..");
  assert.equal(libUtil.normalize("../"), "../");
  assert.equal(libUtil.normalize("../../a/"), "../../a/");
  assert.equal(libUtil.normalize("a/.."), ".");
  assert.equal(libUtil.normalize("a/../../.."), "../..");

  assert.equal(libUtil.normalize("/."), "/");
  assert.equal(libUtil.normalize("/./"), "/");
  assert.equal(libUtil.normalize("/./././."), "/");
  assert.equal(libUtil.normalize("/././././a/b/c"), "/a/b/c");
  assert.equal(libUtil.normalize("/a/b/c/./././d/././e"), "/a/b/c/d/e");

  assert.equal(libUtil.normalize(""), ".");
  assert.equal(libUtil.normalize("."), ".");
  assert.equal(libUtil.normalize("./"), ".");
  assert.equal(libUtil.normalize("././a"), "a");
  assert.equal(libUtil.normalize("a/./"), "a/");
  assert.equal(libUtil.normalize("a/././."), "a");

  assert.equal(libUtil.normalize("/a/b//c////d/////"), "/a/b/c/d/");
  assert.equal(libUtil.normalize("///a/b//c////d/////"), "///a/b/c/d/");
  assert.equal(libUtil.normalize("a/b//c////d"), "a/b/c/d");

  assert.equal(libUtil.normalize(".///.././../a/b//./.."), "../../a");

  assert.equal(
    libUtil.normalize("http://www.example.com"),
    "http://www.example.com"
  );
  assert.equal(
    libUtil.normalize("http://www.example.com/"),
    "http://www.example.com/"
  );
  assert.equal(
    libUtil.normalize("http://www.example.com/./..//a/b/c/.././d//"),
    "http://www.example.com/a/b/d/"
  );
};

exports["test join()"] = function(assert) {
  assert.equal(libUtil.join("a", "b"), "a/b");
  assert.equal(libUtil.join("a/", "b"), "a/b");
  assert.equal(libUtil.join("a//", "b"), "a/b");
  assert.equal(libUtil.join("a", "b/"), "a/b/");
  assert.equal(libUtil.join("a", "b//"), "a/b/");
  assert.equal(libUtil.join("a/", "/b"), "/b");
  assert.equal(libUtil.join("a//", "//b"), "//b");

  assert.equal(libUtil.join("a", ".."), ".");
  assert.equal(libUtil.join("a", "../b"), "b");
  assert.equal(libUtil.join("a/b", "../c"), "a/c");

  assert.equal(libUtil.join("a", "."), "a");
  assert.equal(libUtil.join("a", "./b"), "a/b");
  assert.equal(libUtil.join("a/b", "./c"), "a/b/c");

  assert.equal(
    libUtil.join("a", "http://www.example.com"),
    "http://www.example.com"
  );
  assert.equal(libUtil.join("a", "data:foo,bar"), "data:foo,bar");

  assert.equal(libUtil.join("", "b"), "b");
  assert.equal(libUtil.join(".", "b"), "b");
  assert.equal(libUtil.join("", "b/"), "b/");
  assert.equal(libUtil.join(".", "b/"), "b/");
  assert.equal(libUtil.join("", "b//"), "b/");
  assert.equal(libUtil.join(".", "b//"), "b/");

  assert.equal(libUtil.join("", ".."), "..");
  assert.equal(libUtil.join(".", ".."), "..");
  assert.equal(libUtil.join("", "../b"), "../b");
  assert.equal(libUtil.join(".", "../b"), "../b");

  assert.equal(libUtil.join("", "."), ".");
  assert.equal(libUtil.join(".", "."), ".");
  assert.equal(libUtil.join("", "./b"), "b");
  assert.equal(libUtil.join(".", "./b"), "b");

  assert.equal(
    libUtil.join("", "http://www.example.com"),
    "http://www.example.com"
  );
  assert.equal(
    libUtil.join(".", "http://www.example.com"),
    "http://www.example.com"
  );
  assert.equal(libUtil.join("", "data:foo,bar"), "data:foo,bar");
  assert.equal(libUtil.join(".", "data:foo,bar"), "data:foo,bar");

  assert.equal(libUtil.join("..", "b"), "../b");
  assert.equal(libUtil.join("..", "b/"), "../b/");
  assert.equal(libUtil.join("..", "b//"), "../b/");

  assert.equal(libUtil.join("..", ".."), "../..");
  assert.equal(libUtil.join("..", "../b"), "../../b");

  assert.equal(libUtil.join("..", "."), "..");
  assert.equal(libUtil.join("..", "./b"), "../b");

  assert.equal(
    libUtil.join("..", "http://www.example.com"),
    "http://www.example.com"
  );
  assert.equal(libUtil.join("..", "data:foo,bar"), "data:foo,bar");

  assert.equal(libUtil.join("a", ""), "a");
  assert.equal(libUtil.join("a", "."), "a");
  assert.equal(libUtil.join("a/", ""), "a");
  assert.equal(libUtil.join("a/", "."), "a");
  assert.equal(libUtil.join("a//", ""), "a");
  assert.equal(libUtil.join("a//", "."), "a");
  assert.equal(libUtil.join("/a", ""), "/a");
  assert.equal(libUtil.join("/a", "."), "/a");
  assert.equal(libUtil.join("", ""), ".");
  assert.equal(libUtil.join(".", ""), ".");
  assert.equal(libUtil.join(".", ""), ".");
  assert.equal(libUtil.join(".", "."), ".");
  assert.equal(libUtil.join("..", ""), "..");
  assert.equal(libUtil.join("..", "."), "..");
  assert.equal(libUtil.join("http://foo.org/a", ""), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/a", "."), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/a/", ""), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/a/", "."), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/a//", ""), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/a//", "."), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org", ""), "http://foo.org/");
  assert.equal(libUtil.join("http://foo.org", "."), "http://foo.org/");
  assert.equal(libUtil.join("http://foo.org/", ""), "http://foo.org/");
  assert.equal(libUtil.join("http://foo.org/", "."), "http://foo.org/");
  assert.equal(libUtil.join("http://foo.org//", ""), "http://foo.org/");
  assert.equal(libUtil.join("http://foo.org//", "."), "http://foo.org/");
  assert.equal(libUtil.join("//www.example.com", ""), "//www.example.com/");
  assert.equal(libUtil.join("//www.example.com", "."), "//www.example.com/");

  assert.equal(libUtil.join("http://foo.org/a", "b"), "http://foo.org/a/b");
  assert.equal(libUtil.join("http://foo.org/a/", "b"), "http://foo.org/a/b");
  assert.equal(libUtil.join("http://foo.org/a//", "b"), "http://foo.org/a/b");
  assert.equal(libUtil.join("http://foo.org/a", "b/"), "http://foo.org/a/b/");
  assert.equal(libUtil.join("http://foo.org/a", "b//"), "http://foo.org/a/b/");
  assert.equal(libUtil.join("http://foo.org/a/", "/b"), "http://foo.org/b");
  assert.equal(libUtil.join("http://foo.org/a//", "//b"), "http://b");

  assert.equal(libUtil.join("http://foo.org/a", ".."), "http://foo.org/");
  assert.equal(libUtil.join("http://foo.org/a", "../b"), "http://foo.org/b");
  assert.equal(
    libUtil.join("http://foo.org/a/b", "../c"),
    "http://foo.org/a/c"
  );

  assert.equal(libUtil.join("http://foo.org/a", "."), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/a", "./b"), "http://foo.org/a/b");
  assert.equal(
    libUtil.join("http://foo.org/a/b", "./c"),
    "http://foo.org/a/b/c"
  );

  assert.equal(
    libUtil.join("http://foo.org/a", "http://www.example.com"),
    "http://www.example.com"
  );
  assert.equal(
    libUtil.join("http://foo.org/a", "data:foo,bar"),
    "data:foo,bar"
  );

  assert.equal(libUtil.join("http://foo.org", "a"), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/", "a"), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org//", "a"), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org", "/a"), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org/", "/a"), "http://foo.org/a");
  assert.equal(libUtil.join("http://foo.org//", "/a"), "http://foo.org/a");

  assert.equal(
    libUtil.join("http://", "www.example.com"),
    "http://www.example.com"
  );
  assert.equal(
    libUtil.join("file:///", "www.example.com"),
    "file:///www.example.com"
  );
  assert.equal(
    libUtil.join("http://", "ftp://example.com"),
    "ftp://example.com"
  );

  assert.equal(
    libUtil.join("http://www.example.com", "//foo.org/bar"),
    "http://foo.org/bar"
  );
  assert.equal(
    libUtil.join("//www.example.com", "//foo.org/bar"),
    "//foo.org/bar"
  );
};

// TODO Issue #128: Define and test this function properly.
exports["test relative()"] = function(assert) {
  assert.equal(libUtil.relative("/the/root", "/the/root/one.js"), "one.js");
  assert.equal(
    libUtil.relative("http://the/root", "http://the/root/one.js"),
    "one.js"
  );
  assert.equal(
    libUtil.relative("/the/root", "/the/rootone.js"),
    "../rootone.js"
  );
  assert.equal(
    libUtil.relative("http://the/root", "http://the/rootone.js"),
    "../rootone.js"
  );
  assert.equal(
    libUtil.relative("/the/root", "/therootone.js"),
    "/therootone.js"
  );
  assert.equal(
    libUtil.relative("http://the/root", "/therootone.js"),
    "/therootone.js"
  );

  assert.equal(libUtil.relative("", "/the/root/one.js"), "/the/root/one.js");
  assert.equal(libUtil.relative(".", "/the/root/one.js"), "/the/root/one.js");
  assert.equal(libUtil.relative("", "the/root/one.js"), "the/root/one.js");
  assert.equal(libUtil.relative(".", "the/root/one.js"), "the/root/one.js");

  assert.equal(libUtil.relative("/", "/the/root/one.js"), "the/root/one.js");
  assert.equal(libUtil.relative("/", "the/root/one.js"), "the/root/one.js");
};

exports["test computeSourceURL"] = function(assert) {
  // Tests with sourceMapURL.
  assert.equal(
    libUtil.computeSourceURL("", "src/test.js", "http://example.com"),
    "http://example.com/src/test.js"
  );
  assert.equal(
    libUtil.computeSourceURL(undefined, "src/test.js", "http://example.com"),
    "http://example.com/src/test.js"
  );
  assert.equal(
    libUtil.computeSourceURL("src", "test.js", "http://example.com"),
    "http://example.com/src/test.js"
  );
  assert.equal(
    libUtil.computeSourceURL("src/", "test.js", "http://example.com"),
    "http://example.com/src/test.js"
  );
  assert.equal(
    libUtil.computeSourceURL("src", "/test.js", "http://example.com"),
    "http://example.com/src/test.js"
  );
  assert.equal(
    libUtil.computeSourceURL(
      "http://mozilla.com",
      "src/test.js",
      "http://example.com"
    ),
    "http://mozilla.com/src/test.js"
  );
  assert.equal(
    libUtil.computeSourceURL(
      "",
      "test.js",
      "http://example.com/src/test.js.map"
    ),
    "http://example.com/src/test.js"
  );

  // Legacy code won't pass in the sourceMapURL.
  assert.equal(libUtil.computeSourceURL("", "src/test.js"), "src/test.js");
  assert.equal(
    libUtil.computeSourceURL(undefined, "src/test.js"),
    "src/test.js"
  );
  assert.equal(libUtil.computeSourceURL("src", "test.js"), "src/test.js");
  assert.equal(libUtil.computeSourceURL("src/", "test.js"), "src/test.js");
  assert.equal(libUtil.computeSourceURL("src", "/test.js"), "src/test.js");
  assert.equal(libUtil.computeSourceURL("src", "../test.js"), "test.js");
  assert.equal(
    libUtil.computeSourceURL("src/dir", "../././../test.js"),
    "test.js"
  );

  // This gives different results with the old algorithm and the new
  // spec-compliant algorithm.
  assert.equal(
    libUtil.computeSourceURL("http://example.com/dir", "/test.js"),
    "http://example.com/dir/test.js"
  );
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NPVVJDRV9NQVBfVEVTVF9NT0RVTEUvLi9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9TT1VSQ0VfTUFQX1RFU1RfTU9EVUxFLy4vdGVzdC90ZXN0LXV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JpQkEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxrQ0FBYTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdF91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0L3Rlc3QtdXRpbC5qc1wiKTtcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGhlbHBlciBmdW5jdGlvbiBmb3IgZ2V0dGluZyB2YWx1ZXMgZnJvbSBwYXJhbWV0ZXIvb3B0aW9uc1xyXG4gKiBvYmplY3RzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJncyBUaGUgb2JqZWN0IHdlIGFyZSBleHRyYWN0aW5nIHZhbHVlcyBmcm9tXHJcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSBhcmUgZ2V0dGluZy5cclxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZSBBbiBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gaWYgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmdcclxuICogZnJvbSB0aGUgb2JqZWN0LiBJZiB0aGlzIGlzIG5vdCBzcGVjaWZpZWQgYW5kIHRoZSBwcm9wZXJ0eSBpcyBtaXNzaW5nLCBhblxyXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICovXHJcbmZ1bmN0aW9uIGdldEFyZyhhQXJncywgYU5hbWUsIGFEZWZhdWx0VmFsdWUpIHtcclxuICBpZiAoYU5hbWUgaW4gYUFyZ3MpIHtcclxuICAgIHJldHVybiBhQXJnc1thTmFtZV07XHJcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICByZXR1cm4gYURlZmF1bHRWYWx1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhTmFtZSArICdcIiBpcyBhIHJlcXVpcmVkIGFyZ3VtZW50LicpO1xyXG4gIH1cclxufVxyXG5leHBvcnRzLmdldEFyZyA9IGdldEFyZztcclxuXHJcbnZhciB1cmxSZWdleHAgPSAvXig/OihbXFx3K1xcLS5dKyk6KT9cXC9cXC8oPzooXFx3KzpcXHcrKUApPyhbXFx3Li1dKikoPzo6KFxcZCspKT8oLiopJC87XHJcbnZhciBkYXRhVXJsUmVnZXhwID0gL15kYXRhOi4rXFwsLiskLztcclxuXHJcbmZ1bmN0aW9uIHVybFBhcnNlKGFVcmwpIHtcclxuICB2YXIgbWF0Y2ggPSBhVXJsLm1hdGNoKHVybFJlZ2V4cCk7XHJcbiAgaWYgKCFtYXRjaCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICBzY2hlbWU6IG1hdGNoWzFdLFxyXG4gICAgYXV0aDogbWF0Y2hbMl0sXHJcbiAgICBob3N0OiBtYXRjaFszXSxcclxuICAgIHBvcnQ6IG1hdGNoWzRdLFxyXG4gICAgcGF0aDogbWF0Y2hbNV1cclxuICB9O1xyXG59XHJcbmV4cG9ydHMudXJsUGFyc2UgPSB1cmxQYXJzZTtcclxuXHJcbmZ1bmN0aW9uIHVybEdlbmVyYXRlKGFQYXJzZWRVcmwpIHtcclxuICB2YXIgdXJsID0gXCJcIjtcclxuICBpZiAoYVBhcnNlZFVybC5zY2hlbWUpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLnNjaGVtZSArIFwiOlwiO1xyXG4gIH1cclxuICB1cmwgKz0gXCIvL1wiO1xyXG4gIGlmIChhUGFyc2VkVXJsLmF1dGgpIHtcclxuICAgIHVybCArPSBhUGFyc2VkVXJsLmF1dGggKyBcIkBcIjtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwuaG9zdCkge1xyXG4gICAgdXJsICs9IGFQYXJzZWRVcmwuaG9zdDtcclxuICB9XHJcbiAgaWYgKGFQYXJzZWRVcmwucG9ydCkge1xyXG4gICAgdXJsICs9IFwiOlwiICsgYVBhcnNlZFVybC5wb3J0O1xyXG4gIH1cclxuICBpZiAoYVBhcnNlZFVybC5wYXRoKSB7XHJcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5wYXRoO1xyXG4gIH1cclxuICByZXR1cm4gdXJsO1xyXG59XHJcbmV4cG9ydHMudXJsR2VuZXJhdGUgPSB1cmxHZW5lcmF0ZTtcclxuXHJcbmNvbnN0IE1BWF9DQUNIRURfSU5QVVRTID0gMzI7XHJcblxyXG4vKipcclxuICogVGFrZXMgc29tZSBmdW5jdGlvbiBgZihpbnB1dCkgLT4gcmVzdWx0YCBhbmQgcmV0dXJucyBhIG1lbW9pemVkIHZlcnNpb24gb2ZcclxuICogYGZgLlxyXG4gKlxyXG4gKiBXZSBrZWVwIGF0IG1vc3QgYE1BWF9DQUNIRURfSU5QVVRTYCBtZW1vaXplZCByZXN1bHRzIG9mIGBmYCBhbGl2ZS4gVGhlXHJcbiAqIG1lbW9pemF0aW9uIGlzIGEgZHVtYi1zaW1wbGUsIGxpbmVhciBsZWFzdC1yZWNlbnRseS11c2VkIGNhY2hlLlxyXG4gKi9cclxuZnVuY3Rpb24gbHJ1TWVtb2l6ZShmKSB7XHJcbiAgY29uc3QgY2FjaGUgPSBbXTtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChjYWNoZVtpXS5pbnB1dCA9PT0gaW5wdXQpIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNhY2hlWzBdO1xyXG4gICAgICAgIGNhY2hlWzBdID0gY2FjaGVbaV07XHJcbiAgICAgICAgY2FjaGVbaV0gPSB0ZW1wO1xyXG4gICAgICAgIHJldHVybiBjYWNoZVswXS5yZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gZihpbnB1dCk7XHJcblxyXG4gICAgY2FjaGUudW5zaGlmdCh7XHJcbiAgICAgIGlucHV0LFxyXG4gICAgICByZXN1bHRcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjYWNoZS5sZW5ndGggPiBNQVhfQ0FDSEVEX0lOUFVUUykge1xyXG4gICAgICBjYWNoZS5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGEgcGF0aCwgb3IgdGhlIHBhdGggcG9ydGlvbiBvZiBhIFVSTDpcclxuICpcclxuICogLSBSZXBsYWNlcyBjb25zZWN1dGl2ZSBzbGFzaGVzIHdpdGggb25lIHNsYXNoLlxyXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJy4nIHBhcnRzLlxyXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJzxkaXI+Ly4uJyBwYXJ0cy5cclxuICpcclxuICogQmFzZWQgb24gY29kZSBpbiB0aGUgTm9kZS5qcyAncGF0aCcgY29yZSBtb2R1bGUuXHJcbiAqXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciB1cmwgdG8gbm9ybWFsaXplLlxyXG4gKi9cclxudmFyIG5vcm1hbGl6ZSA9IGxydU1lbW9pemUoZnVuY3Rpb24gbm9ybWFsaXplKGFQYXRoKSB7XHJcbiAgdmFyIHBhdGggPSBhUGF0aDtcclxuICB2YXIgdXJsID0gdXJsUGFyc2UoYVBhdGgpO1xyXG4gIGlmICh1cmwpIHtcclxuICAgIGlmICghdXJsLnBhdGgpIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHVybC5wYXRoO1xyXG4gIH1cclxuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKTtcclxuXHJcbiAgLy8gU3BsaXQgdGhlIHBhdGggaW50byBwYXJ0cyBiZXR3ZWVuIGAvYCBjaGFyYWN0ZXJzLiBUaGlzIGlzIG11Y2ggZmFzdGVyIHRoYW5cclxuICAvLyB1c2luZyBgLnNwbGl0KC9cXC8rL2cpYC5cclxuICB2YXIgcGFydHMgPSBbXTtcclxuICB2YXIgc3RhcnQgPSAwO1xyXG4gIHZhciBpID0gMDtcclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgc3RhcnQgPSBpO1xyXG4gICAgaSA9IHBhdGguaW5kZXhPZihcIi9cIiwgc3RhcnQpO1xyXG4gICAgaWYgKGkgPT09IC0xKSB7XHJcbiAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShzdGFydCkpO1xyXG4gICAgICBicmVhaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShzdGFydCwgaSkpO1xyXG4gICAgICB3aGlsZSAoaSA8IHBhdGgubGVuZ3RoICYmIHBhdGhbaV0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgaSsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBwYXJ0LCB1cCA9IDAsIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgcGFydCA9IHBhcnRzW2ldO1xyXG4gICAgaWYgKHBhcnQgPT09IFwiLlwiKSB7XHJcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gXCIuLlwiKSB7XHJcbiAgICAgIHVwKys7XHJcbiAgICB9IGVsc2UgaWYgKHVwID4gMCkge1xyXG4gICAgICBpZiAocGFydCA9PT0gXCJcIikge1xyXG4gICAgICAgIC8vIFRoZSBmaXJzdCBwYXJ0IGlzIGJsYW5rIGlmIHRoZSBwYXRoIGlzIGFic29sdXRlLiBUcnlpbmcgdG8gZ29cclxuICAgICAgICAvLyBhYm92ZSB0aGUgcm9vdCBpcyBhIG5vLW9wLiBUaGVyZWZvcmUgd2UgY2FuIHJlbW92ZSBhbGwgJy4uJyBwYXJ0c1xyXG4gICAgICAgIC8vIGRpcmVjdGx5IGFmdGVyIHRoZSByb290LlxyXG4gICAgICAgIHBhcnRzLnNwbGljZShpICsgMSwgdXApO1xyXG4gICAgICAgIHVwID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMik7XHJcbiAgICAgICAgdXAtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwYXRoID0gcGFydHMuam9pbihcIi9cIik7XHJcblxyXG4gIGlmIChwYXRoID09PSBcIlwiKSB7XHJcbiAgICBwYXRoID0gaXNBYnNvbHV0ZSA/IFwiL1wiIDogXCIuXCI7XHJcbiAgfVxyXG5cclxuICBpZiAodXJsKSB7XHJcbiAgICB1cmwucGF0aCA9IHBhdGg7XHJcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUodXJsKTtcclxuICB9XHJcbiAgcmV0dXJuIHBhdGg7XHJcbn0pO1xyXG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcclxuXHJcbi8qKlxyXG4gKiBKb2lucyB0d28gcGF0aHMvVVJMcy5cclxuICpcclxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxyXG4gKiBAcGFyYW0gYVBhdGggVGhlIHBhdGggb3IgVVJMIHRvIGJlIGpvaW5lZCB3aXRoIHRoZSByb290LlxyXG4gKlxyXG4gKiAtIElmIGFQYXRoIGlzIGEgVVJMIG9yIGEgZGF0YSBVUkksIGFQYXRoIGlzIHJldHVybmVkLCB1bmxlc3MgYVBhdGggaXMgYVxyXG4gKiAgIHNjaGVtZS1yZWxhdGl2ZSBVUkw6IFRoZW4gdGhlIHNjaGVtZSBvZiBhUm9vdCwgaWYgYW55LCBpcyBwcmVwZW5kZWRcclxuICogICBmaXJzdC5cclxuICogLSBPdGhlcndpc2UgYVBhdGggaXMgYSBwYXRoLiBJZiBhUm9vdCBpcyBhIFVSTCwgdGhlbiBpdHMgcGF0aCBwb3J0aW9uXHJcbiAqICAgaXMgdXBkYXRlZCB3aXRoIHRoZSByZXN1bHQgYW5kIGFSb290IGlzIHJldHVybmVkLiBPdGhlcndpc2UgdGhlIHJlc3VsdFxyXG4gKiAgIGlzIHJldHVybmVkLlxyXG4gKiAgIC0gSWYgYVBhdGggaXMgYWJzb2x1dGUsIHRoZSByZXN1bHQgaXMgYVBhdGguXHJcbiAqICAgLSBPdGhlcndpc2UgdGhlIHR3byBwYXRocyBhcmUgam9pbmVkIHdpdGggYSBzbGFzaC5cclxuICogLSBKb2luaW5nIGZvciBleGFtcGxlICdodHRwOi8vJyBhbmQgJ3d3dy5leGFtcGxlLmNvbScgaXMgYWxzbyBzdXBwb3J0ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBqb2luKGFSb290LCBhUGF0aCkge1xyXG4gIGlmIChhUm9vdCA9PT0gXCJcIikge1xyXG4gICAgYVJvb3QgPSBcIi5cIjtcclxuICB9XHJcbiAgaWYgKGFQYXRoID09PSBcIlwiKSB7XHJcbiAgICBhUGF0aCA9IFwiLlwiO1xyXG4gIH1cclxuICB2YXIgYVBhdGhVcmwgPSB1cmxQYXJzZShhUGF0aCk7XHJcbiAgdmFyIGFSb290VXJsID0gdXJsUGFyc2UoYVJvb3QpO1xyXG4gIGlmIChhUm9vdFVybCkge1xyXG4gICAgYVJvb3QgPSBhUm9vdFVybC5wYXRoIHx8IFwiL1wiO1xyXG4gIH1cclxuXHJcbiAgLy8gYGpvaW4oZm9vLCAnLy93d3cuZXhhbXBsZS5vcmcnKWBcclxuICBpZiAoYVBhdGhVcmwgJiYgIWFQYXRoVXJsLnNjaGVtZSkge1xyXG4gICAgaWYgKGFSb290VXJsKSB7XHJcbiAgICAgIGFQYXRoVXJsLnNjaGVtZSA9IGFSb290VXJsLnNjaGVtZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUGF0aFVybCk7XHJcbiAgfVxyXG5cclxuICBpZiAoYVBhdGhVcmwgfHwgYVBhdGgubWF0Y2goZGF0YVVybFJlZ2V4cCkpIHtcclxuICAgIHJldHVybiBhUGF0aDtcclxuICB9XHJcblxyXG4gIC8vIGBqb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpYFxyXG4gIGlmIChhUm9vdFVybCAmJiAhYVJvb3RVcmwuaG9zdCAmJiAhYVJvb3RVcmwucGF0aCkge1xyXG4gICAgYVJvb3RVcmwuaG9zdCA9IGFQYXRoO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcblxyXG4gIHZhciBqb2luZWQgPVxyXG4gICAgYVBhdGguY2hhckF0KDApID09PSBcIi9cIlxyXG4gICAgICA/IGFQYXRoXHJcbiAgICAgIDogbm9ybWFsaXplKGFSb290LnJlcGxhY2UoL1xcLyskLywgXCJcIikgKyBcIi9cIiArIGFQYXRoKTtcclxuXHJcbiAgaWYgKGFSb290VXJsKSB7XHJcbiAgICBhUm9vdFVybC5wYXRoID0gam9pbmVkO1xyXG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcclxuICB9XHJcbiAgcmV0dXJuIGpvaW5lZDtcclxufVxyXG5leHBvcnRzLmpvaW4gPSBqb2luO1xyXG5cclxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24oYVBhdGgpIHtcclxuICByZXR1cm4gYVBhdGguY2hhckF0KDApID09PSBcIi9cIiB8fCB1cmxSZWdleHAudGVzdChhUGF0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSBhIHBhdGggcmVsYXRpdmUgdG8gYSBVUkwgb3IgYW5vdGhlciBwYXRoLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVJvb3QgVGhlIHJvb3QgcGF0aCBvciBVUkwuXHJcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciBVUkwgdG8gYmUgbWFkZSByZWxhdGl2ZSB0byBhUm9vdC5cclxuICovXHJcbmZ1bmN0aW9uIHJlbGF0aXZlKGFSb290LCBhUGF0aCkge1xyXG4gIGlmIChhUm9vdCA9PT0gXCJcIikge1xyXG4gICAgYVJvb3QgPSBcIi5cIjtcclxuICB9XHJcblxyXG4gIGFSb290ID0gYVJvb3QucmVwbGFjZSgvXFwvJC8sIFwiXCIpO1xyXG5cclxuICAvLyBJdCBpcyBwb3NzaWJsZSBmb3IgdGhlIHBhdGggdG8gYmUgYWJvdmUgdGhlIHJvb3QuIEluIHRoaXMgY2FzZSwgc2ltcGx5XHJcbiAgLy8gY2hlY2tpbmcgd2hldGhlciB0aGUgcm9vdCBpcyBhIHByZWZpeCBvZiB0aGUgcGF0aCB3b24ndCB3b3JrLiBJbnN0ZWFkLCB3ZVxyXG4gIC8vIG5lZWQgdG8gcmVtb3ZlIGNvbXBvbmVudHMgZnJvbSB0aGUgcm9vdCBvbmUgYnkgb25lLCB1bnRpbCBlaXRoZXIgd2UgZmluZFxyXG4gIC8vIGEgcHJlZml4IHRoYXQgZml0cywgb3Igd2UgcnVuIG91dCBvZiBjb21wb25lbnRzIHRvIHJlbW92ZS5cclxuICB2YXIgbGV2ZWwgPSAwO1xyXG4gIHdoaWxlIChhUGF0aC5pbmRleE9mKGFSb290ICsgXCIvXCIpICE9PSAwKSB7XHJcbiAgICB2YXIgaW5kZXggPSBhUm9vdC5sYXN0SW5kZXhPZihcIi9cIik7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgIHJldHVybiBhUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGUgb25seSBwYXJ0IG9mIHRoZSByb290IHRoYXQgaXMgbGVmdCBpcyB0aGUgc2NoZW1lIChpLmUuIGh0dHA6Ly8sXHJcbiAgICAvLyBmaWxlOi8vLywgZXRjLiksIG9uZSBvciBtb3JlIHNsYXNoZXMgKC8pLCBvciBzaW1wbHkgbm90aGluZyBhdCBhbGwsIHdlXHJcbiAgICAvLyBoYXZlIGV4aGF1c3RlZCBhbGwgY29tcG9uZW50cywgc28gdGhlIHBhdGggaXMgbm90IHJlbGF0aXZlIHRvIHRoZSByb290LlxyXG4gICAgYVJvb3QgPSBhUm9vdC5zbGljZSgwLCBpbmRleCk7XHJcbiAgICBpZiAoYVJvb3QubWF0Y2goL14oW15cXC9dKzpcXC8pP1xcLyokLykpIHtcclxuICAgICAgcmV0dXJuIGFQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgICsrbGV2ZWw7XHJcbiAgfVxyXG5cclxuICAvLyBNYWtlIHN1cmUgd2UgYWRkIGEgXCIuLi9cIiBmb3IgZWFjaCBjb21wb25lbnQgd2UgcmVtb3ZlZCBmcm9tIHRoZSByb290LlxyXG4gIHJldHVybiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIuLi9cIikgKyBhUGF0aC5zdWJzdHIoYVJvb3QubGVuZ3RoICsgMSk7XHJcbn1cclxuZXhwb3J0cy5yZWxhdGl2ZSA9IHJlbGF0aXZlO1xyXG5cclxudmFyIHN1cHBvcnRzTnVsbFByb3RvID0gKGZ1bmN0aW9uKCkge1xyXG4gIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIHJldHVybiAhKFwiX19wcm90b19fXCIgaW4gb2JqKTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGlkZW50aXR5KHMpIHtcclxuICByZXR1cm4gcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEJlY2F1c2UgYmVoYXZpb3IgZ29lcyB3YWNreSB3aGVuIHlvdSBzZXQgYF9fcHJvdG9fX2Agb24gb2JqZWN0cywgd2VcclxuICogaGF2ZSB0byBwcmVmaXggYWxsIHRoZSBzdHJpbmdzIGluIG91ciBzZXQgd2l0aCBhbiBhcmJpdHJhcnkgY2hhcmFjdGVyLlxyXG4gKlxyXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9wdWxsLzMxIGFuZFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL2lzc3Vlcy8zMFxyXG4gKlxyXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcclxuICovXHJcbmZ1bmN0aW9uIHRvU2V0U3RyaW5nKGFTdHIpIHtcclxuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xyXG4gICAgcmV0dXJuIFwiJFwiICsgYVN0cjtcclxuICB9XHJcblxyXG4gIHJldHVybiBhU3RyO1xyXG59XHJcbmV4cG9ydHMudG9TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogdG9TZXRTdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBmcm9tU2V0U3RyaW5nKGFTdHIpIHtcclxuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xyXG4gICAgcmV0dXJuIGFTdHIuc2xpY2UoMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYVN0cjtcclxufVxyXG5leHBvcnRzLmZyb21TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogZnJvbVNldFN0cmluZztcclxuXHJcbmZ1bmN0aW9uIGlzUHJvdG9TdHJpbmcocykge1xyXG4gIGlmICghcykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdmFyIGxlbmd0aCA9IHMubGVuZ3RoO1xyXG5cclxuICBpZiAobGVuZ3RoIDwgOSAvKiBcIl9fcHJvdG9fX1wiLmxlbmd0aCAqLykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDEpICE9PSA5NSAvKiAnXycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAyKSAhPT0gOTUgLyogJ18nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMykgIT09IDExMSAvKiAnbycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA0KSAhPT0gMTE2IC8qICd0JyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDUpICE9PSAxMTEgLyogJ28nICovIHx8XHJcbiAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNikgIT09IDExNCAvKiAncicgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA3KSAhPT0gMTEyIC8qICdwJyAqLyB8fFxyXG4gICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDgpICE9PSA5NSAvKiAnXycgKi8gfHxcclxuICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA5KSAhPT0gOTUgLyogJ18nICovXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTA7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBpZiAocy5jaGFyQ29kZUF0KGkpICE9PSAzNiAvKiAnJCcgKi8pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdoZXJlIHRoZSBvcmlnaW5hbCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgb3JpZ2luYWwgc291cmNlL2xpbmUvY29sdW1uLCBidXQgZGlmZmVyZW50IGdlbmVyYXRlZFxyXG4gKiBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYSBtYXBwaW5nIHdpdGggYVxyXG4gKiBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XHJcbiAgdmFyIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyY21wKG1hcHBpbmdBLm5hbWUsIG1hcHBpbmdCLm5hbWUpO1xyXG59XHJcbmV4cG9ydHMuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMgPSBjb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggZGVmbGF0ZWQgc291cmNlIGFuZCBuYW1lIGluZGljZXMgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKlxyXG4gKiBPcHRpb25hbGx5IHBhc3MgaW4gYHRydWVgIGFzIGBvbmx5Q29tcGFyZUdlbmVyYXRlZGAgdG8gY29uc2lkZXIgdHdvXHJcbiAqIG1hcHBpbmdzIHdpdGggdGhlIHNhbWUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiwgYnV0IGRpZmZlcmVudFxyXG4gKiBzb3VyY2UvbmFtZS9vcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYVxyXG4gKiBtYXBwaW5nIHdpdGggYSBzdHViYmVkIG91dCBtYXBwaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQoXHJcbiAgbWFwcGluZ0EsXHJcbiAgbWFwcGluZ0IsXHJcbiAgb25seUNvbXBhcmVHZW5lcmF0ZWRcclxuKSB7XHJcbiAgdmFyIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCB8fCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkID0gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQ7XHJcblxyXG5mdW5jdGlvbiBzdHJjbXAoYVN0cjEsIGFTdHIyKSB7XHJcbiAgaWYgKGFTdHIxID09PSBhU3RyMikge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjEgPT09IG51bGwpIHtcclxuICAgIHJldHVybiAxOyAvLyBhU3RyMiAhPT0gbnVsbFxyXG4gIH1cclxuXHJcbiAgaWYgKGFTdHIyID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gLTE7IC8vIGFTdHIxICE9PSBudWxsXHJcbiAgfVxyXG5cclxuICBpZiAoYVN0cjEgPiBhU3RyMikge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gLTE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJhdG9yIGJldHdlZW4gdHdvIG1hcHBpbmdzIHdpdGggaW5mbGF0ZWQgc291cmNlIGFuZCBuYW1lIHN0cmluZ3Mgd2hlcmVcclxuICogdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMgYXJlIGNvbXBhcmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCKSB7XHJcbiAgdmFyIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xyXG4gIGlmIChjbXAgIT09IDApIHtcclxuICAgIHJldHVybiBjbXA7XHJcbiAgfVxyXG5cclxuICBjbXAgPSBtYXBwaW5nQS5nZW5lcmF0ZWRDb2x1bW4gLSBtYXBwaW5nQi5nZW5lcmF0ZWRDb2x1bW47XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XHJcbiAgaWYgKGNtcCAhPT0gMCkge1xyXG4gICAgcmV0dXJuIGNtcDtcclxuICB9XHJcblxyXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxDb2x1bW4gLSBtYXBwaW5nQi5vcmlnaW5hbENvbHVtbjtcclxuICBpZiAoY21wICE9PSAwKSB7XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkID0gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQ7XHJcblxyXG4vKipcclxuICogU3RyaXAgYW55IEpTT04gWFNTSSBhdm9pZGFuY2UgcHJlZml4IGZyb20gdGhlIHN0cmluZyAoYXMgZG9jdW1lbnRlZFxyXG4gKiBpbiB0aGUgc291cmNlIG1hcHMgc3BlY2lmaWNhdGlvbiksIGFuZCB0aGVuIHBhcnNlIHRoZSBzdHJpbmcgYXNcclxuICogSlNPTi5cclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlU291cmNlTWFwSW5wdXQoc3RyKSB7XHJcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLnJlcGxhY2UoL15cXCldfSdbXlxcbl0qXFxuLywgXCJcIikpO1xyXG59XHJcbmV4cG9ydHMucGFyc2VTb3VyY2VNYXBJbnB1dCA9IHBhcnNlU291cmNlTWFwSW5wdXQ7XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgVVJMIG9mIGEgc291cmNlIGdpdmVuIHRoZSB0aGUgc291cmNlIHJvb3QsIHRoZSBzb3VyY2Unc1xyXG4gKiBVUkwsIGFuZCB0aGUgc291cmNlIG1hcCdzIFVSTC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpIHtcclxuICBzb3VyY2VVUkwgPSBzb3VyY2VVUkwgfHwgXCJcIjtcclxuXHJcbiAgaWYgKHNvdXJjZVJvb3QpIHtcclxuICAgIC8vIFRoaXMgZm9sbG93cyB3aGF0IENocm9tZSBkb2VzLlxyXG4gICAgaWYgKHNvdXJjZVJvb3Rbc291cmNlUm9vdC5sZW5ndGggLSAxXSAhPT0gXCIvXCIgJiYgc291cmNlVVJMWzBdICE9PSBcIi9cIikge1xyXG4gICAgICBzb3VyY2VSb290ICs9IFwiL1wiO1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAgIC8vICAgTGluZSA0OiBBbiBvcHRpb25hbCBzb3VyY2Ugcm9vdCwgdXNlZnVsIGZvciByZWxvY2F0aW5nIHNvdXJjZVxyXG4gICAgLy8gICBmaWxlcyBvbiBhIHNlcnZlciBvciByZW1vdmluZyByZXBlYXRlZCB2YWx1ZXMgaW4gdGhlXHJcbiAgICAvLyAgIOKAnHNvdXJjZXPigJ0gZW50cnkuICBUaGlzIHZhbHVlIGlzIHByZXBlbmRlZCB0byB0aGUgaW5kaXZpZHVhbFxyXG4gICAgLy8gICBlbnRyaWVzIGluIHRoZSDigJxzb3VyY2XigJ0gZmllbGQuXHJcbiAgICBzb3VyY2VVUkwgPSBzb3VyY2VSb290ICsgc291cmNlVVJMO1xyXG4gIH1cclxuXHJcbiAgLy8gSGlzdG9yaWNhbGx5LCBTb3VyY2VNYXBDb25zdW1lciBkaWQgbm90IHRha2UgdGhlIHNvdXJjZU1hcFVSTCBhc1xyXG4gIC8vIGEgcGFyYW1ldGVyLiAgVGhpcyBtb2RlIGlzIHN0aWxsIHNvbWV3aGF0IHN1cHBvcnRlZCwgd2hpY2ggaXMgd2h5XHJcbiAgLy8gdGhpcyBjb2RlIGJsb2NrIGlzIGNvbmRpdGlvbmFsLiAgSG93ZXZlciwgaXQncyBwcmVmZXJhYmxlIHRvIHBhc3NcclxuICAvLyB0aGUgc291cmNlIG1hcCBVUkwgdG8gU291cmNlTWFwQ29uc3VtZXIsIHNvIHRoYXQgdGhpcyBmdW5jdGlvblxyXG4gIC8vIGNhbiBpbXBsZW1lbnQgdGhlIHNvdXJjZSBVUkwgcmVzb2x1dGlvbiBhbGdvcml0aG0gYXMgb3V0bGluZWQgaW5cclxuICAvLyB0aGUgc3BlYy4gIFRoaXMgYmxvY2sgaXMgYmFzaWNhbGx5IHRoZSBlcXVpdmFsZW50IG9mOlxyXG4gIC8vICAgIG5ldyBVUkwoc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpLnRvU3RyaW5nKClcclxuICAvLyAuLi4gZXhjZXB0IGl0IGF2b2lkcyB1c2luZyBVUkwsIHdoaWNoIHdhc24ndCBhdmFpbGFibGUgaW4gdGhlXHJcbiAgLy8gb2xkZXIgcmVsZWFzZXMgb2Ygbm9kZSBzdGlsbCBzdXBwb3J0ZWQgYnkgdGhpcyBsaWJyYXJ5LlxyXG4gIC8vXHJcbiAgLy8gVGhlIHNwZWMgc2F5czpcclxuICAvLyAgIElmIHRoZSBzb3VyY2VzIGFyZSBub3QgYWJzb2x1dGUgVVJMcyBhZnRlciBwcmVwZW5kaW5nIG9mIHRoZVxyXG4gIC8vICAg4oCcc291cmNlUm9vdOKAnSwgdGhlIHNvdXJjZXMgYXJlIHJlc29sdmVkIHJlbGF0aXZlIHRvIHRoZVxyXG4gIC8vICAgU291cmNlTWFwIChsaWtlIHJlc29sdmluZyBzY3JpcHQgc3JjIGluIGEgaHRtbCBkb2N1bWVudCkuXHJcbiAgaWYgKHNvdXJjZU1hcFVSTCkge1xyXG4gICAgdmFyIHBhcnNlZCA9IHVybFBhcnNlKHNvdXJjZU1hcFVSTCk7XHJcbiAgICBpZiAoIXBhcnNlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzb3VyY2VNYXBVUkwgY291bGQgbm90IGJlIHBhcnNlZFwiKTtcclxuICAgIH1cclxuICAgIGlmIChwYXJzZWQucGF0aCkge1xyXG4gICAgICAvLyBTdHJpcCB0aGUgbGFzdCBwYXRoIGNvbXBvbmVudCwgYnV0IGtlZXAgdGhlIFwiL1wiLlxyXG4gICAgICB2YXIgaW5kZXggPSBwYXJzZWQucGF0aC5sYXN0SW5kZXhPZihcIi9cIik7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgcGFyc2VkLnBhdGggPSBwYXJzZWQucGF0aC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc291cmNlVVJMID0gam9pbih1cmxHZW5lcmF0ZShwYXJzZWQpLCBzb3VyY2VVUkwpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZShzb3VyY2VVUkwpO1xyXG59XHJcbmV4cG9ydHMuY29tcHV0ZVNvdXJjZVVSTCA9IGNvbXB1dGVTb3VyY2VVUkw7XHJcbiIsIi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cclxuLypcclxuICogQ29weXJpZ2h0IDIwMTQgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XHJcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcclxuICovXHJcblxyXG52YXIgbGliVXRpbCA9IHJlcXVpcmUoXCIuLi9saWIvdXRpbFwiKTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IHVybHNcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICB2YXIgYXNzZXJ0VXJsID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICBhc3NlcnQuZXF1YWwodXJsLCBsaWJVdGlsLnVybEdlbmVyYXRlKGxpYlV0aWwudXJsUGFyc2UodXJsKSkpO1xyXG4gIH07XHJcbiAgYXNzZXJ0VXJsKFwiaHR0cDovL1wiKTtcclxuICBhc3NlcnRVcmwoXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpO1xyXG4gIGFzc2VydFVybChcImh0dHA6Ly91c2VyOnBhc3NAd3d3LmV4YW1wbGUuY29tXCIpO1xyXG4gIGFzc2VydFVybChcImh0dHA6Ly93d3cuZXhhbXBsZS5jb206ODBcIik7XHJcbiAgYXNzZXJ0VXJsKFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9cIik7XHJcbiAgYXNzZXJ0VXJsKFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9mb28vYmFyXCIpO1xyXG4gIGFzc2VydFVybChcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vZm9vL2Jhci9cIik7XHJcbiAgYXNzZXJ0VXJsKFwiaHR0cDovL3VzZXI6cGFzc0B3d3cuZXhhbXBsZS5jb206ODAvZm9vL2Jhci9cIik7XHJcblxyXG4gIGFzc2VydFVybChcIi8vXCIpO1xyXG4gIGFzc2VydFVybChcIi8vd3d3LmV4YW1wbGUuY29tXCIpO1xyXG4gIGFzc2VydFVybChcImZpbGU6Ly8vd3d3LmV4YW1wbGUuY29tXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZShcIlwiKSwgbnVsbCk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoXCIuXCIpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZShcIi4uXCIpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZShcImFcIiksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKFwiYS9iXCIpLCBudWxsKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZShcImEvL2JcIiksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKFwiL2FcIiksIG51bGwpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKFwiZGF0YTpmb28sYmFyXCIpLCBudWxsKTtcclxuXHJcbiAgdmFyIHBhcnNlZCA9IGxpYlV0aWwudXJsUGFyc2UoXCJodHRwOi8veC15LmNvbS9iYXJcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBhcnNlZC5zY2hlbWUsIFwiaHR0cFwiKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLmhvc3QsIFwieC15LmNvbVwiKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLnBhdGgsIFwiL2JhclwiKTtcclxuXHJcbiAgdmFyIHdlYnBhY2tVUkwgPSBcIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjdlMTg0Zjk2Nzk3MzMyOThkNDRcIjtcclxuICBwYXJzZWQgPSBsaWJVdGlsLnVybFBhcnNlKHdlYnBhY2tVUkwpO1xyXG4gIGFzc2VydC5lcXVhbChwYXJzZWQuc2NoZW1lLCBcIndlYnBhY2tcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKHBhcnNlZC5ob3N0LCBcIlwiKTtcclxuICBhc3NlcnQuZXF1YWwocGFyc2VkLnBhdGgsIFwiL3dlYnBhY2svYm9vdHN0cmFwIDY3ZTE4NGY5Njc5NzMzMjk4ZDQ0XCIpO1xyXG4gIGFzc2VydC5lcXVhbCh3ZWJwYWNrVVJMLCBsaWJVdGlsLnVybEdlbmVyYXRlKHBhcnNlZCkpO1xyXG59O1xyXG5cclxuZXhwb3J0c1tcInRlc3Qgbm9ybWFsaXplKClcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIvLi5cIiksIFwiL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIvLi4vXCIpLCBcIi9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKFwiLy4uLy4uLy4uLy4uXCIpLCBcIi9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKFwiLy4uLy4uLy4uLy4uL2EvYi9jXCIpLCBcIi9hL2IvY1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIvYS9iL2MvLi4vLi4vLi4vZC8uLi8uLi9lXCIpLCBcIi9lXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIuLlwiKSwgXCIuLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIuLi9cIiksIFwiLi4vXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi4uLy4uL2EvXCIpLCBcIi4uLy4uL2EvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcImEvLi5cIiksIFwiLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCJhLy4uLy4uLy4uXCIpLCBcIi4uLy4uXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIvLlwiKSwgXCIvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi8uL1wiKSwgXCIvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi8uLy4vLi8uXCIpLCBcIi9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKFwiLy4vLi8uLy4vYS9iL2NcIiksIFwiL2EvYi9jXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi9hL2IvYy8uLy4vLi9kLy4vLi9lXCIpLCBcIi9hL2IvYy9kL2VcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIlwiKSwgXCIuXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi5cIiksIFwiLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIuL1wiKSwgXCIuXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi4vLi9hXCIpLCBcImFcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKFwiYS8uL1wiKSwgXCJhL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCJhLy4vLi8uXCIpLCBcImFcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi9hL2IvL2MvLy8vZC8vLy8vXCIpLCBcIi9hL2IvYy9kL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoXCIvLy9hL2IvL2MvLy8vZC8vLy8vXCIpLCBcIi8vL2EvYi9jL2QvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcImEvYi8vYy8vLy9kXCIpLCBcImEvYi9jL2RcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZShcIi4vLy8uLi8uLy4uL2EvYi8vLi8uLlwiKSwgXCIuLi8uLi9hXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLm5vcm1hbGl6ZShcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5ub3JtYWxpemUoXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1wiKSxcclxuICAgIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5ub3JtYWxpemUoXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tLy4vLi4vL2EvYi9jLy4uLy4vZC8vXCIpLFxyXG4gICAgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL2EvYi9kL1wiXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGpvaW4oKVwiXSA9IGZ1bmN0aW9uKGFzc2VydCkge1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhXCIsIFwiYlwiKSwgXCJhL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImEvXCIsIFwiYlwiKSwgXCJhL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImEvL1wiLCBcImJcIiksIFwiYS9iXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhXCIsIFwiYi9cIiksIFwiYS9iL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiYVwiLCBcImIvL1wiKSwgXCJhL2IvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhL1wiLCBcIi9iXCIpLCBcIi9iXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhLy9cIiwgXCIvL2JcIiksIFwiLy9iXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiYVwiLCBcIi4uXCIpLCBcIi5cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImFcIiwgXCIuLi9iXCIpLCBcImJcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImEvYlwiLCBcIi4uL2NcIiksIFwiYS9jXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiYVwiLCBcIi5cIiksIFwiYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiYVwiLCBcIi4vYlwiKSwgXCJhL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImEvYlwiLCBcIi4vY1wiKSwgXCJhL2IvY1wiKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiYVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImFcIiwgXCJkYXRhOmZvbyxiYXJcIiksIFwiZGF0YTpmb28sYmFyXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiXCIsIFwiYlwiKSwgXCJiXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCIuXCIsIFwiYlwiKSwgXCJiXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJcIiwgXCJiL1wiKSwgXCJiL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLlwiLCBcImIvXCIpLCBcImIvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJcIiwgXCJiLy9cIiksIFwiYi9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi5cIiwgXCJiLy9cIiksIFwiYi9cIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJcIiwgXCIuLlwiKSwgXCIuLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLlwiLCBcIi4uXCIpLCBcIi4uXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJcIiwgXCIuLi9iXCIpLCBcIi4uL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi5cIiwgXCIuLi9iXCIpLCBcIi4uL2JcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJcIiwgXCIuXCIpLCBcIi5cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi5cIiwgXCIuXCIpLCBcIi5cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIlwiLCBcIi4vYlwiKSwgXCJiXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCIuXCIsIFwiLi9iXCIpLCBcImJcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGxpYlV0aWwuam9pbihcIlwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiLlwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIlwiLCBcImRhdGE6Zm9vLGJhclwiKSwgXCJkYXRhOmZvbyxiYXJcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi5cIiwgXCJkYXRhOmZvbyxiYXJcIiksIFwiZGF0YTpmb28sYmFyXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLi5cIiwgXCJiXCIpLCBcIi4uL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi4uXCIsIFwiYi9cIiksIFwiLi4vYi9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi4uXCIsIFwiYi8vXCIpLCBcIi4uL2IvXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLi5cIiwgXCIuLlwiKSwgXCIuLi8uLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLi5cIiwgXCIuLi9iXCIpLCBcIi4uLy4uL2JcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCIuLlwiLCBcIi5cIiksIFwiLi5cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi4uXCIsIFwiLi9iXCIpLCBcIi4uL2JcIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGxpYlV0aWwuam9pbihcIi4uXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSxcclxuICAgIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLi5cIiwgXCJkYXRhOmZvbyxiYXJcIiksIFwiZGF0YTpmb28sYmFyXCIpO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiYVwiLCBcIlwiKSwgXCJhXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhXCIsIFwiLlwiKSwgXCJhXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhL1wiLCBcIlwiKSwgXCJhXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJhL1wiLCBcIi5cIiksIFwiYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiYS8vXCIsIFwiXCIpLCBcImFcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImEvL1wiLCBcIi5cIiksIFwiYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiL2FcIiwgXCJcIiksIFwiL2FcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi9hXCIsIFwiLlwiKSwgXCIvYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiXCIsIFwiXCIpLCBcIi5cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi5cIiwgXCJcIiksIFwiLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLlwiLCBcIlwiKSwgXCIuXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCIuXCIsIFwiLlwiKSwgXCIuXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCIuLlwiLCBcIlwiKSwgXCIuLlwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiLi5cIiwgXCIuXCIpLCBcIi4uXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy9hXCIsIFwiXCIpLCBcImh0dHA6Ly9mb28ub3JnL2FcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2FcIiwgXCIuXCIpLCBcImh0dHA6Ly9mb28ub3JnL2FcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2EvXCIsIFwiXCIpLCBcImh0dHA6Ly9mb28ub3JnL2FcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2EvXCIsIFwiLlwiKSwgXCJodHRwOi8vZm9vLm9yZy9hXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy9hLy9cIiwgXCJcIiksIFwiaHR0cDovL2Zvby5vcmcvYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYS8vXCIsIFwiLlwiKSwgXCJodHRwOi8vZm9vLm9yZy9hXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZ1wiLCBcIlwiKSwgXCJodHRwOi8vZm9vLm9yZy9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnXCIsIFwiLlwiKSwgXCJodHRwOi8vZm9vLm9yZy9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL1wiLCBcIlwiKSwgXCJodHRwOi8vZm9vLm9yZy9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL1wiLCBcIi5cIiksIFwiaHR0cDovL2Zvby5vcmcvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy8vXCIsIFwiXCIpLCBcImh0dHA6Ly9mb28ub3JnL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvL1wiLCBcIi5cIiksIFwiaHR0cDovL2Zvby5vcmcvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCIvL3d3dy5leGFtcGxlLmNvbVwiLCBcIlwiKSwgXCIvL3d3dy5leGFtcGxlLmNvbS9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcIi8vd3d3LmV4YW1wbGUuY29tXCIsIFwiLlwiKSwgXCIvL3d3dy5leGFtcGxlLmNvbS9cIik7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy9hXCIsIFwiYlwiKSwgXCJodHRwOi8vZm9vLm9yZy9hL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2EvXCIsIFwiYlwiKSwgXCJodHRwOi8vZm9vLm9yZy9hL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2EvL1wiLCBcImJcIiksIFwiaHR0cDovL2Zvby5vcmcvYS9iXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy9hXCIsIFwiYi9cIiksIFwiaHR0cDovL2Zvby5vcmcvYS9iL1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYVwiLCBcImIvL1wiKSwgXCJodHRwOi8vZm9vLm9yZy9hL2IvXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy9hL1wiLCBcIi9iXCIpLCBcImh0dHA6Ly9mb28ub3JnL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2EvL1wiLCBcIi8vYlwiKSwgXCJodHRwOi8vYlwiKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2FcIiwgXCIuLlwiKSwgXCJodHRwOi8vZm9vLm9yZy9cIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL2FcIiwgXCIuLi9iXCIpLCBcImh0dHA6Ly9mb28ub3JnL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYS9iXCIsIFwiLi4vY1wiKSxcclxuICAgIFwiaHR0cDovL2Zvby5vcmcvYS9jXCJcclxuICApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYVwiLCBcIi5cIiksIFwiaHR0cDovL2Zvby5vcmcvYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYVwiLCBcIi4vYlwiKSwgXCJodHRwOi8vZm9vLm9yZy9hL2JcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYS9iXCIsIFwiLi9jXCIpLFxyXG4gICAgXCJodHRwOi8vZm9vLm9yZy9hL2IvY1wiXHJcbiAgKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvYVwiLCBcImRhdGE6Zm9vLGJhclwiKSxcclxuICAgIFwiZGF0YTpmb28sYmFyXCJcclxuICApO1xyXG5cclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmdcIiwgXCJhXCIpLCBcImh0dHA6Ly9mb28ub3JnL2FcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbihcImh0dHA6Ly9mb28ub3JnL1wiLCBcImFcIiksIFwiaHR0cDovL2Zvby5vcmcvYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmcvL1wiLCBcImFcIiksIFwiaHR0cDovL2Zvby5vcmcvYVwiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKFwiaHR0cDovL2Zvby5vcmdcIiwgXCIvYVwiKSwgXCJodHRwOi8vZm9vLm9yZy9hXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy9cIiwgXCIvYVwiKSwgXCJodHRwOi8vZm9vLm9yZy9hXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oXCJodHRwOi8vZm9vLm9yZy8vXCIsIFwiL2FcIiksIFwiaHR0cDovL2Zvby5vcmcvYVwiKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL1wiLCBcInd3dy5leGFtcGxlLmNvbVwiKSxcclxuICAgIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLmpvaW4oXCJmaWxlOi8vL1wiLCBcInd3dy5leGFtcGxlLmNvbVwiKSxcclxuICAgIFwiZmlsZTovLy93d3cuZXhhbXBsZS5jb21cIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL1wiLCBcImZ0cDovL2V4YW1wbGUuY29tXCIpLFxyXG4gICAgXCJmdHA6Ly9leGFtcGxlLmNvbVwiXHJcbiAgKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5qb2luKFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiLCBcIi8vZm9vLm9yZy9iYXJcIiksXHJcbiAgICBcImh0dHA6Ly9mb28ub3JnL2JhclwiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLmpvaW4oXCIvL3d3dy5leGFtcGxlLmNvbVwiLCBcIi8vZm9vLm9yZy9iYXJcIiksXHJcbiAgICBcIi8vZm9vLm9yZy9iYXJcIlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBUT0RPIElzc3VlICMxMjg6IERlZmluZSBhbmQgdGVzdCB0aGlzIGZ1bmN0aW9uIHByb3Blcmx5LlxyXG5leHBvcnRzW1widGVzdCByZWxhdGl2ZSgpXCJdID0gZnVuY3Rpb24oYXNzZXJ0KSB7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoXCIvdGhlL3Jvb3RcIiwgXCIvdGhlL3Jvb3Qvb25lLmpzXCIpLCBcIm9uZS5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLnJlbGF0aXZlKFwiaHR0cDovL3RoZS9yb290XCIsIFwiaHR0cDovL3RoZS9yb290L29uZS5qc1wiKSxcclxuICAgIFwib25lLmpzXCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGxpYlV0aWwucmVsYXRpdmUoXCIvdGhlL3Jvb3RcIiwgXCIvdGhlL3Jvb3RvbmUuanNcIiksXHJcbiAgICBcIi4uL3Jvb3RvbmUuanNcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5yZWxhdGl2ZShcImh0dHA6Ly90aGUvcm9vdFwiLCBcImh0dHA6Ly90aGUvcm9vdG9uZS5qc1wiKSxcclxuICAgIFwiLi4vcm9vdG9uZS5qc1wiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLnJlbGF0aXZlKFwiL3RoZS9yb290XCIsIFwiL3RoZXJvb3RvbmUuanNcIiksXHJcbiAgICBcIi90aGVyb290b25lLmpzXCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGxpYlV0aWwucmVsYXRpdmUoXCJodHRwOi8vdGhlL3Jvb3RcIiwgXCIvdGhlcm9vdG9uZS5qc1wiKSxcclxuICAgIFwiL3RoZXJvb3RvbmUuanNcIlxyXG4gICk7XHJcblxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKFwiXCIsIFwiL3RoZS9yb290L29uZS5qc1wiKSwgXCIvdGhlL3Jvb3Qvb25lLmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKFwiLlwiLCBcIi90aGUvcm9vdC9vbmUuanNcIiksIFwiL3RoZS9yb290L29uZS5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZShcIlwiLCBcInRoZS9yb290L29uZS5qc1wiKSwgXCJ0aGUvcm9vdC9vbmUuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoXCIuXCIsIFwidGhlL3Jvb3Qvb25lLmpzXCIpLCBcInRoZS9yb290L29uZS5qc1wiKTtcclxuXHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoXCIvXCIsIFwiL3RoZS9yb290L29uZS5qc1wiKSwgXCJ0aGUvcm9vdC9vbmUuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoXCIvXCIsIFwidGhlL3Jvb3Qvb25lLmpzXCIpLCBcInRoZS9yb290L29uZS5qc1wiKTtcclxufTtcclxuXHJcbmV4cG9ydHNbXCJ0ZXN0IGNvbXB1dGVTb3VyY2VVUkxcIl0gPSBmdW5jdGlvbihhc3NlcnQpIHtcclxuICAvLyBUZXN0cyB3aXRoIHNvdXJjZU1hcFVSTC5cclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoXCJcIiwgXCJzcmMvdGVzdC5qc1wiLCBcImh0dHA6Ly9leGFtcGxlLmNvbVwiKSxcclxuICAgIFwiaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzXCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCh1bmRlZmluZWQsIFwic3JjL3Rlc3QuanNcIiwgXCJodHRwOi8vZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly9leGFtcGxlLmNvbS9zcmMvdGVzdC5qc1wiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoXCJzcmNcIiwgXCJ0ZXN0LmpzXCIsIFwiaHR0cDovL2V4YW1wbGUuY29tXCIpLFxyXG4gICAgXCJodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanNcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5jb21wdXRlU291cmNlVVJMKFwic3JjL1wiLCBcInRlc3QuanNcIiwgXCJodHRwOi8vZXhhbXBsZS5jb21cIiksXHJcbiAgICBcImh0dHA6Ly9leGFtcGxlLmNvbS9zcmMvdGVzdC5qc1wiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoXCJzcmNcIiwgXCIvdGVzdC5qc1wiLCBcImh0dHA6Ly9leGFtcGxlLmNvbVwiKSxcclxuICAgIFwiaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzXCJcclxuICApO1xyXG4gIGFzc2VydC5lcXVhbChcclxuICAgIGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTChcclxuICAgICAgXCJodHRwOi8vbW96aWxsYS5jb21cIixcclxuICAgICAgXCJzcmMvdGVzdC5qc1wiLFxyXG4gICAgICBcImh0dHA6Ly9leGFtcGxlLmNvbVwiXHJcbiAgICApLFxyXG4gICAgXCJodHRwOi8vbW96aWxsYS5jb20vc3JjL3Rlc3QuanNcIlxyXG4gICk7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5jb21wdXRlU291cmNlVVJMKFxyXG4gICAgICBcIlwiLFxyXG4gICAgICBcInRlc3QuanNcIixcclxuICAgICAgXCJodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMubWFwXCJcclxuICAgICksXHJcbiAgICBcImh0dHA6Ly9leGFtcGxlLmNvbS9zcmMvdGVzdC5qc1wiXHJcbiAgKTtcclxuXHJcbiAgLy8gTGVnYWN5IGNvZGUgd29uJ3QgcGFzcyBpbiB0aGUgc291cmNlTWFwVVJMLlxyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoXCJcIiwgXCJzcmMvdGVzdC5qc1wiKSwgXCJzcmMvdGVzdC5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwoXHJcbiAgICBsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwodW5kZWZpbmVkLCBcInNyYy90ZXN0LmpzXCIpLFxyXG4gICAgXCJzcmMvdGVzdC5qc1wiXHJcbiAgKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKFwic3JjXCIsIFwidGVzdC5qc1wiKSwgXCJzcmMvdGVzdC5qc1wiKTtcclxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKFwic3JjL1wiLCBcInRlc3QuanNcIiksIFwic3JjL3Rlc3QuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTChcInNyY1wiLCBcIi90ZXN0LmpzXCIpLCBcInNyYy90ZXN0LmpzXCIpO1xyXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoXCJzcmNcIiwgXCIuLi90ZXN0LmpzXCIpLCBcInRlc3QuanNcIik7XHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5jb21wdXRlU291cmNlVVJMKFwic3JjL2RpclwiLCBcIi4uLy4vLi8uLi90ZXN0LmpzXCIpLFxyXG4gICAgXCJ0ZXN0LmpzXCJcclxuICApO1xyXG5cclxuICAvLyBUaGlzIGdpdmVzIGRpZmZlcmVudCByZXN1bHRzIHdpdGggdGhlIG9sZCBhbGdvcml0aG0gYW5kIHRoZSBuZXdcclxuICAvLyBzcGVjLWNvbXBsaWFudCBhbGdvcml0aG0uXHJcbiAgYXNzZXJ0LmVxdWFsKFxyXG4gICAgbGliVXRpbC5jb21wdXRlU291cmNlVVJMKFwiaHR0cDovL2V4YW1wbGUuY29tL2RpclwiLCBcIi90ZXN0LmpzXCIpLFxyXG4gICAgXCJodHRwOi8vZXhhbXBsZS5jb20vZGlyL3Rlc3QuanNcIlxyXG4gICk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=