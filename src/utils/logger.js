const DEBUG_MODE = process.env.NODE_ENV !== "production";

export function debugLog(...args) {
  if (DEBUG_MODE) {
    const safeArgs = args.map(arg => (arg === null || arg === undefined ? "[null or undefined]" : arg));
    console.log(...safeArgs);
  }
}
