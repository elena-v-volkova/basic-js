const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const rules = {
    "--discard-next": (result, index, arr, flags) => {
      if (index + 1 < arr.length) {
        flags.skipNext = true;
      }
    },
    "--discard-prev": (result, index, arr, flags) => {
      if (result.length > 0 && !flags.prevDiscarded) {
        result.pop();
      }
    },
    "--double-next": (result, index, arr) => {
      if (index + 1 < arr.length) {
        result.push(arr[index + 1]);
      }
    },
    "--double-prev": (result, index, arr, flags) => {
      if (index > 0 && !flags.prevDiscarded) {
        result.push(arr[index - 1]);
      }
    },
  };

  const result = [];
  const flags = { skipNext: false, prevDiscarded: false };

  for (let i = 0; i < arr.length; i += 1) {
    if (flags.skipNext) {
      flags.skipNext = false;
      flags.prevDiscarded = true;
      continue;
    }

    if (arr[i] in rules) {
      rules[arr[i]](result, i, arr, flags);
    } else {
      result.push(arr[i]);
      flags.prevDiscarded = false;
    }
  }

  return result;
}

module.exports = {
  transform,
};
