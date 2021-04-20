const validDate = str => {
  let datearr = str.split("/");
  if (typeof str === 'string' && datearr.length === 3 ) {
    if (datearr[2] > datearr[1] && datearr[2] > datearr[0]){
      return true;
    }
  }
  return false;
}

module.exports = validDate;