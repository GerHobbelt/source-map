/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

const util = require("./util");
const SourceMapConsumerSync = require("../lib/source-map-consumer-sync").SourceMapConsumerSync;
const IndexedSourceMapConsumerSync = require("../lib/source-map-consumer-sync").IndexedSourceMapConsumerSync;
const BasicSourceMapConsumerSync = require("../lib/source-map-consumer-sync").BasicSourceMapConsumerSync;
const SourceMapGenerator = require("../lib/source-map-generator").SourceMapGenerator;

exports["test that we can instantiate with a string or an object"] = function(assert) {
  let map = new SourceMapConsumerSync(util.testMap);
  map = new SourceMapConsumerSync(JSON.stringify(util.testMap));
  assert.ok(true, "constructors should not throw an exception");
  map.destroy();
};

exports["test that the object returned from new SourceMapConsumerSync inherits from SourceMapConsumerSync"] = function(
  assert
) {
  const map = new SourceMapConsumerSync(util.testMap);
  assert.ok(map instanceof SourceMapConsumerSync);
  map.destroy();
};

exports["test that a BasicSourceMapConsumerSync is returned for sourcemaps without sections"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMap);
  assert.ok(map instanceof BasicSourceMapConsumerSync);
  map.destroy();
};

exports["test that an IndexedSourceMapConsumerSync is returned for sourcemaps with sections"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);
  assert.ok(map instanceof IndexedSourceMapConsumerSync);
  map.destroy();
};

exports["test that the `sources` field has the original sources"] = function(assert) {
  let map;
  let sources;

  map = new SourceMapConsumerSync(util.testMap);
  sources = map.sources;
  assert.equal(sources[0], "/the/root/one.js");
  assert.equal(sources[1], "/the/root/two.js");
  assert.equal(sources.length, 2);
  map.destroy();

  map = new SourceMapConsumerSync(util.indexedTestMap);
  sources = map.sources;
  assert.equal(sources[0], "/the/root/one.js");
  assert.equal(sources[1], "/the/root/two.js");
  assert.equal(sources.length, 2);
  map.destroy();

  map = new SourceMapConsumerSync(util.indexedTestMapDifferentSourceRoots);
  sources = map.sources;
  assert.equal(sources[0], "/the/root/one.js");
  assert.equal(sources[1], "/different/root/two.js");
  assert.equal(sources.length, 2);
  map.destroy();

  map = new SourceMapConsumerSync(util.testMapNoSourceRoot);
  sources = map.sources;
  assert.equal(sources[0], "one.js");
  assert.equal(sources[1], "two.js");
  assert.equal(sources.length, 2);
  map.destroy();

  map = new SourceMapConsumerSync(util.testMapEmptySourceRoot);
  sources = map.sources;
  assert.equal(sources[0], "one.js");
  assert.equal(sources[1], "two.js");
  assert.equal(sources.length, 2);
  map.destroy();
};

exports["test that the source root is reflected in a mapping's source field"] = function(assert) {
  let map;
  let mapping;

  map = new SourceMapConsumerSync(util.testMap);

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
  map.destroy();

  map = new SourceMapConsumerSync(util.testMapNoSourceRoot);

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
  map.destroy();

  map = new SourceMapConsumerSync(util.testMapEmptySourceRoot);

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
  map.destroy();
};

exports["test mapping tokens back exactly"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMap);

  util.assertMapping(1, 1, "/the/root/one.js", 1, 1, null, null, map, assert);
  util.assertMapping(1, 5, "/the/root/one.js", 1, 5, null, null, map, assert);
  util.assertMapping(1, 9, "/the/root/one.js", 1, 11, null, null, map, assert);
  util.assertMapping(1, 18, "/the/root/one.js", 1, 21, "bar", null, map, assert);
  util.assertMapping(1, 21, "/the/root/one.js", 2, 3, null, null, map, assert);
  util.assertMapping(1, 28, "/the/root/one.js", 2, 10, "baz", null, map, assert);
  util.assertMapping(1, 32, "/the/root/one.js", 2, 14, "bar", null, map, assert);

  util.assertMapping(2, 1, "/the/root/two.js", 1, 1, null, null, map, assert);
  util.assertMapping(2, 5, "/the/root/two.js", 1, 5, null, null, map, assert);
  util.assertMapping(2, 9, "/the/root/two.js", 1, 11, null, null, map, assert);
  util.assertMapping(2, 18, "/the/root/two.js", 1, 21, "n", null, map, assert);
  util.assertMapping(2, 21, "/the/root/two.js", 2, 3, null, null, map, assert);
  util.assertMapping(2, 28, "/the/root/two.js", 2, 10, "n", null, map, assert);

  map.destroy();
};

