const DEBUG_MODE = process.env.NODE_ENV !== "production";

export function debugLog(...args) {
  if (DEBUG_MODE) {
    console.log(...args);
  }
}
