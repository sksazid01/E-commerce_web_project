"use strict";
import { expect } from "chai";
import css from "../src";
const SAMPLES_PATH = "./test/samples"


describe("minify", function() {
  it("does not compress the compiled CSS", (done) => {
    css.compile(`${ SAMPLES_PATH }/1-file`, { minify: false })
    .then(result => {
        expect(result.css).to.include("\n");
        done();
    })
    .catch(err => console.error(err));
  });


  it("does compress the compiled CSS", (done) => {
    css.compile(`${ SAMPLES_PATH }/1-file`, { minify: true })
    .then(result => {
        expect(result.css).not.to.include("\n");
        done();
    })
    .catch(err => console.error(err));
  });
});