exports["test mapping tokens back exactly in indexed source map"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);

  util.assertMapping(1, 1, "/the/root/one.js", 1, 1, null, null, map, assert);
  util.assertMapping(1, 5, "/the/root/one.js", 1, 5, null, null, map, assert);
  util.assertMapping(1, 9, "/the/root/one.js", 1, 11, null, null, map, assert);
  util.assertMapping(1, 18, "/the/root/one.js", 1, 21, "bar", null, map, assert);
  util.assertMapping(1, 21, "/the/root/one.js", 2, 3, null, null, map, assert);
  util.assertMapping(1, 28, "/the/root/one.js", 2, 10, "baz", null, map, assert);
  util.assertMapping(1, 32, "/the/root/one.js", 2, 14, "bar", null, map, assert);

  util.assertMapping(2, 1, "/the/root/two.js", 1, 1, null, null, map, assert);
  util.assertMapping(2, 5, "/the/root/two.js", 1, 5, null, null, map, assert);
  util.assertMapping(2, 9, "/the/root/two.js", 1, 11, null, null, map, assert);
  util.assertMapping(2, 18, "/the/root/two.js", 1, 21, "n", null, map, assert);
  util.assertMapping(2, 21, "/the/root/two.js", 2, 3, null, null, map, assert);
  util.assertMapping(2, 28, "/the/root/two.js", 2, 10, "n", null, map, assert);

  map.destroy();
};

exports["test mapping tokens fuzzy"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMap);

  // Finding original positions with default (glb) bias.
  util.assertMapping(1, 20, "/the/root/one.js", 1, 21, "bar", null, map, assert, true);
  util.assertMapping(1, 30, "/the/root/one.js", 2, 10, "baz", null, map, assert, true);
  util.assertMapping(2, 12, "/the/root/two.js", 1, 11, null, null, map, assert, true);

  // Finding original positions with lub bias.
  util.assertMapping(1, 16, "/the/root/one.js", 1, 21, "bar", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 18, "/the/root/one.js", 1, 21, "bar", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 19, "/the/root/one.js", 2, 3, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 21, "/the/root/one.js", 2, 3, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 26, "/the/root/one.js", 2, 10, "baz", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 28, "/the/root/one.js", 2, 10, "baz", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 29, "/the/root/one.js", 2, 14, "bar", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 6, "/the/root/two.js", 1, 11, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);

  // Finding generated positions with default (glb) bias.
  util.assertMapping(1, 18, "/the/root/one.js", 1, 22, "bar", null, map, assert, null, true);
  util.assertMapping(1, 28, "/the/root/one.js", 2, 13, "baz", null, map, assert, null, true);
  util.assertMapping(2, 9, "/the/root/two.js", 1, 16, null, null, map, assert, null, true);

  // Finding generated positions with lub bias.
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    20,
    "bar",
    SourceMapConsumerSync.LEAST_UPPER_BOUND,
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
    SourceMapConsumerSync.LEAST_UPPER_BOUND,
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
    SourceMapConsumerSync.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );

  map.destroy();
};

exports["test mapping tokens fuzzy in indexed source map"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);

  // Finding original positions with default (glb) bias.
  util.assertMapping(1, 20, "/the/root/one.js", 1, 21, "bar", null, map, assert, true);
  util.assertMapping(1, 30, "/the/root/one.js", 2, 10, "baz", null, map, assert, true);
  util.assertMapping(2, 12, "/the/root/two.js", 1, 11, null, null, map, assert, true);

  // Finding original positions with lub bias.
  util.assertMapping(1, 16, "/the/root/one.js", 1, 21, "bar", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 18, "/the/root/one.js", 1, 21, "bar", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 19, "/the/root/one.js", 2, 3, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 21, "/the/root/one.js", 2, 3, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 26, "/the/root/one.js", 2, 10, "baz", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 28, "/the/root/one.js", 2, 10, "baz", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(1, 29, "/the/root/one.js", 2, 14, "bar", SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 6, "/the/root/two.js", 1, 11, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);

  // Finding generated positions with default (glb) bias.
  util.assertMapping(1, 18, "/the/root/one.js", 1, 22, "bar", null, map, assert, null, true);
  util.assertMapping(1, 28, "/the/root/one.js", 2, 13, "baz", null, map, assert, null, true);
  util.assertMapping(2, 9, "/the/root/two.js", 1, 16, null, null, map, assert, null, true);

  // Finding generated positions with lub bias.
  util.assertMapping(
    1,
    18,
    "/the/root/one.js",
    1,
    20,
    "bar",
    SourceMapConsumerSync.LEAST_UPPER_BOUND,
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
    SourceMapConsumerSync.LEAST_UPPER_BOUND,
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
    SourceMapConsumerSync.LEAST_UPPER_BOUND,
    map,
    assert,
    null,
    true
  );

  map.destroy();
};

