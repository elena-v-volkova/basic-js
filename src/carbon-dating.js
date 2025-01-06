const { number } = require("zod");
const { NotImplementedError } = require("../extensions/index.js");

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  const HALF_LIFE_PERIOD = 5730;
  const MODERN_ACTIVITY = 15;
  const LOG2 = 0.693;

  if (
    typeof sampleActivity !== "string" ||
    isNaN(+sampleActivity) ||
    +sampleActivity <= 0 ||
    +sampleActivity > MODERN_ACTIVITY
  ) {
    return false;
  }

  const activity = parseFloat(sampleActivity);
  const decay = LOG2 / HALF_LIFE_PERIOD;
  const age = Math.log(MODERN_ACTIVITY / activity) / decay;

  return Math.ceil(age);
}

module.exports = {
  dateSample,
};
