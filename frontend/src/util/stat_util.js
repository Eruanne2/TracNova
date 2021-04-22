// const Statistics = require('statistics.js'); // do not remove the .js !!!!
import Statistics from "statistics.js"
// { "10/15/2021": 127.83, "04/21/2021": 69 }
// { "10/15/2021": true, "04/19/2021": true, "04/21/2021": false }
// => [ { var1: } ]

// takes data from daily logs and formats it as shown below
export const getStatData = (variable1, variable2) => {
  let varTypes = { 
    [variable1.name]: (variable1.unit === 'boolean') ? 'binary' : 'metric',
    [variable2.name]: (variable2.unit === 'boolean') ? 'binary' : 'metric' 
  };

  let formattedData = [];
  Object.keys(variable1.dailylogs).forEach(date => {
    if (!variable2.dailylogs[date]) return;
    else formattedData.push({ [variable1.name]: variable1.dailylogs[date], [variable2.name]: variable2.dailylogs[date] });
  });

  return [formattedData, varTypes];
};

// get number of data points
export const numDataPoints = (variable1, variable2) => {
  let formattedData = [];
  Object.keys(variable1.dailylogs).forEach(date => {
    if (!variable2.dailylogs[date]) return;
    else formattedData.push({ [variable1.name]: variable1.dailylogs[date], [variable2.name]: variable2.dailylogs[date] });
  });
  return formattedData.length;
};

// example input for getCorrelationCoefficient: 

// var data = [
// 	{ painMeds: 0, walkingMin: 12 },
// 	{ painMeds: 0, walkingMin: 8 },
// 	{ painMeds: 1, walkingMin: 22 },
// 	{ painMeds: 1, walkingMin: 16 },
//  { painMeds: 0, walkingMin: 7 },
// 	{ painMeds: 1, walkingMin: 20 },
//  { painMeds: 1, walkingMin: 18 }
// ];

// varTypes = { painMeds: 'binary', walkingMin: 'metric' }   -->   (varTypes are either 'binary' or 'metric')

const sum = (arr) => arr.reduce((acc, el) => acc + el);
const avg = (arr) => sum(arr) / arr.length;

// export and use this function
// export const getCorrelationCoefficient = (data, varTypes) => {
export const getCorrelationCoefficient = (var1, var2) => {
  const [ data, varTypes] = getStatData(var1, var2);

  const types = Object.values(varTypes);
  const hasBinary = types.includes('binary');
  const hasMetric = types.includes('metric');

  if (types.length !== 2) throw 'Invalid varTypes.';

  if (hasBinary && !hasMetric){
    const valSets = data.map(pair => Object.values(pair));
    const count = { '0,0': 0, '0,1': 0, '1,0': 0, '1,1': 0 };

    valSets.forEach(set => {
      let key = set.toString();
      count[key] += 1 
    });
    
    const table = Object.values(count);

    return phi(table);
  }

  if (hasBinary && hasMetric){
    // point-biserial
    return pointBiserial(data, varTypes);
  }

  if (!hasBinary && hasMetric){
    // spearman
    const stats = new Statistics(data, varTypes);
    const spearman = stats.spearmansRho(...Object.keys(varTypes));

    return spearman.rho;
  }
  
  else return 'Invalid varTypes.';
};


// Phi Correlation
const phi = ([_00, _01, _10, _11]) => 
  (_11 * _00 - _10 * _01) /
    Math.sqrt((_10 + _11) * (_00 + _01) * (_01 + _11) * (_00 + _10))


// Point-Biserial Correlation
const pointBiserial = (testData, varTypes) => {
  let binaryVar, metricVar;

  for (let key in varTypes) {
    if (varTypes[key] === 'binary') binaryVar = key
    else if (varTypes[key] === 'metric') metricVar = key;
  }

  const onesVals = [];
  const zeroesVals = [];

  testData.forEach(dataSet => {
    if (dataSet[binaryVar] === 1) onesVals.push(dataSet[metricVar])
    else if (dataSet[binaryVar] === 0) zeroesVals.push(dataSet[metricVar]);
  });
  
  const onesAvg = avg(onesVals);
  const zeroesAvg = avg(zeroesVals);
  const std_dev = popStdDev(onesVals.concat(zeroesVals));

  return (onesAvg - zeroesAvg) * Math.sqrt(onesVals.length * zeroesVals.length) / (testData.length * std_dev)
};

// Population Standard Deviation (helper)
const popStdDev = arr => {
  const mean = avg(arr);

  return Math.sqrt(
    arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / arr.length
  );
};