exports["test mappings and end of lines"] = function(assert) {
  const smg = new SourceMapGenerator({
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

  const map = SourceMapConsumerSync.fromSourceMap(smg);

  // When finding original positions, mappings end at the end of the line.
  util.assertMapping(1, 1, "baz.js", 1, 1, null, null, map, assert, true);
  util.assertMapping(2, 0, null, null, null, null, null, map, assert, true);
  util.assertMapping(2, 1, null, null, null, null, null, map, assert, true);
  util.assertMapping(2, 2, "bar.js", 2, 2, null, null, map, assert, true);
  util.assertMapping(2, 3, "bar.js", 2, 2, null, null, map, assert, true);
  util.assertMapping(3, 1, null, null, null, null, null, map, assert, true);

  util.assertMapping(1, 1, "baz.js", 1, 1, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 0, "bar.js", 2, 2, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 1, "bar.js", 2, 2, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 2, "bar.js", 2, 2, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(2, 3, null, null, null, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);
  util.assertMapping(3, 1, null, null, null, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, true);

  // When finding generated positions, mappings do not end at the end of the line.
  util.assertMapping(1, 1, "bar.js", 2, 1, null, null, map, assert, null, true);

  // When finding generated positions with, mappings end at the end of the source.
  util.assertMapping(null, null, "bar.js", 3, 1, null, SourceMapConsumerSync.LEAST_UPPER_BOUND, map, assert, null, true);

  map.destroy();
};

exports["test creating source map consumers with )]}' prefix"] = function(assert) {
  const map = new SourceMapConsumerSync(")]}'\n" + JSON.stringify(util.testMap));
  assert.ok(true);
  map.destroy();
};

exports["test eachMapping"] = function(assert) {
  let map;

  map = new SourceMapConsumerSync(util.testMap);
  let previousLine = -Infinity;
  let previousColumn = -Infinity;
  map.eachMapping(function(mapping) {
    assert.ok(mapping.generatedLine >= previousLine);

    assert.ok(mapping.source === "/the/root/one.js" || mapping.source === "/the/root/two.js");

    if (mapping.generatedLine === previousLine) {
      assert.ok(mapping.generatedColumn >= previousColumn);
      previousColumn = mapping.generatedColumn;
    } else {
      previousLine = mapping.generatedLine;
      previousColumn = -Infinity;
    }
  });
  map.destroy();

  map = new SourceMapConsumerSync(util.testMapNoSourceRoot);
  map.eachMapping(function(mapping) {
    assert.ok(mapping.source === "one.js" || mapping.source === "two.js");
  });
  map.destroy();

  map = new SourceMapConsumerSync(util.testMapEmptySourceRoot);
  map.eachMapping(function(mapping) {
    assert.ok(mapping.source === "one.js" || mapping.source === "two.js");
  });
  map.destroy();

  map = new SourceMapConsumerSync(util.mapWithSourcelessMapping);
  map.eachMapping(function(mapping) {
    assert.ok(
      mapping.source === null ||
        (typeof mapping.originalColumn === "number" && typeof mapping.originalLine === "number")
    );
  });
  map.destroy();
};

exports["test eachMapping for indexed source maps"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);
  map.computeColumnSpans();
  let previousLine = -Infinity;
  let previousColumn = -Infinity;
  let previousLastColumn = -Infinity;

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

  map.destroy();
};

exports["test eachMapping for indexed source maps with column offsets"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMapColumnOffset);
  map.computeColumnSpans();
  let previousLine = -Infinity;
  let previousColumn = -Infinity;
  let previousLastColumn = -Infinity;

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

  map.destroy();
};

exports["test iterating over mappings in a different order"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMap);
  let previousLine = -Infinity;
  let previousColumn = -Infinity;
  let previousSource = "";

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
    SourceMapConsumerSync.ORIGINAL_ORDER
  );

  map.destroy();
};

exports["test iterating over mappings in a different order in indexed source maps"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);
  let previousLine = -Infinity;
  let previousColumn = -Infinity;
  let previousSource = "";
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
    SourceMapConsumerSync.ORIGINAL_ORDER
  );
  map.destroy();
};

exports["test that we can set the context for `this` in eachMapping"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMap);
  const context = {};
  map.eachMapping(function() {
    assert.equal(this, context);
  }, context);
  map.destroy();
};

exports["test that we can set the context for `this` in eachMapping in indexed source maps"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);
  const context = {};
  map.eachMapping(function() {
    assert.equal(this, context);
  }, context);
  map.destroy();
};

