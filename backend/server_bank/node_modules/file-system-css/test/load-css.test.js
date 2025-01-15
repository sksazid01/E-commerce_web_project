"use strict";
import { expect } from "chai";
import fs from "fs-extra";
import fsPath from "path";
import loadCss from "../src/load-css";

const SAMPLES_PATH = "./test/samples"
const PLAIN_CSS = fsPath.resolve(SAMPLES_PATH, "css/plain.css");


describe("load-css", function() {
  it("loads the plain CSS file", (done) => {
    loadCss(PLAIN_CSS)
    .then((result) => {
        expect(result.length).to.equal(1);
        expect(result[0].css).to.include(".plain { color: blue; }");
        done();
    });
  });

  it("does not load non-css files", (done) => {
    loadCss([
      fsPath.resolve(SAMPLES_PATH, "css/default.styl"),
      fsPath.resolve(SAMPLES_PATH, "css/foo.js")
    ])
    .then((result) => {
        expect(result.length).to.equal(0);
        done();
    });
  });
});
