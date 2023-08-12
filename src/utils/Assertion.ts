import Lazy, { get } from "./Lazy";

type Assertion = (
  condition: Lazy<boolean>,
  message: string,
  ...optionalParams: unknown[]
) => void;

export default Assertion;

/**
 * Simple {@link Assertion} implementation.
 *
 * Failed assertions are logged to console using `console.assert` function.
 * Assertions are enabled only when `process.env.NODE_ENV === 'development'`.
 */
export const assert: Assertion = (condition, message, ...optionalParams) => {
  // This instruction, including the `get(condition)` part, should be removed by
  // the SWC thanks to the `compiler.removeConsole` option in the
  // `next.config.js` file.
  //
  // Thanks to this optimization asserts shouldn't affect production build
  // performance, but if it does, please file an issue, as it wasn't precisely
  // tested.
  console.assert(get(condition), message, optionalParams);
};