exports["test that sourceContentFor result if no sourcesContent provided"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMap);
  assert.equal(map.sourceContentFor("/the/root/one.js", true), null);
  assert.equal(map.sourceContentFor("/the/root/three.js", true), null);

  assert.throws(function() {
    map.sourceContentFor("/the/root/one.js");
  }, Error);

  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);

  map.destroy();
};

exports["test that the `sourcesContent` field has the original sources"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMapWithSourcesContent);
  const sourcesContent = map.sourcesContent;

  assert.equal(sourcesContent[0], " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(sourcesContent[1], " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.equal(sourcesContent.length, 2);

  map.destroy();
};

exports["test that we can get the original sources for the sources"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMapWithSourcesContent);
  const sources = map.sources;

  assert.equal(map.sourceContentFor(sources[0]), " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(map.sourceContentFor(sources[1]), " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.equal(map.sourceContentFor("one.js"), " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(map.sourceContentFor("two.js"), " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.throws(function() {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("three.js");
  }, Error);

  map.destroy();
};

exports["test that we can get the original source content with relative source paths"] = function(assert) {
  const map = new SourceMapConsumerSync(util.testMapRelativeSources);
  const sources = map.sources;

  assert.equal(map.sourceContentFor(sources[0]), " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(map.sourceContentFor(sources[1]), " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.equal(map.sourceContentFor("one.js"), " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(map.sourceContentFor("two.js"), " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.throws(function() {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("three.js");
  }, Error);

  map.destroy();
};

exports["test that we can get the original source content for the sources on an indexed source map"] = function(
  assert
) {
  const map = new SourceMapConsumerSync(util.indexedTestMap);
  const sources = map.sources;

  assert.equal(map.sourceContentFor(sources[0]), " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(map.sourceContentFor(sources[1]), " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.equal(map.sourceContentFor("one.js"), " ONE.foo = function (bar) {\n   return baz(bar);\n };");
  assert.equal(map.sourceContentFor("two.js"), " TWO.inc = function (n) {\n   return n + 1;\n };");
  assert.throws(function() {
    map.sourceContentFor("");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("/the/root/three.js");
  }, Error);
  assert.throws(function() {
    map.sourceContentFor("three.js");
  }, Error);

  map.destroy();
};

exports["test hasContentsOfAllSources, single source with contents"] = function(assert) {
  // Has one source: foo.js (with contents).
  const mapWithContents = new SourceMapGenerator();
  mapWithContents.addMapping({
    source: "foo.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  mapWithContents.setSourceContent("foo.js", "content of foo.js");

  const consumer = new SourceMapConsumerSync(mapWithContents.toJSON());
  assert.ok(consumer.hasContentsOfAllSources());
  consumer.destroy();
};

exports["test hasContentsOfAllSources, single source without contents"] = function(assert) {
  // Has one source: foo.js (without contents).
  const mapWithoutContents = new SourceMapGenerator();
  mapWithoutContents.addMapping({
    source: "foo.js",
    original: { line: 1, column: 10 },
    generated: { line: 1, column: 10 }
  });
  const consumer = new SourceMapConsumerSync(mapWithoutContents.toJSON());
  assert.ok(!consumer.hasContentsOfAllSources());
  consumer.destroy();
};

exports["test hasContentsOfAllSources, two sources with contents"] = function(assert) {
  // Has two sources: foo.js (with contents) and bar.js (with contents).
  const mapWithBothContents = new SourceMapGenerator();
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
  const consumer = new SourceMapConsumerSync(mapWithBothContents.toJSON());
  assert.ok(consumer.hasContentsOfAllSources());
  consumer.destroy();
};

exports["test hasContentsOfAllSources, two sources one with and one without contents"] = function(assert) {
  // Has two sources: foo.js (with contents) and bar.js (without contents).
  const mapWithoutSomeContents = new SourceMapGenerator();
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
  const consumer = new SourceMapConsumerSync(mapWithoutSomeContents.toJSON());
  assert.ok(!consumer.hasContentsOfAllSources());
  consumer.destroy();
};

exports["test sourceRoot + generatedPositionFor"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString(), "http://example.com/");

  // Should handle without sourceRoot.
  let pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  // Should handle with sourceRoot.
  pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "foo/bar/bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  // Should handle absolute case.
  pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "http://example.com/foo/bar/bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  map.destroy();
};

exports["test sourceRoot + generatedPositionFor for path above the root"] = function(assert) {
  let map = new SourceMapGenerator({
    sourceRoot: "foo/bar",
    file: "baz.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "../bang.coffee"
  });

  map = new SourceMapConsumerSync(map.toString());

  // Should handle with sourceRoot.
  const pos = map.generatedPositionFor({
    line: 1,
    column: 1,
    source: "foo/bang.coffee"
  });

  assert.equal(pos.line, 2);
  assert.equal(pos.column, 2);

  map.destroy();
};

exports["test index map + generatedPositionFor"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMapColumnOffset, "http://example.com/");
  map.computeColumnSpans();

  let pos = map.generatedPositionFor({
    line: 1,
    column: 11,
    source: "one.js"
  });

  assert.equal(pos.line, 1);
  assert.equal(pos.column, 9);
  assert.equal(pos.lastColumn, 17);

  pos = map.generatedPositionFor({
    line: 2,
    column: 3,
    source: "one.js"
  });

  assert.equal(pos.line, 1);
  assert.equal(pos.column, 21);
  assert.equal(pos.lastColumn, 27);

  pos = map.generatedPositionFor({
    line: 1,
    column: 11,
    source: "two.js"
  });

  assert.equal(pos.line, 1);
  assert.equal(pos.column, 59);
  assert.equal(pos.lastColumn, 67);

  pos = map.generatedPositionFor({
    line: 2,
    column: 3,
    source: "two.js"
  });

  assert.equal(pos.line, 1);
  assert.equal(pos.column, 71);
  assert.equal(pos.lastColumn, 77);

  map.destroy();
};

exports["test index map + originalPositionFor"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMapWithMappingsAtSectionStart);
  assert.ok(map instanceof IndexedSourceMapConsumerSync);

  let pos = map.originalPositionFor({
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

  map.destroy();
};

exports["test allGeneratedPositionsFor for line"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString(), "http://example.com/");

  let mappings = map.allGeneratedPositionsFor({
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

  map.destroy();
};

exports["test allGeneratedPositionsFor for line fuzzy"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString());

  const mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "bar.coffee"
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].line, 4);
  assert.equal(mappings[0].column, 2);

  map.destroy();
};

exports["test allGeneratedPositionsFor for empty source map"] = function(assert) {
  let map = new SourceMapGenerator({
    file: "generated.js"
  });
  map = new SourceMapConsumerSync(map.toString());

  const mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "bar.coffee"
  });

  assert.equal(mappings.length, 0);

  map.destroy();
};

exports["test allGeneratedPositionsFor for column"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString());

  const mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 1,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 1);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 1);
  assert.equal(mappings[1].column, 3);

  map.destroy();
};

