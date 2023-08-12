import { assertion as assert } from "@/di";
import { useEffect } from "react";

const useAssert: typeof assert =
  // Asserts are removed from the production code, but I'm not sure if
  // this is the case for `useEffect` wrapping that assertion. So to be sure,
  // we're checking, if we're on development environment.
  process.env.NODE_ENV === "development"
    ? (condition, message, optionalParams) => {
        useEffect(() => {
          assert(condition, message, optionalParams);
        }, [condition, message, optionalParams]);
      }
    : () => {};

export default useAssert;
