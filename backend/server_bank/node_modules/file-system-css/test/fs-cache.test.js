"use strict";
import R from "ramda";
import { expect } from "chai";
import fs from "fs-extra";
import fsPath from "path";
import FileSystemCache from "file-system-cache";
import css from "../src";
import { CACHE_PATH } from "../src";
import { deleteCacheFolder } from "./_util";


const SAMPLES_PATH = "./test/samples";

const loadBuildFiles = () => {
  return R.pipe(
      R.map(fileName => fsPath.resolve(CACHE_PATH, fileName)),
      R.map(path => fs.readFileSync(path).toString())
  )(fs.readdirSync(CACHE_PATH));
}


describe("Build folder (cache)", function() {
  beforeEach(() => deleteCacheFolder());
  after(() => deleteCacheFolder());


  it("caches to file-system upon compiling", (done) => {
    const ns = fsPath.resolve(`${ SAMPLES_PATH }/1-file`);
    css.compile(ns)
    .then(result => {
        result.files.map(file => {
            const cachedFile = loadBuildFiles()[0];
            expect(cachedFile).to.include("body {");
            expect(cachedFile).to.include("background: #f00");
        });
        done();
    })
    .catch(err => console.error("ERROR", err));
  });


  it("partially loads from the file system", (done) => {
    const folderPath = fsPath.resolve(`${ SAMPLES_PATH }/2-files`);
    const filePath = fsPath.resolve(folderPath, "one.styl");
    const cache = FileSystemCache({ basePath: CACHE_PATH, ns: [folderPath] });
    cache.setSync(filePath, { path: filePath, css: "from cache!" })

    css.compile(folderPath)
    .then((result) => {
        expect(result.css).to.include(".two {");
        expect(result.css).to.include("from cache!");
        done();
    })
    .catch(err => console.error("ERROR", err));
  });
});
