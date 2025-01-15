"use strict";
import { expect } from "chai";
import fs from "fs-extra";
import fsPath from "path";
import css from "../src";
import cache from "../src/cache";
const SAMPLES_PATH = "./test/samples"


describe("compile", function() {
  it("compiles a single file", (done) => {
    css.compile(`${ SAMPLES_PATH }/root.styl`)
    .then(result => {
        expect(result.files.length).to.equal(1);
        expect(result.css).to.include("body {");
        done();
    })
    .catch(err => console.error(err));
  });


  it("compiles all CSS in a folder", (done) => {
    css.compile(`${ SAMPLES_PATH }/css`)
    .then(result => {
        expect(result.files).to.be.an.instanceof(Array);
        expect(result.css).to.include(".child {");
        expect(result.css).to.include("width: 960px");
        expect(result.css).to.include("/*! normalize.css v3.0.2 | MIT License | git.io/normalize */");
        expect(result.css).to.include(".page {");
        expect(result.css).to.include(".foo {");
        expect(result.css).to.include(".plain");
        done();
    })
    .catch(err => console.error(err));
  });


  it("compiles 'normalize.css' before other CSS", (done) => {
    css.compile([`${ SAMPLES_PATH }/css/normalize.css`, `${ SAMPLES_PATH }/css`])
    .then(result => {
        const indexOfNormalize = result.css.indexOf("normalize.css");
        const indexOfFirst = result.css.indexOf(".first");
        expect(indexOfNormalize).to.be.below(indexOfFirst);
        done();
    })
    .catch(err => console.error(err));
  });


  it("compiles a directory using mixins from another directory", (done) => {
    css.compile([`${ SAMPLES_PATH }/css`, `${ SAMPLES_PATH }/mixins`])
    .then(result => {
        const match = ".child {\n  width: 960px;\n  position: absolute"; // Both these values derived from mixins.
        expect(result.css).to.include(match);
        done();
    })
    .catch(err => console.error(err));
  });
});
