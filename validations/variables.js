const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateVariableInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.unit = validText(data.unit) ? data.unit : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.unit)) {
    errors.unit = "Unit field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}