// const Validator = require('validator');
// const validText = require('./valid_text');

module.exports = function validateDLInput(data) {
  let errors = {};

  if (data.variables.length === 0 || data.variables.length > 10) {
    errors.variables = "There can only be 1 to 10 variables";
  }
  
  if (data.variables.length > 0 && data.variables.length <= 10){
    for (let i = 0; i < data.variables.length; i++) {
      if (data.variables[i].count === undefined) {
        errors.variables = "Count field is required";
        break;
      }
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

