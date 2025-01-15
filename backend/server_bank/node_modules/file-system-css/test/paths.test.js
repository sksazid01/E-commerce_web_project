"use strict";
import { expect } from "chai";
import fsPath from "path";
import css from "../src";
const SAMPLES_PATH = "./test/samples"


describe("paths", function() {
  describe("paths param", function() {
    it("throws if path was not given", () => {
      expect(() => css.compile()).to.throw();
    });

    it("converts single path to an array", () => {
      const path = `${ SAMPLES_PATH }/css`;
      const compiler = css.compile(path);
      expect(compiler.paths.length).to.equal(1);
      expect(compiler.paths[0]).to.equal(fsPath.resolve(path));
    });

    it("throws if a path does not exist", () => {
      expect(() => css.compile("./not-exist")).to.throw();
    });

    it("does not throw if the paths does not exist ('pathsRequired' flag)", () => {
      expect(() => css.compile("./not-exist", { pathsRequired: false })).not.to.throw();
    });

    it("removes the non-existent path (none)", () => {
      const options = { pathsRequired: false };
      expect(css.compile("./not-exist", options).paths.length).to.eql(0);
    });

    it("removes the non-existent path (several)", () => {
      const path = `${ SAMPLES_PATH }/css`;
      const compiler = css.compile([path, "./not-exist"], { pathsRequired: false });
      expect(compiler.paths.length).to.eql(1);
      expect(compiler.paths[0]).to.equal(fsPath.resolve(path));
    });

    it("does not have the same path more than once", () => {
      const compiler = css.compile([`${ SAMPLES_PATH }/css`, null, undefined, `${ SAMPLES_PATH }/css`]);
      expect(compiler.paths.length).to.equal(1);
    });

    it("flattens paths", () => {
      const path = `${ SAMPLES_PATH }/css`;
      const compiler = css.compile([[[path]]]);
      expect(compiler.paths.length).to.equal(1);
      expect(compiler.paths[0]).to.equal(fsPath.resolve(path));
    });

    it("accepts a path to a file", () => {
      const path = `${ SAMPLES_PATH }/root.styl`;
      const compiler = css.compile(path);
      expect(compiler.paths.files.length).to.equal(1);
      expect(compiler.paths.files[0]).to.eql(fsPath.resolve(path));
    });
  });


  describe("files", function() {
    it("has no source files", () => {
      const compiler = css.compile(`${ SAMPLES_PATH }/empty`);
      expect(compiler.paths.files).to.eql([]);
    });

    it("has [.css] and [.styl] file paths (deep)", () => {
      const compiler = css.compile(`${ SAMPLES_PATH }/css`);
      const files = compiler.paths.files;
      expect(files).to.include(fsPath.resolve(SAMPLES_PATH, "css/common.mixin.styl"));
      expect(files).to.include(fsPath.resolve(SAMPLES_PATH, "css/mixin.styl"));
      expect(files).to.include(fsPath.resolve(SAMPLES_PATH, "css/normalize.css"));
      expect(files).to.include(fsPath.resolve(SAMPLES_PATH, "css/child/child.styl"));
    });

    it("does not have non-CSS files", () => {
      const compiler = css.compile(SAMPLES_PATH);
      const files = compiler.paths.files;
      expect(files).not.to.include(fsPath.resolve(SAMPLES_PATH, ".foo"));
      expect(files).not.to.include(fsPath.resolve(SAMPLES_PATH, "foo.js"));
    });

    it("does not have the same file twice", () => {
      const compiler = css.compile([
        `${ SAMPLES_PATH }/css/normalize.css`,
        `${ SAMPLES_PATH }/css`
      ]);
      const normalizePaths = compiler.paths.files.filter(item => item.endsWith("normalize.css"));
      expect(normalizePaths.length).to.equal(1);
    });
  });
});
