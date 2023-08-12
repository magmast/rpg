import { assertion as assert } from "@/di";

type Lazy<T> = T extends Function ? () => T : T | (() => T);

export default Lazy;

export const get = <T>(lazy: Lazy<T>): T =>
  typeof lazy === "function" ? getCached(lazy as LazyCached<T>) : (lazy as T);

type LazyCached<T> = (() => T) & { __lazyCache?: { value: T } };

const getCached = <T>(lazy: LazyCached<T>): T => {
  if (!lazy.__lazyCache) {
    lazy.__lazyCache = {
      value: lazy(),
    };
  } else if (process.env.NODE_ENV === "development") {
    assert(
      lazy() === lazy.__lazyCache,
      "Function creating a lazy value must always return the same value.",
    );
  }

  return lazy.__lazyCache.value;
};
