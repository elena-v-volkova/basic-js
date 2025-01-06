const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let result = "";
  let currentChar = "";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === currentChar) {
      count++;
    } else {
      if (count > 0) {
        result += (count > 1 ? count : "") + currentChar;
      }
      currentChar = char;
      count = 1;
    }
  }

  if (count > 0) {
    result += (count > 1 ? count : "") + currentChar;
  }

  return result;
}

module.exports = {
  encodeLine,
};
