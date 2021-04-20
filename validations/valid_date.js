const validDate = str => {
  let datearr = str.split("/").map(num => parseInt(num, 10));
  if (typeof str === 'string' && datearr.length === 3 ) {
    if (datearr[2] > 2000 && datearr[1] < 32 && datearr[1] > 0 && datearr[0] > 0 && datearr[0] < 13){
      return true;
    }
  }
  return false;
}

module.exports = validDate;