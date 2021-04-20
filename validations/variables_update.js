const Validator = require('validator');
const validText = require('./valid_text');
const validDate = require('./valid_date');

module.exports = function validateVariableUpdate(data) {
  let errors = {};
  let today = new Date();

  data.date = validText(data.date) ? data.date : '';
  data.count = validText(data.count) ? data.count : '';

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  if (!validDate(data.date)) {
    errors.date = "Date must be a valid date";
  }

  if (Validator.isEmpty(data.count)) {
    errors.count = "Count field is required";
  }

  if (!Validator.isNumeric(data.count) && !Validator.isBoolean(data.count)) {
    errors.count = "Count must be a number or boolean"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}