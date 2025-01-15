import cache from "../src/cache";
import { deleteCacheFolder } from "./_util";

beforeEach(() => cache.clear());
after(() => deleteCacheFolder());