exports["test allGeneratedPositionsFor for column fuzzy"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString());

  const mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 0,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].line, 1);
  assert.equal(mappings[0].column, 2);
  assert.equal(mappings[1].line, 1);
  assert.equal(mappings[1].column, 3);

  map.destroy();
};

exports["test allGeneratedPositionsFor for column on different line fuzzy"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString());

  const mappings = map.allGeneratedPositionsFor({
    line: 1,
    column: 0,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 0);

  map.destroy();
};

exports["test allGeneratedPositionsFor for index map"] = function(assert) {
  const map = new SourceMapConsumerSync(util.indexedTestMapColumnOffset);
  map.computeColumnSpans();

  let mappings = map.allGeneratedPositionsFor({
    line: 2,
    column: 3,
    source: "one.js"
  });

  assert.deepEqual(mappings, [
    {
      line: 1,
      column: 21,
      lastColumn: 27
    }
  ]);

  mappings = map.allGeneratedPositionsFor({
    line: 2,
    column: 14,
    source: "one.js"
  });

  assert.deepEqual(mappings, [
    {
      line: 1,
      column: 32,
      lastColumn: 49
    }
  ]);

  mappings = map.allGeneratedPositionsFor({
    line: 2,
    column: 3,
    source: "two.js"
  });

  assert.deepEqual(mappings, [
    {
      line: 1,
      column: 71,
      lastColumn: 77
    }
  ]);

  mappings = map.allGeneratedPositionsFor({
    line: 2,
    column: 10,
    source: "two.js"
  });

  assert.deepEqual(mappings, [
    {
      line: 1,
      column: 78,
      lastColumn: Infinity
    }
  ]);

  map.destroy();
};

