"use strict";
import { expect } from "chai";
import fs from "fs-extra";
import fsPath from "path";
import compiler from "../src/compile-stylus";

const SAMPLES_PATH = "./test/samples"
const compileStylus = compiler.compile;


describe("compile-stylus", function() {
  it("returns a Promise", () => {
    const path = fsPath.resolve(SAMPLES_PATH, "root.styl");
    expect(compileStylus(path).then).to.be.an.instanceof(Function);
  });


  it("converts stylus file to CSS", (done) => {
    const path = fsPath.resolve(SAMPLES_PATH, "root.styl");
    compileStylus(path)
    .then((result) => {
        expect(result.length).to.equal(1);
        expect(result[0].css).to.include("body {")
        expect(result[0].css).to.include("background: #f00")
        expect(result[0].path).to.equal(path);
        done();
    });
  });


  it("throws descriptive error with invalid stylus content", (done) => {
    const path = fsPath.resolve(SAMPLES_PATH, "invalid.styl");
    compileStylus(path)
    .catch((err) => {
        expect(err.name).to.equal("ParseError");
        expect(err.message).to.include(path);
        done()
    })
  });


  describe("mixins", function() {
    it("imports 'nib' (by default)", (done) => {
      compileStylus(fsPath.resolve(SAMPLES_PATH, "css/uses-nib.styl"))
      .then((result) => {
          expect(result[0].css).to.include("-webkit-border-radius: 5px;");
          done();
      });
    });

    it("imports 'mixin.styl' and '*.mixin.styl' files", (done) => {
      compileStylus([
          fsPath.resolve(SAMPLES_PATH, "css/mixin.styl"),
          fsPath.resolve(SAMPLES_PATH, "css/child/child.styl"),
          fsPath.resolve(SAMPLES_PATH, "mixins/const.mixin.styl")
        ])
      .then((result) => {
          expect(result.length).to.equal(1); // Does not include mixin files.
          expect(result[0].css).to.include("width: 960px"); // 960px is derived from mixin.
          done();
      });
    });
  });
});
