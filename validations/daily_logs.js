// const Validator = require('validator');
// const validText = require('./valid_text');

module.exports = function validateDLInput(data) {
  let errors = {};

  if (data.variables.length > 0 && data.variables.length <= 10) {
    errors.variables = "There can only be 1 to 10 variables";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

