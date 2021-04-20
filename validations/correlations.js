const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateCorrelationInput(data) {
  let errors = {};

  if (data.variables.length !== 2) {
    errors.correlations = "Correlation must have exactly 2 variables";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}