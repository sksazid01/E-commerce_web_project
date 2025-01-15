"use strict";
import { expect } from "chai";
import fsPath from "path";
import sinon from "sinon";
import css from "../src";
import cache from "../src/cache";
import stylusCompiler from "../src/compile-stylus";
const SAMPLES_PATH = "./test/samples"



describe("cache", function() {
  beforeEach(() => cache.clear());


  it("stores compiled CSS within the cache", (done) => {
    expect(cache.keys()).to.eql([]);
    css.compile(`${ SAMPLES_PATH }/1-file`, { cache: true })
    .then(result => {
        expect(cache.keys().length).to.equal(1);
        const value = cache.value(cache.keys()[0]);
        expect(value).to.include("body {");
        expect(value).to.include("background: #f00;");
        done();
    })
    .catch(err => console.error(err));
  });



  it("does not cache CSS when supressed with flag", (done) => {
    expect(cache.keys()).to.eql([]);
    css.compile(`${ SAMPLES_PATH }/1-file`, { cache: false })
    .then(result => {
        expect(cache.keys()).to.eql([]);
        done();
    })
    .catch(err => console.error(err));
  });



  it("reads from the cache", (done) => {
    const path = `${ SAMPLES_PATH }/1-file`;
    const mock = sinon.mock(cache);
    const cacheKey = cache.key(path, { cache: true });
    mock.expects("value").atLeast(1).withArgs(cacheKey);

    css.compile(path, { cache: true })
    .then(result => {
        mock.verify();
        mock.restore();
        done();
    })
    .catch(err => console.error(err))
  });



  it("reads from cache - does not compile", (done) => {
    const path = fsPath.resolve(`${ SAMPLES_PATH }/1-file`);
    const mock = sinon.mock(stylusCompiler);

    // Call the first time to load the cache.
    css.compile(path, { cache: true })
    .catch(err => console.error(err))
    .then(() => {
        // Call a second time to retrieve from the cache.
        mock.expects("compile").never();
        css.compile(path, { cache: true })
        .then(() => {
            mock.verify();
            mock.restore();
            done();
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  });
});
