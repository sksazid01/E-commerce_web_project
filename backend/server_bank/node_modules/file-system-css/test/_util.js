import fs from "fs-extra";
import fsPath from "path";
import { CACHE_PATH } from "../src";


export const deleteCacheFolder = () => {
  fs.removeSync(fsPath.resolve(CACHE_PATH));
};
