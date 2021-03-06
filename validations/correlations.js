const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateCorrelationInput(data) {
  let errors = {};


  if (data.variables !== undefined) {
    if (data.variables.length !== 2) {
      errors.variables = "Correlation must have exactly 2 variables";
    }
  
    if (data.variables[0] === data.variables[1]) {
      errors.variables = "Variables must not be the same";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}