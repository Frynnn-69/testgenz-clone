import '@testing-library/jest-dom'

// Polyfill for structuredClone (required by Chakra UI)
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => {
    // Handle undefined, null, and primitive values
    if (obj === undefined || obj === null) {
      return obj;
    }
    if (typeof obj !== 'object') {
      return obj;
    }
    // For objects and arrays, use JSON parse/stringify
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      // Fallback for circular references or non-serializable values
      return obj;
    }
  };
}