exports["test computeColumnSpans"] = function(assert) {
  let map = new SourceMapGenerator({
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

  map = new SourceMapConsumerSync(map.toString());

  map.computeColumnSpans();

  let mappings = map.allGeneratedPositionsFor({
    line: 1,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].lastColumn, Infinity);

  mappings = map.allGeneratedPositionsFor({
    line: 2,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 3);
  assert.equal(mappings[0].lastColumn, 9);
  assert.equal(mappings[1].lastColumn, 19);
  assert.equal(mappings[2].lastColumn, Infinity);

  mappings = map.allGeneratedPositionsFor({
    line: 3,
    source: "foo.coffee"
  });

  assert.equal(mappings.length, 2);
  assert.equal(mappings[0].lastColumn, 1);
  assert.equal(mappings[1].lastColumn, Infinity);

  map.destroy();
};

exports["test sourceRoot + originalPositionFor"] = function(assert) {
  let map = new SourceMapGenerator({
    sourceRoot: "foo/bar",
    file: "baz.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "bang.coffee"
  });

  map = new SourceMapConsumerSync(map.toString());

  const pos = map.originalPositionFor({
    line: 2,
    column: 2
  });

  // Should always have the prepended source root
  assert.equal(pos.source, "foo/bar/bang.coffee");
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  map.destroy();
};

exports["test github issue #56"] = function(assert) {
  let map = new SourceMapGenerator({
    sourceRoot: "http://www.example.com",
    file: "/foo.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "/original.js"
  });
  map = new SourceMapConsumerSync(map.toString());

  const sources = map.sources;
  assert.equal(sources.length, 1);
  assert.equal(sources[0], "http://www.example.com/original.js");

  map.destroy();
};

// Was github issue #43, but that's no longer valid.
exports["test source resolution with sourceMapURL"] = function(assert) {
  let map = new SourceMapGenerator({
    sourceRoot: "",
    file: "foo.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "original.js"
  });

  map = new SourceMapConsumerSync(map.toString(), "http://cdn.example.com");

  const sources = map.sources;
  assert.equal(sources.length, 1, "Should only be one source.");
  assert.equal(sources[0], "http://cdn.example.com/original.js", "Should be joined with the source map URL.");

  map.destroy();
};

exports["test sourceRoot prepending"] = function(assert) {
  let map = new SourceMapGenerator({
    sourceRoot: "http://example.com/foo/bar",
    file: "foo.js"
  });
  map.addMapping({
    original: { line: 1, column: 1 },
    generated: { line: 2, column: 2 },
    source: "/original.js"
  });

  map = new SourceMapConsumerSync(map.toString());

  const sources = map.sources;
  assert.equal(sources.length, 1, "Should only be one source.");
  assert.equal(sources[0], "http://example.com/foo/bar/original.js", "Source include the source root.");

  map.destroy();
};

exports["test indexed source map errors when sections are out of order by line"] = function(assert) {
  // Make a deep copy of the indexedTestMap
  const misorderedIndexedTestMap = JSON.parse(JSON.stringify(util.indexedTestMap));

  misorderedIndexedTestMap.sections[0].offset = {
    line: 2,
    column: 0
  };

  let error;
  try {
    new SourceMapConsumerSync(misorderedIndexedTestMap);
  } catch (e) {
    error = e;
  }
  assert.ok(error instanceof Error);
};

exports["test github issue #64"] = function(assert) {
  const map = new SourceMapConsumerSync({
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

  map.destroy();
};

exports["test full source content with sourceMapURL"] = function(assert) {
  const map = new SourceMapConsumerSync(
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

  assert.equal(
    map.sourceContentFor("http://cdn.example.com/original.js"),
    "yellow warbler",
    "Source content should be found using full URL"
  );

  map.destroy();
};

exports["test bug 885597"] = function(assert) {
  const map = new SourceMapConsumerSync({
    version: 3,
    file: "foo.js",
    sourceRoot: "file:///Users/AlGore/Invented/The/Internet/",
    sources: ["/a"],
    names: [],
    mappings: "AACA",
    sourcesContent: ["foo"]
  });

  const s = map.sources[0];
  assert.equal(map.sourceContentFor(s), "foo");

  map.destroy();
};

exports["test github issue #72, duplicate sources"] = function(assert) {
  const map = new SourceMapConsumerSync({
    version: 3,
    file: "foo.js",
    sources: ["source1.js", "source1.js", "source3.js"],
    names: [],
    mappings: ";EAAC;;IAEE;;MEEE",
    sourceRoot: "http://example.com"
  });

  let pos = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.source, "http://example.com/source1.js");
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  pos = map.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.source, "http://example.com/source1.js");
  assert.equal(pos.line, 3);
  assert.equal(pos.column, 3);

  pos = map.originalPositionFor({
    line: 6,
    column: 6
  });
  assert.equal(pos.source, "http://example.com/source3.js");
  assert.equal(pos.line, 5);
  assert.equal(pos.column, 5);

  map.destroy();
};

exports["test github issue #72, duplicate names"] = function(assert) {
  const map = new SourceMapConsumerSync({
    version: 3,
    file: "foo.js",
    sources: ["source.js"],
    names: ["name1", "name1", "name3"],
    mappings: ";EAACA;;IAEEA;;MAEEE",
    sourceRoot: "http://example.com"
  });

  let pos = map.originalPositionFor({
    line: 2,
    column: 2
  });
  assert.equal(pos.name, "name1");
  assert.equal(pos.line, 1);
  assert.equal(pos.column, 1);

  pos = map.originalPositionFor({
    line: 4,
    column: 4
  });
  assert.equal(pos.name, "name1");
  assert.equal(pos.line, 3);
  assert.equal(pos.column, 3);

  pos = map.originalPositionFor({
    line: 6,
    column: 6
  });
  assert.equal(pos.name, "name3");
  assert.equal(pos.line, 5);
  assert.equal(pos.column, 5);

  map.destroy();
};

exports["test SourceMapConsumerSync.fromSourceMap"] = function(assert) {
  const smg = new SourceMapGenerator({
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

  const smc = SourceMapConsumerSync.fromSourceMap(smg);
  assert.equal(smc.file, "foo.js");
  assert.equal(smc.sourceRoot, "http://example.com/");
  assert.equal(smc.sources.length, 2);
  assert.equal(smc.sources[0], "http://example.com/bar.js");
  assert.equal(smc.sources[1], "http://example.com/baz.js");
  assert.equal(smc.sourceContentFor("baz.js"), "baz.js content");

  let pos = smc.originalPositionFor({
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

  smc.destroy();
};

exports["test issue #191"] = function(assert) {
  const generator = new SourceMapGenerator({ file: "a.css" });
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

  // Create a SourceMapConsumerSync from the SourceMapGenerator, ...
  const consumer = SourceMapConsumerSync.fromSourceMap(generator);
  // ... and then try and use the SourceMapGenerator again. This should not
  // throw.
  generator.toJSON();

  assert.ok(true, "Using a SourceMapGenerator again after creating a SourceMapConsumerSync from it should not throw");

  consumer.destroy();
};

exports["test sources where their prefix is the source root: issue #199"] = function(assert) {
  const testSourceMap = {
    version: 3,
    sources: ["/source/app/app/app.js"],
    names: ["System"],
    mappings: "AAAAA",
    file: "app/app.js",
    sourcesContent: ["'use strict';"],
    sourceRoot: "/source/"
  };

  const consumer = new SourceMapConsumerSync(testSourceMap);

  function consumerHasSource(s) {
    assert.ok(consumer.sourceContentFor(s));
  }

  consumer.sources.forEach(consumerHasSource);
  testSourceMap.sources.forEach(consumerHasSource);

  consumer.destroy();
};

exports["test sources where their prefix is the source root and the source root is a url: issue #199"] = function(
  assert
) {
  const testSourceMap = {
    version: 3,
    sources: ["http://example.com/source/app/app/app.js"],
    names: ["System"],
    mappings: "AAAAA",
    sourcesContent: ["'use strict';"],
    sourceRoot: "http://example.com/source/"
  };

  const consumer = new SourceMapConsumerSync(testSourceMap);

  function consumerHasSource(s) {
    assert.ok(consumer.sourceContentFor(s));
  }

  consumer.sources.forEach(consumerHasSource);
  testSourceMap.sources.forEach(consumerHasSource);

  consumer.destroy();
};

exports["test consuming names and sources that are numbers"] = function(assert) {
  const testSourceMap = {
    version: 3,
    sources: [0],
    names: [1],
    mappings: "AAAAA"
  };

  const consumer = new SourceMapConsumerSync(testSourceMap);

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "0");

  let i = 0;
  consumer.eachMapping(function(m) {
    i++;
    assert.equal(m.name, "1");
  });
  assert.equal(i, 1);

  consumer.destroy();
};

exports["test non-normalized sourceRoot (from issue #227)"] = function(assert) {
  const consumer = new SourceMapConsumerSync({
    version: 3,
    sources: ["index.js"],
    names: [],
    mappings: ";;AAAA,IAAI,OAAO,MAAP",
    file: "index.js",
    sourceRoot: "./src/",
    sourcesContent: ['var name = "Mark"\n']
  });
  assert.doesNotThrow(() => {
    // Before the fix, this threw an exception.
    consumer.sourceContentFor(consumer.sources[0]);
  });

  consumer.destroy();
};

exports["test webpack URL resolution"] = function(assert) {
  const map = {
    version: 3,
    sources: ["webpack:///webpack/bootstrap 67e184f9679733298d44"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: ""
  };
  const consumer = new SourceMapConsumerSync(map);

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap%2067e184f9679733298d44");

  consumer.destroy();
};

exports["test webpack URL resolution with sourceMapURL"] = function(assert) {
  const map = {
    version: 3,
    sources: ["webpack:///webpack/bootstrap 67e184f9679733298d44"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: ""
  };
  const consumer = new SourceMapConsumerSync(map, "http://www.example.com/q.js.map");

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap%2067e184f9679733298d44");

  consumer.destroy();
};

exports["test relative webpack URL resolution with sourceMapURL"] = function(assert) {
  const map = {
    version: 3,
    sources: ["webpack/bootstrap.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "webpack:///"
  };
  const consumer = new SourceMapConsumerSync(map, "http://www.example.com/q.js.map");

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "webpack:///webpack/bootstrap.js");

  consumer.destroy();
};

exports["test basic URL resolution with sourceMapURL"] = function(assert) {
  const map = {
    version: 3,
    sources: ["something.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "src"
  };
  const consumer = new SourceMapConsumerSync(map, "http://www.example.com/x/q.js.map");

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "http://www.example.com/x/src/something.js");

  consumer.destroy();
};

exports["test absolute sourceURL resolution with sourceMapURL"] = function(assert) {
  const map = {
    version: 3,
    sources: ["something.js"],
    names: [],
    mappings: "CAAS",
    file: "static/js/manifest.b7cf97680f7a50fa150f.js",
    sourceRoot: "http://www.example.com/src"
  };
  const consumer = new SourceMapConsumerSync(map, "http://www.example.com/x/q.js.map");

  assert.equal(consumer.sources.length, 1);
  assert.equal(consumer.sources[0], "http://www.example.com/src/something.js");

  consumer.destroy();
};

exports["test line numbers > 2**32"] = function(assert) {
  const map = new SourceMapConsumerSync({
    version: 3,
    sources: ["something.js"],
    names: [],
    mappings: "C+/////DAS",
    file: "foo.js"
  });

  let error;
  try {
    // Triggers parse which fails on too big of a line number.
    map.eachMapping(m => console.log(m));
  } catch (e) {
    error = e;
  }

  assert.ok(error != null);
  map.destroy();
};

exports["test line numbers < 0"] = function(assert) {
  const map = new SourceMapConsumerSync({
    version: 3,
    sources: ["something.js"],
    names: [],
    mappings: "CDAS",
    file: "foo.js"
  });

  let error;
  try {
    // Triggers parse which fails on too big of a line number.
    map.eachMapping(m => console.log(m));
  } catch (e) {
    error = e;
  }

  assert.ok(error != null);
  map.destroy();
};

exports["test SourceMapConsumerSync.with"] = function(assert) {
  let consumer = null;
  const six = SourceMapConsumerSync.with(util.testMap, null, function(c) {
    // Don't keep references to the consumer around at home, kids.
    consumer = c;

    // We should properly treat the with callback as a function.

    // Should not have parsed and allocated mappings yet.
    assert.equal(c._mappingsPtr, 0);

    // Force the mappings to be parsed and assert that we allocated mappings.
    c.eachMapping(_ => {});
    assert.ok(c._mappingsPtr != 0);

    return 6;
  });

  // Yes, we can return values.
  assert.equal(six, 6);

  // At the end of `with`, we destroyed the mappings.
  assert.equal(consumer._mappingsPtr, 0);
};

exports["test SourceMapConsumerSync.with and exceptions"] = function(assert) {
  let consumer = null;
  let error = null;

  try {
    SourceMapConsumerSync.with(util.testMap, null, function(c) {
      consumer = c;
      assert.equal(c._mappingsPtr, 0);

      c.eachMapping(_ => {});
      assert.ok(c._mappingsPtr != 0);

      throw 6;
    });
  } catch (e) {
    error = e;
  }

  assert.equal(error, 6);
  assert.equal(consumer._mappingsPtr, 0);
};

exports["test mapping without section in an indexed map"] = function(assert) {
  const map = {
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
  const consumer = new SourceMapConsumerSync(map);
  let mappings = [];
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

  consumer.destroy();
};

exports["test mapping without name in an indexed map"] = function(assert) {
  const map = {
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
  const consumer = new SourceMapConsumerSync(map);
  let mappings = [];
  consumer.eachMapping(function(mapping) {
    mappings.push(mapping);
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].generatedLine, 1);
  assert.equal(mappings[0].generatedColumn, 0);
  assert.equal(mappings[0].originalLine, 1);
  assert.equal(mappings[0].originalColumn, 0);
  assert.equal(mappings[0].name, null);

  consumer.destroy();
};

exports["test mapping with name=0 in an indexed map"] = function(assert) {
  const map = {
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
  const consumer = new SourceMapConsumerSync(map);
  let mappings = [];
  consumer.eachMapping(function(mapping) {
    mappings.push(mapping);
  });

  assert.equal(mappings.length, 1);
  assert.equal(mappings[0].generatedLine, 1);
  assert.equal(mappings[0].generatedColumn, 0);
  assert.equal(mappings[0].originalLine, 1);
  assert.equal(mappings[0].originalColumn, 0);
  assert.equal(mappings[0].name, "first");

  consumer.destroy();
};
